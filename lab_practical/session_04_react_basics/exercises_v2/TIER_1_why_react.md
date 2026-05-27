# Tier 1 — Tại sao cần React? (So sánh Vanilla JS vs React)

> **Thời gian:** 25-30 phút  
> **Mục tiêu:** Hiểu tại sao React ra đời, trải nghiệm "nỗi đau" khi code DOM thuần  
> **Kết nối:** Bạn đã làm Mini Projects (Calculator, Notes App) bằng Vanilla JS — giờ thấy React giải quyết vấn đề gì

---

## 🎬 Bối cảnh

*Minh vừa hoàn thành Notes App ở Tier 7 JavaScript. App chạy tốt, nhưng khi muốn thêm tính năng "sửa ghi chú inline", bạn ấy phải:*
1. *Tìm đúng phần tử trong DOM*
2. *Tạo input mới*
3. *Gán giá trị cũ*
4. *Xử lý sự kiện Enter/Escape*
5. *Cập nhật lại giao diện*

*Mỗi lần thay đổi UI, phải viết rất nhiều code DOM manipulation. React giải quyết vấn đề này bằng cách: **UI = f(state)** — thay đổi state, UI tự cập nhật.*

---

## 📝 Bài 1.1 — "Nỗi đau" với Vanilla JS (10 phút)

### Yêu cầu
Hoàn thành code Todo List đơn giản bằng Vanilla JS

### Code mẫu — `vanilla.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo — Vanilla JS</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 2rem auto; }
        .todo-item { 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            padding: 8px; 
            border-bottom: 1px solid #eee; 
        }
        .todo-item.done span { 
            text-decoration: line-through; 
            color: #999; 
        }
        .todo-item button { 
            margin-left: auto; 
            background: #e74c3c; 
            color: white; 
            border: none; 
            padding: 4px 8px; 
            border-radius: 4px; 
            cursor: pointer; 
        }
        input[type="text"] { padding: 8px; width: 70%; }
        .add-btn { 
            padding: 8px 16px; 
            background: #3498db; 
            color: white; 
            border: none; 
            border-radius: 4px; 
            cursor: pointer; 
        }
    </style>
</head>
<body>
    <h1>📋 Todo List (Vanilla JS)</h1>
    <div>
        <input type="text" id="todoInput" placeholder="Nhập công việc...">
        <button class="add-btn" onclick="addTodo()">Thêm</button>
    </div>
    <div id="todoList"></div>

    <script>
        let todos = [];

        // TODO 1: Render toàn bộ danh sách ra DOM
        function renderTodos() {
            let listEl = document.getElementById("todoList");
            listEl.innerHTML = "";
            
            for (let todo of todos) {
                let div = document.createElement("div");
                div.className = "todo-item" + (todo.done ? " done" : "");
                div.innerHTML = `
                    <input type="checkbox" ${todo.done ? "checked" : ""} 
                        onchange="toggleTodo(${todo.id})">
                    <span>${todo.text}</span>
                    <button onclick="deleteTodo(${todo.id})">Xóa</button>
                `;
                listEl.appendChild(div);
            }
        }

        // TODO 2: Thêm todo mới
        function addTodo() {
            let input = document.getElementById("todoInput");
            let text = input.value.trim();
            
            if (text === "") return;
            
            todos.push({
                id: Date.now(),
                text: text,
                done: false
            });
            
            input.value = "";
            renderTodos(); // Phải gọi lại mỗi lần thay đổi!
        }

        // TODO 3: Toggle done
        function toggleTodo(id) {
            let todo = todos.find(t => t.id === id);
            if (todo) {
                todo.done = !todo.done;
                renderTodos(); // Phải gọi lại mỗi lần thay đổi!
            }
        }

        // TODO 4: Xóa todo
        function deleteTodo(id) {
            todos = todos.filter(t => t.id !== id);
            renderTodos(); // Phải gọi lại mỗi lần thay đổi!
        }
    </script>
</body>
</html>
```

### Câu hỏi suy nghĩ
1. Mỗi lần thêm/sửa/xóa, phải gọi hàm gì?
2. Nếu quên gọi `renderTodos()` thì chuyện gì xảy ra?
3. Code có dễ đọc không? Có dễ thêm tính năng mới không?

---

## 📝 Bài 1.2 — Cùng chức năng với React (15 phút)

### Yêu cầu
Tạo lại Todo List bằng React — thấy sự khác biệt

### Code mẫu — `react.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo — React</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 2rem auto; }
        .todo-item { 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            padding: 8px; 
            border-bottom: 1px solid #eee; 
        }
        .todo-item.done span { 
            text-decoration: line-through; 
            color: #999; 
        }
        .todo-item button { 
            margin-left: auto; 
            background: #e74c3c; 
            color: white; 
            border: none; 
            padding: 4px 8px; 
            border-radius: 4px; 
            cursor: pointer; 
        }
        input[type="text"] { padding: 8px; width: 70%; }
        .add-btn { 
            padding: 8px 16px; 
            background: #3498db; 
            color: white; 
            border: none; 
            border-radius: 4px; 
            cursor: pointer; 
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // Import useState từ React
        const { useState } = React;

        function TodoApp() {
            // State quản lý danh sách todo
            const [todos, setTodos] = useState([]);
            const [inputValue, setInputValue] = useState("");

            // Thêm todo mới
            function addTodo() {
                if (inputValue.trim() === "") return;
                
                setTodos([...todos, {
                    id: Date.now(),
                    text: inputValue,
                    done: false
                }]);
                
                setInputValue(""); // Xóa input
            }

            // Toggle done
            function toggleTodo(id) {
                setTodos(todos.map(todo => 
                    todo.id === id ? { ...todo, done: !todo.done } : todo
                ));
            }

            // Xóa todo
            function deleteTodo(id) {
                setTodos(todos.filter(todo => todo.id !== id));
            }

            // UI tự động cập nhật khi state thay đổi!
            return (
                <div>
                    <h1>📋 Todo List (React)</h1>
                    <div>
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Nhập công việc..."
                        />
                        <button className="add-btn" onClick={addTodo}>Thêm</button>
                    </div>
                    
                    {/* Render danh sách — KHÔNG cần gọi render() */}
                    {todos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
                            <input 
                                type="checkbox" 
                                checked={todo.done}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span>{todo.text}</span>
                            <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
                        </div>
                    ))}
                </div>
            );
        }

        // Render ứng dụng
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<TodoApp />);
    </script>
</body>
</html>
```

### So sánh

| Vanilla JS | React |
|-----------|-------|
| Phải gọi `renderTodos()` mỗi lần thay đổi | UI tự cập nhật khi `setState` |
| Dùng `innerHTML` (nguy hiểm nếu có user input) | Dùng JSX (an toàn hơn) |
| Code DOM dài, khó đọc | Code ngắn gọn, dễ hiểu |
| Khó tái sử dụng | Component dễ tái sử dụng |

### Câu hỏi suy nghĩ
1. Trong React, khi nào UI được cập nhật?
2. `useState` dùng để làm gì?
3. Tại sao React không cần gọi hàm render() thủ công?

---

## ✅ Checklist hoàn thành

- [ ] Chạy được Todo List với Vanilla JS
- [ ] Chạy được Todo List với React (dùng CDN)
- [ ] Hiểu sự khác biệt chính giữa 2 cách
- [ ] Trả lời được câu hỏi: "Tại sao cần React?"

---

## 🎯 Điểm mấu chốt

```
Vanilla JS:   State thay đổi → Gọi render() thủ công → DOM cập nhật
React:        State thay đổi (setState) → UI tự động cập nhật
```

**→ Tiếp theo: [Tier 2 — React Setup & JSX](TIER_2_setup_jsx.md)**
