# 🟩 TUẦN 2 - BÀI 08
# **INTRODUCTION TO CSS**

---

## 0. 🎬 Opening Hook

*Minh mở Chrome DevTools → tab Elements → chọn element `<html>` → tìm dòng link CSS → chuột phải → "Delete attribute" (xóa stylesheet).*

*Trong 1 giây, Facebook biến thành web năm 1995: text đen xếp hàng dọc, ảnh chồng nhau, nút bấm thành link màu xanh gạch chân. Layout vỡ nát.*

*"Ồ!" Minh thốt lên. "HTML là xương thật. CSS là thứ làm nó trông như người sống."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

CSS là thứ phân biệt **sản phẩm** với **bản nháp**. Cùng một HTML, với CSS tốt có thể trông như Apple.com — không có CSS chỉ là Notepad.

Hơn nữa, CSS là thứ **không có framework nào thay thế hoàn toàn** — Tailwind, Bootstrap, CSS-in-JS đều compile thành CSS cuối cùng. Không hiểu CSS = không debug được khi framework làm sai.

---

## 2. 🌐 Big Picture — CSS hoạt động thế nào?

```
[HTML file]          [CSS file]          [Browser]
     |                    |                   |
<h1>Tiêu đề</h1>    h1 { color: blue }   → Parse cả hai
<p>Nội dung</p>     p  { font-size:16px} → Tính style của từng element
                                          → Paint pixel lên màn hình
```

**Ba cách thêm CSS — ưu tiên theo thứ tự:**

```
External CSS  ← ✅ Chuẩn production
  ↓
Internal CSS  ← ✅ Prototype, single-page
  ↓
Inline CSS    ← ⚠️ Chỉ dùng khẩn cấp / override tạm thời
```

---

## 3. ⚙️ Core Technical Truth

### 3 cách thêm CSS

**1. Inline CSS — trong attribute `style`:**
```html
<!-- ❌ Tránh dùng — không tái sử dụng, khó maintain -->
<h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1>
```

**2. Internal CSS — trong thẻ `<style>`:**
```html
<!-- ✅ Chấp nhận cho prototype hoặc trang đơn -->
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>
```

**3. External CSS — file riêng:**
```html
<!-- ✅ Chuẩn production — dùng cho mọi dự án thật -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
```css
/* styles.css */
h1 { color: #2563eb; font-size: 32px; }
```

---

### Cú pháp CSS

```css
selector {
    property: value;   /* Một declaration */
    property: value;   /* Mỗi declaration cách nhau ; */
}

/* Ví dụ thực tế: */
.btn-primary {
    background-color: #2563eb;    /* Màu nền */
    color: white;                  /* Màu chữ */
    padding: 12px 24px;           /* Khoảng đệm trong */
    border: none;                  /* Không có viền */
    border-radius: 8px;           /* Bo góc */
    cursor: pointer;               /* Con trỏ hình bàn tay */
    transition: background-color 0.3s ease; /* Hiệu ứng hover */
}

.btn-primary:hover {
    background-color: #1d4ed8;    /* Màu tối hơn khi hover */
}
```

---

### CSS Properties thường dùng nhất

| Category | Properties | Ví dụ |
|---|---|---|
| **Text** | `color`, `font-size`, `font-family`, `font-weight`, `text-align`, `line-height` | Màu, cỡ, font, canh chỉnh |
| **Background** | `background-color`, `background-image`, `background-size` | Nền màu, nền ảnh |
| **Spacing** | `margin`, `padding` | Khoảng cách ngoài/trong |
| **Border** | `border`, `border-radius`, `outline` | Viền, bo tròn |
| **Size** | `width`, `height`, `max-width`, `min-height` | Kích thước |
| **Display** | `display`, `visibility`, `opacity` | Hiển thị/ẩn |
| **Flexbox** | `flex`, `justify-content`, `align-items` | Layout hiện đại |

---

### CSS Reset — Dòng bắt buộc đầu mỗi project

```css
/* Xóa margin/padding mặc định khác nhau giữa browsers */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;  /* Giải thích ở bài Box Model */
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.6;
}
```

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **CSS = Tập luật: "Element nào — trông như thế nào."**

`selector { property: value; }` — ba thứ này, lặp lại hàng trăm lần = toàn bộ CSS của bạn.

---

## 5. 🏭 Real-world Layer

### Tại sao External CSS?

- **Caching**: Browser cache file CSS → trang thứ 2, thứ 3 load ngay, không tải CSS lại
- **Tái sử dụng**: 50 trang dùng cùng 1 file CSS — sửa 1 chỗ = đổi toàn bộ site
- **Maintainability**: Tách HTML (structure) và CSS (presentation) → team làm song song được
- **Performance**: Minified CSS (xóa space, comment) → file nhỏ hơn → load nhanh hơn

### CSS trong production thực tế (Shopee, 2024):

```
styles/
├── main.css          (2.3 MB unminified)
├── main.min.css      (380 KB minified — browser tải cái này)
└── main.min.css.map  (source map — DevTools dùng để debug)
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Style Todo App từ trắng sang có hồn (20 phút)

1. Tạo file `styles.css` cạnh `todo.html`
2. Thêm `<link rel="stylesheet" href="styles.css">` vào `<head>`
3. Copy CSS sau vào `styles.css`:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f9ff;
    color: #1e293b;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    max-width: 600px;
    width: 100%;
    margin: 40px auto;
    padding: 32px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

h1 {
    font-size: 28px;
    color: #2563eb;
    margin-bottom: 24px;
}
```

4. Bọc nội dung `<main>` trong `<div class="container">`
5. Refresh → Quan sát sự khác biệt

**Câu hỏi thực nghiệm:**
- Mở DevTools → Elements → click `<h1>` → tìm style `color: #2563eb` ở Styles panel
- Thử sửa màu trực tiếp trong DevTools. Thay đổi có save vào file không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Inline CSS load nhanh hơn External CSS"** | Sai — External CSS được **browser cache**. Inline CSS không cache được, tải lại mỗi page load |
| **"CSS chỉ là màu sắc"** | CSS xử lý layout (Flexbox, Grid), animation, responsive, print styling, dark mode — không chỉ màu |
| **"Không cần biết CSS vì có Tailwind/Bootstrap"** | Framework CSS đều tạo ra class dùng CSS properties. Khi cần customize → phải hiểu CSS |
| **"`!important` giải quyết mọi vấn đề CSS"** | `!important` là dấu hiệu của code xấu — phá vỡ cascade, cực khó debug sau này |
| **"Thứ tự viết CSS không quan trọng"** | Quan trọng! Rule **sau** ghi đè rule **trước** khi cùng specificity (sẽ học ở bài Cascade) |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Ba cách thêm CSS là gì? Sắp xếp từ ưu tiên cao nhất đến thấp nhất trong dự án thực tế.
2. Tại sao External CSS lại được ưu tiên hơn Inline CSS trong production?
3. `* { margin: 0; padding: 0; }` làm gì? Tại sao cần thiết?

### Câu hỏi áp dụng:

4. Bạn muốn style `<h1>` trong header có màu xanh, nhưng `<h1>` trong article có màu đen. Cách nào đúng: dùng tag selector `h1` hay class selector? Tại sao?
5. File CSS của bạn đang được 5 trang HTML dùng chung. Bạn muốn đổi màu nền body. Cần sửa bao nhiêu chỗ? Nếu dùng Inline CSS thì sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Inline CSS** (ưu tiên cao nhất về specificity, nhưng ít dùng trong production) → **Internal CSS** (dùng khi 1 trang cần style riêng biệt) → **External CSS** (ưu tiên nhất trong production vì cache, tái sử dụng).
2. External CSS được **browser cache** sau lần đầu tải → trang 2, 3 load không cần tải CSS lại. Dễ **maintain** (sửa 1 file = đổi cả site). Dễ **debug** (code tách rõ).
3. Xóa margin/padding **mặc định của browser** — các browser khác nhau có giá trị mặc định khác nhau → trang trông không nhất quán. Reset về 0 → kiểm soát hoàn toàn.
4. Dùng **class selector** — `.header-title { color: blue }` và `.article-title { color: black }`. Tag selector `h1` nhắm TẤT CẢ h1 → không phân biệt được.
5. Với External CSS: sửa **1 chỗ** trong `styles.css` → tất cả 5 trang đổi. Với Inline CSS: phải sửa **5 chỗ** (mỗi trang 1 lần) → dễ bỏ sót, tốn thời gian.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **3 cách thêm CSS**: External (production) > Internal (prototype) > Inline (tránh)
2. **Cú pháp**: `selector { property: value; }` — ba thứ này tạo nên toàn bộ CSS
3. **CSS Reset** (`* { box-sizing: border-box; margin: 0; padding: 0; }`) — dòng đầu tiên mọi project
4. **External CSS = caching + reusability** — lý do dùng file riêng
5. **`!important` = anti-pattern** — tránh dùng, dùng khi không còn lựa chọn nào

---

## 10. ➡️ Next Lesson Bridge

*"CSS hoạt động rồi," Minh nói. "Nhưng sao `h1 { color: blue }` làm đỏ TẤT CẢ h1? Mình chỉ muốn đổi màu h1 trong header thôi!"*

*"Đó là lúc cần Selectors," anh Hùng nói. "Selector = cách chọn chính xác element nào muốn style. Không biết selectors = CSS như bắn đại bác không ngắm."*

**→ [Bài 09: CSS Selectors](./09_css_selectors.md) — Chọn đúng element: Tag, Class, ID, Pseudo-class, Combinator.**
