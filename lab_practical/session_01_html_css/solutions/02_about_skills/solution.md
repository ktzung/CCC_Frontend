# Solution 1.2 — About + Skills Section

## Complete HTML + CSS Solution

### index.html (sections added)

```html
<!-- About Section -->
<section id="about" class="about-section">
    <div class="container">
        <div class="about-grid">
            <div class="about-image">
                <img src="https://via.placeholder.com/400x400/6366f1/ffffff?text=Your+Photo" alt="Your Photo">
            </div>
            <div class="about-content">
                <h2 class="section-title">About Me</h2>
                <p class="lead">
                    I'm a passionate developer with 3+ years of experience
                    building web applications that make a difference.
                </p>
                <p>
                    Specialized in Frontend development with React and Vue.
                    Also experienced in Backend with Node.js and Python.
                    I believe in clean code, user-centered design, and continuous learning.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Skills Section -->
<section id="skills" class="skills-section">
    <div class="container">
        <h2 class="section-title text-center">My Skills</h2>

        <div class="skills-grid">
            <!-- Skill 1 -->
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">HTML5</span>
                    <span class="skill-percentage">95%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="95"></div>
                </div>
            </div>

            <!-- Skill 2 -->
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">CSS3</span>
                    <span class="skill-percentage">90%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="90"></div>
                </div>
            </div>

            <!-- Skill 3 -->
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">JavaScript</span>
                    <span class="skill-percentage">85%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="85"></div>
                </div>
            </div>

            <!-- Skill 4 -->
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">React</span>
                    <span class="skill-percentage">80%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="80"></div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### css/about.css (new file)

```css
/* About Section */
.about-section {
    padding: var(--space-2xl) 0;
}

.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: var(--space-xl);
    align-items: center;
}

.about-image {
    text-align: center;
}

.about-image img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--color-primary);
    box-shadow: var(--shadow-lg);
}

.about-content {
    padding: var(--space-md);
}

.section-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark);
    margin-bottom: var(--space-md);
}

.about-content .lead {
    font-size: 1.25rem;
    font-weight: 300;
    color: var(--color-text);
    margin-bottom: var(--space-md);
    line-height: 1.8;
}

.about-content p {
    color: var(--color-text-light);
    margin-bottom: var(--space-sm);
}

/* Responsive */
@media (max-width: 768px) {
    .about-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .about-image img {
        width: 200px;
        height: 200px;
    }
}
```

### css/skills.css (new file)

```css
/* Skills Section */
.skills-section {
    padding: var(--space-2xl) 0;
    background: var(--color-light);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
    max-width: 800px;
    margin: 0 auto;
}

.skill-item {
    background: var(--color-white);
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-xs);
}

.skill-name {
    font-weight: 600;
    color: var(--color-dark);
}

.skill-percentage {
    color: var(--color-primary);
    font-weight: 600;
}

.skill-bar {
    height: 12px;
    background: var(--color-border);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.skill-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: var(--radius-full);
    width: 0;
    transition: width 1s ease-out;
}

.skill-progress.animate {
    width: var(--target-width, 0);
}

/* Animation using data-width attribute via JS */
.skill-progress[data-width="95"] { --target-width: 95%; }
.skill-progress[data-width="90"] { --target-width: 90%; }
.skill-progress[data-width="85"] { --target-width: 85%; }
.skill-progress[data-width="80"] { --target-width: 80%; }

/* Responsive */
@media (max-width: 600px) {
    .skills-grid {
        grid-template-columns: 1fr;
    }
}
```

### JavaScript for Scroll Animation (optional enhancement)

```javascript
// skills-animation.js
const observerOptions = {
    threshold: 0.5
};

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
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}
```

---

## Commit Message Examples

```bash
git commit -m "[STYLE] Create about section layout

- Add about-grid 2-column CSS layout
- Style avatar with circular border and shadow
- Add typography hierarchy: title, lead, body
- Implement responsive single column on mobile"

git commit -m "[FEATURE] Add skills progress bars

- Create skills-grid 2-column layout
- Style progress bars with gradient fill
- Add percentage labels next to skill names
- Add CSS animation for progress width"

git commit -m "[REFACTOR] Optimize responsive breakpoints

- Adjust about section for mobile (center align)
- Reduce skill grid to single column on small screens
- Add IntersectionObserver for scroll animation
- Fine-tune spacing and font sizes"
```

---

## Key Learning Points

### 1. CSS Grid for 2-Column Layout
```css
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr; /* 1 part image, 1.5 parts text */
    gap: var(--space-xl);
    align-items: center;
}
```

### 2. Gradient Progress Bar
```css
.skill-progress {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
}
```

### 3. CSS Animation Trigger
```css
.skill-progress {
    transition: width 1s ease-out;
}
```

### 4. Responsive Grid
```css
.skills-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 equal columns */
}

@media (max-width: 600px) {
    .skills-grid {
        grid-template-columns: 1fr; /* Stack on mobile */
    }
}
```

---

**← [ Quay lại Exercise 1.2](../exercises/02_about_skills.md)**