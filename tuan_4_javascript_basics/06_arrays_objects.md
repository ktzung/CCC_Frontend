# 🟨 TUẦN 4 - BÀI 06
# **ARRAYS & OBJECTS**

---

## 0. 🎬 Opening Hook

*Sếp giao Minh: "Xử lý danh sách 10.000 sản phẩm từ API Shopee. Lọc theo giá, sắp xếp theo tên, tính tổng doanh thu từng danh mục."*

*Minh: "10.000 biến? `product1`, `product2`... `product10000`?"*

*"KHÔNG!" Anh Hùng cắt ngang. "1 biến, 10.000 items. `const products = [...]`. Rồi 3 dòng code xử lý xong."*

*Minh thử:*
```javascript
const products = await fetchProducts();  // [10.000 objects]
const expensive = products.filter(p => p.price > 10000000);
const total = expensive.reduce((sum, p) => sum + p.price, 0);
console.log(`${expensive.length} sản phẩm, tổng: ${total.toLocaleString()}đ`);
```

*3 dòng. 10.000 sản phẩm. 0.012 giây.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

- **API trả về gì?** JSON = Arrays of Objects
- **React state là gì?** Objects và Arrays
- **Database query trả về gì?** Arrays of Objects

99% data trong web app là Arrays + Objects. Thành thạo hai cấu trúc này = thành thạo data manipulation trong mọi ngữ cảnh.

---

## 2. 🌐 Big Picture — Arrays vs Objects

```
ARRAYS — Danh sách có THỨ TỰ
["Minh", "Linh", "Hùng"]     ← Truy cập bằng INDEX [0], [1], [2]
Dùng khi: danh sách, ordered data, API response lists

OBJECTS — Bản ghi có TÊN TRƯỜNG
{ name: "Minh", age: 21 }    ← Truy cập bằng KEY .name, ["age"]
Dùng khi: entity với nhiều thuộc tính, config, dictionary/lookup

KHAI THÁC KẾT HỢP:
[{ id: 1, name: "..." }, { id: 2, name: "..." }]  ← Array of Objects
= Cấu trúc phổ biến nhất trong thực tế (DB table, API response, state)
```

---

## 3. ⚙️ Core Technical Truth

### Arrays — Danh sách có thứ tự

**Tạo và truy cập:**
```javascript
// Tạo array
const fruits = ["táo", "chuối", "xoài"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["Minh", 21, true, null, { role: "admin" }];

// Truy cập
fruits[0]           // "táo" (index bắt đầu từ 0)
fruits[fruits.length - 1]  // "xoài" (phần tử cuối)
fruits.at(-1)       // "xoài" (ES2022 — tương đương trên)
```

**CRUD Operations:**
```javascript
const todos = ["Học HTML", "Học CSS", "Học JS"];

// CREATE
todos.push("Làm BTL");        // Thêm cuối → ["Học HTML","Học CSS","Học JS","Làm BTL"]
todos.unshift("Mua sách");    // Thêm đầu

// READ
todos.length                  // 5
todos.includes("Học JS")      // true
todos.indexOf("Học CSS")      // 2
todos.findIndex(t => t.includes("HTML"))  // 1

// UPDATE
todos[2] = "Master CSS";     // Ghi đè index 2

// DELETE
todos.pop()                  // Xóa cuối, trả về phần tử bị xóa
todos.shift()                // Xóa đầu
todos.splice(1, 1)           // Xóa 1 item tại index 1
todos.splice(1, 1, "Học TS") // Xóa 1, thêm "Học TS" vào chỗ đó
```

**Kiểm tra và tìm kiếm:**
```javascript
const nums = [1, 2, 3, 4, 5];

nums.includes(3)              // true
nums.indexOf(3)               // 2
nums.find(n => n > 3)         // 4 (phần tử đầu tiên thỏa)
nums.findIndex(n => n > 3)    // 3 (index của phần tử đầu tiên thỏa)
nums.some(n => n > 4)         // true (ít nhất 1 thỏa)
nums.every(n => n > 0)        // true (tất cả thỏa)
```

---

### Objects — Bản ghi có tên trường

```javascript
const student = {
    name: "Nguyễn Văn Minh",
    age: 21,
    major: "Công nghệ thông tin",
    gpa: 3.5,
    skills: ["HTML", "CSS", "JavaScript"],
    address: {
        city: "Hà Nội",
        district: "Đống Đa"
    },

    // Method — hàm trong object
    introduce() {
        return `Tôi là ${this.name}, SV năm 3`;
    }
};

// Truy cập
student.name                  // "Nguyễn Văn Minh"
student["age"]                // 21 — dùng khi key là biến
student.skills[0]             // "HTML"
student.address.city          // "Hà Nội"
student.introduce()           // "Tôi là Nguyễn Văn Minh, SV năm 3"

// Thêm/sửa/xóa
student.email = "minh@tlu.edu.vn";    // Thêm property mới
student.gpa = 3.8;                     // Sửa
delete student.address;                // Xóa property

// Kiểm tra property tồn tại
"name" in student              // true
student.hasOwnProperty("gpa") // true
student.phone !== undefined    // false (phone chưa có)
```

---

### Destructuring ⭐ — Cú pháp "bóc gói"

```javascript
// OBJECT DESTRUCTURING
const { name, age, gpa } = student;
console.log(name);  // "Nguyễn Văn Minh"

// Đặt tên khác
const { name: studentName, gpa: score } = student;

// Default value
const { email = "chưa có email" } = student;

// Nested destructuring
const { address: { city } } = student;
console.log(city);  // "Hà Nội"

// ARRAY DESTRUCTURING
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Bỏ qua phần tử
const [,, third] = [1, 2, 3];  // third = 3

// Swap variables — thần thánh!
let a = 1, b = 2;
[a, b] = [b, a];   // a = 2, b = 1

// Destructuring trong function parameter (rất phổ biến trong React!)
function renderCard({ title, price, imageUrl, inStock = true }) {
    return `<div class="${inStock ? "" : "sold-out"}">${title}: ${price}</div>`;
}
```

---

### Spread & Rest Operators ⭐

```javascript
// SPREAD — "Trải ra"
// Copy array (shallow copy)
const original = [1, 2, 3];
const copy = [...original];        // Copy — không liên quan đến original
const extended = [...original, 4, 5];  // Extend

// Merge arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copy object (shallow)
const original_obj = { name: "Minh", age: 21 };
const copy_obj = { ...original_obj };

// Merge objects (sau ghi đè trước)
const defaults = { theme: "light", lang: "vi", fontSize: 16 };
const userPrefs = { theme: "dark", fontSize: 18 };
const settings = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "vi", fontSize: 18 } — theme và fontSize bị override

// Update 1 field trong object (phổ biến trong React setState)
const newStudent = { ...student, gpa: 3.9 };  // Copy + update gpa

// REST — "Gom lại"
function logAll(first, second, ...rest) {
    console.log(first, second, rest);
}
logAll(1, 2, 3, 4, 5);  // 1, 2, [3, 4, 5]
```

---

### Pattern: Array of Objects — Phổ biến nhất

```javascript
// Đây là format API trả về
const products = [
    { id: 1, name: "iPhone 15",  price: 25990000, category: "phone",  inStock: true },
    { id: 2, name: "MacBook Air", price: 32990000, category: "laptop", inStock: true },
    { id: 3, name: "AirPods Pro", price: 6990000,  category: "audio",  inStock: false },
    { id: 4, name: "iPad Mini",   price: 14990000, category: "tablet", inStock: true }
];

// Tất cả operations phổ biến:

// Tìm theo ID (O(n) — dùng Map nếu lookup nhiều)
const findById = (list, id) => list.find(item => item.id === id);

// Cập nhật item theo ID (immutable update — quan trọng trong React)
const updateById = (list, id, changes) =>
    list.map(item => item.id === id ? { ...item, ...changes } : item);

// Xóa theo ID (immutable)
const deleteById = (list, id) => list.filter(item => item.id !== id);

// Nhóm theo field
const groupBy = (list, key) =>
    list.reduce((groups, item) => {
        const group = item[key];
        groups[group] = groups[group] ?? [];
        groups[group].push(item);
        return groups;
    }, {});

const byCategory = groupBy(products, "category");
// { phone: [...], laptop: [...], audio: [...], tablet: [...] }

// Thống kê
const stats = {
    total: products.length,
    inStock: products.filter(p => p.inStock).length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
    avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length
};
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Destructuring `const { name, age } = obj` và spread `{ ...obj, newProp: value }` — hai cú pháp dùng hàng ngày trong React.**
> **Immutable update: không sửa array/object gốc, tạo cái mới bằng `map`/`filter`/spread.**

---

## 5. 🏭 Real-world Layer

### API Response → Xử lý → Render

```javascript
// Dữ liệu thực từ API (JSON)
const apiResponse = {
    status: "success",
    page: 1,
    total: 3,
    data: [
        { id: 1, title: "Học HTML",  completed: false, userId: 1 },
        { id: 2, title: "Học CSS",   completed: true,  userId: 1 },
        { id: 3, title: "Học JS",    completed: false, userId: 1 }
    ]
};

// Xử lý
const { data: todos, total } = apiResponse;
const pending = todos.filter(t => !t.completed);
const completedCount = todos.filter(t => t.completed).length;

// Render HTML
const renderTodo = ({ id, title, completed }) => `
    <li class="todo-item ${completed ? "todo-item--done" : ""}"
        data-id="${id}">
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span>${title}</span>
        <button class="delete-btn" data-id="${id}">❌</button>
    </li>
`;

document.querySelector("#list").innerHTML = todos.map(renderTodo).join("");
console.log(`${completedCount}/${total} hoàn thành`);
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Todo App Data Layer (25 phút)

```javascript
// State của app
let state = {
    todos: [
        { id: 1, text: "Học HTML5",    done: true,  priority: "low",    tags: ["web"] },
        { id: 2, text: "Học CSS",      done: true,  priority: "low",    tags: ["web"] },
        { id: 3, text: "Học JS",       done: false, priority: "high",   tags: ["web", "programming"] },
        { id: 4, text: "Làm BTL",      done: false, priority: "urgent", tags: ["school"] },
        { id: 5, text: "Deploy website", done: false, priority: "high", tags: ["web", "devops"] }
    ],
    filter: "all"  // "all" | "pending" | "done"
};

// TODO 1: Thêm todo mới (immutable)
function addTodo(text, priority = "low") {
    const newTodo = {
        id: Date.now(),  // Simple ID generation
        text,
        done: false,
        priority,
        tags: []
    };
    // TODO: return state mới với todo thêm vào
}

// TODO 2: Toggle done (immutable)
function toggleTodo(id) {
    // TODO: return state mới, chỉ đổi done của todo có id đó
}

// TODO 3: Delete todo (immutable)
function deleteTodo(id) {
    // TODO: return state mới không có todo đó
}

// TODO 4: Thống kê
function getStats(todos) {
    // TODO: trả về { total, done, pending, byPriority }
}

// TODO 5: Filter và sort
function getVisibleTodos(todos, filter) {
    // TODO: filter theo "all"/"pending"/"done", sort urgent first
}

// Test
const newState = addTodo("Ôn thi cuối kỳ", "urgent");
console.table(newState.todos);
console.log(getStats(state.todos));
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Spread `{...obj}` tạo deep copy"** | Chỉ tạo **shallow copy** — nested objects/arrays vẫn là cùng reference. Để deep copy: `JSON.parse(JSON.stringify(obj))` hoặc `structuredClone(obj)` |
| **"`const arr = []` rồi có thể `arr = [1,2,3]`"** | Không — `const` ngăn reassign. Nhưng `arr.push(1)` ✅ (thay đổi nội dung, không đổi reference) |
| **"Object key phải là string"** | Thực ra có thể dùng Symbol làm key, và ES2015 object key thực chất có thể là bất kỳ expression nào trong `[key]` |
| **"Destructuring copy giá trị"** | Với primitive (string, number, boolean) → copy. Với object/array → copy **reference**. Thay đổi bên trong vẫn ảnh hưởng bản gốc |
| **"Có thể dùng `for...in` trên array an toàn"** | `for...in` duyệt **tất cả enumerable properties** kể cả inherited — không an toàn cho array. Dùng `for...of` hoặc `.forEach()` |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Destructuring là gì? Viết cú pháp destructure `name` và `email` từ `const user = { name: "Minh", email: "m@m.com", age: 21 }`.
2. Spread operator `...` khác rest operator `...` như thế nào? Chúng có cùng cú pháp nhưng khác context.
3. Tại sao nên update object/array **immutably** (tạo bản mới) thay vì mutate trực tiếp?

### Câu hỏi áp dụng:

4. Bạn có `const user = { name: "Minh", settings: { theme: "dark", lang: "vi" } }`. Tạo bản copy của `user` nhưng đổi `lang` thành `"en"`. Viết code đúng (không mutate bản gốc).
5. Cho mảng students: `[{name, gpa, year}]`. Dùng một expression để nhóm students theo `year` (năm học), kết quả là object `{1: [...], 2: [...], 3: [...], 4: [...]}`.

<details>
<summary>👁️ Xem đáp án</summary>

1. Destructuring = cú pháp lấy nhiều values từ object/array trong 1 dòng. `const { name, email } = user;` — hoặc với alias: `const { name: studentName, email } = user`.
2. **Spread** (`...arr` hoặc `...obj`) = **mở rộng** một iterable thành các phần tử riêng lẻ — dùng bên phải assignment hoặc trong function call. **Rest** (`...rest` trong params) = **thu thập** nhiều arguments thành 1 array — dùng bên trái assignment hoặc trong function parameters.
3. Immutable update quan trọng vì: (1) **React/Vue state** cần reference mới để trigger re-render — nếu mutate trực tiếp, framework không phát hiện thay đổi; (2) **Easier debugging** — có thể trace history thay đổi; (3) **Pure functions** — không có side effect, dễ test.
4. ```javascript
   const updated = {
       ...user,
       settings: { ...user.settings, lang: "en" }
   };
   // Cần spread nested object settings riêng — shallow spread sẽ share reference!
   ```
5. ```javascript
   const grouped = students.reduce((acc, s) => ({
       ...acc,
       [s.year]: [...(acc[s.year] ?? []), s]
   }), {});
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Array** = danh sách thứ tự (index). **Object** = bản ghi có tên (key). **Array of Objects** = pattern phổ biến nhất
2. **Destructuring** `const { a, b } = obj` và `const [x, y] = arr` — cú pháp shorthand thiết yếu
3. **Spread** `{ ...obj, newKey: value }` = immutable update. Dùng cho mọi state update trong React
4. **Shallow copy vs Deep copy** — `{...obj}` chỉ shallow. Dùng `structuredClone()` cho deep copy
5. **Immutable operations** — không mutate array/object gốc: `map`, `filter`, `spread` thay vì `push`/`splice` trực tiếp

---

## 10. ➡️ Next Lesson Bridge

*"Data layer xong," Minh nói. "Mình có thể thêm, xóa, sửa todos trong JavaScript. Nhưng trang HTML vẫn không thay đổi. User không nhìn vào console!"*

*"Đó là DOM Manipulation," anh Hùng nói. "JavaScript nói chuyện với HTML thông qua DOM. Click nút → thêm todo → hiện ngay trên trang. Không cần reload."*

**→ [Bài 19: DOM Manipulation](../tuan_5_javascript_dom_async/19_dom_manipulation.md) — `querySelector`, `classList`, `addEventListener`: ba vũ khí giao tiếp JS và HTML.**
