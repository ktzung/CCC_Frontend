# 🟩 TUẦN 6 - BÀI 02 (JS FRAMEWORKS)
# **REACT FUNDAMENTALS & HOOKS**

---

## 0. 🎬 Opening Hook

*Minh mở file React đầu tiên và thấy:*

```javascript
function ProductCard({ name, price }) {
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>${price}</p>
        </div>
    );
}
```

*"HTML viết trong JavaScript?! Đây có phải cú pháp hợp lệ không?"*

*"Không — đây là JSX," anh Hùng cười. "Browser không hiểu JSX. Vite/Babel biên dịch nó thành JavaScript thuần trước khi chạy. JSX chỉ là shorthand. Khi quen, bạn sẽ không tưởng tượng được tại sao người ta từng viết UI theo cách khác."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Đây là **bài quan trọng nhất trong toàn bộ module React**. JSX + useState + useEffect = 90% code React mà bạn sẽ viết hàng ngày. Nắm 3 thứ này → bạn có thể xây bất kỳ UI React nào.

---

## 2. 🌐 Big Picture — React Mental Model

```
REACT = UI Library, không phải Full Framework

React component là FUNCTION:
  Input: Props (dữ liệu từ ngoài)
  Output: JSX (HTML sẽ render)
  State: Dữ liệu nội bộ, thay đổi theo user action

LIFECYCLE của component:
Mount (hiện lần đầu)
    ↓
Render (JSX → DOM)
    ↓
User Action → setXxx() → State thay đổi
    ↓
Re-render (chỉ những phần thay đổi)
    ↓
Unmount (xóa khỏi DOM)

HOOKS = Functions cho phép dùng React features trong function component:
useState  → Quản lý state nội bộ
useEffect → Side effects (fetch API, timers, subscriptions)
useRef    → Ref to DOM element hoặc giữ giá trị qua render
useContext → Đọc context (global state nhẹ)
```

---

## 3. ⚙️ Core Technical Truth

### Setup với Vite

```bash
npm create vite@latest my-todo-app -- --template react
cd my-todo-app
npm install
npm run dev
# → http://localhost:5173
```

```
my-todo-app/
├── src/
│   ├── components/     ← Components tái sử dụng
│   │   └── TodoItem.jsx
│   ├── App.jsx         ← Root component
│   └── main.jsx        ← Entry point (ReactDOM.render)
├── index.html          ← Shell HTML (chứa <div id="root">)
└── vite.config.js
```

---

### JSX — JavaScript + XML

```jsx
// JSX là JavaScript, không phải HTML
// Được biên dịch bởi Babel → React.createElement(...)

// Khác biệt quan trọng giữa JSX và HTML:
// HTML                         JSX
// class="..."           →      className="..."
// for="..."             →      htmlFor="..."
// <br>                  →      <br />    (phải self-closing)
// onclick="..."         →      onClick={handler} (camelCase)
// style="color: red"    →      style={{ color: "red" }} (object!)

// 1. Phải có 1 root element
// ❌
function Bad() {
    return (
        <h1>Title</h1>
        <p>Paragraph</p>
    );
}

// ✅ Dùng Fragment (không render thêm div vào DOM)
function Good() {
    return (
        <>
            <h1>Title</h1>
            <p>Paragraph</p>
        </>
    );
}

// 2. Expressions trong {} — bất kỳ JS expression hợp lệ
const user = { name: "Minh", age: 21 };
const isLoggedIn = true;

function Profile() {
    return (
        <div>
            <h1>Chào {user.name}!</h1>
            <p>Tuổi: {user.age}</p>
            <p>2 + 2 = {2 + 2}</p>
            <p>{isLoggedIn ? "Đã đăng nhập" : "Chưa đăng nhập"}</p>
            {isLoggedIn && <button>Đăng xuất</button>}
        </div>
    );
}

// 3. Style là object, không phải string
<div style={{ backgroundColor: "#2563eb", fontSize: "18px", padding: "16px" }}>
    Styled div
</div>

// 4. Render list — phải có key prop
const todos = [
    { id: 1, text: "Học React" },
    { id: 2, text: "Làm BTL" }
];

function TodoList() {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
                // ↑ key PHẢI là unique và stable (dùng id, không dùng index)
            ))}
        </ul>
    );
}
```

---

### Components & Props

```jsx
// Function component = function trả về JSX
// Tên phải viết Hoa (để phân biệt với HTML tags)

// Props = object JavaScript, truyền như HTML attributes
function ProductCard({ name, price, imageUrl, badge, onAddToCart }) {
    // Destructure từ props object
    return (
        <div className="product-card">
            {imageUrl && <img src={imageUrl} alt={name} loading="lazy" />}
            {badge && <span className={`badge badge-${badge.type}`}>{badge.text}</span>}
            <h3 className="product-name">{name}</h3>
            <p className="product-price">{price.toLocaleString("vi-VN")}đ</p>
            <button
                className="btn btn-primary"
                onClick={() => onAddToCart({ name, price })}
            >
                Thêm vào giỏ
            </button>
        </div>
    );
}

// Default props
function Avatar({ src = "/default-avatar.png", size = 40, alt = "Avatar" }) {
    return (
        <img
            src={src}
            alt={alt}
            style={{ width: size, height: size, borderRadius: "50%" }}
        />
    );
}

// Sử dụng components
function App() {
    const handleAddToCart = (item) => console.log("Added:", item);

    return (
        <div>
            <ProductCard
                name="iPhone 15 Pro"
                price={25990000}
                imageUrl="/iphone.jpg"
                badge={{ type: "sale", text: "-20%" }}
                onAddToCart={handleAddToCart}
            />
            <Avatar src="/minh.jpg" size={48} alt="Minh" />
            <Avatar />  {/* Dùng default props */}
        </div>
    );
}

// Children prop — Composition pattern
function Card({ title, children, className = "" }) {
    return (
        <div className={`card ${className}`}>
            <div className="card-header"><h3>{title}</h3></div>
            <div className="card-body">{children}</div>
        </div>
    );
}

// Dùng như HTML container
<Card title="Thông tin" className="card-primary">
    <p>Nội dung bất kỳ</p>
    <button>Action</button>
</Card>
```

---

### useState — Quản lý state nội bộ

```jsx
import { useState } from "react";

// Cú pháp: const [value, setValue] = useState(initialValue)
// value = giá trị hiện tại
// setValue = function để cập nhật (KHÔNG modify trực tiếp value)

// 1. Primitive states
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Đếm: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}

// 2. State với Object — KHÔNG mutate trực tiếp!
function UserProfile() {
    const [user, setUser] = useState({ name: "Minh", age: 21, active: true });

    const birthday = () => {
        // ❌ KHÔNG làm thế này
        // user.age++;
        // setUser(user); // React không detect thay đổi

        // ✅ Tạo object MỚI với spread operator
        setUser({ ...user, age: user.age + 1 });
    };

    return (
        <div>
            <p>{user.name} ({user.age} tuổi)</p>
            <button onClick={birthday}>🎂 Sinh nhật</button>
        </div>
    );
}

// 3. State với Array — Immutable operations
function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Học React", done: false },
    ]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, done: false }]);
        setInput("");
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div>
            <div className="input-group">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    placeholder="Thêm todo..."
                />
                <button onClick={addTodo}>Thêm</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.done ? "done" : ""}>
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)}>❌</button>
                    </li>
                ))}
            </ul>

            <p>{todos.filter(t => !t.done).length} việc chưa xong</p>
        </div>
    );
}

// 4. Functional update — Khi state mới phụ thuộc state cũ
const [count, setCount] = useState(0);

// ❌ Có thể sai trong async context
setCount(count + 1);

// ✅ Luôn đúng
setCount(prev => prev + 1);
// prev = giá trị state mới nhất, ngay cả trong async callback
```

---

### useEffect — Side Effects & Data Fetching

```jsx
import { useEffect, useState } from "react";

// useEffect(callback, dependencyArray)
// Chạy callback SAU khi component render

// 1. Run once on mount (empty dependency array)
useEffect(() => {
    console.log("Component mounted");
    document.title = "My App";
}, []); // [] = chạy 1 lần khi mount

// 2. Run when dependency changes
const [query, setQuery] = useState("");

useEffect(() => {
    console.log("Query changed:", query);
    // Thực hiện search mỗi khi query thay đổi
}, [query]);

// 3. Data fetching — Pattern chuẩn
function ProductList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Async function bên trong useEffect
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch("https://api.example.com/products");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []); // Fetch 1 lần khi mount

    // Render 3 states
    if (isLoading) return <div className="spinner">⏳ Đang tải...</div>;
    if (error) return <div className="error">❌ Lỗi: {error}</div>;
    if (products.length === 0) return <p>Không có sản phẩm</p>;

    return (
        <ul>
            {products.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    );
}

// 4. Cleanup function — Tránh memory leak
function SearchResults({ query }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query) return;

        let cancelled = false; // Flag để tránh set state khi đã unmount

        const search = async () => {
            const data = await fetchSearch(query);
            if (!cancelled) {
                setResults(data); // Chỉ set state nếu chưa cancel
            }
        };

        search();

        // Cleanup: chạy khi query thay đổi hoặc component unmount
        return () => {
            cancelled = true; // Cancel pending request
        };
    }, [query]); // Re-run khi query thay đổi

    return <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>;
}
```

---

### Controlled Components — Forms trong React

```jsx
// React way: state kiểm soát input (không để DOM tự manage)
function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Generic handler cho tất cả inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        // Clear error khi user sửa
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const errs = {};
        if (!formData.email.includes("@")) errs.email = "Email không hợp lệ";
        if (formData.password.length < 8) errs.password = "Mật khẩu tối thiểu 8 ký tự";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setIsLoading(true);
        try {
            await loginAPI(formData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <label>
                <input
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                />
                Ghi nhớ đăng nhập
            </label>
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
        </form>
    );
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`const [value, setValue] = useState(init)` — luôn dùng setValue(), không bao giờ mutate value trực tiếp.**
> **`useEffect(() => { /* side effect */ }, [deps])` — deps rỗng = chạy 1 lần. Có deps = chạy khi deps thay đổi.**

---

## 5. 🏭 Real-world Layer

### Todo App hoàn chỉnh — Production-ready

```jsx
// src/App.jsx
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

const STORAGE_KEY = "cse391-todos";

export default function App() {
    const [todos, setTodos] = useState(() => {
        // Lazy initialization từ localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState("all"); // "all" | "active" | "done"

    // Auto-save mỗi khi todos thay đổi
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
    };

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    const clearDone = () => {
        setTodos(prev => prev.filter(t => !t.done));
    };

    const visibleTodos = todos.filter(t => {
        if (filter === "active") return !t.done;
        if (filter === "done") return t.done;
        return true;
    });

    return (
        <div className="app">
            <h1>📝 Todo App</h1>
            <TodoForm onAdd={addTodo} />
            <div className="filters">
                {["all", "active", "done"].map(f => (
                    <button
                        key={f}
                        className={filter === f ? "active" : ""}
                        onClick={() => setFilter(f)}
                    >
                        {f === "all" ? "Tất cả" : f === "active" ? "Chưa xong" : "Hoàn thành"}
                    </button>
                ))}
            </div>
            <TodoList
                todos={visibleTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
            <TodoStats todos={todos} onClearDone={clearDone} />
        </div>
    );
}
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Weather App (25 phút)

```jsx
// Xây WeatherWidget component
// API: https://wttr.in/Hanoi?format=j1

import { useState, useEffect } from "react";

export default function WeatherWidget({ city = "Hanoi" }) {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setIsLoading(true);
            try {
                // TODO: Fetch từ https://wttr.in/${city}?format=j1
                // Parse JSON response
                // Extract: current_condition[0].temp_C, weatherDesc[0].value
                const res = await fetch(`https://wttr.in/${city}?format=j1`);
                const data = await res.json();
                setWeather({
                    temp: data.current_condition[0].temp_C,
                    desc: data.current_condition[0].weatherDesc[0].value,
                    feelsLike: data.current_condition[0].FeelsLikeC,
                    humidity: data.current_condition[0].humidity,
                });
            } catch (err) {
                setError("Không lấy được thời tiết");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [city]); // Refetch khi city thay đổi

    if (isLoading) return <p>⏳ Đang tải thời tiết...</p>;
    if (error) return <p>❌ {error}</p>;

    return (
        <div className="weather-card">
            <h2>🌤️ {city}</h2>
            <p className="temp">{weather?.temp}°C</p>
            <p>{weather?.desc}</p>
            <p>Cảm giác: {weather?.feelsLike}°C · Độ ẩm: {weather?.humidity}%</p>
        </div>
    );
}
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"setXxx() thay đổi state ngay lập tức"** | Sai — React **batch** state updates. Sau `setCount(count + 1)`, `count` vẫn là giá trị cũ trong cùng function call. State mới chỉ có ở render tiếp theo. Dùng `prev => prev + 1` để tránh lỗi |
| **"`useEffect` cần thiết để fetch data"** | useEffect là 1 cách. Nhưng React 18+ khuyến nghị dùng thư viện (TanStack Query, SWR) cho data fetching. Chúng handle caching, refetching, loading states tốt hơn |
| **"Key prop chỉ để tránh warning"** | Key prop quan trọng hơn nhiều — React dùng key để **nhận dạng** element khi danh sách thay đổi. Sai key → React tái sử dụng DOM element sai → bugs về state |
| **"Component re-render khi bất kỳ thứ gì thay đổi"** | Component re-render khi: (1) state của nó thay đổi, (2) props nhận thay đổi, (3) parent re-render. Có thể dùng `React.memo()` để tối ưu |
| **"JSX là HTML nâng cao"** | JSX là **JavaScript** được biên dịch thành `React.createElement()`. `className` không phải HTML attribute — đó là JavaScript property. Chạy trong JS context, không phải HTML context |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. JSX khác HTML ở những điểm nào quan trọng nhất? (Ít nhất 3 điểm)
2. Tại sao không được mutate state trực tiếp như `user.age++`? Phải làm thế nào?
3. `useEffect(() => {}, [])` và `useEffect(() => {}, [query])` chạy khi nào?

### Câu hỏi áp dụng:

4. Component sau có bug gì? Sửa lại đúng:
   ```jsx
   const [count, setCount] = useState(0);
   const tripleIncrement = () => {
       setCount(count + 1);
       setCount(count + 1);
       setCount(count + 1);
   };
   // Bấm nút → count tăng mấy?
   ```
5. Bạn có component nhận `userId` qua props và cần fetch user data khi `userId` thay đổi. Viết useEffect đúng cách.

<details>
<summary>👁️ Xem đáp án</summary>

1. JSX vs HTML: (1) `className` thay vì `class`, `htmlFor` thay vì `for`; (2) Self-closing bắt buộc (`<br />`, `<img />`); (3) Event handlers là camelCase (`onClick` không phải `onclick`); (4) Style là JavaScript object (`style={{ color: "red" }}` không phải string); (5) JS expressions trong `{}` không phải `{{}}`; (6) Phải có 1 root element hoặc Fragment.
2. React dùng **reference equality** để phát hiện thay đổi. `user.age++` mutate object cũ → reference không đổi → React không thấy thay đổi → không re-render. Phải tạo object mới: `setUser({ ...user, age: user.age + 1 })`. Reference mới → React detect thay đổi → re-render.
3. `[]` (empty deps): Chỉ chạy **1 lần** sau lần render đầu tiên (componentDidMount equivalent). `[query]`: Chạy sau render đầu tiên **VÀ** mỗi lần `query` thay đổi.
4. **Bug**: `count + 1` dùng giá trị cũ của `count` trong tất cả 3 lần gọi → chỉ tăng 1 (batch update). **Sửa**: ```jsx const tripleIncrement = () => { setCount(prev => prev + 1); setCount(prev => prev + 1); setCount(prev => prev + 1); }; ``` Dùng functional update → mỗi lần nhận `prev` = giá trị mới nhất → tăng 3.
5. ```jsx useEffect(() => { if (!userId) return; const fetchUser = async () => { const res = await fetch(`/api/users/${userId}`); const data = await res.json(); setUser(data); }; fetchUser(); }, [userId]); // userId trong dependency array → re-run khi userId thay đổi ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **JSX** = JavaScript, không phải HTML. `className`, camelCase events, self-closing, `{}` cho expressions
2. **useState**: Luôn dùng `setValue()`. Không mutate trực tiếp. Array/object → dùng spread để tạo mới
3. **useEffect**: deps `[]` = run once. deps `[x]` = run khi x thay đổi. Return function = cleanup
4. **Controlled components**: Input value = state. onChange = setState. Không để DOM tự quản lý
5. **Key prop** trong list: Dùng id ổn định, không dùng index. Key sai → bugs về state

---

## 10. ➡️ Next Lesson Bridge

*"Được rồi — Todo App có useState, useEffect, controlled form. Chạy hoàn hảo," Minh nói. "Nhưng muốn thêm nhiều trang: Home, Products, Cart, Settings. Mỗi trang là URL khác nhau. Và data phải dùng chung giữa Header và ProductList."*

*"Hai bài toán khác nhau," anh Hùng nói. "React Router cho navigation. useContext hoặc Zustand cho shared state. Tiếp."*

**→ [Bài 06: Routing & State Management](../06_routing_state/) — React Router v6, useContext, Zustand: xây app nhiều trang với global state.**
