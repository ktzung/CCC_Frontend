# 🟦 CHƯƠNG 06
# **GRAPHICS AND MULTIMEDIA**

Một bức ảnh hơn ngàn lời nói. Web hiện đại không thể thiếu hình ảnh, video và âm thanh. Chương này sẽ giúp trang web của bạn trở nên sinh động và hấp dẫn hơn.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Chèn ảnh (`<img>`) đúng cách và tối ưu.
- Sử dụng thẻ `<figure>` để tạo chú thích ảnh.
- Hiểu định dạng đồ họa vector (**SVG**).
- Nhúng **Video** và **Audio** trực tiếp vào trang web.
- Nhúng nội dung từ Youtube, Google Maps bằng **Iframe**.

---

# 1. **EMBEDDING IMAGES (CHÈN ẢNH)**

## 1.1. Thẻ `<img>` cơ bản
Là thẻ tự đóng (self-closing).

```html
<img src="cat.jpg" alt="Một con mèo dễ thương" width="500">
```

- **`src` (Source):** Đường dẫn tới file ảnh (link online hoặc file trong máy).
- **`alt` (Alternative Text):** Văn bản thay thế. **CỰC KỲ QUAN TRỌNG** vì:
    - Hiển thị nếu ảnh bị lỗi (không load được).
    - Giúp người khiếm thị "nghe" được nội dung ảnh.
    - Tốt cho SEO Google.

## 1.2. Hình ảnh có chú thích (`<figure>`)
Muốn thêm dòng chú thích dưới ảnh một cách ngữ nghĩa (semantic)?

```html
<figure>
    <img src="bieu-do.png" alt="Biểu đồ doanh số 2024">
    <figcaption>Hình 1: Doanh số tăng trưởng năm 2024</figcaption>
</figure>
```

---

# 2. **VECTOR GRAPHICS (ĐỒ HỌA VECTOR)**

Khác với ảnh Raster (JPG, PNG) bị vỡ khi phóng to, ảnh Vector (SVG) luôn sắc nét ở mọi kích thước.

## 2.1. SVG Inline
Bạn có thể vẽ trực tiếp bằng code HTML!

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```
Đoạn code trên vẽ một hình tròn màu vàng viền xanh.

## 2.2. Dùng file .svg
Cách dùng phổ biến hơn là lưu thành file `.svg` và dùng thẻ `<img>` như bình thường.
```html
<img src="logo.svg" alt="Company Logo">
```

---

# 3. **VIDEO & AUDIO**

Trước HTML5, ta phải dùng Flash (rất nặng). Giờ đây mọi thứ cực đơn giản.

## 3.1. Video
```html
<video controls width="100%" poster="thumb.jpg">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    Trình duyệt của bạn không hỗ trợ video.
</video>
```
- **`controls`:** Hiện nút Play, Pause, Volume.
- **`poster`:** Ảnh hiển thị khi chưa bấm play (thumbnail).
- **`source`:** Cung cấp nhiều định dạng để dự phòng (nếu trình duyệt không đọc được mp4 thì thử webm).

## 3.2. Audio
Tương tự video.
```html
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
    Trình duyệt không hỗ trợ nghe nhạc.
</audio>
```

---

# 4. **IFRAME (NHÚNG NỘI DUNG NGOÀI)**

Bạn muốn mang Youtube hoặc Bản đồ vào web của mình? Dùng `<iframe>`.

## 4.1. Nhúng Youtube
1. Vào Youtube -> Nút Chia sẻ (Share) -> Nhúng (Embed).
2. Copy đoạn code.

```html
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    title="YouTube video player" frameborder="0" allowfullscreen>
</iframe>
```

## 4.2. Nhúng Google Maps
1. Vào Maps -> Chia sẻ -> Nhúng bản đồ.
2. Copy code HTML.

---

# 5. **TỔNG KẾT**

- Luôn luôn có `alt` text cho thẻ `<img>`.
- Dùng `<figure>` và `<figcaption>` cho ảnh có chú thích.
- SVG tuyệt vời cho Logo và Icons.
- Nhúng Video/Audio bằng thẻ `video`/`audio` native của HTML5.

---

**Chương tiếp theo:** Tương tác với người dùng thông qua Biểu mẫu (Forms).
