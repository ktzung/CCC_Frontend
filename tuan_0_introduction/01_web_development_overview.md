# 📘 TUẦN 0 - BÀI 01
# **TỔNG QUAN VỀ PHÁT TRIỂN ỨNG DỤNG WEB**

Trong bài này, bạn sẽ được giới thiệu tổng quan về thế giới phát triển ứng dụng web, từ lịch sử phát triển đến các loại ứng dụng web hiện đại và vai trò của một Web Developer.

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Web Development là gì và tại sao nó quan trọng
- Nắm được lịch sử phát triển của Web
- **Phân biệt rõ Website và Web Application** (Câu hỏi thường gặp)
- Phân biệt được các loại ứng dụng web khác nhau
- Hiểu vai trò và trách nhiệm của Web Developer
- Có cái nhìn tổng quan về hệ sinh thái Web Development

---

## 1. **WEB DEVELOPMENT LÀ GÌ?**

### 1.1. Định nghĩa

**Web Development** (Phát triển ứng dụng web) là quá trình xây dựng, tạo ra và duy trì các website và ứng dụng web. Nó bao gồm:

- **Web Design:** Thiết kế giao diện người dùng (UI/UX)
- **Frontend Development:** Xây dựng phần giao diện mà người dùng nhìn thấy
- **Backend Development:** Xây dựng phần logic và xử lý dữ liệu phía server
- **Database Management:** Quản lý và lưu trữ dữ liệu
- **DevOps:** Triển khai và vận hành ứng dụng

### 1.2. Tại sao Web Development quan trọng?

✅ **Nhu cầu cao:** Mọi doanh nghiệp đều cần website/ứng dụng web
✅ **Cơ hội việc làm:** Nhu cầu tuyển dụng Web Developer rất lớn
✅ **Lương cao:** Web Developer có mức lương cạnh tranh
✅ **Linh hoạt:** Có thể làm việc remote, freelance
✅ **Sáng tạo:** Tạo ra sản phẩm có thể tiếp cận hàng triệu người
✅ **Học tập liên tục:** Công nghệ luôn thay đổi, không bao giờ nhàm chán

---

## 2. **LỊCH SỬ PHÁT TRIỂN WEB**

### 2.1. Web 1.0 (1990s - 2000s)

**Đặc điểm:**
- **Static Websites:** Trang web tĩnh, chỉ hiển thị thông tin
- **HTML thuần:** Chủ yếu là HTML, ít CSS và JavaScript
- **One-way communication:** Người dùng chỉ đọc, không tương tác
- **Ví dụ:** Trang web giới thiệu công ty, blog cá nhân đơn giản

```
User → Request → Server → Static HTML → User
```

### 2.2. Web 2.0 (2000s - 2010s)

**Đặc điểm:**
- **Dynamic Websites:** Trang web động, tương tác với người dùng
- **User-generated content:** Người dùng có thể tạo và chia sẻ nội dung
- **Social Media:** Facebook, Twitter, YouTube ra đời
- **AJAX:** Tải dữ liệu không cần reload trang
- **Ví dụ:** Facebook, Gmail, Wikipedia

```
User ↔ Interactive Website ↔ Database ↔ Server
```

### 2.3. Web 3.0 (2010s - Hiện tại)

**Đặc điểm:**
- **Single Page Applications (SPA):** Ứng dụng web như ứng dụng desktop
- **Mobile-first:** Ưu tiên thiết kế cho mobile
- **Progressive Web Apps (PWA):** Web app hoạt động như native app
- **Real-time:** WebSocket, real-time updates
- **Cloud & Serverless:** Deploy lên cloud, không cần server riêng
- **Ví dụ:** Gmail, Google Docs, Netflix, Spotify

### 2.4. Web 4.0 (Tương lai)

**Xu hướng:**
- **AI/ML Integration:** Trí tuệ nhân tạo tích hợp vào web
- **Voice & AR/VR:** Điều khiển bằng giọng nói, thực tế ảo
- **Blockchain & Web3:** Decentralized applications
- **IoT Integration:** Kết nối với thiết bị thông minh

---

## 3. **PHÂN BIỆT WEBSITE VÀ ỨNG DỤNG WEB (WEB APPLICATION)**

Đây là một câu hỏi rất phổ biến và quan trọng. Hãy cùng tìm hiểu sự khác biệt giữa Website và Web Application.

### 3.1. Website là gì?

**Website** là tập hợp các trang web tĩnh hoặc động được liên kết với nhau, chủ yếu để **hiển thị thông tin**.

**Đặc điểm:**
- ✅ **Mục đích chính:** Hiển thị thông tin, nội dung
- ✅ **Tương tác:** Ít tương tác, chủ yếu là đọc và điều hướng
- ✅ **Dữ liệu:** Ít hoặc không có xử lý dữ liệu phức tạp
- ✅ **Cập nhật:** Nội dung được cập nhật thủ công hoặc qua CMS đơn giản
- ✅ **Ví dụ:** Trang giới thiệu công ty, blog, portfolio, landing page

**Ví dụ Website:**
```
Trang giới thiệu công ty
├── Trang chủ (Home)
├── Giới thiệu (About)
├── Sản phẩm (Products) - chỉ hiển thị
├── Liên hệ (Contact) - form đơn giản
└── Tin tức (News) - danh sách bài viết
```

### 3.2. Web Application (Ứng dụng web) là gì?

**Web Application** là một ứng dụng phần mềm chạy trên trình duyệt, có **chức năng tương tác phức tạp** và xử lý dữ liệu.

**Đặc điểm:**
- ✅ **Mục đích chính:** Thực hiện các tác vụ, xử lý dữ liệu
- ✅ **Tương tác:** Tương tác cao, người dùng thao tác nhiều
- ✅ **Dữ liệu:** Xử lý dữ liệu phức tạp, có database
- ✅ **Logic:** Có business logic phức tạp
- ✅ **Ví dụ:** Gmail, Facebook, Google Docs, E-commerce, Banking apps

**Ví dụ Web Application:**
```
E-commerce Application
├── Đăng nhập/Đăng ký (Authentication)
├── Quản lý sản phẩm (CRUD operations)
├── Giỏ hàng (Shopping cart logic)
├── Thanh toán (Payment processing)
├── Quản lý đơn hàng (Order management)
└── Dashboard admin (Complex data visualization)
```

### 3.3. So sánh chi tiết

| Tiêu chí | Website | Web Application |
|----------|---------|-----------------|
| **Mục đích** | Hiển thị thông tin | Thực hiện tác vụ, xử lý dữ liệu |
| **Tương tác** | Ít, chủ yếu đọc | Nhiều, người dùng thao tác |
| **Dữ liệu** | Ít hoặc không có | Nhiều, phức tạp, có database |
| **Backend** | Không cần hoặc đơn giản | Cần, phức tạp |
| **Authentication** | Thường không có | Thường có (login, user accounts) |
| **Business Logic** | Ít hoặc không có | Phức tạp |
| **Cập nhật nội dung** | Thủ công hoặc CMS đơn giản | Tự động, real-time |
| **Performance** | Load nhanh, đơn giản | Có thể phức tạp hơn |
| **Ví dụ** | Blog, Portfolio, Landing page | Gmail, Facebook, E-commerce |

### 3.4. Ranh giới mờ nhạt

Trong thực tế, ranh giới giữa Website và Web Application đang ngày càng mờ nhạt:

**Website hiện đại có thể có:**
- Form liên hệ (tương tác cơ bản)
- Search functionality
- Comment system
- Newsletter subscription

**Web Application có thể có:**
- Phần hiển thị thông tin (như website)
- Blog section
- Documentation pages

**Ví dụ:**
- **Facebook:** Vừa là Website (hiển thị thông tin) vừa là Web Application (tương tác, xử lý dữ liệu)
- **Amazon:** Vừa là Website (product listings) vừa là Web Application (shopping cart, checkout)

### 3.5. Khi nào gọi là Website? Khi nào gọi là Web Application?

**Gọi là Website khi:**
- ✅ Mục đích chính là hiển thị thông tin
- ✅ Người dùng chủ yếu đọc, ít tương tác
- ✅ Không có xử lý dữ liệu phức tạp
- ✅ Không cần authentication
- ✅ Ví dụ: Blog, Portfolio, Company website, News site

**Gọi là Web Application khi:**
- ✅ Mục đích chính là thực hiện tác vụ
- ✅ Người dùng tương tác nhiều, thao tác với dữ liệu
- ✅ Có xử lý dữ liệu phức tạp, có database
- ✅ Có authentication, user accounts
- ✅ Có business logic phức tạp
- ✅ Ví dụ: Gmail, Google Docs, E-commerce, Banking, Social media

### 3.6. Ví dụ cụ thể

#### Website Examples:

**1. Portfolio Website:**
```
- Hiển thị thông tin cá nhân
- Showcase projects
- Contact form (đơn giản)
- Không có database
- Không có authentication
→ Đây là WEBSITE
```

**2. Company Website:**
```
- Giới thiệu công ty
- Danh sách sản phẩm/dịch vụ
- Form liên hệ
- Blog section
- Không có xử lý dữ liệu phức tạp
→ Đây là WEBSITE
```

#### Web Application Examples:

**1. E-commerce Platform:**
```
- User authentication (login/register)
- Product management (CRUD)
- Shopping cart
- Payment processing
- Order management
- Inventory tracking
- Admin dashboard
→ Đây là WEB APPLICATION
```

**2. Social Media Platform:**
```
- User accounts & profiles
- Post creation & management
- Real-time messaging
- Like, comment, share
- Friend connections
- News feed algorithm
→ Đây là WEB APPLICATION
```

**3. Project Management Tool (Trello, Asana):**
```
- User authentication
- Project & task management
- Real-time collaboration
- File uploads
- Notifications
- Analytics & reporting
→ Đây là WEB APPLICATION
```

### 3.7. Công nghệ sử dụng

**Website thường dùng:**
- HTML, CSS, JavaScript (cơ bản)
- CMS (WordPress, Joomla) cho dynamic content
- Static Site Generators (Jekyll, Hugo, Gatsby)
- Không cần backend phức tạp

**Web Application thường dùng:**
- Frontend Framework (React, Vue, Angular)
- Backend Framework (Node.js, Python, Java)
- Database (MySQL, PostgreSQL, MongoDB)
- APIs (REST, GraphQL)
- Authentication (JWT, OAuth)
- Real-time (WebSocket)

### 3.8. Tóm tắt

**Website:**
- 📄 **Như một cuốn sách điện tử** - Hiển thị thông tin
- 👁️ **Người dùng chủ yếu xem** - Ít tương tác
- 📊 **Dữ liệu đơn giản** - Ít hoặc không có database
- 🔧 **Công nghệ đơn giản** - HTML, CSS, JS cơ bản

**Web Application:**
- 🛠️ **Như một công cụ phần mềm** - Thực hiện tác vụ
- 👆 **Người dùng thao tác nhiều** - Tương tác cao
- 💾 **Dữ liệu phức tạp** - Có database, xử lý logic
- ⚙️ **Công nghệ phức tạp** - Frameworks, Backend, APIs

**Lưu ý:** Trong thực tế, nhiều platform vừa là Website vừa là Web Application. Quan trọng là hiểu được mục đích chính và mức độ tương tác.

---

## 4. **CÁC LOẠI ỨNG DỤNG WEB**

### 3.1. Static Websites

**Đặc điểm:**
- Nội dung cố định, không thay đổi
- Không có database
- Không có backend logic
- Load nhanh, chi phí thấp

**Khi nào dùng:**
- Portfolio cá nhân
- Landing page
- Trang giới thiệu công ty
- Blog tĩnh

**Công nghệ:**
- HTML, CSS, JavaScript
- Static Site Generators (Jekyll, Hugo, Gatsby)

### 3.2. Dynamic Websites

**Đặc điểm:**
- Nội dung thay đổi dựa trên user input
- Có database để lưu trữ dữ liệu
- Có backend xử lý logic
- Tương tác với người dùng

**Khi nào dùng:**
- E-commerce
- Social media
- News websites
- Forums

**Công nghệ:**
- Frontend: HTML, CSS, JavaScript
- Backend: PHP, Python, Node.js, Java
- Database: MySQL, PostgreSQL, MongoDB

### 3.3. Single Page Applications (SPA)

**Đặc điểm:**
- Chỉ load một lần, sau đó chỉ update nội dung
- Nhanh, mượt mà như ứng dụng desktop
- Client-side routing
- API-driven

**Khi nào dùng:**
- Web applications phức tạp
- Dashboard, Admin panels
- Social media apps
- Productivity tools

**Công nghệ:**
- React, Vue.js, Angular
- RESTful APIs hoặc GraphQL

### 3.4. Progressive Web Apps (PWA)

**Đặc điểm:**
- Hoạt động như native app
- Có thể cài đặt trên mobile
- Offline support
- Push notifications

**Khi nào dùng:**
- Mobile-first applications
- Apps cần hoạt động offline
- Apps cần push notifications

**Công nghệ:**
- Service Workers
- Web App Manifest
- React, Vue.js với PWA plugins

### 3.5. E-commerce Platforms

**Đặc điểm:**
- Hệ thống mua bán online
- Payment integration
- Inventory management
- User accounts & orders

**Khi nào dùng:**
- Online stores
- Marketplaces
- Booking systems

**Công nghệ:**
- Shopify, WooCommerce (pre-built)
- Custom: React/Vue + Node.js/Python

---

## 5. **VAI TRÒ CỦA WEB DEVELOPER**

### 4.1. Frontend Developer

**Trách nhiệm:**
- Xây dựng giao diện người dùng (UI)
- Đảm bảo responsive design
- Tối ưu performance
- Tích hợp với APIs

**Kỹ năng cần có:**
- HTML, CSS, JavaScript
- React/Vue/Angular
- UI/UX design basics
- Git, npm/yarn

**Mức lương (Việt Nam):**
- Junior: 8-15 triệu/tháng
- Middle: 15-25 triệu/tháng
- Senior: 25-40+ triệu/tháng

### 4.2. Backend Developer

**Trách nhiệm:**
- Xây dựng server-side logic
- Quản lý database
- API development
- Security & Authentication

**Kỹ năng cần có:**
- Node.js, Python, Java, PHP
- Database (SQL, NoSQL)
- RESTful APIs, GraphQL
- Authentication & Security

**Mức lương (Việt Nam):**
- Junior: 10-18 triệu/tháng
- Middle: 18-30 triệu/tháng
- Senior: 30-50+ triệu/tháng

### 4.3. Full-stack Developer

**Trách nhiệm:**
- Làm cả Frontend và Backend
- Hiểu toàn bộ hệ thống
- Có thể làm việc độc lập

**Kỹ năng cần có:**
- Tất cả kỹ năng của Frontend + Backend
- System design
- DevOps basics

**Mức lương (Việt Nam):**
- Junior: 12-20 triệu/tháng
- Middle: 20-35 triệu/tháng
- Senior: 35-60+ triệu/tháng

### 4.4. DevOps Engineer

**Trách nhiệm:**
- Deploy và maintain applications
- CI/CD pipelines
- Cloud infrastructure
- Monitoring & Logging

**Kỹ năng cần có:**
- Docker, Kubernetes
- AWS, Azure, GCP
- CI/CD tools
- Linux, Scripting

---

## 6. **HỆ SINH THÁI WEB DEVELOPMENT**

### 5.1. Frontend Ecosystem

```
Frontend
├── HTML/CSS/JavaScript (Core)
├── Frameworks
│   ├── React
│   ├── Vue.js
│   └── Angular
├── Build Tools
│   ├── Webpack
│   ├── Vite
│   └── Parcel
├── CSS Frameworks
│   ├── Bootstrap
│   ├── TailwindCSS
│   └── Material-UI
└── Testing
    ├── Jest
    ├── Cypress
    └── Playwright
```

### 5.2. Backend Ecosystem

```
Backend
├── Languages
│   ├── JavaScript (Node.js)
│   ├── Python
│   ├── Java
│   └── Go
├── Frameworks
│   ├── Express.js (Node.js)
│   ├── Django/Flask (Python)
│   ├── Spring (Java)
│   └── Gin (Go)
├── Databases
│   ├── SQL (MySQL, PostgreSQL)
│   └── NoSQL (MongoDB, Redis)
└── APIs
    ├── REST
    └── GraphQL
```

### 5.3. Full-stack Ecosystem

```
Full-stack
├── MERN Stack
│   ├── MongoDB
│   ├── Express.js
│   ├── React
│   └── Node.js
├── MEAN Stack
│   ├── MongoDB
│   ├── Express.js
│   ├── Angular
│   └── Node.js
└── JAMstack
    ├── JavaScript
    ├── APIs
    └── Markup
```

---

## 7. **QUY TRÌNH PHÁT TRIỂN WEB**

### 6.1. Planning (Lập kế hoạch)

- Xác định mục tiêu và yêu cầu
- Phân tích đối tượng người dùng
- Thiết kế sơ đồ hệ thống
- Lựa chọn công nghệ

### 6.2. Design (Thiết kế)

- Wireframing
- UI/UX Design
- Prototyping
- Design system

### 6.3. Development (Phát triển)

- Setup môi trường
- Frontend development
- Backend development
- Database design
- API integration

### 6.4. Testing (Kiểm thử)

- Unit testing
- Integration testing
- End-to-end testing
- Performance testing
- Security testing

### 6.5. Deployment (Triển khai)

- Build production
- Deploy lên server/cloud
- Domain & SSL setup
- Monitoring setup

### 6.6. Maintenance (Bảo trì)

- Bug fixes
- Feature updates
- Performance optimization
- Security updates

---

## 8. **TỔNG KẾT**

- ✅ **Web Development** là quá trình xây dựng website và ứng dụng web
- ✅ Web đã phát triển qua 3 giai đoạn: Web 1.0 → Web 2.0 → Web 3.0
- ✅ **Website:** Chủ yếu hiển thị thông tin, ít tương tác
- ✅ **Web Application:** Thực hiện tác vụ, xử lý dữ liệu phức tạp, tương tác cao
- ✅ Có nhiều loại ứng dụng web: Static, Dynamic, SPA, PWA
- ✅ Web Developer có nhiều vai trò: Frontend, Backend, Full-stack, DevOps
- ✅ Hệ sinh thái Web Development rất đa dạng và phong phú
- ✅ Quy trình phát triển: Planning → Design → Development → Testing → Deployment → Maintenance

---

**Bài tiếp theo:** [02. Technology Branches](./02_technology_branches.md) - Tìm hiểu về các nhánh công nghệ trong Web Development.
