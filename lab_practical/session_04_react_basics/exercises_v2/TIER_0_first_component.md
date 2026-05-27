# Tier 0 — Component đầu tiên (Làm quen cú pháp React)

> **Thời gian:** 15-20 phút  
> **Mục tiêu:** Viết component React đầu tiên, hiểu luồng hoạt động cơ bản  
> **Không cần biết:** useState, events, props — chỉ cần biết HTML/JS cơ bản

---

## 🎯 Hôm nay bạn sẽ học

```
HTML thuần:   <h1>Xin chào</h1>
React:        return <h1>Xin chào</h1>   ← Giống nhau đến 90%!
```

---

## 📝 Bài 0.1 — Chạy React đầu tiên (5 phút)

### Bước 1: Tạo project
```bash
npm create vite@latest hello-react -- --template react
cd hello-react
npm install
npm run dev
```

### Bước 2: Xem file `src/App.jsx`
```jsx
// Đây là một React Component
function App() {
    return (
        <div>
            <h1>Xin chào React!</h1>
            <p>Đây là component đầu tiên của bạn</p>
        </div>
    );
}

export default App;
```

### Bước 3: Thử sửa nội dung
```jsx
function App() {
    return (
        <div>
            <h1>Tên của bạn ở đây</h1>
            <p>Hôm nay là ngày đẹp trời</p>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
            </ul>
        </div>
    );
}

export default App;
```

### Câu hỏi
1. File `.jsx` khác gì file `.js`?
2. Tại sao phải `export default App`?
3. Thử xóa `export default` → chuyện gì xảy ra?

---

## 📝 Bài 0.2 — JSX là HTML "xịn hơn" (10 phút)

### So sánh trực tiếp

```jsx
// ===== Bài tập: Viết lại HTML thành JSX =====

// HTML thuần (copy từ bài cũ):
/*
<div class="card">
    <img src="avatar.jpg" alt="Avatar">
    <h2>Nguyễn Văn Minh</h2>
    <p>Sinh viên năm 3</p>
    <label for="email">Email:</label>
    <input type="email" id="email">
</div>
*/

// JSX (viết lại):
function StudentCard() {
    return (
        <div className="card">         {/* class → className */}
            <img src="avatar.jpg" alt="Avatar" />  {/* Đóng thẻ */}
            <h2>Nguyễn Văn Minh</h2>
            <p>Sinh viên năm 3</p>
            <label htmlFor="email">Email:</label>   {/* for → htmlFor */}
            <input type="email" id="email" />       {/* Đóng thẻ */}
        </div>
    );
}

export default StudentCard;
```

### Bài tập: Viết lại HTML thành JSX

**Bài 1:** Viết component `UserProfile`
```html
<!-- HTML gốc -->
<div class="profile">
    <h1>Hồ sơ cá nhân</h1>
    <img src="photo.jpg" alt="Ảnh đại diện">
    <table>
        <tr>
            <td>Họ tên:</td>
            <td>Minh</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>minh@example.com</td>
        </tr>
    </table>
</div>
```

**Bài 2:** Viết component `ProductInfo`
```html
<!-- HTML gốc -->
<div class="product">
    <h2>iPhone 15</h2>
    <p class="price">25.000.000đ</p>
    <ul>
        <li>Màn hình: 6.1 inch</li>
        <li>Camera: 48MP</li>
        <li>Pin: 3349 mAh</li>
    </ul>
    <button>Mua ngay</button>
</div>
```

---

## ✅ Checklist

- [ ] Tạo project React chạy được
- [ ] Hiểu file `.jsx` là gì
- [ ] Viết được component cơ bản
- [ ] Biết `class` → `className`, `for` → `htmlFor`
- [ ] Biết phải đóng tất cả thẻ (`<img />`, `<input />`)

---

## 🎯 Tổng kết

```
React Component = Function trả về JSX
JSX = HTML với vài khác biệt nhỏ (className, htmlFor, đóng thẻ)
```

**→ Tiếp theo: [Tier 1 — Hiểu luồng React](TIER_1_react_flow.md)**
