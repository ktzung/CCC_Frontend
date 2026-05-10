# 🟢 Bài 1: React Getting Started — Vite, JSX & Component Đầu Tiên

> **⏱ Thời lượng:** 90 phút | **🎯 Trình độ:** Người mới bắt đầu | **📋 Yêu cầu:** Đã biết HTML/CSS/JS cơ bản

---

## 🎬 Mở đầu — "Tại sao phải học React?"

Minh đang ngồi trong quán cà phê, mở laptop lên. Cậu ấy vừa hoàn thành xong một trang web bán hàng bằng HTML + CSS + JavaScript thuần. Mọi thứ đều hoạt động... nhưng khi cần thêm tính năng "Giỏ hàng" thì:

```
❌ Thêm nút "Thêm vào giỏ" → phải tìm DOM, tạo element, appendChild...
❌ Cập nhật số lượng → phải querySelector rồi innerHTML lại...
❌ Thay đổi giao diện khi đăng nhập → phải viết lại gần hết HTML...
```

> 💡 *"Có cách nào viết web mà không cần 'tay chân' can thiệp vào DOM không?"*

Câu trả lời chính là **React** — thư viện JavaScript do Facebook tạo ra, giúp bạn **khai báo giao diện** thay vì **thao tác DOM** thủ công.

---

## 🎯 Tại sao phải học React?

| Lợi ích | Mô tả |
|---------|-------|
| 🔥 **Declarative** | Bạn nói "giao diện trông như thế nào", React tự cập nhật DOM |
| 🧩 **Component-based** | Chia UI thành các khối LEGO có thể tái sử dụng |
| ⚡ **Virtual DOM** | Chỉ thay đổi phần thay đổi, không render lại toàn bộ trang |
| 🌍 **Việc làm** | React là framework phổ biến nhất thế giới (2024-2026) |

---

## 🌐 Bức tranh toàn cảnh — React nằm ở đâu?

```
┌─────────────────────────────────────────────────┐
│              Website / Web App                   │
├─────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Component │  │Component │  │Component │ ← React│
│  │ Header   │  │ Product  │  │ Cart     │      │
│  └──────────┘  └──────────┘  └──────────┘      │
├─────────────────────────────────────────────────┤
│           Virtual DOM (bản nháp)                │
├─────────────────────────────────────────────────┤
│           Real DOM (trang web thật)             │
├─────────────────────────────────────────────────┤
│        HTML + CSS + JavaScript                   │
└─────────────────────────────────────────────────┘
```

> 🔍 **Tưởng tượng:** React như một **kiến trúc sư** vẽ bản nháp (Virtual DOM), rồi chỉ cho thợ xây (Real DOM) biết chỗ nào cần sửa — thay vì đập đi xây lại toàn bộ.

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. Cài đặt dự án với Vite

> ⚡ **Vite** (đọc là "vít", tiếng Pháp nghĩa là "nhanh") là công cụ tạo dự án nhanh hơn Create React App (CRA).

```bash
# Tạo dự án React mới
npm create vite@latest my-react-app -- --template react

# Di chuyển vào thư mục
cd my-react-app

# Cài dependencies
npm install

# Chạy server phát triển
npm run dev
```

> 🔍 **Lưu ý:** Nếu dùng `npm create vite`, chọn **React** và **JavaScript** khi được hỏi.

### 2. Cấu trúc thư mục dự án Vite + React

```
my-react-app/
├── node_modules/          ← 📦 Thư viện đã cài
├── public/                ← 🌐 Static files (favicon, images)
│   └── vite.svg
├── src/                   ← 💻 Mã nguồn chính
│   ├── assets/            ← 🖼 Ảnh, font
│   ├── App.css            ← 🎨 Style của App
│   ├── App.jsx            ← 🧩 Component chính
│   ├── index.css          ← 🎨 Style global
│   └── main.jsx           ← 🚀 Entry point (render App)
├── index.html             ← 📄 Trang HTML gốc
├── package.json           ← 📋 Dependencies & scripts
└── vite.config.js         ← ⚙️ Cấu hình Vite
```

> 💡 **So sánh với HTML thuần:**
> - `index.html` → giống `index.html` cũ
> - `main.jsx` → giống `<script>` cũ nhưng dùng JSX
> - `App.jsx` → Component gốc, thay thế toàn bộ `<body>`

### 3. Entry Point — `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Tìm element #root trong index.html và render App vào đó
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

> ⚠️ **`StrictMode`** là gì? → Giống như "chế độ học bài" — React sẽ kiểm tra kỹ hơn, cảnh báo lỗi tiềm ẩn. Chỉ hoạt động ở development.

### 4. Component đầu tiên — `App.jsx`

```jsx
function App() {
  return (
    <div>
      <h1>🚀 Xin chào React!</h1>
      <p>Đây là component đầu tiên của tôi</p>
    </div>
  )
}

export default App
```

---

## 🟢 Lớp đơn giản hóa — JSX là gì?

### JSX = HTML viết bên trong JavaScript

> 🍜 **Phở trong nồi áp suất:** Nguyên liệu vẫn là phở (HTML), nhưng nấu bằng nồi áp suất (JavaScript engine) → nhanh hơn, mạnh hơn, gọn hơn!

**JavaScript thuần:**
```javascript
const element = document.createElement('h1')
element.textContent = 'Xin chào'
element.className = 'title'
document.body.appendChild(element)
```

**JSX (cùng kết quả, ngắn hơn nhiều):**
```jsx
const element = <h1 className="title">Xin chào</h1>
```

### Quy tắc JSX quan trọng

| Quy tắc | ❌ Sai | ✅ Đúng | Giải thích |
|----------|--------|---------|------------|
| **className** thay vì class | `<div class="box">` | `<div className="box">` | `class` là reserved word trong JS |
| **htmlFor** thay vì for | `<label for="name">` | `<label htmlFor="name">` | `for` là reserved word trong JS |
| **Đóng tag tất cả** | `<img>`, `<br>` | `<img />`, `<br />` | JSX yêu cầu tag tự đóng |
| **Một root element** | `return <h1>A</h1><h2>B</h2>` | `return <div><h1>A</h1><h2>B</h2></div>` | Phải có một cha duy nhất |
| **CamelCase cho events** | `onclick={handleClick}` | `onClick={handleClick}` | JSX dùng camelCase |

### Viết biểu thức JavaScript trong JSX

```jsx
function App() {
  const name = "Minh"
  const age = 21
  const isLoggedIn = true

  return (
    <div>
      {/* ✅ Biểu thức trong {} */}
      <h1>Xin chào {name}!</h1>
      <p>Tuổi: {age + 1}</p>
      <p>{isLoggedIn ? "Đã đăng nhập" : "Chưa đăng nhập"}</p>
      
      {/* ❌ Chỉ được dùng BIỂU THỨC, không được dùng CÂU LỆNH */}
      {/* {if (isLoggedIn) return "OK"} ← SAI! */}
      {/* {isLoggedIn && <p>Chào mừng!</p>} ← ĐÚNG! */}
    </div>
  )
}
```

> ⚠️ **Lưu ý:** `{ }` trong JSX chỉ chấp nhận **biểu thức** (expressions): số, chuỗi, toán tử, hàm gọi — KHÔNG chấp nhận **câu lệnh** (statements): `if`, `for`, `while`.

### Bảng so sánh: HTML thuần vs JSX

```
┌──────────────────────┬──────────────────────┐
│      HTML thuần      │        JSX           │
├──────────────────────┼──────────────────────┤
│ <div class="x">      │ <div className="x">  │
│ <label for="n">      │ <label htmlFor="n">  │
│ <img>                │ <img />              │
│ <!-- comment -->      │ {/* comment */}      │
│ style="color: red"   │ style={{color:'red'}} │
│ onclick="fn()"       │ onClick={fn}         │
└──────────────────────┴──────────────────────┘
```

---

## 🏭 Lớp thực tế — Ví dụ thực tế

### Ví dụ 1: Trang giới thiệu bản thân

```jsx
function Profile() {
  const name = "Nguyễn Văn Minh"
  const job = "Sinh viên CNTT"
  const avatar = "https://i.pravatar.cc/150?img=3"
  const skills = ["HTML", "CSS", "JavaScript", "React"]

  return (
    <div className="profile-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p className="job">{job}</p>
      <h3>Kỹ năng:</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Ví dụ 2: Component con — Tái sử dụng

```jsx
// Component Button — có thể dùng nhiều lần
function Button({ text, color, onClick }) {
  return (
    <button 
      style={{ backgroundColor: color }} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

// Sử dụng Button nhiều lần
function App() {
  return (
    <div>
      <Button text="Mua hàng" color="green" onClick={() => alert('Đã mua!')} />
      <Button text="Hủy" color="red" onClick={() => alert('Đã hủy!')} />
      <Button text="Xem thêm" color="blue" onClick={() => alert('Xem thêm...')} />
    </div>
  )
}
```

> 💡 **Lợi ích:** Thay vì viết `<button>` 3 lần với style khác nhau, chỉ cần viết **1 component** và tái sử dụng!

---

## 🛠️ Thực hành — Bước đầu với React

### Bài tập 1: Tạo dự án và chạy thử

```bash
# Bước 1: Tạo dự án
npm create vite@latest hello-react -- --template react

# Bước 2: Vào thư mục
cd hello-react

# Bước 3: Cài đặt
npm install

# Bước 4: Chạy
npm run dev
```

> ✅ **Kết quả mong đợi:** Mở trình duyệt tại `http://localhost:5173` → thấy trang mặc định của Vite + React.

### Bài tập 2: Sửa component App

```jsx
// src/App.jsx
function App() {
  const ten = "Sinh viên TLU"
  const ngay = new Date().toLocaleDateString('vi-VN')
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎓 Chào mừng {ten}!</h1>
      <p>Hôm nay là: {ngay}</p>
      <p>Đây là ứng dụng React đầu tiên của bạn.</p>
      <button onClick={() => alert('🎉 Xin chào React!')}>
        Click me!
      </button>
    </div>
  )
}

export default App
```

### Bài tập 3: Tạo component mới

```jsx
// src/components/ThoiTiet.jsx
function ThoiTiet({ thanhPho, nhietDo, trangThai }) {
  return (
    <div className="weather-card">
      <h2>🌤 {thanhPho}</h2>
      <p>Nhiệt độ: {nhietDo}°C</p>
      <p>Trạng thái: {trangThai}</p>
    </div>
  )
}

export default ThoiTiet
```

```jsx
// src/App.jsx — Sử dụng ThoiTiet
import ThoiTiet from './components/ThoiTiet'

function App() {
  return (
    <div>
      <h1>Dự báo thời tiết</h1>
      <ThoiTiet thanhPho="Hà Nội" nhietDo={28} trangThai="Nắng" />
      <ThoiTiet thanhPho="TP.HCM" nhietDo={33} trangThai="Mưa rào" />
      <ThoiTiet thanhPho="Đà Nẵng" nhietDo={30} trangThai="Có mây" />
    </div>
  )
}
```

---

## ❌ Hiểu lầm thường gặp

| Hiểu lầm | Sự thật |
|-----------|---------|
| ❌ "React là ngôn ngữ lập trình" | ✅ React là **thư viện JavaScript** (library, không phải language) |
| ❌ "JSX là HTML" | ✅ JSX là **cú pháp đặc biệt** biên dịch thành `React.createElement()` |
| ❌ "Phải dùng Vite" | ✅ Vite là tùy chọn. Có thể dùng CRA, Next.js, hoặc CDN |
| ❌ "class trong JSX giống HTML" | ✅ Phải dùng `className` vì `class` là keyword trong JavaScript |
| ❌ `{ }` trong JSX dùng được `if/for` | ✅ Chỉ dùng được **biểu thức** (expression), không phải **câu lệnh** (statement) |
| ❌ "Component phải là class" | ✅ Component hiện đại dùng **function** (từ React 16.8+) |

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Adjacent JSX elements must be wrapped` | Trả về 2 elements cạnh nhau | Bọc trong `<div>` hoặc `<>` |
| `'React' must be in scope when using JSX` | Thiếu import React | Thêm `import React from 'react'` (React 17+ tự động) |
| `className` không hoạt động | Viết nhầm `class` | Đổi thành `className` |
| `Objects are not valid as a child` | Trả về object trong JSX | Dùng `.toString()` hoặc JSON.stringify |
| `onClick` không hoạt động | Viết `onclick` (chữ thường) | Đổi thành `onClick` (camelCase) |
| `Cannot read property of undefined` | Quên truyền props | Kiểm tra component cha có truyền đủ props không |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

### Câu hỏi kiểm tra

1. **JSX là gì?** Tại sao không phải là HTML?
2. **Tại sao phải dùng `className` thay vì `class`?**
3. **`{ }` trong JSX chấp nhận loại giá trị nào?**
4. **Sự khác biệt giữa `npm create vite` và `create-react-app`?**
5. **Viết lại đoạn code sau bằng JSX:**
   ```javascript
   const el = document.createElement('div')
   el.innerHTML = '<h1>Hello</h1>'
   el.classList.add('container')
   ```

### Đáp án

1. JSX là cú pháp đặc biệt trong React, **biên dịch thành** `React.createElement()`. Không phải HTML vì nó chạy trong JavaScript engine.
2. Vì `class` là **reserved keyword** trong JavaScript (dùng để tạo class). JSX dùng `className` để tránh xung đột.
3. Chỉ chấp nhận **biểu thức** (expressions): số, chuỗi, biến, toán tử, hàm gọi, toán tử 3 ngôi. KHÔNG chấp nhận câu lệnh `if/for/while`.
4. Vite **nhanh hơn** (dùng ESBuild), hỗ trợ HMR tốt hơn, cấu trúc gọn hơn CRA (đã deprecated).
5. 
   ```jsx
   const el = (
     <div className="container">
       <h1>Hello</h1>
     </div>
   )
   ```

---

## 📌 Tóm tắt bài học

| Khái niệm | Mô tả |
|------------|-------|
| **Vite** | Công cụ tạo dự án React nhanh |
| **JSX** | Cú pháp viết HTML trong JavaScript |
| **Component** | Khối UI có thể tái sử dụng (function trả về JSX) |
| **`className`** | Thay thế `class` trong JSX |
| **`{expression}`** | Chèn biểu thức JavaScript vào JSX |
| **Entry point** | `main.jsx` → render `<App />` vào `#root` |

```
┌─────────────────────────────────────────┐
│            React App Flow               │
│                                         │
│  index.html                             │
│      ↓                                  │
│  main.jsx (import App, render)          │
│      ↓                                  │
│  App.jsx (component gốc)                │
│      ↓                                  │
│  Các component con (Profile, Button...) │
│      ↓                                  │
│  Virtual DOM → Real DOM                 │
└─────────────────────────────────────────┘
```

---

## ➡️ Bài tiếp theo — React Basic Principles

> 🔮 **Preview:** Ở bài tiếp theo, bạn sẽ học:
> - **Props** — cách truyền dữ liệu từ cha xuống con (như DNA di truyền)
> - **State** — cách component "nhớ" và thay đổi dữ liệu (như cảm xúc con người)
> - **Events** — cách xử lý click, nhập liệu, submit form
> - **Conditional Rendering** — cách hiển thị có điều kiện (ẩn/hiện theo logic)

> 💡 *"Props giống như DNA — cha truyền cho con và con không thể thay đổi. State giống như cảm xúc — thay đổi theo hoàn cảnh!"*

---

> 📝 **Ghi chú giảng viên:**
> - Dành 15 phút đầu để cài đặt Vite + chạy thử
> - Demo trực tiếp trên VS Code + trình duyệt
> - Cho sinh viên thực hành Bài tập 1-3 theo nhóm
> - Ôn lại JSX rules bằng cách cho sinh viên tìm lỗi trong code mẫu
