import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, getImageUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(['all', ...categoriesData]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Header />

      <main className="main-content">
        <section className="shop-hero">
          <div className="container">
            <h1>Welcome to ShopHub</h1>
            <p>Discover amazing products at great prices</p>
          </div>
        </section>

        <section className="shop-content">
          <div className="container">
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, image: getImageUrl(product, index) }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <CartSidebar />
      <Footer />

      <button className="cart-float-btn" onClick={() => setIsCartOpen(true)}>
        <i className="bi bi-cart3"></i>
        <span className="cart-badge">{cartCount}</span>
      </button>
    </div>
  );
}

export default Shop;