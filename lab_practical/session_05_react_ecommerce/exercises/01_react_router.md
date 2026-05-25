# Exercise 5.1 — React Router + Pages

## 🎬 Opening Scenario

*Portfolio cần có routing để chuyển giữa các pages: Home, Projects, Shop, Contact.*

---

## 📋 Requirements

### 1. Install React Router

```bash
npm install react-router-dom
```

### 2. Create Page Components

```jsx
// src/pages/Home.jsx
function Home() {
    return (
        <div className="page home-page">
            <h1>Welcome to My Portfolio</h1>
            <p>Full-Stack Developer & UI Designer</p>
        </div>
    );
}

export default Home;

// src/pages/Projects.jsx
function Projects() {
    return (
        <div className="page projects-page">
            <h1>My Projects</h1>
            <p>See my latest work</p>
        </div>
    );
}

export default Projects;

// src/pages/Shop.jsx
function Shop() {
    return (
        <div className="page shop-page">
            <h1>Shop</h1>
            <p>Browse our products</p>
        </div>
    );
}

export default Shop;

// src/pages/Contact.jsx
function Contact() {
    return (
        <div className="page contact-page">
            <h1>Contact</h1>
            <p>Get in touch</p>
        </div>
    );
}

export default Contact;
```

### 3. Setup Router in App.jsx

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
```

### 4. Navigation with NavLink

```jsx
// src/components/Header.jsx
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <NavLink to="/" className="logo">YourName</NavLink>
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/projects"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to="/shop"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Contact
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;
```

---

## 🐛 Hints

### NavLink vs Link
```jsx
// Link: no active state
import { Link } from 'react-router-dom';
<Link to="/">Home</Link>

// NavLink: has isActive property
import { NavLink } from 'react-router-dom';
<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
```

### 404 Route
```jsx
<Route path="*" element={<NotFound />} />
```

---

## 🪜 Step-by-Step Guide — Từng bước một

> **React Router là gì?** Trong SPA (Single Page Application), tất cả nội dung nằm trong 1 file HTML. React Router "giả lập" nhiều trang bằng cách thay đổi URL và component hiển thị — không reload trang.

### Bước 1: Cài React Router (2 phút)

```bash
npm install react-router-dom
```

> **💡 `react-router-dom` vs `react-router`?** `react-router-dom` là phiên bản cho web browser. `react-router` là core library. Luôn cài `react-router-dom` cho web project.

---

### Bước 2: Tạo Page components (10 phút)

```bash
mkdir src/pages
```

**Tạo 4 page components:**

```jsx
// src/pages/Home.jsx
function Home() {
    return (
        <section className="page home-page">
            <h1>Welcome to My Portfolio</h1>
            <p>Full-Stack Developer & UI Designer</p>
        </section>
    );
}
export default Home;
```

```jsx
// src/pages/Projects.jsx
function Projects() {
    return (
        <section className="page projects-page">
            <h1>My Projects</h1>
            <p>See my latest work</p>
        </section>
    );
}
export default Projects;
```

```jsx
// src/pages/Shop.jsx
function Shop() {
    return (
        <section className="page shop-page">
            <h1>Shop</h1>
            <p>Browse our products</p>
        </section>
    );
}
export default Shop;
```

```jsx
// src/pages/NotFound.jsx
function NotFound() {
    return (
        <section className="page not-found-page">
            <h1>404</h1>
            <p>Page not found</p>
            <a href="/">Go Home</a>
        </section>
    );
}
export default NotFound;
```

---

### Bước 3: Setup Router trong App.jsx (10 phút)

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
```

**Giải thích:**
- `<Router>` → bọc toàn bộ app, cung cấp routing context
- `<Routes>` → container cho tất cả routes
- `<Route path="/" element={<Home />}>` → khi URL = `/` → hiện `<Home />`
- `<Route path="*">` → catch-all → hiện 404 cho mọi URL không khớp

---

### Bước 4: Update Header — Dùng `<Link>` thay vì `<a>` (5 phút)

```jsx
// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">YourName</Link>
                    <div className="nav-links">
                        <NavLink to="/" end>Home</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/shop">Shop</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
```

> **💡 `<Link>` vs `<a>`?** `<a href>` reload toàn bộ trang. `<Link to>` chỉ thay đổi URL và component — nhanh hơn, không mất state. `<NavLink>` tự động thêm class `active` khi URL khớp.

---

### Bước 5: Style NavLink active state (5 phút)

```css
.nav-links a.active {
    color: var(--color-primary);
    font-weight: 600;
    border-bottom: 2px solid var(--color-primary);
}
```

**Test ngay:**
1. Click "Projects" → URL đổi thành `/projects` → hiện Projects page
2. Click logo → quay về Home
3. Gõ `/random-url` → hiện 404 page
4. Kiểm tra: không có page reload (network tab không load lại HTML)

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `useHref may be used only in the context of a <Router>` | Thiếu `<Router>` bọc App | Phải bọc `<Router>` quanh toàn bộ `<Routes>` |
| NavLink không có class `active` | Dùng `<Link>` thay vì `<NavLink>` | Phải dùng `<NavLink>` để tự động active |
| 404 hiện mọi lúc | Route `*` đặt trước routes khác | Đặt `<Route path="*">` ở CUỐI cùng |
| Page không thay đổi khi click | Dùng `<a href>` thay vì `<Link to>` | Phải dùng `<Link to>` hoặc `<NavLink to>` |
| `end` prop không hoạt động | Thiếu `end` trên NavLink "/" | Phải có `end` trên NavLink "/" để "/" không active mọi lúc |

---

## 🔍 DevTools Tips

1. **Xem routing:** React DevTools → tab "Components" → xem Router tree
2. **Test URL:** Gõ trực tiếp URL trong address bar → xem page có render không
3. **History:** Click Back/Forward button của browser → xem routing có hoạt động không

---

## ✅ Success Criteria

- [ ] React Router installed
- [ ] 4 page components created
- [ ] Routes configured in App.jsx
- [ ] Navigation with NavLink
- [ ] Active link styling works
- [ ] 404 fallback route

---

**← [ Quay lại Session 5](../README.md)**