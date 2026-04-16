# 🟢 MODULE 4 - BÀI 12
# **API INTEGRATION**

## 🎬 "fetch() Xong Rồi Sao? Loading, Error, Retry..." — API Integration Thực Tế

*Minh fetch API: data hiển thị. Done? Không. Loading spinner? Error message? Retry button? Cancel khi unmount? Anh Hùng: "Axios + Composable = `useFetch()` custom hook. 1 lần viết → mọi component dùng lại. Loading, error, data — tất cả trong 1 composable."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng Fetch API trong Vue
- Xử lý loading và error states
- Tạo API service layer
- Sử dụng axios (optional)

---

## 1. **FETCH API**

```vue
<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://api.example.com/users')
    
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    
    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
```

---

## 2. **API SERVICE LAYER**

**src/services/api.js:**
```javascript
const API_BASE_URL = 'https://api.example.com'

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`)
  return response.json()
}

export async function getUser(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  return response.json()
}

export async function createUser(userData) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  return response.json()
}
```

**Sử dụng:**
```vue
<script setup>
import { getUsers, createUser } from '@/services/api'

const users = ref([])

async function loadUsers() {
  users.value = await getUsers()
}
</script>
```

---

**Bài tiếp theo:** [13. Form Handling](./13_form_handling.md) - Xây dựng forms với validation.
