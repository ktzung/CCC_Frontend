# Tier 16 — useReducer (Quản lý state phức tạp)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Quản lý state phức tạp với reducer pattern  
> **📋 Cần biết:** Tier 7 (State Patterns), Tier 8 (Events)  
> **🚫 Không cần biết:** Redux (nhưng pattern giống)

---

## 🎬 Opening Hook

*Minh làm Todo App với nhiều actions: thêm, xóa, toggle, lọc, xóa tất cả. Mỗi action cần setState khác nhau.*

```jsx
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all");
const [error, setError] = useState(null);
// 3 useState, mỗi lần update phải nhớ cách đúng → dễ sai
```

*"Dùng useReducer. Tất cả actions tập trung vào MỘT chỗ."*

---

## 🎯 Hôm nay bạn sẽ học

```
useReducer = Quản lý state phức tạp
           = "Nhà máy" với quy trình rõ ràng:
             Action (đơn hàng) → Reducer (quy trình) → State mới (sản phẩm)

const [state, dispatch] = useReducer(reducer, initialState);
```

---

## 📝 Bài 16.1 — useReducer cơ bản (12 phút)

### Counter với useReducer

```jsx
function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <div>
            <h1>{state.count}</h1>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
    );
}
```

---

## 📝 Bài 16.2 — Todo App với useReducer (15 phút)

### Reducer phức tạp

```jsx
const initialState = {
    items: [],
    filter: "all",
    error: null
};

function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                items: [...state.items, {
                    id: Date.now(),
                    text: action.payload,
                    done: false
                }]
            };
        case "TOGGLE_TODO":
            return {
                ...state,
                items: state.items.map(t =>
                    t.id === action.payload ? { ...t, done: !t.done } : t
                )
            };
        case "DELETE_TODO":
            return {
                ...state,
                items: state.items.filter(t => t.id !== action.payload)
            };
        case "SET_FILTER":
            return { ...state, filter: action.payload };
        default:
            return state;
    }
}
```

### Component

```jsx
function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim()) {
            dispatch({ type: "ADD_TODO", payload: input });
            setInput("");
        }
    };

    const filtered = state.items.filter(t => {
        if (state.filter === "active") return !t.done;
        if (state.filter === "done") return t.done;
        return true;
    });

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={addTodo}>Thêm</button>

            <div>
                <button onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}>Tất cả</button>
                <button onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}>Chưa xong</button>
                <button onClick={() => dispatch({ type: "SET_FILTER", payload: "done" })}>Đã xong</button>
            </div>

            <ul>
                {filtered.map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.done}
                            onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

---

## 📊 So sánh: useState vs useReducer

```
                    useState                     useReducer
                    ────────                     ──────────
Đơn giản            ✅ Ít state, ít action       ❌ Overhead
Phức tạp            ❌ Dễ rối khi nhiều action    ✅ Tập trung, rõ ràng
Logic cập nhật      Rải rác trong component       Tập trung trong reducer
Test                Khó                           Dễ (reducer là pure function)
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 7:** State Patterns — immutability
- **Sẽ cần trong Tier 22:** Redux — useReducer là phiên bản đơn giản của Redux
- **Tham khảo thêm:** `04_hooks/06_hooks_api.md` (file cũ)
