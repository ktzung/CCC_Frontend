# 🟦 BÀI 05: BOOTSTRAP 5 - CUSTOMIZATION

## 🎬 "Trang Web Nào Cũng Giống Nhau" — Lời Nguyền Bootstrap

*Khách hàng: "Sao trang web của mình giống Tiki, Lazada, và 500 trang khác vậy?" Vì tất cả dùng Bootstrap MẶC ĐỊNH.*

*Anh Hùng: "$primary: #ff6600 — Một dòng SASS, toàn bộ website đổi từ xanh Bootstrap sang cam brand của em. Đó là sức mạnh của customization."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu cách Bootstrap được build từ SASS
- Override Bootstrap variables với SASS
- Customize colors, typography, spacing
- Import chỉ components cần thiết để giảm bundle size
- Build custom Bootstrap theme

---

# 1. **TẠI SAO CẦN CUSTOMIZE?**

**Vấn đề với Bootstrap mặc định:**
- Màu sắc không phù hợp với brand
- Font chữ không đúng design
- Spacing không đúng yêu cầu
- Có nhiều components không dùng đến (bundle size lớn)

**Giải pháp:** Customize Bootstrap với SASS!

---

# 2. **CÀI ĐẶT SASS**

## 2.1. Cài đặt Dependencies

```bash
npm install bootstrap sass
```

## 2.2. Cấu trúc thư mục

```
project/
├── src/
│   ├── scss/
│   │   └── custom.scss        ← File customize của bạn
│   └── css/
│       └── style.css          ← File CSS output
├── package.json
└── node_modules/
```

---

# 3. **OVERRIDE VARIABLES**

## 3.1. Cách 1: Override trước khi import (Khuyên dùng)

Tạo file `custom.scss`:

```scss
// custom.scss

// 1. Override variables TRƯỚC KHI import Bootstrap
$primary: #ff6600;           // Màu cam thay vì xanh
$secondary: #6c757d;         // Giữ nguyên hoặc đổi
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;
$info: #17a2b8;

// Font
$font-family-base: 'Roboto', sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.5;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
  6: $spacer * 4,  // Thêm spacing mới
  7: $spacer * 5,  // Thêm spacing mới
);

// Border radius
$border-radius: 0.375rem;
$border-radius-sm: 0.25rem;
$border-radius-lg: 0.5rem;

// 2. Import Bootstrap SAU KHI override
@import "bootstrap/scss/bootstrap";
```

**Giải thích:**
- Override variables **TRƯỚC** `@import`
- Bootstrap sẽ dùng giá trị mới của bạn
- Có thể override bất kỳ variable nào trong Bootstrap

## 3.2. Cách 2: Override sau khi import (Không khuyên dùng)

```scss
@import "bootstrap/scss/bootstrap";

// Override sau (sẽ phải dùng !important)
.btn-primary {
  background-color: #ff6600 !important;
}
```

**Nhược điểm:** Phải dùng `!important`, khó maintain.

---

# 4. **CUSTOMIZE COLORS**

## 4.1. Override Theme Colors

```scss
// custom.scss
$primary: #ff6600;
$secondary: #6c757d;
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;
$info: #17a2b8;
$light: #f8f9fa;
$dark: #212529;

// Thêm màu mới
$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "success": $success,
  "danger": $danger,
  "warning": $warning,
  "info": $info,
  "light": $light,
  "dark": $dark,
  "brand": #ff6600,  // Màu mới
  "accent": #00d4ff, // Màu mới
);

@import "bootstrap/scss/bootstrap";
```

**Sử dụng:**
```html
<button class="btn btn-brand">Brand Button</button>
<div class="bg-accent">Accent Background</div>
```

## 4.2. Customize Grays

```scss
$white: #fff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black: #000;
```

---

# 5. **CUSTOMIZE TYPography**

## 5.1. Font Family

```scss
$font-family-sans-serif: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
$font-family-monospace: 'Courier New', monospace;
```

## 5.2. Font Sizes

```scss
$font-size-base: 1rem;
$font-size-sm: $font-size-base * 0.875;
$font-size-lg: $font-size-base * 1.25;

$h1-font-size: $font-size-base * 2.5;
$h2-font-size: $font-size-base * 2;
$h3-font-size: $font-size-base * 1.75;
$h4-font-size: $font-size-base * 1.5;
$h5-font-size: $font-size-base * 1.25;
$h6-font-size: $font-size-base;
```

## 5.3. Font Weights

```scss
$font-weight-lighter: lighter;
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-bold: 700;
$font-weight-bolder: bolder;
```

---

# 6. **CUSTOMIZE SPACING**

```scss
$spacer: 1rem;

$spacers: (
  0: 0,
  1: $spacer * 0.25,  // 4px
  2: $spacer * 0.5,   // 8px
  3: $spacer,         // 16px
  4: $spacer * 1.5,   // 24px
  5: $spacer * 3,     // 48px
  6: $spacer * 4,     // 64px (thêm mới)
  7: $spacer * 5,     // 80px (thêm mới)
);
```

**Sử dụng:**
```html
<div class="m-6">Margin 6 (64px)</div>
<div class="p-7">Padding 7 (80px)</div>
```

---

# 7. **CUSTOMIZE COMPONENTS**

## 7.1. Buttons

```scss
$btn-padding-y: 0.5rem;
$btn-padding-x: 1rem;
$btn-font-size: $font-size-base;
$btn-border-radius: $border-radius;
$btn-border-width: 1px;

// Custom button size
$btn-padding-y-sm: 0.25rem;
$btn-padding-x-sm: 0.5rem;
$btn-font-size-sm: $font-size-sm;

$btn-padding-y-lg: 0.75rem;
$btn-padding-x-lg: 1.5rem;
$btn-font-size-lg: $font-size-lg;
```

## 7.2. Cards

```scss
$card-spacer-y: 1rem;
$card-spacer-x: 1rem;
$card-title-spacer-y: 0.5rem;
$card-border-width: 1px;
$card-border-radius: $border-radius;
$card-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
```

---

# 8. **IMPORT SELECTIVE - CHỈ IMPORT CẦN THIẾT**

Để giảm bundle size, chỉ import components bạn cần:

```scss
// custom.scss

// 1. Functions & Variables (bắt buộc)
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

// 2. Chỉ import components cần thiết
@import "bootstrap/scss/root";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/card";
@import "bootstrap/scss/forms";
@import "bootstrap/scss/navbar";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/utilities/api";
```

**Lưu ý:** Nếu không import component nào đó, bạn không thể dùng nó!

---

# 9. **BUILD CSS**

## 9.1. Với npm scripts

**package.json:**
```json
{
  "scripts": {
    "sass": "sass src/scss/custom.scss src/css/style.css",
    "sass:watch": "sass --watch src/scss/custom.scss src/css/style.css"
  }
}
```

**Chạy:**
```bash
npm run sass          # Build 1 lần
npm run sass:watch    # Watch mode (tự động build khi save)
```

## 9.2. Với Vite

**vite.config.js:**
```javascript
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/functions";`
      }
    }
  }
}
```

---

# 10. **VÍ DỤ HOÀN CHỈNH**

## 10.1. File custom.scss

```scss
// custom.scss

// Override variables
$primary: #ff6600;
$secondary: #6c757d;
$font-family-base: 'Roboto', sans-serif;
$border-radius: 0.5rem;

// Thêm màu mới
$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "brand": #ff6600,
);

// Import Bootstrap
@import "bootstrap/scss/bootstrap";
```

## 10.2. HTML sử dụng

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Bootstrap</title>
  <link rel="stylesheet" href="src/css/style.css">
</head>
<body>
  <div class="container">
    <h1 class="text-primary">Custom Bootstrap</h1>
    <button class="btn btn-primary">Custom Button</button>
    <button class="btn btn-brand">Brand Button</button>
  </div>
</body>
</html>
```

---

# 11. **BEST PRACTICES**

1. **Luôn override trước khi import:** Đảm bảo variables được áp dụng đúng
2. **Chỉ import cần thiết:** Giảm bundle size
3. **Dùng variables, không hardcode:** Dễ maintain
4. **Test sau mỗi thay đổi:** Đảm bảo không break layout
5. **Document custom variables:** Ghi chú lại các variables đã override

---

# 12. **TROUBLESHOOTING**

## Lỗi 1: Variables không áp dụng

**Nguyên nhân:** Override sau khi import

**Giải pháp:** Đảm bảo override **TRƯỚC** `@import`

## Lỗi 2: Component không hoạt động

**Nguyên nhân:** Chưa import component đó

**Giải pháp:** Thêm `@import "bootstrap/scss/component-name"`

## Lỗi 3: Bundle size vẫn lớn

**Nguyên nhân:** Import toàn bộ Bootstrap

**Giải pháp:** Chỉ import components cần thiết

---

# 13. **TỔNG KẾT**

- Customize Bootstrap bằng cách override SASS variables
- Override **TRƯỚC** khi import Bootstrap
- Chỉ import components cần thiết để giảm bundle size
- Test kỹ sau mỗi thay đổi
- Document các customizations

---

**Hoàn thành Bootstrap!** Bạn đã nắm vững Bootstrap 5. Chuyển sang JavaScript hoặc học TailwindCSS để so sánh!

> [!TIP]
> **Lời khuyên:** Hãy tạo một file `_variables.scss` riêng để quản lý tất cả custom variables. Điều này giúp code dễ maintain hơn.
