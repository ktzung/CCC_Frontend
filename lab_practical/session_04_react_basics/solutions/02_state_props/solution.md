# Solution 4.2 — State + Props

## Complete Portfolio with State Management

### src/data/projects.js

```javascript
export const projects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    category: 'web',
    image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=E-Commerce',
    description: 'Full-stack e-commerce application with React frontend and Node.js backend',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Health Tracker App',
    category: 'mobile',
    image: 'https://via.placeholder.com/400x300/14b8a6/ffffff?text=Health+App',
    description: 'Cross-platform mobile app for tracking fitness goals and nutrition',
    tags: ['React Native', 'Firebase'],
  },
  {
    id: 3,
    title: 'Dashboard Admin',
    category: 'web',
    image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Dashboard',
    description: 'Analytics dashboard with real-time data visualization and reporting',
    tags: ['Vue.js', 'Chart.js'],
  },
  {
    id: 4,
    title: 'Portfolio Design',
    category: 'design',
    image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Portfolio',
    description: 'Personal portfolio design system with responsive layouts',
    tags: ['Figma', 'CSS'],
  },
  {
    id: 5,
    title: 'Social Media App',
    category: 'mobile',
    image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Social+App',
    description: 'Real-time social platform with messaging and media sharing',
    tags: ['Flutter', 'Firebase'],
  },
  {
    id: 6,
    title: 'Brand Identity',
    category: 'design',
    image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Brand+Identity',
    description: 'Complete branding package including logo, colors, and guidelines',
    tags: ['Logo Design', 'Branding'],
  },
]
```

### src/components/Portfolio.jsx

```jsx
import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './Portfolio.css'

function Portfolio() {
  // State for projects - loaded from static data
  const [items] = useState(projects)

  // State for favorite status (demonstrates more complex state)
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
  }

  return (
    <section id="portfolio" className="portfolio-section py-5">
      <div className="container">
        <h2 className="display-6 fw-bold text-center mb-5">My Portfolio</h2>

        {/* Project count display */}
        <p className="text-center text-muted mb-4">
          Showing {items.length} projects
        </p>

        {/* Portfolio Grid */}
        <div className="row g-4">
          {items.map(project => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              image={project.image}
              description={project.description}
              tags={project.tags}
              isFavorite={favorites.includes(project.id)}
              onToggleFavorite={() => toggleFavorite(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
```

### src/components/ProjectCard.jsx

```jsx
import './ProjectCard.css'

function ProjectCard({
  id,
  title,
  category,
  image,
  description,
  tags,
  isFavorite,
  onToggleFavorite
}) {
  // Category badge color mapping
  const categoryConfig = {
    web: { bg: 'primary', label: 'Web Development' },
    mobile: { bg: 'success', label: 'Mobile App' },
    design: { bg: 'warning', label: 'Design' },
  }

  const config = categoryConfig[category] || categoryConfig.web

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card project-card h-100 border-0 shadow-sm overflow-hidden">
        {/* Image with overlay */}
        <div className="position-relative image-container">
          <img src={image} className="card-img-top" alt={title} />

          {/* Favorite button */}
          <button
            className={`favorite-btn position-absolute ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>

          {/* Hover overlay */}
          <div className="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <button className="btn btn-light">
              <i className="bi bi-zoom-in me-2"></i>View Project
            </button>
          </div>
        </div>

        {/* Card content */}
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className={`badge bg-${config.bg}`}>
              {config.label}
            </span>
            <span className="text-muted small">#{id}</span>
          </div>

          <h5 className="card-title fw-bold mb-2">{title}</h5>

          <p className="card-text text-muted small mb-3">
            {description}
          </p>

          {/* Tags */}
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card footer */}
        <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
          <small className="text-muted">Created 2026</small>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary">
              <i className="bi bi-github me-1"></i>Code
            </button>
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-eye me-1"></i>Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
```

### src/components/ProjectCard.css

```css
.project-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.12) !important;
}

/* Image container */
.image-container {
  position: relative;
  overflow: hidden;
}

.card-img-top {
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .card-img-top {
  transform: scale(1.08);
}

/* Overlay */
.portfolio-overlay {
  background: rgba(99, 102, 241, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .portfolio-overlay {
  opacity: 1;
}

/* Favorite button */
.favorite-btn {
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.favorite-btn i {
  font-size: 1.25rem;
  color: #64748b;
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.active i {
  color: #ef4444;
}

.favorite-btn.active i::before {
  animation: heartBeat 0.3s ease;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Tags */
.tag-badge {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Card footer */
.card-footer .btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
```

### src/components/Portfolio.css

```css
.portfolio-section {
  background: #ffffff;
}

.portfolio-section h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #6366f1;
  margin: 1rem auto 0;
  border-radius: 2px;
}
```

---

## Commit Message Examples

```bash
git commit -m "[STATE] Create projects state in Portfolio

- Use useState to hold projects array
- Import projects from data file
- Render items using .map() with key prop"

git commit -m "[COMPONENT] Build ProjectCard with props

- Define props: title, category, image, description, tags
- Add category badge with color mapping
- Implement tags display with map"

git commit -m "[STATE] Add favorite toggle functionality

- Create favorites array in state
- Add toggle function to add/remove ids
- Pass isFavorite and handler to ProjectCard"

git commit -m "[STYLE] Create ProjectCard CSS

- Add card hover lift effect
- Implement image zoom on hover
- Create heart button animation
- Style tags as pill badges"
```

---

## Key Learning Points

### 1. Using useState with Static Data
```jsx
const [items] = useState(projects)
// items is now the projects array, rendered via .map()
```

### 2. Props Destructuring
```jsx
function ProjectCard({ title, category, image, tags }) {
  // Destructure all props for easy access
  return <div>{title}</div>
}
```

### 3. Unique Key in Map
```jsx
{items.map(project => (
  <ProjectCard key={project.id} {...project} />
))}
```

### 4. State Update from Child
```jsx
// Parent passes handler to child
<ProjectCard onToggleFavorite={() => toggleFavorite(id)} />

// Child calls handler
<button onClick={onToggleFavorite}>Toggle</button>
```

### 5. Conditional Class with Object
```jsx
const categoryConfig = {
  web: { bg: 'primary', label: 'Web' },
  mobile: { bg: 'success', label: 'Mobile' },
}
const config = categoryConfig[category]
```

---

**← [ Quay lại Exercise 4.2](../exercises/02_state_props.md)**