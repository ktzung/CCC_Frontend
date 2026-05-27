# Tier 5 — Mini Project: Todo App (React)

> **Thời gian:** 45-60 phút  
> **Yêu cầu:** Hoàn thành Tier 1-4  
> **Mục tiêu:** Kết hợp tất cả kiến thức vào dự án Todo App hoàn chỉnh

---

## 🎬 Bối cảnh

*Minh đã học: useState, render list, add, delete, edit. Giờ bạn ấy muốn làm lại Todo App — cùng dự án đã làm ở Tier 1 (so sánh Vanilla vs React), nhưng lần này với đầy đủ tính năng. Đây là "bài kiểm tra" xem bạn đã hiểu React đến đâu!*

> 🔗 **Kết nối:** Ở Tier 1, bạn đã làm Todo đơn giản (thêm, toggle, xóa). Giờ nâng cấp: thêm filter, đếm số việc, lưu localStorage.

---

## 📝 Yêu cầu tính năng

| # | Tính năng | Mô tả |
|---|-----------|-------|
| 1 | Thêm todo | Nhập tiêu đề → Enter hoặc click nút thêm |
| 2 | Hiển thị danh sách | Render todos với checkbox, tiêu đề, nút xóa |
| 3 | Toggle done | Click checkbox → gạch ngang |
| 4 | Xóa todo | Click nút xóa → xóa khỏi danh sách |
| 5 | Đếm số việc | Hiển thị "X việc chưa hoàn thành" |
| 6 | Filter | 3 nút: Tất cả / Chưa xong / Hoàn thành |
| 7 | Trạng thái rỗng | Khi không có todo → hiện thông báo |

---

## 🏗️ Code hoàn chỉnh

### `TodoApp.jsx`
```jsx
import { useState } from "react";

function TodoApp() {
    // State chính
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
    
    // ===== Thêm todo =====
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
    
    // Xử lý phím Enter
    function handleKeyPress(e) {
        if (e.key === "Enter") addTodo();
    }
    
    // ===== Toggle done =====
    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }
    
    // ===== Xóa todo =====
    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    
    // ===== Xóa tất cả đã hoàn thành =====
    function clearCompleted() {
        setTodos(todos.filter(todo => !todo.done));
    }
    
    // ===== Lọc todos theo filter =====
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true; // "all"
    });
    
    // ===== Đếm số việc chưa hoàn thành =====
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
            
            {/* Input */}
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
            
            {/* Filter tabs */}
            <div style={{ 
                display: "flex", 
                marginBottom: "15px",
                gap: "5px"
            }}>
                {["all", "active", "completed"].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{ 
                            flex: 1,
                            padding: "8px",
                            background: filter === f ? "#3498db" : "#f0f0f0",
                            color: filter === f ? "white" : "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        {f === "all" ? "Tất cả" : 
                         f === "active" ? "Chưa xong" : "Hoàn thành"}
                    </button>
                ))}
            </div>
            
            {/* Todo list */}
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
                    <div 
                        key={todo.id}
                        style={{ 
                            display: "flex",
                            alignItems: "center",
                            padding: "12px",
                            margin: "5px 0",
                            background: todo.done ? "#f0fff0" : "#fff",
                            border: "1px solid #eee",
                            borderRadius: "4px"
                        }}
                    >
                        <input 
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
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
                            onClick={() => deleteTodo(todo.id)}
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
                ))
            )}
            
            {/* Footer */}
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
                        <button 
                            onClick={clearCompleted}
                            style={{ 
                                background: "none",
                                border: "none",
                                color: "#e74c3c",
                                cursor: "pointer"
                            }}
                        >
                            Xóa đã hoàn thành ({completedCount})
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default TodoApp;
```

---

## 🧩 Giải thích kiến trúc

```
TodoApp Component
├── State
│   ├── todos: []          // Danh sách công việc
│   ├── inputValue: ""     // Giá trị input
│   └── filter: "all"      // Bộ lọc hiện tại
│
├── Functions (Handlers)
│   ├── addTodo()          // Thêm todo mới
│   ├── toggleTodo(id)     // Đánh dấu done/undone
│   ├── deleteTodo(id)     // Xóa todo
│   ├── clearCompleted()   // Xóa tất cả đã hoàn thành
│   └── handleKeyPress()   // Xử lý phím Enter
│
└── UI (JSX)
    ├── Input + Button      // Nhập todo mới
    ├── Filter Tabs         // Lọc danh sách
    ├── Todo List           // Hiển thị todos
    └── Footer              // Đếm + Clear
```

---

## 🎯 Thử thách mở rộng

### Level 1 (Dễ)
1. Thêm ngày tạo cho mỗi todo
2. Hiển thị tổng số todos (không chỉ active)
3. Thay đổi placeholder khi filter thay đổi

### Level 2 (Trung bình)
4. Thêm nút "Sửa" inline (giống Tier 4)
5. Double-click vào todo để sửa
6. Lưu todos vào localStorage (dùng useEffect)

### Level 3 (Khó)
7. Kéo thả sắp xếp thứ tự (drag & drop)
8. Phân nhóm theo ngày
9. Thêm tag/category cho mỗi todo

---

## ✅ Checklist hoàn thành

- [ ] Thêm todo mới
- [ ] Hiển thị danh sách todos
- [ ] Toggle done/undone
- [ ] Xóa todo
- [ ] Đếm số việc chưa hoàn thành
- [ ] Filter: Tất cả / Chưa xong / Hoàn thành
- [ ] Hiển thị trạng thái rỗng
- [ ] Clear completed

---

## 🎯 So sánh với Vanilla JS

| Tính năng | Vanilla JS (Tier 1) | React (Tier 5) |
|-----------|---------------------|----------------|
| State | Biến toàn cục | useState |
| Render | Gọi renderTodos() thủ công | Tự động |
| Thêm | push + render | setState([...todos, new]) |
| Xóa | filter + render | setState(todos.filter()) |
| Toggle | find + render | setState(todos.map()) |
| Filter | Phải tạo hàm riêng | Computed value (filteredTodos) |

**← Quay lại: [Tier 4 — Lists & Events](TIER_4_lists_events.md)**

**🎓 Chúc mừng! Bạn đã xây dựng Todo App hoàn chỉnh với React!**
