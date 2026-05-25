# Exercise 4.2 — State + Props

## 🎬 Opening Scenario

*Thêm state management cho portfolio items. Data sẽ được lưu trong useState và render ra giao diện.*

---

## 📋 Requirements

### 1. Projects Data Array

```javascript
// src/data/projects.js
export const projects = [
    {
        id: 1,
        title: 'E-Commerce Website',
        category: 'web',
        image: 'https://via.placeholder.com/400x300',
        description: 'Full-stack e-commerce with React and Node.js',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    {
        id: 2,
        title: 'Health Tracker App',
        category: 'mobile',
        image: 'https://via.placeholder.com/400x300',
        description: 'Mobile app for tracking fitness goals',
        tags: ['React Native', 'Firebase']
    },
    {
        id: 3,
        title: 'Dashboard Admin',
        category: 'web',
        image: 'https://via.placeholder.com/400x300',
        description: 'Admin dashboard with analytics',
        tags: ['Vue.js', 'Chart.js']
    },
    {
        id: 4,
        title: 'Portfolio Design',
        category: 'design',
        image: 'https://via.placeholder.com/400x300',
        description: 'Personal portfolio design',
        tags: ['Figma', 'CSS']
    }
];
```

### 2. Portfolio Component với useState

```jsx
// src/components/Portfolio.jsx
import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function Portfolio() {
    // State for projects
    const [items] = useState(projects);

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="container">
                <h2 className="text-center mb-5">My Portfolio</h2>

                {/* Render list from state */}
                <div className="portfolio-grid">
                    {items.map(project => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            category={project.category}
                            image={project.image}
                            description={project.description}
                            tags={project.tags}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
```

### 3. ProjectCard Component

```jsx
// src/components/ProjectCard.jsx
function ProjectCard({ title, category, image, description, tags }) {
    return (
        <div className={`project-card ${category}`}>
            <div className="project-image">
                <img src={image} alt={title} />
            </div>
            <div className="project-content">
                <span className="project-category">{category}</span>
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>
                <div className="project-tags">
                    {tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
```

---

## 🎨 Styling

```css
/* src/components/Portfolio.module.css */
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    border-radius: 12px;
    overflow: hidden;
    background: var(--card-bg);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-image img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
}

.project-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.tag {
    padding: 0.25rem 0.75rem;
    background: var(--accent-color);
    color: white;
    border-radius: 20px;
    font-size: 0.75rem;
}
```

---

## ✅ Success Criteria

- [ ] Projects loaded from state
- [ ] ProjectCard renders all props
- [ ] .map() with unique key warnings resolved
- [ ] Tags displayed for each project
- [ ] Category badge shown

---

**← [ Quay lại Session 4](../README.md)**