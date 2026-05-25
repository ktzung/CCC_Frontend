# 🟨 TUẦN 4 - BÀI 10
# **ES6 MODULES — Import & Export**
### Cầu nối từ JavaScript thuần sang React

---

## 0. 🎬 Opening Hook

*Minh đã viết xong Todo App — tất cả trong MỘT file `app.js`: 800 dòng, 15 functions, 3 classes.*

*"App chạy tốt," Minh nói. "Nhưng mỗi lần sửa một function, em phải cuộn qua 800 dòng. Đồng nghiệp muốn dùng hàm `formatDate()` của em → copy-paste. Em sửa formatDate → đồng nghiệp vẫn dùng bản cũ."*

*Anh Hùng: "Em đang vi phạm nguyên tắc cơ bản nhất của lập trình hiện đại: **mỗi file một trách nhiệm**. Nhưng nếu tách ra nhiều file, làm sao chúng biết nhau?"*

```javascript
// ❌ Trước: tất cả trong 1 file
// app.js — 800 dòng
function formatDate() { /* ... */ }
function validateEmail() { /* ... */ }
function renderTodo() { /* ... */ }
class TodoStore { /* ... */ }
// ... 796 dòng nữa

// ✅ Sau: mỗi file một việc
// utils.js       → export formatDate, validateEmail
// TodoStore.js   → export class TodoStore
// TodoView.js    → export renderTodo
// app.js         → import tất cả, chạy app
```

*"Đó là ES6 Modules — cách JavaScript chia sẻ code giữa các file. Và đây chính là syntax bạn sẽ thấy trong MỌI file React."* 🚀

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**ES6 Modules là cầu nối giữa JavaScript thuần và React:**

```
JavaScript thuần          ES6 Modules              React
─────────────────    →    import/export    →    import React from 'react'
                          <script type="module">  import { useState } from 'react'
                                                  export default App
```

- **Không biết import/export** → không thể viết React, Vue, Angular
- **Không biết modules** → mọi thứ nằm 1 file → không maintain được
- **Hiểu modules** → hiểu cách npm packages hoạt động, cách Vite/Webpack build

> Khi bạn thấy `import React from 'react'` trong React — đó chính là ES6 Module syntax bạn học trong bài này.

---

## 2. 🌐 Big Picture — Bản đồ ES6 Modules

```
FILE A (utils.js)                    FILE B (app.js)
┌──────────────────────┐             ┌──────────────────────┐
│                      │             │                      │
│  function add() {}   │  export →   │  import { add } from │
│  function sub() {}   │  export →   │    './utils.js'      │
│  const PI = 3.14     │  export →   │                      │
│                      │             │  console.log(add(1,2))│
└──────────────────────┘             └──────────────────────┘

CÁC LOẠI EXPORT/IMPORT:

EXPORT                           IMPORT
───────────────────────         ───────────────────────
export const add = ...          import { add } from './utils'
export const PI = ...           import { add, PI } from './utils'
export default function() {}    import myFunc from './utils'
                                import * as utils from './utils'

QUY TẮC VÀNG:
┌─────────────────────────────────────────────────────┐
│  export { }  →  import { }    (named — tên phải khớp) │
│  export default  →  import bất kỳ tên  (default — 1 file chỉ 1) │
└─────────────────────────────────────────────────────┘
```

---

## 3. ⚙️ Core Technical Truth

### 3.1 Export — Chia sẻ code ra ngoài

**Named Export — Xuất nhiều thứ, phải nhớ tên:**
```javascript
// utils.js — Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Hoặc gom cuối file (cách viết gọn):
const PI = 3.14159;
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

export { PI, add, subtract };  // Gom export ở cuối
```

**Default Export — Xuất 1 thứ chính, không cần nhớ tên:**
```javascript
// TodoStore.js — Default export
export default class TodoStore {
    constructor() {
        this.todos = [];
    }
    add(text) {
        this.todos.push({ text, done: false });
    }
}

// Hoặc:
const TodoStore = class { /* ... */ };
export default TodoStore;

// Hoặc export trực tiếp:
export default function renderApp() { /* ... */ }
```

**Kết hợp cả hai (phổ biến trong React):**
```javascript
// Button.js — 1 default + nhiều named
export default function Button({ label, onClick }) {
    return `<button onclick="${onClick}">${label}</button>`;
}

export const BUTTON_VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger'
};

export function createButtonGroup(buttons) {
    return buttons.map(b => Button(b)).join('');
}
```

---

### 3.2 Import — Nhập code từ file khác

**Import Named — Phải dùng đúng tên đã export:**
```javascript
// app.js
import { add, subtract, PI } from './utils.js';

console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(PI);               // 3.14159

// Đổi tên khi import (alias):
import { add as plus, subtract as minus } from './utils.js';
console.log(plus(10, 5));  // 15
```

**Import Default — Tự đặt tên:**
```javascript
// app.js — Tự chọn tên cho default export
import TodoStore from './TodoStore.js';    // "TodoStore" là tên mình đặt
import MyStore from './TodoStore.js';      // Cũng OK — tên tùy chọn
import Whatever from './TodoStore.js';     // Vẫn OK!

const store = new TodoStore();
store.add("Học ES6 Modules");
```

**Import kết hợp default + named:**
```javascript
// app.js
import Button, { BUTTON_VARIANTS, createButtonGroup } from './Button.js';

// Button         ← default export (tự đặt tên)
// BUTTON_VARIANTS ← named export (phải đúng tên)
// createButtonGroup ← named export (phải đúng tên)
```

**Import toàn bộ (namespace import):**
```javascript
// Import TẤT CẢ named exports thành 1 object
import * as utils from './utils.js';

console.log(utils.add(1, 2));    // 3
console.log(utils.PI);           // 3.14159
console.log(utils.subtract(5, 3)); // 2
```

---

### 3.3 Dùng Modules trong HTML

**Cách 1: `<script type="module">` (Native — không cần build tool):**
```html
<!DOCTYPE html>
<html>
<head><title>ES6 Modules Demo</title></head>
<body>
    <h1>Todo App</h1>
    <div id="app"></div>

    <!-- Phải dùng type="module" -->
    <script type="module">
        import TodoStore from './TodoStore.js';
        import { renderTodos } from './utils.js';

        const store = new TodoStore();
        store.add("Học Modules");
        renderTodos(store.todos, document.getElementById('app'));
    </script>
</body>
</html>
```

**Lưu ý quan trọng khi dùng `type="module"`:**
```html
<!-- ✅ Module tự động defer — chạy sau khi parse HTML xong -->
<script type="module" src="app.js"></script>

<!-- ❌ Không thể import từ file local nếu mở trực tiếp file:// -->
<!-- Phải dùng local server: -->
<!--   npx serve . -->
<!--   python -m http.server -->
<!--   Live Server (VS Code extension) -->
```

**Cách 2: Build tool (Vite, Webpack) — Cách chuyên nghiệp:**
```javascript
// Vite/Webpack tự xử lý modules → bundle thành 1 file
// Bạn chỉ cần viết import/export bình thường
// Build tool lo phần còn lại

// Trong React: import React từ node_modules
import React from 'react';           // Vite tự tìm trong node_modules
import { useState } from 'react';    // Named import từ package
```

---

### 3.4 Module Scope — Tại sao biến không "rò rỉ"

```javascript
// counter.js
let count = 0;  // Biến này CHỈ tồn tại trong counter.js

export function increment() {
    count++;
    return count;
}
```

```javascript
// app.js
import { increment } from './counter.js';

console.log(increment());  // 1
console.log(increment());  // 2
// console.log(count);     // ❌ ReferenceError! count không tồn tại ở đây

// Mỗi file là một scope riêng biệt — không xung đột biến
```

```
TRƯỚC (Global scope — dễ xung đột):
┌────────────────────────────────────────┐
│  File A: var name = "Minh"             │ ← ghi đè
│  File B: var name = "Hùng"             │ ← ghi đè
│  File C: console.log(name) → "Hùng"   │ ← ai đúng?
└────────────────────────────────────────┘

SAU (Module scope — an toàn):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Module A     │  │  Module B     │  │  Module C     │
│  name="Minh"  │  │  name="Hùng"  │  │ import {name} │
│  (riêng tư)   │  │  (riêng tư)   │  │  từ A hoặc B  │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

### 3.5 Re-export — Chuyển tiếp export

```javascript
// components/index.js — Barrel file (thùng chứa)
// Gom tất cả export từ nhiều file thành 1 điểm

export { default as Button } from './Button.js';
export { default as Input } from './Input.js';
export { default as Modal } from './Modal.js';
export { BUTTON_VARIANTS } from './Button.js';

// App khác chỉ cần import từ 1 nơi:
// import { Button, Input, Modal } from './components/index.js';
// Thay vì:
// import Button from './components/Button.js';
// import Input from './components/Input.js';
// import Modal from './components/Modal.js';
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

```
1. "export chia sẻ, import sử dụng"
   → File A export ra → File B import vào

2. "default không cần tên, named phải nhớ tên"
   → export default = tự đặt tên khi import
   → export { x } = phải import { x } cho đúng tên
```

---

## 5. 🏭 Real-world Layer

### Pattern 1: Tách utility functions

```javascript
// utils/format.js
export function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN').format(date);
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND'
    }).format(amount);
}

export function slugify(text) {
    return text.toLowerCase()
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
```

```javascript
// app.js
import { formatDate, formatCurrency } from './utils/format.js';

const order = { date: new Date(), total: 150000 };
console.log(formatDate(order.date));      // "25/5/2026"
console.log(formatCurrency(order.total)); // "150.000 ₫"
```

### Pattern 2: Tách API service

```javascript
// services/todoAPI.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request(endpoint, options = {}) {
    const response = await fetch(BASE_URL + endpoint, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export const todoAPI = {
    getAll: () => request('/todos?_limit=10'),
    getById: (id) => request(`/todos/${id}`),
    create: (data) => request('/todos', {
        method: 'POST', body: JSON.stringify(data)
    }),
    delete: (id) => request(`/todos/${id}`, { method: 'DELETE' })
};

export default todoAPI;
```

```javascript
// app.js
import todoAPI from './services/todoAPI.js';

const todos = await todoAPI.getAll();
console.log(todos);
```

### Pattern 3: Cấu trúc dự án thực tế (chuẩn bị cho React)

```
src/
├── index.html
├── main.js                    ← import App, chạy ứng dụng
├── components/
│   ├── index.js               ← re-export tất cả components
│   ├── Header.js              ← export default Header
│   ├── TodoList.js            ← export default TodoList
│   └── TodoItem.js            ← export default TodoItem
├── services/
│   └── todoAPI.js             ← export { todoAPI }
├── utils/
│   ├── format.js              ← export { formatDate, formatCurrency }
│   └── validate.js            ← export { validateEmail, validateTodo }
└── store/
    └── TodoStore.js           ← export default class TodoStore
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập 1: Tách module cơ bản (10 phút)

**Cho file sau — tách thành 3 files:**

```javascript
// === app.js (gốc — tất cả trong 1 file) ===
const VALID_THEMES = ['light', 'dark', 'auto'];

function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    if (!VALID_THEMES.includes(theme)) {
        throw new Error(`Theme "${theme}" không hợp lệ`);
    }
    localStorage.setItem('theme', theme);
    document.body.className = `theme-${theme}`;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN').format(date);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND'
    }).format(amount);
}

// Sử dụng
console.log(getTheme());
setTheme('dark');
console.log(formatDate(new Date()));
console.log(formatCurrency(150000));
```

**Yêu cầu:**
- `theme.js` — export `VALID_THEMES` (named), `getTheme` (named), `setTheme` (named)
- `format.js` — export default object chứa `formatDate`, `formatCurrency`
- `app.js` — import từ 2 file trên, chạy app

<details>
<summary>👁️ Xem đáp án</summary>

```javascript
// theme.js
export const VALID_THEMES = ['light', 'dark', 'auto'];

export function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

export function setTheme(theme) {
    if (!VALID_THEMES.includes(theme)) {
        throw new Error(`Theme "${theme}" không hợp lệ`);
    }
    localStorage.setItem('theme', theme);
    document.body.className = `theme-${theme}`;
}
```

```javascript
// format.js
export default {
    formatDate(date) {
        return new Intl.DateTimeFormat('vi-VN').format(date);
    },
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency', currency: 'VND'
        }).format(amount);
    }
};
```

```javascript
// app.js
import { getTheme, setTheme, VALID_THEMES } from './theme.js';
import format from './format.js';

console.log(getTheme());
setTheme('dark');
console.log(format.formatDate(new Date()));
console.log(format.formatCurrency(150000));
```

</details>

---

### Bài tập 2: Component module (15 phút)

**Tạo hệ thống Alert component bằng modules:**

```javascript
// components/Alert.js
// Yêu cầu:
// 1. Default export: function showAlert(message, type) { ... }
//    - type: 'success' | 'error' | 'warning' | 'info'
//    - Tạo div, hiển thị message, tự ẩn sau 3 giây
// 2. Named export: ALERT_TYPES = { SUCCESS, ERROR, WARNING, INFO }

// components/index.js
// 3. Re-export từ Alert.js

// app.js
// 4. Import từ components/index.js
// 5. Gọi showAlert("Thành công!", "success")
```

---

### Bài tập 3: Mini project — App tách module (20 phút)

**Xây dựng Student Grade Manager với cấu trúc modules:**

```
student-app/
├── index.html         ← <script type="module" src="app.js">
├── app.js             ← Import tất cả, chạy app
├── data.js            ← export students array
├── calculator.js      ← export tính GPA, xếp loại
└── renderer.js        ← export render bảng điểm ra HTML
```

**data.js:**
```javascript
export const students = [
    { id: 1, name: "Nguyễn Văn An", scores: [8, 7, 9] },
    { id: 2, name: "Trần Thị Bình", scores: [6, 5, 7] },
    { id: 3, name: "Lê Văn Cường", scores: [9, 9, 10] },
    { id: 4, name: "Phạm Thị Dung", scores: [4, 5, 3] },
    { id: 5, name: "Hoàng Văn Em", scores: [7, 8, 6] }
];
```

**calculator.js:**
```javascript
// Export:
// - calcGPA(scores) → trả về điểm trung bình (làm tròn 1 chữ số)
// - classify(gpa) → "Giỏi" (>=8), "Khá" (>=6.5), "Trung bình" (>=5), "Yếu" (<5)
// - getTopStudent(students) → sinh viên có GPA cao nhất
```

**renderer.js:**
```javascript
// Export:
// - renderTable(students, container) → render bảng HTML vào container
//   Columns: STT | Họ tên | Điểm TB | Xếp loại
//   Highlight hàng Giỏi bằng màu xanh, Yếu bằng màu đỏ
```

**app.js:**
```javascript
// Import từ 3 modules
// 1. Lấy danh sách students
// 2. Tính GPA cho mỗi sinh viên
// 3. Render bảng ra #app
// 4. Hiển thị top student ra #top-student
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"import/export chỉ dùng trong React"** | ES6 Modules là **tiêu chuẩn JavaScript gốc** (ES2015). Dùng được mọi nơi: Node.js, browser, Deno, Bun. React chỉ là framework sử dụng nó |
| **`<script src="utils.js">` và `import ... from './utils.js'` giống nhau"** | Script tag: biến toàn bộ global scope, load thứ tự quan trọng. Module: scope riêng biệt, tự xử lý dependency thứ tự |
| **"Phải dùng Vite/Webpack mới dùng được import"** | Browser hiện đại hỗ trợ `<script type="module">` trực tiếp. Chỉ cần local server (không mở file://) |
| **"export default và export thường như nhau"** | Default: 1 file chỉ 1, import tự đặt tên. Named: 1 file nhiều cái, phải dùng đúng tên (hoặc alias) |
| **"import là copy code vào file"** | Import tạo **binding** (tham chiếu), không copy. Nếu module gốc thay đổi giá trị, file import thấy giá trị mới |
| **"Dùng `require()` thay vì `import` được không?"** | `require()` là CommonJS (Node.js cũ). ES6 `import` là tiêu chuẩn mới. Trong frontend → luôn dùng `import`. Node.js hiện đại cũng hỗ trợ `import` |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa `export default` và `export { name }` là gì?
2. Tại sao cần `<script type="module">` trong HTML?
3. Module scope nghĩa là gì? Tại sao biến trong module không xung đột với biến ở file khác?

### Câu hỏi áp dụng:

4. File `math.js` export: `export default function add(a,b) { return a+b; }` và `export const PI = 3.14`. Import đúng trong `app.js`.

5. Code sau có lỗi gì?
```javascript
// utils.js
export const greet = (name) => `Hello ${name}`;

// app.js
import greet from './utils.js';
console.log(greet("Minh"));
```

<details>
<summary>👁️ Xem đáp án</summary>

1. **`export default`**: 1 file chỉ có 1, import tự chọn tên (`import X from './file'`). **`export { name }`**: 1 file có thể nhiều, phải import đúng tên (`import { name } from './file'`).

2. `<script type="module">` cho browser biết đây là ES6 Module → tự động xử lý import/export, scope riêng biệt, defer loading. Không có `type="module"` → browser coi là script thường, không hiểu `import` syntax.

3. Mỗi file module có scope riêng — biến `const`, `let`, `function` trong module không truy cập được từ bên ngoài trừ khi export. Không có xung đột tên biến giữa các file.

4. ```javascript
   // app.js
   import add, { PI } from './utils.js';   // add = default, PI = named
   console.log(add(1, 2));  // 3
   console.log(PI);         // 3.14
   ```

5. Lỗi: `greet` là **named export** nhưng lại import như **default**. Sửa:
   ```javascript
   import { greet } from './utils.js';  // Dùng { } cho named export
   ```
   Hoặc sửa `utils.js` thành `export default greet;`

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`export` chia sẻ, `import` sử dụng** — cách JavaScript chia code giữa các file
2. **Default vs Named**: `export default` → `import TênTùyChọn` / `export { x }` → `import { x }` (phải đúng tên)
3. **Module scope** = mỗi file là scope riêng → không xung đột biến, không rò rỉ ra global
4. **`<script type="module">`** = dùng modules trực tiếp trong browser (cần local server)
5. **Đây chính là syntax React dùng** — `import React from 'react'`, `export default function App()` đều là ES6 Modules

---

## 9b. 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `SyntaxError: Cannot use import statement outside a module` | Dùng `import` trong script thường | Thêm `type="module"` vào thẻ `<script>` hoặc dùng build tool |
| `SyntaxError: Unexpected token 'export'` | File `.js` được load như script thường | Đảm bảo `<script type="module" src="...">` |
| `Failed to resolve module specifier "./utils.js"` | Sai đường dẫn import | Phải có `./` hoặc `../` — không viết `import from 'utils.js'` |
| `CORS error khi import module` | Mở file trực tiếp `file://` | Dùng local server: Live Server, `npx serve .`, `python -m http.server` |
| `TypeError: X is not a function` | Import default nhưng file export named (hoặc ngược lại) | Kiểm tra: `export default` → `import X` / `export { x }` → `import { x }` |
| Import không hoạt động dù code đúng | Trình duyệt cache bản cũ | Hard refresh (Ctrl+Shift+R) hoặc thêm `?v=2` vào import path |

---

## 10. ➡️ Next Lesson Bridge

*"800 dòng app.js đã được tách thành 6 files. Mỗi file một việc. Đồng nghiệp import formatDate mà không cần copy-paste," Minh nói.*

*"Nhưng em thấy React code viết `function App() { return <h1>Hello</h1> }` — cái gì trong ngoặc nhọn trông giống HTML mà lại là JavaScript?"*

*"JSX — và để hiểu nó, em cần biết template literals trước. `${name}` trong template string chính là cách React render dữ liệu động."*

**→ [Bài tiếp theo — Cầu nối sang React](../tuan_6_js_frameworks/react/): ES6 Modules là nền tảng, giờ bạn đã sẵn sàng học `import React from 'react'` và `export default function App()`.**

---

*Tài liệu tham khảo: [MDN — JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) | [30 Days Of JavaScript](../30-Days-Of-JavaScript/)*
