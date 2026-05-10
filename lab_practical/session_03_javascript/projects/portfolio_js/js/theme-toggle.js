// Theme Toggle Module
const ThemeToggle = {
    // Constants
    STORAGE_KEY: 'theme-preference',
    LIGHT: 'light',
    DARK: 'dark',

    // Elements
    toggleBtn: null,
    sunIcon: null,
    moonIcon: null,

    // Initialize
    init() {
        this.cacheElements();
        this.applyInitialTheme();
        this.bindEvents();
        this.listenForSystemChanges();
    },

    // Cache DOM elements
    cacheElements() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.sunIcon = document.querySelector('.sun-icon');
        this.moonIcon = document.querySelector('.moon-icon');
    },

    // Apply theme on initial load
    applyInitialTheme() {
        const theme = this.getTheme();
        this.setTheme(theme);
    },

    // Get theme from localStorage or system preference
    getTheme() {
        // Check localStorage first (user's explicit choice)
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        if (savedTheme) {
            return savedTheme;
        }

        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? this.DARK : this.LIGHT;
    },

    // Set theme
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateIcons(theme);
    },

    // Update toggle icons based on theme
    updateIcons(theme) {
        if (!this.sunIcon || !this.moonIcon) return;

        if (theme === this.DARK) {
            this.sunIcon.style.opacity = '0';
            this.sunIcon.style.transform = 'rotate(90deg)';
            this.moonIcon.style.opacity = '1';
            this.moonIcon.style.transform = 'rotate(0deg)';
        } else {
            this.sunIcon.style.opacity = '1';
            this.sunIcon.style.transform = 'rotate(0deg)';
            this.moonIcon.style.opacity = '0';
            this.moonIcon.style.transform = 'rotate(-90deg)';
        }
    },

    // Toggle theme
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
        this.setTheme(newTheme);
    },

    // Bind click event
    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    },

    // Listen for system preference changes
    listenForSystemChanges() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            if (!savedTheme) {
                const newTheme = e.matches ? this.DARK : this.LIGHT;
                this.setTheme(newTheme);
            }
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('theme-toggle')) {
        ThemeToggle.init();
    }
});

// Also initialize if script is loaded deferred
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (document.getElementById('theme-toggle')) {
        ThemeToggle.init();
    }
}