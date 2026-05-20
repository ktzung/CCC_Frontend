# Solution 3.2 — Portfolio Lightbox

## Complete JavaScript Lightbox with Navigation

### index.html (Lightbox section added)

```html
<!-- Lightbox Overlay -->
<div id="lightbox" class="lightbox-overlay" role="dialog" aria-modal="true">
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>

    <button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#10094;</button>
    <button class="lightbox-nav lightbox-next" aria-label="Next image">&#10095;</button>

    <div class="lightbox-content">
        <img id="lightbox-img" class="lightbox-image" src="" alt="">

        <div class="lightbox-caption">
            <h3 id="lightbox-title">Project Title</h3>
            <p id="lightbox-desc">Project description goes here</p>
            <span id="lightbox-category" class="badge"></span>
        </div>

        <div class="lightbox-counter">
            <span id="lightbox-current">1</span> / <span id="lightbox-total">6</span>
        </div>
    </div>

    <!-- Thumbnail navigation -->
    <div class="lightbox-thumbnails" id="lightbox-thumbs"></div>
</div>
```

### css/lightbox.css

```css
/* Lightbox Overlay */
.lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 2000;
}

.lightbox-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Lightbox Content */
.lightbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;
    max-height: 80vh;
}

.lightbox-image {
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
}

.lightbox-image:hover {
    transform: scale(1.02);
}

/* Caption */
.lightbox-caption {
    text-align: center;
    color: white;
    margin-top: 1.5rem;
    max-width: 600px;
}

.lightbox-caption h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: white;
}

.lightbox-caption p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.75rem;
}

/* Counter */
.lightbox-counter {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
    margin-top: 1rem;
}

/* Navigation Buttons */
.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 2.5rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.1);
}

.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }

/* Thumbnails */
.lightbox-thumbnails {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    max-width: 90vw;
    overflow-x: auto;
}

.lightbox-thumb {
    width: 60px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease, transform 0.2s ease;
    border: 2px solid transparent;
}

.lightbox-thumb:hover {
    opacity: 0.8;
    transform: scale(1.1);
}

.lightbox-thumb.active {
    opacity: 1;
    border-color: white;
}

/* Loading Spinner */
.lightbox-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .lightbox-nav {
        width: 44px;
        height: 44px;
        font-size: 1.5rem;
    }

    .lightbox-close {
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        font-size: 2rem;
    }

    .lightbox-caption h3 {
        font-size: 1.25rem;
    }

    .lightbox-thumbnails {
        display: none;
    }
}
```

### js/lightbox.js

```javascript
// Lightbox Module
const Lightbox = {
    // Portfolio data
    portfolioData: [
        {
            src: 'https://via.placeholder.com/800x600/6366f1/ffffff?text=E-Commerce+Full',
            title: 'E-Commerce Website',
            desc: 'Full-stack marketplace with React frontend and Node.js backend',
            category: 'Web'
        },
        {
            src: 'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Health+App+Full',
            title: 'Health Tracker App',
            desc: 'React Native mobile app for tracking fitness goals',
            category: 'Mobile'
        },
        {
            src: 'https://via.placeholder.com/800x600/14b8a6/ffffff?text=Dashboard+Full',
            title: 'Dashboard Admin',
            desc: 'Vue.js analytics dashboard with real-time data visualization',
            category: 'Web'
        },
        {
            src: 'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Portfolio+Full',
            title: 'Portfolio Design',
            desc: 'Figma design system and CSS implementation',
            category: 'Design'
        },
        {
            src: 'https://via.placeholder.com/800x600/ec4899/ffffff?text=Social+App+Full',
            title: 'Social Media App',
            desc: 'Flutter cross-platform app with Firebase backend',
            category: 'Mobile'
        },
        {
            src: 'https://via.placeholder.com/800x600/10b981/ffffff?text=Brand+Full',
            title: 'Brand Identity',
            desc: 'Complete branding package with logo and guidelines',
            category: 'Design'
        }
    ],

    currentIndex: 0,
    isOpen: false,

    // DOM Elements
    get elements() {
        return {
            overlay: document.getElementById('lightbox'),
            img: document.getElementById('lightbox-img'),
            title: document.getElementById('lightbox-title'),
            desc: document.getElementById('lightbox-desc'),
            category: document.getElementById('lightbox-category'),
            current: document.getElementById('lightbox-current'),
            total: document.getElementById('lightbox-total'),
            closeBtn: document.querySelector('.lightbox-close'),
            prevBtn: document.querySelector('.lightbox-prev'),
            nextBtn: document.querySelector('.lightbox-next'),
            thumbsContainer: document.getElementById('lightbox-thumbs')
        };
    },

    // Initialize
    init() {
        this.cacheElements();
        this.createThumbnails();
        this.bindEvents();
        this.updateTotal();
    },

    // Cache DOM elements
    cacheElements() {
        this.dom = this.elements;
    },

    // Create thumbnail strip
    createThumbnails() {
        const container = this.dom.thumbsContainer;
        container.innerHTML = '';

        this.portfolioData.forEach((item, index) => {
            const thumb = document.createElement('img');
            thumb.src = item.src.replace('800x600', '60x40');
            thumb.className = 'lightbox-thumb';
            thumb.alt = item.title;
            thumb.dataset.index = index;

            thumb.addEventListener('click', () => this.goTo(index));
            container.appendChild(thumb);
        });
    },

    // Bind all events
    bindEvents() {
        // Trigger buttons
        document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const index = parseInt(trigger.dataset.index);
                this.open(index);
            });
        });

        // Navigation
        this.dom.closeBtn.addEventListener('click', () => this.close());
        this.dom.prevBtn.addEventListener('click', () => this.prev());
        this.dom.nextBtn.addEventListener('click', () => this.next());

        // Click outside to close
        this.dom.overlay.addEventListener('click', (e) => {
            if (e.target === this.dom.overlay) this.close();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    },

    // Handle keyboard
    handleKeyboard(e) {
        if (!this.isOpen) return;

        switch (e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                this.prev();
                break;
            case 'ArrowRight':
                this.next();
                break;
        }
    },

    // Open lightbox
    open(index) {
        this.currentIndex = index;
        this.isOpen = true;
        this.updateContent();
        this.updateActiveThumb();
        this.dom.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    // Close lightbox
    close() {
        this.isOpen = false;
        this.dom.overlay.classList.remove('active');
        document.body.style.overflow = '';
    },

    // Go to specific index
    goTo(index) {
        this.currentIndex = index;
        this.updateContent();
        this.updateActiveThumb();
    },

    // Next image
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.portfolioData.length;
        this.updateContent();
        this.updateActiveThumb();
    },

    // Previous image
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.portfolioData.length) % this.portfolioData.length;
        this.updateContent();
        this.updateActiveThumb();
    },

    // Update content
    updateContent() {
        const item = this.portfolioData[this.currentIndex];

        // Animate image change
        this.dom.img.style.opacity = '0';
        setTimeout(() => {
            this.dom.img.src = item.src;
            this.dom.img.alt = item.title;
            this.dom.title.textContent = item.title;
            this.dom.desc.textContent = item.desc;
            this.dom.category.textContent = item.category;
            this.dom.current.textContent = this.currentIndex + 1;
            this.dom.img.style.opacity = '1';
        }, 200);
    },

    // Update active thumbnail
    updateActiveThumb() {
        document.querySelectorAll('.lightbox-thumb').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });

        // Scroll active thumb into view
        const activeThumb = document.querySelector('.lightbox-thumb.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    },

    // Update total count
    updateTotal() {
        this.dom.total.textContent = this.portfolioData.length;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    Lightbox.init();
});
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create JavaScript lightbox overlay

- Build lightbox overlay structure with navigation
- Implement open/close toggle functionality
- Add prev/next navigation buttons
- Set up portfolio data array for content"

git commit -m "[STATE] Add keyboard navigation support

- Add Escape key to close lightbox
- Implement ArrowLeft/ArrowRight for navigation
- Bind keyboard events to document
- Only respond when lightbox is open"

git commit -m "[UI] Create lightbox thumbnail strip

- Generate thumbnails from portfolio data
- Add click handlers to thumbnail navigation
- Implement active state for current thumbnail
- Auto-scroll active thumb into view"

git commit -m "[POLISH] Add animation and mobile support

- Create fade transition for image changes
- Add scale effect on image hover
- Style close button rotation on hover
- Hide thumbnails on mobile screens"
```

---

## Key Learning Points

### 1. Lightbox Open/Close Pattern
```javascript
open(index) {
    this.isOpen = true;
    this.dom.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';  // Prevent scroll
}

close() {
    this.isOpen = false;
    this.dom.overlay.classList.remove('active');
    document.body.style.overflow = '';  // Restore scroll
}
```

### 2. Circular Navigation
```javascript
// Next wraps around to beginning
next() {
    this.currentIndex = (this.currentIndex + 1) % this.portfolioData.length;
}

// Prev wraps around to end
prev() {
    this.currentIndex = (this.currentIndex - 1 + this.portfolioData.length) % this.portfolioData.length;
}
```

### 3. Click Outside to Close
```javascript
this.dom.overlay.addEventListener('click', (e) => {
    if (e.target === this.dom.overlay) this.close();
});
```

### 4. Image Loading Transition
```css
.lightbox-image {
    transition: opacity 0.3s ease;
}
```

```javascript
// Animate on src change
this.dom.img.style.opacity = '0';
setTimeout(() => {
    this.dom.img.src = newSrc;
    this.dom.img.style.opacity = '1';
}, 200);
```

---

**← [ Quay lại Exercise 3.2](../exercises/02_lightbox.md)**