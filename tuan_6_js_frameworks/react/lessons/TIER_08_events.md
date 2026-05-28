# Tier 8 — Events (Xử lý tương tác người dùng)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Xử lý click, nhập liệu, submit form bằng event handlers  
> **📋 Cần biết:** Tier 6 (useState)  
> **🚫 Không cần biết:** useEffect, Context

---

## 🎬 Opening Hook

*Minh muốn khi user click nút "Thích" → số likes tăng. Khi gõ vào ô tìm kiếm → hiển thị kết quả.*

*"Làm sao React biết user vừa click? Dùng Events."*

---

## 🎯 Hôm nay bạn sẽ học

```
Events = Xử lý tương tác: click, gõ, submit, phím...
       = onClick, onChange, onSubmit, onKeyDown...
       = camelCase + function reference (KHÔNG phải string)
```

---

## 📝 Bài 8.1 — Event Handlers cơ bản (12 phút)

### onClick — Click button

```jsx
function LikeButton() {
    const [likes, setLikes] = useState(0);

    return (
        <div>
            <p>❤️ {likes} likes</p>
            <button onClick={() => setLikes(prev => prev + 1)}>
                Thích
            </button>
            <button onClick={() => setLikes(0)}>
                Reset
            </button>
        </div>
    );
}
```

### onChange — Nhập liệu

```jsx
function SearchBox() {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm..."
            />
            <p>Bạn đang tìm: {query}</p>
        </div>
    );
}
```

### onSubmit — Submit form

```jsx
function LoginForm() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();  // Ngăn reload trang!
        console.log("Email:", email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Đăng nhập</button>
        </form>
    );
}
```

---

## 📝 Bài 8.2 — Bảng tổng hợp Events (10 phút)

```
Event           HTML                      React
─────           ────                      ─────
Click           onclick="fn()"            onClick={fn}
Change          onchange="fn()"           onChange={fn}
Submit          onsubmit="fn()"           onSubmit={fn}
Mouse enter     onmouseenter="fn()"       onMouseEnter={fn}
Key press       onkeypress="fn()"         onKeyDown={fn}
Focus           onfocus="fn()"            onFocus={fn}
```

### Event object

```jsx
function EventDemo() {
    const handleClick = (e) => {
        console.log("Target:", e.target);      // Element bị click
        console.log("Type:", e.type);          // "click"
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed!");
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            <input onKeyDown={handleKeyDown} />
        </div>
    );
}
```

---

## 📝 Bài 8.3 — Truyền data vào event handler (8 phút)

### Vấn đề: Truyền tham số

```jsx
// ❌ SAI — gọi ngay lập tức
<button onClick={handleDelete(item.id)}>Xóa</button>

// ✅ ĐÚNG — dùng arrow function
<button onClick={() => handleDelete(item.id)}>Xóa</button>
```

### Ví dụ: Delete item

```jsx
function ItemList({ items, onDelete }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => onDelete(item.id)}>
                        Xóa
                    </button>
                </li>
            ))}
        </ul>
    );
}
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| `onClick={handleClick()}` | `onClick={handleClick}` (không có `()`) |
| `onclick="handleClick()"` | `onClick={handleClick}` (camelCase + function) |
| `onSubmit` tự ngăn reload | Phải gọi `e.preventDefault()` |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 6:** useState — setState trong event handler
- **Dùng kiến thức từ Tier 7:** State Patterns — array/object state updates
- **Sẽ cần trong Tier 9:** Forms — kết hợp events + state cho form
- **Tham khảo thêm:** `02_getting_started/02_basic_principles.md` (file cũ)
