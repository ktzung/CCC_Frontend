# 🟩 CHƯƠNG 15
# **TESTING & ORGANIZING CSS — Khi 1000 Dòng CSS Thành Spaghetti**

## 🎬 "Sửa 1 Dòng CSS, Vỡ 3 Trang Khác"

*Minh sửa `.title { color: red; }` trong file `style.css`. Todo App title đổi màu — tốt. Nhưng title trang About, Contact cũng đỏ theo!*

*"CSS không có scope!" Minh nhận ra. ".title là MỌI thẻ có class title, không phải chỉ Todo page."*

> **Chị Hà:** *"Đây là vấn đề #1 khi CSS đi sản xuất. 50.000 dòng CSS ở Shopee. Sửa 1 class → ảnh hưởng 20 trang. Giải pháp? BEM naming + modular structure."*

---

## 🎯 Mục tiêu
- Tổ chức CSS thành modules (không 1 file khổng lồ!)
- BEM naming convention — đặt tên class chuẩn quốc tế
- Debug CSS bằng DevTools

---

## 📁 Tổ chức CSS — Chia nhỏ file

### ❌ Cách tệ: 1 file `style.css` chứa mọi thứ

### ✅ Cách tốt: Modular CSS

```
styles/
├── base.css          ← Reset, typography, body
├── layout.css        ← Header, footer, grid
├── components/
│   ├── button.css    ← .btn, .btn--primary, .btn--danger
│   ├── card.css      ← .card, .card__title, .card__body
│   ├── navbar.css    ← .navbar, .navbar__logo
│   └── form.css      ← .form, .form__input
└── main.css          ← @import tất cả (hoặc dùng SCSS)
```

---

## 🏗️ BEM — Block Element Modifier

Quy tắc đặt tên class **phổ biến nhất thế giới**. Google, Shopee, Airbnb đều dùng.

### Cấu trúc: `block__element--modifier`

```html
<!-- Block = .card -->
<div class="card">
    <!-- Element = .card__image, .card__title -->
    <img class="card__image" src="product.jpg" alt="">
    <h3 class="card__title">iPhone 15</h3>
    <p class="card__price">25.990.000đ</p>
    
    <!-- Modifier = .btn--primary, .btn--danger -->
    <button class="btn btn--primary">Mua ngay</button>
    <button class="btn btn--danger">Xóa</button>
</div>
```

```css
/* Block */
.card { border-radius: 12px; overflow: hidden; }

/* Elements (thuộc Block) */
.card__image { width: 100%; }
.card__title { font-size: 18px; font-weight: 600; }
.card__price { color: #e53e3e; font-weight: bold; }

/* Modifier (biến thể) */
.btn--primary { background: #3182ce; color: white; }
.btn--danger { background: #e53e3e; color: white; }
.btn--large { padding: 16px 32px; font-size: 18px; }
```

### Tại sao BEM?

| Không BEM | BEM |
|---|---|
| `.title` → ảnh hưởng MỌI title | `.card__title` → chỉ title trong card |
| `.active` → trùng khắp nơi | `.navbar__item--active` → chỉ navbar item |
| Sửa 1 class vỡ 3 trang | Sửa 1 class an toàn |

---

## 🔧 Debug CSS — Chrome DevTools

1. **F12** → Tab Elements → Click element
2. **Styles panel**: Thấy tất cả CSS rules
3. ~~Gạch ngang~~ = rule bị override
4. **Computed tab**: Kích thước thật (sau Box Model tính toán)
5. **Ctrl+Shift+M**: Device toolbar → Test responsive

> 💡 **Mẹo debug nhanh:** Thêm `border: 2px solid red` cho element → thấy ngay nó chiếm bao nhiêu không gian.

---

## ➡️ Chương tiếp theo...

*CSS gọn gàng rồi. Nhưng Minh thấy viết CSS lặp lại nhiều: mỗi button đều set `display: flex; justify-content: center; align-items: center;`*

*"Đó là lúc dùng SCSS," anh Hùng nói. "Biến, mixins, nesting — CSS có siêu năng lực."*

**→ [Chương 16: Sass/SCSS](./16_sass_scss.md) — CSS preprocessor: Viết CSS như viết code.**
