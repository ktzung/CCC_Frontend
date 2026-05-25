# Solution 4.3 — Category Filter + Events

## Complete Filter Implementation with React State

### src/components/Portfolio.jsx

```jsx
import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './Portfolio.css'

// Define categories
const categories = [
  { key: 'all', label: 'All', icon: 'bi-grid-3x3-gap' },
  { key: 'web', label: 'Web', icon: 'bi-globe' },
  { key: 'mobile', label: 'Mobile', icon: 'bi-phone' },
  { key: 'design', label: 'Design', icon: 'bi-palette' },
]

function Portfolio() {
  // Filter state - controls which category is shown
  const [activeFilter, setActiveFilter] = useState('all')

  // Computed filtered items - derives from projects and filter
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  // Count by category for stats
  const getCategoryCount = (category) => {
    if (category === 'all') return projects.length
    return projects.filter(p => p.category === category).length
  }

  return (
    <section id="portfolio" className="portfolio-section py-5">
      <div className="container">
        <h2 className="display-6 fw-bold text-center mb-3">My Portfolio</h2>
        <p className="text-center text-muted mb-5">
          A collection of my work across different disciplines
        </p>

        {/* Filter Buttons */}
        <div className="filter-buttons d-flex justify-content-center flex-wrap gap-3 mb-5">
          {categories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.key)}
              aria-pressed={activeFilter === category.key}
            >
              <i className={`bi ${category.icon} me-2`}></i>
              {category.label}
              <span className="filter-count">{getCategoryCount(category.key)}</span>
            </button>
          ))}
        </div>

        {/* Filter result info */}
        <p className="text-center mb-4">
          Showing <strong>{filteredProjects.length}</strong> project{filteredProjects.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && ` in ${activeFilter}`}
        </p>

        {/* Portfolio Grid */}
        <div className="row g-4 justify-content-center">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
                description={project.description}
                tags={project.tags}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No projects found in this category.</p>
              <button
                className="btn btn-outline-primary mt-3"
                onClick={() => setActiveFilter('all')}
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
```

### src/components/Portfolio.css

```css
/* Filter Buttons Container */
.filter-buttons {
  gap: 0.75rem;
}

/* Individual Filter Button */
.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.filter-btn:hover {
  border-color: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.filter-btn:hover::before {
  opacity: 1;
}

.filter-btn.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
}

.filter-btn.active::before {
  opacity: 1;
}

/* Filter count badge */
.filter-count {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 20px;
  margin-left: 0.25rem;
  transition: all 0.3s ease;
}

.filter-btn:hover .filter-count,
.filter-btn.active .filter-count {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

/* Portfolio item animation */
.portfolio-section .row .col-12 {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation for grid items */
.portfolio-section .row .col-12:nth-child(1) { animation-delay: 0.1s; }
.portfolio-section .row .col-12:nth-child(2) { animation-delay: 0.2s; }
.portfolio-section .row .col-12:nth-child(3) { animation-delay: 0.3s; }
.portfolio-section .row .col-12:nth-child(4) { animation-delay: 0.4s; }
.portfolio-section .row .col-12:nth-child(5) { animation-delay: 0.5s; }
.portfolio-section .row .col-12:nth-child(6) { animation-delay: 0.6s; }

/* Responsive */
@media (max-width: 576px) {
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .filter-btn i {
    font-size: 1rem;
  }
}
```

### src/components/ProjectCard.jsx (updated with transition)

```jsx
import { useState } from 'react'
import './ProjectCard.css'

function ProjectCard({
  id,
  title,
  category,
  image,
  description,
  tags
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const categoryConfig = {
    web: { bg: 'primary', label: 'Web Development' },
    mobile: { bg: 'success', label: 'Mobile App' },
    design: { bg: 'warning', label: 'Design' },
  }

  const config = categoryConfig[category] || categoryConfig.web

  return (
    <div
      className="col-12 col-md-6 col-lg-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`card project-card h-100 border-0 shadow-sm overflow-hidden ${isHovered ? 'hovered' : ''}`}>
        {/* Image container */}
        <div className="position-relative image-container">
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.4s ease'
            }}
          />

          {/* Favorite button */}
          <button
            className={`favorite-btn position-absolute ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>

          {/* Overlay appears on hover */}
          <div
            className="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              opacity: isHovered ? 1 : 0,
              background: 'rgba(99, 102, 241, 0.9)',
              transition: 'opacity 0.3s ease'
            }}
          >
            <button className="btn btn-light">
              <i className="bi bi-zoom-in me-2"></i>View Project
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className={`badge bg-${config.bg}`}>
              {config.label}
            </span>
            <span className="text-muted small">#{id}</span>
          </div>

          <h5 className="card-title fw-bold mb-2">{title}</h5>
          <p className="card-text text-muted small mb-3">{description}</p>

          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
```

### src/data/projects.js

```javascript
export const projects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    category: 'web',
    image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=E-Commerce',
    description: 'Full-stack e-commerce application with React and Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Health Tracker App',
    category: 'mobile',
    image: 'https://via.placeholder.com/400x300/14b8a6/ffffff?text=Health+App',
    description: 'Cross-platform mobile app for tracking fitness goals',
    tags: ['React Native', 'Firebase'],
  },
  {
    id: 3,
    title: 'Dashboard Admin',
    category: 'web',
    image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Dashboard',
    description: 'Analytics dashboard with real-time data visualization',
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
    description: 'Real-time social platform with messaging features',
    tags: ['Flutter', 'Firebase'],
  },
  {
    id: 6,
    title: 'Brand Identity',
    category: 'design',
    image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Brand+Identity',
    description: 'Complete branding package including logo and guidelines',
    tags: ['Logo Design', 'Branding'],
  },
]
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Add portfolio filter with state

- Create filter state: 'all', 'web', 'mobile', 'design'
- Define categories array with icons
- Implement onClick handler to update filter
- Add active class styling for selected button"

git commit -m "[STATE] Implement filtered items logic

- Use .filter() to show items matching category
- Display project count for each filter
- Show "Showing X projects" text
- Handle empty state with message"

git commit -m "[UI] Create animated filter buttons

- Style buttons as pill-shaped with border
- Add gradient hover effect using ::before
- Show count badge on each button
- Implement pressed state for active filter"

git commit -m "[POLISH] Add staggered animation to grid

- Create fadeInUp animation keyframes
- Add animation-delay based on item index
- Apply transition on card hover
- Ensure responsive on mobile"
```

---

## Key Learning Points

### 1. Filter State Pattern
```jsx
const [activeFilter, setActiveFilter] = useState('all')

const filteredProjects = activeFilter === 'all'
  ? projects
  : projects.filter(p => p.category === activeFilter)
```

### 2. Event Handler in JSX
```jsx
// Correct: arrow function
<button onClick={() => setActiveFilter(category.key)}>

// Wrong: would call immediately
<button onClick={setActiveFilter(category.key)}>
```

### 3. Active Button Conditional
```jsx
className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
```

### 4. Filter Categories Array
```jsx
const categories = [
  { key: 'all', label: 'All', icon: 'bi-grid-3x3-gap' },
  { key: 'web', label: 'Web', icon: 'bi-globe' },
]
```

### 5. Key Prop Warning
```jsx
// Always use unique key from data
{categories.map(category => (
  <button key={category.key}>...</button>
))}
```

---

**← [ Quay lại Exercise 4.3](../exercises/03_category_filter.md)**