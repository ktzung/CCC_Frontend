# 🟩 TUẦN 6 - BÀI 05 (REACT)
# **REACT HOOKS NÂNG CAO — useRef, useMemo, useCallback, useReducer, Custom Hooks**

---

## 0. 🎬 Opening Hook

*App của Minh chạy được nhưng chậm: Bấm 1 nút → toàn bộ component tree re-render. Todo list 100 items render lại khi user gõ input. Filter dropdown tính toán lại khi hover chuột.*

*Chị Hà: "useState + useEffect là dao phay. Đúng, nhưng em đang dùng dao phay để gọt táo. useMemo, useCallback, useReducer = dao gọt chuyên dụng. Dùng đúng công cụ."*

*"Nhưng React.memo, useMemo, useCallback — ba cái này khác nhau thế nào?"*

*"Ngồi xuống. Mình giải thích 1 lần."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Hooks nâng cao giải quyết 3 vấn đề thực tế:
1. **Performance** — `useMemo`, `useCallback`, `React.memo` tránh re-render không cần thiết
2. **DOM Access** — `useRef` truy cập DOM element trực tiếp (focus input, animation, scroll)
3. **Complex State** — `useReducer` thay `useState` khi state có nhiều transitions phức tạp

Hầu hết apps nhỏ không cần optimization. Nhưng khi app lớn lên, biết những hooks này = hiệu suất tốt từ đầu.

---

## 2. 🌐 Big Picture — Khi nào dùng hook nào?

```
CÂU HỎI                                    → HOOK
─────────────────────────────────          ──────────────────────
Cần lưu reference đến DOM element?        → useRef
Cần lưu giá trị qua render (không state)?→ useRef
Tính toán đắt tiền, muốn cache?           → useMemo
Hàm callback truyền xuống child?          → useCallback
State có nhiều actions phức tạp?          → useReducer
Logic lặp lại ở nhiều component?          → Custom Hook

PERFORMANCE CHAIN (thường dùng cùng nhau):
Parent component
  ↓ useCallback(fn, [deps])    → fn không tạo mới mỗi render
  ↓ truyền vào Child
Child component
  ↓ React.memo(Child)          → Không re-render nếu props không đổi
  ↓ useMemo(heavyCalc, [deps]) → Không tính lại nếu deps không đổi
```

---

## 3. ⚙️ Core Technical Truth

### useRef — Lưu giá trị và truy cập DOM

```jsx
import { useRef, useEffect } from "react";

// USE CASE 1: Truy cập DOM element trực tiếp
function SearchInput() {
    const inputRef = useRef(null);

    // Auto-focus khi component mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <input ref={inputRef} type="search" placeholder="Tìm kiếm..." />
            <button onClick={handleClear}>✕</button>
        </div>
    );
}

// USE CASE 2: Lưu giá trị qua render MÀ KHÔNG trigger re-render
// (useState sẽ re-render, useRef thì không)
function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null); // Lưu interval ID, không muốn re-render khi đổi

    const start = () => {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTime(t => t + 1);
        }, 1000);
    };

    const stop = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current); // Dùng intervalRef.current để clear
    };

    const reset = () => {
        stop();
        setTime(0);
    };

    return (
        <div>
            <p>{time}s</p>
            <button onClick={start} disabled={isRunning}>Start</button>
            <button onClick={stop} disabled={!isRunning}>Stop</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

// USE CASE 3: Lưu previous value
function PreviousValue({ value }) {
    const prevValueRef = useRef(value);

    useEffect(() => {
        prevValueRef.current = value; // Cập nhật SAU render
    });

    return (
        <p>Current: {value} | Previous: {prevValueRef.current}</p>
    );
}
```

---

### useMemo — Cache tính toán đắt tiền

```jsx
import { useMemo, useState } from "react";

// KHÔNG cần useMemo (tính toán đơn giản)
function Simple({ items }) {
    const count = items.length; // Fast → không cần useMemo
    return <p>Count: {count}</p>;
}

// CẦN useMemo (tính toán phức tạp hoặc tạo object mới)
function ProductList({ products, searchQuery, category }) {
    // Mỗi lần component re-render (vì bất kỳ state nào thay đổi),
    // filter này chạy lại — O(n) qua toàn bộ danh sách
    const filteredProducts = useMemo(() => {
        console.log("Filtering products..."); // Để thấy khi nào chạy

        return products
            .filter(p => {
                const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchCategory = !category || p.category === category;
                return matchQuery && matchCategory;
            })
            .sort((a, b) => a.name.localeCompare(b.name));

    }, [products, searchQuery, category]); // Chỉ tính lại khi dependencies thay đổi

    return (
        <ul>
            {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    );
}

// useMemo để ổn định object reference (tránh useEffect re-run)
function MapComponent({ lat, lng }) {
    const center = useMemo(() => ({ lat, lng }), [lat, lng]);
    // Nếu không có useMemo, { lat, lng } tạo object mới mỗi render
    // → useEffect phụ thuộc center sẽ chạy lại

    useEffect(() => {
        initMap(center); // Chỉ chạy khi lat hoặc lng thay đổi
    }, [center]);

    return <div id="map" />;
}
```

---

### useCallback — Cache hàm (tránh re-render child)

```jsx
import { useCallback, memo } from "react";

// PROBLEM: Mỗi render của Parent → handleDelete là function MỚI
// → Child nhận props mới → Child re-render dù data không đổi

// STEP 1: Wrap child với React.memo
const TodoItem = memo(function TodoItem({ todo, onDelete, onToggle }) {
    console.log(`Rendering: ${todo.text}`); // Xem khi nào re-render
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />
            <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>❌</button>
        </li>
    );
});

// STEP 2: Wrap callbacks với useCallback
function TodoList() {
    const [todos, setTodos] = useState([...]);
    const [filter, setFilter] = useState("all");

    // Không có useCallback → function mới mỗi render → TodoItem re-render
    // Với useCallback → function ổn định → TodoItem KHÔNG re-render vô ích
    const handleDelete = useCallback((id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    }, []); // [] = function không phụ thuộc vào gì → không bao giờ tạo mới

    const handleToggle = useCallback((id) => {
        setTodos(prev => prev.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        ));
    }, []);

    return (
        <div>
            <input onChange={(e) => setFilter(e.target.value)} />
            <ul>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                    />
                ))}
            </ul>
        </div>
    );
}
```

---

### useReducer — State phức tạp với actions

```jsx
import { useReducer } from "react";

// Dùng khi: state có nhiều transitions, state tiếp theo phụ thuộc state trước

// 1. Define state shape và action types
const initialState = {
    items: [],
    filter: "all",
    isLoading: false,
    error: null,
};

// 2. Reducer function (pure function — không side effects)
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

        case "SET_LOADING":
            return { ...state, isLoading: action.payload, error: null };

        case "SET_ERROR":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

// 3. Sử dụng trong component
function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = (text) => {
        dispatch({ type: "ADD_TODO", payload: text });
    };

    const toggleTodo = (id) => {
        dispatch({ type: "TOGGLE_TODO", payload: id });
    };

    const filteredItems = state.items.filter(t => {
        if (state.filter === "active") return !t.done;
        if (state.filter === "done") return t.done;
        return true;
    });

    return (
        <div>
            {state.isLoading && <p>Loading...</p>}
            {state.error && <p className="error">{state.error}</p>}
            {/* UI */}
        </div>
    );
}

// useState vs useReducer — Khi nào dùng gì:
// useState:  count, isOpen, searchQuery (độc lập, đơn giản)
// useReducer: form với nhiều fields, cart với add/remove/update, todo với nhiều filters
```

---

### Custom Hooks — Tái sử dụng logic

```jsx
// Rule: Tên phải bắt đầu bằng "use"
// Rule: Chỉ gọi Hook ở top level của function component hoặc custom hook khác

// 1. useFetch — Data fetching với loading/error states
function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [url]); // Re-fetch khi url thay đổi

    return { data, isLoading, error };
}

// Sử dụng — clean và reusable
function ProductList() {
    const { data: products, isLoading, error } = useFetch("/api/products");

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return <ul>{products?.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// 2. useLocalStorage — Persist state
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setStoredValue = useCallback((newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }, [key]);

    return [value, setStoredValue];
}

// 3. useDebounce — Delay state update (cho search)
function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer); // Cleanup: cancel timer khi value thay đổi
    }, [value, delay]);

    return debouncedValue;
}

// Sử dụng useDebounce
function SearchBox() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const { data } = useFetch(`/api/search?q=${debouncedQuery}`);

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            {/* Chỉ fetch API sau 500ms kể từ lần gõ cuối */}
        </div>
    );
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`useRef` = giá trị không trigger re-render. DOM refs và timer IDs thường dùng `useRef`.**
> **`useMemo(fn, deps)` = cache giá trị tính toán. `useCallback(fn, deps)` = cache function. Chỉ optimize khi có vấn đề thực sự.**

---

## 5. 🏭 Real-world Layer

### Shopping Cart với useReducer

```jsx
// stores/cartReducer.js
export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.find(i => i.id === action.payload.id);
            if (existing) {
                return state.map(i =>
                    i.id === action.payload.id
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }
            return [...state, { ...action.payload, qty: 1 }];
        }
        case "REMOVE_ITEM":
            return state.filter(i => i.id !== action.payload);
        case "UPDATE_QTY":
            return state.map(i =>
                i.id === action.payload.id
                    ? { ...i, qty: Math.max(1, action.payload.qty) }
                    : i
            );
        case "CLEAR_CART":
            return [];
        default:
            return state;
    }
};

// components/Cart.jsx
function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const total = useMemo(
        () => cart.reduce((sum, i) => sum + i.price * i.qty, 0),
        [cart]
    );

    const addItem = useCallback((product) => {
        dispatch({ type: "ADD_ITEM", payload: product });
    }, []);

    return (
        <div>
            {cart.map(item => (
                <div key={item.id}>
                    <span>{item.name}</span>
                    <input
                        type="number"
                        value={item.qty}
                        onChange={e => dispatch({
                            type: "UPDATE_QTY",
                            payload: { id: item.id, qty: +e.target.value }
                        })}
                    />
                    <span>{(item.price * item.qty).toLocaleString('vi-VN')}đ</span>
                    <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>❌</button>
                </div>
            ))}
            <p>Tổng: {total.toLocaleString('vi-VN')}đ</p>
        </div>
    );
}
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Xây useSearchProducts custom hook (20 phút)

```jsx
// Tạo hook useSearchProducts:
// - Nhận products array và searchQuery
// - Return filteredProducts (đã filter + sort)
// - Dùng useMemo để optimize

function useSearchProducts(products, searchQuery, category) {
    // TODO: Implement với useMemo
    // Filter: name.includes(query) && (category === "" || product.category === category)
    // Sort: alphabetical
}

// Sử dụng:
function ProductsView() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const debouncedQuery = useDebounce(query, 300);
    const { data: products } = useFetch("/api/products");

    const filteredProducts = useSearchProducts(products ?? [], debouncedQuery, category);

    // Render...
}
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"useMemo luôn làm app nhanh hơn"** | useMemo có overhead (so sánh dependencies, caching). Với tính toán đơn giản, useMemo có thể **chậm hơn** tính lại. Chỉ dùng khi đo được bottleneck thực sự |
| **"useRef chỉ để access DOM"** | useRef là "escape hatch" cho bất kỳ giá trị nào muốn persist qua renders mà không trigger re-render. Thường dùng cho: timers, previous values, counters không cần hiển thị |
| **"`React.memo` = `useMemo`"** | Khác hoàn toàn: `React.memo()` wrap component (tránh re-render khi props không đổi). `useMemo()` hook bên trong component (cache computed value). Thường dùng cùng nhau |
| **"useCallback tránh function chạy lại"** | Sai — useCallback không tránh function **chạy**. Nó tránh function **tạo mới** (mỗi render). Function vẫn chạy khi được gọi. Chỉ có ý nghĩa khi function được truyền xuống `React.memo` child |
| **"Custom Hook là component"** | Custom Hook là function JavaScript thường, không có JSX. Không render gì cả. Chia sẻ **stateful logic**, không chia sẻ UI |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `useRef` khác `useState` thế nào? Khi nào dùng cái nào?
2. `useMemo` và `useCallback` giống và khác nhau thế nào?
3. Tại sao `useCallback` chỉ có ý nghĩa khi kết hợp với `React.memo`?

### Câu hỏi áp dụng:

4. Component sau có thể tối ưu thế nào? Giải thích từng bước:
   ```jsx
   function Parent() {
       const [count, setCount] = useState(0);
       const handleClick = () => setCount(c => c + 1);
       return (
           <>
               <p>{count}</p>
               <ExpensiveChild onAction={handleClick} items={[1,2,3,4,5]} />
           </>
       );
   }
   ```
5. Bạn cần logic: Tự động lưu form data vào localStorage mỗi 5 giây. Viết custom hook `useAutoSave(data, key)`.

<details>
<summary>👁️ Xem đáp án</summary>

1. **`useState`**: Thay đổi giá trị → trigger re-render → UI cập nhật. Dùng khi cần hiển thị giá trị. **`useRef`**: Thay đổi `.current` → KHÔNG trigger re-render. Dùng khi cần lưu giá trị nhưng không muốn re-render (timer IDs, DOM refs, previous values, flags).
2. **Giống**: Cả hai cache thứ gì đó và chỉ tạo lại khi dependencies thay đổi. **Khác**: `useMemo` cache **kết quả (giá trị)** của function. `useCallback` cache bản thân **function** đó. `useMemo(() => fn(), [])` = giá trị trả về. `useCallback(fn, [])` = function fn.
3. `useCallback` tạo stable function reference. Nhưng nếu child không dùng `React.memo` → child re-render dù props không đổi → `useCallback` vô dụng. `React.memo` giúp child so sánh props: nếu `onAction` cùng reference → child không re-render. Kết hợp cả hai = optimization hoàn chỉnh.
4. **Tối ưu**: (1) `const handleClick = useCallback(() => setCount(c => c + 1), [])` — stable reference. (2) `const items = useMemo(() => [1,2,3,4,5], [])` — stable array reference (array literal tạo mới mỗi render). (3) `const ExpensiveChild = memo(ExpensiveChild)` — tránh re-render khi Parent re-render. Với 3 thay đổi này, ExpensiveChild chỉ re-render khi `handleClick` hoặc `items` thay đổi (cả hai đều ổn định).
5. ```jsx
   function useAutoSave(data, key, interval = 5000) {
       const dataRef = useRef(data);
       useEffect(() => { dataRef.current = data; }); // Luôn sync latest data
       useEffect(() => {
           const timer = setInterval(() => {
               localStorage.setItem(key, JSON.stringify(dataRef.current));
           }, interval);
           return () => clearInterval(timer);
       }, [key, interval]); // Không phụ thuộc data để tránh reset interval mỗi keystroke
   }
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`useRef`** = giá trị persistent không trigger re-render. DOM access + timer IDs + previous values
2. **`useMemo(fn, deps)`** = cache computed value. **`useCallback(fn, deps)`** = cache function reference
3. **`React.memo + useCallback`** = combo để tránh child re-render không cần thiết
4. **`useReducer`** = thay `useState` khi state có nhiều actions phức tạp. Tư duy như Redux nhỏ
5. **Custom Hooks** = extract stateful logic ra function `useXxx()`. Reuse across multiple components

---

## 10. ➡️ Next Lesson Bridge

*"App 1 trang OK. Nhưng muốn nhiều trang — /products, /cart, /user/123," Minh nói. "Dùng `<a href>` thì page reload."*

*"Đừng bao giờ dùng `<a href>` trong React cho internal links. Dùng React Router," anh Hùng nói. "Install 1 package, config 5 phút, có SPA routing hoàn chỉnh."*

**→ [Bài 06: React Router & State Management](../06_routing_state/12_react_router.md) — Đa trang không reload: BrowserRouter, Route, Link, useParams, useNavigate.**
