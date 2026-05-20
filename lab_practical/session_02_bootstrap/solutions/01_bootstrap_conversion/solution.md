# Solution 2.1 — Bootstrap Conversion

## Complete Bootstrap 5 Conversion

### index.html (converted)

```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio | Your Name</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold text-primary" href="#">YourName</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#skills">Skills</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#portfolio">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section vh-100 d-flex align-items-center justify-content-center text-center position-relative overflow-hidden">
        <div class="container position-relative z-1">
            <h1 class="display-1 fw-bold text-white mb-3">
                Hi, I'm <span class="text-warning">Your Name</span>
            </h1>
            <p class="lead text-white opacity-75 mb-5">
                Full-Stack Developer | UI Designer | Problem Solver
            </p>
            <a href="#portfolio" class="btn btn-light btn-lg px-4 fw-semibold shadow-lg">
                View My Work
            </a>
        </div>

        <!-- Gradient Background -->
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary"></div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-5">
        <div class="container py-5">
            <div class="row align-items-center g-5">
                <div class="col-lg-5 text-center">
                    <img src="https://via.placeholder.com/400x400/6366f1/ffffff?text=Your+Photo"
                         alt="Your Photo"
                         class="img-fluid rounded-circle p-2 border border-4 border-primary shadow">
                </div>
                <div class="col-lg-7">
                    <h2 class="display-6 fw-bold mb-4">About Me</h2>
                    <p class="lead text-muted mb-4">
                        I'm a passionate developer with 3+ years of experience building web applications that make a difference.
                    </p>
                    <p class="text-secondary">
                        Specialized in Frontend development with React and Vue. Also experienced in Backend with Node.js and Python.
                        I believe in clean code, user-centered design, and continuous learning.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-5 bg-light">
        <div class="container py-5">
            <h2 class="display-6 fw-bold text-center mb-5">My Skills</h2>

            <div class="row g-4" style="max-width: 800px; margin: 0 auto;">
                <!-- Skill 1 -->
                <div class="col-12">
                    <div class="skill-item p-3 bg-white rounded-3 shadow-sm">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="fw-semibold">HTML5</span>
                            <span class="text-primary fw-bold">95%</span>
                        </div>
                        <div class="progress" style="height: 12px;">
                            <div class="progress-bar" role="progressbar" style="width: 95%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Skill 2 -->
                <div class="col-12">
                    <div class="skill-item p-3 bg-white rounded-3 shadow-sm">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="fw-semibold">CSS3</span>
                            <span class="text-primary fw-bold">90%</span>
                        </div>
                        <div class="progress" style="height: 12px;">
                            <div class="progress-bar" role="progressbar" style="width: 90%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Skill 3 -->
                <div class="col-12">
                    <div class="skill-item p-3 bg-white rounded-3 shadow-sm">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="fw-semibold">JavaScript</span>
                            <span class="text-primary fw-bold">85%</span>
                        </div>
                        <div class="progress" style="height: 12px;">
                            <div class="progress-bar" role="progressbar" style="width: 85%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Skill 4 -->
                <div class="col-12">
                    <div class="skill-item p-3 bg-white rounded-3 shadow-sm">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="fw-semibold">React</span>
                            <span class="text-primary fw-bold">80%</span>
                        </div>
                        <div class="progress" style="height: 12px;">
                            <div class="progress-bar" role="progressbar" style="width: 80%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="py-5">
        <div class="container py-5">
            <h2 class="display-6 fw-bold text-center mb-5">My Portfolio</h2>

            <!-- Filter Buttons -->
            <div class="d-flex justify-content-center flex-wrap gap-2 mb-5">
                <button class="btn btn-outline-primary active" data-filter="all">All</button>
                <button class="btn btn-outline-primary" data-filter="web">Web</button>
                <button class="btn btn-outline-primary" data-filter="mobile">Mobile</button>
                <button class="btn btn-outline-primary" data-filter="design">Design</button>
            </div>

            <!-- Portfolio Grid -->
            <div class="row g-4">
                <!-- Item 1 - Web -->
                <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="web">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/6366f1/ffffff?text=E-Commerce"
                             class="card-img-top" alt="E-Commerce Website">
                        <div class="card-body">
                            <h5 class="card-title">E-Commerce Website</h5>
                            <p class="card-text text-muted">React + Node.js</p>
                        </div>
                    </div>
                </div>

                <!-- Item 2 - Mobile -->
                <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="mobile">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Health+App"
                             class="card-img-top" alt="Health Tracker App">
                        <div class="card-body">
                            <h5 class="card-title">Health Tracker App</h5>
                            <p class="card-text text-muted">React Native</p>
                        </div>
                    </div>
                </div>

                <!-- Item 3 - Web -->
                <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="web">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/14b8a6/ffffff?text=Dashboard"
                             class="card-img-top" alt="Dashboard Admin">
                        <div class="card-body">
                            <h5 class="card-title">Dashboard Admin</h5>
                            <p class="card-text text-muted">Vue.js + Chart.js</p>
                        </div>
                    </div>
                </div>

                <!-- Item 4 - Design -->
                <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="design">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/f59e0b/ffffff?text=Portfolio"
                             class="card-img-top" alt="Portfolio Design">
                        <div class="card-body">
                            <h5 class="card-title">Portfolio Design</h5>
                            <p class="card-text text-muted">Figma + CSS</p>
                        </div>
                    </div>
                </div>

                <!-- Item 5 - Mobile -->
                <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="mobile">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/ec4899/ffffff?text=Social+App"
                             class="card-img-top" alt="Social App">
                        <div class="card-body">
                            <h5 class="card-title">Social Media App</h5>
                            <p class="card-text text-muted">Flutter + Firebase</p>
                        </div>
                    </div>
                </div>

                <!-- Item 6 - Design -->
                <div class="col-12 col-md-6 col-lg-4 portfolio-item" data-category="design">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Brand+Identity"
                             class="card-img-top" alt="Brand Identity">
                        <div class="card-body">
                            <h5 class="card-title">Brand Identity</h5>
                            <p class="card-text text-muted">Branding + Logo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-5 bg-light">
        <div class="container py-5">
            <h2 class="display-6 fw-bold text-center mb-5">Get In Touch</h2>

            <div class="row g-5">
                <!-- Contact Info -->
                <div class="col-lg-5">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <h4 class="mb-4">Contact Information</h4>
                            <p class="text-muted mb-4">Feel free to reach out. I'm always open to discussing new projects.</p>

                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                                    <i class="bi bi-envelope text-primary fs-5"></i>
                                </div>
                                <span>your.email@example.com</span>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                                    <i class="bi bi-geo-alt text-primary fs-5"></i>
                                </div>
                                <span>Hanoi, Vietnam</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="col-lg-7">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <form id="contactForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="name" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="name" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" required>
                                    </div>
                                    <div class="col-12">
                                        <label for="subject" class="form-label">Subject</label>
                                        <input type="text" class="form-control" id="subject" required>
                                    </div>
                                    <div class="col-12">
                                        <label for="message" class="form-label">Message</label>
                                        <textarea class="form-control" id="message" rows="5" required></textarea>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary w-100">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row g-4 mb-4">
                <div class="col-lg-4">
                    <h4 class="fw-bold mb-3">YourName</h4>
                    <p class="text-white-50">Building digital experiences that make a difference.</p>
                </div>
                <div class="col-lg-4">
                    <h5 class="mb-3">Quick Links</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="#about" class="text-white-50 text-decoration-none">About</a></li>
                        <li class="mb-2"><a href="#skills" class="text-white-50 text-decoration-none">Skills</a></li>
                        <li class="mb-2"><a href="#portfolio" class="text-white-50 text-decoration-none">Portfolio</a></li>
                        <li class="mb-2"><a href="#contact" class="text-white-50 text-decoration-none">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h5 class="mb-3">Connect</h5>
                    <div class="d-flex gap-3">
                        <a href="#" class="text-white-50 fs-5"><i class="bi bi-github"></i></a>
                        <a href="#" class="text-white-50 fs-5"><i class="bi bi-linkedin"></i></a>
                        <a href="#" class="text-white-50 fs-5"><i class="bi bi-envelope"></i></a>
                    </div>
                </div>
            </div>
            <hr class="border-secondary">
            <p class="text-center text-white-50 mb-0">&copy; 2026 YourName. All rights reserved.</p>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Custom JS -->
    <script src="js/main.js"></script>
</body>
</html>
```

### css/variables.css (Bootstrap overrides)

```css
/* Override Bootstrap Primary Color */
:root {
    --bs-primary: #6366f1;
    --bs-primary-rgb: 99, 102, 241;
    --bs-primary-hover: #4f46e5;
    --bs-secondary: #8b5cf6;
    --bs-secondary-rgb: 139, 92, 246;

    /* Custom palette */
    --color-dark: #1e293b;
    --color-light: #f8fafc;
    --color-text: #334155;
    --color-text-light: #64748b;
    --color-border: #e2e8f0;
    --color-white: #ffffff;
}

/* Change primary button style */
.btn-primary {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
}

.btn-primary:hover {
    background-color: var(--bs-primary-hover);
    border-color: var(--bs-primary-hover);
}

/* Progress bar gradient */
.progress-bar {
    background: linear-gradient(90deg, var(--bs-primary), var(--bs-secondary));
}
```

### css/style.css

```css
/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-secondary) 100%);
    position: relative;
}

.hero-section .display-1 {
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.bg-gradient-primary {
    background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-secondary) 100%);
    z-index: 0;
}

/* Portfolio Cards */
.portfolio-item .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.portfolio-item .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.portfolio-item img {
    transition: transform 0.4s ease;
}

.portfolio-item .card:hover img {
    transform: scale(1.05);
}

/* Filter Buttons */
.filter-btn.active {
    background-color: var(--bs-primary);
    color: white;
    border-color: var(--bs-primary);
}

/* Form Focus States */
.form-control:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 0.25rem rgba(99, 102, 241, 0.25);
}

/* Social Icons */
.social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--bs-primary);
    transform: translateY(-3px);
}
```

### js/main.js

```javascript
// Portfolio Filter
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
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Message sent successfully!');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});
```

---

## Commit Message Examples

```bash
git commit -m "[SETUP] Add Bootstrap 5 via CDN

- Include Bootstrap CSS and JS via CDN
- Add Bootstrap Icons for UI elements
- Create variables.css for theme overrides"

git commit -m "[FEATURE] Convert navbar to Bootstrap

- Replace CSS-only menu with Bootstrap navbar
- Implement collapse toggle for mobile
- Style navbar with sticky-top and shadow"

git commit -m "[FEATURE] Convert hero to Bootstrap grid

- Use vh-100 and flex utilities for centering
- Apply display typography classes
- Add gradient background overlay"

git commit -m "[STYLE] Apply Bootstrap grid to portfolio

- Convert CSS grid to col-md-6 col-lg-4
- Use Bootstrap cards for portfolio items
- Add hover effects with transform and shadow"

git commit -m "[POLISH] Final Bootstrap conversion

- Adjust spacing with Bootstrap utilities
- Ensure responsive breakpoints work
- Verify all components functional"
```

---

## Key Learning Points

### 1. Bootstrap Grid Conversion
```html
<!-- CSS Grid -->
<div class="portfolio-grid">
    <div class="portfolio-item">...</div>
</div>

<!-- Bootstrap -->
<div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
        <div class="card">...</div>
    </div>
</div>
```

### 2. Navbar Toggle Pattern
```html
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
    <!-- nav items here -->
</div>
```

### 3. Override Bootstrap Variables
```css
:root {
    --bs-primary: #6366f1;  /* Override default indigo */
    --bs-primary-hover: #4f46e5;
}
```

### 4. Using Bootstrap Utilities
```html
<!-- Flexbox -->
<div class="d-flex align-items-center justify-content-center">

<!-- Spacing -->
<div class="py-5 px-4 mt-4 mb-3">

<!-- Text -->
<div class="text-center fw-bold text-primary">
```

---

**← [ Quay lại Exercise 2.1](../exercises/01_bootstrap_conversion.md)**