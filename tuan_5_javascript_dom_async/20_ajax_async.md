# 🟨 TUẦN 5 - BÀI 20
# **AJAX & ASYNC — Gọi API Từ Frontend**

---

## 0. 🎬 Opening Hook

*Minh muốn thêm widget thời tiết vào Todo App. Anh code cứng: `"Hà Nội: 27°C 🌤️"`. Deploy lên.*

*Hôm sau: Hà Nội 35°C mà trang web vẫn hiện 27°C.*

*"Em cần lấy nhiệt độ THỰC TẾ từ server," anh Hùng nói. "Gọi API. Frontend gửi request → server trả JSON → frontend hiển thị. Trang cập nhật KHÔNG reload."*

*"Nhưng gọi API mất vài giây. JS phải chờ à? Cả trang bị đóng băng?"*

*"Không — đó là Asynchronous JavaScript. JS gửi request rồi làm việc khác. Khi server trả kết quả → callback. Trang không bị đóng băng."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Mọi web app hiện đại đều cần gọi API:
- Lấy danh sách sản phẩm từ database
- Gửi form đăng nhập lên server
- Hiển thị thời tiết, tỷ giá, tin tức real-time
- Upload file, nhận kết quả phân tích

**Không biết async/await = không làm được web app thực tế.**

---

## 2. 🌐 Big Picture — Synchronous vs Asynchronous

```
SYNCHRONOUS (Đồng bộ)        ASYNCHRONOUS (Bất đồng bộ)
─────────────────────         ────────────────────────────
Làm A                         Làm A
Chờ A xong...                 Bắt đầu B (đặt số, không chờ)
Làm B                         Làm C, D... (làm việc khác)
Chờ B xong...                 B xong → callback chạy!
Làm C

Hệ quả:                       Hệ quả:
Trang bị đóng băng            Trang vẫn responsive
khi chờ server                trong khi chờ server

Ví dụ:                        Ví dụ:
Xếp hàng tại quầy             Đặt số & chờ tên được gọi
```

**JavaScript là single-threaded** — chỉ làm 1 việc tại 1 thời điểm. Async = dùng **event loop** để không block main thread trong khi chờ I/O (network, file, timer).

---

## 3. ⚙️ Core Technical Truth

### Fetch API — Gọi HTTP request

**Cách 1: Promise chain (.then/.catch):**
```javascript
fetch("https://api.weatherapi.com/v1/current.json?key=xxx&q=Hanoi")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();       // Trả Promise chứa parsed JSON
    })
    .then(data => {
        console.log(`Hà Nội: ${data.current.temp_c}°C`);
    })
    .catch(error => {
        console.error("Lỗi:", error.message);
    })
    .finally(() => {
        hideLoadingSpinner();         // Luôn chạy dù success hay error
    });
```

**Cách 2: Async/Await ⭐ (KHUYẾN NGHỊ — đọc dễ hơn):**
```javascript
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=xxx&q=${city}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return {
            city: data.location.name,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        };
    } catch (error) {
        console.error(`Không lấy được thời tiết ${city}:`, error);
        return null;
    }
}

// Gọi hàm async
const weather = await getWeather("Hanoi");
if (weather) {
    console.log(`${weather.city}: ${weather.temp}°C — ${weather.condition}`);
}
```

> **`async` function luôn trả về Promise.** Dùng `await` bên trong để "chờ" Promise resolve. `try/catch` bắt lỗi network hoặc HTTP errors.

---

### Fetch CRUD — Tất cả HTTP methods

```javascript
const API = "https://jsonplaceholder.typicode.com/todos";

// GET — Lấy dữ liệu
async function getTodos(limit = 10) {
    const res = await fetch(`${API}?_limit=${limit}`);
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    return res.json();
}

// POST — Tạo mới
async function createTodo(data) {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`  // Auth header
        },
        body: JSON.stringify(data)  // Object → JSON string
    });
    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    return res.json();  // Server trả về object vừa tạo (có id)
}

// PUT — Cập nhật toàn bộ
async function updateTodo(id, data) {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

// PATCH — Cập nhật một phần
async function toggleTodo(id, completed) {
    const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    });
    return res.json();
}

// DELETE — Xóa
async function deleteTodo(id) {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
    return true;
}
```

---

### Loading / Success / Error States — Bộ ba bắt buộc

```javascript
async function renderTodoList() {
    const list = document.querySelector("#todo-list");
    const errorMsg = document.querySelector("#error-msg");

    // ─── 1. LOADING STATE ───────────────────────────────────
    list.innerHTML = `
        <li class="skeleton-item"></li>
        <li class="skeleton-item"></li>
        <li class="skeleton-item"></li>
    `;
    errorMsg.hidden = true;

    try {
        const todos = await getTodos(10);

        // ─── 2. SUCCESS STATE ────────────────────────────────
        if (todos.length === 0) {
            list.innerHTML = '<li class="empty-state">📭 Chưa có todo nào!</li>';
            return;
        }

        list.innerHTML = todos.map(todo => `
            <li class="todo-item ${todo.completed ? "todo-item--done" : ""}"
                data-id="${todo.id}">
                <span>${escapeHTML(todo.title)}</span>
            </li>
        `).join("");

    } catch (error) {
        // ─── 3. ERROR STATE ──────────────────────────────────
        list.innerHTML = "";
        errorMsg.hidden = false;
        errorMsg.textContent = `❌ Không tải được dữ liệu: ${error.message}`;
        console.error(error);
    }
}
```

> **Rule của Anh Hùng:** *"App chuyên nghiệp LUÔN handle 3 states: Loading, Success, Error. Thiếu 1 = UX tệ. Thiếu Error = app bị crash âm thầm."*

---

### localStorage — Persist data qua refresh

```javascript
// Lưu vào localStorage (string only)
localStorage.setItem("todos", JSON.stringify(todos));
localStorage.setItem("theme", "dark");

// Đọc từ localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos") ?? "[]");
const theme = localStorage.getItem("theme") ?? "light";

// Xóa
localStorage.removeItem("todos");
localStorage.clear();  // Xóa tất cả

// Pattern: Auto-save khi state thay đổi
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    return JSON.parse(localStorage.getItem("todos") ?? "[]");
}

// Khởi động app
let todos = loadTodos();
render();
```

---

### Parallel Requests — Gọi nhiều API cùng lúc

```javascript
// ❌ SEQUENTIAL — Chậm (request sau đợi request trước)
const weather = await getWeather("Hanoi");   // 500ms
const news    = await getNews();              // 500ms
const stocks  = await getStockPrices();      // 500ms
// Tổng: ~1500ms

// ✅ PARALLEL — Promise.all (tất cả chạy cùng lúc)
const [weather, news, stocks] = await Promise.all([
    getWeather("Hanoi"),
    getNews(),
    getStockPrices()
]);
// Tổng: ~500ms (bằng request chậm nhất)

// Promise.allSettled — Không fail nếu 1 request lỗi
const results = await Promise.allSettled([
    getWeather("Hanoi"),
    getNews(),
    getStockPrices()
]);

results.forEach(result => {
    if (result.status === "fulfilled") {
        console.log("Success:", result.value);
    } else {
        console.warn("Failed:", result.reason);
    }
});
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`async function` + `await` = đọc code async như code sync. `try/catch` bắt lỗi.**
> **Loading → Success → Error: ba state mọi API call đều phải handle.**

---

## 5. 🏭 Real-world Layer

### API Service Layer — Tổ chức code production

```javascript
// services/api.js — Tập trung mọi API calls
const API_BASE = "https://api.example.com";
const TOKEN = localStorage.getItem("auth_token");

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(TOKEN && { "Authorization": `Bearer ${TOKEN}` }),
            ...options.headers
        },
        ...options
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message ?? `HTTP ${response.status}`);
    }

    return response.json();
}

// Public API methods
export const todoAPI = {
    getAll: () => request("/todos"),
    getById: (id) => request(`/todos/${id}`),
    create: (data) => request("/todos", { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) => request(`/todos/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id) => request(`/todos/${id}`, { method: "DELETE" })
};
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Todo App với JSONPlaceholder API (25 phút)

```javascript
// Dùng API miễn phí: https://jsonplaceholder.typicode.com/todos

// 1. Load todos từ API khi app khởi động
async function initApp() {
    try {
        showLoading();
        // TODO: fetch 10 todos đầu tiên từ API
        const todos = /* ? */;
        hideLoading();
        // TODO: save vào localStorage và render
    } catch (err) {
        showError(err.message);
    }
}

// 2. Add todo — POST lên API + cập nhật local state
async function addTodoToServer(text) {
    // TODO: POST { title: text, completed: false, userId: 1 }
    // Nhận lại object mới từ server (có id)
    // Thêm vào local todos array
    // Render
}

// 3. Delete todo — DELETE + cập nhật local state
async function deleteTodoFromServer(id) {
    // TODO: DELETE /todos/:id
    // Xóa khỏi local todos array
    // Render
}

// Helpers
function showLoading() {
    document.querySelector("#list").innerHTML =
        '<li class="loading">⏳ Đang tải...</li>';
}
function showError(msg) {
    document.querySelector("#list").innerHTML =
        `<li class="error">❌ ${msg} <button onclick="initApp()">Thử lại</button></li>`;
}

initApp();
```

---

### 🔒 CORS — Lỗi đầu tiên MỌI sinh viên gặp phải

Khi gọi API từ frontend, bạn **sẽ** gặp lỗi này:

```
Access to fetch at 'https://api.example.com/data' from origin 
'http://localhost:5173' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**CORS là gì?**
- **Cross-Origin Resource Sharing** — cơ chế bảo mật của browser
- Browser chặn request từ domain A → domain B除非 server B cho phép
- **Chỉ ảnh hưởng browser** — Postman, curl, server-to-server không bị CORS

**Tại sao bị CORS?**
```
Frontend: localhost:5173  →  API: api.example.com
   (domain khác nhau!) → Browser chặn
```

**Cách giải quyết (theo thứ tự ưu tiên):**

| Cách | Khi nào dùng | Ví dụ |
|---|---|---|
| **Backend cho phép CORS** | API của bạn (bạn control server) | Thêm header `Access-Control-Allow-Origin: *` |
| **Proxy server** | API người khác, không thể sửa | Vite proxy: `server: { proxy: { '/api': 'https://api.example.com' } }` |
| **CORS proxy service** | Học tập, demo | `https://corsproxy.io/?url=https://api.example.com/data` |

**Vite proxy config (phổ biến nhất khi dev):**
```javascript
// vite.config.js
export default {
    server: {
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}
```
Sau đó gọi: `fetch('/api/todos')` thay vì `fetch('https://jsonplaceholder.typicode.com/todos')`

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`async/await` không cần try/catch vì await chờ xong mới tiếp"** | `await` chỉ "unwrap" Promise — nếu Promise reject, nó throw error. Không có `try/catch` → unhandled rejection, app crash |
| **"Fetch tự throw error khi HTTP 404/500"** | Không! `fetch` chỉ reject khi **network failure** (offline, CORS, DNS). HTTP 4xx/5xx vẫn resolve! Phải check `response.ok` hoặc `response.status` |
| **"`localStorage.setItem` có thể lưu object"** | localStorage chỉ lưu **string**. `setItem("key", {})` lưu chuỗi `"[object Object]"`. Luôn `JSON.stringify()` trước khi lưu và `JSON.parse()` khi đọc |
| **"Dùng `await` trong vòng `for` loop là đúng"** | `for` loop với `await` là **sequential** (request 1 xong mới làm request 2). Nếu muốn parallel: `await Promise.all(items.map(fn))` |
| **"`async` chỉ cần ở function gọi `await`"** | `async` phải ở function CHỨA `await`. Không thể dùng `await` ở top-level (chỉ trong `async` function) — trừ top-level await trong ES Modules |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao JavaScript cần Asynchronous? Điều gì xảy ra nếu JS phải đợi đồng bộ khi gọi API?
2. `fetch()` có tự throw error khi server trả về 404 không? Làm thế nào để detect HTTP errors?
3. `Promise.all()` và `Promise.allSettled()` khác nhau thế nào?

### Câu hỏi áp dụng:

4. Hàm sau có bug gì? Sửa lại:
   ```javascript
   async function saveUser(user) {
       const res = await fetch("/api/user", {
           method: "POST",
           body: user
       });
       return res.json();
   }
   ```
5. Bạn cần gọi 3 API độc lập: user info, cart items, và recommended products. Viết code gọi cả 3 song song và xử lý kết quả.

<details>
<summary>👁️ Xem đáp án</summary>

1. JavaScript là **single-threaded** — nếu gọi API đồng bộ (blocking), toàn bộ main thread đứng yên chờ server trả lời (200ms~5s). Trong thời gian đó: user click không phản hồi, animation freeze, không render được. Async = gửi request xong làm việc khác, khi server trả lời mới xử lý kết quả.
2. **Không** — `fetch` chỉ reject (throw) khi network failure. HTTP 404, 500, 403 đều **resolve** (không throw). Phải kiểm tra: `if (!response.ok) throw new Error(...)` hoặc `if (response.status === 404) ...`.
3. **`Promise.all`** = fail fast — nếu 1 promise reject, toàn bộ reject ngay. **`Promise.allSettled`** = đợi tất cả kết thúc dù pass hay fail, trả về array `{status, value/reason}` cho từng item. Dùng `allSettled` khi muốn xử lý kết quả từng request riêng biệt, không muốn 1 fail làm hỏng tất cả.
4. Hai bugs: (1) **Thiếu `Content-Type: application/json` header** → server không biết parse gì. (2) **`body: user` là object** → phải `body: JSON.stringify(user)`. Sửa:
   ```javascript
   const res = await fetch("/api/user", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(user)
   });
   ```
5. ```javascript
   async function loadDashboard(userId) {
       const [user, cart, recommendations] = await Promise.all([
           fetch(`/api/user/${userId}`).then(r => r.json()),
           fetch(`/api/cart/${userId}`).then(r => r.json()),
           fetch("/api/recommendations").then(r => r.json())
       ]);
       renderDashboard(user, cart, recommendations);
   }
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`async/await`** = cú pháp đọc code async như sync. **`try/catch`** = bắt lỗi bắt buộc
2. **`fetch` không throw với HTTP 4xx/5xx** — phải check `response.ok` thủ công
3. **3 states**: Loading → Success → Error — thiếu 1 là UX không hoàn chỉnh
4. **`localStorage`** = persist qua refresh. Chỉ lưu string → `JSON.stringify/parse`
5. **`Promise.all`** = parallel requests (nhanh hơn sequential). **`Promise.allSettled`** = không fail nếu 1 request lỗi

---

## 9b. 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `CORS policy blocked` | Frontend gọi API khác domain mà server không cho phép | Backend thêm header `Access-Control-Allow-Origin`. Hoặc dùng proxy |
| `SyntaxError: Unexpected token <` | Server trả về HTML (error page) thay vì JSON | Kiểm tra URL API có đúng không. Kiểm tra `response.headers.get('content-type')` |
| `TypeError: Failed to fetch` | Mất mạng, sai URL, hoặc server down | Kiểm tra Network tab → status code. Thêm try/catch |
| `TypeError: xxx.json is not a function` | `response` không phải Response object | Đảm bảo dùng `await fetch(...)` không phải `fetch(...).then()` |
| Data không cập nhật trên UI | Quên gọi `setState` sau khi fetch | Phải `setUsers(data)` sau `const data = await res.json()` |
| localStorage lưu `[object Object]` | Truyền object trực tiếp vào `setItem` | Phải `JSON.stringify(obj)` trước khi lưu, `JSON.parse()` khi đọc |

---

## 10. ➡️ Next Lesson Bridge

*"Todo App gọi API, lưu localStorage, handle loading/error — hoàn chỉnh như app thật!" Minh nói.*

*"Nhưng code đang lộn xộn," anh Hùng nói. "API calls lẫn DOM code lẫn business logic. Ở công ty, 5 developer làm cùng 1 codebase, không có cấu trúc → chaos. Bài tiếp theo: quy trình làm việc chuyên nghiệp."*

**→ [Bài 21: Professional Dev Process](./21_professional_dev_process.md) — Từ BTL đến production: folder structure, Git workflow, npm, deployment.**
