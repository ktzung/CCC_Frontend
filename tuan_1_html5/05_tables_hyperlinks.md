# 🟦 CHƯƠNG 05
# **TABLES & HYPERLINKS**

## 🎬 "Bảng Giá Sản Phẩm Đầu Tiên" — Minh làm trang e-commerce

*Linh hỏi: "Mình cần hiển thị danh sách sản phẩm dạng bảng — tên, giá, số lượng. HTML có thẻ nào không?"*

*"Có chứ! `<table>`," Minh trả lời. "Nhưng anh Hùng dặn: chỉ dùng table cho DATA tabular. Dùng table để layout trang = sai. Ngày xưa người ta làm thế, giờ dùng CSS Grid/Flexbox."*

---

## 🎯 Mục tiêu
- Tạo bảng dữ liệu với `<table>`
- Hyperlinks nâng cao
- Navigation giữa các trang

---

## 📊 Table — Bảng dữ liệu

### Cấu trúc cơ bản:

```html
<table>
    <thead>
        <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Tồn kho</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>iPhone 15</td>
            <td>25.990.000đ</td>
            <td>15</td>
        </tr>
        <tr>
            <td>MacBook Air M3</td>
            <td>32.990.000đ</td>
            <td>8</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Tổng sản phẩm</td>
            <td>23</td>
        </tr>
    </tfoot>
</table>
```

| Thẻ | Vai trò | Ghi nhớ |
|---|---|---|
| `<table>` | Container bảng | Bắt buộc |
| `<thead>` | Header | Tiêu đề cột |
| `<tbody>` | Body | Dữ liệu chính |
| `<tfoot>` | Footer | Tổng kết |
| `<tr>` | Table Row | Một hàng |
| `<th>` | Table Header Cell | Ô tiêu đề (in đậm) |
| `<td>` | Table Data Cell | Ô dữ liệu |
| `colspan="2"` | Gộp cột | Ô chiếm 2 cột |
| `rowspan="3"` | Gộp hàng | Ô chiếm 3 hàng |

> ⚠️ **Quy tắc:** `<table>` chỉ dùng cho dữ liệu dạng bảng (danh sách, so sánh, thống kê). KHÔNG dùng cho layout trang web!

---

## 🔗 Hyperlinks Nâng cao

### Các loại liên kết:

```html
<!-- External link — mở tab mới -->
<a href="https://github.com" target="_blank" rel="noopener">GitHub</a>

<!-- Internal link — cùng website -->
<a href="about.html">About</a>
<a href="products/iphone.html">iPhone</a>

<!-- Anchor link — nhảy trong trang -->
<a href="#pricing">Xem bảng giá</a>
...
<section id="pricing">
    <h2>Bảng giá</h2>
</section>

<!-- Download link -->
<a href="brochure.pdf" download>Tải brochure</a>

<!-- Email & Phone -->
<a href="mailto:minh@tlu.edu.vn">Email</a>
<a href="tel:+84912345678">Gọi ngay</a>
```

### Navigation bar:

```html
<nav>
    <ul>
        <li><a href="index.html">Trang chủ</a></li>
        <li><a href="products.html">Sản phẩm</a></li>
        <li><a href="about.html">Giới thiệu</a></li>
        <li><a href="contact.html">Liên hệ</a></li>
    </ul>
</nav>
```

> 💡 **`target="_blank"` + `rel="noopener"`** — Luôn thêm `rel="noopener"` khi mở tab mới để tránh lỗ hổng bảo mật (tai tab can access window.opener).

---

## ➡️ Chương tiếp theo...

*Minh đã có bảng sản phẩm và navigation. "Giờ mình cần thêm ảnh sản phẩm, video review, và có thể cả bản đồ Google Maps cho trang Contact."*

**Chương tiếp theo:** Graphics & Multimedia — Ảnh, SVG, Canvas, và cách nhúng media phong phú vào trang web.
