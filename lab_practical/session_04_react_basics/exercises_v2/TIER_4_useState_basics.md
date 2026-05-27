# Tier 4 — useState cơ bản (Quản lý trạng thái đơn giản)

> **Thời gian:** 30-40 phút  
> **Yêu cầu:** Hoàn thành Tier 0-3  
> **Mục tiêu:** Sử dụng useState với số, chuỗi, boolean

---

## 🎯 Hôm nay bạn sẽ học

```jsx
const [value, setValue] = useState(0);      // Số
const [text, setText] = useState("");        // Chuỗi
const [isOn, setIsOn] = useState(false);     // Boolean
```

---

## 📝 Bài 4.1 — useState với số (Đếm) (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);
    
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
            
            <button onClick={() => setCount(count * 2)}>
                Nhân đôi
            </button>
        </div>
    );
}

export default NumberState;
```

### Thử thách
1. Thêm nút "Tăng 5" (count += 5)
2. Hiển thị "Số dương" hoặc "Số âm" dựa vào count
3. Thay đổi màu: xanh khi > 0, đỏ khi < 0, đen khi = 0

---

## 📝 Bài 4.2 — useState với chuỗi (Input) (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Nhập thông tin</h2>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Tên: </label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên..."
                />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Email: </label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                />
            </div>
            
            <h3>Thông tin đã nhập:</h3>
            <p>Tên: {name || "(chưa nhập)"}</p>
            <p>Email: {email || "(chưa nhập)"}</p>
            
            {/* Preview realtime */}
            {name && (
                <p style={{ background: "#f0f0f0", padding: "10px" }}>
                    Xin chào <strong>{name}</strong>! Email của bạn là {email}
                </p>
            )}
        </div>
    );
}

export default StringState;
```

### Pattern: Controlled Input
```jsx
// Input "kiểm soát" bởi React
<input 
    value={someState}                    // React kiểm soát giá trị
    onChange={(e) => setSomeState(e.target.value)}  // Cập nhật state
/>

// Luồng hoạt động:
// 1. Người dùng nhập ký tự
// 2. onChange được gọi
// 3. setState(newValue) cập nhật state
// 4. Component re-render
// 5. Input hiển thị giá trị mới từ state
```

### Thử thách
1. Đếm số ký tự đã nhập (hiển thị X/100)
2. Hiển thị "Email hợp lệ" nếu có ký tự "@"
3. Tạo ô nhập mật khẩu với nút ẩn/hiện

---

## 📝 Bài 4.3 — useState với boolean (Toggle) (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function BooleanState() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    
    const themeStyle = {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#333",
        padding: "20px",
        minHeight: "200px"
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
                </div>
            )}
            
            <hr />
            
            {/* Toggle dark mode */}
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            
            <hr />
            
            {/* Toggle like */}
            <button onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>
        </div>
    );
}

export default BooleanState;
```

### Pattern: Toggle
```jsx
// Toggle = đảo ngược true/false
setIsVisible(!isVisible);
setIsDarkMode(!isDarkMode);
setIsLiked(!isLiked);

// Dùng trong UI
{isVisible && <div>Nội dung</div>}
<button>{isDarkMode ? "🌙" : "☀️"}</button>
```

### Thử thách
1. Tạo nút "Hiện/Ẩn mật khẩu" (input type password/text)
2. Tạo accordion (click tiêu đề để mở/đóng nội dung)
3. Tạo nút "Bật/Tắt" với icon bóng đèn 💡

---

## 📝 Bài 4.4 — Kết hợp nhiều useState (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function MultipleStates() {
    // Nhiều state trong 1 component
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    function handleSubmit() {
        if (name.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        setSubmitted(true);
    }
    
    function handleReset() {
        setName("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Form đăng ký</h2>
            
            {!submitted ? (
                <div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tên: </label>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tuổi: </label>
                        <input 
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <input 
                                type="checkbox"
                                checked={isStudent}
                                onChange={(e) => setIsStudent(e.target.checked)}
                            />
                            Là sinh viên
                        </label>
                    </div>
                    
                    <button onClick={handleSubmit}>Đăng ký</button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p>Tên: {name}</p>
                    <p>Tuổi: {age}</p>
                    <p>Sinh viên: {isStudent ? "Có" : "Không"}</p>
                    <button onClick={handleReset}>Đăng ký lại</button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;
```

### Thử thách
1. Thêm trường "Email" vào form
2. Validate: tuổi phải > 0 và < 100
3. Hiển thị "Xin chào [tên]!" khi nhập xong

---

## ✅ Checklist

- [ ] useState với số (number)
- [ ] useState với chuỗi (string)
- [ ] useState với boolean (true/false)
- [ ] Controlled input (value + onChange)
- [ ] Toggle pattern (!state)
- [ ] Nhiều useState trong 1 component

---

## 🎯 Tổng kết

```jsx
// Số — đếm, tính toán
const [count, setCount] = useState(0);

// Chuỗi — nhập liệu
const [text, setText] = useState("");

// Boolean — toggle, hiện/ẩn
const [isOn, setIsOn] = useState(false);

// Kết hợp
const [name, setName] = useState("");
const [isVisible, setIsVisible] = useState(true);
```

**← Quay lại: [Tier 3 — Component Split](TIER_3_component_split.md)**  
**→ Tiếp theo: [Tier 5 — Events cơ bản](TIER_5_events_basics.md)**
