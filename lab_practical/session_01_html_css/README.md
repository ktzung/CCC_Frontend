# Session 1 — HTML/CSS Fundamentals

## 🎯 Mục tiêu

- Nắm vững HTML5 semantic elements
- Sử dụng CSS Grid và Flexbox cho layout
- Xây dựng giao diện responsive (mobile-first)
- Hiểu cách tổ chức code CSS chuẩn khoa học

---

## 📁 Cấu trúc thư mục

```
session_01_html_css/
├── README.md              ← File này
├── exercises/             ← Đề bài + starter code
│   ├── 01_hero_section/
│   ├── 02_about_skills/
│   ├── 03_portfolio_gallery/
│   └── 04_contact_footer/
├── solutions/            ← Solution (không mở trước khi làm bài)
└── projects/
    └── portfolio_site/   ← Complete code project
        ├── index.html
        ├── css/
        │   ├── variables.css
        │   ├── base.css
        │   ├── header.css
        │   ├── hero.css
        │   ├── about.css
        │   ├── skills.css
        │   ├── portfolio.css
        │   ├── contact.css
        │   └── footer.css
        └── js/
            └── main.js
```

---

## 🔧 Hướng dẫn Git Commit Convention

### Quy tắc đặt tên commit

```
[TYPE] Mô tả ngắn gọn

- TYPE: viết HOA, đặt trong ngoặc vuông
- Mô tả: max 50 ký tự, bắt đầu bằng động từ
- Không dùng dấu chấm ở cuối
```

### Các loại commit TYPE

| TYPE | Ý nghĩa | Khi nào dùng |
|------|---------|--------------|
| `[SETUP]` | Thiết lập dự án | Tạo folder, cấu hình ban đầu |
| `[FEATURE]` | Thêm tính năng | Implement something new |
| `[STYLE]` | Styling/CSS | Thêm CSS, layout, styling |
| `[UI]` | Giao diện | Hover effects, animations |
| `[BUGFIX]` | Sửa lỗi | Fix bugs |
| `[REFACTOR]` | Cấu trúc lại | Tối ưu code |
| `[STATE]` | JavaScript state | Xử lý state, events |
| `[VALIDATION]` | Validation | Form validation |

### Ví dụ commit messages

```bash
# ✅ Đúng
git commit -m "[SETUP] Initialize project structure"
git commit -m "[FEATURE] Add sticky header navigation"
git commit -m "[STYLE] Create CSS variables and reset"
git commit -m "[UI] Implement hero section hover effects"
git commit -m "[BUGFIX] Fix mobile menu toggle"

# ❌ Sai
git commit -m "init project"                    # thiếu TYPE
git commit -m "[FEATURE] Added the header"      # quá dài
git commit -m "fix bug"                        # thiếu TYPE và mô tả
git commit -m "[FEATURE] Did some stuff"       # không rõ ràng
```

### Số lượng commit tối thiểu

| Bài tập | Số commit tối thiểu |
|---------|-------------------|
| Bài 1.1 (Header + Hero) | 3 commits |
| Bài 1.2 (About + Skills) | 3 commits |
| Bài 1.3 (Portfolio) | 3 commits |
| Bài 1.4 (Contact + Footer) | 3 commits |
| **Tổng cộng** | **12 commits** |

### Workflow commit cho mỗi bài

```bash
# Bài 1.1 - Header + Hero (3 commits)
git commit -m "[SETUP] Create session folders"
git commit -m "[FEATURE] Build header navigation"
git commit -m "[FEATURE] Complete hero section with CTA"

# Bài 1.2 - About + Skills (3 commits)
git commit -m "[STYLE] Create about section layout"
git commit -m "[FEATURE] Add skills progress bars"
git commit -m "[REFACTOR] Optimize responsive breakpoints"

# Bài 1.3 - Portfolio (3 commits)
git commit -m "[FEATURE] Build portfolio grid layout"
git commit -m "[UI] Add hover zoom effects"
git commit -m "[FEATURE] Implement CSS-only lightbox"

# Bài 1.4 - Contact + Footer (3 commits)
git commit -m "[FEATURE] Style contact form inputs"
git commit -m "[FEATURE] Add responsive footer"
git commit -m "[REFACTOR] Final responsive adjustments"
```

---

## 📝 Bài tập (4 bài)

### Bài 1.1 — Header + Hero Section (45 phút)

**Mục tiêu:** Xây dựng header navigation và hero section với CTA button

**Kiến thức:**
- Semantic HTML: `<header>`, `<nav>`, `<main>`
- CSS Box Model: margin, padding, border
- Flexbox centering

**Yêu cầu:**
- Header cố định (sticky) với logo và navigation links
- Hero section full viewport height
- Nút CTA "View My Work" có hover effect
- Responsive: mobile hamburger menu (CSS-only)

**Starter code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <!-- CSS file sẽ được tạo riêng -->
</head>
<body>
    <!-- Header: Logo + Nav links -->
    <!-- Hero: Title + Subtitle + CTA Button -->
</body>
</html>
```

**Commit requirements:**
```
[SETUP] Initialize project structure
[STYLE] Add base CSS variables and reset
[FEATURE] Implement header navigation
[FEATURE] Complete hero section with CTA
```

---

### Bài 1.2 — About + Skills Section (45 phút)

**Mục tiêu:** Xây dựng phần about và skills với progress bars

**Kiến thức:**
- CSS Grid: 2-column layout
- CSS Typography: font-size, line-height, font-weight
- CSS Custom Properties (variables)
- Progress bar animation

**Yêu cầu:**
- 2-column layout: avatar/image + text (desktop), stacked (mobile)
- Skills section với progress bars (HTML, CSS, JavaScript)
- Animation khi scroll vào viewport

**Commit requirements:**
```
[STYLE] Create about section layout
[FEATURE] Add skills progress bars
[REFACTOR] Optimize responsive breakpoints
```

---

### Bài 1.3 — Portfolio Grid Gallery (45 phút)

**Mục tiêu:** Xây dựng gallery grid với hover effects

**Kiến thức:**
- CSS Grid: `grid-template-columns`, `gap`
- Image aspect ratio: `aspect-ratio`
- Hover effects: `transform`, `scale`
- CSS-only lightbox

**Yêu cầu:**
- Responsive grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Hover zoom effect trên mỗi item
- Lightbox overlay khi click (CSS `:target` selector)
- 6 portfolio items với placeholder images

**Commit requirements:**
```
[FEATURE] Build portfolio grid layout
[FEATURE] Add hover zoom effects
[FEATURE] Implement CSS-only lightbox
```

---

### Bài 1.4 — Contact Form + Footer (45 phút)

**Mục tiêu:** Xây dựng contact form và responsive footer

**Kiến thức:**
- Form styling: inputs, labels, buttons
- CSS validation UI: `:valid`, `:invalid`, `:focus`
- Footer layout với social icons
- Responsive form layout

**Yêu cầu:**
- Form fields: Name, Email, Message (textarea)
- Validation UI feedback (border color)
- Footer với social links (GitHub, LinkedIn, Email)
- Mobile-first responsive form

**Commit requirements:**
```
[FEATURE] Style contact form inputs
[FEATURE] Add responsive footer
[REFACTOR] Final responsive adjustments
```

---

## 📊 Rubric đánh giá

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| **Hoàn thành yêu cầu** | 4 | Tất cả 4 bài đều hoàn thành, responsive |
| **Code quality** | 2 | CSS có variables, tổ chức tốt |
| **Git commit** | 2 | Đủ commits theo convention |
| **Problem solving** | 2 | Tự code, không copy nguyên cả file |

---

## 🐛 Troubleshooting thường gặp

### 1. CSS Grid không responsive
```css
/* Sai */
.grid { display: grid; grid-template-columns: 300px 300px; }

/* Đúng - dùng auto-fill */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
```

### 2. Header sticky không hoạt động
```css
/* Phải có top: 0 */
header { position: sticky; top: 0; z-index: 100; }
```

### 3. Form inputs trên mobile quá nhỏ
```css
/* Đặt min-height và font-size */
input, textarea { min-height: 44px; font-size: 16px; }
```

---

## ✅ Checklist trước khi nộp

- [ ] Header sticky trên mọi breakpoint
- [ ] Hero section full viewport height
- [ ] Portfolio grid responsive (3/2/1 columns)
- [ ] CSS-only lightbox hoạt động
- [ ] Contact form với validation UI
- [ ] Footer responsive trên mobile
- [ ] Tối thiểu 12 commits với meaningful messages
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 📚 Tài liệu tham khảo

- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [CSS-Tricks: Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [HTML Semantics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

---

## ▶️ Bắt đầu

1. Fork repository `session_01_portfolio_htmlcss`
2. Clone về máy local
3. Tạo folder structure theo cấu trúc trên
4. Commit `[SETUP] Initialize project structure` trước
5. Làm bài 1.1 → commit → bài 1.2 → commit → ....

---

**← [ Quay lại Lab Practical](../README.md) | Tiếp theo: [Session 2 - Bootstrap 5](../session_02_bootstrap/README.md) →**