# Solution 5.4 — Checkout Flow + Validation

## Complete Checkout Implementation

### src/pages/Checkout.jsx

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

function Checkout() {
    const { cart, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States'
    })

    // Validation errors
    const [errors, setErrors] = useState({})

    // Order state
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    // Shipping method
    const [shippingMethod, setShippingMethod] = useState('standard')

    const shippingCost = shippingMethod === 'express' ? 15 : (cartTotal > 50 ? 0 : 5)
    const tax = cartTotal * 0.1
    const total = cartTotal + shippingCost + tax

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'

        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required'

        return newErrors
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            // Scroll to first error
            const firstError = document.querySelector('.error')
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            return
        }

        // Process order
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            // Generate order ID
            const newOrderId = 'ORD-' + Date.now().toString(36).toUpperCase()
            setOrderId(newOrderId)
            setOrderPlaced(true)
            clearCart()
            setIsProcessing(false)
        }, 2000)
    }

    // Empty cart redirect
    if (cart.length === 0 && !orderPlaced) {
        return (
            <div className="checkout-page py-5 text-center">
                <div className="container py-5">
                    <i className="bi bi-cart-check fs-1 text-muted mb-4"></i>
                    <h2 className="mb-3">Your Cart is Empty</h2>
                    <p className="text-muted mb-4">Add some items to your cart before checking out.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    // Order confirmation
    if (orderPlaced) {
        return (
            <div className="checkout-page py-5 bg-light">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg text-center p-5">
                                <div className="success-icon mb-4">
                                    <i className="bi bi-check-circle-fill text-success"></i>
                                </div>
                                <h1 className="fw-bold mb-3">Order Confirmed!</h1>
                                <p className="lead text-muted mb-4">
                                    Thank you for your purchase. Your order has been placed successfully.
                                </p>
                                <div className="order-id mb-4">
                                    <span className="text-muted">Order ID:</span>
                                    <strong className="text-primary ms-2">{orderId}</strong>
                                </div>
                                <p className="text-muted mb-4">
                                    A confirmation email has been sent to <strong>{formData.email}</strong>
                                </p>
                                <div className="d-flex gap-3 justify-content-center">
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => navigate('/shop')}
                                    >
                                        Continue Shopping
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate('/')}
                                    >
                                        Go to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-page py-5 bg-light">
            <div className="container">
                <h1 className="display-5 fw-bold mb-5">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        {/* Left Column - Form */}
                        <div className="col-lg-8">
                            {/* Shipping Information */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-header bg-white py-3">
                                    <h5 className="fw-bold mb-0">
                                        <i className="bi bi-geo-alt me-2"></i>Shipping Information
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        {/* First Name */}
                                        <div className="col-md-6">
                                            <label htmlFor="firstName" className="form-label">
                                                First Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="John"
                                            />
                                            {errors.firstName && (
                                                <div className="invalid-feedback">{errors.firstName}</div>
                                            )}
                                        </div>

                                        {/* Last Name */}
                                        <div className="col-md-6">
                                            <label htmlFor="lastName" className="form-label">
                                                Last Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                            />
                                            {errors.lastName && (
                                                <div className="invalid-feedback">{errors.lastName}</div>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="col-md-6">
                                            <label htmlFor="phone" className="form-label">
                                                Phone <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                            {errors.phone && (
                                                <div className="invalid-feedback">{errors.phone}</div>
                                            )}
                                        </div>

                                        {/* Address */}
                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label">
                                                Address <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="123 Main St, Apt 4B"
                                            />
                                            {errors.address && (
                                                <div className="invalid-feedback">{errors.address}</div>
                                            )}
                                        </div>

                                        {/* City */}
                                        <div className="col-md-4">
                                            <label htmlFor="city" className="form-label">
                                                City <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="New York"
                                            />
                                            {errors.city && (
                                                <div className="invalid-feedback">{errors.city}</div>
                                            )}
                                        </div>

                                        {/* State */}
                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">
                                                State <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder="NY"
                                            />
                                            {errors.state && (
                                                <div className="invalid-feedback">{errors.state}</div>
                                            )}
                                        </div>

                                        {/* ZIP */}
                                        <div className="col-md-4">
                                            <label htmlFor="zip" className="form-label">
                                                ZIP Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="zip"
                                                name="zip"
                                                className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                                                value={formData.zip}
                                                onChange={handleChange}
                                                placeholder="10001"
                                            />
                                            {errors.zip && (
                                                <div className="invalid-feedback">{errors.zip}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Method */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-header bg-white py-3">
                                    <h5 className="fw-bold mb-0">
                                        <i className="bi bi-truck me-2"></i>Shipping Method
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="shipping-options">
                                        <label className={`shipping-option ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value="standard"
                                                checked={shippingMethod === 'standard'}
                                                onChange={() => setShippingMethod('standard')}
                                            />
                                            <div className="option-content">
                                                <div className="option-info">
                                                    <span className="option-name">Standard Shipping</span>
                                                    <span className="option-time">5-7 business days</span>
                                                </div>
                                                <span className="option-price">
                                                    {cartTotal > 50 ? 'Free' : '$5.00'}
                                                </span>
                                            </div>
                                        </label>

                                        <label className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value="express"
                                                checked={shippingMethod === 'express'}
                                                onChange={() => setShippingMethod('express')}
                                            />
                                            <div className="option-content">
                                                <div className="option-info">
                                                    <span className="option-name">Express Shipping</span>
                                                    <span className="option-time">2-3 business days</span>
                                                </div>
                                                <span className="option-price">$15.00</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-white py-3">
                                    <h5 className="fw-bold mb-0">
                                        <i className="bi bi-credit-card me-2"></i>Payment Method
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="payment-placeholder p-4 text-center text-muted border rounded">
                                        <i className="bi bi-lock fs-3 mb-2"></i>
                                        <p className="mb-0">Payment integration placeholder</p>
                                        <small>Demo mode - no real payment processing</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
                                <div className="card-header bg-white py-3">
                                    <h5 className="fw-bold mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body p-4">
                                    {/* Items */}
                                    <div className="order-items mb-4">
                                        {cart.map(item => (
                                            <div key={item.id} className="order-item d-flex gap-3 mb-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="rounded"
                                                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                                />
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0 text-truncate">{item.title}</h6>
                                                    <small className="text-muted">Qty: {item.quantity}</small>
                                                </div>
                                                <span className="fw-bold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="order-totals">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted">Subtotal</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted">Shipping</span>
                                            <span className={shippingCost === 0 ? 'text-success' : ''}>
                                                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted">Tax (10%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-4">
                                            <span className="fw-bold fs-5">Total</span>
                                            <span className="fw-bold fs-5 text-primary">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-lock me-2"></i>
                                                    Place Order
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-muted small mt-3 mb-0">
                                            <i className="bi bi-shield-check me-1"></i>
                                            Your payment is secure and encrypted
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout
```

### src/pages/Checkout.css

```css
.checkout-page {
    min-height: 80vh;
}

.success-icon i {
    font-size: 4rem;
}

/* Form styling */
.form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-control.is-invalid {
    border-color: #ef4444;
    background-image: none;
}

.form-control.is-invalid:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* Shipping options */
.shipping-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.shipping-option {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.shipping-option:hover {
    border-color: #6366f1;
}

.shipping-option.selected {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.05);
}

.shipping-option input {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
}

.option-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.option-name {
    font-weight: 600;
}

.option-time {
    font-size: 0.875rem;
    color: #64748b;
}

.option-price {
    font-weight: 600;
    color: #6366f1;
}

/* Order summary */
.order-item {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
}

.order-item:last-child {
    border-bottom: none;
}

/* Payment placeholder */
.payment-placeholder {
    background: #f8fafc;
    border-style: dashed !important;
}
```

---

## Commit Message Examples

```bash
git commit -m "[VALIDATION] Create checkout form validation

- Define validation rules for all fields
- Implement validateForm function
- Show inline error messages
- Scroll to first error on failed submit"

git commit -m "[FEATURE] Add shipping method selection

- Create standard and express options
- Calculate shipping cost based on method
- Update total with shipping + tax
- Style selected option differently"

git commit -m "[STATE] Implement order placement flow

- Generate unique order ID
- Show loading state during processing
- Clear cart on successful order
- Display order confirmation screen"

git commit -m "[POLISH] Create order summary sidebar

- List all cart items with images
- Calculate subtotal, shipping, tax, total
- Add sticky positioning on scroll
- Style place order button"
```

---

## Key Learning Points

### 1. Form Validation Pattern
```jsx
const validateForm = () => {
    const errors = {}
    if (!formData.firstName) errors.firstName = 'Required'
    return errors
}

const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
        setErrors(errors)
        return
    }
    // process order
}
```

### 2. Computed Values
```jsx
const shippingCost = shippingMethod === 'express' ? 15 : (cartTotal > 50 ? 0 : 5)
const tax = cartTotal * 0.1
const total = cartTotal + shippingCost + tax
```

### 3. Order ID Generation
```javascript
const orderId = 'ORD-' + Date.now().toString(36).toUpperCase()
```

### 4. Conditional Form Display
```jsx
if (cart.length === 0 && !orderPlaced) {
    return <EmptyCartMessage />
}

if (orderPlaced) {
    return <OrderConfirmation />
}
```

---

**← [ Quay lại Exercise 5.4](../exercises/04_checkout_flow.md)**