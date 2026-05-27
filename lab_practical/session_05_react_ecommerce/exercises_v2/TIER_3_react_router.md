# Tier 3 — React Router (Chuyển trang)

> **Thời gian:** 25-30 phút  
> **Yêu cầu:** Hoàn thành Tier 0-2  
> **Mục tiêu:** Tạo nhiều trang và chuyển đổi giữa chúng

---

## 🎯 Hôm nay bạn sẽ học

```
URL thay đổi → Component khác hiển thị
/              → Home
/products      → ProductList
/cart          → Cart
```

---

## 📝 Bài 3.1 — Cài đặt & Setup (10 phút)

### Bước 1: Cài đặt
```bash
npm install react-router-dom
```

### Bước 2: Tạo các trang
```jsx
// src/pages/Home.jsx
function Home() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>🏠 Trang chủ</h1>
            <p>Chào mừng đến với cửa hàng!</p>
        </div>
    );
}

export default Home;

// src/pages/Products.jsx
function Products() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>🛍️ Sản phẩm</h1>
            <p>Danh sách sản phẩm sẽ hiển thị ở đây</p>
        </div>
    );
}

export default Products;

// src/pages/About.jsx
function About() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>ℹ️ Giới thiệu</h1>
            <p>Thông tin về cửa hàng</p>
        </div>
    );
}

export default About;
```

### Bước 3: Setup Router trong App.jsx
```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";

function App() {
    return (
        <Router>
            {/* Navigation */}
            <nav style={{ 
                display: "flex", 
                gap: "15px", 
                padding: "15px",
                background: "#333",
                color: "white"
            }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    Trang chủ
                </Link>
                <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
                    Sản phẩm
                </Link>
                <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
                    Giới thiệu
                </Link>
            </nav>
            
            {/* Routes — Hiển thị component theo URL */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
```

### Thử thách
1. Thêm trang "Liên hệ" (/contact)
2. Highlight trang hiện tại trong nav
3. Thêm trang 404 (Not Found)

---

## 📝 Bài 3.2 — NavLink & useParams (15 phút)

### NavLink — Link có style active
```jsx
import { NavLink } from "react-router-dom";

function Navbar() {
    const linkStyle = ({ isActive }) => ({
        color: "white",
        textDecoration: "none",
        padding: "8px 16px",
        background: isActive ? "#3498db" : "transparent",
        borderRadius: "4px"
    });
    
    return (
        <nav style={{ display: "flex", gap: "10px", padding: "15px", background: "#333" }}>
            <NavLink to="/" style={linkStyle}>Trang chủ</NavLink>
            <NavLink to="/products" style={linkStyle}>Sản phẩm</NavLink>
            <NavLink to="/about" style={linkStyle}>Giới thiệu</NavLink>
        </nav>
    );
}

export default Navbar;
```

### useParams — Lấy tham số từ URL
```jsx
// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetail() {
    const { id } = useParams(); // Lấy id từ URL /products/:id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProduct();
    }, [id]); // Fetch lại khi id thay đổi
    
    if (loading) return <p>⏳ Đang tải...</p>;
    if (!product) return <p>Không tìm thấy sản phẩm</p>;
    
    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <img src={product.image} alt={product.title} style={{ height: "300px" }} />
            <h1>{product.title}</h1>
            <p style={{ color: "#e74c3c", fontSize: "24px" }}>${product.price}</p>
            <p>{product.description}</p>
            <button style={{ padding: "10px 20px", background: "#3498db", color: "white", border: "none" }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

export default ProductDetail;
```

### Thêm route động trong App.jsx
```jsx
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/about" element={<About />} />
</Routes>
```

### Link đến chi tiết sản phẩm
```jsx
import { Link } from "react-router-dom";

// Trong component danh sách sản phẩm
<Link to={`/products/${product.id}`}>
    Xem chi tiết
</Link>
```

### Thử thách
1. Hiển thị "Sản phẩm không tồn tại" nếu id sai
2. Thêm nút "Quay lại danh sách"
3. Tạo breadcrumb (Trang chủ > Sản phẩm > Chi tiết)

---

## ✅ Checklist

- [ ] Cài đặt react-router-dom
- [ ] Tạo nhiều trang (pages)
- [ ] Setup Routes trong App.jsx
- [ ] Sử dụng Link và NavLink
- [ ] Lấy tham số URL với useParams
- [ ] Tạo trang chi tiết sản phẩm

---

## 🎯 Tổng kết

```jsx
// Cài đặt
npm install react-router-dom

// Setup
<Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
</Router>

// Link
<Link to="/products">Sản phẩm</Link>

// Lấy param
const { id } = useParams();
```

**← Quay lại: [Tier 2 — Product List](TIER_2_product_list.md)**  
**→ Tiếp theo: [Tier 4 — Giỏ hàng với useState](TIER_4_cart_state.md)**
