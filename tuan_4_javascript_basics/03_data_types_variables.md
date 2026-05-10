# 🟨 TUẦN 4 - BÀI 03
# **DATA TYPES & VARIABLES — Type Coercion & Truthy/Falsy**

---

## 0. 🎬 Opening Hook

*Minh viết form validation: kiểm tra tuổi người dùng nhập vào.*

```javascript
const age = document.querySelector("#age").value;  // User nhập "21"
if (age > 18) {
    console.log("Đủ tuổi!");
}
```

*Chạy thử: nhập "21" → "Đủ tuổi!" ✅*

*Nhập "9abc" → Cũng ra "Đủ tuổi!" 😱*

*"`9abc` mà vẫn lớn hơn 18?" Minh bối rối.*

*"Vì `age` là string," anh Hùng giải thích. "Khi so sánh string với number, JavaScript tự chuyển. `"9abc"` chuyển thành `NaN`. Và `NaN > 18` = `false`... Chờ đã, nhưng sao vẫn ra 'Đủ tuổi'?"*

*Minh nhìn lại: `if (age > 18)` với `age = "21"` (string) → `"21" > 18` → JS convert `"21"` thành `21` → `21 > 18` = `true`... Nhưng với `"9abc"` → NaN → `NaN > 18` = `false`... Không phải 'Đủ tuổi' mà!*

*Kiểm tra lại: `"9abc" > 18` → `false`. Nhưng `"9abc" >= 0` → `false`. Vậy else branch mới chạy... Hóa ra bug ở chỗ khác.*

*Bài học: Luôn validate kiểu dữ liệu TRƯỚC khi so sánh.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Type coercion và Truthy/Falsy là hai nguồn gốc của vô số bugs JavaScript mà:
- Senior cũng có thể mắc phải
- Rất khó debug vì JS không báo lỗi — nó âm thầm "sửa" code của bạn

Hiểu hai khái niệm này = giảm 80% bugs kỳ lạ trong code.

---

## 2. 🌐 Big Picture — Tại sao JavaScript tự chuyển kiểu?

```
JavaScript = "Dynamically typed" + "Weakly typed"

Dynamically typed = không cần khai báo kiểu trước
let x = 5;       // x là Number
x = "hello";     // x là String — JavaScript OK với điều này

Weakly typed = tự chuyển kiểu khi cần
"5" + 3          // JS: "số không cộng được với string → convert 3 → "3" → "53""
"5" - 3          // JS: "trừ không áp dụng cho string → convert "5" → 5 → 2"
```

**So sánh với Python (strongly typed):**
```python
# Python
"5" + 3  → TypeError: can only concatenate str (not "int") to str
# Python không tự chuyển, báo lỗi ngay

# JavaScript  
"5" + 3  → "53"  (tự chuyển, không báo lỗi, trả kết quả sai)
```

---

## 3. ⚙️ Core Technical Truth

### Type Coercion — Các tình huống nguy hiểm

```javascript
// CỘNG (+) — ưu tiên string nếu có 1 toán hạng là string
"5" + 3          // "53"   ← Concatenation, không phải cộng số!
5 + "3"          // "53"   ← Giống nhau
"5" + true       // "5true" ← boolean → string
1 + 2 + "3"      // "33"   ← 1+2=3, rồi "3"+"3"="33"
"1" + 2 + 3      // "123"  ← "1"+2="12", rồi "12"+3="123"

// TRỪ/NHÂN/CHIA/% — chỉ áp dụng cho number → convert sang number
"5" - 3          // 2      ← "5" → 5, rồi 5-3=2
"5" * "2"        // 10     ← Cả hai → number
"abc" - 1        // NaN    ← "abc" không convert được → NaN
true + 1         // 2      ← true = 1
false + 1        // 1      ← false = 0
null + 5         // 5      ← null = 0
undefined + 5    // NaN    ← undefined = NaN

// ✅ CÁCH AN TOÀN — Chuyển kiểu tường minh TRƯỚC khi tính
const input = document.querySelector("#age").value;  // String "21"
const age = Number(input);   // Convert sang Number: 21
if (isNaN(age)) {
    alert("Vui lòng nhập số!");
    return;
}
if (age > 18) { ... }  // An toàn
```

**Bảng chuyển kiểu tường minh:**

```javascript
// → Number
Number("42")        // 42
Number("42abc")     // NaN (không convert được)
Number("")          // 0
Number(true)        // 1
Number(false)       // 0
Number(null)        // 0
Number(undefined)   // NaN
parseInt("42.5px")  // 42  (dừng khi gặp ký tự không phải số)
parseFloat("3.14kg")// 3.14

// → String
String(42)          // "42"
String(true)        // "true"
String(null)        // "null"
(42).toString()     // "42"
(255).toString(16)  // "ff" (hex)

// → Boolean
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean("hello")    // true
Boolean(42)         // true
Boolean([])         // true (mảng rỗng là truthy!)
Boolean({})         // true (object rỗng là truthy!)
```

---

### Truthy & Falsy — Sáu giá trị "giả" trong JavaScript

```javascript
// 6 giá trị FALSY (bị coi là false trong điều kiện):
false
0           // zero
0n          // BigInt zero
""          // empty string
null
undefined
NaN

// TẤT CẢ còn lại = TRUTHY:
true
1, -1, 42, 3.14     // Số khác 0
"hello", "0", "false"  // String khác rỗng (kể cả "false"!)
[]               // Mảng RỖng — TRUTHY! 😱
{}               // Object RỖNG — TRUTHY! 😱
function() {}    // Function — TRUTHY
```

**Ứng dụng Truthy/Falsy:**
```javascript
// Guard clause — kiểm tra truthy trước khi dùng
const user = fetchUser();
if (!user) {
    return "Chưa đăng nhập";
}
console.log(user.name);  // An toàn, user không null/undefined

// Default value với ||
const name = user?.name || "Khách";
const count = data?.length || 0;
const theme = localStorage.getItem("theme") || "light";

// Nullish coalescing ?? (chỉ check null/undefined, không check falsy)
const count = data?.length ?? 0;  // 0 là valid → không fallback về 0
// Khác || : nếu data.length = 0, || thay bằng 0 (sai!), ?? giữ 0 (đúng!)

// Optional chaining ?.
const city = user?.address?.city;  // Không lỗi nếu address là null
```

---

### `typeof` — Kiểm tra kiểu

```javascript
typeof "hello"       // "string"
typeof 42            // "number"
typeof 3.14          // "number" (cùng type với integer!)
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object" ← ⚠️ Bug lịch sử 30 năm — null KHÔNG phải object!
typeof []            // "object" ← Array cũng là object trong JS!
typeof {}            // "object"
typeof function(){}  // "function"

// Cách check đúng:
Array.isArray([])                    // true ← check array
x === null                           // true ← check null
x === undefined                      // true ← check undefined
typeof x === "string"                // check string

// isNaN — check Not a Number
isNaN("abc")         // true
isNaN(42)            // false
isNaN("42")          // false (convert "42" → 42 trước!)
Number.isNaN("abc")  // false ← Chính xác hơn: không convert, check NaN thuần
Number.isNaN(NaN)    // true
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Convert tường minh trước khi tính: `Number(input)`, `String(value)`, `Boolean(check)`**
> **6 Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Tất cả còn lại là Truthy — kể cả `[]` và `{}`**

---

## 5. 🏭 Real-world Layer

### Form validation chuẩn — tránh type coercion bugs

```javascript
// ❌ Dễ bị bug type coercion
function validateAge(input) {
    if (input > 0 && input < 150) {  // input là string → có thể sai!
        return true;
    }
}

// ✅ Validate kiểu tường minh
function validateAge(input) {
    const age = Number(input);

    if (isNaN(age) || !Number.isInteger(age)) {
        return { valid: false, error: "Tuổi phải là số nguyên" };
    }
    if (age < 1 || age > 150) {
        return { valid: false, error: "Tuổi phải từ 1 đến 150" };
    }
    return { valid: true, value: age };
}

const result = validateAge("21");
if (result.valid) {
    console.log(`Tuổi hợp lệ: ${result.value}`);
}
```

### Optional chaining trong thực tế (React/Vue)

```javascript
// API response có thể thiếu data
const response = await fetch("/api/user/123");
const data = await response.json();

// ❌ Nguy hiểm — lỗi nếu data.user null
console.log(data.user.profile.avatar);

// ✅ An toàn với optional chaining
const avatar = data?.user?.profile?.avatar ?? "/default-avatar.png";
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Type Detective (15 phút)

Dán vào Console và đoán kết quả TRƯỚC khi chạy:

```javascript
// Đoán kết quả (ghi ra giấy trước khi chạy!)
console.log(1 + "2" + 3);         // ?
console.log(1 + 2 + "3");         // ?
console.log("3" - 1);             // ?
console.log(true + true);         // ?
console.log(false + null + 1);    // ?

// Truthy/Falsy — if nào chạy?
if ([]) console.log("Array rỗng = truthy!");
if ({}) console.log("Object rỗng = truthy!");
if ("0") console.log("String '0' = truthy!");
if (0) console.log("Số 0 = truthy!") 
else console.log("Số 0 = falsy!");

// Nullable check
const user = { name: "Minh", address: null };
console.log(user?.address?.city ?? "Không có địa chỉ");
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Mảng rỗng `[]` là falsy"** | `[]` là **truthy**. Chỉ có 6 giá trị falsy. Kiểm tra mảng rỗng đúng: `array.length === 0` |
| **"`NaN === NaN` là true"** | `NaN` là giá trị DUY NHẤT trong JS không bằng chính nó. `NaN === NaN` → `false`. Dùng `Number.isNaN()` |
| **"Nullish coalescing `??` giống `||`"** | `||` fallback khi falsy (kể cả `0`, `""`, `false`). `??` fallback chỉ khi `null` hoặc `undefined`. Quan trọng khi `0` là valid value |
| **"`typeof null === 'null'`"** | `typeof null === 'object'` — bug từ năm 1995, không bao giờ sửa để tránh breaking changes. Check null bằng `x === null` |
| **"Optional chaining `?.` xóa lỗi"** | `?.` chỉ trả về `undefined` nếu chuỗi null/undefined — không xử lý lỗi logic. Vẫn cần kiểm tra kết quả |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao `"5" + 3 = "53"` nhưng `"5" - 3 = 2`? Nguyên tắc nào quyết định?
2. Liệt kê 6 giá trị falsy trong JavaScript. `[]` và `{}` có trong danh sách không?
3. `||` và `??` khác nhau thế nào? Cho ví dụ khi chúng cho kết quả khác nhau.

### Câu hỏi áp dụng:

4. Hàm sau có bug không? Tìm và sửa:
   ```javascript
   function getDiscount(code) {
       const codes = { "SUMMER": 20, "WINTER": 15, "NONE": 0 };
       return codes[code] || 0;
   }
   console.log(getDiscount("NONE"));  // Kết quả mong đợi: 0
   ```
5. User nhập số điện thoại `"0912345678"`. Bạn muốn kiểm tra độ dài = 10 ký tự. Dùng `typeof`, `length`, và so sánh đúng cách — viết đoạn code validate đó.

<details>
<summary>👁️ Xem đáp án</summary>

1. Toán tử `+` có hai nghĩa: **cộng số** và **nối string**. Khi có 1 toán hạng là string, `+` ưu tiên string concatenation → convert number thành string → nối. Toán tử `-`, `*`, `/`, `%` chỉ có nghĩa với number → convert string thành number.
2. 6 falsy: `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`. **`[]` và `{}` KHÔNG có** trong danh sách — đây là truthy, dù rỗng.
3. `||` fallback khi left side là **falsy** (bao gồm `0`, `""`, `false`). `??` fallback chỉ khi left side là **null hoặc undefined**. Ví dụ: `let count = 0; count || 5` = **5** (bug: 0 là valid); `count ?? 5` = **0** (đúng).
4. **Có bug** — `codes["NONE"] = 0`, và `0 || 0` = `0` (đúng). Nhưng nếu code không tồn tại: `codes["INVALID"] = undefined`, và `undefined || 0` = `0`. Thực ra hàm này không có bug trong ví dụ `"NONE"`, nhưng nên dùng `??` để rõ intent: `return codes[code] ?? 0`.
5. ```javascript
   const phone = document.querySelector("#phone").value;
   if (typeof phone !== "string" || phone.length !== 10) {
       alert("Số điện thoại phải có đúng 10 chữ số");
       return;
   }
   if (!/^\d{10}$/.test(phone)) {  // Chỉ chứa chữ số
       alert("Số điện thoại chỉ gồm chữ số");
   }
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Type coercion**: `+` với string → nối chuỗi. `-`, `*`, `/` → convert sang number
2. **Luôn convert tường minh**: `Number()`, `String()`, `Boolean()` trước khi xử lý input
3. **6 Falsy values**: `false`, `0`, `""`, `null`, `undefined`, `NaN` — mảng `[]` và object `{}` rỗng là Truthy
4. **`typeof null === "object"`** — bug lịch sử. Check null bằng `x === null`
5. **`??` vs `||`**: `??` chỉ cho `null`/`undefined`, `||` cho mọi falsy — quan trọng khi `0` là giá trị hợp lệ

---

## 9b. 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `typeof null === "object"` | Bug lịch sử của JavaScript (từ năm 1995) | Dùng `value === null` để check null |
| `0 == ""` trả về `true` | `==` coerce types trước khi so sánh | Luôn dùng `===` (strict equality) |
| `[] == false` trả về `true` | Array rỗng coerce thành empty string → coerce thành 0 → false | Dùng `===` và convert tường minh |
| `Number(undefined)` = `NaN` | `undefined` không convert được thành number | Check trước: `if (value !== undefined) Number(value)` |
| `"" + 0` = `"0"` (string) | Empty string + number = string concatenation | Dùng `Number(value)` trước khi tính toán |
| `Boolean("false")` = `true` | Mọi string (kể cả "false") đều truthy | Kiểm tra chuỗi rỗng: `value === "false"` hoặc `value !== ""` |

---

## 10. ➡️ Next Lesson Bridge

*"Hiểu kiểu dữ liệu rồi," Minh nói. "Giờ mình cần logic cho app: nếu todo done → gạch ngang. Lặp qua danh sách → render. Điểm >= 90 → xuất sắc. Cần if/else, for loop."*

**→ [Bài 04: Control Structures](./04_control_structures.md) — if/else, switch, for, while, và bộ 3 Array methods `map`, `filter`, `reduce` dùng hàng ngày.**
