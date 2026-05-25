import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, getImageUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        setProduct({ ...data, image: getImageUrl({ id }, 0) });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <Link to="/">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Header />

      <main className="main-content">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> / {product.category} / {product.title}
          </nav>

          <div className="product-detail">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <span className="category-badge">{product.category}</span>
              <h1>{product.title}</h1>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="description">{product.description}</p>
              <div className="product-actions">
                <button className="btn btn-primary btn-lg" onClick={() => addToCart(product)}>
                  <i className="bi bi-cart-plus"></i>
                  Add to Cart
                </button>
              </div>
              <div className="product-meta">
                <span><i className="bi bi-star-fill"></i> {product.rating?.rate || 0}</span>
                <span><i className="bi bi-chat"></i> {product.rating?.count || 0} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;