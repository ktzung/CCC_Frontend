# 🟨 TUẦN 5 - BÀI 26
# **CLOSURES — Hàm đóng gói biến bên ngoài**

---

## 0. 🎬 Opening Hook

*Minh viết bộ đếm click cho nút "Like":*

```javascript
let count = 0;
document.querySelector("#like-btn").addEventListener("click", () => {
    count++;
    console.log(`Likes: ${count}`);
});
```

*Hoạt động. Nhưng `count` là biến toàn cục — bất kỳ code nào cũng có thể `count = 0` để reset.*

*Anh Hùng: "Dùng closure — biến 'ẩn' bên trong, không ai sửa được trừ function."*

```javascript
function createCounter() {
    let count = 0;  // Private — không ai truy cập được từ ngoài
    return {
        increment: () => ++count,
        getCount: () => count
    };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
console.log(counter.getCount());  // 2
// count = 0  ← Không thể! count không tồn tại ở scope ngoài
```

*"Closure = function nhớ biến ở nơi nó được tạo, dù chạy ở đâu."* 🔒

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Closure là **một trong những khái niệm quan trọng nhất** của JavaScript:

- **Data privacy**: Tạo biến private trước khi có `#private`
- **React hooks**: `useState` bên trong dùng closure
- **Event handlers**: Nhớ trạng thái khi event xảy ra
- **Currying**: `add(5)(3)` — function trả về function
- **Module pattern**: Tổ chức code private/public

> Không hiểu closure = không hiểu 50% code JavaScript nâng cao.

---

## 2. 🌐 Big Picture — Closure hoạt động thế nào?

```
CLOSURE = Function + Môi trường nơi nó được tạo

function outer() {
    let x = 10;          ← Biến trong outer scope
    
    function inner() {
        console.log(x);  ← inner "nhớ" x = 10
    }
    
    return inner;         ← Trả inner ra ngoài
}

const fn = outer();       ← outer() chạy xong, x lẽ ra đã bị hủy
fn();                     ← Nhưng inner VẪN nhớ x = 10!

┌─────────────────────────────────┐
│ outer() scope                   │
│   x = 10  ←──────────────┐      │
│   inner() ───────────────┼──┐   │
│                           │  │   │
└───────────────────────────┼──┼───┘
                            │  │
┌───────────────────────────┼──┼───┐
│ Global scope              │  │   │
│   fn = inner  ←───────────┘  │   │
│   fn() → console.log(x) ←───┘   │
│          Vẫn thấy x = 10!       │
└──────────────────────────────────┘
```

---

## 3. ⚙️ Core Technical Truth

### Closure cơ bản

```javascript
function createGreeting(greeting) {
    // greeting được "capture" bởi closure
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeting("Xin chào");
const sayGoodbye = createGreeting("Tạm biệt");

console.log(sayHello("Minh"));    // "Xin chào, Minh!"
console.log(sayGoodbye("Minh"));  // "Tạm biệt, Minh!"

// Mỗi closure có môi trường RIÊNG BIỆT
// sayHello vẫn nhớ "Xin chào"
// sayGoodbye vẫn nhớ "Tạm biệt"
```

---

### Data Privacy — Biến private

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // Private — không truy cập từ ngoài

    return {
        deposit(amount) {
            if (amount > 0) balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return balance;
            }
            return "Không đủ số dư";
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000000);
account.deposit(500000);
console.log(account.getBalance());  // 1500000
// console.log(account.balance);    // undefined — private!
```

---

### Counter — Ví dụ kinh điển

```javascript
function createCounter(start = 0, step = 1) {
    let count = start;

    return {
        increment: () => { count += step; return count; },
        decrement: () => { count -= step; return count; },
        reset: () => { count = start; return count; },
        getCount: () => count
    };
}

const counter = createCounter(0, 5);
console.log(counter.increment());  // 5
console.log(counter.increment());  // 10
console.log(counter.decrement());  // 5
console.log(counter.reset());      // 0
```

---

### Currying — Function trả về Function

```javascript
// Currying: chuyển hàm nhiều tham số thành chuỗi hàm 1 tham số
function multiply(a) {
    return function(b) {
        return a * b;
    };
}

// Arrow function version
const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(multiply(4)(5));  // 20

// Practical: tạo function配置 sẵn
const addTax = taxRate => price => price * (1 + taxRate);

const addVAT = addTax(0.1);      // VAT 10%
const addSpecialTax = addTax(0.05); // Thuế đặc biệt 5%

console.log(addVAT(100000));       // 110000
console.log(addSpecialTax(100000)); // 105000
```

---

### Event Handler với Closure

```javascript
// Problem: closures trong loop
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3 — tất cả đều thấy i = 3 (giá trị cuối cùng)

// Solution 1: dùng let (block scope)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Output: 0, 1, 2

// Solution 2: IIFE tạo closure riêng
for (var i = 0; i < 3; i++) {
    ((j) => {
        setTimeout(() => console.log(j), 1000);
    })(i);
}
// Output: 0, 1, 2

// Solution 3: dùng setTimeout với tham số
for (var i = 0; i < 3; i++) {
    setTimeout((j) => console.log(j), 1000, i);
}
// Output: 0, 1, 2
```

---

### Practical: Debounce

```javascript
// Debounce: chỉ gọi function SAU KHI user ngừng nhập 300ms
function debounce(fn, delay) {
    let timerId;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Sử dụng cho search input
const searchInput = document.querySelector("#search");
const handleSearch = debounce((query) => {
    console.log(`Searching: ${query}`);
    // fetch(`/api/search?q=${query}`)
}, 300);

searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
```

---

### Practical: Memoization

```javascript
// Memoization: cache kết quả để không tính lại
function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("Cache hit!");
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Fibonacci không memo: rất chậm
const fib = memoize(n => {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

console.log(fib(100));  // Tính ngay lập tức nhờ memoization
console.log(fib(100));  // Cache hit!
```

---

### Practical: Module Pattern

```javascript
// Module pattern — tổ chức code private/public
const UserModule = (() => {
    // Private
    let users = [];
    let nextId = 1;

    function validate(user) {
        return user.name && user.email;
    }

    // Public API
    return {
        add(user) {
            if (!validate(user)) return null;
            const newUser = { ...user, id: nextId++ };
            users.push(newUser);
            return newUser;
        },
        findById(id) {
            return users.find(u => u.id === id);
        },
        getAll() {
            return [...users];  // Trả về bản copy
        },
        count() {
            return users.length;
        }
    };
})();

UserModule.add({ name: "Minh", email: "minh@gmail.com" });
UserModule.add({ name: "Linh", email: "linh@gmail.com" });
console.log(UserModule.getAll());
// console.log(UserModule.users);  // undefined — private!
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Tạo createGreeter(message) trả về function nhận tên
//    const hi = createGreeter("Hi"); hi("Minh") → "Hi, Minh!"

// 2. Tạo createCounter(start) với increment, decrement, getCount

// 3. Giải thích output:
function outer() {
    let x = 10;
    return () => console.log(x);
}
const fn = outer();
fn();  // In ra gì?
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Tạo createMultiplier(factor) dùng currying
//    const double = createMultiplier(2);
//    double(5) → 10, double(10) → 20

// 2. Tạo createAccumulator(initial) với add, subtract, get, reset
//    const acc = createAccumulator(0);
//    acc.add(5); acc.add(3); acc.get() → 8

// 3. Fix bug: tại sao cả 3 button đều log "Button 3"?
for (var i = 1; i <= 3; i++) {
    document.querySelector(`#btn${i}`).addEventListener("click", () => {
        console.log(`Button ${i}`);
    });
}
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Implement debounce(fn, delay) và throttle(fn, interval)

// 2. Implement memoize(fn) với max cache size
//    memoize(fn, 100) — chỉ cache 100 kết quả gần nhất

// 3. Tạo createStore(initialState) — mini Redux
//    - getState(), dispatch(action), subscribe(listener)
//    - Dùng closure để encapsulate state
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 19 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/19_Day_Closures/19_day_closures.md)*
