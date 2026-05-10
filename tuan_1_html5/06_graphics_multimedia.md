# 🟦 TUẦN 1 - BÀI 06
# **GRAPHICS & MULTIMEDIA**

---

## 0. 🎬 Opening Hook

*Minh hoàn thành Todo App — toàn text đen, không một hình ảnh.*

*Linh mở Shopee cạnh đó: ảnh sản phẩm 360°, video review, icon SVG mượt trên mọi màn hình, badge "Flash Sale" animation...*

*"Sao Shopee tải nhanh dù có hàng trăm ảnh?" Minh thắc mắc.*

*Câu trả lời: không phải số lượng ảnh — mà là **cách dùng đúng kỹ thuật**: đúng format, đúng kích thước, đúng thời điểm tải.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**Tối ưu ảnh và media ảnh hưởng trực tiếp đến:**
- **Page Load Speed** — Google dùng tốc độ để rank. Trang nặng = rank thấp
- **Core Web Vitals** — LCP (Largest Contentful Paint) thường là ảnh hero
- **Bandwidth** — ảnh sai format có thể nặng gấp 3–5 lần cần thiết
- **Accessibility** — `alt` text xấu = người dùng screen reader không hiểu nội dung

---

## 2. 🌐 Big Picture — Bản đồ Media trong HTML

```
Media trong HTML
│
├── Raster Images (ảnh điểm ảnh)
│   ├── <img>           → Ảnh thông thường
│   └── <picture>       → Responsive images (browser chọn phù hợp)
│
├── Vector Graphics
│   └── <svg>           → Logo, icon, illustration — zoom vô hạn
│
├── Video
│   ├── <video>         → Video self-hosted
│   └── <iframe>        → Embed YouTube/Vimeo
│
├── Audio
│   └── <audio>         → Podcast, nhạc nền
│
└── Embedded Content
    └── <iframe>        → Google Maps, Google Docs, external sites
```

---

## 3. ⚙️ Core Technical Truth

### Chọn format ảnh đúng

| Format | Khi nào dùng | Kích thước tương đối | Đặc điểm |
|---|---|---|---|
| **JPEG/JPG** | Ảnh chụp, ảnh nhiều màu | 100% (baseline) | Nén lossy, không hỗ trợ transparency |
| **PNG** | Cần background trong suốt | 120–150% | Lossless, file nặng hơn |
| **WebP** | Mọi ảnh (nếu hỗ trợ) | 60–70% | Nén tốt hơn JPEG 30%, hỗ trợ transparency |
| **SVG** | Logo, icon, illustration | 5–20KB | Vector — zoom vô hạn không vỡ, CSS-able |
| **AVIF** | Ảnh chất lượng cao | 40–50% | Mới nhất, tốt nhất — browser support chưa đủ |

**Quyết định nhanh:**
```
Ảnh sản phẩm, banner → WebP (với JPEG fallback)
Logo, icon           → SVG
Screenshot, diagram  → PNG
Ảnh chụp thông thường → JPEG nếu không dùng WebP
```

---

### `<img>` — Best Practices

```html
<!-- ✅ Đầy đủ các attribute cần thiết -->
<img src="product.jpg"
     alt="iPhone 15 Pro Max 256GB màu Titan Tự Nhiên, nhìn từ phía trước"
     width="600"
     height="400"
     loading="lazy">

<!-- ❌ Thiếu các attribute quan trọng -->
<img src="product.jpg">
```

**Giải thích từng attribute:**

| Attribute | Bắt buộc? | Mục đích |
|---|---|---|
| `src` | ✅ | Đường dẫn đến file ảnh |
| `alt` | ✅ | Mô tả ảnh cho screen reader và khi ảnh lỗi |
| `width` + `height` | ✅ | Giúp browser reserve không gian → tránh layout shift |
| `loading="lazy"` | Khuyến nghị | Tải ảnh khi user scroll đến → trang load nhanh hơn |

> ⚠️ **Không lazy load ảnh "above the fold"** (ảnh hero, logo, ảnh đầu tiên user thấy). Chỉ lazy load ảnh bên dưới.

---

### `<picture>` — Responsive Images

```html
<!-- Browser tự chọn ảnh phù hợp với màn hình và format hỗ trợ -->
<picture>
    <!-- Ưu tiên AVIF (nhẹ nhất) -->
    <source srcset="product.avif" type="image/avif">
    <!-- Fallback WebP -->
    <source srcset="product.webp" type="image/webp">
    <!-- Fallback JPEG cho browser cũ -->
    <img src="product.jpg"
         alt="Sản phẩm"
         width="600" height="400"
         loading="lazy">
</picture>
```

**Hoặc responsive theo màn hình:**
```html
<picture>
    <source media="(max-width: 768px)" srcset="product-mobile.webp">
    <source media="(max-width: 1200px)" srcset="product-tablet.webp">
    <img src="product-desktop.webp" alt="Sản phẩm" width="1200" height="800">
</picture>
```

---

### SVG — Vector Graphics

```html
<!-- SVG inline — có thể style bằng CSS -->
<svg width="24" height="24" viewBox="0 0 24 24"
     fill="none" xmlns="http://www.w3.org/2000/svg"
     aria-label="Thêm vào giỏ hàng" role="img">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor"/>
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor"/>
</svg>

<!-- SVG như file ảnh (không style bằng CSS được) -->
<img src="logo.svg" alt="Logo công ty" width="120" height="40">
```

**Tại sao SVG > PNG cho icon:**
- Zoom vô hạn không vỡ (vector, không phải điểm ảnh)
- 1 file dùng được mọi kích thước (không cần @2x, @3x)
- CSS có thể thay đổi màu sắc (`fill: currentColor`)
- File nhẹ hơn PNG nhiều lần

---

### Video & Audio

```html
<!-- Video self-hosted với multiple formats và fallback -->
<video controls
       width="640"
       height="360"
       poster="thumbnail.jpg"
       preload="metadata">
    <source src="review.webm" type="video/webm">   <!-- WebM trước — nhẹ hơn -->
    <source src="review.mp4" type="video/mp4">    <!-- MP4 fallback -->
    <p>Browser không hỗ trợ HTML5 video.
       <a href="review.mp4">Tải video trực tiếp</a>
    </p>
</video>

<!-- YouTube embed — lazy load quan trọng -->
<iframe width="560" height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Video review sản phẩm iPhone 15"
        frameborder="0"
        loading="lazy"
        allowfullscreen>
</iframe>

<!-- Audio -->
<audio controls preload="none">
    <source src="podcast.ogg" type="audio/ogg">
    <source src="podcast.mp3" type="audio/mpeg">
    <p>Browser không hỗ trợ HTML5 audio.</p>
</audio>
```

**Giải thích `preload`:**
| Giá trị | Ý nghĩa | Dùng khi |
|---|---|---|
| `none` | Không tải gì trước | Audio/Video không quan trọng |
| `metadata` | Chỉ tải thông tin (duration, dimensions) | Mặc định tốt nhất |
| `auto` | Tải toàn bộ | Chỉ khi video/audio là nội dung chính |

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **"Đúng format, đúng kích thước, đúng thời điểm — ba nguyên tắc tối ưu ảnh."**

- **Đúng format**: WebP cho ảnh, SVG cho icon
- **Đúng kích thước**: `width` + `height` để tránh layout shift
- **Đúng thời điểm**: `loading="lazy"` cho ảnh bên dưới màn hình

---

## 5. 🏭 Real-world Layer — Tại Shopee

**Shopee tối ưu ảnh thế nào để load nhanh với hàng trăm sản phẩm:**

1. **CDN (Content Delivery Network)** — ảnh được phục vụ từ server gần nhất với người dùng
2. **WebP format** — nhẹ hơn JPEG 30%, dùng cho mọi ảnh sản phẩm
3. **Lazy loading** — chỉ tải ảnh đang visible trên màn hình
4. **Image sizing** — ảnh thumbnail nhỏ, load ảnh lớn khi user click
5. **Skeleton loading** — hiện placeholder trước khi ảnh tải xong

**Core Web Vitals liên quan đến ảnh:**
- **LCP (Largest Contentful Paint)** — thường là ảnh hero. Mục tiêu: < 2.5 giây
- **CLS (Cumulative Layout Shift)** — tránh bằng cách set `width` + `height` trước

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Gallery sản phẩm (20 phút)

Tạo file `gallery.html` với:

**Yêu cầu:**
1. `<header>` với logo SVG (tự viết SVG đơn giản: hình tròn + chữ)
2. `<main>` chứa gallery 3 sản phẩm, mỗi sản phẩm:
   ```html
   <article class="product">
       <figure>
           <img src="..." alt="Mô tả chi tiết ảnh" width="300" height="300" loading="lazy">
           <figcaption>Tên sản phẩm — Giá</figcaption>
       </figure>
   </article>
   ```
   → Dùng ảnh từ [Unsplash Source](https://source.unsplash.com/300x300/?product) hoặc placeholder
3. Một `<video>` YouTube embed (bất kỳ video nào) với `loading="lazy"`
4. `<footer>` với link mạng xã hội (external, `rel="noopener"`)

**Sau khi xong:** Mở DevTools → tab **Network** → filter "Img" → xem ảnh nào load trước, ảnh nào load lazy.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`alt` để trống thì thôi"** | `alt=""` (chuỗi rỗng) là **hợp lệ** — dùng cho ảnh trang trí thuần túy. Nhưng thiếu `alt` hoàn toàn = lỗi accessibility |
| **"WebP chưa đủ browser support"** | WebP được support bởi **97%+ browser** — hãy dùng nó |
| **"`loading='lazy'` cho tất cả ảnh để nhanh hơn"** | Ảnh đầu tiên user thấy (LCP image) **không nên lazy load** — phải tải ngay để tránh chậm LCP |
| **"SVG không dùng được như ảnh bình thường"** | SVG hoàn toàn dùng được qua `<img src='logo.svg'>` — chỉ là không style được bằng CSS. Để style được phải dùng inline SVG |
| **"Video HTML5 cần tải nhiều format"** | Chỉ cần **WebM + MP4** — hai format này cover 99%+ browser hiện đại |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Khi nào nên dùng **SVG** thay vì **PNG** cho icon? Nêu 2 lý do kỹ thuật.
2. Sự khác biệt giữa `<img>` và `<picture>` là gì? Khi nào cần dùng `<picture>`?
3. `preload="metadata"` trong `<video>` có nghĩa là gì?

### Câu hỏi áp dụng:

4. Trang landing page có: logo ở header, ảnh hero 1200px, 12 ảnh sản phẩm bên dưới, 1 video YouTube. Thẻ/attribute nào nên dùng `loading="lazy"`? Thẻ nào không nên?
5. Ảnh sản phẩm của bạn đang dùng format PNG, size 2MB. Ba cách nào để giảm kích thước mà không xấu đi đáng kể?

<details>
<summary>👁️ Xem đáp án</summary>

1. SVG hơn PNG: (1) **Zoom vô hạn không vỡ** — 1 file dùng mọi kích thước (retina display 2x, 3x), (2) **CSS-able** — có thể thay màu fill/stroke bằng CSS hoặc JS khi hover, active, dark mode.
2. `<img>` = ảnh đơn, browser không có lựa chọn. `<picture>` = browser chọn source phù hợp nhất theo: format support (AVIF > WebP > JPEG) hoặc breakpoint màn hình. Dùng `<picture>` khi muốn serve ảnh khác nhau cho mobile/desktop hoặc support multiple formats.
3. `preload="metadata"` = browser chỉ tải đủ thông tin để biết **duration, dimensions** của video — không tải frame video. Tốt hơn `none` (user thấy duration ngay) và tốt hơn `auto` (không lãng phí bandwidth nếu user không bấm play).
4. **Không lazy load**: logo (trong viewport ngay), ảnh hero (LCP image). **Nên lazy load**: 12 ảnh sản phẩm bên dưới, `<iframe>` YouTube embed.
5. (1) **Chuyển sang WebP** — nhẹ hơn ~30-40%. (2) **Resize về kích thước thực hiển thị** — nếu hiển thị 300x300, không cần ảnh 2000x2000. (3) **Dùng `srcset`** trong `<picture>` để serve ảnh nhỏ hơn cho mobile.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **WebP cho ảnh, SVG cho icon** — hai lựa chọn format mặc định hiện nay
2. **Luôn thêm `width` + `height`** vào `<img>` — tránh CLS (layout shift)
3. **`loading="lazy"`** chỉ cho ảnh bên dưới fold — không cho ảnh hero/logo
4. **`<picture>`** cho progressive enhancement — AVIF → WebP → JPEG fallback
5. **`alt` phải mô tả nội dung** — không phải tên file, không phải trống tùy tiện

---

## 10. ➡️ Next Lesson Bridge

*Trang của Minh đẹp hơn rồi — có ảnh sản phẩm, video review, icon SVG.*

*"Nhưng mình cần form đăng ký, đăng nhập, và form đặt hàng. HTML có validate email, số điện thoại tự động không, hay phải viết JS?"*

**→ [Bài 07: Forms & Interactive Elements](./07_forms_interactive.md) — HTML5 validation, input types, và accessibility cho forms.**
