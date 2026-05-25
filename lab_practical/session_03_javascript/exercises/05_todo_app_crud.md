# Exercise 3.5 — Todo App CRUD (Quản lý công việc)

## 🎬 Opening Scenario

*Bạn là sinh viên năm cuối, deadline dồn dập. Cần một ứng dụng quản lý công việc (Todo App) với đầy đủ tính năng CRUD (Create, Read, Update, Delete), lưu trữ vào localStorage để dữ liệu không mất khi refresh trang.*

---

## 🎯 Mục tiêu học tập

- Xây dựng ứng dụng Todo hoàn chỉnh với Vanilla JS
- Áp dụng **CRUD operations** (Create, Read, Update, Delete)
- Sử dụng **localStorage** để persist dữ liệu
- Luyện tập **event delegation** trên danh sách động
- Hiểu **state management** pattern đơn giản

---

## 📋 Yêu cầu chi tiết

### Tính năng bắt buộc

| # | Tính năng | Mô tả chi tiết |
|---|-----------|----------------|
| 1 | **Thêm todo mới** | Nhập tiêu đề → nhấn Enter hoặc click nút "Add" → todo xuất hiện trong danh sách |
| 2 | **Hiển thị danh sách** | Todos render từ array vào `<ul>` với checkbox, tiêu đề, ngày tạo, nút edit/delete |
| 3 | **Đánh dấu hoàn thành** | Click checkbox → gạch ngang (strikethrough), đổi màu xám, lưu trạng thái |
| 4 | **Chỉnh sửa todo** | Click nút "Edit" → chuyển tiêu đề thành `<input>` inline → Enter để lưu, Escape để hủy |
| 5 | **Xóa todo** | Click nút "Delete" → confirm dialog → xóa khỏi list và localStorage |
| 6 | **Bộ lọc (Filter)** | 3 nút: All / Active / Completed → filter hiển thị theo trạng thái |
| 7 | **Đếm số lượng** | Hiển thị "X việc chưa hoàn thành" cập nhật realtime |
| 8 | **Xóa tất cả completed** | Nút "Clear Completed" → xóa tất cả todo đã hoàn thành |
| 9 | **localStorage** | Todos lưu vào localStorage, load lại khi refresh trang |
| 10 | **Trạng thái rỗng** | Khi không có todo → hiển thị illustration/message "Chưa có công việc nào" |

---

## 🏗️ HTML Structure

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App — Quản lý công việc</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="todo-container">
        <!-- Header -->
        <header class="todo-header">
            <h1>📋 Công việc hôm nay</h1>
            <p class="date" id="current-date"></p>
        </header>

        <!-- Input Section -->
        <div class="todo-input-wrapper">
            <input
                type="text"
                id="todo-input"
                class="todo-input"
                placeholder="Nhập công việc mới... (Enter để thêm)"
                autofocus
            >
            <button id="add-btn" class="add-btn">+</button>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
            <button class="filter-btn active" data-filter="all">Tất cả</button>
            <button class="filter-btn" data-filter="active">Chưa xong</button>
            <button class="filter-btn" data-filter="completed">Hoàn thành</button>
        </div>

        <!-- Todo List -->
        <ul id="todo-list" class="todo-list">
            <!-- Todo items rendered by JS -->
        </ul>

        <!-- Empty State -->
        <div id="empty-state" class="empty-state" hidden>
            <span class="empty-icon">📝</span>
            <p>Chưa có công việc nào. Thêm việc đầu tiên!</p>
        </div>

        <!-- Footer -->
        <footer class="todo-footer">
            <span id="todo-count">0 việc chưa hoàn thành</span>
            <button id="clear-completed" class="clear-btn" hidden>Xóa已完成</button>
        </footer>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 🎨 CSS Styling

```css
/* ========== BASE ========== */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
}

.todo-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 500px;
    overflow: hidden;
}

/* ========== HEADER ========== */
.todo-header {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 1.5rem;
    text-align: center;
}

.todo-header h1 { font-size: 1.5rem; }
.date { font-size: 0.875rem; opacity: 0.8; margin-top: 0.25rem; }

/* ========== INPUT ========== */
.todo-input-wrapper {
    display: flex;
    padding: 1rem;
    gap: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.todo-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}

.todo-input:focus { border-color: #6366f1; }

.add-btn {
    width: 48px;
    height: 48px;
    border: none;
    background: #6366f1;
    color: white;
    border-radius: 8px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.2s;
}

.add-btn:hover { background: #4f46e5; }

/* ========== FILTER TABS ========== */
.filter-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid #e5e7eb;
}

.filter-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    transition: all 0.2s;
    border-bottom: 2px solid transparent;
}

.filter-btn.active {
    color: #6366f1;
    border-bottom-color: #6366f1;
}

/* ========== TODO ITEM ========== */
.todo-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f3f4f6;
    transition: background 0.2s;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
}

.todo-item:hover { background: #f9fafb; }

.todo-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #6366f1;
}

.todo-text {
    flex: 1;
    font-size: 0.95rem;
    transition: all 0.2s;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #9ca3af;
}

.todo-date {
    font-size: 0.75rem;
    color: #9ca3af;
}

.todo-actions {
    display: flex;
    gap: 0.25rem;
}

.action-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background 0.2s;
}

.edit-btn:hover { background: #dbeafe; }
.delete-btn:hover { background: #fee2e2; }

/* ========== EMPTY STATE ========== */
.empty-state {
    text-align: center;
    padding: 2rem;
    color: #9ca3af;
}

.empty-icon { font-size: 3rem; display: block; margin-bottom: 0.5rem; }

/* ========== FOOTER ========== */
.todo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f9fafb;
    font-size: 0.875rem;
    color: #6b7280;
}

.clear-btn {
    border: none;
    background: transparent;
    color: #ef4444;
    cursor: pointer;
    font-size: 0.875rem;
}

.clear-btn:hover { text-decoration: underline; }

/* ========== INLINE EDIT ========== */
.todo-edit-input {
    flex: 1;
    padding: 0.25rem 0.5rem;
    border: 2px solid #6366f1;
    border-radius: 4px;
    font-size: 0.95rem;
    outline: none;
}
```

---

## 💻 JavaScript Implementation (app.js)

### Khởi tạo State

```javascript
// ===== STATE =====
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// ===== DOM ELEMENTS =====
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const emptyState = document.getElementById('empty-state');
const currentDate = document.getElementById('current-date');
const filterBtns = document.querySelectorAll('.filter-btn');

// Hiển thị ngày hiện tại
currentDate.textContent = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
```

### Hàm tạo Todo mới

```javascript
function createTodo(text) {
    return {
        id: Date.now(),                    // Unique ID từ timestamp
        text: text.trim(),                 // Nội dung
        completed: false,                  // Trạng thái
        createdAt: new Date().toISOString() // Ngày tạo
    };
}
```

### CRUD Operations

```javascript
// ===== CREATE =====
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        todoInput.classList.add('shake');
        setTimeout(() => todoInput.classList.remove('shake'), 500);
        return;
    }

    const todo = createTodo(text);
    todos.unshift(todo);    // Thêm vào đầu mảng
    saveTodos();
    render();
    todoInput.value = '';
    todoInput.focus();
}

// ===== READ (render) =====
function render() {
    const filtered = getFilteredTodos();

    todoList.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.hidden = false;
        todoList.hidden = true;
    } else {
        emptyState.hidden = true;
        todoList.hidden = false;
        filtered.forEach(todo => todoList.appendChild(createTodoElement(todo)));
    }

    updateCount();
    updateClearButton();
}

// ===== UPDATE =====
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const li = todoList.querySelector(`[data-id="${id}"]`);
    const textSpan = li.querySelector('.todo-text');

    // Tạo input inline
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'todo-edit-input';
    input.value = todo.text;

    textSpan.replaceWith(input);
    input.focus();
    input.select();

    // Enter → lưu
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const newText = input.value.trim();
            if (newText) {
                todo.text = newText;
                saveTodos();
            }
            render();
        }
        if (e.key === 'Escape') {
            render(); // Hủy, render lại
        }
    });

    // Blur → lưu
    input.addEventListener('blur', () => {
        const newText = input.value.trim();
        if (newText) {
            todo.text = newText;
            saveTodos();
        }
        render();
    });
}

// ===== DELETE =====
function deleteTodo(id) {
    const confirmed = confirm('Xác nhận xóa công việc này?');
    if (confirmed) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        render();
    }
}

function clearCompleted() {
    const confirmed = confirm('Xóa tất cả công việc đã hoàn thành?');
    if (confirmed) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        render();
    }
}
```

### Filter & Helper Functions

```javascript
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':    return todos.filter(t => !t.completed);
        case 'completed': return todos.filter(t => t.completed);
        default:          return todos;
    }
}

function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} việc chưa hoàn thành`;
}

function updateClearButton() {
    const hasCompleted = todos.some(t => t.completed);
    clearCompletedBtn.hidden = !hasCompleted;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    });
}
```

### Tạo DOM Element cho mỗi Todo

```javascript
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <span class="todo-date">${formatDate(todo.createdAt)}</span>
        <div class="todo-actions">
            <button class="action-btn edit-btn" title="Sửa">✏️</button>
            <button class="action-btn delete-btn" title="Xóa">🗑️</button>
        </div>
    `;

    // Event delegation cho checkbox
    li.querySelector('.todo-checkbox').addEventListener('change', () => toggleTodo(todo.id));
    li.querySelector('.edit-btn').addEventListener('click', () => editTodo(todo.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));

    return li;
}

// Escape HTML để tránh XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### Event Listeners

```javascript
// Thêm todo
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Filter tabs
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// Clear completed
clearCompletedBtn.addEventListener('click', clearCompleted);

// Render lần đầu
render();
```

---

## ✅ Success Criteria (Checklist)

### Bắt buộc (Core)

- [ ] Nhập text → Enter hoặc click "+" → todo mới xuất hiện
- [ ] Checkbox toggle → gạch ngang + đổi màu
- [ ] Nút Edit → inline edit → Enter lưu, Escape hủy
- [ ] Nút Delete → confirm dialog → xóa
- [ ] 3 filter tabs hoạt động đúng (All / Active / Completed)
- [ ] Đếm "X việc chưa hoàn thành" cập nhật realtime
- [ ] Refresh trang → dữ liệu giữ nguyên (localStorage)
- [ ] Empty state khi chưa có todo

### Nâng cao (Bonus)

- [ ] Animation slide-in khi thêm todo mới
- [ ] Shake animation khi input rỗng
- [ ] XSS protection (escapeHtml)
- [ ] Sắp xếp todo mới nhất lên đầu
- [ ] Hiển thị ngày giờ tạo todo
- [ ] Responsive trên mobile

---

## 🐛 Common Bugs & Debug Tips

| Bug | Nguyên nhân | Cách sửa |
|-----|------------|----------|
| Todos mất khi refresh | Không gọi `saveTodos()` sau mỗi thay đổi | Đảm bảo gọi `saveTodos()` trong mọi hàm CRUD |
| Edit không hoạt động | Event listener bị mất sau render lại | Dùng event delegation hoặc gắn lại listener |
| Checkbox không đồng bộ | Không cập nhật `todo.completed` | Gọi `toggleTodo()` trong change event |
| Filter không cập nhật | Không gọi `render()` sau khi đổi filter | Gọi `render()` trong filter click handler |

---

## 🪜 Step-by-Step Guide

### Bước 1: Setup (5 phút)

1. Tạo thư mục `05_todo_app/`
2. Tạo 3 file: `index.html`, `style.css`, `app.js`
3. Copy HTML structure vào `index.html`
4. Copy CSS vào `style.css`
5. Test: Mở trình duyệt → thấy giao diện trống

### Bước 2: Thêm todo (10 phút)

1. Trong `app.js`, khai báo state và DOM elements
2. Viết hàm `addTodo()` → push vào array → `render()`
3. Gắn event cho nút "+" và phím Enter
4. Test: Nhập "Học JavaScript" → Enter → thấy todo trong list

### Bước 3: Toggle & Delete (10 phút)

1. Viết `toggleTodo(id)` → đổi `completed` → `render()`
2. Viết `deleteTodo(id)` → filter array → `render()`
3. Gắn event vào checkbox và nút delete
4. Test: Click checkbox → gạch ngang. Click delete → xóa

### Bước 4: Edit inline (10 phút)

1. Viết `editTodo(id)` → thay span bằng input
2. Gắn keydown Enter/Escape và blur events
3. Test: Click edit → sửa text → Enter → lưu

### Bước 5: Filter & Count (5 phút)

1. Viết `getFilteredTodos()` → filter theo `currentFilter`
2. Gắn click event cho filter buttons
3. Viết `updateCount()` → đếm active todos
4. Test: Click "Chưa xong" → chỉ hiện todo chưa hoàn thành

### Bước 6: localStorage (5 phút)

1. Viết `saveTodos()` → `localStorage.setItem('todos', JSON.stringify(todos))`
2. Load khi khởi tạo: `JSON.parse(localStorage.getItem('todos')) || []`
3. Gọi `saveTodos()` trong mọi hàm CRUD
4. Test: Thêm todo → refresh → todo vẫn còn

---

## 📚 Knowledge Check (Câu hỏi kiểm tra)

1. **`Date.now()`** trả về giá trị gì? Tại sao dùng làm `id`?
2. Sự khác biệt giữa `JSON.stringify()` và `JSON.parse()`?
3. Tại sao cần gọi `e.preventDefault()` trong form submit?
4. Event delegation là gì? Tại sao cần dùng trong Todo App?
5. `localStorage` và `sessionStorage` khác nhau thế nào?

---

**← [Quay lại Session 3](../README.md)**
