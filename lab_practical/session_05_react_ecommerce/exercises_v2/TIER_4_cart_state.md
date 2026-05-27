# Tier 4 — Giỏ hàng với useState (Local State)

> **Thời gian:** 30-35 phút  
> **Yêu cầu:** Hoàn thành Tier 0-3  
> **Mục tiêu:** Quản lý giỏ hàng đơn giản với useState

---

## 🎯 Hôm nay bạn sẽ học

```
Giỏ hàng = useState([{id, title, price, quantity}])
Thêm     = setCart([...cart, newItem])
Xóa      = setCart(cart.filter(...))
Sửa SL   = setCart(cart.map(...))
```

---

## 📝 Bài 4.1 — Giỏ hàng cơ bản (15 phút)

### Code mẫu
```jsx
import { useState } from "react";

function SimpleCart() {
    const [cart, setCart] = useState([]);
    
    // Sản phẩm mẫu
    const products = [
        { id: 1, name: "Áo thun", price: 150000 },
        { id: 2, name: "Quần jean", price: 350000 },
        { id: 3, name: "Giày sneaker", price: 800000 }
    ];
    
    // Thêm vào giỏ
    function addToCart(product) {
        setCart(prev => {
            // Kiểm tra sản phẩm đã có trong giỏ chưa
            const existing = prev.find(item => item.id === product.id);
            
            if (existing) {
                // Nếu có rồi → tăng số lượng
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            // Nếu chưa có → thêm mới
            return [...prev, { ...product, quantity: 1 }];
        });
    }
    
    // Xóa khỏi giỏ
    function removeFromCart(productId) {
        setCart(prev => prev.filter(item => item.id !== productId));
    }
    
    // Cập nhật số lượng
    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCart(prev => prev.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    }
    
    // Tính tổng tiền
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Đếm số sản phẩm
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    return (
        <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
            {/* Danh sách sản phẩm */}
            <div style={{ flex: 1 }}>
                <h2>🛍️ Sản phẩm</h2>
                {products.map(product => (
                    <div key={product.id} style={{ 
                        padding: "10px", 
                        margin: "10px 0",
                        border: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div>
                            <strong>{product.name}</strong>
                            <p>{product.price.toLocaleString()}đ</p>
                        </div>
                        <button 
                            onClick={() => addToCart(product)}
                            style={{ 
                                background: "#3498db", 
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px"
                            }}
                        >
                            Thêm
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Giỏ hàng */}
            <div style={{ flex: 1 }}>
                <h2>🛒 Giỏ hàng ({itemCount})</h2>
                
                {cart.length === 0 ? (
                    <p style={{ color: "#999" }}>Giỏ hàng trống</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <div key={item.id} style={{ 
                                padding: "10px", 
                                margin: "10px 0",
                                border: "1px solid #eee",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>{item.price.toLocaleString()}đ x {item.quantity}</p>
                                </div>
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    <button onClick={() => removeFromCart(item.id)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "2px 5px" }}>Xóa</button>
                                </div>
                            </div>
                        ))}
                        
                        <div style={{ 
                            marginTop: "15px", 
                            padding: "10px",
                            background: "#f0f0f0",
                            fontWeight: "bold"
                        }}>
                            Tổng: {total.toLocaleString()}đ
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SimpleCart;
```

### Thử thách
1. Hiển thị "Đã thêm [tên sản phẩm]" khi thêm vào giỏ
2. Thêm nút "Xóa tất cả"
3. Lưu giỏ hàng vào localStorage

---

## 📝 Bài 4.2 — Tách CartItem component (10 phút)

### Code mẫu
```jsx
// src/components/CartItem.jsx
function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div style={{ 
            padding: "10px", 
            margin: "10px 0",
            border: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div>
                <strong>{item.name}</strong>
                <p>{item.price.toLocaleString()}đ</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                    -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                    +
                </button>
                <span style={{ minWidth: "80px", textAlign: "right" }}>
                    {(item.price * item.quantity).toLocaleString()}đ
                </span>
                <button 
                    onClick={() => onRemove(item.id)}
                    style={{ background: "#e74c3c", color: "white", border: "none", padding: "3px 8px" }}
                >
                    🗑
                </button>
            </div>
        </div>
    );
}

export default CartItem;
```

### Sử dụng trong Cart
```jsx
import CartItem from "./CartItem";

// Trong component Cart
{cart.map(item => (
    <CartItem 
        key={item.id}
        item={item}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
    />
))}
```

### Thử thách
1. Tách component `ProductCard`
2. Tách component `CartSummary` (hiển thị tổng tiền)
3. Thêm animation khi thêm/xóa sản phẩm

---

## ✅ Checklist

- [ ] Quản lý giỏ hàng với useState
- [ ] Thêm sản phẩm vào giỏ
- [ ] Xóa sản phẩm khỏi giỏ
- [ ] Cập nhật số lượng
- [ ] Tính tổng tiền
- [ ] Tách component CartItem

---

## 🎯 Tổng kết

```
Giỏ hàng = mảng các sản phẩm
[{id, name, price, quantity}, ...]

Thêm:     setCart([...cart, { ...product, quantity: 1 }])
Xóa:      setCart(cart.filter(item => item.id !== id))
Cập nhật: setCart(cart.map(item => item.id === id ? {...item, quantity} : item))
Tổng:     cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
```

**← Quay lại: [Tier 3 — React Router](TIER_3_react_router.md)**  
**→ Tiếp theo: [Tier 5 — Props Drilling Problem](TIER_5_props_drilling.md)**
