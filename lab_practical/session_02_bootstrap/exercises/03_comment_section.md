# Exercise 2.3 — Comment Section UI

## 🎬 Opening Scenario

*Blog section cần có comment system UI. Designer muốn threaded comments với avatar, timestamp, và reply button.*

---

## 📋 Requirements

### 1. Comment Form

```html
<div class="card mb-4">
    <div class="card-header bg-white">
        <h5 class="mb-0">Leave a Comment</h5>
    </div>
    <div class="card-body">
        <form>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="comment" class="form-label">Comment</label>
                <textarea class="form-control" id="comment" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Post Comment</button>
        </form>
    </div>
</div>
```

### 2. Threaded Comments Display

```html
<div class="comments-section">
    <h5 class="mb-4">3 Comments</h5>

    <!-- Parent Comment -->
    <div class="comment mb-4">
        <div class="d-flex">
            <img src="https://via.placeholder.com/50" class="rounded-circle me-3" alt="Avatar">
            <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">John Doe</h6>
                    <small class="text-muted">2 hours ago</small>
                </div>
                <p class="mb-2">Great article! Very helpful for beginners.</p>
                <button class="btn btn-sm btn-link text-decoration-none">
                    <i class="bi bi-reply"></i> Reply
                </button>

                <!-- Nested Reply -->
                <div class="comment reply ms-5 mt-3">
                    <div class="d-flex">
                        <img src="https://via.placeholder.com/40" class="rounded-circle me-3" alt="Avatar">
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-center">
                                <h6 class="mb-0">Author</h6>
                                <small class="text-muted">1 hour ago</small>
                            </div>
                            <p class="mb-2">Thank you! Glad it helped.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- More comments... -->
</div>
```

---

## 🎨 Design Specs

### Avatar
```css
.comment img.rounded-circle {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.comment.reply img.rounded-circle {
    width: 40px;
    height: 40px;
}
```

### Reply Indentation
```css
.comment.reply {
    border-left: 3px solid #e2e8f0;
    padding-left: 1rem;
}
```

### Comment Action Button
```css
.btn-link {
    color: var(--bs-primary);
    text-decoration: none;
}

.btn-link:hover {
    color: darken(var(--bs-primary), 10%);
}
```

---

## 🐛 Hints

### Bootstrap Icons
```html
<!-- Add in <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">

<!-- Use -->
<i class="bi bi-reply"></i>
```

### Nested Reply Spacing
```css
.comment.reply.ms-5 {
    margin-left: 3rem;
}
```

---

## ✅ Success Criteria

- [ ] Comment form with name, email, message
- [ ] 3 parent comments displayed
- [ ] 1 nested reply shown
- [ ] Avatar images displayed
- [ ] Timestamp formatting
- [ ] Reply buttons UI

---

**← [ Quay lại Session 2](../README.md)**