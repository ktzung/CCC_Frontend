# Tier 12 — useEffect Advanced (Cleanup, API Fetching, Debounce)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Cleanup function, gọi API, debounce search  
> **📋 Cần biết:** Tier 11 (useEffect basics)  
> **🚫 Không cần biết:** useRef, Context

---

## 🎬 Opening Hook

*Minh làm đồng hồ đếm ngược. Component mount → timer chạy. Component unmount → timer vẫn chạy!*

*"Phải cleanup. useEffect trả về function → React gọi khi unmount."*

---

## 🎯 Hôm nay bạn sẽ học

```
useEffect(() => {
    // Setup: chạy khi mount/update
    return () => {
        // Cleanup: chạy khi unmount HOẶC trước khi effect mới chạy
    };
}, [deps]);
```

---

## 📝 Bài 12.1 — Cleanup Function (12 phút)

### Dọn dẹp khi unmount

```jsx
function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        // Cleanup: dừng timer khi unmount
        return () => clearInterval(interval);
    }, []);

    return <p>⏱ {seconds} giây</p>;
}
```

### Tưởng tượng

```
Setup   = Bật đèn khi vào phòng
Cleanup = Tắt đèn khi rời phòng (tiết kiệm điện!)

Không cleanup = Đèn sáng mãi → lãng phí (memory leak)
```

---

## 📝 Bài 12.2 — API Fetching (12 phút)

### Gọi API khi mount

```jsx
function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!res.ok) throw new Error('Lỗi mạng');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>⏳ Đang tải...</p>;
    if (error) return <p>❌ {error}</p>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name} — {user.email}</li>
            ))}
        </ul>
    );
}
```

---

## 📝 Bài 12.3 — Debounce Search (10 phút)

### Vấn đề: Gọi API quá nhiều

```
User gõ "react" → 5 ký tự → gọi API 5 lần?!
r → API call
re → API call
rea → API call
reac → API call
react → API call

Phải debounce: chỉ gọi API SAU KHI user ngừng gõ 500ms
```

### Giải pháp: Debounce với useEffect + cleanup

```jsx
function SearchUser() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        // Debounce: chờ 500ms sau lần gõ cuối
        const timer = setTimeout(async () => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/users?name_like=${query}`
            );
            const data = await res.json();
            setResults(data);
        }, 500);

        // Cleanup: hủy timer cũ khi query thay đổi
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="🔍 Tìm người dùng..."
            />
            <ul>
                {results.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Cleanup chỉ chạy khi unmount | Cleanup chạy TRƯỚC khi effect mới + khi unmount |
| Không cần cleanup cho fetch | Cần cleanup để tránh setState trên unmounted component |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 11:** useEffect basics
- **Sẽ cần trong Tier 13:** useRef — lưu giá trị không gây re-render
- **Sẽ cần trong Tier 15:** Custom hooks — đóng gói useFetch, useDebounce
- **Tham khảo thêm:** `04_hooks/04_behind_the_scenes.md` (file cũ)
