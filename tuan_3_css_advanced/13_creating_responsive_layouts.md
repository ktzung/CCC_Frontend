# 🟩 CHƯƠNG 13
# **CREATING RESPONSIVE LAYOUTS WITH CSS**

Ngày nay, người dùng lướt web bằng điện thoại nhiều hơn máy tính. Nếu web của bạn không **Responsive** (Đáp ứng - hiển thị tốt trên mọi thiết bị), bạn đã thất bại ngay từ vòng gửi xe.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu tư duy **Mobile-First**.
- Làm chủ **Media Queries** (`@media`).
- Biết cách chọn **Breakpoints** chuẩn.
- Kết hợp Flexbox/Grid để làm layout co giãn.

---

# 1. **VIEWPORT META TAG**

Tấm vé thông hành để bước vào thế giới Mobile. Nếu thiếu dòng này, điện thoại sẽ coi web của bạn là web máy tính và thu nhỏ xíu lại (zoom out).

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
*Luôn đặt trong thẻ `<head>`.*

---

# 2. **MEDIA QUERIES (CÂU TRUY VẤN PHƯƠNG TIỆN)**

Đây là công cụ chính để tạo Responsive. Nó cho phép áp dụng CSS riêng cho từng kích thước màn hình.

## 2.1. Cú pháp cơ bản
```css
/* Mặc định (cho máy tính/màn to) */
body {
  background-color: white;
}

/* Nếu màn hình nhỏ hơn 600px (Điện thoại) */
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

## 2.2. Các Breakpoints phổ biến (Bootstrap Standard)
- **Extra small (xs):** < 576px (Điện thoại dọc)
- **Small (sm):** ≥ 576px (Điện thoại ngang)
- **Medium (md):** ≥ 768px (Tablet)
- **Large (lg):** ≥ 992px (Desktop nhỏ)
- **Extra large (xl):** ≥ 1200px (Desktop lớn)

---

# 3. **RESPONSIVE STRATEGIES**

## 3.1. Desktop-First (Cách cũ)
Làm cho máy tính trước, rồi viết media query `max-width` để sửa cho điện thoại.
*Nhược điểm: Điện thoại phải tải code CSS thừa của máy tính.*

## 3.2. Mobile-First (Cách mới - Khuyên dùng)
Làm cho điện thoại trước (tối ưu, nhẹ), rồi viết media query `min-width` để thêm tính năng cho máy tính.

```css
/* 1. Code cho Mobile trước (Mặc định) */
.col {
  width: 100%; /* 1 cột dọc */
}

/* 2. Tablet trở lên (≥ 768px) */
@media (min-width: 768px) {
  .col {
    width: 50%; /* 2 cột */
  }
}

/* 3. Desktop trở lên (≥ 1024px) */
@media (min-width: 1024px) {
  .col {
    width: 25%; /* 4 cột */
  }
}
```

---

# 4. **RESPONSIVE IMAGES & VIDEOS**

Đừng bao giờ để ảnh to hơn màn hình (gây vỡ layout - horizontal scrollbar).

```css
img, video {
  max-width: 100%; /* Không bao giờ to hơn cha nó */
  height: auto;    /* Giữ tỷ lệ khung hình */
}
```

---

# 5. **FLEXBOX & GRID IN RESPONSIVE**

Media Queries kết hợp với Flexbox/Grid là cặp bài trùng.

## Ví dụ: Menu điều hướng (Navbar)
- **Mobile:** Ẩn menu, hiện nút Hamburger ☰.
- **Desktop:** Hiện menu nằm ngang.

```css
/* Mobile */
.menu {
  display: none; /* Ẩn */
}
.hamburger {
  display: block; /* Hiện nút */
}

/* Desktop */
@media (min-width: 768px) {
  .menu {
    display: flex; /* Hiện menu dạng flex */
  }
  .hamburger {
    display: none; /* Ẩn nút */
  }
}
```

---

# 6. **TỔNG KẾT**

- Dùng `<meta viewport>`.
- Tư duy **Mobile-First** (`min-width`).
- `img { max-width: 100% }` là bắt buộc.
- Sử dụng Flexbox/Grid để layout thay đổi linh hoạt thay vì set `width` cứng (px).

---

**Chương tiếp theo:** Làm đẹp website với hiệu ứng, màu sắc nâng cao (Styling with CSS).
