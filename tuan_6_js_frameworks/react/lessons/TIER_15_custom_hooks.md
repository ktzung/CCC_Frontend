# Tier 15 — Custom Hooks (Tái sử dụng logic)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Đóng gói logic tái sử dụng thành custom hooks  
> **📋 Cần biết:** Tier 11 (useEffect), Tier 13 (useRef)  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh có 3 component đều cần gọi API: UserList, ProductList, PostList. Mỗi component copy-paste 20 dòng code giống hệt nhau.*

*"Tách logic chung ra thành custom hook. Viết 1 lần, dùng 3 lần."*

---

## 🎯 Hôm nay bạn sẽ học

```
Custom Hook = Function tên bắt đầu bằng "use"
            = Đóng gói logic tái sử dụng
            = Giống "công thức nấu ăn" — viết 1 lần, nấu nhiều lần
```

---

## 📝 Bài 15.1 — useFetch (12 phút)

### Hook gọi API

```jsx
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [url]);

    return { data, loading, error };
}
```

### Sử dụng — gọn gàng!

```jsx
function UserList() {
    const { data: users, loading, error } = useFetch(
        'https://jsonplaceholder.typicode.com/users'
    );

    if (loading) return <p>⏳ Đang tải...</p>;
    if (error) return <p>❌ {error}</p>;

    return (
        <ul>
            {users?.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    );
}

function ProductList() {
    const { data: products, loading } = useFetch('/api/products');
    // ... tương tự
}
```

---

## 📝 Bài 15.2 — useLocalStorage (10 phút)

### Hook đồng bộ state với localStorage

```jsx
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
```

### Sử dụng

```jsx
function Settings() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [lang, setLang] = useLocalStorage('lang', 'vi');

    return (
        <div>
            <select value={theme} onChange={e => setTheme(e.target.value)}>
                <option value="light">☀️ Sáng</option>
                <option value="dark">🌙 Tối</option>
            </select>
            <select value={lang} onChange={e => setLang(e.target.value)}>
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇺🇸 English</option>
            </select>
        </div>
    );
}
```

---

## 📝 Bài 15.3 — useDebounce (10 phút)

### Hook debounce giá trị

```jsx
function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
```

### Kết hợp useDebounce + useFetch

```jsx
function SearchBox() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const { data } = useFetch(`/api/search?q=${debouncedQuery}`);

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            {data?.map(item => <p key={item.id}>{item.name}</p>)}
        </div>
    );
}
```

---

## 📊 Quy tắc Custom Hook

```
✅ Tên bắt đầu bằng "use":    useFetch, useLocalStorage, useDebounce
✅ Có thể dùng hook khác bên trong: useState, useEffect, useContext
✅ Trả về giá trị:            { data, loading, error } hoặc [value, setValue]
❌ Không gọi trong if/for:    Phải ở top level của component
❌ Không gọi trong function thường: Phải trong component hoặc custom hook
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 11:** useEffect — logic trong custom hook
- **Dùng kiến thức từ Tier 13:** useRef — cleanup trong custom hook
- **Sẽ cần trong Tier 16:** useReducer — custom hook với reducer
- **Tham khảo thêm:** `04_hooks/06_hooks_api.md` (file cũ)
