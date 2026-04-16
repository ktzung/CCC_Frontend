# 🔴 ANGULAR - BÀI 01
# **GETTING STARTED WITH ANGULAR**

## 🎬 "Google Dùng Gì? Angular" — Framework Cho Dự Án 10 Năm

*Minh: "Angular khó quá — TypeScript bắt buộc, DI, RxJS, Modules... 143KB bundle!"*

*Chị Hà: "Đúng, Angular như XE TẢI — nặng, học lái lâu, nhưng chở được MỌI THỨ. Google dùng cho Gmail, YouTube. Microsoft dùng cho Office Online. Khi dự án có 50+ developers, 1000+ components — React/Vue bắt đầu hỗn loạn. Angular giữ trật tự bằng convention."*

> 💡 **Angular ≠ cho beginner.** Angular = cho team enterprise cần structure cứng, convention rõ ràng, và TypeScript từ ngày 1.

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Angular là gì và tại sao nên học Angular
- So sánh Angular với React và Vue
- Cài đặt Angular CLI và tạo project đầu tiên
- Hiểu cấu trúc thư mục của Angular project
- Chạy development server và build production

---

## 1. **ANGULAR LÀ GÌ?**

### 1.1. Khái niệm

Angular là một **full-featured framework** để xây dựng web applications:
- **Component-based:** Xây dựng app từ các components
- **TypeScript:** Sử dụng TypeScript làm ngôn ngữ chính
- **Full-stack solution:** Routing, HTTP, Forms, Testing đều có sẵn
- **Enterprise-ready:** Phù hợp cho dự án lớn, phức tạp

### 1.2. Đặc điểm nổi bật

#### ✅ **TypeScript First**
- TypeScript được tích hợp sẵn
- Type safety giúp phát hiện lỗi sớm
- Better IDE support và autocomplete

#### ✅ **Dependency Injection (DI)**
- Hệ thống DI mạnh mẽ
- Dễ test và maintain
- Loose coupling giữa các components

#### ✅ **RxJS Integration**
- Reactive programming với Observables
- Xử lý async operations mạnh mẽ
- Built-in support cho streams

#### ✅ **Angular CLI**
- Tool mạnh mẽ để generate code
- Build, test, deploy tự động
- Best practices được tích hợp sẵn

---

## 2. **SO SÁNH VỚI CÁC FRAMEWORK KHÁC**

### 2.1. Angular vs React vs Vue

| Tiêu chí | Angular | React | Vue.js |
|----------|---------|-------|--------|
| **Type** | Full Framework | Library | Progressive Framework |
| **Language** | TypeScript | JavaScript/TypeScript | JavaScript/TypeScript |
| **Learning Curve** | ⭐⭐ Khó | ⭐⭐⭐ Trung bình | ⭐⭐⭐⭐⭐ Dễ |
| **Bundle Size** | ~143KB | ~42KB | ~34KB |
| **Routing** | Built-in | React Router | Vue Router |
| **State Management** | RxJS/NgRx | Redux/MobX | Pinia/Vuex |
| **Forms** | Built-in | Formik/React Hook Form | Built-in |
| **CLI** | Angular CLI | Create React App/Vite | Vite/Vue CLI |
| **Best For** | Enterprise apps | Flexible projects | Progressive enhancement |

### 2.2. Khi nào nên dùng Angular?

**✅ Nên dùng Angular khi:**
- Dự án enterprise lớn, phức tạp
- Team đã quen TypeScript
- Cần full-featured framework (routing, forms, HTTP built-in)
- Cần structure và conventions rõ ràng
- Dự án dài hạn, cần maintainability cao

**❌ Có thể cân nhắc framework khác khi:**
- Dự án nhỏ, đơn giản
- Team mới bắt đầu học framework
- Cần flexibility cao
- Bundle size là vấn đề quan trọng

---

## 3. **CÀI ĐẶT ANGULAR CLI**

### 3.1. Yêu cầu tiên quyết

- **Node.js:** Version 18.x hoặc 20.x
- **npm:** Version 9.x trở lên

**Kiểm tra:**
```bash
node --version
npm --version
```

### 3.2. Cài đặt Angular CLI

```bash
# Cài đặt globally
npm install -g @angular/cli

# Kiểm tra version
ng version
```

### 3.3. Tạo project mới

```bash
# Tạo project
ng new my-angular-app

# Các câu hỏi sẽ xuất hiện:
# - Add Angular routing? Yes
# - Which stylesheet format? CSS
```

**Các options:**
- **Angular routing:** Chọn Yes (sẽ cần cho routing)
- **Stylesheet:** CSS, SCSS, Sass, Less (chọn CSS cho đơn giản)

### 3.4. Cấu trúc thư mục

```
my-angular-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Root component
│   │   ├── app.component.html    # Template
│   │   ├── app.component.css     # Styles
│   │   └── app.module.ts          # Root module
│   ├── assets/                    # Static assets
│   ├── index.html                 # Entry HTML
│   ├── main.ts                    # Bootstrap
│   └── styles.css                 # Global styles
├── angular.json                   # Angular config
├── package.json                   # Dependencies
└── tsconfig.json                  # TypeScript config
```

---

## 4. **CHẠY DEVELOPMENT SERVER**

```bash
# Vào thư mục project
cd my-angular-app

# Chạy dev server
ng serve

# Hoặc với port tùy chỉnh
ng serve --port 4200

# Mở browser tự động
ng serve --open
```

Mở trình duyệt tại `http://localhost:4200`

### 4.1. Hot Reload

Angular CLI hỗ trợ Hot Module Replacement (HMR):
- Thay đổi code → Tự động reload
- Giữ state khi có thể
- Fast refresh

---

## 5. **BUILD PRODUCTION**

```bash
# Build production
ng build

# Build với optimization
ng build --configuration production

# Output sẽ ở thư mục dist/
```

**Kết quả:**
- Code đã được minify và optimize
- Tree-shaking để loại bỏ code không dùng
- AOT (Ahead-of-Time) compilation
- Sẵn sàng deploy

---

## 6. **VÍ DỤ ĐẦU TIÊN**

### 6.1. Component cơ bản

**src/app/app.component.ts:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

**src/app/app.component.html:**
```html
<div class="container">
  <h1>{{ title }}</h1>
  <p>Count: {{ count }}</p>
  <button (click)="increment()">+</button>
  <button (click)="decrement()">-</button>
</div>
```

**src/app/app.component.css:**
```css
.container {
  text-align: center;
  padding: 2rem;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
```

---

## 7. **ANGULAR CLI COMMANDS**

### 7.1. Generate components

```bash
# Generate component
ng generate component my-component
# Hoặc shorthand
ng g c my-component

# Với options
ng g c my-component --skip-tests
ng g c my-component --inline-style
ng g c my-component --inline-template
```

### 7.2. Generate services

```bash
ng generate service my-service
ng g s my-service
```

### 7.3. Generate modules

```bash
ng generate module my-module
ng g m my-module
```

### 7.4. Other useful commands

```bash
# Run tests
ng test

# Lint code
ng lint

# Build và analyze bundle
ng build --stats-json
```

---

## 8. **TỔNG KẾT**

- ✅ **Angular** là full-featured framework cho enterprise apps
- ✅ Sử dụng **TypeScript** làm ngôn ngữ chính
- ✅ **Angular CLI** giúp generate code và build project
- ✅ Cấu trúc project rõ ràng, dễ maintain
- ✅ Phù hợp cho dự án lớn, dài hạn

---

**Bài tiếp theo:** [02. Components & Templates](../02_components/02_components_templates.md) - Học cách tạo và sử dụng components trong Angular.
