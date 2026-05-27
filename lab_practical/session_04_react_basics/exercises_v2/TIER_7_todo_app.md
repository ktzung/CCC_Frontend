# Tier 7 — Mini Project: Todo App (Tổng hợp kiến thức)

> **Thời gian:** 45-60 phút  
> **Yêu cầu:** Hoàn thành Tier 0-6  
> **Mục tiêu:** Kết hợp tất cả kiến thức vào dự án hoàn chỉnh

---

## 🎯 Hôm nay bạn sẽ làm gì

```
Tier 0: Component           → Tạo component TodoApp
Tier 1: React Flow          → Hiểu setState → re-render
Tier 2: JSX Variables       → Hiển thị danh sách, đếm số việc
Tier 3: Component Split     → Tách TodoItem, TodoFilter
Tier 4: useState            → Quản lý todos, inputValue, filter
Tier 5: Events              → Xử lý click, input, keyboard
Tier 6: Lists & CRUD        → Thêm, sửa, xóa, toggle
```

---

## 📝 Yêu cầu tính năng

| # | Tính năng | Kiến thức sử dụng |
|---|-----------|-------------------|
| 1 | Thêm todo | useState, events, keyboard |
| 2 | Hiển thị danh sách | Lists, key, conditional |
| 3 | Toggle done | useState, event, ternary |
| 4 | Xóa todo | useState, filter |
| 5 | Đếm số việc | Computed value |
| 6 | Filter | useState, filter |

---

## 🏗️ Cấu trúc file

```
📁 src/
├── components/
│   ├── TodoItem.jsx      ← Component con (Tier 3)
│   └── TodoFilter.jsx    ← Component con (Tier 3)
├── App.jsx               ← Component chính
└── main.jsx
```

---

## 📝 Code hoàn chỉnh

### `App.jsx`
```jsx
import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    // State chính (Tier 4)
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");
    
    // ===== Thêm todo (Tier 6) =====
    function addTodo() {
        if (inputValue.trim() === "") return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            done: false
        };
        
        setTodos([...todos, newTodo]);
        setInputValue("");
    }
    
    // Xử lý phím Enter (Tier 5)
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    }
    
    // ===== Toggle done (Tier 6) =====
    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }
    
    // ===== Xóa todo (Tier 6) =====
    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    
    // ===== Lọc todos (Tier 2) =====
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });
    
    // ===== Đếm số việc (Tier 2) =====
    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = todos.filter(todo => todo.done).length;
    
    return (
        <div style={{ 
            maxWidth: "500px", 
            margin: "0 auto", 
            padding: "20px",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1 style={{ textAlign: "center" }}>📋 Todo List</h1>
            
            {/* Input (Tier 5) */}
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập công việc..."
                    style={{ 
                        flex: 1, 
                        padding: "10px", 
                        fontSize: "16px",
                        border: "2px solid #ddd",
                        borderRadius: "4px 0 0 4px"
                    }}
                />
                <button 
                    onClick={addTodo}
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "0 4px 4px 0",
                        cursor: "pointer"
                    }}
                >
                    Thêm
                </button>
            </div>
            
            {/* Filter (Tier 3) */}
            <TodoFilter 
                filter={filter}
                setFilter={setFilter}
            />
            
            {/* Todo list (Tier 6) */}
            {filteredTodos.length === 0 ? (
                <div style={{ 
                    textAlign: "center", 
                    padding: "40px",
                    color: "#999"
                }}>
                    {todos.length === 0 
                        ? "📝 Chưa có công việc nào" 
                        : "Không có công việc phù hợp"}
                </div>
            ) : (
                filteredTodos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))
            )}
            
            {/* Footer (Tier 2) */}
            {todos.length > 0 && (
                <div style={{ 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                    padding: "10px",
                    background: "#f9f9f9",
                    borderRadius: "4px"
                }}>
                    <span>{activeCount} việc chưa hoàn thành</span>
                    {completedCount > 0 && (
                        <span style={{ color: "#666" }}>
                            {completedCount} việc đã xong
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
```

### `components/TodoItem.jsx`
```jsx
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div style={{ 
            display: "flex",
            alignItems: "center",
            padding: "12px",
            margin: "5px 0",
            background: todo.done ? "#f0fff0" : "#fff",
            border: "1px solid #eee",
            borderRadius: "4px"
        }}>
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "10px" }}
            />
            <span style={{ 
                flex: 1,
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#999" : "#333"
            }}>
                {todo.text}
            </span>
            <button 
                onClick={() => onDelete(todo.id)}
                style={{ 
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                🗑
            </button>
        </div>
    );
}

export default TodoItem;
```

### `components/TodoFilter.jsx`
```jsx
function TodoFilter({ filter, setFilter }) {
    const filters = [
        { key: "all", label: "Tất cả" },
        { key: "active", label: "Chưa xong" },
        { key: "completed", label: "Hoàn thành" }
    ];
    
    return (
        <div style={{ 
            display: "flex", 
            marginBottom: "15px",
            gap: "5px"
        }}>
            {filters.map(f => (
                <button 
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{ 
                        flex: 1,
                        padding: "8px",
                        background: filter === f.key ? "#3498db" : "#f0f0f0",
                        color: filter === f.key ? "white" : "#333",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;
```

---

## 🧩 Giải thích kiến trúc

```
App (Component chính)
├── State
│   ├── todos: []          // Danh sách công việc
│   ├── inputValue: ""     // Giá trị input
│   └── filter: "all"      // Bộ lọc
│
├── Functions
│   ├── addTodo()          // Thêm
│   ├── toggleTodo(id)     // Toggle done
│   ├── deleteTodo(id)     // Xóa
│   └── handleKeyPress()   // Xử lý Enter
│
├── TodoFilter (Component con)
│   └── Props: filter, setFilter
│
└── TodoItem (Component con)
    └── Props: todo, onToggle, onDelete
```

---

## ✅ Checklist

- [ ] Thêm todo mới
- [ ] Hiển thị danh sách todos
- [ ] Toggle done/undone
- [ ] Xóa todo
- [ ] Đếm số việc chưa hoàn thành
- [ ] Filter: Tất cả / Chưa xong / Hoàn thành
- [ ] Tách component TodoItem
- [ ] Tách component TodoFilter

---

## 🎯 Thử thách mở rộng

### Level 1 (Dễ)
1. Thêm ngày tạo cho mỗi todo
2. Hiển thị tổng số todos
3. Thay đổi placeholder khi filter

### Level 2 (Trung bình)
4. Thêm nút "Sửa" inline
5. Double-click để sửa
6. Lưu todos vào localStorage

### Level 3 (Khó)
7. Kéo thả sắp xếp
8. Phân nhóm theo ngày
9. Thêm tag/category

---

## 🎯 Tổng kết

```
Bạn đã học:
✅ Tier 0: Component cơ bản
✅ Tier 1: Luồng hoạt động
✅ Tier 2: Biến trong JSX
✅ Tier 3: Chia component
✅ Tier 4: useState
✅ Tier 5: Events
✅ Tier 6: Lists & CRUD
✅ Tier 7: Todo App (tổng hợp)
```

**🎓 Chúc mừng! Bạn đã xây dựng Todo App hoàn chỉnh với React!**

**→ Tiếp theo: Học useEffect, Component Lifecycle, API calls**
