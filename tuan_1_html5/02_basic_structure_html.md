# 🟦 CHƯƠNG 02
# **CẤU TRÚC CƠ BẢN HTML**

## 🎬 "Dòng Code Đầu Tiên" — Minh viết `<!DOCTYPE html>`

*Minh mở VS Code. Tạo file `index.html`. Con trỏ chuột nhấp nháy trên dòng trắng.*

*"Bắt đầu từ đâu nhỉ?"*

*Anh Hùng: "Gõ `!` rồi nhấn Tab."*

*Minh làm theo. VS Code auto-generate:*

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

*"Ồ! Có sẵn template!" Minh hào hứng.*

*"Đó là bộ xương," anh Hùng giải thích. "Mọi trang web trên thế giới — Facebook, Google, Shopee — đều bắt đầu từ bộ xương này."*

---

## 🎯 Mục tiêu
Sau chương này, bạn sẽ:
- Hiểu cấu trúc cơ bản của file HTML
- Phân biệt `<head>` và `<body>`
- Viết được trang HTML đầu tiên
- Sử dụng các thẻ HTML cơ bản nhất

---

## 🏗️ Bộ Xương HTML — Giống xây nhà

```
<!DOCTYPE html>          ← "Giấy phép xây dựng" (báo browser: đây là HTML5)
<html lang="vi">         ← "Ngôi nhà" (bao bọc tất cả)
├── <head>               ← "Bộ não" (thông tin ẩn - SEO, CSS, meta)
│   ├── <meta charset>   ← "Ngôn ngữ" (UTF-8 để hiện tiếng Việt)
│   ├── <title>          ← "Biển tên nhà" (hiện trên tab browser)
│   └── <link>           ← "Hợp đồng trang trí" (liên kết CSS)
└── <body>               ← "Nội thất" (mọi thứ người dùng THẤY)
    ├── <header>         ← "Sảnh đón" (logo, menu)
    ├── <main>           ← "Phòng chính" (nội dung chính)
    └── <footer>         ← "Tầng hầm" (copyright, liên hệ)
```

### Quy tắc vàng:
- `<head>` = Thứ **browser đọc** (user không thấy trực tiếp)
- `<body>` = Thứ **user thấy** (nội dung trang web)

---

## 📝 Các thẻ cơ bản trong `<body>`

### Headings — Tiêu đề (6 cấp)
```html
<h1>Trang chủ Todo App</h1>        <!-- H1: Tiêu đề chính — MỖI TRANG CHỈ 1 CÁI -->
<h2>Danh sách công việc</h2>       <!-- H2: Tiêu đề phụ -->
<h3>Hôm nay</h3>                   <!-- H3-H6: Chi tiết hơn -->
```

> ⚠️ **SEO Rule:** Mỗi trang chỉ 1 `<h1>`. Google đọc H1 để hiểu trang về gì.

### Paragraphs & Text
```html
<p>Đây là đoạn văn. Mỗi <p> tự xuống dòng.</p>
<strong>In đậm</strong> — Nhấn mạnh ngữ nghĩa (SEO đọc)
<em>In nghiêng</em> — Nhấn mạnh
<br> — Xuống dòng (không cần đóng thẻ)
```

### Links — Siêu liên kết
```html
<a href="https://google.com">Đến Google</a>
<a href="about.html">Trang About</a>          <!-- Link nội bộ -->
<a href="#section2">Nhảy đến Section 2</a>    <!-- Link trong trang -->
<a href="mailto:minh@email.com">Email tôi</a>
```

### Images
```html
<img src="avatar.jpg" alt="Ảnh Minh" width="200">
<!-- alt = mô tả ảnh (SEO + accessibility) -->
```

### Lists
```html
<!-- Danh sách không thứ tự -->
<ul>
    <li>Học HTML</li>
    <li>Học CSS</li>
    <li>Học JavaScript</li>
</ul>

<!-- Danh sách có thứ tự -->
<ol>
    <li>Mở VS Code</li>
    <li>Tạo file index.html</li>
    <li>Gõ ! → Tab</li>
</ol>
```

### Div & Span — Container
```html
<div>Block container — chiếm cả dòng</div>
<span>Inline container — chỉ chiếm nội dung</span>
```

---

## 🎯 Thực hành: Trang đầu tiên của Minh

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App - Minh | CSE391</title>
</head>
<body>
    <header>
        <h1>📝 Todo App</h1>
        <p>Ứng dụng quản lý công việc - BTL CSE391</p>
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

---

## ➡️ Chương tiếp theo...

*"Trang chạy rồi," Minh nói. "Nhưng sao xấu quá? Text thẳng đuồn, không có màu, không layout..."*

*"Đó là vì em chưa có CSS," anh Hùng cười. "HTML chỉ là xương. CSS mới là da thịt."*

**Chương tiếp theo:** Tìm hiểu sâu hơn về `<head>` — metadata, SEO, và những thứ "vô hình" nhưng cực kỳ quan trọng.
