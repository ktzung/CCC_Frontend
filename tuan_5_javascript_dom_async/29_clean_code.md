# 🟨 TUẦN 5 - BÀI 29
# **CLEAN CODE — Viết code sạch và dễ bảo trì**

---

## 0. 🎬 Opening Hook

*Minh nộp bài tập. Code chạy đúng 100%. Nhưng khi review:*

```javascript
// ❌ Code của Minh
function calc(a, b, c) {
    let x = a * b;
    if (c) {
        x = x - (x * c / 100);
    }
    return x;
}
calc(25000000, 5, 10);  // ???
```

*Anh Hùng: "Em hiểu không?" Minh: "Không... code em viết mà em cũng không hiểu."*

```javascript
// ✅ Code sạch
function calculateTotalPrice(unitPrice, quantity, discountPercent = 0) {
    const subtotal = unitPrice * quantity;
    const discount = subtotal * (discountPercent / 100);
    return subtotal - discount;
}

calculateTotalPrice(25000000, 5, 10);  // Rõ ràng ngay
```

*"Code được viết 1 lần nhưng đọc 100 lần. Viết cho người đọc, không phải cho máy."* 📖

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

- **Maintainability**: Code sạch = sửa bug nhanh, thêm feature dễ
- **Teamwork**: Code người khác đọc được = làm việc nhóm hiệu quả
- **Career**: Senior đánh giá qua code quality, không chỉ qua output
- **Refactoring**: Code sạch = refactor an toàn

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

---

## 2. 🌐 Big Picture — Clean Code Principles

```
CLEAN CODE PRINCIPLES
│
├── NAMING — Đặt tên có nghĩa
│   ├── Biến:     userName (không phải u, data, temp)
│   ├── Function: calculateTotal (không phải calc, doStuff)
│   ├── Boolean:  isActive, hasPermission, canEdit
│   └── Constants: MAX_RETRIES, API_BASE_URL
│
├── FUNCTIONS — Nhỏ, tập trung, 1 nhiệm vụ
│   ├── 1 function = 1 việc (Single Responsibility)
│   ├── Tối đa 20 dòng
│   ├── Tối đa 3 parameters
│   └── Không副作用 (pure function khi có thể)
│
├── DRY — Don't Repeat Yourself
│   ├── Tạo function cho code lặp lại
│   ├── Tạo constant cho magic numbers
│   └── Tạo utility cho logic chung
│
├── COMMENTS — Giải thích WHY, không phải WHAT
│   ├── ❌ // Increment i by 1  → i++ (thừa)
│   ├── ✅ // Email API có rate limit 100 req/min
│   └── TODO / FIXME / HACK markers
│
├── ERROR HANDLING — Xử lý lỗi graceful
│   ├── Try-catch cho code có thể lỗi
│   ├── Validate input
│   └── Fallback values
│
└── CODE ORGANIZATION — Tổ chức code
    ├── Group theo feature, không phải type
    ├── Imports ở đầu file
    └── Export ở cuối file
```

---

## 3. ⚙️ Core Technical Truth

### 1. Naming — Đặt tên có nghĩa

```javascript
// ❌ Tên vô nghĩa
const d = new Date();
const u = users.filter(u => u.a > 18);
function calc(a, b) { return a * b; }

// ✅ Tên có nghĩa
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
function calculateArea(width, height) { return width * height; }

// Quy tắc đặt tên:
// - Biến/dùng camelCase:     userName, isActive
// - Class dùng PascalCase:   UserService, TodoList
// - Constants dùng UPPER_SNAKE: MAX_SIZE, API_URL
// - Boolean: is/has/can/should: isLoading, hasError, canEdit
```

---

### 2. Functions — Nhỏ và tập trung

```javascript
// ❌ Function quá dài, làm nhiều việc
function processOrder(order) {
    // Validate (10 dòng)
    // Calculate total (10 dòng)
    // Apply discount (10 dòng)
    // Send email (10 dòng)
    // Update database (10 dòng)
    // Log activity (5 dòng)
}  // 55 dòng — quá dài!

// ✅ Tách thành các function nhỏ
function processOrder(order) {
    const validatedOrder = validateOrder(order);
    const total = calculateTotal(validatedOrder);
    const discountedTotal = applyDiscount(total, validatedOrder.discount);
    sendConfirmationEmail(validatedOrder.customer, discountedTotal);
    updateOrderStatus(validatedOrder.id, "completed");
    logActivity("order_processed", validatedOrder.id);
}

function validateOrder(order) { /* ... */ }
function calculateTotal(order) { /* ... */ }
function applyDiscount(total, discount) { /* ... */ }
```

---

### 3. DRY — Don't Repeat Yourself

```javascript
// ❌ Lặp lại code
function showUserError(msg) {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#error").style.color = "red";
    document.querySelector("#error").textContent = msg;
}

function showSuccessMsg(msg) {
    document.querySelector("#success").style.display = "block";
    document.querySelector("#success").style.color = "green";
    document.querySelector("#success").textContent = msg;
}

// ✅ Tạo function chung
function showMessage(elementId, message, type = "info") {
    const el = document.querySelector(`#${elementId}`);
    el.style.display = "block";
    el.style.color = type === "error" ? "red" : "green";
    el.textContent = message;
}

showMessage("error", "Có lỗi xảy ra", "error");
showMessage("success", "Thành công!", "success");

// ✅ Tạo constant cho magic numbers
// ❌ if (age >= 18) { ... }
// ❌ if (score >= 50) { ... }
const LEGAL_AGE = 18;
const PASSING_SCORE = 50;

if (age >= LEGAL_AGE) { ... }
if (score >= PASSING_SCORE) { ... }
```

---

### 4. Comments — Giải thích WHY

```javascript
// ❌ Comment thừa — giải thích WHAT (code đã rõ)
let count = 0;        // Khởi tạo count = 0
count++;              // Tăng count lên 1
return count;         // Trả về count

// ✅ Comment hữu ích — giải thích WHY
// API giới hạn 100 request/phút, cần throttle
// Docs: https://api.example.com/rate-limits
const RATE_LIMIT = 100;

// Workaround: Safari không hỗ trợ IntersectionObserver v2
// https://bugs.webkit.org/show_bug.cgi?id=12345
const usePolyfill = isSafari && !supportsV2();

// TODO: Refactor thành async khi upgrade Node 20
// FIXME: Memory leak khi user logout nhưng timer vẫn chạy
// HACK: Tạm thời hardcode, cần config từ server
```

---

### 5. Error Handling

```javascript
// ❌ Không xử lý lỗi
async function fetchUser(id) {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    return data;  // Crashed nếu API fail!
}

// ✅ Xử lý lỗi graceful
async function fetchUser(id) {
    try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error);
        return null;  // Fallback value
    }
}

// ✅ Validate input
function setAge(age) {
    if (typeof age !== "number" || age < 0 || age > 150) {
        throw new RangeError("Age must be between 0 and 150");
    }
    this.age = age;
}
```

---

### 6. Code Style — Consistent formatting

```javascript
// ❌ Không consistent
const name="Minh";
const age = 21;
const hobbies =[ "code","read" ];

// ✅ Consistent (dùng Prettier/ESLint)
const name = "Minh";
const age = 21;
const hobbies = ["code", "read"];

// Destructuring khi có thể
const { name, age, email } = user;

// Arrow function cho callback
users.filter(u => u.active).map(u => u.name);

// Template literals thay vì concatenation
const msg = `Xin chào ${name}, bạn ${age} tuổi`;
```

---

### 7. Practical Checklist

```javascript
// ✅ TRƯỚC KHI COMMIT — kiểm tra:

// 1. Tên có nghĩa?
//    ❌ const d = getData();
//    ✅ const userData = fetchUserData();

// 2. Function có quá dài (>20 dòng)?
//    → Tách thành function nhỏ hơn

// 3. Có magic number?
//    ❌ if (score >= 50)
//    ✅ if (score >= PASSING_SCORE)

// 4. Có code lặp lại?
//    → Tạo function hoặc utility

// 5. Có xử lý lỗi?
//    → try-catch cho async, validate cho input

// 6. Comment có hữu ích?
//    → Xóa comment thừa, thêm comment giải thích WHY

// 7. Console.log có còn sót?
//    → Xóa hoặc thay bằng proper logging
```

---

### 8. Refactoring Example

```javascript
// ❌ BEFORE — Code bẩn
function d(users) {
    let r = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].a >= 18 && users[i].s === "active") {
            r.push({
                n: users[i].n,
                e: users[i].e,
                g: users[i].a >= 65 ? "senior" : "adult"
            });
        }
    }
    return r;
}

// ✅ AFTER — Code sạch
const ADULT_AGE = 18;
const SENIOR_AGE = 65;

function getActiveAdults(users) {
    return users
        .filter(isActiveAdult)
        .map(formatUserSummary);
}

function isActiveAdult(user) {
    return user.age >= ADULT_AGE && user.status === "active";
}

function formatUserSummary(user) {
    return {
        name: user.name,
        email: user.email,
        ageGroup: user.age >= SENIOR_AGE ? "senior" : "adult"
    };
}
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// Refactor code sau thành code sạch:
function calc(a, b, c) {
    let x = a * b;
    if (c) { x = x - x * c / 100; }
    return x;
}
calc(25000000, 5, 10);

// Gợi ý: đổi tên biến, thêm comment, tách logic
```

### Cấp độ 2 — Trung bình

```javascript
// Refactor: tách function, đổi tên, DRY
function process(data) {
    let r = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].price > 0 && data[i].stock > 0) {
            let total = data[i].price * data[i].stock;
            if (data[i].discount) {
                total = total - total * data[i].discount / 100;
            }
            r.push({ name: data[i].name, total: total });
        }
    }
    return r;
}
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Tạo style guide cho project: naming conventions, formatting rules
// 2. Setup ESLint + Prettier cho project
// 3. Review code của bạn — viết lại 1 function cũ theo clean code principles
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 20 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/20_Day_Writing_clean_codes/20_day_writing_clean_codes.md)*
