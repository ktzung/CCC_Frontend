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

        if (!messageInput || !charCount) return;

        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCount.textContent = length;

            // Update styling based on length
            const charCountEl = charCount.closest('.char-count');
            if (charCountEl) {
                charCountEl.classList.remove('warning', 'success');

                if (length > 0 && length < minLength) {
                    charCountEl.classList.add('warning');
                } else if (length >= minLength) {
                    charCountEl.classList.add('success');
                }
            }
        });
    },

    // Validate single field
    validateField(input) {
        const fieldName = input.name;
        const rule = this.rules[fieldName];
        if (!rule) return true;

        const value = input.value.trim();
        const formGroup = input.closest('.form-group');

        if (!formGroup) return true;

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
            if (submitBtn) {
                submitBtn.style.animation = 'shake 0.5s ease';
                setTimeout(() => submitBtn.style.animation = '', 500);
            }
        }
    },

    // Submit form (simulated)
    submitForm() {
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn) return;

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Show loading state
        if (btnText) btnText.classList.add('d-none');
        if (btnLoader) btnLoader.classList.remove('d-none');
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            if (btnText) btnText.classList.remove('d-none');
            if (btnLoader) btnLoader.classList.add('d-none');
            submitBtn.disabled = false;

            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('d-none');
            }

            // Reset form
            this.form.reset();
            this.form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('valid', 'error');
            });

            // Reset character count
            const charCount = document.getElementById('charCount');
            if (charCount) charCount.textContent = '0';

            // Hide success after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.add('d-none');
                }
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
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contactForm')) {
        ContactForm.init();
    }
});