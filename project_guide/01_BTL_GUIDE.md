# 🎯 BÀI TẬP LỚN: HƯỚNG DẪN CHI TIẾT
# **Mini E-Commerce Website SPA**

---

# 📌 TỔNG QUAN DỰ ÁN

Xây dựng một **Single Page Application (SPA) thương mại điện tử mini** với các tính năng:
- Trang chủ (Home) với danh sách sản phẩm
- Chi tiết sản phẩm (Product Detail)
- Giỏ hàng (Shopping Cart)
- Trang quản trị (Admin Panel) để CRUD sản phẩm

**Tech Stack:**
- Frontend: HTML5, CSS3, JavaScript ES6+, React/Vue
- Backend: Mock API (Fake Store API hoặc Custom JSON Server)
- Tooling: Vite, GitHub

---

# 📁 CẤU TRÚC FOLDER KHUYẾN NGHỊ

```
e-commerce-spa/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   └── responsive.css
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx (hoặc .vue)
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   └── ProductPagination.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── EmptyCart.jsx
│   │   └── admin/
│   │       ├── ProductForm.jsx
│   │       ├── ProductTable.jsx
│   │       └── AdminStats.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Admin.jsx
│   ├── services/
│   │   └── api.js (Fetch requests)
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

# 🎨 PHASE 1: SETUP & HTML + CSS (TUẦN 1-2)

## Goal: Trang tĩnh responsive hoàn chỉnh

### 1.1. Initialize Project

```bash
# Create Vite project
npm create vite@latest my-ecommerce -- --template react
cd my-ecommerce
npm install

# Or for Vue
npm create vite@latest my-ecommerce -- --template vue
npm install

# Start dev server
npm run dev
```

### 1.2. Tạo HTML Structure

**Pages cần tạo:**

#### Home Page (`src/pages/Home.jsx`)
```jsx
export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to E-Commerce</h1>
        <p>Browse our amazing products</p>
      </section>

      <section className="products">
        <div className="filter">
          <input type="text" placeholder="Search...">
          <select>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
          </select>
        </div>

        <div className="products-grid">
          {/* ProductCard components */}
        </div>

        <div className="pagination">
          {/* Pagination */}
        </div>
      </section>
    </div>
  )
}
```

#### Product Detail Page
```jsx
export default function ProductDetail({ productId }) {
  return (
    <div className="product-detail">
      <div className="product-image">
        <img src="product.jpg" alt="Product">
      </div>

      <div className="product-info">
        <h1>Product Name</h1>
        <p className="price">$99.99</p>
        <p className="description">Description here</p>

        <div className="quantity">
          <button>-</button>
          <input type="number" value="1">
          <button>+</button>
        </div>

        <button className="btn-add-cart">Add to Cart</button>
      </div>
    </div>
  )
}
```

#### Shopping Cart Page
```jsx
export default function Cart() {
  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {/* CartItem components */}
      </div>

      <div className="cart-summary">
        <p>Subtotal: $100</p>
        <p>Tax: $10</p>
        <p className="total">Total: $110</p>
        <button className="btn-checkout">Checkout</button>
      </div>
    </div>
  )
}
```

#### Admin Page
```jsx
export default function Admin() {
  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <div className="admin-nav">
        <button className="active">Products</button>
        <button>Statistics</button>
      </div>

      <div className="admin-content">
        <div className="add-product">
          <button>+ Add New Product</button>
        </div>

        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ProductTable */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### 1.3. CSS Styling

**Global Styles (`src/assets/css/global.css`):**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* Header */
header {
  background-color: #333;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header nav {
  display: flex;
  gap: 30px;
  list-style: none;
}

header nav a {
  color: white;
  text-decoration: none;
}

header nav a:hover {
  color: #ff6600;
}

/* Main Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-price {
  font-size: 18px;
  color: #ff6600;
  font-weight: bold;
}

/* Buttons */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary {
  background-color: #ff6600;
  color: white;
}

.btn-primary:hover {
  background-color: #e55a00;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* Forms */
input, select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus, select:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 5px rgba(255, 102, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 15px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  header nav {
    flex-direction: column;
    gap: 10px;
  }
}
```

---

# 🟡 PHASE 2: JAVASCRIPT & DOM INTERACTIVITY (TUẦN 3-4)

## Goal: Website hoạt động với vanilla JavaScript

### 2.1. Event Handling

**Example: Add to Cart**
```javascript
const addToCartBtn = document.querySelector('.btn-add-cart');
const quantityInput = document.querySelector('input[type="number"]');

addToCartBtn.addEventListener('click', () => {
  const quantity = parseInt(quantityInput.value);
  const productId = getProductId();

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
});
```

### 2.2. Form Validation

```javascript
function validateForm(formData) {
  const errors = {};

  if (!formData.name) {
    errors.name = 'Name is required';
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (formData.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  return errors;
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

### 2.3. LocalStorage for Cart

```javascript
// Save cart
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart
function loadCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Update cart item quantity
function updateCartItem(productId, newQuantity) {
  let cart = loadCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (newQuantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      item.quantity = newQuantity;
    }
  }

  saveCart(cart);
  return cart;
}

// Calculate total
function calculateTotal(cart, products) {
  return cart.reduce((total, cartItem) => {
    const product = products.find(p => p.id === cartItem.id);
    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);
}
```

---

# 🔵 PHASE 3: FETCH API & ASYNC JAVASCRIPT (TUẦN 5)

## Goal: Kết nối mock API

### 3.1. API Service

```javascript
// src/services/api.js

const API_URL = 'https://fakestoreapi.com/products';

export async function getProducts(limit = 12, category = null) {
  try {
    let url = `${API_URL}?limit=${limit}`;
    if (category) {
      url = `${API_URL}/category/${category}?limit=${limit}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Product not found');

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function createProduct(productData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete product');
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
```

### 3.2. Fetch & Render Products

```javascript
async function loadProducts() {
  try {
    // Show loading
    const container = document.querySelector('.products-grid');
    container.innerHTML = '<p>Loading...</p>';

    // Fetch data
    const products = await getProducts(12);

    // Render products
    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <button class="btn btn-primary" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('[data-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        addToCart(productId);
      });
    });
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Failed to load products');
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadProducts);
```

---

# ⚛️ PHASE 4: REACT/VUE SPA (TUẦN 6-7)

## Goal: Migrate sang framework

### 4.1. React Implementation

**App.jsx:**
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
```

**Home.jsx:**
```jsx
import { useState, useEffect } from 'react'
import { getProducts } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import Loading from '../components/common/Loading'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <section className="hero">
        <h1>Welcome</h1>
      </section>

      <section className="products">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

**ProductCard.jsx:**
```jsx
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image">
      <div className="product-info">
        <h3 className="product-name">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  )
}
```

---

# 📋 CHECKLIST TRƯỚC KHI NỘP

### HTML + CSS
- [ ] Semantic HTML markup
- [ ] Responsive 3 breakpoints (mobile, tablet, desktop)
- [ ] Flexbox hoặc Grid layout
- [ ] No console errors
- [ ] Clean CSS organization (variables, media queries)

### JavaScript
- [ ] Event handling (click, input, submit)
- [ ] Form validation
- [ ] LocalStorage for cart
- [ ] Error handling
- [ ] Clean code structure

### Fetch & API
- [ ] Fetch GET request hoạt động
- [ ] POST request (admin create)
- [ ] PUT request (admin edit)
- [ ] DELETE request (admin delete)
- [ ] Loading states
- [ ] Error messages

### React/Vue
- [ ] Components well-organized
- [ ] Props truyền đúng
- [ ] State management hoạt động
- [ ] Routing hoạt động (4+ pages)
- [ ] No warnings in console

### Deployment & Documentation
- [ ] GitHub repo public
- [ ] README.md đầy đủ
- [ ] Live demo link (Vercel/Netlify)
- [ ] Screenshots trong README
- [ ] Commit history rõ ràng

---

# 🎁 BONUS: Advanced Features

### Authentication (+3%)
- Login/Register form
- JWT token management
- Protected routes (Admin)

### Advanced Search & Filter (+2%)
- Search by keyword
- Filter by category, price range
- Sort by price, name

### Performance Optimization (+2%)
- Lazy loading images
- Code splitting
- Memoization (React.memo)

### Wishlist/Favorites (+1%)
- Add products to wishlist
- Save to localStorage
- Display wishlist page

---

# 📞 SUPPORT & RESOURCES

**Cần giúp? Tham khảo:**
1. FAQ_TROUBLESHOOTING.md
2. QUICK_REFERENCE.md
3. Official docs: React.dev, Vue.org
4. Stack Overflow
5. Ask instructor

---

**Chúc bạn xây dựng được một website thương mại điện tử tuyệt vời! 🚀**
