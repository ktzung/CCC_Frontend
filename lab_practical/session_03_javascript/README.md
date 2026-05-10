# Session 3 — JavaScript Interactive

## 🎯 Mục tiêu

- Thêm interactivity vào Portfolio với Vanilla JavaScript
- Nắm vững DOM manipulation và event handling
- Sử dụng localStorage để persist data
- Xây dựng form validation với regex

---

## 📁 Cấu trúc thư mục

```
session_03_javascript/
├── README.md              ← File này
├── exercises/             ← Đề bài
│   ├── 01_skill_filter/
│   ├── 02_lightbox/
│   ├── 03_form_validation/
│   └── 04_theme_toggle/
├── solutions/            ← Solution
└── projects/
    └── portfolio_js/
        ├── index.html
        ├── css/
        │   ├── variables.css
        │   └── styles.css
        └── js/
            ├── main.js
            ├── portfolio-filter.js
            ├── lightbox.js
            ├── form-validation.js
            └── theme-toggle.js
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

### Các loại commit TYPE cho Session 3

| TYPE | Ý nghĩa | Khi nào dùng |
|------|---------|--------------|
| `[DOM]` | DOM selection | querySelector, querySelectorAll |
| `[EVENT]` | Event handling | addEventListener, event delegation |
| `[STATE]` | State management | Variables, module pattern |
| `[FEATURE]` | Thêm tính năng | New functionality |
| `[VALIDATION]` | Validation logic | Form validation, regex |
| `[STORAGE]` | localStorage/sessionStorage | Data persistence |
| `[UI]` | Giao diện | Animations, transitions |
| `[BUGFIX]` | Sửa lỗi | Fix bugs |
| `[REFACTOR]` | Cấu trúc lại | Code cleanup |

### Ví dụ commit messages

```bash
# ✅ Đúng
git commit -m "[DOM] Select all filter buttons and items"
git commit -m "[EVENT] Add click handlers to filters"
git commit -m "[STATE] Create theme state management"
git commit -m "[VALIDATION] Add email regex validation"
git commit -m "[STORAGE] Add localStorage persistence"
git commit -m "[UI] Implement filter transition animation"
git commit -m "[BUGFIX] Fix active state indicator"

# ❌ Sai
git commit -m "select elements"                  # thiếu TYPE
git commit -m "[DOM] select all the buttons"     # quá dài
git commit -m "fix bug"                         # thiếu TYPE
git commit -m "[EVENT] click handler"           # không rõ ràng
```

### Số lượng commit tối thiểu

| Bài tập | Số commit tối thiểu |
|---------|-------------------|
| Bài 3.1 (Skill Filter) | 4 commits |
| Bài 3.2 (Lightbox) | 4 commits |
| Bài 3.3 (Form Validation) | 4 commits |
| Bài 3.4 (Theme Toggle) | 4 commits |
| **Tổng cộng** | **16 commits** |

### Workflow commit cho mỗi bài

```bash
# Bài 3.1 - Skill Filter (4 commits)
git commit -m "[DOM] Select all filter buttons and portfolio items"
git commit -m "[EVENT] Add click handlers to filter buttons"
git commit -m "[STATE] Create filter state management"
git commit -m "[UI] Implement filter transition animation"

# Bài 3.2 - Lightbox (4 commits)
git commit -m "[DOM] Create lightbox overlay element dynamically"
git commit -m "[EVENT] Add click delegation for images"
git commit -m "[FEATURE] Implement prev/next navigation"
git commit -m "[FEATURE] Add keyboard navigation (Escape to close)"

# Bài 3.3 - Form Validation (4 commits)
git commit -m "[DOM] Select form and input elements"
git commit -m "[VALIDATION] Add email regex validation"
git commit -m "[UI] Display inline error messages"
git commit -m "[FEATURE] Add form submit handler with preventDefault"

# Bài 3.4 - Theme Toggle (4 commits)
git commit -m "[CSS] Implement CSS custom properties for themes"
git commit -m "[STATE] Create theme state management"
git commit -m "[STORAGE] Add localStorage persistence"
git commit -m "[DETECTION] Add prefers-color-scheme detection"
```

---

## 📝 Bài tập (4 bài)

### Bài 3.1 — Skill Filter Animation (30 phút)

**Mục tiêu:** Tạo filter cho portfolio items bằng JavaScript

**Kiến thức:**
- DOM selection: `querySelectorAll`, `querySelector`
- Class manipulation: `classList.add`, `classList.remove`, `classList.toggle`
- Event handling: `addEventListener`

**Yêu cầu:**
- Filter buttons: All, Web, Mobile, Design
- Click filter → hiện items thuộc category đó
- Smooth transition animation
- Active state indicator

**Commit requirements:**
```
[DOM] Select all filter buttons
[EVENT] Add click handlers to filters
[ANIMATION] Implement filter transition
[BUGFIX] Fix active state indicator
```

---

### Bài 3.2 — Portfolio Lightbox (30 phút)

**Mục tiêu:** Nâng cấp lightbox từ CSS-only sang JavaScript

**Kiến thức:**
- Event delegation
- Dynamic DOM creation
- Keyboard navigation (Escape to close)

**Yêu cầu:**
- Click image → fullscreen lightbox
- Next/Previous navigation
- Escape key to close
- Click outside to close

**Commit requirements:**
```
[DOM] Create lightbox overlay element
[EVENT] Add click delegation for images
[FEATURE] Implement keyboard navigation
[UX] Add lightbox animation
```

---

### Bài 3.3 — Contact Form Validation (30 phút)

**Mục tiêu:** Thêm real-time validation vào contact form

**Kiến thức:**
- Form events: `submit`, `input`, `blur`
- Regex validation
- Error message display

**Yêu cầu:**
- Validate: name (required), email (format), message (min 10 chars)
- Real-time validation on input
- Error messages hiển thị inline
- Submit handler với preventDefault

**Commit requirements:**
```
[DOM] Select form and input elements
[VALIDATION] Add email regex validation
[UX] Display inline error messages
[FEATURE] Add submit handler
```

---

### Bài 3.4 — Theme Toggle + localStorage (30 phút)

**Mục tiêu:** Thêm dark/light theme toggle với persistence

**Kiến thức:**
- CSS Custom Properties (variables)
- localStorage: `setItem`, `getItem`
- `window.matchMedia` cho system preference

**Yêu cầu:**
- Toggle button: dark ↔ light theme
- Preference saved to localStorage
- System preference detection (prefers-color-scheme)
- Smooth transition between themes

**Commit requirements:**
```
[STATE] Create theme state management
[CSS] Implement CSS custom properties
[STORAGE] Add localStorage persistence
[DETECTION] Add prefers-color-scheme detection
```

---

## 📊 Rubric đánh giá

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| **Hoàn thành yêu cầu** | 4 | Tất cả 4 bài đều hoạt động |
| **Code quality** | 2 | Clean DOM code, có comments |
| **Git commit** | 2 | Đủ commits theo convention |
| **Problem solving** | 2 | Tự code, không copy nguyên cả file |

---

## ✅ Checklist trước khi nộp

- [ ] Filter animation hoạt động
- [ ] Lightbox navigation hoạt động
- [ ] Form validation real-time
- [ ] Theme toggle persist được
- [ ] Keyboard navigation (Escape) hoạt động
- [ ] Tối thiểu 16 commits
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 🐛 Troubleshooting thường gặp

### Event delegation not working
```javascript
// Sai: add listener to each item
items.forEach(item => item.addEventListener('click', handler))

// Đúng: delegate to parent
parent.addEventListener('click', (e) => {
    if (e.target.matches('.portfolio-item img')) {
        openLightbox(e.target)
    }
})
```

### localStorage not working
```javascript
// Luôn parse khi đọc
const theme = localStorage.getItem('theme') ?? 'light'

// Luôn stringify khi lưu
localStorage.setItem('theme', JSON.stringify(newTheme))
```

### Theme toggle not smooth
```css
/* Thêm transition vào root */
:root {
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

**← [ Quay lại Lab Practical](../README.md) | [Session 2](../session_02_bootstrap/README.md) | Tiếp theo: [Session 4 - React Basics](../session_04_react_basics/README.md) →**