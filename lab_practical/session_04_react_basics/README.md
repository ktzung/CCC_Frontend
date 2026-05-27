# Session 4 — React Basics

## 🎯 Mục tiêu

- **Hiểu tại sao cần React** (so sánh với DOM thuần)
- Nắm vững JSX syntax, conditional & list rendering
- **Hình thành tư duy component** (tách UI thành component tái sử dụng)
- Chuyển Portfolio sang React với Vite
- Quản lý state với React hooks (useState, props)

---

## 🗺️ Lộ trình học (7 bài, tăng dần难度)

```
Bài 0.0          Bài 0.5          Bài 0.6          Bài 0.1          Bài 0.2          Bài 0.3          Bài 0.4
DOM vs React  →  JSX Basics   →  Component    →  React Setup  →  State+Props →  Category   →  Contact
(30 phút)        (25 phút)        Extraction      (45 phút)        (45 phút)      Filter       Form
                                  (35 phút)                                     (45 phút)    (45 phút)
```

### Tư duy cốt lõi được xây dựng qua từng bài:

| Bài | Tư duy then chốt | Câu hỏi sinh viên tự trả lời | Kết nối |
|-----|-------------------|-------------------------------|---------|
| **0.0** | "DOM thuần có vấn đề gì?" | Tại sao thao tác DOM trực tiếp lại khó maintain? | → 0.2: cùng pattern state→render |
| **0.5** | "JSX là gì, render sao?" | Viết giao diện Portfolio bằng JSX? Conditional? | → 0.1: PortfolioHero, ProjectCard dùng lại |
| **0.6** | "Tách component = tái sử dụng" | Khi nào nên tách? Props flow như nào? | → 0.1: cùng kỹ năng tách cho Portfolio |
| **0.1** | "Component architecture" | Cấu trúc file React chuẩn chuyên nghiệp | ← 0.6: Navbar, Hero, Footer tương tự |
| **0.2** | "State-driven UI" | UI thay đổi tự động khi state thay đổi | ← 0.0: useState + .map() cho danh sách |
| **0.3** | "User interaction → state change" | Event handler thay đổi state → UI cập nhật | ← 0.5: conditional rendering |
| **0.4** | "Form state & validation" | Quản lý nhiều input với 1 state object | → Session 5: React Router + API |

---

## 📁 Cấu trúc thư mục

```
session_04_react_basics/
├── README.md              ← File này
├── exercises/             ← Đề bài (7 bài)
│   ├── 00_vanilla_vs_react.md   ← 🆕 DOM thuần vs React
│   ├── 05_jsx_basics.md         ← 🆕 JSX syntax & rendering
│   ├── 06_component_extraction.md ← 🆕 Tách HTML → component
│   ├── 01_react_setup.md
│   ├── 02_state_props.md
│   ├── 03_category_filter.md
│   └── 04_contact_form.md
├── solutions/             ← Solution (7 bài)
│   ├── 00_vanilla_vs_react/
│   ├── 05_jsx_basics/
│   ├── 06_component_extraction/
│   ├── 01_react_setup/
│   ├── 02_state_props/
│   ├── 03_category_filter/
│   └── 04_contact_form/
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
| Bài 4.0 (DOM vs React) | 2 commits |
| Bài 4.5 (JSX Basics) | 2 commits |
| Bài 4.6 (Component Extraction) | 2 commits |
| Bài 4.1 (React Setup) | 4 commits |
| Bài 4.2 (State + Props) | 4 commits |
| Bài 4.3 (Category Filter) | 4 commits |
| Bài 4.4 (Contact Form) | 4 commits |
| **Tổng cộng** | **22 commits** |

### Workflow commit cho mỗi bài

```bash
# Bài 4.0 - DOM vs React (2 commits)
git commit -m "[FEATURE] Implement vanilla JS todo list"
git commit -m "[FEATURE] Implement React todo list with same functionality"

# Bài 4.5 - JSX Basics (2 commits)
git commit -m "[COMPONENT] Create Header and UserCard components"
git commit -m "[FEATURE] Implement GradeTable with conditional rendering"

# Bài 4.6 - Component Extraction (2 commits)
git commit -m "[REFACTOR] Create component tree diagram"
git commit -m "[COMPONENT] Extract Navbar, Hero, ProductCard, Footer components"

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

## 📝 Bài tập (7 bài — tăng dần难度)

### Bài 4.0 — DOM Thuần vs JSX: Tại sao cần React? (30 phút) 🆕

**Mục tiêu:** Trải nghiệm "nỗi đau" khi thao tác DOM trực tiếp, từ đó hiểu tại sao React ra đời

**Câu chuyện:** *Minh muốn nâng cấp Portfolio từ Session 3 sang React. Nhưng trước tiên, cần hiểu tại sao phải chuyển.*

**Kiến thức:**
- DOM manipulation với vanilla JS (innerHTML, getElementById)
- Virtual DOM và cơ chế re-render của React
- So sánh imperative vs declarative

**Yêu cầu:**
- Hoàn thành `vanilla.html`: Todo list với DOM thuần (13 TODO)
- Hoàn thành `react_demo.html`: Cùng chức năng với React CDN (8 TODO)
- Viết `reflection.md` trả lời 4 câu hỏi suy nghĩ

**Commit requirements:**
```
[FEATURE] Implement vanilla JS todo list
[FEATURE] Implement React todo list with same functionality
```

→ [Đề bài chi tiết](exercises/00_vanilla_vs_react.md) | [Solution](solutions/00_vanilla_vs_react/solution.md)

---

### Bài 4.5 — JSX: Viết giao diện Portfolio (25 phút) 🆕

**Mục tiêu:** Nắm vững JSX syntax, conditional rendering, list rendering — qua component Portfolio thật

**Câu chuyện:** *Minh đã thấy nỗi đau DOM thuần. Giờ viết giao diện Portfolio bằng JSX — PortfolioHero + SkillBadge (Phần A), ProjectCard + CategoryBadge (Phần B).*

**Kiến thức:**
- JSX không phải HTML (className, htmlFor, onClick)
- Chèn JavaScript trong JSX với {}
- Conditional rendering (ternary, &&, early return)
- List rendering với .map() và key prop

**Yêu cầu:**
- Phần A: Tạo `PortfolioHero`, `SkillBadge`, `SkillsSection` components
- Phần B: Tạo `CategoryBadge`, `ProjectCard`, `ProjectList` với conditional & list rendering
- Featured badge chỉ hiện khi featured === true
- Xử lý empty state

**Lưu ý:** Component `ProjectCard` sẽ dùng lại trong Bài 0.1!

**Commit requirements:**
```
[COMPONENT] Create Header and UserCard components
[FEATURE] Implement GradeTable with conditional rendering
```

→ [Đề bài chi tiết](exercises/05_jsx_basics.md) | [Solution](solutions/05_jsx_basics/solution.md)

---

### Bài 4.6 — Component Extraction: Tách HTML thành Component (35 phút) 🆕

**Mục tiêu:** Hình thành tư duy component — biết cách tách UI lớn thành component nhỏ, tái sử dụng

**Câu chuyện:** *Minh đã viết JSX cho Portfolio ở Bài 0.5. Giờ cần học cách tách UI thành component có tổ chức trước khi tạo project Vite ở Bài 0.1. ShopVN là "bài tập luyện" cho kỹ năng này.*

**Kiến thức:**
- Component thinking: "một component, một việc"
- Props flow: parent → child
- Khi nào nên tách component
- Component composition

**Yêu cầu:**
- Phần A: Vẽ sơ đồ component tree từ code JSX (file `component_tree.md`)
- Phần B: Tách shop page thành 5 components: Navbar, Hero, ProductCard, ProductGrid, Footer
- App chỉ compose, không chứa logic render chi tiết

**Lưu ý:** Navbar, Hero, Footer **cùng cấu trúc** với Header, Hero, Footer trong Portfolio (Bài 0.1)

**Commit requirements:**
```
[REFACTOR] Create component tree diagram
[COMPONENT] Extract Navbar, Hero, ProductCard, Footer components
```

→ [Đề bài chi tiết](exercises/06_component_extraction.md) | [Solution](solutions/06_component_extraction/solution.md)

---

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
| **Hoàn thành yêu cầu** | 4 | Tất cả 7 bài đều hoạt động |
| **Tư duy component** | 2 | Tách component hợp lý, props flow đúng |
| **Code quality** | 2 | JSX clean, props destructuring |
| **Git commit** | 2 | Đủ commits theo convention |
| **Problem solving** | 2 | Tự code, không copy nguyên cả file |

---

## ✅ Checklist trước khi nộp

### Giai đoạn 1: Tư duy cơ bản (Bài 0.0, 0.5, 0.6)
- [ ] `vanilla.html` Todo hoạt động (thêm, toggle, xóa)
- [ ] `react_demo.html` Todo hoạt động (cùng chức năng)
- [ ] `reflection.md` trả lời 4 câu hỏi
- [ ] `jsx_basics.html` Header + UserCard hiển thị đúng
- [ ] `jsx_advanced.html` Badge + GradeTable hoạt động
- [ ] `component_tree.md` vẽ sơ đồ component
- [ ] `shop_components.html` tách 5 components

### Giai đoạn 2: Portfolio React (Bài 0.1, 0.2, 0.3, 0.4)
- [ ] Vite project setup thành công
- [ ] Components tách riêng rõ ràng
- [ ] Projects data hiển thị từ state
- [ ] Filter hoạt động đúng
- [ ] Form validation hoạt động
- [ ] Tối thiểu 22 commits
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 🐛 Troubleshooting thường gặp

### Babel không load (Bài 0.0, 0.5, 0.6)
```html
<!-- Phải có cả 3 script này khi dùng CDN -->
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- Phải dùng type="text/babel" -->
<script type="text/babel">
```

### "React is not defined"
```jsx
// Khi dùng CDN, React và ReactDOM có sẵn trong window
const { useState } = React;  // ✅ Đúng
import { useState } from 'react';  // ❌ Sai (dùng cho Vite/project)
```

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