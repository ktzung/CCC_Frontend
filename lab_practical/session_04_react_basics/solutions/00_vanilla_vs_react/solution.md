# Solution — Bài 0.0: DOM Thuần vs JSX

## Phần A — vanilla.html (Solution hoàn chỉnh)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo — Vanilla JS</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 2rem auto; }
        .todo-item { display: flex; align-items: center; gap: 10px; padding: 8px; border-bottom: 1px solid #eee; }
        .todo-item.done span { text-decoration: line-through; color: #999; }
        .todo-item button { margin-left: auto; background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
        input[type="text"] { padding: 8px; width: 70%; }
        button.add-btn { padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>📋 Todo List</h1>
    <div>
        <input type="text" id="todoInput" placeholder="Nhập công việc...">
        <button class="add-btn" onclick="addTodo()">Thêm</button>
    </div>
    <div id="todoList"></div>

    <script>
        let todos = [];

        function renderTodos() {
            const list = document.getElementById('todoList');
            list.innerHTML = todos.map(todo => `
                <div class="todo-item ${todo.done ? 'done' : ''}">
                    <input type="checkbox" ${todo.done ? 'checked' : ''}
                           onchange="toggleTodo(${todo.id})">
                    <span>${todo.text}</span>
                    <button onclick="deleteTodo(${todo.id})">Xóa</button>
                </div>
            `).join('');
        }

        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            if (!text) return;

            todos.push({ id: Date.now(), text: text, done: false });
            renderTodos();
            input.value = '';
        }

        function toggleTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.done = !todo.done;
                renderTodos();
            }
        }

        function deleteTodo(id) {
            todos = todos.filter(t => t.id !== id);
            renderTodos();
        }
    </script>
</body>
</html>
```

---

## Phần B — react_demo.html (Solution hoàn chỉnh)

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
        .todo-item { display: flex; align-items: center; gap: 10px; padding: 8px; border-bottom: 1px solid #eee; }
        .todo-item.done span { text-decoration: line-through; color: #999; }
        .todo-item button { margin-left: auto; background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
        input[type="text"] { padding: 8px; width: 70%; }
        button.add-btn { padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState } = React;

        function TodoApp() {
            const [todos, setTodos] = useState([]);
            const [input, setInput] = useState('');

            function addTodo() {
                if (!input.trim()) return;
                setTodos([...todos, { id: Date.now(), text: input, done: false }]);
                setInput('');
            }

            function toggleTodo(id) {
                setTodos(todos.map(todo =>
                    todo.id === id ? { ...todo, done: !todo.done } : todo
                ));
            }

            function deleteTodo(id) {
                setTodos(todos.filter(todo => todo.id !== id));
            }

            return (
                <div>
                    <h1>📋 Todo List</h1>
                    <div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập công việc..."
                        />
                        <button className="add-btn" onClick={addTodo}>Thêm</button>
                    </div>
                    {todos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
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

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<TodoApp />);
    </script>
</body>
</html>
```

---

## So sánh code — Tại sao React tốt hơn?

| Tiêu chí | Vanilla JS | React |
|----------|-----------|-------|
| **Thêm item** | push + renderTodos() | `setTodos([...todos, newItem])` |
| **Xóa item** | filter + renderTodos() | `setTodos(todos.filter(...))` |
| **Toggle** | find + mutate + renderTodos() | `setTodos(todos.map(...))` |
| **Render lại** | Xóa innerHTML → tạo lại toàn bộ DOM | React tự diff → chỉ thay đổi phần cần thiết |
| **DOM thực tế** | Tạo lại toàn bộ mỗi lần render | Chỉ cập nhật phần khác biệt (Virtual DOM) |
| **Quản lý state** | Biến global, dễ bị sửa nhầm | State đóng trong component, an toàn |

---

## Câu hỏi suy nghĩ — Gợi ý trả lời

### Q1: Vanilla JS, mỗi lần thêm/xóa/toggle phải làm gì?
- Lấy element DOM (`getElementById`)
- Xóa toàn bộ nội dung cũ (`innerHTML = ''`)
- Duyệt lại toàn bộ mảng
- Tạo lại toàn bộ HTML string
- Gán lại innerHTML
→ **5 bước mỗi lần thay đổi, dù chỉ 1 item**

### Q2: React tự động làm gì khi state thay đổi?
- React gọi lại component function
- Tạo Virtual DOM mới
- So sánh (diff) với Virtual DOM cũ
- Chỉ cập nhật những phần thực sự thay đổi trên DOM thật
→ **Developer chỉ cần thay đổi state, React lo phần còn lại**

### Q3: 1000 items, cách nào an toàn hơn?
- **React**: Vì dùng Virtual DOM diff → chỉ cập nhật 1-2 element thay vì render lại 1000 element
- **Vanilla JS**: innerHTML sẽ tạo lại toàn bộ HTML string cho 1000 items → chậm, mất state (focus, scroll position)

### Q4: "React giúp ích gì so với DOM thuần?"
> React giúp developer tập trung vào **"UI nên trông như gì"** (declarative) thay vì **"làm thế nào để cập nhật UI"** (imperative). Khi state thay đổi, React tự động cập nhật DOM hiệu quả qua Virtual DOM, giúp code ngắn gọn hơn, dễ bảo trì hơn, và ít bug hơn.
