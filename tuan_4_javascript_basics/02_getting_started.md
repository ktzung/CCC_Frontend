# 🟨 TUẦN 4 - BÀI 02
# **VARIABLES & OPERATORS**

---

## 0. 🎬 Opening Hook

*Minh khai báo biến đầu tiên: `var name = "Minh"`.*

*Chạy tốt. Anh tiếp tục viết. 200 dòng sau, bug kỳ lạ xuất hiện: biến `name` trong một function bỗng dưng thay đổi giá trị, dù Minh không hề chạm vào.*

*Anh Hùng nhìn code: "Vì em dùng `var`. `var` là biến 'phòng chung' — bất kỳ ai cũng có thể vào sửa. Dùng `let` hoặc `const` — biến 'phòng riêng' có khóa."*

*"Khác nhau thế nào?"*

*"Phần đầu tiên của JavaScript mà bạn học sẽ quyết định phần lớn bugs bạn gặp sau này."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Biến và kiểu dữ liệu = nền tảng. Không có bài nào trong lập trình mà không dùng đến.

Nhưng JavaScript có những "bẫy" không trực quan:
- `"5" + 3 = "53"` (không phải 8!)
- `0 == false` = `true` (bẫy toán tử)
- `typeof null = "object"` (bug lịch sử 30 năm)

Hiểu những bẫy này = không mắc phải chúng.

---

## 2. 🌐 Big Picture — Variables và Memory

```
RAM (bộ nhớ)
┌──────────────────────────────────────────┐
│  const APP_NAME = "Todo App"  (cố định) │  ← không thay đổi
│  let score = 0               (có thể đổi)│  ← thay đổi được
│  let todos = []              (có thể đổi)│
│                                          │
│  [VÙNG CẤM — var KHÔNG ĐI VÀO]         │
│  var x = 10   (rủi ro — ai cũng thấy)  │  ← tránh dùng
└──────────────────────────────────────────┘
```

---

## 3. ⚙️ Core Technical Truth

### `var` / `let` / `const` — Ba tính cách khác nhau

```javascript
// ✅ const — Giá trị không thay đổi (mặc định nên dùng)
const APP_NAME = "Todo App";
const API_URL = "https://api.example.com";
const PI = 3.14159;

// APP_NAME = "Khác";  // ❌ TypeError: Assignment to constant variable

// ✅ let — Giá trị có thể thay đổi
let score = 0;
score = 100;      // ✅ OK
score++;          // ✅ OK, thành 101

let todoCount = 5;
todoCount += 3;   // ✅ OK, thành 8

// ❌ var — TRÁNH DÙNG (legacy từ 1995)
var x = 10;   // Có hoisting và function-scope → nhiều bẫy
```

**Bảng so sánh chi tiết:**

| | `const` | `let` | `var` |
|---|---|---|---|
| Thay đổi được? | ❌ Không | ✅ Có | ✅ Có |
| Scope | Block `{}` | Block `{}` | Function (rủi ro) |
| Hoisting | Không dùng được trước khai báo | Không dùng được trước khai báo | `undefined` (bẫy!) |
| Khai báo lại? | ❌ Lỗi | ❌ Lỗi | ✅ Âm thầm cho qua (bẫy!) |
| Dùng khi? | Hằng số, objects, arrays | Cần thay đổi | **Không bao giờ** |

> **Quy tắc vàng: Mặc định dùng `const`. Chỉ đổi sang `let` khi CẦN reassign. Không bao giờ dùng `var`.**

---

### 7 Kiểu dữ liệu cơ bản

```javascript
// 1. STRING — Chuỗi ký tự
const name = "Nguyễn Văn Minh";       // Double quotes
const city = 'Hà Nội';                 // Single quotes
const template = `Xin chào ${name}!`; // Template literal (backtick) ⭐

// 2. NUMBER — Số (integer và float dùng chung)
const age = 21;
const price = 25990000;
const pi = 3.14159;
const big = 1e6;        // 1.000.000 (scientific notation)

// 3. BOOLEAN
const isLoggedIn = true;
const isAdmin = false;

// 4. NULL — Chủ ý "không có giá trị"
let user = null;              // Chủ động set = chưa có user

// 5. UNDEFINED — Quên gán giá trị
let address;                  // Khai báo nhưng không gán
console.log(address);         // → undefined

// 6. ARRAY — Danh sách có thứ tự
const todos = ["Học HTML", "Học CSS", "Học JS"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["Minh", 21, true, null];  // Mix được, nhưng không nên

// 7. OBJECT — Bản ghi có tên trường
const student = {
    name: "Minh",
    age: 21,
    major: "CNTT",
    isActive: true,
    skills: ["HTML", "CSS", "JS"]     // Object chứa Array
};
```

---

### Operators — Toán tử

**Toán tử số học:**
```javascript
10 + 3   // 13 (cộng)
10 - 3   // 7  (trừ)
10 * 3   // 30 (nhân)
10 / 3   // 3.333... (chia)
10 % 3   // 1  (chia lấy dư — rất hay dùng: check chẵn/lẻ)
10 ** 2  // 100 (lũy thừa — ES2016)

let x = 5;
x++;     // x = 6 (tăng 1)
x--;     // x = 5 (giảm 1)
x += 10; // x = 15 (cộng và gán)
x *= 2;  // x = 30 (nhân và gán)
```

**So sánh — CẨN THẬN với `==` vs `===`:**
```javascript
// ❌ == (loose equality) — TỰ CHUYỂN TYPE → bẫy!
5 == "5"        // true 😱 (string "5" chuyển thành number)
0 == false      // true 😱 (false chuyển thành 0)
"" == false     // true 😱
null == undefined // true 😱

// ✅ === (strict equality) — Kiểm tra CẢ GIÁ TRỊ VÀ KIỂU — LUÔN DÙNG CÁI NÀY
5 === "5"       // false ✅ (khác type)
0 === false     // false ✅ (khác type)
5 === 5         // true ✅
"hello" === "hello"  // true ✅
```

**Logical operators:**
```javascript
// AND (&&) — cả hai đều true
true && true    // true
true && false   // false

// OR (||) — ít nhất một true
true || false   // true
false || false  // false

// NOT (!) — đảo ngược
!true           // false
!false          // true
!0              // true (0 là falsy)
!"hello"        // false (non-empty string là truthy)

// Short-circuit (quan trọng trong React)
const name = user?.name || "Khách";   // Nếu user null → "Khách"
const count = data?.items ?? 0;       // Nullish coalescing: null/undefined → 0
```

---

### Template Literals — String nâng cao

```javascript
const name = "Minh";
const score = 95;
const isPass = score >= 50;

// ❌ Cách cũ (dùng + nối string)
console.log("Chào " + name + "! Điểm của bạn: " + score + ". " + (isPass ? "Đạt" : "Không đạt") + ".");

// ✅ Template literal (backtick ` )
console.log(`Chào ${name}! Điểm của bạn: ${score}. ${isPass ? "Đạt" : "Không đạt"}.`);

// Multi-line string — không cần \n
const message = `
    Kính gửi ${name},
    Điểm của bạn là: ${score}/100
    Xếp loại: ${score >= 90 ? "Xuất sắc" : "Khá"}
`;

// Expression trong template (tính toán được)
console.log(`Giá: ${(price * 1.1).toLocaleString("vi-VN")}đ`);
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`const` là mặc định. `let` khi cần thay đổi. `var` không bao giờ.**
> **`===` không bao giờ `==` — luôn kiểm tra cả type và value.**

---

## 5. 🏭 Real-world Layer

### Naming conventions thực tế

```javascript
// camelCase — cho variables, functions (JavaScript chuẩn)
const userName = "Minh";
const totalPrice = 99000;
const isLoggedIn = false;
function calculateTotal() {}

// SCREAMING_SNAKE_CASE — cho constants toàn cục
const MAX_RETRY = 3;
const API_BASE_URL = "https://api.shopee.vn";
const DEFAULT_TIMEOUT = 5000;

// PascalCase — cho Classes (sau này học OOP)
class UserProfile {}
class ShoppingCart {}

// Tên biến tốt vs xấu
const x = 25990000;         // ❌ Không hiểu x là gì
const productPrice = 25990000;  // ✅ Rõ ràng

const flag = true;           // ❌ Flag = gì?
const isProductAvailable = true; // ✅ Rõ ràng
```

### Khi nào `const` không có nghĩa là "bất biến hoàn toàn"

```javascript
// const với primitive → không thay đổi được giá trị
const name = "Minh";
// name = "Khác";  // ❌ Lỗi

// const với object/array → KHÔNG thay đổi được reference
// NHƯNG có thể thay đổi nội dung bên trong!
const student = { name: "Minh", score: 85 };
student.score = 95;           // ✅ OK — thay đổi property, không đổi reference
student.email = "minh@tlu.edu.vn";  // ✅ OK

const todos = ["Học HTML", "Học CSS"];
todos.push("Học JS");          // ✅ OK — thêm phần tử
// todos = [];                  // ❌ Lỗi — đổi reference
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Todo App State (15 phút)

Tạo file `state.js` và chạy trong Console:

```javascript
// 1. Khai báo state của Todo App
const APP_NAME = "My Todo App";
const VERSION = "1.0.0";

let currentUser = {
    name: "Minh",
    email: "minh@tlu.edu.vn",
    isLoggedIn: false
};

let todos = [
    { id: 1, text: "Học HTML", completed: true, priority: "low" },
    { id: 2, text: "Học CSS", completed: true, priority: "low" },
    { id: 3, text: "Học JavaScript", completed: false, priority: "high" },
    { id: 4, text: "Làm BTL", completed: false, priority: "high" }
];

// 2. Đăng nhập
currentUser.isLoggedIn = true;
console.log(`Đã đăng nhập: ${currentUser.name}`);

// 3. Hiển thị thống kê
const completed = todos.filter(t => t.completed).length;
console.log(`Progress: ${completed}/${todos.length} hoàn thành`);

// 4. Template literal thông báo
const message = `
Xin chào ${currentUser.name}!
App: ${APP_NAME} v${VERSION}
Còn ${todos.length - completed} việc cần làm.
`;
console.log(message);
```

**Câu hỏi thực nghiệm:**
- Thử `todos = []` — có lỗi không?
- Thử `todos.push({ id: 5, text: "Deploy website", completed: false })` — có lỗi không?
- Giải thích tại sao có/không có lỗi trong mỗi trường hợp

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`const` = giá trị không bao giờ thay đổi"** | `const` ngăn **reassign** (đổi reference). Object/Array trong `const` vẫn có thể thay đổi nội dung bên trong |
| **"`==` và `===` gần như giống nhau"** | Khác nhau hoàn toàn. `"1" == 1` là `true`; `"1" === 1` là `false`. Dùng `==` → bugs khó phát hiện |
| **"Số nguyên và số thực là hai kiểu khác nhau trong JS"** | Không — JS chỉ có 1 kiểu số: `Number` (64-bit floating point). `5` và `5.0` đều là `Number` |
| **"Tên biến có thể chứa khoảng trắng"** | Không bao giờ. Dùng camelCase: `userName`, không phải `user name` |
| **"`null` và `undefined` giống nhau"** | Khác: `null` = **chủ ý** không có giá trị. `undefined` = **vô tình** chưa gán. `typeof null` = `"object"` (bug lịch sử, không thay đổi được) |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Khi nào dùng `const`, khi nào dùng `let`? Tại sao không bao giờ dùng `var`?
2. Kết quả của `"3" + 4` và `"3" - 4` là gì? Giải thích tại sao chúng khác nhau.
3. Template literal (backtick) khác gì với string thông thường?

### Câu hỏi áp dụng:

4. Code sau có lỗi không? Nếu có, sửa như thế nào?
   ```javascript
   const config = { theme: "dark", lang: "vi" };
   config.theme = "light";    // Dòng này có lỗi không?
   config = { theme: "light" }; // Dòng này có lỗi không?
   ```
5. Bạn cần lưu điểm game của người chơi (thay đổi mỗi khi ghi điểm), và lưu URL của server (không bao giờ thay đổi). Dùng `const` hay `let` cho mỗi trường hợp?

<details>
<summary>👁️ Xem đáp án</summary>

1. Dùng **`const`** khi biến không cần reassign (hằng số, objects, arrays — mặc định). Dùng **`let`** khi cần reassign (score, counter, toggle state). Tránh **`var`** vì: function-scope thay vì block-scope → leak ra ngoài block, hoisting gây `undefined` bất ngờ, cho phép khai báo lại âm thầm.
2. **`"3" + 4 = "34"`** — JS thấy string + number → ưu tiên string concatenation → convert 4 thành "4" → nối thành "34". **`"3" - 4 = -1`** — `-` không có nghĩa với string → JS convert "3" thành number 3 → 3 - 4 = -1. Toán tử `+` đặc biệt vì có nghĩa với cả string (nối) và number (cộng).
3. Template literal dùng **backtick** (`` ` ``). Ưu điểm: (1) Chèn biến với `${expression}`, (2) Multi-line string không cần `\n`, (3) Tính toán expression trực tiếp bên trong `${}`.
4. `config.theme = "light"` → **KHÔNG lỗi** — `const` cho phép thay đổi nội dung object. `config = { theme: "light" }` → **LỖI TypeError** — `const` không cho phép reassign (đổi reference).
5. **`const SERVER_URL = "..."` (URL)** — không bao giờ thay đổi. **`let score = 0` (điểm)** — thay đổi mỗi khi ghi điểm, cần reassign.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`const` mặc định, `let` khi cần thay đổi, `var` không bao giờ**
2. **7 kiểu dữ liệu**: string, number, boolean, null, undefined, array, object
3. **`===` luôn, `==` không bao giờ** — strict equality tránh type coercion bugs
4. **Template literals** (backtick) = cách viết string mạnh nhất, dùng thay nối string
5. **`const` object/array** = không đổi reference, nhưng CÓ đổi nội dung bên trong được

---

## 10. ➡️ Next Lesson Bridge

*"Biến OK rồi," Minh nói. "Nhưng mình thấy `"5" + 3 = "53"` mà không được `8`. Và `null + 5 = 5`? JavaScript đang làm gì với kiểu dữ liệu vậy?"*

*"Đó là Type Coercion — JavaScript tự ý chuyển kiểu. Và Truthy/Falsy — những giá trị giả vờ là `true`/`false`. Hai khái niệm này giải thích 80% bugs kỳ lạ trong JS."*

**→ [Bài 03: Data Types & Variables — Chi tiết](./03_data_types_variables.md) — Type coercion, Truthy/Falsy, `typeof`, và cách debug kiểu dữ liệu.**
