# 🟢 TUẦN 6 - BÀI 12 (VUE.JS)
# **API INTEGRATION — useFetch, Axios, Error Handling**

---

## 0. 🎬 Opening Hook

*Minh fetch API xong thấy data. "Done!" anh nói.*

*"Loading spinner?" Anh Hùng hỏi.*
*"Ờ... chưa."*
*"Error message khi network fail?"*
*"Chưa."*
*"Retry khi timeout? Cancel khi navigate đi? Auth token trong headers?"*
*"..."*

*"Fetch data production-ready có 10 concerns. Viết `useFetch()` composable 1 lần → mọi component dùng lại. Đó mới là engineering."*

---

## 1. 🎯 Why This Matters

API integration đúng cách = UX tốt và code maintainable:
- **Loading states**: User biết data đang load
- **Error handling**: Thông báo rõ ràng khi fail
- **Cancel on unmount**: Không memory leak
- **Caching**: Không fetch lại data vừa có
- **Auth**: Bearer token tự động trong headers

---

## 2. 🌐 Big Picture

```
API INTEGRATION LAYERS

Component (dùng data)
    ↑ useFetch() / useApi() composable
        ↑ httpClient (Axios instance với interceptors)
            ↑ /api/products endpoint
                ↑ Backend server

FLOW:
Component mount → composable fetch → loading=true
                                   → success: data=result, loading=false
                                   → error: error=message, loading=false
Component unmount → composable cleanup (abort in-flight request)
```

---

## 3. ⚙️ Core Technical Truth

### useFetch — Custom Composable

```javascript
// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue'

/**
 * Generic fetch composable với auto-cancel
 * @param {string | Ref<string> | () => string} url - URL hoặc reactive URL
 * @param {RequestInit} options - Fetch options
 */
export function useFetch(url, options = {}) {
    const data = ref(null)
    const error = ref(null)
    const isLoading = ref(false)

    let abortController = null

    // watchEffect tự track reactive dependencies (ref, computed)
    // Re-run khi url thay đổi (ví dụ: route.params.id)
    watchEffect(async (onCleanup) => {
        // Cancel previous request
        abortController = new AbortController()

        // Cleanup function: gọi khi url thay đổi hoặc component unmount
        onCleanup(() => abortController.abort())

        isLoading.value = true
        error.value = null
        data.value = null

        try {
            const response = await fetch(toValue(url), {
                signal: abortController.signal,
                ...options,
            })

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            data.value = await response.json()

        } catch (err) {
            if (err.name !== 'AbortError') {
                error.value = err.message
            }
        } finally {
            isLoading.value = false
        }
    })

    return { data, error, isLoading }
}

// Sử dụng — 3 dòng thay vì 30 dòng
// const { data: products, isLoading, error } = useFetch('/api/products')

// Reactive URL: tự re-fetch khi route.params.id thay đổi
// const { data: product } = useFetch(() => `/api/products/${route.params.id}`)
```

---

### Axios Instance — Production Setup

```bash
npm install axios
```

```javascript
// services/httpClient.js
import axios from 'axios'

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Request interceptor — Add auth token
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor — Handle common errors
httpClient.interceptors.response.use(
    (response) => response.data,  // Unwrap data tự động
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            // Token expired → redirect to login
            localStorage.removeItem('token')
            window.location.href = '/login'
        }

        if (status === 403) {
            console.error('Forbidden — insufficient permissions')
        }

        if (status >= 500) {
            console.error('Server error:', error.response?.data)
        }

        return Promise.reject(error)
    }
)

export default httpClient
```

```javascript
// services/productService.js
import httpClient from './httpClient'

export const productService = {
    getAll: (params) => httpClient.get('/products', { params }),
    getById: (id) => httpClient.get(`/products/${id}`),
    create: (data) => httpClient.post('/products', data),
    update: (id, data) => httpClient.put(`/products/${id}`, data),
    delete: (id) => httpClient.delete(`/products/${id}`),
    search: (query) => httpClient.get('/products/search', { params: { q: query } }),
}
```

---

### Sử dụng trong Component

```vue
<!-- ProductsView.vue -->
<template>
    <div class="products-page">
        <!-- Loading state -->
        <div v-if="isLoading" class="loading-grid">
            <SkeletonCard v-for="n in 6" :key="n" />
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error-state">
            <p>❌ {{ error }}</p>
            <AppButton @click="retry">Thử lại</AppButton>
        </div>

        <!-- Success state -->
        <div v-else>
            <div class="product-grid">
                <ProductCard
                    v-for="product in data"
                    :key="product.id"
                    :product="product"
                    @add-to-cart="handleAddToCart"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@/composables/useFetch'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()

// Auto re-fetch khi category query thay đổi
const { data, isLoading, error } = useFetch(
    () => `/api/products?category=${route.query.category ?? ''}`
)

function handleAddToCart(product) {
    cartStore.addItem(product)
}

// Retry: force reload bằng cách navigate lại
function retry() {
    window.location.reload()
}
</script>
```

---

### POST/PUT/DELETE — Mutations

```vue
<!-- Khi cần gửi data lên server (không phải GET) -->
<script setup>
import { ref } from 'vue'
import { productService } from '@/services/productService'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const serverError = ref('')

const form = ref({
    name: '',
    price: 0,
    description: '',
    category: '',
})

async function handleSubmit() {
    isSubmitting.value = true
    serverError.value = ''

    try {
        const newProduct = await productService.create(form.value)
        // Thành công → navigate đến trang mới
        router.push({ name: 'product-detail', params: { id: newProduct.id } })

    } catch (error) {
        // Axios interceptor đã handle 401/500
        // Xử lý validation errors (422)
        if (error.response?.status === 422) {
            const errors = error.response.data.errors
            serverError.value = Object.values(errors).flat().join(', ')
        } else {
            serverError.value = 'Có lỗi xảy ra, vui lòng thử lại.'
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`useFetch(url)` = composable bọc fetch với loading/error/data và auto-cancel. URL có thể là reactive `() => \`/api/${id}\`` để auto re-fetch.**
> **Axios instance = interceptors tự động add token + handle 401. Service layer = tách API calls ra file riêng khỏi component.**

---

## 5. 🛠️ Hands-on Practice

### Bài tập: useProducts composable (20 phút)

```javascript
// Tạo composables/useProducts.js
// Sử dụng productService
// Expose: products, isLoading, error, fetchProducts, createProduct, deleteProduct
// Hint: Dùng ref() cho state, async functions cho actions

// Sử dụng trong ProductsView.vue:
// const { products, isLoading, error, fetchProducts, deleteProduct } = useProducts()
// onMounted(fetchProducts)
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Fetch trong `onMounted` là đủ"** | Thiếu: loading state, error handling, cancel on unmount. Production cần cả 4 |
| **"Axios tự handle HTTP errors"** | Axios throw error khi status >= 400. Nhưng không tự redirect, không tự refresh token. Cần interceptors |
| **"Mỗi component tự fetch là tốt nhất"** | Dẫn đến: duplicate requests, inconsistent loading states. Dùng Pinia store + service layer để cache và share data |
| **"`useFetch` composable phức tạp không cần thiết"** | Nếu fetch ở 5+ components, mỗi cái có loading/error/cancel → 5× code. 1 composable + 5× 1-liner. Đây là ROI của abstraction |

---

## 7. ✅ Checkpoint

1. Tại sao cần `AbortController` trong fetch? Điều gì xảy ra nếu thiếu?
2. Axios interceptor hoạt động thế nào? Liệt kê 3 use cases.
3. Tại sao nên tách API logic ra `services/` folder thay vì viết thẳng trong component?

<details>
<summary>👁️ Xem đáp án</summary>

1. Khi component unmount mà fetch đang chờ response: callback sẽ cố set `data.value = result` trên component đã destroy → Vue warning. Memory leak nếu callback giữ reference lớn. AbortController.abort() → fetch throw AbortError → catch block bỏ qua → clean.
2. Axios interceptors: (1) Request interceptor: tự add `Authorization: Bearer token` vào mọi request → không cần pass token thủ công từng nơi. (2) Response success interceptor: unwrap `response.data` → component nhận data trực tiếp không cần `response.data`. (3) Response error interceptor: detect 401 → clear token → redirect login; log 500 errors.
3. Service layer benefits: (1) Single source of truth — đổi API endpoint 1 chỗ. (2) Testable — mock service trong unit tests. (3) DRY — nhiều component dùng chung logic. (4) Separation of concerns — component chỉ lo UI, service lo HTTP.

</details>

---

## 8. 📌 Summary

1. **`useFetch(url)`** = composable chuẩn với loading/error/abort. URL reactive để auto re-fetch
2. **Axios instance** = `baseURL` + `timeout` + interceptors cho token và error handling
3. **Service layer** (`productService.js`) = tách HTTP logic khỏi component
4. **POST/PUT/DELETE**: Quản lý `isSubmitting`, `serverError` trong component
5. **Cancel on unmount**: `AbortController` hoặc `onCleanup` trong `watchEffect`

**→ [Bài 13: Form Handling](./13_form_handling.md) — Validation, VeeValidate, form patterns.**
