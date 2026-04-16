# 🟢 MODULE 1 - BÀI 04
# **EVENT HANDLING**

## 🎬 "@click — 1 Ký Tự Thay addEventListener" — Sự Kiện Trong Vue

*Minh viết JS thuần: `document.getElementById('btn').addEventListener('click', handler)`. Vue: `<button @click="handler">`. Một dòng. Anh Hùng: "@ = v-on shorthand. @click, @submit, @keyup.enter — Vue tự xử lý bindation. Modifier `.prevent` thay `e.preventDefault()`."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng `v-on` hoặc `@` để bắt events
- Hiểu và sử dụng **Event Modifiers** (`.prevent`, `.stop`, `.once`...)
- Sử dụng **Key Modifiers** (`.enter`, `.esc`, `.ctrl`...)
- Truyền parameters và sử dụng `$event`
- Xử lý multiple events

---

## 1. **V-ON DIRECTIVE**

### 1.1. Cú pháp cơ bản

```vue
<template>
  <div>
    <!-- Cú pháp đầy đủ -->
    <button v-on:click="handleClick">Click me</button>
    
    <!-- Shorthand (khuyên dùng) -->
    <button @click="handleClick">Click me</button>
    
    <!-- Inline handler -->
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function handleClick() {
  alert('Button clicked!')
  count.value++
}
</script>
```

### 1.2. Các events phổ biến

```vue
<template>
  <div>
    <!-- Click -->
    <button @click="handleClick">Click</button>
    
    <!-- Double click -->
    <button @dblclick="handleDoubleClick">Double Click</button>
    
    <!-- Mouse events -->
    <div 
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      Hover me
    </div>
    
    <!-- Keyboard events -->
    <input 
      @keydown="handleKeyDown"
      @keyup="handleKeyUp"
      @keypress="handleKeyPress"
    />
    
    <!-- Form events -->
    <form @submit="handleSubmit">
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
    
    <!-- Focus events -->
    <input 
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <!-- Change events -->
    <input 
      type="text"
      @change="handleChange"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
function handleClick() {
  console.log('Clicked!')
}

function handleDoubleClick() {
  console.log('Double clicked!')
}

function handleMouseEnter() {
  console.log('Mouse entered')
}

function handleMouseLeave() {
  console.log('Mouse left')
}

function handleMouseMove(event) {
  console.log('Mouse moved:', event.clientX, event.clientY)
}

function handleKeyDown(event) {
  console.log('Key pressed:', event.key)
}

function handleKeyUp(event) {
  console.log('Key released:', event.key)
}

function handleKeyPress(event) {
  console.log('Key pressed:', event.key)
}

function handleSubmit(event) {
  event.preventDefault()
  console.log('Form submitted')
}

function handleFocus() {
  console.log('Input focused')
}

function handleBlur() {
  console.log('Input blurred')
}

function handleChange(event) {
  console.log('Value changed:', event.target.value)
}

function handleInput(event) {
  console.log('Input value:', event.target.value)
}
</script>
```

---

## 2. **TRUYỀN PARAMETERS**

### 2.1. Truyền tham số cho handler

```vue
<template>
  <div>
    <!-- Không có tham số -->
    <button @click="handleClick">Click</button>
    
    <!-- Có tham số -->
    <button @click="handleClickWithParam('Hello')">Click with param</button>
    
    <!-- Nhiều tham số -->
    <button @click="handleMultipleParams('John', 25)">Multiple params</button>
    
    <!-- Truyền $event nếu cần -->
    <button @click="handleClickWithEvent($event, 'extra')">With event</button>
  </div>
</template>

<script setup>
function handleClick() {
  console.log('Clicked!')
}

function handleClickWithParam(message) {
  console.log(message) // "Hello"
}

function handleMultipleParams(name, age) {
  console.log(name, age) // "John", 25
}

function handleClickWithEvent(event, extra) {
  console.log('Event:', event)
  console.log('Extra:', extra)
  console.log('Target:', event.target)
}
</script>
```

### 2.2. Truyền data từ v-for

```vue
<template>
  <div>
    <ul>
      <li 
        v-for="item in items" 
        :key="item.id"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    
    <p v-if="selectedItem">
      Selected: {{ selectedItem.name }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
])

const selectedItem = ref(null)

function selectItem(item) {
  selectedItem.value = item
  console.log('Selected:', item.name)
}
</script>
```

---

## 3. **EVENT MODIFIERS**

Event modifiers giúp xử lý events dễ dàng hơn mà không cần viết code phức tạp.

### 3.1. .stop - Ngăn event bubbling

```vue
<template>
  <div @click="handleOuterClick">
    <p>Outer div</p>
    <!-- Click vào button sẽ KHÔNG trigger handleOuterClick -->
    <button @click.stop="handleButtonClick">Click me</button>
  </div>
</template>

<script setup>
function handleOuterClick() {
  console.log('Outer clicked')
}

function handleButtonClick() {
  console.log('Button clicked')
  // handleOuterClick sẽ KHÔNG được gọi
}
</script>
```

**Không có `.stop`:**
```vue
<!-- Click button sẽ trigger CẢ handleButtonClick VÀ handleOuterClick -->
<button @click="handleButtonClick">Click</button>
```

**Có `.stop`:**
```vue
<!-- Click button CHỈ trigger handleButtonClick -->
<button @click.stop="handleButtonClick">Click</button>
```

### 3.2. .prevent - Ngăn default behavior

```vue
<template>
  <div>
    <!-- Form submit không reload trang -->
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="email" />
      <button type="submit">Submit</button>
    </form>
    
    <!-- Link không navigate -->
    <a href="/page" @click.prevent="handleLinkClick">Go to page</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

function handleSubmit() {
  console.log('Form submitted:', email.value)
  // Trang không reload
}

function handleLinkClick() {
  console.log('Link clicked')
  // Không navigate đến /page
}
</script>
```

### 3.3. .once - Chỉ trigger một lần

```vue
<template>
  <div>
    <button @click.once="handleOnceClick">
      Click me (only once)
    </button>
  </div>
</template>

<script setup>
function handleOnceClick() {
  alert('This will only show once!')
  // Lần click sau sẽ không trigger
}
</script>
```

### 3.4. .capture - Sử dụng capture phase

```vue
<template>
  <div @click.capture="handleCapture">
    <button @click="handleButtonClick">Click</button>
  </div>
</template>

<script setup>
function handleCapture() {
  console.log('Capture phase') // Chạy TRƯỚC
}

function handleButtonClick() {
  console.log('Bubble phase') // Chạy SAU
}
</script>
```

### 3.5. .self - Chỉ trigger khi click chính element đó

```vue
<template>
  <div @click.self="handleSelfClick">
    <p>Click vào div này sẽ trigger</p>
    <button>Click vào button KHÔNG trigger</button>
  </div>
</template>

<script setup>
function handleSelfClick() {
  console.log('Only triggered when clicking the div itself')
}
</script>
```

### 3.6. Chaining modifiers

Bạn có thể chain nhiều modifiers:

```vue
<template>
  <div>
    <!-- Ngăn cả bubbling và default behavior -->
    <form @submit.prevent.stop="handleSubmit">
      <button type="submit">Submit</button>
    </form>
    
    <!-- Chỉ trigger một lần và ngăn bubbling -->
    <div @click.stop.once="handleClick">
      <button>Click</button>
    </div>
  </div>
</template>
```

---

## 4. **KEY MODIFIERS**

Key modifiers giúp bắt events khi nhấn phím cụ thể.

### 4.1. Key names

```vue
<template>
  <div>
    <!-- Enter key -->
    <input 
      @keyup.enter="handleEnter"
      placeholder="Press Enter"
    />
    
    <!-- Escape key -->
    <input 
      @keyup.esc="handleEscape"
      placeholder="Press Esc"
    />
    
    <!-- Tab key -->
    <input 
      @keyup.tab="handleTab"
      placeholder="Press Tab"
    />
    
    <!-- Delete key -->
    <input 
      @keyup.delete="handleDelete"
      placeholder="Press Delete"
    />
  </div>
</template>

<script setup>
function handleEnter() {
  console.log('Enter pressed')
}

function handleEscape() {
  console.log('Escape pressed')
}

function handleTab() {
  console.log('Tab pressed')
}

function handleDelete() {
  console.log('Delete pressed')
}
</script>
```

### 4.2. System modifier keys

```vue
<template>
  <div>
    <!-- Ctrl + Click -->
    <button @click.ctrl="handleCtrlClick">Ctrl + Click</button>
    
    <!-- Alt + Click -->
    <button @click.alt="handleAltClick">Alt + Click</button>
    
    <!-- Shift + Click -->
    <button @click.shift="handleShiftClick">Shift + Click</button>
    
    <!-- Meta (Cmd on Mac, Windows key on Windows) -->
    <button @click.meta="handleMetaClick">Meta + Click</button>
    
    <!-- Exact modifier -->
    <button @click.ctrl.exact="handleExactCtrl">
      Only Ctrl (no other keys)
    </button>
  </div>
</template>
```

### 4.3. Mouse button modifiers

```vue
<template>
  <div>
    <!-- Left click -->
    <button @click.left="handleLeftClick">Left click</button>
    
    <!-- Right click -->
    <button @click.right="handleRightClick">Right click</button>
    
    <!-- Middle click -->
    <button @click.middle="handleMiddleClick">Middle click</button>
  </div>
</template>
```

---

## 5. **VÍ DỤ THỰC TẾ**

### 5.1. Todo App với Event Handling

```vue
<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    
    <!-- Add todo -->
    <div class="add-todo">
      <input 
        v-model.trim="newTodo"
        @keyup.enter="addTodo"
        @keyup.esc="clearInput"
        placeholder="Add todo (Enter to add, Esc to clear)"
      />
      <button @click="addTodo">Add</button>
    </div>
    
    <!-- Todo list -->
    <ul>
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
        @click="toggleTodo(todo.id)"
        @contextmenu.prevent="deleteTodo(todo.id)"
      >
        <span>{{ todo.text }}</span>
        <button 
          @click.stop="deleteTodo(todo.id)"
          class="delete-btn"
        >
          Delete
        </button>
      </li>
    </ul>
    
    <!-- Keyboard shortcuts hint -->
    <p class="hint">
      💡 Click to toggle | Right-click to delete | Enter to add
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([
  { id: 1, text: 'Learn Vue.js', completed: false },
  { id: 2, text: 'Build a project', completed: true }
])
let nextId = 3

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

function clearInput() {
  newTodo.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function deleteTodo(id) {
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

.delete-btn {
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
}

.hint {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
```

### 5.2. Search với Debounce

```vue
<template>
  <div class="search-app">
    <h1>Search App</h1>
    
    <input 
      v-model="searchQuery"
      @input="handleSearch"
      @keyup.enter="performSearch"
      placeholder="Type to search..."
    />
    
    <div v-if="results.length > 0">
      <h2>Results:</h2>
      <ul>
        <li v-for="result in results" :key="result.id">
          {{ result.title }}
        </li>
      </ul>
    </div>
    
    <p v-else-if="searchQuery && !isSearching">
      No results found
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const results = ref([])
const isSearching = ref(false)
let searchTimeout = null

function handleSearch() {
  clearTimeout(searchTimeout)
  isSearching.value = true
  
  // Debounce: chỉ search sau 500ms khi user ngừng gõ
  searchTimeout = setTimeout(() => {
    performSearch()
  }, 500)
}

function performSearch() {
  if (!searchQuery.value.trim()) {
    results.value = []
    isSearching.value = false
    return
  }
  
  // Simulate API call
  setTimeout(() => {
    results.value = [
      { id: 1, title: `Result 1 for "${searchQuery.value}"` },
      { id: 2, title: `Result 2 for "${searchQuery.value}"` }
    ]
    isSearching.value = false
  }, 300)
}
</script>
```

---

## 6. **TỔNG KẾT**

- ✅ **v-on** (`@`) để bắt events
- ✅ **Event modifiers**: `.stop`, `.prevent`, `.once`, `.capture`, `.self`
- ✅ **Key modifiers**: `.enter`, `.esc`, `.ctrl`, `.alt`, `.shift`
- ✅ **Mouse modifiers**: `.left`, `.right`, `.middle`
- ✅ Có thể chain nhiều modifiers
- ✅ Truyền parameters và `$event` khi cần

---

**Bài tiếp theo:** [05. Components](../02_components/05_components.md) - Học cách tạo và sử dụng Single-File Components (SFC).
