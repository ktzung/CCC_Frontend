# 🟨 PART II - CHƯƠNG 03
# **DATA TYPES & VARIABLES — CHI TIẾT**

## 🎬 "Bug Vì Cộng String Với Number"

*Minh viết: `"5" + 3`. Mong đợi kết quả `8`. Thực tế: `"53"`.*

*"JavaScript tự chuyển 3 thành string rồi NỐI chuỗi!" Minh phát hiện.*

> **Anh Hùng:** *"Đó là 'type coercion' — JavaScript tự ý chuyển type. Đây là nguồn gốc của vô số bug. Luôn kiểm tra type TRƯỚC khi tính toán."*

---

## 🎯 Mục tiêu
- Hiểu sâu về type coercion và cách phòng tránh
- Truthy/Falsy values
- Type checking và converting

---

## ⚠️ Type Coercion — "Tự ý chuyển kiểu"

```javascript
// JavaScript tự chuyển type — đôi khi BẤT NGỜ
"5" + 3          // "53" (string concatenation!)
"5" - 3          // 2 (number subtraction!)
"5" * "2"        // 10 (number multiplication!)
true + 1         // 2 (true = 1!)
null + 5         // 5 (null = 0!)

// ✅ Cách an toàn: Convert tường minh
Number("5") + 3       // 8 ✅
parseInt("5") + 3     // 8 ✅
String(42)            // "42"
Boolean(0)            // false
Boolean("hello")      // true
```

---

## 🔍 Truthy & Falsy — "Đúng và Sai ẩn"

```javascript
// 6 giá trị FALSY (coi như false):
false, 0, "", null, undefined, NaN

// TẤT CẢ còn lại = TRUTHY (coi như true):
true, 42, "hello", [], {}, -1, "0", "false"   // ⚠️ "0" là truthy!

// Ứng dụng:
const user = null;
if (user) {
    console.log("Đã đăng nhập");
} else {
    console.log("Chưa đăng nhập");  // ← Chạy dòng này!
}

// Short-circuit (hay dùng trong React):
const name = user?.name || "Khách";     // user null → name = "Khách"
const items = data?.items ?? [];        // Nullish coalescing
```

---

## 🧮 Type Checking

```javascript
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" ← ⚠️ Bug lịch sử, KHÔNG phải object!
typeof []           // "object" ← ⚠️ Array cũng là object!
Array.isArray([])   // true ← Cách đúng check array
```

---

## ➡️ Chương tiếp theo...

*Minh đã hiểu data types. Giờ cần logic: "if todo completed → strike through. Loop qua danh sách → render HTML."*

**Chương tiếp theo:** Control Structures — if/else, switch, for, while, for...of.
