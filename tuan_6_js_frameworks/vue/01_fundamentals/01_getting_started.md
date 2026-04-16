# 🟢 MODULE 1 - BÀI 01
# **GIỚI THIỆU VUE.JS**

## 🎬 "Framework Nào Dễ Nhất Cho Người Mới?" — Câu Hỏi $1 Triệu

*Minh hỏi Google: "React vs Vue vs Angular cho beginner." 500 bài viết. Tranh cãi nảy lửa.*

*Anh Hùng: "Vue.js — 3 lý do: (1) Template giống HTML, không cần học JSX. (2) Reactivity tự động, không cần setState. (3) Tài liệu tiếng Việt nhiều nhất. 30 phút từ zero đến Counter App."*

> 💡 **Vue = 'Progressive Framework'** — bắt đầu nhỏ (thêm vào 1 trang), mở rộng lớn (SPA hoàn chỉnh). Không ép em all-in từ đầu.

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Vue.js là gì và tại sao nên học Vue.js
- So sánh được Vue.js với React và Angular
- Nắm được các khái niệm cơ bản của Vue.js
- Biết khi nào nên sử dụng Vue.js

---

## 1. **VUE.JS LÀ GÌ?**

Vue.js (phát âm là "view") là một **progressive JavaScript framework** để xây dựng user interface (giao diện người dùng).

### 1.1. Progressive Framework nghĩa là gì?

**Progressive** có nghĩa là bạn có thể:
- **Tích hợp từng phần:** Bắt đầu với một phần nhỏ của trang web, không cần viết lại toàn bộ
- **Mở rộng dần:** Khi cần, bạn có thể mở rộng thành một Single Page Application (SPA) hoàn chỉnh
- **Học từng bước:** Bắt đầu với HTML + Vue, sau đó thêm Router, State Management...

**Ví dụ:**
```html
<!-- Bạn có thể thêm Vue vào một phần của trang web -->
<div id="app">
  {{ message }}
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
  const { createApp } = Vue
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

### 1.2. Đặc điểm nổi bật của Vue.js

#### ✅ **Template Syntax dễ học**
- Giống HTML thuần, dễ đọc và hiểu
- Không cần học JSX như React
- Người mới bắt đầu có thể hiểu ngay

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>
```

#### ✅ **Reactivity System mạnh mẽ**
- Tự động cập nhật UI khi data thay đổi
- Không cần gọi `setState()` như React
- Vue tự động theo dõi và cập nhật

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++ // UI tự động cập nhật!
}
</script>
```

#### ✅ **Composition API linh hoạt**
- Vue 3 giới thiệu Composition API
- Tổ chức code theo logic thay vì theo lifecycle
- Dễ tái sử dụng và test hơn

#### ✅ **Bundle size nhỏ gọn**
- Vue 3 chỉ khoảng 34KB (gzipped)
- Nhỏ hơn React (~42KB) và Angular (~143KB)
- Tải nhanh, hiệu suất tốt

---

## 2. **SO SÁNH VUE.JS VỚI CÁC FRAMEWORK KHÁC**

### 2.1. Vue.js vs React

| Tiêu chí | Vue.js | React |
|----------|--------|-------|
| **Learning Curve** | ⭐⭐⭐⭐⭐ Dễ học | ⭐⭐⭐ Trung bình |
| **Template** | HTML-like (dễ đọc) | JSX (JavaScript + HTML) |
| **State Management** | Built-in (Pinia/Vuex) | External (Redux) |
| **Bundle Size** | ~34KB | ~42KB |
| **Performance** | Rất tốt | Tốt |
| **Community** | Lớn, đang phát triển | Rất lớn, mature |
| **Use Case** | Progressive, từ nhỏ đến lớn | SPA, Mobile apps |

**Khi nào chọn Vue.js:**
- Bạn mới bắt đầu học framework
- Cần tích hợp vào dự án hiện có
- Muốn syntax đơn giản, dễ đọc
- Làm việc với team nhỏ hoặc solo

**Khi nào chọn React:**
- Cần ecosystem lớn (nhiều thư viện)
- Làm việc với team lớn
- Cần React Native cho mobile
- Đã quen với JSX

### 2.2. Vue.js vs Angular

| Tiêu chí | Vue.js | Angular |
|----------|--------|---------|
| **Learning Curve** | ⭐⭐⭐⭐⭐ Dễ học | ⭐⭐ Khó học |
| **TypeScript** | Optional | Required |
| **Bundle Size** | ~34KB | ~143KB |
| **Complexity** | Đơn giản | Phức tạp |
| **Use Case** | Progressive, flexible | Enterprise apps |
| **CLI** | Vite/Vue CLI | Angular CLI |

**Khi nào chọn Vue.js:**
- Muốn học nhanh, dễ hiểu
- Cần flexibility cao
- Dự án nhỏ đến trung bình

**Khi nào chọn Angular:**
- Dự án enterprise lớn
- Team đã quen TypeScript
- Cần full-featured framework (routing, forms, HTTP built-in)

---

## 3. **CÁC KHÁI NIỆM CƠ BẢN CỦA VUE.JS**

### 3.1. Components (Thành phần)

Component là các khối xây dựng của ứng dụng Vue. Mỗi component là một phần độc lập, có thể tái sử dụng.

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <img :src="avatar" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  email: String,
  avatar: String
})
</script>
```

### 3.2. Template Syntax

Vue sử dụng template syntax đặc biệt để bind data vào HTML:

- **Interpolation:** `{{ message }}` - Hiển thị giá trị
- **Directives:** `v-if`, `v-for`, `v-bind`, `v-on` - Điều khiển DOM
- **Shorthand:** `@click` thay cho `v-on:click`, `:src` thay cho `v-bind:src`

```vue
<template>
  <!-- Interpolation -->
  <p>{{ message }}</p>
  
  <!-- Directives -->
  <div v-if="isVisible">Hiển thị khi isVisible = true</div>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
  
  <!-- Event handling -->
  <button @click="handleClick">Click me</button>
</template>
```

### 3.3. Reactivity (Tính phản ứng)

Vue tự động theo dõi các thay đổi của data và cập nhật UI:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0) // Reactive reference

function increment() {
  count.value++ // Thay đổi này tự động cập nhật UI
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 3.4. Single-File Components (SFC)

Vue cho phép viết component trong một file duy nhất với 3 phần:
- `<template>` - HTML
- `<script>` - JavaScript logic
- `<style>` - CSS

```vue
<template>
  <div class="greeting">
    <h1>{{ greeting }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const greeting = ref('Hello Vue!')
</script>

<style scoped>
.greeting {
  color: #42b983;
}
</style>
```

---

## 4. **KHI NÀO NÊN SỬ DỤNG VUE.JS?**

### ✅ Nên dùng Vue.js khi:

1. **Bạn mới bắt đầu học framework**
   - Syntax đơn giản, dễ hiểu
   - Tài liệu tiếng Việt phong phú
   - Community hỗ trợ tốt

2. **Cần tích hợp vào dự án hiện có**
   - Progressive framework
   - Có thể thêm vào một phần của trang web
   - Không cần viết lại toàn bộ

3. **Xây dựng SPA (Single Page Application)**
   - Vue Router mạnh mẽ
   - State management với Pinia
   - Performance tốt

4. **Dự án nhỏ đến trung bình**
   - Setup nhanh
   - Bundle size nhỏ
   - Development experience tốt

5. **Team nhỏ hoặc solo developer**
   - Học nhanh
   - Productivity cao
   - Ít boilerplate code

### ❌ Có thể cân nhắc framework khác khi:

1. **Dự án enterprise rất lớn**
   - Có thể cân nhắc Angular (nếu team đã quen)
   - Hoặc React (nếu cần ecosystem lớn)

2. **Cần React Native cho mobile**
   - React có React Native
   - Vue có NativeScript-Vue nhưng ít phổ biến hơn

3. **Team đã quen với framework khác**
   - Nếu team đã master React/Angular, có thể tiếp tục

---

## 5. **VÍ DỤ ĐẦU TIÊN**

Hãy xem một ví dụ đơn giản để cảm nhận sức mạnh của Vue:

```vue
<template>
  <div class="counter">
    <h1>Counter App</h1>
    <p>Count: {{ count }}</p>
    <div class="buttons">
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
    <p v-if="count > 10" class="warning">
      Count đã vượt quá 10!
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const count = ref(0)

// Methods
function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}
</script>

<style scoped>
.counter {
  text-align: center;
  padding: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.warning {
  color: red;
  font-weight: bold;
}
</style>
```

**Giải thích:**
- `{{ count }}` - Hiển thị giá trị count
- `@click` - Bắt sự kiện click
- `v-if` - Điều kiện hiển thị
- `ref()` - Tạo reactive reference
- Khi `count.value` thay đổi, UI tự động cập nhật!

---

## 6. **TỔNG KẾT**

- ✅ **Vue.js** là progressive framework dễ học, mạnh mẽ
- ✅ **Template syntax** giống HTML, dễ đọc và hiểu
- ✅ **Reactivity system** tự động cập nhật UI
- ✅ **Single-File Components** giúp tổ chức code tốt
- ✅ Phù hợp cho người mới bắt đầu và dự án từ nhỏ đến lớn

---

**Bài tiếp theo:** [02. Development Environment](./02_development_environment.md) - Học cách setup project Vue.js với Vite và Vue CLI.
