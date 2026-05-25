import { socialLinks } from '../data/portfolio';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="brand-highlight">Dev</span>Portfolio
          </div>
          <p className="footer-tagline">Building digital experiences that matter.</p>
          <div className="social-links">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} className="social-link" aria-label={link.name}>
                <i className={`bi ${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 DevPortfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;