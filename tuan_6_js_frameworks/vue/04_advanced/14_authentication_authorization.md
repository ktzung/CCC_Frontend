# 🟢 MODULE 4 - BÀI 14
# **AUTHENTICATION & AUTHORIZATION**

## 🎬 "User Gõ /admin Thẳng Vào URL — Chặn Hay Cho Vào?" — Auth & Guards

*Minh: "Login xong, lưu token ở đâu? localStorage hay cookie?" Chị Hà: "JWT trong httpOnly cookie (an toàn nhất). Route guard `beforeEach()` kiểm tra token trước mỗi navigation. Pinia store lưu user info. Axios interceptor gắn token vào mọi request. Đây là auth PRODUCTION-READY."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Implement login/logout
- Protect routes với route guards
- Manage user session
- Handle permissions

---

## 1. **AUTH STORE**

**src/stores/auth.js:**
```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  
  function login(credentials) {
    // API call...
    token.value = 'jwt-token'
    localStorage.setItem('token', token.value)
  }
  
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }
  
  const isAuthenticated = computed(() => !!token.value)
  
  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  }
})
```

---

## 2. **ROUTE GUARDS**

**router/index.js:**
```javascript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

---

**Bài tiếp theo:** [15. Testing & Deployment](./15_testing_deployment.md) - Testing và deploy Vue app.
