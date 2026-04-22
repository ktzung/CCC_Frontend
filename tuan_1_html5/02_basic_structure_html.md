# 🟦 TUẦN 1 - BÀI 02
# **CẤU TRÚC CƠ BẢN HTML**

---

## 0. 🎬 Opening Hook

*Minh mở VS Code. Tạo file `index.html`. Con trỏ chuột nhấp nháy trên dòng trắng.*

*"Bắt đầu từ đâu nhỉ?"*

*"Gõ `!` rồi nhấn Tab," anh Hùng nói.*

*Minh làm theo. VS Code auto-generate 8 dòng code. Minh nhìn và hỏi: "Những thứ này có nghĩa gì? Nếu xóa đi có sao không?"*

*Câu trả lời: **có sao**. Mỗi dòng đều có lý do tồn tại.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Boilerplate HTML (template mặc định) không phải copy-paste vô nghĩa. Mỗi dòng là:
- **Khai báo chuẩn** để browser hiểu đúng
- **Metadata** để Google index đúng
- **Quy ước** toàn ngành web đang dùng

Developer không hiểu template của mình = xây nhà không biết nền móng làm từ gì.

---

## 2. 🌐 Big Picture — Bức tranh tổng thể

Một file HTML hoàn chỉnh có **hai phần tách biệt hoàn toàn**:

```
<!DOCTYPE html>      ← Khai báo phiên bản (ngoài cả hai phần)
<html lang="vi">     ← Bao bọc tất cả
│
├── <head>           ← PHẦN NÃO: Thông tin browser đọc (user không thấy)
│   ├── charset      ← Bảng mã ký tự
│   ├── viewport     ← Cách hiển thị trên mobile
│   ├── title        ← Tiêu đề tab + Google
│   └── link CSS     ← Liên kết stylesheet
│
└── <body>           ← PHẦN THÂN: Nội dung người dùng thấy
    ├── <header>     ← Logo, navigation
    ├── <main>       ← Nội dung chính
    └── <footer>     ← Copyright, liên hệ
```

**Quy tắc vàng:** `<head>` = browser đọc | `<body>` = user thấy

---

## 3. ⚙️ Core Technical Truth — Từng dòng có nghĩa gì?

```html
<!DOCTYPE html>
```
**Không phải thẻ HTML.** Đây là khai báo kiểu tài liệu — báo browser: "Hãy parse file này theo chuẩn HTML5." Nếu thiếu → browser dùng "Quirks Mode" → render trang theo chuẩn cũ → layout lệch.

---

```html
<html lang="vi">
```
- `lang="vi"` — báo browser và screen reader ngôn ngữ của trang
- Giúp trình đọc màn hình (screen reader) phát âm đúng
- Google dùng để phân loại ngôn ngữ cho tìm kiếm

---

```html
<meta charset="UTF-8">
```
- **UTF-8** là bảng mã hỗ trợ hầu hết ký tự trên thế giới, bao gồm tiếng Việt
- Thiếu dòng này → tiếng Việt hiển thị thành ký tự lạ: `"Xin chÃ o"` thay vì `"Xin chào"`
- **Luôn phải là dòng đầu tiên** trong `<head>`

---

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- Kiểm soát cách trang hiển thị trên thiết bị di động
- `width=device-width` → chiều rộng trang = chiều rộng màn hình thiết bị
- `initial-scale=1.0` → không tự động zoom
- **Thiếu dòng này** → trang web thu nhỏ trên mobile, người dùng phải zoom tay

---

```html
<title>Tên trang | Thương hiệu</title>
```
- Hiển thị trên **tab browser** và **kết quả tìm kiếm Google**
- SEO best practice: 50–60 ký tự, chứa từ khóa chính
- Mỗi trang phải có title KHÁC NHAU

---

### Các thẻ cơ bản trong `<body>`

**Headings — Tiêu đề (6 cấp):**
```html
<h1>Tiêu đề chính của trang</h1>   <!-- MỖI TRANG CHỈ 1 CÁI — SEO rule -->
<h2>Tiêu đề phụ</h2>
<h3>Tiêu đề cấp 3</h3>
<!-- h4, h5, h6 — hiếm dùng -->
```

> ⚠️ **SEO Rule cứng:** Mỗi trang chỉ được có **1 thẻ `<h1>`**. Google dùng H1 để hiểu trang về chủ đề gì.

**Text cơ bản:**
```html
<p>Đây là đoạn văn. Mỗi <p> tự xuống dòng mới.</p>
<strong>In đậm — nhấn mạnh ngữ nghĩa</strong>  <!-- khác <b> chỉ đậm về hình thức -->
<em>In nghiêng — nhấn mạnh</em>               <!-- khác <i> chỉ nghiêng về hình thức -->
<br>  <!-- Xuống dòng — không có thẻ đóng -->
```

**Lists:**
```html
<!-- Danh sách không có thứ tự -->
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

<!-- Danh sách có thứ tự -->
<ol>
    <li>Mở VS Code</li>
    <li>Tạo file index.html</li>
    <li>Gõ ! → Tab</li>
</ol>
```

**Container:**
```html
<div>Block container — chiếm cả dòng, dùng để gom nhóm</div>
<span>Inline container — chỉ chiếm nội dung, dùng để style một phần text</span>
```

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **`<head>` = những gì browser và Google đọc. `<body>` = những gì người dùng thấy.**

---

## 5. 🏭 Real-world Layer — Trang HTML đầu tiên hoàn chỉnh

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App - Quản lý công việc | Nhóm Minh CSE391</title>
</head>
<body>
    <header>
        <h1>📝 Todo App</h1>
        <p>Ứng dụng quản lý công việc — BTL CSE391</p>
    </header>

    <main>
        <h2>Công việc hôm nay</h2>
        <ul>
            <li>Học HTML cơ bản</li>
            <li>Làm bài tập CSS</li>
            <li>Push code lên GitHub</li>
        </ul>

        <h2>Liên hệ nhóm</h2>
        <p>Nhóm trưởng: <strong>Nguyễn Văn Minh</strong></p>
        <p>Email: <a href="mailto:minh@tlu.edu.vn">minh@tlu.edu.vn</a></p>
    </main>

    <footer>
        <p>&copy; 2026 - Nhóm BTL CSE391</p>
    </footer>
</body>
</html>
```

*Minh mở Live Server → Trang hiện ra trên Chrome. Text đen trên nền trắng. Xấu — nhưng là trang web THẬT ĐẦU TIÊN của anh.* ✨

**Trong thực tế production:** còn thêm `<meta description>`, Open Graph tags, favicon, và link đến file CSS riêng — sẽ học ở bài tiếp theo.

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Xây Todo App HTML structure (15 phút)

1. Mở VS Code → New File → lưu tên `todo.html`
2. Gõ `!` → nhấn **Tab** (Emmet shortcut)
3. Sửa lại:
   - `lang="en"` → `lang="vi"`
   - `<title>Document</title>` → title mô tả app của bạn (50–60 ký tự)
4. Trong `<body>`, thêm cấu trúc sau:
   - `<header>` với `<h1>` là tên app
   - `<main>` với `<h2>` "Danh sách việc cần làm" và `<ul>` có 5 `<li>` việc thật của bạn hôm nay
   - `<footer>` với tên bạn và năm học

5. Mở với **Live Server** → xem kết quả

**Câu hỏi thực nghiệm:**
- Thử xóa `<!DOCTYPE html>` → refresh → trang có thay đổi không? (Chrome thường không thấy, nhưng thử IE Mode)
- Thử xóa `<meta charset="UTF-8">` → thêm một ký tự đặc biệt như `ä` hoặc `ñ` → refresh → kết quả?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`<!DOCTYPE html>` là thẻ HTML"** | Không — đây là **declaration**, không phải thẻ. Không có thẻ đóng, không thuộc namespace HTML |
| **"Không cần `<meta charset>` vì VS Code lưu UTF-8 rồi"** | VS Code lưu file UTF-8 nhưng browser cần được **nói rõ** để biết mà decode đúng |
| **"Có thể có nhiều `<h1>` trong một trang"** | Kỹ thuật có thể, nhưng Google chỉ coi trọng H1 đầu tiên và nhiều H1 làm loãng SEO |
| **"`<strong>` và `<b>` giống nhau"** | `<b>` chỉ in đậm về **hình thức**. `<strong>` có **semantic meaning** — báo screen reader và Google đây là nội dung quan trọng |
| **"Có thể đặt `<script>` ở bất cứ đâu"** | Nên đặt `<script>` cuối `<body>` (hoặc dùng `defer`) — tránh block rendering khi page load |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `<!DOCTYPE html>` dùng để làm gì? Điều gì xảy ra nếu bỏ nó đi?
2. Tại sao `<meta charset="UTF-8">` phải là dòng **đầu tiên** trong `<head>`?
3. Sự khác biệt giữa `<strong>` và `<b>` là gì? Nên dùng cái nào?

### Câu hỏi áp dụng:

4. Bạn xây trang Portfolio. Phần nào thuộc `<head>`, phần nào thuộc `<body>`?
   - Tên bạn, avatar, danh sách dự án — thuộc phần nào?
   - Title, description, link CSS — thuộc phần nào?
5. Bạn muốn tạo danh sách "Các bước nấu phở" theo thứ tự. Dùng `<ul>` hay `<ol>`? Tại sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. `<!DOCTYPE html>` báo browser: "Parse file này theo chuẩn HTML5". Nếu thiếu → browser dùng **Quirks Mode** (render theo chuẩn HTML cũ, từ năm 2000) → layout và CSS có thể bị sai.
2. Vì browser đọc file từ trên xuống — nếu gặp ký tự đặc biệt **trước khi biết charset** → decode sai → ký tự lỗi. Charset phải khai báo đầu tiên để decode đúng mọi thứ sau đó.
3. `<b>` chỉ in đậm về **hình thức**. `<strong>` có ý nghĩa ngữ nghĩa: "nội dung này quan trọng" — screen reader sẽ nhấn mạnh khi đọc to, Google cũng coi trọng hơn. Nên dùng **`<strong>`**.
4. **`<head>`**: title, description, link CSS. **`<body>`**: tên, avatar, danh sách dự án — vì đây là nội dung người dùng thấy.
5. **`<ol>`** — vì "các bước nấu phở" có **thứ tự quan trọng** (bước 1 phải làm trước bước 2). `<ul>` dùng khi thứ tự không quan trọng.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<!DOCTYPE html>`** — không phải thẻ, là declaration báo HTML5 standard
2. **`<head>` vs `<body>`** — head cho browser/Google, body cho người dùng
3. **`<meta charset="UTF-8">`** — luôn phải có, luôn phải là dòng đầu tiên trong head
4. **Chỉ 1 `<h1>` per page** — SEO rule bắt buộc
5. **`<strong>` > `<b>`**, **`<em>` > `<i>`** — semantic có nghĩa, display thì không

---

## 10. ➡️ Next Lesson Bridge

*"Trang chạy rồi," Minh nói. "Nhưng sao xấu quá? Text thẳng đuồn, không có màu, không layout..."*

*"HTML chỉ là cấu trúc," anh Hùng giải thích. "Phần quan trọng tiếp theo là `<head>` — metadata, SEO, và những thứ 'vô hình' nhưng quyết định trang web của bạn có được Google tìm thấy không."*

**→ [Bài 03: Head Data](./03_head_data_html.md) — `<title>`, `<meta>`, Open Graph: Cách Google và mạng xã hội đọc trang web của bạn.**
