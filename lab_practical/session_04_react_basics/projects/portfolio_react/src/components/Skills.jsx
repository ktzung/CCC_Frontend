import { useState, useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';

function Skills() {
  const [animatedSkills, setAnimatedSkills] = useState(skills.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => {
            const newState = [...prev];
            newState[index] = skill.percentage;
            return newState;
          });
        }, index * 150);
      });
    }
  }, [isVisible]);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">My Skills</h2>
        <p className="section-subtitle text-center">Technologies I work with</p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className={`skill-percentage text-${skill.color}`}>
                  {animatedSkills[index]}%
                </span>
              </div>
              <div className="skill-bar">
                <div
                  className={`skill-progress bg-${skill.color}`}
                  style={{ width: `${animatedSkills[index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;