# 🟨 TUẦN 5 - BÀI 28
# **CONSOLE METHODS & DEBUGGING — Công cụ gỡ lỗi chuyên nghiệp**

---

## 0. 🎬 Opening Hook

*Minh gặp bug: API trả về dữ liệu nhưng trang trắng. Anh thêm `console.log(data)` khắp nơi. 20 dòng log. Tìm bug mất 2 tiếng.*

*Anh Hùng: "Em đang gỡ bom bằng tay. Dùng DevTools — breakpoints, watch, call stack. Tìm bug trong 2 phút."*

```javascript
// ❌ console.log("debug") khắp nơi — 20 dòng, khó đọc
console.log(data);
console.log("step 1");
console.log(result);
console.log("here???");

// ✅ console.table() — 1 dòng, rõ ràng
console.table(users);  // Bảng dữ liệu đẹp, sortable

// ✅ Debugger breakpoint — dừng tại dòng chính xác
debugger;  // Dừng ở đây khi DevTools mở
```

*"Debug skill quan trọng hơn coding skill. Bug tìm nhanh = code nhanh."* 🐛

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Developer dành **50% thời gian để debug**. Biết công cụ debug = tiết kiệm hàng trăm giờ:

- **console.table()**: Xem array/object dạng bảng
- **console.group()**: Nhóm log theo chủ đề
- **console.time()**: Đo thời gian thực thi
- **Breakpoints**: Dừng code tại dòng chính xác
- **Network tab**: Kiểm tra API request/response

> "console.log() mọi nơi" = debug như người nguyên thủy. DevTools = debug như chuyên gia.

---

## 2. 🌐 Big Picture — DevTools Arsenal

```
DEBUGGING TOOLS
│
├── CONSOLE METHODS — Hiển thị thông tin
│   ├── console.log()      → Log cơ bản
│   ├── console.info()     → Info icon ℹ️
│   ├── console.warn()     → Warning icon ⚠️ (vàng)
│   ├── console.error()    → Error icon ❌ (đỏ) + stack trace
│   ├── console.table()    → Hiển thị dạng bảng
│   ├── console.group()    → Nhóm log có thể collapse
│   ├── console.time()     → Bắt đầu đo thời gian
│   ├── console.timeEnd()  → Kết thúc đo, in elapsed
│   ├── console.count()    → Đếm số lần gọi
│   ├── console.assert()   → Log nếu condition = false
│   └── console.dir()      → Hiển thị object properties
│
├── BREAKPOINTS — Dừng code tại vị trí
│   ├── Manual breakpoint  → Click vào dòng trong Sources
│   ├── debugger statement → Thêm debugger; trong code
│   ├── Conditional BP     → Chỉ dừng khi điều kiện đúng
│   └── Logpoint          → Log mà không dừng
│
├── DEVTOOLS TABS
│   ├── Elements           → HTML/CSS inspector
│   ├── Console            → JS console
│   ├── Sources            → Code + breakpoints
│   ├── Network            → HTTP requests
│   ├── Application        → Storage (localStorage, cookies)
│   └── Performance        → Profiling
│
└── DEBUGGING WORKFLOW
    Reproduce → Inspect → Hypothesize → Fix → Verify
```

---

## 3. ⚙️ Core Technical Truth

### Console Methods — Nâng cao

```javascript
// 1. console.table() — Hiển thị array/object dạng bảng
const users = [
    { name: "Minh", age: 21, role: "admin" },
    { name: "Linh", age: 20, role: "user" },
    { name: "Hùng", age: 22, role: "moderator" }
];
console.table(users);
// ┌─────────┬───────┬─────┬───────────┐
// │ (index) │ name  │ age │ role      │
// ├─────────┼───────┼─────┼───────────┤
// │ 0       │ Minh  │ 21  │ admin     │
// │ 1       │ Linh  │ 20  │ user      │
// │ 2       │ Hùng  │ 22  │ moderator │
// └─────────┴───────┴─────┴───────────┘

// Chỉ hiện 1 cột
console.table(users, ["name", "role"]);

// 2. console.group() — Nhóm log
console.group("User Loading");
console.log("Fetching user...");
console.log("Parsing response...");
console.log("Rendering...");
console.groupEnd();

// Collapsible group
console.groupCollapsed("Details");
console.log("Step 1");
console.log("Step 2");
console.groupEnd();

// 3. console.time() — Đo thời gian
console.time("Array operations");
const arr = Array.from({ length: 1000000 }, (_, i) => i);
const filtered = arr.filter(n => n % 2 === 0);
console.timeEnd("Array operations");  // ~150ms

// 4. console.count() — Đếm số lần gọi
function processRequest(req) {
    console.count("processRequest called");
    // ...
}
processRequest({});  // processRequest called: 1
processRequest({});  // processRequest called: 2
processRequest({});  // processRequest called: 3

// 5. console.assert() — Log nếu điều kiện SAI
function divide(a, b) {
    console.assert(b !== 0, "Division by zero!");
    return a / b;
}
divide(10, 0);  // Assertion failed: Division by zero!

// 6. console.dir() — Hiển thị object properties
const el = document.querySelector("#app");
console.log(el);    // <div id="app">...</div>
console.dir(el);    // div#app {classList: DOMTokenMap, ...}

// 7. Styled console
console.log(
    "%c Success! %c Data loaded",
    "background: green; color: white; padding: 2px 6px; border-radius: 3px",
    "color: green"
);
```

---

### Breakpoints trong DevTools

```javascript
// 1. Manual breakpoint
//    Mở Sources → click vào dòng số → breakpoint icon xuất hiện
//    Code sẽ DỪNG tại dòng đó khi thực thi

// 2. debugger statement — breakpoint từ code
function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        total += item.price * item.qty;
        debugger;  // Dừng ở đây khi DevTools mở
    }
    return total;
}

// 3. Conditional breakpoint
//    Right-click breakpoint → Edit breakpoint
//    Condition: item.price > 1000000
//    → Chỉ dừng khi price > 1 triệu

// 4. Logpoint — log mà không dừng
//    Right-click dòng số → Add logpoint
//    Logpoint: `Processing item: ${item.name}`
//    → Hiển thị log trong Console mà không dừng code
```

---

### Khi code dừng tại breakpoint:

```
┌─────────────────────────────────────────────────┐
│ Sources Panel                                   │
│                                                 │
│  15│ function processOrder(order) {             │
│  16│     const items = order.items;             │
│ ▶17│     const total = items.reduce(...);       │  ← Dừng ở đây
│  18│     return { total, tax: total * 0.1 };    │
│  19│ }                                          │
│                                                 │
│ Scope:                                          │
│   Local:                                        │
│     order: {items: Array(3), customer: "Minh"}  │
│     items: [{name: "iPhone", price: 25000000}]  │
│   Global: Window                                │
│                                                 │
│ Call Stack:                                     │
│   processOrder  ←  handleCheckout  ←  onClick  │
│                                                 │
│ Controls: ▶ Continue | ⏭ Step Over | ⬇ Step In │
└─────────────────────────────────────────────────┘
```

---

### Debugging Workflow

```javascript
// 1. Reproduce — Tạo lại bug một cách nhất quán
//    "Bug chỉ xảy ra khi user nhập email có dấu"
//    → Tìm input cụ thể gây lỗi

// 2. Inspect — Xem trạng thái tại thời điểm lỗi
console.log("Before:", data);
console.log("Type:", typeof data);
console.log("Keys:", Object.keys(data));

// 3. Hypothesize — Đoán nguyên nhân
//    "data là undefined" → API trả về lỗi?
//    "data.items rỗng" → Filter quá strict?

// 4. Fix — Sửa code
//    Thêm null check: if (!data?.items) return [];

// 5. Verify — Kiểm tra fix
//    - Bug cũ hết chưa?
//    - Fix có gây bug mới không?
//    - Có test case cho bug này không?
```

---

### Common Debugging Patterns

```javascript
// Pattern 1: Kiểm tra function có được gọi không
function handleSubmit(event) {
    console.log("handleSubmit called", event);
    // ...
}

// Pattern 2: Kiểm tra giá trị tại thời điểm cụ thể
async function fetchUser(id) {
    console.log("Fetching user:", id);
    const response = await fetch(`/api/users/${id}`);
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("User data:", data);
    return data;
}

// Pattern 3: Kiểm tra loop
for (let i = 0; i < items.length; i++) {
    console.log(`Item ${i}:`, items[i]);
    // ...
}

// Pattern 4: Kiểm tra event listener
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("Button clicked", e.target);
    console.log("Event type:", e.type);
    console.log("Timestamp:", e.timeStamp);
});

// Pattern 5: Performance profiling
console.time("render");
renderLargeList(data);
console.timeEnd("render");
```

---

### Network Tab — Kiểm tra API

```
┌─────────────────────────────────────────────────┐
│ Network Tab                                     │
│                                                 │
│ Name          Status  Type    Size    Time      │
│ ──────────────────────────────────────────────── │
│ users         200     json    2.1KB   120ms     │
│ products      200     json    15KB    340ms     │
│ auth/login    401     json    0.2KB   80ms      │ ← LỖI!
│ upload        500     json    0.1KB   2.1s      │ ← LỖI!
│                                                 │
│ Click vào request → xem chi tiết:               │
│ - Headers: URL, method, headers                 │
│ - Payload: request body                         │
│ - Response: response body                       │
│ - Timing: thời gian từng phase                  │
└─────────────────────────────────────────────────┘
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Dùng console.table() hiển thị mảng sản phẩm
// 2. Dùng console.group() nhóm 3 log liên quan
// 3. Dùng console.time() đo thời gian sort 1000 phần tử
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Dùng breakpoint tìm bug trong code sau:
function getAverage(scores) {
    let sum = 0;
    for (let i = 0; i <= scores.length; i++) {  // Bug ở đâu?
        sum += scores[i];
    }
    return sum / scores.length;
}

// 2. Dùng console.assert() kiểm tra input validation
// 3. Dùng conditional breakpoint dừng khi score < 50
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Tạo debug utility:
const debug = {
    log: (...args) => console.log("%c[DEBUG]", "color: orange", ...args),
    warn: (...args) => console.warn("[WARN]", ...args),
    error: (...args) => console.error("[ERROR]", ...args),
    table: (data) => console.table(data),
    group: (label, fn) => { console.group(label); fn(); console.groupEnd(); }
};

// 2. Tạo function profile(fn, name) — đo thời gian thực thi
// 3. Tạo function trace(fn) — log mỗi lần function được gọi với args
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 13 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/13_Day_Console_object_methods/13_day_console_object_methods.md)*
