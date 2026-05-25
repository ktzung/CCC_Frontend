import { useState, useEffect } from 'react';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container">
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">John Doe</span>
              <br />
              Full Stack Developer
            </h1>
            <p className="hero-subtitle">
              I create beautiful, functional, and user-friendly web applications
              that help businesses grow and succeed online.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </button>
              <button
                className="btn btn-outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://picsum.photos/400/400?random=201"
              alt="John Doe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;