# Tier 9 — State Patterns (Object, Array, Functional Update)

> **Thời gian:** 30-35 phút  
> **Mục tiêu:** Quản lý state phức tạp hơn — objects, arrays, và cách update đúng  
> **Đã biết cần:** Tier 4 (useState cơ bản với number, string, boolean)  
> **Không cần biết:** useEffect, Context API

---

## 🎯 Hôm nay bạn sẽ học

```
Tier 4:   const [count, setCount] = useState(0)        ← State đơn giản
Tier 9:   const [user, setUser] = useState({})          ← State phức tạp
          const [items, setItems] = useState([])          ← State danh sách
          setCount(prev => prev + 1)                      ← Update dựa trên giá trị cũ
```

**Vấn đề giải quyết:** Thực tế, state không chỉ là số hay chuỗi. Cần biết cách quản lý object và array state **đúng cách** (immutability).

---

## 📝 Bài 9.1 — Object State (10 phút)

### Vấn đề: Không được modify trực tiếp!
```jsx
const [user, setUser] = useState({ name: "Minh", age: 20 });

// ❌ SAI — Modify trực tiếp
user.age = 21;
setUser(user);  // React không biết đã thay đổi!

// ✅ ĐÚNG — Tạo object mới
setUser({ ...user, age: 21 });  // Spread operator: copy + override
```

### Tại sao phải tạo mới?
```
React so sánh: oldState === newState (tham chiếu)
- Cùng tham chiếu → "Chưa thay đổi" → KHÔNG re-render
- Khác tham chiếu → "Đã thay đổi" → RE-RENDER ✅
```

### Ví dụ đầy đủ: Form chỉnh sửa profile
```jsx
import { useState } from 'react';

function ProfileEditor() {
    const [user, setUser] = useState({
        name: "Minh",
        age: 20,
        email: "minh@example.com"
    });

    // Update MỘT field — spread + override
    const updateName = (newName) => {
        setUser({ ...user, name: newName });
    };

    // Update MỘT field từ input
    const handleNameChange = (e) => {
        setUser({ ...user, name: e.target.value });
    };

    // Update NHIỀU fields cùng lúc
    const updateAll = () => {
        setUser({
            ...user,
            name: "Minh Updated",
            age: 21,
            email: "new@example.com"
        });
    };

    return (
        <div>
            <input 
                value={user.name} 
                onChange={handleNameChange} 
            />
            <p>Tên: {user.name}</p>
            <p>Tuổi: {user.age}</p>
            <p>Email: {user.email}</p>
            <button onClick={updateAll}>Cập nhật tất cả</button>
        </div>
    );
}
```

### Bài tập
```jsx
// Tạo component Settings với state object:
const [settings, setSettings] = useState({
    theme: "light",
    fontSize: 16,
    language: "vi"
});

// Viết 3 hàm:
// 1. toggleTheme() — light ↔ dark
// 2. increaseFontSize() — tăng 2px
// 3. setLanguage(lang) — đổi ngôn ngữ
```

---

## 📝 Bài 9.2 — Array State (10 phút)

### Các phép biến đổi array (IMMUTABLE)

```jsx
const [items, setItems] = useState(["HTML", "CSS", "JavaScript"]);
```

#### Thêm phần tử
```jsx
// ❌ SAI
items.push("React");
setItems(items);

// ✅ ĐÚNG — spread + thêm mới
setItems([...items, "React"]);
// → ["HTML", "CSS", "JavaScript", "React"]
```

#### Xóa phần tử
```jsx
// Xóa theo index
setItems(items.filter((item, index) => index !== 1));
// → ["HTML", "JavaScript"]  (xóa "CSS")

// Xóa theo giá trị
setItems(items.filter(item => item !== "CSS"));
// → ["HTML", "JavaScript"]
```

#### Sửa phần tử
```jsx
// Sửa theo index
setItems(items.map((item, index) => 
    index === 1 ? "CSS3" : item
));
// → ["HTML", "CSS3", "JavaScript"]

// Sửa theo điều kiện
setItems(items.map(item => 
    item === "CSS" ? "CSS3" : item
));
```

### Ví dụ: Todo List đơn giản
```jsx
import { useState } from 'react';

function SimpleTodo() {
    const [todos, setTodos] = useState(["Học HTML", "Học CSS"]);
    const [input, setInput] = useState("");

    // Thêm
    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput("");
        }
    };

    // Xóa
    const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div>
            <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
            />
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

## 📝 Bài 9.3 — Functional Update `prev =>` (10 phút)

### Vấn đề: Stale state
```jsx
const [count, setCount] = useState(0);

// ❌ VẤN ĐỀ: Khi click nhanh 3 lần
const increment = () => {
    setCount(count + 1);  // count = 0 → set 1
    // Nhưng nếu 3 lần click xảy ra TRƯỚC khi re-render
    // → count vẫn = 0 → set 1, set 1, set 1
    // → Kết quả: 1 (không phải 3!)
};
```

### Giải pháp: Functional update
```jsx
const [count, setCount] = useState(0);

// ✅ ĐÚNG: Dùng giá trị MỚI NHẤT
const increment = () => {
    setCount(prev => prev + 1);  // prev = giá trị hiện tại
    // Click 3 lần: prev=0→1, prev=1→2, prev=2→3
    // → Kết quả: 3 ✅
};
```

### Khi nào dùng `prev =>`?
```
Dùng prev => khi:
  ✅ State mới = tính từ state cũ (prev + 1, prev * 2)
  ✅ Thêm/xóa trong array (prev => [...prev, item])
  ✅ Có thể bị gọi nhiều lần trước khi re-render

Không cần prev => khi:
  ❌ State mới không liên quan state cũ (setCount(100))
  ❌ Gán giá trị cố định (setName("Minh"))
```

### Ví dụ: Counter với functional update
```jsx
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>+1</button>
            <button onClick={() => setCount(prev => prev - 1)}>-1</button>
            <button onClick={() => setCount(prev => prev * 2)}>×2</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
```

### Ví dụ: Thêm vào array với functional update
```jsx
function AddItem() {
    const [items, setItems] = useState([]);

    const addItem = (newItem) => {
        setItems(prev => [...prev, newItem]);  // Luôn dùng prev
    };
}
```

---

## 🧪 Thử thách

### 1. [Dễ] — Object state
```jsx
// Tạo component Stopwatch với state:
const [time, setTime] = useState({ minutes: 0, seconds: 0, isRunning: false });

// Viết hàm:
// - toggleRunning() — bật/tắt
// - reset() — về 0
// - incrementSecond() — tăng 1 giây (tự động tăng phút khi đủ 60)
```

### 2. [Trung bình] — Array CRUD
```jsx
// Tạo ShoppingList với state array
// - Thêm sản phẩm (input + button)
// - Xóa sản phẩm (click vào item)
// - Đánh dấu đã mua (click toggle strikethrough)
// - Hiển thị tổng số sản phẩm
```

### 3. [Khó] — Kết hợp object + array
```jsx
// Tạo StudentManager
const [students, setStudents] = useState([]);
const [form, setForm] = useState({ name: "", grade: "" });

// Chức năng:
// - Nhập tên + điểm → thêm vào danh sách
// - Hiển thị danh sách sinh viên
// - Xóa sinh viên theo index
// - Hiểm thị điểm trung bình (tính từ students array)
```

---

## ✅ Checklist tự đánh giá

- [ ] Hiểu tại sao không được modify state trực tiếp?
- [ ] Biết cách update object state với spread operator?
- [ ] Biết cách thêm/xóa/sửa trong array state?
- [ ] Hiểu khi nào cần dùng `prev =>` functional update?
- [ ] Viết được component CRUD đơn giản với array state?

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 4:** useState cơ bản (number, string, boolean)
- **Dùng kiến thức từ Tier 5:** Events (onChange, onClick)
- **Dùng kiến thức từ Tier 6:** Lists với .map() và key
- **Sẽ cần trong Tier 10:** useEffect (sync state với side effects)
- **Sẽ cần trong Tier 16:** useReducer (quản lý state phức tạp hơn)
