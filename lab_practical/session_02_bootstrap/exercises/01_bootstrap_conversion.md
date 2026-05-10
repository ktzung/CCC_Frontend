# Exercise 2.1 — Bootstrap Conversion

## 🎬 Opening Scenario

*Designer gửi mockup Portfolio v1 hoàn chỉnh. Bạn cần chuyển từ pure HTML/CSS sang Bootstrap 5 mà vẫn giữ nguyên design và responsive behavior.*

---

## 📋 Requirements

### 1. Add Bootstrap CDN

```html
<!-- Add in <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Add before </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. Convert Grid System

**Before (CSS Grid):**
```css
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
```

**After (Bootstrap):**
```html
<div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
        <!-- Portfolio item -->
    </div>
</div>
```

### 3. Convert Navigation

```html
<!-- Bootstrap Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
        <a class="navbar-brand" href="#">YourName</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                <!-- More nav items -->
            </ul>
        </div>
    </div>
</nav>
```

### 4. Convert Hero Section

```html
<section class="vh-100 d-flex align-items-center justify-content-center text-center">
    <div class="container">
        <h1 class="display-1 fw-bold">Hi, I'm [Name]</h1>
        <p class="lead mb-4">Full-Stack Developer | UI Designer</p>
        <a href="#portfolio" class="btn btn-primary btn-lg">View My Work</a>
    </div>
</section>
```

---

## 🪜 Step-by-Step Guide — Từng bước một

> **Nguyên tắc:** Đừng xóa code cũ ngay. Tạo file mới → copy Bootstrap version → so sánh → xóa cũ.

### Bước 1: Setup Bootstrap CDN (3 phút)

1. Tạo thư mục mới `portfolio_bootstrap/`
2. Copy `index.html` từ Session 1
3. Thêm CDN vào `<head>`:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
```
4. Thêm CDN trước `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

**Test ngay:** Refresh → trang có style khác (font, spacing) là Bootstrap đã load.

> **💡 Tại sao thêm `bootstrap-icons`?** Bootstrap Icons cung cấp 1,800+ icons dạng font. Dùng `<i class="bi bi-github"></i>` thay vì SVG code dài.

---

### Bước 2: Convert Navbar (10 phút)

**Trước (CSS thuần):**
```html
<header>
    <div class="logo">YourName</div>
    <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
    </nav>
</header>
```

**Sau (Bootstrap):**
```html
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold text-primary" href="#">YourName</a>
        <button class="navbar-toggler" type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
                <li class="nav-item"><a class="nav-link" href="#portfolio">Portfolio</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
```

**Giải thích từng class:**
- `navbar` → base style cho navigation
- `navbar-expand-lg` → navbar collapse trên mobile, expand trên desktop (≥992px)
- `sticky-top` → dính trên cùng (thay vì `position: sticky`)
- `ms-auto` → đẩy nav items sang phải (margin-start: auto)
- `data-bs-toggle="collapse"` → JavaScript behavior cho mobile toggle
- `data-bs-target="#navbarNav"` → id của div cần collapse

**Test ngay:** Resize browser nhỏ → hamburger icon hiện → click → menu mở ra.

---

### Bước 3: Convert Hero Section (10 phút)

**Trước:**
```html
<section class="hero">
    <h1>Hi, I'm [Name]</h1>
    <p>Full-Stack Developer</p>
    <a href="#portfolio" class="cta-button">View My Work</a>
</section>
```

**Sau (Bootstrap utilities):**
```html
<section class="min-vh-100 d-flex align-items-center justify-content-center text-center text-white"
         style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="container">
        <h1 class="display-2 fw-bold mb-3">
            Hi, I'm <span class="text-warning">Your Name</span>
        </h1>
        <p class="lead mb-4 opacity-75">Full-Stack Developer | UI Designer | Problem Solver</p>
        <a href="#portfolio" class="btn btn-light btn-lg px-5 py-3 fw-semibold">
            View My Work →
        </a>
    </div>
</section>
```

**Giải thích Bootstrap classes:**
- `min-vh-100` → `min-height: 100vh` (full viewport)
- `d-flex` → `display: flex`
- `align-items-center` → căn giữa dọc
- `justify-content-center` → căn giữa ngang
- `display-2` → font-size rất lớn (hero heading)
- `fw-bold` → `font-weight: bold`
- `opacity-75` → `opacity: 0.75`
- `btn-light` → button nền trắng
- `btn-lg` → button lớn
- `px-5 py-3` → padding ngang lớn, padding dọc trung bình

---

### Bước 4: Convert Portfolio Grid (10 phút)

**Trước:**
```html
<div class="portfolio-grid">
    <div class="portfolio-item">...</div>
    <div class="portfolio-item">...</div>
    <div class="portfolio-item">...</div>
</div>
```

**Sau (Bootstrap Grid):**
```html
<div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 overflow-hidden">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">E-Commerce Website</h5>
                <p class="card-text text-muted">React + Node.js</p>
            </div>
        </div>
    </div>
    <!-- Thêm 5 items tương tự -->
</div>
```

**Giải thích:**
- `row g-4` → Bootstrap row với gutter (gap) 1.5rem
- `col-12` → full width trên mobile
- `col-md-6` → 2 cột trên tablet (≥768px)
- `col-lg-4` → 3 cột trên desktop (≥992px)
- `card h-100` → card chiều cao bằng nhau (height: 100%)
- `shadow-sm` → bóng nhẹ
- `border-0` → không viền

> **💡 `h-100` rất quan trọng!** Không có `h-100`, mỗi card có chiều cao khác nhau → grid không đều. `h-100` + `row` = cards bằng nhau.

---

### Bước 5: Convert About + Skills (10 phút)

**About section — Bootstrap Grid:**
```html
<section id="about" class="py-5">
    <div class="container">
        <h2 class="text-center mb-5">About Me</h2>
        <div class="row align-items-center g-5">
            <div class="col-lg-5 text-center">
                <img src="..." class="rounded-circle img-fluid" alt="Profile" style="max-width: 300px;">
            </div>
            <div class="col-lg-7">
                <p class="lead">I'm a passionate developer...</p>
                <p>Specialized in Frontend development...</p>
            </div>
        </div>
    </div>
</section>
```

**Skills section — Bootstrap Progress:**
```html
<section id="skills" class="py-5 bg-light">
    <div class="container">
        <h2 class="text-center mb-5">My Skills</h2>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="mb-4">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="fw-semibold">HTML5</span>
                        <span class="text-primary fw-semibold">95%</span>
                    </div>
                    <div class="progress" style="height: 12px;">
                        <div class="progress-bar bg-primary" style="width: 95%"></div>
                    </div>
                </div>
            </div>
            <!-- Thêm CSS, JS, React -->
        </div>
    </div>
</section>
```

> **💡 Bootstrap `progress` component** thay thế toàn bộ custom CSS progress bar bạn viết ở Session 1. Đây là sức mạnh của framework — có sẵn components.

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Navbar không collapse | Thiếu `data-bs-toggle` và `data-bs-target` | Phải có cả 2 attribute + id khớp |
| Navbar toggle không hoạt động | Thiếu Bootstrap JS CDN | Phải thêm `bootstrap.bundle.min.js` trước `</body>` |
| Cards không bằng nhau | Thiếu `h-100` trên card | Thêm `class="card h-100"` |
| Grid không responsive | Dùng `col-4` thay vì `col-md-6 col-lg-4` | Phải dùng breakpoint prefixes |
| Bootstrap classes không hoạt động | CDN link sai hoặc không kết nối mạng | Kiểm tra Network tab trong DevTools |
| `rounded-circle` không tròn | Ảnh không vuông | Đảm bảo ảnh có tỷ lệ 1:1 hoặc thêm `width` = `height` |

---

## 🎨 Bootstrap Classes Reference

| Purpose | Bootstrap Class |
|---------|-----------------|
| Container | `.container`, `.container-fluid` |
| Grid | `.row`, `.col-12`, `.col-md-6`, `.col-lg-4` |
| Spacing | `.m-3`, `.p-3`, `.mt-4`, `.mb-4` |
| Typography | `.display-1`, `.fw-bold`, `.lead`, `.text-center` |
| Buttons | `.btn`, `.btn-primary`, `.btn-lg` |
| Colors | `.text-primary`, `.bg-light`, `.text-white` |
| Flex | `.d-flex`, `.align-items-center`, `.justify-content-center` |

---

## 🐛 Hints

### Navbar Toggle
```html
<!-- data-bs-target phải trùng với id của collapse div -->
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
```

### Grid Gutters
```html
<!-- Thêm g-4 (gap) vào row -->
<div class="row g-4">
```

### Container Breakpoints
```html
<!-- Container default: max-width theo breakpoint -->
<div class="container">        <!-- 1140px max -->
<div class="container-fluid"> <!-- 100% width -->
```

---

## ✅ Success Criteria

- [ ] Bootstrap CDN loaded
- [ ] Navbar collapse works on mobile
- [ ] Grid converted to Bootstrap cols
- [ ] Responsive breakpoints maintained
- [ ] 4 commits made

---

**← [ Quay lại Session 2](../README.md)**