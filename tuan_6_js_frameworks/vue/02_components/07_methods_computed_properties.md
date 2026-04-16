# 🟢 MODULE 2 - BÀI 07
# **METHODS, COMPUTED PROPERTIES & WATCHERS**

## 🎬 "Method Chạy Mỗi Lần. Computed Chạy Khi CẦN" — 3 Vũ Khí Xử Lý Logic

*Minh dùng method tính `totalPrice` — gọi 100 lần/giây khi render. Anh Hùng: "Computed = CACHED. Chỉ tính lại khi dependency thay đổi. Method = gọi mỗi lần. Watcher = 'canh gác' — khi X thay đổi → làm Y. 3 công cụ, 3 mục đích khác nhau."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu và sử dụng **Methods** cho các functions
- Hiểu và sử dụng **Computed Properties** cho derived data
- Hiểu và sử dụng **Watchers** để theo dõi thay đổi
- Biết khi nào dùng methods, computed, hay watchers
- Hiểu sự khác biệt về performance

---

## 1. **METHODS**

Methods là các functions có thể gọi từ template hoặc script.

### 1.1. Định nghĩa methods

```vue
<template>
  <div>
    <p>{{ getGreeting() }}</p>
    <button @click="increment">Count: {{ count }}</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning!'
  if (hour < 18) return 'Good Afternoon!'
  return 'Good Evening!'
}

function increment() {
  count.value++
}

function reset() {
  count.value = 0
}
</script>
```

### 1.2. Methods với parameters

```vue
<template>
  <div>
    <button @click="sayHello('Khoa')">Say Hello</button>
    <button @click="calculate(5, 10)">Calculate</button>
  </div>
</template>

<script setup>
function sayHello(name) {
  alert(`Hello, ${name}!`)
}

function calculate(a, b) {
  console.log(a + b) // 15
}
</script>
```

### 1.3. Methods được gọi mỗi lần render

**⚠️ Lưu ý:** Methods được gọi mỗi lần component re-render, không cache kết quả.

```vue
<template>
  <div>
    <!-- Method được gọi 2 lần (mỗi lần render) -->
    <p>{{ expensiveCalculation() }}</p>
    <p>{{ expensiveCalculation() }}</p>
  </div>
</template>

<script setup>
function expensiveCalculation() {
  console.log('Calculating...') // In ra 2 lần
  return Math.random() * 1000
}
</script>
```

---

## 2. **COMPUTED PROPERTIES**

Computed properties là derived data được cache. Chỉ tính toán lại khi dependencies thay đổi.

### 2.1. Cú pháp cơ bản

```vue
<template>
  <div>
    <p>Full name: {{ fullName }}</p>
    <p>Reversed: {{ reversedMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Khoa')
const lastName = ref('Nguyen')
const message = ref('Hello Vue')

// Computed property
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

const reversedMessage = computed(() => {
  return message.value.split('').reverse().join('')
})
</script>
```

### 2.2. Computed với getter và setter

```vue
<template>
  <div>
    <input v-model="fullName" />
    <p>First: {{ firstName }}</p>
    <p>Last: {{ lastName }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Khoa')
const lastName = ref('Nguyen')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    const names = newValue.split(' ')
    firstName.value = names[0] || ''
    lastName.value = names[1] || ''
  }
})
</script>
```

### 2.3. Computed được cache

```vue
<template>
  <div>
    <!-- Computed chỉ tính 1 lần, dùng lại kết quả -->
    <p>{{ expensiveComputed }}</p>
    <p>{{ expensiveComputed }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([1, 2, 3, 4, 5])

const expensiveComputed = computed(() => {
  console.log('Computing...') // Chỉ in 1 lần
  return items.value.reduce((sum, item) => sum + item, 0)
})
</script>
```

### 2.4. Ví dụ thực tế: Filtered list

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    
    <ul>
      <li v-for="item in filteredItems" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
])

// Computed tự động update khi searchQuery hoặc items thay đổi
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
```

---

## 3. **WATCHERS**

Watchers theo dõi thay đổi của data và thực hiện side effects.

### 3.1. watch() - Watch một source

```vue
<template>
  <div>
    <input v-model="searchQuery" />
    <p>Searching for: {{ searchQuery }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')

// Watch searchQuery
watch(searchQuery, (newValue, oldValue) => {
  console.log(`Changed from "${oldValue}" to "${newValue}"`)
  
  // Thực hiện API call khi search query thay đổi
  if (newValue.length > 2) {
    performSearch(newValue)
  }
})

function performSearch(query) {
  console.log('Searching for:', query)
  // API call...
}
</script>
```

### 3.2. watch() với options

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log('Count changed:', newValue)
}, {
  immediate: true,    // Chạy ngay lập tức
  deep: true,         // Deep watch cho objects/arrays
  flush: 'post'       // Chạy sau khi DOM update
})
</script>
```

### 3.3. watchEffect() - Auto-track dependencies

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubleCount = ref(0)

// Tự động track tất cả reactive dependencies
watchEffect(() => {
  doubleCount.value = count.value * 2
  console.log('Count:', count.value, 'Double:', doubleCount.value)
})
</script>
```

### 3.4. Watch multiple sources

```vue
<script setup>
import { ref, watch } from 'vue'

const firstName = ref('Khoa')
const lastName = ref('Nguyen')

// Watch nhiều sources
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log('Name changed:', `${oldFirst} ${oldLast} → ${newFirst} ${newLast}`)
})
</script>
```

### 3.5. Watch object/array (deep)

```vue
<script setup>
import { ref, watch } from 'vue'

const user = ref({
  name: 'Khoa',
  age: 25,
  address: {
    city: 'Hanoi',
    country: 'Vietnam'
  }
})

// Deep watch
watch(user, (newValue, oldValue) => {
  console.log('User changed:', newValue)
}, { deep: true })

// Hoặc watch nested property
watch(() => user.value.address.city, (newCity) => {
  console.log('City changed:', newCity)
})
</script>
```

---

## 4. **SO SÁNH METHODS, COMPUTED, WATCHERS**

| Tiêu chí | Methods | Computed | Watchers |
|----------|---------|----------|----------|
| **Khi nào dùng** | Actions, events | Derived data | Side effects |
| **Cache** | ❌ Không | ✅ Có | ❌ Không |
| **Gọi khi** | Mỗi lần render | Khi deps thay đổi | Khi source thay đổi |
| **Return value** | Có thể có | Phải có | Không cần |
| **Use case** | Click handler, form submit | Filtered list, formatted data | API calls, logging |

### 4.1. Khi nào dùng Methods?

- ✅ Event handlers (`@click`, `@submit`)
- ✅ Functions cần gọi với parameters
- ✅ Functions không cần cache

```vue
<template>
  <button @click="handleClick">Click</button>
</template>

<script setup>
function handleClick() {
  // Action, không cần cache
  console.log('Clicked!')
}
</script>
```

### 4.2. Khi nào dùng Computed?

- ✅ Derived data từ existing data
- ✅ Cần cache để performance tốt
- ✅ Data phụ thuộc vào reactive data khác

```vue
<script setup>
const items = ref([...])
const searchQuery = ref('')

// ✅ Computed: derived từ items và searchQuery
const filteredItems = computed(() => {
  return items.value.filter(item => 
    item.name.includes(searchQuery.value)
  )
})
</script>
```

### 4.3. Khi nào dùng Watchers?

- ✅ Side effects (API calls, logging)
- ✅ Async operations
- ✅ Cần theo dõi thay đổi và phản ứng

```vue
<script setup>
const userId = ref(null)

// ✅ Watcher: side effect khi userId thay đổi
watch(userId, async (newId) => {
  if (newId) {
    const user = await fetchUser(newId)
    // Update state...
  }
})
</script>
```

---

## 5. **VÍ DỤ TỔNG HỢP**

```vue
<template>
  <div class="shopping-cart">
    <h1>Shopping Cart</h1>
    
    <div class="cart-items">
      <div 
        v-for="item in cartItems" 
        :key="item.id"
        class="cart-item"
      >
        <span>{{ item.name }}</span>
        <input 
          type="number" 
          v-model.number="item.quantity"
          min="1"
        />
        <span>${{ item.price }}</span>
        <button @click="removeItem(item.id)">Remove</button>
      </div>
    </div>
    
    <div class="summary">
      <p>Subtotal: ${{ subtotal }}</p>
      <p>Tax (10%): ${{ tax }}</p>
      <p><strong>Total: ${{ total }}</strong></p>
    </div>
    
    <button @click="checkout" :disabled="!canCheckout">
      Checkout
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const cartItems = ref([
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29, quantity: 2 }
])

// Computed: derived data
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.1
})

const total = computed(() => {
  return subtotal.value + tax.value
})

const canCheckout = computed(() => {
  return cartItems.value.length > 0 && total.value > 0
})

// Methods: actions
function removeItem(id) {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

function checkout() {
  if (canCheckout.value) {
    alert(`Checkout: $${total.value}`)
    // Process checkout...
  }
}

// Watcher: side effects
watch(total, (newTotal) => {
  if (newTotal > 1000) {
    console.log('High value cart!')
  }
})
</script>
```

---

## 6. **TỔNG KẾT**

- ✅ **Methods**: Actions, event handlers, không cache
- ✅ **Computed**: Derived data, có cache, tự động update
- ✅ **Watchers**: Side effects, theo dõi thay đổi
- ✅ Chọn đúng tool cho đúng mục đích để code hiệu quả

---

**Bài tiếp theo:** [08. Lifecycle Hooks](./08_lifecycle_hooks.md) - Học về component lifecycle và các lifecycle hooks.
