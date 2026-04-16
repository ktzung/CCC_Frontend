# 🟢 MODULE 3 - BÀI 09
# **VUE ROUTER - ROUTING**

## 🎬 "SPA Chỉ Có 1 File HTML — Vậy /about Lấy Từ Đâu?" — Client-Side Routing

*Minh: "Vue app chỉ có index.html. Vậy khi gõ /products, server lấy file nào?" Anh Hùng: "Không có file nào cả. JavaScript GIẢ LẬP URL bằng History API. Vue Router = bộ não điều phối: URL thay đổi → đổi component, browser KHÔNG hỏi server."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Setup Vue Router trong project
- Tạo routes và navigation
- Sử dụng dynamic routes và route params
- Implement nested routes
- Sử dụng route guards
- Lazy load routes

---

## 1. **SETUP VUE ROUTER**

### 1.1. Cài đặt

```bash
npm install vue-router@4
```

### 1.2. Tạo router

**src/router/index.js:**
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 1.3. Sử dụng router trong app

**src/main.js:**
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

**src/App.vue:**
```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
```

---

## 2. **NAVIGATION**

### 2.1. router-link

```vue
<template>
  <nav>
    <!-- Basic link -->
    <router-link to="/">Home</router-link>
    
    <!-- Named route -->
    <router-link :to="{ name: 'About' }">About</router-link>
    
    <!-- With params -->
    <router-link :to="{ name: 'User', params: { id: 123 } }">
      User Profile
    </router-link>
    
    <!-- Active class -->
    <router-link 
      to="/about" 
      active-class="active-link"
      exact-active-class="exact-active"
    >
      About
    </router-link>
  </nav>
</template>
```

### 2.2. Programmatic navigation

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome() {
  router.push('/')
}

function goToAbout() {
  router.push({ name: 'About' })
}

function goBack() {
  router.go(-1) // Go back
}

function goForward() {
  router.go(1) // Go forward
}
</script>
```

---

## 3. **DYNAMIC ROUTES**

### 3.1. Route params

**router/index.js:**
```javascript
{
  path: '/user/:id',
  name: 'User',
  component: () => import('../views/User.vue')
}
```

**User.vue:**
```vue
<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ userId }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id
</script>
```

### 3.2. Multiple params

```javascript
{
  path: '/user/:userId/post/:postId',
  component: Post
}
```

### 3.3. Optional params

```javascript
{
  path: '/user/:id?', // ? makes it optional
  component: User
}
```

---

## 4. **NESTED ROUTES**

**router/index.js:**
```javascript
{
  path: '/user/:id',
  component: UserLayout,
  children: [
    {
      path: '',
      component: UserProfile
    },
    {
      path: 'posts',
      component: UserPosts
    },
    {
      path: 'settings',
      component: UserSettings
    }
  ]
}
```

**UserLayout.vue:**
```vue
<template>
  <div class="user-layout">
    <nav>
      <router-link :to="`/user/${userId}`">Profile</router-link>
      <router-link :to="`/user/${userId}/posts`">Posts</router-link>
      <router-link :to="`/user/${userId}/settings`">Settings</router-link>
    </nav>
    <router-view />
  </div>
</template>
```

---

## 5. **ROUTE GUARDS**

### 5.1. Before enter guard

```javascript
{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from, next) => {
    const isAdmin = checkAdmin()
    if (isAdmin) {
      next()
    } else {
      next('/login')
    }
  }
}
```

### 5.2. Navigation guards

**router/index.js:**
```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

---

## 6. **LAZY LOADING**

Lazy loading giúp giảm bundle size ban đầu bằng cách chỉ load component khi cần:

```javascript
{
  path: '/about',
  component: () => import('../views/About.vue') // Lazy load
}
```

**Lợi ích:**
- Giảm initial bundle size
- Tải nhanh hơn lần đầu
- Chỉ load code khi user truy cập route

**Ví dụ:**
```javascript
const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/products',
    component: () => import('../views/Products.vue')
  }
]
```

---

## 7. **QUERY PARAMETERS**

Lấy query parameters từ URL:

```vue
<template>
  <div>
    <p>Search: {{ searchQuery }}</p>
    <p>Page: {{ currentPage }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = route.query.q || ''
const currentPage = route.query.page || '1'
</script>
```

**Navigation với query params:**
```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function search(query) {
  router.push({
    path: '/search',
    query: { q: query, page: 1 }
  })
}
</script>
```

---

## 8. **VÍ DỤ TỔNG HỢP: E-COMMERCE APP**

**router/index.js:**
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    props: true // Pass params as props
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
```

**App.vue:**
```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <button v-else @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token')
})

function logout() {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  router.push('/')
}
</script>
```

---

## 9. **TỔNG KẾT**

- ✅ **Vue Router** giúp tạo SPA với client-side routing
- ✅ Setup router với `createRouter` và `createWebHistory`
- ✅ Sử dụng `router-link` và `router-view` để navigation
- ✅ Dynamic routes với `:param`
- ✅ Nested routes với `children`
- ✅ Route guards để protect routes
- ✅ Lazy loading để optimize performance
- ✅ Query parameters cho search và filters

---

**Bài tiếp theo:** [10. State Management](./10_state_management.md) - Học Pinia để quản lý state trong Vue app.
