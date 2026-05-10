# Exercise 4.3 — Category Filter + Events

## 🎬 Opening Scenario

*Thêm filter functionality cho portfolio. User click filter button → hiện items thuộc category đó.*

---

## 📋 Requirements

### 1. Add Filter State

```jsx
// src/components/Portfolio.jsx
import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function Portfolio() {
    const [items] = useState(projects);
    const [filter, setFilter] = useState('all');

    const categories = ['all', 'web', 'mobile', 'design'];

    // Filter logic
    const filteredItems = filter === 'all'
        ? items
        : items.filter(item => item.category === filter);

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="container">
                <h2 className="text-center mb-5">My Portfolio</h2>

                {/* Filter Buttons */}
                <div className="filter-buttons">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Render filtered items */}
                <div className="portfolio-grid">
                    {filteredItems.map(project => (
                        <ProjectCard
                            key={project.id}
                            {...project}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
```

### 2. Active Button Styling

```jsx
// In filter button
className={`filter-btn ${filter === category ? 'active' : ''}`}
```

```css
/* CSS */
.filter-btn {
    padding: 0.5rem 1.5rem;
    border: 2px solid var(--accent-color);
    background: transparent;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn.active {
    background: var(--accent-color);
    color: white;
}

.filter-btn:hover:not(.active) {
    background: var(--accent-color-light);
}
```

---

## 🐛 Hints

### Key Prop Warning
```jsx
// Always use unique key from data
{items.map(project => (
    <ProjectCard key={project.id} {...project} />
))}
```

### Filter Logic
```javascript
// Wrong: mutates original
const filtered = items.filter(item => item.category === filter)

// Correct: new array reference (React requirement)
items.filter(item => item.category === filter)
```

### Event Handler
```jsx
// Arrow function in onClick
<button onClick={() => setFilter(category)}>

// NOT
<button onClick={setFilter(category)}> // Wrong - called immediately
```

---

## ✅ Success Criteria

- [ ] Filter state initialized as 'all'
- [ ] 4 filter buttons rendered
- [ ] Click handler updates filter state
- [ ] Active button styled differently
- [ ] Items filtered correctly by category
- [ ] "All" shows all items

---

**← [ Quay lại Session 4](../README.md)**