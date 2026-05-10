# 🟢 TUẦN 6 - BÀI 14 (VUE.JS)
# **AUTHENTICATION & AUTHORIZATION — Bảo Mật Ứng Dụng**

---

## 0. 🎬 Opening Hook

*"Minh gõ trực tiếp URL `/admin` trên trình duyệt và... anh ấy vào được trang quản trị."*

*"Tại sao?" Minh hỏi. "Em đã giấu cái nút đi rồi mà?"*

*Anh Hùng: "Giấu UI bằng `v-if` không phải là bảo mật. Bất kỳ ai cũng có thể gõ URL trực tiếp. Em cần **Route Guards** để chặn cấp Router. Em cần **Axios Interceptor** để gắn Token vào mỗi API. Và em cần **Backend** từ chối request nếu Token sai. Đó là hệ thống Auth hoàn chỉnh."*

---

## 1. 🎯 Why This Matters

Không ứng dụng thực tế nào không có Auth:
- **Authentication (Xác thực)**: Bạn là ai? (Login → Cấp JWT Token).
- **Authorization (Phân quyền)**: Bạn được làm gì? (Role-based access: Admin vs User).
- **Session**: Duy trì trạng thái đăng nhập qua refresh load (Local Storage / HttpOnly Cookies).

---

## 2. 🌐 Big Picture — The JWT Auth Flow

```
1. USER LOGIN    → Post email/password
2. SERVER        → Validate → Trả về JWT Token
3. PINIA STORE   → Lưu Token + User Info (bộ nhớ tạm)
4. LOCAL STORAGE → Lưu Token (để sống sót khi F5 reload)
5. AXIOS INTERCEPTOR → Tự động lấy Token gắn vào Header mọi Request gửi đi
6. ROUTE GUARD   → Kiểm tra (Nếu cố vào /admin mà không có token → đá về /login)
```

---

## 3. ⚙️ Core Technical Truth

### Bước 1: Auth Store (Pinia) — Quản lý State

```javascript
// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api' // Axios instance

export const useAuthStore = defineStore('auth', () => {
    // STATE
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    const router = useRouter()

    // GETTERS
    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    // ACTIONS
    async function login(credentials) {
        try {
            const res = await api.post('/auth/login', credentials)
            
            // Lưu data vào State
            token.value = res.data.token
            user.value = res.data.user
            
            // Lưu Token vào LocalStorage để persist
            localStorage.setItem('token', token.value)
            
            return true
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    async function fetchProfile() {
        if (!token.value) return
        try {
            // Lấy profile user bằng token hiện tại (dùng khi F5 trang)
            const res = await api.get('/auth/me')
            user.value = res.data
        } catch (error) {
            // Token hết hạn / Lỗi → Logout sạch sẽ
            logout()
        }
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        router.push('/login')
    }

    return { user, token, isAuthenticated, isAdmin, login, logout, fetchProfile }
})
```

---

### Bước 2: Route Guards (Vue Router) — Chặn Cửa

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        meta: { requiresGuest: true } // Chỉ cho người chưa login
    },
    {
        path: '/dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true } // Yêu cầu đăng nhập
    },
    {
        path: '/admin',
        component: () => import('@/views/Admin.vue'),
        meta: { requiresAuth: true, requiresAdmin: true } // Yêu cầu Admin
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// GLOBAL GUARD
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // Nếu có token nhưng chưa có user data (trường hợp F5)
    if (authStore.token && !authStore.user) {
        await authStore.fetchProfile()
    }

    const isAuth = authStore.isAuthenticated
    const isAdmin = authStore.isAdmin

    // Logic kiểm tra meta fields
    if (to.meta.requiresAuth && !isAuth) {
        // Cố vào trang private khi chưa login
        next('/login')
    } 
    else if (to.meta.requiresAdmin && !isAdmin) {
        // Có account nhưng không phải Admin cố vào /admin
        next('/dashboard') // hoặc 403 Forbidden
    }
    else if (to.meta.requiresGuest && isAuth) {
        // Đã login nhưng cố quay lại trang /login
        next('/dashboard')
    } 
    else {
        // Cho qua
        next()
    }
})

export default router
```

---

### Bước 3: Axios Interceptor — Người Đưa Thư Tận Tụy

Thay vì mỗi hàm fetch bạn phải viết: `headers: { Authorization: 'Bearer ' + token }`. Ta cấu hình 1 lần.

```javascript
// src/services/api.js
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export const api = axios.create({
    baseURL: 'https://api.example.com/v1',
    timeout: 5000
})

// REQUEST INTERCEPTOR: Gắn Token tự động vào Header
api.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// RESPONSE INTERCEPTOR: Bắt lỗi 401 tự động Logout
api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Token hết hạn (Unauthorized)
        const authStore = useAuthStore()
        authStore.logout() // Xóa state, đá về /login
    }
    return Promise.reject(error)
})
```

---

## 4. 🟢 Simplified Layer

> **Login = Gửi API → Nhận Token → Lưu Token vào LocalStorage + Pinia.**
> **Route Guard (`router.beforeEach`) = Đứng gác ở cửa. Check `to.meta.requiresAuth`, thiếu Token thì đuổi về `/login`.**
> **Axios Interceptors = Tự động nhét "Thẻ ra vào" (Token) vào mọi túi hàng (Requests) gửi đi.**

---

## 5. 🛠️ Hands-on Practice

### Bài tập: Đóng Cửa Trang Dashboard (20 phút)

```javascript
/*
1. Cấu hình route `/profile` có `meta: { requiresAuth: true }`.
2. Tạo Global Guard `router.beforeEach`, kiểm tra localStorage.getItem('token').
3. Chặn và redirect về `/login` nếu token rỗng.
4. Ở trang /login, giả lập đăng nhập: setItem 'token' bằng chuỗi bất kỳ rồi push sang `/profile`.
5. F5 trang /profile để xem Guard hoạt động thế nào.
*/
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Route Guard là để bảo mật data"** | Route Guard chỉ là **UX** (trải nghiệm người dùng), chặn họ thấy UI không cần thiết. Hacker vẫn có thể cào API của bạn. **Backend Auth mới là Bảo Mật thực sự.** |
| **"Bảo mật Token bằng cách mã hóa nó dưới LocalStorage"** | Vô ích. LocalStorage đọc được bằng JS (XSS attack). Giải pháp Enterprise thực sự là trả Token về qua **HttpOnly Cookies** (JS không đọc được). Nếu dùng LocalStorage, phải cẩn thận XSS. |
| **"Xóa token ở client là đủ để Logout"** | Đó là Soft-logout. Để an toàn, Backend cũng cần 1 API `/logout` để hủy (blacklist) Token đó, đề phòng ai đó đã copy Token trước khi bạn ấn Logout. |

---

## 7. ✅ Checkpoint

1. LocalStorage dùng để giải quyết vấn đề gì của Pinia Store trong Auth?
2. Chức năng chính của Request Interceptor trong Axios là gì?
3. Khi API trả về HTTP Status 401, Interceptor Response nên làm hành động gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. Sự bền bỉ (Persistence). Pinia State nằm trong RAM, F5 trình duyệt là mất trắng. LocalStorage lưu trên ổ cứng, giúp F5 xong app vẫn lấy được Token để tự động đăng nhập lại.
2. Tự động đính kèm thông tin chứng thực (thường là Bearer Token) vào Headers của toàn bộ requests gọi ra ngoài, giúp developer không cần gõ thủ công cho từng API call.
3. 401 là Unauthorized (token sai, hết hạn). Action nên làm: Trigger hàm `logout()` (xóa token ở LocalStorage + Pinia) và ép User redirect về trang `/login`.

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `401 Unauthorized` ngay sau login | Token sai format hoặc thiếu `Bearer ` prefix | Đảm bảo `Authorization: \`Bearer ${token}\`` — có khoảng trắng sau "Bearer" |
| User bị đá về `/login` khi F5 dù đã login | Token chỉ lưu trong Pinia state (RAM), không persist | Lưu token vào `localStorage`, đọc lại trong auth store init |
| Route guard chặn mãi, không redirect | `next()` không được gọi hoặc logic guard bị loop | Kiểm tra: nếu đã login → `next()`, nếu chưa → `next('/login')`, không return undefined |
| Axios interceptor không gửi token | Gọi `useAuthStore()` ngoài setup context (global interceptor) | Dùng lazy init: `const authStore = useAuthStore()` bên trong interceptor callback, không phải ngoài cùng |
| `jwt-decode` trả về `undefined` | Token expired hoặc format không đúng JWT (3 phần ngăn cách bởi `.`) | Kiểm tra token có 3 phần `header.payload.signature`; dùng try/catch khi decode |
| Logout nhưng vẫn truy cập được trang protected | Chỉ xóa state mà không xóa `localStorage` | Gọi `localStorage.removeItem('token')` trong action `logout()` |

---

## 8. 📌 Summary

1. **Pinia Auth Store**: Trung tâm quản lý User State và các action login/logout.
2. **Local Storage**: Lưu trữ Token dài hạn để sống sót qua các lần F5 reload.
3. **Route Meta Fields**: Đánh dấu các Route cần bảo vệ (`requiresAuth`).
4. **Navigation Guards (`beforeEach`)**: Người gác cổng của Vue Router.
5. **Axios Interceptors**: Middleware tự động chặn Requests (gắn token) và Responses (xử lý 401).

**→ [Bài 15: Testing & Deployment](./15_testing_deployment.md) — Viết Unit Test với Vitest và Deploy dự án ra môi trường thực.**
