# 🟦 TUẦN 4B - BÀI 02 (CSS FRAMEWORKS)
# **BOOTSTRAP 5 — GRID SYSTEM**

---

## 0. 🎬 Opening Hook

*Minh hỏi: "Tại sao Bootstrap dùng 12 cột? Sao không 10 hay 16?"*

*Anh Hùng: "12 chia được cho 2, 3, 4, 6 — tất cả đều số nguyên. Như pizza 12 miếng: 2 người chia 6+6, 3 người 4+4+4, 4 người 3+3+3+3. Dùng 10 thì chia 3 người → 3.33 cột — không chia được."*

*Minh: "Thực ra... CSS Flexbox và Grid không cần đếm 12 cột. Bootstrap Grid = Flexbox wrapper với 12-column convention. Học Flexbox trước → hiểu Bootstrap sâu hơn."*

*"Đúng," anh Hùng gật đầu. "Grid System là abstraction trên Flexbox. Hiểu Flexbox → dùng Bootstrap Grid không cần thuộc bảng 12 cột, tự suy ra được."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Grid System là **trái tim của Bootstrap**. 80% layout web có thể xây bằng Grid System:
- E-commerce: sidebar + product grid
- Blog: article + sidebar
- Dashboard: cards, charts
- Landing page: hero, features, testimonials

Nắm Grid = nắm cách đặt mọi element trên màn hình ở mọi kích thước.

---

## 2. 🌐 Big Picture — Grid System hoạt động thế nào?

```
GRID SYSTEM = FLEXBOX + 12-COLUMN CONVENTION

Màn hình (viewport)
┌─────────────────────────────────────────────────────────┐
│                    Container (max-width)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │                      Row                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │   │
│  │  │  col-4   │  │  col-4   │  │    col-4     │   │   │
│  │  │ (33.33%) │  │ (33.33%) │  │   (33.33%)   │   │   │
│  │  └──────────┘  └──────────┘  └──────────────┘   │   │
│  │  ← Tổng: 4+4+4 = 12 cột (100%) ─────────────    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

QUAN HỆ BẮT BUỘC: Container → Row → Col
(thiếu bất kỳ lớp nào → layout bị vỡ)
```

**6 Breakpoints — Responsive theo màn hình:**

| Breakpoint | Prefix | Min-width | Thiết bị |
|---|---|---|---|
| Extra small | *(none)* | < 576px | Mobile nhỏ |
| Small | `sm` | ≥ 576px | Mobile lớn |
| Medium | `md` | ≥ 768px | Tablet |
| Large | `lg` | ≥ 992px | Desktop |
| Extra large | `xl` | ≥ 1200px | Desktop lớn |
| XXL | `xxl` | ≥ 1400px | Màn hình rộng |

---

## 3. ⚙️ Core Technical Truth

### Container — Lớp bọc ngoài cùng

```html
<!-- Container: max-width + center + padding -->
<div class="container">
    <!-- Tự động căn giữa, có max-width theo breakpoint -->
</div>

<!-- Container-fluid: luôn full width -->
<div class="container-fluid">
    <!-- Full width mọi kích thước — dùng cho hero/footer/banner -->
</div>

<!-- Container theo breakpoint (mới trong BS5) -->
<div class="container-md">
    <!-- Full width dưới md, có max-width từ md trở lên -->
</div>
```

**Max-width của `container` theo breakpoint:**
- Mobile (< 576px): 100% (full)
- ≥ 576px: 540px
- ≥ 768px: 720px
- ≥ 992px: 960px
- ≥ 1200px: 1140px
- ≥ 1400px: 1320px

---

### Cú pháp cơ bản: `col-{breakpoint}-{size}`

```html
<!-- Layout 2 cột bằng nhau: Desktop nằm ngang, Mobile xếp chồng -->
<div class="container">
    <div class="row">
        <div class="col-md-6">Cột trái (50% từ md trở lên)</div>
        <div class="col-md-6">Cột phải (50% từ md trở lên)</div>
    </div>
</div>

<!-- Layout 3 cột: Desktop 3 cột, Tablet 2 cột, Mobile 1 cột -->
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">Cột 1</div>
        <div class="col-12 col-md-6 col-lg-4">Cột 2</div>
        <div class="col-12 col-md-6 col-lg-4">Cột 3</div>
    </div>
</div>
```

**Đọc `col-12 col-md-6 col-lg-4` như thế nào:**
- Mobile (mặc định): `col-12` → 12/12 = 100% width
- ≥ 768px (`md`): `col-md-6` → 6/12 = 50% width
- ≥ 992px (`lg`): `col-lg-4` → 4/12 = 33.33% width

---

### Patterns phổ biến nhất

**2 cột equal:**
```html
<div class="row">
    <div class="col-md-6">Nội dung A</div>
    <div class="col-md-6">Nội dung B</div>
</div>
```

**Sidebar + Main (25%/75%):**
```html
<div class="row">
    <div class="col-md-3">
        <aside>Sidebar</aside>
    </div>
    <div class="col-md-9">
        <main>Nội dung chính</main>
    </div>
</div>
<!-- Kiểm tra: 3 + 9 = 12 ✅ -->
```

**4 cards equal (product grid):**
```html
<div class="row g-3">  <!-- g-3 = gap giữa các cột -->
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">Card 1</div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">Card 2</div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">Card 3</div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">Card 4</div>
    </div>
</div>
<!-- Mobile: 1 cột | Tablet: 2 cột | Desktop: 4 cột -->
```

---

### Tính năng nâng cao

**Auto-sizing — Tự động chia đều:**
```html
<div class="row">
    <div class="col">Tự động</div>  <!-- 1/3 -->
    <div class="col">Tự động</div>  <!-- 1/3 -->
    <div class="col">Tự động</div>  <!-- 1/3 -->
</div>
<!-- 3 col không có số → tự chia đều = 33.33% mỗi cột -->
```

**Offset — Tạo khoảng trống bên trái:**
```html
<div class="row">
    <div class="col-md-4 offset-md-4">
        <!-- 4 cột trống + 4 cột nội dung → căn giữa -->
    </div>
</div>
```

**Row cols — Chỉ định số cột trên row:**
```html
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
    <div class="col"><div class="card">Item</div></div>
    <div class="col"><div class="card">Item</div></div>
    <div class="col"><div class="card">Item</div></div>
    <div class="col"><div class="card">Item</div></div>
</div>
<!-- Cách khác của product grid — gọn hơn, cột con không cần class -->
```

**Nested Grid:**
```html
<div class="row">
    <div class="col-md-8">
        Main Content
        <!-- Grid lồng trong grid: 12 cột được tính lại trong col-md-8 -->
        <div class="row">
            <div class="col-md-6">Nested A (50% của col-md-8)</div>
            <div class="col-md-6">Nested B (50% của col-md-8)</div>
        </div>
    </div>
    <div class="col-md-4">Sidebar</div>
</div>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Container → Row → Col: thứ tự bắt buộc. Thiếu một lớp = layout vỡ.**
> **Tổng số cột trong 1 Row phải = 12. Lớn hơn 12 → cột thừa xuống dòng mới.**

---

## 5. 🏭 Real-world Layer

### Layout E-commerce hoàn chỉnh

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cửa hàng</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<!-- Navbar Full Width -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">Shop</a>
    </div>
</nav>

<!-- Hero Banner Full Width -->
<div class="container-fluid bg-primary text-white py-5">
    <div class="container text-center">
        <h1>Sale 11.11 — Giảm 50%</h1>
    </div>
</div>

<!-- Main Layout: Sidebar + Products -->
<div class="container my-4">
    <div class="row">

        <!-- Sidebar: 3/12 = 25% trên desktop, ẩn trên mobile -->
        <div class="col-lg-3 d-none d-lg-block">
            <h5>Danh mục</h5>
            <ul class="list-group">
                <li class="list-group-item active">Điện thoại</li>
                <li class="list-group-item">Laptop</li>
                <li class="list-group-item">Tai nghe</li>
            </ul>
        </div>

        <!-- Products: 9/12 trên desktop, full trên mobile -->
        <div class="col-12 col-lg-9">
            <div class="row g-3">
                <!-- Product Card -->
                <div class="col-12 col-sm-6 col-xl-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h6 class="card-title">iPhone 15 Pro</h6>
                            <p class="text-danger fw-bold">25.990.000đ</p>
                            <button class="btn btn-primary w-100">Mua ngay</button>
                        </div>
                    </div>
                </div>
                <!-- Thêm cards tương tự -->
            </div>
        </div>

    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Blog Layout hoàn chỉnh (25 phút)

Tạo layout Blog với cấu trúc:
- Header full width (navbar)
- Content: Article (70%) + Sidebar (30%) trên desktop, xếp chồng trên mobile
- Footer full width

```html
<!-- Gợi ý cấu trúc -->
<!-- Header -->
<header class="container-fluid bg-primary text-white py-3">
    <div class="container">
        <h1>My Blog</h1>
    </div>
</header>

<!-- Main -->
<main class="container my-4">
    <div class="row">
        <!-- Article: TODO điền col classes -->
        <div class="???">
            <article>
                <h2>Bài viết 1</h2>
                <p>Nội dung...</p>
            </article>
        </div>
        <!-- Sidebar: TODO điền col classes -->
        <div class="???">
            <aside>
                <h4>Bài viết phổ biến</h4>
            </aside>
        </div>
    </div>
</main>

<!-- Footer -->
<footer class="container-fluid bg-dark text-white py-3">
    <p class="text-center mb-0">© 2026 My Blog</p>
</footer>
```

**Kiểm tra:** Resize browser (DevTools → Device toolbar) — Article và Sidebar có xếp đúng không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Thiếu Row thì cột vẫn nằm ngang"** | Col dùng `float` hoặc `flex` — thiếu Row thì không có flex container → cột không nằm ngang trên desktop |
| **"col-md-6 chỉ áp dụng cho màn hình ≥ 768px"** | Đúng NHƯNG: Bootstrap Mobile-First → `col-md-6` áp dụng cho **md và tất cả breakpoint lớn hơn** (lg, xl, xxl). Phải thêm `col-12` để override lại trên mobile |
| **"Tổng cột phải đúng bằng 12"** | Không bắt buộc — tổng < 12 = có khoảng trắng bên phải. Tổng > 12 = cột thừa xuống dòng (wrapping). Cả hai đều hợp lệ về code |
| **"container-fluid tốt hơn container"** | Tùy dùng. `container` có max-width → nội dung không quá rộng trên màn hình lớn (tốt cho readability). `container-fluid` dùng cho backgrounds/banners cần full-width |
| **"Nested grid thì cột con tính theo 12 cột toàn màn hình"** | Cột con tính theo **12 cột của cột cha**. Ví dụ: col cha chiếm 8/12 → nested `col-6` = 50% của 8 cột, không phải 50% toàn màn hình |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Viết class HTML cho cột chiếm 100% trên mobile, 50% trên tablet (≥ 768px), 33% trên desktop (≥ 992px).
2. `container` và `container-fluid` khác nhau thế nào? Khi nào dùng cái nào?
3. `g-3` trong `<div class="row g-3">` có nghĩa là gì?

### Câu hỏi áp dụng:

4. Tại sao code sau bị lỗi layout? Sửa lại:
   ```html
   <div class="container">
       <div class="col-md-6">Cột 1</div>
       <div class="col-md-6">Cột 2</div>
   </div>
   ```
5. Bạn muốn tạo layout: sidebar 25% bên trái, main content 75% bên phải trên desktop. Trên mobile, sidebar ẩn đi, chỉ hiện main content. Viết HTML Bootstrap.

<details>
<summary>👁️ Xem đáp án</summary>

1. `class="col-12 col-md-6 col-lg-4"` — col-12 (default mobile), col-md-6 (tablet, 6/12=50%), col-lg-4 (desktop, 4/12≈33%).
2. **`container`** có max-width theo breakpoint → nội dung không trải hết màn hình, tự căn giữa. **`container-fluid`** luôn 100% width. Dùng `container` cho nội dung text (dễ đọc hơn), `container-fluid` cho background sections, hero images, footer.
3. `g-3` là **gutter** (khoảng cách giữa các cột trong row) = `gap: 1rem` (3 × 0.25rem = nhân với spacer). `g-3` thay thế cách cũ dùng `mb-3` trên từng cột.
4. Thiếu `<div class="row">`. Code đúng:
   ```html
   <div class="container">
       <div class="row">
           <div class="col-md-6">Cột 1</div>
           <div class="col-md-6">Cột 2</div>
       </div>
   </div>
   ```
5. ```html
   <div class="row">
       <!-- Sidebar: 3/12 trên desktop, ẩn trên mobile -->
       <div class="col-lg-3 d-none d-lg-block">
           <aside>Sidebar</aside>
       </div>
       <!-- Main: 9/12 trên desktop, full width trên mobile -->
       <div class="col-12 col-lg-9">
           <main>Nội dung chính</main>
       </div>
   </div>
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Container → Row → Col** — ba lớp bắt buộc, thiếu một lớp = layout vỡ
2. **`col-{bp}-{n}`** — n cột (1-12), áp dụng từ breakpoint bp **trở lên**
3. **Mobile-First**: Luôn bắt đầu bằng `col-12` cho mobile, thêm breakpoint lớn hơn
4. **Tổng cột > 12** = wrap xuống dòng. **Tổng < 12** = khoảng trắng bên phải
5. **`g-3`** trên Row = gap giữa các cột. **`d-none d-lg-block`** = ẩn trên mobile, hiện trên desktop

---

## 10. ➡️ Next Lesson Bridge

*"Grid xong, layout ổn," Minh nói. "Nhưng trang chỉ có layout, chưa có gì để hiển thị. Cần Navbar, Card, Form, Modal."*

*"Đó là Components," anh Hùng nói. "Bootstrap có 20+ components, tất cả đã test cross-browser. Em chỉ cần copy, customize màu, là xong."*

**→ [Bài 03: Components](../03_components/03_components.md) — Buttons, Cards, Navbar, Forms, Modal: bộ 20 vũ khí của Bootstrap.**
