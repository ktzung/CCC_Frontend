# 🟢 TUẦN 6 - BÀI 03 (VUE.JS)
# **GIỚI THIỆU VUE.JS — Progressive Framework**

---

## 0. 🎬 Opening Hook

*Minh đã học React. Syntax JSX, useState, useEffect — mọi thứ OK. Nhưng khi mở dự án của anh Hùng — một Laravel app cũ cần thêm 1 component tương tác — vấn đề bắt đầu:*

*"React ở đây sẽ phải Vite setup, build pipeline, bundle... để thêm 1 cái dropdown. Không hợp lý," anh Hùng nói.*

*Anh mở file HTML của Laravel app, thêm 2 dòng:*
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```
*Rồi thêm 1 component Vue vào đúng 1 `<div>` trên trang. Xong. Không rebuild. Không pipeline.*

*"Vue là 'Progressive Framework'," anh Hùng giải thích. "Có nghĩa là em có thể thêm từng chút một — không phải all-or-nothing như React."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Vue là lựa chọn tốt khi:
- Cần thêm tương tác vào **dự án web hiện có** (không rebuild từ đầu)
- Muốn **cú pháp gần HTML** hơn JSX
- **Team mới với framework** — learning curve thấp nhất
- Làm dự án với **Laravel, Django, Rails** backend (cộng đồng Vue + Laravel rất lớn ở VN)

Hiểu Vue ngay bây giờ → có thêm 1 lựa chọn trong bộ công cụ, không bị phụ thuộc vào 1 framework duy nhất.

---

## 2. 🌐 Big Picture — Vue vs React so sánh thực tiễn

```
VUE                                  REACT
────────────────────────────         ────────────────────────────
Template (HTML + directives)         JSX (JavaScript + HTML)
<p v-if="isLoggedIn">Hi!</p>        {isLoggedIn && <p>Hi!</p>}

Reactivity tự động (Proxy)           State explicit (useState)
count.value++ → UI tự cập nhật      setCount(count + 1)

Progressive                          All-in
Thêm vào 1 div của dự án cũ         Cần Vite/CRA project riêng

Options API (OOP-style)              Hooks (functional-style)
data(), methods(), computed()        useState(), useEffect()...

Composition API (Vue 3)             Tương đương Hooks
setup() { ref(), computed() }       Cú pháp tương tự

Single-File Component (.vue)         JSX trong .jsx/.tsx file
<template><script><style>            1 file JS với JSX embedded

Vue Router + Pinia (built-in team)  React Router + Redux/Zustand
Official packages, tight integration  Ecosystem tự chọn

Job VN: ~20%                         Job VN: ~65%
Phổ biến: Laravel ecosystem          Phổ biến: Startup, tech company
```

**Không phải Vue tốt hơn React hay ngược lại — đây là 2 công cụ cho 2 context khác nhau.**

---

## 3. ⚙️ Core Technical Truth

### Vue 3 — 2 API Styles

```vue
<!-- OPTIONS API (Vue 2 style — dễ đọc cho người mới) -->
<script>
export default {
    data() {
        return {
            count: 0,
            message: "Hello Vue!"
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2
        }
    },
    methods: {
        increment() {
            this.count++
        }
    },
    mounted() {
        console.log("Component mounted!")
    }
}
</script>
```

```vue
<!-- COMPOSITION API (Vue 3 recommended — dùng trong khóa này) -->
<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const message = ref("Hello Vue!")

const doubleCount = computed(() => count.value * 2)

function increment() {
    count.value++
}

onMounted(() => {
    console.log("Component mounted!")
})
</script>
```

**Khuyến nghị:** Dùng **Composition API** (`<script setup>`) — đây là hướng chính của Vue 3, code concise hơn, dễ tái sử dụng logic.

---

### Single-File Component (SFC) — Cấu trúc .vue

```vue
<!-- ProductCard.vue — Template, Script, Style trong 1 file -->

<template>
    <!-- HTML template của component -->
    <div class="product-card">
        <!-- {{ expression }} = interpolation -->
        <h3>{{ product.name }}</h3>

        <!-- :attr="expression" = dynamic binding -->
        <img :src="product.imageUrl" :alt="product.name" />

        <!-- Conditional rendering -->
        <span v-if="product.badge" class="badge">{{ product.badge }}</span>

        <!-- Formatted price (computed) -->
        <p class="price">{{ formattedPrice }}</p>

        <!-- @event = event listener -->
        <button @click="handleAddToCart" :disabled="isAdded">
            {{ isAdded ? "✅ Đã thêm" : "Thêm vào giỏ" }}
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// defineProps — Nhận data từ parent
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

// defineEmits — Phát sự kiện lên parent
const emit = defineEmits(['add-to-cart'])

// Local state
const isAdded = ref(false)

// Computed property — tự động tính lại khi dependency thay đổi
const formattedPrice = computed(() =>
    props.product.price.toLocaleString('vi-VN') + 'đ'
)

// Methods
function handleAddToCart() {
    isAdded.value = true
    emit('add-to-cart', props.product)
    setTimeout(() => { isAdded.value = false }, 2000) // Reset sau 2s
}
</script>

<style scoped>
/* scoped = CSS chỉ áp dụng cho component này, không leak ra ngoài */
.product-card {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    transition: box-shadow 0.2s;
}

.product-card:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.price {
    font-weight: bold;
    color: #dc2626;
}
</style>
```

---

### Vue Directives — Cốt lõi của template

```vue
<template>
    <!-- v-if / v-else-if / v-else — Conditional rendering -->
    <div v-if="isLoggedIn">Chào mừng trở lại!</div>
    <div v-else-if="isGuest">Xem với tư cách khách</div>
    <div v-else>Vui lòng đăng nhập</div>

    <!-- v-show — Hiện/ẩn (giữ trong DOM, dùng display:none) -->
    <!-- Dùng khi toggle thường xuyên (tốt hơn v-if về performance) -->
    <p v-show="isExpanded">Nội dung mở rộng...</p>

    <!-- v-for — Loop rendering -->
    <ul>
        <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} × {{ item.quantity }}
        </li>
    </ul>

    <!-- v-for với index -->
    <div v-for="(product, index) in products" :key="product.id">
        {{ index + 1 }}. {{ product.name }}
    </div>

    <!-- v-bind (:) — Bind dynamic attribute -->
    <img :src="user.avatar" :alt="user.name" />
    <button :disabled="isLoading" :class="{ 'btn-active': isActive }">
        Submit
    </button>

    <!-- v-on (@) — Event handling -->
    <button @click="handleClick">Click</button>
    <input @input="handleInput" @keydown.enter="handleSubmit" />
    <form @submit.prevent="handleSubmit">...</form>

    <!-- v-model — Two-way binding (input ↔ state) -->
    <input v-model="searchQuery" placeholder="Tìm kiếm..." />
    <select v-model="selectedCategory">
        <option value="">Tất cả</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
        </option>
    </select>
    <input type="checkbox" v-model="agreeToTerms" />
</template>
```

---

### Reactivity — ref() vs reactive()

```vue
<script setup>
import { ref, reactive, computed, watch } from 'vue'

// ref() — Cho primitive values (number, string, boolean)
// Phải dùng .value trong JavaScript, template tự unwrap
const count = ref(0)
const name = ref("")
const isLoading = ref(false)

count.value++     // JavaScript: cần .value
// {{ count }}   // Template: KHÔNG cần .value

// reactive() — Cho objects (không cần .value)
const cart = reactive({
    items: [],
    total: 0,
})

cart.items.push({ name: "iPhone", price: 25990000 })  // Không cần .value
cart.total += 25990000

// computed() — Derived state, auto-recalculate
const cartCount = computed(() => cart.items.length)
const cartTotal = computed(() =>
    cart.items.reduce((sum, item) => sum + item.price, 0)
)

// watch() — React to state changes (side effects)
watch(count, (newValue, oldValue) => {
    console.log(`count: ${oldValue} → ${newValue}`)
})

// watch array của dependencies
watch([count, name], ([newCount, newName]) => {
    document.title = `${newName} - ${newCount}`
})

// watchEffect() — Auto-track dependencies (như useEffect deps tự động)
import { watchEffect } from 'vue'
watchEffect(() => {
    document.title = `${name.value} (${count.value})`
    // Tự động watch name và count vì dùng trong callback
})
</script>
```

---

### Lifecycle Hooks

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted, onBeforeMount } from 'vue'

// Tương đương React hooks:
// onMounted   ≈ useEffect(() => {}, [])  — sau khi mount
// onUpdated   ≈ useEffect(() => {})      — sau mỗi render
// onUnmounted ≈ cleanup function trong useEffect

onBeforeMount(() => {
    console.log("Chuẩn bị mount — DOM chưa sẵn")
})

onMounted(async () => {
    console.log("Component đã mount — DOM sẵn")
    // Fetch data, access DOM refs, initialize plugins
    const products = await fetchProducts()
    productList.value = products
})

onUpdated(() => {
    console.log("Component đã update")
})

onUnmounted(() => {
    console.log("Component bị xóa — cleanup ở đây")
    // Clear timers, remove event listeners, cancel API calls
})
</script>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`ref()` cho primitive, `reactive()` cho object. Template tự unwrap ref (không cần `.value`), JavaScript phải dùng `.value`.**
> **Vue directives: `v-if` (remove DOM), `v-show` (hide CSS), `v-for` (loop), `v-model` (two-way), `:attr` (bind), `@event` (listen).**

---

## 5. 🏭 Real-world Layer

### Vue 3 + Vite Todo App

```vue
<!-- src/App.vue -->
<template>
    <div class="app">
        <h1>📝 Todo App — Vue 3</h1>

        <!-- Form thêm todo -->
        <div class="input-group">
            <input
                v-model="newTodo"
                @keydown.enter="addTodo"
                placeholder="Thêm todo mới..."
                class="todo-input"
            />
            <button @click="addTodo" class="btn btn-primary">Thêm</button>
        </div>

        <!-- Filters -->
        <div class="filters">
            <button
                v-for="f in ['all', 'active', 'done']"
                :key="f"
                :class="{ active: filter === f }"
                @click="filter = f"
            >
                {{ filterLabels[f] }}
            </button>
        </div>

        <!-- Todo list -->
        <TransitionGroup name="todo-list" tag="ul">
            <li
                v-for="todo in filteredTodos"
                :key="todo.id"
                :class="{ done: todo.done }"
                class="todo-item"
            >
                <input type="checkbox" v-model="todo.done" />
                <span>{{ todo.text }}</span>
                <button @click="deleteTodo(todo.id)" class="delete-btn">❌</button>
            </li>
        </TransitionGroup>

        <!-- Stats -->
        <div v-if="todos.length > 0" class="stats">
            <span>{{ activeTodos }} việc chưa xong</span>
            <button v-if="doneTodos > 0" @click="clearDone">
                Xóa {{ doneTodos }} đã xong
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'vue-todos'
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'))
const newTodo = ref('')
const filter = ref('all')
const filterLabels = { all: 'Tất cả', active: 'Chưa xong', done: 'Hoàn thành' }

// Computed
const filteredTodos = computed(() => {
    if (filter.value === 'active') return todos.value.filter(t => !t.done)
    if (filter.value === 'done') return todos.value.filter(t => t.done)
    return todos.value
})

const activeTodos = computed(() => todos.value.filter(t => !t.done).length)
const doneTodos = computed(() => todos.value.filter(t => t.done).length)

// Auto-save
watch(todos, (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
}, { deep: true })  // deep: true để watch nested changes

// Methods
function addTodo() {
    if (!newTodo.value.trim()) return
    todos.value.push({ id: Date.now(), text: newTodo.value.trim(), done: false })
    newTodo.value = ''
}

function deleteTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
}

function clearDone() {
    todos.value = todos.value.filter(t => !t.done)
}
</script>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Setup Vue 3 project và build Counter App (20 phút)

```bash
# Bước 1: Tạo project
npm create vue@latest my-vue-app
# Chọn: No TypeScript, No JSX, Yes Router, Yes Pinia, Yes ESLint

cd my-vue-app
npm install
npm run dev
```

Tạo `src/components/ShoppingCart.vue`:

```vue
<template>
    <div class="cart">
        <h2>🛒 Giỏ hàng ({{ items.length }})</h2>

        <div v-for="item in items" :key="item.id" class="cart-item">
            <span>{{ item.name }}</span>
            <div class="quantity">
                <button @click="decrease(item)">-</button>
                <span>{{ item.qty }}</span>
                <button @click="item.qty++">+</button>
            </div>
            <span>{{ (item.price * item.qty).toLocaleString('vi-VN') }}đ</span>
        </div>

        <div class="total">
            <strong>Tổng: {{ totalPrice }}đ</strong>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const items = reactive([
    { id: 1, name: 'iPhone 15', price: 25990000, qty: 1 },
    { id: 2, name: 'AirPods Pro', price: 6490000, qty: 1 },
])

const totalPrice = computed(() =>
    items.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString('vi-VN')
)

function decrease(item) {
    if (item.qty > 1) item.qty--
}
</script>
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Vue dễ hơn React nên kém hơn"** | Sai — Vue dễ học hơn không có nghĩa là kém mạnh hơn. Vue tốt hơn React trong nhiều use case: project legacy integration, team mới với framework, dự án Laravel |
| **"`ref()` luôn cần `.value`"** | Trong JavaScript thì đúng. Nhưng trong `<template>`, Vue **auto-unwrap** ref → không cần `.value`. `{{ count }}` không phải `{{ count.value }}` |
| **"`reactive()` tốt hơn `ref()` vì không cần `.value`"** | Có trade-offs: `reactive()` mất reactivity khi destructure (`const { count } = state` → `count` không reactive nữa). `ref()` an toàn hơn vì luôn giữ reference |
| **"`v-if` và `v-show` như nhau"** | `v-if` = thêm/xóa khỏi DOM (expensive mount/unmount nhưng không render khi false). `v-show` = `display: none` (element vẫn trong DOM). `v-show` tốt hơn khi toggle thường xuyên |
| **"Composition API thay thế Options API"** | Không — cả hai đều được hỗ trợ chính thức trong Vue 3. Options API vẫn valid. Composition API là lựa chọn ưu tiên cho code mới vì reusability tốt hơn |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `ref()` và `reactive()` dùng cho loại dữ liệu nào? Tại sao template không cần `.value` nhưng JavaScript thì cần?
2. `v-if` và `v-show` khác nhau thế nào? Khi nào nên dùng cái nào?
3. `computed()` và `watch()` khác nhau thế nào? Khi nào dùng cái nào?

### Câu hỏi áp dụng:

4. Viết Vue template hiển thị danh sách sản phẩm, mỗi sản phẩm có tên và nút "Thêm vào giỏ". Khi click, emit event `add-to-cart` lên parent.
5. Bạn cần một component `SearchBox` có input text, mỗi khi user gõ thì gọi API search sau 500ms (debounce). Dùng hook/function nào? Viết logic.

<details>
<summary>👁️ Xem đáp án</summary>

1. **`ref()`** cho primitives (number, string, boolean, null). **`reactive()`** cho objects và arrays. Template auto-unwrap ref vì Vue compiler phát hiện `.value` và tự thêm vào compiled template. Trong JavaScript (script setup), bạn phải gọi `.value` thủ công vì Vue không compile JS thuần.
2. **`v-if`**: Thêm/xóa element khỏi DOM. `false` → element không tồn tại trong DOM, không consume memory. **`v-show`**: Set `display: none`. Element vẫn trong DOM. Dùng `v-if` khi condition ít thay đổi hoặc component cần lazy load. Dùng `v-show` khi toggle thường xuyên (tránh mount/unmount overhead).
3. **`computed()`**: Return giá trị được tính từ reactive state. Tự động re-calculate khi dependency thay đổi. Dùng khi cần **derived data** (price format, filtered list, totals). **`watch()`**: Observe state changes và thực hiện **side effects** (fetch API, localStorage, timer). Dùng khi cần phản ứng với thay đổi mà không return value.
4. ```vue
   <template>
       <div v-for="product in products" :key="product.id">
           <span>{{ product.name }}</span>
           <button @click="emit('add-to-cart', product)">Thêm</button>
       </div>
   </template>
   <script setup>
   const props = defineProps({ products: Array })
   const emit = defineEmits(['add-to-cart'])
   </script>
   ```
5. ```vue
   <script setup>
   import { ref, watch } from 'vue'
   const query = ref('')
   const results = ref([])
   let debounceTimer = null
   watch(query, (newQuery) => {
       clearTimeout(debounceTimer)
       debounceTimer = setTimeout(async () => {
           if (!newQuery.trim()) return
           const res = await fetch(`/api/search?q=${newQuery}`)
           results.value = await res.json()
       }, 500)
   })
   </script>
   ```

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Vue is not defined` | Chạy Vue mà không import hoặc không dùng CDN | Thêm `<script src="https://unpkg.com/vue@3"></script>` hoặc `import { createApp } from 'vue'` |
| `[Vue warn]: Property "xxx" was accessed during render but is not defined` | Dùng biến trong template mà chưa khai báo trong `setup()` hoặc `<script setup>` | Khai báo với `ref()` hoặc `reactive()` trước khi dùng trong template |
| `Cannot read properties of undefined (reading 'value')` | Quên `.value` khi truy cập `ref` trong `<script setup>` | Dùng `myRef.value` trong JS, template tự unwrap nên không cần `.value` |
| `[Vue warn]: Component is missing template or render function` | File `.vue` thiếu thẻ `<template>` | Thêm `<template>` hợp lệ — tối thiểu 1 root element |
| `Uncaught SyntaxError: Cannot use import statement outside a module` | Import ESM trong file `<script>` thường (không có `type="module"`) | Dùng `<script type="module">` hoặc chuyển sang `<script setup>` |
| `[Vue warn]: Extraneous non-emits event listeners` | Parent lắng nghe event mà child không `defineEmits` | Thêm `const emit = defineEmits(['eventName'])` trong child component |

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Composition API** (`<script setup>`) = cách viết Vue 3 mới, concise và reusable
2. **SFC** = `<template>` + `<script setup>` + `<style scoped>` trong 1 `.vue` file
3. **ref()** cho primitives (cần `.value` trong JS, tự unwrap trong template). **reactive()** cho objects
4. **Directives**: `v-if/v-show` (conditional), `v-for` (loop), `v-model` (two-way), `:` (bind), `@` (event)
5. **computed()** = derived state tự tính lại. **watch()** = side effects khi state thay đổi

---

## 10. ➡️ Next Lesson Bridge

*"Vue setup xong, Counter chạy được," Minh nói. "Muốn thêm nhiều trang, router."*

*"Cài `vue-router` là xong. Syntax như React Router nhưng đơn giản hơn. Cũng cần biết Pinia — state management của Vue, kiểu như Zustand của React nhưng official."*

**→ [Bài 04: Vue DevEnv Setup](./02_development_environment.md) — Vite setup, project structure, Vue DevTools: môi trường chuẩn production.**
