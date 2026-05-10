# 🟦 TUẦN 4B - BÀI 04 (CSS FRAMEWORKS)
# **BOOTSTRAP 5 — UTILITIES**

---

## 0. 🎬 Opening Hook

*Designer giao Figma cho Minh: "Button cần thêm margin-top 16px, text căn giữa, background xanh 50% opacity."*

*CSS thuần: Mở file CSS, thêm 3 dòng, save, reload.*

*Bootstrap: Gõ thêm 3 chữ vào class: `mt-3 text-center bg-primary bg-opacity-50`.*

*Anh Hùng: "Utilities = triết lý của Tailwind CSS nhưng trong Bootstrap. Không cần file CSS riêng cho mọi styling nhỏ. Nhược điểm: class HTML sẽ dài. Đó là trade-off. Team lớn chấp nhận được vì code dễ đọc hơn 'magic CSS'."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Utilities giải quyết vấn đề thực tế hàng ngày:
- Thêm spacing giữa các elements
- Ẩn element trên mobile, hiện trên desktop
- Căn giữa nội dung
- Đổi màu text, background
- Flexbox layout nhanh

**Không biết Utilities** → phải viết file CSS riêng cho từng điều chỉnh nhỏ → CSS file lộn xộn.

---

## 2. 🌐 Big Picture — Cú pháp Utilities

```
PATTERN CHUNG: {property}{direction}-{breakpoint}-{size}

Ví dụ: mt  -  md  -  3
        ↑       ↑     ↑
      margin  (optional) giá trị
       top    từ md    (0-5 hoặc auto)

Không có breakpoint → áp dụng mọi kích thước:
mt-3         → margin-top: 1rem (mọi màn hình)
mt-md-3      → margin-top: 1rem từ 768px trở lên

DANH MỤC UTILITIES
├── Spacing       → m-*, p-* (margin, padding)
├── Colors        → text-*, bg-* (text, background)
├── Typography    → fw-*, fs-*, text-* (font, alignment)
├── Display       → d-* (display property)
├── Flexbox       → d-flex + justify-content-*, align-items-*
├── Sizing        → w-*, h-* (width, height)
├── Borders       → border-*, rounded-* (border, border-radius)
├── Shadows       → shadow-* (box-shadow)
└── Position      → position-*, top-*, start-* (positioning)
```

---

## 3. ⚙️ Core Technical Truth

### Spacing — Dùng nhiều nhất

```
Cú pháp:
{m/p}{direction}-{size}

m = margin    p = padding
t = top       b = bottom
s = start(left)  e = end(right)
x = left+right   y = top+bottom
(không có) = all sides

Size: 0 (0) | 1 (0.25rem/4px) | 2 (0.5rem/8px) | 3 (1rem/16px) | 4 (1.5rem/24px) | 5 (3rem/48px) | auto
```

```html
<!-- Margin examples -->
<div class="mt-3">Margin top 1rem</div>
<div class="mb-4">Margin bottom 1.5rem</div>
<div class="ms-auto">Margin start auto (đẩy sang phải)</div>
<div class="mx-auto" style="width: 300px;">Căn giữa ngang</div>
<div class="my-5">Margin top+bottom 3rem</div>
<div class="m-0">Xóa toàn bộ margin</div>

<!-- Padding examples -->
<div class="p-3">Padding 1rem tất cả</div>
<div class="px-4 py-2">Padding horizontal lớn, vertical nhỏ</div>
<div class="pt-5 pb-0">Padding top lớn, bottom 0</div>

<!-- Responsive spacing -->
<div class="mt-2 mt-md-4 mt-lg-5">
    <!-- mt-2 trên mobile, mt-4 trên tablet, mt-5 trên desktop -->
</div>
```

**Bảng spacing nhanh:**
| Class | CSS | Pixel (base 16px) |
|---|---|---|
| `m-0`, `p-0` | 0 | 0 |
| `m-1`, `p-1` | 0.25rem | 4px |
| `m-2`, `p-2` | 0.5rem | 8px |
| `m-3`, `p-3` | 1rem | 16px |
| `m-4`, `p-4` | 1.5rem | 24px |
| `m-5`, `p-5` | 3rem | 48px |

---

### Colors — Text và Background

```html
<!-- Text colors -->
<p class="text-primary">Xanh Bootstrap</p>
<p class="text-danger">Đỏ — lỗi, cảnh báo</p>
<p class="text-success">Xanh lá — thành công</p>
<p class="text-warning">Vàng — cảnh báo nhẹ</p>
<p class="text-info">Xanh nhạt — thông tin</p>
<p class="text-muted">Xám — secondary text</p>
<p class="text-dark">Gần đen — heading</p>
<p class="text-white bg-dark">Trắng trên nền tối</p>

<!-- Background colors -->
<div class="bg-primary text-white p-3">Primary bg</div>
<div class="bg-light text-dark p-3">Light bg</div>
<div class="bg-dark text-white p-3">Dark bg</div>
<div class="bg-transparent border p-3">Transparent (clear)</div>

<!-- Opacity -->
<div class="bg-primary bg-opacity-75 p-3">75% opacity</div>
<div class="bg-primary bg-opacity-50 p-3">50% opacity</div>
<div class="bg-primary bg-opacity-25 p-3">25% opacity</div>
<div class="text-danger text-opacity-75">Text 75% opacity</div>
```

---

### Typography

```html
<!-- Text alignment -->
<p class="text-start">Căn trái</p>
<p class="text-center">Căn giữa</p>
<p class="text-end">Căn phải</p>
<!-- Responsive alignment -->
<p class="text-center text-md-start">Giữa trên mobile, trái trên tablet+</p>

<!-- Font weight & style -->
<p class="fw-bold">Bold (700)</p>
<p class="fw-semibold">Semibold (600)</p>
<p class="fw-normal">Normal (400)</p>
<p class="fw-light">Light (300)</p>
<p class="fst-italic">Italic</p>

<!-- Font size -->
<p class="fs-1">fs-1 (2.5rem)</p>
<p class="fs-2">fs-2 (2rem)</p>
<p class="fs-3">fs-3 (1.75rem)</p>
<p class="fs-4">fs-4 (1.5rem)</p>
<p class="fs-5">fs-5 (1.25rem)</p>
<p class="fs-6">fs-6 (1rem)</p>

<!-- Text transform -->
<p class="text-uppercase">lowercase → UPPERCASE</p>
<p class="text-lowercase">UPPERCASE → lowercase</p>
<p class="text-capitalize">capitalize first letter</p>

<!-- Text decoration -->
<a class="text-decoration-none" href="#">Link không có underline</a>
<p class="text-decoration-line-through">Gạch ngang</p>

<!-- Text overflow -->
<p class="text-truncate" style="max-width: 200px;">Văn bản quá dài sẽ bị cắt...</p>
<p class="text-nowrap">Không bao giờ wrap xuống dòng</p>
```

---

### Display — Ẩn/Hiện theo breakpoint

```html
<!-- Display values -->
<div class="d-none">Ẩn hoàn toàn (display: none)</div>
<div class="d-block">Block</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-flex">Flex container</div>
<div class="d-grid">Grid container</div>

<!-- Responsive display — Pattern phổ biến nhất -->
<div class="d-none d-md-block">Ẩn trên mobile, hiện trên tablet+</div>
<div class="d-block d-md-none">Hiện trên mobile, ẩn trên tablet+</div>
<div class="d-none d-lg-flex">Ẩn < 992px, flex từ 992px+</div>

<!-- Ví dụ: Desktop menu vs Mobile hamburger -->
<ul class="navbar-nav d-none d-lg-flex"><!-- Desktop menu --></ul>
<button class="navbar-toggler d-lg-none"><!-- Mobile button --></button>
```

**Quy tắc responsive display:**
```
d-none d-{bp}-{value}
= Ẩn mặc định → hiện từ breakpoint bp trở lên

d-{value} d-{bp}-none
= Hiện mặc định → ẩn từ breakpoint bp trở lên
```

---

### Flexbox Utilities

```html
<!-- Flex container -->
<div class="d-flex">
    <!-- flex-direction -->
    <div class="d-flex flex-row">Row (default)</div>
    <div class="d-flex flex-column">Column</div>
    <div class="d-flex flex-row-reverse">Row reverse</div>

    <!-- justify-content (căn ngang) -->
    <div class="d-flex justify-content-start">Start</div>
    <div class="d-flex justify-content-center">Center</div>
    <div class="d-flex justify-content-end">End</div>
    <div class="d-flex justify-content-between">Space between</div>
    <div class="d-flex justify-content-around">Space around</div>
    <div class="d-flex justify-content-evenly">Space evenly</div>

    <!-- align-items (căn dọc) -->
    <div class="d-flex align-items-start">Start</div>
    <div class="d-flex align-items-center">Center (phổ biến nhất)</div>
    <div class="d-flex align-items-end">End</div>
    <div class="d-flex align-items-stretch">Stretch (default)</div>

    <!-- gap -->
    <div class="d-flex gap-2">Gap 8px giữa items</div>
    <div class="d-flex gap-3">Gap 16px giữa items</div>

    <!-- flex-wrap -->
    <div class="d-flex flex-wrap">Wrap xuống dòng nếu tràn</div>
</div>

<!-- Flex items -->
<div class="d-flex">
    <div class="flex-grow-1">Chiếm hết không gian còn lại</div>
    <div class="flex-shrink-0">Không co lại</div>
    <div class="ms-auto">Đẩy sang phải (auto margin)</div>
</div>
```

**Pattern Flex phổ biến nhất:**
```html
<!-- Navbar pattern: logo trái, menu phải -->
<div class="d-flex justify-content-between align-items-center">
    <div>Logo</div>
    <nav>Menu</nav>
</div>

<!-- Card footer: text trái, button phải -->
<div class="d-flex justify-content-between align-items-center">
    <span class="text-muted">2 ngày trước</span>
    <button class="btn btn-sm btn-primary">Đọc thêm</button>
</div>

<!-- Button group with gap -->
<div class="d-flex gap-2">
    <button class="btn btn-primary">Lưu</button>
    <button class="btn btn-secondary">Hủy</button>
</div>
```

---

### Borders & Shadows

```html
<!-- Borders -->
<div class="border">Viền tất cả (mặc định xám nhạt)</div>
<div class="border border-primary">Viền xanh</div>
<div class="border border-2 border-danger">Viền đỏ dày</div>
<div class="border-top border-3">Chỉ viền trên dày</div>
<div class="border-0">Xóa viền</div>

<!-- Border radius -->
<div class="rounded">Bo tròn nhẹ (4px)</div>
<div class="rounded-3">Bo tròn vừa</div>
<div class="rounded-pill">Pill (bo hoàn toàn 2 đầu)</div>
<div class="rounded-circle" style="width:50px;height:50px;">Tròn</div>

<!-- Shadows -->
<div class="shadow-none">Không shadow</div>
<div class="shadow-sm">Shadow nhẹ</div>
<div class="shadow">Shadow mặc định</div>
<div class="shadow-lg">Shadow lớn</div>
```

---

### Sizing & Position

```html
<!-- Sizing -->
<div class="w-25">Width 25%</div>
<div class="w-50">Width 50%</div>
<div class="w-75">Width 75%</div>
<div class="w-100">Width 100%</div>
<div class="h-100">Height 100% (của parent)</div>
<div class="mw-100">Max-width 100%</div>
<div class="vw-100">100vw (full viewport width)</div>
<div class="min-vw-100">min-width: 100vw</div>

<!-- Position utilities -->
<div class="position-relative">Relative (parent cho absolute)</div>
<div class="position-absolute top-0 end-0">Top-right corner</div>
<div class="position-absolute top-50 start-50 translate-middle">Căn giữa tuyệt đối</div>
<div class="position-sticky top-0">Sticky header</div>

<!-- Visibility (khác với d-none) -->
<div class="visible">Hiển thị (mặc định)</div>
<div class="invisible">Ẩn nhưng vẫn chiếm chỗ (vs d-none)</div>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`m` = margin, `p` = padding. `t/b/s/e/x/y` = direction. `0-5` = size. Cộng breakpoint vào giữa để responsive.**
> **`d-none d-md-block` = ẩn trên mobile, hiện trên tablet+. `d-block d-md-none` = ngược lại.**

---

## 5. 🏭 Real-world Layer

### Navbar thực tế chỉ dùng Utilities

```html
<nav class="d-flex justify-content-between align-items-center
            px-4 py-3 bg-dark text-white shadow sticky-top">
    <a href="#" class="text-white text-decoration-none fw-bold fs-5">🛒 Shop</a>
    <div class="d-none d-md-flex gap-4 align-items-center">
        <a href="#" class="text-white text-decoration-none">Trang chủ</a>
        <a href="#" class="text-white text-decoration-none">Sản phẩm</a>
        <a href="#" class="text-white text-decoration-none">Liên hệ</a>
    </div>
    <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-light btn-sm">🔍</button>
        <button class="btn btn-warning btn-sm position-relative">
            🛒
            <span class="position-absolute top-0 start-100 translate-middle
                         badge rounded-pill bg-danger">3</span>
        </button>
    </div>
</nav>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Decode và Rebuild (20 phút)

Đọc đoạn HTML sau và **giải thích bằng lời mỗi class** làm gì:

```html
<div class="d-flex justify-content-between align-items-center
            p-3 mb-3 border border-2 rounded-3 shadow-sm bg-light">
    <div>
        <h6 class="fw-bold mb-1 text-dark">Học Bootstrap 5</h6>
        <small class="text-muted">Hoàn thành 80%</small>
    </div>
    <div class="d-flex gap-2">
        <span class="badge bg-success rounded-pill">Active</span>
        <button class="btn btn-outline-danger btn-sm">✕</button>
    </div>
</div>
```

Sau đó: tạo thêm 2 item tương tự với trạng thái khác nhau (Warning, Danger).

---

### 🪜 Step-by-Step: Utilities trong thực tế (20 phút)

**Bước 1: Spacing patterns (5 phút)**
```html
<!-- Section spacing chuẩn -->
<section class="py-5">           <!-- padding top+bottom = 3rem -->
    <div class="container">
        <h2 class="mb-4">Tiêu đề</h2>   <!-- margin-bottom = 1.5rem -->
        <div class="row g-4">            <!-- gap 1.5rem giữa cols -->
            <div class="col-md-4">
                <div class="p-3 bg-light rounded">Card 1</div>
            </div>
            <div class="col-md-4">
                <div class="p-3 bg-light rounded">Card 2</div>
            </div>
            <div class="col-md-4">
                <div class="p-3 bg-light rounded">Card 3</div>
            </div>
        </div>
    </div>
</section>
```

> **💡 `py-5` = padding vertical 3rem.** Section lớn dùng `py-5`, section nhỏ dùng `py-3`. Nhất quán spacing → trang trông professional.

**Bước 2: Responsive display (5 phút)**
```html
<!-- Desktop: 3-column layout với sidebar -->
<div class="container">
    <div class="row">
        <!-- Sidebar: hiện trên desktop, ẩn trên mobile -->
        <aside class="col-lg-3 d-none d-lg-block bg-light p-3 rounded">
            <h5>📂 Danh mục</h5>
            <ul class="list-unstyled">
                <li class="mb-2"><a href="#" class="text-decoration-none">Điện thoại</a></li>
                <li class="mb-2"><a href="#" class="text-decoration-none">Laptop</a></li>
                <li class="mb-2"><a href="#" class="text-decoration-none">Phụ kiện</a></li>
            </ul>
        </aside>

        <!-- Main content: full trên mobile, 9/12 trên desktop -->
        <main class="col-12 col-lg-9">
            <h2>Sản phẩm</h2>
            <!-- Product grid -->
        </main>
    </div>
</div>

<!-- Mobile menu button: hiện trên mobile, ẩn trên desktop -->
<button class="btn btn-primary d-lg-none mb-3">
    ☰ Hiện danh mục
</button>
```

**Bước 3: Flexbox utility patterns (5 phút)**
```html
<!-- Pattern 1: Navbar với logo trái, menu phải -->
<nav class="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
    <span class="fw-bold fs-5">🛒 ShopVN</span>
    <div class="d-flex gap-3">
        <a href="#" class="text-white text-decoration-none">Trang chủ</a>
        <a href="#" class="text-white text-decoration-none">Sản phẩm</a>
    </div>
</nav>

<!-- Pattern 2: Card footer với text trái, button phải -->
<div class="card mt-3">
    <div class="card-body">
        <h5>Sản phẩm hot</h5>
        <p class="text-muted">Mô tả ngắn gọn...</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
        <span class="fw-bold text-danger">299.000đ</span>
        <button class="btn btn-primary btn-sm">Mua ngay</button>
    </div>
</div>

<!-- Pattern 3: Center everything (hero, empty state) -->
<div class="d-flex flex-column align-items-center justify-content-center text-center"
     style="min-height: 300px;">
    <h3>📭 Không có sản phẩm</h3>
    <p class="text-muted">Hãy thử tìm kiếm với từ khóa khác</p>
    <button class="btn btn-outline-primary mt-3">Xem tất cả</button>
</div>
```

**Bước 4: Build hero section chỉ dùng Utilities (5 phút)**
```html
<!-- Hero section — KHÔNG cần file CSS riêng -->
<section class="min-vh-100 d-flex align-items-center justify-content-center
                text-center text-white bg-primary bg-gradient">
    <div class="container px-4">
        <h1 class="display-2 fw-bold mb-3">
            Chào mừng đến <span class="text-warning">ShopVN</span>
        </h1>
        <p class="lead mb-4 opacity-75">
            Nơi mua sắm trực tuyến đáng tin cậy nhất Việt Nam
        </p>
        <div class="d-flex gap-3 justify-content-center">
            <a href="#" class="btn btn-light btn-lg px-5 fw-semibold">Mua sắm ngay</a>
            <a href="#" class="btn btn-outline-light btn-lg px-5">Tìm hiểu thêm</a>
        </div>
    </div>
</section>
```

> **💡 Không cần CSS riêng!** Toàn bộ hero section này chỉ dùng Bootstrap utilities. `min-vh-100` = full height, `d-flex align-items-center justify-content-center` = căn giữa, `bg-gradient` = gradient effect.

---

### 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `ms-auto` không đẩy element sang phải | Parent không phải flex container | Thêm `d-flex` vào parent |
| `mx-auto` không căn giữa | Element không có width xác định | Thêm `w-50` hoặc `style="width: 300px"` |
| `d-none d-md-block` không hiện trên tablet | Dùng sai breakpoint | `md` = ≥ 768px. Nếu tablet nhỏ hơn → dùng `sm` |
| Utilities bị override bởi CSS custom | CSS custom có specificity cao hơn | Dùng `!important` hoặc tăng specificity |
| `invisible` vẫn chiếm chỗ | Nhầm lẫn với `d-none` | `d-none` = không chiếm chỗ. `invisible` = ẩn nhưng vẫn chiếm chỗ |

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`d-none` và `invisible` như nhau"** | `d-none` = `display: none` → không chiếm chỗ, không ảnh hưởng layout. `invisible` = `visibility: hidden` → vẫn chiếm chỗ, chỉ ẩn visual |
| **"`ms-auto` hoạt động mọi nơi"** | `ms-auto` chỉ hoạt động khi parent là **flex container** (`d-flex`). Trong block context → không có tác dụng |
| **"`mx-auto` căn giữa mọi element"** | `mx-auto` chỉ căn giữa **block element có width xác định**. Phải set width trước: `<div class="w-50 mx-auto">`. Không set width → element full width, mx-auto vô nghĩa |
| **"Utilities override CSS custom của mình"** | Utilities có specificity thấp (1 class = 0-1-0). CSS custom của bạn với `!important` hoặc higher specificity sẽ thắng. Nhưng khi có conflict không mong muốn, dùng DevTools để check |
| **"Responsive utilities từ breakpoint trở xuống"** | Ngược lại — `d-md-block` áp dụng từ md **TRỞ LÊN**. Bootstrap Mobile-First. Muốn "từ trở xuống" → dùng kết hợp: `d-block d-md-none` |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `mt-3` và `mt-md-3` khác nhau thế nào?
2. `d-none d-lg-flex` làm gì ở kích thước màn hình 1024px (lg = ≥ 992px)?
3. Tại sao `mx-auto` không hoạt động khi không set width?

### Câu hỏi áp dụng:

4. Viết HTML (chỉ dùng Utilities, không CSS riêng) cho element: nền trắng, viền đỏ mỏng, bo tròn nhẹ, shadow nhẹ, padding 1rem, margin-bottom 1rem.
5. Bạn có navigation: Logo bên trái, 3 links ở giữa, Cart button bên phải. Trên mobile, ẩn 3 links. Chỉ dùng Flexbox utilities và Display utilities — viết HTML.

<details>
<summary>👁️ Xem đáp án</summary>

1. **`mt-3`** áp dụng margin-top 1rem trên **mọi kích thước màn hình**. **`mt-md-3`** áp dụng margin-top 1rem **chỉ từ 768px trở lên** (tablet+). Dưới 768px → không có margin-top.
2. Ở 1024px (≥ 992px = lg): `d-none` bị override bởi `d-lg-flex` → **`display: flex`**. Từ 992px trở lên, element hiển thị dưới dạng flex. Dưới 992px → `display: none` (ẩn).
3. `mx-auto` set `margin-left: auto; margin-right: auto`. Với block element **full width**, left và right margin đều = 0 (không có không gian). Width phải < 100% để có "room" cho auto margins để chia đều 2 bên → element căn giữa.
4. ```html
   <div class="bg-white border border-danger rounded shadow-sm p-3 mb-3">
       Nội dung
   </div>
   ```
5. ```html
   <nav class="d-flex justify-content-between align-items-center p-3">
       <a href="#">Logo</a>
       <!-- Ẩn trên mobile, hiện từ lg+ -->
       <div class="d-none d-lg-flex gap-4">
           <a href="#">Link 1</a>
           <a href="#">Link 2</a>
           <a href="#">Link 3</a>
       </div>
       <button class="btn btn-warning">🛒 Cart</button>
   </nav>
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Spacing**: `m/p` + `t/b/s/e/x/y` + `-{0-5/auto}`. Thêm breakpoint để responsive
2. **Colors**: `text-{color}`, `bg-{color}`, `bg-opacity-{25/50/75}` — không cần CSS riêng
3. **Display responsive**: `d-none d-md-block` (ẩn mobile), `d-block d-md-none` (hiện mobile)
4. **Flexbox**: `d-flex` + `justify-content-*` + `align-items-*` + `gap-*` — layout linh hoạt
5. **`d-none` ≠ `invisible`** — chiếm chỗ hay không là khác biệt quan trọng

---

## 10. 📎 Phụ lục: Complete Utility Quick Reference

### Spacing — `m/p` + `t/b/s/e/x/y` + `0-5/auto`

| Class | CSS | Pixels |
|-------|-----|--------|
| `m-0`, `p-0` | 0 | 0px |
| `m-1`, `p-1` | 0.25rem | 4px |
| `m-2`, `p-2` | 0.5rem | 8px |
| `m-3`, `p-3` | 1rem | 16px |
| `m-4`, `p-4` | 1.5rem | 24px |
| `m-5`, `p-5` | 3rem | 48px |
| `mx-auto` | margin: 0 auto | Căn giữa (cần width) |

### Typography

| Class | CSS | Dùng cho |
|-------|-----|----------|
| `fs-1` → `fs-6` | 2.5rem → 1rem | Font size |
| `fw-bold` | font-weight: 700 | In đậm |
| `fw-semibold` | font-weight: 600 | Semi-bold |
| `fst-italic` | font-style: italic | In nghiêng |
| `text-start/center/end` | text-align | Căn chữ |
| `text-uppercase` | text-transform: uppercase | IN HOA |
| `text-decoration-none` | text-decoration: none | Bỏ gạch chân |
| `text-truncate` | text-overflow: ellipsis | Cắt chữ dài... |

### Display & Visibility

| Class | CSS | Dùng cho |
|-------|-----|----------|
| `d-none` | display: none | Ẩn hoàn toàn |
| `d-block` | display: block | Block element |
| `d-flex` | display: flex | Flex container |
| `d-grid` | display: grid | Grid container |
| `d-inline` | display: inline | Inline element |
| `d-inline-block` | display: inline-block | Inline + width/height |
| `invisible` | visibility: hidden | Ẩn nhưng vẫn chiếm chỗ |
| `visible` | visibility: visible | Hiện |

### Responsive Display Patterns

```html
<!-- Ẩn mobile, hiện tablet+ -->
<div class="d-none d-md-block">

<!-- Hiện mobile, ẩn tablet+ -->
<div class="d-block d-md-none">

<!-- Flex trên desktop, block trên mobile -->
<div class="d-block d-lg-flex">

<!-- Ẩn trên mobile, hiện trên desktop -->
<div class="d-none d-lg-block">
```

### Flexbox Quick Reference

```html
<!-- Container -->
<div class="d-flex">                           <!-- flex container -->
<div class="d-flex flex-column">               <!-- stack dọc -->
<div class="d-flex flex-wrap">                 <!-- wrap xuống dòng -->

<!-- Justify (ngang) -->
<div class="d-flex justify-content-start">     <!-- trái -->
<div class="d-flex justify-content-center">    <!-- giữa -->
<div class="d-flex justify-content-end">       <!-- phải -->
<div class="d-flex justify-content-between">   <!-- hai đầu -->
<div class="d-flex justify-content-around">    <!-- đều nhau -->

<!-- Align (dọc) -->
<div class="d-flex align-items-start">         <!-- trên -->
<div class="d-flex align-items-center">        <!-- giữa -->
<div class="d-flex align-items-end">           <!-- dưới -->

<!-- Item -->
<div class="flex-grow-1">                      <!-- chiếm hết space -->
<div class="flex-shrink-0">                    <!-- không co -->
<div class="ms-auto">                          <!-- đẩy sang phải -->
```

### Borders & Shadows

| Class | CSS | Dùng cho |
|-------|-----|----------|
| `border` | 1px solid #dee2e6 | Viền nhẹ |
| `border-0` | border: 0 | Bỏ viền |
| `border-primary` | border-color: primary | Viền màu |
| `rounded` | border-radius: 0.25rem | Bo nhẹ |
| `rounded-3` | border-radius: 0.5rem | Bo vừa |
| `rounded-pill` | border-radius: 50rem | Pill shape |
| `rounded-circle` | border-radius: 50% | Hình tròn |
| `shadow-sm` | box-shadow nhỏ | Bóng nhẹ |
| `shadow` | box-shadow vừa | Bóng mặc định |
| `shadow-lg` | box-shadow lớn | Bóng đậm |

---

## 11. ♿ Accessibility Utilities

```html
<!-- ✅ Visually hidden nhưng screen reader vẫn đọc -->
<span class="visually-hidden">Nội dung chỉ dành cho screen reader</span>

<!-- ✅ Focus visible khi dùng Tab (không dùng chuột) -->
<button class="btn btn-primary focus-ring">Button</button>

<!-- ✅ Skip link (ẩn, hiện khi Tab) -->
<a href="#main" class="visually-hidden-focusable">Skip to main content</a>

<!-- ✅ Text contrast: luôn đảm bảo đủ contrast ratio -->
<!-- ❌ ĐỪNG: text-white trên bg-warning (contrast thấp) -->
<!-- ✅ NÊN: text-dark trên bg-warning -->
<p class="bg-warning text-dark p-2">Cảnh báo quan trọng</p>

<!-- ✅ ARIA live region cho dynamic content -->
<div class="d-none" aria-live="polite" id="status">
    Đã thêm vào giỏ hàng
</div>
```

**Contrast Ratio tối thiểu (WCAG 2.1):**
- Text thường: **4.5:1**
- Text lớn (≥18pt bold, ≥24pt): **3:1**
- F12 → Lighthouse → Accessibility → kiểm tra contrast

---

## 12. 🇻🇳 Vietnamese-Context Examples

```html
<!-- Shopee-style product card -->
<div class="card shadow-sm border-0">
    <div class="position-relative">
        <img src="phone.jpg" class="card-img-top" alt="iPhone 15 Pro Max 256GB">
        <span class="position-absolute top-0 start-0 m-2 badge bg-danger">-16%</span>
    </div>
    <div class="card-body p-2">
        <h6 class="card-title text-truncate mb-1">iPhone 15 Pro Max 256GB Titan Tự Nhiên</h6>
        <div class="d-flex align-items-center gap-2 mb-1">
            <span class="fw-bold text-danger fs-6">25.990.000đ</span>
            <small class="text-muted text-decoration-line-through">30.990.000đ</small>
        </div>
        <div class="d-flex align-items-center gap-1">
            <span class="text-warning small">★★★★★</span>
            <small class="text-muted">(1.234)</small>
            <span class="badge bg-info text-dark ms-auto small">Hà Nội</span>
        </div>
    </div>
</div>

<!-- VnExpress-style news card -->
<article class="card border-0 shadow-sm">
    <div class="row g-0">
        <div class="col-4">
            <img src="news.jpg" class="img-fluid rounded-start h-100 object-fit-cover" alt="Tin tức">
        </div>
        <div class="col-8">
            <div class="card-body py-2 px-3">
                <h6 class="card-title mb-1">FPT Software tuyển 500 lập trình viên React</h6>
                <p class="card-text small text-muted mb-1">Công ty FPT Software thông báo tuyển dụng lớn...</p>
                <small class="text-muted">2 giờ trước · Tin tức</small>
            </div>
        </div>
    </div>
</article>
```

---

## 10. ➡️ Next Lesson Bridge

*"Trang web Bootstrap xong nhưng màu xanh mặc định Bootstrap — khác brand của khách hàng," Minh nói. "Đổi màu nút thủ công từng cái thì mãi không xong."*

*"Không cần. 1 dòng SASS: `$primary: #e63946`. Build lại → toàn bộ website đổi màu. Đó là SASS Customization," anh Hùng nói. "Đây mới là cách Bootstrap được dùng ở công ty thật."*

**→ [Bài 05: Customization](../05_customization/05_customization.md) — SASS variables: đổi toàn bộ brand color bằng 1 dòng code.**
