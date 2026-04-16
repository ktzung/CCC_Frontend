# 🟢 MODULE 1 - BÀI 02
# **THIẾT LẬP MÔI TRƯỜNG PHÁT TRIỂN**

## 🎬 "npm create vue@latest — Xong Setup Trong 60 Giây" — Vite + DevTools

*Minh: "Vue setup chắc cần Webpack config dài 200 dòng?" Anh Hùng: "`npm create vue@latest` → chọn TypeScript, Router, Pinia → Done. Vite build trong 200ms (Webpack: 20 giây). Vue DevTools trong Chrome = nhìn thấy state, component tree, events real-time."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Biết cách cài đặt Node.js và npm
- Tạo project Vue.js với Vite (khuyên dùng) hoặc Vue CLI
- Hiểu cấu trúc thư mục của một dự án Vue
- Cài đặt và sử dụng Vue DevTools
- Chạy development server và build production

---

## 1. **YÊU CẦU TIÊN QUYẾT**

### 1.1. Node.js và npm

Vue.js yêu cầu **Node.js** (phiên bản 16.0 trở lên) và **npm** (Node Package Manager).

**Kiểm tra đã cài đặt chưa:**
```bash
node --version
# v18.17.0 hoặc cao hơn

npm --version
# 9.0.0 hoặc cao hơn
```

**Nếu chưa có, cài đặt:**
1. Truy cập [nodejs.org](https://nodejs.org)
2. Tải bản LTS (Long Term Support) - khuyên dùng
3. Cài đặt theo hướng dẫn
4. Mở Terminal và kiểm tra lại

### 1.2. Code Editor

Khuyên dùng **VS Code** với các extension:
- **Volar** (Vue Language Features) - Hỗ trợ Vue 3
- **ESLint** - Kiểm tra lỗi code
- **Prettier** - Format code tự động

---

## 2. **TẠO PROJECT VỚI VITE (KHUYÊN DÙNG)**

**Vite** (phát âm là "veet") là build tool mới, nhanh hơn rất nhiều so với Vue CLI. Đây là cách được khuyên dùng trong Vue 3.

### 2.1. Tạo project mới

```bash
# Tạo project Vue với Vite
npm create vue@latest my-vue-app

# Hoặc với yarn
yarn create vue my-vue-app

# Hoặc với pnpm
pnpm create vue my-vue-app
```

**Quá trình tạo project sẽ hỏi bạn:**
```
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

**Cho người mới bắt đầu, chọn:**
- TypeScript: **No** (học JavaScript trước)
- JSX Support: **No** (dùng template syntax)
- Vue Router: **Yes** (sẽ cần cho routing)
- Pinia: **Yes** (state management)
- Vitest: **No** (có thể thêm sau)
- E2E Testing: **No** (có thể thêm sau)
- ESLint: **Yes** (giúp code sạch)
- Prettier: **Yes** (format code tự động)

### 2.2. Cài đặt dependencies

Sau khi tạo project, vào thư mục và cài đặt:

```bash
cd my-vue-app
npm install
```

### 2.3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173` (hoặc port khác nếu 5173 đã được dùng).

### 2.4. Cấu trúc thư mục

```
my-vue-app/
├── node_modules/          # Thư viện đã cài (không chỉnh sửa)
├── public/                # File tĩnh (favicon, images)
│   └── favicon.ico
├── src/                   # CODE CỦA BẠN Ở ĐÂY
│   ├── assets/            # Assets (images, CSS)
│   ├── components/        # Components có thể tái sử dụng
│   │   └── HelloWorld.vue
│   ├── router/            # Vue Router config (nếu chọn)
│   │   └── index.js
│   ├── stores/            # Pinia stores (nếu chọn)
│   │   └── counter.js
│   ├── App.vue            # Root component
│   ├── main.js            # Entry point
│   └── style.css          # Global styles
├── .gitignore             # Git ignore rules
├── index.html             # HTML template
├── package.json           # Dependencies và scripts
├── vite.config.js         # Vite configuration
└── README.md              # Hướng dẫn
```

**Giải thích các file quan trọng:**

#### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

#### `src/main.js` - Entry point
```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Nếu có router
import { createPinia } from 'pinia' // Nếu có Pinia

const app = createApp(App)

app.use(router) // Sử dụng router
app.use(createPinia()) // Sử dụng Pinia

app.mount('#app') // Mount vào #app trong index.html
```

#### `src/App.vue` - Root component
```vue
<template>
  <div id="app">
    <router-view /> <!-- Hiển thị component theo route -->
  </div>
</template>

<script setup>
// Composition API
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
```

---

## 3. **TẠO PROJECT VỚI VUE CLI (TÙY CHỌN)**

Vue CLI vẫn được hỗ trợ nhưng Vite được khuyên dùng hơn. Nếu bạn muốn dùng Vue CLI:

```bash
# Cài đặt Vue CLI globally
npm install -g @vue/cli

# Tạo project
vue create my-vue-app

# Chọn preset (Vue 3, Vue 2, hoặc Manual)
```

**Lưu ý:** Vue CLI sử dụng webpack, chậm hơn Vite khi development.

---

## 4. **VUE DEVTOOLS**

Vue DevTools là extension trình duyệt giúp debug và inspect Vue components.

### 4.1. Cài đặt

**Chrome/Edge:**
1. Mở [Chrome Web Store](https://chrome.google.com/webstore)
2. Tìm "Vue.js devtools"
3. Click "Add to Chrome"

**Firefox:**
1. Mở [Firefox Add-ons](https://addons.mozilla.org)
2. Tìm "Vue.js devtools"
3. Click "Add to Firefox"

### 4.2. Sử dụng

1. Mở ứng dụng Vue trong trình duyệt
2. Mở Developer Tools (F12)
3. Tìm tab **"Vue"** (nếu không thấy, có thể cần refresh)

**Các tính năng:**
- **Components:** Xem cây component, props, data
- **Timeline:** Theo dõi events và state changes
- **Vuex/Pinia:** Inspect state management
- **Performance:** Đo hiệu suất

**Ví dụ sử dụng:**
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello Vue!')
</script>
```

Trong DevTools, bạn sẽ thấy:
- Component tree
- `count: 0`
- `message: "Hello Vue!"`
- Có thể chỉnh sửa giá trị trực tiếp để test

---

## 5. **SCRIPTS VÀ COMMANDS**

Trong `package.json`, có các scripts:

```json
{
  "scripts": {
    "dev": "vite",              // Chạy dev server
    "build": "vite build",      // Build production
    "preview": "vite preview"   // Preview production build
  }
}
```

### 5.1. Development

```bash
npm run dev
```

- Chạy development server
- Hot Module Replacement (HMR) - Tự động reload khi code thay đổi
- Fast refresh - Giữ state khi component update

### 5.2. Build Production

```bash
npm run build
```

Tạo thư mục `dist/` chứa:
- HTML, CSS, JS đã được optimize
- Code đã được minify và tree-shake
- Sẵn sàng deploy lên server

### 5.3. Preview Production Build

```bash
npm run preview
```

Chạy local server để xem production build trước khi deploy.

---

## 6. **CẤU HÌNH VITE**

File `vite.config.js` cho phép tùy chỉnh Vite:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // Đổi port mặc định
    open: true  // Tự động mở browser
  },
  build: {
    outDir: 'dist', // Thư mục output
    sourcemap: true // Tạo source map cho debug
  }
})
```

---

## 7. **VÍ DỤ: TẠO COMPONENT ĐẦU TIÊN**

Tạo file `src/components/Counter.vue`:

```vue
<template>
  <div class="counter">
    <h2>Counter: {{ count }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

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

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
```

Sử dụng trong `App.vue`:

```vue
<template>
  <div id="app">
    <Counter />
  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
</script>
```

---

## 8. **TROUBLESHOOTING**

### Lỗi: "Cannot find module 'vue'"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Port đã được sử dụng
```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000 // Đổi sang port khác
  }
})
```

### Vue DevTools không hiển thị
- Đảm bảo đang chạy ở development mode (`npm run dev`)
- Refresh trang
- Kiểm tra extension đã được enable chưa

---

## 9. **TỔNG KẾT**

- ✅ **Vite** là build tool được khuyên dùng cho Vue 3
- ✅ Cấu trúc thư mục rõ ràng: `src/` chứa code, `public/` chứa assets
- ✅ **Vue DevTools** giúp debug và inspect components
- ✅ `npm run dev` để development, `npm run build` để production
- ✅ Hot Module Replacement giúp development nhanh chóng

---

**Bài tiếp theo:** [03. Template Syntax & Directives](./03_template_syntax_directives.md) - Học cách sử dụng template syntax và các directives của Vue.
