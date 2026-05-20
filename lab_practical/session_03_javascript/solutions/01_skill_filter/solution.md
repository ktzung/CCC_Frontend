# Solution 3.1 — Skill Filter Animation

## Complete Solution with Filter Animation

### index.html

```html
<section id="portfolio" class="portfolio-section py-5">
    <div class="container">
        <h2 class="display-5 fw-bold text-center mb-5">My Portfolio</h2>

        <!-- Filter Buttons -->
        <div class="filter-buttons d-flex justify-content-center flex-wrap gap-3 mb-5">
            <button class="filter-btn active" data-filter="all">
                <i class="bi bi-grid-3x3-gap me-2"></i>All
            </button>
            <button class="filter-btn" data-filter="web">
                <i class="bi bi-globe me-2"></i>Web
            </button>
            <button class="filter-btn" data-filter="mobile">
                <i class="bi bi-phone me-2"></i>Mobile
            </button>
            <button class="filter-btn" data-filter="design">
                <i class="bi bi-palette me-2"></i>Design
            </button>
        </div>

        <!-- Portfolio Grid -->
        <div class="row g-4 portfolio-grid">
            <!-- Item 1 - Web -->
            <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="web">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/400x250/6366f1/ffffff?text=E-Commerce"
                             class="card-img-top" alt="E-Commerce Website">
                        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-light lightbox-trigger" data-index="0">
                                <i class="bi bi-zoom-in me-2"></i>View
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">Web</span>
                        <h5 class="card-title fw-bold">E-Commerce Website</h5>
                        <p class="card-text text-muted small">React + Node.js full-stack application</p>
                    </div>
                </div>
            </div>

            <!-- Item 2 - Mobile -->
            <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="mobile">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Health+App"
                             class="card-img-top" alt="Health Tracker App">
                        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-light lightbox-trigger" data-index="1">
                                <i class="bi bi-zoom-in me-2"></i>View
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-success mb-2">Mobile</span>
                        <h5 class="card-title fw-bold">Health Tracker App</h5>
                        <p class="card-text text-muted small">React Native fitness application</p>
                    </div>
                </div>
            </div>

            <!-- Item 3 - Web -->
            <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="web">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/400x250/14b8a6/ffffff?text=Dashboard"
                             class="card-img-top" alt="Dashboard Admin">
                        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-light lightbox-trigger" data-index="2">
                                <i class="bi bi-zoom-in me-2"></i>View
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">Web</span>
                        <h5 class="card-title fw-bold">Dashboard Admin</h5>
                        <p class="card-text text-muted small">Vue.js + Chart.js analytics</p>
                    </div>
                </div>
            </div>

            <!-- Item 4 - Design -->
            <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="design">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/400x250/f59e0b/ffffff?text=Portfolio"
                             class="card-img-top" alt="Portfolio Design">
                        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-light lightbox-trigger" data-index="3">
                                <i class="bi bi-zoom-in me-2"></i>View
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-warning text-dark mb-2">Design</span>
                        <h5 class="card-title fw-bold">Portfolio Design</h5>
                        <p class="card-text text-muted small">Figma + CSS implementation</p>
                    </div>
                </div>
            </div>

            <!-- Item 5 - Mobile -->
            <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="mobile">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/400x250/ec4899/ffffff?text=Social+App"
                             class="card-img-top" alt="Social App">
                        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-light lightbox-trigger" data-index="4">
                                <i class="bi bi-zoom-in me-2"></i>View
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-success mb-2">Mobile</span>
                        <h5 class="card-title fw-bold">Social Media App</h5>
                        <p class="card-text text-muted small">Flutter + Firebase realtime</p>
                    </div>
                </div>
            </div>

            <!-- Item 6 - Design -->
            <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="design">
                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/400x250/10b981/ffffff?text=Brand+Identity"
                             class="card-img-top" alt="Brand Identity">
                        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-light lightbox-trigger" data-index="5">
                                <i class="bi bi-zoom-in me-2"></i>View
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-warning text-dark mb-2">Design</span>
                        <h5 class="card-title fw-bold">Brand Identity</h5>
                        <p class="card-text text-muted small">Logo design and branding kit</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### css/portfolio-filter.css

```css
/* Filter Buttons */
.filter-buttons {
    gap: 0.75rem;
}

.filter-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #6366f1;
    background: transparent;
    color: #6366f1;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
}

.filter-btn:hover {
    background: rgba(99, 102, 241, 0.1);
    transform: translateY(-2px);
}

.filter-btn.active {
    background: #6366f1;
    color: white;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

/* Portfolio Item Animation */
.portfolio-item {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    transform: scale(1) translateY(0);
}

.portfolio-item.hiding {
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
}

.portfolio-item.hidden {
    display: none;
}

/* Show animation */
.portfolio-item.showing {
    animation: fadeInScale 0.5s ease forwards;
}

@keyframes fadeInScale {
    0% {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* Card Hover Effect */
.portfolio-item .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.portfolio-item .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

/* Overlay */
.portfolio-overlay {
    background: rgba(99, 102, 241, 0.85);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-item .card:hover .portfolio-overlay {
    opacity: 1;
}

/* Result Count */
.filter-result {
    text-align: center;
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    min-height: 1.5rem;
}
```

### js/portfolio-filter.js

```javascript
// Portfolio Filter Module
const PortfolioFilter = {
    // State
    items: [],
    activeFilter: 'all',

    // DOM Elements
    get elements() {
        return {
            buttons: document.querySelectorAll('.filter-btn'),
            items: document.querySelectorAll('.portfolio-item'),
            result: document.querySelector('.filter-result')
        };
    },

    // Initialize
    init() {
        this.items = Array.from(this.elements.items);
        this.bindEvents();
        this.updateResult();
    },

    // Bind click events
    bindEvents() {
        this.elements.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleFilterClick(button));
        });
    },

    // Handle filter button click
    handleFilterClick(clickedButton) {
        // Skip if already active
        if (clickedButton.classList.contains('active')) return;

        // Update active button
        this.elements.buttons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        // Get filter value
        const filter = clickedButton.dataset.filter;
        this.activeFilter = filter;

        // Filter items with animation
        this.filterItems(filter);
        this.updateResult();
    },

    // Filter items with staggered animation
    filterItems(filter) {
        let visibleCount = 0;

        this.items.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                visibleCount++;
                this.showItem(item, visibleCount);
            } else {
                this.hideItem(item);
            }
        });
    },

    // Show item with animation
    showItem(item, delay) {
        item.classList.remove('hidden', 'hiding');
        item.classList.add('showing');

        // Stagger the animation
        item.style.animationDelay = `${(delay - 1) * 0.1}s`;

        // Clean up after animation
        setTimeout(() => {
            item.classList.remove('showing');
            item.style.animationDelay = '';
        }, 500 + (delay * 100));
    },

    // Hide item
    hideItem(item) {
        item.classList.add('hiding');

        setTimeout(() => {
            item.classList.add('hidden');
            item.classList.remove('hiding');
        }, 300);
    },

    // Update result text
    updateResult() {
        const visibleItems = this.items.filter(item => {
            return !item.classList.contains('hidden');
        });

        if (this.elements.result) {
            this.elements.result.textContent = `Showing ${visibleItems.length} project${visibleItems.length !== 1 ? 's' : ''}`;
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    PortfolioFilter.init();
});
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create portfolio filter with JavaScript

- Select filter buttons and portfolio items
- Add click event to update active state
- Implement category matching logic
- Show/hide items based on data-category"

git commit -m "[STATE] Add filter animation effects

- Implement fade out animation for hidden items
- Add scale transform for hiding transition
- Create staggered reveal for visible items
- Use CSS classes for animation states"

git commit -m "[UI] Style filter buttons and add icons

- Create pill-style buttons with border
- Add active state with filled background
- Include Bootstrap Icons for categories
- Add hover lift effect on buttons"

git commit -m "[POLISH] Update result count and transitions

- Add text showing visible item count
- Adjust animation timing and easing
- Ensure smooth transitions on filter change
- Fix display property after animation completes"
```

---

## Key Learning Points

### 1. Dataset Attribute Access
```javascript
// Get value from data-filter attribute
const filterValue = button.dataset.filter;

// Get value from data-category attribute
const category = item.dataset.category;
```

### 2. Filter Animation Pattern
```javascript
// 1. Add hiding class (fade out)
item.classList.add('hiding');

// 2. Wait for animation
setTimeout(() => {
    item.classList.add('hidden');  // display: none
}, 300);

// 3. Show with delay for stagger effect
item.classList.add('showing');
item.style.animationDelay = `${index * 0.1}s`;
```

### 3. Active Button Styling
```css
.filter-btn.active {
    background: var(--color-primary);
    color: white;
}
```

### 4. Item Category Check
```javascript
if (filterValue === 'all' || filterValue === itemCategory) {
    // Show item
} else {
    // Hide item
}
```

---

**← [ Quay lại Exercise 3.1](../exercises/01_skill_filter.md)**