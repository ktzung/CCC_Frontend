# 🟨 TUẦN 4 - BÀI 08
# **DESTRUCTURING & SPREAD — Rút trích & Phân tán dữ liệu**

---

## 0. 🎬 Opening Hook

*Minh nhận JSON từ API — một object lớn:*

```javascript
const response = {
    data: { user: { firstName: "Nguyễn", lastName: "Văn Minh", age: 21 } },
    status: 200,
    message: "OK"
};
```

*Anh viết:*
```javascript
const firstName = response.data.user.firstName;
const lastName = response.data.user.lastName;
const age = response.data.user.age;
const status = response.status;
```

*4 dòng chỉ để lấy giá trị. Anh Hùng cười: "ES6 có destructuring — 1 dòng xong."*

```javascript
const { data: { user: { firstName, lastName, age } }, status } = response;
```

*"1 dòng thay 4. Đó là sức mạnh của Destructuring."* 🔥

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Destructuring & Spread xuất hiện **mọi nơi** trong code hiện đại:

- **React hooks**: `const [count, setCount] = useState(0)` — destructuring array
- **API response**: `const { data, error } = await fetch(...)` — destructuring object
- **Function parameters**: `({ name, age }) => ...` — destructuring trong tham số
- **Copy object/array**: `const copy = { ...original }` — spread operator

> Không biết destructuring = không đọc được code React/Vue/Angular.

---

## 2. 🌐 Big Picture — Bản đồ Destructuring & Spread

```
DESTRUCTURING — Rút trích giá trị từ array/object
│
├── ARRAY DESTRUCTURING
│   │   const [a, b, c] = [1, 2, 3]
│   ├── Skip:    const [a, , c] = [1, 2, 3]
│   ├── Rest:    const [a, ...rest] = [1, 2, 3]
│   ├── Default: const [a = 10] = []
│   └── Swap:    [a, b] = [b, a]
│
└── OBJECT DESTRUCTURING
    │   const { name, age } = { name: "Minh", age: 21 }
    ├── Rename:  const { name: ten } = { name: "Minh" }
    ├── Default: const { score = 0 } = {}
    ├── Nested:  const { a: { b } } = { a: { b: 1 } }
    └── Rest:    const { a, ...rest } = { a: 1, b: 2, c: 3 }

SPREAD (...) — Phân tán elements ra
│
├── Array:  [...arr1, ...arr2]    → Merge / Copy
├── Object: { ...obj1, ...obj2 }  → Merge / Copy / Override
└── Function: fn(...args)         → Spread arguments

REST (...) — Thu thập phần còn lại
│
├── Function: function fn(a, ...rest) {}
└── Destructuring: const { a, ...rest } = obj
```

---

## 3. ⚙️ Core Technical Truth

### Array Destructuring

```javascript
// Cơ bản
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first);   // "red"
console.log(second);  // "green"

// Skip phần tử
const [primary, , tertiary] = colors;
console.log(primary);   // "red"
console.log(tertiary);  // "blue" — bỏ qua "green"

// Rest — thu thập phần còn lại
const [head, ...tail] = colors;
console.log(head);  // "red"
console.log(tail);  // ["green", "blue"]

// Default value
const [a = 10, b = 20] = [5];
console.log(a);  // 5 — có giá trị
console.log(b);  // 20 — dùng default

// Swap biến (không cần temp!)
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2, 1

// Destructuring từ function trả về array
function getMinMax(arr) {
    return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5, 9]);
console.log(min, max);  // 1, 9
```

---

### Object Destructuring

```javascript
// Cơ bản
const user = { name: "Minh", age: 21, city: "Hà Nội" };
const { name, age } = user;
console.log(name);  // "Minh"
console.log(age);   // 21

// Rename — đổi tên biến
const { name: fullName, age: userAge } = user;
console.log(fullName);  // "Minh"
console.log(userAge);   // 21

// Default value
const { score = 0, rank = "unranked" } = user;
console.log(score);  // 0 — không có trong object → dùng default
console.log(rank);   // "unranked"

// Nested — object lồng nhau
const response = {
    data: {
        user: { name: "Minh", address: { city: "Hà Nội" } }
    },
    status: 200
};

const { data: { user: { name: userName, address: { city } } }, status } = response;
console.log(userName);  // "Minh"
console.log(city);      // "Hà Nội"
console.log(status);    // 200

// Rest — lấy phần còn lại
const { name: n, ...others } = user;
console.log(n);       // "Minh"
console.log(others);  // { age: 21, city: "Hà Nội" }
```

---

### Destructuring trong Function Parameters

```javascript
// ❌ Truyền object → phải dùng dot notation
function createUser(options) {
    const name = options.name;
    const age = options.age || 18;
    const role = options.role || "user";
    // ...
}

// ✅ Destructuring trong parameter — gọn hơn nhiều
function createUser({ name, age = 18, role = "user" }) {
    console.log(`${name}, ${age} tuổi, vai trò: ${role}`);
}

createUser({ name: "Minh", age: 21 });
// "Minh, 21 tuổi, vai trò: user"

// React-style destructuring
const UserCard = ({ name, avatar, isOnline = false }) => {
    return `<div>${name} ${isOnline ? "🟢" : "⚫"}</div>`;
};
```

---

### Spread Operator (...) — Phân tán

```javascript
// 1. Copy array (shallow copy)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original);  // [1, 2, 3] — không bị ảnh hưởng
console.log(copy);      // [1, 2, 3, 4]

// 2. Merge arrays
const frontend = ["HTML", "CSS", "JS"];
const backend = ["Node", "Express", "MongoDB"];
const fullstack = [...frontend, "React", ...backend];
console.log(fullstack);
// ["HTML", "CSS", "JS", "React", "Node", "Express", "MongoDB"]

// 3. Copy object (shallow copy)
const user = { name: "Minh", age: 21 };
const updatedUser = { ...user, age: 22, city: "Hà Nội" };
console.log(updatedUser);
// { name: "Minh", age: 22, city: "Hà Nội" }

// 4. Override properties — thứ tự quan trọng!
const defaults = { theme: "light", lang: "vi", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 18 };
const config = { ...defaults, ...userPrefs };
console.log(config);
// { theme: "dark", lang: "vi", fontSize: 18 } — userPrefs ghi đè defaults

// 5. Truyền arguments cho function
const numbers = [3, 1, 4, 1, 5, 9];
const max = Math.max(...numbers);  // Math.max(3, 1, 4, 1, 5, 9)
console.log(max);  // 9
```

---

### Rest Parameters (...) — Thu thập

```javascript
// Rest trong function parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15

// Kết hợp named + rest
function log(level, ...messages) {
    messages.forEach(msg => console.log(`[${level}] ${msg}`));
}
log("INFO", "Server started", "Port 3000");
// [INFO] Server started
// [INFO] Port 3000

// Rest trong destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5]

const { name, ...others } = { name: "Minh", age: 21, city: "HN" };
console.log(name);    // "Minh"
console.log(others);  // { age: 21, city: "HN" }
```

---

### Spread vs Rest — Phân biệt

```javascript
// SPREAD — "mở ra" (ở bên PHẢI dấu =)
const arr = [1, 2, 3];
const copy = [...arr];        // Phân tán arr vào mảng mới

// REST — "thu lại" (ở bên TRÁI dấu =)
const [a, ...rest] = [1, 2, 3];  // Thu thập phần còn lại vào rest

// Cùng syntax `...` nhưng NGƯỢC CHIỀU:
// SPREAD: array/object → individual elements
// REST:   individual elements → array/object
```

---

## 4. 🔍 Patterns thường dùng

```javascript
// 1. Immutable update (React state)
const updateUser = (user, newAge) => ({ ...user, age: newAge });

// 2. Remove property khỏi object
const { password, ...safeUser } = user;  // Loại bỏ password

// 3. Clone sâu (shallow copy limitation)
const deep = JSON.parse(JSON.stringify(original));  // Deep copy
const shallow = { ...original };  // Chỉ copy 1 cấp

// 4. Default params nâng cao
const createConfig = ({
    host = "localhost",
    port = 3000,
    debug = false
} = {}) => { /* ... */ };

createConfig();                  // Dùng tất cả default
createConfig({ port: 8080 });    // Chỉ đổi port
```

---

## 5. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Destructuring: tách mảng thành first, second, rest
const arr = [10, 20, 30, 40, 50];

// 2. Destructuring: lấy name, age từ object
const person = { name: "Minh", age: 21, city: "Hà Nội" };

// 3. Spread: merge 2 arrays
const a = [1, 2, 3];
const b = [4, 5, 6];

// 4. Spread: copy object và thêm thuộc tính mới
const user = { name: "Linh", role: "user" };
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Destructuring nested object
const apiResponse = {
    status: 200,
    data: {
        user: { name: "Minh", email: "minh@gmail.com" },
        token: "abc123"
    }
};
// Lấy: status, user name, token

// 2. Swap 2 biến bằng destructuring
let a = "hello", b = "world";

// 3. Rest parameters: function tính tổng N số
// sum(1,2,3) → 6, sum(10,20) → 30

// 4. Spread: override object properties
const defaults = { theme: "light", lang: "vi", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 18 };
// Tạo config với userPrefs ghi đè defaults
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Viết function nhận array, trả về [min, max, average]
// Dùng destructuring trong return

// 2. Viết function mergeObjects(...objects)
// Dùng rest parameters + spread
// mergeObjects({a:1}, {b:2}, {a:3}) → {a:3, b:2}

// 3. Viết function removeKeys(obj, ...keys)
// Trả về object mới không chứa các keys đã chỉ định
// removeKeys({a:1, b:2, c:3}, "a", "c") → {b:2}
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 11 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/11_Day_Destructuring_and_spreading/11_day_destructuring_and_spreading.md)*
