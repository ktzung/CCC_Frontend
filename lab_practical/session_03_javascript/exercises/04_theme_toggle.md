# Exercise 3.4 — Theme Toggle + localStorage

## 🎬 Opening Scenario

*Portfolio cần có dark/light mode toggle. Preference được lưu vào localStorage và detect system preference.*

---

## 📋 Requirements

### HTML Structure

```html
<!-- Theme Toggle Button -->
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
    <span class="theme-icon light-icon">☀️</span>
    <span class="theme-icon dark-icon">🌙</span>
</button>

<!-- CSS Variables in :root -->
:root {
    /* Light theme (default) */
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --accent-color: #14b8a6;
    --border-color: #e2e8f0;
}

[data-theme="dark"] {
    /* Dark theme */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent-color: #14b8a6;
    --border-color: #334155;
}
```

### JavaScript Implementation

```javascript
// 1. Select toggle button
const themeToggle = document.getElementById('theme-toggle');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

// 2. Get initial theme (localStorage or system preference)
function getInitialTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// 3. Apply theme to document
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
}

// 4. Update toggle button icon
function updateToggleIcon(theme) {
    if (theme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline';
    } else {
        lightIcon.style.display = 'inline';
        darkIcon.style.display = 'none';
    }
}

// 5. Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// 6. Initialize
const initialTheme = getInitialTheme();
setTheme(initialTheme);

// 7. Event listener
themeToggle.addEventListener('click', toggleTheme);

// 8. Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});
```

---

## 🎨 CSS Styling

```css
/* Base styles using CSS variables */
body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

/* Theme toggle button */
.theme-toggle {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.theme-icon {
    transition: opacity 0.3s ease;
}

.theme-icon.light-icon { opacity: 1; }
.theme-icon.dark-icon { opacity: 0; }

[data-theme="dark"] .theme-icon.light-icon { opacity: 0; }
[data-theme="dark"] .theme-icon.dark-icon { opacity: 1; }
```

---

## 🐛 Hints

### CSS Variable Usage
```css
/* Define once, use everywhere */
.card {
    background: var(--bg-secondary);
    color: var(--text-primary);
}
```

### System Preference Detection
```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
// Returns: true (dark) or false (light)
```

### localStorage Tips
```javascript
// Always use same key
localStorage.setItem('theme', 'dark')
localStorage.getItem('theme')  // 'dark'

// Handle null case
localStorage.getItem('theme') ?? 'light'
```

---

## ✅ Success Criteria

- [ ] Theme toggle button visible
- [ ] Toggle switches between dark/light
- [ ] Theme persists after refresh (localStorage)
- [ ] System preference detected on first visit
- [ ] Smooth transition animation
- [ ] Button icon updates correctly

---

**← [ Quay lại Session 3](../README.md) | Kết thúc Session 3 →**