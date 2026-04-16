# 🟦 BÀI 03: BOOTSTRAP 5 - COMPONENTS

## 🎬 "20 Components, 0 Dòng CSS" — Kho Vũ Khí Của Bootstrap

*Minh cần: Navbar, Card sản phẩm, Modal popup, Form đăng nhập, Alert thông báo, Pagination. Viết CSS thuần? 2000+ dòng. Bootstrap? Copy-paste 20 components từ docs. Xong trong 1 buổi chiều.*

> **Chị Hà:** *"Bootstrap giống IKEA — đồ đã lắp sẵn, em chỉ cần chọn đúng món và customize màu."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng Buttons với tất cả variants và sizes
- Tạo Cards với nhiều style khác nhau
- Xây dựng Navbar responsive hoàn chỉnh
- Tạo Forms với validation và các input types
- Sử dụng Modals, Dropdowns, Alerts, và các components khác
- Hiểu cách kết hợp các components với nhau

---

# 1. **BUTTONS - NÚT BẤM**

Button là component được dùng nhiều nhất. Bootstrap cung cấp nhiều style và size khác nhau.

## 1.1. Button Variants (Các loại button)

Bootstrap có 8 màu button mặc định:

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
```

**Giải thích:**
- `btn`: Class cơ bản, bắt buộc phải có
- `btn-primary`: Màu primary (xanh dương) - dùng cho action chính
- `btn-secondary`: Màu xám - dùng cho action phụ
- `btn-success`: Màu xanh lá - dùng cho thành công (Save, Confirm)
- `btn-danger`: Màu đỏ - dùng cho hành động nguy hiểm (Delete, Cancel)

## 1.2. Button Sizes (Kích thước)

```html
<button class="btn btn-primary btn-lg">Large Button</button>
<button class="btn btn-primary">Default Button</button>
<button class="btn btn-primary btn-sm">Small Button</button>
```

**Giải thích:**
- `btn-lg`: Button lớn (padding nhiều hơn)
- Không có class: Button mặc định
- `btn-sm`: Button nhỏ (padding ít hơn)

## 1.3. Button Outlines (Viền)

Thay vì màu nền, dùng màu viền:

```html
<button class="btn btn-outline-primary">Outline Primary</button>
<button class="btn btn-outline-secondary">Outline Secondary</button>
<button class="btn btn-outline-success">Outline Success</button>
```

**Khi nào dùng:**
- Khi muốn button nhẹ nhàng hơn
- Khi có nhiều button trên cùng 1 hàng
- Khi muốn highlight nhưng không quá nổi bật

## 1.4. Button States (Trạng thái)

```html
<!-- Disabled button -->
<button class="btn btn-primary" disabled>Disabled Button</button>

<!-- Active button -->
<button class="btn btn-primary active">Active Button</button>
```

## 1.5. Button Groups (Nhóm button)

Nhóm các button lại với nhau:

```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
```

## 1.6. Ví dụ thực tế: Form với Buttons

```html
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email">
  </div>
  
  <div class="d-flex gap-2">
    <button type="submit" class="btn btn-primary">Submit</button>
    <button type="reset" class="btn btn-secondary">Reset</button>
    <button type="button" class="btn btn-outline-danger">Cancel</button>
  </div>
</form>
```

---

# 2. **CARDS - THẺ**

Card là component để hiển thị nội dung có cấu trúc (sản phẩm, bài viết, profile...).

## 2.1. Card Cơ bản

```html
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

**Giải thích:**
- `card`: Container chính
- `card-body`: Phần nội dung
- `card-title`: Tiêu đề card
- `card-text`: Đoạn văn trong card

## 2.2. Card với Image

```html
<div class="card" style="width: 18rem;">
  <img src="image.jpg" class="card-img-top" alt="Card image">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card description.</p>
    <a href="#" class="btn btn-primary">Read More</a>
  </div>
</div>
```

**Lưu ý:** `card-img-top` sẽ làm ảnh bo tròn góc trên, fit với card.

## 2.3. Card với Header và Footer

```html
<div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
```

## 2.4. Card Grid (Dùng với Grid System)

```html
<div class="container">
  <div class="row">
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="product1.jpg" class="card-img-top" alt="Product 1">
        <div class="card-body">
          <h5 class="card-title">Product 1</h5>
          <p class="card-text">$99.99</p>
          <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="product2.jpg" class="card-img-top" alt="Product 2">
        <div class="card-body">
          <h5 class="card-title">Product 2</h5>
          <p class="card-text">$149.99</p>
          <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="product3.jpg" class="card-img-top" alt="Product 3">
        <div class="card-body">
          <h5 class="card-title">Product 3</h5>
          <p class="card-text">$79.99</p>
          <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

# 3. **NAVBAR - THANH ĐIỀU HƯỚNG**

Navbar là thanh điều hướng ở đầu trang, thường chứa logo và menu.

## 3.1. Navbar Cơ bản

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Website</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

**Giải thích từng phần:**

1. **`navbar navbar-expand-lg`**
   - `navbar`: Class cơ bản
   - `navbar-expand-lg`: Navbar sẽ expand (mở rộng) trên màn hình ≥ 992px

2. **`navbar-light bg-light`**
   - `navbar-light`: Text màu tối (dùng với background sáng)
   - `bg-light`: Background màu sáng
   - Hoặc dùng `navbar-dark bg-dark` cho navbar tối

3. **`navbar-brand`**: Logo hoặc tên website

4. **`navbar-toggler`**: Nút hamburger menu (hiện trên mobile)
   - `data-bs-toggle="collapse"`: Kích hoạt collapse
   - `data-bs-target="#navbarNav"`: Target đến phần tử có id="navbarNav"

5. **`collapse navbar-collapse`**: Phần menu sẽ collapse trên mobile
   - `id="navbarNav"`: ID để navbar-toggler target đến

6. **`navbar-nav`**: Danh sách menu items

7. **`nav-item` và `nav-link`**: Từng item trong menu
   - `active`: Highlight item đang active

## 3.2. Navbar với Dropdown

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Website</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
            Products
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Laptop</a></li>
            <li><a class="dropdown-item" href="#">Phone</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Accessories</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

**Lưu ý:** Dropdown cần Bootstrap JS để hoạt động!

## 3.3. Navbar với Search Form

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Website</a>
    <div class="collapse navbar-collapse">
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
```

---

# 4. **FORMS - BIỂU MẪU**

Forms là cách người dùng nhập liệu. Bootstrap cung cấp nhiều input types và validation.

## 4.1. Form Cơ bản

```html
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
    <div class="form-text">We'll never share your email with anyone else.</div>
  </div>
  
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password">
  </div>
  
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Remember me</label>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

**Giải thích:**
- `mb-3`: Margin bottom (spacing)
- `form-label`: Label cho input
- `form-control`: Input field của Bootstrap
- `form-text`: Text nhỏ bên dưới input (helper text)
- `form-check`: Container cho checkbox/radio
- `form-check-input`: Checkbox/radio input
- `form-check-label`: Label cho checkbox/radio

## 4.2. Form với Validation

```html
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" id="username" required>
    <div class="invalid-feedback">
      Please provide a valid username.
    </div>
  </div>
  
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback">
      Please provide a valid email.
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

<script>
// Validation script
(function() {
  'use strict';
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function(form) {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();
</script>
```

## 4.3. Select Dropdown

```html
<div class="mb-3">
  <label for="country" class="form-label">Country</label>
  <select class="form-select" id="country">
    <option selected>Choose...</option>
    <option value="1">Vietnam</option>
    <option value="2">USA</option>
    <option value="3">UK</option>
  </select>
</div>
```

## 4.4. Textarea

```html
<div class="mb-3">
  <label for="message" class="form-label">Message</label>
  <textarea class="form-control" id="message" rows="3"></textarea>
</div>
```

## 4.5. Input Groups (Input với icon hoặc button)

```html
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Search">
  <button class="btn btn-outline-secondary" type="button">Search</button>
</div>
```

---

# 5. **MODALS - HỘP THOẠI**

Modal là hộp thoại popup xuất hiện trên trang, thường dùng cho confirm, form, hoặc hiển thị thông tin.

## 5.1. Modal Cơ bản

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

**Giải thích:**
- `data-bs-toggle="modal"`: Kích hoạt modal
- `data-bs-target="#exampleModal"`: Target đến modal có id="exampleModal"
- `modal fade`: Hiệu ứng fade in/out
- `modal-dialog`: Container của modal
- `modal-content`: Nội dung modal
- `modal-header`, `modal-body`, `modal-footer`: Các phần của modal
- `data-bs-dismiss="modal"`: Đóng modal

**Lưu ý:** Modal cần Bootstrap JS để hoạt động!

## 5.2. Modal với Form

```html
<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Login</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Login</button>
      </div>
    </div>
  </div>
</div>
```

---

# 6. **ALERTS - THÔNG BÁO**

Alert dùng để hiển thị thông báo cho người dùng (thành công, cảnh báo, lỗi...).

```html
<div class="alert alert-success" role="alert">
  <strong>Success!</strong> Your changes have been saved.
</div>

<div class="alert alert-danger" role="alert">
  <strong>Error!</strong> Something went wrong.
</div>

<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Warning!</strong> This action cannot be undone.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

**Giải thích:**
- `alert`: Class cơ bản
- `alert-success`, `alert-danger`, `alert-warning`: Màu sắc
- `alert-dismissible`: Có thể đóng được
- `fade show`: Hiệu ứng fade và hiển thị
- `btn-close`: Nút đóng
- `data-bs-dismiss="alert"`: Đóng alert

---

# 7. **BADGES - NHÃN**

Badge dùng để hiển thị số lượng, trạng thái (ví dụ: số thông báo chưa đọc).

```html
<h1>Notifications <span class="badge bg-primary">5</span></h1>

<button type="button" class="btn btn-primary">
  Messages <span class="badge bg-light text-dark">3</span>
</button>

<span class="badge bg-success">Active</span>
<span class="badge bg-danger">Inactive</span>
```

---

# 8. **BREADCRUMBS - ĐƯỜNG DẪN**

Breadcrumb hiển thị vị trí hiện tại trong website (Home > Products > Laptop).

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Products</a></li>
    <li class="breadcrumb-item active" aria-current="page">Laptop</li>
  </ol>
</nav>
```

---

# 9. **PAGINATION - PHÂN TRANG**

Pagination dùng để phân trang (1, 2, 3, 4, 5...).

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
```

---

# 10. **BÀI TẬP THỰC HÀNH**

## Bài tập 1: Tạo Product Card với Button

Tạo card sản phẩm với:
- Hình ảnh
- Tên sản phẩm
- Giá
- Nút "Add to Cart"
- Badge "New" hoặc "Sale"

## Bài tập 2: Tạo Login Form trong Modal

Tạo modal với form login:
- Email input
- Password input
- Checkbox "Remember me"
- Button "Login" và "Cancel"

## Bài tập 3: Tạo Navbar hoàn chỉnh

Tạo navbar với:
- Logo bên trái
- Menu items (Home, About, Products, Contact)
- Dropdown menu "Products" với sub-items
- Search form bên phải
- Responsive (collapse trên mobile)

---

# 11. **TỔNG KẾT**

**Các components đã học:**
1. ✅ Buttons - Nhiều variants, sizes, outlines
2. ✅ Cards - Hiển thị nội dung có cấu trúc
3. ✅ Navbar - Thanh điều hướng responsive
4. ✅ Forms - Input, select, textarea, validation
5. ✅ Modals - Popup dialogs
6. ✅ Alerts - Thông báo
7. ✅ Badges - Nhãn, số lượng
8. ✅ Breadcrumbs - Đường dẫn
9. ✅ Pagination - Phân trang

**Lưu ý quan trọng:**
- Một số components cần Bootstrap JS (Modals, Dropdowns, Navbar toggle)
- Luôn nhớ include Bootstrap JS: `<script src="...bootstrap.bundle.min.js"></script>`
- Kết hợp components với Grid System để tạo layout hoàn chỉnh

---

**Bài tiếp theo:** [04. Utilities](../04_utilities/04_utilities.md) - Spacing, Colors, Typography utilities

> [!TIP]
> **Lời khuyên:** Hãy thực hành tạo một trang web hoàn chỉnh với tất cả components đã học. Điều này giúp bạn nhớ và hiểu cách kết hợp các components với nhau.
