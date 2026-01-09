# 🎯 PROJECT GUIDE
# **HƯỚNG DẪN DỰ ÁN E-COMMERCE SPA**

*Tài liệu hướng dẫn xây dựng dự án Mini E-Commerce Website từ A-Z*

---

## 📋 MỤC LỤC

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Yêu cầu chức năng](#2-yêu-cầu-chức-năng)
3. [Tech Stack](#3-tech-stack)
4. [Cấu trúc thư mục](#4-cấu-trúc-thư-mục)
5. [Setup môi trường](#5-setup-môi-trường)
6. [Phase 1: HTML + CSS](#6-phase-1-html--css)
7. [Phase 2: JavaScript](#7-phase-2-javascript)
8. [Phase 3: React/Vue SPA](#8-phase-3-reactvue-spa)
9. [Deployment](#9-deployment)
10. [Grading Rubric](#10-grading-rubric)

---

# 1. **TỔNG QUAN DỰ ÁN**

## 1.1. Mô tả

Xây dựng **Mini E-Commerce Website** với đầy đủ chức năng:
- Trang người dùng: Xem sản phẩm, giỏ hàng
- Trang quản trị: CRUD sản phẩm
- Single Page Application với React/Vue
- Kết nối RESTful API

---

## 1.2. Mục tiêu

✅ Áp dụng kiến thức HTML5, CSS3, JavaScript ES6+
✅ Xây dựng responsive design
✅ Làm việc với API
✅ Sử dụng React/Vue framework
✅ Deploy lên hosting

---

## 1.3. Timeline

| Phase | Tuần | Nội dung |
|:------|:-----|:---------|
| **Phase 1** | 1-2 | HTML + CSS Layout, Responsive |
| **Phase 2** | 3-5 | JavaScript, DOM, API Integration |
| **Phase 3** | 6-7 | React/Vue SPA, Routing |
| **Polish** | 7.5 | Bug fixes, Documentation, Deploy |

---

# 2. **YÊU CẦU CHỨC NĂNG**

## 2.1. Trang người dùng (Customer)

### **Home Page**

```
+--------------------------------------------------+
|  [Logo]              [Search]      [Cart] [Login]|
+--------------------------------------------------+
|                                                  |
|              HERO BANNER                         |
|          Welcome to Our Shop                     |
|           [Shop Now Button]                      |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  [Filter] [Sort]                                 |
|                                                  |
|  +--------+  +--------+  +--------+  +--------+ |
|  | Image  |  | Image  |  | Image  |  | Image  | |
|  | Name   |  | Name   |  | Name   |  | Name   | |
|  | $99    |  | $149   |  | $79    |  | $199   | |
|  | [Cart] |  | [Cart] |  | [Cart] |  | [Cart] | |
|  +--------+  +--------+  +--------+  +--------+ |
|                                                  |
|  +--------+  +--------+  +--------+  +--------+ |
|  | ...    |  | ...    |  | ...    |  | ...    | |
|  +--------+  +--------+  +--------+  +--------+ |
|                                                  |
|  [< Prev]  [1] [2] [3] [4]  [Next >]             |
|                                                  |
+--------------------------------------------------+
|  Footer: Links, Copyright                        |
+--------------------------------------------------+
```

**Chức năng:**
- ✅ Danh sách sản phẩm (grid responsive)
- ✅ Search sản phẩm
- ✅ Filter by category
- ✅ Sort by price/name
- ✅ Pagination
- ✅ Add to cart

---

### **Product Detail Page**

```
+--------------------------------------------------+
|  [Logo]              [Search]      [Cart] [Login]|
+--------------------------------------------------+
|                                                  |
|  +----------------+   +------------------------+ |
|  |                |   | Product Name           | |
|  |                |   | Category: Electronics  | |
|  |    Image       |   | Price: $999            | |
|  |                |   |                        | |
|  |                |   | Description:           | |
|  +----------------+   | Lorem ipsum dolor...   | |
|  [Thumb] [Thumb]      |                        | |
|                       | Quantity: [1] [-] [+] | |
|                       | [Add to Cart]          | |
|                       +------------------------+ |
|                                                  |
|  Related Products:                               |
|  +--------+  +--------+  +--------+  +--------+ |
|  | ...    |  | ...    |  | ...    |  | ...    | |
|  +--------+  +--------+  +--------+  +--------+ |
|                                                  |
+--------------------------------------------------+
```

**Chức năng:**
- ✅ Hình ảnh lớn + thumbnails
- ✅ Thông tin chi tiết
- ✅ Chọn số lượng
- ✅ Add to cart
- ✅ Related products

---

### **Shopping Cart Page**

```
+--------------------------------------------------+
|  [Logo]              [Search]      [Cart] [Login]|
+--------------------------------------------------+
|                                                  |
|  Your Shopping Cart                              |
|                                                  |
|  +------------------------------------------+    |
|  | [Image] Product 1    $999    Qty: [2] [X] |   |
|  | [Image] Product 2    $149    Qty: [1] [X] |   |
|  | [Image] Product 3    $79     Qty: [3] [X] |   |
|  +------------------------------------------+    |
|                                                  |
|  Subtotal:  $2,385                               |
|  Shipping:  $10                                  |
|  Total:     $2,395                               |
|                                                  |
|  [Continue Shopping]      [Checkout]             |
|                                                  |
+--------------------------------------------------+
```

**Chức năng:**
- ✅ Danh sách sản phẩm trong giỏ
- ✅ Update quantity
- ✅ Remove item
- ✅ Calculate total
- ✅ Checkout button (optional)

---

## 2.2. Trang quản trị (Admin)

### **Admin Dashboard**

```
+--------------------------------------------------+
|  [Logo]  Dashboard                      [Logout] |
+--------------------------------------------------+
|                                                  |
|  +-------------+  +-------------+  +-------------+|
|  | Total       |  | Categories  |  | Orders      ||
|  | Products    |  | 5           |  | 123         ||
|  | 45          |  |             |  |             ||
|  +-------------+  +-------------+  +-------------+|
|                                                  |
+--------------------------------------------------+
```

---

### **Product Management**

```
+--------------------------------------------------+
|  [Logo]  Products                       [Logout] |
+--------------------------------------------------+
|  [+ Add Product]               [Search...]       |
|                                                  |
|  +------------------------------------------+    |
|  | ID | Image | Name      | Price | Actions |   |
|  |----|-------|-----------|-------|---------|   |
|  | 1  | [img] | Product 1 | $999  | [E] [D] |   |
|  | 2  | [img] | Product 2 | $149  | [E] [D] |   |
|  | 3  | [img] | Product 3 | $79   | [E] [D] |   |
|  +------------------------------------------+    |
|                                                  |
|  [< Prev]  [1] [2] [3]  [Next >]                 |
|                                                  |
+--------------------------------------------------+
```

**Chức năng:**
- ✅ View all products (table)
- ✅ Search products
- ✅ Pagination
- ✅ Create new product
- ✅ Edit product
- ✅ Delete product (confirm dialog)

---

### **Add/Edit Product Form**

```
+--------------------------------------------------+
|  [Logo]  Add Product                    [Logout] |
+--------------------------------------------------+
|                                                  |
|  Product Name: [_________________]               |
|  Category:     [Electronics ▼]                   |
|  Price:        [________]                        |
|  Description:  [_________________]               |
|                [_________________]               |
|  Image URL:    [_________________]               |
|  Stock:        [________]                        |
|                                                  |
|  [Cancel]  [Save]                                |
|                                                  |
+--------------------------------------------------+
```

---

# 3. **TECH STACK**

## 3.1. Frontend

```javascript
{
  "html": "HTML5 Semantic",
  "css": {
    "core": "CSS3",
    "layout": "Flexbox + Grid",
    "responsive": "Mobile-First",
    "preprocessor": "SCSS (optional)",
    "framework": "Bootstrap 5 (optional, limited use)"
  },
  "javascript": "ES6+",
  "framework": "React 18+ OR Vue 3+",
  "bundler": "Vite",
  "routing": "React Router OR Vue Router",
  "http": "Fetch API"
}
```

---

## 3.2. Backend/API

**Mock API (không cần code backend):**
- [Fake Store API](https://fakestoreapi.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [MockAPI](https://mockapi.io/)
- [JSON Server](https://github.com/typicode/json-server) (local)

**Hoặc tự viết API (optional, bonus):**
- Node.js + Express
- ASP.NET Core
- Python + Flask

---

## 3.3. Tools

```
- Code Editor: Visual Studio Code
- Version Control: Git + GitHub
- Package Manager: npm
- Browser: Chrome (DevTools)
- API Testing: Postman / Insomnia
- Deployment: Vercel / Netlify
```

---

# 4. **CẤU TRÚC THƯ MỤC**

## 4.1. Phase 1-2 (Vanilla JS)

```
ecommerce-website/
├── index.html              ← Home page
├── product-detail.html     ← Product detail
├── cart.html               ← Shopping cart
├── admin.html              ← Admin page
├── css/
│   ├── style.css           ← Main styles
│   ├── responsive.css      ← Media queries
│   └── components.css      ← Reusable components
├── js/
│   ├── main.js             ← Main logic
│   ├── api.js              ← API calls
│   ├── cart.js             ← Cart logic
│   └── admin.js            ← Admin logic
├── images/
│   └── (product images)
└── README.md
```

---

## 4.2. Phase 3 (React SPA)

```
ecommerce-spa/
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── index.css
│   │   │   └── components.css
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Modal.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductForm.jsx
│   │   └── cart/
│   │       ├── CartItem.jsx
│   │       └── CartSummary.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Admin.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

# 5. **SETUP MÔI TRƯỜNG**

## 5.1. Cài đặt Node.js

1. Download: https://nodejs.org/ (LTS version)
2. Install
3. Verify:
```bash
node --version   # v18+
npm --version    # v9+
```

---

## 5.2. Cài đặt VS Code

1. Download: https://code.visualstudio.com/
2. Install Extensions:
   - ESLint
   - Prettier
   - Live Server
   - Auto Rename Tag
   - ES7+ React/Redux snippets (React users)
   - Volar (Vue users)

---

## 5.3. Setup Git

```bash
# Config
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repo
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

---

## 5.4. Create Project (Phase 3)

### React with Vite

```bash
npm create vite@latest ecommerce-spa -- --template react
cd ecommerce-spa
npm install
npm install react-router-dom
npm run dev
```

### Vue with Vite

```bash
npm create vite@latest ecommerce-spa -- --template vue
cd ecommerce-spa
npm install
npm install vue-router@4
npm run dev
```

---

# 6. **PHASE 1: HTML + CSS**

## 6.1. Checklist

✅ **HTML Structure**
- [ ] Create `index.html` (Home page)
- [ ] Create `product-detail.html`
- [ ] Create `cart.html`
- [ ] Create `admin.html`
- [ ] Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] Add meta tags for SEO

✅ **CSS Styling**
- [ ] Create `css/style.css`
- [ ] Header: Logo + Navigation
- [ ] Product grid with Flexbox/Grid
- [ ] Footer with links
- [ ] Forms styling

✅ **Responsive Design**
- [ ] Mobile: < 768px
- [ ] Tablet: 768px - 1023px
- [ ] Desktop: ≥ 1024px
- [ ] Test on real devices

---

## 6.2. Code Examples

### HTML Template

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Commerce Shop</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <a href="/" class="logo">
        <img src="images/logo.png" alt="Shop Logo">
      </a>
      <nav class="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/admin">Admin</a></li>
        </ul>
      </nav>
    </div>
  </header>
  
  <main class="main">
    <!-- Content here -->
  </main>
  
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 E-Commerce Shop</p>
    </div>
  </footer>
</body>
</html>
```

---

### CSS Basics

```css
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-text: #1f2937;
  --color-bg: #f9fafb;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Header */
.header {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: var(--spacing-md) 0;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

# 7. **PHASE 2: JAVASCRIPT**

## 7.1. Checklist

✅ **DOM Manipulation**
- [ ] Select elements với `querySelector`
- [ ] Create elements dynamically
- [ ] Event listeners

✅ **Features**
- [ ] Fetch products từ API
- [ ] Render product list
- [ ] Add to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] Calculate total
- [ ] Search products
- [ ] Filter by category
- [ ] Pagination

✅ **Admin**
- [ ] CRUD products
- [ ] Form validation

---

## 7.2. Code Examples

### Fetch API

```javascript
// api.js
const API_URL = 'https://fakestoreapi.com';

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  return await response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return await response.json();
}
```

---

### Render Products

```javascript
// main.js
import { getProducts } from './api.js';

async function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = '<p>Loading...</p>';
  
  try {
    const products = await getProducts();
    
    container.innerHTML = products.map(product => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </article>
    `).join('');
  } catch (error) {
    container.innerHTML = '<p>Error loading products</p>';
  }
}

renderProducts();
```

---

### Shopping Cart

```javascript
// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  updateCartUI();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

export function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart();
    updateCartUI();
  }
}

export function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}
```

---

# 8. **PHASE 3: REACT/VUE SPA**

## 8.1. Checklist

✅ **Setup**
- [ ] Create project với Vite
- [ ] Install router
- [ ] Setup folder structure

✅ **Components**
- [ ] Header, Footer
- [ ] ProductCard, ProductList
- [ ] CartItem, Cart
- [ ] ProductForm (Admin)

✅ **Pages**
- [ ] Home
- [ ] ProductDetail
- [ ] Cart
- [ ] Admin

✅ **Features**
- [ ] Routing
- [ ] State management
- [ ] API integration
- [ ] Loading states
- [ ] Error handling

---

## 8.2. React Examples

### App.jsx

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
```

---

### ProductCard Component

```jsx
// components/product/ProductCard.jsx
function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
```

---

### Home Page

```jsx
// pages/Home.jsx
import { useState, useEffect } from 'react';
import ProductList from '../components/product/ProductList';
import { getProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Our Shop</h1>
        <p>Best products, best prices</p>
      </section>
      
      <section className="products">
        <h2>Featured Products</h2>
        <ProductList products={products} />
      </section>
    </div>
  );
}

export default Home;
```

---

# 9. **DEPLOYMENT**

## 9.1. Deploy lên Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build project
npm run build

# Deploy
vercel

# Follow prompts
```

**Hoặc dùng GitHub Integration:**
1. Push code lên GitHub
2. Vào vercel.com
3. Import GitHub repository
4. Deploy tự động

---

## 9.2. Deploy lên Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

**Hoặc Drag & Drop:**
1. Build: `npm run build`
2. Vào netlify.com
3. Drag thư mục `dist/` vào

---

# 10. **GRADING RUBRIC**

Xem chi tiết trong Syllabus.md, section 5.3

**Tóm tắt:**
- HTML + CSS + Responsive: 20%
- JavaScript DOM + Components: 20%
- JavaScript Async + API: 20%
- React/Vue SPA: 30%
- Báo cáo + Thuyết trình: 10%

---

# 🎉 **CHÚC BẠN THÀNH CÔNG!**

Hãy làm từng bước một, test thường xuyên, và đừng ngại hỏi khi gặp khó khăn!

---

# KẾT THÚC PROJECT GUIDE
