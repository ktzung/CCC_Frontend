# 🟨 TUẦN 4 - BÀI 04
# **CONTROL STRUCTURES — Điều Kiện & Vòng Lặp**

---

## 0. 🎬 Opening Hook

*Minh cần render danh sách todos. Mỗi todo: nếu đã hoàn thành → gạch ngang, màu xám. Nếu chưa → hiện bình thường. Những todo quan trọng → chữ đỏ, bold.*

*Ba điều kiện, một danh sách, cần lặp lại cho từng phần tử.*

*"Không có if/else và for loop, app không thể ra quyết định và không thể xử lý nhiều items," anh Hùng nói. "Đây là hai viên gạch cơ bản nhất của logic."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Mọi ứng dụng đều cần:
- **Ra quyết định**: nếu đăng nhập → vào trang chủ, nếu không → trang login
- **Lặp lại**: render 100 sản phẩm từ API, xử lý từng item trong danh sách

Không có control structures = code chỉ chạy thẳng từ trên xuống, không có logic.

---

## 2. 🌐 Big Picture — Bản đồ Control Structures

```
CONTROL STRUCTURES
│
├── CONDITIONALS — Ra quyết định
│   ├── if / else if / else
│   ├── Ternary operator  ? :
│   └── switch / case
│
└── LOOPS — Lặp lại
    ├── for (i = 0; i < n; i++)   → biết trước số lần
    ├── while (condition)          → không biết trước số lần
    ├── for...of (item of array)   → qua từng phần tử
    ├── for...in (key in object)   → qua từng key object
    └── Array Methods (HAY DÙNG NHẤT trong thực tế)
        ├── .forEach()   → Lặp (không trả về gì)
        ├── .map()       → Biến đổi → mảng mới
        ├── .filter()    → Lọc → mảng mới
        ├── .reduce()    → Tổng hợp → một giá trị
        ├── .find()      → Tìm 1 phần tử
        └── .some()/every() → Kiểm tra điều kiện
```

---

## 3. ⚙️ Core Technical Truth

### Conditionals — Ra quyết định

**if / else if / else:**
```javascript
const score = 85;

if (score >= 90) {
    console.log("Xuất sắc 🌟");
} else if (score >= 80) {
    console.log("Giỏi 👍");   // ← Chạy dòng này
} else if (score >= 65) {
    console.log("Khá");
} else if (score >= 50) {
    console.log("Trung bình");
} else {
    console.log("Yếu — cần cải thiện 📚");
}
```

**Ternary Operator — if/else trong 1 dòng ⭐:**
```javascript
// condition ? valueIfTrue : valueIfFalse
const status = score >= 50 ? "Đạt" : "Không đạt";
const greeting = isLoggedIn ? `Chào ${user.name}` : "Vui lòng đăng nhập";
const badgeColor = priority === "high" ? "#dc2626" : "#2563eb";

// Nested ternary (không khuyến khích — khó đọc)
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 65 ? "C" : "F";

// Tốt hơn: dùng function
function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 65) return "C";
    return "F";
}
```

**switch — Nhiều nhánh theo giá trị cụ thể:**
```javascript
const day = new Date().getDay();  // 0=Chủ nhật, 1=Thứ 2...

switch (day) {
    case 0:
        console.log("Chủ Nhật 🌞 Nghỉ ngơi");
        break;
    case 1:
        console.log("Thứ Hai 😴 Đầu tuần");
        break;
    case 5:
    case 6:                        // Fallthrough: 5 và 6 cùng xử lý
        console.log("Cuối tuần 🎉");
        break;
    default:
        console.log("Ngày thường — cày cuốc");
}

// Khi nào dùng switch vs if/else?
// switch: so sánh 1 biến với nhiều giá trị cụ thể
// if/else: điều kiện phức tạp hơn (ranges, multiple variables)
```

---

### Loops — Lặp lại

**for loop — Biết trước số lần:**
```javascript
const todos = ["Học HTML", "Học CSS", "Học JS", "Làm BTL"];

for (let i = 0; i < todos.length; i++) {
    console.log(`${i + 1}. ${todos[i]}`);
}
// 1. Học HTML
// 2. Học CSS
// 3. Học JS
// 4. Làm BTL
```

**for...of — Qua từng phần tử (không cần index):**
```javascript
// Khi không cần index
for (const todo of todos) {
    console.log(`📌 ${todo}`);
}

// Khi cần index dùng entries()
for (const [index, todo] of todos.entries()) {
    console.log(`${index + 1}. ${todo}`);
}
```

**while — Không biết trước số lần:**
```javascript
// Game: tung xúc xắc cho đến khi ra 6
let roll = 0;
let attempts = 0;

while (roll !== 6) {
    roll = Math.floor(Math.random() * 6) + 1;
    attempts++;
    console.log(`Tung lần ${attempts}: ra ${roll}`);
}
console.log(`Tung ${attempts} lần mới ra 6!`);
```

---

### Array Methods — Cách lặp hiện đại ⭐

**Đây là thứ bạn sẽ dùng HÀNG NGÀY, nhiều hơn for loop:**

```javascript
const products = [
    { id: 1, name: "iPhone 15",  price: 25990000, inStock: true,  category: "phone" },
    { id: 2, name: "MacBook Air", price: 32990000, inStock: true,  category: "laptop" },
    { id: 3, name: "AirPods Pro", price: 6990000,  inStock: false, category: "audio" },
    { id: 4, name: "iPad Mini",   price: 14990000, inStock: true,  category: "tablet" },
    { id: 5, name: "Apple Watch", price: 11990000, inStock: false, category: "watch" }
];

// FILTER — Lọc, trả về mảng mới
const available = products.filter(p => p.inStock);
// → [iPhone, MacBook, iPad]

const phones = products.filter(p => p.category === "phone");
// → [iPhone]

const affordable = products.filter(p => p.price < 15000000 && p.inStock);
// → [iPad]

// MAP — Biến đổi từng phần tử, trả về mảng mới (cùng length)
const names = products.map(p => p.name);
// → ["iPhone 15", "MacBook Air", "AirPods Pro", "iPad Mini", "Apple Watch"]

const discounted = products.map(p => ({
    ...p,
    discountPrice: p.price * 0.9  // Giảm 10%
}));

// MAP + render HTML (dùng nhiều nhất trong React!)
const htmlList = products.map(p => `
    <li class="product-item ${p.inStock ? '' : 'out-of-stock'}">
        <span>${p.name}</span>
        <strong>${p.price.toLocaleString("vi-VN")}đ</strong>
    </li>
`).join("");

// REDUCE — Tổng hợp thành 1 giá trị
const totalValue = products
    .filter(p => p.inStock)
    .reduce((sum, p) => sum + p.price, 0);
// → 73.970.000

const maxPrice = products.reduce((max, p) => p.price > max ? p.price : max, 0);
// → 32.990.000

// FIND — Tìm 1 phần tử (trả về phần tử, không phải mảng)
const macbook = products.find(p => p.name.includes("MacBook"));
// → { id: 2, name: "MacBook Air", ... }

// SOME / EVERY — Kiểm tra điều kiện
const hasExpensive = products.some(p => p.price > 30000000);  // true
const allAvailable = products.every(p => p.inStock);           // false

// SORT — Sắp xếp (biến đổi mảng gốc — cẩn thận!)
const byPrice = [...products].sort((a, b) => a.price - b.price);  // Copy trước!
const byName  = [...products].sort((a, b) => a.name.localeCompare(b.name));
```

---

### Kết hợp — Pipeline xử lý data:

```javascript
// "Lấy danh sách tên sản phẩm còn hàng, giá dưới 20 triệu, sắp xếp theo giá"
const result = products
    .filter(p => p.inStock)
    .filter(p => p.price < 20000000)
    .sort((a, b) => a.price - b.price)
    .map(p => `${p.name}: ${p.price.toLocaleString("vi-VN")}đ`);

console.log(result);
// → ["AirPods Pro: 6.990.000đ", "Apple Watch: 11.990.000đ", "iPad Mini: 14.990.000đ"]
// (Chú ý: AirPods và Apple Watch không inStock = bị filter ra)
// Kết quả đúng: ["iPad Mini: 14.990.000đ"]
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`map` = biến đổi. `filter` = lọc. `reduce` = tổng hợp. Ba methods này, hàng ngày.**
> **Ternary `? :` cho if/else đơn giản 1 dòng. if/else cho logic phức tạp.**

---

## 5. 🏭 Real-world Layer

### Render todo list hoàn chỉnh:

```javascript
const todos = [
    { id: 1, text: "Học HTML",   completed: true,  priority: "low" },
    { id: 2, text: "Học CSS",    completed: true,  priority: "low" },
    { id: 3, text: "Học JS",     completed: false, priority: "high" },
    { id: 4, text: "Làm BTL",   completed: false, priority: "high" },
    { id: 5, text: "Nộp bài",   completed: false, priority: "urgent" }
];

// Thống kê
const stats = {
    total: todos.length,
    done: todos.filter(t => t.completed).length,
    urgent: todos.filter(t => t.priority === "urgent" && !t.completed).length
};

console.log(`Tiến độ: ${stats.done}/${stats.total} (${stats.urgent} khẩn cấp)`);

// Render HTML
function renderTodoItem(todo) {
    const priorityClass = todo.priority === "urgent" ? "text-red-600 font-bold"
                        : todo.priority === "high"   ? "text-orange-500"
                        : "text-gray-600";
    return `
        <li class="todo-item ${todo.completed ? 'todo-item--done' : ''}"
            data-id="${todo.id}">
            <span class="${priorityClass}">${todo.text}</span>
            <span class="badge">${todo.priority}</span>
        </li>
    `;
}

const html = todos
    .filter(t => !t.completed)   // Chỉ hiển thị chưa xong
    .map(renderTodoItem)
    .join("");

document.querySelector("#todoList").innerHTML = html;
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Xử lý danh sách sản phẩm (20 phút)

```javascript
const inventory = [
    { name: "Laptop Dell XPS", price: 28000000, qty: 5, category: "laptop" },
    { name: "Chuột Logitech",  price: 890000,   qty: 0, category: "peripheral" },
    { name: "Bàn phím Keychron", price: 2500000, qty: 12, category: "peripheral" },
    { name: "MacBook Pro",    price: 45000000, qty: 3, category: "laptop" },
    { name: "Tai nghe Sony",  price: 4200000,  qty: 0, category: "audio" },
    { name: "Màn hình LG",    price: 6800000,  qty: 7, category: "monitor" }
];

// TODO 1: Lọc sản phẩm còn hàng (qty > 0)
const inStock = /* ? */;
console.log("Còn hàng:", inStock.length, "sản phẩm");

// TODO 2: Tính tổng giá trị tồn kho (price × qty)
const totalInventoryValue = /* ? */;
console.log("Tổng giá trị:", totalInventoryValue.toLocaleString("vi-VN"), "đ");

// TODO 3: Tìm sản phẩm đắt nhất
const mostExpensive = /* ? */;
console.log("Đắt nhất:", mostExpensive.name);

// TODO 4: Nhóm theo category — đếm số lượng mỗi loại
const byCategory = inventory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
}, {});
console.table(byCategory);

// TODO 5: Render danh sách sản phẩm còn hàng dưới 10 triệu dưới dạng HTML string
const html = /* ? */;
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`forEach` giống `map`"** | `forEach` = lặp, không trả về gì (void). `map` = biến đổi, trả về mảng mới. Không thể dùng `forEach` ở nơi cần kết quả |
| **"`sort()` không thay đổi mảng gốc"** | `.sort()` **thay đổi mảng gốc** (in-place)! Luôn copy trước: `[...arr].sort(...)` hoặc `arr.slice().sort(...)` |
| **"Ternary operator chỉ dùng cho if/else đơn giản"** | Đúng một phần — nested ternary nên tránh. Nhưng ternary trong JSX/template rất phổ biến và clean |
| **"`for...in` dùng cho array"** | `for...in` duyệt **keys** của object. Dùng `for...of` hoặc `forEach` cho array — `for...in` với array có thể duyệt cả inherited properties |
| **"`break` chỉ dùng trong `switch`"** | `break` dùng được trong `for`, `while`, `switch` để thoát khỏi vòng lặp/switch. `continue` dùng để bỏ qua iteration hiện tại |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa `map()`, `filter()`, và `forEach()` là gì? Cái nào trả về mảng mới?
2. Tại sao `.sort()` cần tham số comparator `(a, b) => a - b` khi sort numbers?
3. `switch` và `if/else` — khi nào nên dùng cái nào?

### Câu hỏi áp dụng:

4. Cho mảng `[5, 12, 3, 8, 17, 1, 9]`. Dùng array methods để tính tổng các số lẻ lớn hơn 5.
5. Bạn có danh sách students: `[{name, gpa, graduated}]`. Dùng một dòng (chaining) để: lọc chưa tốt nghiệp + GPA >= 3.0, sắp xếp GPA giảm dần, lấy tên.

<details>
<summary>👁️ Xem đáp án</summary>

1. **`forEach`** = duyệt qua từng phần tử, không trả về gì (undefined). **`map`** = biến đổi từng phần tử, trả về **mảng mới cùng length**. **`filter`** = giữ lại những phần tử thỏa điều kiện, trả về **mảng mới có thể ngắn hơn**. `map` và `filter` trả về mảng mới.
2. Không có comparator, `.sort()` convert tất cả sang string rồi sort theo Unicode. `[10, 2, 1].sort()` → `[1, 10, 2]` (sai!). `(a, b) => a - b` trả về số âm (a trước b), 0 (giữ nguyên), số dương (b trước a) → sort đúng.
3. **`switch`**: khi so sánh 1 biến với nhiều giá trị cụ thể và bằng nhau (===). **`if/else`**: điều kiện phức tạp hơn (ranges, multiple variables, kết hợp &&/||).
4. ```javascript
   const arr = [5, 12, 3, 8, 17, 1, 9];
   const result = arr.filter(n => n % 2 !== 0 && n > 5).reduce((sum, n) => sum + n, 0);
   // filter: [17, 9] → reduce: 17 + 9 = 26
   ```
5. ```javascript
   const names = students
       .filter(s => !s.graduated && s.gpa >= 3.0)
       .sort((a, b) => b.gpa - a.gpa)
       .map(s => s.name);
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Ternary `? :`** cho if/else đơn giản. `if/else` cho logic phức tạp. `switch` cho nhiều giá trị cụ thể
2. **`for...of`** cho array (đơn giản). **`for`** khi cần index. **`while`** khi không biết số lần
3. **`filter`** = lọc (mảng ngắn hơn). **`map`** = biến đổi (cùng length). **`reduce`** = tổng hợp (1 giá trị)
4. **`.sort()` thay đổi mảng gốc** — luôn `[...arr].sort(...)` để tránh side effect
5. **Chaining array methods** = pipeline xử lý data đọc như prose: `products.filter(...).sort(...).map(...)`

---

## 10. ➡️ Next Lesson Bridge

*Minh render được danh sách todos bằng `map`. Nhưng code lặp lại: mỗi lần cần render, lại viết lại logic. Phần tính điểm lại viết ở chỗ khác.*

*"Đóng gói logic thành function," anh Hùng nói. "Viết `renderTodo()` một lần. Gọi ở khắp nơi. Khi cần sửa logic → sửa 1 chỗ duy nhất."*

**→ [Bài 05: Functions](./05_functions.md) — Arrow functions, scope, closures: đóng gói logic để tái sử dụng.**
