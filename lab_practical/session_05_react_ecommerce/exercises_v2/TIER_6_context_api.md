# Tier 6 — Context API (Giải pháp cho Props Drilling)

> **Thời gian:** 30-40 phút  
> **Yêu cầu:** Hoàn thành Tier 0-5  
> **Mục tiêu:** Sử dụng Context API để chia sẻ dữ liệu giữa các component

---

## 🎯 Hôm nay bạn sẽ học

```
Context = "Kênh truyền dữ liệu" xuyên qua component tree
Không cần truyền props qua nhiều lớp!
```

---

## 📝 Bài 6.1 — Context cơ bản (15 phút)

### Bước 1: Tạo Context
```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Tạo Provider (nhà cung cấp)
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    
    function toggleTheme() {
        setTheme(prev => prev === "light" ? "dark" : "light");
    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Tạo Hook để sử dụng dễ dàng
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme phải dùng trong ThemeProvider");
    }
    return context;
}
```

### Bước 2: Bọc ứng dụng bằng Provider
```jsx
// src/App.jsx
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
    return (
        <ThemeProvider>
            <Header />
            <Main />
        </ThemeProvider>
    );
}

export default App;
```

### Bước 3: Sử dụng trong bất kỳ component nào
```jsx
// src/components/Header.jsx
import { useTheme } from "../context/ThemeContext";

function Header() {
    const { theme, toggleTheme } = useTheme();
    
    const style = {
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        padding: "15px"
    };
    
    return (
        <header style={style}>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </header>
    );
}

export default Header;
```

```jsx
// src/components/Main.jsx
import { useTheme } from "../context/ThemeContext";

function Main() {
    const { theme } = useTheme();
    
    const style = {
        background: theme === "light" ? "#f5f5f5" : "#222",
        color: theme === "light" ? "#333" : "#fff",
        padding: "20px",
        minHeight: "400px"
    };
    
    return (
        <main style={style}>
            <h2>Nội dung chính</h2>
            <p>Theme hiện tại: {theme}</p>
        </main>
    );
}

export default Main;
```

### So sánh với Props Drilling

```jsx
// ❌ Props Drilling
<App theme={theme}>
    <Header theme={theme} toggleTheme={toggleTheme}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
    </Header>
</App>

// ✅ Context API
<ThemeProvider>
    <Header />  {/* Tự lấy theme từ Context */}
    <Main />    {/* Tự lấy theme từ Context */}
</ThemeProvider>
```

### Thử thách
1. Tạo Context cho ngôn ngữ (vi/en)
2. Tạo nút chuyển đổi ngôn ngữ
3. Hiển thị nội dung theo ngôn ngữ đã chọn

---

## 📝 Bài 6.2 — Context cho giỏ hàng (15 phút)

### Code mẫu
```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    
    // Thêm vào giỏ
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
    
    // Xóa khỏi giỏ
    function removeFromCart(productId) {
        setCart(prev => prev.filter(item => item.id !== productId));
    }
    
    // Cập nhật số lượng
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
    
    // Xóa tất cả
    function clearCart() {
        setCart([]);
    }
    
    // Tính tổng
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Đếm sản phẩm
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart phải dùng trong CartProvider");
    }
    return context;
}
```

### Sử dụng trong App.jsx
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
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;
```

### Sử dụng trong bất kỳ component nào
```jsx
// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
    const { itemCount } = useCart(); // Lấy số lượng từ Context
    
    return (
        <header style={{ display: "flex", justifyContent: "space-between", padding: "15px", background: "#333", color: "white" }}>
            <Link to="/" style={{ color: "white" }}>🛍️ Shop</Link>
            <Link to="/cart" style={{ color: "white" }}>
                🛒 Giỏ hàng ({itemCount})
            </Link>
        </header>
    );
}

export default Header;
```

```jsx
// src/pages/Products.jsx
import { useCart } from "../context/CartContext";

function Products() {
    const { addToCart } = useCart(); // Lấy hàm addToCart từ Context
    
    const products = [
        { id: 1, name: "Áo thun", price: 150000 },
        { id: 2, name: "Quần jean", price: 350000 },
        { id: 3, name: "Giày sneaker", price: 800000 }
    ];
    
    return (
        <div style={{ padding: "20px" }}>
            <h1>🛍️ Sản phẩm</h1>
            {products.map(product => (
                <div key={product.id} style={{ padding: "10px", margin: "10px 0", border: "1px solid #ddd" }}>
                    <h3>{product.name}</h3>
                    <p>{product.price.toLocaleString()}đ</p>
                    <button onClick={() => addToCart(product)}>
                        Thêm vào giỏ
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Products;
```

### Thử thách
1. Tạo trang Cart hiển thị giỏ hàng
2. Hiển thị thông báo "Đã thêm vào giỏ" khi thêm sản phẩm
3. Lưu giỏ hàng vào localStorage

---

## ✅ Checklist

- [ ] Hiểu Context API là gì
- [ ] Tạo Context với createContext
- [ ] Tạo Provider component
- [ ] Tạo custom Hook (useTheme, useCart)
- [ ] Sử dụng Context trong component
- [ ] Giải quyết props drilling

---

## 🎯 Tổng kết

```jsx
// 1. Tạo Context
const MyContext = createContext();

// 2. Tạo Provider
function MyProvider({ children }) {
    const [value, setValue] = useState(...);
    return (
        <MyContext.Provider value={{ value, setValue }}>
            {children}
        </MyContext.Provider>
    );
}

// 3. Tạo Hook
function useMyContext() {
    return useContext(MyContext);
}

// 4. Bọc ứng dụng
<MyProvider>
    <App />
</MyProvider>

// 5. Sử dụng ở bất kỳ đâu
const { value, setValue } = useMyContext();
```

**← Quay lại: [Tier 5 — Props Drilling](TIER_5_props_drilling.md)**  
**→ Tiếp theo: [Tier 7 — Mini Project: E-commerce](TIER_7_ecommerce_app.md)**
