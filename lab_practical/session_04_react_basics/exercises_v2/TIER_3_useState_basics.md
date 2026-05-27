# Tier 3 — useState cơ bản (Quản lý trạng thái)

> **Thời gian:** 35-45 phút  
> **Yêu cầu:** Hoàn thành Tier 1-2  
> **Mục tiêu:** Hiểu useState, quản lý dữ liệu thay đổi trong component

---

## 🎬 Bối cảnh

*Minh đã tạo component hiển thị dữ liệu cố định. Nhưng ứng dụng thực tế cần dữ liệu thay đổi: đếm số, nhập form, toggle... Đó là lúc cần **useState** — hook đầu tiên trong React!*

---

## 📝 Bài 3.1 — Đếm số đơn giản (10 phút)

### Giải thích
`useState` = tạo biến "đặc biệt" — khi giá trị thay đổi, UI tự cập nhật

### Code mẫu — `Counter.jsx`
```jsx
import { useState } from "react";

function Counter() {
    // useState trả về [giá trị, hàmThayĐổi]
    const [count, setCount] = useState(0); // Giá trị ban đầu = 0
    
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Bộ đếm: {count}</h2>
            
            <button onClick={() => setCount(count + 1)}>
                Tăng (+1)
            </button>
            
            <button onClick={() => setCount(count - 1)}>
                Giảm (-1)
            </button>
            
            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}

export default Counter;
```

### Giải thích từng dòng
```jsx
const [count, setCount] = useState(0);
//      ↓       ↓              ↓
//   giá trị  hàm cập nhật   giá trị ban đầu

// count = giá trị hiện tại (0)
// setCount = hàm để thay đổi count
// useState(0) = giá trị khởi tạo là 0

// Khi gọi setCount(5):
// - count sẽ thành 5
// - Component render lại
// - UI hiển thị 5
```

### Thử thách
1. Thêm nút "Nhân đôi" (count *= 2)
2. Hiển thị "Số dương" hoặc "Số âm" dựa vào count
3. Thay đổi màu sắc: xanh khi > 0, đỏ khi < 0

---

## 📝 Bài 3.2 — Text Input (10 phút)

### Giải thích
Kết hợp `useState` với input để lưu giá trị người dùng nhập

### Code mẫu — `NameInput.jsx`
```jsx
import { useState } from "react";

function NameInput() {
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");
    
    function handleInputChange(event) {
        setName(event.target.value); // Lấy giá trị từ input
    }
    
    function handleSayHello() {
        if (name.trim() !== "") {
            setGreeting(`Xin chào ${name}!`);
        }
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Nhập tên của bạn</h2>
            
            <input 
                type="text"
                value={name}                    // Giá trị hiển thị
                onChange={handleInputChange}     // Khi nhập → cập nhật state
                placeholder="Nhập tên..."
                style={{ padding: "8px", marginRight: "10px" }}
            />
            
            <button onClick={handleSayHello}>
                Chào!
            </button>
            
            {/* Hiển thị lời chào */}
            {greeting && <p style={{ fontSize: "20px" }}>{greeting}</p>}
            
            {/* Preview realtime */}
            <p>Bạn đang nhập: {name}</p>
        </div>
    );
}

export default NameInput;
```

### Pattern phổ biến: Controlled Input
```jsx
// Input "kiểm soát" bởi React
<input 
    value={someState}                    // React kiểm soát giá trị
    onChange={(e) => setSomeState(e.target.value)}  // Cập nhật state
/>

// Giải thích:
// - value={someState} → input hiển thị giá trị từ state
// - onChange → khi người dùng nhập, cập nhật state
// - State thay đổi → input hiển thị giá trị mới
// - Đây là "one-way data flow" (dữ liệu chảy 1 chiều)
```

### Thử thách
1. Tạo ô nhập email, hiển thị "@có tồn tại không?"
2. Đếm số ký tự đã nhập (hiển thị X/100)
3. Tạo 2 ô nhập số, hiển thị tổng khi nhấn nút

---

## 📝 Bài 3.3 — Toggle (Ẩn/Hiện) (10 phút)

### Giải thích
Toggle = đảo ngược true/false — rất phổ biến trong UI

### Code mẫu — `ToggleDemo.jsx`
```jsx
import { useState } from "react";

function ToggleDemo() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const themeStyle = {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#333",
        padding: "20px",
        minHeight: "200px",
        transition: "all 0.3s"
    };
    
    return (
        <div style={themeStyle}>
            <h2>Toggle Demo</h2>
            
            {/* Toggle ẩn/hiện */}
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Ẩn nội dung" : "Hiện nội dung"}
            </button>
            
            {isVisible && (
                <div style={{ 
                    marginTop: "10px", 
                    padding: "10px", 
                    border: "1px solid #ddd" 
                }}>
                    <p>Đây là nội dung có thể ẩn/hiện!</p>
                    <p>Nhấn nút phía trên để toggle.</p>
                </div>
            )}
            
            <hr style={{ margin: "20px 0" }} />
            
            {/* Toggle dark mode */}
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </div>
    );
}

export default ToggleDemo;
```

### Thử thách
1. Tạo nút "Hiện/Ẩn mật khẩu" (input type password/text)
2. Tạo accordion (click tiêu đề để mở/đóng nội dung)
3. Tạo nút "Thêm vào yêu thích" (biểu tượng tim filled/outline)

---

## 📝 Bài 3.4 — useState với Object (10 phút)

### Giải thích
State có thể là object — nhưng phải tạo object MỚI khi cập nhật

### Code mẫu — `UserForm.jsx`
```jsx
import { useState } from "react";

function UserForm() {
    // State là object
    const [user, setUser] = useState({
        name: "",
        email: "",
        age: ""
    });
    
    // Cập nhật một trường trong object
    function handleChange(event) {
        const { name, value } = event.target;
        
        setUser({
            ...user,        // Giữ nguyên các trường khác
            [name]: value   // Chỉ cập nhật trường đang nhập
        });
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thông tin sinh viên</h2>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Tên: </label>
                <input 
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Email: </label>
                <input 
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Tuổi: </label>
                <input 
                    name="age"
                    type="number"
                    value={user.age}
                    onChange={handleChange}
                />
            </div>
            
            <h3>Thông tin đã nhập:</h3>
            <p>Tên: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Tuổi: {user.age}</p>
        </div>
    );
}

export default UserForm;
```

### ⚠️ Lưu ý quan trọng
```jsx
// ❌ SAI — Không mutate state trực tiếp
user.name = "Minh";        // React không biết state thay đổi!
setUser(user);              // UI không cập nhật!

// ✅ ĐÚNG — Tạo object mới
setUser({
    ...user,                // Copy tất cả thuộc tính cũ
    name: "Minh"            // Ghi đè thuộc tính cần thay đổi
});
```

### Thử thách
1. Thêm trường "quê quán" vào form
2. Hiển thị tất cả thông tin khi nhấn nút "Xem trước"
3. Tạo nút "Xóa tất cả" để reset form

---

## ✅ Checklist hoàn thành

- [ ] Hiểu useState là gì
- [ ] Tạo state với giá trị ban đầu
- [ ] Cập nhật state với setState
- [ ] Dùng state với input (controlled input)
- [ ] Toggle true/false
- [ ] Cập nhật state là object

---

## 🎯 Điểm mấu chốt

```jsx
const [value, setValue] = useState(initialValue);

// Giá trị có thể là:
useState(0);           // Number
useState("");          // String
useState(true);        // Boolean
useState([]);          // Array
useState({});          // Object
useState(null);        // Null
```

**← Quay lại: [Tier 2 — Setup & JSX](TIER_2_setup_jsx.md)**  
**→ Tiếp theo: [Tier 4 — Lists & Events](TIER_4_lists_events.md)**
