# 🟩 CHƯƠNG 15
# **TESTING AND ORGANIZING CSS**

Khi dự án lớn lên, file CSS của bạn sẽ dài hàng nghìn dòng. Nếu không tổ chức tốt, nó sẽ trở thành "đống rác spaghetti" không ai dám sửa.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Biết cách tổ chức thư mục CSS chuyên nghiệp.
- Nắm vững quy tắc đặt tên **BEM** (Block Element Modifier).
- Sử dụng các công cụ **Linting** và **Validation** để bắt lỗi code.

---

# 1. **ORGANIZING CSS (TỔ CHỨC CODE)**

## 1.1. Chia nhỏ file (Modular CSS)
Đừng viết tất cả vào 1 file `style.css` dài 5000 dòng. Hãy chia nhỏ:

- `base.css`: Reset, typography, body, a, h1...
- `layout.css`: Header, Footer, Grid system.
- `components.css`: Button, Card, Navbar, Form.
- `main.css`: File tổng hợp (dùng `@import` - nhưng cẩn thận hiệu năng, hoặc dùng SCSS).

## 1.2. Commenting (Chú thích)
Tạo mục lục trong code:

```css
/* =========================================
   HEADER SECTION
   ========================================= */
.header { ... }

/* -----------------------------------------
   Navigation
   ----------------------------------------- */
.nav { ... }
```

---

# 2. **BEM METHODOLOGY (BLOCK - ELEMENT - MODIFIER)**

Quy tắc đặt tên class phổ biến nhất thế giới. Giúp code dễ hiểu và tránh trùng lặp.

**Cấu trúc:** `block__element--modifier`

### 1. Block (Khối)
Thành phần độc lập, có ý nghĩa riêng (VD: `.card`, `.btn`, `.menu`).

### 2. Element (Thành phần con)
Thuộc về Block, không đứng một mình được. Ngăn cách bằng **2 dấu gạch dưới `__`**.
(VD: `.card__image`, `.card__title`, `.menu__item`).

### 3. Modifier (Biến thể)
Trạng thái hoặc phiên bản khác của Block/Element. Ngăn cách bằng **2 dấu gạch ngang `--`**.
(VD: `.btn--primary`, `.btn--large`, `.menu__item--active`).

**Ví dụ thực tế:**

```html
<div class="card">
  <img class="card__img" src="..." />
  <h2 class="card__title">Tiêu đề</h2>
  <p class="card__text">Nội dung...</p>
  <button class="btn btn--danger">Xóa</button>
</div>
```

---

# 3. **TESTING & DEBUGGING**

## 3.1. Validators
Dùng **W3C CSS Validator** để kiểm tra lỗi cú pháp (quên dấu chấm phẩy, viết sai tên property).

## 3.2. Browser DevTools
- F12 -> Elements -> Styles.
- Tích/Bỏ tích để xem layout thay đổi.
- Tab **Computed** để xem kích thước thật.
- **Device Toolbar** (Ctrl+Shift+M) để test Responsive.

## 3.3. Cross-Browser Testing
Web của bạn đẹp trên Chrome, nhưng có thể vỡ nát trên Safari (iPhone) hoặc Firefox.
-> Luôn test trên ít nhất: Chrome (PC + Mobile), Firefox, Safari.

---

# 4. **TỔNG KẾT**

- **Chia nhỏ file** để dễ quản lý.
- **Dùng BEM** để đặt tên class dễ hiểu, tránh conflict.
- **Test responsive** và trên nhiều trình duyệt.

---

**Chương tiếp theo:** Bạn thấy CSS rườm rà? Hãy dùng siêu năng lực của Preprocessor (Sass/SCSS).
