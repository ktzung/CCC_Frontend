# 🟢 TUẦN 6 - BÀI 04 (VUE.JS)
# **THIẾT LẬP MÔI TRƯỜNG — Vite + Vue DevTools**

---

## 0. 🎬 Opening Hook

*Minh hỏi: "Vue setup chắc phức tạp như Webpack không? Config dài 200 dòng?"*

*Anh Hùng gõ 3 lệnh:*
```bash
npm create vue@latest my-app
cd my-app
npm run dev
```

*"Xong. Development server chạy tại localhost:5173. Hot Module Replacement — save file → browser update ngay, không reload toàn trang, không mất state."*

*Minh: "...Chỉ vậy thôi?"*

*"Vite," anh Hùng nói. "Nhanh hơn Webpack 10-100 lần trong development. Đây là lý do Vue 3 + Vite đang thay thế Create React App."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Dev environment tốt = năng suất cao. Vite + Vue DevTools cho phép:
- **HMR (Hot Module Replacement)**: Sửa code → browser cập nhật ngay, không mất state
- **Vue DevTools**: Nhìn thấy component tree, reactive state, events real-time trong browser
- **TypeScript support sẵn** (optional nhưng recommended cho project lớn)
- **Build tối ưu** với `npm run build` — tree-shaking, minify, code splitting

---

## 2. 🌐 Big Picture — Vite vs Webpack

```
WEBPACK (cũ, dùng CRA)              VITE (mới, dùng Vue/React hiện đại)
────────────────────────────        ────────────────────────────────────
Bundle toàn bộ code trước khi serve  Serve file gốc, browser import trực tiếp
Dev start: 10-60 giây               Dev start: < 1 giây
HMR: Chậm (re-bundle module)        HMR: Nhanh (chỉ gửi module thay đổi)
Config: Phức tạp (200+ dòng)        Config: Đơn giản (10-20 dòng)

Khi nào Webpack vẫn cần:
- Project cũ (legacy)
- Micro-frontend phức tạp
- Custom loaders không có Vite plugin

Vite dùng:
- Vue 3 (chính thức)
- React (Vite template react)
- SvelteKit, SolidJS
```

---

## 3. ⚙️ Core Technical Truth

### Tạo Project Vue 3 + Vite

```bash
# Cách 1: Official Vue CLI (Khuyên dùng)
npm create vue@latest my-vue-app
```

**Interactive options — Chọn cho học tập:**
```
✔ Project name: my-vue-app
✔ Add TypeScript?               → No  (học JS trước)
✔ Add JSX Support?              → No  (dùng template)
✔ Add Vue Router?               → Yes (cần navigation)
✔ Add Pinia?                    → Yes (state management)
✔ Add Vitest?                   → No  (thêm sau)
✔ Add End-to-End Testing?       → No  (thêm sau)
✔ Add ESLint?                   → Yes (code quality)
✔ Add Prettier?                 → Yes (auto format)
```

```bash
cd my-vue-app
npm install    # Cài dependencies
npm run dev    # Start dev server → http://localhost:5173
```

---

### Cấu trúc thư mục

```
my-vue-app/
│
├── public/                  # Static files — copy thẳng vào dist
│   └── favicon.ico
│
├── src/                     ← TẤT CẢ CODE CỦA BẠN Ở ĐÂY
│   ├── assets/              # Images, fonts, global CSS
│   │   └── main.css
│   │
│   ├── components/          # Reusable components
│   │   ├── ui/              # Generic UI (Button, Card, Input)
│   │   └── features/        # Feature-specific (ProductCard, CartItem)
│   │
│   ├── views/               # Page components (được load bởi Router)
│   │   ├── HomeView.vue
│   │   ├── ProductsView.vue
│   │   └── CartView.vue
│   │
│   ├── stores/              # Pinia stores (global state)
│   │   ├── cart.js
│   │   └── user.js
│   │
│   ├── router/              # Vue Router config
│   │   └── index.js
│   │
│   ├── composables/         # Reusable Composition functions
│   │   ├── useApi.js        # Fetch wrapper
│   │   └── useLocalStorage.js
│   │
│   ├── App.vue              # Root component
│   └── main.js              # Entry point
│
├── index.html               # Shell HTML
├── vite.config.js           # Vite config
├── .eslintrc.cjs            # ESLint rules
└── package.json
```

---

### File quan trọng giải thích từng dòng

```html
<!-- index.html — Chỉ có cái này được serve -->
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Vue App</title>
</head>
<body>
    <div id="app"></div>  <!-- Vue mount vào đây -->
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

```javascript
// src/main.js — Entry point
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'  // Global CSS

const app = createApp(App)

app.use(createPinia())   // Global state
app.use(router)          // Client-side routing

app.mount('#app')  // Render App.vue vào <div id="app">
```

```vue
<!-- src/App.vue — Root component -->
<template>
    <!-- router-view hiển thị component tương ứng với URL hiện tại -->
    <nav>
        <!-- router-link = <a> nhưng không reload trang -->
        <RouterLink to="/">Trang chủ</RouterLink>
        <RouterLink to="/products">Sản phẩm</RouterLink>
        <RouterLink to="/cart">Giỏ hàng</RouterLink>
    </nav>

    <RouterView />  <!-- Đây là nơi views được render -->
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
```

```javascript
// src/router/index.js — Router config
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/products',
            name: 'products',
            // Lazy loading — chỉ load khi user navigate đến
            component: () => import('../views/ProductsView.vue'),
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',  // 404
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
})

export default router
```

---

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [vue()],

    resolve: {
        alias: {
            // @ = src/ — Dùng @/components thay vì ../../components
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    server: {
        port: 5173,
        open: true,  // Tự mở browser
        proxy: {
            // Proxy API calls để tránh CORS trong development
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        }
    },

    build: {
        outDir: 'dist',      // Output folder
        sourcemap: false,    // Không có sourcemap trong production
        rollupOptions: {
            output: {
                // Code splitting — tách thư viện ra file riêng
                manualChunks: {
                    vendor: ['vue', 'vue-router', 'pinia'],
                }
            }
        }
    }
})
```

---

### NPM Scripts

```bash
npm run dev      # Dev server với HMR (localhost:5173)
npm run build    # Build production → dist/
npm run preview  # Preview production build locally
npm run lint     # Chạy ESLint
```

---

### Vue DevTools — Debug tool thiết yếu

**Cài đặt:**
- Chrome/Edge: [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools)
- Firefox: [Vue.js devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

**Chức năng chính:**

```
DevTools Panel:
├── Components     → Component tree, xem và edit props/data real-time
├── Pinia          → Xem và modify global state
├── Router         → Route history, params, meta
└── Timeline       → Events, mutations, performance
```

**Cách dùng trong debug:**
```vue
<!-- Component bị lỗi: count không tăng -->
<script setup>
import { ref } from 'vue'
const count = ref(0)

function increment() {
    count++  // ❌ Bug! Quên .value
}
</script>

<!-- Mở DevTools → Components → tìm component
     Xem count = 0, không thay đổi
     → Bug: count++ thay vì count.value++
```

---

### Environment Variables

```bash
# .env (committed to git)
VITE_APP_NAME=My Vue App
VITE_API_URL=https://api.example.com

# .env.local (NOT committed — sensitive data)
VITE_API_KEY=abc123secret
```

```javascript
// Truy cập trong code
const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
const isProd = import.meta.env.PROD      // boolean
const isDev = import.meta.env.DEV        // boolean
```

> ⚠️ **Chỉ variables bắt đầu bằng `VITE_` mới được expose ra browser.** Không đặt tên `VITE_` cho secrets thật sự — chúng visible trong bundle JavaScript.

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`npm create vue@latest` → 3 câu hỏi Yes (Router, Pinia, ESLint) → `npm run dev`. 60 giây setup xong.**
> **`@` = alias cho `src/`. Dùng `@/components/...` thay vì `../../components/...`.**

---

## 5. 🏭 Real-world Layer

### Cấu trúc project thực tế (Medium-scale)

```
src/
├── components/
│   ├── ui/               # Design System components
│   │   ├── AppButton.vue
│   │   ├── AppCard.vue
│   │   └── AppModal.vue
│   └── features/
│       ├── product/
│       │   ├── ProductCard.vue
│       │   ├── ProductList.vue
│       │   └── ProductFilter.vue
│       └── cart/
│           ├── CartItem.vue
│           └── CartSummary.vue
│
├── views/
│   ├── HomeView.vue
│   ├── ProductsView.vue
│   ├── ProductDetailView.vue
│   ├── CartView.vue
│   └── CheckoutView.vue
│
├── stores/
│   ├── useProductStore.js    # Product catalog
│   ├── useCartStore.js       # Cart state
│   └── useAuthStore.js       # Auth state
│
├── composables/
│   ├── useApi.js             # Fetch wrapper với error handling
│   ├── useLocalStorage.js    # Persist state to localStorage
│   └── usePagination.js      # Pagination logic
│
└── utils/
    ├── formatters.js          # Date, currency formatters
    └── validators.js          # Form validation rules
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Setup và explore (25 phút)

```bash
# 1. Tạo project
npm create vue@latest learning-vue
cd learning-vue
npm install
npm run dev
```

**Thực hiện từng bước:**

1. Mở `http://localhost:5173` — thấy Vue welcome page
2. Sửa `src/App.vue` — đổi text, save — thấy HMR update ngay
3. Cài Vue DevTools → mở trang → inspect component tree
4. Tạo `src/components/HelloCard.vue`:

```vue
<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <button @click="count++">Clicks: {{ count }}</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ title: String, description: String })
const count = ref(0)
</script>

<style scoped>
.card { border: 2px solid #42b883; border-radius: 8px; padding: 1rem; }
button { background: #42b883; color: white; border: none; padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; }
</style>
```

5. Dùng trong `App.vue`:
```vue
<HelloCard title="Bài học 1" description="Vue 3 với Vite" />
```

6. Trong DevTools → Components → click HelloCard → thay đổi `count` trực tiếp

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Vite chỉ cho Vue"** | Vite là build tool độc lập. Hỗ trợ React, Svelte, Solid, Vanilla JS. `npm create vite@latest` có nhiều template. Vue chỉ là 1 trong số đó |
| **"npm run build rồi mới test được"** | Không cần. `npm run dev` = development server đủ để test mọi thứ. `npm run build` chỉ khi deploy production |
| **"Phải biết TypeScript mới dùng Vue 3 được"** | TypeScript optional trong Vue 3. JavaScript thuần hoạt động tốt. Thêm TypeScript sau khi đã hiểu Vue |
| **"Cấu trúc thư mục phải đúng như template"** | Template chỉ là suggestion. Bạn hoàn toàn tự do tổ chức thư mục. Nhưng convention `components/`, `views/`, `stores/` giúp team dễ navigate |
| **"`public/` và `src/assets/` như nhau"** | Khác: `public/` = copy nguyên vào dist, không qua Vite processing, truy cập bằng URL tuyệt đối `/favicon.ico`. `src/assets/` = được Vite process (optimize, hash filename), import trong code bằng `import` hoặc `url()` |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Vite khác Webpack ở điểm gì khiến nó nhanh hơn trong development?
2. Tại sao `router-link` tốt hơn `<a href>` trong Vue SPA?
3. Variables trong `.env` phải bắt đầu bằng gì mới được expose ra browser? Tại sao có giới hạn này?

### Câu hỏi áp dụng:

4. `public/logo.png` và `src/assets/logo.png` — dùng cái nào khi: (a) Logo trong component template, (b) Favicon trong index.html?
5. Bạn có file `.env.local` với `VITE_DB_PASSWORD=secret123`. Khi `npm run build`, password này có trong file JS không? Tại sao đây là vấn đề bảo mật?

<details>
<summary>👁️ Xem đáp án</summary>

1. Webpack bundle toàn bộ code thành 1 file trước khi serve → start chậm. Vite dùng **ES Modules native** — browser import files trực tiếp, Vite chỉ transform khi cần. Dev start = chỉ khởi động server, không bundle. HMR cũng nhanh hơn vì chỉ gửi module thay đổi (không re-bundle toàn bộ).
2. `<a href="/products">` = full page reload, mất Vue state. `<RouterLink to="/products">` = intercepts click, dùng History API, update URL không reload, render component mới → SPA experience đúng nghĩa. Cũng tự thêm `class="router-link-active"` cho active link (UI highlight).
3. Phải bắt đầu bằng `VITE_`. Vite chỉ embed variables có prefix `VITE_` vào bundle JavaScript vì chúng được expose ra browser (public). Variables không có prefix (`DB_PASSWORD`, `SECRET_KEY`) không được embed → không thể truy cập từ browser code. Nhưng `VITE_*` vẫn visible trong bundle JS → không bao giờ đặt API private keys, database passwords vào `VITE_*`.
4. (a) `src/assets/logo.png` — được Vite optimize, hash filename cho cache-busting, có thể import trong JS/Vue. (b) `public/favicon.ico` — `index.html` cần ref trực tiếp bằng URL tuyệt đối `/favicon.ico`, Vite không process `index.html` imports. File trong public được copy nguyên vào dist.
5. **Có** — `VITE_*` được embedded vào JS bundle. Bất kỳ ai download bundle JS đều có thể đọc được password. Đây là lỗ hổng bảo mật nghiêm trọng. Không bao giờ đặt database credentials, API private keys, JWT secrets vào `VITE_*` variables. Chúng chỉ được dùng cho public information (API public URL, feature flags, app name).

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `vite: command not found` | Vite chưa được cài đặt hoặc không có trong PATH | Chạy `npm create vue@latest` lại hoặc `npm install` trong project folder |
| `Port 5173 is already in use` | Process cũ đang giữ port | Dùng `npx vite --port 3000` hoặc kill process: `netstat -ano | findstr 5173` → `taskkill /PID <id>` |
| `Module "./xxx.vue" has no exported member 'default'` | Quên `<script setup>` hoặc thiếu `export default` trong script | Thêm `<script setup>` hoặc `export default { setup() { ... } }` |
| `The file does not exist at "src/components/xxx.vue" which is in the optimize deps directory` | Import sai path hoặc file bị xóa mà cache chưa update | Xóa `node_modules/.vite` rồi chạy lại `npm run dev` |
| `Unrecognized option: --host` | Vite version cũ không hỗ trợ flag | Nâng cấp: `npm install vite@latest` hoặc dùng `vite.config.js` với `server: { host: true }` |
| Hot Reload không hoạt động | File nằm ngoài `src/` hoặc symlink bị lỗi | Đảm bảo file nằm trong workspace, kiểm tra `vite.config.js` → `server.watch` |

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`npm create vue@latest`** → Vite + Vue 3 project trong 60 giây. Chọn Router + Pinia cho SPA đầy đủ
2. **`src/` structure**: `components/`, `views/`, `stores/`, `router/`, `composables/` — Convention quan trọng cho team
3. **`@` alias** = `src/` — Dùng `@/components/...` thay relative paths phức tạp
4. **`npm run dev`** để develop (HMR), **`npm run build`** khi deploy production
5. **`VITE_*` variables** visible trong browser — Không đặt secrets. **`public/` vs `assets/`** — public không qua Vite processing

---

## 10. ➡️ Next Lesson Bridge

*"Project setup, DevTools cài xong," Minh nói. "Giờ muốn học sâu hơn về directives và template syntax — v-for, v-if, v-model, tất cả chắc có nhiều tricks chưa biết."*

*"Đúng," anh Hùng nói. "v-for có `key`, có thể loop object. v-model có modifiers (`.lazy`, `.trim`, `.number`). v-bind có shorthand và object syntax. Template syntax = 30% của Vue — nắm kỹ là code nhanh hơn nhiều."*

**→ [Bài 05: Template Syntax & Directives](./03_template_syntax_directives.md) — Deep dive vào v-for, v-if, v-model, slots và conditional rendering patterns.**
