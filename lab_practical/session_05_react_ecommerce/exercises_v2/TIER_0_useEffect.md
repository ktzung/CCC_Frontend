# Tier 0 — useEffect cơ bản (Side Effects)

> **Thời gian:** 20-25 phút  
> **Yêu cầu:** Hoàn thành React Tier 0-7 (Todo App)  
> **Mục tiêu:** Hiểu useEffect là gì, khi nào dùng

---

## 🎯 Hôm nay bạn sẽ học

```
useState  → Quản lý DỮ LIỆU (data)
useEffect → Thực hiện HÀNH ĐỘNG (side effects)
```

---

## 📝 Bài 0.1 — useEffect là gì? (10 phút)

### Giải thích
useEffect = "Hãy làm điều này KHI component render"

```
Component render lần đầu → Chạy useEffect
State thay đổi → Component re-render → Chạy useEffect lại
```

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function EffectDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Minh");
    
    // useEffect chạy MỖI KHI component render
    useEffect(() => {
        console.log("🔄 Component đã render!");
    });
    
    // useEffect chạy MỘT LẦN duy nhất (khi mount)
    useEffect(() => {
        console.log("🚀 Component xuất hiện lần đầu!");
    }, []); // ← Mảng rỗng = chỉ chạy 1 lần
    
    // useEffect chạy KHI count thay đổi
    useEffect(() => {
        console.log("📊 Count đã thay đổi:", count);
    }, [count]); // ← Theo dõi count
    
    // useEffect chạy KHI name thay đổi
    useEffect(() => {
        document.title = `Xin chào ${name}!`;
    }, [name]); // ← Theo dõi name
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>useEffect Demo</h2>
            
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Tăng count</button>
            
            <p>Name: {name}</p>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            
            <p>Mở Console (F12) để xem log</p>
        </div>
    );
}

export default EffectDemo;
```

### 3 cách dùng useEffect

```jsx
// 1. Chạy MỖI KHI render (không có dependency)
useEffect(() => {
    console.log("Mỗi lần render");
});

// 2. Chạy MỘT LẦN (dependency = mảng rỗng)
useEffect(() => {
    console.log("Chỉ 1 lần khi mount");
}, []);

// 3. Chạy KHI dependency thay đổi
useEffect(() => {
    console.log("Khi count thay đổi");
}, [count]);
```

### Thử thách
1. Thay đổi tiêu đề trang (document.title) khi nhập tên
2. Hiển thị "Đang tải..." trong 2 giây rồi biến mất
3. Đếm số lần render (không phải số lần click)

---

## 📝 Bài 0.2 — Cleanup function (10 phút)

### Giải thích
Cleanup = "Dọn dẹp" trước khi effect chạy lại hoặc component biến mất

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function TimerDemo() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
        if (!isRunning) return; // Không chạy nếu chưa start
        
        console.log("⏱️ Timer bắt đầu!");
        
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        
        // Cleanup function — chạy KHI:
        // 1. Component unmount (biến mất)
        // 2. Effect chạy lại (dependency thay đổi)
        return () => {
            console.log("🧹 Dọn dẹp timer!");
            clearInterval(interval);
        };
    }, [isRunning]); // Chạy lại khi isRunning thay đổi
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Timer: {seconds} giây</h2>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "⏸️ Tạm dừng" : "▶️ Bắt đầu"}
            </button>
            <button onClick={() => { setSeconds(0); setIsRunning(false); }}>
                🔄 Reset
            </button>
        </div>
    );
}

export default TimerDemo;
```

### Tại sao cần cleanup?
```jsx
// Không có cleanup → Memory leak!
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Tick");
    }, 1000);
    
    // ❌ Không clearInterval → timer chạy mãi!
}, []);

// Có cleanup → An toàn
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Tick");
    }, 1000);
    
    return () => clearInterval(timer); // ✅ Dọn dẹp
}, []);
```

### Thử thách
1. Tạo đồng hồ đếm ngược (từ 60 về 0)
2. Hiển thị "Đang gõ..." khi người dùng nhập (biến mất sau 1 giây)
3. Tự động lưu dữ vào localStorage mỗi 5 giây

---

## ✅ Checklist

- [ ] Hiểu useEffect là gì
- [ ] Biết 3 cách dùng useEffect
- [ ] Hiểu dependency array
- [ ] Biết cleanup function là gì
- [ ] Tạo được timer đơn giản

---

## 🎯 Tổng kết

```jsx
// Chạy mỗi lần render
useEffect(() => { ... });

// Chạy 1 lần khi mount
useEffect(() => { ... }, []);

// Chạy khi dependency thay đổi
useEffect(() => { ... }, [dep]);

// Cleanup
useEffect(() => {
    // Setup
    return () => {
        // Cleanup
    };
}, []);
```

**→ Tiếp theo: [Tier 1 — Fetch API](TIER_1_fetch_api.md)**
