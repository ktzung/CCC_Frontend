# 🟩 BÀI 01: TAILWINDCSS - GETTING STARTED

## 🎬 "Viết CSS Mà Không Mở File CSS" — Triết Lý Điên Rồ Của Tailwind

*Minh nhìn Tailwind code lần đầu: `class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"`. "Gì mà nhiều class thế?!"*

*3 ngày sau: Minh không muốn mở file CSS nữa. Style ngay trong HTML. Mỗi class = 1 CSS property. Không conflict, không naming, không context-switching.*

> **Chị Hà:** *"Tailwind lúc đầu xấu xí. Nhưng khi quen = nhanh hơn BẤT KỲ cách nào. Apple.com, Netflix, GitHub — đều dùng Tailwind."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Utility-First là gì và tại sao TailwindCSS khác Bootstrap
- Biết khi nào nên dùng TailwindCSS
- Cài đặt và cấu hình TailwindCSS (CDN và npm)
- Tạo trang HTML đầu tiên với TailwindCSS

---

# 1. **TAILWINDCSS LÀ GÌ?**

TailwindCSS là một **Utility-First CSS Framework**. Thay vì cung cấp components có sẵn như Bootstrap, TailwindCSS cung cấp:

- **Utility Classes:** Hàng nghìn class nhỏ, mỗi class làm 1 việc cụ thể
- **Responsive:** Tự động responsive với breakpoints
- **Customizable:** Dễ dàng customize qua config file
- **Small Bundle:** Chỉ include CSS bạn thực sự dùng (PurgeCSS)
- **No JavaScript:** Chỉ là CSS, không có JS components

---

# 2. **UTILITY-FIRST LÀ GÌ?**

## 2.1. Component-Based (Bootstrap)

```html
<!-- Bootstrap: Dùng component có sẵn -->
<button class="btn btn-primary">Click me</button>
```

## 2.2. Utility-First (TailwindCSS)

```html
<!-- TailwindCSS: Tự build từ utilities -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

**Khác biệt:**
- **Bootstrap:** Có sẵn component, nhanh nhưng ít linh hoạt
- **TailwindCSS:** Tự build, linh hoạt hơn nhưng cần viết nhiều class

---

# 3. **TẠI SAO NÊN DÙNG TAILWINDCSS?**

## 3.1. Ưu điểm

✅ **Linh hoạt:** Tự build design, không bị ràng buộc
✅ **Bundle size nhỏ:** Chỉ include CSS bạn dùng (PurgeCSS)
✅ **Customizable:** Dễ customize qua config file
✅ **Performance tốt:** CSS được optimize, không có unused code
✅ **Developer experience:** IntelliSense tốt, dễ nhớ classes

## 3.2. Nhược điểm

❌ **Learning curve:** Cần nhớ nhiều utility classes
❌ **HTML dài:** Nhiều classes trong HTML (có thể dùng @apply)
❌ **Không có components:** Phải tự build mọi thứ

---

# 4. **KHI NÀO NÊN DÙNG TAILWINDCSS?**

**✅ Nên dùng khi:**
- Cần thiết kế độc đáo, không muốn bị ràng buộc
- Muốn control hoàn toàn về styling
- Dự án cần performance tốt (bundle size nhỏ)
- Team có designer, cần implement design chính xác
- Dự án lớn, cần maintain dài hạn

**❌ Không nên dùng khi:**
- Cần prototype cực nhanh (Bootstrap nhanh hơn)
- Team nhỏ, không có designer
- Không muốn học nhiều utility classes
- Dự án nhỏ, đơn giản

---

# 5. **CÀI ĐẶT TAILWINDCSS**

## 5.1. Cách 1: CDN (Nhanh nhất - Dùng cho học tập)

**Ưu điểm:** Nhanh, không cần build tool
**Nhược điểm:** Không thể customize, bundle size lớn, không có PurgeCSS

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TailwindCSS Example</title>
  
  <!-- TailwindCSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-4xl font-bold text-center text-blue-500 mt-5">
    Hello TailwindCSS!
  </h1>
</body>
</html>
```

## 5.2. Cách 2: npm + PostCSS (Dùng cho production)

**Ưu điểm:** Có thể customize, PurgeCSS, performance tốt
**Nhược điểm:** Cần build tool

### Bước 1: Cài đặt

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Bước 2: Cấu hình

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Đường dẫn đến file HTML/JS
  theme: {
    extend: {}, // Customize theme ở đây
  },
  plugins: [], // Thêm plugins nếu cần
}
```

**src/input.css:**
```css
@tailwind base;      /* Reset CSS, base styles */
@tailwind components; /* Component classes */
@tailwind utilities;  /* Utility classes */
```

### Bước 3: Build CSS

**Với Vite:**
```javascript
// vite.config.js
export default {
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
```

**Với Webpack:**
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
}
```

---

# 6. **VÍ DỤ ĐẦU TIÊN**

Tạo file `index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First TailwindCSS Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-4">
      Welcome to TailwindCSS!
    </h1>
    <p class="text-center text-gray-600 mb-8">
      This is your first TailwindCSS page.
    </p>
    <div class="text-center">
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Click me
      </button>
    </div>
  </div>
</body>
</html>
```

**Giải thích:**
- `bg-gray-100`: Background màu xám nhạt
- `container mx-auto`: Container tự động căn giữa
- `px-4 py-8`: Padding x và y
- `text-4xl font-bold`: Text size và font weight
- `text-blue-600`: Màu text xanh
- `mb-4`: Margin bottom
- `hover:bg-blue-600`: Hover state

---

# 7. **KIỂM TRA CÀI ĐẶT**

Mở file HTML trong trình duyệt. Nếu thấy:
- ✅ Button có style đẹp (màu xanh, hover effect)
- ✅ Text được style đúng
- ✅ Layout responsive

→ TailwindCSS đã được cài đặt thành công!

---

# 8. **TỔNG KẾT**

- TailwindCSS là Utility-First Framework, cung cấp hàng nghìn utility classes
- Khác Bootstrap ở chỗ không có components có sẵn, phải tự build
- Có thể cài đặt qua CDN (nhanh) hoặc npm (customize được, performance tốt)
- Phù hợp cho dự án cần design độc đáo, performance tốt

---

**Bài tiếp theo:** [02. Utilities](../02_utilities/02_utilities.md) - Spacing, Colors, Typography, Flexbox, Grid utilities
