# 🟩 BÀI 05: TAILWINDCSS - ADVANCED

## 🎬 "Class Dài 15 Từ, Copy-Paste 50 Lần" — Khi Utility-First Cần @apply

*Minh copy-paste `class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"` lần thứ 20. "Tailwind bắt đầu khó chịu rồi."*

*Anh Hùng: "@apply — viết 1 lần, dùng mãi mãi. `.btn-primary { @apply px-4 py-2 bg-blue-500...; }` Giờ chỉ cần `class='btn-primary'`. Tailwind + DRY principle."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng @apply directive để tạo component classes
- Tạo và sử dụng TailwindCSS plugins
- Optimize performance với PurgeCSS
- Áp dụng best practices
- Xử lý các trường hợp đặc biệt

---

# 1. **@APPLY DIRECTIVE**

`@apply` cho phép bạn extract utilities vào một class riêng, giúp code gọn và dễ maintain hơn.

## 1.1. Cú pháp cơ bản

```css
/* custom.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold;
  }
}
```

**Sử dụng:**
```html
<button class="btn-primary">Click me</button>
```

**Thay vì:**
```html
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">
  Click me
</button>
```

## 1.2. Khi nào dùng @apply?

**✅ Nên dùng khi:**
- Pattern lặp lại nhiều lần (buttons, cards, inputs)
- Muốn code gọn hơn
- Cần maintain dễ hơn

**❌ Không nên dùng khi:**
- Chỉ dùng 1-2 lần (viết utilities trực tiếp nhanh hơn)
- Muốn flexibility cao (utilities linh hoạt hơn)

## 1.3. Ví dụ: Button Components

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold transition-colors;
  }
  
  .btn-primary {
    @apply btn bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .btn-secondary {
    @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
  
  .btn-success {
    @apply btn bg-green-500 text-white hover:bg-green-600;
  }
  
  .btn-danger {
    @apply btn bg-red-500 text-white hover:bg-red-600;
  }
}
```

**Sử dụng:**
```html
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-success">Success</button>
<button class="btn-danger">Danger</button>
```

## 1.4. Ví dụ: Card Components

```css
@layer components {
  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }
  
  .card-body {
    @apply p-6;
  }
  
  .card-title {
    @apply text-xl font-bold text-gray-800 mb-2;
  }
  
  .card-text {
    @apply text-gray-600;
  }
}
```

**Sử dụng:**
```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">Card description.</p>
  </div>
</div>
```

## 1.5. Ví dụ: Form Inputs

```css
@layer components {
  .form-input {
    @apply w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-2;
  }
  
  .form-error {
    @apply text-sm text-red-600 mt-1;
  }
}
```

**Sử dụng:**
```html
<div class="mb-4">
  <label class="form-label">Email</label>
  <input type="email" class="form-input">
  <p class="form-error">Email is required</p>
</div>
```

## 1.6. Lưu ý quan trọng về @apply

**❌ Không được:**
```css
/* Không thể dùng @apply với pseudo-class phức tạp */
.btn {
  @apply hover:bg-blue-600;  /* ✅ OK */
}

/* Không thể dùng @apply với media queries trực tiếp */
@media (min-width: 768px) {
  .btn {
    @apply px-6;  /* ✅ OK */
  }
}
```

**✅ Được:**
```css
.btn {
  @apply px-4 py-2 bg-blue-500;
}

.btn:hover {
  @apply bg-blue-600;  /* ✅ OK */
}

@media (min-width: 768px) {
  .btn {
    @apply px-6;  /* ✅ OK */
  }
}
```

---

# 2. **LAYERS - TẦNG**

TailwindCSS có 3 layers để tổ chức code:

## 2.1. Base Layer

Reset CSS, base styles:

```css
@layer base {
  h1 {
    @apply text-4xl font-bold;
  }
  
  h2 {
    @apply text-3xl font-bold;
  }
  
  a {
    @apply text-blue-500 hover:text-blue-600;
  }
}
```

## 2.2. Components Layer

Component classes (dùng @apply):

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
}
```

## 2.3. Utilities Layer

Utility classes mới:

```css
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
}
```

## 2.4. Thứ tự import

```css
@tailwind base;        /* 1. Base layer */
@tailwind components;  /* 2. Components layer */
@tailwind utilities;    /* 3. Utilities layer */

/* Custom layers */
@layer components {
  /* Your components */
}
```

---

# 3. **PLUGINS - MỞ RỘNG**

Plugins cho phép bạn thêm utilities, components, hoặc variants mới.

## 3.1. Tạo Plugin đơn giản

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        },
        '.text-shadow-md': {
          textShadow: '4px 4px 8px rgba(0,0,0,0.12)',
        },
        '.text-shadow-lg': {
          textShadow: '15px 15px 30px rgba(0,0,0,0.11)',
        },
      }
      addUtilities(newUtilities)
    })
  ]
}
```

## 3.2. Plugin với Variants

```javascript
plugin(function({ addUtilities, addVariant }) {
  // Thêm variant mới
  addVariant('child', '& > *')
  
  // Thêm utilities với variant
  addUtilities({
    '.child-underline': {
      '& > *': {
        textDecoration: 'underline',
      }
    }
  })
})
```

## 3.3. Sử dụng Plugin từ npm

Cài đặt plugin:

```bash
npm install @tailwindcss/forms
npm install @tailwindcss/typography
npm install @tailwindcss/aspect-ratio
```

Sử dụng:

```javascript
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
```

---

# 4. **PERFORMANCE OPTIMIZATION**

## 4.1. PurgeCSS (Tree-shaking)

PurgeCSS tự động loại bỏ CSS không dùng trong production.

**Cấu hình:**
```javascript
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  // PurgeCSS tự động chạy trong production
}
```

**Lưu ý quan trọng:**
- Chỉ định đúng `content` paths
- Nếu dùng dynamic classes, thêm vào `safelist`

## 4.2. Safelist (Whitelist)

Nếu có classes được tạo động (JavaScript), thêm vào safelist:

```javascript
module.exports = {
  content: ['./src/**/*.{html,js}'],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    // Hoặc dùng pattern
    {
      pattern: /bg-(red|green|blue)-(400|500|600)/,
    }
  ]
}
```

## 4.3. JIT Mode (Just-In-Time)

TailwindCSS v3+ dùng JIT mode mặc định - chỉ generate CSS bạn dùng.

**Ưu điểm:**
- Bundle size nhỏ
- Build nhanh
- Không cần PurgeCSS riêng

---

# 5. **BEST PRACTICES**

## 5.1. Mobile-First

Luôn nghĩ mobile trước:

```html
<!-- ✅ ĐÚNG: Mobile-first -->
<div class="w-full md:w-1/2 lg:w-1/3">

<!-- ❌ SAI: Desktop-first -->
<div class="w-1/3 md:w-1/2 lg:w-full">
```

## 5.2. Đừng lạm dụng @apply

```html
<!-- ✅ TỐT: Dùng utilities trực tiếp (linh hoạt) -->
<div class="p-4 bg-white rounded shadow">

<!-- ⚠️ CẨN THẬN: @apply chỉ khi lặp lại nhiều -->
<div class="card">  <!-- Nếu dùng nhiều lần -->
```

## 5.3. Tổ chức code

Tạo file riêng cho components:

```css
/* components/buttons.css */
@layer components {
  .btn-primary { ... }
  .btn-secondary { ... }
}

/* components/cards.css */
@layer components {
  .card { ... }
}

/* main.css */
@import './components/buttons.css';
@import './components/cards.css';
```

## 5.4. Dùng IntelliSense

Cài extension TailwindCSS IntelliSense cho VS Code để:
- Auto-complete classes
- Xem giá trị CSS
- Validate classes

---

# 6. **XỬ LÝ CÁC TRƯỜNG HỢP ĐẶC BIỆT**

## 6.1. Dynamic Classes

Nếu classes được tạo từ JavaScript:

```javascript
// ❌ SAI: Classes không được detect
const color = 'blue'
const shade = '500'
element.className = `bg-${color}-${shade}`

// ✅ ĐÚNG: Dùng full class name
const classes = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
}
element.className = classes[color]

// Hoặc thêm vào safelist
```

## 6.2. Third-party Components

Nếu dùng component library (React, Vue), đảm bảo content path đúng:

```javascript
content: [
  './src/**/*.{html,js,jsx,ts,tsx,vue}',
]
```

## 6.3. CSS Custom Properties

Kết hợp với CSS variables:

```css
:root {
  --primary-color: #ff6600;
}

.btn-primary {
  @apply px-4 py-2 rounded;
  background-color: var(--primary-color);
}
```

---

# 7. **BÀI TẬP THỰC HÀNH**

## Bài tập 1: Tạo Component Library

Tạo file `components.css` với:
- Button variants (primary, secondary, success, danger)
- Card components
- Form inputs
- Alerts

## Bài tập 2: Customize Theme

Tạo `tailwind.config.js` với:
- Brand colors (3 màu)
- Custom breakpoints
- Custom spacing scale
- Custom font family

## Bài tập 3: Tạo Plugin

Tạo plugin với:
- Text shadow utilities
- Custom animation utilities
- Custom component utilities

---

# 8. **TỔNG KẾT**

**Các kỹ thuật nâng cao đã học:**
1. ✅ @apply directive - Tạo component classes
2. ✅ Layers - Tổ chức code (base, components, utilities)
3. ✅ Plugins - Mở rộng TailwindCSS
4. ✅ Performance - PurgeCSS, JIT mode, safelist
5. ✅ Best practices - Mobile-first, code organization
6. ✅ Xử lý edge cases - Dynamic classes, third-party

**Lưu ý:**
- @apply chỉ dùng cho patterns lặp lại
- Luôn nghĩ mobile-first
- Optimize performance với PurgeCSS
- Tổ chức code với layers

---

**Hoàn thành TailwindCSS!** Bạn đã nắm vững TailwindCSS. Chuyển sang JavaScript để học logic và tương tác!

> [!TIP]
> **Lời khuyên:** Hãy tạo một component library riêng với @apply cho dự án. Điều này giúp code nhất quán và dễ maintain hơn rất nhiều!
