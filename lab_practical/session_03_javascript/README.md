# Session 3 — JavaScript Interactive

## 🎯 Mục tiêu

- Thêm interactivity vào Portfolio với Vanilla JavaScript
- Nắm vững DOM manipulation và event handling
- Sử dụng localStorage để persist data
- Xây dựng form validation với regex
- Gọi REST API với `fetch()` và xử lý async/await
- Xây dựng ứng dụng CRUD hoàn chỉnh (Todo App)
- Quản lý state phức tạp (Shopping Cart)
- Xử lý loading, error, và pagination

---

## 📁 Cấu trúc thư mục

```
session_03_javascript/
├── README.md              ← File này
├── exercises/             ← Đề bài
│   ├── 00_hello_javascript.md     ← Cơ bản: JS cơ bản
│   ├── 00b_dom_basics.md          ← Cơ bản: DOM cơ bản
│   ├── 00c_events_basics.md       ← Cơ bản: Events
│   ├── 00d_dom_mini_projects.md   ← Cơ bản: 5 mini projects
│   ├── 00e_student_array_app.md   ← Cơ bản: Array & Quản lý SV
│   ├── 01_skill_filter.md
│   ├── 02_lightbox.md
│   ├── 03_form_validation.md
│   ├── 04_theme_toggle.md
│   ├── 05_todo_app_crud.md      ← Nâng cao
│   ├── 06_movie_search_api.md   ← Nâng cao
│   ├── 07_shopping_cart.md      ← Nâng cao
│   └── 08_weather_dashboard.md  ← Nâng cao
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
| `[API]` | API calls | fetch, async/await, Promise |
| `[CRUD]` | CRUD operations | Create, Read, Update, Delete |
| `[ASYNC]` | Async logic | Loading, error handling |
| `[SEARCH]` | Search/Filter | Debounce, realtime filter |

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
| Bài 3.5 (Todo App CRUD) | 5 commits |
| Bài 3.6 (Movie Search API) | 5 commits |
| Bài 3.7 (Shopping Cart) | 5 commits |
| Bài 0.0 (Hello JavaScript) | 3 commits |
| Bài 0.1 (DOM Basics) | 3 commits |
| Bài 0.2 (Events Basics) | 3 commits |
| Bài 0.3 (Mini Projects) | 5 commits |
| Bài 0.4 (Student Array App) | 5 commits |
| Bài 3.8 (Weather Dashboard) | 5 commits |
| **Tổng cộng** | **50 commits** |

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

## 📝 Bài tập (12 bài — 4 cơ bản + 4 trung bình + 4 nâng cao)

### 🟢 Nhóm 1: Cơ bản — Làm quen JS & DOM

---

### Bài 0.0 — Hello JavaScript (45 phút)

📄 [Đề bài chi tiết →](exercises/00_hello_javascript.md)

**Mục tiêu:** Làm quen với JavaScript cơ bản — biến, kiểu dữ liệu, toán tử, hàm

**Kiến thức:**
- Khai báo biến: `let`, `const`, `var`
- Kiểu dữ liệu: `string`, `number`, `boolean`, `null`, `undefined`
- Template literal, toán tử số học & so sánh
- Mảng (`Array`), Object, Function cơ bản

**Tóm tắt yêu cầu:**
- `console.log()` — in ra console
- Khai báo & kiểm tra kiểu dữ liệu với `typeof`
- Template literal với backtick `` ` ``
- Toán tử so sánh: `===` vs `==`
- Mảng: `push`, `pop`, `forEach`, `includes`
- Object: truy cập, thêm/sửa thuộc tính
- Hàm: `function`, arrow function `() => {}`

---

### Bài 0.1 — DOM Basics (30 phút)

📄 [Đề bài chi tiết →](exercises/00b_dom_basics.md)

**Mục tiêu:** Chọn phần tử, thay đổi nội dung và style bằng JavaScript

**Kiến thức:**
- `getElementById`, `querySelector`, `querySelectorAll`
- `textContent`, `innerHTML`
- `classList.add/remove/toggle/contains`
- `element.style.propertyName` (camelCase)
- `createElement`, `appendChild`, `remove`

**Tóm tắt yêu cầu:**
- Chọn phần tử theo ID, class, CSS selector
- Thay đổi text và HTML bên trong
- Quản lý CSS class với `classList`
- Tạo và xóa phần tử DOM động
- Mini-project: Danh sách sinh viên

---

### Bài 0.2 — Events Basics (30 phút)

📄 [Đề bài chi tiết →](exercises/00c_events_basics.md)

**Mục tiêu:** Lắng nghe và xử lý sự kiện người dùng

**Kiến thức:**
- `addEventListener('click', callback)`
- `addEventListener('input', callback)` — realtime
- `addEventListener('keydown', callback)` — phím tắt
- `e.preventDefault()` — ngăn form reload
- Event Delegation với `e.target.closest()`

**Tóm tắt yêu cầu:**
- Click event: đổi màu, bộ đếm
- Input event: tìm kiếm realtime, đếm ký tự
- Keyboard event: hiển thị phím, tag input
- Form submit: validate + preventDefault
- Event delegation: gắn 1 listener cho parent

---

### Bài 0.3 — DOM Mini Projects (60 phút)

📄 [Đề bài chi tiết →](exercises/00d_dom_mini_projects.md)

**Mục tiêu:** Áp dụng JS + DOM + Events vào 5 dự án nhỏ hoàn chỉnh

**Danh sách 5 projects:**
1. **Digital Clock** — đồng hồ thời gian thực (`setInterval`, `Date`)
2. **Color Palette** — tạo bảng màu ngẫu nhiên (`Math.random`, clipboard API)
3. **Tip Calculator** — tính tiền boa (`Intl.NumberFormat`, tính toán realtime)
4. **Password Checker** — kiểm tra độ mạnh mật khẩu (regex, strength bar)
5. **Accordion FAQ** — mở/đóng câu hỏi (CSS transition, event delegation)

---

### Bài 0.4 — Ứng dụng Quản lý Sinh viên (45 phút)

📄 [Đề bài chi tiết →](exercises/00e_student_array_app.md)

**Mục tiêu:** Khai báo mảng object thủ công, thành thạo các thao tác trên mảng và hiển thị ra giao diện

**Kiến thức:**
- Khai báo mảng object: `const arr = [{...}, {...}]`
- Truy cập, duyệt: `forEach`, `for...of`
- Thêm/xóa: `push`, `pop`, `splice`, `shift`, `unshift`
- Tìm kiếm/lọc: `find`, `filter`, `includes`, `some`
- Sắp xếp: `sort()`, thống kê: `reduce()`
- Hiển thị bảng động, modal thêm/sửa, confirm xóa

**Tóm tắt yêu cầu:**
- Khai báo mảng 10 sinh viên thủ công (object)
- Thực hành trên Console: push, pop, splice, find, filter, sort, reduce
- Ứng dụng hoàn chỉnh: bảng danh sách, tìm kiếm, lọc, sắp xếp
- Modal thêm/sửa sinh viên, xác nhận xóa
- Thống kê: tổng SV, giỏi/yếu, điểm TB lớp

---

### 🔵 Nhóm 2: Trung bình — Portfolio Interactivity

---

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

📄 [Đề bài chi tiết →](exercises/04_theme_toggle.md)

---

### 🟠 Nhóm 3: Nâng cao — API, CRUD, State Management

---

### ⭐ Bài 3.5 — Todo App CRUD (45 phút) — NÂNG CAO

📄 [Đề bài chi tiết →](exercises/05_todo_app_crud.md)

**Mục tiêu:** Xây dựng ứng dụng quản lý công việc hoàn chỉnh với CRUD

**Kiến thức mới:**
- CRUD operations (Create, Read, Update, Delete)
- Inline editing
- Array methods nâng cao (`find`, `filter`, `unshift`)
- `Date.now()` làm unique ID

**Tóm tắt yêu cầu:**
- Thêm/sửa/xóa todo
- Checkbox toggle (strikethrough)
- Inline edit (Enter lưu, Escape hủy)
- Filter: All / Active / Completed
- Đếm số việc chưa hoàn thành
- localStorage persistence
- Empty state, animation

---

### ⭐ Bài 3.6 — Movie Search với OMDB API (45 phút) — NÂNG CAO

📄 [Đề bài chi tiết →](exercises/06_movie_search_api.md)

**Mục tiêu:** Gọi REST API, xử lý async/await, hiển thị dữ liệu từ API

**Kiến thức mới:**
- `fetch()` với REST API
- `async/await` pattern
- Loading state & error handling
- Debounce search
- Modal dynamic content

**Tóm tắt yêu cầu:**
- Tìm kiếm phim qua OMDB API
- Movie cards grid với poster
- Pagination (Previous/Next)
- Movie detail modal
- Debounce auto-search (500ms)
- Favorites vào localStorage

---

### ⭐ Bài 3.7 — Shopping Cart (45 phút) — NÂNG CAO

📄 [Đề bài chi tiết →](exercises/07_shopping_cart.md)

**Mục tiêu:** Quản lý state phức tạp, tính toán giá tiền, giỏ hàng điện tử

**Kiến thức mới:**
- Complex state management (array of objects)
- `Array.reduce()` tính tổng
- `Intl.NumberFormat` format tiền
- Event delegation trên danh sách động
- Toast notification

**Tóm tắt yêu cầu:**
- Hiển thị sản phẩm (grid)
- Thêm/xóa sản phẩm khỏi cart
- Tăng/giảm số lượng
- Tính subtotal, VAT (10%), tổng cộng
- Cart sidebar slide-in
- Search sản phẩm theo tên
- Toast notification
- localStorage persistence

---

### ⭐ Bài 3.8 — Weather Dashboard (45 phút) — NÂNG CAO

📄 [Đề bài chi tiết →](exercises/08_weather_dashboard.md)

**Mục tiêu:** Gọi API thời tiết, hiển thị dashboard, xử lý nested JSON

**Kiến thức mới:**
- OpenWeatherMap API
- `Promise.all()` gọi nhiều API song song
- `navigator.geolocation`
- Dynamic CSS background
- Date/time formatting

**Tóm tắt yêu cầu:**
- Tìm thời tiết theo thành phố
- Card thời tiết hiện tại (nhiệt độ, độ ẩm, gió, áp suất)
- Dự báo 5 ngày
- Toggle °C ↔ °F
- Search history (localStorage)
- Dynamic background theo thời tiết
- Geolocation (vị trí hiện tại)

---

## 📊 Tổng quan tiến độ

| Nhóm | Bài tập | Thời gian | Độ khó |
|------|---------|-----------|--------|
| 🟢 Cơ bản | 0.0 Hello JavaScript | 45 phút | ⭐ |
| 🟢 Cơ bản | 0.1 DOM Basics | 30 phút | ⭐ |
| 🟢 Cơ bản | 0.2 Events Basics | 30 phút | ⭐ |
| 🟢 Cơ bản | 0.3 DOM Mini Projects | 60 phút | ⭐⭐ |
| � Cơ bản | 0.4 Student Array App | 45 phút | ⭐⭐ |
| �🔵 Trung bình | 3.1 Skill Filter | 30 phút | ⭐⭐ |
| 🔵 Trung bình | 3.2 Lightbox | 30 phút | ⭐⭐ |
| 🔵 Trung bình | 3.3 Form Validation | 30 phút | ⭐⭐ |
| 🔵 Trung bình | 3.4 Theme Toggle | 30 phút | ⭐⭐ |
| 🟠 Nâng cao | 3.5 Todo App CRUD | 45 phút | ⭐⭐⭐ |
| 🟠 Nâng cao | 3.6 Movie Search API | 45 phút | ⭐⭐⭐ |
| 🟠 Nâng cao | 3.7 Shopping Cart | 45 phút | ⭐⭐⭐ |
| 🟠 Nâng cao | 3.8 Weather Dashboard | 45 phút | ⭐⭐⭐ |
| **Tổng** | **13 bài** | **~9 giờ** | |

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