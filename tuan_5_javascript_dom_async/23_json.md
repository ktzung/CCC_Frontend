# 🟨 TUẦN 5 - BÀI 23
# **JSON — JavaScript Object Notation**

---

## 0. 🎬 Opening Hook

*Minh xây Todo App. Anh lưu danh sách todos vào biến — mỗi lần reload trang → mất hết.*

*"Em cần lưu dữ liệu ở đâu đó bền vững," anh Hùng nói. "Nhưng trước tiên, dữ liệu phải ở dạng TEXT — vì mọi thứ truyền qua mạng đều là text. Đó là JSON."*

```javascript
// JavaScript object
const todo = { id: 1, text: "Học JSON", done: false };

// Chuyển sang JSON string để lưu/truyền
const json = JSON.stringify(todo);
console.log(json);  // '{"id":1,"text":"Học JSON","done":false}'

// Parse ngược lại thành object
const parsed = JSON.parse(json);
console.log(parsed.text);  // "Học JSON"
```

*"JSON là ngôn ngữ chung giữa frontend và backend. Mọi API đều dùng JSON."* 🌐

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

JSON là **ngôn ngữ giao tiếp** của web:

- **API**: Server trả JSON, frontend parse và hiển thị
- **LocalStorage**: Chỉ lưu string → phải `JSON.stringify()` trước khi lưu
- **Config files**: `package.json`, `tsconfig.json` đều là JSON
- **Communication**: Mọi dữ liệu giữa client-server đều là JSON

> Không biết JSON = không thể làm web development.

---

## 2. 🌐 Big Picture — JSON trong kiến trúc Web

```
┌──────────┐    JSON request     ┌──────────┐
│          │ ──────────────────→ │          │
│ Frontend │                     │ Backend  │
│ (JS)     │ ←────────────────── │ (Node)   │
│          │    JSON response    │          │
└──────────┘                     └──────────┘

JavaScript Object                    JSON String
{                                    '{"name":"Minh",'
  name: "Minh",         ←→            "age":21,
  age: 21,                             "scores":[85,92]}
  scores: [85, 92]                   }'
}

JSON = Text format, nhẹ, dễ đọc, dễ parse
```

---

## 3. ⚙️ Core Technical Truth

### JSON là gì?

JSON (JavaScript Object Notation) là định dạng **text** để lưu trữ và truyền dữ liệu. Lấy từ cú pháp JavaScript object nhưng **nghiêm ngặt hơn**:

```javascript
// ✅ JSON hợp lệ
{"name": "Minh", "age": 21}
["apple", "banana", "cherry"]
42
"hello"
true
null

// ❌ KHÔNG phải JSON hợp lệ
{ name: "Minh" }        // Key phải có dấu nháy kép
{'name': 'Minh'}        // Phải dùng nháy kép "
{greeting: hello}        // Value string phải có nháy kép
undefined                 // JSON không có undefined
```

**Quy tắc JSON:**
- Key phải là string trong dấu `" "...`
- Value: string, number, boolean, null, array, object
- KHÔNG có: function, undefined, Date, RegExp, comments

---

### `JSON.stringify()` — Object → JSON string

```javascript
// Cơ bản
const user = { name: "Minh", age: 21, active: true };
const json = JSON.stringify(user);
console.log(json);  // '{"name":"Minh","age":21,"active":true}'
console.log(typeof json);  // "string"

// Pretty print (thụt lề 2 spaces)
const pretty = JSON.stringify(user, null, 2);
console.log(pretty);
// {
//   "name": "Minh",
//   "age": 21,
//   "active": true
// }

// Filter keys (replacer array)
const filtered = JSON.stringify(user, ["name", "age"]);
console.log(filtered);  // '{"name":"Minh","age":21}'

// Custom transform (replacer function)
const custom = JSON.stringify(user, (key, value) => {
    if (key === "age") return undefined;  // Bỏ qua age
    return value;
});
console.log(custom);  // '{"name":"Minh","active":true}'
```

**Những gì bị bỏ qua khi stringify:**
```javascript
const obj = {
    name: "Minh",
    greet: function() { return "Hi"; },  // ❌ Bị bỏ qua
    undefined: undefined,                   // ❌ Bị bỏ qua
    symbol: Symbol("id"),                   // ❌ Bị bỏ qua
    date: new Date(),                       // → Chuỗi ISO
    regex: /abc/g,                          // → Object rỗng {}
};

console.log(JSON.stringify(obj));
// '{"name":"Minh","date":"2026-05-21T...","regex":{}}'
```

---

### `JSON.parse()` — JSON string → Object

```javascript
// Cơ bản
const json = '{"name":"Minh","age":21}';
const user = JSON.parse(json);
console.log(user.name);  // "Minh"
console.log(user.age);   // 21

// Parse array
const fruits = '["apple","banana","cherry"]';
const arr = JSON.parse(fruits);
console.log(arr[0]);  // "apple"

// Parse số, boolean, null
console.log(JSON.parse("42"));     // 42
console.log(JSON.parse("true"));   // true
console.log(JSON.parse("null"));   // null

// ⚠️ Parse lỗi → SyntaxError
try {
    JSON.parse("invalid json");
} catch (error) {
    console.log("JSON parse error:", error.message);
}

// Reviver function — transform khi parse
const json = '{"name":"Minh","birth":"1995-03-15"}';
const user = JSON.parse(json, (key, value) => {
    if (key === "birth") return new Date(value);  // Chuyển thành Date
    return value;
});
console.log(user.birth instanceof Date);  // true
```

---

### JSON trong thực tế

```javascript
// 1. Lưu vào localStorage
const todos = [
    { id: 1, text: "Học JSON", done: false },
    { id: 2, text: "Làm bài tập", done: true }
];

localStorage.setItem("todos", JSON.stringify(todos));

// Đọc ra
const saved = JSON.parse(localStorage.getItem("todos")) || [];

// 2. Gửi dữ liệu lên server
async function saveUser(user) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)  // Object → JSON string
    });
    const result = await response.json();  // JSON string → Object
    return result;
}

// 3. Deep clone object (nhanh nhưng có giới hạn)
const original = { name: "Minh", scores: [85, 92] };
const clone = JSON.parse(JSON.stringify(original));
clone.scores.push(100);
console.log(original.scores);  // [85, 92] — không bị ảnh hưởng

// ⚠️ Giới hạn deep clone: mất function, Date thành string
const obj = { date: new Date(), fn: () => {} };
const cloned = JSON.parse(JSON.stringify(obj));
console.log(cloned.date);  // Chuỗi ISO, không phải Date object
console.log(cloned.fn);    // undefined — mất function
```

---

### JSON vs JavaScript Object

| Đặc điểm | JavaScript Object | JSON |
|---|---|---|
| Key | Không bắt buộc `" "` | **Bắt buộc** `" "` |
| String | `' '` hoặc `" "` hoặc `` ` ` `` | **Chỉ** `" "` |
| Function | ✅ Có thể | ❌ Không thể |
| undefined | ✅ Có thể | ❌ Không thể |
| Comments | ✅ Có thể | ❌ Không thể |
| Trailing comma | ✅ Được | ❌ Không được |
| Kiểu dữ liệu | Object | **String** |

---

### Xử lý lỗi khi parse JSON

```javascript
// Safe parse — luôn wrap trong try-catch
function safeJsonParse(str) {
    try {
        return { success: true, data: JSON.parse(str) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const result1 = safeJsonParse('{"name":"Minh"}');
console.log(result1);  // { success: true, data: { name: "Minh" } }

const result2 = safeJsonParse('invalid');
console.log(result2);  // { success: false, error: "..." }

// Practical: đọc từ localStorage an toàn
function loadFromStorage(key, defaultValue = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultValue;
    } catch {
        return defaultValue;
    }
}

const todos = loadFromStorage("todos", []);
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Chuyển object sau thành JSON string
const student = { name: "An", age: 20, scores: [8, 9, 7] };

// 2. Parse JSON string thành object
const json = '{"product":"iPhone","price":25000000,"inStock":true}';

// 3. Pretty print JSON với thụt lề 2 spaces
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Viết function saveToStorage(key, data) — lưu vào localStorage
// 2. Viết function loadFromStorage(key, defaultValue) — đọc từ localStorage
// 3. Filter JSON: stringify chỉ giữ "name" và "email"
const user = { name: "Minh", age: 21, email: "minh@gmail.com", password: "123" };
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Viết function deepClone(obj) dùng JSON
//    - Xử lý: Date, RegExp, undefined, function
//    - Trả về bản sao hoàn chỉnh

// 2. Viết function safeJsonParse với validation schema
//    safeParse(jsonString, { name: "string", age: "number" })
//    → { success, data, errors }

// 3. Viết function mergeJsonFiles(...strings)
//    - Parse mỗi string
//    - Merge thành object
//    - Xử lý conflict (key trùng → ghi đè)
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 16 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/16_Day_JSON/16_day_json.md)*
