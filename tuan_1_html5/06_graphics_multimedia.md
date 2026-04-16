# 🟦 CHƯƠNG 06
# **GRAPHICS & MULTIMEDIA**

## 🎬 "Trang web không có ảnh = Tờ giấy A4"

*Minh hoàn thành Todo App nhưng toàn text. Linh bảo: "So với Shopee — họ có ảnh sản phẩm, video review, icon SVG. Trang mình trông như báo cáo Word."*

*"Đúng rồi," Minh nghĩ. "Mình cần học cách nhúng media vào HTML."*

---

## 🎯 Mục tiêu
- Sử dụng ảnh responsive (`<img>`, `<picture>`)
- Hiểu SVG vs PNG vs JPG
- Nhúng video, audio, iframe
- Canvas cơ bản

---

## 🖼️ Images — Responsive và tối ưu

### Ảnh cơ bản + Best Practices:

```html
<!-- Chuẩn nhất: có alt, loading lazy, kích thước rõ ràng -->
<img src="product.jpg" 
     alt="iPhone 15 Pro Max màu titan tự nhiên"
     width="600" height="400"
     loading="lazy">
```

### Responsive Images — Ảnh thay đổi theo màn hình:

```html
<picture>
    <source media="(max-width: 768px)" srcset="product-mobile.jpg">
    <source media="(max-width: 1200px)" srcset="product-tablet.jpg">
    <img src="product-desktop.jpg" alt="Sản phẩm">
</picture>
```

### Chọn format ảnh:

| Format | Khi nào | Ví dụ |
|---|---|---|
| **JPEG** | Ảnh chụp, nhiều màu | Ảnh sản phẩm, banner |
| **PNG** | Cần transparency | Logo, icon |
| **SVG** | Vector, scale vô hạn | Icon, logo, illustration |
| **WebP** | Hiện đại, nhẹ hơn JPEG 30% | Mọi ảnh (nếu browser hỗ trợ) |

---

## 🎬 Video & Audio HTML5

```html
<!-- Video với controls -->
<video controls width="640" poster="thumbnail.jpg" preload="metadata">
    <source src="review.mp4" type="video/mp4">
    <source src="review.webm" type="video/webm">
    <p>Browser không hỗ trợ video. <a href="review.mp4">Tải video</a></p>
</video>

<!-- Audio -->
<audio controls>
    <source src="podcast.mp3" type="audio/mpeg">
    <source src="podcast.ogg" type="audio/ogg">
</audio>

<!-- YouTube embed -->
<iframe width="560" height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video review sản phẩm"
        frameborder="0" allowfullscreen
        loading="lazy"></iframe>
```

---

## ✏️ SVG — Vector Graphics

```html
<!-- SVG inline — tùy chỉnh bằng CSS -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          fill="#e91e63"/>
</svg>
```

> 💡 **SVG ưu điểm:** Zoom vô hạn không vỡ (vector), nhẹ, CSS-able. Icon nên dùng SVG thay PNG.

---

## ➡️ Chương tiếp theo...

*"Trang đẹp hơn rồi!" Minh nói. "Nhưng mình cần form đăng ký, form đăng nhập, form đặt hàng..."*

**Chương tiếp theo:** Forms & Interactive Elements — Thu thập dữ liệu từ người dùng.
