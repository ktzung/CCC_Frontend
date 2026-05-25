# Solution 3.4 — Theme Toggle + localStorage

## Complete Dark/Light Mode with System Preference Detection

### index.html (header section with theme toggle)

```html
<!-- Header with Theme Toggle -->
<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold custom-brand" href="#">YourName</a>

            <div class="d-flex align-items-center gap-3">
                <!-- Theme Toggle Button -->
                <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle theme">
                    <span class="theme-icon sun-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                        </svg>
                    </span>
                    <span class="theme-icon moon-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
                        </svg>
                    </span>
                </button>

                <!-- Mobile Menu Toggle -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link custom-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link custom-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link custom-link" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link custom-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
```

### CSS Theme Variables

```css
/* css/variables.css */

/* Light Theme (default) */
:root,
:root[data-theme="light"] {
    /* Backgrounds */
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;

    /* Text */
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;

    /* Accent */
    --accent-color: #6366f1;
    --accent-hover: #4f46e5;

    /* Borders */
    --border-color: #e2e8f0;
    --border-light: #f1f5f9;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

    /* Cards */
    --card-bg: #ffffff;
    --card-border: #e2e8f0;

    /* Navbar */
    --navbar-bg: #ffffff;
    --navbar-border: #e2e8f0;
}

/* Dark Theme */
:root[data-theme="dark"] {
    /* Backgrounds */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;

    /* Text */
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;

    /* Accent (keeps same for brand consistency) */
    --accent-color: #6366f1;
    --accent-hover: #818cf8;

    /* Borders */
    --border-color: #334155;
    --border-light: #475569;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);

    /* Cards */
    --card-bg: #1e293b;
    --card-border: #334155;

    /* Navbar */
    --navbar-bg: #0f172a;
    --navbar-border: #334155;
}

/* Theme transition */
:root {
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

### css/theme.css

```css
/* Apply CSS Variables */
body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Cards */
.card {
    background-color: var(--card-bg);
    border-color: var(--card-border);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Navbar */
.navbar {
    background-color: var(--navbar-bg);
    border-bottom: 1px solid var(--navbar-border);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Form Controls */
.form-control,
.form-select {
    background-color: var(--bg-primary);
    border-color: var(--border-color);
    color: var(--text-primary);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.form-control:focus,
.form-select:focus {
    background-color: var(--bg-primary);
    border-color: var(--accent-color);
    color: var(--text-primary);
}

/* Links */
.custom-link {
    color: var(--text-secondary);
    transition: color 0.2s ease;
}

.custom-link:hover,
.custom-link.active {
    color: var(--accent-color);
}

/* Brand */
.custom-brand {
    color: var(--accent-color) !important;
}

/* Theme Toggle Button */
.theme-toggle-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    background: var(--bg-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.theme-toggle-btn:hover {
    border-color: var(--accent-color);
    transform: scale(1.05);
}

/* Theme Icons */
.theme-icon {
    position: absolute;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.sun-icon {
    color: #f59e0b;
    opacity: 1;
    transform: rotate(0deg);
}

.moon-icon {
    color: #6366f1;
    opacity: 0;
    transform: rotate(-90deg);
}

/* Light mode - show sun, hide moon */
:root[data-theme="light"] .sun-icon {
    opacity: 1;
    transform: rotate(0deg);
}

:root[data-theme="light"] .moon-icon {
    opacity: 0;
    transform: rotate(-90deg);
}

/* Dark mode - show moon, hide sun */
:root[data-theme="dark"] .sun-icon {
    opacity: 0;
    transform: rotate(90deg);
}

:root[data-theme="dark"] .moon-icon {
    opacity: 1;
    transform: rotate(0deg);
}

/* Section backgrounds */
.section-light {
    background-color: var(--bg-secondary);
}

/* Portfolio overlay */
.portfolio-overlay {
    background: rgba(99, 102, 241, 0.85);
}

/* Footer */
.footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
}
```

### js/theme-toggle.js

```javascript
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
    ThemeToggle.init();
});

// Also initialize if script is loaded deferred
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    ThemeToggle.init();
}
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create theme toggle button

- Add sun/moon SVG icons for light/dark modes
- Style toggle button with circular shape
- Position button in navbar
- Add hover and active states"

git commit -m "[STATE] Implement theme state management

- Create getTheme() for localStorage/system check
- Implement setTheme() to apply and persist
- Add updateIcons() for visual feedback
- Bind click event to toggle function"

git commit -m "[CUSTOMIZE] Define CSS variables for themes

- Create light theme variables (bg, text, borders)
- Create dark theme variables
- Apply transitions for smooth theme switch
- Use variables throughout all components"

git commit -m "[POLISH] Add system preference detection

- Use matchMedia for prefers-color-scheme
- Only auto-switch if no localStorage value
- Add icon rotation animation on toggle
- Ensure theme persists across page loads"
```

---

## Key Learning Points

### 1. CSS Variable Theme Pattern
```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #0f172a;
}

:root[data-theme="dark"] {
    --bg-primary: #0f172a;
    --text-primary: #f8fafc;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease;
}
```

### 2. System Preference Detection
```javascript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
return prefersDark ? 'dark' : 'light';
```

### 3. localStorage Theme Persistence
```javascript
// Save
localStorage.setItem('theme-preference', 'dark');

// Read
const theme = localStorage.getItem('theme-preference');

// Remove (to reset to system preference)
localStorage.removeItem('theme-preference');
```

### 4. Icon Toggle Animation
```css
.sun-icon {
    transition: opacity 0.3s, transform 0.3s;
}
.moon-icon {
    transition: opacity 0.3s, transform 0.3s;
}
```

```javascript
// Rotate and fade between icons
if (theme === 'dark') {
    sunIcon.style.opacity = '0';
    sunIcon.style.transform = 'rotate(90deg)';
    moonIcon.style.opacity = '1';
    moonIcon.style.transform = 'rotate(0deg)';
}
```

### 5. System Preference Change Listener
```javascript
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme-preference')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
```

---

**← [ Quay lại Exercise 3.4](../exercises/04_theme_toggle.md)**