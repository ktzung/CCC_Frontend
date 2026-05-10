# Exercise 5.3 — API Integration

## 🎬 Opening Scenario

*Fetch products từ FakeStoreAPI (https://fakestoreapi.com/products) và hiển thị trong Shop page.*

---

## 📋 Requirements

### 1. API Service

```javascript
// src/services/api.js
const API_BASE = 'https://fakestoreapi.com';

export async function getProducts(limit = 12) {
    const response = await fetch(`${API_BASE}/products?limit=${limit}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_BASE}/products/${id}`);

    if (!response.ok) {
        throw new Error(`Product not found`);
    }

    return response.json();
}

export async function getProductsByCategory(category) {
    const response = await fetch(`${API_BASE}/products/category/${category}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
```

### 2. Shop Page with Fetch

```jsx
// src/pages/Shop.jsx
import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const data = await getProducts(12);
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="shop-page">
            <h1>Shop</h1>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Shop;
```

### 3. Loading Component

```jsx
// src/components/Loading.jsx
function Loading() {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading products...</p>
        </div>
    );
}

export default Loading;
```

### 4. Error Component

```jsx
// src/components/Error.jsx
function Error({ message, onRetry }) {
    return (
        <div className="error-container">
            <p className="error-icon">❌</p>
            <p className="error-message">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="retry-btn">
                    Try Again
                </button>
            )}
        </div>
    );
}

export default Error;
```

---

## 🎨 Styling

```css
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top-color: #14b8a6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.error-container {
    text-align: center;
    padding: 3rem;
}

.error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}
```

---

## ✅ Success Criteria

- [ ] API service functions created
- [ ] useEffect fetches products on mount
- [ ] Loading state shown during fetch
- [ ] Error state shown on failure
- [ ] Products rendered from API data
- [ ] Retry button works on error

---

**← [ Quay lại Session 5](../README.md)**