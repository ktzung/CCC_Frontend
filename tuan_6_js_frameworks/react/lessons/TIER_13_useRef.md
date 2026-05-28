# Tier 13 — useRef (Truy cập DOM & Lưu giá trị không re-render)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Truy cập DOM elements và lưu giá trị persist không gây re-render  
> **📋 Cần biết:** Tier 11 (useEffect)  
> **🚫 Không cần biết:** Context, Custom hooks

---

## 🎬 Opening Hook

*Minh muốn khi trang load → ô tìm kiếm tự động focus. Nhưng làm sao "chạm" vào DOM element trong React?*

*"Dùng useRef. Nó như móc nối vào DOM thật."*

---

## 🎯 Hôm nay bạn sẽ học

```
useRef = Reference đến DOM element
       = Lưu giá trị KHÔNG gây re-render
       = Giống sticky note: ghi giá trị, giữ nguyên qua mỗi lần render

setState → thay đổi → RE-RENDER
useRef   → thay đổi → KHÔNG re-render
```

---

## 📝 Bài 13.1 — useRef cho DOM access (12 phút)

### Focus input khi mount

```jsx
function SearchInput() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();  // Tự động focus khi mount
    }, []);

    return <input ref={inputRef} type="search" placeholder="Tìm kiếm..." />;
}
```

### Clear input + focus lại

```jsx
function SearchBox() {
    const inputRef = useRef(null);
    const [query, setQuery] = useState("");

    const handleClear = () => {
        setQuery("");
        inputRef.current?.focus();  // Focus lại sau khi clear
    };

    return (
        <div>
            <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleClear}>✕ Clear</button>
        </div>
    );
}
```

---

## 📝 Bài 13.2 — useRef lưu giá trị (10 phút)

### Lưu giá trị previous

```jsx
function PreviousValue({ value }) {
    const prevValueRef = useRef(value);

    useEffect(() => {
        prevValueRef.current = value;  // Cập nhật SAU render
    });

    return (
        <p>Current: {value} | Previous: {prevValueRef.current}</p>
    );
}
```

### Lưu interval ID

```jsx
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = () => {
        if (!isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            setIsRunning(true);
        }
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    return (
        <div>
            <h1>{time}s</h1>
            <button onClick={start}>▶ Start</button>
            <button onClick={stop}>⏸ Stop</button>
        </div>
    );
}
```

---

## 📊 So sánh: useState vs useRef

```
                    useState                     useRef
                    ────────                     ──────
Thay đổi            Gây re-render                KHÔNG re-render
Truy cập            Giá trị mới mỗi render       .current giữ giá trị
Dùng cho            Hiển thị trên UI             Lưu giá trị "ẩn"
Ví dụ               count, name, isLoading       interval ID, DOM element
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| useRef thay đổi → UI cập nhật | useRef KHÔNG gây re-render |
| useRef chỉ cho DOM | useRef còn lưu bất kỳ giá trị nào |
| useRef.current = null ban đầu | useRef(initialValue) có giá trị ban đầu |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 11:** useEffect — chạy code khi mount
- **Sẽ cần trong Tier 14:** Context API — useContext cũng dùng ref pattern
- **Sẽ cần trong Tier 15:** Custom hooks — đóng gói useFetch với useRef
- **Tham khảo thêm:** `04_hooks/06_hooks_api.md` (file cũ)
