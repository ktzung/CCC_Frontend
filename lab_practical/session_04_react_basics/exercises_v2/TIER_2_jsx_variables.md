# Tier 2 — Biến trong JSX (Đưa dữ liệu vào giao diện)

> **Thời gian:** 20-25 phút  
> **Yêu cầu:** Hoàn thành Tier 0-1  
> **Mục tiêu:** Sử dụng biến JavaScript bên trong JSX

---

## 🎯 Hôm nay bạn sẽ học

```jsx
// Dùng {} để "nhúng" JavaScript vào JSX
const name = "Minh";
return <h1>Xin chào {name}!</h1>;  // → "Xin chào Minh!"
```

---

## 📝 Bài 2.1 — Hiển thị biến đơn giản (8 phút)

### Code mẫu
```jsx
function SimpleVariables() {
    // Các biến JavaScript
    const ten = "Nguyễn Văn Minh";
    const tuoi = 20;
    const laSinhVien = true;
    const monHoc = ["HTML", "CSS", "JS", "React"];
    
    return (
        <div style={{ padding: "20px" }}>
            <h1>Xin chào {ten}!</h1>
            <p>Tuổi: {tuoi}</p>
            <p>Năm sau: {tuoi + 1}</p>
            <p>Sinh viên: {laSinhVien ? "Có" : "Không"}</p>
            
            <h2>Môn học yêu thích:</h2>
            <p>{monHoc.join(", ")}</p>
        </div>
    );
}

export default SimpleVariables;
```

### Quy tắc
```jsx
// ✅ ĐƯỢC: Biến, tính toán, gọi hàm
<h1>{ten}</h1>
<p>{tuoi + 1}</p>
<p>{ten.toUpperCase()}</p>
<p>{new Date().toLocaleDateString()}</p>

// ❌ KHÔNG ĐƯỢC: Object, nhiều dòng phức tạp
<h1>{{ ten: "Minh" }}</h1>  {/* Lỗi! */}
<p>{if (tuoi > 18) "Lớn"}</p>  {/* Lỗi! Dùng ternary */}
```

### Thử thách
1. Hiển thị thông tin cá nhân (tên, tuổi, quê quán)
2. Hiển thị "Chào buổi sáng/chiều/tối" dựa vào giờ hiện tại
3. Tính và hiển thị BMI (cân nặng / chiều cao²)

---

## 📝 Bài 2.2 — Conditional Rendering (Hiển thị có điều kiện) (10 phút)

### Cách 1: Toán tử 3 ngôi (Ternary)

```jsx
function TernaryDemo() {
    const isLoggedIn = true;
    const score = 85;
    
    return (
        <div style={{ padding: "20px" }}>
            {/* Cách 1: Toán tử 3 ngôi */}
            <h2>{isLoggedIn ? "Chào mừng bạn!" : "Vui lòng đăng nhập"}</h2>
            
            {/* Kết quả học tập */}
            <p>Kết quả: {score >= 5 ? "Đậu" : "Rớt"}</p>
            
            {/* Điểm xếp loại */}
            <p>Xếp loại: {
                score >= 9 ? "Xuất sắc" :
                score >= 8 ? "Giỏi" :
                score >= 7 ? "Khá" :
                score >= 5 ? "Trung bình" : "Yếu"
            }</p>
        </div>
    );
}

export default TernaryDemo;
```

### Cách 2: && (Hiện hoặc không hiện)

```jsx
function AndDemo() {
    const hasNotification = true;
    const notificationCount = 5;
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thông báo</h2>
            
            {/* Hiện khi có thông báo */}
            {hasNotification && (
                <div style={{ background: "#fff3cd", padding: "10px" }}>
                    Bạn có {notificationCount} thông báo mới!
                </div>
            )}
            
            {/* Không hiện gì khi không có */}
            {!hasNotification && <p>Không có thông báo</p>}
        </div>
    );
}

export default AndDemo;
```

### Thử thách
1. Hiển thị icon 🔴/🟢 dựa vào trạng thái online/offline
2. Hiện/ẩn menu dựa vào isLoggedIn
3. Hiển thị "Hết hàng" khi stock = 0

---

## 📝 Bài 2.3 — Render danh sách (List Rendering) (10 phút)

### Code mẫu
```jsx
function ListRendering() {
    const fruits = ["Táo", "Chuối", "Cam", "Nho"];
    
    const students = [
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ];
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách trái cây</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <h2>Danh sách sinh viên</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>STT</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tuổi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListRendering;
```

### Tại sao cần `key`?
```jsx
// React cần key để biết phần tử nào thay đổi
{items.map(item => (
    <div key={item.id}>...</div>  // Dùng id (tốt nhất)
))}

// Không nên dùng index nếu danh sách có thể thay đổi
{items.map((item, index) => (
    <div key={index}>...</div>  // Chỉ dùng khi danh sách cố định
))}
```

### Thử thách
1. Render danh sách 5 sản phẩm (tên, giá)
2. Hiển thị sản phẩm giá > 1 triệu bằng màu đỏ
3. Tính tổng giá tất cả sản phẩm

---

## ✅ Checklist

- [ ] Hiểu `{}` dùng để nhúng JS vào JSX
- [ ] Hiển thị biến, tính toán, gọi hàm
- [ ] Dùng ternary để hiển thị có điều kiện
- [ ] Dùng && để hiện/ẩn phần tử
- [ ] Render danh sách với .map()
- [ ] Hiểu tại sao cần key

---

## 🎯 Tổng kết

```jsx
// Biến
<h1>{ten}</h1>

// Tính toán
<p>{tuoi + 1}</p>

// Điều kiện (ternary)
<p>{score >= 5 ? "Đậu" : "Rớt"}</p>

// Điều kiện (&&)
{hasNotification && <div>Thông báo</div>}

// Danh sách
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

**← Quay lại: [Tier 1 — React Flow](TIER_1_react_flow.md)**  
**→ Tiếp theo: [Tier 3 — Chia Component](TIER_3_component_split.md)**
