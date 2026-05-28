# Tier 10 — useEffect cơ bản (Side Effects, Dependencies)

> **Thời gian:** 30-35 phút  
> **Mục tiêu:** Hiểu side effects là gì và dùng useEffect để quản lý chúng  
> **Đã biết cần:** Tier 4 (useState), Tier 9 (state patterns)  
> **Không cần biết:** useRef, Context API, Custom hooks

---

## 🎯 Hôm nay bạn sẽ học

```jsx
// Tier 4: Component chỉ render UI
function App() {
    return <h1>{count}</h1>;  // ← Chỉ hiển thị
}

// Tier 10: Component có "tác dụng phụ"
function App() {
    useEffect(() => {
        document.title = `Count: ${count}`;  // ← Thay đổi bên ngoài React!
    }, [count]);
    return <h1>{count}</h1>;
}
```

**Vấn đề giải quyết:** Có những việc không thể làm trong JSX — gọi API, thay đổi document.title, log ra console, đồng bộ với localStorage. Đó là "side effects".

---

## 📝 Bài 10.1 — Side Effects là gì? (8 phút)

### Định nghĩa
```
Side Effect = Bất kỳ việc gì xảy ra BÊN NGOÀI quá trình render UI

Ví dụ:
  ✅ Gọi API lấy dữ liệu         → Side effect
  ✅ Thay đổi document.title      → Side effect
  ✅ Lưu vào localStorage         → Side effect
  ✅ Thiết lập timer (setTimeout)  → Side effect
  ✅ Đăng ký WebSocket             → Side effect

Không phải side effect:
  ❌ Tính toán từ props → state    → Thuần (pure)
  ❌ Render JSX                     → Thuần (pure)
```

### Tại sao cần useEffect?
```jsx
// ❌ SAI — Side effect trực tiếp trong render
function App() {
    const [count, setCount] = useState(0);
    document.title = `Count: ${count}`;  // ← Chạy MỖI LẦN render!
    // → Vô hạn loop: render → change title → render → ...
    return <h1>{count}</h1>;
}

// ✅ ĐÚNG — Dùng useEffect
function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `Count: ${count}`;  // ← Chạy khi count thay đổi
    }, [count]);
    return <h1>{count}</h1>;
}
```

---

## 📝 Bài 10.2 — Cú pháp useEffect (10 phút)

### Ba dạng dependency array

```jsx
// Dạng 1: Chạy MỖI LẦN render (ít dùng)
useEffect(() => {
    console.log("Render xong!");
});  // ← Không có dependency array

// Dạng 2: Chạy MỘT LẦN khi mount (rất hay dùng)
useEffect(() => {
    console.log("Component xuất hiện lần đầu!");
}, []);  // ← Empty array = chỉ chạy 1 lần

// Dạng 3: Chạy khi dependencies THAY ĐỔI (phổ biến nhất)
useEffect(() => {
    console.log(`Count thay đổi: ${count}`);
}, [count]);  // ← Chạy khi count thay đổi
```

### Bảng so sánh

| Dependency array | Khi nào chạy? | Tương đương |
|-----------------|---------------|-------------|
| Không có | Mỗi lần render | "Luôn luôn" |
| `[]` | Một lần khi mount | "Chỉ lần đầu" |
| `[count]` | Khi count thay đổi | "Theo dõi count" |
| `[a, b]` | Khi a HOẶC b thay đổi | "Theo dõi a và b" |

### Ví dụ: Document title theo count
```jsx
import { useState, useEffect } from 'react';

function CounterWithTitle() {
    const [count, setCount] = useState(0);

    // Chạy mỗi khi count thay đổi
    useEffect(() => {
        document.title = `Bạn đã click ${count} lần`;
    }, [count]);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>
                Click me
            </button>
        </div>
    );
}
```

---

## 📝 Bài 10.3 — useEffect thực tế (12 phút)

### Ví dụ 1: Log mỗi khi render
```jsx
function DebugComponent({ name, age }) {
    // Không có dependency → chạy mỗi lần render
    useEffect(() => {
        console.log("Component đã render");
        console.log("name:", name, "age:", age);
    });

    return <p>{name}, {age} tuổi</p>;
}
```

### Ví dụ 2: Khởi tạo dữ liệu khi mount
```jsx
function UserList() {
    const [users, setUsers] = useState([]);

    // Chạy MỘT LẦN khi component mount
    useEffect(() => {
        // Giả lập lấy dữ liệu
        const initialUsers = ["Minh", "Lan", "Tùng"];
        setUsers(initialUsers);
    }, []);  // ← Empty = chỉ chạy 1 lần

    return (
        <ul>
            {users.map((user, i) => <li key={i}>{user}</li>)}
        </ul>
    );
}
```

### Ví dụ 3: Theo dõi nhiều dependencies
```jsx
function SearchFilter() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("all");

    // Chạy khi keyword HOẶC category thay đổi
    useEffect(() => {
        console.log(`Tìm kiếm: "${keyword}" trong "${category}"`);
        // Sau này sẽ gọi API ở đây
    }, [keyword, category]);

    return (
        <div>
            <input 
                value={keyword} 
                onChange={e => setKeyword(e.target.value)} 
                placeholder="Tìm kiếm..."
            />
            <select onChange={e => setCategory(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="tech">Công nghệ</option>
                <option value="edu">Giáo dục</option>
            </select>
        </div>
    );
}
```

### Ví dụ 4: Đồng bộ với localStorage
```jsx
function ThemeSwitcher() {
    const [theme, setTheme] = useState("light");

    // Đọc từ localStorage khi mount
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    // Lưu vào localStorage khi theme thay đổi
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className={`app ${theme}`}>
            <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
                Đổi theme: {theme}
            </button>
        </div>
    );
}
```

---

## 🧪 Thử thách

### 1. [Dễ] — Document title
```jsx
// Tạo component Stopwatch hiển thị số giây
// document.title phải luôn hiện "Stopwatch: X giây"
// Dùng useEffect để đồng bộ document.title với state
```

### 2. [Trung bình] — localStorage sync
```jsx
// Tạo NotesApp
// - State: notes (array of strings)
// - Mỗi lần notes thay đổi → lưu vào localStorage
// - Khi mount → đọc từ localStorage
// → Ghi chú không mất khi refresh trang!
```

### 3. [Khó] — Theo dõi thay đổi
```jsx
// Tạo component ProfileEditor
// - State: { name, email, bio }
// - useEffect: khi BẤT KỲ field nào thay đổi → console.log("Có thay đổi chưa lưu")
// - useEffect: chỉ khi name thay đổi → console.log("Tên đã đổi")
// - Thử nghĩ: useEffect nào chạy trước?
```

---

## ✅ Checklist tự đánh giá

- [ ] Hiểu side effect là gì và tại sao cần quản lý?
- [ ] Biết 3 dạng dependency array và khi nào dùng?
- [ ] Viết được useEffect chạy một lần khi mount (`[]`)?
- [ ] Viết được useEffect theo dõi state thay đổi (`[state]`)?
- [ ] Biết cách sync state với localStorage?

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 4:** useState (state để useEffect theo dõi)
- **Dùng kiến thức từ Tier 9:** State patterns (object/array state)
- **Sẽ cần trong Tier 11:** useEffect nâng cao (cleanup, API fetching)
- **Sẽ cần trong Tier 13:** Context API (global state + effects)
