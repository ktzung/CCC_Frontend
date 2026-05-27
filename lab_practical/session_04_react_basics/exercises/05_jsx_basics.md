# Exercise 0.5 — JSX: Viết giao diện Portfolio

## 🎬 Bối cảnh

*Minh đã thấy "nỗi đau" khi dùng DOM thuần (Bài 0.0). Giờ bạn ấy muốn viết giao diện Portfolio bằng JSX — cú pháp mà React sử dụng. JSX trông giống HTML nhưng mạnh hơn rất nhiều: chèn được JavaScript, render danh sách, hiển thị có điều kiện.*

> 🔗 **Từ Bài 0.0:** Bạn đã dùng `useState` + `.map()` cho Todo List. Ở bài này, cùng pattern đó sẽ áp dụng cho **Hero section** và **ProjectCard** — 2 component sẽ dùng lại trong Portfolio thật ở [Bài 0.1](./01_react_setup.md).

---

## 📋 Yêu cầu

### Phần A — Portfolio Hero + SkillBadge (10 phút)

Tạo file `portfolio_hero.html` — **không cần cài đặt, dùng CDN**:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Portfolio — Hero & Skills</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 2rem auto; }
        .hero { background: linear-gradient(135deg, #3498db, #2c3e50); color: white;
                text-align: center; padding: 3rem 2rem; border-radius: 12px; margin-bottom: 2rem; }
        .hero h1 { font-size: 2rem; margin-bottom: 0.3rem; }
        .hero p { opacity: 0.85; margin-bottom: 1rem; }
        .hero button { padding: 10px 24px; background: #e74c3c; color: white;
                       border: none; border-radius: 25px; cursor: pointer; }
        .skills { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; }
        .skill-badge { padding: 6px 14px; border-radius: 20px; font-size: 14px;
                       color: white; display: inline-flex; align-items: center; gap: 6px; }
        .skill-badge .level { font-size: 11px; opacity: 0.8; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const skills = [
            { name: 'HTML5', level: 95, color: '#e34c26' },
            { name: 'CSS3', level: 90, color: '#264de4' },
            { name: 'JavaScript', level: 85, color: '#f0db4f' },
            { name: 'React', level: 70, color: '#61dafb' },
            { name: 'Node.js', level: 60, color: '#68a063' },
        ];

        // ============================================
        // TODO 1: Component PortfolioHero
        // - Props: name, title, buttonText
        // - Render hero section với gradient background
        // - Hiển thị: "Xin chào, tôi là {name}", "{title}", nút "{buttonText}"
        // ============================================
        function PortfolioHero({ name, title, buttonText }) {
            // TODO
        }

        // ============================================
        // TODO 2: Component SkillBadge
        // - Props: name, level, color
        // - Render badge với background color từ props
        // - Hiển thị: "name (level%)"
        // ============================================
        function SkillBadge({ name, level, color }) {
            // TODO
        }

        // ============================================
        // TODO 3: Component SkillsSection
        // - Props: skills (mảng)
        // - Render tiêu đề "Kỹ năng" + danh sách SkillBadge
        // - Dùng .map() để render mỗi skill
        // ============================================
        function SkillsSection({ skills }) {
            // TODO
        }

        // ============================================
        // TODO 4: Component App — Compose tất cả
        // ============================================
        function App() {
            return (
                <div>
                    {/* TODO: Render PortfolioHero với name, title, buttonText */}
                    {/* TODO: Render SkillsSection với skills data */}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
```

---

### Phần B — ProjectCard + Conditional Rendering (15 phút)

Tạo file `portfolio_projects.html` — **component sẽ dùng lại trong Bài 0.1**:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Portfolio — Project Cards</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 2rem auto; }
        .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.2rem; margin-top: 1rem; }
        .project-card { border: 1px solid #ddd; border-radius: 10px; overflow: hidden;
                        transition: transform 0.3s; background: white; }
        .project-card:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
        .project-card img { width: 100%; height: 150px; object-fit: cover; }
        .project-card .info { padding: 0.8rem; }
        .project-card h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .project-card .category { font-size: 12px; padding: 2px 8px; border-radius: 10px;
                                   color: white; display: inline-block; margin-bottom: 0.4rem; }
        .cat-web { background: #3498db; }
        .cat-mobile { background: #27ae60; }
        .cat-design { background: #9b59b6; }
        .project-card .desc { font-size: 13px; color: #666; }
        .project-card .tags { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 0.5rem; }
        .project-card .tag { font-size: 11px; background: #f0f0f0; padding: 2px 8px; border-radius: 10px; }
        .project-card .featured { position: absolute; top: 8px; right: 8px; background: #e74c3c;
                                   color: white; font-size: 11px; padding: 2px 8px; border-radius: 10px; }
        .project-card { position: relative; }
        .empty-state { text-align: center; padding: 3rem; color: #999; }
        .stats { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; }
        .stats span { padding: 8px 16px; background: #ecf0f1; border-radius: 8px; font-size: 14px; }
    </style>
</head>
<body>
    <h1>🛠️ Dự án của Minh</h1>
    <div id="root"></div>

    <script type="text/babel">
        const projects = [
            { id: 1, title: 'Portfolio Website', category: 'web',
              image: 'https://picsum.photos/300/200?random=1',
              description: 'Trang cá nhân xây dựng bằng HTML/CSS',
              tags: ['HTML', 'CSS'], featured: true },
            { id: 2, title: 'Todo App', category: 'web',
              image: 'https://picsum.photos/300/200?random=2',
              description: 'Ứng dụng quản lý công việc',
              tags: ['JavaScript', 'DOM'], featured: false },
            { id: 3, title: 'Weather App', category: 'mobile',
              image: 'https://picsum.photos/300/200?random=3',
              description: 'Xem thời tiết theo vị trí',
              tags: ['React', 'API'], featured: false },
            { id: 4, title: 'Poster Design', category: 'design',
              image: 'https://picsum.photos/300/200?random=4',
              description: 'Thiết kế poster sự kiện',
              tags: ['Figma', 'Photoshop'], featured: false },
        ];

        // ============================================
        // TODO 1: Component CategoryBadge
        // - Props: category (string)
        // - Dùng ternary để chọn class: cat-web, cat-mobile, cat-design
        // - Hiển thị tên category viết hoa chữ cái đầu
        // ============================================
        function CategoryBadge({ category }) {
            // TODO
        }

        // ============================================
        // TODO 2: Component ProjectCard
        // - Props: title, category, image, description, tags, featured
        // - Hiển thị: image, CategoryBadge, title, description, tags
        // - Nếu featured === true: hiển thị badge "⭐ Nổi bật" ở góc phải
        // - Dùng conditional rendering cho featured badge
        // ============================================
        function ProjectCard({ title, category, image, description, tags, featured }) {
            // TODO
        }

        // ============================================
        // TODO 3: Component ProjectList
        // - Props: projects (mảng)
        // - Nếu mảng rỗng: hiện "Chưa có dự án nào"
        // - Nếu có: render grid ProjectCard + thống kê số lượng
        // - Dùng .map() render ProjectCard
        // ============================================
        function ProjectList({ projects }) {
            // TODO
        }

        // ============================================
        // TODO 4: Component App
        // ============================================
        function App() {
            return (
                // TODO: Render ProjectList với projects
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
```

### 🎯 Hoàn thành tất cả TODO trong cả 2 file

---

## 💡 Ghi chú quan trọng về JSX

### 1. JSX không phải HTML

| HTML thuần | JSX |
|------------|-----|
| `class="box"` | `className="box"` |
| `for="input"` | `htmlFor="input"` |
| `onclick="fn()"` | `onClick={fn}` |
| `<!-- comment -->` | `{/* comment */}` |

### 2. Chèn JavaScript trong JSX

```jsx
// ✅ Dùng {} để chèn expression
<h1>Hello {name}</h1>
<p>Tổng: {a + b}</p>
<div>{isLoggedIn ? 'Welcome' : 'Please login'}</div>

// ❌ Không dùng statement
<div>{if (isLoggedIn) { return 'Hi' }}</div>
```

### 3. Conditional Rendering

```jsx
// Cách 1: Ternary (phổ biến nhất)
{isLoading ? <Spinner /> : <Content />}

// Cách 2: Logical AND
{error && <ErrorMessage text={error} />}

// Cách 3: Early return
if (!user) return <Login />;
return <Dashboard />;
```

### 4. List Rendering

```jsx
// Luôn phải có key prop!
{items.map(item => (
    <li key={item.id}>{item.name}</li>
))}
```

---

## ✅ Tiêu chí đạt bài

### Phần A (`portfolio_hero.html`)
- [ ] `PortfolioHero` hiển thị name, title, buttonText từ props
- [ ] `SkillBadge` hiển thị tên + level + màu từ props
- [ ] `SkillsSection` dùng `.map()` render danh sách SkillBadge
- [ ] `App` compose PortfolioHero + SkillsSection

### Phần B (`portfolio_projects.html`)
- [ ] `CategoryBadge` hiển thị màu theo category (conditional rendering)
- [ ] `ProjectCard` hiển thị đầy đủ: image, badge, title, desc, tags
- [ ] Featured badge chỉ hiện khi `featured === true`
- [ ] `ProjectList` dùng `.map()` render ProjectCard
- [ ] Xử lý mảng rỗng (empty state)

---

## 🔑 Gợi ý

<details>
<summary>Click để xem gợi ý CategoryBadge</summary>

```jsx
function CategoryBadge({ category }) {
    const catClass = category === 'web' ? 'cat-web'
                   : category === 'mobile' ? 'cat-mobile' : 'cat-design';
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    return <span className={`category ${catClass}`}>{label}</span>;
}
```
</details>

<details>
<summary>Click để xem gợi ý ProjectCard</summary>

```jsx
function ProjectCard({ title, category, image, description, tags, featured }) {
    return (
        <div className="project-card">
            <img src={image} alt={title} />
            {featured && <span className="featured">⭐ Nổi bật</span>}
            <div className="info">
                <CategoryBadge category={category} />
                <h3>{title}</h3>
                <p className="desc">{description}</p>
                <div className="tags">
                    {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
            </div>
        </div>
    );
}
```
</details>

---

## 📝 Ghi chú cho giảng viên

> **Bài này dạy 3 kỹ năng JSX cốt lõi:** Props passing (Phần A), Conditional rendering (featured badge), List rendering (.map()). Cả 3 sẽ xuất hiện liên tục trong các bài sau.
>
> **Câu hỏi thảo luận:** "Tại sao `CategoryBadge` tách ra thành component riêng, mà `tags` lại render inline? Khi nào nên tách?"

---

**← [Bài 0.0 — DOM vs React](./00_vanilla_vs_react.md) | → [Bài 0.6 — Component Extraction](./06_component_extraction.md)**
