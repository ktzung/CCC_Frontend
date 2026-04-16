# 🟢 MODULE 3 - BÀI 11
# **ADVANCED JAVASCRIPT (ES6+)**

## 🎬 "Arrow, Destructuring, Async/Await — JavaScript Hiện Đại" — Ngôn Ngữ Vue Nói

*Minh đọc Vue 3 code: `const { ref, computed } = await import('vue')`. "Destructuring? Arrow? Async?" Anh Hùng: "Vue 3 viết bằng ES6+. Không biết ES6+ = đọc Vue như đọc tiếng Pháp. 6 tính năng cần nắm: arrow functions, destructuring, spread, template literals, async/await, modules."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng arrow functions
- Destructuring objects và arrays
- Spread và rest operators
- Template literals
- Promises và async/await
- Modules (import/export)

---

## 1. **ARROW FUNCTIONS**

```javascript
// Traditional function
function add(a, b) {
  return a + b
}

// Arrow function
const add = (a, b) => a + b

// Trong Vue
const handleClick = () => {
  console.log('Clicked')
}

// Với parameters
const greet = (name) => {
  return `Hello, ${name}!`
}
```

---

## 2. **DESTRUCTURING**

```javascript
// Object destructuring
const user = { name: 'Khoa', age: 25 }
const { name, age } = user

// Array destructuring
const [first, second] = [1, 2, 3]

// Trong Vue props
defineProps({
  name: String,
  age: Number
})

// Sử dụng
const props = defineProps({ name: String, age: Number })
const { name, age } = props
```

---

## 3. **SPREAD & REST**

```javascript
// Spread operator
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5] // [1, 2, 3, 4, 5]

// Rest operator
const [first, ...rest] = [1, 2, 3, 4]
// first = 1, rest = [2, 3, 4]
```

---

## 4. **TEMPLATE LITERALS**

```javascript
const name = 'Khoa'
const message = `Hello, ${name}!`
```

---

## 5. **ASYNC/AWAIT**

Async/await giúp xử lý Promises dễ đọc hơn:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchData() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('/api/data')
    
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    
    data.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
```

**Ví dụ với multiple async calls:**
```vue
<script setup>
async function fetchAllData() {
  try {
    // Parallel requests
    const [users, products, orders] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
      fetch('/api/orders').then(r => r.json())
    ])
    
    return { users, products, orders }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>
```

---

## 6. **MODULES (IMPORT/EXPORT)**

### 6.1. Named exports

```javascript
// utils.js
export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
```

```javascript
// Import
import { formatPrice, formatDate } from './utils'
```

### 6.2. Default export

```javascript
// UserService.js
export default class UserService {
  getUsers() {
    // ...
  }
}
```

```javascript
// Import
import UserService from './UserService'
```

### 6.3. Mixed exports

```javascript
// api.js
export const API_URL = 'https://api.example.com'

export function getUsers() {
  // ...
}

export default {
  getUsers,
  createUser
}
```

---

## 7. **VÍ DỤ TỔNG HỢP**

```vue
<template>
  <div>
    <input 
      v-model.trim="searchQuery"
      @input="debouncedSearch"
      placeholder="Search users..."
    />
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div 
        v-for="user in filteredUsers" 
        :key="user.id"
        class="user-card"
      >
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const users = ref([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref(null)

// Computed với destructuring
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  return users.value.filter(user => {
    const { name, email } = user
    const query = searchQuery.value.toLowerCase()
    return name.toLowerCase().includes(query) || 
           email.toLowerCase().includes(query)
  })
})

// Async function với try/catch
async function fetchUsers() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://api.example.com/users')
    if (!response.ok) throw new Error('Failed to fetch')
    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Debounce với arrow function
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    // Search logic
  }, 300)
}

onMounted(() => {
  fetchUsers()
})
</script>
```

---

## 8. **TỔNG KẾT**

- ✅ **Arrow functions** cho syntax ngắn gọn
- ✅ **Destructuring** để extract values từ objects/arrays
- ✅ **Spread/Rest** operators cho arrays và objects
- ✅ **Template literals** cho string interpolation
- ✅ **Async/await** cho async operations dễ đọc
- ✅ **Modules** (import/export) để tổ chức code
- ✅ Kết hợp các features để code hiệu quả hơn

---

**Bài tiếp theo:** [12. API Integration](../04_advanced/12_api_integration.md) - Kết nối với REST APIs.
