# 🟦 BÀI 01: BOOTSTRAP 5 - GETTING STARTED

## 🎬 "200 Dòng CSS Cho Một Cái Navbar" — Khi CSS Thuần Không Đủ Nhanh

*Minh mất 3 tiếng viết CSS cho navbar: responsive, hamburger menu, dropdown. 200 dòng CSS. Test trên 5 trình duyệt — vỡ trên Safari.*

*Linh copy-paste 1 dòng Bootstrap: `<nav class="navbar navbar-expand-lg">`. Navbar responsive, dropdown, hamburger — tất cả có sẵn. 5 phút.*

> **Anh Hùng:** *"Bootstrap = LEGO cho web. Components đã được thiết kế, test, và responsive sẵn. Em chỉ cần LẮP GHÉP."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Bootstrap là gì và tại sao nên dùng
- Biết khi nào nên dùng Bootstrap
- Cài đặt Bootstrap 5 vào project (CDN và npm)
- Tạo trang HTML đầu tiên với Bootstrap

---

# 1. **BOOTSTRAP LÀ GÌ?**

Bootstrap là một **CSS Framework** (Bộ công cụ CSS) được phát triển bởi Twitter (nay là X). Nó cung cấp:

- **Grid System:** Hệ thống lưới responsive 12 cột
- **Components:** Buttons, Cards, Navbar, Modals, Forms... đã được style sẵn
- **Utilities:** Spacing, colors, typography classes
- **Responsive:** Mobile-first approach
- **JavaScript Components:** Dropdowns, Modals, Carousels... (cần Bootstrap JS)

---

# 2. **TẠI SAO NÊN DÙNG BOOTSTRAP?**

## 2.1. Ưu điểm

✅ **Nhanh chóng:** Có sẵn components, không cần viết CSS từ đầu
✅ **Responsive:** Tự động responsive với Grid System
✅ **Nhất quán:** Design nhất quán trên toàn bộ website
✅ **Cộng đồng lớn:** Nhiều tài liệu, ví dụ, templates
✅ **Cross-browser:** Hoạt động tốt trên mọi trình duyệt

## 2.2. Nhược điểm

❌ **Bundle size lớn:** File CSS khá lớn (có thể giảm bằng cách chỉ import cần thiết)
❌ **Thiết kế giống nhau:** Nhiều website dùng Bootstrap trông giống nhau
❌ **Override khó:** Nếu muốn thiết kế độc đáo, phải override nhiều

---

# 3. **KHI NÀO NÊN DÙNG BOOTSTRAP?**

**✅ Nên dùng khi:**
- Cần prototype nhanh
- Dự án admin panel, dashboard
- Team nhỏ, không có designer chuyên nghiệp
- Cần components phức tạp (Modals, Dropdowns, Carousel)
- Muốn tập trung vào logic hơn là styling

**❌ Không nên dùng khi:**
- Cần thiết kế độc đáo, khác biệt hoàn toàn
- Dự án nhỏ, chỉ cần vài components đơn giản
- Muốn học CSS thuần trước
- Cần performance tối đa (bundle size nhỏ)

---

# 4. **CÀI ĐẶT BOOTSTRAP 5**

## 4.1. Cách 1: CDN (Nhanh nhất - Dùng cho học tập)

**Ưu điểm:** Nhanh, không cần build tool
**Nhược điểm:** Không thể customize, phụ thuộc internet

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap Example</title>
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <h1>Hello Bootstrap!</h1>
  
  <!-- Bootstrap JS (Optional, cho components tương tác) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## 4.2. Cách 2: npm (Dùng cho production)

**Ưu điểm:** Có thể customize, tree-shaking, không phụ thuộc CDN
**Nhược điểm:** Cần build tool (Webpack, Vite, etc.)

### Bước 1: Cài đặt

```bash
npm install bootstrap@5.3.0
```

### Bước 2: Import vào project

**Với Vanilla JS:**
```javascript
// main.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

**Với SASS (Khuyên dùng):**
```scss
// custom.scss
// Override variables trước khi import
$primary: #ff6600;
$secondary: #6c757d;

// Import Bootstrap
@import "bootstrap/scss/bootstrap";
```

---

# 5. **VÍ DỤ ĐẦU TIÊN**

Tạo file `index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Bootstrap Page</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1 class="text-center text-primary mt-5">Welcome to Bootstrap!</h1>
    <p class="text-center text-muted">This is your first Bootstrap page.</p>
    <div class="text-center mt-4">
      <button class="btn btn-primary">Click me</button>
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Giải thích:**
- `container`: Container Bootstrap, tự động căn giữa và responsive
- `text-center`: Utility class để căn giữa text
- `text-primary`: Màu primary của Bootstrap
- `mt-5`: Margin top (spacing utility)
- `btn btn-primary`: Button component của Bootstrap

---

# 6. **KIỂM TRA CÀI ĐẶT**

Mở file HTML trong trình duyệt. Nếu thấy:
- ✅ Button có style đẹp (màu xanh, bo tròn)
- ✅ Text được căn giữa
- ✅ Có spacing hợp lý

→ Bootstrap đã được cài đặt thành công!

---

# 7. **TỔNG KẾT**

- Bootstrap là CSS Framework phổ biến với Grid System và Components có sẵn
- Có thể cài đặt qua CDN (nhanh) hoặc npm (customize được)
- Phù hợp cho prototype nhanh, admin panel, dashboard
- Bắt đầu với CDN để học, chuyển sang npm khi làm dự án thật

---

**Bài tiếp theo:** [02. Grid System](../02_grid_system/02_grid_system.md) - Hệ thống lưới 12 cột và Responsive breakpoints
