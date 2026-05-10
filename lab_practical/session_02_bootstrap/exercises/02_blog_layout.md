# Exercise 2.2 — Blog Layout + Sidebar

## 🎬 Opening Scenario

*Portfolio cần có Blog section với sidebar hiển thị categories, recent posts, và tags. Designer muốn sticky sidebar trên desktop.*

---

## 📋 Requirements

### 1. Blog Layout Structure

```html
<section id="blog" class="py-5">
    <div class="container">
        <div class="row">
            <!-- Main Content (8 columns) -->
            <div class="col-lg-8">
                <!-- Blog Post Card 1 -->
                <article class="card mb-4">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <span class="badge bg-primary">Technology</span>
                        <h3 class="card-title mt-2">Building a Portfolio</h3>
                        <p class="card-text text-muted">
                            <small>By Author • Jan 15, 2026 • 5 min read</small>
                        </p>
                        <p class="card-text">Description text here...</p>
                        <a href="#" class="btn btn-outline-primary">Read More</a>
                    </div>
                </article>
                <!-- Add 2 more blog posts -->
            </div>

            <!-- Sidebar (4 columns) -->
            <div class="col-lg-4">
                <!-- Sticky sidebar -->
                <div class="sticky-top pt-4">
                    <!-- Search -->
                    <!-- Categories -->
                    <!-- Recent Posts -->
                    <!-- Tags -->
                </div>
            </div>
        </div>
    </div>
</section>
```

### 2. Sidebar Components

**Search Widget:**
```html
<div class="card mb-4">
    <div class="card-body">
        <h5 class="card-title">Search</h5>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search...">
            <button class="btn btn-primary" type="button">Go</button>
        </div>
    </div>
</div>
```

**Categories Widget:**
```html
<div class="card mb-4">
    <div class="card-header bg-white">
        <h5 class="mb-0">Categories</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center">
            Technology
            <span class="badge bg-primary rounded-pill">12</span>
        </li>
        <!-- More categories -->
    </ul>
</div>
```

**Recent Posts Widget:**
```html
<div class="card mb-4">
    <div class="card-header bg-white">
        <h5 class="mb-0">Recent Posts</h5>
    </div>
    <div class="card-body">
        <div class="d-flex mb-3">
            <img src="..." class="rounded" width="60" height="60" alt="...">
            <div class="ms-3">
                <h6 class="mb-1">Post Title</h6>
                <small class="text-muted">Jan 15, 2026</small>
            </div>
        </div>
    </div>
</div>
```

**Tags Cloud:**
```html
<div class="card mb-4">
    <div class="card-header bg-white">
        <h5 class="mb-0">Tags</h5>
    </div>
    <div class="card-body">
        <div class="d-flex flex-wrap gap-2">
            <span class="badge bg-secondary">HTML</span>
            <span class="badge bg-secondary">CSS</span>
            <span class="badge bg-secondary">JavaScript</span>
            <!-- More tags -->
        </div>
    </div>
</div>
```

---

## 🎨 Design Specs

### Sticky Sidebar
```css
.sticky-top {
    position: sticky;
    top: 100px; /* Below sticky header */
    z-index: 1;
}
```

### Card Styling
```css
.card {
    border: none;
    box-shadow: 0 2px 15px rgba(0,0,0,0.08);
    border-radius: 12px;
}
```

---

## ✅ Success Criteria

- [ ] 2-column layout (blog posts + sidebar)
- [ ] Sidebar sticky on desktop
- [ ] 3 blog post cards displayed
- [ ] 4 sidebar widgets (search, categories, recent, tags)
- [ ] Responsive (sidebar below posts on mobile)

---

**← [ Quay lại Session 2](../README.md)**