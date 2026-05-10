# 🟢 TUẦN 6 - BÀI 10 (VUE.JS)
# **STATE MANAGEMENT VỚI PINIA**

---

## 0. 🎬 Opening Hook

*Minh dùng Vuex (state management cũ của Vue):*

```javascript
// Vuex — 60+ dòng cho cart đơn giản
const store = createStore({
    state: () => ({ items: [] }),
    mutations: {
        ADD_ITEM(state, product) { state.items.push(product) }
    },
    actions: {
        addItem({ commit }, product) { commit('ADD_ITEM', product) }
    },
    getters: {
        totalItems: state => state.items.length
    }
})
// Dùng: store.dispatch('addItem', product)
```

*Sau đó anh Hùng cho xem Pinia:*

```javascript
// Pinia — 15 dòng, cùng chức năng
export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const totalItems = computed(() => items.value.length)
    function addItem(product) { items.value.push(product) }
    return { items, totalItems, addItem }
})
// Dùng: cartStore.addItem(product)
```

*"Pinia = Vuex nhưng bỏ mutations, bỏ boilerplate," anh Hùng nói. "Vue team chính thức thay Vuex bằng Pinia từ Vue 3."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Pinia giải quyết **props drilling** và **state synchronization**:
- Cart data cần ở Header, ProductPage, CartPage, CheckoutPage — không truyền qua 4 tầng props
- User login state cần ở Navbar, PrivateRoute, API calls — 1 store là xong
- Data persist qua navigation — không mất khi chuyển trang

---

## 2. 🌐 Big Picture — Pinia vs Alternatives

```
PINIA (Vue 3 Official)
defineStore('name', () => {
    state = ref(...)
    getters = computed(...)
    actions = functions
    return { state, getters, actions }
})

Dùng ở bất kỳ component nào:
const store = useMyStore()
store.state      // Reactive
store.getter     // Computed
store.action()   // Mutate

SO SÁNH:
Pinia               Vuex 4               Zustand (React)
──────────────      ──────────────       ──────────────
defineStore()       createStore()        create()
ref/computed        state/mutations      set/get
Không mutations     Phải có mutations    set() function
TS out of box       TS config thêm       TS native
Vue DevTools        Vue DevTools         Redux DevTools
~1.6KB              ~10KB                ~1KB
```

---

## 3. ⚙️ Core Technical Truth

### Setup & Cấu trúc

```bash
npm install pinia
# Đã có nếu chọn Pinia khi `npm create vue@latest`
```

```javascript
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)  // Phải use trước mount
app.mount('#app')
```

```
src/stores/
├── cartStore.js      ← Cart items, totalPrice
├── authStore.js      ← User, token, login/logout
├── productStore.js   ← Products catalog
└── uiStore.js        ← isLoading, toast messages, theme
```

---

### defineStore — Composition API Style

```javascript
// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    // ====== STATE ======
    const items = ref([])
    const couponCode = ref('')
    const isOpen = ref(false)

    // ====== GETTERS (computed) ======
    const totalItems = computed(() =>
        items.value.reduce((sum, item) => sum + item.qty, 0)
    )

    const subtotal = computed(() =>
        items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
    )

    const discount = computed(() =>
        couponCode.value === 'SAVE10' ? subtotal.value * 0.1 : 0
    )

    const totalPrice = computed(() => subtotal.value - discount.value)

    const isEmpty = computed(() => items.value.length === 0)

    // ====== ACTIONS ======
    function addItem(product) {
        const existing = items.value.find(i => i.id === product.id)
        if (existing) {
            existing.qty++
        } else {
            items.value.push({ ...product, qty: 1 })
        }
    }

    function removeItem(productId) {
        items.value = items.value.filter(i => i.id !== productId)
    }

    function updateQty(productId, qty) {
        const item = items.value.find(i => i.id === productId)
        if (item) {
            if (qty <= 0) removeItem(productId)
            else item.qty = qty
        }
    }

    function applyCoupon(code) {
        couponCode.value = code.toUpperCase().trim()
    }

    function clearCart() {
        items.value = []
        couponCode.value = ''
    }

    function toggleCart() {
        isOpen.value = !isOpen.value
    }

    return {
        // State
        items, couponCode, isOpen,
        // Getters
        totalItems, subtotal, discount, totalPrice, isEmpty,
        // Actions
        addItem, removeItem, updateQty, applyCoupon, clearCart, toggleCart,
    }
})
```

---

### Auth Store với Async Actions

```javascript
// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user') ?? 'null'))
    const token = ref(localStorage.getItem('token') ?? '')
    const isLoading = ref(false)
    const error = ref('')

    // Getters
    const isLoggedIn = computed(() => !!user.value && !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    // Actions
    async function login(credentials) {
        isLoading.value = true
        error.value = ''
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message ?? 'Đăng nhập thất bại')
            }

            const data = await res.json()
            user.value = data.user
            token.value = data.token

            // Persist to localStorage
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)

        } catch (err) {
            error.value = err.message
            throw err  // Re-throw để component xử lý
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProfile() {
        if (!token.value) return
        try {
            const res = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token.value}` }
            })
            if (res.ok) {
                user.value = await res.json()
            } else {
                logout() // Token expired
            }
        } catch {
            logout()
        }
    }

    function logout() {
        user.value = null
        token.value = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    function clearError() {
        error.value = ''
    }

    return {
        user, token, isLoading, error,
        isLoggedIn, isAdmin,
        login, fetchProfile, logout, clearError,
    }
})
```

---

### Dùng Pinia trong Components

```vue
<!-- Navbar.vue -->
<template>
    <nav>
        <RouterLink to="/">Logo</RouterLink>

        <!-- Đọc từ cart store -->
        <button @click="cartStore.toggleCart">
            🛒 {{ cartStore.totalItems > 0 ? cartStore.totalItems : '' }}
        </button>

        <!-- Đọc từ auth store -->
        <template v-if="authStore.isLoggedIn">
            <span>{{ authStore.user.name }}</span>
            <button @click="handleLogout">Đăng xuất</button>
        </template>
        <RouterLink v-else to="/login">Đăng nhập</RouterLink>
    </nav>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
    authStore.logout()
    cartStore.clearCart()  // Store dùng chung giữa các stores!
    router.push('/')
}
</script>
```

```vue
<!-- ProductCard.vue -->
<template>
    <div class="product-card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price.toLocaleString('vi-VN') }}đ</p>
        <button
            @click="handleAddToCart"
            :class="{ 'btn-success': justAdded }"
        >
            {{ justAdded ? '✅ Đã thêm' : 'Thêm vào giỏ' }}
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({ product: Object })
const cartStore = useCartStore()
const justAdded = ref(false)

function handleAddToCart() {
    cartStore.addItem(props.product)
    justAdded.value = true
    setTimeout(() => { justAdded.value = false }, 2000)
}
</script>
```

---

### storeToRefs — Destructure reactive state

```vue
<script setup>
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()

// ❌ Destructure thường = mất reactivity
// const { items, totalPrice } = cartStore  // items không reactive!

// ✅ storeToRefs = giữ reactivity khi destructure state/getters
const { items, totalPrice, isEmpty } = storeToRefs(cartStore)

// Actions không cần storeToRefs
const { addItem, removeItem, clearCart } = cartStore
</script>

<template>
    <!-- items, totalPrice, isEmpty là refs reactive -->
    <p v-if="isEmpty">Giỏ hàng trống</p>
    <p>Tổng: {{ totalPrice.toLocaleString('vi-VN') }}đ</p>
    <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.name }}
            <button @click="removeItem(item.id)">❌</button>
        </li>
    </ul>
</template>
```

---

### Persist Plugin

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// src/main.js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Trong store: thêm option persist
export const useCartStore = defineStore('cart', () => {
    // ...state, getters, actions...
}, {
    persist: {
        key: 'vue-cart',           // localStorage key
        paths: ['items'],           // Chỉ persist items, không persist isOpen
        storage: localStorage,      // Mặc định là localStorage
    }
})
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`defineStore('name', () => { ... return { state, getters, actions } })` — Pinia store = một Composition function có thể dùng ở mọi component.**
> **`storeToRefs(store)` để destructure state/getters mà giữ reactivity. Actions thì destructure bình thường.**

---

## 5. 🏭 Real-world Layer

### Store kết hợp với Vue Router guard

```javascript
// router/index.js — Dùng Pinia trong navigation guard
import { useAuthStore } from '@/stores/authStore'

router.beforeEach(async (to, from, next) => {
    // Phải gọi useStore() bên trong guard (sau pinia được install)
    const authStore = useAuthStore()

    // Auto-refresh token khi app load
    if (authStore.token && !authStore.user) {
        await authStore.fetchProfile()
    }

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (to.meta.adminOnly && !authStore.isAdmin) {
        next({ name: 'home' })
    } else {
        next()
    }
})
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Cart Store hoàn chỉnh (25 phút)

```bash
npm install pinia pinia-plugin-persistedstate
```

Tạo `src/stores/cartStore.js` với:
1. State: `items[]`, `couponCode`
2. Getters: `totalItems`, `totalPrice`, `discount` (SAVE20 = 20%)
3. Actions: `addItem`, `removeItem`, `updateQty`, `applyCoupon`, `clearCart`
4. Persist: chỉ `items` và `couponCode`

Dùng trong:
- `Navbar.vue`: hiển thị `totalItems` badge
- `ProductCard.vue`: nút "Thêm vào giỏ" gọi `addItem`
- `CartView.vue`: hiển thị items, cho phép `updateQty`, `removeItem`, input coupon

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Destructure store = mất reactivity"** | Đúng với state/getters. `const { items } = store` → `items` không reactive. Dùng `storeToRefs(store)`. Nhưng actions thì destructure bình thường OK |
| **"Pinia store phải return tất cả state"** | Chỉ return những gì muốn public. Internal variables không return → private (không accessible từ ngoài store) |
| **"Mọi state đều phải vào Pinia"** | Chỉ state **shared** giữa nhiều components. Form input, dropdown open state, local animation flags → nên ở `useState` của chính component đó |
| **"Pinia và localStorage tự sync"** | Không — cần `pinia-plugin-persistedstate` hoặc tự viết `watch`. Mặc định mọi state mất khi F5 |
| **"Chỉ cần 1 store cho toàn app"** | Không — best practice là **nhiều stores nhỏ** theo domain: `cartStore`, `authStore`, `productStore`. Dễ maintain hơn 1 store khổng lồ |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Pinia dùng Composition API — giải thích mối liên hệ: `ref()` = state, `computed()` = getters, functions = actions.
2. Tại sao cần `storeToRefs()` khi destructure Pinia state?
3. `persist: { paths: ['items'] }` làm gì? Tại sao không persist toàn bộ store?

### Câu hỏi áp dụng:

4. Cart có `couponCode` state. Tạo getter `discountAmount` tính toán: `'SAVE10'` = 10%, `'SAVE20'` = 20%, khác = 0. Viết code.
5. Trong `authStore`, sau khi `logout()`, muốn `cartStore` cũng clear. Nhưng store không nên import nhau. Giải pháp đúng ở đâu?

<details>
<summary>👁️ Xem đáp án</summary>

1. `ref()` trong Pinia store = state (reactive, thay đổi qua actions). `computed(() => ...)` = getters (tự tính lại khi dependency thay đổi). Functions = actions (thay đổi state, có thể async). Cú pháp giống Composition API trong component — đây là điểm mạnh: không học API mới.
2. `const { items } = store` → JavaScript destructure thường → `items` là plain value tại thời điểm destructure, không reactive. Khi store thay đổi, `items` không cập nhật. `storeToRefs(store)` → `items` là `Ref` object → reactive → template/watchers theo dõi được.
3. `paths: ['items']` = chỉ save `items` array vào localStorage, bỏ qua các state khác (ví dụ `isOpen`, `error`). Lý do không persist toàn bộ: (1) `isOpen` nên luôn false khi reload. (2) `error` không cần persist. (3) Giảm dung lượng localStorage.
4. ```javascript const discountAmount = computed(() => { const rates = { 'SAVE10': 0.10, 'SAVE20': 0.20 } const rate = rates[couponCode.value] ?? 0 return subtotal.value * rate })
   ```
5. Xử lý ở **component** (Navbar) hoặc **composable**: ```javascript function handleLogout() { authStore.logout() cartStore.clearCart() // Component biết cần clear cả 2 router.push('/') } ``` Store không nên import nhau (circular dependency, khó test). Nếu cần cross-store action, dùng composable trung gian `useLogout()` gọi cả 2 stores.

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Store is not defined` hoặc `useStore is not a function` | Gọi store ngoài `<script setup>` hoặc thiếu `defineStore` return | Đảm bảo `useXxxStore()` được gọi bên trong setup; kiểm tra `return { ... }` trong defineStore |
| State mất reactivity khi destructure | Dùng `const { items } = store` thay vì `storeToRefs` | Dùng `const { items } = storeToRefs(store)` cho state/getters; `const { addItem } = store` cho actions |
| `storeToRefs is not defined` | Quên import `storeToRefs` từ `pinia` | Thêm `import { storeToRefs } from 'pinia'` |
| Pinia state không persist qua F5 | Chưa cài `pinia-plugin-persistedstate` hoặc thiếu option `persist` | `npm i pinia-plugin-persistedstate`, thêm `persist: { paths: ['key'] }` vào defineStore |
| `Cannot read properties of null (reading 'install')` | Quên `app.use(createPinia())` trước `app.mount()` | Đảm bảo `createPinia()` được use trước router và mount |
| Getter trả về `undefined` | Getter tham chiếu `this.xxx` nhưng state chưa được khởi tạo | Kiểm tra giá trị mặc định trong `ref()` / `reactive()`; kiểm tra getter logic |

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`defineStore('name', () => { return { ... } })`** = Composition-style Pinia store. Không mutations, không boilerplate
2. **`storeToRefs(store)`** = destructure state/getters mà giữ reactivity. Actions destructure thường
3. **Multiple stores** = best practice. 1 domain = 1 store. `cartStore`, `authStore`, `productStore`
4. **Async actions** = async functions trong store. Tự quản lý `isLoading`, `error` trong store
5. **`pinia-plugin-persistedstate`** = 1 dòng config → state persist qua F5. `paths` để chỉ persist cần thiết

---

## 10. ➡️ Next Lesson Bridge

*"Vue Router + Pinia = full SPA," Minh nói. "Còn Angular? Công ty tôi intern dùng Angular."*

*"Angular = full opinionated framework — TypeScript bắt buộc, DI system, RxJS. Learning curve dốc hơn Vue/React. Nhưng structure rõ ràng, tốt cho team lớn."*

**→ [Angular Module](../../angular/01_getting_started/) — Component, Service, DI, RxJS: enterprise-grade framework từ Google.**
