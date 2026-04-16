# 🟨 PART III - CHƯƠNG 19
# **DOM MANIPULATION — JavaScript Giao Tiếp Với HTML**

## 🎬 "Bấm Nút → Todo Xuất Hiện" — Khoảnh khắc WOW đầu tiên

*Minh hoàn thành Todo App logic trong console. Nhưng user không dùng console.*

*Anh cần: Gõ text vào input → Bấm nút "Thêm" → Todo hiện ra trên trang web. Real-time.*

*Anh Hùng: "Đó là DOM Manipulation — JavaScript đọc, sửa, thêm, xóa HTML elements. JS nói chuyện với HTML thông qua DOM."*

---

## 🎯 Mục tiêu
- Hiểu DOM là gì
- Chọn elements (querySelector)
- Sửa nội dung, style, attributes
- Thêm/xóa elements
- Event handling (click, submit, input)

---

## 🌳 DOM là gì? — "Cây gia đình HTML"

**DOM (Document Object Model)** = Browser đọc HTML → tạo cây đối tượng → JS truy cập cây này.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        ├── form
        │   ├── input
        │   └── button
        └── ul
            ├── li
            └── li
```

---

## 🎯 Chọn Elements

```javascript
// ⭐ querySelector — Chọn 1 element (CSS selector)
const title = document.querySelector("h1");
const btn = document.querySelector("#addBtn");
const firstTodo = document.querySelector(".todo-item");

// querySelectorAll — Chọn TẤT CẢ
const allTodos = document.querySelectorAll(".todo-item");
allTodos.forEach(todo => console.log(todo.textContent));

// Cách cũ (vẫn hoạt động)
document.getElementById("addBtn");
document.getElementsByClassName("todo-item");
```

---

## ✏️ Sửa Elements

```javascript
const title = document.querySelector("h1");

// Sửa text
title.textContent = "📝 Todo App";        // Text thuần
title.innerHTML = "<em>Todo</em> App";     // ⚠️ Có HTML (cẩn thận XSS)

// Sửa style
title.style.color = "#2563eb";
title.style.fontSize = "32px";

// Sửa class
title.classList.add("active");
title.classList.remove("hidden");
title.classList.toggle("dark-mode");       // Thêm/xóa toggle

// Sửa attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://google.com");
link.getAttribute("href");
```

---

## ➕ Thêm & Xóa Elements

```javascript
// Tạo element mới
const li = document.createElement("li");
li.textContent = "Todo mới!";
li.classList.add("todo-item");

// Thêm vào DOM
const list = document.querySelector("#todoList");
list.appendChild(li);                      // Thêm cuối
list.prepend(li);                          // Thêm đầu

// Xóa element
li.remove();                               // Xóa chính nó
list.removeChild(li);                       // Cha xóa con
```

---

## 🎪 Events — "Lắng nghe hành động user"

```javascript
// Click
const btn = document.querySelector("#addBtn");
btn.addEventListener("click", () => {
    console.log("Nút được click!");
});

// Submit form (⚠️ preventDefault!)
const form = document.querySelector("#todoForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();                    // Ngăn reload trang
    const input = document.querySelector("#todoInput");
    addTodo(input.value);
    input.value = "";                      // Clear input
});

// Input real-time
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e) => {
    filterTodos(e.target.value);           // Lọc khi gõ
});

// Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "Enter" && e.ctrlKey) submitForm();
});
```

---

## 🎯 Thực hành: Todo App hoàn chỉnh

```javascript
// Todo App - DOM Manipulation
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!input.value.trim()) return;     // Không thêm todo trống
    
    // Tạo todo element
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${input.value}</span>
        <button class="delete-btn">❌</button>
    `;
    
    // Click vào text → toggle completed
    li.querySelector("span").addEventListener("click", () => {
        li.classList.toggle("completed");
    });
    
    // Click nút xóa → remove
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
    });
    
    list.appendChild(li);
    input.value = "";
    input.focus();
});
```

*Minh chạy code. Gõ "Học DOM" → Click "Thêm" → Todo hiện ra trên trang! Click lần nữa → gạch ngang! Click ❌ → biến mất!*

*"ĐÂY MỚI LÀ WEB APP!" Minh hào hứng.* 🎉

---

## ➡️ Chương tiếp theo...

*Todo App hoạt động. Nhưng refresh trang → mất hết todos. "Mình cần lưu data ở đâu đó," Minh nghĩ.*

*Và khi muốn lấy dữ liệu từ server: danh sách sản phẩm, thông tin user... Minh cần gọi API.*

**Chương tiếp theo:** AJAX & Async — Gọi API, fetch data, xử lý bất đồng bộ.
