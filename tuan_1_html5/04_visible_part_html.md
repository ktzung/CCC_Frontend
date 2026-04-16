# 🟦 CHƯƠNG 04
# **PHẦN HIỂN THỊ — Visible Part of HTML**

## 🎬 "Trang Web Trống Rỗng Vs Trang Web Sống Động"

*Minh so sánh trang Todo App của mình (text đơn giản) với Shopee (ảnh sản phẩm, bảng giá, video review). "Sao Shopee nhiều thứ thế? Mình chỉ biết `<p>` và `<h1>`!"*

*Anh Hùng: "HTML có hàng chục thẻ semantic — mỗi thẻ một mục đích. E-commerce dùng `<article>` cho sản phẩm, `<section>` cho danh mục, `<aside>` cho sidebar bộ lọc. Dùng đúng thẻ = Google hiểu nội dung = SEO tốt hơn."*

---

## 🎯 Mục tiêu
- Sử dụng Semantic HTML5 elements
- Text formatting nâng cao
- Nhúng media (ảnh, video, audio)
- Block vs Inline elements

---

## 🏗️ Semantic HTML5 — "Thẻ có ý nghĩa"

### Tại sao không dùng `<div>` cho mọi thứ?

```html
<!-- ❌ "Div Soup" — Google không hiểu gì -->
<div class="header">
    <div class="nav">...</div>
</div>
<div class="content">
    <div class="article">...</div>
    <div class="sidebar">...</div>
</div>
<div class="footer">...</div>

<!-- ✅ Semantic — Google hiểu cấu trúc -->
<header>
    <nav>...</nav>
</header>
<main>
    <article>...</article>
    <aside>...</aside>
</main>
<footer>...</footer>
```

### Bản đồ Semantic Elements:

| Thẻ | Ý nghĩa | Dùng cho |
|---|---|---|
| `<header>` | Phần đầu | Logo, menu chính |
| `<nav>` | Điều hướng | Menu, breadcrumb |
| `<main>` | Nội dung chính | Content area (1 per page) |
| `<article>` | Bài viết độc lập | Blog post, sản phẩm, comment |
| `<section>` | Phân đoạn nội dung | Danh mục, chapters |
| `<aside>` | Nội dung phụ | Sidebar, quảng cáo |
| `<footer>` | Phần cuối | Copyright, links, contacts |
| `<figure>` | Media + caption | Ảnh kèm chú thích |

---

## 📝 Text Formatting nâng cao

```html
<blockquote cite="https://source.com">
    "Code is like humor. When you have to explain it, it's bad."
    <cite>— Cory House</cite>
</blockquote>

<code>console.log("Hello")</code>        <!-- Code inline -->
<pre><code>                               <!-- Block code -->
function hello() {
    return "world";
}
</code></pre>

<abbr title="HyperText Markup Language">HTML</abbr>  <!-- Viết tắt -->
<time datetime="2026-01-15">15 tháng 1, 2026</time>  <!-- Thời gian -->
<mark>Highlighted text</mark>              <!-- Highlight -->
```

---

## 🎨 Media — Ảnh, Video, Audio

```html
<!-- Ảnh responsive -->
<figure>
    <img src="product.jpg" alt="iPhone 15 Pro Max" 
         loading="lazy" width="400" height="300">
    <figcaption>iPhone 15 Pro Max - 25.990.000đ</figcaption>
</figure>

<!-- Video HTML5 -->
<video controls width="640" poster="thumbnail.jpg">
    <source src="demo.mp4" type="video/mp4">
    <source src="demo.webm" type="video/webm">
    Browser không hỗ trợ video.
</video>

<!-- YouTube embed -->
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID"
        allowfullscreen></iframe>
```

> 💡 **`loading="lazy"`** = Ảnh chỉ tải khi user scroll đến → trang load nhanh hơn!

---

## 📊 Block vs Inline — Hai loại element cơ bản

| Block | Inline |
|---|---|
| Chiếm CẢ DÒNG | Chỉ chiếm NỘI DUNG |
| `<div>`, `<p>`, `<h1>`, `<section>` | `<span>`, `<a>`, `<strong>`, `<img>` |
| Co thể set width/height | Không set width/height |

```html
<div>Block 1 — chiếm cả dòng</div>
<div>Block 2 — xuống dòng mới</div>

<span>Inline 1</span>
<span>Inline 2 — nằm cạnh nhau</span>
```

---

## ➡️ Chương tiếp theo...

*Minh đã có nội dung phong phú: text, ảnh, video, semantic structure.*

*"Nhưng với e-commerce, mình cần bảng giá sản phẩm và form đặt hàng," Minh nghĩ. "HTML có thẻ nào cho bảng biểu và liên kết giữa các trang không?"*

**Chương tiếp theo:** Tables & Hyperlinks — Bảng dữ liệu cho danh sách sản phẩm, và navigation giữa các trang.
