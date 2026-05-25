# Solution 2.2 — Blog Layout + Sidebar

## Complete Blog Page with Sticky Sidebar

### blog.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | Your Name</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/blog.css">
</head>
<body>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold text-primary" href="index.html">YourName</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link active" href="blog.html">Blog</a></li>
                    <li class="nav-item"><a class="nav-link" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <header class="blog-header bg-primary text-white py-5">
        <div class="container text-center">
            <h1 class="display-4 fw-bold mb-3">Blog</h1>
            <p class="lead opacity-75">Thoughts, tutorials, and insights on web development</p>
        </div>
    </header>

    <!-- Blog Content -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <!-- Main Content (8 columns) -->
                <div class="col-lg-8">
                    <!-- Blog Post 1 -->
                    <article class="card mb-4 border-0 shadow-sm">
                        <img src="https://via.placeholder.com/800x400/6366f1/ffffff?text=Modern+CSS"
                             class="card-img-top rounded-top" alt="Blog post image">
                        <div class="card-body p-4">
                            <div class="d-flex gap-2 mb-3">
                                <span class="badge bg-primary">CSS</span>
                                <span class="badge bg-secondary">Tutorial</span>
                            </div>
                            <h2 class="card-title fw-bold mb-3">
                                <a href="#" class="text-decoration-none text-dark hover-primary">
                                    Modern CSS Techniques You Should Know in 2026
                                </a>
                            </h2>
                            <p class="text-muted mb-3">
                                <small>
                                    <i class="bi bi-person me-1"></i> Your Name
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-calendar me-1"></i> Jan 15, 2026
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-clock me-1"></i> 5 min read
                                </small>
                            </p>
                            <p class="card-text text-secondary">
                                CSS has evolved significantly over the years. In this article, we explore Container Queries,
                                Cascade Layers, and the :has() selector that are transforming how we write stylesheets...
                            </p>
                            <a href="#" class="btn btn-outline-primary">Read More</a>
                        </div>
                    </article>

                    <!-- Blog Post 2 -->
                    <article class="card mb-4 border-0 shadow-sm">
                        <img src="https://via.placeholder.com/800x400/8b5cf6/ffffff?text=React+18"
                             class="card-img-top rounded-top" alt="Blog post image">
                        <div class="card-body p-4">
                            <div class="d-flex gap-2 mb-3">
                                <span class="badge bg-primary">React</span>
                                <span class="badge bg-success">News</span>
                            </div>
                            <h2 class="card-title fw-bold mb-3">
                                <a href="#" class="text-decoration-none text-dark hover-primary">
                                    What's New in React 19: A Deep Dive
                                </a>
                            </h2>
                            <p class="text-muted mb-3">
                                <small>
                                    <i class="bi bi-person me-1"></i> Your Name
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-calendar me-1"></i> Jan 10, 2026
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-clock me-1"></i> 8 min read
                                </small>
                            </p>
                            <p class="card-text text-secondary">
                                React 19 brings exciting new features including Actions, use() hook, and improved server components.
                                Let's explore how these changes can improve your application architecture...
                            </p>
                            <a href="#" class="btn btn-outline-primary">Read More</a>
                        </div>
                    </article>

                    <!-- Blog Post 3 -->
                    <article class="card mb-4 border-0 shadow-sm">
                        <img src="https://via.placeholder.com/800x400/14b8a6/ffffff?text=TypeScript"
                             class="card-img-top rounded-top" alt="Blog post image">
                        <div class="card-body p-4">
                            <div class="d-flex gap-2 mb-3">
                                <span class="badge bg-primary">TypeScript</span>
                                <span class="badge bg-warning text-dark">Guide</span>
                            </div>
                            <h2 class="card-title fw-bold mb-3">
                                <a href="#" class="text-decoration-none text-dark hover-primary">
                                    TypeScript Patterns for Clean Code Architecture
                                </a>
                            </h2>
                            <p class="text-muted mb-3">
                                <small>
                                    <i class="bi bi-person me-1"></i> Your Name
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-calendar me-1"></i> Jan 5, 2026
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-clock me-1"></i> 6 min read
                                </small>
                            </p>
                            <p class="card-text text-secondary">
                                TypeScript's type system is powerful. Learn how to use discriminated unions, template literal types,
                                and conditional types to build robust, maintainable applications...
                            </p>
                            <a href="#" class="btn btn-outline-primary">Read More</a>
                        </div>
                    </article>

                    <!-- Pagination -->
                    <nav class="d-flex justify-content-center mt-4">
                        <ul class="pagination">
                            <li class="page-item disabled">
                                <a class="page-link" href="#">Previous</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <!-- Sidebar (4 columns) -->
                <div class="col-lg-4">
                    <div class="sticky-top pt-4">
                        <!-- Search Widget -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h5 class="fw-bold mb-3">
                                    <i class="bi bi-search me-2"></i>Search
                                </h5>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search...">
                                    <button class="btn btn-primary" type="button">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Categories Widget -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-header bg-white py-3">
                                <h5 class="fw-bold mb-0">
                                    <i class="bi bi-folder me-2"></i>Categories
                                </h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center px-4">
                                    <a href="#" class="text-decoration-none text-secondary">Technology</a>
                                    <span class="badge bg-primary rounded-pill">12</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-4">
                                    <a href="#" class="text-decoration-none text-secondary">Web Development</a>
                                    <span class="badge bg-primary rounded-pill">8</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-4">
                                    <a href="#" class="text-decoration-none text-secondary">Design</a>
                                    <span class="badge bg-primary rounded-pill">5</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-4">
                                    <a href="#" class="text-decoration-none text-secondary">Tutorial</a>
                                    <span class="badge bg-primary rounded-pill">15</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-4">
                                    <a href="#" class="text-decoration-none text-secondary">Career</a>
                                    <span class="badge bg-primary rounded-pill">3</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Recent Posts Widget -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-header bg-white py-3">
                                <h5 class="fw-bold mb-0">
                                    <i class="bi bi-clock-history me-2"></i>Recent Posts
                                </h5>
                            </div>
                            <div class="card-body p-4">
                                <div class="d-flex mb-3">
                                    <img src="https://via.placeholder.com/60/6366f1/ffffff?text=1"
                                         class="rounded me-3" alt="Recent post">
                                    <div>
                                        <h6 class="mb-1"><a href="#" class="text-decoration-none text-dark">Modern CSS Techniques</a></h6>
                                        <small class="text-muted">Jan 15, 2026</small>
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <img src="https://via.placeholder.com/60/8b5cf6/ffffff?text=2"
                                         class="rounded me-3" alt="Recent post">
                                    <div>
                                        <h6 class="mb-1"><a href="#" class="text-decoration-none text-dark">React 19 Deep Dive</a></h6>
                                        <small class="text-muted">Jan 10, 2026</small>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <img src="https://via.placeholder.com/60/14b8a6/ffffff?text=3"
                                         class="rounded me-3" alt="Recent post">
                                    <div>
                                        <h6 class="mb-1"><a href="#" class="text-decoration-none text-dark">TypeScript Patterns</a></h6>
                                        <small class="text-muted">Jan 5, 2026</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tags Widget -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-header bg-white py-3">
                                <h5 class="fw-bold mb-0">
                                    <i class="bi bi-tags me-2"></i>Tags
                                </h5>
                            </div>
                            <div class="card-body p-4">
                                <div class="d-flex flex-wrap gap-2">
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">HTML</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">CSS</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">JavaScript</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">React</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">TypeScript</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">Node.js</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">Bootstrap</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">Python</a>
                                    <a href="#" class="badge bg-secondary text-decoration-none hover-primary">Database</a>
                                </div>
                            </div>
                        </div>

                        <!-- Newsletter Widget -->
                        <div class="card bg-primary text-white border-0 shadow-sm">
                            <div class="card-body p-4 text-center">
                                <h5 class="fw-bold mb-3">Subscribe to Newsletter</h5>
                                <p class="small opacity-75 mb-3">Get the latest articles delivered straight to your inbox.</p>
                                <div class="input-group mb-3">
                                    <input type="email" class="form-control" placeholder="Your email">
                                </div>
                                <button class="btn btn-light w-100">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container text-center">
            <p class="mb-0 text-white-50">&copy; 2026 YourName. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### css/blog.css

```css
/* Blog Header */
.blog-header {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

/* Card Styling */
.card {
    border: none;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.card-img-top {
    transition: transform 0.4s ease;
}

.card:hover .card-img-top {
    transform: scale(1.03);
}

/* Article Title Hover */
.hover-primary:hover {
    color: #6366f1 !important;
}

/* Sticky Sidebar */
.sticky-top {
    position: sticky;
    top: 100px;
    z-index: 1;
}

/* Tags */
.badge.bg-secondary {
    background-color: #e2e8f0 !important;
    color: #334155;
    transition: all 0.3s ease;
}

.badge.bg-secondary:hover {
    background-color: #6366f1 !important;
    color: white;
}

/* List Group Items */
.list-group-item {
    border: none;
    padding: 0.75rem 1.5rem;
}

.list-group-item a {
    transition: color 0.2s ease;
}

.list-group-item a:hover {
    color: #6366f1;
}

/* Pagination */
.pagination .page-link {
    color: #6366f1;
    border: none;
    padding: 0.5rem 1rem;
}

.pagination .page-item.active .page-link {
    background-color: #6366f1;
    color: white;
}

.pagination .page-link:hover {
    background-color: #f1f5f9;
}

/* Newsletter Card Gradient */
.card.bg-primary {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
}

/* Responsive adjustments */
@media (max-width: 991px) {
    .sticky-top {
        position: static;
        top: 0;
    }
}
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create blog page layout

- Build 2-column layout: posts (8 cols) + sidebar (4 cols)
- Add blog post cards with images and metadata
- Implement Bootstrap grid structure"

git commit -m "[FEATURE] Add sidebar widgets

- Create search widget with input group
- Build categories widget with list-group
- Add recent posts widget with thumbnails
- Include tags cloud and newsletter signup"

git commit -m "[STYLE] Style sticky sidebar

- Implement position: sticky with top offset
- Add hover effects on category links
- Style badge pills and tag clouds
- Add card shadows and rounded corners"

git commit -m "[POLISH] Add blog post hover effects

- Implement image zoom on card hover
- Add color transition on title hover
- Refine pagination styling
- Ensure mobile responsive layout"
```

---

## Key Learning Points

### 1. Sticky Sidebar Pattern
```css
.sticky-top {
    position: sticky;
    top: 100px; /* Below sticky header */
    z-index: 1;
}
```

### 2. Blog Grid Layout
```html
<div class="row">
    <div class="col-lg-8">Main content (blog posts)</div>
    <div class="col-lg-4">
        <div class="sticky-top pt-4">Sidebar</div>
    </div>
</div>
```

### 3. Card Hover Effect
```css
.card:hover .card-img-top {
    transform: scale(1.03); /* Gentle zoom */
}
```

### 4. Badge Link Hover
```css
.badge.bg-secondary:hover {
    background-color: var(--bs-primary) !important;
    color: white;
}
```

---

**← [ Quay lại Exercise 2.2](../exercises/02_blog_layout.md)**