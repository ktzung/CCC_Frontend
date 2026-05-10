# Session 2 — Bootstrap 5

## 🎯 Mục tiêu

- Chuyển đổi Portfolio từ HTML/CSS thuần sang Bootstrap 5
- Nắm vững Bootstrap grid system và components
- Tùy biến Bootstrap theme (colors, spacing, typography)
- Hiểu cách override Bootstrap variables

---

## 📁 Cấu trúc thư mục

```
session_02_bootstrap/
├── README.md              ← File này
├── exercises/             ← Đề bài
│   ├── 01_bootstrap_conversion/
│   ├── 02_blog_layout/
│   ├── 03_comment_section/
│   └── 04_theme_customize/
├── solutions/            ← Solution
└── projects/
    └── portfolio_bootstrap/
        ├── index.html
        ├── blog.html
        ├── css/
        │   ├── custom-theme.css
        │   ├── blog.css
        │   └── comments.css
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

### Các loại commit TYPE cho Session 2

| TYPE | Ý nghĩa | Khi nào dùng |
|------|---------|--------------|
| `[BOOTSTRAP]` | Bootstrap setup | Thêm CDN, cấu hình Bootstrap |
| `[FEATURE]` | Thêm tính năng | Components, layouts |
| `[STYLE]` | Styling | Typography, spacing |
| `[UI]` | Giao diện | Hover effects, animations |
| `[CUSTOMIZE]` | Tùy biến theme | Override Bootstrap variables |
| `[THEME]` | Theme styling | Color palette, dark mode |
| `[REFACTOR]` | Cấu trúc lại | Tối ưu code |

### Ví dụ commit messages

```bash
# ✅ Đúng
git commit -m "[BOOTSTRAP] Add Bootstrap CDN and initial setup"
git commit -m "[FEATURE] Convert grid to Bootstrap columns"
git commit -m "[STYLE] Apply Bootstrap typography utilities"
git commit -m "[CUSTOMIZE] Override Bootstrap primary color"
git commit -m "[THEME] Apply complete new color palette"

# ❌ Sai
git commit -m "added bootstrap"                 # thiếu TYPE
git commit -m "[FEATURE] did something"         # không rõ ràng
git commit -m "fix"                              # quá ngắn
```

### Số lượng commit tối thiểu

| Bài tập | Số commit tối thiểu |
|---------|-------------------|
| Bài 2.1 (Bootstrap Conversion) | 3 commits |
| Bài 2.2 (Blog Layout) | 3 commits |
| Bài 2.3 (Comment Section) | 3 commits |
| Bài 2.4 (Theme Customize) | 3 commits |
| **Tổng cộng** | **12 commits** |

### Workflow commit cho mỗi bài

```bash
# Bài 2.1 - Bootstrap Conversion (3 commits)
git commit -m "[BOOTSTRAP] Add Bootstrap CDN and initial setup"
git commit -m "[REFACTOR] Convert grid to Bootstrap columns"
git commit -m "[STYLE] Apply Bootstrap typography utilities"

# Bài 2.2 - Blog Layout (3 commits)
git commit -m "[FEATURE] Create blog post cards layout"
git commit -m "[FEATURE] Build sticky sidebar"
git commit -m "[FEATURE] Add categories and tags cloud"

# Bài 2.3 - Comment Section (3 commits)
git commit -m "[FEATURE] Build comment form with Bootstrap"
git commit -m "[FEATURE] Display threaded comments"
git commit -m "[STYLE] Responsive comment layout"

# Bài 2.4 - Theme Customize (3 commits)
git commit -m "[CUSTOMIZE] Override Bootstrap primary color"
git commit -m "[CUSTOMIZE] Add custom spacing scale"
git commit -m "[THEME] Apply complete new color palette"
```

---

## 📝 Bài tập (4 bài)

### Bài 2.1 — Bootstrap Conversion (45 phút)

**Mục tiêu:** Chuyển Portfolio v1 (HTML/CSS) sang Bootstrap 5 grid

**Kiến thức:**
- Bootstrap CDN setup
- Container, Row, Column grid system
- Bootstrap typography utilities

**Yêu cầu:**
- Thêm Bootstrap 5.3 CSS/JS CDN
- Thay thế custom grid bằng `.container`, `.row`, `.col-`
- Responsive breakpoints giữ nguyên

**Commit requirements:**
```
[BOOTSTRAP] Add Bootstrap CDN and initial setup
[REFACTOR] Convert grid to Bootstrap cols
[STYLE] Apply Bootstrap typography utilities
```

---

### Bài 2.2 — Blog Layout + Sidebar (45 phút)

**Mục tiêu:** Xây dựng blog layout với sidebar sử dụng Bootstrap components

**Kiến thức:**
- Bootstrap Cards, Badges, List groups
- Sticky sidebar với `.sticky-top`
- Navigation components

**Yêu cầu:**
- Blog posts displayed as cards
- Sidebar: categories, recent posts, tags cloud
- Sticky sidebar on desktop

**Commit requirements:**
```
[FEATURE] Create blog post cards layout
[FEATURE] Build sticky sidebar
[FEATURE] Add categories and tags cloud
```

---

### Bài 2.3 — Comment Section UI (45 phút)

**Mục tiêu:** Xây dựng comment system UI với Bootstrap forms

**Kiến thức:**
- Bootstrap Forms, Input groups
- Form validation styling
- Avatar + comment thread display

**Yêu cầu:**
- Comment form with avatar
- Threaded comments display
- Reply button UI

**Commit requirements:**
```
[FEATURE] Build comment form with Bootstrap
[FEATURE] Display threaded comments
[STYLE] Responsive comment layout
```

---

### Bài 2.4 — Customize Bootstrap Theme (45 phút)

**Mục tiêu:** Tùy biến Bootstrap theme khác biệt với default

**Kiến thức:**
- Bootstrap Sass variables override
- CSS custom properties
- Primary color, spacing, border-radius changes

**Yêu cầu:**
- Override `$primary` color (từ indigo sang teal/green)
- Custom spacing scale
- Border-radius changes

**Commit requirements:**
```
[CUSTOMIZE] Override Bootstrap primary color
[CUSTOMIZE] Add custom spacing scale
[THEME] Apply complete new color palette
```

---

## 📊 Rubric đánh giá

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| **Hoàn thành yêu cầu** | 4 | Tất cả 4 bài đều hoàn thành |
| **Code quality** | 2 | Bootstrap convention, clean overrides |
| **Git commit** | 2 | Đủ commits theo convention |
| **Problem solving** | 2 | Tự code, không copy nguyên cả file |

---

## ✅ Checklist trước khi nộp

- [ ] Bootstrap CDN hoạt động
- [ ] Grid chuyển sang Bootstrap columns
- [ ] Sidebar sticky hoạt động
- [ ] Comment form responsive
- [ ] Theme customize khác default
- [ ] Tối thiểu 12 commits
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 🐛 Troubleshooting thường gặp

### Bootstrap not responsive
```html
<!-- Phải có meta viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Container vs Container-fluid
```html
<!-- Centered, max-width -->
<div class="container"></div>

<!-- Full width -->
<div class="container-fluid"></div>
```

### Column not working
```html
<!-- Sai: col phải trong row -->
<div class="col-md-4"></div>

<!-- Đúng: -->
<div class="row">
    <div class="col-md-4"></div>
</div>
```

---

**← [ Quay lại Lab Practical](../README.md) | [Session 1](../session_01_html_css/README.md) | Tiếp theo: [Session 3 - JavaScript](../session_03_javascript/README.md) →**