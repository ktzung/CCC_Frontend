# 📘 TUẦN 0 - BÀI 02
# **CÁC NHÁNH CÔNG NGHỆ TRONG WEB DEVELOPMENT**

Trong bài này, bạn sẽ tìm hiểu về các nhánh công nghệ chính trong phát triển web, từ Frontend đến Backend, Full-stack, và các lĩnh vực liên quan.

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu rõ sự khác biệt giữa Frontend và Backend
- Nắm được các công nghệ chính trong mỗi nhánh
- Hiểu Full-stack Development là gì
- Biết về DevOps, Cloud, và Mobile Development
- Có định hướng chọn nhánh phù hợp với bản thân

---

## 1. **FRONTEND DEVELOPMENT**

### 1.1. Frontend là gì?

**Frontend** (Client-side) là phần giao diện mà người dùng nhìn thấy và tương tác trực tiếp trên trình duyệt.

**Trách nhiệm:**
- Hiển thị giao diện người dùng (UI)
- Xử lý tương tác của người dùng
- Gửi requests đến Backend
- Hiển thị dữ liệu từ Backend

### 1.2. Công nghệ Frontend

#### Core Technologies (Bắt buộc)
- **HTML:** Cấu trúc nội dung
- **CSS:** Styling và layout
- **JavaScript:** Logic và tương tác

#### Frameworks & Libraries
- **React:** Library phổ biến nhất (Facebook)
- **Vue.js:** Progressive framework (Evan You)
- **Angular:** Full-featured framework (Google)
- **Svelte:** Compiler-based framework

#### Build Tools
- **Vite:** Build tool nhanh (khuyên dùng)
- **Webpack:** Module bundler
- **Parcel:** Zero-config bundler

#### CSS Frameworks
- **Bootstrap:** Component-based
- **TailwindCSS:** Utility-first
- **Material-UI:** Google Material Design

### 1.3. Khi nào chọn Frontend?

✅ **Phù hợp nếu bạn:**
- Thích làm việc với giao diện, design
- Quan tâm đến trải nghiệm người dùng (UX)
- Muốn thấy kết quả ngay lập tức
- Thích sáng tạo, visual

❌ **Có thể không phù hợp nếu:**
- Không thích CSS, styling
- Muốn làm việc với logic phức tạp hơn
- Quan tâm đến data processing, algorithms

---

## 2. **BACKEND DEVELOPMENT**

### 2.1. Backend là gì?

**Backend** (Server-side) là phần logic xử lý phía server mà người dùng không nhìn thấy.

**Trách nhiệm:**
- Xử lý business logic
- Quản lý database
- Xác thực và phân quyền
- Xử lý API requests
- Bảo mật dữ liệu

### 2.2. Công nghệ Backend

#### Programming Languages

**JavaScript (Node.js)**
- ✅ Dùng cùng ngôn ngữ với Frontend
- ✅ Ecosystem lớn (npm)
- ✅ Phù hợp cho real-time apps
- ❌ Single-threaded (có thể là hạn chế)

**Python**
- ✅ Dễ học, syntax đơn giản
- ✅ Thư viện phong phú
- ✅ Tốt cho AI/ML, data science
- ❌ Performance chậm hơn một số ngôn ngữ khác

**Java**
- ✅ Performance tốt
- ✅ Enterprise-ready
- ✅ Ecosystem lớn
- ❌ Verbose, phức tạp hơn

**Go**
- ✅ Performance rất tốt
- ✅ Concurrent programming
- ✅ Simple syntax
- ❌ Ecosystem nhỏ hơn

**PHP**
- ✅ Dễ học
- ✅ Phù hợp cho WordPress, CMS
- ✅ Hosting rẻ
- ❌ Ít được dùng cho modern apps

#### Frameworks

**Node.js:**
- Express.js
- Nest.js
- Fastify

**Python:**
- Django (full-featured)
- Flask (lightweight)
- FastAPI (high performance)

**Java:**
- Spring Boot
- Spring MVC

**Go:**
- Gin
- Echo
- Fiber

### 2.3. Database

#### SQL Databases (Relational)
- **MySQL:** Phổ biến nhất
- **PostgreSQL:** Advanced features
- **SQLite:** Lightweight, embedded

#### NoSQL Databases
- **MongoDB:** Document database
- **Redis:** In-memory, caching
- **Firebase:** Real-time database

### 2.4. Khi nào chọn Backend?

✅ **Phù hợp nếu bạn:**
- Thích logic, algorithms
- Quan tâm đến data processing
- Muốn hiểu cách hệ thống hoạt động
- Thích làm việc với databases

❌ **Có thể không phù hợp nếu:**
- Không thích logic phức tạp
- Muốn thấy kết quả visual ngay
- Thích làm việc với design

---

## 3. **FULL-STACK DEVELOPMENT**

### 3.1. Full-stack là gì?

**Full-stack Developer** là người có thể làm cả Frontend và Backend.

**Trách nhiệm:**
- Làm cả Frontend và Backend
- Hiểu toàn bộ hệ thống
- Có thể làm việc độc lập
- Có thể lead một dự án nhỏ

### 3.2. Full-stack Stacks phổ biến

#### MERN Stack
- **M**ongoDB (Database)
- **E**xpress.js (Backend)
- **R**eact (Frontend)
- **N**ode.js (Runtime)

#### MEAN Stack
- **M**ongoDB
- **E**xpress.js
- **A**ngular
- **N**ode.js

#### LAMP Stack
- **L**inux
- **A**pache
- **M**ySQL
- **P**HP

#### Django Stack
- Django (Backend)
- PostgreSQL (Database)
- React/Vue (Frontend)

### 3.3. Khi nào chọn Full-stack?

✅ **Phù hợp nếu bạn:**
- Muốn hiểu toàn bộ hệ thống
- Thích làm việc độc lập
- Muốn có nhiều cơ hội việc làm
- Có thời gian học cả hai

❌ **Có thể không phù hợp nếu:**
- Muốn chuyên sâu một lĩnh vực
- Không có nhiều thời gian học
- Muốn focus vào một phần cụ thể

---

## 4. **DEVOPS & CLOUD**

### 4.1. DevOps là gì?

**DevOps** (Development + Operations) là quy trình tự động hóa việc deploy và maintain applications.

**Trách nhiệm:**
- CI/CD (Continuous Integration/Deployment)
- Infrastructure as Code
- Monitoring & Logging
- Security & Compliance

### 4.2. Công nghệ DevOps

#### Containerization
- **Docker:** Container platform
- **Kubernetes:** Container orchestration

#### Cloud Platforms
- **AWS:** Amazon Web Services
- **Azure:** Microsoft Azure
- **GCP:** Google Cloud Platform
- **Vercel/Netlify:** Frontend hosting

#### CI/CD Tools
- **GitHub Actions**
- **GitLab CI**
- **Jenkins**

### 4.3. Khi nào chọn DevOps?

✅ **Phù hợp nếu bạn:**
- Thích automation
- Quan tâm đến infrastructure
- Muốn deploy và maintain apps
- Thích làm việc với cloud

---

## 5. **MOBILE DEVELOPMENT**

### 5.1. Native vs Cross-platform

#### Native Development
- **iOS:** Swift, Objective-C
- **Android:** Kotlin, Java

#### Cross-platform
- **React Native:** JavaScript, React
- **Flutter:** Dart
- **Ionic:** Web technologies

### 5.2. Web vs Mobile

**Web Development:**
- ✅ Một codebase cho mọi platform
- ✅ Dễ deploy và update
- ✅ Không cần app store approval
- ❌ Performance thấp hơn native
- ❌ Limited access to device features

**Mobile Development:**
- ✅ Performance tốt
- ✅ Full access to device features
- ✅ Better UX
- ❌ Cần maintain nhiều codebases
- ❌ Cần app store approval

---

## 6. **SO SÁNH CÁC NHÁNH**

| Nhánh | Độ khó | Thời gian học | Mức lương | Cơ hội việc làm |
|-------|--------|---------------|-----------|-----------------|
| **Frontend** | ⭐⭐⭐ | 6-12 tháng | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Backend** | ⭐⭐⭐⭐ | 8-18 tháng | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Full-stack** | ⭐⭐⭐⭐⭐ | 12-24 tháng | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **DevOps** | ⭐⭐⭐⭐ | 12-18 tháng | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Mobile** | ⭐⭐⭐⭐ | 8-18 tháng | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 7. **LỘ TRÌNH HỌC TẬP ĐỀ XUẤT**

### 7.1. Frontend Developer Path

```
1. HTML, CSS, JavaScript (3-6 tháng)
2. React/Vue/Angular (3-6 tháng)
3. Build Tools, Testing (2-3 tháng)
4. Advanced Patterns (3-6 tháng)
```

### 7.2. Backend Developer Path

```
1. Programming Language (Python/Node.js) (3-6 tháng)
2. Framework (Django/Express) (3-6 tháng)
3. Database (SQL/NoSQL) (2-3 tháng)
4. APIs, Authentication (2-3 tháng)
```

### 7.3. Full-stack Developer Path

```
1. Frontend Basics (HTML, CSS, JS) (3-6 tháng)
2. Frontend Framework (React/Vue) (3-6 tháng)
3. Backend Language & Framework (3-6 tháng)
4. Database & APIs (2-3 tháng)
5. Full-stack Integration (3-6 tháng)
```

---

## 8. **TỔNG KẾT**

- ✅ **Frontend:** Giao diện người dùng, HTML/CSS/JS, React/Vue/Angular
- ✅ **Backend:** Server logic, Node.js/Python/Java, Databases, APIs
- ✅ **Full-stack:** Cả Frontend và Backend, hiểu toàn bộ hệ thống
- ✅ **DevOps:** Automation, CI/CD, Cloud, Infrastructure
- ✅ **Mobile:** Native hoặc Cross-platform development
- ✅ Chọn nhánh phù hợp với sở thích, khả năng và mục tiêu

---

**Bài tiếp theo:** [03. Current Trends](./03_current_trends.md) - Tìm hiểu về các xu hướng công nghệ hiện tại.
