# 🟢 MODULE 2 - BÀI 06
# **COMPONENT COMMUNICATION (PROPS & EVENTS)**

## 🎬 "Props Xuống, Events Lên — Luật Bất Di Bất Dịch" — Giao Tiếp Component

*Minh muốn con sửa data của cha. Anh Hùng: "KHÔNG. Props = cha đưa con (read-only). Events = con BÁO CÁO lên cha. Cha quyết định sửa hay không. Đây là one-way data flow — giữ app PREDICTABLE. Vi phạm = bugs khắp nơi."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu và sử dụng **Props** để truyền data từ cha xuống con
- Hiểu và sử dụng **Events** để truyền data từ con lên cha
- Validate props với TypeScript hoặc validators
- Sử dụng `v-model` với custom components
- Hiểu data flow trong Vue (one-way data flow)

---

## 1. **PROPS (PARENT → CHILD)**

Props là cách truyền data từ component **cha xuống component con**.

### 1.1. Cú pháp cơ bản

**Parent Component:**
```vue
<template>
  <div>
    <ChildComponent 
      :name="userName"
      :age="userAge"
      :isActive="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const userName = ref('Khoa')
const userAge = ref(25)
</script>
```

**Child Component:**
```vue
<template>
  <div>
    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
    <p v-if="isActive">Status: Active</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  age: Number,
  isActive: Boolean
})
</script>
```

### 1.2. Props với default values

```vue
<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  },
  email: {
    type: String,
    default: 'no-email@example.com'
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>
```

### 1.3. Props validation

```vue
<script setup>
defineProps({
  // String với validator
  status: {
    type: String,
    required: true,
    validator: (value) => {
      return ['active', 'inactive', 'pending'].includes(value)
    }
  },
  
  // Number với range
  score: {
    type: Number,
    validator: (value) => {
      return value >= 0 && value <= 100
    }
  },
  
  // Object với default function
  config: {
    type: Object,
    default: () => ({
      theme: 'light',
      language: 'en'
    })
  },
  
  // Array với default
  items: {
    type: Array,
    default: () => []
  }
})
</script>
```

### 1.4. Sử dụng props trong script

```vue
<script setup>
const props = defineProps({
  name: String,
  age: Number
})

// Sử dụng props
console.log(props.name)
console.log(props.age)

// Computed từ props
import { computed } from 'vue'
const displayName = computed(() => {
  return props.name.toUpperCase()
})
</script>
```

---

## 2. **EVENTS (CHILD → PARENT)**

Events là cách truyền data từ component **con lên component cha**.

### 2.1. Emit events

**Child Component:**
```vue
<template>
  <div>
    <button @click="handleClick">Click me</button>
    <input 
      v-model="inputValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['click', 'input', 'submit'])

const inputValue = ref('')

function handleClick() {
  emit('click', 'Button was clicked!')
}

function handleInput() {
  emit('input', inputValue.value)
}

function handleSubmit() {
  emit('submit', {
    value: inputValue.value,
    timestamp: Date.now()
  })
}
</script>
```

**Parent Component:**
```vue
<template>
  <div>
    <ChildComponent 
      @click="handleChildClick"
      @input="handleChildInput"
      @submit="handleChildSubmit"
    />
  </div>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'

function handleChildClick(message) {
  console.log(message) // "Button was clicked!"
}

function handleChildInput(value) {
  console.log('Input:', value)
}

function handleChildSubmit(data) {
  console.log('Submitted:', data)
}
</script>
```

### 2.2. Event validation

```vue
<script setup>
const emit = defineEmits({
  // Không validate
  click: null,
  
  // Validate với function
  submit: (payload) => {
    // Phải return true để emit được
    return payload && typeof payload === 'object'
  }
})
</script>
```

---

## 3. **V-MODEL VỚI CUSTOM COMPONENTS**

Để component con hỗ trợ `v-model`:

**Child Component:**
```vue
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>
```

**Parent Component:**
```vue
<template>
  <CustomInput v-model="message" />
  <p>Message: {{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'

const message = ref('')
</script>
```

**Với tên prop tùy chỉnh:**
```vue
<!-- Child -->
<script setup>
defineProps({
  title: String
})

defineEmits(['update:title'])
</script>

<!-- Parent -->
<CustomInput v-model:title="pageTitle" />
```

---

## 4. **VÍ DỤ THỰC TẾ: TODO APP**

```vue
<!-- TodoItem.vue (Child) -->
<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input 
      type="checkbox"
      :checked="todo.completed"
      @change="toggleComplete"
    />
    <span class="todo-text">{{ todo.text }}</span>
    <button @click="deleteTodo">Delete</button>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete'])

function toggleComplete() {
  emit('toggle', props.todo.id)
}

function deleteTodo() {
  emit('delete', props.todo.id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.completed .todo-text {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
```

```vue
<!-- TodoList.vue (Parent) -->
<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="handleToggle"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

const todos = ref([
  { id: 1, text: 'Learn Vue', completed: false },
  { id: 2, text: 'Build app', completed: true }
])

function handleToggle(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function handleDelete(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>
```

---

## 5. **DATA FLOW TRONG VUE**

Vue tuân theo **one-way data flow**:

```
Parent Component
    ↓ (Props)
Child Component
    ↑ (Events)
Parent Component
```

**Quy tắc:**
- ✅ Data chảy từ cha xuống con qua **Props**
- ✅ Con không thể sửa props trực tiếp
- ✅ Con thông báo cho cha qua **Events**
- ✅ Cha quyết định có sửa data hay không

**Ví dụ sai:**
```vue
<!-- ❌ KHÔNG được sửa props trực tiếp -->
<script setup>
const props = defineProps({ count: Number })

function increment() {
  props.count++ // ❌ Lỗi! Props là read-only
}
</script>
```

**Ví dụ đúng:**
```vue
<!-- ✅ Emit event để cha xử lý -->
<script setup>
const props = defineProps({ count: Number })
const emit = defineEmits(['update'])

function increment() {
  emit('update', props.count + 1) // ✅ Đúng
}
</script>
```

---

## 6. **TỔNG KẾT**

- ✅ **Props** truyền data từ cha xuống con (one-way)
- ✅ **Events** truyền data từ con lên cha
- ✅ Validate props với `type`, `required`, `default`, `validator`
- ✅ `v-model` với custom components qua `modelValue` và `update:modelValue`
- ✅ Tuân theo one-way data flow

---

**Bài tiếp theo:** [07. Methods & Computed Properties](./07_methods_computed_properties.md) - Học cách sử dụng methods, computed properties và watchers.
