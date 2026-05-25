# Solution 1.3 — Portfolio Grid Gallery

## Complete HTML + CSS Solution

### index.html (sections added)

```html
<!-- Portfolio Section -->
<section id="portfolio" class="portfolio-section">
    <div class="container">
        <h2 class="section-title text-center">My Portfolio</h2>

        <!-- Filter Buttons -->
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
            <button class="filter-btn" data-filter="design">Design</button>
        </div>

        <!-- Portfolio Grid -->
        <div class="portfolio-grid">
            <!-- Item 1 - Web -->
            <div class="portfolio-item" data-category="web">
                <a href="#lightbox-1" class="lightbox-link">
                    <img src="https://via.placeholder.com/400x300/6366f1/ffffff?text=E-Commerce" alt="E-Commerce Website">
                </a>
                <div class="portfolio-overlay">
                    <h3>E-Commerce Website</h3>
                    <p>React + Node.js</p>
                </div>
            </div>

            <!-- Item 2 - Mobile -->
            <div class="portfolio-item" data-category="mobile">
                <a href="#lightbox-2" class="lightbox-link">
                    <img src="https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Health+App" alt="Health Tracker App">
                </a>
                <div class="portfolio-overlay">
                    <h3>Health Tracker App</h3>
                    <p>React Native</p>
                </div>
            </div>

            <!-- Item 3 - Web -->
            <div class="portfolio-item" data-category="web">
                <a href="#lightbox-3" class="lightbox-link">
                    <img src="https://via.placeholder.com/400x300/14b8a6/ffffff?text=Dashboard" alt="Dashboard Admin">
                </a>
                <div class="portfolio-overlay">
                    <h3>Dashboard Admin</h3>
                    <p>Vue.js + Chart.js</p>
                </div>
            </div>

            <!-- Item 4 - Design -->
            <div class="portfolio-item" data-category="design">
                <a href="#lightbox-4" class="lightbox-link">
                    <img src="https://via.placeholder.com/400x300/f59e0b/ffffff?text=Portfolio" alt="Portfolio Design">
                </a>
                <div class="portfolio-overlay">
                    <h3>Portfolio Design</h3>
                    <p>Figma + CSS</p>
                </div>
            </div>

            <!-- Item 5 - Mobile -->
            <div class="portfolio-item" data-category="mobile">
                <a href="#lightbox-5" class="lightbox-link">
                    <img src="https://via.placeholder.com/400x300/ec4899/ffffff?text=Social+App" alt="Social App">
                </a>
                <div class="portfolio-overlay">
                    <h3>Social Media App</h3>
                    <p>Flutter + Firebase</p>
                </div>
            </div>

            <!-- Item 6 - Design -->
            <div class="portfolio-item" data-category="design">
                <a href="#lightbox-6" class="lightbox-link">
                    <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Brand+Identity" alt="Brand Identity">
                </a>
                <div class="portfolio-overlay">
                    <h3>Brand Identity</h3>
                    <p>Branding + Logo</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Lightbox Overlays (at bottom of body) -->
<div id="lightbox-1" class="lightbox">
    <img src="https://via.placeholder.com/800x600/6366f1/ffffff?text=E-Commerce+Full" alt="">
    <div class="lightbox-caption">
        <h3>E-Commerce Website</h3>
        <p>Full-stack e-commerce application with React and Node.js</p>
    </div>
    <a href="#" class="lightbox-close">&times;</a>
</div>

<div id="lightbox-2" class="lightbox">
    <img src="https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Health+App+Full" alt="">
    <div class="lightbox-caption">
        <h3>Health Tracker App</h3>
        <p>Mobile app for tracking fitness goals</p>
    </div>
    <a href="#" class="lightbox-close">&times;</a>
</div>
<!-- Add more lightboxes for items 3-6 -->
```

### css/portfolio.css

```css
/* Portfolio Section */
.portfolio-section {
    padding: var(--space-2xl) 0;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.5rem 1.5rem;
    border: 2px solid var(--color-primary);
    background: transparent;
    color: var(--color-primary);
    border-radius: var(--radius-full);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--color-primary);
    color: var(--color-white);
}

/* Portfolio Grid */
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-lg);
}

/* Portfolio Item */
.portfolio-item {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    aspect-ratio: 4/3;
    cursor: pointer;
}

.portfolio-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.portfolio-item:hover img {
    transform: scale(1.1);
}

/* Overlay */
.portfolio-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(30, 41, 59, 0.95) 0%,
        rgba(30, 41, 59, 0.6) 50%,
        transparent 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--space-md);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;
}

.portfolio-overlay h3 {
    color: var(--color-white);
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
}

.portfolio-overlay p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
}

/* Lightbox */
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 2000;
}

.lightbox:target {
    opacity: 1;
    visibility: visible;
}

.lightbox img {
    max-width: 90%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: var(--radius-md);
}

.lightbox-caption {
    text-align: center;
    color: var(--color-white);
    margin-top: var(--space-md);
}

.lightbox-caption h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.lightbox-caption p {
    color: rgba(255, 255, 255, 0.7);
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: var(--color-white);
    text-decoration: none;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: background 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Lightbox Link */
.lightbox-link {
    display: block;
    width: 100%;
    height: 100%;
}
```

### JavaScript for Filter (enhancement beyond CSS-only)

```javascript
// portfolio-filter.js
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {
            const category = item.dataset.category;

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.classList.add('show');
            } else {
                item.style.display = 'none';
                item.classList.remove('show');
            }
        });
    });
});
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Build portfolio grid layout

- Create 3-column responsive grid with auto-fill
- Add aspect-ratio 4:3 for uniform image sizing
- Style portfolio items with rounded corners
- Add hover effects with overlay text"

git commit -m "[FEATURE] Add hover zoom effects

- Implement scale(1.1) transform on hover
- Add gradient overlay that fades in
- Create text reveal animation
- Style category labels"

git commit -m "[FEATURE] Implement CSS-only lightbox

- Add lightbox overlay using :target selector
- Style fullscreen modal with centered image
- Add close button positioned top-right
- Include caption and description in lightbox"
```

---

## Key Learning Points

### 1. CSS Grid Auto-Fill
```css
.portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* Creates as many 300px+ columns as fit */
}
```

### 2. Hover Overlay Effect
```css
.portfolio-overlay {
    position: absolute;
    inset: 0; /* Covers full parent */
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;
}
```

### 3. CSS Lightbox with :target
```css
.lightbox {
    opacity: 0;
    visibility: hidden;
}

.lightbox:target {
    opacity: 1;
    visibility: visible;
    /* Shows when URL has #lightbox-id */
}
```

### 4. Responsive Images
```css
.portfolio-item img {
    aspect-ratio: 4/3; /* Enforce consistent ratio */
    object-fit: cover; /* Fill without distortion */
}
```

---

**← [ Quay lại Exercise 1.3](../exercises/03_portfolio_gallery.md)**