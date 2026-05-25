import { useState, useEffect } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-brand">
            <span className="brand-highlight">Dev</span>Portfolio
          </a>

          <button
            className={`navbar-toggler ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button onClick={() => scrollToSection('home')} className="nav-link">
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('about')} className="nav-link">
                  About
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('skills')} className="nav-link">
                  Skills
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('portfolio')} className="nav-link">
                  Portfolio
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('contact')} className="nav-link">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;