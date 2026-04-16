# 🟨 PART II - CHƯƠNG 01
# **JAVASCRIPT BASICS — INTRODUCTION**

## 🎬 "Nút Bấm Không Làm Gì Hết" — Khi HTML/CSS chưa đủ

*Minh hoàn thành Todo App: form đẹp, layout responsive, CSS animations. Nhưng...*

*Nhấn nút "Thêm công việc" → không có gì xảy ra.*

*Gõ text vào ô → nhấn Enter → không có gì xảy ra.*

*"Trang web đẹp nhưng... chết," Minh nói. "Giống showroom xe: đẹp lung linh nhưng không chạy được."*

> **Anh Hùng:** *"Đó là vì em chưa có ENGINE. HTML = khung xe. CSS = sơn và nội thất. JavaScript = ĐỘNG CƠ. Không có JS, website chỉ là poster."*

---

## 🎯 Mục tiêu
- Hiểu JavaScript là gì và vai trò trong web
- Chạy code JS đầu tiên
- Console — công cụ debug quan trọng nhất
- Cách thêm JS vào HTML

---

## ⚡ JavaScript = Động cơ của Web

| Không có JS | Có JS |
|---|---|
| Nút bấm không phản hồi | Click → thêm todo vào list |
| Form submit reload trang | Validate real-time, submit AJAX |
| Nội dung cố định | Load dynamic data từ API |
| Không animation phức tạp | Carousel, modal, drag-and-drop |

### JavaScript ở đâu?

```
Frontend (Browser):  React, Vue, Angular → UI tương tác
Backend (Server):    Node.js, Express → API, Database  
Mobile:             React Native → App iOS/Android
Desktop:            Electron → VS Code, Discord, Slack
```

> 💡 **Fun fact:** JavaScript là ngôn ngữ DUY NHẤT chạy trên browser. Bạn có thể không học Python, Java — nhưng nếu làm web, BẮT BUỘC phải biết JavaScript.

---

## 🚀 Code JS đầu tiên

### Cách 1: Console trong browser (thử nhanh)

**F12 → Tab Console → Gõ:**

```javascript
console.log("Hello, World!");       // → Hello, World!
alert("Xin chào!");                  // → Popup hiện ra
document.title = "Todo App";         // → Đổi title tab ngay lập tức!
```

### Cách 2: Script trong HTML

```html
<!-- Cuối <body> — CHUẨN NHẤT -->
<body>
    <h1>Todo App</h1>
    <script src="app.js"></script>    <!-- File JS riêng ✅ -->
</body>
```

```javascript
// app.js
console.log("App loaded!");
document.querySelector("h1").textContent = "📝 Todo App";
```

> ⚠️ **`<script>` đặt cuối `<body>`** — để HTML load xong trước khi JS chạy. Đặt trong `<head>` mà không có `defer` → JS chạy trước khi DOM sẵn sàng → lỗi!

---

## 🔧 Console — "Stethoscope" của Developer

```javascript
console.log("Info bình thường");          // Thông tin
console.warn("Cảnh báo!");                // Cảnh báo (vàng)
console.error("Lỗi nghiêm trọng!");      // Lỗi (đỏ)
console.table([                           // Bảng (đẹp!)
    { name: "Minh", age: 21 },
    { name: "Linh", age: 20 }
]);
```

*Minh gõ `console.table` lần đầu: "Wow, hiện bảng đẹp trong console! Debug dễ hơn nhiều!"*

---

## ➡️ Chương tiếp theo...

*JS chạy rồi. Nhưng Minh cần lưu tên todo, đếm số lượng, tính thời gian. Anh cần biến, kiểu dữ liệu, và cách dùng chúng.*

**Chương tiếp theo:** Getting Started — Variables, Data Types, Operators.
