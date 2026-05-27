# Tier 5 — Props Drilling Problem (Vấn đề truyền props qua nhiều lớp)

> **Thời gian:** 20-25 phút  
> **Yêu cầu:** Hoàn thành Tier 0-4  
> **Mục tiêu:** Hiểu vấn đề props drilling, tạo tiền đề cho Context API

---

## 🎯 Hôm nay bạn sẽ học

```
Vấn đề: Props phải truyền qua NHIỀU lớp component
Giải pháp: Context API (sẽ học ở Tier 6)
```

---

## 📝 Bài 5.1 — Props Drilling là gì? (10 phút)

### Vấn đề
Khi component cha muốn truyền dữ liệu cho component cháu (qua nhiều lớp):

```
App (có cart state)
  └── Header (nhận cart, truyền tiếp)
       └── Navbar (nhận cart, truyền tiếp)
            └── CartIcon (nhận cart, hiển thị số lượng)
```

### Code mẫu — Props Drilling
```jsx
// ❌ PHỨC TẠP: Phải truyền props qua nhiều lớp

// App.jsx
function App() {
    const [cart, setCart] = useState([]);
    
    return (
        <div>
            {/* Truyền cart và setCart cho Header */}
            <Header cart={cart} setCart={setCart} />
            <Main cart={cart} setCart={setCart} />
        </div>
    );
}

// Header.jsx
function Header({ cart, setCart }) {
    // Header không dùng cart, nhưng phải nhận để truyền tiếp
    return (
        <header>
            <Navbar cart={cart} setCart={setCart} />
        </header>
    );
}

// Navbar.jsx
function Navbar({ cart, setCart }) {
    // Navbar cũng không dùng cart trực tiếp
    return (
        <nav>
            <CartIcon cart={cart} />
            <CartDropdown cart={cart} setCart={setCart} />
        </nav>
    );
}

// CartIcon.jsx
// Cuối cùng mới dùng cart!
function CartIcon({ cart }) {
    return (
        <div>
            🛒 {cart.length}
        </div>
    );
}
```

### Tại sao đây là vấn đề?

| Vấn đề | Mô tả |
|--------|-------|
| 🔴 Khó bảo trì | Phải sửa nhiều file khi thay đổi props |
| 🔴 Props không cần thiết | Header, Navbar không cần cart nhưng vẫn phải nhận |
| 🔴 Khó tái sử dụng | Component bị phụ thuộc vào props cụ thể |
| 🔴 Code dài dòng | Phải viết `{cart}` ở nhiều nơi |

---

## 📝 Bài 5.2 — Nhận diện Props Drilling (10 phút)

### Dấu hiệu nhận biết

```jsx
// ❌ DẤU HIỆU 1: Truyền props qua 3+ lớp
<App cart={cart}>
  <Layout cart={cart}>
    <Sidebar cart={cart}>
      <CartWidget cart={cart} />  {/* 4 lớp! */}
    </Sidebar>
  </Layout>
</App>

// ❌ DẤU HIỆU 2: Component trung gian không dùng props
function Header({ cart, setCart, user, setUser }) {
    // Header không dùng cart, nhưng vẫn phải nhận
    return <Navbar cart={cart} setCart={setCart} />;
}

// ❌ DẤU HIỆU 3: Phải truyền nhiều props giống nhau
<ChildA data={data} onAction={handleAction} />
<ChildB data={data} onAction={handleAction} />
<ChildC data={data} onAction={handleAction} />
```

### Bài tập nhận diện
Xác định props drilling trong đoạn code sau:

```jsx
function App() {
    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState(null);
    
    return (
        <Layout theme={theme} user={user}>
            <Sidebar theme={theme} user={user} setTheme={setTheme}>
                <UserMenu user={user} setUser={setUser} />
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </Sidebar>
            <Main theme={theme} user={user}>
                <Content theme={theme} />
            </Main>
        </Layout>
    );
}
```

**Câu hỏi:**
1. Component nào thực sự cần `theme`?
2. Component nào thực sự cần `user`?
3. Component nào chỉ "truyền tiếp" mà không dùng?

---

## ✅ Checklist

- [ ] Hiểu props drilling là gì
- [ ] Nhận diện được props drilling
- [ ] Biết tại sao props drilling là vấn đề
- [ ] Sẵn sàng học Context API (Tier 6)

---

## 🎯 Tổng kết

```
Props Drilling = Truyền props qua nhiều lớp component

Vấn đề:
- Khó bảo trì
- Props không cần thiết
- Khó tái sử dụng

Giải pháp: Context API (Tier 6)
```

**← Quay lại: [Tier 4 — Cart State](TIER_4_cart_state.md)**  
**→ Tiếp theo: [Tier 6 — Context API](TIER_6_context_api.md)**
