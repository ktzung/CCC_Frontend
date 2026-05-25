import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <i className="bi bi-bag-check"></i>
            <span>ShopHub</span>
          </div>
          <p>Your trusted online store for quality products.</p>
          <div className="social-links">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-twitter"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;