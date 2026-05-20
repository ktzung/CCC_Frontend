# Solution 4.1 — React Components Setup

## Complete Vite + React Project Structure

### Project Setup Commands

```bash
# Create new Vite project
npm create vite@latest session_04_portfolio_react -- --template react

# Navigate to project
cd session_04_portfolio_react

# Install dependencies
npm install

# Install Bootstrap for styling
npm install bootstrap bootstrap-icons

# Start development server
npm run dev
```

### src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### src/App.jsx

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
  )
}

export default App
```

### src/components/Header.jsx

```jsx
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="header sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#home">
            YourName
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              {navLinks.map(link => (
                <li key={link.href} className="nav-item">
                  <a
                    className="nav-link"
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
```

### src/components/Hero.jsx

```jsx
function Hero() {
  return (
    <section id="home" className="hero vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <h1 className="display-1 fw-bold text-white mb-4">
          Hi, I'm <span className="text-warning">Your Name</span>
        </h1>
        <p className="lead text-white opacity-75 mb-5">
          Full-Stack Developer | UI Designer | Problem Solver
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <a href="#portfolio" className="btn btn-light btn-lg px-4 fw-semibold">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline-light btn-lg px-4">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
```

### src/components/About.jsx

```jsx
function About() {
  return (
    <section id="about" className="py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 text-center">
            <img
              src="https://via.placeholder.com/400x400/6366f1/ffffff?text=Photo"
              alt="Your Photo"
              className="img-fluid rounded-circle p-2 border border-4 border-primary shadow"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="col-lg-7">
            <h2 className="display-6 fw-bold mb-4">About Me</h2>
            <p className="lead text-muted mb-4">
              I'm a passionate developer with 3+ years of experience building web applications that make a difference.
            </p>
            <p className="text-secondary">
              Specialized in Frontend development with React and Vue. Also experienced in Backend with Node.js and Python.
              I believe in clean code, user-centered design, and continuous learning.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#portfolio" className="btn btn-primary">
                View Portfolio
              </a>
              <a href="#contact" className="btn btn-outline-primary">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
```

### src/components/Skills.jsx

```jsx
import { skills } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="py-5 bg-light">
      <div className="container py-5">
        <h2 className="display-6 fw-bold text-center mb-5">My Skills</h2>
        <div className="row g-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {skills.map((skill, index) => (
            <div key={index} className="col-12">
              <div className="skill-item p-3 bg-white rounded-3 shadow-sm">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">{skill.name}</span>
                  <span className="text-primary fw-bold">{skill.level}%</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${skill.level}%` }}
                    aria-valuenow={skill.level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
```

### src/components/Portfolio.jsx

```jsx
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

function Portfolio() {
  return (
    <section id="portfolio" className="py-5">
      <div className="container py-5">
        <h2 className="display-6 fw-bold text-center mb-5">My Portfolio</h2>
        <div className="row g-4 justify-content-center">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              image={project.image}
              description={project.description}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
```

### src/components/ProjectCard.jsx

```jsx
function ProjectCard({ title, category, image, description, tags }) {
  const categoryColors = {
    web: 'primary',
    mobile: 'success',
    design: 'warning',
  }

  const badgeClass = `badge bg-${categoryColors[category] || 'secondary'}`

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 border-0 shadow-sm overflow-hidden project-card">
        <div className="position-relative">
          <img src={image} className="card-img-top" alt={title} />
          <div className="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <button className="btn btn-light">
              <i className="bi bi-zoom-in me-2"></i>View
            </button>
          </div>
        </div>
        <div className="card-body">
          <span className={badgeClass}>{category}</span>
          <h5 className="card-title fw-bold mt-2 mb-2">{title}</h5>
          <p className="card-text text-muted small mb-3">{description}</p>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
```

### src/components/Contact.jsx

```jsx
import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container py-5">
        <h2 className="display-6 fw-bold text-center mb-5">Get In Touch</h2>

        {submitted && (
          <div className="alert alert-success text-center mb-4" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            Message sent successfully!
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="subject" className="form-label fw-semibold">
                        Subject
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                      />
                      {errors.subject && (
                        <div className="invalid-feedback">{errors.subject}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label fw-semibold">
                        Message
                      </label>
                      <textarea
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary btn-lg w-100">
                        <i className="bi bi-send me-2"></i>Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
```

### src/components/Footer.jsx

```jsx
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span className="fw-bold text-primary">YourName</span>
            <span className="text-white-50 ms-2">&copy; {currentYear}</span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <a href="#" className="text-white-50 fs-5">
                <i className="bi bi-github"></i>
              </a>
              <a href="#" className="text-white-50 fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-white-50 fs-5">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

### src/data/skills.js

```javascript
export const skills = [
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 85, category: 'frontend' },
  { name: 'React', level: 80, category: 'frontend' },
  { name: 'Vue.js', level: 75, category: 'frontend' },
  { name: 'Node.js', level: 70, category: 'backend' },
]
```

### src/data/projects.js

```javascript
export const projects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    category: 'web',
    image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=E-Commerce',
    description: 'Full-stack e-commerce with React and Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Health Tracker App',
    category: 'mobile',
    image: 'https://via.placeholder.com/400x300/14b8a6/ffffff?text=Health+App',
    description: 'Mobile app for tracking fitness goals',
    tags: ['React Native', 'Firebase'],
  },
  {
    id: 3,
    title: 'Dashboard Admin',
    category: 'web',
    image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Dashboard',
    description: 'Admin dashboard with analytics visualization',
    tags: ['Vue.js', 'Chart.js'],
  },
  {
    id: 4,
    title: 'Portfolio Design',
    category: 'design',
    image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Portfolio',
    description: 'Personal portfolio design system',
    tags: ['Figma', 'CSS'],
  },
  {
    id: 5,
    title: 'Social Media App',
    category: 'mobile',
    image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Social+App',
    description: 'Cross-platform social media application',
    tags: ['Flutter', 'Firebase'],
  },
  {
    id: 6,
    title: 'Brand Identity',
    category: 'design',
    image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Brand',
    description: 'Complete branding package for startup',
    tags: ['Logo Design', 'Branding'],
  },
]
```

### src/index.css

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-dark: #0f172a;
  --color-light: #f8fafc;
  --color-text: #334155;
  --color-text-light: #64748b;
  --color-border: #e2e8f0;
  --color-white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--color-text);
  background-color: var(--color-white);
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}

.hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

.project-card .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.portfolio-overlay {
  background: rgba(99, 102, 241, 0.85);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card .card:hover .portfolio-overlay {
  opacity: 1;
}

.progress-bar {
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
}

.nav-link {
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}
```

---

## Commit Message Examples

```bash
git commit -m "[SETUP] Initialize Vite React project

- Create project with vite --template react
- Install Bootstrap for styling
- Set up project structure with components folder"

git commit -m "[COMPONENT] Create Header with mobile menu

- Add sticky navbar with brand logo
- Implement mobile toggle for nav links
- Use useState for menu open/close"

git commit -m "[COMPONENT] Build Hero and About sections

- Create full-viewport hero with gradient
- Style name highlight with warning color
- Build responsive 2-column about layout"

git commit -m "[FEATURE] Add Skills and Portfolio components

- Create skills data with progress bars
- Build ProjectCard component with props
- Import projects data and render grid"

git commit -m "[STATE] Implement Contact form with validation

- Add form state with useState hook
- Implement validation on submit
- Show success alert after submit"
```

---

## Key Learning Points

### 1. Component Structure
```jsx
function ComponentName() {
  return ( // JSX must return single parent
    <div>
      <h1>Title</h1>
    </div>
  )
}
export default ComponentName
```

### 2. Props Passing
```jsx
// Parent
<ProjectCard title="My Project" category="web" />

// Child receives via destructuring
function ProjectCard({ title, category }) {
  return <div>{title} - {category}</div>
}
```

### 3. useState for Component State
```jsx
import { useState } from 'react'

function MyComponent() {
  const [value, setValue] = useState(initialValue)
  return <button onClick={() => setValue(newValue)}>Click</button>
}
```

### 4. Static Data Props Pattern
```javascript
// src/data/skills.js
export const skills = [{ name: 'HTML', level: 95 }]

// Import in component
import { skills } from '../data/skills'
```

---

**← [ Quay lại Exercise 4.1](../exercises/01_react_setup.md)**