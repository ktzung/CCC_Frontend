# Solution 3.3 — Contact Form Validation

## Complete Form Validation with Real-time Feedback

### index.html (Contact form section)

```html
<!-- Contact Section -->
<section id="contact" class="contact-section py-5 bg-light">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <h2 class="display-5 fw-bold text-center mb-5">Get In Touch</h2>

                <div class="card border-0 shadow-lg">
                    <div class="card-body p-5">
                        <form id="contactForm" class="contact-form" novalidate>
                            <div class="row g-4">
                                <!-- Name Field -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name" class="form-label fw-semibold">
                                            Full Name <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-wrapper">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                class="form-control form-control-lg"
                                                placeholder="John Doe"
                                                autocomplete="name"
                                                required
                                            >
                                            <span class="input-icon">
                                                <i class="bi bi-person"></i>
                                            </span>
                                            <span class="input-status"></span>
                                        </div>
                                        <div class="error-message" id="nameError"></div>
                                        <div class="valid-message">Looks good!</div>
                                    </div>
                                </div>

                                <!-- Email Field -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email" class="form-label fw-semibold">
                                            Email Address <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-wrapper">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                class="form-control form-control-lg"
                                                placeholder="john@example.com"
                                                autocomplete="email"
                                                required
                                            >
                                            <span class="input-icon">
                                                <i class="bi bi-envelope"></i>
                                            </span>
                                            <span class="input-status"></span>
                                        </div>
                                        <div class="error-message" id="emailError"></div>
                                        <div class="valid-message">Valid email!</div>
                                    </div>
                                </div>

                                <!-- Subject Field -->
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="subject" class="form-label fw-semibold">
                                            Subject <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-wrapper">
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                class="form-control form-control-lg"
                                                placeholder="Project Inquiry"
                                                required
                                            >
                                            <span class="input-icon">
                                                <i class="bi bi-chat-left-text"></i>
                                            </span>
                                            <span class="input-status"></span>
                                        </div>
                                        <div class="error-message" id="subjectError"></div>
                                        <div class="valid-message">Good to go!</div>
                                    </div>
                                </div>

                                <!-- Message Field -->
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="message" class="form-label fw-semibold">
                                            Message <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-wrapper">
                                            <textarea
                                                id="message"
                                                name="message"
                                                class="form-control form-control-lg"
                                                rows="5"
                                                placeholder="Tell me about your project, timeline, and budget..."
                                                required
                                            ></textarea>
                                            <span class="textarea-icon">
                                                <i class="bi bi-pencil-square"></i>
                                            </span>
                                        </div>
                                        <div class="error-message" id="messageError"></div>
                                        <div class="valid-message">Perfect!</div>
                                        <div class="char-count">
                                            <span id="charCount">0</span> / 50 minimum
                                        </div>
                                    </div>
                                </div>

                                <!-- Submit Button -->
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-lg w-100" id="submitBtn">
                                        <span class="btn-text">Send Message</span>
                                        <span class="btn-loader d-none">
                                            <span class="spinner-border spinner-border-sm me-2"></span>
                                            Sending...
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <!-- Success Message -->
                        <div id="successMessage" class="success-message alert alert-success d-none mt-4" role="alert">
                            <i class="bi bi-check-circle-fill me-2"></i>
                            <strong>Message sent successfully!</strong>
                            <p class="mb-0 mt-2">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### css/form-validation.css

```css
/* Input Wrapper */
.input-wrapper {
    position: relative;
}

.form-control-lg {
    padding: 1rem 1.25rem;
    padding-left: 3rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-control-lg:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    outline: none;
}

/* Input Icon */
.input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    transition: color 0.3s ease;
}

.textarea-icon {
    position: absolute;
    left: 1rem;
    top: 1.25rem;
    color: #94a3b8;
    transition: color 0.3s ease;
}

.form-control-lg:focus ~ .input-icon,
.form-control-lg:focus ~ .textarea-icon {
    color: #6366f1;
}

/* Validation States */
.form-group {
    margin-bottom: 0.5rem;
}

.form-group.error .form-control-lg {
    border-color: #ef4444;
    background-color: #fef2f2;
}

.form-group.error .input-icon,
.form-group.error .textarea-icon {
    color: #ef4444;
}

.form-group.valid .form-control-lg {
    border-color: #22c55e;
}

.form-group.valid .input-icon,
.form-group.valid .textarea-icon {
    color: #22c55e;
}

/* Input Status Indicator */
.input-status {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.form-group.error .input-status {
    background: #ef4444;
    opacity: 1;
}

.form-group.valid .input-status {
    background: #22c55e;
    opacity: 1;
}

/* Error Message */
.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: none;
    align-items: center;
}

.error-message::before {
    content: '⚠ ';
    margin-right: 0.25rem;
}

.form-group.error .error-message {
    display: flex;
}

/* Valid Message */
.valid-message {
    color: #22c55e;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: none;
    align-items: center;
}

.valid-message::before {
    content: '✓ ';
    margin-right: 0.25rem;
}

.form-group.valid .valid-message {
    display: flex;
}

/* Character Count */
.char-count {
    font-size: 0.8rem;
    color: #94a3b8;
    text-align: right;
    margin-top: 0.5rem;
}

.char-count.warning {
    color: #f59e0b;
}

.char-count.success {
    color: #22c55e;
}

/* Submit Button */
.btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    padding: 1rem 2rem;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
    background: #94a3b8;
    transform: none;
    box-shadow: none;
}

/* Success Message */
.success-message {
    border-radius: 12px;
    padding: 1.5rem;
    animation: slideUp 0.4s ease;
}

.success-message i {
    font-size: 1.5rem;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Required Star */
.text-danger {
    color: #ef4444;
}
```

### js/form-validation.js

```javascript
// Form Validation Module
const ContactForm = {
    // Form element
    form: null,

    // Validation rules
    rules: {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Name must be at least 2 characters long',
            emptyMessage: 'Please enter your name'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address (e.g., name@example.com)',
            emptyMessage: 'Email is required'
        },
        subject: {
            validate: (value) => value.trim().length >= 5,
            message: 'Subject must be at least 5 characters',
            emptyMessage: 'Please enter a subject'
        },
        message: {
            validate: (value) => value.trim().length >= 50,
            message: 'Message must be at least 50 characters for a meaningful response',
            emptyMessage: 'Please enter your message'
        }
    },

    // Initialize
    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.bindEvents();
        this.setupCharCount();
    },

    // Bind form events
    bindEvents() {
        // Real-time validation on input
        Object.keys(this.rules).forEach(fieldName => {
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            if (input) {
                input.addEventListener('input', () => this.validateField(input));
                input.addEventListener('blur', () => this.validateField(input));
            }
        });

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    // Setup character count
    setupCharCount() {
        const messageInput = this.form.querySelector('#message');
        const charCount = document.getElementById('charCount');
        const minLength = 50;

        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCount.textContent = length;

            // Update styling based on length
            const charCountEl = charCount.closest('.char-count');
            charCountEl.classList.remove('warning', 'success');

            if (length > 0 && length < minLength) {
                charCountEl.classList.add('warning');
            } else if (length >= minLength) {
                charCountEl.classList.add('success');
            }
        });
    },

    // Validate single field
    validateField(input) {
        const fieldName = input.name;
        const rule = this.rules[fieldName];
        const value = input.value.trim();
        const formGroup = input.closest('.form-group');

        // Reset state
        formGroup.classList.remove('error', 'valid');
        const errorEl = document.getElementById(`${fieldName}Error`);
        if (errorEl) errorEl.textContent = '';

        // Skip if empty on first input
        if (!value) {
            formGroup.classList.remove('error', 'valid');
            return false;
        }

        // Validate
        const isValid = rule.validate(value);

        if (isValid) {
            formGroup.classList.add('valid');
        } else {
            formGroup.classList.add('error');
            if (errorEl) errorEl.textContent = rule.message;
        }

        return isValid;
    },

    // Validate all fields
    validateAll() {
        let isAllValid = true;

        Object.keys(this.rules).forEach(fieldName => {
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            if (input && !this.validateField(input)) {
                isAllValid = false;
            }
        });

        return isAllValid;
    },

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        const isValid = this.validateAll();

        if (isValid) {
            this.submitForm();
        } else {
            // Focus first invalid field
            const firstError = this.form.querySelector('.form-group.error input, .form-group.error textarea');
            if (firstError) firstError.focus();

            // Shake animation for submit button
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.style.animation = 'shake 0.5s ease';
            setTimeout(() => submitBtn.style.animation = '', 500);
        }
    },

    // Submit form (simulated)
    submitForm() {
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Show loading state
        btnText.classList.add('d-none');
        btnLoader.classList.remove('d-none');
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            btnText.classList.remove('d-none');
            btnLoader.classList.add('d-none');
            submitBtn.disabled = false;

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('d-none');

            // Reset form
            this.form.reset();
            this.form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('valid', 'error');
            });

            // Hide success after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        }, 1500);
    }
};

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => ContactForm.init());
```

---

## Commit Message Examples

```bash
git commit -m "[FEATURE] Create form validation with rules

- Define validation rules for name, email, subject, message
- Implement validateField function for each input
- Add real-time validation on input and blur events
- Show inline error messages under invalid fields"

git commit -m "[UI] Add visual feedback states

- Create .error and .valid classes for styling
- Show checkmark for valid fields
- Display warning icon for errors
- Add focus ring with theme color"

git commit -m "[STATE] Implement character counter

- Track message length in real-time
- Show minimum character requirement
- Color-code counter (warning/success)
- Update validation on character count"

git commit -m "[POLISH] Add submit animation and success

- Show loading spinner during submission
- Add shake animation on invalid submit
- Display success alert after submit
- Reset form and clear validation states"
```

---

## Key Learning Points

### 1. Validation Rule Pattern
```javascript
const rules = {
    name: {
        validate: (value) => value.trim().length >= 2,
        message: 'Name must be at least 2 characters'
    },
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email'
    }
};
```

### 2. Email Regex Breakdown
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
// ^           - start of string
// [^\s@]+     - one or more chars except space and @
// @           - literal @
// [^\s@]+     - one or more chars except space and @
// \.           - literal dot
// [^\s@]+$    - one or more chars except space and @, end
```

### 3. Real-time Validation
```javascript
input.addEventListener('input', () => validateField(input));
input.addEventListener('blur', () => validateField(input));
// Validate on type (input) and on leave (blur)
```

### 4. Submit Button Loading State
```javascript
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

btnText.classList.add('d-none');
btnLoader.classList.remove('d-none');
submitBtn.disabled = true;
```

---

**← [ Quay lại Exercise 3.3](../exercises/03_form_validation.md)**