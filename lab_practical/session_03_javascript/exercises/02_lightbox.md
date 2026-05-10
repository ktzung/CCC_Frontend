# Exercise 3.2 — Portfolio Lightbox

## 🎬 Opening Scenario

*Upgrade lightbox từ CSS-only sang JavaScript để có navigation (next/prev) và keyboard support.*

---

## 📋 Requirements

### HTML Structure

```html
<!-- Portfolio Items với Lightbox Trigger -->
<div class="portfolio-item" data-category="web">
    <img src="project1.jpg" alt="Project 1" data-full="project1-full.jpg">
    <button class="lightbox-trigger" data-index="0">View</button>
</div>

<!-- Lightbox Overlay -->
<div id="lightbox" class="lightbox-overlay">
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-prev">&#10094;</button>
    <button class="lightbox-next">&#10095;</button>
    <img id="lightbox-img" class="lightbox-image" src="" alt="">
    <div class="lightbox-caption">
        <h3 id="lightbox-title">Project Title</h3>
        <p id="lightbox-desc">Project description</p>
    </div>
</div>
```

### JavaScript Implementation

```javascript
// 1. Select elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

// 2. Portfolio data
const portfolioItems = [
    { src: 'project1-full.jpg', title: 'Project 1', desc: 'Description 1' },
    { src: 'project2-full.jpg', title: 'Project 2', desc: 'Description 2' },
    { src: 'project3-full.jpg', title: 'Project 3', desc: 'Description 3' },
];
let currentIndex = 0;

// 3. Open lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 4. Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// 5. Update content
function updateLightboxContent() {
    const item = portfolioItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxTitle.textContent = item.title;
}

// 6. Navigation
function nextImage() {
    currentIndex = (currentIndex + 1) % portfolioItems.length;
    updateLightboxContent();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updateLightboxContent();
}

// 7. Event listeners
document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        openLightbox(parseInt(trigger.dataset.index));
    });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// 8. Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// 9. Click outside to close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
```

---

## 🎨 CSS Styling

```css
.lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 2000;
}

.lightbox-overlay.active {
    opacity: 1;
    visibility: visible;
}

.lightbox-image {
    max-width: 90%;
    max-height: 80vh;
    object-fit: contain;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
    position: absolute;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 1rem;
}

.lightbox-close { top: 20px; right: 20px; }
.lightbox-prev { left: 20px; top: 50%; transform: translateY(-50%); }
.lightbox-next { right: 20px; top: 50%; transform: translateY(-50%); }
```

---

## ✅ Success Criteria

- [ ] Lightbox opens when click trigger
- [ ] Close button works
- [ ] Prev/Next navigation works
- [ ] Escape key closes lightbox
- [ ] Arrow keys navigate images
- [ ] Click outside closes lightbox

---

**← [ Quay lại Session 3](../README.md)**