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

## 10. ➡️ Next Lesson Bridge

*"Bootstrap cài xong, trang đã có style," Minh nói. "Nhưng làm thế nào để sắp xếp layout — 2 cột, 3 cột, sidebar bên trái?"*

*"Đó là Grid System," anh Hùng nói. "Chia màn hình thành 12 phần. Kết hợp đúng cách → bất kỳ layout nào cũng làm được, responsive tự động."*

**→ [Bài 02: Grid System](../02_grid_system/02_grid_system.md) — Hệ thống 12 cột: container, row, col và responsive breakpoints.**
