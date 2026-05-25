import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
        <div className="product-overlay">
          <button onClick={() => addToCart(product)}>
            <i className="bi bi-cart-plus"></i>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <i className="bi bi-star-fill"></i>
          <span>{product.rating?.rate || 0}</span>
          <span className="review-count">({product.rating?.count || 0})</span>
        </div>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;