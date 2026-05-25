# Exercise 1.2 — About + Skills Section

## 🎬 Opening Scenario

*Sau khi hoàn thành hero section, bạn cần xây dựng phần giới thiệu bản thân (About) và hiển thị kỹ năng (Skills) với progress bars.*

---

## 📋 Requirements

### 1. About Section

```html
<section id="about" class="about-section">
    <div class="container">
        <div class="about-grid">
            <div class="about-image">
                <img src="https://via.placeholder.com/400x400" alt="Profile Photo">
            </div>
            <div class="about-content">
                <h2>About Me</h2>
                <p class="lead">I'm a passionate developer with 3+ years of experience building web applications.</p>
                <p>Specialized in Frontend development with React and Vue. Also experienced in Backend with Node.js and Python.</p>
            </div>
        </div>
    </div>
</section>
```

**Yêu cầu:**
- 2-column layout (image + text) trên desktop
- Single column (image trên, text dưới) trên mobile
- Avatar/image có border-radius (circle hoặc rounded)
- Text có hierarchy: heading, lead paragraph, body text

### 2. Skills Section

```html
<section id="skills" class="skills-section">
    <div class="container">
        <h2>My Skills</h2>
        <div class="skills-grid">
            <div class="skill-item">
                <span class="skill-name">HTML5</span>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 95%"></div>
                </div>
            </div>
            <!-- Thêm CSS, JavaScript, React, Node.js -->
        </div>
    </div>
</section>
```

**Yêu cầu:**
- Skills grid: 2 columns (desktop), 1 column (mobile)
- Progress bars có animation khi scroll vào viewport
- Percentage hiển thị (hoặc label)

---

## 🎨 Design Specs

### About Section
- Avatar size: 300x300px (desktop), 200x200px (mobile)
- Gap between image và text: 3rem
- Lead text: 1.25rem, font-weight: 300

### Skills Section
- Skill bar height: 12px
- Skill bar background: #e2e8f0
- Progress fill: gradient (primary → secondary)
- Animation: width transition 1s ease-out

---

## 🐛 Hints

### CSS Grid for About
```css
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: center;
}

@media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; }
}
```

### Progress Bar Animation
```css
.skill-progress {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    height: 100%;
    width: 0; /* Start at 0 for animation */
    transition: width 1s ease-out;
}

/* Add class 'animate' via JS when in viewport */
.skill-progress.animate { width: 95%; }
```

### Skill Bar Structure
```css
.skill-bar {
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
}
```

---

## 🪜 Step-by-Step Guide — Từng bước một

### Bước 1: Thêm HTML About section (5 phút)

Thêm vào `<main>` (sau hero section):

```html
<!-- ===== ABOUT SECTION ===== -->
<section id="about" class="about-section">
    <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-grid">
            <div class="about-image">
                <img src="https://via.placeholder.com/400x400" alt="Profile Photo">
            </div>
            <div class="about-content">
                <p class="lead">I'm a passionate developer with 3+ years of experience.</p>
                <p>Specialized in Frontend development with React and Vue. Also experienced in Backend with Node.js and Python.</p>
                <p>When I'm not coding, you'll find me reading tech blogs, contributing to open-source, or exploring new coffee shops.</p>
            </div>
        </div>
    </div>
</section>
```

**💡 Tại sao dùng `<section id="about">`?** `id` giúp nav links (`href="#about"`) scroll đúng đến section này khi click.

---

### Bước 2: Style About section — CSS Grid (10 phút)

```css
/* ===== CONTAINER — Giới hạn chiều rộng ===== */
.container {
    max-width: 1100px;
    margin: 0 auto;         /* Căn giữa */
    padding: 0 20px;
}

/* ===== SECTION TITLE ===== */
.section-title {
    font-size: 2rem;
    color: var(--color-dark);
    text-align: center;
    margin-bottom: 48px;
    position: relative;
}

/* Gạch trang trí dưới title */
.section-title::after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: var(--color-primary);
    margin: 12px auto 0;
}

/* ===== ABOUT GRID — 2 cột ===== */
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;  /* Ảnh nhỏ hơn text */
    gap: 3rem;
    align-items: center;                /* Căn giữa dọc */
}

.about-image img {
    width: 300px;
    height: 300px;
    object-fit: cover;      /* Ảnh không méo */
    border-radius: 50%;     /* Hình tròn */
    border: 4px solid var(--color-primary);
}

.about-content .lead {
    font-size: 1.25rem;
    font-weight: 300;
    color: var(--color-dark);
    margin-bottom: 16px;
}

.about-content p {
    margin-bottom: 12px;
    line-height: 1.8;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .about-grid {
        grid-template-columns: 1fr;     /* 1 cột trên mobile */
        text-align: center;
    }

    .about-image img {
        width: 200px;
        height: 200px;
    }
}
```

> **💡 Tại sao `grid-template-columns: 1fr 1.5fr`?** `1fr` + `1.5fr` = 2.5 phần. Ảnh chiếm 40%, text chiếm 60%. Text nhiều hơn vì nội dung dài hơn ảnh.

**Test ngay:** Resize trình duyệt → ảnh và text có xếp dọc trên mobile không?

---

### Bước 3: Thêm HTML Skills section (5 phút)

```html
<!-- ===== SKILLS SECTION ===== -->
<section id="skills" class="skills-section">
    <div class="container">
        <h2 class="section-title">My Skills</h2>
        <div class="skills-grid">
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">HTML5</span>
                    <span class="skill-percent">95%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="95"></div>
                </div>
            </div>
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">CSS3</span>
                    <span class="skill-percent">90%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="90"></div>
                </div>
            </div>
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">JavaScript</span>
                    <span class="skill-percent">85%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="85"></div>
                </div>
            </div>
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">React</span>
                    <span class="skill-percent">80%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="80"></div>
                </div>
            </div>
        </div>
    </div>
</section>
```

> **💡 Tại sao dùng `data-width="95"` thay vì `style="width: 95%"`?** Vì animation cần bắt đầu từ `width: 0` → animate đến giá trị `data-width`. Dùng attribute riêng để JS đọc sau này.

---

### Bước 4: Style Skills section (10 phút)

```css
/* ===== SKILLS SECTION ===== */
.skills-section {
    padding: 80px 0;
    background: white;
}

.skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;  /* 2 cột */
    gap: 24px 40px;                   /* Dọc 24px, ngang 40px */
}

.skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.skill-name {
    font-weight: 600;
    color: var(--color-dark);
}

.skill-percent {
    color: var(--color-primary);
    font-weight: 600;
}

.skill-bar {
    background: #e2e8f0;
    border-radius: 10px;
    height: 12px;
    overflow: hidden;
}

.skill-progress {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    width: 0;                       /* Ban đầu = 0, animate sau */
    transition: width 1.5s ease-out;
}

/* Responsive: 1 cột trên mobile */
@media (max-width: 768px) {
    .skills-grid {
        grid-template-columns: 1fr;
    }
}
```

---

### Bước 5: Animation khi scroll (5 phút — JS đơn giản)

```javascript
// Thêm vào cuối file HTML, trước </body>
<script>
    // Intersection Observer — trigger animation khi element hiện ra
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Đọc data-width và set width thật
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
            }
        });
    }, { threshold: 0.3 });  // Trigger khi 30% section hiện ra

    // Quan sát skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) observer.observe(skillsSection);
</script>
```

> **💡 `IntersectionObserver` là gì?** API của browser cho phép bạn biết khi nào element **hiện ra trên màn hình**. Không cần lắng nghe scroll event (tốn performance).

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Grid không chia 2 cột | Thiếu `display: grid` | Phải có `display: grid` trước `grid-template-columns` |
| Avatar méo | Ảnh không vuông + thiếu `object-fit` | Thêm `object-fit: cover` + set cả `width` và `height` |
| Progress bar không animate | Thiếu `width: 0` ban đầu | Phải set `width: 0` trong CSS, JS mới animate được |
| IntersectionObserver không trigger | Selector sai hoặc section chưa render | Kiểm tra `document.querySelector` có trả về element không |
| Section title không có gạch dưới | `::after` cần `display: block` | Phải có `display: block` và `content: ""` |

---

## ✅ Success Criteria

- [ ] About section responsive (2 col → 1 col)
- [ ] Avatar circular và responsive
- [ ] Skills grid responsive
- [ ] Progress bars có animation khi scroll
- [ ] 4 skills: HTML, CSS, JavaScript, React

---

## 📝 Commit Messages Expected

```
[STYLE] Create about section layout
[FEATURE] Add skills progress bars
[REFACTOR] Optimize responsive breakpoints
```

---

**← [ Quay lại Session 1](../README.md)**