# Solution 1.4 — Contact Form + Footer

## Complete HTML + CSS Solution

### index.html (sections added)

```html
<!-- Contact Section -->
<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title text-center">Get In Touch</h2>

        <div class="contact-wrapper">
            <!-- Contact Info -->
            <div class="contact-info">
                <h3>Contact Information</h3>
                <p>Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.</p>

                <div class="info-item">
                    <span class="icon">📧</span>
                    <span>your.email@example.com</span>
                </div>
                <div class="info-item">
                    <span class="icon">📍</span>
                    <span>Hanoi, Vietnam</span>
                </div>
                <div class="info-item">
                    <span class="icon">📱</span>
                    <span>+84 123 456 789</span>
                </div>
            </div>

            <!-- Contact Form -->
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                    >
                    <span class="error-message"></span>
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                    >
                    <span class="error-message"></span>
                </div>

                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Project Inquiry"
                        required
                    >
                    <span class="error-message"></span>
                </div>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Tell me about your project..."
                        required
                    ></textarea>
                    <span class="error-message"></span>
                </div>

                <button type="submit" class="submit-btn">
                    <span>Send Message</span>
                    <span class="btn-icon">→</span>
                </button>
            </form>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <!-- Logo Column -->
            <div class="footer-column">
                <a href="#" class="footer-logo">YourName</a>
                <p class="footer-tagline">Building digital experiences that make a difference.</p>
            </div>

            <!-- Quick Links Column -->
            <div class="footer-column">
                <h4>Quick Links</h4>
                <nav class="footer-nav">
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>

            <!-- Social Column -->
            <div class="footer-column">
                <h4>Connect</h4>
                <div class="social-links">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                    <a href="mailto:your.email@example.com" class="social-link" aria-label="Email">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.531l6.575-7.202zm10.85 0l6.575 7.202v-12.531l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 YourName. All rights reserved.</p>
            <p>Designed & Built with ❤️</p>
        </div>
    </div>
</footer>
```

### css/contact.css (new file)

```css
/* Contact Section */
.contact-section {
    padding: var(--space-2xl) 0;
    background: var(--color-light);
}

.contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: var(--space-xl);
    align-items: start;
}

/* Contact Info */
.contact-info {
    padding: var(--space-lg);
}

.contact-info h3 {
    font-size: 1.5rem;
    color: var(--color-dark);
    margin-bottom: var(--space-sm);
}

.contact-info > p {
    color: var(--color-text-light);
    margin-bottom: var(--space-lg);
    line-height: 1.7;
}

.info-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    color: var(--color-text);
}

.info-item .icon {
    font-size: 1.25rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
}

/* Contact Form */
.contact-form {
    background: var(--color-white);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}

.form-group {
    margin-bottom: var(--space-md);
    position: relative;
}

.form-group label {
    display: block;
    font-weight: 500;
    color: var(--color-dark);
    margin-bottom: var(--space-xs);
    font-size: 0.875rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-family: var(--font-main);
    color: var(--color-text);
    background: var(--color-white);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: var(--color-text-light);
    opacity: 0.6;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}

.form-group textarea {
    resize: vertical;
    min-height: 140px;
    line-height: 1.6;
}

/* Validation States */
.form-group input.error,
.form-group textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.form-group input.valid,
.form-group textarea.valid {
    border-color: #10b981;
}

.error-message {
    display: none;
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

.form-group.has-error .error-message {
    display: block;
}

/* Submit Button */
.submit-btn {
    width: 100%;
    padding: 1rem 2rem;
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all var(--transition-normal);
}

.submit-btn:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.submit-btn:active {
    transform: translateY(0);
}

.submit-btn .btn-icon {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
}

.submit-btn:hover .btn-icon {
    transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
    .contact-wrapper {
        grid-template-columns: 1fr;
    }

    .contact-info {
        text-align: center;
    }

    .info-item {
        justify-content: center;
    }
}
```

### css/footer.css (new file)

```css
/* Footer */
.footer {
    background: var(--color-dark);
    color: var(--color-white);
    padding: var(--space-2xl) 0 var(--space-md);
}

.footer-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: var(--space-xl);
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column {
    display: flex;
    flex-direction: column;
}

/* Logo */
.footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: var(--space-sm);
}

.footer-tagline {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
}

/* Navigation */
.footer-column h4 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: var(--space-md);
}

.footer-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.footer-nav a {
    color: rgba(255, 255, 255, 0.8);
    transition: color var(--transition-fast);
}

.footer-nav a:hover {
    color: var(--color-primary);
}

/* Social Links */
.social-links {
    display: flex;
    gap: var(--space-sm);
}

.social-link {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: var(--color-white);
    transition: all var(--transition-normal);
}

.social-link:hover {
    background: var(--color-primary);
    transform: translateY(-3px) scale(1.1);
}

/* Footer Bottom */
.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-md);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-lg);
    }

    .social-links {
        justify-content: center;
    }

    .footer-nav {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-md);
    }

    .footer-bottom {
        flex-direction: column;
        gap: var(--space-xs);
    }
}
```

### JavaScript for Form Validation

```javascript
// contact-form.js
const contactForm = document.getElementById('contactForm');

const validateField = (input) => {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Reset state
    input.classList.remove('error', 'valid');
    formGroup.classList.remove('has-error');

    // Required check
    if (input.required && !input.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }

    // Email validation
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }

    // Min length check
    if (input.name === 'message' && input.value.trim().length < 10) {
        isValid = false;
        message = 'Message must be at least 10 characters';
    }

    // Update UI
    if (!isValid) {
        input.classList.add('error');
        formGroup.classList.add('has-error');
        errorMessage.textContent = message;
    } else if (input.value.trim()) {
        input.classList.add('valid');
    }

    return isValid;
};

// Real-time validation on blur
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));

    // Remove error on input
    input.addEventListener('input', () => {
        const formGroup = input.parentElement;
        input.classList.remove('error');
        formGroup.classList.remove('has-error');
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate submission
        setTimeout(() => {
            alert('Message sent successfully!');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Remove all valid states
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid');
            });
        }, 1500);
    }
});
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create contact form with validation

- Build 2-column contact layout (info + form)
- Add form inputs with focus animation
- Implement real-time validation on blur
- Show error messages under invalid fields
- Add loading state on form submit"

git commit -m "[FEATURE] Build responsive footer

- Create 3-column footer layout (logo, nav, social)
- Add SVG social icons (GitHub, LinkedIn, Email)
- Style hover effects on social links
- Add footer bottom with copyright"

git commit -m "[STYLE] Polish contact section responsive

- Stack contact layout on mobile
- Center align info on small screens
- Adjust form padding and spacing
- Add visual feedback states for inputs"

git commit -m "[POLISH] Final footer mobile layout

- Convert footer to single column on mobile
- Center social links and navigation
- Adjust spacing between columns
- Refine font sizes for readability"
```

---

## Key Learning Points

### 1. Form Focus Ring
```css
input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    /* Creates accessible focus indicator */
}
```

### 2. Validation States
```css
input.error { border-color: #ef4444; }
input.valid { border-color: #10b981; }

.error-message {
    display: none;
}
.has-error .error-message {
    display: block; /* Show only when error */
}
```

### 3. Footer 3-Column Grid
```css
.footer-content {
    grid-template-columns: 1.5fr 1fr 1fr;
    /* Logo gets more space, nav and social equal */
}
```

### 4. Social Icon Hover
```css
.social-link:hover {
    background: var(--color-primary);
    transform: translateY(-3px) scale(1.1);
    /* Combines color change + lift + grow */
}
```

### 5. Mobile Stack Pattern
```css
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr; /* Stack */
        text-align: center;
    }
    .social-links {
        justify-content: center; /* Center icons */
    }
}
```

---

**← [ Quay lại Exercise 1.4](../exercises/04_contact_footer.md)**