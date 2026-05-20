# Solution 2.4 — Customize Bootstrap Theme

## Complete Teal/Green Theme Customization

### theme-customized.html

```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Theme | Your Name</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">

    <!-- Custom Theme CSS -->
    <link rel="stylesheet" href="css/custom-theme.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold custom-brand" href="#">YourName</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link custom-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link custom-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link custom-link active" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link custom-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section text-white py-5">
        <div class="container py-5">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-3 fw-bold mb-4">
                        Building Digital
                        <span class="text-accent">Experiences</span>
                    </h1>
                    <p class="lead mb-4 opacity-75">
                        Full-Stack Developer specializing in modern web technologies.
                        Creating beautiful, functional, and user-centered applications.
                    </p>
                    <div class="d-flex gap-3">
                        <a href="#portfolio" class="btn btn-accent btn-lg px-4">
                            View My Work
                        </a>
                        <a href="#contact" class="btn btn-outline-light btn-lg px-4">
                            Get In Touch
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 text-center mt-5 mt-lg-0">
                    <div class="hero-illustration">
                        <svg width="300" height="300" viewBox="0 0 300 300">
                            <circle cx="150" cy="150" r="120" fill="rgba(255,255,255,0.1)"/>
                            <circle cx="150" cy="150" r="80" fill="rgba(255,255,255,0.15)"/>
                            <circle cx="150" cy="150" r="40" fill="rgba(255,255,255,0.2)"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
        <div class="container py-5">
            <h2 class="display-5 fw-bold text-center mb-5 section-title">
                Why Work With Me?
            </h2>
            <div class="row g-4">
                <!-- Feature 1 -->
                <div class="col-md-4">
                    <div class="card feature-card h-100 border-0 shadow-sm p-4 text-center">
                        <div class="feature-icon mx-auto mb-4">
                            <i class="bi bi-lightning-charge fs-1"></i>
                        </div>
                        <h4 class="fw-bold mb-3">Fast Development</h4>
                        <p class="text-muted mb-0">
                            Rapid prototyping and development with modern tools and frameworks.
                            I ship quality code quickly.
                        </p>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="col-md-4">
                    <div class="card feature-card h-100 border-0 shadow-sm p-4 text-center">
                        <div class="feature-icon mx-auto mb-4">
                            <i class="bi bi-shield-check fs-1"></i>
                        </div>
                        <h4 class="fw-bold mb-3">Clean Code</h4>
                        <p class="text-muted mb-0">
                            Maintainable, well-documented code following best practices.
                            Future-proof solutions that scale.
                        </p>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="col-md-4">
                    <div class="card feature-card h-100 border-0 shadow-sm p-4 text-center">
                        <div class="feature-icon mx-auto mb-4">
                            <i class="bi bi-heart fs-1"></i>
                        </div>
                        <h4 class="fw-bold mb-3">User-Focused</h4>
                        <p class="text-muted mb-0">
                            Beautiful interfaces with intuitive interactions.
                            Design that delights users and drives results.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Preview -->
    <section id="portfolio" class="py-5 bg-light">
        <div class="container py-5">
            <h2 class="display-5 fw-bold text-center mb-5 section-title">
                Recent Projects
            </h2>
            <div class="row g-4">
                <div class="col-md-6 col-lg-4">
                    <div class="card portfolio-card border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x250/14b8a6/ffffff?text=E-Commerce"
                             class="card-img-top" alt="Project">
                        <div class="card-body">
                            <span class="badge bg-accent mb-2">React</span>
                            <h5 class="card-title fw-bold">E-Commerce Platform</h5>
                            <p class="text-muted small">Full-stack marketplace with payment integration</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card portfolio-card border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x250/0d9488/ffffff?text=Dashboard"
                             class="card-img-top" alt="Project">
                        <div class="card-body">
                            <span class="badge bg-accent mb-2">Vue.js</span>
                            <h5 class="card-title fw-bold">Analytics Dashboard</h5>
                            <p class="text-muted small">Real-time data visualization platform</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card portfolio-card border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x250/0f766e/ffffff?text=Mobile"
                             class="card-img-top" alt="Project">
                        <div class="card-body">
                            <span class="badge bg-accent mb-2">React Native</span>
                            <h5 class="card-title fw-bold">Fitness App</h5>
                            <p class="text-muted small">Cross-platform mobile application</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-5">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <h2 class="display-5 fw-bold text-center mb-4 section-title">
                        Let's Work Together
                    </h2>
                    <p class="text-center text-muted mb-5">
                        Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
                    </p>
                    <form class="contact-form">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="name" class="form-label">Your Name</label>
                                <input type="text" class="form-control form-control-lg" id="name" placeholder="John Doe">
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" class="form-control form-control-lg" id="email" placeholder="john@example.com">
                            </div>
                            <div class="col-12">
                                <label for="subject" class="form-label">Subject</label>
                                <input type="text" class="form-control form-control-lg" id="subject" placeholder="Project Inquiry">
                            </div>
                            <div class="col-12">
                                <label for="message" class="form-label">Message</label>
                                <textarea class="form-control" id="message" rows="5" placeholder="Tell me about your project..."></textarea>
                            </div>
                            <div class="col-12 text-center">
                                <button type="submit" class="btn btn-accent btn-lg px-5">
                                    <i class="bi bi-send me-2"></i>Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-dark text-white py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    <span class="footer-brand">YourName</span>
                    <span class="text-white-50 ms-2">&copy; 2026</span>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <div class="d-flex justify-content-center justify-content-md-end gap-3">
                        <a href="#" class="social-link"><i class="bi bi-github"></i></a>
                        <a href="#" class="social-link"><i class="bi bi-linkedin"></i></a>
                        <a href="#" class="social-link"><i class="bi bi-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### css/custom-theme.css

```css
/* ===================================
   CUSTOM BOOTSTRAP THEME
   Teal/Green Color Scheme
   =================================== */

/* === Color Palette === */
:root {
    /* Primary: Teal */
    --bs-primary: #14b8a6;
    --bs-primary-rgb: 20, 184, 166;
    --bs-primary-hover: #0d9488;
    --bs-primary-subtle: #ccfbf1;

    /* Secondary: Slate */
    --bs-secondary: #64748b;
    --bs-secondary-rgb: 100, 116, 139;

    /* Accent (darker teal for emphasis) */
    --bs-accent: #0d9488;
    --bs-accent-rgb: 13, 148, 136;

    /* Success */
    --bs-success: #22c55e;
    --bs-success-rgb: 34, 197, 94;

    /* Warning */
    --bs-warning: #f59e0b;
    --bs-warning-rgb: 245, 158, 11;

    /* Danger */
    --bs-danger: #ef4444;
    --bs-danger-rgb: 239, 68, 68;

    /* Light/Neutral */
    --bs-light: #f8fafc;
    --bs-light-rgb: 248, 250, 252;

    /* Dark */
    --bs-dark: #0f172a;
    --bs-dark-rgb: 15, 23, 42;

    /* Typography */
    --bs-body-font-family: 'Inter', system-ui, -apple-system, sans-serif;
    --bs-body-font-size: 1rem;
    --bs-body-line-height: 1.6;

    /* Border Radius - More rounded */
    --bs-border-radius: 0.5rem;
    --bs-border-radius-sm: 0.375rem;
    --bs-border-radius-lg: 1rem;
    --bs-border-radius-xl: 1.5rem;
    --bs-border-radius-pill: 9999px;

    /* Shadows */
    --bs-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    --bs-box-shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.05);
    --bs-box-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);
}

/* === Typography === */
body {
    font-family: var(--bs-body-font-family);
    color: #334155;
    background-color: #ffffff;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #0f172a;
}

/* === Primary Color Overrides === */
.btn-primary,
.btn-primary:focus {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    color: white;
    border-radius: var(--bs-border-radius);
    font-weight: 600;
    padding: 0.625rem 1.5rem;
}

.btn-primary:hover,
.btn-primary:active {
    background-color: var(--bs-primary-hover);
    border-color: var(--bs-primary-hover);
}

.btn-outline-primary {
    border-color: var(--bs-primary);
    color: var(--bs-primary);
    border-radius: var(--bs-border-radius);
}

.btn-outline-primary:hover {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    color: white;
}

/* Accent Button */
.btn-accent {
    background-color: var(--bs-accent);
    border-color: var(--bs-accent);
    color: white;
    border-radius: var(--bs-border-radius);
    font-weight: 600;
}

.btn-accent:hover {
    background-color: #0f766e;
    border-color: #0f766e;
    color: white;
}

/* === Navbar Customization === */
.navbar {
    padding: 1rem 0;
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--bs-primary) !important;
}

.custom-link {
    font-weight: 500;
    color: #334155;
    transition: color 0.2s ease;
}

.custom-link:hover,
.custom-link.active {
    color: var(--bs-primary);
}

/* === Cards === */
.card {
    border: none;
    border-radius: var(--bs-border-radius-lg);
    box-shadow: var(--bs-box-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--bs-box-shadow-lg);
}

.feature-card {
    border-radius: var(--bs-border-radius-xl);
}

.feature-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bs-primary-subtle);
    border-radius: 50%;
    color: var(--bs-primary);
}

/* === Portfolio Cards === */
.portfolio-card img {
    transition: transform 0.4s ease;
}

.portfolio-card:hover img {
    transform: scale(1.05);
}

/* === Hero Section === */
.hero-section {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.hero-section .text-accent {
    color: var(--bs-primary);
}

/* === Form Controls === */
.form-control,
.form-select {
    border-radius: var(--bs-border-radius);
    border: 2px solid #e2e8f0;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus,
.form-select:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15);
}

.form-control-lg {
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
}

/* === Badges === */
.badge.bg-primary {
    background-color: var(--bs-primary) !important;
}

.badge.bg-accent {
    background-color: var(--bs-accent) !important;
}

/* === Footer === */
.footer {
    background: var(--bs-dark);
}

.footer-brand {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--bs-primary);
}

.social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--bs-primary);
    transform: translateY(-3px);
    color: white;
}

/* === Section Title === */
.section-title {
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--bs-primary);
    border-radius: 2px;
}

/* === Custom Brand === */
.custom-brand {
    color: var(--bs-primary) !important;
}

/* === Responsive Adjustments === */
@media (max-width: 768px) {
    .hero-section {
        min-height: auto;
        padding-top: 3rem;
        padding-bottom: 3rem;
    }

    .display-3 {
        font-size: 2.5rem;
    }

    .feature-icon {
        width: 60px;
        height: 60px;
    }
}
```

---

## Commit Message Examples

```bash
git commit -m "[CUSTOMIZE] Override Bootstrap primary colors

- Change primary from indigo to teal (#14b8a6)
- Add accent color for emphasis (#0d9488)
- Define CSS custom properties for theme
- Update RGB values for color functions"

git commit -m "[STYLE] Customize typography and spacing

- Import and apply Inter font family
- Increase border-radius for rounder components
- Adjust body line-height to 1.6
- Add custom shadow variables"

git commit -m "[POLISH] Apply theme to components

- Style buttons with new colors and radius
- Customize navbar with teal brand color
- Add hover effects on cards
- Create feature icon circles with subtle bg"

git commit -m "[REFACTOR] Finalize custom theme

- Document color palette in CSS comments
- Adjust responsive breakpoints
- Ensure focus states use theme colors
- Apply consistent styling across all components"
```

---

## Key Learning Points

### 1. CSS Variable Override Pattern
```css
:root {
    --bs-primary: #14b8a6;  /* Override Bootstrap default */
    --bs-primary-rgb: 20, 184, 166;  /* Required for rgba() functions */
    --bs-primary-hover: #0d9488;
}
```

### 2. Border Radius Customization
```css
:root {
    --bs-border-radius: 0.5rem;      /* Default */
    --bs-border-radius-sm: 0.375rem; /* Small elements */
    --bs-border-radius-lg: 1rem;     /* Cards */
    --bs-border-radius-xl: 1.5rem;   /* Large components */
}
```

### 3. Focus Ring with Theme Color
```css
.form-control:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15); /* Using RGB values */
}
```

### 4. Google Fonts Integration
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 5. Teal Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Teal 500 | `#14b8a6` | Primary buttons, links |
| Teal 600 | `#0d9488` | Primary hover, accent |
| Teal 100 | `#ccfbf1` | Light backgrounds, subtle fills |
| Teal 900 | `#0f766e` | Dark accent, footer brand |

---

**← [ Quay lại Exercise 2.4](../exercises/04_theme_customize.md)**