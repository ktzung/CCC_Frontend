# 🟦 CHƯƠNG 02
# **BASIC STRUCTURE OF HTML & HTML DOCUMENTS**

Ở chương trước, bạn đã biết HTML là khung xương của trang web. Chương này sẽ hướng dẫn bạn cách lắp ráp những "viên gạch" đầu tiên để tạo nên bộ khung đó, từ cú pháp thẻ cơ bản đến cấu trúc chuẩn của một file HTML.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu rõ **Syntax (Cú pháp)** của thẻ HTML, Attribute và quy tắc Nesting.
- Biết cấu trúc chuẩn một file HTML5 (`DOCTYPE`, `html`, `head`, `body`).
- Tạo được trang web đơn giản đầu tiên.

---

# 1. **SYNTAX VÀ STRUCTURE (CÚ PHÁP & CẤU TRÚC)**

## 1.1. Cấu trúc thẻ (Element)
HTML được tạo thành từ các **Elements** (Phần tử).

```html
  Attribute             Content
     ↓                     ↓
<p class="text-red">Hello World</p>
↑                   ↑             ↑
Opening Tag         Closing Tag
```

- **Opening Tag (Thẻ mở):** `<tên_thẻ>`. Ví dụ: `<p>`, `<h1>`.
- **Content (Nội dung):** Thứ hiển thị lên màn hình.
- **Closing Tag (Thẻ đóng):** `</tên_thẻ>`. Ví dụ: `</p>`, `</h1>`.
- **Attribute (Thuộc tính):** Cung cấp thêm thông tin cho thẻ (màu sắc, ID, đường dẫn...), luôn nằm trong thẻ mở.

> [!NOTE]
> **Self-closing Tags (Thẻ tự đóng):** Một số thẻ không cần thẻ đóng vì chúng không chứa nội dung text.
> Ví dụ: `<img>` (ảnh), `<br>` (xuống dòng), `<input>` (ô nhập liệu).

## 1.2. Nesting (Lồng nhau)
Quy tắc quan trọng nhất: **Mở sau thì phải Đóng trước** (First-In, Last-Out).

```html
<!-- ✅ ĐÚNG -->
<div>
    <p>Tôi nằm trong thẻ div.</p>
</div>

<!-- ❌ SAI (Lỗi chồng chéo) -->
<div>
    <p>Tôi bị lỗi rồi.</div>
</p>
```

**Mẹo:** Luôn thụt lề (indent) code để dễ nhìn cấu trúc lồng nhau.

---

# 2. **A SIMPLE HTML DOCUMENT FRAMEWORK (KHUNG TRANG WEB ĐƠN GIẢN)**

Mọi trang web trên thế giới, từ Google đến Facebook, đều bắt đầu bằng khung cấu trúc này:

```html
<!DOCTYPE html>                 <!-- 1. Khai báo đây là HTML5 -->
<html lang="vi">                <!-- 2. Thẻ gốc (Root element) -->

<head>                          <!-- 3. Chứa thông tin cho trình duyệt (User không thấy) -->
    <meta charset="UTF-8">      <!-- Hỗ trợ gõ tiếng Việt không bị lỗi font -->
    <title>Trang Web Đầu Tiên</title> <!-- Tên hiển thị trên tab trình duyệt -->
</head>

<body>                          <!-- 4. Chứa nội dung hiển thị (User nhìn thấy) -->
    <h1>Xin chào thế giới!</h1>
    <p>Tôi đang học HTML căn bản.</p>
</body>

</html>
```

## Giải thích chi tiết:
1.  **`<!DOCTYPE html>`:** Không phải là thẻ HTML, mà là lời "tuyên bố" với trình duyệt: *"Này, tôi đang dùng phiên bản HTML5 mới nhất!"*.
2.  **`<html>`:** Thẻ gốc bao trùm tất cả mọi thứ.
3.  **`<head>`:** "Bộ não" của trang web. Chứa các cài đặt: tiêu đề, bảng mã, link CSS... Người dùng lướt web sẽ không thấy nội dung trong này (trừ Title).
4.  **`<body>`:** "Thân xác" của trang web. Tất cả văn bản, hình ảnh, video bạn muốn người dùng xem thì **PHẢI** đặt trong đây.

---

# 3. **VISUAL LAYOUT ANALYSIS (TƯ DUY BỐ CỤC)**

Trước khi code, hãy học cách "nhìn" giao diện.

Khi bạn nhìn vào một trang báo:
- **Tiêu đề to nhất** -> Đó là `<h1>`.
- **Tiêu đề các mục con** -> Đó là `<h2>` hoặc `<h3>`.
- **Đoạn văn** -> Đó là `<p>`.
- **Hình ảnh** -> Đó là `<img>`.
- **Danh sách link** -> Đó là `<ul>` và `<li>`.

Việc chọn đúng thẻ cho đúng nội dung gọi là **Semantic HTML** (sẽ học kỹ hơn ở chương 4).

---

# 4. **TỔNG KẾT**

- Thẻ HTML có cấu trúc: `<tag>Nội dung</tag>`.
- Cấu trúc file HTML chuẩn gồm 4 phần chính: `DOCTYPE`, `html`, `head`, `body`.
- Nội dung hiển thị cho người xem phải đặt trong `<body>`.

---

**Chương tiếp theo:** Chúng ta sẽ khám phá bí mật bên trong thẻ `<head>` - nơi điều khiển cách trang web hiển thị và tương tác với công cụ tìm kiếm.
