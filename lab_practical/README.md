# 🎓 CSE391 — Lab Practical Sessions

## Tổng quan

5 buổi thực hành xây dựng **một dự án Portfolio xuyên suốt**, tiến triển từ HTML/CSS thuần → Bootstrap 5 → JavaScript → React.

```
Session 1 (HTML/CSS)     Session 2 (Bootstrap)     Session 3 (JavaScript)
┌──────────────────┐     ┌──────────────────┐       ┌──────────────────┐
│ Portfolio v1     │ ──► │ Portfolio v2     │ ────► │ Portfolio v3     │
│ Static HTML/CSS  │     │ Bootstrap 5      │       │ Interactive JS   │
└──────────────────┘     └──────────────────┘       └────────┬─────────┘
                                                              │
Session 5 (React Full) ◄── Session 4 (React Basics) ◄────────┘
┌──────────────────┐     ┌──────────────────┐
│ E-commerce v5    │ ──► │ Portfolio v4     │
│ Full SPA         │     │ React + Hooks    │
└──────────────────┘     └──────────────────┘
```

---

## Cấu trúc

```
lab_practical/
├── README.md                        ← File này
├── session_01_html_css/             ← Buổi 1: HTML/CSS Fundamentals
├── session_02_bootstrap/            ← Buổi 2: Bootstrap 5
├── session_03_javascript/           ← Buổi 3: JavaScript Interactive
├── session_04_react_basics/         ← Buổi 4: React Basics
└── session_05_react_ecommerce/      ← Buổi 5: React E-commerce
```

---

## 5 Sessions Overview

| Session | Tech Stack | Project Version | Key Topics |
|---------|------------|-----------------|------------|
| **Session 1** | HTML5, CSS3 | Portfolio v1.0 | Semantic HTML, CSS Grid/Flexbox, Responsive |
| **Session 2** | Bootstrap 5 | Portfolio v2.0 | Bootstrap Grid, Components, Theme Customization |
| **Session 3** | Vanilla JS | Portfolio v3.0 | DOM Manipulation, Events, localStorage |
| **Session 4** | React | Portfolio v4.0 | JSX, useState, Props, Components |
| **Session 5** | React + Router | E-commerce v5.0 | React Router, Context API, API Integration |

---

## Yêu cầu chung

### GitHub Repository
- Mỗi session = 1 repo riêng
- Commit sau mỗi bài tập hoàn thành
- Viết commit message theo convention

### Commit Convention
```
[TYPE] Short description (max 50 chars)

TYPE: [SETUP], [FEATURE], [STYLE], [REFACTOR], [BUGFIX], [UI], [STATE]
```

### Đánh giá (Grading Rubric)

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| Hoàn thành yêu cầu | 4 | Đủ tính năng, responsive |
| Code quality | 2 | Clean structure, có comments |
| Git commit | 2 | Đủ commits, meaningful messages |
| Problem solving | 2 | Không copy paste, tự giải quyết |

**Tổng: 10 điểm/session**

---

## Bắt đầu

### Session 1: HTML/CSS Fundamentals
→ [Xem chi tiết](./session_01_html_css/README.md)

### Session 2: Bootstrap 5
→ [Xem chi tiết](./session_02_bootstrap/README.md)

### Session 3: JavaScript Interactive
→ [Xem chi tiết](./session_03_javascript/README.md)

### Session 4: React Basics
→ [Xem chi tiết](./session_04_react_basics/README.md)

### Session 5: React E-commerce
→ [Xem chi tiết](./session_05_react_ecommerce/README.md)

---

## Mối liên hệ với BTL

Các session này xây dựng **từng phần của E-commerce BTL**:

```
Session 1: HTML/CSS          → BTL Phase 1 (HTML/CSS structure)
Session 2: Bootstrap         → BTL Phase 1 (CSS framework)
Session 3: JavaScript        → BTL Phase 2 (DOM interactivity)
Session 4: React Basics      → BTL Phase 3 (Component architecture)
Session 5: React E-commerce  → BTL Phase 3 + 4 (Full SPA)
```

**Kết quả cuối cùng:** Portfolio đã tiến hóa thành E-commerce hoàn chỉnh, sẵn sàng deploy vào portfolio!

---

## Liên kết

- **Slides bài giảng:** [Tại đây](../) (thư mục chính)
- **BTL Guide:** [01_BTL_GUIDE.md](../project_guide/01_BTL_GUIDE.md)
- **FAQ:** [FAQ_TROUBLESHOOTING.md](../project_guide/FAQ_TROUBLESHOOTING.md)