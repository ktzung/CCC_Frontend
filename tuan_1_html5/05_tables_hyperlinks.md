# 🟦 TUẦN 1 - BÀI 05
# **TABLES & HYPERLINKS**

---

## 0. 🎬 Opening Hook

*Linh build trang quản lý sản phẩm. Cô dùng `<div>` để tạo bảng giá: mỗi dòng là một `<div>`, các cột là `<div>` con.*

*Anh Hùng nhìn code: "Kết quả OK, nhưng nếu user sort column, resize cột, hay dùng screen reader đọc bảng — sẽ lỗi hết. HTML có `<table>` chính xác cho dữ liệu bảng. Và bảng không phải dùng để layout."*

*Một thứ đúng cách, một thứ bị abuse — biết phân biệt là dấu hiệu của developer có kinh nghiệm.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**Tables** — dùng đúng thì là công cụ mạnh (dữ liệu tabular, so sánh, thống kê). Dùng sai (để layout trang) là anti-pattern từ năm 2005 mà nhiều người vẫn mắc.

**Hyperlinks** — nền tảng của mọi navigation: multi-page website, single-page anchor, download, email, phone, external links với bảo mật đúng cách.

---

## 2. 🌐 Big Picture — Hai cấu trúc kết nối

```
Tables → Kết nối dữ liệu          Hyperlinks → Kết nối trang
┌────────────────────┐             ┌──────────────────────────┐
│ thead              │             │ External: href="https://"│
│ ├── th (header)    │             │ Internal: href="page.html"│
│ tbody              │             │ Anchor:   href="#section" │
│ ├── tr (row)       │             │ Download: download attr   │
│ │   ├── td (cell)  │             │ Email:    href="mailto:"  │
│ tfoot              │             │ Phone:    href="tel:"     │
└────────────────────┘             └──────────────────────────┘
```

---

## 3. ⚙️ Core Technical Truth

### `<table>` — Cấu trúc đầy đủ

```html
<table>
    <!-- Header: tiêu đề các cột -->
    <thead>
        <tr>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Tồn kho</th>
            <th scope="col">Trạng thái</th>
        </tr>
    </thead>

    <!-- Body: dữ liệu chính -->
    <tbody>
        <tr>
            <td>iPhone 15 Pro Max 256GB</td>
            <td>25.990.000đ</td>
            <td>15</td>
            <td><mark>Còn hàng</mark></td>
        </tr>
        <tr>
            <td>MacBook Air M3 8GB</td>
            <td>32.990.000đ</td>
            <td>0</td>
            <td><del>Hết hàng</del></td>
        </tr>
    </tbody>

    <!-- Footer: tổng kết -->
    <tfoot>
        <tr>
            <td colspan="2">Tổng sản phẩm còn hàng</td>
            <td>15</td>
            <td></td>
        </tr>
    </tfoot>
</table>
```

---

### Bảng giải thích từng thẻ

| Thẻ | Vai trò | Ghi nhớ |
|---|---|---|
| `<table>` | Container bảng | Bao bọc tất cả |
| `<thead>` | Header section | Tiêu đề cột — browser in đậm |
| `<tbody>` | Data section | Dữ liệu chính |
| `<tfoot>` | Footer section | Tổng kết, sum |
| `<tr>` | Table Row | Một **hàng** |
| `<th>` | Table Header cell | Ô **tiêu đề** — in đậm, centered |
| `<td>` | Table Data cell | Ô **dữ liệu** |
| `colspan="N"` | Gộp N cột | Ô chiếm N cột ngang |
| `rowspan="N"` | Gộp N hàng | Ô chiếm N hàng dọc |

---

### Gộp ô với `colspan` và `rowspan`

```html
<table>
    <thead>
        <tr>
            <th rowspan="2">Sản phẩm</th>       <!-- Ô này chiếm 2 hàng dọc -->
            <th colspan="2">Kho hàng</th>        <!-- Ô này chiếm 2 cột ngang -->
        </tr>
        <tr>
            <th>Hà Nội</th>
            <th>HCM</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>iPhone 15</td>
            <td>10</td>
            <td>25</td>
        </tr>
    </tbody>
</table>
```

---

### Hyperlinks — Tất cả các dạng

```html
<!-- External link — mở tab mới (LUÔN thêm rel="noopener") -->
<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>

<!-- Internal link — cùng thư mục -->
<a href="about.html">Về chúng tôi</a>

<!-- Internal link — thư mục con -->
<a href="products/iphone.html">iPhone</a>

<!-- Anchor link — nhảy đến section trong cùng trang -->
<a href="#pricing">Xem bảng giá</a>
...
<section id="pricing">
    <h2>Bảng giá</h2>
</section>

<!-- Download link -->
<a href="brochure.pdf" download="catalog-2026.pdf">Tải catalogue</a>

<!-- Email -->
<a href="mailto:minh@tlu.edu.vn?subject=Liên hệ từ website">Gửi email</a>

<!-- Phone (hoạt động trên mobile) -->
<a href="tel:+84912345678">Gọi ngay: 0912 345 678</a>
```

---

### Navigation bar — Chuẩn semantic

```html
<nav aria-label="Menu chính">
    <ul>
        <li><a href="index.html">Trang chủ</a></li>
        <li><a href="products.html">Sản phẩm</a></li>
        <li><a href="about.html">Giới thiệu</a></li>
        <li><a href="contact.html">Liên hệ</a></li>
    </ul>
</nav>
```

> 💡 **`aria-label`** trên `<nav>` giúp screen reader phân biệt khi có nhiều nav (menu chính + breadcrumb + footer nav).

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Table chỉ cho dữ liệu tabular — không bao giờ dùng để layout.**
> **External link = luôn thêm `target="_blank" rel="noopener noreferrer"`.**

---

## 5. 🏭 Real-world Layer

### Tại sao `rel="noopener noreferrer"` quan trọng?

```html
<!-- ❌ Không an toàn -->
<a href="https://evil-site.com" target="_blank">Link</a>

<!-- ✅ An toàn -->
<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
```

**Vấn đề bảo mật:** Khi `target="_blank"` không có `rel="noopener"`, trang được mở có thể truy cập `window.opener` (trang gốc của bạn) và redirect nó đến trang độc hại.

`rel="noopener"` = ngăn truy cập `window.opener`
`rel="noreferrer"` = không gửi Referrer header (bảo vệ privacy thêm)

### Bảng so sánh dùng ở đâu trong thực tế

| Use case | Đúng | Sai |
|---|---|---|
| Danh sách sản phẩm + giá + số lượng | `<table>` ✅ | `<div>` dạng giả bảng |
| So sánh tính năng (pricing page) | `<table>` ✅ | CSS Grid pretending to be table |
| Layout trang 2 cột | CSS Grid/Flexbox ✅ | `<table>` ❌ |
| Navigation menu | `<nav><ul><li><a>` ✅ | `<table>` ❌ |

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Trang quản lý sản phẩm (20 phút)

Tạo file `inventory.html` với cấu trúc sau:

**Yêu cầu:**

1. **Navigation bar** (`<nav>`) có 4 links: Trang chủ, Sản phẩm, Đơn hàng, Báo cáo

2. **Bảng sản phẩm** (`<table>`) với:
   - `<thead>`: STT | Tên sản phẩm | Giá | Tồn kho | Trạng thái
   - `<tbody>`: Ít nhất 3 sản phẩm thật (tự chọn)
   - `<tfoot>`: Hàng "Tổng" với `colspan` cho 2 cột đầu

3. Một sản phẩm phải dùng `<del>` cho giá cũ và `<ins>` cho giá mới

4. Link "Xem chi tiết" trong mỗi hàng → dẫn đến `product.html` (file bài 04)

**Bonus:** Thêm cột "Website nhà sản xuất" với external link `target="_blank" rel="noopener noreferrer"`

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Dùng `<table>` để chia layout 2 cột"** | Anti-pattern từ HTML 4. Dùng **CSS Grid hoặc Flexbox** — `<table>` chỉ cho tabular data |
| **"`<th>` và `<td>` như nhau, chỉ khác font"** | `<th>` có semantic meaning — screen reader đọc nó như tiêu đề cột, không phải data |
| **"`target='_blank'` luôn cần thiết"** | Chỉ dùng khi có lý do rõ ràng (external site, PDF, link mà user không muốn rời trang). **Internal links không cần `_blank`** |
| **"Anchor link `href='#'` không sao"** | `href="#"` scroll về đầu trang — hành vi bất ngờ cho user. Dùng `href="#section-id"` cụ thể hoặc dùng `<button>` nếu là action |
| **"Email link không cần `mailto:`"** | Cần phải có `href="mailto:email@domain.com"`. Thiếu → link đến một trang tên "email@domain.com" → 404 |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `<thead>`, `<tbody>`, `<tfoot>` — ba phần này có bắt buộc không? Lợi ích kỹ thuật của việc dùng chúng là gì?
2. Tại sao `target="_blank"` cần đi kèm `rel="noopener noreferrer"`?
3. Khi nào dùng `colspan`, khi nào dùng `rowspan`? Cho ví dụ trực quan.

### Câu hỏi áp dụng:

4. Bạn muốn tạo bảng so sánh 3 gói dịch vụ (Basic, Pro, Enterprise) với 5 tính năng. Có bao nhiêu `<tr>` và bao nhiêu `<th>` cần viết?
5. Link "Tải tài liệu" dẫn đến file PDF. Người dùng mong đợi file tự download, không mở trong trình duyệt. Bạn cần thêm attribute gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Không bắt buộc** kỹ thuật — bảng vẫn render được. Nhưng lợi ích: browser có thể render `<tfoot>` kể cả khi `<tbody>` chưa load xong (useful cho bảng lớn). Screen reader hiểu cấu trúc đúng hơn. CSS có thể target từng phần riêng (`thead { background: gray }`).
2. Không có `rel="noopener"` → trang mới có thể truy cập `window.opener` (trang gốc) và redirect nó → **tabnabbing attack** — loại tấn công phishing phổ biến.
3. **`colspan`** = ô chiếm N cột **ngang** (ví dụ: header "Kho hàng" trải qua "HN" + "HCM"). **`rowspan`** = ô chiếm N hàng **dọc** (ví dụ: "Tên sản phẩm" trải qua 2 hàng khi bảng có sub-header).
4. **Header row**: 1 `<tr>` với 4 `<th>` (Feature | Basic | Pro | Enterprise). **Data rows**: 5 `<tr>`, mỗi `<tr>` có 1 `<th scope="row">` (tên tính năng) + 3 `<td>`. Tổng: **6 `<tr>`**, **9 `<th>`**.
5. Thêm attribute **`download`**: `<a href="doc.pdf" download="document-2026.pdf">Tải tài liệu</a>`. `download` attribute chỉ browser download file thay vì mở.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<table>` chỉ cho tabular data** — dữ liệu có hàng và cột có ý nghĩa. KHÔNG layout trang
2. **`<thead>/<tbody>/<tfoot>`** — phân chia semantic giúp screen reader và CSS target đúng
3. **External links** phải có `target="_blank" rel="noopener noreferrer"` — bảo mật bắt buộc
4. **Anchor links** dùng `#id` cụ thể — tránh `href="#"` scroll về đầu trang bất ngờ
5. **`download` attribute** = link download, không mở — dùng cho PDF, ZIP, CSV

---

## 10. ➡️ Next Lesson Bridge

*Trang inventory có bảng sản phẩm và navigation. Nhưng Minh nhận xét:*

*"Mình cần thêm ảnh sản phẩm. Và video review. Và có thể embed Google Maps cho trang liên hệ."*

**→ [Bài 06: Graphics & Multimedia](./06_graphics_multimedia.md) — Ảnh responsive, SVG, video, audio: đưa trang web thành sống động.**
