# Tier 2 — React Setup & JSX Basics

> **Thời gian:** 30-40 phút  
> **Yêu cầu:** Hoàn thành Tier 1 (Hiểu tại sao cần React)  
> **Mục tiêu:** Cài đặt React, hiểu JSX, render component đầu tiên

---

## 🎬 Bối cảnh

*Minh đã hiểu tại sao cần React. Giờ bạn ấy muốn "chơi thật" — cài đặt React trên máy, tạo project đầu tiên, và viết JSX. JSX là cách viết HTML bên trong JavaScript — ban đầu có thể lạ, nhưng sẽ quen rất nhanh!*

---

## 📝 Bài 2.1 — Cài đặt React (10 phút)

### Bước 1: Cài Node.js
Kiểm tra đã cài chưa:
```bash
node --version
npm --version
```

Nếu chưa, tải tại: https://nodejs.org

### Bước 2: Tạo project React mới
```bash
# Tạo project mới
npm create vite@latest my-first-react -- --template react

# Vào thư mục project
cd my-first-react

# Cài dependencies
npm install

# Chạy server
npm run dev
```

### Bước 3: Mở trình duyệt
Vào `http://localhost:5173` — thấy trang mặc định của React

### Bước 4: Xem cấu trúc project
```
my-first-react/
├── public/          # Static files
├── src/             # Code của bạn
│   ├── App.jsx      # Component chính
│   ├── main.jsx     # Entry point
│   └── index.css    # Styles
├── index.html       # HTML template
└── package.json     # Dependencies
```

---

## 📝 Bài 2.2 — JSX là gì? (10 phút)

### Giải thích
JSX = JavaScript XML — cách viết HTML bên trong JavaScript

### Code mẫu — Chỉnh sửa `src/App.jsx`
```jsx
// JSX trông giống HTML, nhưng là JavaScript!
function App() {
    // Biến JavaScript
    const ten = "Minh";
    const tuoi = 20;
    const monHoc = ["HTML", "CSS", "JS", "React"];
    
    return (
        <div>
            {/* Chú thích trong JSX dùng {/* */} */}
            <h1>Xin chào {ten}!</h1>
            <p>Tuổi: {tuoi}</p>
            <p>Năm sau: {tuoi + 1}</p>
            
            {/* Render mảng */}
            <h2>Môn học:</h2>
            <ul>
                {monHoc.map((mon, index) => (
                    <li key={index}>{mon}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
```

### Quy tắc JSX
```jsx
// 1. Chỉ có MỘT thẻ gốc
// ❌ Sai
return (
    <h1>Tiêu đề</h1>
    <p>Đoạn văn</p>
);

// ✅ Đúng
return (
    <div>
        <h1>Tiêu đề</h1>
        <p>Đoạn văn</p>
    </div>
);

// ✅ Hoặc dùng Fragment
return (
    <>
        <h1>Tiêu đề</h1>
        <p>Đoạn văn</p>
    </>
);

// 2. className thay vì class
// ❌ <div class="box">
// ✅ <div className="box">

// 3. htmlFor thay vì for
// ❌ <label for="name">
// ✅ <label htmlFor="name">

// 4. Style là object
// ❌ <div style="color: red">
// ✅ <div style={{ color: "red" }}>

// 5. Đóng tất cả thẻ
// ❌ <input>, <br>, <img>
// ✅ <input />, <br />, <img />
```

### Thử thách
1. Hiển thị tên, tuổi, quê quán bằng biến JavaScript
2. Render danh sách 5 người bạn (dùng `.map()`)
3. Tính và hiển thị tổng 3 số

---

## 📝 Bài 2.3 — Component đầu tiên (10 phút)

### Giải thích
Component = một phần của UI, có thể tái sử dụng

### Code mẫu — Tạo component `Greeting`
```jsx
// src/components/Greeting.jsx

// Component đơn giản — chỉ hiển thị
function Greeting({ name, age }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            padding: "10px", 
            margin: "10px 0" 
        }}>
            <h3>Xin chào {name}!</h3>
            <p>Tuổi: {age}</p>
        </div>
    );
}

export default Greeting;
```

### Sử dụng trong App.jsx
```jsx
import Greeting from "./components/Greeting";

function App() {
    return (
        <div>
            <h1>Danh sách sinh viên</h1>
            
            {/* Sử dụng component nhiều lần */}
            <Greeting name="Minh" age={20} />
            <Greeting name="An" age={21} />
            <Greeting name="Linh" age={19} />
        </div>
    );
}

export default App;
```

### Component lồng nhau
```jsx
// src/components/StudentCard.jsx
function StudentCard({ name, age, major }) {
    return (
        <div className="student-card">
            <h3>{name}</h3>
            <p>Tuổi: {age}</p>
            <p>Chuyên ngành: {major}</p>
        </div>
    );
}

// src/components/StudentList.jsx
import StudentCard from "./StudentCard";

function StudentList() {
    const students = [
        { id: 1, name: "Minh", age: 20, major: "CNTT" },
        { id: 2, name: "An", age: 21, major: "CNTT" },
        { id: 3, name: "Linh", age: 19, major: "KTPM" }
    ];

    return (
        <div>
            <h2>Danh sách sinh viên</h2>
            {students.map(student => (
                <StudentCard 
                    key={student.id}
                    name={student.name}
                    age={student.age}
                    major={student.major}
                />
            ))}
        </div>
    );
}

export default StudentList;
```

### Thử thách
1. Tạo component `ProductCard` hiển thị tên, giá, hình ảnh
2. Tạo component `ProductList` render 3 sản phẩm
3. Tạo component `Header` với tiêu đề và mô tả

---

## ✅ Checklist hoàn thành

- [ ] Cài đặt React thành công (Vite)
- [ ] Hiểu JSX là gì
- [ ] Viết được JSX với biến JavaScript
- [ ] Tạo component đơn giản
- [ ] Truyền props vào component
- [ ] Render danh sách với `.map()`

---

## 🎯 Điểm mấu chốt

```
JSX = HTML + JavaScript (trong cùng 1 file)
Component = Function trả về JSX
Props = dữ liệu truyền từ cha → con
```

**← Quay lại: [Tier 1 — Why React](TIER_1_why_react.md)**  
**→ Tiếp theo: [Tier 3 — useState cơ bản](TIER_3_useState_basics.md)**
