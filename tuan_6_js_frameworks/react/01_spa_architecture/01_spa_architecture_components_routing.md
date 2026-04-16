# 🟫 CHƯƠNG 11
# **SPA ARCHITECTURE — COMPONENT & ROUTING**

## 🎬 "Tại Sao Gmail Không Bao Giờ Reload Trang?" — Bí Mật SPA

*Minh dùng Gmail cả ngày: mở email, soạn thư, chuyển tab — ZERO trang trắng. Nhưng web PHP của Minh? Click link = trang trắng 2 giây → load lại từ đầu. Mỗi lần.*

*Anh Hùng: "Gmail, Facebook, Google Docs — tất cả là SPA. Single Page Application. Tải 1 lần → JavaScript quản lý MỌI THỨ. Browser không hỏi server mỗi lần click."*

> 💡 **MPA → SPA = Tivi analog → Smart TV.** Cùng nội dung, trải nghiệm KHÁC HOÀN TOÀN.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:

- Hiểu sự khác biệt MPA vs SPA
- Biết Virtual DOM là gì
- Component-based architecture
- Client-side routing
- State management basics

---

# 1. **MPA vs SPA**

## 1.1. Multi-Page Application (MPA) - Old way

```
User click link
    ↓
Browser request full HTML from server
    ↓
Server renders entire page
    ↓
Browser reloads & displays new page
    ↓
Page flashes! 😫
```

**Example: Traditional PHP/JSP sites**

```
/index.html    → Server renders full HTML
/products.html → Server renders full HTML
/contact.html  → Server renders full HTML
```

**Problems:**
- Full page reload = slow
- Page flickers
- Poor user experience

---

## 1.2. Single Page Application (SPA) - New way

```
User click link
    ↓
JavaScript intercepts click
    ↓
JavaScript updates only changed parts
    ↓
No full page reload! ⚡
```

**Example: Gmail, Google Docs, Facebook**

```
/       (same HTML file)
  ├─ /inbox
  ├─ /compose
  └─ /settings
(All served from single index.html, JavaScript handles routing)
```

**Benefits:**
- Fast (no full page reload)
- Smooth (no flicker)
- Better UX (like native app)

---

## 1.3. How SPA works

```javascript
// 1. Load single index.html once
// 2. JavaScript runs in browser
// 3. User interaction → JavaScript updates page

// Traditional navigation
// Link click → Browser request server → HTML from server

// SPA navigation
// Link click → JavaScript intercepts → 
// Get data from API → Update HTML → No server request for page
```

---

# 2. **VIRTUAL DOM**

## 2.1. Real DOM problems

```javascript
// If you update real DOM many times = SLOW!

// ❌ Bad: 10 DOM updates = 10 browser reflows
for (let i = 0; i < 10; i++) {
  document.body.innerHTML += `<div>Item ${i}</div>`;
  // Each += causes full page reparse!
}

// ✅ Good: Build string first, then one DOM update
let html = '';
for (let i = 0; i < 10; i++) {
  html += `<div>Item ${i}</div>`;
}
document.body.innerHTML = html;
```

---

## 2.2. Virtual DOM concept

```
Real DOM (Browser)
├─ Slow to update (triggers reflow/repaint)
└─ Direct manipulation is expensive

Virtual DOM (React/Vue in memory)
├─ Fast to update (JavaScript in memory)
├─ Compare old vs new version (diffing)
└─ Update only changed parts in Real DOM
```

**Example:**

```javascript
// Update happens in memory first
oldVirtualDOM = { title: 'Hello' }
newVirtualDOM = { title: 'Hello', subtitle: 'World' }

// React compares (diff algorithm)
changes = { subtitle: 'World' }

// Only changed part updates Real DOM
document.querySelector('title').textContent = 'Hello'
document.querySelector('subtitle').textContent = 'World'  // NEW!
```

---

## 2.3. Benefits of Virtual DOM

```
1. Performance
   └─ Smart diffing = minimal Real DOM updates

2. Predictability
   └─ Declarative syntax (describe what UI should be)

3. Easy testing
   └─ Test Virtual DOM, not Real DOM

4. Code organization
   └─ Component-based (reusable, maintainable)
```

---

# 3. **COMPONENT-BASED ARCHITECTURE**

## 3.1. What is a component?

```
Component = Reusable UI building block
```

**Example: E-Commerce website**

```
┌─────────────────────────────────────────────┐
│           Header Component                  │
├──────┬────────────────┬─────────┬───────────┤
│ Logo │   Search Box   │  Menu   │  User     │
└──────┴────────────────┴─────────┴───────────┘

┌─────────────────────────────────────────────┐
│     Product List Component (repeated)       │
├─────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐         │
│ │ ProductCard  │  │ ProductCard  │  ...    │
│ │ Component    │  │ Component    │         │
│ └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           Footer Component                  │
└─────────────────────────────────────────────┘
```

---

## 3.2. Component structure

```javascript
// Traditional: HTML + JS mixed together
<div id="product">
  <h3></h3>
  <p></p>
</div>

<script>
  const product = { name: 'Apple', price: 5 };
  document.querySelector('h3').textContent = product.name;
  document.querySelector('p').textContent = product.price;
</script>

// ❌ Problem: Tightly coupled, hard to reuse


// ✅ Component approach (React example)
function ProductCard({ name, price }) {
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}

// Reuse component
<ProductCard name="Apple" price={5} />
<ProductCard name="Orange" price={3} />
<ProductCard name="Banana" price={2} />
```

---

## 3.3. Component composition

```javascript
// Small components → Large components

// 1. Button Component
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

// 2. Product Component
function Product({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Button text="Add to Cart" onClick={() => onAddToCart(product.id)} />
    </div>
  );
}

// 3. Product List Component
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <Product 
          key={product.id} 
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// 4. App Component
function App() {
  const products = [
    { id: 1, name: 'Apple', price: 5 },
    { id: 2, name: 'Orange', price: 3 },
  ];

  return <ProductList products={products} />;
}
```

---

# 4. **CLIENT-SIDE ROUTING**

## 4.1. Traditional routing (Server-side)

```
User visits: http://example.com/products

Server:
  if (url === '/products') {
    return products.html
  } else if (url === '/contact') {
    return contact.html
  }

Problem: Full page reload each time
```

---

## 4.2. Client-side routing (SPA)

```
User visits: http://example.com/

Server returns: index.html (same every time!)

JavaScript runs in browser:
  
  Check URL path
    ↓
  Load appropriate component
    ↓
  Render component
    ↓
  No full page reload!
```

---

## 4.3. History API

```javascript
// Change URL without reloading
window.history.pushState(
  { page: 1 },           // State object
  'title',               // Page title
  '/products'            // New URL
);

// Browser back button
window.addEventListener('popstate', (event) => {
  console.log('State:', event.state);
  // Re-render based on new URL
});

// Current URL
console.log(window.location.pathname);  // '/products'
```

---

## 4.4. Simple client-side router

```javascript
// Pages
const pages = {
  '/': renderHome,
  '/products': renderProducts,
  '/about': renderAbout,
};

// Navigate function
function navigate(path) {
  // 1. Update URL
  window.history.pushState({}, '', path);

  // 2. Get page function
  const pageFunc = pages[path] || pages['/'];

  // 3. Clear and render
  const app = document.getElementById('app');
  app.innerHTML = '';
  pageFunc(app);
}

// Handle link clicks
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    navigate(href);
  }
});

// Navigation functions
function renderHome(container) {
  container.innerHTML = `
    <h1>Home</h1>
    <a href="/products">View Products</a>
  `;
}

function renderProducts(container) {
  container.innerHTML = `
    <h1>Products</h1>
    <a href="/">Back to Home</a>
  `;
}

function renderAbout(container) {
  container.innerHTML = `
    <h1>About Us</h1>
    <a href="/">Back to Home</a>
  `;
}

// Initial render
navigate(window.location.pathname || '/');
```

---

# 5. **STATE MANAGEMENT BASICS**

## 5.1. What is state?

```javascript
// State = Data that affects UI

// Example: Cart
const cartState = {
  items: [
    { id: 1, name: 'Apple', quantity: 3 },
    { id: 2, name: 'Orange', quantity: 2 },
  ],
  total: 18.50,
};

// If cart changes → UI updates
// UI = f(state)
```

---

## 5.2. State flow

```
User action (click button)
    ↓
Update state
    ↓
Re-render component
    ↓
UI updates
```

**Example:**

```javascript
// 1. Initial state
let state = {
  items: [],
  total: 0,
};

// 2. Action: Add to cart
function addToCart(product) {
  state.items.push(product);
  state.total += product.price;
  
  render();  // Re-render
}

// 3. Render
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Cart (${state.items.length} items)</h1>
    <p>Total: $${state.total}</p>
  `;
}

// Initial render
render();

// User click
addToCart({ id: 1, name: 'Apple', price: 5 });
```

---

## 5.3. Centralized vs distributed state

```javascript
// ❌ Distributed (hard to manage)
// State scattered everywhere
component1.state = ...
component2.state = ...
component3.state = ...
// Problem: Updating becomes messy!

// ✅ Centralized (easy to manage)
const appState = {
  user: { id: 1, name: 'John' },
  cart: { items: [], total: 0 },
  products: [],
};

// All components read from appState
// All updates go through centralized functions
function updateCart(action) {
  appState.cart = ...;
  render();
}
```

---

# 6. **REACT VS VUE - PREVIEW**

## Quick comparison

| Feature | React | Vue |
|---------|-------|-----|
| **Syntax** | JSX (JavaScript + HTML) | Templates (HTML + Vue directives) |
| **Learning** | Steeper | Easier |
| **Bundle size** | Larger | Smaller |
| **Popularity** | More jobs | Growing |
| **Companies** | Facebook, Netflix, Airbnb | Laravel ecosystem, StartUps |

---

# 7. **PRACTICAL EXAMPLE: SIMPLE SPA**

```javascript
// State
let state = {
  page: 'home',
  products: [
    { id: 1, name: 'Apple', price: 5 },
    { id: 2, name: 'Orange', price: 3 },
  ],
  cart: [],
};

// Pages
function HomePage() {
  return `
    <div>
      <h1>Welcome to E-Shop</h1>
      <a href="/products">View Products</a>
    </div>
  `;
}

function ProductsPage() {
  return `
    <div>
      <h1>Products</h1>
      ${state.products.map(p => `
        <div class="product">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `).join('')}
      <a href="/">Back to Home</a>
    </div>
  `;
}

function CartPage() {
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  return `
    <div>
      <h1>Cart (${state.cart.length} items)</h1>
      <p>Total: $${total}</p>
      <a href="/products">Continue Shopping</a>
    </div>
  `;
}

// Router
function navigate(path) {
  window.history.pushState({}, '', path);
  
  let html;
  if (path === '/products') {
    html = ProductsPage();
  } else if (path === '/cart') {
    html = CartPage();
  } else {
    html = HomePage();
  }

  document.getElementById('app').innerHTML = html;
}

// Actions
function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  state.cart.push(product);
  alert(`Added ${product.name} to cart!`);
}

// Link click handler
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    navigate(e.target.href.split('/').slice(2).join('/') || '/');
  }
});

// Initial render
navigate(window.location.pathname || '/');
```

---

# 🎯 BÀI TẬP THỰC HÀNH

## BT1: Simple SPA
Tạo SPA với 3 pages: Home, Products, About

## BT2: Add routing
Implement client-side routing theo ví dụ trên

## BT3: Add to cart feature
Thêm cart state, add to cart, view cart

---

# 📝 MINI TEST

1. MPA vs SPA khác gì?
2. Virtual DOM là gì, tại sao cần?
3. Component composition là gì?
4. Client-side routing dùng API nào?
5. State là gì?

---

# 💾 TỔNG KẾT

**MPA:** Full page reload, old way  
**SPA:** JavaScript routing, fast, modern  
**Virtual DOM:** In-memory representation, smart diffing  
**Components:** Reusable UI blocks, composition  
**Routing:** History API, client-side navigation  
**State:** Centralized data, triggers re-render  

**Next:** React Fundamentals!
