# 🟦 TUẦN 4B - BÀI 03 (CSS FRAMEWORKS)
# **BOOTSTRAP 5 — COMPONENTS**

---

## 0. 🎬 Opening Hook

*Minh nhìn danh sách yêu cầu BTL: Navbar responsive với dropdown, product cards, form đăng nhập, modal xác nhận xóa, alert thành công/thất bại, pagination.*

*"6 UI components. CSS thuần = 2000+ dòng, 3 ngày. Bootstrap = copy 6 đoạn code từ docs, customize màu, 2 tiếng."*

*Chị Hà: "Bootstrap giống IKEA. Đồ đã thiết kế, đã test độ bền, em chỉ cần lắp và sơn màu brand. Không ai phạt em vì không đục gỗ từ đầu."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Components là lý do chính để học Bootstrap. Mỗi component đã được:
- **Test cross-browser** — không lo vỡ trên Safari hay Firefox
- **Accessibility (a11y)** — keyboard navigation, screen reader support
- **Responsive** — tự động điều chỉnh theo màn hình
- **Interactive** — animation, state, event handling

Dùng sai class = component không chạy đúng. Bài này là map để dùng đúng.

---

## 2. 🌐 Big Picture — Components Map

```
BOOTSTRAP COMPONENTS
│
├── CONTENT DISPLAY
│   ├── Card          → Hiển thị nội dung (sản phẩm, bài viết, profile)
│   ├── Badge         → Số lượng, trạng thái, label
│   └── Alert         → Thông báo success/error/warning
│
├── NAVIGATION
│   ├── Navbar        → Thanh điều hướng (responsive sẵn)
│   ├── Breadcrumb    → Đường dẫn vị trí
│   ├── Pagination    → Phân trang
│   └── Tabs/Pills    → Tab navigation
│
├── FORMS & INPUT
│   ├── Buttons       → Actions
│   ├── Forms         → Input, select, textarea, checkbox, radio
│   └── Input Group   → Input + icon/button
│
└── OVERLAYS (cần Bootstrap JS)
    ├── Modal         → Popup dialog
    ├── Dropdown      → Menu thả xuống
    ├── Tooltip       → Hint khi hover
    └── Toast         → Notification popup
```

---

## 3. ⚙️ Core Technical Truth

### Buttons — Component được dùng nhiều nhất

```html
<!-- Variants: 8 màu cơ bản -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>

<!-- Outline variants (nhẹ nhàng hơn) -->
<button class="btn btn-outline-primary">Outline Primary</button>

<!-- Sizes -->
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-sm">Small</button>

<!-- States -->
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary w-100">Full width</button>

<!-- Kết hợp -->
<button class="btn btn-danger btn-sm">
    <span class="spinner-border spinner-border-sm me-1"></span>
    Đang xóa...
</button>
```

**Quy ước UX:**
- `btn-primary` → action chính (Submit, Lưu, Mua ngay)
- `btn-secondary` → action phụ (Cancel, Back)
- `btn-success` → confirm/approve (Xác nhận, Duyệt)
- `btn-danger` → destructive action (Xóa, Hủy đơn)
- `btn-outline-*` → khi nhiều button cùng hàng, giảm visual noise

---

### Cards — Hiển thị nội dung có cấu trúc

```html
<!-- Card cơ bản -->
<div class="card">
    <div class="card-body">
        <h5 class="card-title">Tiêu đề</h5>
        <p class="card-text">Nội dung mô tả ngắn gọn.</p>
        <a href="#" class="btn btn-primary">Xem thêm</a>
    </div>
</div>

<!-- Card với ảnh, header, footer -->
<div class="card h-100 shadow-sm">
    <img src="product.jpg" class="card-img-top" alt="Product" style="height: 200px; object-fit: cover;">
    <div class="card-header text-muted small">
        📦 Còn 5 sản phẩm
    </div>
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">iPhone 15 Pro</h5>
        <p class="card-text text-muted">Chip A17 Pro, camera 48MP, Dynamic Island.</p>
        <div class="mt-auto">  <!-- mt-auto đẩy xuống đáy card -->
            <p class="fw-bold text-danger h5">25.990.000đ</p>
            <button class="btn btn-primary w-100">Thêm vào giỏ</button>
        </div>
    </div>
    <div class="card-footer text-muted small">
        ⭐ 4.8 · 1.234 đánh giá
    </div>
</div>
```

> ⚠️ **`h-100` + `d-flex flex-column` + `mt-auto`** là pattern quan trọng để tất cả cards trong grid có cùng chiều cao và button luôn nằm ở đáy.

---

### Navbar — Responsive navigation

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
    <div class="container">
        <!-- Logo -->
        <a class="navbar-brand fw-bold" href="#">
            🛒 Shop
        </a>

        <!-- Hamburger button (chỉ hiện trên mobile) -->
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu (collapse trên mobile) -->
        <div class="collapse navbar-collapse" id="mainNav">
            <!-- Links bên trái -->
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Trang chủ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Sản phẩm</a>
                </li>
                <!-- Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#"
                       data-bs-toggle="dropdown">Danh mục</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Điện thoại</a></li>
                        <li><a class="dropdown-item" href="#">Laptop</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Phụ kiện</a></li>
                    </ul>
                </li>
            </ul>

            <!-- Search + Cart bên phải -->
            <div class="d-flex gap-2 align-items-center">
                <form class="d-flex">
                    <input class="form-control form-control-sm me-2" type="search" placeholder="Tìm kiếm...">
                    <button class="btn btn-outline-light btn-sm">🔍</button>
                </form>
                <a href="#" class="btn btn-warning btn-sm position-relative">
                    🛒 Giỏ hàng
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                </a>
            </div>
        </div>
    </div>
</nav>
```

---

### Forms — Input types và Validation

```html
<form id="loginForm" class="needs-validation" novalidate>
    <!-- Email -->
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email"
               placeholder="name@example.com" required>
        <div class="valid-feedback">✅ Email hợp lệ!</div>
        <div class="invalid-feedback">❌ Vui lòng nhập email đúng định dạng.</div>
    </div>

    <!-- Password -->
    <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <div class="input-group">
            <input type="password" class="form-control" id="password"
                   minlength="8" required>
            <button class="btn btn-outline-secondary" type="button" id="togglePwd">
                👁️
            </button>
        </div>
        <div class="invalid-feedback">Mật khẩu tối thiểu 8 ký tự.</div>
        <div class="form-text text-muted">Mật khẩu không được chia sẻ.</div>
    </div>

    <!-- Select -->
    <div class="mb-3">
        <label for="role" class="form-label">Vai trò</label>
        <select class="form-select" id="role" required>
            <option value="">Chọn vai trò...</option>
            <option value="student">Sinh viên</option>
            <option value="lecturer">Giảng viên</option>
        </select>
        <div class="invalid-feedback">Vui lòng chọn vai trò.</div>
    </div>

    <!-- Checkbox -->
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">Ghi nhớ đăng nhập</label>
    </div>

    <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
</form>

<script>
// Bootstrap form validation
document.getElementById("loginForm").addEventListener("submit", function(e) {
    if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
    this.classList.add("was-validated");
});
</script>
```

---

### Modal — Popup dialog

```html
<!-- Trigger button -->
<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
    Xóa sản phẩm
</button>

<!-- Modal structure -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">  <!-- modal-dialog-centered = căn giữa màn hình -->
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title text-danger" id="deleteModalLabel">
                    ⚠️ Xác nhận xóa
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Bạn có chắc muốn xóa <strong>iPhone 15 Pro</strong> không?</p>
                <p class="text-muted small">Hành động này không thể hoàn tác.</p>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-danger" id="confirmDelete">Xóa</button>
            </div>
        </div>
    </div>
</div>

<script>
// Control modal bằng JavaScript
const modal = new bootstrap.Modal(document.getElementById("deleteModal"));

document.getElementById("confirmDelete").addEventListener("click", () => {
    // Xử lý delete
    modal.hide();
    // Hiện Toast thông báo
});
</script>
```

---

### Alert + Badge + Toast

```html
<!-- Alerts -->
<div class="alert alert-success alert-dismissible fade show" role="alert">
    ✅ <strong>Thành công!</strong> Sản phẩm đã được thêm vào giỏ hàng.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
<div class="alert alert-danger" role="alert">
    ❌ Không thể kết nối đến server. Vui lòng thử lại.
</div>
<div class="alert alert-warning" role="alert">
    ⚠️ Giỏ hàng của bạn sẽ hết hiệu lực sau <strong>30 phút</strong>.
</div>

<!-- Badges -->
<h4>Thông báo <span class="badge bg-danger rounded-pill">5</span></h4>
<span class="badge bg-success">Còn hàng</span>
<span class="badge bg-secondary">Hết hàng</span>
<span class="badge bg-warning text-dark">Sắp hết</span>

<!-- Toast (cần Bootstrap JS) -->
<div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="cartToast" class="toast" role="alert">
        <div class="toast-header">
            <strong class="me-auto">🛒 Giỏ hàng</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            iPhone 15 Pro đã được thêm vào giỏ hàng!
        </div>
    </div>
</div>

<script>
function showToast() {
    const toast = new bootstrap.Toast(document.getElementById("cartToast"));
    toast.show();
}
</script>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`data-bs-toggle` + `data-bs-target` = kết nối trigger và component. Thiếu Bootstrap JS = interactive components không chạy.**
> **`btn` luôn phải đi kèm `btn-{variant}`. Chỉ có `btn` thôi → không có style màu.**

---

## 5. 🏭 Real-world Layer

### Pattern: Product Card Grid chuẩn production

```html
<div class="container my-4">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">

        <!-- Lặp lại cho mỗi sản phẩm -->
        <div class="col">
            <div class="card h-100 shadow-sm border-0 rounded-3">
                <!-- Badge "Sale" -->
                <div class="position-relative">
                    <img src="phone.jpg" class="card-img-top rounded-top-3"
                         style="height: 220px; object-fit: cover;" alt="iPhone 15">
                    <span class="position-absolute top-0 end-0 m-2 badge bg-danger">-20%</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">iPhone 15 Pro</h6>
                    <p class="card-text text-muted small flex-grow-1">Chip A17 Pro mạnh mẽ</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-danger">25.990.000đ</span>
                            <small class="text-muted text-decoration-line-through">32.490.000đ</small>
                        </div>
                        <button class="btn btn-primary w-100 mt-2">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Trang E-commerce với đủ Components (30 phút)

Xây trang gồm:

1. **Navbar** — logo, menu, search, giỏ hàng badge
2. **Alert** — thông báo "Freeship đơn từ 300k" (dismissible)
3. **4 Product Cards** — ảnh, tên, giá, badge sale, button
4. **Delete Modal** — khi click "Xóa" trên card
5. **Pagination** — trang 1, 2, 3

```html
<!-- Pagination mẫu -->
<nav aria-label="Phân trang sản phẩm">
    <ul class="pagination justify-content-center">
        <li class="page-item disabled">
            <a class="page-link" href="#">‹ Trước</a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
            <a class="page-link" href="#">Sau ›</a>
        </li>
    </ul>
</nav>
```

---

### 🪜 Step-by-Step: Xây từng Component (30 phút)

**Bước 1: Navbar responsive (8 phút)**
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">🛒 ShopVN</a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link active" href="#">Trang chủ</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Sản phẩm</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Điện thoại</a></li>
                        <li><a class="dropdown-item" href="#">Laptop</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Phụ kiện</a></li>
                    </ul>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control form-control-sm me-2" type="search" placeholder="Tìm kiếm...">
                <button class="btn btn-outline-light btn-sm">🔍</button>
            </form>
        </div>
    </div>
</nav>
```

> **💡 `data-bs-toggle="collapse"` + `data-bs-target="#mainNav"`:** Khi click hamburger → toggle (ẩn/hiện) div có `id="mainNav"`. Cần Bootstrap JS.

**Bước 2: Alert dismissible (3 phút)**
```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
    🚚 <strong>Freeship!</strong> Miễn phí vận chuyển cho đơn từ 300.000đ.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

**Bước 3: Product Cards với equal height (10 phút)**
```html
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 my-3">
    <div class="col">
        <div class="card h-100 shadow-sm border-0">
            <div class="position-relative">
                <img src="https://picsum.photos/300/200?random=1" class="card-img-top" alt="Sản phẩm">
                <span class="position-absolute top-0 end-0 m-2 badge bg-danger">-20%</span>
            </div>
            <div class="card-body d-flex flex-column">
                <h6 class="card-title">iPhone 15 Pro</h6>
                <p class="card-text text-muted small flex-grow-1">Chip A17 Pro, camera 48MP</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold text-danger">25.990.000đ</span>
                        <small class="text-muted text-decoration-line-through">32.490.000đ</small>
                    </div>
                    <button class="btn btn-primary w-100 btn-sm">Thêm vào giỏ</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Thêm 3 cards tương tự -->
</div>
```

> **💡 Pattern `h-100` + `d-flex flex-column` + `mt-auto`:** `h-100` cho cards cùng chiều cao. `flex-column` + `mt-auto` đẩy button xuống đáy — dù mô tả dài hay ngắn, button luôn ở cùng vị trí.

**Bước 4: Delete Modal (5 phút)**
```html
<!-- Cuối <body>, trước script -->
<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title text-danger">⚠️ Xác nhận xóa</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Bạn có chắc muốn xóa <strong id="productName">sản phẩm</strong> không?</p>
                <p class="text-muted small">Hành động này không thể hoàn tác.</p>
            </div>
            <div class="modal-footer border-0">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button class="btn btn-danger" id="confirmDelete">Xóa</button>
            </div>
        </div>
    </div>
</div>
```

**Bước 5: Pagination (4 phút)**
```html
<nav aria-label="Phân trang" class="mt-4">
    <ul class="pagination justify-content-center">
        <li class="page-item disabled"><a class="page-link" href="#">‹</a></li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">›</a></li>
    </ul>
</nav>
```

---

### 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Modal không mở | Thiếu `data-bs-toggle="modal"` trên trigger button | Phải có cả `data-bs-toggle` và `data-bs-target` |
| Modal bị clip/cắt | Modal đặt trong element có `overflow: hidden` | Đặt modal cuối `<body>`, ngoài mọi container |
| Dropdown không hoạt động | Thiếu Bootstrap JS | Thêm `bootstrap.bundle.min.js` |
| Cards không bằng nhau | Thiếu `h-100` trên card | Thêm `class="card h-100"` |
| Alert không đóng được | Thiếu `alert-dismissible` + Bootstrap JS | Phải có class `alert-dismissible` và nút `btn-close` |
| Form validation không hiện | Thiếu `was-validated` class | JS phải thêm `this.classList.add("was-validated")` |

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Chỉ cần `btn`, không cần `btn-primary`"** | `btn` một mình không có màu sắc, chỉ set padding/border/typography. Phải thêm `btn-{variant}` để có màu |
| **"Modal sẽ tự hoạt động khi có HTML đúng"** | Modal cần Bootstrap JS. Không có JS → click button không mở gì cả. `data-bs-toggle="modal"` chỉ là attribute — JS mới thực thi |
| **"Có thể đặt Modal bên trong Card hoặc bất kỳ đâu"** | Modal nên đặt cuối `<body>` (hoặc ít nhất ngoài các element có `overflow: hidden`). Đặt trong card → modal bị clip bởi overflow của card |
| **"Alert tự đóng sau vài giây"** | Alert KHÔNG tự đóng. Phải có `alert-dismissible` + Bootstrap JS + nút close. Để auto-close cần JS: `setTimeout(() => el.remove(), 3000)` |
| **"`form-control` và `form-select` như nhau"** | `form-control` cho `<input>` và `<textarea>`. `form-select` cho `<select>`. Dùng sai → style không đúng |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `btn` và `btn btn-primary` khác nhau thế nào về visual?
2. `data-bs-toggle="modal"` và `data-bs-target="#myModal"` có vai trò gì? Tại sao cần cả hai?
3. Tại sao Modal nên đặt cuối `<body>` thay vì trong component hiện tại?

### Câu hỏi áp dụng:

4. Bạn muốn card sản phẩm có: tất cả cards cao bằng nhau, button luôn nằm ở đáy. Cần dùng những classes gì?
5. Toast notification và Alert khác nhau thế nào về UX? Khi nào nên dùng Toast, khi nào nên dùng Alert?

<details>
<summary>👁️ Xem đáp án</summary>

1. **`btn`** một mình: có padding, rounded, transition, cursor pointer nhưng **không có màu** (transparent background). **`btn btn-primary`**: thêm màu nền xanh `#0d6efd`, màu chữ trắng, và hover state. Luôn cần cả hai.
2. **`data-bs-toggle="modal"`** = "khi click element này, thực hiện hành động toggle modal". **`data-bs-target="#myModal"`** = "target cụ thể là element có id=myModal". Cần cả hai vì toggle-type xác định loại action, target xác định element nào bị ảnh hưởng.
3. Modal có `position: fixed` với overlay full-screen. Nếu nằm trong element có `overflow: hidden` hoặc `transform` → modal bị clip, hiển thị sai. Đặt cuối `<body>` = không có ancestor nào ảnh hưởng positioning.
4. ```html
   <div class="card h-100">           <!-- h-100: chiều cao 100% của row-cols -->
       <div class="card-body d-flex flex-column">  <!-- flex column -->
           <p class="card-text flex-grow-1">Mô tả...</p>  <!-- flex-grow-1: đẩy button xuống -->
           <button class="btn btn-primary mt-auto w-100">Mua</button>  <!-- mt-auto: luôn đáy -->
       </div>
   </div>
   ```
5. **Toast**: notification tạm thời, tự ẩn sau vài giây, không chặn tương tác. Dùng khi: "Thêm vào giỏ thành công", "Đã sao chép link", "Email đã gửi". **Alert**: thông báo quan trọng cần user đọc, chiếm không gian trong layout, không tự ẩn. Dùng khi: lỗi form, warning về bảo mật, thông báo hệ thống.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`btn` + `btn-{variant}`** luôn cùng nhau. `data-bs-toggle` + `data-bs-target` luôn cùng nhau
2. **Interactive components** (Modal, Dropdown, Toast) bắt buộc cần Bootstrap JS
3. **Card equal-height pattern**: `h-100` + `d-flex flex-column` + `mt-auto` cho button luôn đáy
4. **Modal đặt cuối body** — tránh overflow/transform ancestor gây clip
5. **Alert vs Toast**: Alert = persistent, quan trọng. Toast = tạm thời, không chặn tương tác

---

## 10. 📎 Phụ lục: Component Accessibility Checklist

### Navbar
```html
<!-- ✅ aria-label phân biệt nhiều nav -->
<nav class="navbar" aria-label="Menu chính">
<nav class="navbar" aria-label="Menu footer">

<!-- ✅ aria-expanded cho hamburger button -->
<button class="navbar-toggler"
        aria-expanded="false"
        aria-label="Mở menu điều hướng">
    <span class="navbar-toggler-icon"></span>
</button>
```

### Modal
```html
<!-- ✅ aria-labelledby + aria-describedby -->
<div class="modal" id="myModal" aria-labelledby="modalTitle" aria-describedby="modalDesc">
    <h5 class="modal-title" id="modalTitle">Xác nhận</h5>
    <p id="modalDesc">Bạn có chắc muốn xóa?</p>
</div>

<!-- ✅ Focus trap: Bootstrap tự động trap focus trong modal -->
<!-- ✅ Escape key: Bootstrap tự đóng modal khi nhấn Escape -->
```

### Alert
```html
<!-- ✅ role="alert" cho thông báo quan trọng -->
<div class="alert alert-danger" role="alert">
    Lỗi: Email không hợp lệ
</div>

<!-- ✅ role="status" cho thông báo nhẹ -->
<div class="alert alert-success" role="status">
    Đã lưu thành công
</div>
```

### Form
```html
<!-- ✅ Label LUÔN kết nối với input -->
<label for="email" class="form-label">Email</label>
<input type="email" class="form-control" id="email" required>

<!-- ✅ aria-describedby cho hint text -->
<input type="password" class="form-control" id="pwd" aria-describedby="pwdHint">
<div id="pwdHint" class="form-text">Tối thiểu 8 ký tự</div>

<!-- ✅ aria-invalid cho validation error -->
<input type="email" class="form-control is-invalid" aria-invalid="true">
<div class="invalid-feedback">Email không hợp lệ</div>
```

### Button
```html
<!-- ✅ aria-label cho nút chỉ có icon -->
<button class="btn btn-close" aria-label="Đóng"></button>
<button class="btn btn-danger" aria-label="Xóa sản phẩm">🗑️</button>

<!-- ✅ Disabled button: dùng aria-disabled thay vì disabled attribute -->
<!-- để vẫn giữ focusable và hiện tooltip giải thích -->
<button class="btn btn-primary" aria-disabled="true" tabindex="-1">
    Không thể submit
</button>
```

---

## 11. ⚡ Performance Tips cho Components

| Component | Tip | Lý do |
|-----------|-----|-------|
| **Images trong Card** | `loading="lazy"` + `width`/`height` | Tránh layout shift, load nhanh |
| **Modal** | Chỉ render khi cần (JS tạo DOM) | Tránh DOM bloat |
| **Dropdown** | Sử dụng `data-bs-toggle` (event delegation) | Ít event listeners hơn |
| **Carousel** | `data-bs-interval="false"` nếu không cần auto-play | Tiết kiệm CPU |
| **Font Icons** | Chỉ import icons cần dùng (SVG sprite) | Giảm HTTP requests |
| **Bootstrap JS** | Import selective: `import { Modal } from 'bootstrap'` | Tree-shaking |

```html
<!-- ✅ Image optimization trong Card -->
<img src="product.jpg"
     alt="iPhone 15 Pro"
     width="300" height="200"
     loading="lazy"
     class="card-img-top">

<!-- ✅ Selective JS import (npm) -->
<script type="module">
    import { Modal, Toast } from 'bootstrap';
    // Chỉ import Modal và Toast, không import Carousel, Tooltip...
</script>
```

---

## 10. ➡️ Next Lesson Bridge

*"Components xây xong trang khá đẹp," Minh nói. "Nhưng muốn thêm spacing, đổi màu text, căn giữa một element — không lẽ phải vào file CSS riêng?"*

*"Không cần," anh Hùng nói. "Bootstrap Utilities = CSS trong class HTML. `mt-3` = margin-top 1rem. `text-center` = text-align center. `d-flex` = display flex. Học Utilities = viết CSS nhanh gấp 5 lần."*

**→ [Bài 04: Utilities](../04_utilities/04_utilities.md) — Spacing, Colors, Display, Flexbox: CSS trong class, không cần file riêng.**
