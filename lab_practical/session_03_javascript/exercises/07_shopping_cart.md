# Exercise 3.7 — Shopping Cart (Giỏ hàng điện tử)

## 🎬 Opening Scenario

*Bạn đang xây dựng trang bán hàng online cho shop công nghệ nhỏ. Cần tính năng giỏ hàng: thêm/xóa sản phẩm, thay đổi số lượng, tính tổng tiền tự động, lưu vào localStorage.*

---

## 🎯 Mục tiêu học tập

- Quản lý **complex state** với array of objects
- Áp dụng **array methods** (`map`, `filter`, `reduce`, `find`)
- Xây dựng **giỏ hàng** tính năng thực tế
- Luyện tập **DOM manipulation** nâng cao
- Hiểu **event delegation** trên danh sách động

---

## 📋 Yêu cầu chi tiết

### Tính năng bắt buộc

| # | Tính năng | Mô tả chi tiết |
|---|-----------|----------------|
| 1 | **Hiển thị sản phẩm** | Grid sản phẩm với tên, giá, ảnh, nút "Thêm vào giỏ" |
| 2 | **Thêm vào giỏ** | Click → sản phẩm thêm vào cart, badge số lượng tăng |
| 3 | **Giỏ hàng sidebar** | Nút giỏ hàng → slide-in panel hiện danh sách sản phẩm |
| 4 | **Tăng/giảm số lượng** | Nút +/- thay đổi số lượng, giá cập nhật realtime |
| 5 | **Xóa sản phẩm** | Nút Xóa → confirm → xóa khỏi cart |
| 6 | **Tính tổng tiền** | Hiển thị subtotal, thuế (10% VAT), tổng cộng |
| 7 | **localStorage** | Cart lưu vào localStorage, load lại khi refresh |
| 8 | **Trạng thái rỗng** | Cart trống → hiện "Giỏ hàng trống" với icon |
| 9 | **Thông báo Toast** | Toast notification khi thêm/xóa sản phẩm |
| 10 | **Tìm kiếm sản phẩm** | Input tìm kiếm → filter sản phẩm theo tên |

---

## 🏗️ HTML Structure

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛒 Tech Shop — Giỏ hàng</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <h1>🖥️ Tech Shop</h1>
        <div class="nav-right">
            <input type="text" id="search-input" placeholder="🔍 Tìm sản phẩm..." class="search-input">
            <button id="cart-toggle" class="cart-toggle">
                🛒 <span id="cart-badge" class="cart-badge" hidden>0</span>
            </button>
        </div>
    </nav>

    <!-- Products Grid -->
    <main class="container">
        <h2>Sản phẩm nổi bật</h2>
        <div id="product-grid" class="product-grid">
            <!-- Products rendered by JS -->
        </div>
    </main>

    <!-- Cart Sidebar -->
    <div id="cart-overlay" class="cart-overlay" hidden></div>
    <aside id="cart-sidebar" class="cart-sidebar">
        <div class="cart-header">
            <h2>🛒 Giỏ hàng (<span id="cart-count">0</span>)</h2>
            <button id="cart-close" class="cart-close">&times;</button>
        </div>

        <div id="cart-items" class="cart-items">
            <!-- Cart items rendered by JS -->
        </div>

        <div id="cart-empty" class="cart-empty">
            <span>🛒</span>
            <p>Giỏ hàng trống</p>
            <small>Hãy thêm sản phẩm yêu thích!</small>
        </div>

        <div id="cart-summary" class="cart-summary">
            <div class="summary-row">
                <span>Tạm tính:</span>
                <span id="subtotal">0₫</span>
            </div>
            <div class="summary-row">
                <span>VAT (10%):</span>
                <span id="vat">0₫</span>
            </div>
            <div class="summary-row total">
                <span>Tổng cộng:</span>
                <span id="total">0₫</span>
            </div>
            <button id="checkout-btn" class="checkout-btn">Thanh toán</button>
        </div>
    </aside>

    <!-- Toast Container -->
    <div id="toast-container" class="toast-container"></div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 💻 JavaScript Implementation (app.js)

### Product Data

```javascript
// ===== PRODUCT DATA =====
const products = [
    { id: 1,  name: 'MacBook Pro 14"',     price: 42990000, image: '💻', category: 'laptop',    desc: 'M3 Pro, 18GB RAM' },
    { id: 2,  name: 'iPhone 15 Pro Max',    price: 34990000, image: '📱', category: 'phone',     desc: '256GB, Titan tự nhiên' },
    { id: 3,  name: 'AirPods Pro 2',        price: 6490000,  image: '🎧', category: 'accessory', desc: 'USB-C, Chống ồn chủ động' },
    { id: 4,  name: 'iPad Air M2',          price: 16990000, image: '📱', category: 'tablet',    desc: '11 inch, 128GB' },
    { id: 5,  name: 'Samsung Galaxy S24 Ultra', price: 31990000, image: '📱', category: 'phone', desc: 'S Pen, 256GB' },
    { id: 6,  name: 'Sony WH-1000XM5',     price: 8490000,  image: '🎧', category: 'accessory', desc: 'Chống ồn 30h' },
    { id: 7,  name: 'Dell XPS 15',          price: 35990000, image: '💻', category: 'laptop',    desc: 'i7, 16GB, OLED' },
    { id: 8,  name: 'Apple Watch Ultra 2',  price: 21990000, image: '⌚', category: 'accessory', desc: 'Titanium, GPS' },
    { id: 9,  name: 'Logitech MX Master 3S', price: 2490000, image: '🖱️', category: 'accessory', desc: 'Ergonomic, Bluetooth' },
    { id: 10, name: 'ASUS ROG Zephyrus',    price: 45990000, image: '💻', category: 'laptop',    desc: 'RTX 4070, 165Hz' },
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let searchQuery = '';

// ===== DOM ELEMENTS =====
const productGrid = document.getElementById('product-grid');
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartSummary = document.getElementById('cart-summary');
const cartBadge = document.getElementById('cart-badge');
const cartCount = document.getElementById('cart-count');
const subtotalEl = document.getElementById('subtotal');
const vatEl = document.getElementById('vat');
const totalEl = document.getElementById('total');
const searchInput = document.getElementById('search-input');
const toastContainer = document.getElementById('toast-container');
```

### Format tiền VND

```javascript
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}
```

### Render Products

```javascript
function renderProducts() {
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
        productGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#94a3b8;">Không tìm thấy sản phẩm</p>';
        return;
    }

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-bottom">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </div>
        </div>
    `).join('');
}
```

### Cart CRUD

```javascript
// ===== ADD TO CART =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
}

// ===== UPDATE QUANTITY =====
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    renderCart();
}

// ===== REMOVE FROM CART =====
function removeFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const confirmed = confirm(`Xóa "${item.name}" khỏi giỏ hàng?`);
    if (!confirmed) return;

    cart = cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
    showToast(`Đã xóa "${item.name}" khỏi giỏ hàng`, 'info');
}

// ===== CLEAR CART =====
function clearCart() {
    if (cart.length === 0) return;
    const confirmed = confirm('Xóa tất cả sản phẩm trong giỏ hàng?');
    if (!confirmed) return;

    cart = [];
    saveCart();
    renderCart();
    showToast('Đã xóa toàn bộ giỏ hàng', 'info');
}
```

### Render Cart

```javascript
function renderCart() {
    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (totalItems > 0) {
        cartBadge.hidden = false;
        cartBadge.textContent = totalItems;
    } else {
        cartBadge.hidden = true;
    }

    // Empty state
    if (cart.length === 0) {
        cartEmpty.hidden = false;
        cartItems.hidden = true;
        cartSummary.hidden = true;
        return;
    }

    cartEmpty.hidden = true;
    cartItems.hidden = false;
    cartSummary.hidden = false;

    // Render items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <span class="cart-item-image">${item.image}</span>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span class="cart-item-price">${formatPrice(item.price)}</span>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" data-id="${item.id}" data-change="-1">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
            </div>
            <span class="cart-item-total">${formatPrice(item.price * item.quantity)}</span>
            <button class="remove-btn" data-id="${item.id}" title="Xóa">✕</button>
        </div>
    `).join('');

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = subtotal * 0.1;
    const total = subtotal + vat;

    subtotalEl.textContent = formatPrice(subtotal);
    vatEl.textContent = formatPrice(vat);
    totalEl.textContent = formatPrice(total);
}
```

### Cart Sidebar Toggle

```javascript
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.hidden = true;
    document.body.style.overflow = '';
}
```

### Toast Notification

```javascript
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${type === 'success' ? '✅' : 'ℹ️'} ${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 3s
    setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
```

### Save to localStorage

```javascript
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
```

### Event Listeners

```javascript
// ===== EVENT DELEGATION: Product Grid =====
productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
        const productId = parseInt(btn.dataset.id);
        addToCart(productId);
    }
});

// ===== EVENT DELEGATION: Cart Items =====
cartItems.addEventListener('click', (e) => {
    // Quantity buttons
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
        const id = parseInt(qtyBtn.dataset.id);
        const change = parseInt(qtyBtn.dataset.change);
        updateQuantity(id, change);
        return;
    }

    // Remove button
    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
        const id = parseInt(removeBtn.dataset.id);
        removeFromCart(id);
        return;
    }
});

// Cart sidebar
cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = total * 0.1;
    alert(`Cảm ơn bạn đã mua hàng!\nTổng: ${formatPrice(total + vat)}\n\n(Đây là demo — chưa tích hợp thanh toán thực)`);
    cart = [];
    saveCart();
    renderCart();
    closeCart();
});

// Search
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// Keyboard: Escape to close cart
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// ===== INIT =====
renderProducts();
renderCart();
```

---

## 🎨 CSS Styling

```css
/* ========== NAVBAR ========== */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'Segoe UI', sans-serif;
    background: #f1f5f9;
    color: #1e293b;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.search-input {
    padding: 0.5rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    outline: none;
    width: 250px;
    transition: border-color 0.2s;
}

.search-input:focus { border-color: #6366f1; }

.cart-toggle {
    position: relative;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ========== PRODUCTS ========== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.container h2 {
    margin-bottom: 1.5rem;
    color: #334155;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
}

.product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.product-image {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    background: #f8fafc;
}

.product-info { padding: 1rem; }

.product-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.product-desc {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 0.75rem;
}

.product-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-price {
    font-weight: 700;
    color: #ef4444;
    font-size: 1.1rem;
}

.add-to-cart-btn {
    padding: 0.4rem 0.8rem;
    border: none;
    background: #6366f1;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.2s;
}

.add-to-cart-btn:hover { background: #4f46e5; }

/* ========== CART SIDEBAR ========== */
.cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 200;
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: -420px;
    width: 400px;
    max-width: 90vw;
    height: 100vh;
    background: white;
    z-index: 201;
    display: flex;
    flex-direction: column;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0,0,0,0.15);
}

.cart-sidebar.open { right: 0; }

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.cart-close {
    width: 36px;
    height: 36px;
    border: none;
    background: #f1f5f9;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
}

.cart-item-image { font-size: 2rem; }

.cart-item-details { flex: 1; }
.cart-item-details h4 { font-size: 0.9rem; }
.cart-item-price { font-size: 0.8rem; color: #64748b; }

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.qty-btn {
    width: 28px;
    height: 28px;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qty-btn:hover { background: #f1f5f9; }

.qty-value {
    width: 28px;
    text-align: center;
    font-weight: 600;
}

.cart-item-total {
    font-weight: 600;
    font-size: 0.85rem;
    min-width: 80px;
    text-align: right;
}

.remove-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: #ef4444;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 6px;
}

.remove-btn:hover { background: #fef2f2; }

/* ========== CART SUMMARY ========== */
.cart-summary {
    padding: 1rem;
    border-top: 2px solid #e2e8f0;
    background: #f8fafc;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.summary-row.total {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ef4444;
    border-top: 1px solid #e2e8f0;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
}

.checkout-btn {
    width: 100%;
    padding: 0.75rem;
    border: none;
    background: #22c55e;
    color: white;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.75rem;
    transition: background 0.2s;
}

.checkout-btn:hover { background: #16a34a; }

/* ========== CART EMPTY ========== */
.cart-empty {
    text-align: center;
    padding: 3rem 1rem;
    color: #94a3b8;
}

.cart-empty span { font-size: 3rem; display: block; margin-bottom: 0.5rem; }

/* ========== TOAST ========== */
.toast-container {
    position: fixed;
    top: 80px;
    right: 1rem;
    z-index: 300;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.toast {
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    color: white;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease;
    min-width: 280px;
}

.toast-success { background: #22c55e; }
.toast-info { background: #3b82f6; }

.toast-fade-out { animation: fadeOut 0.3s ease forwards; }

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
```

---

## ✅ Success Criteria

### Bắt buộc

- [ ] Hiển thị grid sản phẩm với tên, giá, icon
- [ ] Click "Thêm vào giỏ" → badge số lượng tăng
- [ ] Mở/đóng cart sidebar
- [ ] Tăng/giảm số lượng trong cart
- [ ] Xóa sản phẩm khỏi cart
- [ ] Tính subtotal, VAT (10%), tổng cộng
- [ ] localStorage persistence
- [ ] Toast notification khi thêm/xóa

### Nâng cao

- [ ] Tìm kiếm sản phẩm theo tên
- [ ] Empty state khi cart trống
- [ ] Animation slide-in cho cart sidebar
- [ ] Responsive trên mobile

---

## 📚 Knowledge Check

1. **`Array.reduce()`** hoạt động thế nào? Cho ví dụ tính tổng giá?
2. **`Intl.NumberFormat`** là gì? Tại sao dùng thay vì `.toLocaleString()`?
3. Event delegation giúp ích gì trong shopping cart?
4. Tại sao cần `parseInt()` khi đọc `dataset.id`?
5. So sánh `localStorage.setItem()` vs `sessionStorage.setItem()`?

---

**← [Quay lại Session 3](../README.md)**
