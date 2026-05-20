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

#### 💡 Story: "Quản lý nhà hàng vs. 100 nhân viên phục vụ"

*Minh xây xong Todo App. Mọi thứ hoạt động. Nhưng khi thêm 50 todos, anh nhận ra vấn đề:*

*"Mỗi lần render lại list, em phải gán event cho từng nút ❌. 50 todos = 50 event listeners. Render lại → mất hết → phải gán lại. Có cách nào tốt hơn không?"*

*Anh Hùng cười: "Em đang làm như ông chủ nhà hàng thuê 100 nhân viên, mỗi người chỉ phục vụ 1 bàn. Khách đổi bàn → nhân viên mất việc → phải thuê lại. Thay vào đó: thuê 1 quản lý ở cửa ra vào. Khách nào cần gì, quản lý tự phân công."*

*"Đó chính là **Event Delegation** — gán event cho element CHA, để cha xử lý tất cả events của con."*

---

#### 🔄 Event Bubbling — Tại sao Delegation hoạt động?

Khi bạn click vào một element, event không chỉ xảy ra ở element đó. Nó **"bong bóng"** lên từ element con → cha → ông → ... → `document`.

```
User click vào nút ❌ trong <li>:

    document          ← 4. Event到达 document
        ↑
    <body>            ← 3. Bong bóng lên body
        ↑
    <ul#todo-list>    ← 2. Bong bóng lên ul (CHA)
        ↑
    <li>              ← 1. Event bắt đầu ở li
        ↑
    <button ❌>       ← 0. User click ĐÂY
```

**Đây là lý do Event Delegation hoạt động:** Khi click vào `<button ❌>`, event cũng chạy trên `<ul>` (cha). Nếu gán listener cho `<ul>`, nó sẽ bắt được click từ BẤT KỲ con nào!

---

#### 🔍 Đối tượng Event `e` — "Bản báo cáo sự kiện"

*Minh hỏi: "Tham số `e` trong `addEventListener('click', (e) => {...})` là gì?"*

*Anh Hùng: "Là **Event Object** — bản báo cáo chi tiết về sự kiện vừa xảy ra. Khi user click, browser tạo ra object này và truyền vào handler. Nó chứa mọi thông tin: click ở đâu, button nào, có nhấn phím gì không..."*

```javascript
list.addEventListener("click", (e) => {
    // ─── CÁC THUỘC TÍNH QUAN TRỌNG CỦA EVENT OBJECT ───

    // 1. e.target — Element THỰC SỰ bị click (element sâu nhất)
    console.log(e.target);
    // Nếu click vào icon <span>❌</span> bên trong <button class="delete-btn">:
    // e.target = <span>❌</span>  (không phải button!)

    // 2. e.currentTarget — Element gắn listener (element CHA)
    console.log(e.currentTarget);
    // e.currentTarget = <ul#todo-list>  (element mà addEventListener gắn vào)

    // 3. e.type — Loại event
    console.log(e.type);  // "click"

    // 4. e.timeStamp — Thời điểm xảy ra (milliseconds)
    console.log(e.timeStamp);  // 1716234567890

    // 5. e.clientX, e.clientY — Tọa độ chuột trên viewport
    console.log(`Chuột ở: (${e.clientX}, ${e.clientY})`);

    // 6. e.pageX, e.pageY — Tọa độ chuột trên trang (bao gồm scroll)
    console.log(`Trên trang: (${e.pageX}, ${e.pageY})`);

    // 7. e.button — Nút chuột nào được click
    // 0 = trái, 1 = giữa, 2 = phải
    console.log(e.button);  // 0 (chuột trái)

    // 8. e.ctrlKey, e.shiftKey, e.altKey, e.metaKey — Phím modifier
    if (e.ctrlKey) console.log("Ctrl + Click!");
    if (e.shiftKey) console.log("Shift + Click!");

    // 9. e.preventDefault() — Ngăn hành vi mặc định
    // (ví dụ: ngăn link navigate, ngăn form submit)

    // 10. e.stopPropagation() — Ngăn event bong bóng lên cha
    // ⚠️ Cẩn thận: phá Event Delegation!
});
```

---

#### 🎯 `e.target` vs `e.currentTarget` — Khác biệt quan trọng

```javascript
// Minh họa trực quan
<ul id="list">                    ← e.currentTarget (element gắn listener)
  <li class="item">
    <button class="delete-btn">
      <span class="icon">❌</span>  ← e.target (element THỰC SỰ click)
    </button>
  </li>
</ul>

// Khi click vào icon ❌:
e.target        // <span class="icon">❌</span>  — element sâu nhất
e.currentTarget // <ul id="list">                — element gắn listener

// 💡 Tại sao phải phân biệt?
// • e.target: biết user click vào đâu (icon? text? button?)
// • e.currentTarget: biết listener gắn ở đâu (luôn là <ul>)
```

**Minh hỏi:** "Nếu em click vào `<button class="delete-btn">` trực tiếp (không phải icon), `e.target` là gì?"

**Anh Hùng:** "Là `<button class="delete-btn">` — vì đó là element sâu nhất mà con trỏ chuột chạm vào. `e.target` luôn là element **gần nhất với con trỏ chuột**, không phải element mà listener gắn vào."

---

#### 🔧 `closest()` — "Tìm element cha gần nhất khớp selector"

*Minh hỏi: "Tại sao code dùng `e.target.closest('.delete-btn')` thay vì `e.target` trực tiếp?"*

*Anh Hùng: "Vì `e.target` có thể là element con sâu (icon, text). Nếu check `e.target.classList.contains('delete-btn')` → không match! `closest()` tìm element gần nhất có class đó, **kể cả chính nó**."*

```javascript
// closest() — Tìm element gần nhất khớp selector (từ element hiện tại → lên cha)

// HTML:
// <ul id="list">
//   <li class="todo-item" data-id="1">
//     <button class="delete-btn">
//       <span class="icon">❌</span>  ← e.target khi click vào đây
//     </button>
//   </li>
// </ul>

// ❌ SAI — e.target có thể là icon, không phải .delete-btn
if (e.target.classList.contains("delete-btn")) {
    // Không match khi click vào icon!
}

// ✅ ĐÚNG — closest() tìm element cha gần nhất có class
const btn = e.target.closest(".delete-btn");
// closest() bắt đầu từ e.target → lên <button class="delete-btn"> → MATCH!
// Nếu click vào <li> (không phải button):
// closest('.delete-btn') = null (không tìm thấy)

// closest() cũng hoạt động với chính element đó
const btn2 = e.target.closest("span.icon");
// Nếu e.target = <span class="icon"> → MATCH với chính nó
```

**Minh hỏi:** "Nếu click vào vùng trống trong `<li>` (không phải button hay text), `closest('.delete-btn')` trả về gì?"

**Anh Hùng:** "`null` — vì không có element nào khớp selector. Đó là lý do code luôn kiểm tra `if (deleteBtn)` trước khi xử lý."

---

#### 📋 Event Object cho các loại event khác nhau

```javascript
// ─── MOUSE EVENTS (click, mousedown, mouseup, mousemove) ───
element.addEventListener("click", (e) => {
    e.clientX, e.clientY    // Tọa độ trên viewport
    e.pageX, e.pageY        // Tọa độ trên trang (bao gồm scroll)
    e.button                // 0=trái, 1=giữa, 2=phải
    e.detail                // Số lần click (1=single, 2=double)
    e.ctrlKey, e.shiftKey   // Phím modifier
});

// ─── KEYBOARD EVENTS (keydown, keyup, keypress) ───
document.addEventListener("keydown", (e) => {
    e.key                   // "Enter", "Escape", "a", "ArrowUp"
    e.code                  // "KeyA", "Enter", "ShiftLeft"
    e.keyCode               // Deprecated nhưng vẫn dùng: 13=Enter, 27=Escape
    e.ctrlKey, e.altKey     // Phím modifier
    e.repeat                // true nếu giữ phím
});

// ─── INPUT EVENTS (input, change, focus, blur) ───
input.addEventListener("input", (e) => {
    e.target.value          // Giá trị hiện tại
    e.inputType             // "insertText", "deleteContentBackward"
    e.data                  // Ký tự vừa nhập (nếu insertText)
});

// ─── FORM EVENTS (submit, reset) ───
form.addEventListener("submit", (e) => {
    e.preventDefault();     // ⚠️ LUÔN cần cho form submit
    e.target                // <form> element
    e.submitter             // Element trigger submit (button, input[type=submit])
});

// ─── TOUCH EVENTS (touchstart, touchmove, touchend) ───
element.addEventListener("touchstart", (e) => {
    e.touches               // Danh sách các điểm chạm
    e.changedTouches        // Điểm chạm thay đổi
    e.touches[0].clientX    // Tọa độ điểm chạm đầu tiên
});
```

---

#### 💡 Pattern: `e.target.closest()` với Event Delegation

```javascript
// Pattern phổ biến: 1 listener xử lý nhiều actions
list.addEventListener("click", (e) => {
    // Bước 1: Tìm element cha gần nhất có data-id
    const todoItem = e.target.closest("[data-id]");
    if (!todoItem) return;  // Click vào vùng trống → bỏ qua

    const id = Number(todoItem.dataset.id);

    // Bước 2: Xác định action dựa trên element được click
    const deleteBtn = e.target.closest(".delete-btn");
    const checkBtn = e.target.closest(".check-btn");
    const editBtn = e.target.closest(".edit-btn");

    if (deleteBtn) {
        // Click vào nút ❌
        todos = todos.filter(t => t.id !== id);
    } else if (checkBtn) {
        // Click vào checkbox
        todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    } else if (editBtn) {
        // Click vào nút sửa
        openEditModal(id);
    } else {
        // Click vào text hoặc vùng khác trong <li>
        toggleTodo(id);
    }

    render();
});

// ✅ Tại sao dùng closest() thay vì e.target trực tiếp?
// • e.target = element sâu nhất (icon, text, span)
// • closest() = element cha gần nhất có class/selector
// • closest() trả về null nếu không tìm thấy → dễ kiểm tra
// • closest() bắt đầu từ chính element → hoạt động cả khi click trực tiếp
```

---

#### ❌ Cách kém — Gán event cho từng item

```javascript
// ❌ CÁCH KÉM — Gán event cho từng item
document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", handleDelete);
});

// Vấn đề:
// 1. 50 todos = 50 event listeners (tốn memory)
// 2. Render lại list → MẤT hết listeners
// 3. Thêm todo mới → phải gán lại listener cho nút mới
// 4. Nếu quên gán → nút không hoạt động
```

#### 🔍 "Render lại list" là gì? Tại sao MẤT hết listeners?

**Render lại list** = gán lại `innerHTML` cho element cha. Đây là cách phổ biến nhất để cập nhật UI khi data thay đổi:

```javascript
// Khi user thêm todo mới → render lại toàn bộ list
function render() {
    list.innerHTML = todos.map(todo => `
        <li class="todo-item">
            <span>${todo.text}</span>
            <button class="delete-btn">❌</button>
        </li>
    `).join("");
}
```

**Tại sao mất listeners?** Vì `innerHTML` **PHÁ HỦY toàn bộ DOM cũ** và **TẠO MỚI** từ HTML string:

```
TRƯỚC KHI render lại:                    SAU KHI render lại:

<ul#list>                                 <ul#list>  ← VẪN CÙNG element <ul>
  └── <li> ← element CŨ                   └── <li> ← element MỚI (khác!)
        └── <button❌> ← có listener             └── <button❌> ← KHÔNG có listener
                                                (vì đây là element mới, tạo từ HTML string)
```

**Minh hỏi:** "Vậy listener cũ ở đâu?"

**Anh Hùng:** "Biến mất! Khi `innerHTML` gán giá trị mới, browser **xóa toàn bộ node con cũ** trong bộ nhớ. Các element cũ (kèm listener) bị garbage collected. Element mới tạo ra từ HTML string — listener không tự động 'chuyển' sang."

```javascript
// Minh họa: render lại = phá hủy + tạo mới
const btn1 = document.querySelector(".delete-btn");  // Element cũ
btn1.addEventListener("click", handleDelete);         // Gán listener

list.innerHTML = "<button class='delete-btn'>❌</button>";  // PHÁ HỦY btn1, tạo btn2

const btn2 = document.querySelector(".delete-btn");  // Element MỚI
console.log(btn1 === btn2);  // false — KHÁC element!

// btn1 đã bị xóa khỏi DOM, listener cũng mất
// btn2 là element mới, không có listener → click không hoạt động!
```

**Kết luận:** Nếu dùng `innerHTML` để render, **KHÔNG THỂ** gán listener cho từng element con — vì mỗi lần render, element cũ bị phá hủy. Phải dùng **Event Delegation** (gán cho cha) hoặc gán lại listener sau mỗi lần render.

---

#### ✅ Cách tốt — Event Delegation (gán 1 lần cho cha)

```javascript
// ✅ CÁCH TỐT — Event delegation (gán 1 lần cho cha)
const list = document.querySelector("#todo-list");

// Gán 1 lần duy nhất cho <ul> — cha của tất cả <li>
list.addEventListener("click", (e) => {
    // e.target = element THỰC SỰ được click (có thể là icon, text, button...)
    // closest() = tìm element gần nhất khớp selector (kể cả chính nó)

    const deleteBtn = e.target.closest(".delete-btn");
    const todoText = e.target.closest(".todo-text");
    const checkbox = e.target.closest(".check-btn");

    if (deleteBtn) {
        // Click vào nút ❌
        const id = deleteBtn.dataset.id;
        deleteTodo(Number(id));
    }

    if (todoText) {
        // Click vào text todo
        const id = todoText.closest("[data-id]").dataset.id;
        toggleTodo(Number(id));
    }

    if (checkbox) {
        // Click vào checkbox
        const id = checkbox.dataset.id;
        toggleTodo(Number(id));
    }
});

// ✅ Lợi ích:
// 1. CHỈ 1 event listener (tiết kiệm memory)
// 2. Render lại list → listener vẫn hoạt động (không mất)
// 3. Thêm todo mới → tự động hoạt động (không cần gán thêm)
// 4. Code tập trung 1 chỗ → dễ maintain
```

**Hình dung:** Như ông chủ nhà hàng thuê 1 quản lý ở cửa ra vào. Khách nào cần gì, quản lý tự phân công. Khách mới đến → quản lý tự xử lý. Không cần thuê thêm nhân viên.

---

#### 🔍 `e.target` vs `e.currentTarget` — Hiểu sai phổ biến

```javascript
list.addEventListener("click", (e) => {
    console.log("e.target:", e.target);           // Element THỰC SỰ click (button, span, icon...)
    console.log("e.currentTarget:", e.currentTarget); // Element gắn listener (<ul>)

    // ⚠️ e.target có thể là element CON SÂU NHẤT
    // Nếu click vào icon <span>❌</span> bên trong button:
    // e.target = <span>❌</span>  (không phải button!)
    // → Dùng closest() để tìm element cha đúng ý
});
```

**Minh hỏi:** "Nếu em click vào icon ❌ bên trong button, `e.target` là icon hay button?"

**Anh Hùng:** "Là icon — element sâu nhất mà con trỏ chuột chạm vào. Đó là lý do ta dùng `closest('.delete-btn')` — nó tìm element gần nhất có class `.delete-btn`, kể cả element cha. Không có `closest()` → phải kiểm tra `e.target.parentElement` rất rối."

---

#### 🎯 Khi nào dùng Event Delegation?

| Tình huống | Dùng Delegation? | Lý do |
|---|---|---|
| List items thêm/xóa động (Todo, cart, search results) | ✅ BẮT BUỘC | Items render lại → mất listeners nếu gán từng cái |
| Table với hàng trăm dòng | ✅ NÊN | Tiết kiệm memory, performance tốt hơn |
| Form tĩnh với vài input | ❌ KHÔNG CẦN | Elements không thay đổi, gán trực tiếp đơn giản hơn |
| Nested menus (dropdown lồng nhau) | ✅ NÊN | Quản lý event phức tạp dễ hơn với delegation |
| Event cần chặn propagation | ⚠️ CẨN THẬN | `e.stopPropagation()` sẽ phá delegation |

---

#### 💪 Pattern thực tế — Event Delegation với nhiều actions

```javascript
// Todo App — 1 listener xử lý TẤT CẢ actions
const list = document.querySelector("#todo-list");

list.addEventListener("click", (e) => {
    const todoItem = e.target.closest("[data-id]");
    if (!todoItem) return;  // Click vào vùng trống → bỏ qua

    const id = Number(todoItem.dataset.id);

    // Phân loại action dựa trên element được click
    switch (true) {
        case e.target.closest(".delete-btn"):
            todos = todos.filter(t => t.id !== id);
            break;

        case e.target.closest(".check-btn"):
            todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
            break;

        case e.target.closest(".edit-btn"):
            openEditModal(id);
            break;

        case e.target.closest(".todo-text"):
            toggleTodo(id);
            break;
    }

    render();
});

// ✅ 1 listener xử lý 4 actions khác nhau
// ✅ Thêm action mới → chỉ thêm case, không cần gán listener mới
```

---

#### 🐛 Debug Event Delegation — Khi nào nó không hoạt động?

```javascript
// ❌ LỖI 1: Quên closest() — e.target có thể là element con sâu
list.addEventListener("click", (e) => {
    // e.target = <span class="icon">❌</span>  (không phải .delete-btn!)
    if (e.target.classList.contains("delete-btn")) {  // ❌ Không match!
        // Không bao giờ chạy
    }
});

// ✅ SỬA: Dùng closest()
if (e.target.closest(".delete-btn")) {  // ✅ Tìm element cha có class
    // Hoạt động đúng
}

// ❌ LỖI 2: stopPropagation() phá delegation
deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();  // ❌ Ngăn event bong bóng lên cha
    // → Listener trên <ul> KHÔNG BAO GIỜ nhận được event này
});

// ❌ LỖI 3: Gán listener trước khi element tồn tại
const list = document.querySelector("#todo-list");  // null nếu script chạy trước DOM
list.addEventListener("click", handler);  // ❌ TypeError: Cannot read properties of null

// ✅ SỬA: Đảm bảo DOM đã load
document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("#todo-list");
    list.addEventListener("click", handler);
});
// Hoặc: đặt <script> cuối </body>
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

## 9b. 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Cannot read properties of null` | `querySelector` trả về null — element chưa render | Đảm bảo script chạy SAU khi DOM parse xong (script cuối body hoặc `defer`) |
| `getElementById` trả về `null` | Sai ID hoặc element chưa tồn tại | Kiểm tra: `console.log(document.getElementById("myId"))` |
| `classList.add` không生效 | Element bị ẩn (display:none) hoặc CSS specificity quá thấp | Kiểm tra DevTools → Elements → xem class đã được thêm chưa |
| Event không hoạt động | Sai event name (`onClick` → `click`) hoặc element chưa tồn tại | Dùng lowercase: `click`, `submit`, `input`. Kiểm tra element tồn tại |
| `innerHTML` bị XSS | Chèn user input trực tiếp vào `innerHTML` | Dùng `textContent` cho text thuần. Sanitize HTML nếu cần |
| Event listener chạy nhiều lần | Thêm listener trong loop mà không remove cũ | Dùng `removeEventListener` hoặc `{ once: true }` |

---

## 10. ➡️ Next Lesson Bridge

*"Todo App hoạt động real-time! Thêm, xóa, tick hoàn thành — không cần reload!" Minh hào hứng.*

*"Nhưng refresh trang → mất hết todos. Và trang thời tiết mình muốn làm — cần lấy data từ server, không phải code cứng."*

*"Đó là hai vấn đề quan trọng," anh Hùng nói. "localStorage cho persistence. Fetch API cho external data. Cả hai dùng cơ chế Asynchronous JavaScript."*

**→ [Bài 20: AJAX & Async](./20_ajax_async.md) — Fetch API, async/await, và cách xử lý loading/error states như app production.**
