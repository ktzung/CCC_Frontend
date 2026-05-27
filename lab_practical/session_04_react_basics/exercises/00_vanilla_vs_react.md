# Exercise 0.0 — DOM Thuần vs JSX: Tại sao cần React?

## 🎬 Bối cảnh

*Minh vừa học xong JavaScript DOM manipulation ở Session 3. Bạn ấy muốn nâng cấp Portfolio (Session 3) sang React. Nhưng trước tiên, cần hiểu: **tại sao phải chuyển?** Bài này sẽ cho bạn trải nghiệm trực tiếp "nỗi đau" khi thao tác DOM — rồi thấy React giải quyết nó như thế nào, qua cùng một ví dụ Todo List đơn giản.*

> 🔗 **Kết nối:** Ở [Bài 0.2](./02_state_props.md), bạn sẽ dùng `useState` để quản lý danh sách project Portfolio — cùng tư duy state như Todo ở đây, nhưng áp dụng cho dự án thật.

---

## 📋 Yêu cầu

### Phần A — "Nỗi đau" với Vanilla JS (15 phút)

Tạo file `vanilla.html` với nội dung sau — **một danh sách công việc đơn giản**:

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
        // TODO: Sinh viên hoàn thành các hàm dưới đây

        let todos = [];

        // Hàm render toàn bộ danh sách ra DOM
        function renderTodos() {
            // TODO 1: Lấy phần tử #todoList
            // TODO 2: Xóa toàn bộ nội dung cũ
            // TODO 3: Duyệt mảng todos, tạo HTML cho mỗi todo
            // TODO 4: Gán innerHTML
        }

        // Hàm thêm todo mới
        function addTodo() {
            // TODO 5: Lấy giá trị từ input
            // TODO 6: Tạo object { id, text, done: false }
            // TODO 7: Push vào mảng todos
            // TODO 8: Gọi renderTodos()
            // TODO 9: Xóa input
        }

        // Hàm toggle done
        function toggleTodo(id) {
            // TODO 10: Tìm todo theo id, đảo done
            // TODO 11: Gọi renderTodos()
        }

        // Hàm xóa todo
        function deleteTodo(id) {
            // TODO 12: Lọc bỏ todo có id trùng
            // TODO 13: Gọi renderTodos()
        }
    </script>
</body>
</html>
```

### 🎯 Hoàn thành tất cả TODO trong file `vanilla.html`

---

### Phần B — Cùng chức năng, nhưng với JSX (15 phút)

Tạo file `react_demo.html` — **dùng React CDN, không cần cài đặt**:

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

        // TODO: Hoàn thành component TodoApp
        function TodoApp() {
            const [todos, setTodos] = useState([]);
            const [input, setInput] = useState('');

            function addTodo() {
                // TODO 1: Kiểm tra input rỗng
                // TODO 2: Tạo todo mới { id: Date.now(), text: input, done: false }
                // TODO 3: Cập nhật state
                // TODO 4: Xóa input
            }

            function toggleTodo(id) {
                // TODO 5: Dùng setTodos với map để đảo done
            }

            function deleteTodo(id) {
                // TODO 6: Dùng setTodos với filter để xóa
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
                    {/* TODO 7: Dùng .map() render danh sách todo */}
                    {/* TODO 8: Mỗi item có nút toggle và delete */}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<TodoApp />);
    </script>
</body>
</html>
```

### 🎯 Hoàn thành tất cả TODO trong file `react_demo.html`

---

## 💡 Câu hỏi suy nghĩ (ghi ra file `reflection.md`)

1. Ở **Phần A**, mỗi lần thêm/xóa/toggle 1 todo, bạn phải gọi bao nhiêu hàm? Liệt kê.
2. Ở **Phần B**, khi `setTodos(...)` chạy, React tự động làm gì giúp bạn?
3. Nếu Portfolio của Minh có 50 project, cách nào quản lý danh sách an toàn hơn? Tại sao?
4. **Kết nối Portfolio:** Tưởng tượng `ProjectCard` thay cho `TodoItem` — mỗi project cũng cần hiển thị, lọc theo category, xóa bỏ. Bạn thấy `useState` + `.map()` + `.filter()` sẽ áp dụng như thế nào cho Portfolio?

---

## ✅ Tiêu chí đạt bài

- [ ] `vanilla.html` hoạt động: thêm, toggle, xóa todo
- [ ] `react_demo.html` hoạt động: thêm, toggle, xóa todo
- [ ] `reflection.md` trả lời 4 câu hỏi
- [ ] Hai file cho cùng kết quả, nhưng code khác nhau rõ rệt

---

## 🔑 Gợi ý

<details>
<summary>Click để xem gợi ý Phần A (vanilla.js)</summary>

```javascript
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
```
</details>

<details>
<summary>Click để xem gợi ý Phần B (React)</summary>

```jsx
function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
}

// Trong return:
{todos.map(todo => (
    <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
        <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
        <span>{todo.text}</span>
        <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
    </div>
))}
```
</details>

---

## 📝 Ghi chú cho giảng viên

> **Mục đích:** Sinh viên phải *trải nghiệm* sự bất tiện của DOM thuần trước khi được giới thiệu React. Không giảng lý thuyết — để code tự nói lên.
>
> **Câu hỏi thảo luận:** "Nếu phải thêm tính năng 'sắp xếp todo theo tên', ở Phần A và Phần B, bạn sẽ sửa code ở đâu? Cách nào dễ hơn?"
>
> **Kết nối lên lớp:** Bài 0.0 dạy pattern `state → render`, Bài 0.2 áp dụng pattern này cho Portfolio projects.

---

**← [Quay lại Session 4](../README.md) | → [Tiếp tục Bài 0.5 — JSX: Viết giao diện Portfolio](./05_jsx_basics.md)**
