# Tier 11 — useEffect Basics (Side Effects & Dependencies)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Chạy code khi component mount/update bằng useEffect  
> **📋 Cần biết:** Tier 10 (Lifecycle), Tier 6 (useState)  
> **🚫 Không cần biết:** useRef, Context

---

## 🎬 Opening Hook

*Minh muốn khi count thay đổi → document.title cũng thay đổi.*

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    document.title = `Count: ${count}`;  // ❌ Chạy mỗi lần render → có thể gây lỗi
}
```

*"Dùng useEffect. Nó chạy code ĐÚNG LÚC, ĐÚNG CHỖ."*

---

## 🎯 Hôm nay bạn sẽ học

```
useEffect = Chạy code theo Lifecycle
          = "Sau khi render xong, hãy làm việc này"

3 dạng dependency array:
  useEffect(() => {})      → Mỗi lần render
  useEffect(() => {}, [])  → Chỉ 1 lần khi mount
  useEffect(() => {}, [x]) → Khi x thay đổi
```

---

## 📝 Bài 11.1 — useEffect là gì? (10 phút)

### Side Effects

```
Side Effect = Việc xảy ra BÊN NGOÀI quá trình render
  ✅ Gọi API
  ✅ Thay đổi document.title
  ✅ Lưu localStorage
  ✅ Thiết lập timer
```

### Tại sao cần useEffect?

```jsx
// ❌ SAI — Side effect trong render
function App() {
    document.title = "My App";  // Chạy mỗi lần render → có thể gây loop
    return <h1>Hello</h1>;
}

// ✅ ĐÚNG — Dùng useEffect
function App() {
    useEffect(() => {
        document.title = "My App";  // Chạy sau khi render
    });
    return <h1>Hello</h1>;
}
```

---

## 📝 Bài 11.2 — 3 dạng Dependency Array (15 phút)

### Dạng 1: Chạy MỖI LẦN render

```jsx
useEffect(() => {
    console.log("Render xong!");
});  // Không có dependency array
```

### Dạng 2: Chạy MỘT LẦN khi mount

```jsx
useEffect(() => {
    console.log("Component xuất hiện lần đầu!");
    // Gọi API, thiết lập timer...
}, []);  // Empty array
```

### Dạng 3: Chạy khi dependencies THAY ĐỔI

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);  // Chạy khi count thay đổi
```

### Bảng tổng hợp

```
Dependency array    Khi nào chạy?              Ví dụ
───────────────    ─────────────              ─────
Không có           Mỗi lần render             Debug, log
[]                 Một lần khi mount           Gọi API, timer
[x]                Khi x thay đổi             Cập nhật document.title
[x, y]             Khi x HOẶC y thay đổi      Theo dõi nhiều state
```

---

## 📝 Bài 11.3 — Ví dụ thực tế (10 phút)

### Document title theo count

```jsx
function CounterWithTitle() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Bạn đã click ${count} lần`;
    }, [count]);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>+1</button>
        </div>
    );
}
```

### Khởi tạo dữ liệu khi mount

```jsx
function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Giả lập API call
        const data = ["Minh", "Lan", "Tùng"];
        setUsers(data);
    }, []);  // Chỉ chạy 1 lần

    return (
        <ul>
            {users.map((u, i) => <li key={i}>{u}</li>)}
        </ul>
    );
}
```

### Theo dõi nhiều dependencies

```jsx
function SearchFilter() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        console.log(`Tìm: "${keyword}" trong "${category}"`);
    }, [keyword, category]);  // Chạy khi 1 trong 2 thay đổi

    return (
        <div>
            <input value={keyword} onChange={e => setKeyword(e.target.value)} />
            <select onChange={e => setCategory(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="tech">Công nghệ</option>
            </select>
        </div>
    );
}
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| useEffect chạy trước render | useEffect chạy SAU render |
| `[]` = không làm gì | `[]` = chạy 1 lần khi mount |
| useEffect = lifecycle method | useEffect kết hợp mount + update + unmount |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 10:** Lifecycle — mount, update, unmount
- **Dùng kiến thức từ Tier 6:** useState — state thay đổi trigger useEffect
- **Sẽ cần trong Tier 12:** useEffect Advanced — cleanup, API fetching
- **Tham khảo thêm:** `04_hooks/04_behind_the_scenes.md` (file cũ)
