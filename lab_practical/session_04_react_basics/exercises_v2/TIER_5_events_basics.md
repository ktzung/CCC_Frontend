# Tier 5 — Events cơ bản (Xử lý sự kiện trong React)

> **Thời gian:** 25-35 phút  
> **Yêu cầu:** Hoàn thành Tier 0-4  
> **Mục tiêu:** Xử lý click, input, keyboard events

---

## 🎯 Hôm nay bạn sẽ học

```jsx
<button onClick={handleClick}>Click me</button>
<input onChange={handleChange} />
<div onKeyDown={handleKeyDown}>...</div>
```

---

## 📝 Bài 5.1 — Click Events (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function ClickEvents() {
    const [message, setMessage] = useState("Chưa click");
    const [clickCount, setClickCount] = useState(0);
    
    // Cách 1: Arrow function trực tiếp
    // <button onClick={() => setMessage("Đã click!")}>
    
    // Cách 2: Tạo hàm riêng (nên dùng)
    function handleClick() {
        setMessage("Đã click lúc " + new Date().toLocaleTimeString());
        setClickCount(clickCount + 1);
    }
    
    function handleReset() {
        setMessage("Đã reset!");
        setClickCount(0);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Click Events</h2>
            <p>{message}</p>
            <p>Số lần click: {clickCount}</p>
            
            <button onClick={handleClick}>Click me!</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default ClickEvents;
```

### 2 cách gắn event
```jsx
// Cách 1: Arrow function (inline)
<button onClick={() => console.log("clicked")}>Click</button>

// Cách 2: Tạo hàm riêng (nên dùng cho hàm phức tạp)
function handleClick() {
    console.log("clicked");
}
<button onClick={handleClick}>Click</button>

// ⚠️ LƯU Ý: KHÔNG có dấu ()
// ❌ <button onClick={handleClick()}>  ← Gọi ngay lập tức!
// ✅ <button onClick={handleClick}>    ← Gọi khi click
```

### Thử thách
1. Tạo nút "Đổi màu ngẫu nhiên" cho một div
2. Đếm số lần click vào từng nút riêng biệt
3. Tạo nút "Like" với icon ❤️/🤍 toggle

---

## 📝 Bài 5.2 — Input Events (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function InputEvents() {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);
    
    function handleChange(event) {
        const newValue = event.target.value;
        setText(newValue);
        setCharCount(newValue.length);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Input Events</h2>
            
            <input 
                value={text}
                onChange={handleChange}
                placeholder="Nhập gì đó..."
                maxLength={100}
                style={{ padding: "8px", width: "300px" }}
            />
            
            <p>Ký tự: {charCount}/100</p>
            <p>Bạn đang nhập: {text}</p>
            
            {charCount > 80 && (
                <p style={{ color: "red" }}>⚠️ Sắp hết ký tự!</p>
            )}
        </div>
    );
}

export default InputEvents;
```

### Các loại input events
```jsx
// onChange — Khi giá trị thay đổi
<input onChange={(e) => setValue(e.target.value)} />

// onFocus — Khi click vào input
<input onFocus={() => console.log("Focused")} />

// onBlur — Khi click ra ngoài input
<input onBlur={() => console.log("Blurred")} />

// onKeyDown — Khi nhấn phím
<input onKeyDown={(e) => console.log(e.key)} />

// onKeyPress — (deprecated, dùng onKeyDown)
<input onKeyDown={(e) => {
    if (e.key === "Enter") {
        console.log("Enter pressed!");
    }
}} />
```

### Thử thách
1. Tạo ô nhập email với validation (có @ không)
2. Hiển thị preview khi nhập (giống Tier 2)
3. Đếm số từ (không phải ký tự)

---

## 📝 Bài 5.3 — Keyboard Events (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function KeyboardEvents() {
    const [lastKey, setLastKey] = useState("");
    const [log, setLog] = useState([]);
    const [inputValue, setInputValue] = useState("");
    
    // Xử lý phím trên toàn trang
    function handleKeyDown(event) {
        setLastKey(event.key);
        
        // Thêm vào log
        setLog(prev => [...prev.slice(-4), event.key]); // Giữ 5 phím cuối
    }
    
    // Xử lý phím trong input
    function handleInputKeyDown(event) {
        if (event.key === "Enter") {
            if (inputValue.trim() !== "") {
                alert("Bạn nhập: " + inputValue);
                setInputValue("");
            }
        }
        
        if (event.key === "Escape") {
            setInputValue("");
        }
    }
    
    return (
        <div 
            style={{ padding: "20px" }}
            onKeyDown={handleKeyDown}
            tabIndex={0}  // Để div có thể nhận focus
        >
            <h2>Keyboard Events</h2>
            
            <p>Phím cuối cùng: <strong>{lastKey || "Chưa nhấn"}</strong></p>
            
            <p>Log: {log.join(" → ")}</p>
            
            <hr />
            
            <h3>Nhập và nhấn Enter:</h3>
            <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Nhập rồi nhấn Enter..."
                style={{ padding: "8px", width: "300px" }}
            />
            
            <p style={{ fontSize: "12px", color: "#666" }}>
                Nhấn Escape để xóa
            </p>
        </div>
    );
}

export default KeyboardEvents;
```

### Thử thách
1. Tạo "game" đoán phím: hiện phím ngẫu nhiên, nhấn đúng để thắng
2. Di chuyển một ô vuông bằng phím mũi tên (↑↓←→)
3. Tạo phím tắt Ctrl+D để đổi màu nền

---

## 📝 Bài 5.4 — Form Events (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function FormEvents() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    
    function handleSubmit(event) {
        event.preventDefault(); // Ngăn reload trang
        
        if (formData.name === "" || formData.email === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        
        setSubmitted(true);
    }
    
    function handleReset() {
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(false);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Form Events</h2>
            
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tên: </label>
                        <input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>Email: </label>
                        <input 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tin nhắn: </label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: "100%" }}
                        />
                    </div>
                    
                    <button type="submit">Gửi</button>
                    <button type="button" onClick={handleReset}>Xóa</button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px" }}>
                    <h3>✅ Đã gửi thành công!</h3>
                    <p>Tên: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <p>Tin nhắn: {formData.message}</p>
                    <button onClick={handleReset}>Gửi lại</button>
                </div>
            )}
        </div>
    );
}

export default FormEvents;
```

### Lưu ý quan trọng
```jsx
// event.preventDefault() — Ngăn hành vi mặc định
// - Form: ngăn reload trang
// - Link: ngăn chuyển trang
// - Context menu: ngăn menu chuột phải

// handleSubmit phải dùng với <form onSubmit={...}>
// Không dùng onClick cho nút submit!
```

### Thử thách
1. Validate email phải có @
2. Thêm trường "Xác nhận mật khẩu"
3. Hiển thị lỗi realtime khi nhập sai

---

## ✅ Checklist

- [ ] Xử lý click event
- [ ] Xử lý input change event
- [ ] Xử lý keyboard event (Enter, Escape)
- [ ] Xử lý form submit
- [ ] Sử dụng event.preventDefault()

---

## 🎯 Tổng kết

```jsx
// Click
<button onClick={handleClick}>Click</button>

// Input change
<input onChange={(e) => setValue(e.target.value)} />

// Keyboard
<input onKeyDown={(e) => {
    if (e.key === "Enter") handleEnter();
}} />

// Form submit
<form onSubmit={handleSubmit}>...</form>
```

**← Quay lại: [Tier 4 — useState](TIER_4_useState_basics.md)**  
**→ Tiếp theo: [Tier 6 — Lists & CRUD](TIER_6_lists_crud.md)**
