# Exercise 1.4 — Contact Form + Footer

## 🎬 Opening Scenario

*Task cuối của Session 1: xây dựng contact form với validation UI feedback và responsive footer với social links.*

---

## 📋 Requirements

### 1. Contact Section

```html
<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-wrapper">
            <div class="contact-info">
                <h3>Contact Information</h3>
                <p>Feel free to reach out. I'm always open to discussing new projects.</p>
                <div class="info-item">
                    <span class="icon">📧</span>
                    <span>your.email@example.com</span>
                </div>
                <div class="info-item">
                    <span class="icon">📍</span>
                    <span>Hanoi, Vietnam</span>
                </div>
            </div>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>
    </div>
</section>
```

**Yêu cầu:**
- 2-column layout: info + form (desktop), stacked (mobile)
- Form validation UI: border color change khi focus/error
- Labels always visible (không placeholder only)
- Submit button với hover effect

### 2. Footer

```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-logo">YourName</div>
            <p class="footer-tagline">Building digital experiences</p>
            <div class="social-links">
                <a href="#" class="social-link" aria-label="GitHub">
                    <svg><!-- GitHub icon --></svg>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                    <svg><!-- LinkedIn icon --></svg>
                </a>
                <a href="#" class="social-link" aria-label="Email">
                    <svg><!-- Email icon --></svg>
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 YourName. All rights reserved.</p>
        </div>
    </div>
</footer>
```

**Yêu cầu:**
- 3-column layout (logo, tagline, social) trên desktop
- Single column trên mobile
- Social icons có hover effect (scale + color)
- Copyright text

---

## 🪜 Step-by-Step Guide — Từng bước một

### Bước 1: HTML Contact Section (10 phút)

```html
<!-- ===== CONTACT SECTION ===== -->
<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-wrapper">
            <!-- Cột trái: Thông tin liên hệ -->
            <div class="contact-info">
                <h3>Contact Information</h3>
                <p>Feel free to reach out. I'm always open to discussing new projects and creative ideas.</p>
                <div class="info-item">
                    <span class="info-icon">📧</span>
                    <div>
                        <strong>Email</strong>
                        <p>your.email@example.com</p>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">📍</span>
                    <div>
                        <strong>Location</strong>
                        <p>Hanoi, Vietnam</p>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">📱</span>
                    <div>
                        <strong>Phone</strong>
                        <p>+84 123 456 789</p>
                    </div>
                </div>
            </div>

            <!-- Cột phải: Form liên hệ -->
            <form class="contact-form" action="#" method="POST">
                <div class="form-group">
                    <label for="name">Your Name <span class="required">*</span></label>
                    <input type="text" id="name" name="name" placeholder="Nguyễn Văn Minh" required minlength="2">
                </div>
                <div class="form-group">
                    <label for="email">Your Email <span class="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="minh@email.com" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="Project inquiry">
                </div>
                <div class="form-group">
                    <label for="message">Message <span class="required">*</span></label>
                    <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required minlength="10"></textarea>
                </div>
                <button type="submit" class="submit-btn">
                    <span>Send Message</span> →
                </button>
            </form>
        </div>
    </div>
</section>
```

> **💡 Tại sao dùng `<label for="name">`?** Attribute `for` kết nối label với input có `id` tương ứng. Khi click label → input tự focus. Quan trọng cho accessibility (screen reader).

---

### Bước 2: Style Contact Section (15 phút)

```css
/* ===== CONTACT SECTION ===== */
.contact-section {
    padding: 80px 0;
    background: white;
}

.contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.5fr;  /* Info nhỏ hơn form */
    gap: 3rem;
    align-items: start;                  /* Căn trên cùng */
}

/* ===== CONTACT INFO (cột trái) ===== */
.contact-info h3 {
    font-size: 1.5rem;
    color: var(--color-dark);
    margin-bottom: 12px;
}

.contact-info > p {
    color: var(--color-text);
    margin-bottom: 24px;
    line-height: 1.7;
}

.info-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
}

.info-icon {
    font-size: 1.5rem;
    line-height: 1;
}

.info-item strong {
    display: block;
    color: var(--color-dark);
    margin-bottom: 2px;
}

.info-item p {
    color: var(--color-text);
    font-size: 0.95rem;
}

/* ===== CONTACT FORM (cột phải) ===== */
.form-group {
    margin-bottom: 1.25rem;
}

.form-group label {
    display: block;
    font-weight: 600;
    color: var(--color-dark);
    margin-bottom: 6px;
    font-size: 0.95rem;
}

.form-group .required {
    color: #ef4444;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    background: #f8fafc;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: white;
}

.form-group textarea {
    resize: vertical;           /* Chỉ cho phép kéo dọc */
    min-height: 120px;
}

/* ===== SUBMIT BUTTON ===== */
.submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
}

.submit-btn:hover {
    background: var(--color-secondary);
    transform: translateY(-2px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .contact-wrapper {
        grid-template-columns: 1fr;
    }
}
```

> **💡 Tại sao dùng `transition` trên `input:focus`?** Khi user click vào input, border đổi màu **mượt** thay vì đột ngột. Chi tiết nhỏ nhưng tạo cảm giác professional.

---

### Bước 3: HTML Footer (5 phút)

```html
<!-- ===== FOOTER ===== -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <div class="footer-logo">YourName</div>
                <p class="footer-tagline">Building digital experiences, one line of code at a time.</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="footer-social">
                <h4>Connect</h4>
                <div class="social-links">
                    <a href="https://github.com" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="mailto:your.email@example.com" class="social-link" aria-label="Email">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 YourName. All rights reserved.</p>
        </div>
    </div>
</footer>
```

---

### Bước 4: Style Footer (10 phút)

```css
/* ===== FOOTER ===== */
.footer {
    background: var(--color-dark);
    color: #cbd5e1;
    padding: 60px 0 0;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;
    padding-bottom: 40px;
    border-bottom: 1px solid #334155;
}

.footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
}

.footer-tagline {
    line-height: 1.7;
}

.footer-links h4,
.footer-social h4 {
    color: white;
    margin-bottom: 16px;
    font-size: 1.1rem;
}

.footer-links a {
    display: block;
    color: #94a3b8;
    margin-bottom: 8px;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: white;
}

.social-links {
    display: flex;
    gap: 12px;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #334155;
    color: #94a3b8;
    transition: background 0.3s, color 0.3s, transform 0.3s;
}

.social-link:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-3px);
}

.footer-bottom {
    text-align: center;
    padding: 20px 0;
    font-size: 0.9rem;
    color: #64748b;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .social-links {
        justify-content: center;
    }
}
```

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Form không submit | Thiếu `type="submit"` trên button | Phải có `type="submit"` (mặc định là submit, nhưng nên viết rõ) |
| Input không focus khi click label | `for` và `id` không khớp | Đảm bảo `for="name"` khớp với `id="name"` |
| Textarea bị kéo quá nhỏ | Thiếu `min-height` | Thêm `min-height: 120px` |
| Footer không căn giữa trên mobile | Thiếu `text-align: center` trong media query | Thêm `text-align: center` cho mobile |
| Social icons không hover | Thiếu `transition` trên `.social-link` | Phải set `transition` trước, sau đó đổi property trong `:hover` |
| SVG icons không hiện | Thiếu `fill="currentColor"` | Thêm `fill="currentColor"` vào thẻ `<svg>` |

---

## 🔍 DevTools Tips

1. **Test form validation:** F12 → Console → gõ `document.querySelector('form').reportValidity()` → xem browser validation
2. **Test focus state:** DevTools → chọn input → click icon `:hov` → chọn `:focus`
3. **Xem grid layout:** DevTools → chọn `.contact-wrapper` → tab Layout → xem grid lines

---

## ✅ Success Criteria

### Form Styling
```css
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

### Footer Colors
```css
.footer {
    background: var(--color-dark);
    color: white;
    padding: 3rem 0 1.5rem;
}

.social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--color-primary);
    transform: translateY(-3px);
}
```

---

## 🐛 Hints

### Input Focus Animation
```css
input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}
```

### Textarea Resize
```css
textarea {
    resize: vertical;
    min-height: 120px;
}
```

### Footer Grid
```css
.footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    text-align: center;
}

@media (max-width: 768px) {
    .footer-content { grid-template-columns: 1fr; }
}
```

### SVG Icons (inline)
```html
<!-- GitHub -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>
```

---

## ✅ Success Criteria

- [ ] Contact form responsive (2 col → 1 col)
- [ ] Form inputs có focus effect
- [ ] Labels visible (not placeholder-only)
- [ ] Footer 3-column layout
- [ ] Social icons có hover effect
- [ ] Mobile responsive footer

---

## 📝 Commit Messages Expected

```
[FEATURE] Style contact form inputs
[FEATURE] Add responsive footer
[REFACTOR] Final responsive adjustments
```

---

**← [ Quay lại Session 1](../README.md) | Kết thúc Session 1 →**