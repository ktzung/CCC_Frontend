# Tier 2 — React Setup & JSX (Viết UI bằng JavaScript)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Cài đặt React với Vite, hiểu JSX là gì và viết được JSX cơ bản  
> **📋 Cần biết:** Tier 0 (SPA), Tier 1 (Virtual DOM), HTML/JS cơ bản  
> **🚫 Không cần biết:** Components, Props, useState

---

## 🎬 Opening Hook

*Minh muốn hiển thị "Xin chào" trên trang web.*

```javascript
// Cách cũ (DOM thuần):
const h1 = document.createElement("h1");
h1.textContent = "Xin chào";
document.body.appendChild(h1);
// 3 dòng code cho 1 dòng HTML!
```

```jsx
// Cách React (JSX):
return <h1>Xin chào</h1>
// 1 dòng. Giống HTML đến 90%.
```

*"JSX là HTML viết trong JavaScript. React biến nó thành Virtual DOM." Anh Hùng nói.*

---

## 🎯 Hôm nay bạn sẽ học

```
JSX = JavaScript XML = HTML viết trong JavaScript
     ↓
React biến JSX → Virtual DOM → DOM thật
```

**Chỉ MỘT khái niệm:** JSX — cách viết UI bằng cú pháp giống HTML trong file JavaScript.

---

## 📝 Bài 2.1 — Cài đặt React với Vite (10 phút)

### Tại sao Vite?

```
Create React App (CRA):  npm create-react-app → Chậm (30-60s)
Vite:                    npm create vite      → Nhanh (3-5s) ⚡
```

### Bước 1: Tạo project

```bash
# Tạo dự án React mới
npm create vite@latest my-first-react -- --template react

# Vào thư mục
cd my-first-react

# Cài đặt dependencies
npm install

# Chạy server phát triển
npm run dev
```

### Bước 2: Mở trình duyệt

```
Vite sẽ hiển thị:
  Local: http://localhost:5173/

Mở link → Thấy trang React đầu tiên! 🎉
```

### Bước 3: Xem cấu trúc project

```
my-first-react/
├── index.html          ← Trang HTML duy nhất (SPA!)
├── package.json        ← Danh sách dependencies
├── src/
│   ├── main.jsx        ← Entry point (điểm bắt đầu)
│   ├── App.jsx         ← Component chính
│   └── App.css         ← Style cho App
└── vite.config.js      ← Cấu hình Vite
```

### Bước 4: Sửa file đầu tiên

```jsx
// Mở src/App.jsx và sửa nội dung:

function App() {
    return (
        <div>
            <h1>🚀 React đầu tiên của tôi!</h1>
            <p>Hôm nay là ngày đẹp trời</p>
        </div>
    );
}

export default App;
```

**Lưu file → Trình duyệt tự động cập nhật! (Hot Module Replacement)**

---

## 📝 Bài 2.2 — JSX là gì? (10 phút)

### Định nghĩa

```
JSX = JavaScript XML
    = HTML viết TRONG JavaScript
    = Cách viết Virtual DOM bằng cú pháp quen thuộc

JSX KHÔNG phải HTML thuần — nó là JavaScript "cải trang" thành HTML.
```

### So sánh trực tiếp

```jsx
// HTML thuần:
<h1 class="title">Xin chào</h1>

// JSX:
<h1 className="title">Xin chào</h1>
//   ↑ class → className (vì class là keyword trong JS)

// Cả hai đều hiển thị: Xin chào (với class "title")
```

### Tại sao dùng JSX?

```javascript
// Không có JSX — viết Virtual DOM thủ công:
React.createElement("div", { className: "card" },
    React.createElement("h1", null, "Tiêu đề"),
    React.createElement("p", null, "Nội dung")
);
// Khó đọc, dễ sai!

// Có JSX — viết như HTML:
<div className="card">
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
</div>
// Dễ đọc, quen thuộc!
```

---

## 📝 Bài 2.3 — Quy tắc JSX (15 phút)

### Quy tắc 1: className thay vì class

```jsx
// ❌ SAI — class là keyword trong JavaScript
<div class="container">...</div>

// ✅ ĐÚNG — dùng className
<div className="container">...</div>
```

### Quy tắc 2: htmlFor thay vì for

```jsx
// ❌ SAI — for là keyword trong JavaScript (vòng lặp for)
<label for="email">Email</label>

// ✅ ĐÚNG — dùng htmlFor
<label htmlFor="email">Email</label>
```

### Quy tắc 3: Phải đóng tất cả thẻ

```jsx
// ❌ SAI — thẻ tự đóng không có /
<img src="photo.jpg">
<input type="text">
<br>

// ✅ ĐÚNG — phải có /
<img src="photo.jpg" />
<input type="text" />
<br />
```

### Quy tắc 4: Chỉ có MỘT thẻ cha

```jsx
// ❌ SAI — nhiều thẻ cùng cấp
<h1>Tiêu đề</h1>
<p>Nội dung</p>

// ✅ ĐÚNG — bọc trong div
<div>
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
</div>

// ✅ ĐÚNG — dùng Fragment (không thêm thẻ div thừa)
<>
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
</>
```

### Quy tắc 5: style là object (không phải string)

```jsx
// ❌ SAI — style như HTML
<div style="color: red; font-size: 16px;">

// ✅ ĐÚNG — style là object JavaScript
<div style={{ color: "red", fontSize: "16px" }}>
//           ↑ object        ↑ camelCase (không phải font-size)
```

### Quy tắc 6: Event handler là function (không phải string)

```jsx
// ❌ SAI — event như HTML
<button onclick="handleClick()">

// ✅ ĐÚNG — event là function reference
<button onClick={handleClick}>
//         ↑ camelCase    ↑ không có ()
```

### Bảng tổng hợp

```
HTML thuần              JSX                     Lý do
──────────              ───                     ─────
class="box"             className="box"         class là JS keyword
for="email"             htmlFor="email"         for là JS keyword
<img>                   <img />                 Phải đóng thẻ
onclick="fn()"          onClick={fn}            camelCase + function
style="color: red"      style={{color:"red"}}   Object + camelCase
```

---

## 📝 Bài 2.4 — Biểu thức trong JSX (10 phút)

### Dùng `{}` để chèn JavaScript vào JSX

```jsx
function App() {
    const name = "Minh";
    const age = 20;
    const isLoggedIn = true;

    return (
        <div>
            {/* Biến */}
            <h1>Xin chào {name}!</h1>
            
            {/* Toán tử */}
            <p>Tuổi: {age + 1}</p>
            
            {/* Function call */}
            <p>Hôm nay: {new Date().toLocaleDateString("vi-VN")}</p>
            
            {/* Ternary (conditional) */}
            <p>{isLoggedIn ? "Đã đăng nhập" : "Chưa đăng nhập"}</p>
            
            {/* Template literal */}
            <p>{`${name} năm nay ${age} tuổi`}</p>
        </div>
    );
}
```

### `{}` có thể chứa gì?

```jsx
// ✅ Biến, số, chuỗi
<h1>{name}</h1>
<p>{42}</p>

// ✅ Toán tử
<p>{price * quantity}</p>
<p>{isLoggedIn && "Xin chào"}</p>

// ✅ Function call
<p>{getName()}</p>
<p>{new Date().getFullYear()}</p>

// ✅ Ternary
<p>{score >= 5 ? "Đậu" : "Rớt"}</p>

// ✅ Array (phải là array of JSX)
<ul>{items.map(item => <li>{item}</li>)}</ul>

// ❌ Object (không render được)
<h1>{{ name: "Minh" }}</h1>  // LỖI!

// ❌ Statement (if/else, for)
<h1>{if (isLoggedIn) { return "Hi" }}</h1>  // LỖI!
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| JSX là HTML | JSX là JavaScript "giống HTML" |
| JSX chạy trên browser | Babel/Bundler chuyển JSX → JS trước khi chạy |
| Phải dùng JSX mới dùng React được | Có thể dùng `React.createElement()` thuần |
| `<div>` trong JSX = `<div>` trong HTML | JSX `<div>` → `React.createElement("div")` |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** JSX là gì?
- a) Một ngôn ngữ mới
- b) JavaScript với cú pháp giống HTML ✅
- c) HTML thuần với JavaScript nhúng

**Câu 2:** Tại sao dùng `className` thay vì `class`?
- a) React thích khác HTML
- b) `class` là keyword trong JavaScript ✅
- c) Để phân biệt HTML và JSX

**Câu 3:** Code nào đúng?
- a) `<div style="color: red">`
- b) `<div style={{ color: "red" }}>` ✅
- c) `<div style={color: red}>`

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 1:** Virtual DOM — JSX là cách viết Virtual DOM
- **Sẽ cần trong Tier 3:** Components — JSX nằm trong function component
- **Tham khảo thêm:** `02_getting_started/01_getting_started.md` (file cũ)
