# 🟨 TUẦN 5 - BÀI 19
# **DOM MANIPULATION — JavaScript Giao Tiếp Với HTML**

---

## 0. 🎬 Opening Hook

*Minh hoàn thành Todo App logic trong console. Data thêm, xóa, sửa — đều chạy.*

*Nhưng khi gõ vào ô input trên trang, nhấn Enter — không có gì thay đổi trên trang.*

*"Logic đúng," anh Hùng nói. "Nhưng logic và UI đang sống trong hai thế giới khác nhau. DOM Manipulation là cầu nối: `document.querySelector()` lấy element HTML, `addEventListener()` lắng nghe hành động user, rồi thay đổi trang ngay lập tức."*

*Minh thêm 10 dòng code. Gõ "Học DOM" vào ô input → bấm Enter → Todo xuất hiện ngay trên trang. Bấm ❌ → biến mất.*

*"ĐÂY MỚI LÀ WEB APP!"* 🎉

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

HTML = cấu trúc tĩnh. DOM Manipulation = làm HTML sống động.

Mọi tương tác user trên web: like bài viết, thêm giỏ hàng, submit form không reload, infinite scroll, live search — đều dùng DOM Manipulation. Đây là kỹ năng **phân biệt website (tĩnh) với web application (động)**.

---

## 2. 🌐 Big Picture — DOM là gì?

```
HTML FILE              DOM (Document Object Model)         BROWSER
                       (Browser tạo ra khi parse HTML)
<html>                 document
  <body>               └── html
    <h1>Todo</h1>          ├── head
    <ul id="list">         └── body
      <li>Item 1</li>          ├── h1 → "Todo"
    </ul>                       └── ul#list
  </body>                           └── li → "Item 1"
</html>
          ↑                    ↑                   ↑
     Text file          Object tree            Pixels
                     JS có thể đọc/sửa

JavaScript <──────────────── truy cập DOM thông qua `document` object
```

**DOM API = bộ công cụ JavaScript dùng để:**
- **Chọn** elements (`querySelector`)
- **Đọc/Sửa** content, style, attributes
- **Thêm/Xóa** elements
- **Lắng nghe** events

---

## 3. ⚙️ Core Technical Truth

### Chọn Elements

```javascript
// ⭐ querySelector — Chọn ELEMENT ĐẦU TIÊN khớp CSS selector
const title = document.querySelector("h1");
const addBtn = document.querySelector("#add-btn");    // Theo ID
const firstItem = document.querySelector(".todo-item"); // Theo class
const emailInput = document.querySelector("input[type='email']"); // Theo attribute

// ⭐ querySelectorAll — Chọn TẤT CẢ elements khớp (trả về NodeList)
const allItems = document.querySelectorAll(".todo-item");
allItems.forEach(item => console.log(item.textContent));

// Chọn trong phạm vi của element khác (scoped query)
const nav = document.querySelector("nav");
const navLinks = nav.querySelectorAll("a");  // Chỉ <a> trong nav

// Cách cũ — vẫn hoạt động nhưng ít dùng
document.getElementById("my-id");              // Nhanh hơn querySelector #id
document.getElementsByClassName("my-class");   // HTMLCollection (live, không phải NodeList)
document.getElementsByTagName("div");
```

---

### Đọc & Sửa Elements

**Text content:**
```javascript
const title = document.querySelector("h1");

// Đọc
console.log(title.textContent);   // Chỉ text, không có HTML tags
console.log(title.innerHTML);     // Text + HTML tags bên trong

// Sửa
title.textContent = "📝 Todo App của Minh";  // ✅ An toàn — không parse HTML
title.innerHTML = "<em>Todo</em> App";        // ⚠️ Parse HTML — nguy cơ XSS!

// ⚠️ XSS WARNING — không dùng innerHTML với user input!
const userInput = "<script>alert('hack!')</script>";
title.textContent = userInput;  // ✅ An toàn — hiện text literal
title.innerHTML = userInput;    // ❌ Nguy hiểm — chạy script!
```

**Style:**
```javascript
const box = document.querySelector(".box");

// Set style trực tiếp (inline style — ưu tiên thấp thay với !important)
box.style.backgroundColor = "#2563eb";  // camelCase trong JS
box.style.fontSize = "18px";
box.style.display = "none";    // Ẩn element
box.style.display = "block";   // Hiện lại

// Đọc computed style (style thực tế sau cascade)
const computedStyle = getComputedStyle(box);
console.log(computedStyle.width);      // "300px" (thực tế)
console.log(computedStyle.color);
```

**Class manipulation — cách tốt nhất để style với JS:**
```javascript
const item = document.querySelector(".todo-item");

item.classList.add("completed");       // Thêm class
item.classList.remove("active");       // Xóa class
item.classList.toggle("highlight");    // Thêm nếu chưa có, xóa nếu có
item.classList.replace("old", "new");  // Thay thế class
item.classList.contains("done");       // Kiểm tra có class không (boolean)
console.log(item.className);           // String tất cả class
```

**Attributes:**
```javascript
const input = document.querySelector("#email");

// Đọc/ghi attributes
input.getAttribute("placeholder")      // "Nhập email..."
input.setAttribute("disabled", "");    // Disable input
input.removeAttribute("disabled");     // Enable lại
input.hasAttribute("required");        // Kiểm tra

// Properties vs Attributes (quan trọng!)
input.value            // ← Property (JavaScript) — giá trị hiện tại
input.getAttribute("value")  // ← Attribute (HTML) — giá trị mặc định ban đầu
```

---

### Thêm & Xóa Elements

```javascript
// CÁCH 1: innerHTML (nhanh, nhưng cẩn thận XSS với user input)
const list = document.querySelector("#todo-list");

// Render toàn bộ list lại
list.innerHTML = todos.map(todo => `
    <li class="todo-item ${todo.done ? 'todo-item--done' : ''}"
        data-id="${todo.id}">
        <input type="checkbox" ${todo.done ? "checked" : ""}>
        <span>${escapeHTML(todo.text)}</span>
        <button class="delete-btn" data-id="${todo.id}">❌</button>
    </li>
`).join("");

// Escape HTML để tránh XSS
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// CÁCH 2: createElement (an toàn hơn cho single element)
const li = document.createElement("li");
li.className = "todo-item";
li.dataset.id = "123";        // data-id attribute
li.textContent = "Todo mới!"; // An toàn

list.appendChild(li);         // Thêm vào cuối
list.prepend(li);             // Thêm vào đầu
list.insertBefore(li, list.firstChild); // Thêm trước firstChild

// Xóa
li.remove();                  // Xóa chính nó (ES2014)
list.removeChild(li);         // Cha xóa con (cách cũ)
```

---

### Event Handling — Lắng nghe hành động user

```javascript
// Cú pháp cơ bản
element.addEventListener("event", handlerFunction);

// Click
const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", () => {
    console.log("Nút được click!");
});

// Submit form — luôn cần preventDefault!
const form = document.querySelector("#todo-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();   // ← Ngăn reload trang (hành vi mặc định của form)

    const input = document.querySelector("#todo-input");
    const text = input.value.trim();

    if (!text) return;        // Guard: không thêm todo trống

    addTodo(text);
    input.value = "";         // Clear input
    input.focus();            // Focus lại để nhập tiếp
});

// Input — real-time (mỗi ký tự gõ)
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e) => {
    const query = e.target.value;  // e.target = element trigger event
    filterAndRender(query);
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "Enter" && e.ctrlKey) submitForm();
    if (e.key === "/" && e.metaKey) openSearch();  // Cmd+/ (macOS)
});

// Hover (dùng CSS :hover tốt hơn, nhưng đôi khi cần JS)
card.addEventListener("mouseenter", () => card.classList.add("hovered"));
card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
```

---

### Event Delegation — Xử lý event hiệu quả

```javascript
// ❌ CÁCH KÉM — Gán event cho từng item (khi render lại, mất event)
document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", handleDelete);
});

// ✅ CÁCH TỐT — Event delegation (gán 1 lần cho cha)
const list = document.querySelector("#todo-list");

list.addEventListener("click", (e) => {
    // Kiểm tra element nào thực sự được click
    const deleteBtn = e.target.closest(".delete-btn");
    const todoText = e.target.closest(".todo-text");

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        deleteTodo(Number(id));
    }

    if (todoText) {
        const id = todoText.closest("[data-id]").dataset.id;
        toggleTodo(Number(id));
    }
});
// Event này hoạt động ngay cả với items được thêm ĐỘNG SAU này
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`querySelector` → tìm. `addEventListener` → lắng nghe. `classList.toggle` → đổi trạng thái.**
> **`e.preventDefault()` trên form submit — không có nó, trang reload mỗi khi submit.**

---

## 5. 🏭 Real-world Layer

### Todo App hoàn chỉnh — DOM + Data

```javascript
// State
let todos = [];
let nextId = 1;

// DOM references
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const counter = document.querySelector("#pending-count");

// Render function — Pure: state → HTML
function render() {
    const pending = todos.filter(t => !t.done);

    list.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.done ? "todo-item--done" : ""}"
            data-id="${todo.id}">
            <button class="check-btn" data-id="${todo.id}">
                ${todo.done ? "✅" : "⬜"}
            </button>
            <span class="todo-text">${escapeHTML(todo.text)}</span>
            <button class="delete-btn" data-id="${todo.id}">❌</button>
        </li>
    `).join("") || '<li class="empty">Chưa có việc gì cả! 🎉</li>';

    counter.textContent = pending.length;
}

// Event handlers
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos = [...todos, { id: nextId++, text, done: false }];
    input.value = "";
    render();
});

list.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
    } else if (e.target.classList.contains("check-btn")) {
        todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    }
    render();
});

// Initial render
render();
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Live Search + Counter (20 phút)

Thêm vào Todo App:

```javascript
// 1. Live search — filter todos khi gõ
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = todos.filter(t =>
        t.text.toLowerCase().includes(query)
    );
    // TODO: render filtered thay vì todos
    renderFiltered(filtered);
});

// 2. Clear all completed
const clearBtn = document.querySelector("#clear-done");
clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.done);
    render();
});

// 3. Counter animation
function updateCounter(count) {
    counter.textContent = count;
    counter.classList.add("bounce");  // CSS animation class
    setTimeout(() => counter.classList.remove("bounce"), 300);
}
```

**Thực nghiệm:**
- Thêm 5 todos → search "Học" → Bao nhiêu kết quả?
- Click event delegation: mở DevTools → đếm event listeners trên `<ul>` vs từng `<li>`

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`innerHTML` là cách tốt nhất để render"** | `innerHTML` với user input → XSS. Dùng `textContent` cho text. Dùng `innerHTML` chỉ với trusted content hoặc sau khi escape |
| **"Event listener tự xóa khi element bị remove"** | Không — event listeners "lơ lửng" gây memory leak. Cần `removeEventListener` trước khi xóa element, hoặc dùng event delegation |
| **"`querySelector` trả về null nếu không tìm thấy"** | Đúng — và gọi `.addEventListener` trên `null` → TypeError. Luôn kiểm tra: `const el = document.querySelector(...); if (el) el.addEventListener(...)` |
| **"Thay đổi `style.color` nhanh hơn thay đổi class"** | Ngược lại — thay đổi class tốt hơn: CSS animations/transitions hoạt động, dễ maintain, không tạo inline style conflict |
| **"Chỉ cần `e.preventDefault()` cho form submit"** | `preventDefault()` dùng cho bất kỳ event nào muốn ngăn hành vi mặc định: ngăn link navigate (`a` tag click), ngăn context menu (chuột phải), ngăn scroll (keydown), v.v. |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `querySelector` và `querySelectorAll` khác nhau thế nào về kiểu trả về và cách dùng?
2. Tại sao phải gọi `e.preventDefault()` trong handler của form submit event?
3. `textContent` và `innerHTML` khác nhau thế nào? Khi nào dùng cái nào?

### Câu hỏi áp dụng:

4. Giải thích Event Delegation là gì và tại sao tốt hơn gán event cho từng item?
5. Code sau có vấn đề bảo mật không? Sửa lại:
   ```javascript
   const comment = userInput.value;  // User nhập: <script>alert('hack!')</script>
   document.querySelector(".comments").innerHTML += `<p>${comment}</p>`;
   ```

<details>
<summary>👁️ Xem đáp án</summary>

1. **`querySelector`** trả về **element đầu tiên** khớp (hoặc `null`). Trả về `Element`. **`querySelectorAll`** trả về **NodeList** (giống array) tất cả elements khớp (có thể rỗng). NodeList cần dùng `forEach` để duyệt.
2. Form submit mặc định **reload trang** và gửi data qua HTTP request. `preventDefault()` ngăn reload → JavaScript xử lý data thay thế → SPA behavior. Không có nó → trang reload, mất toàn bộ state JS.
3. **`textContent`** = chỉ text thuần, không parse HTML — **an toàn với user input**. **`innerHTML`** = parse HTML content — cho phép render HTML nhưng **nguy cơ XSS** nếu chứa user input chưa được sanitize. Luôn dùng `textContent` trừ khi cần render HTML từ trusted source.
4. Event Delegation = gán 1 event listener cho element **cha** thay vì từng element con. Khi event xảy ra, kiểm tra `e.target` để xác định con nào được click. Tốt hơn vì: (1) Tiết kiệm memory — 1 listener thay vì N listeners; (2) Tự động hoạt động với elements thêm động sau này; (3) Hiệu suất tốt hơn khi list lớn.
5. **Có vấn đề XSS nghiêm trọng** — user có thể inject script. Sửa:
   ```javascript
   const comment = userInput.value;
   const p = document.createElement("p");
   p.textContent = comment;  // textContent escape HTML tự động
   document.querySelector(".comments").appendChild(p);
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **DOM = JavaScript-accessible tree** của HTML. `document` là gốc của cây
2. **`querySelector`** + **CSS selector** = cách chọn element linh hoạt nhất
3. **`classList.add/remove/toggle`** = thay đổi giao diện qua CSS class (tốt hơn inline style)
4. **`e.preventDefault()`** trên form submit — không có = trang reload mỗi lần submit
5. **Event Delegation** — gán event trên cha, check `e.target` — tốt hơn gán riêng từng item

---

## 10. ➡️ Next Lesson Bridge

*"Todo App hoạt động real-time! Thêm, xóa, tick hoàn thành — không cần reload!" Minh hào hứng.*

*"Nhưng refresh trang → mất hết todos. Và trang thời tiết mình muốn làm — cần lấy data từ server, không phải code cứng."*

*"Đó là hai vấn đề quan trọng," anh Hùng nói. "localStorage cho persistence. Fetch API cho external data. Cả hai dùng cơ chế Asynchronous JavaScript."*

**→ [Bài 20: AJAX & Async](./20_ajax_async.md) — Fetch API, async/await, và cách xử lý loading/error states như app production.**
