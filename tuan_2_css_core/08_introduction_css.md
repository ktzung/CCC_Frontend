# 🟩 CHƯƠNG 08
# **INTRODUCTION TO CSS**

## 🎬 "HTML Trần Trụi" — Khi Minh Mở Trang Không Có CSS

*Minh thử tắt CSS trên Facebook bằng DevTools. Kết quả:*

*Mọi layout biến mất. Text xếp hàng dọc. Ảnh chồng lên nhau. Nút bấm thành text xanh gạch chân. Facebook trở về năm 1995.*

*"Ồ!" Minh thốt lên. "HTML chỉ là xương. CSS mới là da thịt, quần áo."*

> **Anh Hùng:** *"CSS = Cascading Style Sheets. 'Cascading' nghĩa là 'thác nước' — style chảy từ trên xuống, từ cha đến con. Hiểu được cascade, bạn làm chủ CSS."*

---

## 🎯 Mục tiêu
- Hiểu CSS là gì và tại sao quan trọng
- 3 cách thêm CSS vào HTML
- Cú pháp CSS cơ bản
- Thuộc tính CSS thường dùng nhất

---

## 🎨 3 cách thêm CSS

### 1. Inline CSS (trong thẻ) — ❌ Tránh dùng
```html
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```

### 2. Internal CSS (trong `<style>`) — Chấp nhận được cho prototype
```html
<head>
    <style>
        h1 { color: red; font-size: 24px; }
    </style>
</head>
```

### 3. External CSS (file riêng) — ✅ Chuẩn production
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

> **Chị Hà:** *"Dự án thực tế 100% dùng External CSS. Inline CSS chỉ cho debug nhanh."*

---

## 📝 Cú pháp CSS

```css
selector {
    property: value;
    property: value;
}

/* Ví dụ */
h1 {
    color: #2563eb;           /* Màu chữ */
    font-size: 32px;          /* Cỡ chữ */
    font-family: 'Inter', sans-serif;  /* Font chữ */
    text-align: center;       /* Căn giữa */
    margin-bottom: 16px;      /* Khoảng cách dưới */
}

.btn-primary {
    background-color: #2563eb;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #1d4ed8;    /* Đổi màu khi hover */
}
```

---

## 🎨 CSS Properties thường dùng nhất

| Category | Properties | Ví dụ |
|---|---|---|
| **Text** | `color`, `font-size`, `font-family`, `text-align` | Màu, cỡ, font, căn chỉnh |
| **Background** | `background-color`, `background-image` | Nền màu, nền ảnh |
| **Spacing** | `margin`, `padding` | Khoảng cách ngoài/trong |
| **Border** | `border`, `border-radius` | Viền, bo tròn góc |
| **Size** | `width`, `height`, `max-width` | Chiều rộng, cao |
| **Display** | `display`, `visibility` | Block, inline, flex, grid |

---

## 🎯 Thực hành: Style Todo App đầu tiên

```css
/* Reset cơ bản */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.6;
}

.container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

*Minh refresh. Trang web từ text đen-trắng trở thành card có shadow, bo tròn, font đẹp.* ✨

---

## ➡️ Chương tiếp theo...

*"CSS hoạt động rồi," Minh nói. "Nhưng sao `h1` style ảnh hưởng tất cả h1? Mình chỉ muốn style h1 trong header thôi!"*

*"Đó là lúc em cần Selectors," anh Hùng nói. "Selector = cách chọn chính xác element nào muốn style."*

**Chương tiếp theo:** CSS Selectors — Nghệ thuật "chỉ đích danh" element cần style.
