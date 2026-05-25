# Exercise 1.3 — Portfolio Grid Gallery

## 🎬 Opening Scenario

*Designer muốn portfolio gallery với grid layout, hover effects, và lightbox xem ảnh lớn — tất cả chỉ dùng HTML/CSS (không JavaScript).*

---

## 📋 Requirements

### 1. Portfolio Grid

```html
<section id="portfolio" class="portfolio-section">
    <div class="container">
        <h2 class="section-title">My Portfolio</h2>
        <div class="portfolio-filters">
            <button class="filter-btn active">All</button>
            <button class="filter-btn">Web</button>
            <button class="filter-btn">Mobile</button>
            <button class="filter-btn">Design</button>
        </div>
        <div class="portfolio-grid">
            <div class="portfolio-item" data-category="web">
                <img src="https://picsum.photos/400/300?random=1" alt="Project 1">
                <div class="portfolio-overlay">
                    <h3>E-Commerce Website</h3>
                    <p>React + Node.js</p>
                </div>
            </div>
            <!-- Thêm 5 items khác với random=2,3,4,5,6 -->
        </div>
    </div>
</section>
```

**Yêu cầu:**
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- 6 portfolio items (3 web, 2 mobile, 1 design)
- Hover: image zoom + overlay với text

### 2. CSS-Only Lightbox

**Yêu cầu:**
- Click vào image → hiển thị fullscreen overlay
- Dùng CSS `:target` selector (không JavaScript)
- Close button để đóng lightbox

```html
<!-- Lightbox structure -->
<a href="#lightbox-1" class="lightbox-link">
    <img src="..." alt="...">
</a>

<div id="lightbox-1" class="lightbox">
    <img src="..." alt="...">
    <a href="#" class="lightbox-close">&times;</a>
</div>
```

---

## 🪜 Step-by-Step Guide — Từng bước một

### Bước 1: HTML Portfolio Grid (10 phút)

Thêm vào `<main>` (sau skills section):

```html
<!-- ===== PORTFOLIO SECTION ===== -->
<section id="portfolio" class="portfolio-section">
    <div class="container">
        <h2 class="section-title">My Portfolio</h2>
        <div class="portfolio-grid">
            <!-- Item 1 -->
            <div class="portfolio-item" data-category="web">
                <img src="https://picsum.photos/400/300?random=1" alt="E-Commerce Website">
                <div class="portfolio-overlay">
                    <h3>E-Commerce Website</h3>
                    <p>React + Node.js</p>
                </div>
            </div>
            <!-- Item 2-6: Tương tự, đổi random=2,3,4,5,6 và data-category -->
            <div class="portfolio-item" data-category="mobile">
                <img src="https://picsum.photos/400/300?random=2" alt="Fitness App">
                <div class="portfolio-overlay">
                    <h3>Fitness App</h3>
                    <p>React Native</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="web">
                <img src="https://picsum.photos/400/300?random=3" alt="Blog Platform">
                <div class="portfolio-overlay">
                    <h3>Blog Platform</h3>
                    <p>Vue.js + Firebase</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="design">
                <img src="https://picsum.photos/400/300?random=4" alt="Brand Identity">
                <div class="portfolio-overlay">
                    <h3>Brand Identity</h3>
                    <p>Figma + Illustrator</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="web">
                <img src="https://picsum.photos/400/300?random=5" alt="Task Manager">
                <div class="portfolio-overlay">
                    <h3>Task Manager</h3>
                    <p>Angular + MongoDB</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="mobile">
                <img src="https://picsum.photos/400/300?random=6" alt="Food Delivery">
                <div class="portfolio-overlay">
                    <h3>Food Delivery</h3>
                    <p>Flutter + Dart</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

> **💡 `data-category` dùng để làm gì?** Ở Session 1 chỉ là attribute. Đến Session 3 (JavaScript), bạn sẽ dùng `data-category` để filter items khi click nút "Web", "Mobile", "Design".

---

### Bước 2: Style Portfolio Grid (10 phút)

```css
/* ===== PORTFOLIO SECTION ===== */
.portfolio-section {
    padding: 80px 0;
    background: var(--color-light);
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 cột bằng nhau */
    gap: 1.5rem;
}

/* ===== PORTFOLIO ITEM ===== */
.portfolio-item {
    position: relative;         /* Để overlay absolute positioning */
    overflow: hidden;           /* Ẩn phần ảnh bị zoom ra ngoài */
    border-radius: 12px;
    cursor: pointer;
}

.portfolio-item img {
    width: 100%;
    aspect-ratio: 4/3;          /* Tỷ lệ cố định cho mọi ảnh */
    object-fit: cover;
    transition: transform 0.4s ease;
    display: block;             /* Xóa khoảng trắng dưới ảnh */
}

.portfolio-item:hover img {
    transform: scale(1.1);      /* Zoom ảnh khi hover */
}

/* ===== OVERLAY — Hiện khi hover ===== */
.portfolio-overlay {
    position: absolute;
    inset: 0;                   /* top:0 right:0 bottom:0 left:0 */
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;  /* Text ở dưới cùng */
    padding: 1.5rem;
    color: white;
    opacity: 0;                 /* Ban đầu ẩn */
    transition: opacity 0.4s ease;
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;                 /* Hiện khi hover */
}

.portfolio-overlay h3 {
    font-size: 1.25rem;
    margin-bottom: 4px;
}

.portfolio-overlay p {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
    .portfolio-grid {
        grid-template-columns: repeat(2, 1fr);  /* 2 cột tablet */
    }
}

@media (max-width: 640px) {
    .portfolio-grid {
        grid-template-columns: 1fr;             /* 1 cột mobile */
    }
}
```

> **💡 `inset: 0` là gì?** Viết tắt của `top: 0; right: 0; bottom: 0; left: 0;` — kéo overlay phủ kín toàn bộ parent.

---

### Bước 3: CSS-Only Lightbox (10 phút)

**3a. Thêm link bao quanh mỗi ảnh:**

```html
<!-- Bọc mỗi portfolio item trong anchor tag -->
<a href="#lightbox-1" class="portfolio-item" data-category="web">
    <img src="https://picsum.photos/400/300?random=1" alt="Project 1">
    <div class="portfolio-overlay">
        <h3>E-Commerce Website</h3>
        <p>React + Node.js</p>
    </div>
</a>
```

**3b. Thêm lightbox HTML (cuối `<body>`):**

```html
<!-- ===== LIGHTBOX OVERLAYS ===== -->
<div id="lightbox-1" class="lightbox">
    <div class="lightbox-content">
        <img src="https://picsum.photos/800/600?random=1" alt="Project 1">
        <a href="#!" class="lightbox-close">&times;</a>
    </div>
</div>
<!-- Lặp lại cho lightbox-2 đến lightbox-6 -->
```

**3c. Style lightbox:**

```css
/* ===== CSS-ONLY LIGHTBOX ===== */
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;       /* Không chặn click khi ẩn */
    transition: opacity 0.3s ease;
}

/* :target = khi URL có #lightbox-1 → hiện lightbox */
.lightbox:target {
    opacity: 1;
    pointer-events: auto;       /* Cho phép click khi hiện */
}

.lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 8px;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    text-decoration: none;
}
```

> **💡 `:target` hoạt động thế nào?** Khi URL là `page.html#lightbox-1`, browser tìm element có `id="lightbox-1"` và áp dụng CSS `:target`. Click link `href="#!"` (hoặc `href="#"`) xóa hash → lightbox ẩn.

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Grid không chia 3 cột | Dùng `repeat(auto-fill)` thay vì `repeat(3, 1fr)` | Dùng `repeat(3, 1fr)` cho cố định, `repeat(auto-fill, minmax(300px, 1fr))` cho linh hoạt |
| Overlay không hiện | Thiếu `opacity: 0` ban đầu + `transition` | Phải set `opacity: 0` và `transition: opacity 0.4s` |
| Ảnh bị méo | Thiếu `object-fit: cover` | Thêm `object-fit: cover` + `aspect-ratio: 4/3` |
| Lightbox không mở | Sai `href` hoặc `id` không khớp | Đảm bảo `href="#lightbox-1"` khớp với `id="lightbox-1"` |
| Lightbox không đóng | `href="#!"` không hợp lệ | Dùng `href="#!"` hoặc `href="#"` (nhưng `#` scroll lên đầu trang) |
| Ảnh zoom bị tràn | Thiếu `overflow: hidden` trên parent | Phải có `overflow: hidden` trên `.portfolio-item` |

---

## 🎨 Design Specs

### Grid Layout
```css
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
```

### Hover Effect
```css
.portfolio-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.portfolio-item img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.portfolio-item:hover img {
    transform: scale(1.1);
}

.portfolio-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;
}
```

### CSS Lightbox
```css
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 2000;
}

/* Show when targeted */
.lightbox:target {
    opacity: 1;
    visibility: visible;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: white;
    text-decoration: none;
}
```

---

## 🐛 Hints

### Image Aspect Ratio
```css
.portfolio-item img {
    aspect-ratio: 4/3;
    width: 100%;
    object-fit: cover;
}
```

### Overlay Gradient
```css
.portfolio-overlay {
    background: linear-gradient(
        to top,
        rgba(30, 41, 59, 0.95) 0%,
        rgba(30, 41, 59, 0.6) 50%,
        transparent 100%
    );
}
```

### Filter Buttons (CSS-only hover)
```css
.filter-btn {
    background: transparent;
    border: 2px solid var(--color-primary);
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--color-primary);
    color: white;
}
```

---

## ✅ Success Criteria

- [ ] Grid responsive (3/2/1 columns)
- [ ] Hover zoom effect hoạt động
- [ ] Overlay hiện khi hover
- [ ] CSS lightbox mở khi click
- [ ] Lightbox đóng khi click close
- [ ] 6 portfolio items với categories

---

## 📝 Commit Messages Expected

```
[FEATURE] Build portfolio grid layout
[FEATURE] Add hover zoom effects
[FEATURE] Implement CSS-only lightbox
```

---

**← [ Quay lại Session 1](../README.md)**