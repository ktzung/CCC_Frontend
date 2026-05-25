# Exercise 5.2 — Shopping Cart Context

## 🎬 Opening Scenario

*Cần global cart state để quản lý items từ nhiều components. Sử dụng Context API để tạo CartProvider.*

---

## 📋 Requirements

### 1. Create Cart Context

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

    // Add to cart
    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });

        // Show notification
        setNotification(`${product.title} added to cart!`);
        setTimeout(() => setNotification(null), 3000);
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Update quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Cart total
    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Cart item count
    const cartCount = cart.reduce(
        (count, item) => count + item.quantity,
        0
    );

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartTotal,
        cartCount,
        notification
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
```

### 2. Wrap App with CartProvider

```jsx
// src/App.jsx
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <Router>
                <Header />
                <Routes>...</Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
}
```

### 3. Use Cart in Header (Badge)

```jsx
// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
    const { cartCount } = useCart();

    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">
                    Shop
                    {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                    )}
                </NavLink>
            </nav>
        </header>
    );
}
```

### 4. Add to Cart Button

```jsx
// src/components/ProductCard.jsx
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}
```

---

## 🐛 Hints

### Context Consumer Pattern
```jsx
// Option 1: useCart() hook (recommended)
const { cartCount } = useCart();

// Option 2: Consumer component
<CartContext.Consumer>
    {({ cartCount }) => <span>{cartCount}</span>}
</CartContext.Consumer>
```

### Cart Badge Styling
```css
.cart-badge {
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    margin-left: 0.5rem;
}
```

---

## ✅ Success Criteria

- [ ] CartContext created
- [ ] CartProvider wraps App
- [ ] addToCart works
- [ ] removeFromCart works
- [ ] cartCount badge updates
- [ ] Notification shows on add

---

**← [ Quay lại Session 5](../README.md)**