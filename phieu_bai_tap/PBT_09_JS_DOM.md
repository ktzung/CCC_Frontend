# 📋 PHIẾU BÀI TẬP 09
# **DOM MANIPULATION & EVENTS**

> **Tài liệu tham chiếu:** `tuan_5_javascript_dom_async/19_dom_manipulation.md`
>
> ⏱️ **Thời gian:** 180 phút | 📊 **Tổng điểm:** 100
>
> ⚠️ **Phiếu này 100% thực hành trên Browser** — Mỗi bài tập là 1 mini-app hoạt động được

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

Cho HTML:

```html
<div id="app">
    <header>
        <h1>Todo App</h1>
        <nav>
            <a href="#" class="active">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
        </nav>
    </header>
    <main>
        <form id="todoForm">
            <input id="todoInput" type="text">
            <button type="submit">Add</button>
        </form>
        <ul id="todoList">
            <li class="todo-item">Learn HTML</li>
            <li class="todo-item completed">Learn CSS</li>
        </ul>
    </main>
</div>
```

1. Vẽ DOM tree (sơ đồ cây) cho HTML trên
2. Viết **querySelector** cho mỗi yêu cầu:
   - Chọn thẻ `<h1>`
   - Chọn input trong form
   - Chọn tất cả `.todo-item`
   - Chọn link đang active
   - Chọn `<li>` đầu tiên trong `#todoList`
   - Chọn tất cả `<a>` bên trong `<nav>`

### Câu A2 (5đ) — innerHTML vs textContent

Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái. 

**Câu hỏi bảo mật:** Tại sao `innerHTML` có thể gây lỗ hổng **XSS**? Viết 1 ví dụ code minh họa:

```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Sửa thế nào?
```

### Câu A3 (5đ) — Event Bubbling

Không chạy code, dự đoán thứ tự console.log:

```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // e.stopPropagation();  ← nếu bỏ comment → output thay đổi thế nào?
});
```

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

Khi click vào button, output = ???. Nếu uncomment `stopPropagation()`, output = ???

---

## PHẦN B — THỰC HÀNH CODE (70 điểm)

> ⚠️ **KHÔNG DÙNG** bất kỳ thư viện/framework nào (jQuery, React...). **CHỈ** Vanilla JavaScript.
> Mỗi bài tạo folder riêng với `index.html` + `style.css` + `app.js`

### Bài B1 (20đ) — Todo App hoàn chỉnh

Tạo folder `todo_app/`:

**Chức năng bắt buộc:**

- [ ] **Thêm todo:** Gõ text + Enter hoặc click nút → Todo xuất hiện trong list
- [ ] **Xóa todo:** Click nút ❌ → Todo biến mất
- [ ] **Toggle completed:** Click vào text → Gạch ngang (toggle class `completed`)
- [ ] **Đếm:** Hiển thị "X items left" (chỉ đếm chưa completed)
- [ ] **Filter:** 3 nút "All / Active / Completed" → lọc hiển thị
- [ ] **Clear completed:** Nút xóa tất cả todo đã completed
- [ ] **Edit todo:** Double-click vào todo → đổi thành input → Enter để save
- [ ] **LocalStorage:** Lưu todos → Refresh trang vẫn còn

**Yêu cầu code:**
- [ ] Dùng `addEventListener` (KHÔNG dùng `onclick` inline)
- [ ] Dùng `createElement` để tạo elements (KHÔNG dùng `innerHTML` cho todo items)
- [ ] Event Delegation: Bind events lên `#todoList`, KHÔNG bind lên từng `<li>`
- [ ] CSS: Styled đẹp (font, colors, transitions khi toggle)

**Chấm điểm:**
- 5đ: CRUD (Add, Delete, Toggle, Edit)
- 5đ: Filter + Count
- 5đ: LocalStorage persistence
- 5đ: Event Delegation + clean code

### Bài B2 (20đ) — Interactive Product Catalog

Tạo folder `product_catalog/`:

Xây dựng trang danh sách sản phẩm **tương tác hoàn toàn bằng DOM**:

**Dữ liệu sản phẩm:** (Khai báo trong JS, KHÔNG hardcode HTML)

```javascript
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    // ... thêm ít nhất 12 sản phẩm 4 categories
];
```

**Chức năng:**

- [ ] **Render products:** Từ array JS → Tạo HTML cards bằng `createElement` → Append vào DOM
- [ ] **Search realtime:** Gõ vào ô search → Lọc sản phẩm ngay lập tức (dùng event `input`)
- [ ] **Filter by category:** Click buttons category → Chỉ hiển thị category đó
- [ ] **Sort:** Dropdown sort by: Giá tăng, Giá giảm, Tên A-Z, Đánh giá cao nhất
- [ ] **Card click → Modal:** Click sản phẩm → Hiện modal chi tiết (tạo modal bằng JS)
- [ ] **Add to cart badge:** Click "Thêm giỏ" → Icon giỏ hàng góc phải hiện badge số lượng
- [ ] **Dark mode toggle:** Nút toggle dark/light mode (thêm/xóa class `dark-mode` trên `<body>`)

**Yêu cầu kỹ thuật:**
- 100% content render bằng JavaScript — HTML body ban đầu gần như trống
- Tách functions rõ ràng: `renderProducts()`, `filterByCategory()`, `searchProducts()`, `sortProducts()`

### Bài B3 (15đ) — Form Validator

Tạo folder `form_validator/`:

Xây dựng hệ thống validate form **real-time** bằng JavaScript:

**Form đăng ký** với validation khi user gõ (event `input`):

- [ ] **Tên** (2-50 ký tự): Hiện ✅ hoặc ❌ ngay khi gõ
- [ ] **Email** (regex validate): Hiện thông báo lỗi cụ thể bên dưới input
- [ ] **Password strength meter:**
  - Yếu (đỏ): < 8 ký tự
  - Trung bình (vàng): 8+ ký tự, có chữ + số
  - Mạnh (xanh): 8+ ký tự, có chữ hoa + thường + số + ký tự đặc biệt
  - Hiện thanh progress bar đổi màu theo strength
- [ ] **Confirm password:** Real-time check khớp với password
- [ ] **Phone** (10 chữ số): Tự thêm dấu gạch khi gõ: `0901-234-567`
- [ ] **Nút Submit:** Disabled cho đến khi tất cả fields valid. Khi submit, hiện modal "Đăng ký thành công!" với thông tin đã nhập

### Bài B4 (15đ) — Keyboard Shortcuts & Accessibility

Tạo folder `keyboard_app/`:

Xây app nhỏ có **keyboard navigation hoàn chỉnh**:

- [ ] **Gallery ảnh:** 
  - Mũi tên ← → để chuyển ảnh
  - Số 1-9 để nhảy đến ảnh tương ứng
  - Space để play/pause slideshow tự động
  - Escape để đóng modal

- [ ] **Command palette:** 
  - `Ctrl+K` mở ô tìm kiếm overlay (giống VS Code)
  - Gõ keyword → hiện danh sách commands
  - Enter để chọn, Escape để đóng

- [ ] **Focus management:**
  - Tab để di chuyển qua các elements
  - Focus ring visible
  - Aria labels trên tất cả interactive elements

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

Tìm và sửa **tất cả lỗi** (ít nhất 7 lỗi):

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("onclick", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay = count;
    historyList.innerHTML = null;
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove;
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```

### Câu C2 (7đ) — Performance

1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là **BAD PRACTICE**? Event Delegation giải quyết thế nào?

2. Cho code:
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
```
Refactor dùng `DocumentFragment` để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 10-15 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Mini Todo App từ Zero bằng DOM"

**Yêu cầu:** Quay video tạo Todo App cơ bản hoàn chỉnh (Add + Delete + Toggle) từ đầu.

**Trong video, bạn phải:**

1. 🎤 Tạo HTML skeleton: form + input + button + ul (empty)
2. 🎤 Viết JS: `document.querySelector` cho form, input, list — giải thích mỗi selector
3. 🎤 `form.addEventListener("submit", ...)` — giải thích:
   - Tại sao dùng `submit` event thay vì `click` trên button?
   - `e.preventDefault()` — nếu không có thì sao? Demo TRƯỚC khi thêm → trang reload
4. 🎤 `document.createElement("li")` + `appendChild` — giải thích tạo DOM node
5. 🎤 Thêm nút ❌ xóa: Bind event trên nút → `li.remove()` — giải thích
6. 🎤 Toggle completed: Click vào text → `classList.toggle("completed")` — giải thích toggle
7. 🎤 Demo cuối: Thêm 3 todos → Toggle 1 → Xóa 1 → Show kết quả
8. 🎤 Giải thích: Tại sao dùng `createElement` thay vì `innerHTML`? (XSS risk)

**Code mẫu cần thực hiện:**

```javascript
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    
    const li = document.createElement("li");
    li.textContent = input.value;
    
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => li.remove());
    li.appendChild(deleteBtn);
    
    list.appendChild(li);
    input.value = "";
    input.focus();
});
```

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ code từng dòng HTML → CSS → JS
- [ ] Demo: preventDefault trước/sau, thêm/xóa/toggle todo
- [ ] Cuối video: Tổng kết DOM Manipulation flow

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] Folder `todo_app/` — Bài B1 (index.html + style.css + app.js)
- [ ] Folder `product_catalog/` — Bài B2
- [ ] Folder `form_validator/` — Bài B3
- [ ] Folder `keyboard_app/` — Bài B4
- [ ] Folder `screenshots/` — mỗi app ít nhất 2 screenshots
- [ ] 🎬 **Video OBS** — `videos/PBT09_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] **Video demo** (khuyến khích): Quay màn hình 30s mỗi app đang hoạt động
- [ ] Ít nhất **5 commits** (1 commit/bài ≠ dồn commit)
