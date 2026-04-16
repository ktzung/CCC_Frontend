# 🟢 MODULE 1 - BÀI 03
# **TEMPLATE SYNTAX & DIRECTIVES**

## 🎬 "v-if, v-for, v-bind — HTML Biết Suy Nghĩ" — Template Syntax Của Vue

*Minh viết React: `{isLoggedIn && <Welcome />}` — JavaScript thuần. Vue? `<div v-if="isLoggedIn">Welcome</div>` — đọc như HTML! Anh Hùng: "Vue template = HTML + superpowers. `v-if` = if/else, `v-for` = loop, `v-bind` = dynamic attributes. Không cần học JSX."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu và sử dụng được **Interpolation** (`{{ }}`)
- Nắm vững các **Directives** cơ bản: `v-if`, `v-show`, `v-for`, `v-bind`, `v-model`
- Biết cách sử dụng **Shorthand** (`:`, `@`)
- Hiểu sự khác biệt giữa các directives tương tự

---

## 1. **INTERPOLATION (CHÈN DỮ LIỆU)**

Interpolation là cách đơn giản nhất để hiển thị data trong template.

### 1.1. Text Interpolation

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>Hello, {{ name }}!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Welcome to Vue!')
const name = ref('Khoa')
</script>
```

**Kết quả:**
```
Welcome to Vue!
Hello, Khoa!
```

### 1.2. JavaScript Expressions

Bạn có thể sử dụng JavaScript expressions trong `{{ }}`:

```vue
<template>
  <div>
    <!-- Toán tử -->
    <p>{{ count + 1 }}</p>
    <p>{{ price * quantity }}</p>
    
    <!-- Method calls -->
    <p>{{ message.toUpperCase() }}</p>
    <p>{{ new Date().toLocaleDateString() }}</p>
    
    <!-- Ternary operator -->
    <p>{{ isActive ? 'Active' : 'Inactive' }}</p>
    
    <!-- Array/Object methods -->
    <p>{{ items.length }} items</p>
    <p>{{ user.name || 'Guest' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(5)
const price = ref(100)
const quantity = ref(3)
const message = ref('hello vue')
const isActive = ref(true)
const items = ref([1, 2, 3])
const user = ref({ name: 'Khoa' })
</script>
```

**⚠️ Lưu ý:**
- Chỉ có thể dùng **expressions**, không thể dùng **statements**
- ✅ Đúng: `{{ count + 1 }}`, `{{ isActive ? 'Yes' : 'No' }}`
- ❌ Sai: `{{ if (count > 0) return count }}`, `{{ let x = 1 }}`

### 1.3. v-text và v-html

**v-text:** Tương đương với `{{ }}`
```vue
<p v-text="message"></p>
<!-- Tương đương -->
<p>{{ message }}</p>
```

**v-html:** Render HTML (cẩn thận với XSS attacks!)
```vue
<template>
  <div>
    <!-- Hiển thị text thuần -->
    <p>{{ htmlContent }}</p>
    <!-- Kết quả: <strong>Bold</strong> -->
    
    <!-- Render HTML -->
    <p v-html="htmlContent"></p>
    <!-- Kết quả: Bold (in đậm) -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const htmlContent = ref('<strong>Bold</strong>')
</script>
```

**⚠️ Cảnh báo:** Chỉ dùng `v-html` với data tin cậy. Không bao giờ dùng với user input!

---

## 2. **DIRECTIVES CƠ BẢN**

Directives là các attributes đặc biệt bắt đầu bằng `v-` để điều khiển DOM.

### 2.1. v-if, v-else-if, v-else

Điều kiện render element (thêm/xóa element khỏi DOM).

```vue
<template>
  <div>
    <p v-if="score >= 90">Excellent!</p>
    <p v-else-if="score >= 70">Good!</p>
    <p v-else-if="score >= 50">Pass</p>
    <p v-else>Fail</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score = ref(85)
</script>
```

**Lưu ý:**
- `v-if` có thể dùng trên `<template>` để group nhiều elements:
```vue
<template v-if="isVisible">
  <h1>Title</h1>
  <p>Content</p>
</template>
```

### 2.2. v-show

Ẩn/hiện element bằng CSS `display: none` (element vẫn tồn tại trong DOM).

```vue
<template>
  <div>
    <p v-show="isVisible">This is visible</p>
    <button @click="toggle">Toggle</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)

function toggle() {
  isVisible.value = !isVisible.value
}
</script>
```

**v-if vs v-show:**
| Tiêu chí | v-if | v-show |
|----------|------|--------|
| **DOM** | Thêm/xóa element | Chỉ thay đổi CSS |
| **Performance** | Tốt khi ít toggle | Tốt khi thường xuyên toggle |
| **Initial render** | Lazy (chỉ render khi true) | Luôn render |
| **Use case** | Điều kiện ít thay đổi | Điều kiện thường xuyên thay đổi |

**Ví dụ:**
```vue
<!-- Dùng v-if khi điều kiện ít thay đổi -->
<div v-if="user.isAdmin">
  <AdminPanel />
</div>

<!-- Dùng v-show khi toggle thường xuyên -->
<button v-show="isLoggedIn">Logout</button>
```

### 2.3. v-for

Render danh sách (loop).

```vue
<template>
  <div>
    <!-- Loop qua array -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    
    <!-- Loop với index -->
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index + 1 }}. {{ item.name }}
      </li>
    </ul>
    
    <!-- Loop qua object -->
    <ul>
      <li v-for="(value, key) in user" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    
    <!-- Loop qua số -->
    <span v-for="n in 5" :key="n">{{ n }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
])

const user = ref({
  name: 'Khoa',
  age: 25,
  email: 'khoa@example.com'
})
</script>
```

**⚠️ Quan trọng:** Luôn dùng `:key` với `v-for` để Vue track elements hiệu quả:
```vue
<!-- ✅ Đúng -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>

<!-- ❌ Sai (không có key) -->
<li v-for="item in items">{{ item.name }}</li>
```

**v-for với v-if:**
```vue
<!-- ❌ Không nên dùng trên cùng element -->
<li v-for="item in items" v-if="item.isActive" :key="item.id">
  {{ item.name }}
</li>

<!-- ✅ Dùng template wrapper -->
<template v-for="item in items" :key="item.id">
  <li v-if="item.isActive">{{ item.name }}</li>
</template>

<!-- ✅ Hoặc filter trong computed -->
<li v-for="item in activeItems" :key="item.id">
  {{ item.name }}
</li>
```

### 2.4. v-bind (Binding Attributes)

Bind data vào HTML attributes.

```vue
<template>
  <div>
    <!-- Bind attribute -->
    <img v-bind:src="imageSrc" v-bind:alt="imageAlt" />
    
    <!-- Shorthand: dùng : -->
    <img :src="imageSrc" :alt="imageAlt" />
    
    <!-- Bind class -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
      Content
    </div>
    
    <!-- Bind style -->
    <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
      Styled text
    </div>
    
    <!-- Bind multiple attributes -->
    <button v-bind="buttonProps">Click me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageSrc = ref('/logo.png')
const imageAlt = ref('Logo')
const isActive = ref(true)
const hasError = ref(false)
const textColor = ref('blue')
const fontSize = ref(16)
const buttonProps = ref({
  type: 'button',
  disabled: false,
  class: 'btn-primary'
})
</script>
```

**Class binding:**
```vue
<!-- Object syntax -->
<div :class="{ active: isActive, disabled: isDisabled }"></div>

<!-- Array syntax -->
<div :class="[activeClass, errorClass]"></div>

<!-- Mixed -->
<div :class="[{ active: isActive }, errorClass]"></div>

<!-- Computed -->
<div :class="computedClass"></div>
```

**Style binding:**
```vue
<!-- Object syntax -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- Array syntax (merge multiple objects) -->
<div :style="[baseStyles, overridingStyles]"></div>

<!-- Auto-prefixed -->
<div :style="{ display: '-webkit-box' }"></div>
```

### 2.5. v-model (Two-way Data Binding)

Two-way binding cho form inputs.

```vue
<template>
  <div>
    <!-- Text input -->
    <input v-model="message" placeholder="Type something" />
    <p>Message: {{ message }}</p>
    
    <!-- Textarea -->
    <textarea v-model="description"></textarea>
    
    <!-- Checkbox -->
    <input type="checkbox" v-model="isChecked" />
    <label>I agree</label>
    
    <!-- Multiple checkboxes -->
    <input type="checkbox" value="vue" v-model="frameworks" />
    <input type="checkbox" value="react" v-model="frameworks" />
    <input type="checkbox" value="angular" v-model="frameworks" />
    <p>Selected: {{ frameworks }}</p>
    
    <!-- Radio -->
    <input type="radio" value="male" v-model="gender" />
    <input type="radio" value="female" v-model="gender" />
    <p>Gender: {{ gender }}</p>
    
    <!-- Select -->
    <select v-model="selected">
      <option disabled value="">Please select</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
    <p>Selected: {{ selected }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const description = ref('')
const isChecked = ref(false)
const frameworks = ref([])
const gender = ref('')
const selected = ref('')
</script>
```

**v-model modifiers:**
```vue
<!-- .lazy - Update on change event thay vì input event -->
<input v-model.lazy="message" />

<!-- .number - Convert to number -->
<input v-model.number="age" type="number" />

<!-- .trim - Remove whitespace -->
<input v-model.trim="username" />
```

---

## 3. **SHORTHAND SYNTAX**

Vue cung cấp shorthand cho các directives phổ biến:

```vue
<!-- v-bind shorthand -->
<img :src="imageSrc" :alt="imageAlt" />
<!-- Tương đương -->
<img v-bind:src="imageSrc" v-bind:alt="imageAlt" />

<!-- v-on shorthand -->
<button @click="handleClick">Click</button>
<!-- Tương đương -->
<button v-on:click="handleClick">Click</button>
```

---

## 4. **VÍ DỤ TỔNG HỢP**

```vue
<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    
    <!-- Add new todo -->
    <div class="add-todo">
      <input 
        v-model.trim="newTodo" 
        @keyup.enter="addTodo"
        placeholder="Add a new todo..."
      />
      <button @click="addTodo">Add</button>
    </div>
    
    <!-- Filter buttons -->
    <div class="filters">
      <button 
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        All ({{ todos.length }})
      </button>
      <button 
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Active ({{ activeTodos.length }})
      </button>
      <button 
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Completed ({{ completedTodos.length }})
      </button>
    </div>
    
    <!-- Todo list -->
    <ul v-if="filteredTodos.length > 0">
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
        />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <p v-else>No todos found</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newTodo = ref('')
const todos = ref([
  { id: 1, text: 'Learn Vue.js', completed: false },
  { id: 2, text: 'Build a project', completed: true }
])
const filter = ref('all')
let nextId = 3

const activeTodos = computed(() => 
  todos.value.filter(t => !t.completed)
)

const completedTodos = computed(() => 
  todos.value.filter(t => t.completed)
)

const filteredTodos = computed(() => {
  if (filter.value === 'active') return activeTodos.value
  if (filter.value === 'completed') return completedTodos.value
  return todos.value
})

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value,
      completed: false
    })
    newTodo.value = ''
  }
}

function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.filters button.active {
  background-color: #42b983;
  color: white;
}
</style>
```

---

## 5. **TỔNG KẾT**

- ✅ **Interpolation** (`{{ }}`) để hiển thị data
- ✅ **v-if/v-else** để điều kiện render
- ✅ **v-show** để ẩn/hiện (CSS)
- ✅ **v-for** để loop qua arrays/objects
- ✅ **v-bind** (`:`) để bind attributes
- ✅ **v-model** để two-way binding với forms
- ✅ **v-on** (`@`) để bắt events (sẽ học ở bài tiếp theo)

---

**Bài tiếp theo:** [04. Event Handling](./04_event_handling.md) - Học cách xử lý sự kiện với v-on và các event modifiers.
