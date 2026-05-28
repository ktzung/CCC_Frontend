# Tier 10 — Component Lifecycle (Sinh ra, cập nhật, mất đi)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Hiểu vòng đời component — mount, update, unmount  
> **📋 Cần biết:** Tier 6 (useState)  
> **🚫 Không cần biết:** useEffect (sẽ học ở Tier 11)

---

## 🎬 Opening Hook

*Minh có component đồng hồ đếm ngược. Khi component hiện → timer chạy. Khi component biến mất → timer phải dừng.*

*"Nếu không dừng timer → nó chạy mãi, ngay cả khi component đã biến mất. Đó là memory leak."*

*"React có lifecycle để xử lý điều này."*

---

## 🎯 Hôm nay bạn sẽ học

```
Component Lifecycle = 3 giai đoạn:
1. Mount   — Component xuất hiện lần đầu (sinh ra)
2. Update  — State/Props thay đổi (cập nhật)
3. Unmount — Component biến mất (chết)
```

---

## 📝 Bài 10.1 — Mount (10 phút)

### Component xuất hiện

```
1. React gọi function component
2. Trả về JSX
3. DOM nodes được tạo
4. Component xuất hiện trên màn hình

Đây là lúc:
- Gọi API lấy dữ liệu
- Thiết lập timer
- Đăng ký event listener
```

### Ví dụ

```jsx
function UserList() {
    const [users, setUsers] = useState([]);

    // Khi mount → lấy dữ liệu
    // (Sẽ dùng useEffect ở Tier 11)
    // Hiện tại: dữ liệu hardcode

    return (
        <ul>
            {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    );
}
```

---

## 📝 Bài 10.2 — Update (10 phút)

### State thay đổi → Re-render

```
1. State thay đổi (setState)
2. React gọi lại function component
3. Tạo Virtual DOM mới
4. So sánh với Virtual DOM cũ
5. Cập nhật DOM thật (chỉ phần thay đổi)
```

### Khi nào Update xảy ra?

```
✅ State thay đổi:    setCount(1)
✅ Props thay đổi:    <User ten="Minh" /> → <User ten="Lan" />
✅ Parent re-render:  App re-render → tất cả con re-render
```

### Ví dụ: Component re-render

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    console.log("Component render!");  // Mỗi lần update

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(prev => prev + 1)}>+1</button>
        </div>
    );
}
// Click 3 lần → console.log 4 lần (1 mount + 3 update)
```

---

## 📝 Bài 10.3 — Unmount (10 phút)

### Component biến mất

```
1. Component bị xóa khỏi DOM
2. (Sẽ dùng useEffect cleanup ở Tier 11)

Đây là lúc:
- Dừng timer
- Hủy event listener
- Ngắt kết nối WebSocket
```

### Khi nào Unmount xảy ra?

```
✅ Conditional:  {isVisible && <Timer />}  → isVisible=false
✅ List remove:  items.filter(...)          → item bị xóa
✅ Route change: /home → /about             → HomePage unmount
```

### Ví dụ: Component ẩn/hiện

```jsx
function App() {
    const [showTimer, setShowTimer] = useState(true);

    return (
        <div>
            <button onClick={() => setShowTimer(!showTimer)}>
                {showTimer ? "Ẩn" : "Hiện"} đồng hồ
            </button>
            {showTimer && <Timer />}
        </div>
    );
}

function Timer() {
    const [seconds, setSeconds] = useState(0);

    // Timer sẽ được thiết lập ở Tier 11 (useEffect)
    return <p>⏱ {seconds} giây</p>;
}
```

---

## 📊 Bảng tổng hợp Lifecycle

```
Giai đoạn    Diễn ra khi nào         Cần làm gì
─────────    ───────────────         ───────────
Mount        Lần đầu render          Gọi API, thiết lập timer
Update       State/Props thay đổi    So sánh, cập nhật DOM
Unmount      Component biến mất      Dọn dẹp (timer, listener)
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Component render 1 lần | Component render mỗi khi state/props thay đổi |
| Unmount = xóa component | Unmount = xóa khỏi DOM, function vẫn tồn tại |
| Parent re-render → con không re-render | Con cũng re-render (trừ khi memo) |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 6:** useState — state thay đổi → update
- **Dùng kiến thức từ Tier 1:** Virtual DOM — diffing algorithm
- **Sẽ cần trong Tier 11:** useEffect — chạy code theo lifecycle
- **Tham khảo thêm:** `04_hooks/04_behind_the_scenes.md` (file cũ)
