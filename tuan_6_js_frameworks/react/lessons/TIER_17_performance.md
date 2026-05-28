# Tier 17 — Performance (useMemo, useCallback, React.memo)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Tối ưu hiệu suất — memoize calculations, functions, components  
> **📋 Cần biết:** Tier 6 (useState), Tier 10 (Lifecycle)  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh có danh sách 10,000 sản phẩm. Mỗi lần gõ vào ô tìm kiếm → sort lại 10,000 sản phẩm → rất chậm!*

*"Dùng useMemo. Chỉ sort lại khi dữ liệu hoặc query thay đổi."*

---

## 🎯 Hôm nay bạn sẽ học

```
useMemo      = Cache kết quả TÍNH TOÁN (tránh tính lại)
useCallback  = Cache FUNCTION reference (tránh tạo lại)
React.memo   = Cache COMPONENT (tránh re-render không cần thiết)
```

---

## 📝 Bài 17.1 — useMemo (12 phút)

### Cache kết quả tính toán

```jsx
function ProductList({ products, searchQuery, category }) {
    // useMemo: chỉ filter lại khi products, searchQuery, hoặc category thay đổi
    const filteredProducts = useMemo(() => {
        console.log("Đang filter...");
        return products
            .filter(p => {
                const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchCategory = !category || p.category === category;
                return matchQuery && matchCategory;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [products, searchQuery, category]);

    return (
        <ul>
            {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    );
}
```

### Khi nào dùng useMemo?

```
✅ Tính toán phức tạp (sort, filter 10,000 items)
✅ Tạo object/array mới mỗi render (tránh re-render con)
❌ Tính toán đơn giản (a + b) — overhead > lợi ích
```

---

## 📝 Bài 17.2 — useCallback (12 phút)

### Cache function reference

```jsx
const TodoItem = React.memo(function TodoItem({ todo, onDelete, onToggle }) {
    console.log(`Rendering: ${todo.text}`);
    return (
        <li>
            <input type="checkbox" checked={todo.done}
                onChange={() => onToggle(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>❌</button>
        </li>
    );
});

function TodoList() {
    const [todos, setTodos] = useState([]);

    // useCallback: function reference không thay đổi giữa các lần render
    const handleDelete = useCallback((id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    }, []);  // Empty deps → function giữ nguyên

    const handleToggle = useCallback((id) => {
        setTodos(prev => prev.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        ));
    }, []);

    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo}
                    onDelete={handleDelete} onToggle={handleToggle} />
            ))}
        </ul>
    );
}
```

---

## 📝 Bài 17.3 — React.memo (8 phút)

### Ngăn re-render không cần thiết

```jsx
// Không memo: mỗi lần parent re-render → con re-render
function ExpensiveChild({ data }) {
    console.log("Child render!");
    return <p>{data.name}</p>;
}

// Có memo: chỉ re-render khi props thay đổi
const ExpensiveChild = React.memo(function ExpensiveChild({ data }) {
    console.log("Child render!");
    return <p>{data.name}</p>;
});
```

---

## 📊 Bảng tổng hợp

```
Tool            Cache gì                Khi nào dùng
────            ────────                ─────────────
useMemo         Kết quả tính toán       Tính toán phức tạp
useCallback     Function reference      Truyền function cho memo'd child
React.memo      Component render        Component render nhiều lần không cần
```

---

## ⚠️ Cảnh báo

```
❌ Lạm dụng useMemo/useCallback mọi chỗ → code phức tạp hơn, không nhanh hơn
✅ Chỉ dùng khi CÓ VẤN ĐỀ HIỆU SUẤT thật sự
✅ Đo hiệu suất trước, tối ưu sau (React DevTools Profiler)
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 10:** Lifecycle — re-render là gì
- **Sẽ cần trong Tier 18:** Styling — performance khi render styled components
- **Tham khảo thêm:** `04_hooks/06_hooks_api.md` (file cũ)
