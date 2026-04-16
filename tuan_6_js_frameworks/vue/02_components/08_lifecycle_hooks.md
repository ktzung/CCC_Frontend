# 🟢 MODULE 2 - BÀI 08
# **LIFECYCLE HOOKS**

## 🎬 "Component Sinh Ra → Sống → Chết — Hook Vào Mỗi Giai Đoạn" — Lifecycle

*Minh gọi API trước khi component render → data undefined → crash. Anh Hùng: "onMounted() — gọi API SAU KHI component tồn tại trong DOM. onUnmounted() — dọn dẹp (clearInterval, unsubscribe). Hiểu lifecycle = không bao giờ gặp 'Cannot read property of undefined'."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu component lifecycle trong Vue
- Sử dụng các lifecycle hooks: `onMounted`, `onUpdated`, `onUnmounted`
- Biết khi nào dùng hook nào
- Hiểu sự khác biệt giữa Options API và Composition API hooks

---

## 1. **COMPONENT LIFECYCLE**

### 1.1. Lifecycle diagram

```
Creation Phase:
  setup() → onBeforeMount() → onMounted()

Update Phase:
  onBeforeUpdate() → onUpdated()

Destruction Phase:
  onBeforeUnmount() → onUnmounted()
```

### 1.2. Các giai đoạn

1. **Creation**: Component được tạo
2. **Mounting**: Component được thêm vào DOM
3. **Updating**: Component re-render khi data thay đổi
4. **Unmounting**: Component bị xóa khỏi DOM

---

## 2. **LIFECYCLE HOOKS TRONG COMPOSITION API**

### 2.1. onBeforeMount & onMounted

```vue
<template>
  <div ref="container">
    <p>Component mounted!</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'

const container = ref(null)

// Chạy TRƯỚC KHI component được mount vào DOM
onBeforeMount(() => {
  console.log('Before mount - DOM chưa sẵn sàng')
  // ❌ Không thể truy cập DOM elements
})

// Chạy SAU KHI component được mount vào DOM
onMounted(() => {
  console.log('Mounted - DOM đã sẵn sàng')
  // ✅ Có thể truy cập DOM elements
  console.log(container.value) // <div>...</div>
  
  // Thường dùng để:
  // - Fetch data từ API
  // - Setup event listeners
  // - Initialize third-party libraries
  fetchData()
  setupEventListeners()
})

function fetchData() {
  // API call...
}

function setupEventListeners() {
  // Add event listeners...
}
</script>
```

### 2.2. onBeforeUpdate & onUpdated

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, onUpdated } from 'vue'

const count = ref(0)

// Chạy TRƯỚC KHI component re-render
onBeforeUpdate(() => {
  console.log('Before update - DOM chưa update')
  console.log('Current count:', count.value)
})

// Chạy SAU KHI component đã re-render
onUpdated(() => {
  console.log('Updated - DOM đã update')
  // ✅ DOM đã được update với data mới
  // Thường dùng để:
  // - Update third-party libraries sau khi DOM change
  // - Scroll to element
})
</script>
```

### 2.3. onBeforeUnmount & onUnmounted

```vue
<template>
  <div>
    <p>Component will be unmounted</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onUnmounted } from 'vue'

// Chạy TRƯỚC KHI component bị unmount
onBeforeUnmount(() => {
  console.log('Before unmount - Component vẫn còn trong DOM')
  // Thường dùng để:
  // - Save data
  // - Cancel pending requests
})

// Chạy SAU KHI component đã bị unmount
onUnmounted(() => {
  console.log('Unmounted - Component đã bị xóa khỏi DOM')
  // Thường dùng để:
  // - Cleanup event listeners
  // - Clear timers/intervals
  // - Cancel subscriptions
  cleanup()
})

function cleanup() {
  // Remove event listeners
  // Clear intervals
  // Cancel API requests
}
</script>
```

---

## 3. **VÍ DỤ THỰC TẾ**

### 3.1. Fetching data on mount

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const response = await fetch('https://api.example.com/users')
    const data = await response.json()
    users.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
```

### 3.2. Setup và cleanup

```vue
<template>
  <div>
    <p>Window width: {{ windowWidth }}px</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)

function updateWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  // Add event listener khi component mount
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  // Remove event listener khi component unmount
  // Quan trọng để tránh memory leaks!
  window.removeEventListener('resize', updateWidth)
})
</script>
```

### 3.3. Timer/Interval

```vue
<template>
  <div>
    <p>Timer: {{ seconds }}s</p>
    <button @click="toggleTimer">
      {{ isRunning ? 'Stop' : 'Start' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const seconds = ref(0)
const isRunning = ref(false)
let intervalId = null

function toggleTimer() {
  if (isRunning.value) {
    clearInterval(intervalId)
    isRunning.value = false
  } else {
    intervalId = setInterval(() => {
      seconds.value++
    }, 1000)
    isRunning.value = true
  }
}

onUnmounted(() => {
  // Cleanup: clear interval khi component unmount
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
```

### 3.4. Third-party library integration

```vue
<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'

const chartContainer = ref(null)
let chartInstance = null
const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    data: [10, 20, 30]
  }]
})

onMounted(() => {
  // Initialize chart khi component mount
  if (chartContainer.value) {
    chartInstance = new Chart(chartContainer.value, {
      type: 'line',
      data: chartData.value
    })
  }
})

// Update chart khi data thay đổi
watch(chartData, (newData) => {
  if (chartInstance) {
    chartInstance.data = newData
    chartInstance.update()
  }
}, { deep: true })

onBeforeUnmount(() => {
  // Destroy chart khi component unmount
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>
```

---

## 4. **LIFECYCLE HOOKS ORDER**

Khi component được tạo và mount:

```vue
<script setup>
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

console.log('1. Setup function runs')

onBeforeMount(() => {
  console.log('2. onBeforeMount')
})

onMounted(() => {
  console.log('3. onMounted')
})

onBeforeUpdate(() => {
  console.log('4. onBeforeUpdate (khi data thay đổi)')
})

onUpdated(() => {
  console.log('5. onUpdated (sau khi DOM update)')
})

onBeforeUnmount(() => {
  console.log('6. onBeforeUnmount')
})

onUnmounted(() => {
  console.log('7. onUnmounted')
})
</script>
```

---

## 5. **BEST PRACTICES**

### 5.1. Cleanup resources

Luôn cleanup resources trong `onUnmounted`:

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

let subscription = null
let timer = null

onMounted(() => {
  // Setup
  subscription = subscribe()
  timer = setInterval(() => {}, 1000)
})

onUnmounted(() => {
  // ✅ Cleanup
  if (subscription) {
    subscription.unsubscribe()
  }
  if (timer) {
    clearInterval(timer)
  }
})
</script>
```

### 5.2. Async operations

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const data = ref(null)
let abortController = null

onMounted(async () => {
  abortController = new AbortController()
  
  try {
    const response = await fetch('/api/data', {
      signal: abortController.signal
    })
    data.value = await response.json()
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error)
    }
  }
})

onUnmounted(() => {
  // Cancel pending request
  if (abortController) {
    abortController.abort()
  }
})
</script>
```

---

## 6. **TỔNG KẾT**

- ✅ **onMounted**: Fetch data, setup listeners, init libraries
- ✅ **onUpdated**: Update third-party libs sau DOM changes
- ✅ **onUnmounted**: Cleanup listeners, timers, subscriptions
- ✅ Luôn cleanup resources để tránh memory leaks
- ✅ Lifecycle hooks giúp quản lý component lifecycle hiệu quả

---

**Bài tiếp theo:** [09. Routing](../03_routing_state/09_routing.md) - Học Vue Router để tạo Single Page Application với routing.
