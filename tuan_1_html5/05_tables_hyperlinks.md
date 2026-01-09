# 🟦 CHƯƠNG 05
# **TABLES AND HYPERLINKS**

Hai thành phần cơ bản nhưng cực kỳ quan trọng của web: **Bảng** (để hiển thị dữ liệu structured) và **Liên kết** (cách chúng ta "lướt" web).

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Tạo bảng dữ liệu phức tạp với việc gộp cột (`colspan`) và gộp hàng (`rowspan`).
- Hiểu cấu trúc semantic của bảng: `thead`, `tbody`, `tfoot`.
- Tạo liên kết (`<a>`) đến trang khác, file download, email, hoặc vị trí trong cùng trang.

---

# 1. **STRUCTURING DATA IN A TABLE (BẢNG DỮ LIỆU)**

> [!WARNING]
> **Lưu ý:** Ngày xưa người ta dùng Table để chia bố cục trang web (3 cột, header, footer...). **TUYỆT ĐỐI KHÔNG** làm vậy nữa. Hãy dùng Table chỉ để hiển thị dữ liệu dạng bảng (danh sách điểm, hóa đơn, lịch học).

## 1.1. Cấu trúc cơ bản
- `<table>`: Thẻ bao ngoài.
- `<tr>` (Table Row): Dòng.
- `<th>` (Table Header): Ô tiêu đề (in đậm, căn giữa).
- `<td>` (Table Data): Ô dữ liệu thường.

```html
<table border="1">
  <tr>
    <th>Họ tên</th>
    <th>Tuổi</th>
  </tr>
  <tr>
    <td>Nguyễn Văn A</td>
    <td>20</td>
  </tr>
</table>
```

## 1.2. Nhóm ngữ nghĩa (Grouping)
Để bảng rõ ràng hơn cho máy đọc, ta chia làm 3 phần:
- `<thead>`: Phần đầu bảng (chứa tiêu đề cột).
- `<tbody>`: Phần thân bảng (chứa dữ liệu).
- `<tfoot>`: Phần chân bảng (chứa tổng kết).

## 1.3. Gộp ô (Merging Cells)
- **`colspan="n"`**: Gộp n cột thành 1.
- **`rowspan="n"`**: Gộp n dòng thành 1.

**Ví dụ bảng hóa đơn:**

```html
<table border="1">
    <thead>
        <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>iPhone 15</td>
            <td>1</td>
            <td>$1000</td>
        </tr>
        <tr>
            <td>Ốp lưng</td>
            <td>2</td>
            <td>$20</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Tổng cộng</td> <!-- Gộp 2 ô đầu -->
            <td>$1040</td>
        </tr>
    </tfoot>
</table>
```

---

# 2. **ELECTRONIC REFERENCES (HYPERLINKS) USING `<a>`**

Thẻ `<a>` (Anchor) là "cánh cửa thần kỳ" của Doremon, giúp bạn nhảy từ nơi này sang nơi khác.

## 2.1. Cú pháp cơ bản
```html
<a href="URL đích">Nội dung hiển thị</a>
```

## 2.2. Các loại liên kết

### a. Liên kết tuyệt đối (Absolute Links)
Đến một website khác hoàn toàn.
```html
<a href="https://google.com">Đến Google</a>
```

### b. Liên kết tương đối (Relative Links)
Đến một trang khác trong cùng website của bạn.
```html
<a href="contact.html">Liên hệ</a>
<a href="../products/shoes.html">Giày</a>
```

### c. Liên kết trong trang (Anchor Links/Bookmarks)
Nhảy đến một vị trí cụ thể trong cùng trang (ví dụ nút "Về đầu trang").

1.  Đặt **ID** cho đích đến: `<h2 id="section1">Chương 1</h2>`
2.  Tạo link với dấu **#**: `<a href="#section1">Xem Chương 1</a>`

### d. Liên kết đặc biệt (Special Links)
- **Email:** Mở phần mềm gửi mail.
  ` <a href="mailto:admin@example.com">Gửi mail cho tôi</a>`
- **Điện thoại:** Gọi điện trên mobile.
  ` <a href="tel:+84988888888">Gọi hotline</a>`

## 2.3. Attributes quan trọng
- **`target="_blank"`**: Mở link trong tab mới (giữ chân người dùng ở lại trang cũ).
- **`title="Mô tả"`**: Hiện tooltip khi di chuột vào link.

```html
<a href="https://facebook.com" target="_blank" title="Ghé thăm Fanpage">Facebook</a>
```

---

# 3. **TỔNG KẾT**

- Dùng `<table>` với `thead`, `tbody`, `tfoot` để trình bày dữ liệu.
- Dùng `colspan` và `rowspan` để tạo bảng phức tạp.
- Thẻ `<a>` là cơ chế liên kết của web. Chú ý đường dẫn tương đối và tuyệt đối.
- Dùng `target="_blank"` khi trỏ ra website ngoài.

---

**Chương tiếp theo:** Làm cho trang web sống động với Hình ảnh và Video.
