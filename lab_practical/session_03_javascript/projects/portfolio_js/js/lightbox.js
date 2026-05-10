// Lightbox Module
const Lightbox = {
    // Portfolio data
    portfolioData: [
        {
            src: 'https://picsum.photos/800/600?random=52',
            title: 'E-Commerce Website',
            desc: 'Full-stack marketplace with React frontend and Node.js backend',
            category: 'Web'
        },
        {
            src: 'https://picsum.photos/800/600?random=53',
            title: 'Health Tracker App',
            desc: 'React Native mobile app for tracking fitness goals',
            category: 'Mobile'
        },
        {
            src: 'https://picsum.photos/800/600?random=54',
            title: 'Dashboard Admin',
            desc: 'Vue.js analytics dashboard with real-time data visualization',
            category: 'Web'
        },
        {
            src: 'https://picsum.photos/800/600?random=55',
            title: 'Portfolio Design',
            desc: 'Figma design system and CSS implementation',
            category: 'Design'
        },
        {
            src: 'https://picsum.photos/800/600?random=56',
            title: 'Social Media App',
            desc: 'Flutter cross-platform app with Firebase backend',
            category: 'Mobile'
        },
        {
            src: 'https://picsum.photos/800/600?random=57',
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
        if (!document.getElementById('lightbox')) return;

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
        if (!container) return;
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

        // Navigation buttons
        if (this.dom.closeBtn) {
            this.dom.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.dom.prevBtn) {
            this.dom.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.dom.nextBtn) {
            this.dom.nextBtn.addEventListener('click', () => this.next());
        }

        // Click outside to close
        if (this.dom.overlay) {
            this.dom.overlay.addEventListener('click', (e) => {
                if (e.target === this.dom.overlay) this.close();
            });
        }

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
        const thumbs = document.querySelectorAll('.lightbox-thumb');
        thumbs.forEach((thumb, index) => {
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
        if (this.dom.total) {
            this.dom.total.textContent = this.portfolioData.length;
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lightbox')) {
        Lightbox.init();
    }
});