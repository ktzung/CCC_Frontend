# 🟦 TUẦN 4B - BÀI 01 (CSS FRAMEWORKS)
# **BOOTSTRAP 5 — GETTING STARTED**

---

## 0. 🎬 Opening Hook

*Minh mất 3 tiếng viết CSS cho navbar: responsive, hamburger menu, dropdown, đổi màu khi scroll. 200 dòng CSS. Test trên 5 trình duyệt — vỡ layout trên Safari.*

*Linh copy-paste 1 dòng từ Bootstrap docs:*
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
```

*Navbar responsive, hamburger menu, dropdown — tất cả hoạt động sẵn. 5 phút.*

*"Mình làm sai ở đâu?" Minh hỏi.*

*"Không sai," anh Hùng nói. "Em đang tự làm bánh mì từ trồng lúa. Bootstrap = siêu thị. Đôi khi trồng lúa là kỹ năng quan trọng — khi làm ở quy mô lớn với design riêng. Nhưng khi cần ship nhanh, siêu thị thắng."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Bootstrap là công cụ phổ biến nhất trong hồ sơ tuyển dụng Frontend:
- **Admin panels**, **dashboards**, **internal tools** → Bootstrap chiếm ưu thế tuyệt đối
- **Prototype nhanh** → validate idea trước khi đầu tư CSS riêng
- **Team không có designer** → Bootstrap cung cấp design system sẵn

Bạn vừa học CSS thuần (Tuần 2+3). Bootstrap sẽ giúp bạn áp dụng kiến thức đó **nhanh hơn 10 lần** trong dự án thực tế.

---

## 2. 🌐 Big Picture — Bootstrap là gì?

```
CSS THUẦN (Bài học Tuần 2-3)         BOOTSTRAP
─────────────────────────────        ──────────────────────────
Bạn viết từng dòng CSS               CSS đã viết sẵn → dùng class

.btn {                               <button class="btn btn-primary">
  padding: 8px 16px;
  background: #0d6efd;
  border-radius: 4px;
  ...20 dòng...
}

Kết quả: Nắm bản chất sâu            Kết quả: Ship nhanh, code ít

Dùng khi:                             Dùng khi:
- Design độc đáo theo brand           - Prototype / MVP
- Cần control tuyệt đối               - Admin panel
- Performance critical                - Team không có designer
- Học CSS fundamentals                - Deadline gấp
```

**Bootstrap không thay thế kiến thức CSS** — nó BUILD ON TOP OF CSS. Không hiểu CSS thuần → không thể debug khi Bootstrap fail.

---

## 3. ⚙️ Core Technical Truth

### Bootstrap bao gồm gì?

```
Bootstrap 5
├── CSS Framework
│   ├── Grid System      → Layout 12-column responsive
│   ├── Components       → Button, Card, Navbar, Modal, Form...
│   └── Utilities        → mt-3, text-center, d-flex...
│
├── JavaScript Plugins   → Dropdown, Modal, Tooltip...
│   (cần Bootstrap JS)
│
└── Sass Source          → Customize variables & build custom
```

### Cài đặt — 2 cách

**Cách 1: CDN (Học tập, prototype nhanh)**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap App</title>
    <!-- Bootstrap CSS — đặt trong head -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Nội dung -->

    <!-- Bootstrap JS Bundle (bao gồm Popper) — cuối body -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

> ⚠️ **`viewport` meta tag là BẮT BUỘC** khi dùng Bootstrap. Thiếu nó → Bootstrap responsive không hoạt động đúng trên mobile.

**Cách 2: npm (Production)**
```bash
npm install bootstrap@5.3.0
```
```javascript
// main.js hoặc main.scss
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

**Khi nào dùng cách nào:**

| | CDN | npm |
|---|---|---|
| **Học tập/Prototype** | ✅ Tốt nhất | ❌ Overkill |
| **Production** | ❌ Phụ thuộc network, không customize được | ✅ |
| **Cần customize** | ❌ | ✅ Qua SASS |
| **Cần tree-shaking** | ❌ | ✅ |

---

### Trang Bootstrap đầu tiên

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App — Bootstrap</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center text-primary mb-4">📝 Todo App</h1>

        <div class="card shadow">
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Thêm todo mới...">
                    <button class="btn btn-primary">Thêm</button>
                </div>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Học Bootstrap
                        <span class="badge bg-success">Hoàn thành</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Làm BTL
                        <span class="badge bg-warning text-dark">Đang làm</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

Kết quả: Giao diện đẹp, responsive sẵn — **không viết 1 dòng CSS nào**.

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Bootstrap = viết class HTML thay vì viết CSS. Class = style được định nghĩa sẵn.**
> **Viewport meta tag bắt buộc. Bootstrap JS cần cho interactive components.**

---

## 5. 🏭 Real-world Layer

### Bootstrap vs CSS thuần vs Tailwind — Khi nào chọn gì?

| Tình huống | Lựa chọn | Lý do |
|---|---|---|
| Admin panel, dashboard | Bootstrap | Components sẵn, ít code nhất |
| Design system độc đáo theo brand | CSS thuần + Custom | Bootstrap override phức tạp |
| Utility-first, high control | TailwindCSS | Atomic classes, không opinionated |
| Prototype trong 1 ngày | Bootstrap CDN | Nhanh nhất, không setup |
| React/Vue component library | Shadcn, Chakra UI | Framework-specific |

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: So sánh CSS thuần vs Bootstrap (20 phút)

**Phần 1:** Viết CSS thuần cho button này:
```
Button màu xanh (#0d6efd), chữ trắng, padding 8px 16px,
border-radius 4px, hover đổi sang #0b5ed7
```

**Phần 2:** Dùng Bootstrap để có cùng kết quả:
```html
<button class="btn btn-primary">Click me</button>
```

**Câu hỏi:**
1. Bao nhiêu dòng CSS cần viết ở Phần 1?
2. Inspect element của Bootstrap button — xem Bootstrap viết bao nhiêu CSS cho `btn btn-primary`
3. Mở DevTools → Network tab → Xem bootstrap.min.css nặng bao nhiêu KB

---

### 🪜 Step-by-Step: Tạo trang Bootstrap đầu tiên (15 phút)

**Bước 1: Tạo file HTML (2 phút)**
1. Mở VS Code → tạo thư mục `bootstrap-demo/`
2. Tạo file `index.html`
3. Gõ `!` → Tab (Emmet) để tạo HTML boilerplate

**Bước 2: Thêm Bootstrap CDN (1 phút)**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Demo</title>
    <!-- Bootstrap CSS — LUÔN đặt trong <head> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Nội dung sẽ thêm ở bước 3 -->

    <!-- Bootstrap JS — LUÔN đặt cuối <body> -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

> **💡 Tại sao CSS trong `<head>` nhưng JS cuối `<body>`?** CSS cần load trước để render đúng ngay từ đầu. JS có thể load sau vì nó xử lý tương tác — không cần thiết khi trang vừa mở.

**Bước 3: Tạo Todo App với Bootstrap (10 phút)**
```html
<body>
    <div class="container mt-5" style="max-width: 600px;">
        <h1 class="text-center text-primary mb-4">📝 Todo App</h1>

        <!-- Card chứa toàn bộ app -->
        <div class="card shadow">
            <div class="card-body">
                <!-- Input group: input + button -->
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Thêm todo mới...">
                    <button class="btn btn-primary">Thêm</button>
                </div>

                <!-- Danh sách todo -->
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Học Bootstrap
                        <span class="badge bg-success">Hoàn thành</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Làm BTL CSE391
                        <span class="badge bg-warning text-dark">Đang làm</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Ôn thi cuối kỳ
                        <span class="badge bg-danger">Chưa bắt đầu</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

**Bước 4: Test responsive (2 phút)**
1. Mở Live Server → xem trên desktop
2. F12 → Ctrl+Shift+M → chọn iPhone SE
3. Resize từ lớn đến nhỏ → layout có tự responsive không?

**Giải thích classes đã dùng:**
- `container mt-5` → max-width container + margin-top 3rem
- `text-center text-primary` → căn giữa + màu xanh Bootstrap
- `card shadow` → card component + bóng đổ nhẹ
- `input-group` → gom input + button liền nhau
- `form-control` → style input theo Bootstrap
- `list-group list-group-item` → danh sách có style sẵn
- `d-flex justify-content-between align-items-center` → flexbox: hai đầu, căn giữa dọc
- `badge bg-success` → nhãn màu xanh

---

### 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Trang trông "bình thường" (không có style) | CDN link sai hoặc mất mạng | Kiểm tra Network tab → xem bootstrap.min.css có load được không |
| Responsive không hoạt động | Thiếu `<meta name="viewport">` | Thêm viewport meta tag vào `<head>` |
| Hamburger menu không mở | Thiếu Bootstrap JS | Thêm `bootstrap.bundle.min.js` trước `</body>` |
| Classes không hoạt động | Bootstrap 4 class trên Bootstrap 5 | Kiểm tra: `ml-*` → `ms-*`, `mr-*` → `me-*` |
| Font trông lạ | CDN conflict với font khác | Kiểm tra: Bootstrap dùng hệ thống font stack |

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Dùng Bootstrap không cần biết CSS"** | Sai hoàn toàn — khi Bootstrap không đủ (custom design, override, debugging), bạn bắt buộc cần CSS. Bootstrap là tool, không phải replacement |
| **"Bootstrap 4 và Bootstrap 5 như nhau"** | Bootstrap 5 loại bỏ jQuery dependency, đổi class prefix (`ml-/mr-` → `ms-/me-`), thêm many new utilities. Code Bootstrap 4 sẽ không chạy đúng trên 5 |
| **"CDN luôn chậm hơn local"** | CDN có thể nhanh hơn vì: (1) file đã cache trên browser từ trang khác dùng cùng CDN link, (2) CDN server gần user hơn |
| **"Không cần Bootstrap JS nếu không dùng Modal"** | Sai — Navbar hamburger toggle, Dropdown cũng cần Bootstrap JS. Nếu thấy hamburger click không mở menu → thiếu Bootstrap JS |
| **"Bootstrap làm website chậm"** | Bootstrap.min.css chỉ ~30KB sau gzip. Không phải vấn đề performance lớn. Tree-shaking với npm giảm tiếp |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Bootstrap 5 khác Bootstrap 4 ở điểm gì quan trọng nhất?
2. Tại sao `<meta name="viewport" content="width=device-width, initial-scale=1.0">` là bắt buộc khi dùng Bootstrap?
3. Bootstrap JS (bootstrap.bundle.min.js) cần thiết để làm gì? Nếu không include nó thì những gì sẽ không hoạt động?

### Câu hỏi áp dụng:

4. Bạn cần xây landing page trong 1 ngày cho startup — chọn CDN hay npm? Giải thích.
5. Trang web dùng Bootstrap, navbar hamburger button xuất hiện trên mobile nhưng click vào không mở menu. Nguyên nhân có thể là gì? (Gợi ý: kiểm tra DevTools Console)

<details>
<summary>👁️ Xem đáp án</summary>

1. Bootstrap 5 loại bỏ hoàn toàn **jQuery** (Bootstrap 4 bắt buộc có jQuery). Đổi class RTL: `ml-*`/`mr-*` → `ms-*`/`me-*`. Thêm nhiều utilities mới. Navbar màu sắc có thêm `data-bs-theme`. Form classes được redesign.
2. Viewport meta tag báo browser biết **không scale thu nhỏ trang** (zoom out) trên mobile. Không có nó → browser mobile render trang như desktop rồi thu nhỏ → Bootstrap breakpoints không hoạt động đúng → responsive design fail.
3. Bootstrap JS cần cho tất cả **interactive components**: Dropdown, Modal, Collapse (Navbar hamburger), Tooltip, Popover, Toast, Carousel. Không có → click hamburger không mở menu, data-bs-toggle modal không mở popup.
4. **CDN** — Landing page trong 1 ngày = prototype/MVP. CDN nhanh hơn (không setup), không cần build tool, ít file hơn. npm khi cần production optimization hoặc custom SASS.
5. Nguyên nhân phổ biến: (1) **Thiếu Bootstrap JS** — không include `bootstrap.bundle.min.js`. (2) **`data-bs-target` sai ID** — button target `#navbarNav` nhưng collapse div có ID khác. Kiểm tra Console xem có lỗi gì không.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Bootstrap = CSS framework** — components và utilities đã style sẵn, dùng bằng class HTML
2. **CDN cho học tập/prototype** — npm cho production và customization
3. **Viewport meta tag bắt buộc** — thiếu là responsive không hoạt động
4. **Bootstrap JS bắt buộc** cho Navbar, Modal, Dropdown — không có = interactive không chạy
5. **Bootstrap không thay thế CSS** — biết CSS thuần mới debug được khi Bootstrap fail

---

## 10. 📎 Phụ lục: Bootstrap 5 Cheat Sheet

### Layout & Grid (chi tiết ở Bài 02)
```html
<div class="container">         <!-- max-width responsive -->
<div class="container-fluid">   <!-- full width -->
<div class="row g-3">           <!-- row + gutter -->
<div class="col-12 col-md-6 col-lg-4">  <!-- responsive column -->
```

### Components thường dùng (chi tiết ở Bài 03)
```html
<button class="btn btn-primary btn-lg">Button</button>
<div class="card shadow-sm"><div class="card-body">...</div></div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">...</nav>
<div class="alert alert-success alert-dismissible">...</div>
<span class="badge bg-danger rounded-pill">5</span>
```

### Utilities thường dùng (chi tiết ở Bài 04)
```html
<div class="mt-3 mb-4 p-3">       <!-- spacing -->
<div class="d-flex justify-content-between align-items-center">  <!-- flexbox -->
<div class="d-none d-md-block">    <!-- responsive display -->
<p class="text-center fw-bold fs-5 text-primary">  <!-- typography -->
<div class="rounded shadow bg-white">  <!-- decoration -->
```

### JS Components (cần Bootstrap JS)
```html
<!-- Modal: data-bs-toggle + data-bs-target -->
<button data-bs-toggle="modal" data-bs-target="#myModal">Open</button>

<!-- Dropdown: tự hoạt động với Bootstrap JS -->
<div class="dropdown">
  <button data-bs-toggle="dropdown">Menu</button>
  <ul class="dropdown-menu">...</ul>
</div>

<!-- Toast: cần JS để show -->
<script>
  const toast = new bootstrap.Toast(document.getElementById('myToast'));
  toast.show();
</script>
```

---

## 11. ♿ Accessibility (a11y) Notes

Bootstrap đã build a11y vào components sẵn, nhưng bạn cần thêm:

```html
<!-- ✅ Luôn có alt cho ảnh -->
<img src="..." alt="Mô tả chi tiết ảnh">

<!-- ✅ aria-label cho nút chỉ có icon -->
<button class="btn btn-close" aria-label="Đóng"></button>

<!-- ✅ role="alert" cho thông báo -->
<div class="alert alert-danger" role="alert">Lỗi!</div>

<!-- ✅ aria-label cho nav khi có nhiều nav -->
<nav class="navbar" aria-label="Menu chính">
<nav class="navbar" aria-label="Menu phụ">

<!-- ✅ tabindex cho custom interactive elements -->
<div class="card" tabindex="0" role="button">Click được</div>

<!-- ✅ Skip link (ẩn, hiện khi Tab) -->
<a href="#main-content" class="visually-hidden-focusable">Skip to content</a>
<main id="main-content">...</main>
```

**Kiểm tra a11y nhanh:**
1. F12 → Lighthouse tab → chọn "Accessibility" → Run
2. Chỉ dùng Tab (không dùng chuột) → xem có navigate được không
3. Bật screen reader (NVDA trên Windows) → xem đọc đúng không

---

## 12. ⚡ Performance Tips

| Tip | Mô tả | Impact |
|-----|-------|--------|
| **CDN với SRI** | Thêm `integrity` attribute để browser verify file | Bảo mật |
| **Preload CSS** | `<link rel="preload" href="bootstrap.min.css" as="style">` | Load nhanh hơn |
| **Deferred JS** | `<script src="..." defer>` hoặc đặt cuối body | Render không bị block |
| **Selective import** | Chỉ import components cần (Bài 05) | Giảm 40-60% bundle |
| **PurgeCSS** | Xóa unused CSS classes trong production | Giảm file size |
| **Lazy load images** | `loading="lazy"` trên `<img>` | Trang load nhanh hơn |

```html
<!-- CDN với SRI (Subresource Integrity) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous">

<!-- Preload quan trọng nhất -->
<link rel="preload" href="bootstrap.min.css" as="style">
<link rel="stylesheet" href="bootstrap.min.css">
```

---

## 10. ➡️ Next Lesson Bridge

*"Bootstrap cài xong, trang đã có style," Minh nói. "Nhưng làm thế nào để sắp xếp layout — 2 cột, 3 cột, sidebar bên trái?"*

*"Đó là Grid System," anh Hùng nói. "Chia màn hình thành 12 phần. Kết hợp đúng cách → bất kỳ layout nào cũng làm được, responsive tự động."*

**→ [Bài 02: Grid System](../02_grid_system/02_grid_system.md) — Hệ thống 12 cột: container, row, col và responsive breakpoints.**
