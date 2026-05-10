import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <i className="bi bi-bag-check"></i>
            ShopHub
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/cart" className="nav-link">
              <i className="bi bi-cart3"></i>
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;