import { useState, useEffect, useRef } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Bootstrap', 'MongoDB'];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          <div className="about-image">
            <img
              src="https://picsum.photos/500/400?random=202"
              alt="About me"
            />
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              I'm a passionate full-stack developer with over 5 years of experience
              building web applications. I specialize in JavaScript, React, Node.js,
              and modern web technologies.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
            <div className="skill-tags">
              {skills.map((skill, index) => (
                <span key={skill} className="skill-tag" style={{ animationDelay: `${index * 0.1}s` }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;