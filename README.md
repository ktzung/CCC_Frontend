# 🎓 CCC WEB FRONTEND
# **Tài liệu học tập: Nền tảng Phát triển Web**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Vue](https://img.shields.io/badge/Vue.js-3+-4FC08D?logo=vuedotjs&logoColor=white)

---

## 📖 Giới thiệu

Đây là **tài liệu học tập đầy đủ** cho môn **Nền tảng Phát triển Web (CSE391)**, được xây dựng theo phong cách "cầm tay chỉ việc" với:

- ✅ Lý thuyết giải thích dễ hiểu với ví dụ thực tế
- ✅ Code mẫu có chú thích chi tiết từng dòng
- ✅ Bài tập thực hành sau mỗi chương
- ✅ Dự án E-Commerce xuyên suốt
- ✅ Tips & Best Practices
- ✅ Mini test kiểm tra hiểu bài

---

## 🎯 Mục tiêu học tập

Sau khi hoàn thành khóa học, bạn sẽ:

1. **Nắm vững** HTML5 Semantic, CSS3 Modern Layout, và Responsive Design
2. **Thành thạo** JavaScript ES6+, DOM Manipulation, và Async Programming
3. **Xây dựng** Single Page Application với React/Vue
4. **Kết nối** và thao tác dữ liệu qua RESTful API
5. **Phát triển** dự án E-Commerce hoàn chỉnh sẵn sàng đưa vào portfolio

---

## 📚 Cấu trúc tài liệu

### 📘 **TUẦN 0 — GIỚI THIỆU TỔNG QUAN** (Trước khi bắt đầu)

```
tuan_0_introduction/
├── README.md                           ← Hướng dẫn tổng quan
├── 01_web_development_overview.md      ← Tổng quan về Web Development
├── 02_technology_branches.md           ← Các nhánh công nghệ
├── 03_current_trends.md                ← Xu hướng hiện tại
└── 04_technology_selection.md           ← Quy trình lựa chọn công nghệ
```

**Nội dung:**
- Tổng quan về phát triển ứng dụng web
- Lịch sử phát triển Web (Web 1.0 → Web 2.0 → Web 3.0)
- Các loại ứng dụng web (Static, Dynamic, SPA, PWA)
- Vai trò của Web Developer (Frontend, Backend, Full-stack, DevOps)
- Các nhánh công nghệ và khi nào nên chọn
- Xu hướng công nghệ hiện tại (React, Vue, Angular, Node.js, Python, Go)
- Cloud & Serverless, AI/ML, Web3
- Quy trình lựa chọn công nghệ phù hợp
- Lộ trình học tập đề xuất

> [!TIP]
> **Khuyên đọc:** Nếu bạn mới bắt đầu, hãy đọc phần này trước để có cái nhìn tổng quan và định hướng rõ ràng.

---

### 🟦 **TUẦN 1 — HTML5 FUNDAMENTALS** (PART I - Chương 01-07)

```
tuan_1_html5/
├── 01_introduction_html_universe.md      ← Chương 01: Web, HTTP, Browser
├── 02_basic_structure_html.md            ← Chương 02: Cấu trúc HTML cơ bản
├── 03_head_data_html.md                  ← Chương 03: Head & Metadata
├── 04_visible_part_html.md                ← Chương 04: Body & Semantic HTML
├── 05_tables_hyperlinks.md                ← Chương 05: Tables & Links
├── 06_graphics_multimedia.md              ← Chương 06: Images, Video, SVG
└── 07_forms_interactive.md                ← Chương 07: Forms & Input
```

**Nội dung:**
- Hiểu cách Web hoạt động: HTTP, Browser Rendering, Client-Server
- HTML5 Semantic Elements (header, nav, main, article, section, footer)
- Cấu trúc tài liệu HTML (DOCTYPE, html, head, body)
- Tables, Hyperlinks, Graphics & Multimedia
- Forms & Interactive Elements
- Developer Tools

---

### 🟩 **TUẦN 2 — CSS CORE & RESPONSIVE** (PART I - Chương 08-12)

```
tuan_2_css_core/
├── 08_introduction_css.md              ← Chương 08: CSS Introduction
├── 09_css_selectors.md                 ← Chương 09: CSS Selectors
├── 10_inheritance_cascading.md         ← Chương 10: Inheritance & Cascading
├── 11_box_model.md                     ← Chương 11: Box Model
└── 12_css_positioning.md                ← Chương 12: Positioning & Flexbox
```

**Nội dung:**
- CSS Fundamentals: Syntax, Selectors, Inheritance
- Box Model (margin, padding, border, width, height)
- CSS Positioning (static, relative, absolute, fixed, sticky)
- Flexbox Layout patterns
- CSS Variables

---

### 🟩 **TUẦN 3 — CSS ADVANCED** (PART I - Chương 13-16)

```
tuan_3_css_advanced/
├── 13_creating_responsive_layouts.md    ← Chương 13: Responsive Design
├── 14_styling_with_css.md              ← Chương 14: Advanced Styling
├── 15_testing_organizing.md            ← Chương 15: Testing & Organization
└── 16_sass_scss.md                     ← Chương 16: Sass/SCSS Preprocessor
```

**Nội dung:**
- Responsive Design với Media Queries
- CSS Grid Layout
- Advanced Styling Techniques
- CSS Testing & Organization
- Sass/SCSS Preprocessor

---

### 🟩 **TUẦN 4 — CSS FRAMEWORKS** (PART I - Chương 17)

**Lựa chọn 1 trong 2 framework:**

```
tuan_4_css_frameworks/
├── README.md                           ← Hướng dẫn chọn framework
├── bootstrap/                          ← Lựa chọn 1: Bootstrap 5
│   ├── README.md                       ← Lộ trình học Bootstrap
│   ├── 01_getting_started/             ← Bootstrap là gì? Cài đặt
│   ├── 02_grid_system/                 ← Grid System 12 cột
│   ├── 03_components/                  ← Buttons, Cards, Navbar, Forms
│   ├── 04_utilities/                   ← Spacing, Colors, Typography
│   └── 05_customization/               ← Customize với SASS
│
└── tailwindcss/                        ← Lựa chọn 2: TailwindCSS
    ├── README.md                       ← Lộ trình học TailwindCSS
    ├── 01_getting_started/             ← TailwindCSS là gì? Cài đặt
    ├── 02_utilities/                    ← Utility Classes
    ├── 03_components/                  ← Xây dựng Components
    ├── 04_customization/               ← Customize với Config
    └── 05_advanced/                    ← @apply, Plugins, Performance
```

**Lộ trình Bootstrap (5 bài):**
1. Getting Started - Bootstrap là gì? Cài đặt
2. Grid System - Hệ thống lưới 12 cột, Responsive
3. Components - Buttons, Cards, Navbar, Forms, Modals
4. Utilities - Spacing, Colors, Typography utilities
5. Customization - Customize với SASS variables

**Lộ trình TailwindCSS (5 bài):**
1. Getting Started - TailwindCSS là gì? Cài đặt
2. Utilities - Spacing, Colors, Typography, Flexbox, Grid
3. Components - Xây dựng Components từ utilities
4. Customization - Customize với config file
5. Advanced - @apply, Plugins, Performance optimization

> [!NOTE]
> **Lựa chọn Framework:**
> - **Bootstrap:** Nếu bạn thích components có sẵn, thiết kế nhanh → [Xem Bootstrap](./tuan_4_css_frameworks/bootstrap/README.md)
> - **TailwindCSS:** Nếu bạn thích utility classes, thiết kế linh hoạt hơn → [Xem TailwindCSS](./tuan_4_css_frameworks/tailwindcss/README.md)
> 
> Bạn chỉ cần học **1 trong 2**, không cần học cả hai.

---

### 🟨 **TUẦN 5 — JAVASCRIPT FUNDAMENTALS** (PART II - Chương 01-06)

```
tuan_4_javascript_basics/
├── 01_basics_introduction.md           ← Chương 01: JS Introduction
├── 02_getting_started.md              ← Chương 02: Getting Started
├── 03_data_types_variables.md         ← Chương 03: Data Types & Variables
├── 04_control_structures.md            ← Chương 04: Control Structures
├── 05_functions.md                     ← Chương 05: Functions & Scope
└── 06_arrays_objects.md                ← Chương 06: Arrays & Objects
```

**Nội dung:**
- JavaScript Basics: History, Applications
- Variables: let, const, var
- Data Types: Numbers, Strings, Booleans, Objects
- Control Structures: if/else, loops
- Functions: Definition, Scope, Closures
- Arrays & Objects: Methods, Manipulation

---

### 🟨 **TUẦN 6 — JAVASCRIPT DOM & ASYNC** (PART II - Chương 19-21)

```
tuan_5_javascript_dom_async/
├── 19_dom_manipulation.md               ← Chương 19: DOM Manipulation
├── 20_ajax_async.md                     ← Chương 20: Ajax & Async
└── 21_professional_dev_process.md      ← Chương 21: Professional Dev Process
```

**Nội dung:**
- DOM Selection & Manipulation (querySelector, querySelectorAll)
- Event Handling & Delegation
- Modifying Content & Styles dynamically
- Async/Await vs Promises
- Fetch API: GET, POST, PUT, DELETE
- Error Handling & Loading States
- Professional Development Process (Git, Testing, Automation)

---

### ⚛️ **TUẦN 7 — JAVASCRIPT FRAMEWORKS** (PART III - Lựa chọn 1 trong 3)

**Lựa chọn 1 trong 3 framework:**

```
tuan_6_js_frameworks/
├── README.md                           ← Hướng dẫn chọn framework
│
├── react/                              ← Lựa chọn 1: React
│   ├── README.md                       ← Lộ trình học React
│   ├── 01_spa_architecture/            ← SPA Architecture & React Fundamentals
│   ├── 02_getting_started/            ← Getting Started & Basic Principles
│   ├── 03_basic_principles/
│   ├── 04_hooks/                       ← Hooks API, Lifecycle
│   ├── 05_ecosystem/                   ← TypeScript, Styling, Testing
│   ├── 06_routing_state/               ← React Router, Redux
│   └── 07_advanced_patterns/          ← GraphQL, Next.js, React Native
│
├── vue/                                ← Lựa chọn 2: Vue.js
│   ├── README.md                       ← Lộ trình học Vue.js
│   ├── 01_fundamentals/                ← Module 1: Fundamentals (4 bài)
│   │   ├── 01_getting_started.md       ← Giới thiệu Vue.js
│   │   ├── 02_development_environment.md ← Setup với Vite
│   │   ├── 03_template_syntax_directives.md ← Template & Directives
│   │   └── 04_event_handling.md        ← Event Handling
│   ├── 02_components/                   ← Module 2: Components (4 bài)
│   │   ├── 05_components.md             ← Single-File Components
│   │   ├── 06_component_communication.md ← Props & Events
│   │   ├── 07_methods_computed_properties.md ← Methods, Computed, Watchers
│   │   └── 08_lifecycle_hooks.md       ← Lifecycle Hooks
│   ├── 03_routing_state/                ← Module 3: Routing & State (3 bài)
│   │   ├── 09_routing.md               ← Vue Router
│   │   ├── 10_state_management.md      ← Pinia State Management
│   │   └── 11_advanced_javascript.md    ← ES6+ Features
│   └── 04_advanced/                     ← Module 4: Advanced (4 bài)
│       ├── 12_api_integration.md       ← API Integration
│       ├── 13_form_handling.md         ← Form Handling & Validation
│       ├── 14_authentication_authorization.md ← Auth & Authorization
│       └── 15_testing_deployment.md    ← Testing & Deployment
│
└── angular/                            ← Lựa chọn 3: Angular
    ├── README.md                       ← Lộ trình học Angular
    ├── 01_getting_started/             ← Getting Started
    │   └── 01_getting_started.md       ← Giới thiệu Angular & Setup
    ├── 02_components/                   ← Components & Templates
    │   └── 02_components_templates.md   ← Components, Data Binding, Directives
    ├── 03_typescript/                   ← TypeScript in Angular
    │   └── 03_typescript_angular.md     ← Types, Interfaces, Classes, Generics
    ├── 04_services/                     ← Services & Dependency Injection
    │   └── 04_services_dependency_injection.md ← Services, DI System
    ├── 05_routing/                      ← Routing
    │   └── 05_routing.md                ← Angular Router
    ├── 06_forms/                        ← Forms
    │   └── 06_forms.md                  ← Template-driven & Reactive Forms
    ├── 07_http/                         ← HTTP Client
    │   └── 07_http_client.md            ← API Integration
    ├── 08_rxjs/                         ← RxJS
    │   └── 08_rxjs.md                   ← Reactive Programming
    └── 09_advanced/                     ← Advanced Topics
        └── 09_advanced.md               ← Change Detection, Lazy Loading, Testing
```

**Lộ trình React (Đầy đủ):**
- SPA Architecture & React Fundamentals
- Getting Started & Basic Principles
- Hooks API, Lifecycle, Class Components
- TypeScript, Styling, Testing, Forms
- React Router & Redux State Management
- Advanced Patterns (GraphQL, Next.js, React Native)

**Lộ trình Vue.js (15 bài học):**
- **Module 1 - Fundamentals (4 bài):** Getting Started, Development Environment, Template Syntax, Event Handling
- **Module 2 - Components (4 bài):** Components, Communication, Methods/Computed, Lifecycle Hooks
- **Module 3 - Routing & State (3 bài):** Vue Router, Pinia State Management, Advanced JavaScript
- **Module 4 - Advanced (4 bài):** API Integration, Form Handling, Authentication, Testing & Deployment

**Lộ trình Angular (9 bài học):**
1. Getting Started - Giới thiệu Angular & Setup
2. Components & Templates - Components, Data Binding, Directives
3. TypeScript in Angular - Types, Interfaces, Classes, Generics
4. Services & Dependency Injection - Services, DI System
5. Routing - Angular Router
6. Forms - Template-driven & Reactive Forms
7. HTTP Client - API Integration
8. RxJS - Reactive Programming
9. Advanced Topics - Change Detection, Lazy Loading, Testing

> [!NOTE]
> **Lựa chọn Framework:**
> - **React:** Nếu bạn thích JSX, ecosystem lớn, React Native → [Xem React](./tuan_6_js_frameworks/react/README.md)
> - **Vue.js:** Nếu bạn thích template syntax dễ học, progressive framework → [Xem Vue.js](./tuan_6_js_frameworks/vue/README.md)
> - **Angular:** Nếu bạn thích TypeScript, full-featured framework → [Xem Angular](./tuan_6_js_frameworks/angular/README.md)
> 
> Bạn chỉ cần học **1 trong 3**, không cần học cả ba.

---

### 📁 **EXAMPLES — CODE MẪU THỰC TẾ**

```
examples/
├── html-css-layouts/               ← Layout examples
├── javascript-components/          ← UI Components
├── api-integration/                ← API examples
└── spa-mini-project/              ← Mini SPA projects
```

---

### 🎯 **PROJECT GUIDE — HƯỚNG DẪN DỰ ÁN**

```
project_guide/
├── 01_project_overview.md          ← Tổng quan dự án
├── 02_setup_environment.md         ← Cài đặt môi trường
├── 03_phase_1_html_css.md          ← Phase 1: HTML + CSS
├── 04_phase_2_javascript.md        ← Phase 2: JavaScript
├── 05_phase_3_spa.md               ← Phase 3: React/Vue SPA
└── 06_deployment_guide.md          ← Hướng dẫn deploy
```

---

## 👨‍🏫 Phong cách trình bày

Tài liệu được thiết kế với:

- **Ví dụ đời sống:** Giúp sinh viên hiểu khái niệm trừu tượng
- **Code có chú thích:** Giải thích từng dòng code
- **So sánh cách làm:** Cách cũ vs cách mới, best practices
- **Bài tập thực hành:** Ngay sau mỗi phần lý thuyết
- **Kết nối BTL:** Mỗi chương đều liên kết với dự án E-Commerce
- **Mini test:** Kiểm tra độ hiểu cuối chương

---

## 📌 Cách học hiệu quả

Sinh viên nên:

1. **Đọc lý thuyết chậm rãi** — Không bỏ qua bất kỳ phần nào
2. **Gõ lại code, không copy/paste** — Cách duy nhất để nhớ lâu
3. **Chạy code ngay sau mỗi phần** — Xem kết quả, debug, thử nghiệm
4. **Làm bài tập thực hành** — Củng cố kiến thức
5. **Làm mini test** — Tự đánh giá độ hiểu
6. **Tích hợp vào BTL** — Áp dụng ngay vào dự án thực tế
7. **Hỏi khi chưa hiểu** — Đừng để khoảng trống kiến thức

---

## 🎓 Kiến thức cần có trước khi học

Bạn cần biết:

- **Tin học cơ bản:** Sử dụng máy tính, file/folder management
- **Logic lập trình:** Biến, vòng lặp, hàm (học qua bất kỳ ngôn ngữ nào)
- **Tiếng Anh cơ bản:** Đọc tài liệu kỹ thuật

Nếu chưa có:
- Học lập trình căn bản (C, Python, hoặc JavaScript)
- Luyện đọc tài liệu tiếng Anh

---

## 🚀 Bắt đầu học

### Lộ trình đề xuất:

**Tuần 0:** Giới thiệu tổng quan (Tùy chọn nhưng khuyên đọc)
- Tổng quan về Web Development
- Các nhánh công nghệ
- Xu hướng hiện tại
- Quy trình lựa chọn công nghệ

**Tuần 1-2:** HTML5 & CSS3 Foundation
- Hoàn thành giao diện tĩnh
- Responsive design

**Tuần 3:** CSS Advanced
- Advanced styling, Sass/SCSS

**Tuần 4:** CSS Frameworks (Chọn 1)
- Bootstrap 5 HOẶC TailwindCSS

**Tuần 5-6:** JavaScript ES6 & DOM
- JavaScript Fundamentals
- DOM Manipulation & Async

**Tuần 7:** JavaScript Frameworks (Chọn 1 trong 3)
- React: SPA Architecture, Components, Hooks, Router, Redux
- Vue.js: Fundamentals, Components, Router, Pinia, Advanced
- Angular: Components, TypeScript, Services, Router, RxJS

**Tuần 8-11:** Hoàn thiện dự án với framework đã chọn
- Advanced patterns
- API Integration
- Testing & Deployment

**Tuần 11.5:** Polish & Deploy
- Code review
- Deployment

---

## 📞 Liên hệ & Hỗ trợ

**Giảng viên:**
- Email: [your-email@university.edu]
- Office Hours: [Thứ X, Y:00 - Z:00]

**Nhóm học tập:**
- Discord/Slack: [link]
- GitHub Discussion: [link]

---

## 📝 License

Tài liệu này được phát triển cho mục đích giáo dục tại Đại học [Tên trường].
Mọi quyền được bảo lưu.

---

**Chúc các bạn học tập tốt và thành công! 🎉**

---

## 🗂️ Cấu trúc file chi tiết

```
DNU_Web_Frontend/
├── README.md                        ← File này
├── QUICK_REFERENCE.md               ← Tài liệu tra cứu nhanh
├── PROGRESS.md                      ← Trạng thái hoàn thành
├── STRUCTURE_ANALYSIS.md            ← Phân tích cấu trúc
│
├── tuan_0_introduction/              ← Tuần 0: Giới thiệu tổng quan
│   ├── README.md                     ← Hướng dẫn tổng quan
│   ├── 01_web_development_overview.md ← Tổng quan Web Development
│   ├── 02_technology_branches.md     ← Các nhánh công nghệ
│   ├── 03_current_trends.md          ← Xu hướng hiện tại
│   └── 04_technology_selection.md     ← Quy trình lựa chọn
│
├── tuan_1_html5/                     ← PART I: HTML (Chương 01-07)
│   ├── 01_introduction_html_universe.md
│   ├── 02_basic_structure_html.md
│   ├── 03_head_data_html.md
│   ├── 04_visible_part_html.md
│   ├── 05_tables_hyperlinks.md
│   ├── 06_graphics_multimedia.md
│   └── 07_forms_interactive.md
│
├── tuan_2_css_core/                 ← PART I: CSS Core (Chương 08-12)
│   ├── 08_introduction_css.md
│   ├── 09_css_selectors.md
│   ├── 10_inheritance_cascading.md
│   ├── 11_box_model.md
│   └── 12_css_positioning.md
│
├── tuan_3_css_advanced/             ← PART I: CSS Advanced (Chương 13-16)
│   ├── 13_creating_responsive_layouts.md
│   ├── 14_styling_with_css.md
│   ├── 15_testing_organizing.md
│   └── 16_sass_scss.md
│
├── tuan_4_css_frameworks/            ← Tuần 4: CSS Frameworks (Lựa chọn 1 trong 2)
│   ├── bootstrap/                    ← Bootstrap 5 (5 bài học)
│   │   ├── README.md
│   │   ├── 01_getting_started/
│   │   ├── 02_grid_system/
│   │   ├── 03_components/
│   │   ├── 04_utilities/
│   │   └── 05_customization/
│   └── tailwindcss/                  ← TailwindCSS (5 bài học)
│       ├── README.md
│       ├── 01_getting_started/
│       ├── 02_utilities/
│       ├── 03_components/
│       ├── 04_customization/
│       └── 05_advanced/
│
├── tuan_4_javascript_basics/         ← Tuần 5: JS Basics (Chương 01-06)
│   ├── 01_basics_introduction.md
│   ├── 02_getting_started.md
│   ├── 03_data_types_variables.md
│   ├── 04_control_structures.md
│   ├── 05_functions.md
│   └── 06_arrays_objects.md
│
├── tuan_5_javascript_dom_async/      ← Tuần 6: JS DOM & Async (Chương 19-21)
│   ├── 19_dom_manipulation.md
│   ├── 20_ajax_async.md
│   └── 21_professional_dev_process.md
│
├── tuan_6_js_frameworks/              ← Tuần 7: JavaScript Frameworks (Lựa chọn 1 trong 3)
│   ├── README.md                      ← Hướng dẫn chọn framework
│   │
│   ├── react/                         ← Lựa chọn 1: React (Đầy đủ)
│   │   ├── README.md
│   │   ├── 01_spa_architecture/       ← SPA Architecture & React Fundamentals
│   │   ├── 02_getting_started/       ← Getting Started & Basic Principles
│   │   ├── 03_basic_principles/
│   │   ├── 04_hooks/                 ← Hooks API, Lifecycle, Class Components
│   │   ├── 05_ecosystem/              ← TypeScript, Styling, Testing, Forms
│   │   ├── 06_routing_state/         ← React Router, Redux
│   │   └── 07_advanced_patterns/     ← GraphQL, Next.js, React Native
│   │
│   ├── vue/                           ← Lựa chọn 2: Vue.js (15 bài học chi tiết)
│   │   ├── README.md                  ← Lộ trình học Vue.js
│   │   ├── 01_fundamentals/           ← Module 1: Fundamentals (4 bài)
│   │   │   ├── 01_getting_started.md
│   │   │   ├── 02_development_environment.md
│   │   │   ├── 03_template_syntax_directives.md
│   │   │   └── 04_event_handling.md
│   │   ├── 02_components/             ← Module 2: Components (4 bài)
│   │   │   ├── 05_components.md
│   │   │   ├── 06_component_communication.md
│   │   │   ├── 07_methods_computed_properties.md
│   │   │   └── 08_lifecycle_hooks.md
│   │   ├── 03_routing_state/          ← Module 3: Routing & State (3 bài)
│   │   │   ├── 09_routing.md
│   │   │   ├── 10_state_management.md
│   │   │   └── 11_advanced_javascript.md
│   │   └── 04_advanced/               ← Module 4: Advanced (4 bài)
│   │       ├── 12_api_integration.md
│   │       ├── 13_form_handling.md
│   │       ├── 14_authentication_authorization.md
│   │       └── 15_testing_deployment.md
│   │
│   └── angular/                       ← Lựa chọn 3: Angular (9 bài học chi tiết)
│       ├── README.md                  ← Lộ trình học Angular
│       ├── 01_getting_started/        ← Getting Started
│       │   └── 01_getting_started.md
│       ├── 02_components/             ← Components & Templates
│       │   └── 02_components_templates.md
│       ├── 03_typescript/             ← TypeScript in Angular
│       │   └── 03_typescript_angular.md
│       ├── 04_services/               ← Services & Dependency Injection
│       │   └── 04_services_dependency_injection.md
│       ├── 05_routing/                ← Routing
│       │   └── 05_routing.md
│       ├── 06_forms/                  ← Forms
│       │   └── 06_forms.md
│       ├── 07_http/                   ← HTTP Client
│       │   └── 07_http_client.md
│       ├── 08_rxjs/                   ← RxJS
│       │   └── 08_rxjs.md
│       └── 09_advanced/               ← Advanced Topics
│           └── 09_advanced.md
│
├── examples/                         ← Code mẫu thực tế
│   ├── html-css-layouts/
│   ├── javascript-components/
│   ├── api-integration/
│   └── spa-mini-project/
│
└── project_guide/                    ← Hướng dẫn dự án E-Commerce
    ├── 01_project_overview.md
    ├── 01_BTL_GUIDE.md
    └── (các file hướng dẫn khác)
```

> [!NOTE]
> **Lưu ý về đánh số chương:**
> - **PART I (HTML & CSS):** Chương 01-16
> - **PART II (JavaScript):** Chương 01-06, 19-21 (có khoảng trống 07-18)
> - **PART III (JavaScript Frameworks):** 
>   - **React:** Chương 01-21
>   - **Vue.js:** Module 1-4 (15 bài học)
>   - **Angular:** 9 bài học (01-09)

---

# KẾT THÚC README

