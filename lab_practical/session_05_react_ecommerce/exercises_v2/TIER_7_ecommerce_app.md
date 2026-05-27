# Tier 7 — Mini Project: E-commerce App (Tổng hợp)

> **Thời gian:** 60-90 phút  
> **Yêu cầu:** Hoàn thành Tier 0-6  
> **Mục tiêu:** Xây dựng ứng dụng thương mại điện tử hoàn chỉnh

---

## 🎯 Hôm nay bạn sẽ làm gì

```
Tier 0: useEffect         → Fetch dữ liệu sản phẩm
Tier 1: Fetch API         → Lấy sản phẩm từ API
Tier 2: Product List      → Hiển thị danh sách sản phẩm
Tier 3: React Router      → Chuyển trang (Home, Products, Cart)
Tier 4: Cart State        → Quản lý giỏ hàng
Tier 5: Props Drilling    → Hiểu vấn đề
Tier 6: Context API       → Giải pháp cho giỏ hàng
Tier 7: Tổng hợp          → Ứng dụng hoàn chỉnh!
```

---

## 📝 Yêu cầu tính năng

| # | Tính năng | Kiến thức sử dụng |
|---|-----------|-------------------|
| 1 | Hiển thị sản phẩm từ API | useEffect, fetch |
| 2 | Tìm kiếm sản phẩm | useState, filter |
| 3 | Chuyển trang | React Router |
| 4 | Thêm vào giỏ | Context API |
| 5 | Xem giỏ hàng | Context API |
| 6 | Cập nhật số lượng | Context API |
| 7 | Tính tổng tiền | reduce |

---

## 🏗️ Cấu trúc file

```
📁 src/
├── context/
│   └── CartContext.jsx      ← Context cho giỏ hàng
├── pages/
│   ├── Home.jsx             ← Trang chủ
│   ├── Products.jsx         ← Danh sách sản phẩm
│   ├── ProductDetail.jsx    ← Chi tiết sản phẩm
│   └── Cart.jsx             ← Giỏ hàng
├── components/
│   ├── Header.jsx           ← Header + Navigation
│   ├── ProductCard.jsx      ← Card sản phẩm
│   └── CartItem.jsx         ← Item trong giỏ
├── App.jsx                  ← Router + Provider
└── main.jsx
```

---

## 📝 Code hoàn chỉnh

### `context/CartContext.jsx`
```jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Load giỏ hàng từ localStorage
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });
    
    // Lưu vào localStorage khi cart thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    function addToCart(product) {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            return [...prev, { ...product, quantity: 1 }];
        });
    }
    
    function removeFromCart(productId) {
        setCart(prev => prev.filter(item => item.id !== productId));
    }
    
    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCart(prev => prev.map(item =>
            item.id === productId
                ? { ...item, quantity }
                : item
        ));
    }
    
    function clearCart() {
        setCart([]);
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart phải dùng trong CartProvider");
    return context;
}
```

### `components/Header.jsx`
```jsx
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
    const { itemCount } = useCart();
    
    const linkStyle = ({ isActive }) => ({
        color: "white",
        textDecoration: "none",
        padding: "8px 16px",
        background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
        borderRadius: "4px"
    });
    
    return (
        <header style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            padding: "15px 20px",
            background: "#2c3e50",
            color: "white"
        }}>
            <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "24px" }}>
                🛍️ MyShop
            </Link>
            
            <nav style={{ display: "flex", gap: "10px" }}>
                <NavLink to="/" style={linkStyle}>Trang chủ</NavLink>
                <NavLink to="/products" style={linkStyle}>Sản phẩm</NavLink>
                <NavLink to="/cart" style={linkStyle}>
                    🛒 Giỏ hàng ({itemCount})
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
```

### `pages/Products.jsx`
```jsx
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { addToCart } = useCart();
    
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProducts();
    }, []);
    
    const filteredProducts = products.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase())
    );
    
    if (loading) return <p style={{ textAlign: "center", padding: "40px" }}>⏳ Đang tải...</p>;
    
    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1>🛍️ Sản phẩm</h1>
            
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Tìm kiếm..."
                style={{ padding: "10px", width: "100%", marginBottom: "20px", fontSize: "16px" }}
            />
            
            <p>{filteredProducts.length} sản phẩm</p>
            
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px"
            }}>
                {filteredProducts.map(product => (
                    <div key={product.id} style={{ 
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "15px",
                        textAlign: "center"
                    }}>
                        <img 
                            src={product.image} 
                            alt={product.title}
                            style={{ height: "150px", objectFit: "contain" }}
                        />
                        <h3 style={{ fontSize: "14px" }}>{product.title.substring(0, 40)}...</h3>
                        <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "18px" }}>
                            ${product.price}
                        </p>
                        <button 
                            onClick={() => addToCart(product)}
                            style={{ 
                                background: "#3498db", 
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                width: "100%"
                            }}
                        >
                            Thêm vào giỏ
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
```

### `pages/Cart.jsx`
```jsx
import { useCart } from "../context/CartContext";

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
    
    if (cart.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "40px" }}>
                <h2>🛒 Giỏ hàng trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng!</p>
            </div>
        );
    }
    
    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>🛒 Giỏ hàng ({itemCount} sản phẩm)</h1>
            
            {cart.map(item => (
                <div key={item.id} style={{ 
                    display: "flex",
                    gap: "15px",
                    padding: "15px",
                    margin: "10px 0",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    alignItems: "center"
                }}>
                    <img src={item.image} alt={item.title} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                    
                    <div style={{ flex: 1 }}>
                        <h3>{item.title}</h3>
                        <p style={{ color: "#e74c3c" }}>${item.price}</p>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    
                    <p style={{ fontWeight: "bold", minWidth: "80px" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: "#e74c3c", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}
                    >
                        🗑
                    </button>
                </div>
            ))}
            
            <div style={{ 
                marginTop: "20px", 
                padding: "20px",
                background: "#f9f9f9",
                borderRadius: "8px",
                textAlign: "right"
            }}>
                <h3>Tổng cộng: ${total.toFixed(2)}</h3>
                <button 
                    style={{ 
                        background: "#27ae60", 
                        color: "white", 
                        border: "none", 
                        padding: "12px 24px", 
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}
                >
                    Thanh toán
                </button>
                <button 
                    onClick={clearCart}
                    style={{ 
                        background: "#95a5a6", 
                        color: "white", 
                        border: "none", 
                        padding: "12px 24px", 
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Xóa tất cả
                </button>
            </div>
        </div>
    );
}

export default Cart;
```

### `App.jsx`
```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
    return (
        <Router>
            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;
```

---

## ✅ Checklist

- [ ] Hiển thị sản phẩm từ API
- [ ] Tìm kiếm sản phẩm
- [ ] Chuyển trang bằng React Router
- [ ] Thêm sản phẩm vào giỏ
- [ ] Xem giỏ hàng
- [ ] Cập nhật số lượng
- [ ] Xóa sản phẩm
- [ ] Tính tổng tiền
- [ ] Lưu giỏ hàng vào localStorage

---

## 🎯 Thử thách mở rộng

### Level 1 (Dễ)
1. Thêm trang "Giới thiệu" (About)
2. Hiển thị rating cho sản phẩm
3. Thêm hiệu ứng hover cho card

### Level 2 (Trung bình)
4. Phân trang (1, 2, 3...)
5. Lọc theo category
6. Sắp xếp theo giá

### Level 3 (Khó)
7. Trang chi tiết sản phẩm (/products/:id)
8. Thông báo "Đã thêm vào giỏ"
9. Trang thanh toán (checkout form)

---

## 🎯 Tổng kết

```
Bạn đã học:
✅ useEffect (side effects)
✅ Fetch API (lấy dữ liệu)
✅ React Router (chuyển trang)
✅ Context API (chia sẻ state)
✅ Shopping Cart (giỏ hàng)
✅ localStorage (lưu dữ liệu)
✅ Component splitting (chia component)
```

**🎓 Chúc mừng! Bạn đã xây dựng E-commerce App hoàn chỉnh!**

**← Quay lại: [Tier 6 — Context API](TIER_6_context_api.md)**
