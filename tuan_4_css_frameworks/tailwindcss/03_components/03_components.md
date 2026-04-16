# 🟩 BÀI 03: TAILWINDCSS - COMPONENTS

## 🎬 "Bootstrap Cho Em LEGO. Tailwind Cho Em Nguyên Tử" — Xây Từ Số 0

*Minh: "Bootstrap có Card component sẵn. Tailwind thì... không có gì?"*

*Anh Hùng: "Đúng. Tailwind cho em nguyên liệu thô: `bg-white rounded-lg shadow-md p-6`. Em TỰ XÂY Card. Mất thời gian hơn — nhưng Card của em KHÔNG GIỐNG ai cả. Và khi cần đổi, em control từng pixel."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Xây dựng Button từ utilities
- Xây dựng Card từ utilities
- Xây dựng Navbar từ utilities
- Xây dựng Form inputs từ utilities
- Tạo reusable components với @apply
- Hiểu cách kết hợp utilities để tạo components phức tạp

---

# 1. **BUTTON - NÚT BẤM**

## 1.1. Button Cơ bản

```html
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>
```

**Giải thích:**
- `px-4 py-2`: Padding x=16px, y=8px
- `bg-blue-500`: Background màu xanh
- `text-white`: Text màu trắng
- `rounded`: Bo tròn góc
- `hover:bg-blue-600`: Đổi màu khi hover

## 1.2. Button Variants

```html
<!-- Primary Button -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">
  Primary
</button>

<!-- Secondary Button -->
<button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold">
  Secondary
</button>

<!-- Success Button -->
<button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-semibold">
  Success
</button>

<!-- Danger Button -->
<button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold">
  Danger
</button>
```

## 1.3. Button Sizes

```html
<!-- Small -->
<button class="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
  Small
</button>

<!-- Default -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Default
</button>

<!-- Large -->
<button class="px-6 py-3 text-lg bg-blue-500 text-white rounded hover:bg-blue-600">
  Large
</button>
```

## 1.4. Button Outline

```html
<button class="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white">
  Outline
</button>
```

## 1.5. Button với Icon

```html
<button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
  </svg>
  Add Item
</button>
```

## 1.6. Button States

```html
<!-- Disabled -->
<button class="px-4 py-2 bg-gray-400 text-white rounded opacity-50 cursor-not-allowed" disabled>
  Disabled
</button>

<!-- Loading -->
<button class="px-4 py-2 bg-blue-500 text-white rounded opacity-75 cursor-wait">
  <span class="inline-block animate-spin mr-2">⟳</span>
  Loading...
</button>
```

---

# 2. **CARD - THẺ**

## 2.1. Card Cơ bản

```html
<div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-2">Card Title</h3>
    <p class="text-gray-600">Card description goes here.</p>
  </div>
</div>
```

**Giải thích:**
- `max-w-sm`: Max width small (24rem)
- `bg-white`: Background trắng
- `rounded-lg`: Bo tròn góc lớn
- `shadow-md`: Đổ bóng vừa
- `overflow-hidden`: Ẩn phần tràn ra ngoài
- `p-6`: Padding 24px

## 2.2. Card với Image

```html
<div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
  <img class="w-full h-48 object-cover" src="image.jpg" alt="Card image">
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-2">Card Title</h3>
    <p class="text-gray-600 mb-4">Card description.</p>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Read More
    </button>
  </div>
</div>
```

**Giải thích:**
- `w-full`: Width 100%
- `h-48`: Height 12rem (192px)
- `object-cover`: Ảnh cover, không bị méo

## 2.3. Card với Header và Footer

```html
<div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
  <div class="bg-blue-500 text-white px-6 py-3">
    <h3 class="text-lg font-semibold">Card Header</h3>
  </div>
  <div class="p-6">
    <p class="text-gray-600">Card body content.</p>
  </div>
  <div class="bg-gray-100 px-6 py-3 text-sm text-gray-600">
    Card Footer
  </div>
</div>
```

## 2.4. Card Grid (Dùng với Grid)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img class="w-full h-48 object-cover" src="product1.jpg" alt="Product 1">
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2">Product 1</h3>
      <p class="text-gray-600 mb-4">$99.99</p>
      <button class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  </div>
  <!-- Repeat for more cards -->
</div>
```

---

# 3. **NAVBAR - THANH ĐIỀU HƯỚNG**

## 3.1. Navbar Cơ bản

```html
<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <div class="text-xl font-bold">My Website</div>
      <div class="flex gap-4">
        <a href="#" class="hover:text-gray-300">Home</a>
        <a href="#" class="hover:text-gray-300">About</a>
        <a href="#" class="hover:text-gray-300">Contact</a>
      </div>
    </div>
  </div>
</nav>
```

**Giải thích:**
- `bg-gray-800`: Background tối
- `text-white`: Text trắng
- `container mx-auto`: Container căn giữa
- `flex justify-between`: Flexbox, space between
- `items-center`: Căn dọc giữa
- `gap-4`: Khoảng cách giữa items

## 3.2. Navbar Responsive với Mobile Menu

```html
<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="text-xl font-bold">My Website</div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-4">
        <a href="#" class="hover:text-gray-300">Home</a>
        <a href="#" class="hover:text-gray-300">About</a>
        <a href="#" class="hover:text-gray-300">Contact</a>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden" id="menu-toggle">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu (Hidden by default) -->
    <div class="hidden md:hidden pb-4" id="mobile-menu">
      <a href="#" class="block py-2 hover:text-gray-300">Home</a>
      <a href="#" class="block py-2 hover:text-gray-300">About</a>
      <a href="#" class="block py-2 hover:text-gray-300">Contact</a>
    </div>
  </div>
</nav>

<script>
// Toggle mobile menu
document.getElementById('menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});
</script>
```

## 3.3. Navbar với Search

```html
<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <div class="text-xl font-bold">My Website</div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input type="text" placeholder="Search..." 
                 class="px-4 py-2 rounded text-gray-800 w-64">
          <button class="absolute right-2 top-2 text-gray-500">
            🔍
          </button>
        </div>
        <a href="#" class="hover:text-gray-300">Login</a>
      </div>
    </div>
  </div>
</nav>
```

---

# 4. **FORMS - BIỂU MẪU**

## 4.1. Input Cơ bản

```html
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Email
  </label>
  <input type="email" 
         class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
</div>
```

**Giải thích:**
- `block`: Display block cho label
- `w-full`: Input full width
- `border border-gray-300`: Border màu xám
- `focus:outline-none`: Bỏ outline mặc định khi focus
- `focus:border-blue-500`: Đổi màu border khi focus

## 4.2. Input với Validation States

```html
<!-- Valid Input -->
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Email
  </label>
  <input type="email" 
         class="w-full px-4 py-2 border-2 border-green-500 rounded focus:outline-none">
  <p class="text-sm text-green-600 mt-1">✓ Valid email</p>
</div>

<!-- Invalid Input -->
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Email
  </label>
  <input type="email" 
         class="w-full px-4 py-2 border-2 border-red-500 rounded focus:outline-none">
  <p class="text-sm text-red-600 mt-1">✗ Please enter a valid email</p>
</div>
```

## 4.3. Select Dropdown

```html
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Country
  </label>
  <select class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
    <option>Choose...</option>
    <option>Vietnam</option>
    <option>USA</option>
    <option>UK</option>
  </select>
</div>
```

## 4.4. Textarea

```html
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Message
  </label>
  <textarea rows="4" 
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
  </textarea>
</div>
```

## 4.5. Checkbox và Radio

```html
<!-- Checkbox -->
<div class="flex items-center mb-4">
  <input type="checkbox" id="remember" class="w-4 h-4 text-blue-600 rounded">
  <label for="remember" class="ml-2 text-sm text-gray-700">
    Remember me
  </label>
</div>

<!-- Radio -->
<div class="mb-4">
  <div class="flex items-center mb-2">
    <input type="radio" id="option1" name="option" class="w-4 h-4 text-blue-600">
    <label for="option1" class="ml-2 text-gray-700">Option 1</label>
  </div>
  <div class="flex items-center">
    <input type="radio" id="option2" name="option" class="w-4 h-4 text-blue-600">
    <label for="option2" class="ml-2 text-gray-700">Option 2</label>
  </div>
</div>
```

## 4.6. Form hoàn chỉnh

```html
<form class="max-w-md mx-auto mt-8">
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Name
    </label>
    <input type="text" 
           class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
  </div>
  
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Email
    </label>
    <input type="email" 
           class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
  </div>
  
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Message
    </label>
    <textarea rows="4" 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
    </textarea>
  </div>
  
  <div class="flex items-center mb-4">
    <input type="checkbox" id="agree" class="w-4 h-4 text-blue-600 rounded">
    <label for="agree" class="ml-2 text-sm text-gray-700">
      I agree to the terms
    </label>
  </div>
  
  <button type="submit" 
          class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">
    Submit
  </button>
</form>
```

---

# 5. **ALERTS - THÔNG BÁO**

```html
<!-- Success Alert -->
<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
  <p class="font-bold">Success!</p>
  <p>Your changes have been saved.</p>
</div>

<!-- Error Alert -->
<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
  <p class="font-bold">Error!</p>
  <p>Something went wrong.</p>
</div>

<!-- Warning Alert -->
<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
  <p class="font-bold">Warning!</p>
  <p>Please check your input.</p>
</div>

<!-- Info Alert -->
<div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
  <p class="font-bold">Info</p>
  <p>Here's some information.</p>
</div>
```

---

# 6. **BADGES - NHÃN**

```html
<!-- Badge cơ bản -->
<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
  New
</span>

<!-- Badge với số -->
<h1 class="text-2xl">
  Notifications
  <span class="ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded-full">
    5
  </span>
</h1>

<!-- Badge trong button -->
<button class="px-4 py-2 bg-blue-500 text-white rounded">
  Messages
  <span class="ml-2 px-2 py-1 bg-white text-blue-500 text-xs rounded-full">
    3
  </span>
</button>
```

---

# 7. **BREADCRUMBS - ĐƯỜNG DẪN**

```html
<nav class="flex" aria-label="Breadcrumb">
  <ol class="flex items-center space-x-2">
    <li>
      <a href="#" class="text-gray-500 hover:text-gray-700">Home</a>
    </li>
    <li class="text-gray-500">/</li>
    <li>
      <a href="#" class="text-gray-500 hover:text-gray-700">Products</a>
    </li>
    <li class="text-gray-500">/</li>
    <li class="text-gray-900 font-medium">Laptop</li>
  </ol>
</nav>
```

---

# 8. **PAGINATION - PHÂN TRANG**

```html
<nav class="flex justify-center">
  <ul class="flex items-center space-x-2">
    <li>
      <a href="#" class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">
        Previous
      </a>
    </li>
    <li>
      <a href="#" class="px-3 py-2 bg-blue-500 text-white rounded">1</a>
    </li>
    <li>
      <a href="#" class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">2</a>
    </li>
    <li>
      <a href="#" class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">3</a>
    </li>
    <li>
      <a href="#" class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100">
        Next
      </a>
    </li>
  </ul>
</nav>
```

---

# 9. **@APPLY - TẠO REUSABLE COMPONENTS**

Khi bạn có một pattern lặp lại nhiều lần, dùng `@apply` để tạo component class:

```css
/* custom.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold;
  }
  
  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }
  
  .card-body {
    @apply p-6;
  }
  
  .card-title {
    @apply text-xl font-bold text-gray-800 mb-2;
  }
}
```

**Sử dụng:**
```html
<button class="btn-primary">Primary Button</button>

<div class="card">
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
  </div>
</div>
```

**Lưu ý:** `@apply` chỉ nên dùng cho components lặp lại nhiều lần. Đừng lạm dụng!

---

# 10. **BÀI TẬP THỰC HÀNH**

## Bài tập 1: Tạo Product Card

Tạo card sản phẩm với:
- Hình ảnh (h-48, object-cover)
- Tên sản phẩm (text-xl, font-bold)
- Giá (text-2xl, text-blue-600)
- Badge "Sale" hoặc "New"
- Button "Add to Cart" (full width)
- Responsive: 1 cột mobile, 2 cột tablet, 3 cột desktop

## Bài tập 2: Tạo Login Form

Tạo form login với:
- Email input (với validation state)
- Password input
- Checkbox "Remember me"
- Button "Login" và "Cancel"
- Alert message (success/error)
- Max width, căn giữa

## Bài tập 3: Tạo Navbar hoàn chỉnh

Tạo navbar với:
- Logo bên trái
- Menu items (Home, About, Products, Contact)
- Search form bên phải
- Mobile menu (hamburger icon)
- Responsive (collapse trên mobile)

---

# 11. **TỔNG KẾT**

**Các components đã học:**
1. ✅ Buttons - Nhiều variants, sizes, states
2. ✅ Cards - Với image, header, footer
3. ✅ Navbar - Responsive với mobile menu
4. ✅ Forms - Input, select, textarea, validation
5. ✅ Alerts - Success, error, warning, info
6. ✅ Badges - Nhãn, số lượng
7. ✅ Breadcrumbs - Đường dẫn
8. ✅ Pagination - Phân trang
9. ✅ @apply - Tạo reusable components

**Lưu ý:**
- TailwindCSS không có components có sẵn, phải tự build
- Kết hợp nhiều utilities để tạo components
- Dùng @apply cho patterns lặp lại
- Luôn nghĩ mobile-first

---

**Bài tiếp theo:** [04. Customization](../04_customization/04_customization.md) - Customize TailwindCSS với config file

> [!TIP]
> **Lời khuyên:** Hãy tạo một file `components.css` với các @apply classes cho components thường dùng. Điều này giúp code gọn và dễ maintain hơn!
