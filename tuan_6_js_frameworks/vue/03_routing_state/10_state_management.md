# 🟢 MODULE 3 - BÀI 10
# **STATE MANAGEMENT VỚI PINIA**

## 🎬 "Vuex Dài 100 Dòng. Pinia Chỉ 20" — State Management Thế Hệ Mới

*Minh dùng Vuex: mutations, actions, getters, modules — 100 dòng cho 1 counter. Anh Hùng: "Pinia = Vuex 5 nhưng đơn giản hơn 80%. Không cần mutations. TypeScript tự động. Composition API style. Vue team chính thức khuyên dùng Pinia thay Vuex."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu tại sao cần state management
- Setup Pinia trong project
- Tạo và sử dụng stores
- Quản lý state phức tạp với Pinia
- Sử dụng getters và actions

---

## 1. **SETUP PINIA**

### 1.1. Cài đặt

```bash
npm install pinia
```

### 1.2. Setup trong app

**src/main.js:**
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

---

## 2. **TẠO STORE**

**src/stores/counter.js:**
```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = 0
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
})
```

---

## 3. **SỬ DỤNG STORE**

```vue
<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">+</button>
    <button @click="counterStore.decrement">-</button>
    <button @click="counterStore.reset">Reset</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>
```

---

## 4. **VÍ DỤ: CART STORE**

**src/stores/cart.js:**
```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
  })
  
  function addItem(product) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }
  
  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }
  
  function clearCart() {
    items.value = []
  }
  
  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart
  }
})
```

**Sử dụng:**
```vue
<template>
  <div>
    <div v-for="item in cartStore.items" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>Quantity: {{ item.quantity }}</p>
      <p>Price: ${{ item.price }}</p>
      <button @click="cartStore.removeItem(item.id)">Remove</button>
    </div>
    <p>Total Items: {{ cartStore.totalItems }}</p>
    <p>Total Price: ${{ cartStore.totalPrice }}</p>
    <button @click="cartStore.clearCart">Clear Cart</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function addToCart(product) {
  cartStore.addItem(product)
}
</script>
```

---

## 5. **PERSIST STATE (LƯU STATE VÀO LOCALSTORAGE)**

Để lưu state vào localStorage:

**src/stores/cart.js:**
```javascript
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Load từ localStorage nếu có
  const items = ref(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )

  // Watch và save vào localStorage
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
  })

  function addItem(product) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart
  }
})
```

---

## 6. **MULTIPLE STORES**

Bạn có thể tạo nhiều stores cho các mục đích khác nhau:

**src/stores/user.js:**
```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  function login(credentials) {
    // API call...
    user.value = {
      id: 1,
      name: 'Khoa',
      email: 'khoa@example.com'
    }
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
})
```

**Sử dụng nhiều stores:**
```vue
<script setup>
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()

// Có thể sử dụng cả hai stores
function checkout() {
  if (userStore.isAuthenticated) {
    // Process checkout...
  } else {
    // Redirect to login
  }
}
</script>
```

---

## 7. **TỔNG KẾT**

- ✅ **Pinia** là state management library chính thức của Vue 3
- ✅ Setup Pinia với `createPinia()`
- ✅ Tạo stores với `defineStore`
- ✅ Sử dụng `ref`, `computed` trong stores
- ✅ Actions để mutate state
- ✅ Persist state vào localStorage
- ✅ Có thể tạo nhiều stores cho các mục đích khác nhau

---

**Bài tiếp theo:** [11. Advanced JavaScript](./11_advanced_javascript.md) - ES6+ features trong Vue.
