# 🟢 TUẦN 6 - BÀI 09 (VUE.JS)
# **VUE ROUTER — Client-Side Navigation**

---

## 0. 🎬 Opening Hook

*Minh gõ `/products` vào URL của Vue app. Browser báo 404.*

*"Tại sao? App đang chạy trên localhost:5173 mà."*

*"Vì server không có file `/products`. Chỉ có `index.html`. Vue Router phải được config để server serve `index.html` cho mọi URL, rồi Vue Router xử lý phần còn lại."*

*"Nhưng khi deploy lên Netlify thì?" Minh hỏi.*

*"Netlify tự detect Vue/Vite. Các server khác → cần thêm redirect rule: `/* → /index.html`. Đó là cái giá phải trả cho SPA routing."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Vue Router = navigation system của mọi Vue SPA:
- **`<router-link>`** thay `<a href>` → không reload trang
- **`<router-view>`** → render component tương ứng URL
- **`useRoute`** → đọc URL params, query, path
- **`useRouter`** → navigate programmatically
- **Navigation Guards** → auth protection

---

## 2. 🌐 Big Picture — Vue Router Architecture

```
Browser URL                Router                 Component rendered
─────────────────          ──────────────         ──────────────────
localhost/                 → path: "/"         →  HomeView.vue
localhost/products         → path: "/products" →  ProductsView.vue
localhost/products/42      → path: "/products/:id" → ProductDetailView.vue
localhost/dashboard/orders → Nested route      →  DashboardLayout + OrdersView

SERVER REALITY:
Mọi URL → Server trả index.html → Vue Router render đúng component

NAVIGATION GUARD FLOW:
User navigate → router.beforeEach() → check auth →
  Cho phép → load component
  Từ chối → redirect /login?redirect=/protected-url
```

---

## 3. ⚙️ Core Technical Truth

### Setup Vue Router

```bash
# Đã có nếu chọn Router khi `npm create vue@latest`
# Cài thủ công:
npm install vue-router@4
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Eager imports (cho routes hay dùng)
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Public routes
        {
            path: '/',
            name: 'home',
            component: HomeView,  // Eager load
        },
        {
            path: '/products',
            name: 'products',
            // Lazy load — chỉ download khi user đến trang này
            component: () => import('@/views/ProductsView.vue'),
        },
        {
            path: '/products/:productId',  // Dynamic segment
            name: 'product-detail',
            component: () => import('@/views/ProductDetailView.vue'),
            props: true,  // Pass params như props vào component
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/SearchView.vue'),
            // /search?q=iphone&page=2
        },

        // Protected routes — cần đăng nhập
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/views/CartView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: () => import('@/views/CheckoutView.vue'),
            meta: { requiresAuth: true },
        },

        // Nested routes — Dashboard với sidebar
        {
            path: '/dashboard',
            component: () => import('@/views/DashboardLayout.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',           // /dashboard
                    name: 'dashboard',
                    component: () => import('@/views/DashboardHome.vue'),
                },
                {
                    path: 'orders',     // /dashboard/orders
                    name: 'orders',
                    component: () => import('@/views/OrdersView.vue'),
                },
                {
                    path: 'settings',   // /dashboard/settings
                    name: 'settings',
                    component: () => import('@/views/SettingsView.vue'),
                },
            ],
        },

        // Auth
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { guestOnly: true }, // Redirect nếu đã đăng nhập
        },

        // 404
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],

    // Scroll về đầu trang khi navigate
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition  // Back button → restore position
        if (to.hash) return { el: to.hash }       // Anchor link
        return { top: 0 }                          // Scroll to top
    },
})

// ============================
// NAVIGATION GUARDS
// ============================
router.beforeEach(async (to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')
    const requiresAuth = to.meta.requiresAuth
    const guestOnly = to.meta.guestOnly

    if (requiresAuth && !isAuthenticated) {
        // Lưu intended URL → redirect sau khi login
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (guestOnly && isAuthenticated) {
        // Đã login → không cho vào /login
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router
```

---

### Template Navigation

```vue
<!-- App.vue -->
<template>
    <header class="navbar">
        <!-- router-link = <a> nhưng không reload trang -->
        <RouterLink to="/" class="logo">🛒 Shop</RouterLink>

        <nav>
            <!-- Basic link -->
            <RouterLink to="/products">Sản phẩm</RouterLink>

            <!-- Named route (tốt hơn hard-coded paths) -->
            <RouterLink :to="{ name: 'search', query: { q: '' } }">Tìm kiếm</RouterLink>

            <!-- Active class tự động: router-link-active, router-link-exact-active -->
            <!-- Custom active class -->
            <RouterLink
                to="/cart"
                active-class="nav-active"
                exact-active-class="nav-exact-active"
            >
                🛒 Giỏ hàng
                <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
            </RouterLink>
        </nav>
    </header>

    <!-- Router view = nơi render component của route hiện tại -->
    <main>
        <RouterView v-slot="{ Component }">
            <!-- Transition giữa các routes -->
            <Transition name="fade" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { totalItems: cartCount } = storeToRefs(cartStore)
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

---

### useRoute & useRouter Composables

```vue
<!-- ProductDetailView.vue — Route params & programmatic navigation -->
<template>
    <div v-if="isLoading">⏳ Đang tải...</div>
    <div v-else-if="error">❌ {{ error }}</div>
    <div v-else-if="product">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>

        <!-- Query params trong URL: /products/42?color=red&size=L -->
        <p>Màu đã chọn: {{ selectedColor }}</p>
        <p>Cỡ đã chọn: {{ selectedSize }}</p>

        <button @click="addToCartAndNavigate">Thêm vào giỏ → Đến giỏ hàng</button>
        <button @click="router.back()">← Quay lại</button>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// useRoute = đọc thông tin URL hiện tại
const route = useRoute()
const router = useRouter()

// Params: /products/:productId → route.params.productId
const productId = computed(() => route.params.productId)

// Query: /products/42?color=red&size=L → route.query.color
const selectedColor = computed(() => route.query.color ?? 'Mặc định')
const selectedSize = computed(() => route.query.size ?? 'M')

const product = ref(null)
const isLoading = ref(false)
const error = ref(null)

async function fetchProduct(id) {
    isLoading.value = true
    error.value = null
    try {
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) throw new Error('Không tìm thấy sản phẩm')
        product.value = await res.json()
    } catch (err) {
        error.value = err.message
    } finally {
        isLoading.value = false
    }
}

// Watch params thay đổi (khi navigate /products/42 → /products/43)
watch(productId, (newId) => fetchProduct(newId), { immediate: true })

function addToCartAndNavigate() {
    // Programmatic navigation
    router.push({ name: 'cart' })

    // Hoặc với object:
    // router.push({ path: '/cart' })
    // router.push({ name: 'product-detail', params: { productId: 43 } })
    // router.push({ name: 'search', query: { q: 'iphone', page: 2 } })
    // router.replace({ name: 'home' })  // replace: không lưu history
    // router.back()                      // Tương đương browser back button
    // router.go(-2)                      // Back 2 bước
}
</script>
```

---

### Nested Routes với Outlet (router-view)

```vue
<!-- DashboardLayout.vue — Layout wrapper cho nested routes -->
<template>
    <div class="dashboard">
        <aside class="sidebar">
            <h3>Dashboard</h3>
            <nav>
                <!-- Nested route links -->
                <RouterLink :to="{ name: 'dashboard' }">📊 Tổng quan</RouterLink>
                <RouterLink :to="{ name: 'orders' }">📦 Đơn hàng</RouterLink>
                <RouterLink :to="{ name: 'settings' }">⚙️ Cài đặt</RouterLink>
            </nav>
        </aside>

        <main class="dashboard-content">
            <!-- Nested component render ở đây -->
            <RouterView />
        </main>
    </div>
</template>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`<RouterLink to>` thay `<a href>`. `<RouterView />` = nơi hiện component. `useRoute()` đọc URL. `useRouter()` điều hướng bằng code.**
> **`meta: { requiresAuth: true }` + `router.beforeEach()` = auth guard. Lưu `to.fullPath` trong query để redirect đúng sau login.**

---

## 5. 🏭 Real-world Layer

### Login với redirect về intended URL

```vue
<!-- LoginView.vue -->
<template>
    <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Mật khẩu" />
        <button :disabled="isLoading" type="submit">
            {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

// URL đích sau khi login: /login?redirect=/checkout
const redirectPath = route.query.redirect ?? '/'

async function handleLogin() {
    isLoading.value = true
    error.value = ''
    try {
        await auth.login({ email: email.value, password: password.value })
        router.replace(redirectPath)  // Về /checkout, không về /home
    } catch (err) {
        error.value = 'Email hoặc mật khẩu không đúng'
    } finally {
        isLoading.value = false
    }
}
</script>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Setup Router cho Mini Shop (20 phút)

```javascript
// Tạo router với các routes sau:
// / → HomeView
// /products → ProductsView (có query: ?category=phone)
// /products/:id → ProductDetailView
// /cart → CartView (protected: requiresAuth)
// /login → LoginView

// Thêm navigation guard:
// - requiresAuth route + chưa login → redirect /login?redirect=...
// - Đã login + truy cập /login → redirect /

// Trong ProductDetailView: dùng useRoute để đọc :id, fetch product
// Thêm <button @click="router.back()">← Quay lại</button>
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Router tự xử lý 404 trên server"** | Không — Vue Router chỉ handle URLs trong browser. Server cần config để trả `index.html` cho mọi URL (Nginx: `try_files $uri /index.html`). Netlify/Vercel tự handle. Nếu deploy sai → F5 trên `/products` = 404 |
| **"Lazy loading làm app chậm"** | Ngược lại — Lazy loading giảm **initial bundle size** → app load nhanh hơn lần đầu. Trade-off: lần đầu navigate đến route đó sẽ có delay nhỏ để download chunk. Với HTTP/2 và caching, gần như không notice được |
| **"`router.push` và `router.replace` như nhau"** | Khác về history: `push` → thêm entry vào history (Back button hoạt động). `replace` → thay entry hiện tại (Back button về trang trước trước nữa). Dùng `replace` sau login/logout để không Back được về login page |
| **"`props: true` truyền tất cả route data như props"** | Chỉ truyền `params` (không phải `query`). `/products/:id?color=red` với `props: true` → component nhận `id` prop nhưng không nhận `color` (cần `useRoute().query.color`) |
| **"Navigation guard `next()` phải gọi"** | Trong Vue Router 4, có thể return value thay vì gọi `next()`: `return false` (cancel), `return '/login'` (redirect), không return = allow |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao phải dùng `<RouterLink>` thay vì `<a href>` trong Vue SPA?
2. `useRoute()` và `useRouter()` khác nhau thế nào? Dùng cái nào khi nào?
3. Tại sao deploy Vue SPA lên server cần config thêm (redirect mọi URL về index.html)?

### Câu hỏi áp dụng:

4. Route `/orders/:orderId/items/:itemId`. Trong component, lấy cả 2 params thế nào? URL là `?status=pending` thì lấy query thế nào?
5. Sau khi user xóa tài khoản thành công, redirect về `/login` và không cho Back về trang trước. Dùng method nào của `router`?

<details>
<summary>👁️ Xem đáp án</summary>

1. `<a href="/products">` = browser gửi HTTP GET đến server → nhận HTML mới → full page reload, mất Vue state, mất Pinia data, SPA bị phá vỡ. `<RouterLink to="/products">` = intercepts click, gọi `history.pushState()`, Vue Router render component mới mà không request server. `router-link-active` / `router-link-exact-active` class tự thêm cho active navigation.
2. `useRoute()` = **reactive read-only** object về route hiện tại. Dùng để **đọc**: `route.params.id`, `route.query.page`, `route.path`, `route.name`. `useRouter()` = router instance. Dùng để **điều hướng**: `router.push()`, `router.replace()`, `router.back()`.
3. Vue SPA chỉ có 1 file `index.html`. Khi user gõ `localhost/products` trực tiếp hoặc F5 → browser request file `/products` từ server. Server không có file này → 404. Cần config: Nginx `try_files`, Apache `.htaccess` redirect, Netlify `_redirects` file → mọi URL đều serve `index.html`, Vue Router parse URL và render đúng component.
4. ```javascript const route = useRoute() const { orderId, itemId } = route.params const status = route.query.status // "pending" ```
5. Dùng `router.replace('/login')` — `replace` thay thế entry trong history, không thêm mới. Sau đó Back button → về trang **trước khi** vào trang xóa tài khoản, không phải về trang xóa tài khoản (vì entry đó đã bị replace).

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `[Vue Router warn]: No match found for location "/products"` | Chưa khai báo route `/products` trong `createRouter({ routes })` | Thêm `{ path: '/products', component: ProductsView }` vào mảng `routes` |
| `Cannot read properties of undefined (reading 'params')` | Dùng `useRoute()` ngoài `<script setup>` hoặc ngoài component | Đảm bảo gọi `useRoute()` bên trong `<script setup>` của component |
| Page trắng khi navigate bằng `router.push('/path')` | Component chưa được import hoặc path sai | Kiểm tra `import` component trong router file; kiểm tra chính tả path |
| `NavigationDuplicated: Avoided redundant navigation to current location` | Gọi `router.push()` trùng URL hiện tại | Bọc trong `try/catch` hoặc dùng `router.replace()` thay vì `push()` |
| Nested route không render `<router-view>` con | Component cha thiếu `<router-view />` trong template | Thêm `<router-view />` vào template của component layout cha |
| Refresh trang → 404 trên server | Server không redirect mọi URL về `index.html` | Thêm redirect rule: `/* → /index.html` (Netlify: `_redirects`, Nginx: `try_files`) |
| `useRoute()` trả về params rỗng | Dùng `route.params.id` trước khi navigation hoàn tất | Dùng `watch(() => route.params.id, ...)` hoặc `onMounted()` để đảm bảo route ready |

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<RouterLink to>`** → không reload. **`<RouterView />`** → render component. Setup: `createRouter` + `app.use(router)`
2. **`useRoute()`** = đọc URL (params, query, path). **`useRouter()`** = navigate (push, replace, back)
3. **Lazy loading** = `component: () => import(...)` → giảm initial bundle, load khi cần
4. **Navigation Guards** = `router.beforeEach()` + `meta.requiresAuth` → auth protection. Lưu `to.fullPath` để redirect sau login
5. **Server config**: Mọi URL phải trả `index.html` (Netlify tự handle. Nginx cần `try_files`)

---

## 10. ➡️ Next Lesson Bridge

*"Router xong rồi, nhưng cart data reset mỗi lần navigate sang trang khác," Minh nói. "Cần lưu state đâu đó."*

*"Pinia — state management của Vue 3. Composition API style, TypeScript sẵn, localStorage persist chỉ cần 1 dòng config."*

**→ [Bài 10: State Management với Pinia](./10_state_management.md) — defineStore, storeToRefs, persist plugin: global state không mất khi navigate.**
