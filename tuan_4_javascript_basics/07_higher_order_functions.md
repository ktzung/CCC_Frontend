# 🟨 TUẦN 4 - BÀI 07
# **HIGHER ORDER FUNCTIONS — forEach, map, filter, reduce**

---

## 0. 🎬 Opening Hook

*Sếp giao Minh xử lý danh sách 10.000 đơn hàng: "Lọc đơn trên 1 triệu, tính tổng doanh thu, nhóm theo danh mục."*

*Minh bắt đầu viết `for` loop lồng nhau. 50 dòng code. Chạy thử — sai kết quả. Fix. Chạy lại — sai tiếp.*

*Anh Hùng nhìn qua: "Em đang dùng 'kiếm gỗ' để chặt rừng. Dùng Higher Order Functions — 3 dòng xong."*

```javascript
const orders = await fetchOrders(); // 10.000 đơn

const expensive = orders.filter(o => o.total > 1000000);       // Lọc
const revenue = orders.reduce((sum, o) => sum + o.total, 0);   // Tổng
const byCategory = orders.reduce((acc, o) => {                  // Nhóm
    (acc[o.category] ??= []).push(o);
    return acc;
}, {});
```

*3 dòng. 10.000 đơn. 0.015 giây. Sếp: "Làm cách nào?" Minh: "Higher Order Functions — viết một lần, áp dụng mọi nơi."* ☕

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Higher Order Functions (HOF) là **cách chuyên nghiệp** để xử lý dữ liệu trong JavaScript:

- **React**: `.map()` render danh sách, `.filter()` lọc state
- **API response**: Mọi API đều trả về array → cần `.map()`, `.filter()`, `.reduce()`
- **Code readability**: `users.filter(u => u.active)` rõ hơn `for` loop 5 dòng

> Nếu bạn thấy `for` loop trong code React → 90% có thể thay bằng HOF ngắn hơn, sạch hơn.

---

## 2. 🌐 Big Picture — Bản đồ Higher Order Functions

```
HIGHER ORDER FUNCTIONS — Nhận hoặc trả về function khác
│
├── ITERATION — Lặp qua từng phần tử
│   ├── .forEach()     → Lặp, không trả về gì (side effect)
│   └── .map()         → Biến đổi → mảng MỚI
│
├── FILTERING & SEARCHING — Lọc và tìm kiếm
│   ├── .filter()      → Lọc → mảng MỚI (subset)
│   ├── .find()        → Tìm 1 phần tử đầu tiên
│   ├── .findIndex()   → Tìm chỉ mục phần tử đầu tiên
│   ├── .some()        → Có ít nhất 1 phần tử thỏa? → boolean
│   └── .every()       → Tất cả đều thỏa? → boolean
│
├── AGGREGATION — Tổng hợp
│   └── .reduce()      → Gộp toàn bộ → 1 giá trị
│
└── ORDERING — Sắp xếp
    └── .sort()        → Sắp xếp tại chỗ (mutate mảng gốc)

Tất cả đều NHẬN CALLBACK làm tham số → Higher Order Function
```

---

## 3. ⚙️ Core Technical Truth

### Callback — Nền tảng của HOF

Callback là function được truyền làm **tham số** cho function khác:

```javascript
// Callback = function được truyền vào function khác
function processArray(arr, callback) {
    const results = [];
    for (const item of arr) {
        results.push(callback(item));  // Gọi callback cho mỗi phần tử
    }
    return results;
}

// Truyền arrow function làm callback
const doubled = processArray([1, 2, 3], x => x * 2);
console.log(doubled);  // [2, 4, 6]
```

---

### `.forEach()` — Lặp qua từng phần tử

```javascript
const fruits = ["🍎 Apple", "🍌 Banana", "🍒 Cherry"];

// Truyền callback trực tiếp
fruits.forEach((fruit, index) => {
    console.log(`${index + 1}. ${fruit}`);
});
// 1. 🍎 Apple
// 2. 🍌 Banana
// 3. 🍒 Cherry

// ⚠️ forEach KHÔNG trả về mảng mới → không gán vào biến
const result = fruits.forEach(f => f.toUpperCase());
console.log(result);  // undefined!
```

**Khi nào dùng forEach?** Khi bạn cần **side effect** (console.log, DOM update, push vào biến bên ngoài).

---

### `.map()` — Biến đổi từng phần tử → mảng MỚI

```javascript
const names = ["Minh", "Linh", "Hùng"];

// map trả về mảng MỚI, không mutate mảng gốc
const greetings = names.map(name => `Xin chào ${name}!`);
console.log(greetings);
// ["Xin chào Minh!", "Xin chào Linh!", "Xin chào Hùng!"]

// Practical: render danh sách sản phẩm
const products = [
    { name: "iPhone", price: 25000000 },
    { name: "iPad", price: 18000000 },
    { name: "MacBook", price: 35000000 }
];

const priceList = products.map(p => `${p.name}: ${p.price.toLocaleString()}đ`);
console.log(priceList);
// ["iPhone: 25.000.000đ", "iPad: 18.000.000đ", "MacBook: 35.000.000đ"]
```

**Lưu ý:** Luôn **return** giá trị trong callback. Nếu quên return → mảng toàn `undefined`.

```javascript
// ❌ SAI — quên return
const result = names.map(name => { name.toUpperCase() });
// [undefined, undefined, undefined]

// ✅ ĐÚNG — arrow function với block body cần return
const result = names.map(name => { return name.toUpperCase(); });

// ✅ ĐÚNG — arrow function expression (ngắn gọn)
const result = names.map(name => name.toUpperCase());
```

---

### `.filter()` — Lọc phần tử thỏa điều kiện

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Lọc số chẵn
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Practical: lọc sản phẩm hết hàng
const products = [
    { name: "iPhone", stock: 5 },
    { name: "iPad", stock: 0 },
    { name: "MacBook", stock: 3 },
    { name: "AirPods", stock: 0 }
];

const inStock = products.filter(p => p.stock > 0);
console.log(inStock);
// [{ name: "iPhone", stock: 5 }, { name: "MacBook", stock: 3 }]

// Kết hợp map + filter: tên sản phẩm còn hàng
const inStockNames = products
    .filter(p => p.stock > 0)
    .map(p => p.name);
console.log(inStockNames);  // ["iPhone", "MacBook"]
```

---

### `.reduce()` — Gộp toàn bộ thành 1 giá trị

```javascript
const numbers = [1, 2, 3, 4, 5];

// Tính tổng
const sum = numbers.reduce((accumulator, current) => {
    return accumulator + current;
}, 0);  // 0 = giá trị khởi tạo

console.log(sum);  // 15

// Giải thích từng bước:
// Bước 1: accumulator=0, current=1 → 0+1=1
// Bước 2: accumulator=1, current=2 → 1+2=3
// Bước 3: accumulator=3, current=3 → 3+3=6
// Bước 4: accumulator=6, current=4 → 6+4=10
// Bước 5: accumulator=10, current=5 → 10+5=15
```

**Practical: Nhóm đối tượng theo thuộc tính**

```javascript
const orders = [
    { product: "iPhone", category: "Phone", total: 25000000 },
    { product: "iPad", category: "Tablet", total: 18000000 },
    { product: "Galaxy", category: "Phone", total: 20000000 },
    { product: "MacBook", category: "Laptop", total: 35000000 }
];

// Nhóm theo category
const grouped = orders.reduce((acc, order) => {
    const key = order.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(order);
    return acc;
}, {});

console.log(grouped);
// {
//   Phone: [{product:"iPhone",...}, {product:"Galaxy",...}],
//   Tablet: [{product:"iPad",...}],
//   Laptop: [{product:"MacBook",...}]
// }

// Tính tổng doanh thu
const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
console.log(totalRevenue.toLocaleString() + "đ");  // 98.000.000đ
```

---

### `.find()` & `.findIndex()` — Tìm 1 phần tử

```javascript
const users = [
    { id: 1, name: "Minh", role: "admin" },
    { id: 2, name: "Linh", role: "user" },
    { id: 3, name: "Hùng", role: "moderator" }
];

// find → trả về PHẦN TỬ đầu tiên thỏa (hoặc undefined)
const admin = users.find(u => u.role === "admin");
console.log(admin);  // { id: 1, name: "Minh", role: "admin" }

// findIndex → trả về CHỈ MỤC đầu tiên thỏa (hoặc -1)
const idx = users.findIndex(u => u.name === "Linh");
console.log(idx);  // 1

// Không tìm thấy
const ghost = users.find(u => u.name === "Tèo");
console.log(ghost);  // undefined
```

---

### `.some()` & `.every()` — Kiểm tra điều kiện

```javascript
const scores = [85, 92, 78, 95, 60];

// some: có ít nhất 1 phần tử thỏa?
const hasPerfect = scores.some(s => s >= 95);
console.log(hasPerfect);  // true

// every: tất cả đều thỏa?
const allPassed = scores.every(s => s >= 50);
console.log(allPassed);  // true

// Practical: kiểm tra form
const formFields = [
    { name: "email", value: "minh@gmail.com", valid: true },
    { name: "password", value: "123", valid: false },
    { name: "name", value: "Minh", valid: true }
];

const isFormValid = formFields.every(f => f.valid);
console.log(isFormValid);  // false — password không hợp lệ
```

---

### `.sort()` — Sắp xếp

```javascript
// ⚠️ sort() MUTATE mảng gốc!
const fruits = ["Cherry", "Apple", "Banana"];
fruits.sort();
console.log(fruits);  // ["Apple", "Banana", "Cherry"]

// Sort số — mặc định sort theo chuỗi!
const nums = [10, 5, 40, 25, 100];
nums.sort();
console.log(nums);  // [10, 100, 25, 40, 5] — SAI!

// Đúng: truyền compare function
nums.sort((a, b) => a - b);   // Tăng dần: [5, 10, 25, 40, 100]
nums.sort((a, b) => b - a);   // Giảm dần: [100, 40, 25, 10, 5]

// Sort object theo thuộc tính
const products = [
    { name: "iPad", price: 18000000 },
    { name: "iPhone", price: 25000000 },
    { name: "AirPods", price: 5000000 }
];

products.sort((a, b) => a.price - b.price);  // Giá tăng dần
console.log(products.map(p => p.name));  // ["AirPods", "iPad", "iPhone"]
```

---

### Method Chaining — Kết hợp nhiều HOF

```javascript
const orders = [
    { id: 1, product: "iPhone", total: 25000000, status: "completed" },
    { id: 2, product: "iPad", total: 18000000, status: "cancelled" },
    { id: 3, product: "MacBook", total: 35000000, status: "completed" },
    { id: 4, product: "AirPods", total: 5000000, status: "completed" }
];

// Bài toán: Tìm tên sản phẩm completed, giá > 10tr, sắp xếp theo giá
const result = orders
    .filter(o => o.status === "completed")   // Lọc completed
    .filter(o => o.total > 10000000)          // Giá > 10tr
    .sort((a, b) => b.total - a.total)        // Giá giảm dần
    .map(o => o.product);                      // Lấy tên

console.log(result);  // ["MacBook", "iPhone"]
```

---

### setTimeout & setInterval — HOF thời gian

```javascript
// setTimeout: chạy SAU 1 lần delay
setTimeout(() => {
    console.log("Chạy sau 2 giây");
}, 2000);

// setInterval: chạy LẶP LẠI mỗi khoảng thời gian
let count = 0;
const timer = setInterval(() => {
    count++;
    console.log(`Tick ${count}`);
    if (count >= 5) clearInterval(timer);  // Dừng sau 5 lần
}, 1000);

// Practical: auto-save mỗi 30 giây
setInterval(() => {
    saveDraftToServer();
    console.log("Đã auto-save");
}, 30000);
```

---

## 4. 🔍 So sánh nhanh

| Method | Trả về | Mutate gốc? | Dùng khi |
|---|---|---|---|
| `forEach` | `undefined` | Không | Side effect (log, DOM) |
| `map` | Mảng mới | Không | Biến đổi dữ liệu |
| `filter` | Mảng mới | Không | Lọc theo điều kiện |
| `reduce` | Bất kỳ | Không | Tổng hợp, nhóm dữ liệu |
| `find` | Phần tử / `undefined` | Không | Tìm 1 phần tử |
| `some` | `boolean` | Không | Kiểm tra ≥1 thỏa |
| `every` | `boolean` | Không | Kiểm tra tất cả thỏa |
| `sort` | Mảng đã sort | **CÓ** | Sắp xếp |

---

## 5. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Dùng filter: lấy tất cả số lẻ
// 2. Dùng map: bình phương mỗi số
// 3. Dùng reduce: tính tổng
// 4. Dùng find: tìm số đầu tiên > 5
// 5. Dùng every: kiểm tra tất cả > 0
```

### Cấp độ 2 — Trung bình

```javascript
const students = [
    { name: "An", score: 85 },
    { name: "Bình", score: 42 },
    { name: "Cường", score: 78 },
    { name: "Dũng", score: 91 },
    { name: "Em", score: 55 }
];

// 1. Lọc sinh viên đậu (score >= 50)
// 2. Tính điểm trung bình cả lớp
// 3. Tìm sinh viên điểm cao nhất
// 4. Sắp xếp theo điểm giảm dần
// 5. Tạo mảng chuỗi: "An: 85 điểm"
```

### Cấp độ 3 — Nâng cao

```javascript
const orders = [
    { id: 1, customer: "Minh", product: "iPhone", total: 25000000, status: "completed" },
    { id: 2, customer: "Linh", product: "iPad", total: 18000000, status: "cancelled" },
    { id: 3, customer: "Minh", product: "AirPods", total: 5000000, status: "completed" },
    { id: 4, customer: "Hùng", product: "MacBook", total: 35000000, status: "completed" },
    { id: 5, customer: "Linh", product: "iPhone", total: 25000000, status: "completed" }
];

// 1. Tính tổng doanh thu từ đơn completed
// 2. Nhóm đơn hàng theo khách hàng
// 3. Tìm khách hàng chi nhiều tiền nhất
// 4. Lấy danh sách sản phẩm unique đã bán
// 5. Tạo báo cáo: { totalRevenue, totalOrders, topCustomer, products: [...] }
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 9 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/09_Day_Higher_order_functions/09_day_higher_order_functions.md)*
