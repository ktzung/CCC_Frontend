// Main JavaScript for Bootstrap Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbarScrollEffect();
    initContactForm();
    initCommentForm();
    initReplyButtons();
    initThemeToggle();
});

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
}

// Contact Form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Comment Form handling
function initCommentForm() {
    const commentForm = document.getElementById('commentForm');

    if (!commentForm) return;

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');

        // Validate
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        // Show loading
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Posting...';
        submitBtn.disabled = true;

        // Simulate submission
        setTimeout(() => {
            // Create new comment
            const commentsList = document.querySelector('.comments-list');
            const newComment = createCommentElement(name, email, message);
            commentsList.insertBefore(newComment, commentsList.firstChild);

            // Reset form
            commentForm.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            showAlert('Comment posted successfully!', 'success');
        }, 1000);
    });
}

// Create comment element
function createCommentElement(name, email, message) {
    const timestamp = 'Just now';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;

    const commentHTML = `
        <div class="comment-item d-flex gap-3 mb-4 fade-in">
            <img src="${avatarUrl}" alt="${name}" class="rounded-circle flex-shrink-0" width="50" height="50">
            <div class="comment-content flex-grow-1">
                <div class="bg-light rounded-3 p-3">
                    <div class="d-flex justify-content-between mb-2">
                        <h6 class="fw-bold mb-0">${name}</h6>
                        <small class="text-muted">${timestamp}</small>
                    </div>
                    <p class="mb-0 text-muted">${message}</p>
                </div>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary reply-btn">
                        <i class="bi bi-reply me-1"></i>Reply
                    </button>
                    <button class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = commentHTML.trim();
    return template.content.firstChild;
}

// Initialize reply buttons
function initReplyButtons() {
    document.querySelectorAll('.reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const commentItem = this.closest('.comment-item');
            const existingForm = commentItem.querySelector('.reply-form');

            // Remove existing reply forms
            document.querySelectorAll('.reply-form').forEach(form => form.remove());

            if (existingForm) {
                existingForm.remove();
                return;
            }

            // Create reply form
            const replyForm = document.createElement('div');
            replyForm.className = 'reply-form';
            replyForm.innerHTML = `
                <h6>Reply to comment</h6>
                <div class="mb-2">
                    <input type="text" class="form-control form-control-sm" placeholder="Your name">
                </div>
                <div class="mb-2">
                    <textarea class="form-control form-control-sm" rows="2" placeholder="Your reply..."></textarea>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-sm submit-reply">Post Reply</button>
                    <button class="btn btn-secondary btn-sm cancel-reply">Cancel</button>
                </div>
            `;

            commentItem.querySelector('.comment-content').appendChild(replyForm);

            // Handle cancel
            replyForm.querySelector('.cancel-reply').addEventListener('click', () => {
                replyForm.remove();
            });

            // Handle submit
            replyForm.querySelector('.submit-reply').addEventListener('click', function() {
                const name = replyForm.querySelector('input').value.trim();
                const message = replyForm.querySelector('textarea').value.trim();

                if (!name || !message) {
                    showAlert('Please fill in all fields', 'danger');
                    return;
                }

                // Create nested reply
                const nestedReply = document.createElement('div');
                nestedReply.className = 'comment-reply ms-4 mt-3';
                nestedReply.innerHTML = `
                    <div class="d-flex gap-3 fade-in">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=818cf8&color=fff"
                             alt="${name}" class="rounded-circle flex-shrink-0" width="40" height="40">
                        <div class="bg-light rounded-3 p-3 flex-grow-1">
                            <div class="d-flex justify-content-between mb-2">
                                <h6 class="fw-bold mb-0 text-primary">${name}</h6>
                                <small class="text-muted">Just now</small>
                            </div>
                            <p class="mb-0 text-muted">${message}</p>
                        </div>
                    </div>
                `;

                commentItem.querySelector('.comments-list') ?
                    commentItem.querySelector('.comments-list').appendChild(nestedReply) :
                    commentItem.querySelector('.comment-content').appendChild(nestedReply);

                replyForm.remove();
                showAlert('Reply posted successfully!', 'success');
            });
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');

    if (!themeToggleBtn) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateThemeIcon(newTheme);
    });

    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (!sunIcon || !moonIcon) return;

    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
    } else {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
    }
}

// Alert helper
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});