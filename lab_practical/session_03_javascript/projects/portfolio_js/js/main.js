// Main JavaScript - Initialize all modules

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio JS initialized');

    // Initialize scroll animations with Intersection Observer
    initScrollAnimations();

    // Initialize mobile menu smooth transitions
    initMobileMenu();
});

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Mobile menu smooth transitions
function initMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (!navbarCollapse || !navbarToggler) return;

    // Add transition to navbar collapse
    navbarCollapse.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';

    // Observe Bootstrap collapse events
    navbarCollapse.addEventListener('show.bs.collapse', () => {
        navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + 'px';
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
        navbarCollapse.style.maxHeight = '0px';
    });
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.custom-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Export modules for potential external use
window.PortfolioJS = {
    PortfolioFilter,
    Lightbox,
    ContactForm,
    ThemeToggle
};