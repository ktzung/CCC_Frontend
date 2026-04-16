# 🟨 PART III - CHƯƠNG 20
# **AJAX & ASYNC — Gọi API Từ Frontend**

## 🎬 "Trang Thời Tiết" — Từ Data Cứng Đến Data Live

*Minh muốn thêm widget thời tiết vào Todo App. Nhưng nhiệt độ thay đổi mỗi giờ — không thể code cứng `27°C` vào HTML.*

*"Em cần GỌI API," anh Hùng nói. "Frontend gửi request đến server, server trả về data JSON, frontend hiển thị. Đây gọi là AJAX — trang web cập nhật MÀ KHÔNG RELOAD."*

---

## 🎯 Mục tiêu
- Hiểu Synchronous vs Asynchronous
- Fetch API — cách gọi API chuẩn hiện đại
- Async/Await — cú pháp đẹp nhất
- Xử lý loading, error states

---

## ⏳ Sync vs Async — "Xếp hàng vs Đặt số"

```
Synchronous (Đồng bộ):
Bước 1 → Chờ xong → Bước 2 → Chờ xong → Bước 3
"Xếp hàng: phải chờ người trước xong mới đến lượt"

Asynchronous (Bất đồng bộ):
Bước 1 → Bước 2 → Bước 3
    ↳ Kết quả về sau →  →  → Xử lý khi xong
"Đặt số: gọi xong làm việc khác, có kết quả thì báo"
```

---

## 🌐 Fetch API — Gọi API chuẩn hiện đại

### Cách 1: Fetch + .then() (callback-based)

```javascript
fetch("https://api.weatherapi.com/v1/current.json?key=xxx&q=Hanoi")
    .then(response => response.json())            // Parse JSON
    .then(data => {
        console.log(`Hà Nội: ${data.current.temp_c}°C`);
    })
    .catch(error => {
        console.error("Lỗi:", error);
    });
```

### Cách 2: Async/Await ⭐ (đọc dễ hơn — KHUYÊN DÙNG)

```javascript
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=xxx&q=${city}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.current.temp_c;
    } catch (error) {
        console.error("Không lấy được thời tiết:", error);
        return null;
    }
}

// Sử dụng
const temp = await getWeather("Hanoi");
console.log(`Hà Nội: ${temp}°C`);
```

---

## 📊 Gọi API CRUD cho Todo App

```javascript
const API = "https://jsonplaceholder.typicode.com/todos";

// GET — Lấy danh sách todos
async function getTodos() {
    const res = await fetch(API);
    const todos = await res.json();
    return todos.slice(0, 10);           // Lấy 10 todos đầu
}

// POST — Thêm todo mới
async function addTodo(title) {
    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false })
    });
    return await res.json();
}

// DELETE — Xóa todo
async function deleteTodo(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
}

// PATCH — Cập nhật todo
async function toggleTodo(id, completed) {
    const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    });
    return await res.json();
}
```

---

## ⏳ Loading & Error States

```javascript
async function renderTodos() {
    const list = document.querySelector("#todoList");
    
    // Loading state
    list.innerHTML = '<li class="loading">⏳ Đang tải...</li>';
    
    try {
        const todos = await getTodos();
        
        if (todos.length === 0) {
            list.innerHTML = '<li class="empty">Chưa có todo nào</li>';
            return;
        }
        
        list.innerHTML = todos.map(todo => `
            <li class="${todo.completed ? 'completed' : ''}">
                ${todo.title}
            </li>
        `).join("");
        
    } catch (error) {
        list.innerHTML = '<li class="error">❌ Lỗi tải dữ liệu. Thử lại sau.</li>';
    }
}
```

> **Anh Hùng:** *"App chuyên nghiệp LUÔN có 3 states: Loading, Success, Error. Thiếu 1 trong 3 = UX tệ."*

---

## ➡️ Chương tiếp theo...

*"Todo App hoạt động, gọi API, hiển thị data!" Minh hào hứng. "Nhưng code đang lộn xộn — HTML lẫn JS lẫn CSS. Dự án lớn thì quản lý thế nào?"*

**Chương tiếp theo:** Professional Development Process — Module, Webpack, Git workflow, và cách tổ chức dự án thực tế.
