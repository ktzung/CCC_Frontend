# Tier 8 — Props nâng cao (Destructuring, Default, Children)

> **Thời gian:** 25-30 phút  
> **Mục tiêu:** Sử dụng Props một cách chuyên nghiệp với destructuring, default values và children pattern  
> **Đã biết cần:** Tier 3 (chia component), Tier 4 (useState cơ bản)  
> **Không cần biết:** useEffect, Context API

---

## 🎯 Hôm nay bạn sẽ học

```
Tier 3:   function UserCard(props) { return <h1>{props.name}</h1> }
Tier 8:   function UserCard({ name, age = 18 }) { return <h1>{name}, {age}</h1> }
                         ↑ Ngắn gọn hơn, rõ ràng hơn, có giá trị mặc định
```

**Vấn đề giải quyết:** Khi component nhận nhiều props, viết `props.name`, `props.age` dài dòng và dễ sai. Destructuring giúp code sạch hơn.

---

## 📝 Bài 8.1 — Destructuring Props (8 phút)

### Trước (Tier 3): Dùng `props.xxx`
```jsx
function UserCard(props) {
    return (
        <div className="card">
            <h2>{props.name}</h2>
            <p>Tuổi: {props.age}</p>
            <p>Email: {props.email}</p>
            <p>Điểm: {props.score}</p>
        </div>
    );
}

// Gọi component
<UserCard name="Minh" age={20} email="minh@example.com" score={85} />
```

### Sau (Tier 8): Destructuring ngay trong parameter
```jsx
function UserCard({ name, age, email, score }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Tuổi: {age}</p>
            <p>Email: {email}</p>
            <p>Điểm: {score}</p>
        </div>
    );
}

// Gọi component — GIỐNG HỆT
<UserCard name="Minh" age={20} email="minh@example.com" score={85} />
```

### Thử ngay
```jsx
// Bài tập: Viết lại component sau dùng destructuring
function ProductCard(props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>Giá: {props.price}đ</p>
            <p>Số lượng: {props.stock}</p>
            <span>{props.category}</span>
        </div>
    );
}
```

### Cách khác: Destructuring ở dòng riêng
```jsx
function UserCard(props) {
    const { name, age, email, score } = props;  // ← Destructuring ở đây
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Tuổi: {age}</p>
        </div>
    );
}
```

---

## 📝 Bài 8.2 — Default Values (8 phút)

### Tại sao cần default values?
```jsx
// Không có default — nếu quên truyền age?
<UserCard name="Minh" email="minh@example.com" />
// → props.age = undefined → "Tuổi: undefined" 😱
```

### Cách 1: Default trong destructuring
```jsx
function UserCard({ name, age = 18, email, score = 0 }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Tuổi: {age}</p>        {/* Nếu không truyền → 18 */}
            <p>Email: {email}</p>
            <p>Điểm: {score}</p>      {/* Nếu không truyền → 0 */}
        </div>
    );
}

// Gọi — không cần truyền age và score
<UserCard name="Minh" email="minh@example.com" />
// → "Minh, 18, minh@example.com, 0"
```

### Cách 2: Default bằng `||` (ít dùng hơn)
```jsx
function UserCard({ name, age, email, score }) {
    const displayAge = age || 18;      // Nếu age là undefined → 18
    const displayScore = score || 0;   // Nếu score là undefined → 0
    return (
        <div>
            <h2>{name}</h2>
            <p>Tuổi: {displayAge}</p>
        </div>
    );
}
```

### Bài tập
```jsx
// Thêm default values cho component sau:
function Button({ text, color, size, disabled }) {
    return (
        <button 
            style={{ backgroundColor: color, fontSize: size }}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

// Yêu cầu:
// - text: không có default (bắt buộc)
// - color: default "#007bff"
// - size: default "16px"
// - disabled: default false
```

---

## 📝 Bài 8.3 — Children Prop (10 phút)

### Khái niệm: Component "ôm" nội dung khác

```jsx
// children = nội dung giữa <Card> và </Card>
<Card>
    <h2>Tiêu đề</h2>
    <p>Nội dung ở đây</p>
</Card>
```

### Ví dụ: Card component với children
```jsx
function Card({ title, children }) {
    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <div className="card-body">
                {children}   {/* ← Nội dung được "ôm" vào đây */}
            </div>
        </div>
    );
}

// Sử dụng — linh hoạt!
<Card title="Thông tin sinh viên">
    <p>Tên: Minh</p>
    <p>Tuổi: 20</p>
    <button>Chỉnh sửa</button>
</Card>

<Card title="Kết quả học tập">
    <ul>
        <li>Toán: 8</li>
        <li>Lý: 9</li>
    </ul>
</Card>
```

### Tại sao children mạnh?
```
Không có children:  Phải tạo CardProfile, CardGrade, CardSchedule riêng
Có children:        Dùng MỘT Card component cho mọi trường hợp!
```

### Bài tập: Layout component
```jsx
// Tạo component Container với children
function Container({ children }) {
    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '20px' 
        }}>
            {children}
        </div>
    );
}

// Sử dụng:
<Container>
    <h1>Trang chủ</h1>
    <p>Nội dung trang web</p>
</Container>
```

---

## 🧪 Thử thách

### 1. [Dễ] — Refactor component
```jsx
// Viết lại dùng destructuring + default values
function Avatar({ src, alt, size }) {
    return (
        <img 
            src={src} 
            alt={alt} 
            width={size} 
            height={size}
            style={{ borderRadius: '50%' }}
        />
    );
}

// Yêu cầu: size default 50, alt default "Avatar"
```

### 2. [Trung bình] — Card với children
```jsx
// Tạo Alert component với children
<Alert type="success">
    <p>Đăng ký thành công!</p>
</Alert>

<Alert type="error">
    <h3>Lỗi!</h3>
    <p>Email không hợp lệ</p>
</Alert>

// type: "success" (xanh), "error" (đỏ), "warning" (vàng)
// Dùng children để hiển thị nội dung
```

### 3. [Khó] — Component tổ hợp
```jsx
// Tạo ProfileCard với nhiều props + children
<ProfileCard name="Minh" age={20} avatar="minh.jpg">
    <p>Sinh viên năm 3</p>
    <p>Chuyên ngành: CNTT</p>
    <button>Kết bạn</button>
</ProfileCard>

// Yêu cầu:
// - Destructuring tất cả props
// - Default avatar nếu không truyền
// - children hiển thị trong phần "Giới thiệu"
```

---

## ✅ Checklist tự đánh giá

- [ ] Hiểu destructuring props là gì và viết được?
- [ ] Biết cách set default values cho props?
- [ ] Hiểu children prop hoạt động thế nào?
- [ ] Viết được component linh hoạt với children?
- [ ] Giải thích được tại sao destructuring tốt hơn `props.xxx`?

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 3:** Component cơ bản, import/export
- **Dùng kiến thức từ Tier 4:** useState (sẽ kết hợp với destructuring)
- **Sẽ cần trong Tier 9:** State patterns (destructuring state objects)
- **Sẽ cần trong Tier 13:** Context API (destructuring context values)
