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
    if (document.querySelector('.portfolio-item')) {
        PortfolioFilter.init();
    }
});