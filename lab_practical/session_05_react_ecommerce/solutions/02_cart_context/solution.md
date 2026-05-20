# Solution 5.2 — Shopping Cart Context

## Complete Cart Context Implementation

### src/context/CartContext.jsx

```jsx
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  // Cart state - array of items with quantity
  const [cart, setCart] = useState([])

  // Notification state for add to cart feedback
  const [notification, setNotification] = useState(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage')
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Add item to cart
  const addToCart = (product) => {
    setCart(prev => {
      // Check if item already in cart
      const existingItem = prev.find(item => item.id === product.id)

      if (existingItem) {
        // Update quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // Add new item with quantity 1
      return [...prev, { ...product, quantity: 1 }]
    })

    // Show notification
    showNotification(`${product.title} added to cart!`)
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
    showNotification('Item removed from cart')
  }

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
    showNotification('Cart cleared')
  }

  // Show temporary notification
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  // Computed values
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  )

  // Items with discount applied
  const cartWithDiscounts = cart.map(item => ({
    ...item,
    discountedPrice: item.price * 0.9, // 10% off
    discount: 0.1
  }))

  // Value to expose via context
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    notification,
    cartWithDiscounts
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Notification Toast */}
      {notification && (
        <div className="notification-toast">
          <i className="bi bi-check-circle-fill me-2"></i>
          {notification}
        </div>
      )}
    </CartContext.Provider>
  )
}

// Custom hook for using cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
```

### src/components/Header.jsx (Cart Badge)

```jsx
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

function Header() {
  const { cartCount } = useCart()

  return (
    <header className="header sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            <i className="bi bi-bag-check me-2"></i>ShopHub
          </Link>

          <div className="d-flex align-items-center gap-3">
            <NavLink
              to="/shop"
              className={({ isActive }) => `nav-link d-none d-lg-block ${isActive ? 'active' : ''}`}
            >
              Shop
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) => `nav-link position-relative ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-cart3 fs-5"></i>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
```

### src/components/Header.css

```css
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Notification Toast */
.notification-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #22c55e;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  display: flex;
  align-items: center;
  animation: slideInRight 0.3s ease;
}

.notification-toast i {
  font-size: 1.25rem;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### src/components/ProductCard.jsx

```jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart()

  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div className="card product-card h-100 border-0 shadow-sm">
        <div className="position-relative">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              className="card-img-top p-3"
              alt={product.title}
              style={{ height: '200px', objectFit: 'contain' }}
            />
          </Link>

          {/* Add to cart button overlay */}
          <button
            className="add-to-cart-btn position-absolute"
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <i className="bi bi-cart-plus"></i>
          </button>
        </div>

        <div className="card-body text-center">
          <span className="badge bg-secondary mb-2 category-badge">
            {product.category}
          </span>
          <h5 className="card-title fw-bold text-truncate">{product.title}</h5>
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <span className="text-primary fw-bold fs-5">${product.price}</span>
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => addToCart(product)}
            >
              <i className="bi bi-cart-plus me-1"></i>Add
            </button>
            <Link
              to={`/product/${product.id}`}
              className="btn btn-primary btn-sm"
            >
              <i className="bi bi-eye me-1"></i>View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
```

### src/components/ProductCard.css

```css
.product-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
}

.product-card .card-img-top {
  transition: transform 0.3s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.05);
}

.category-badge {
  text-transform: capitalize;
}

.add-to-cart-btn {
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.product-card:hover .add-to-cart-btn {
  opacity: 1;
  transform: scale(1);
}

.add-to-cart-btn:hover {
  background: #6366f1;
  color: white;
}

.add-to-cart-btn i {
  font-size: 1.25rem;
}
```

### src/pages/Cart.jsx

```jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-page py-5">
        <div className="container text-center py-5">
          <i className="bi bi-cart-x fs-1 text-muted mb-4"></i>
          <h2 className="mb-3">Your Cart is Empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary btn-lg px-4">
            <i className="bi bi-bag me-2"></i>Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page py-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5 fw-bold">Shopping Cart</h1>
          <button className="btn btn-outline-danger" onClick={clearCart}>
            <i className="bi bi-trash me-2"></i>Clear Cart
          </button>
        </div>

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="row align-items-center g-3 p-3">
                      {/* Product Image */}
                      <div className="col-3 col-md-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded"
                          style={{ maxHeight: '80px', objectFit: 'contain' }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="col-5 col-md-4">
                        <h6 className="fw-bold text-truncate mb-1">{item.title}</h6>
                        <p className="text-muted small mb-0">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-4 col-md-3">
                        <div className="quantity-controls d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="quantity-value fw-bold">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-6 col-md-2 text-end">
                        <span className="fw-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <div className="col-6 col-md-1 text-end">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items ({cartCount})</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <span className="text-success">Free</span>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5 text-primary">${cartTotal.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="btn btn-primary btn-lg w-100">
                  <i className="bi bi-credit-card me-2"></i>Proceed to Checkout
                </Link>

                <Link to="/shop" className="btn btn-outline-secondary w-100 mt-3">
                  <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
```

### src/pages/Cart.css

```css
.cart-item {
  border-bottom: 1px solid #e2e8f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.quantity-controls {
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.25rem;
}

.quantity-value {
  min-width: 30px;
  text-align: center;
}
```

---

## Commit Message Examples

```bash
git commit -m "[STATE] Create CartContext with useState

- Define cart state as array of items
- Implement addToCart with quantity increment
- Add removeFromCart filter function
- Create updateQuantity for quantity changes"

git commit -m "[FEATURE] Add cart badge in Header

- Import useCart hook in Header
- Display cartCount from context
- Show badge only when count > 0
- Position badge top-right of icon"

git commit -m "[STATE] Persist cart with localStorage

- Use useEffect to load cart on mount
- Save cart to localStorage on change
- Handle JSON parse errors gracefully
- Sync cart across page refreshes"

git commit -m "[UI] Create notification toast

- Add notification state to context
- Show toast on addToCart/removeFromCart
- Auto-hide after 3 seconds
- Style toast with slide-in animation"
```

---

## Key Learning Points

### 1. Context Creation Pattern
```jsx
const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  // ... provider logic
  return (
    <CartContext.Provider value={{ cart, addToCart, ... }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
```

### 2. Add to Cart Logic
```jsx
const addToCart = (product) => {
  setCart(prev => {
    const existing = prev.find(item => item.id === product.id)
    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
    return [...prev, { ...product, quantity: 1 }]
  })
}
```

### 3. Computed Values from State
```jsx
const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
)
```

### 4. useCart Hook Usage
```jsx
function ProductCard({ product }) {
  const { addToCart } = useCart()
  return <button onClick={() => addToCart(product)}>Add</button>
}
```

---

**← [ Quay lại Exercise 5.2](../exercises/02_cart_context.md)**