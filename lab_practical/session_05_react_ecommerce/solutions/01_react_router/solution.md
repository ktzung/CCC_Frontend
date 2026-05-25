# Solution 5.1 — React Router + Pages

## Complete E-commerce Router Setup

### Project Setup

```bash
npm create vite@latest session_05_ecommerce -- --template react
cd session_05_ecommerce
npm install react-router-dom bootstrap bootstrap-icons
npm run dev
```

### src/App.jsx

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
```

### src/components/Header.jsx

```jsx
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

function Header() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="header sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            <i className="bi bi-bag-check me-2"></i>ShopHub
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-house-door me-1"></i>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-cart3 me-1"></i>Cart
                  {cartCount > 0 && (
                    <span className="cart-badge ms-1">{cartCount}</span>
                  )}
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-primary position-relative">
                <i className="bi bi-heart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </button>
            </div>
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
.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-link {
  position: relative;
  color: #475569;
  font-weight: 500;
  padding: 0.75rem 1rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #6366f1;
}

.nav-link.active {
  color: #6366f1;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 3px;
  background: #6366f1;
  border-radius: 2px;
}

.cart-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.45rem;
  background: #6366f1;
  color: white;
  border-radius: 9999px;
  font-weight: 600;
}

@media (max-width: 991px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
}
```

### src/components/Footer.jsx

```jsx
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-bag-check me-2"></i>ShopHub
            </h5>
            <p className="text-white-50 mb-0">
              Your one-stop shop for quality products at great prices.
              Fast shipping and excellent customer service.
            </p>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold mb-3 text-uppercase">Shop</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/shop" className="text-white-50 text-decoration-none">All Products</Link></li>
              <li className="mb-2"><Link to="/shop?category=electronics" className="text-white-50 text-decoration-none">Electronics</Link></li>
              <li className="mb-2"><Link to="/shop?category=jewelery" className="text-white-50 text-decoration-none">Jewelery</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold mb-3 text-uppercase">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/cart" className="text-white-50 text-decoration-none">Cart</Link></li>
              <li className="mb-2"><Link to="/checkout" className="text-white-50 text-decoration-none">Checkout</Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3 text-uppercase">Connect</h6>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
              <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
            </div>
            <p className="text-white-50 small mb-0">support@shophub.com</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-white-50 mb-0">&copy; {currentYear} ShopHub. All rights reserved.</p>
          <p className="text-white-50 mb-0 mt-2 mt-md-0">Made with ❤️</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

### src/pages/Home.jsx

```jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Home.css'

function Home() {
  const { addToCart } = useCart()

  const featuredProducts = [
    { id: 1, title: 'Premium Headphones', price: 199.99, image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Headphones' },
    { id: 2, title: 'Smart Watch', price: 299.99, image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Smart+Watch' },
    { id: 3, title: 'Wireless Earbuds', price: 149.99, image: 'https://via.placeholder.com/300x200/14b8a6/ffffff?text=Earbuds' },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">
                Shop Smart,<br />
                <span className="text-warning">Live Better</span>
              </h1>
              <p className="lead opacity-75 mb-4">
                Discover the latest tech gadgets and accessories at unbeatable prices.
                Quality guaranteed with fast shipping.
              </p>
              <Link to="/shop" className="btn btn-light btn-lg px-4 fw-semibold">
                <i className="bi bi-bag me-2"></i>Shop Now
              </Link>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img
                src="https://via.placeholder.com/400x300/ffffff/6366f1?text=Shop+Hero"
                alt="Hero"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="feature-icon mx-auto mb-3">
                <i className="bi bi-truck fs-1 text-primary"></i>
              </div>
              <h5 className="fw-bold">Free Shipping</h5>
              <p className="text-muted mb-0">On orders over $50</p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon mx-auto mb-3">
                <i className="bi bi-shield-check fs-1 text-primary"></i>
              </div>
              <h5 className="fw-bold">Secure Payment</h5>
              <p className="text-muted mb-0">100% secure checkout</p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon mx-auto mb-3">
                <i className="bi bi-arrow-repeat fs-1 text-primary"></i>
              </div>
              <h5 className="fw-bold">Easy Returns</h5>
              <p className="text-muted mb-0">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container py-5">
          <h2 className="display-6 fw-bold text-center mb-5">Featured Products</h2>
          <div className="row g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img src={product.image} className="card-img-top" alt={product.title} />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{product.title}</h5>
                    <p className="text-primary fw-bold fs-5">${product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-outline-primary btn-lg px-5">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-primary text-white">
        <div className="container py-5 text-center">
          <h2 className="fw-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="lead opacity-75 mb-4">Get exclusive deals and early access to new products.</p>
          <form className="row g-2 justify-content-center">
            <div className="col-auto">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                style={{ minWidth: '300px' }}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-light btn-lg px-4">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
```

### src/pages/Shop.jsx

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import './Shop.css'

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const url = category === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${category}`
        const response = await fetch(url)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'jewelery', label: 'Jewelery' },
    { key: "men's clothing", label: "Men's Clothing" },
    { key: "women's clothing", label: "Women's Clothing" },
  ]

  return (
    <div className="shop-page py-5">
      <div className="container">
        <h1 className="display-5 fw-bold mb-3">Shop</h1>
        <p className="text-muted mb-5">Browse our collection of quality products</p>

        {/* Category Filter */}
        <div className="category-filter d-flex flex-wrap gap-2 mb-5">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`btn ${category === cat.key ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <p className="text-muted mb-4">{products.length} products found</p>
            <div className="row g-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Shop
```

### src/pages/NotFound.jsx

```jsx
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found-page text-center py-5">
      <div className="container py-5">
        <h1 className="display-1 fw-bold text-muted mb-4">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg px-4">
          <i className="bi bi-house me-2"></i>Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
```

### src/App.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #334155;
}

.app {
  min-height: 100vh;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer .social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer .social-link:hover {
  background: #6366f1;
  transform: translateY(-3px);
}
```

### src/context/CartContext.jsx

```jsx
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState(null)

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    showNotification(`${product.title} added to cart!`)
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    notification
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
```

---

## Commit Message Examples

```bash
git commit -m "[ROUTER] Install and setup React Router

- Install react-router-dom package
- Import BrowserRouter, Routes, Route
- Create App.jsx with router structure
- Wrap app in Router component"

git commit -m "[ROUTER] Create page components

- Create Home, Shop, Cart, Checkout pages
- Add placeholder content for each page
- Export components for routing"

git commit -m "[UI] Build Header with navigation

- Add NavLink with active state styling
- Create responsive navbar with toggle
- Add cart badge with item count
- Style active link indicator"

git commit -m "[POLISH] Create NotFound page and Footer

- Build 404 page with styled message
- Add back to home link
- Create footer with links and social
- Style footer with brand colors"
```

---

## Key Learning Points

### 1. Route Configuration
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. NavLink with Active State
```jsx
<NavLink
  to="/"
  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
>
  Home
</NavLink>
```

### 3. Dynamic Route Parameter
```jsx
<Route path="/product/:id" element={<ProductDetail />} />
// Access: useParams().id
```

### 4. Nested Routes
```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="shop" element={<Shop />} />
  </Route>
</Routes>
```

---

**← [ Quay lại Exercise 5.1](../exercises/01_react_router.md)**