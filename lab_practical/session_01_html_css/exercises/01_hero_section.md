# Exercise 1.1 — Header + Hero Section

## 🎬 Opening Scenario

*Bạn nhận được task đầu tiên: xây dựng phần header và hero cho portfolio cá nhân. Designer đã gửi mockup, nhưng bạn cần tự convert sang code HTML/CSS.*

---

## 📋 Requirements

### 1. Header (Navigation)

```html
<!-- Phần header cần có -->
<header>
    <div class="logo">YourName</div>
    <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
    </nav>
</header>
```

**Yêu cầu:**
- Sticky header (fixed at top when scrolling)
- Logo bên trái, nav links bên phải
- Nav links có hover effect (underline hoặc color change)
- Mobile: Hamburger menu toggle (dùng checkbox hack hoặc :hover)

### 2. Hero Section

```html
<section class="hero">
    <h1>Hi, I'm [Your Name]</h1>
    <p>Full-Stack Developer | UI Designer | Problem Solver</p>
    <a href="#portfolio" class="cta-button">View My Work</a>
</section>
```

**Yêu cầu:**
- Full viewport height (`100vh`)
- Background gradient hoặc hình ảnh
- Center content vertically và horizontally
- CTA button với hover effect (scale + shadow)

---

## 🪜 Step-by-Step Guide — Từng bước một

> **Nguyên tắc:** Đừng viết tất cả code rồi mới test. Viết 1 phần → test ngay → sửa → tiếp tục.

### Bước 1: Tạo project structure (5 phút)

```
portfolio/
├── index.html
└── css/
    └── styles.css
```

1. Mở VS Code → File → Open Folder → tạo thư mục `portfolio`
2. Tạo file `index.html`
3. Tạo thư mục `css/` → tạo file `css/styles.css`
4. Gõ `!` → Tab (Emmet) để tạo HTML boilerplate
5. Thêm `<link rel="stylesheet" href="css/styles.css">` vào `<head>`

**Test ngay:** Mở Live Server → trang trắng là OK.

**Commit:**
```bash
git init
git add .
git commit -m "[SETUP] Initialize project structure"
```

---

### Bước 2: CSS Variables + Reset (5 phút)

Mở `css/styles.css` và thêm:

```css
/* ===== CSS Variables — Đặt màu/font ở 1 chỗ ===== */
:root {
    --color-primary: #6366f1;    /* Indigo — màu chủ đạo */
    --color-secondary: #8b5cf6;  /* Purple — màu phụ */
    --color-dark: #1e293b;       /* Slate dark — chữ chính */
    --color-light: #f8fafc;      /* Slate light — nền */
    --color-text: #334155;       /* Slate text — chữ phụ */
    --font-main: 'Segoe UI', sans-serif;
}

/* ===== CSS Reset — Xóa mặc định browser ===== */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-main);
    color: var(--color-text);
    line-height: 1.6;
    background-color: var(--color-light);
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    max-width: 100%;
    height: auto;
}
```

> **💡 Tại sao dùng CSS Variables?** Vì khi muốn đổi màu chủ đạo từ tím sang xanh, bạn chỉ sửa **1 dòng** `--color-primary: #2563eb;` thay vì tìm kiếm và sửa 20 chỗ trong file CSS.

**Test ngay:** Refresh → font chữ thay đổi là OK.

**Commit:**
```bash
git commit -m "[STYLE] Add base CSS variables and reset"
```

---

### Bước 3: Header Navigation (15 phút)

**3a. Viết HTML header trước:**

```html
<body>
    <header>
        <div class="logo">YourName</div>
        <nav>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main>
        <!-- Hero section sẽ thêm ở bước 4 -->
    </main>
</body>
```

**3b. Style header — Từng property một:**

```css
/* ===== HEADER ===== */
header {
    display: flex;              /* Logo trái, nav phải */
    justify-content: space-between; /* Hai đầu */
    align-items: center;        /* Căn giữa dọc */
    padding: 16px 40px;         /* Khoảng cách trong */
    position: sticky;           /* Dính trên cùng khi scroll */
    top: 0;
    z-index: 1000;              /* Luôn nổi trên nội dung khác */
    background: var(--color-light);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
}

nav {
    display: flex;
    gap: 24px;                  /* Khoảng cách giữa các link */
}

nav a {
    font-weight: 500;
    color: var(--color-dark);
    position: relative;         /* Để tạo underline effect */
    transition: color 0.3s;
}

nav a:hover {
    color: var(--color-primary);
}

/* Underline effect khi hover */
nav a::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;                   /* Ban đầu: không có underline */
    height: 2px;
    background: var(--color-primary);
    transition: width 0.3s;
}

nav a:hover::after {
    width: 100%;                /* Khi hover: underline kéo dài */
}
```

> **💡 Tại sao `position: sticky` thay vì `fixed`?** `sticky` giữ header ở vị trí bình thường cho đến khi bạn scroll đến → header không che nội dung ban đầu. `fixed` luôn dính ngay từ đầu.

**Test ngay:**
1. Thêm nhiều nội dung giả vào `<main>` để trang đủ dài để scroll
2. Scroll xuống → header có dính trên cùng không?
3. Hover vào nav links → có underline effect không?

**Commit:**
```bash
git commit -m "[FEATURE] Implement header navigation"
```

---

### Bước 4: Hero Section (15 phút)

**4a. Viết HTML hero:**

```html
<main>
    <section class="hero">
        <h1>Hi, I'm <span class="highlight">Your Name</span></h1>
        <p>Full-Stack Developer | UI Designer | Problem Solver</p>
        <a href="#portfolio" class="cta-button">View My Work</a>
    </section>
</main>
```

**4b. Style hero section:**

```css
/* ===== HERO SECTION ===== */
.hero {
    min-height: 100vh;          /* Chiếm toàn bộ màn hình */
    display: flex;
    flex-direction: column;     /* Stack dọc: title → subtitle → button */
    justify-content: center;    /* Căn giữa dọc */
    align-items: center;        /* Căn giữa ngang */
    text-align: center;
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.hero h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 16px;
}

.hero h1 .highlight {
    color: #fbbf24;             /* Vàng — nổi bật tên */
}

.hero p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 32px;
}

/* CTA Button */
.cta-button {
    display: inline-block;
    padding: 14px 36px;
    background: white;
    color: var(--color-primary);
    font-weight: 600;
    border-radius: 8px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
    transform: translateY(-3px);  /* Nhích lên trên */
    box-shadow: 0 10px 25px rgba(0,0,0,0.2); /* Bóng đổ sâu hơn */
}
```

**Test ngay:**
1. Hero có chiếm toàn bộ màn hình không? (`100vh`)
2. Nội dung có căn giữa không?
3. Hover CTA button → có nhích lên và đổ bóng không?

**Commit:**
```bash
git commit -m "[FEATURE] Complete hero section with CTA"
```

---

### Bước 5: Responsive Mobile (10 phút)

```css
/* ===== RESPONSIVE — Mobile First ===== */
@media (max-width: 768px) {
    header {
        padding: 12px 20px;
    }

    .hero h1 {
        font-size: 2.5rem;      /* Nhỏ hơn trên mobile */
    }

    .hero p {
        font-size: 1rem;
    }

    nav {
        display: none;          /* Ẩn nav trên mobile */
    }
}
```

> **💡 Mobile menu:** Ở bài này, chỉ cần ẩn nav trên mobile. Bài nâng cao sẽ dùng checkbox hack để toggle menu.

**Test ngay:** DevTools → Ctrl+Shift+M → chọn iPhone → kiểm tra responsive.

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Header không sticky | Thiếu `top: 0` | Thêm `top: 0` vào `position: sticky` |
| Header che nội dung | Thiếu `z-index` hoặc padding-top cho main | Thêm `z-index: 1000` + `padding-top` cho body |
| Hero không full height | Thiếu `min-height: 100vh` | Đảm bảo `min-height: 100vh`, không phải `height` |
| Flexbox không căn giữa | Thiếu `flex-direction: column` | Thêm `flex-direction: column` khi stack dọc |
| CSS Variables không hoạt động | Sai cú pháp `var()` | Phải có `--` phía trước tên, dùng `var(--tên)` |
| Link không hover được | Thiếu `text-decoration: none` trên `<a>` | Thêm vào CSS reset |
| Gradient không hiện | Sai cú pháp `linear-gradient` | Kiểm tra: `linear-gradient(135deg, color1, color2)` |

---

## 🔍 DevTools Tips

1. **Inspect header:** F12 → chọn `<header>` → xem computed styles → kiểm tra `position: sticky`
2. **Test hover:** DevTools → chọn element → tab Styles → click icon `:hov` → chọn `:hover`
3. **Test responsive:** Ctrl+Shift+M → chọn device → kéo resize
4. **Xem CSS Variables:** DevTools → Elements → chọn `:root` → xem tất cả variables

---

## 🎨 Design Specs

### Colors (CSS Variables)
```css
:root {
    --color-primary: #6366f1;    /* Indigo */
    --color-secondary: #8b5cf6;  /* Purple */
    --color-dark: #1e293b;       /* Slate dark */
    --color-light: #f8fafc;      /* Slate light */
    --color-text: #334155;       /* Slate text */
    --font-main: 'Segoe UI', sans-serif;
}
```

### Typography
- Hero title: 3.5rem (desktop), 2.5rem (mobile)
- Hero subtitle: 1.25rem
- Nav links: 1rem

### Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

---

## 🐛 Hints

### Sticky Header
```css
header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--color-light);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

### Hero Centering
```css
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
```

### Mobile Menu (CSS-only)
```css
/* Dùng checkbox hack */
.menu-toggle { display: none; }
.menu-toggle:checked ~ nav { display: flex; }
```

---

## ✅ Success Criteria

- [ ] Header sticky và responsive
- [ ] Nav links hover effect hoạt động
- [ ] Hero full viewport height
- [ ] CTA button có hover animation
- [ ] Mobile menu toggle hoạt động
- [ ] Git commit message đúng convention

---

## 📝 Commit Messages Expected

```
[SETUP] Initialize project structure
[STYLE] Add base CSS variables and reset
[FEATURE] Implement header navigation
[FEATURE] Complete hero section with CTA
```

---

**← [ Quay lại Session 1](../README.md)**