# Solution — Bài 0.5: JSX: Viết giao diện Portfolio

## Phần A — portfolio_hero.html (Solution)

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

        function PortfolioHero({ name, title, buttonText }) {
            return (
                <section className="hero">
                    <h1>👋 Xin chào, tôi là {name}</h1>
                    <p>{title}</p>
                    <button>{buttonText}</button>
                </section>
            );
        }

        function SkillBadge({ name, level, color }) {
            return (
                <span className="skill-badge" style={{ backgroundColor: color }}>
                    {name} <span className="level">({level}%)</span>
                </span>
            );
        }

        function SkillsSection({ skills }) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h2>🛠️ Kỹ năng</h2>
                    <div className="skills">
                        {skills.map(skill => (
                            <SkillBadge key={skill.name} {...skill} />
                        ))}
                    </div>
                </div>
            );
        }

        function App() {
            return (
                <div>
                    <PortfolioHero
                        name="Minh"
                        title="Sinh viên CSE391 — Lập trình Web cơ bản"
                        buttonText="Xem Portfolio"
                    />
                    <SkillsSection skills={skills} />
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

## Phần B — portfolio_projects.html (Solution)

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
                        transition: transform 0.3s; background: white; position: relative; }
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

        function CategoryBadge({ category }) {
            const catClass = category === 'web' ? 'cat-web'
                           : category === 'mobile' ? 'cat-mobile' : 'cat-design';
            const label = category.charAt(0).toUpperCase() + category.slice(1);
            return <span className={`category ${catClass}`}>{label}</span>;
        }

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

        function ProjectList({ projects }) {
            if (projects.length === 0) {
                return <p className="empty-state">Chưa có dự án nào</p>;
            }

            const webCount = projects.filter(p => p.category === 'web').length;
            const mobileCount = projects.filter(p => p.category === 'mobile').length;
            const designCount = projects.filter(p => p.category === 'design').length;

            return (
                <div>
                    <div className="project-grid">
                        {projects.map(project => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </div>
                    <div className="stats">
                        <span>🌐 Web: {webCount}</span>
                        <span>📱 Mobile: {mobileCount}</span>
                        <span>🎨 Design: {designCount}</span>
                    </div>
                </div>
            );
        }

        function App() {
            return <ProjectList projects={projects} />;
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
```

---

## Giải thích key concepts

### Props với destructuring
```jsx
// Component nhận từng prop riêng lẻ
function SkillBadge({ name, level, color }) { ... }

// Hoặc dùng spread operator khi tên prop = tên field
<SkillBadge key={skill.name} {...skill} />
```

### Conditional Rendering
```jsx
// Logical AND — chỉ render khi condition đúng
{featured && <span className="featured">⭐ Nổi bật</span>}

// Ternary — chọn 1 trong 2
const catClass = category === 'web' ? 'cat-web' : 'cat-design';
```

### List Rendering
```jsx
// .map() trả về array of JSX, luôn cần key prop
{skills.map(skill => <SkillBadge key={skill.name} {...skill} />)}
```

### Kết nối với Bài 0.1
- `PortfolioHero` → sẽ trở thành `Hero.jsx` trong Vite project
- `ProjectCard` → sẽ trở thành `ProjectCard.jsx`, dùng lại ở Portfolio section
- `CategoryBadge` → sẽ dùng lại ở filter functionality (Bài 0.3)
