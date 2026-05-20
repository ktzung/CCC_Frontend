# Solution 1.1 — Header + Hero Section

## Complete HTML + CSS Solution

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio | Your Name</title>
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/hero.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <a href="#" class="logo">YourName</a>

            <!-- Mobile Menu Toggle -->
            <input type="checkbox" id="menu-toggle" class="menu-toggle">
            <label for="menu-toggle" class="menu-icon">
                <span></span>
                <span></span>
                <span></span>
            </label>

            <!-- Navigation -->
            <nav class="nav">
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1 class="hero-title">
                Hi, I'm <span class="accent">Your Name</span>
            </h1>
            <p class="hero-subtitle">
                Full-Stack Developer | UI Designer | Problem Solver
            </p>
            <a href="#portfolio" class="cta-button">View My Work</a>
        </div>
    </section>

    <!-- Placeholder sections for other parts -->
    <section id="about"></section>
    <section id="skills"></section>
    <section id="portfolio"></section>
    <section id="contact"></section>
</body>
</html>
```

### css/variables.css

```css
:root {
    /* Colors */
    --color-primary: #6366f1;
    --color-primary-dark: #4f46e5;
    --color-secondary: #8b5cf6;
    --color-dark: #1e293b;
    --color-light: #f8fafc;
    --color-text: #334155;
    --color-text-light: #64748b;
    --color-border: #e2e8f0;
    --color-white: #ffffff;

    /* Typography */
    --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    /* Spacing */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 3rem;
    --space-2xl: 4rem;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
}
```

### css/base.css

```css
/* Reset */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text);
    background-color: var(--color-white);
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
}
```

### css/header.css

```css
/* Header */
.header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--color-white);
    box-shadow: var(--shadow-sm);
    padding: var(--space-sm) 0;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Logo */
.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
}

/* Navigation */
.nav {
    display: flex;
    gap: var(--space-lg);
}

.nav a {
    font-weight: 500;
    color: var(--color-text);
    transition: color var(--transition-fast);
    position: relative;
}

.nav a:hover {
    color: var(--color-primary);
}

.nav a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transition: width var(--transition-fast);
}

.nav a:hover::after {
    width: 100%;
}

/* Mobile Menu Toggle */
.menu-toggle {
    display: none;
}

.menu-icon {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 10px;
}

.menu-icon span {
    width: 25px;
    height: 3px;
    background: var(--color-dark);
    border-radius: 2px;
    transition: var(--transition-fast);
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .menu-icon {
        display: flex;
    }

    .nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-white);
        flex-direction: column;
        padding: var(--space-md);
        box-shadow: var(--shadow-lg);
    }

    .menu-toggle:checked ~ .nav {
        display: flex;
    }

    .menu-toggle:checked ~ .menu-icon span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle:checked ~ .menu-icon span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle:checked ~ .menu-icon span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
```

### css/hero.css

```css
/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    color: var(--color-white);
    padding: var(--space-xl);
}

.hero-content {
    max-width: 800px;
}

.hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 700;
    margin-bottom: var(--space-md);
    line-height: 1.2;
}

.hero-title .accent {
    color: #fbbf24; /* Yellow highlight */
}

.hero-subtitle {
    font-size: clamp(1rem, 3vw, 1.25rem);
    font-weight: 300;
    opacity: 0.9;
    margin-bottom: var(--space-xl);
}

/* CTA Button */
.cta-button {
    display: inline-block;
    padding: var(--space-sm) var(--space-lg);
    background: var(--color-white);
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.cta-button:active {
    transform: translateY(-1px);
}
```

---

## Commit Message Examples

```bash
# commit 1
git commit -m "[SETUP] Initialize project structure

- Create folder structure: css/, images/
- Add index.html with semantic structure
- Add CSS files for organization"

# commit 2
git commit -m "[STYLE] Add base CSS variables and reset

- Define color palette: primary, secondary, text
- Add spacing scale: xs, sm, md, lg, xl
- Add typography and border-radius variables"

# commit 3
git commit -m "[FEATURE] Implement header navigation

- Add sticky header with logo
- Style nav links with hover underline effect
- Implement mobile hamburger menu with CSS checkbox hack"

# commit 4
git commit -m "[FEATURE] Complete hero section with CTA

- Add full viewport hero section
- Create gradient background
- Style CTA button with hover animation
- Add responsive font sizing with clamp()"
```

---

## Key Learning Points

### 1. Sticky Header
```css
.header {
    position: sticky;
    top: 0;
    z-index: 1000;
}
```

### 2. Mobile Menu CSS-only
```css
/* Checkbox hack - no JavaScript needed */
.menu-toggle:checked ~ .nav { display: flex; }
```

### 3. Responsive Typography
```css
.hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
    /* Min: 2.5rem, Preferred: 8vw, Max: 4rem */
}
```

### 4. Hover Underline Effect
```css
.nav a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transition: width var(--transition-fast);
}

.nav a:hover::after { width: 100%; }
```

---

**← [ Quay lại Exercise 1.1](../exercises/01_hero_section.md)**