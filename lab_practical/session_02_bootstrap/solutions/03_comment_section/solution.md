# Solution 2.3 — Comment Section UI

## Complete Comment Section with Threaded Comments

### comments.html (embedded in blog post page)

```html
<!-- Comment Section -->
<section class="comments-section py-5 bg-light">
    <div class="container">
        <h3 class="fw-bold mb-4">
            <i class="bi bi-chat-left-text me-2"></i>Comments (3)
        </h3>

        <!-- Comment Form -->
        <div class="card mb-5 border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold">Leave a Comment</h5>
            </div>
            <div class="card-body p-4">
                <form id="commentForm">
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="commentName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="commentName" placeholder="Your name" required>
                        </div>
                        <div class="col-md-6">
                            <label for="commentEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="commentEmail" placeholder="your@email.com" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="commentText" class="form-label">Comment</label>
                        <textarea class="form-control" id="commentText" rows="4" placeholder="Write your comment here..." required></textarea>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="saveInfo">
                        <label class="form-check-label" for="saveInfo">
                            Save my name and email for future comments
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-send me-2"></i>Post Comment
                    </button>
                </form>
            </div>
        </div>

        <!-- Comments List -->
        <div class="comments-list">
            <!-- Comment 1 -->
            <div class="card border-0 shadow-sm mb-4" id="comment-1">
                <div class="card-body p-4">
                    <div class="d-flex">
                        <img src="https://via.placeholder.com/50/10b981/ffffff?text=JD"
                             class="rounded-circle me-3 flex-shrink-0" alt="John Doe">
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h5 class="fw-bold mb-0">John Doe</h5>
                                    <small class="text-muted">January 16, 2026 at 2:34 PM</small>
                                </div>
                                <span class="badge bg-success">Author</span>
                            </div>
                            <p class="mb-3">
                                Great article! I've been using CSS Grid for a while now, but I never knew about
                                the <code>subgrid</code> feature. This will definitely make my layouts much cleaner.
                                Thanks for sharing!
                            </p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-primary reply-btn" data-comment="1">
                                    <i class="bi bi-reply me-1"></i>Reply
                                </button>
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-hand-thumbs-up me-1"></i>12
                                </button>
                            </div>

                            <!-- Nested Reply 1 -->
                            <div class="comment-reply mt-4" id="reply-1-1">
                                <div class="d-flex">
                                    <img src="https://via.placeholder.com/40/6366f1/ffffff?text=YN"
                                         class="rounded-circle me-3 flex-shrink-0" alt="Author">
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h6 class="fw-bold mb-0">YourName</h6>
                                                <small class="text-muted">January 16, 2026 at 3:15 PM</small>
                                            </div>
                                            <span class="badge bg-primary">Author</span>
                                        </div>
                                        <p class="mb-2">
                                            Thanks, John! Yes, subgrid is a game-changer. It finally allows child
                                            elements to align to the parent grid tracks. If you want to learn more,
                                            check out my follow-up post about advanced grid techniques!
                                        </p>
                                        <button class="btn btn-sm btn-outline-primary reply-btn" data-comment="1">
                                            <i class="bi bi-reply me-1"></i>Reply
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Nested Reply 2 -->
                            <div class="comment-reply mt-3" id="reply-1-2">
                                <div class="d-flex">
                                    <img src="https://via.placeholder.com/40/e2e8f0/334155?text=AK"
                                         class="rounded-circle me-3 flex-shrink-0" alt="Alex Kim">
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h6 class="fw-bold mb-0">Alex Kim</h6>
                                                <small class="text-muted">January 16, 2026 at 4:45 PM</small>
                                            </div>
                                        </div>
                                        <p class="mb-2">
                                            Do you have a link to that follow-up post? I'd love to read it!
                                        </p>
                                        <button class="btn btn-sm btn-outline-primary reply-btn" data-comment="1">
                                            <i class="bi bi-reply me-1"></i>Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comment 2 -->
            <div class="card border-0 shadow-sm mb-4" id="comment-2">
                <div class="card-body p-4">
                    <div class="d-flex">
                        <img src="https://via.placeholder.com/50/ec4899/ffffff?text=SM"
                             class="rounded-circle me-3 flex-shrink-0" alt="Sarah Miller">
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h5 class="fw-bold mb-0">Sarah Miller</h5>
                                    <small class="text-muted">January 15, 2026 at 11:20 AM</small>
                                </div>
                            </div>
                            <p class="mb-3">
                                This is exactly what I needed! I've been struggling with responsive layouts
                                for my portfolio site. The explanation about container queries was particularly helpful.
                                Bookmarked for future reference!
                            </p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-primary reply-btn" data-comment="2">
                                    <i class="bi bi-reply me-1"></i>Reply
                                </button>
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-hand-thumbs-up me-1"></i>8
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comment 3 -->
            <div class="card border-0 shadow-sm" id="comment-3">
                <div class="card-body p-4">
                    <div class="d-flex">
                        <img src="https://via.placeholder.com/50/f59e0b/ffffff?text=ML"
                             class="rounded-circle me-3 flex-shrink-0" alt="Mike Lee">
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h5 class="fw-bold mb-0">Mike Lee</h5>
                                    <small class="text-muted">January 14, 2026 at 8:30 PM</small>
                                </div>
                            </div>
                            <p class="mb-3">
                                Nice work! One question though - are there any browser compatibility concerns
                                with these newer CSS features? I want to use them but my audience uses older browsers.
                            </p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-primary reply-btn" data-comment="3">
                                    <i class="bi bi-reply me-1"></i>Reply
                                </button>
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-hand-thumbs-up me-1"></i>5
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### css/comments.css

```css
/* Comment Section */
.comments-section {
    background-color: #f8fafc;
}

/* Comment Card */
.comment-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.comment-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Avatar Styling */
.comment-card img.rounded-circle {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 2px solid #e2e8f0;
}

/* Reply Avatar */
.comment-reply img.rounded-circle {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border: 2px solid #e2e8f0;
}

/* Thread Lines */
.comment-reply {
    border-left: 3px solid #e2e8f0;
    padding-left: 1rem;
    margin-left: 1.5rem;
}

/* Author Badge */
.badge.bg-success {
    background-color: #10b981 !important;
}

.badge.bg-primary {
    background-color: #6366f1 !important;
}

/* Reply Button */
.btn-outline-primary {
    border-color: #6366f1;
    color: #6366f1;
}

.btn-outline-primary:hover {
    background-color: #6366f1;
    color: white;
}

/* Like Button */
.btn-outline-secondary {
    border-color: #e2e8f0;
    color: #64748b;
}

.btn-outline-secondary:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    color: #334155;
}

/* Form Styling */
#commentForm .form-control:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

/* Reply Animation */
.comment-reply {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Code Styling in Comments */
.comment-card code {
    background: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.875em;
    color: #6366f1;
}

/* Timestamp Styling */
.text-muted {
    color: #64748b !important;
}

/* Responsive */
@media (max-width: 768px) {
    .comment-reply {
        margin-left: 0.5rem;
        padding-left: 0.75rem;
    }

    .comment-card img.rounded-circle,
    .comment-reply img.rounded-circle {
        width: 40px;
        height: 40px;
    }
}
```

### JavaScript for Comment System

```javascript
// comment.js

// Handle reply buttons
document.querySelectorAll('.reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const commentId = btn.dataset.comment;
        const commentCard = document.getElementById(`comment-${commentId}`);
        const replyForm = createReplyForm(commentId);

        // Insert reply form after the comment
        commentCard.querySelector('.d-flex').appendChild(replyForm);
        btn.disabled = true;
        btn.textContent = 'Replying...';
    });
});

// Create inline reply form
function createReplyForm(commentId) {
    const formDiv = document.createElement('div');
    formDiv.className = 'reply-form mt-3 p-3 bg-light rounded-3';
    formDiv.innerHTML = `
        <form class="reply-form-inner">
            <div class="mb-2">
                <input type="text" class="form-control form-control-sm"
                       placeholder="Your name" required>
            </div>
            <div class="mb-2">
                <textarea class="form-control form-control-sm"
                          rows="2" placeholder="Write your reply..." required></textarea>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-sm btn-primary">Post Reply</button>
                <button type="button" class="btn btn-sm btn-secondary cancel-reply">Cancel</button>
            </div>
        </form>
    `;

    // Cancel button handler
    formDiv.querySelector('.cancel-reply').addEventListener('click', () => {
        formDiv.remove();
        const btn = document.querySelector(`[data-comment="${commentId}"]`);
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-reply me-1"></i>Reply';
    });

    return formDiv;
}

// Comment form submission
document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('commentName').value;
    const email = document.getElementById('commentEmail').value;
    const text = document.getElementById('commentText').value;

    // Simulate adding comment
    const newComment = createCommentElement(name, text, false);
    document.querySelector('.comments-list').appendChild(newComment);

    // Reset form
    e.target.reset();

    // Show success
    alert('Comment posted successfully!');
});

// Create comment DOM element
function createCommentElement(name, text, isAuthor) {
    const id = Date.now();
    const date = new Date().toLocaleString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
    });

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const color = ['6366f1', '8b5cf6', '14b8a6', 'ec4899', 'f59e0b'][Math.floor(Math.random() * 5)];

    const html = `
        <div class="card border-0 shadow-sm mb-4" id="comment-${id}">
            <div class="card-body p-4">
                <div class="d-flex">
                    <img src="https://via.placeholder.com/50/${color}/ffffff?text=${initials}"
                         class="rounded-circle me-3 flex-shrink-0" alt="${name}">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 class="fw-bold mb-0">${name}</h5>
                                <small class="text-muted">${date}</small>
                            </div>
                            ${isAuthor ? '<span class="badge bg-primary">Author</span>' : ''}
                        </div>
                        <p class="mb-3">${text}</p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-primary reply-btn" data-comment="${id}">
                                <i class="bi bi-reply me-1"></i>Reply
                            </button>
                            <button class="btn btn-sm btn-outline-secondary">
                                <i class="bi bi-hand-thumbs-up me-1"></i>0
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create comment form UI

- Build comment form with name, email, message
- Add form validation and save checkbox
- Style form inputs with focus states
- Include Bootstrap icons for submit button"

git commit -m "[FEATURE] Implement threaded comments display

- Create comment card with avatar and metadata
- Add nested reply structure with border-left
- Style reply buttons and like counters
- Implement author badge for special comments"

git commit -m "[UI] Add comment interactions

- Implement reply button that shows inline form
- Add cancel button to dismiss reply form
- Style timestamps and code snippets
- Add hover effects on comment cards"

git commit -m "[STYLE] Polish comment section

- Add fade-in animation for new comments
- Refine avatar sizes and borders
- Adjust reply indentation on mobile
- Enhance visual hierarchy with badges"
```

---

## Key Learning Points

### 1. Threaded Comments Layout
```html
<div class="comment">
    <img class="rounded-circle"> <!-- Parent avatar -->
    <div class="content">
        <!-- Comment info -->
        <div class="comment reply"> <!-- Nested reply with border-left -->
            <img class="rounded-circle"> <!-- Smaller avatar -->
        </div>
    </div>
</div>
```

### 2. Avatar Size Hierarchy
```css
/* Parent comment */
.comment img.rounded-circle {
    width: 50px;
    height: 50px;
}

/* Reply */
.comment.reply img.rounded-circle {
    width: 40px;
    height: 40px;
}
```

### 3. Thread Line Effect
```css
.comment.reply {
    border-left: 3px solid #e2e8f0;
    padding-left: 1rem;
    margin-left: 1.5rem;
}
```

### 4. Dynamic Reply Form
```javascript
function createReplyForm(commentId) {
    // Create form div with innerHTML
    // Attach cancel button handler
    // Return the form element
}
```

---

**← [ Quay lại Exercise 2.3](../exercises/03_comment_section.md)**