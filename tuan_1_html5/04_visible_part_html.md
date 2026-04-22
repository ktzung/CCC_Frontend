# 🟦 TUẦN 1 - BÀI 04
# **PHẦN HIỂN THỊ — Visible Part of HTML**

---

## 0. 🎬 Opening Hook

*Minh so sánh trang Todo App của mình với trang sản phẩm của Shopee.*

*Shopee: ảnh sản phẩm góc nhìn 360°, video review, bảng so sánh thông số, trích dẫn đánh giá khách hàng, badge "Yêu thích"...*

*Todo App của Minh: text đen, xuống dòng, hết.*

*"HTML có những thẻ nào để tạo nội dung phong phú như vậy?"*

*Câu trả lời: HTML5 có hơn 100 thẻ — nhưng bạn chỉ cần nắm vững 20 thẻ dùng 80% thời gian.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Semantic HTML elements không chỉ về cú pháp — chúng ảnh hưởng đến:
- **SEO**: Google đọc `<article>`, `<section>`, `<h1>–<h6>` để hiểu cấu trúc nội dung
- **Accessibility**: Screen reader dùng semantic tags để điều hướng (người khiếm thị)
- **Maintainability**: Code dễ đọc, dễ debug hơn khi thẻ nói lên ý nghĩa

---

## 2. 🌐 Big Picture — Bản đồ `<body>`

```
<body>
├── <header>                    ← Đầu trang
│   ├── <nav>                   ← Menu điều hướng
│   └── Logo, search bar
│
├── <main>                      ← Nội dung chính (CHỈ 1 per page)
│   ├── <section>               ← Phân đoạn có tiêu đề
│   │   ├── <article>           ← Nội dung độc lập (card, bài viết)
│   │   └── <article>
│   └── <section>
│       ├── <figure>            ← Media + caption
│       └── <blockquote>        ← Trích dẫn
│
├── <aside>                     ← Sidebar, nội dung phụ
│
└── <footer>                    ← Cuối trang
```

**Nguyên tắc:** Dùng `<div>` CHỈ khi không có thẻ semantic nào phù hợp.

---

## 3. ⚙️ Core Technical Truth — Semantic Elements chi tiết

### Div Soup vs Semantic HTML

```html
<!-- ❌ "Div Soup" — Google không phân biệt được gì -->
<div class="header">
    <div class="nav">...</div>
</div>
<div class="content">
    <div class="article">...</div>
    <div class="sidebar">...</div>
</div>
<div class="footer">...</div>

<!-- ✅ Semantic — Google hiểu cấu trúc và ý nghĩa -->
<header>
    <nav>...</nav>
</header>
<main>
    <article>...</article>
    <aside>...</aside>
</main>
<footer>...</footer>
```

---

### Bản đồ Semantic Elements

| Thẻ | Ý nghĩa | Dùng cho | Ví dụ thực tế |
|---|---|---|---|
| `<header>` | Phần đầu | Logo, menu, search bar | Header Shopee |
| `<nav>` | Điều hướng | Menu links, breadcrumb | Menu chính, breadcrumb |
| `<main>` | Nội dung chính | Content area — CHỈ 1/trang | Khu vực nội dung |
| `<section>` | Phân đoạn | Nhóm nội dung liên quan, có tiêu đề | "Features", "Testimonials" |
| `<article>` | Nội dung độc lập | Bài viết, sản phẩm, comment, card | Mỗi sản phẩm trên Shopee |
| `<aside>` | Nội dung phụ | Sidebar, widget, quảng cáo liên quan | Filter sản phẩm bên trái |
| `<footer>` | Phần cuối | Copyright, links, liên hệ | Footer Shopee |
| `<figure>` | Media + caption | Ảnh kèm chú thích | Ảnh sản phẩm + tên ảnh |

---

### Text Formatting nâng cao

```html
<!-- Trích dẫn dài — blockquote -->
<blockquote cite="https://google.com/blog">
    "Good design is as little design as possible."
    <cite>— Dieter Rams</cite>
</blockquote>

<!-- Code inline và block -->
<code>console.log("Hello")</code>          <!-- Code trong câu -->

<pre><code>                                   <!-- Block code — giữ whitespace -->
function greet(name) {
    return `Hello, ${name}!`;
}
</code></pre>

<!-- Viết tắt — hover hiện tooltip -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- Thời gian có machine-readable format -->
<time datetime="2026-09-01">1 tháng 9, 2026</time>

<!-- Highlight text -->
<mark>Điều này rất quan trọng</mark>

<!-- Gạch ngang (xóa) và thêm vào -->
<del>Giá cũ: 500.000đ</del>
<ins>Giá mới: 399.000đ</ins>
```

---

### Media — Ảnh, Video, Audio

```html
<!-- Ảnh chuẩn production — có alt, lazy loading, kích thước rõ -->
<figure>
    <img src="product.jpg"
         alt="iPhone 15 Pro Max màu titan tự nhiên — nhìn từ mặt trước"
         width="600" height="400"
         loading="lazy">
    <figcaption>iPhone 15 Pro Max - 25.990.000đ</figcaption>
</figure>

<!-- Responsive images — browser chọn ảnh phù hợp màn hình -->
<picture>
    <source media="(max-width: 768px)" srcset="product-mobile.jpg">
    <source media="(max-width: 1200px)" srcset="product-tablet.jpg">
    <img src="product-desktop.jpg" alt="Sản phẩm">
</picture>

<!-- Video HTML5 với fallback -->
<video controls width="640" poster="thumbnail.jpg" preload="metadata">
    <source src="review.mp4" type="video/mp4">
    <source src="review.webm" type="video/webm">
    <p>Browser không hỗ trợ video. <a href="review.mp4">Tải video</a></p>
</video>

<!-- Nhúng YouTube -->
<iframe width="560" height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Video review iPhone 15"
        loading="lazy"
        allowfullscreen>
</iframe>
```

---

### Block vs Inline — Nhắc lại với ngữ cảnh thực tế

```html
<!-- Block: mỗi element chiếm cả dòng -->
<section>Một section</section>
<article>Một article</article>
<p>Một paragraph</p>

<!-- Inline: nằm cùng dòng với text xung quanh -->
<p>
    Giá: <del>500.000đ</del> <ins><strong>399.000đ</strong></ins>
    <mark>(Tiết kiệm 20%)</mark>
</p>
```

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **"Dùng thẻ nào nói lên ý nghĩa của nội dung, không phải hình thức của nó."**

- Nội dung là bài viết độc lập → `<article>`
- Nội dung là một phần của trang → `<section>`
- Nội dung là phụ, bổ sung → `<aside>`
- Không có loại nào phù hợp → `<div>`

---

## 5. 🏭 Real-world Layer — Trang sản phẩm Shopee

```html
<main>
    <article class="product-page">
        <section class="product-gallery">
            <figure>
                <img src="iphone-main.jpg"
                     alt="iPhone 15 Pro Max 256GB Titan Tự Nhiên"
                     width="600" height="600"
                     loading="lazy">
                <figcaption>Ảnh chính sản phẩm</figcaption>
            </figure>
        </section>

        <section class="product-info">
            <h1>iPhone 15 Pro Max 256GB</h1>
            <p class="price">
                <del>30.990.000đ</del>
                <ins><strong>25.990.000đ</strong></ins>
                <mark>Tiết kiệm 16%</mark>
            </p>
            <p>Màu: <strong>Titan Tự Nhiên</strong></p>
        </section>

        <section class="product-reviews">
            <h2>Đánh giá sản phẩm</h2>
            <article class="review">
                <blockquote>
                    "Pin trâu, camera cực đỉnh. Rất xứng đáng với giá tiền."
                    <cite>— Minh, mua ngày <time datetime="2026-01-15">15/1/2026</time></cite>
                </blockquote>
            </article>
        </section>
    </article>

    <aside class="related-products">
        <h2>Sản phẩm liên quan</h2>
        <!-- ... -->
    </aside>
</main>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Nâng cấp Todo App thành trang sản phẩm mini (20 phút)

Tạo file `product.html` mô phỏng trang sản phẩm đơn giản:

**Yêu cầu cấu trúc:**
```
<main>
  <article>              ← Trang sản phẩm
    <section>            ← Thông tin sản phẩm
      - <h1> tên sản phẩm
      - <p> giá (dùng <del> + <ins> để hiện giá cũ/mới)
      - <mark> badge giảm giá
    </section>
    <section>            ← Thông số kỹ thuật
      - <h2>
      - <ul> với các <li>
    </section>
    <section>            ← Đánh giá
      - <h2>
      - <blockquote> với <cite>
    </section>
  </article>
  <aside>                ← Sidebar: "Sản phẩm tương tự"
    - <h2>
    - <ul>
  </aside>
</main>
```

**Sau khi xong:** Inspect bằng DevTools → kiểm tra cấu trúc DOM có đúng như plan không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`<article>` chỉ dùng cho bài báo"** | `<article>` dùng cho bất kỳ nội dung **có thể đứng độc lập** — sản phẩm, comment, card, tweet |
| **"`<section>` và `<div>` giống nhau"** | `<section>` ngụ ý có tiêu đề liên quan và nội dung cùng chủ đề. `<div>` chỉ là container không có ý nghĩa |
| **"`loading='lazy'` làm ảnh load chậm hơn"** | `loading="lazy"` làm **trang** load nhanh hơn — ảnh chỉ tải khi user scroll đến, giảm bandwidth ban đầu |
| **"Chỉ cần `alt` ngắn gọn"** | `alt` phải **mô tả nội dung ảnh** đủ để người không thấy ảnh vẫn hiểu. "product.jpg" = sai. "iPhone 15 Pro Max màu Titan Tự Nhiên nhìn từ mặt trước" = đúng |
| **"`<b>` và `<strong>` render giống nhau nên dùng cái nào cũng được"** | Render giống nhau (cả hai đều đậm) nhưng `<strong>` có semantic meaning → Screen reader đọc nhấn mạnh, Google coi trọng hơn |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Khi nào dùng `<article>`, khi nào dùng `<section>`? Cho ví dụ cụ thể.
2. `loading="lazy"` trên thẻ `<img>` làm gì? Tại sao không lazy load TẤT CẢ ảnh?
3. `<figure>` và `<img>` khác nhau thế nào? Khi nào cần dùng `<figure>`?

### Câu hỏi áp dụng:

4. Bạn đang build trang blog. Mỗi bài viết có: tiêu đề, ngày đăng, nội dung, và phần comment. Vẽ cấu trúc HTML sử dụng semantic elements đúng.
5. Một trang hiện ảnh sản phẩm và load rất chậm vì có 50 ảnh. Bạn sẽ sửa gì trong HTML để trang load nhanh hơn (không cần thay đổi CSS hay JS)?

<details>
<summary>👁️ Xem đáp án</summary>

1. **`<article>`** = nội dung **độc lập**, có thể lấy ra khỏi trang và vẫn có nghĩa (bài viết, sản phẩm, comment). **`<section>`** = nhóm nội dung **liên quan với nhau** trong ngữ cảnh trang (phần "Tính năng", phần "Đánh giá").
2. `loading="lazy"` = ảnh chỉ tải khi user scroll **gần đến** ảnh đó → trang load ban đầu nhẹ hơn. Không lazy load **ảnh đầu trang (above the fold)** — người dùng thấy ngay, cần tải sớm. Chỉ lazy load ảnh bên dưới.
3. `<figure>` là container bao gồm media (`<img>`, `<video>`, code block) và `<figcaption>` (chú thích). Dùng `<figure>` khi media có chú thích giải thích nội dung.
4. `<article>` bao toàn bài viết → `<header>` (tiêu đề + ngày đăng) → `<section>` (nội dung bài) → `<section>` (comments) → `<article>` cho từng comment.
5. Thêm `loading="lazy"` vào tất cả `<img>` **không phải ảnh đầu trang**. Thêm `width` và `height` để browser reserve không gian → tránh layout shift khi ảnh load.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Dùng đúng semantic element**: `<article>` = độc lập, `<section>` = phân đoạn liên quan, `<aside>` = phụ
2. **`<figure>` + `<figcaption>`** = cách đúng để hiển thị media có mô tả
3. **`loading="lazy"`** = best practice cho ảnh không ở đầu trang
4. **`alt` phải có nghĩa** — mô tả đủ để người không thấy ảnh vẫn hiểu
5. **`<blockquote>` + `<cite>`** = cách semantic để trích dẫn

---

## 10. ➡️ Next Lesson Bridge

*Trang sản phẩm của Minh có ảnh, trích dẫn, thông số kỹ thuật. Trông đã giống website thật hơn.*

*"Nhưng với e-commerce, mình cần hiển thị danh sách sản phẩm dạng bảng — tên, giá, số lượng. Và phải có menu navigation để chuyển giữa các trang."*

**→ [Bài 05: Tables & Hyperlinks](./05_tables_hyperlinks.md) — Bảng dữ liệu tabular và hệ thống navigation đa trang.**
