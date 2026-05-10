// Portfolio Filter Module
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
                item.classList.remove('hidden', 'hiding');
                item.classList.add('show');
            } else {
                item.classList.add('hiding');
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.classList.remove('hiding');
                }, 300);
            }
        });
    });
});

// Skills Animation with IntersectionObserver
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.classList.add('animate');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact Form Validation
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
        if (errorMessage) errorMessage.textContent = message;
    } else if (input.value.trim()) {
        input.classList.add('valid');
    }

    return isValid;
};

// Real-time validation on blur
if (contactForm) {
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
            const originalHTML = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;

                // Remove all valid states
                contactForm.querySelectorAll('input, textarea').forEach(input => {
                    input.classList.remove('valid');
                });
            }, 1500);
        }
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
}

function updateToggleIcon(theme) {
    if (!sunIcon || !moonIcon) return;
    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(90deg)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg)';
    } else {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-90deg)';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

if (themeToggle) {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});