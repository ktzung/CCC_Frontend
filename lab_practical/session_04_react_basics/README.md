# Session 4 — React Basics

## 🎯 Mục tiêu

- Chuyển Portfolio sang React với Vite
- Nắm vững JSX, useState, Props
- Xây dựng component architecture
- Quản lý state với React hooks

---

## 📁 Cấu trúc thư mục

```
session_04_react_basics/
├── README.md              ← File này
├── exercises/             ← Đề bài
│   ├── 01_react_setup/
│   ├── 02_state_props/
│   ├── 03_category_filter/
│   └── 04_contact_form/
├── solutions/            ← Solution
└── projects/
    └── portfolio_react/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── index.css
            ├── components/
            │   ├── Header.jsx
            │   ├── Hero.jsx
            │   ├── About.jsx
            │   ├── Skills.jsx
            │   ├── Portfolio.jsx
            │   ├── Contact.jsx
            │   └── Footer.jsx
            └── data/
                └── portfolio.js
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

### Các loại commit TYPE cho Session 4

| TYPE | Ý nghĩa | Khi nào dùng |
|------|---------|--------------|
| `[SETUP]` | Project setup | Vite, React init |
| `[COMPONENT]` | Tạo component | New React component |
| `[STATE]` | State management | useState, useEffect |
| `[EVENT]` | Event handling | onClick, onChange handlers |
| `[PROPS]` | Props passing | Destructuring, passing data |
| `[FEATURE]` | Thêm tính năng | New functionality |
| `[VALIDATION]` | Validation | Form validation |
| `[DATA]` | Data management | JSON data, arrays |
| `[STYLE]` | Styling | CSS, inline styles |
| `[REFACTOR]` | Cấu trúc lại | Code cleanup |
| `[BUGFIX]` | Sửa lỗi | Fix bugs |

### Ví dụ commit messages

```bash
# ✅ Đúng
git commit -m "[SETUP] Initialize Vite React project"
git commit -m "[COMPONENT] Create Header component"
git commit -m "[COMPONENT] Create Hero component with props"
git commit -m "[STATE] Add useState for projects"
git commit -m "[EVENT] Add filter button click handlers"
git commit -m "[PROPS] Pass data to ProjectCard component"
git commit -m "[VALIDATION] Add form validation logic"
git commit -m "[BUGFIX] Fix key warning in map"

# ❌ Sai
git commit -m "create component"                    # thiếu TYPE
git commit -m "[COMPONENT] header component created"  # quá dài
git commit -m "fix"                                  # thiếu TYPE và mô tả
git commit -m "[STATE] state updated"               # không rõ ràng
```

### Số lượng commit tối thiểu

| Bài tập | Số commit tối thiểu |
|---------|-------------------|
| Bài 4.1 (React Setup) | 4 commits |
| Bài 4.2 (State + Props) | 4 commits |
| Bài 4.3 (Category Filter) | 4 commits |
| Bài 4.4 (Contact Form) | 4 commits |
| **Tổng cộng** | **16 commits** |

### Workflow commit cho mỗi bài

```bash
# Bài 4.1 - React Setup (4 commits)
git commit -m "[SETUP] Initialize Vite React project"
git commit -m "[COMPONENT] Create Header component"
git commit -m "[COMPONENT] Create Hero component"
git commit -m "[COMPONENT] Create Footer component"

# Bài 4.2 - State + Props (4 commits)
git commit -m "[DATA] Create projects data array"
git commit -m "[STATE] Add useState for projects"
git commit -m "[COMPONENT] Create ProjectCard component"
git commit -m "[FEATURE] Render project list from state"

# Bài 4.3 - Category Filter (4 commits)
git commit -m "[STATE] Add filter category state"
git commit -m "[EVENT] Add filter button click handlers"
git commit -m "[FEATURE] Implement filtered rendering logic"
git commit -m "[STYLE] Add active filter button styling"

# Bài 4.4 - Contact Form (4 commits)
git commit -m "[STATE] Add form data state object"
git commit -m "[EVENT] Add input onChange handlers"
git commit -m "[VALIDATION] Add form validation logic"
git commit -m "[FEATURE] Implement form submit handler"
```

---

## 📝 Bài tập (4 bài)

### Bài 4.1 — React Components Setup (45 phút)

**Mục tiêu:** Convert Portfolio HTML → React components

**Kiến thức:**
- Vite + React setup
- JSX syntax
- Component folder structure

**Yêu cầu:**
- Setup Vite project với React
- Create components: Header, Hero, About, Skills, Portfolio, Contact, Footer
- App.jsx compose all components
- Props passing cơ bản

**Commit requirements:**
```
[SETUP] Initialize Vite React project
[COMPONENT] Create Header component
[COMPONENT] Create Hero component
[COMPONENT] Create Footer component
[LAYOUT] Assemble App.jsx layout
```

---

### Bài 4.2 — State + Props (45 phút)

**Mục tiêu:** Thêm data state và render list với props

**Kiến thức:**
- useState hook
- Props destructuring
- Array.map() rendering
- Key props

**Yêu cầu:**
- Projects data as JSON array
- useState để quản lý projects
- ProjectCard component với props
- Render list với .map()

**Commit requirements:**
```
[DATA] Create projects data array
[STATE] Add useState for projects
[COMPONENT] Create ProjectCard component
[FEATURE] Render project list from state
```

---

### Bài 4.3 — Category Filter + Events (45 phút)

**Mục tiêu:** Thêm filter functionality với React state

**Kiến thức:**
- useState cho filter state
- Event handlers
- Conditional rendering
- Active class styling

**Yêu cầu:**
- Filter buttons: All, Web, Mobile, Design
- useState cho active category
- Filter logic với .filter()
- Active button styling

**Commit requirements:**
```
[STATE] Add filter state
[EVENT] Add filter button handlers
[FEATURE] Implement filtered rendering
[UX] Add active button styling
```

---

### Bài 4.4 — Contact Form với useState (45 phút)

**Mục tiêu:** Xây dựng contact form với React state

**Kiến thức:**
- Controlled inputs
- Form state object
- handleChange function
- Validation logic

**Yêu cầu:**
- useState cho formData
- handleChange cho inputs
- validateForm function
- Submit handler với preventDefault

**Commit requirements:**
```
[STATE] Add form state object
[EVENT] Add input onChange handlers
[VALIDATION] Add form validation
[FEATURE] Implement submit handler
```

---

## 📊 Rubric đánh giá

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| **Hoàn thành yêu cầu** | 4 | Tất cả 4 bài đều hoạt động |
| **Code quality** | 2 | JSX clean, props destructuring |
| **Git commit** | 2 | Đủ commits theo convention |
| **Problem solving** | 2 | Tự code, không copy nguyên cả file |

---

## ✅ Checklist trước khi nộp

- [ ] Vite project setup thành công
- [ ] Components tách riêng rõ ràng
- [ ] Projects data hiển thị từ state
- [ ] Filter hoạt động đúng
- [ ] Form validation hoạt động
- [ ] Tối thiểu 16 commits
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 🐛 Troubleshooting thường gặp

### useState not updating
```jsx
// Sai: direct mutation
state.push(newItem)

// Đúng: new array reference
setState(prev => [...prev, newItem])
```

### Props not passing
```jsx
// Component phải accept props parameter
function ProjectCard({ project }) {
    return <div>{project.title}</div>
}
```

### Key warning in console
```jsx
// Phải có unique key khi map
{items.map(item => (
    <ProjectCard key={item.id} project={item} />
))}
```

---

**← [ Quay lại Lab Practical](../README.md) | [Session 3](../session_03_javascript/README.md) | Tiếp theo: [Session 5 - React E-commerce](../session_05_react_ecommerce/README.md) →**