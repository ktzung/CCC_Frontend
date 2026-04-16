# 🟨 PART II - CHƯƠNG 02
# **GETTING STARTED — Variables & Operators**

## 🎬 "var, let, const — Ba Anh Em Nhưng Tính Cách Khác"

*Minh khai báo biến đầu tiên: `var name = "Minh"`. Chạy tốt.*

*Anh Hùng nhìn: "Đừng dùng `var`. Dùng `let` hoặc `const`. `var` là di sản từ 1995 — có nhiều bẫy."*

*"Khác nhau sao ạ?"*

*"var giống open-office: ai cũng vào được, không kiểm soát. let giống phòng riêng: chỉ ai vào đúng tầng mới thấy. const giống két sắt: một khi bỏ vào, không thay đổi."*

---

## 🎯 Mục tiêu
- Khai báo biến: `let`, `const`, (tránh `var`)
- Hiểu các kiểu dữ liệu: String, Number, Boolean, Array, Object
- Toán tử cơ bản và Template Literals

---

## 📦 Variables — "Hộp chứa dữ liệu"

```javascript
// ✅ const — "Két sắt" (không đổi giá trị)
const APP_NAME = "Todo App";      // Không bao giờ thay đổi
const API_URL = "https://api.example.com";

// ✅ let — "Phòng riêng" (có thể đổi giá trị)
let score = 0;                    // Sẽ thay đổi khi user chơi
score = 100;                      // ✅ OK
let todoCount = 5;
todoCount++;                      // ✅ OK, thành 6

// ❌ var — "Open office" (TRÁNH!)
var x = 10;                       // Hoisting, function-scope → bẫy!
```

### Quy tắc vàng:
> **Mặc định dùng `const`. Chỉ dùng `let` khi CẦN thay đổi giá trị. KHÔNG BAO GIỜ dùng `var`.**

---

## 📊 Data Types — 7 kiểu cơ bản

```javascript
// String — Chuỗi ký tự
const name = "Nguyễn Văn Minh";
const greeting = `Xin chào ${name}!`;   // Template literal ⭐

// Number — Số (integer + float)
const age = 21;
const price = 25990000;
const pi = 3.14159;

// Boolean — Đúng/Sai
const isLoggedIn = true;
const isAdmin = false;

// Null & Undefined
let user = null;                // Chủ ý: "chưa có giá trị"
let address;                    // Undefined: "quên gán giá trị"

// Array — Danh sách
const todos = ["Học HTML", "Học CSS", "Học JS"];

// Object — Đối tượng
const student = {
    name: "Minh",
    age: 21,
    major: "CNTT",
    isActive: true
};
```

---

## ➕ Operators — Toán tử

### So sánh (⚠️ Cẩn thận!):

```javascript
// ❌ == (loose equality) — TỰ CHUYỂN TYPE → bẫy!
5 == "5"          // true 😱 (string "5" chuyển thành number 5)
0 == false        // true 😱

// ✅ === (strict equality) — LUÔN DÙNG CÁI NÀY
5 === "5"         // false ✅ (khác type = false)
0 === false       // false ✅
```

> **Quy tắc:** LUÔN dùng `===` và `!==`. KHÔNG dùng `==` và `!=`. Đây là lỗi code review phổ biến nhất.

### Template Literals — "String nâng cao":

```javascript
const name = "Minh";
const score = 95;

// ❌ Cách cũ (nối string)
console.log("Xin chào " + name + ", điểm: " + score);

// ✅ Template Literal (backtick `)
console.log(`Xin chào ${name}, điểm: ${score}`);
console.log(`Tổng: ${price.toLocaleString()}đ`);
```

---

## ➡️ Chương tiếp theo...

*Minh đã biết lưu dữ liệu. Nhưng khi cần xử lý: "Nếu score > 90 thì loại Giỏi, nếu < 50 thì loại Yếu" — Anh cần cấu trúc điều kiện.*

**Chương tiếp theo:** Data Types & Variables deep dive, rồi Control Structures — if/else, loops, switch.
