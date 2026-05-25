# Exercise 5.4 — Checkout Flow + Validation

## 🎬 Opening Scenario

*Hoàn thiện checkout flow: Cart Summary → Checkout Form → Order Confirmation.*

---

## 📋 Requirements

### 1. Cart Page

```jsx
// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Your cart is empty</h2>
                <Link to="/shop" className="btn-primary">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            <div className="cart-layout">
                {/* Cart Items */}
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p className="price">${item.price}</p>
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="cart-summary">
                    <h2>Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax (10%)</span>
                        <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${(cartTotal * 1.1).toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn-checkout">
                        Proceed to Checkout
                    </Link>
                    <button onClick={clearCart} className="btn-clear">
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
```

### 2. Checkout Page

```jsx
// src/pages/Checkout.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Simulate order placement
        const newOrderId = 'ORD-' + Date.now().toString(36).toUpperCase();
        setOrderId(newOrderId);
        setOrderPlaced(true);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <div className="order-confirmation">
                <h1>Order Confirmed!</h1>
                <p className="order-id">Order ID: {orderId}</p>
                <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
                <button onClick={() => navigate('/shop')} className="btn-primary">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <div className="checkout-layout">
                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="checkout-form">
                    <h2>Shipping Information</h2>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        {errors.address && <span className="error">{errors.address}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                            {errors.city && <span className="error">{errors.city}</span>}
                        </div>
                        <div className="form-group">
                            <label>ZIP Code</label>
                            <input
                                type="text"
                                value={formData.zip}
                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            />
                            {errors.zip && <span className="error">{errors.zip}</span>}
                        </div>
                    </div>

                    <button type="submit" className="btn-place-order">
                        Place Order
                    </button>
                </form>

                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        {cart.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.title} x{item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${(cartTotal * 1.1).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
```

---

## 🎨 Checkout Styling

```css
.checkout-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 3rem;
}

@media (max-width: 768px) {
    .checkout-layout { grid-template-columns: 1fr; }
}

.checkout-form {
    background: var(--bg-secondary);
    padding: 2rem;
    border-radius: 12px;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.order-confirmation {
    text-align: center;
    padding: 4rem 2rem;
}

.order-id {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--accent-color);
    margin: 1rem 0;
}
```

---

## ✅ Success Criteria

- [ ] Cart page shows all items
- [ ] Quantity can be updated
- [ ] Items can be removed
- [ ] Cart total calculated correctly
- [ ] Checkout form validates
- [ ] Order confirmation shown after submit
- [ ] Order ID generated

---

**← [ Quay lại Session 5](../README.md) | Kết thúc Lab Practical →**