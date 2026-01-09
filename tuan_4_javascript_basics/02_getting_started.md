# 🟨 PART II - CHƯƠNG 02
# **GETTING STARTED WITH JAVASCRIPT**

Bạn đã biết HTML tạo khung, CSS trang trí. Giờ là lúc mời "nhạc trưởng" JavaScript vào để điều khiển mọi thứ.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu mối quan hệ biện chứng giữa HTML, CSS và JavaScript.
- Biết 3 cách chèn JavaScript vào trang web.
- Viết được chương trình "Hello World" huyền thoại.
- Biết cách debug cơ bản với `console.log`.

---

# 1. **THE TRINITY OF WEB (BỘ BA QUYỀN LỰC)**

Hãy tưởng tượng một ngôi nhà:
1.  **HTML (Cấu trúc):** Móng, tường, cột, cửa sổ. (Cố định).
2.  **CSS (Giao diện):** Màu sơn, rèm cửa, nội thất đẹp. (Tĩnh).
3.  **JavaScript (Hành vi):** Hệ thống điện thông minh, cửa tự động mở, đèn tự sáng khi vỗ tay. (Động).

=> Thiếu JS, web chỉ là những trang văn bản chán ngắt đứng im.

---

# 2. **INTEGRATING JAVASCRIPT**

Có 3 cách để nhúng JS, tương tự như CSS.

## 2.1. Inline JavaScript (Viết trong thẻ - Ít dùng)
Viết trực tiếp vào các sự kiện (events) của thẻ HTML.

```html
<button onclick="alert('Chào bạn!')">Bấm tôi đi</button>
```
*Nhược điểm: Code lộn xộn, khó bảo trì.*

## 2.2. Internal JavaScript (Viết trong thẻ `<script>`)
Thường đặt ở cuối thẻ `<body>` (trước khi đóng body) để HTML load xong rồi mới chạy script (tránh làm chậm web).

```html
<body>
  <h1>Website của tôi</h1>
  
  <script>
    console.log('Đây là JS nội bộ');
    alert('Web đã tải xong!');
  </script>
</body>
```

## 2.3. External JavaScript (File riêng - Khuyên dùng)
Tách code ra file `.js`.

**File: `script.js`**
```javascript
console.log('Xin chào từ file script.js');
```

**File: `index.html`**
```html
<body>
  <h1>Demo External JS</h1>
  
  <!-- Link file JS vào -->
  <script src="script.js"></script>
</body>
```
*Ưu điểm: Tách biệt code, dễ quản lý, cache trình duyệt tốt.*

---

# 3. **YOUR FIRST PROGRAM**

## 3.1. Outputting Data (Xuất dữ liệu)
JS có thể "nói chuyện" với bạn qua nhiều cách:

1.  **`console.log("Hello")`**: In ra tab Console của DevTools (Dành cho Developer check lỗi).
2.  **`alert("Hello")`**: Bật cửa sổ thông báo (Gây phiền, ít dùng thực tế).
3.  **`document.write("Hello")`**: Ghi đè nội dung vào trang (Chỉ dùng demo, tuyệt đối không dùng trong dự án thật).
4.  **`document.getElementById("id").innerHTML = "Hello"`**: Thay đổi nội dung phần tử HTML (Cách chuẩn nhất).

## 3.2. Demo thực hành
Tạo một file `index.html`:

```html
<!DOCTYPE html>
<html>
<body>
  <h1 id="tieu-de">Tiêu đề cũ</h1>
  <button onclick="doiTen()">Đổi tên</button>

  <script>
    function doiTen() {
      // Tìm thẻ có id là 'tieu-de' và đổi nội dung
      document.getElementById('tieu-de').innerHTML = 'Tiêu đề MỚI!';
      
      // In log xác nhận
      console.log('Đã đổi tên thành công!');
    }
  </script>
</body>
</html>
```

---

# 4. **COMMENTS (CHÚ THÍCH)**
Code là để máy chạy, nhưng comment là để người đọc (và chính bạn của tương lai).

```javascript
// Đây là comment 1 dòng (máy sẽ bỏ qua)

/*
  Đây là comment
  nhiều dòng
  (Block comment)
*/
```

---

# 5. **TỔNG KẾT**

- Luôn ưu tiên dùng **External JS** (`<script src="...">`).
- Đặt thẻ `<script>` ở cuối `<body>` để tăng tốc độ tải trang.
- Dùng `console.log()` để kiểm tra code chạy ra sao (F12 -> Console).

---

**Chương tiếp theo:** Làm sao để lưu trữ thông tin? (Biến và Kiểu dữ liệu).
