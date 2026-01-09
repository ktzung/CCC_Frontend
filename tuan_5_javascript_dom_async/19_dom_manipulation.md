# 🟨 PART II - CHƯƠNG 19
# **CHANGING WEB PAGES DYNAMICALLY (DOM)**

JavaScript rất hay, nhưng nếu nó chỉ chạy ngầm trong Console thì vô dụng. Sức mạnh thực sự của JS là khả năng **thao tác trực tiếp lên trang Web**: thay đổi chữ, đổi màu, thêm ảnh, xóa nút bấm... Cơ chế đó gọi là **DOM**.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu **DOM Tree** là gì.
- Biết cách **chọn phần tử** (Select) bằng `querySelector`.
- Biết cách **thay đổi nội dung/Style** của phần tử.
- Biết cách **bắt sự kiện** (Event Listener) như click, gõ phím.

---

# 1. **DOM LÀ GÌ? (DOCUMENT OBJECT MODEL)**

Khi trình duyệt tải trang HTML, nó sẽ vẽ ra một cây gia phả gọi là DOM Tree:
- `document`: Gốc của cây (Toàn bộ trang web).
- `html` -> `body` -> `h1`, `div`, `p`...

JavaScript dùng `document` object để chọc vào cây này.

---

# 2. **ACCESSING DOM ELEMENTS (CHỌN PHẦN TỬ)**

Có nhiều cách chọn, nhưng đây là những cách hiện đại nhất.

## 2.1. `querySelector` (Chọn 1 cái đầu tiên)
Dùng selector giống hệt CSS!
```javascript
const title = document.querySelector('h1'); // Chọn thẻ h1
const btn = document.querySelector('.btn-primary'); // Chọn class .btn-primary
const header = document.querySelector('#main-header'); // Chọn id #main-header
```

## 2.2. `querySelectorAll` (Chọn tất cả)
Trả về 1 danh sách (NodeList).
```javascript
const allItems = document.querySelectorAll('li'); 
// Chọn tất cả thẻ li
```

---

# 3. **MODIFYING CONTENT & STYLES (THAY ĐỔI NỘI DUNG)**

Sau khi chọn xong, ta làm gì với nó?

## 3.1. Thay đổi nội dung
- `.textContent`: Lấy/Sửa văn bản thuần (An toàn, nhanh).
- `.innerHTML`: Lấy/Sửa cả HTML bên trong (Mạnh nhưng coi chừng bảo mật XSS).

```javascript
const h1 = document.querySelector('h1');
h1.textContent = "Xin chào Javascript!"; // Đổi chữ
```

## 3.2. Thay đổi Style
Chọc vào `.style`. Lưu ý tên thuộc tính đổi sang **camelCase** (`background-color` -> `backgroundColor`).

```javascript
const box = document.querySelector('.box');
box.style.backgroundColor = "red";
box.style.fontSize = "20px";
box.style.display = "none"; // Ẩn đi
```

## 3.3. Thay đổi Class (Best Practice)
Thay vì sửa style thủ công, hãy thêm/xóa class CSS.
```javascript
box.classList.add('active'); // Thêm class
box.classList.remove('hidden'); // Xóa class
box.classList.toggle('dark-mode'); // Bật/Tắt
```

---

# 4. **HANDLING EVENTS (BẮT SỰ KIỆN)**

Làm sao để biết khi nào người dùng click chuột?

## `addEventListener` (Tai nghe sự kiện)

```javascript
const btn = document.querySelector('button');

btn.addEventListener('click', function() {
  alert("Bạn vừa bấm nút!");
  
  // Đổi màu nền body
  document.body.style.backgroundColor = "gold";
});
```

Các sự kiện phổ biến:
- `click`: Bấm chuột.
- `submit`: Gửi form.
- `keydown` / `keyup`: Gõ phím.
- `mouseenter` / `mouseleave`: Di chuột vào/ra.

---

# 5. **TỔNG KẾT**

Quy trình làm việc chuẩn với DOM:
1.  **Select:** `document.querySelector('...')` để tìm phần tử.
2.  **Listen:** `.addEventListener(...)` để đợi hành động.
3.  **Manipulate:** Thay đổi `.textContent`, `.style`, hoặc `.classList` để phản hồi.

---

**Chương tiếp theo:** Làm việc với Server và dữ liệu bên ngoài (Ajax & Async).
