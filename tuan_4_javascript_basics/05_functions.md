# 🟨 TUẦN 4 - BÀI 05
# **FUNCTIONS**

---

## 0. 🎬 Opening Hook

*Minh thực tập tuần thứ hai tại startup. Sếp giao:*

*"Em gửi email cảm ơn cho 500 khách hàng. Mỗi email khác nhau: tên khác, sản phẩm khác, số tiền khác."*

*Minh bắt đầu gõ từng dòng. Sau email thứ 47, anh nhận ra: "Mình đang là robot. Robot thì để máy tính làm."*

*Anh viết function đầu tiên:*

```javascript
function sendThankYouEmail(name, product, amount) {
    console.log(`Gửi ${name}: Cảm ơn mua ${product}, tổng ${amount.toLocaleString()}đ`);
}

// 500 email → 500 lần gọi → 0.3 giây
customers.forEach(c => sendThankYouEmail(c.name, c.product, c.amount));
```

*Sếp: "Xong rồi à? Nhanh thế?"*

*Minh cười: "Function, sếp ạ. Viết một lần, chạy triệu lần."* ☕

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**DRY principle — Don't Repeat Yourself:**
- Không có functions → copy-paste code → bug ở 1 chỗ = phải sửa 47 chỗ
- Có functions → đóng gói logic → sửa 1 chỗ = đổi toàn bộ app

Functions là đơn vị tổ chức code nhỏ nhất. Mọi framework (React, Vue, Angular) đều build từ functions. Arrow functions là cú pháp bạn thấy KHẮP NƠI trong React.

---

## 2. 🌐 Big Picture — Anatomy của Function

```
FUNCTION DECLARATION
function tên(parameter1, parameter2) {
    // Thân hàm
    return giáTrị;  // Trả kết quả ra ngoài
}

Gọi hàm:
tên(argument1, argument2)  → Trả về giáTrị

Vocabulary:
Parameter = "ô trống" trong định nghĩa (ten, sanPham)
Argument  = "giá trị thực" khi gọi ("Minh", "iPhone")
Return    = kết quả trả về. Không có return = undefined
```

---

## 3. ⚙️ Core Technical Truth

### 3 cách khai báo function

**1. Function Declaration — Cách truyền thống:**
```javascript
function greet(name) {
    return `Xin chào ${name}!`;
}

// Hoisting: có thể gọi TRƯỚC khi khai báo!
console.log(greet("Minh"));  // Hoạt động dù gọi trước định nghĩa
```

**2. Function Expression — Gán vào biến:**
```javascript
const greet = function(name) {
    return `Xin chào ${name}!`;
};

// Không có hoisting — phải khai báo trước khi dùng
```

**3. Arrow Function (ES6) — Cú pháp hiện đại ⭐:**
```javascript
// Dạng đầy đủ
const greet = (name) => {
    return `Xin chào ${name}!`;
};

// Shorthand: 1 parameter → bỏ ()
const greet = name => {
    return `Xin chào ${name}!`;
};

// Shorthand: 1 dòng return → bỏ {} và return
const greet = name => `Xin chào ${name}!`;

// Không có parameter
const sayHello = () => "Hello!";

// Return object (cần bọc trong ())
const makeUser = (name, age) => ({ name, age });
// Không có (): JS nhầm {} là block, không phải object literal
```

**So sánh khi nào dùng gì:**

| Trường hợp | Khuyến nghị |
|---|---|
| Hàm top-level cần hoisting | Function Declaration |
| Gán vào biến, callback | Arrow Function |
| `Array.map/filter/reduce` | Arrow Function |
| Cần `this` binding (class methods) | Regular function |
| Event handler cần `this` | Regular function hoặc bind() |

---

### Parameters — Kỹ thuật nâng cao

```javascript
// Default parameters — Giá trị mặc định
function createUser(name, role = "user", active = true) {
    return { name, role, active };
}
createUser("Minh");              // { name: "Minh", role: "user", active: true }
createUser("Hùng", "admin");     // { name: "Hùng", role: "admin", active: true }

// Rest parameters — Nhận nhiều arguments không giới hạn
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5);  // 15

// Destructuring trong parameter — Phổ biến trong React!
function renderUser({ name, age, email = "N/A" }) {
    return `${name} (${age}) — ${email}`;
}
renderUser({ name: "Minh", age: 21 });

// Array destructuring
function getFirst([first, second, ...rest]) {
    return { first, second, rest };
}
```

---

### Return Values — Mọi thứ function có thể trả về

```javascript
// Trả về primitive
const add = (a, b) => a + b;                    // Number
const isEven = n => n % 2 === 0;                // Boolean
const getGreeting = name => `Hello ${name}`;    // String

// Trả về object
const tinhGia = (gia, soLuong, giamGia = 0) => ({
    gia,
    soLuong,
    giamGia,
    tongTruocGiam: gia * soLuong,
    tongSauGiam: gia * soLuong * (1 - giamGia)
});

// Trả về array
const getMinMax = arr => [Math.min(...arr), Math.max(...arr)];
const [min, max] = getMinMax([3, 1, 4, 1, 5, 9]);

// Trả về function (Higher-order function)
const multiplier = factor => number => number * factor;
const double = multiplier(2);   // double là function
const triple = multiplier(3);   // triple là function
double(5);  // 10
triple(5);  // 15
```

---

### Scope — "Ai nhìn thấy biến nào"

```javascript
// Global scope — Khắp nơi đều thấy
const appName = "Todo App";

function showName() {
    console.log(appName);  // ✅ Thấy global variable
}

// Function scope — Chỉ trong function
function processData() {
    const localData = "chỉ tôi biết";  // ← Chỉ trong processData
    console.log(localData);             // ✅
}
// console.log(localData);  // ❌ ReferenceError

// Block scope với let/const
if (true) {
    let blockVar = "trong block";
    const blockConst = "cũng trong block";
    console.log(blockVar);   // ✅
}
// console.log(blockVar);    // ❌ ReferenceError

// var không có block scope (lý do không dùng var)
if (true) {
    var leakyVar = "tôi rò rỉ ra ngoài!";
}
console.log(leakyVar);  // ✅ "tôi rò rỉ ra ngoài!" — bẫy của var!
```

---

### Closures — "Function nhớ môi trường của mình"

```javascript
// Factory function — Tạo ra các function khác nhau từ 1 template
function createCounter(initialValue = 0) {
    let count = initialValue;  // ← Biến "cha" — closure nhớ cái này

    return {
        increment: () => ++count,
        decrement: () => --count,
        reset: () => { count = initialValue; return count; },
        getValue: () => count
    };
}

const cartCount = createCounter(0);
cartCount.increment();   // 1
cartCount.increment();   // 2
cartCount.increment();   // 3
cartCount.decrement();   // 2
console.log(cartCount.getValue());  // 2

// Mỗi counter độc lập nhau
const wishlistCount = createCounter(0);
wishlistCount.increment();  // 1 — không liên quan đến cartCount

// useState trong React là closure!
// const [count, setCount] = useState(0);
// setCount(prev => prev + 1)  ← prev nhớ được giá trị cũ nhờ closure
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Arrow function `(params) => expression` — cú pháp mặc định cho callbacks và array methods.**
> **Closure = function nhớ biến của scope cha, ngay cả sau khi scope cha kết thúc.**

---

## 5. 🏭 Real-world Layer

### Functions trong Todo App thực tế:

```javascript
// ===== UTILITY FUNCTIONS =====
const formatPrice = price =>
    price.toLocaleString("vi-VN") + "đ";

const formatDate = date =>
    new Date(date).toLocaleDateString("vi-VN");

const slugify = text =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

// ===== BUSINESS LOGIC =====
const calculateCartTotal = items =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const applyDiscount = (total, code) => {
    const discounts = { SUMMER: 0.2, WINTER: 0.15, STUDENT: 0.1 };
    const rate = discounts[code] ?? 0;
    return { total, discount: total * rate, final: total * (1 - rate) };
};

// ===== RENDER FUNCTIONS =====
const renderProductCard = ({ name, price, image, inStock }) => `
    <div class="product-card ${inStock ? "" : "product-card--sold-out"}">
        <img src="${image}" alt="${name}" loading="lazy">
        <h3 class="product-card__title">${name}</h3>
        <p class="product-card__price">${formatPrice(price)}</p>
        <button class="btn btn--primary" ${inStock ? "" : "disabled"}>
            ${inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
    </div>
`;

// Kết hợp lại
const renderProductList = products =>
    products.filter(p => p.active).map(renderProductCard).join("");
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Xây thư viện utility functions (25 phút)

Tạo file `utils.js` và implement:

```javascript
// 1. Hàm chào theo giờ
const greetByTime = (name) => {
    const hour = new Date().getHours();
    // TODO: return "Chào buổi sáng/chiều/tối" tùy giờ
};

// 2. Hàm validate email
const isValidEmail = (email) => {
    // TODO: kiểm tra có @ và . sau @
    // Gợi ý: email.includes("@") && email.split("@")[1].includes(".")
};

// 3. Hàm tính hóa đơn
const calculateBill = (items) => {
    // items = [{ name, price, quantity }]
    // TODO: tính tổng, áp dụng giảm giá 10% nếu > 500k
    // Trả về { subtotal, discount, total, message }
};

// 4. Higher-order: tạo validator
const createRangeValidator = (min, max) => {
    // TODO: trả về function check value trong [min, max]
};

const isValidAge = createRangeValidator(1, 150);
const isValidScore = createRangeValidator(0, 100);

console.log(isValidAge(21));    // true
console.log(isValidAge(200));   // false
console.log(isValidScore(95));  // true

// 5. Memoize function (cache kết quả)
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        cache[key] = fn(...args);
        return cache[key];
    };
}

const expensiveCalc = memoize((n) => {
    // Giả lập tính toán nặng
    return n * n * n;
});
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Arrow function và regular function như nhau"** | Khác nhau về `this` binding. Arrow function không có `this` của riêng nó — kế thừa `this` từ scope bao quanh. Dùng regular function khi cần `this` |
| **"Function luôn phải có `return`"** | Không — function không có `return` trả về `undefined`. `forEach`, `console.log`, event handlers không cần return |
| **"Closure phức tạp và ít dùng"** | Closure xuất hiện khắp nơi: `useState` trong React, `setTimeout` callback, debounce/throttle, module pattern |
| **"Default parameter `undefined` khác `null`"** | `f(undefined)` → dùng default. `f(null)` → KHÔNG dùng default (null là giá trị hợp lệ). Lưu ý quan trọng khi dùng default params |
| **"Hàm đệ quy (recursion) không bao giờ dùng trong thực tế"** | Recursion dùng nhiều: render cây thư mục (file tree), xử lý JSON lồng nhau, thuật toán (quick sort, tree traversal) |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa Function Declaration và Arrow Function về hoisting là gì?
2. `return` trong function làm gì? Điều gì xảy ra nếu function không có `return`?
3. Closure là gì? Cho một ví dụ đơn giản.

### Câu hỏi áp dụng:

4. Convert function sau sang arrow function, rồi sang dạng ngắn nhất có thể:
   ```javascript
   function multiply(a, b) {
       return a * b;
   }
   ```
5. Function sau có vấn đề gì? Sửa lại đúng:
   ```javascript
   function getFullName(user) {
       console.log(user.firstName + " " + user.lastName);
   }
   const name = getFullName({ firstName: "Nguyen", lastName: "Minh" });
   console.log(name.toUpperCase());  // Error!
   ```

<details>
<summary>👁️ Xem đáp án</summary>

1. **Function Declaration** có **hoisting** — có thể gọi trước khi khai báo trong file. **Arrow Function** (và function expression) **không có hoisting** — phải khai báo trước khi gọi.
2. `return` dừng function và trả giá trị về nơi gọi. Nếu không có `return`, function trả về **`undefined`**. Đây là nguồn gốc bug khi gán `const result = someFunction()` nhưng function quên return.
3. Closure = function "nhớ" các biến từ scope nơi nó được tạo ra, ngay cả sau khi scope đó đóng lại. Ví dụ: `function counter() { let n = 0; return () => ++n; }` — hàm trả về nhớ `n` dù `counter()` đã chạy xong.
4. ```javascript
   // Arrow function đầy đủ:
   const multiply = (a, b) => { return a * b; };
   // Arrow function ngắn (1 dòng return):
   const multiply = (a, b) => a * b;
   ```
5. Vấn đề: `getFullName` dùng `console.log` nhưng không `return` → trả về `undefined`. Sau đó `name.toUpperCase()` lỗi vì `undefined.toUpperCase()`. **Sửa**: đổi `console.log` thành `return`:
   ```javascript
   function getFullName(user) {
       return user.firstName + " " + user.lastName;
   }
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Arrow function** `(params) => expression` — cú pháp mặc định cho callbacks, array methods
2. **Default parameters** `(a, b = 10)`, **rest params** `(...args)`, **destructuring params** `({ name })` — cú pháp ES6+ cần biết
3. **`return` bắt buộc** khi muốn sử dụng kết quả. Không có return = undefined = thường là bug
4. **Scope**: global → function → block. `let`/`const` có block scope. `var` rò rỉ ra ngoài block
5. **Closure** = function nhớ scope cha. Nền tảng của React hooks, module pattern, factory functions

---

## 10. ➡️ Next Lesson Bridge

*"500 email gửi xong. Functions giải quyết vấn đề lặp lại," Minh nói. "Nhưng sếp vừa giao thêm: xử lý 10.000 sản phẩm từ API, lọc theo giá và danh mục, sắp xếp, tính tổng. Mình cần một nơi lưu trữ tất cả."*

**→ [Bài 06: Arrays & Objects](./06_arrays_objects.md) — Cấu trúc dữ liệu nền tảng: CRUD, destructuring, spread operator, và pattern kết hợp Arrays + Objects từ API.**
