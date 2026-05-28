# Tier 7 — State Patterns (Object, Array, Immutability)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Quản lý state phức tạp — objects, arrays, cập nhật đúng cách  
> **📋 Cần biết:** Tier 6 (useState basics)  
> **🚫 Không cần biết:** useEffect, Context

---

## 🎬 Opening Hook

*Minh quản lý form đăng ký với 5 trường: tên, email, tuổi, giới tính, thành phố. Tạo 5 useState riêng?*

```jsx
const [ten, setTen] = useState('');
const [email, setEmail] = useState('');
const [tuoi, setTuoi] = useState('');
// ... 5 useState? Quá nhiều!
```

*"Dùng MỘT useState cho object."*

---

## 🎯 Hôm nay bạn sẽ học

```
State đơn giản:  const [count, setCount] = useState(0)
State object:     const [user, setUser] = useState({ ten: "", email: "" })
State array:      const [items, setItems] = useState([])

QUAN TRỌNG: Phải tạo object/array MỚI (immutable), KHÔNG sửa trực tiếp!
```

---

## 📝 Bài 7.1 — Object State (12 phút)

### Không được modify trực tiếp!

```jsx
const [user, setUser] = useState({ ten: "Minh", tuoi: 20 });

// ❌ SAI — sửa trực tiếp
user.tuoi = 21;
setUser(user);  // React không nhận ra thay đổi!

// ✅ ĐÚNG — tạo object mới với spread
setUser({ ...user, tuoi: 21 });
```

### Ví dụ: Form với object state

```jsx
function FormDangKy() {
    const [formData, setFormData] = useState({
        ten: '',
        email: '',
        tuoi: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,          // Copy tất cả field cũ
            [name]: value          // Override field thay đổi
        });
    };

    return (
        <form>
            <input name="ten" value={formData.ten} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />
            <input name="tuoi" value={formData.tuoi} onChange={handleChange} />
            <p>Tên: {formData.ten}, Email: {formData.email}</p>
        </form>
    );
}
```

---

## 📝 Bài 7.2 — Array State (12 phút)

### Thêm phần tử

```jsx
const [items, setItems] = useState(["HTML", "CSS"]);

// ✅ Spread + thêm mới
setItems([...items, "JavaScript"]);
// → ["HTML", "CSS", "JavaScript"]
```

### Xóa phần tử

```jsx
// Xóa theo index
setItems(items.filter((_, index) => index !== 1));
// → ["HTML", "JavaScript"]

// Xóa theo giá trị
setItems(items.filter(item => item !== "CSS"));
```

### Sửa phần tử

```jsx
setItems(items.map(item =>
    item === "CSS" ? "CSS3" : item
));
// → ["HTML", "CSS3", "JavaScript"]
```

### Ví dụ: Todo List đơn giản

```jsx
function SimpleTodo() {
    const [todos, setTodos] = useState(["Học HTML", "Học CSS"]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput("");
        }
    };

    const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={addTodo}>Thêm</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => removeTodo(index)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

---

## 📝 Bài 7.3 — Bảng tổng hợp thao tác (8 phút)

```
Thao tác        Object                          Array
───────         ──────                          ─────
Đọc             user.ten                        items[0]
Thêm            {...user, tuoi: 21}             [...items, "new"]
Xóa             Dùng destructuring              items.filter(...)
Sửa             {...user, ten: "New"}           items.map(...)
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| `user.ten = "New"` sửa được | Phải tạo object mới |
| `items.push("X")` thêm được | Phải dùng spread operator |
| Spread = deep clone | Spread chỉ copy 1 cấp |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** Cách nào đúng để cập nhật object state?
- a) `user.ten = "New"; setUser(user);`
- b) `setUser({ ...user, ten: "New" });` ✅
- c) `setUser(user.ten = "New");`

**Câu 2:** Cách nào xóa phần tử khỏi array state?
- a) `items.splice(1, 1); setItems(items);`
- b) `setItems(items.filter((_, i) => i !== 1));` ✅
- c) `setItems(items.pop());`

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 6:** useState cơ bản
- **Sẽ cần trong Tier 8:** Events — setState trong event handlers
- **Sẽ cần trong Tier 9:** Forms — object state cho form nhiều field
- **Tham khảo thêm:** `02_react_fundamentals_hooks.md` (file cũ)
