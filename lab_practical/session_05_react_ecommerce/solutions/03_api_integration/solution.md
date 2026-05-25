# Solution 5.3 — API Integration

## Complete FakeStoreAPI Integration

### src/services/api.js

```javascript
// API Service for FakeStoreAPI
const API_BASE = 'https://fakestoreapi.com'

export async function getProducts(limit = 12) {
    const response = await fetch(`${API_BASE}/products?limit=${limit}`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
}

export async function getProductById(id) {
    const response = await fetch(`${API_BASE}/products/${id}`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
}

export async function getProductsByCategory(category) {
    const response = await fetch(`${API_BASE}/products/category/${category}`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
}

export async function getAllCategories() {
    const response = await fetch(`${API_BASE}/products/categories`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
}

export async function getAllProducts() {
    const response = await fetch(`${API_BASE}/products`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
}
```

### src/pages/Shop.jsx (with API fetch)

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { getProducts, getProductsByCategory } from '../services/api'
import './Shop.css'

function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState('all')
    const { addToCart } = useCart()

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                setError(null)

                let data
                if (category === 'all') {
                    data = await getProducts(20)
                } else {
                    data = await getProductsByCategory(category)
                }

                setProducts(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [category])

    const categories = [
        { key: 'all', label: 'All Products' },
        { key: 'electronics', label: 'Electronics' },
        { key: 'jewelery', label: 'Jewelery' },
        { key: "men's clothing", label: "Men's Clothing" },
        { key: "women's clothing", label: "Women's Clothing" },
    ]

    if (error) {
        return (
            <Error
                message={error}
                onRetry={() => setCategory(category)}
            />
        )
    }

    return (
        <div className="shop-page py-5 bg-light">
            <div className="container">
                {/* Page Header */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">Our Shop</h1>
                    <p className="text-muted lead">
                        Discover amazing products at great prices
                    </p>
                </div>

                {/* Category Filter */}
                <div className="category-filter d-flex flex-wrap justify-content-center gap-2 mb-5">
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

                {/* Loading State */}
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {/* Results Count */}
                        <p className="text-muted text-center mb-4">
                            Showing <strong>{products.length}</strong> products
                        </p>

                        {/* Products Grid */}
                        <div className="row g-4">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {products.length === 0 && (
                            <div className="text-center py-5">
                                <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
                                <h4 className="text-muted">No products found</h4>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => setCategory('all')}
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Shop
```

### src/components/Loading.jsx

```jsx
import './Loading.css'

function Loading() {
    return (
        <div className="loading-container d-flex flex-column align-items-center justify-content-center py-5">
            <div className="spinner-wrapper">
                <div className="spinner"></div>
                <div className="spinner-inner"></div>
            </div>
            <p className="text-muted mt-4 fw-medium">Loading products...</p>
        </div>
    )
}

export default Loading
```

### src/components/Loading.css

```css
.loading-container {
    min-height: 300px;
}

.spinner-wrapper {
    position: relative;
    width: 60px;
    height: 60px;
}

.spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid #e2e8f0;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.spinner-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid #e2e8f0;
    border-bottom-color: #8b5cf6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite reverse;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

### src/components/Error.jsx

```jsx
import './Error.css'

function Error({ message, onRetry }) {
    return (
        <div className="error-container d-flex flex-column align-items-center justify-content-center py-5 text-center">
            <div className="error-icon-wrapper mb-4">
                <i className="bi bi-exclamation-triangle-fill text-danger"></i>
            </div>
            <h4 className="fw-bold mb-2">Oops! Something went wrong</h4>
            <p className="text-muted mb-4">{message || 'Failed to load products. Please try again.'}</p>
            {onRetry && (
                <button className="btn btn-primary" onClick={onRetry}>
                    <i className="bi bi-arrow-repeat me-2"></i>Try Again
                </button>
            )}
        </div>
    )
}

export default Error
```

### src/components/Error.css

```css
.error-container {
    min-height: 300px;
}

.error-icon-wrapper {
    width: 80px;
    height: 80px;
    background: #fef2f2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-icon-wrapper i {
    font-size: 2.5rem;
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
                {/* Image with link */}
                <div className="position-relative p-3">
                    <Link to={`/product/${product.id}`} className="product-image-link">
                        <img
                            src={product.image}
                            className="card-img-top"
                            alt={product.title}
                            style={{ height: '180px', objectFit: 'contain' }}
                        />
                    </Link>

                    {/* Quick add button */}
                    <button
                        className="quick-add-btn position-absolute"
                        onClick={(e) => {
                            e.preventDefault()
                            addToCart(product)
                        }}
                        title="Add to cart"
                    >
                        <i className="bi bi-cart-plus"></i>
                    </button>

                    {/* Category badge */}
                    <span className="category-badge position-absolute badge bg-secondary">
                        {product.category}
                    </span>
                </div>

                {/* Content */}
                <div className="card-body text-center pt-0">
                    <h5 className="card-title fw-bold text-truncate mb-2">
                        {product.title}
                    </h5>

                    {/* Rating */}
                    <div className="rating mb-2">
                        {[...Array(5)].map((_, i) => (
                            <i
                                key={i}
                                className={`bi ${i < Math.round(product.rating?.rate || 0) ? 'bi-star-fill' : 'bi-star'}`}
                                style={{ color: '#f59e0b', fontSize: '0.875rem' }}
                            ></i>
                        ))}
                        <span className="text-muted small ms-1">
                            ({product.rating?.count || 0})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="price mb-3">
                        <span className="text-primary fw-bold fs-5">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Actions */}
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
                            <i className="bi bi-eye me-1"></i>Details
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
    transform: translateY(-8px);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.12) !important;
}

.product-image-link {
    display: block;
}

.card-img-top {
    transition: transform 0.4s ease;
}

.product-card:hover .card-img-top {
    transform: scale(1.08);
}

.quick-add-btn {
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
    z-index: 5;
}

.product-card:hover .quick-add-btn {
    opacity: 1;
    transform: scale(1);
}

.quick-add-btn:hover {
    background: #6366f1;
    color: white;
}

.category-badge {
    top: 12px;
    left: 12px;
    text-transform: capitalize;
    font-size: 0.7rem;
}
```

### src/pages/ProductDetail.jsx

```jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductById } from '../services/api'
import Loading from '../components/Loading'
import Error from '../components/Error'
import './ProductDetail.css'

function ProductDetail() {
    const { id } = useParams()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                setError(null)
                const data = await getProductById(id)
                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id])

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
    }

    if (loading) return <Loading />
    if (error) return <Error message={error} onRetry={() => window.location.reload()} />
    if (!product) return null

    return (
        <div className="product-detail-page py-5 bg-light">
            <div className="container">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/shop">Shop</Link>
                        </li>
                        <li className="breadcrumb-item active">{product.category}</li>
                    </ol>
                </nav>

                <div className="row g-5">
                    {/* Product Image */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm p-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="img-fluid"
                                style={{ maxHeight: '400px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-6">
                        <div className="product-info">
                            <span className="badge bg-secondary mb-3">{product.category}</span>
                            <h1 className="display-6 fw-bold mb-3">{product.title}</h1>

                            {/* Rating */}
                            <div className="rating mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`bi ${i < Math.round(product.rating?.rate || 0) ? 'bi-star-fill' : 'bi-star'}`}
                                        style={{ color: '#f59e0b', fontSize: '1.25rem' }}
                                    ></i>
                                ))}
                                <span className="text-muted ms-2">
                                    {product.rating?.rate} ({product.rating?.count} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="price mb-4">
                                <span className="display-5 fw-bold text-primary">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-muted mb-4">{product.description}</p>

                            {/* Quantity + Add to Cart */}
                            <div className="d-flex gap-3 align-items-center mb-4">
                                <div className="quantity-selector d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="fw-bold fs-5" style={{ minWidth: '40px', textAlign: 'center' }}>
                                        {quantity}
                                    </span>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>

                                <button
                                    className="btn btn-primary btn-lg flex-grow-1"
                                    onClick={handleAddToCart}
                                >
                                    <i className="bi bi-cart-plus me-2"></i>Add to Cart
                                </button>
                            </div>

                            {/* Features */}
                            <div className="features row g-3 mt-4">
                                <div className="col-6 col-md-4">
                                    <div className="feature-item d-flex align-items-center gap-2">
                                        <i className="bi bi-truck text-primary"></i>
                                        <span>Free Shipping</span>
                                    </div>
                                </div>
                                <div className="col-6 col-md-4">
                                    <div className="feature-item d-flex align-items-center gap-2">
                                        <i className="bi bi-shield-check text-primary"></i>
                                        <span>Secure Payment</span>
                                    </div>
                                </div>
                                <div className="col-6 col-md-4">
                                    <div className="feature-item d-flex align-items-center gap-2">
                                        <i className="bi bi-arrow-repeat text-primary"></i>
                                        <span>Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
```

### src/pages/ProductDetail.css

```css
.product-detail-page {
    min-height: 80vh;
}

.breadcrumb {
    background: transparent;
    padding: 0;
}

.breadcrumb-item a {
    color: #6366f1;
    text-decoration: none;
}

.breadcrumb-item.active {
    color: #64748b;
}

.quantity-selector {
    background: #f8fafc;
    border-radius: 8px;
    padding: 0.25rem;
}

.feature-item {
    padding: 0.75rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

---

## Commit Message Examples

```bash
git commit -m "[API] Create API service layer

- Define getProducts, getProductById, getProductsByCategory
- Add error handling with HTTP status checks
- Export functions for use in components"

git commit -m "[FEATURE] Fetch products with useEffect

- Create useState for products, loading, error
- Use useEffect to fetch on mount and category change
- Handle loading and error states
- Render products when loaded"

git commit -m "[UI] Build Loading and Error components

- Create Loading component with spinner animation
- Build Error component with retry button
- Style error state with warning icon
- Add retry handler to Error"

git commit -m "[POLISH] Create ProductCard with rating display

- Add star rating from product.rating.rate
- Show review count next to stars
- Style quick-add button on hover
- Add category badge on image"
```

---

## Key Learning Points

### 1. Fetch with async/await
```javascript
async function fetchProducts() {
    try {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        setProducts(data)
    } catch (error) {
        setError(error.message)
    } finally {
        setLoading(false)
    }
}
```

### 2. useEffect with Dependencies
```javascript
useEffect(() => {
    fetchProducts()
}, [category]) // Re-run when category changes
```

### 3. Loading State Pattern
```javascript
const [loading, setLoading] = useState(true)
if (loading) return <Loading />
```

### 4. Error with Retry
```javascript
if (error) return <Error message={error} onRetry={() => fetchProducts()} />
```

---

**← [ Quay lại Exercise 5.3](../exercises/03_api_integration.md)**