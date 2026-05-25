# Exercise 4.1 — React Components Setup

## 🎬 Opening Scenario

*Chuyển Portfolio từ HTML/Bootstrap sang React với Vite. Mỗi section sẽ thành một component riêng biệt.*

---

## 📋 Requirements

### 1. Setup Vite Project

```bash
npm create vite@latest session_04_portfolio_react -- --template react
cd session_04_portfolio_react
npm install
npm run dev
```

### 2. Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Portfolio.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

### 3. Component Example — Header.jsx

```jsx
// src/components/Header.jsx
function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <a href="#home" className="logo">YourName</a>
                    <div className="nav-links">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#portfolio">Portfolio</a>
                        <a href="#contact">Contact</a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
```

### 4. App.jsx — Compose All Components

```jsx
// src/App.jsx
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Hero />
                <About />
                <Skills />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
```

### 5. Data for Skills (Static Props)

```jsx
// src/data/skills.js
export const skills = [
    { name: 'HTML5', level: 95, category: 'frontend' },
    { name: 'CSS3', level: 90, category: 'frontend' },
    { name: 'JavaScript', level: 85, category: 'frontend' },
    { name: 'React', level: 80, category: 'frontend' },
    { name: 'Node.js', level: 70, category: 'backend' },
];

export const projects = [
    {
        id: 1,
        title: 'E-Commerce Website',
        category: 'web',
        image: 'https://via.placeholder.com/400x300',
        description: 'React + Node.js full-stack application'
    },
    {
        id: 2,
        title: 'Mobile App',
        category: 'mobile',
        image: 'https://via.placeholder.com/400x300',
        description: 'React Native fitness tracking app'
    },
    // ... more projects
];
```

---

## 🐛 Hints

### CSS Module Setup
```css
/* src/components/Header.module.css */
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg-primary);
}
```

### Props Passing
```jsx
// Parent passes data as props
<Skills skills={skillsData} />

// Child receives via destructuring
function Skills({ skills }) {
    return skills.map(skill => <div>{skill.name}</div>);
}
```

---

## 🪜 Step-by-Step Guide — Từng bước một

> **Lần đầu dùng React?** Đừng lo về syntax mới. JSX chỉ là HTML viết trong JavaScript. Nếu bạn biết HTML + JS cơ bản, bạn đã biết 80% React.

### Bước 1: Tạo Vite + React project (3 phút)

```bash
# 1. Tạo project mới
npm create vite@latest my-portfolio-react -- --template react

# 2. Vào thư mục
cd my-portfolio-react

# 3. Cài dependencies
npm install

# 4. Chạy dev server
npm run dev
```

**Test ngay:** Mở `http://localhost:5173` → thấy trang Vite mặc định là OK.

> **💡 `npm create vite@latest` là gì?** Đây là command tạo project mới từ template. Flag `--template react`告诉 Vite tạo sẵn cấu trúc React với JSX, HMR (Hot Module Replacement), và build tool.

---

### Bước 2: Tạo component structure (10 phút)

1. Xóa nội dung mặc định trong `src/App.jsx`
2. Tạo thư mục `src/components/`
3. Tạo 7 file component:

```bash
# Trong terminal (hoặc tạo tay trong VS Code)
mkdir src/components
touch src/components/Header.jsx
touch src/components/Hero.jsx
touch src/components/About.jsx
touch src/components/Skills.jsx
touch src/components/Portfolio.jsx
touch src/components/Contact.jsx
touch src/components/Footer.jsx
```

---

### Bước 3: Viết Header component (10 phút)

```jsx
// src/components/Header.jsx
function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <a href="#home" className="logo">YourName</a>
                    <div className="nav-links">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#portfolio">Portfolio</a>
                        <a href="#contact">Contact</a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
```

> **💡 Tại sao `className` thay vì `class`?** `class` là reserved word trong JavaScript. React dùng `className` để tránh conflict. Tương tự: `for` → `htmlFor`, `onclick` → `onClick`.

---

### Bước 4: Viết Hero component (10 phút)

```jsx
// src/components/Hero.jsx
function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <h1>
                    Hi, I'm <span className="highlight">Your Name</span>
                </h1>
                <p className="hero-subtitle">
                    Full-Stack Developer | UI Designer | Problem Solver
                </p>
                <a href="#portfolio" className="cta-button">
                    View My Work →
                </a>
            </div>
        </section>
    );
}

export default Hero;
```

> **💡 `{}` trong JSX?** Curly braces `{}` cho phép viết JavaScript expression trong JSX. Ví dụ: `<h1>{2 + 3}</h1>` → `<h1>5</h1>`.

---

### Bước 5: Compose trong App.jsx (5 phút)

```jsx
// src/App.jsx
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Hero />
                <About />
                <Skills />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
```

**Test ngay:** Save → browser tự refresh (HMR) → thấy Header và Hero là OK.

---

### Bước 6: Thêm CSS (10 phút)

Copy CSS từ Session 1-3 vào `src/index.css` hoặc tạo file riêng:

```css
/* src/index.css */
:root {
    --color-primary: #6366f1;
    --color-secondary: #8b5cf6;
    --color-dark: #1e293b;
    --color-light: #f8fafc;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', sans-serif;
    color: #334155;
}

.header { /* Copy CSS từ Session 1 */ }
.hero { /* Copy CSS từ Session 1 */ }
```

> **💡 CSS trong React hoạt động bình thường!** Không có gì khác biệt — chỉ cần import file CSS vào `main.jsx` hoặc component.

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Module not found` | Sai đường dẫn import | Kiểm tra `./components/Header` vs `../components/Header` |
| `className` không hoạt động | Viết `class` thay vì `className` | Phải dùng `className` trong JSX |
| Component không render | Quên `export default` | Phải có `export default Header` ở cuối file |
| HMR không hoạt động | File chưa save hoặc error | Save file + kiểm tra Terminal có error không |
| `Objects are not valid as React child` | Render object thay vì string | Kiểm tra `{variable}` có phải string/number không |
| Blank page + error trong Console | Import sai hoặc JSX syntax error | F12 → Console → đọc error message |

---

## 🔍 DevTools Tips

1. **Cài React DevTools:** Chrome Extensions → "React Developer Tools"
2. **Xem component tree:** F12 → tab "Components" (React DevTools)
3. **Xem props/state:** Click component trong React DevTools → xem data
4. **Debug JSX error:** Error message thường chỉ rõ line number trong file

---

## ✅ Success Criteria

- [ ] Vite project setup successfully
- [ ] All 7 components created
- [ ] App.jsx composes all components
- [ ] Skills data passed as props
- [ ] Basic styling applied

---

**← [ Quay lại Session 4](../README.md)**