import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartSidebar() {
  const { cart, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="cart-sidebar-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="bi bi-cart3"></i>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image || `https://picsum.photos/80/80?random=${item.id}`} alt={item.title} />
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/cart" className="btn btn-primary w-100" onClick={() => setIsCartOpen(false)}>
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;