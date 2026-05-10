import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart');

  if (checkoutStep === 'success') {
    return (
      <div className="checkout-success">
        <div className="success-content">
          <i className="bi bi-check-circle-fill"></i>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>{cart.length} items in your cart</p>
        </div>
      </header>

      <main className="cart-content">
        <div className="container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="bi bi-cart-x"></i>
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
                Browse Products
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image || `https://picsum.photos/100/100?random=${item.id}`} alt={item.title} />
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p className="price">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
                <button className="btn btn-outline clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary btn-lg w-100" onClick={() => setCheckoutStep('success')}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cart;