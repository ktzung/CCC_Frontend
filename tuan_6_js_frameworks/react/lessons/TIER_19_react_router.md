# Tier 19 — React Router (Điều hướng trang trong SPA)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Tạo nhiều trang trong SPA bằng React Router v6  
> **📋 Cần biết:** Tier 0 (SPA Architecture), Tier 3 (Components)  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh có SPA với trang chủ, sản phẩm, giỏ hàng. Nhưng URL luôn là `/` — không thể share link đến trang sản phẩm!*

*"Dùng React Router. Nhiều trang, 1 file HTML, không reload."*

---

## 🎯 Hôm nay bạn sẽ học

```
React Router = Thư viện điều hướng cho SPA
             = Nhiều "trang" trong 1 file HTML
             = URL thay đổi → component thay đổi (không reload)
```

---

## 📝 Bài 19.1 — Setup & Routes (12 phút)

### Bước 1: Wrap App với BrowserRouter

```jsx
// main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

### Bước 2: Định nghĩa Routes

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}
```

---

## 📝 Bài 19.2 — Navigation (10 phút)

### Link (không reload)

```jsx
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Trang chủ</Link>
            <Link to="/products">Sản phẩm</Link>
            <Link to="/cart">Giỏ hàng</Link>
        </nav>
    );
}
```

### NavLink (active state)

```jsx
<NavLink to="/"
    className={({ isActive }) => isActive ? "nav-active" : ""}>
    Trang chủ
</NavLink>
```

### useNavigate (programmatic)

```jsx
function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        await loginAPI(credentials);
        navigate("/dashboard");  // Chuyển trang sau khi login
    };
}
```

---

## 📝 Bài 19.3 — Dynamic Routes (10 phút)

### URL parameters

```jsx
// Định nghĩa route động
<Route path="/products/:productId" element={<ProductDetailPage />} />

// Đọc params
function ProductDetailPage() {
    const { productId } = useParams();

    return (
        <div>
            <h1>Sản phẩm #{productId}</h1>
        </div>
    );
}
```

### Nested Routes

```jsx
<Route path="/products" element={<ProductsLayout />}>
    <Route index element={<ProductList />} />
    <Route path=":id" element={<ProductDetail />} />
</Route>

// ProductsLayout.jsx
function ProductsLayout() {
    return (
        <div>
            <h1>Sản phẩm</h1>
            <Outlet />  {/* ← Nested route render ở đây */}
        </div>
    );
}
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| `<a href>` dùng được | Phải dùng `<Link to>` (không reload) |
| Route phải khai báo trong App | Có thể ở bất kỳ component nào |
| useParams trả về string | Đúng, params luôn là string |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 0:** SPA Architecture — routing không reload
- **Dùng kiến thức từ Tier 3:** Components — mỗi route = 1 component
- **Sẽ cần trong Tier 22:** Redux — global state cho auth, cart across routes
- **Tham khảo thêm:** `06_routing_state/12_react_router.md` (file cũ)
