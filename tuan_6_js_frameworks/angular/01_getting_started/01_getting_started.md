# 🔴 TUẦN 6 - BÀI 11 (ANGULAR)
# **GETTING STARTED — Framework Enterprise từ Google**

---

## 0. 🎬 Opening Hook

*"Angular quá phức tạp!" Minh nói. "TypeScript bắt buộc, DI, RxJS, Modules, decorators — chỉ tạo 1 button cần 5 file!"*

*Chị Hà — Tech Lead tại Viettel Digital: "Angular như xe tải công trình. Nặng, học lái lâu. Nhưng khi công trình 100 tầng — không ai dùng xe Honda."*

*"Gmail. Google Maps. Microsoft Office Online. Đây là Angular. Khi team 50 người cùng viết code — React/Vue không có convention → mỗi người viết 1 kiểu → chaos. Angular enforce structure từ ngày 1."*

*"Khi nào intern như tôi cần học Angular?"*

*"Khi công ty yêu cầu. Khi nào? Nhìn JD — nếu thấy Angular = học. Trong khóa này, bạn cần hiểu đủ để đọc và viết component Angular cơ bản."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Angular xuất hiện trong ~30% job descriptions cho Frontend ở VN, đặc biệt:
- Công ty **outsource** dự án cho khách hàng nước ngoài (Nhật, Hàn, EU)
- **Bank, Telecom, Enterprise** software (Viettel, FPT, VNPay)
- Dự án **dài hạn** cần maintainability cao

Biết đủ Angular = mở rộng cơ hội việc làm đáng kể.

---

## 2. 🌐 Big Picture — Angular Architecture

```
ANGULAR vs REACT vs VUE

Angular                    React                     Vue
──────────────────         ──────────────            ──────────────
Full Framework             UI Library                Progressive Framework
"Opinionated"              "Unopinionated"           Middle ground

TypeScript (bắt buộc)      JS/TS (tùy chọn)          JS/TS (tùy chọn)
~143KB initial             ~42KB                     ~34KB
Learning curve: cao        Trung bình                Thấp nhất

Built-in:                  Cần install thêm:         Cần install thêm:
- Router                   - React Router            - Vue Router
- HTTP Client              - Axios/Fetch             - Axios/Fetch
- Forms                    - Formik/RHF              - VeeValidate
- Testing                  - Jest/RTL                - Vitest
- DI System                - (không có)              - (không có)

Use cases:
Enterprise app (50+ devs)  Startup, tech company     Laravel ecosystem, VN market

Job VN:
~30% (enterprise)          ~65% (startup/tech)       ~20% (Laravel teams)

ANGULAR MENTAL MODEL:
Class-based OOP + TypeScript + Decorator pattern
@Component → @Injectable → @NgModule → AppComponent
Giống Spring Boot (Java), ASP.NET (C#) hơn React/Vue
```

---

## 3. ⚙️ Core Technical Truth

### Angular CLI Setup

```bash
# Yêu cầu: Node.js 18.x hoặc 20.x
node --version
npm --version

# Cài Angular CLI globally
npm install -g @angular/cli

# Kiểm tra
ng version

# Tạo project mới (non-interactive)
ng new my-angular-app --routing --style=css --skip-tests

# Start development server
cd my-angular-app
ng serve --open  # Mở browser tự động
# → http://localhost:4200
```

---

### Cấu trúc Project

```
my-angular-app/
│
├── src/
│   ├── app/
│   │   ├── app.component.ts         ← Root component (TypeScript class)
│   │   ├── app.component.html       ← Template (HTML + Angular directives)
│   │   ├── app.component.css        ← Component styles
│   │   ├── app.component.spec.ts    ← Unit tests
│   │   ├── app.module.ts            ← Root NgModule (traditional)
│   │   └── app.routes.ts            ← Routes config (Angular 17+)
│   │
│   ├── assets/                      ← Static files
│   ├── environments/                ← Dev/Prod configs
│   ├── index.html                   ← Shell HTML
│   ├── main.ts                      ← Bootstrap entry point
│   └── styles.css                   ← Global styles
│
├── angular.json                     ← Angular CLI config
├── tsconfig.json                    ← TypeScript config
└── package.json
```

---

### Anatomy của Angular Component

Angular component = **3 phần tách biệt** (khác Vue SFC gộp lại):

```typescript
// src/app/product-card/product-card.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-product-card',     // HTML tag: <app-product-card>
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
    // Hoặc inline template:
    // template: `<div>{{ product.name }}</div>`,
    // styles: [`.card { border: 1px solid #ddd; }`],
    standalone: true,                  // Angular 17+ Standalone components
    imports: [CommonModule],
})
export class ProductCardComponent implements OnInit, OnDestroy {
    // @Input = nhận dữ liệu từ parent (như Vue defineProps)
    @Input() product!: Product;
    @Input() currency = 'VND';

    // @Output = emit events lên parent (như Vue defineEmits)
    @Output() addToCart = new EventEmitter<Product>();
    @Output() viewDetail = new EventEmitter<string>();

    // Component state
    isAdded = false;
    private timer: ReturnType<typeof setTimeout> | null = null;

    // Lifecycle hooks
    ngOnInit(): void {
        console.log('Component mounted với product:', this.product?.name);
    }

    ngOnDestroy(): void {
        if (this.timer) clearTimeout(this.timer);  // Cleanup
    }

    // Methods
    handleAddToCart(): void {
        this.isAdded = true;
        this.addToCart.emit(this.product);
        this.timer = setTimeout(() => { this.isAdded = false; }, 2000);
    }

    get formattedPrice(): string {
        return this.product.price.toLocaleString('vi-VN') + 'đ';
    }
}

// TypeScript interfaces
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}
```

```html
<!-- src/app/product-card/product-card.component.html -->
<div class="card">
    <!-- Property binding: [attribute]="expression" -->
    <img [src]="product.imageUrl" [alt]="product.name" />

    <div class="card-body">
        <h3>{{ product.name }}</h3>

        <!-- Interpolation: {{ expression }} -->
        <p class="price">{{ formattedPrice }}</p>

        <!-- Event binding: (event)="handler()" -->
        <!-- Class binding: [class.name]="condition" -->
        <button
            (click)="handleAddToCart()"
            [class.btn-success]="isAdded"
            [disabled]="isAdded"
        >
            {{ isAdded ? '✅ Đã thêm' : 'Thêm vào giỏ' }}
        </button>

        <!-- Event binding với emit -->
        <button (click)="viewDetail.emit(product.id.toString())">Xem chi tiết</button>
    </div>
</div>
```

---

### Angular Directives — Tương đương Vue

```html
<!-- Angular directives trong template -->

<!-- *ngIf — Như v-if trong Vue -->
<div *ngIf="isLoggedIn">Chào mừng, {{ user.name }}!</div>
<div *ngIf="isLoggedIn; else guestBlock">...</div>
<ng-template #guestBlock>
    <p>Vui lòng <a routerLink="/login">đăng nhập</a></p>
</ng-template>

<!-- *ngFor — Như v-for trong Vue -->
<ul>
    <li *ngFor="let product of products; let i = index; trackBy: trackById">
        {{ i + 1 }}. {{ product.name }}
    </li>
</ul>

<!-- ngClass — Như :class trong Vue -->
<div [ngClass]="{
    'active': isActive,
    'disabled': !isEnabled,
    'sale': product.discount > 0
}">

<!-- ngStyle — Như :style trong Vue -->
<div [ngStyle]="{
    'color': brandColor,
    'font-size': fontSize + 'px'
}">

<!-- ngModel — Như v-model trong Vue (cần FormsModule) -->
<input [(ngModel)]="searchQuery" placeholder="Tìm kiếm..." />
<!-- [()] = "banana in a box" syntax = two-way binding -->

<!-- [ngSwitch] — Như v-if/v-else-if chain -->
<div [ngSwitch]="userRole">
    <app-admin-panel *ngSwitchCase="'admin'" />
    <app-mod-panel *ngSwitchCase="'mod'" />
    <app-user-panel *ngSwitchDefault />
</div>
```

---

### Angular CLI — Công cụ sinh code

```bash
# Generate component (tạo 4 files cùng lúc)
ng generate component features/product-card
# ng g c features/product-card --standalone --skip-tests

# Generate service
ng generate service services/product
# ng g s services/product

# Generate module
ng generate module features/products --routing

# Generate directive
ng g directive directives/highlight

# Generate pipe (filter)
ng g pipe pipes/currency-vn

# Generate guard (route protection)
ng g guard guards/auth

# Build production
ng build --configuration production
# Output: dist/my-angular-app/

# Run tests
ng test

# Lint
ng lint
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Angular component = TypeScript class + `@Component` decorator. Template (HTML) + class (logic) + styles (CSS) là 3 file tách biệt.**
> **`[property]` = one-way binding. `(event)` = event listener. `[(ngModel)]` = two-way binding. `*ngIf`, `*ngFor` = structural directives.**

---

## 5. 🏭 Real-world Layer

### Angular 17+ Standalone Components (Modern Angular)

```typescript
// main.ts — Bootstrap không cần NgModule
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
    ]
});

// app.routes.ts
import { Routes } from '@angular/router';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    // Lazy loaded route
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component')
            .then(m => m.AdminComponent),
        canActivate: [authGuard],
    },
    { path: '**', component: NotFoundComponent }
];
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Tạo Angular App và Component (25 phút)

```bash
# 1. Tạo project
ng new learn-angular --routing --style=css --standalone
cd learn-angular
ng serve --open

# 2. Generate components
ng g c features/product-list --standalone --skip-tests
ng g c features/product-card --standalone --skip-tests
```

Tạo `ProductCardComponent` với:
- `@Input() product` — nhận product object
- `@Output() addToCart` — emit khi click
- Template hiển thị: name, price (formatted), button

```typescript
// Fake data trong ProductListComponent
products = [
    { id: 1, name: 'iPhone 15', price: 25990000 },
    { id: 2, name: 'MacBook Air M2', price: 32990000 },
    { id: 3, name: 'AirPods Pro', price: 6490000 },
];
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Angular là Angular.js"** | Hoàn toàn khác: **AngularJS** (2010) = version cũ, JavaScript, đã deprecated. **Angular** (2016+, từ version 2) = viết lại hoàn toàn, TypeScript, Modern framework. Khi nói Angular trong context này = Angular 2+ |
| **"Angular chậm hơn React"** | Trong development mode: Angular chậm hơn do nhiều tính năng. Trong **production**: Angular AOT compilation → thường ngang hoặc nhanh hơn. Google dùng Angular cho Gmail = đủ nhanh |
| **"`*ngIf` giống `v-if` hoàn toàn"** | Gần như vậy nhưng `*ngIf` dùng `ng-template` bên dưới. Quan trọng hơn: `*ngIf` và `*ngFor` không dùng cùng element (như Vue). Dùng `<ng-container>` để group |
| **"Standalone components = không cần AppModule"** | Đúng trong Angular 17+ — standalone là hướng chính. Nhưng project cũ dùng NgModule vẫn valid. Cần biết cả hai khi làm việc với dự án thực tế |
| **"Decorator `@Component` = class inheritance"** | Decorator là **metadata** — cung cấp thông tin cho Angular compiler (selector, template, styles). Không liên quan đến prototype chain. Là Angular-specific pattern dựa trên TypeScript decorators |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Angular khác React và Vue ở điểm căn bản nào? (Hint: opinionated vs flexible)
2. `@Input()` và `@Output()` trong Angular tương đương với gì trong Vue?
3. Tại sao Angular yêu cầu TypeScript bắt buộc? Lợi ích thực tế là gì?

### Câu hỏi áp dụng:

4. Viết Angular component `UserCard` với: `@Input() user: { name: string, email: string, role: 'admin' | 'user' }`. Hiển thị badge "Admin" nếu role = admin. Emit `@Output() viewProfile` khi click nút.
5. Trong template Angular, làm thế nào để hiển thị danh sách products với `*ngFor` và chỉ hiển thị những sản phẩm có `price < 10000000` — không dùng thêm directive nào khác ngoài `*ngFor`?

<details>
<summary>👁️ Xem đáp án</summary>

1. Angular = **full framework opinionated** — tự quyết định cách cấu trúc code (modules, services, DI, forms patterns). React/Vue = **library/progressive** — developer tự chọn cách tổ chức. Angular enforce: TypeScript bắt buộc, DI system chuẩn, folder structure convention, HTTP client chuẩn. Team lớn → Angular consistent hơn; team nhỏ linh hoạt hơn → React/Vue.
2. `@Input()` = `defineProps` trong Vue (nhận data từ parent). `@Output() event = new EventEmitter<T>()` + `event.emit(data)` = `defineEmits` trong Vue + `emit('event', data)`. Parent bind: `<comp [propName]="data" (eventName)="handler($event)">`.
3. TypeScript cung cấp: (1) **Type safety** — bắt lỗi lúc compile, không phải lúc runtime. (2) **IDE autocomplete** — IntelliSense cho component properties, method signatures. (3) **Refactoring** — rename class/interface → tất cả usages update. (4) **Documentation** qua types — `product: Product` tự document structure. Enterprise teams với 50+ người: 1 bug phát hiện lúc compile = tránh được 1 bug production.
4. ```typescript
   @Component({
       selector: 'app-user-card',
       template: `
           <div class="card">
               <span *ngIf="user.role === 'admin'" class="badge">Admin</span>
               <h3>{{ user.name }}</h3>
               <p>{{ user.email }}</p>
               <button (click)="viewProfile.emit(user)">Xem hồ sơ</button>
           </div>`,
       standalone: true, imports: [CommonModule]
   })
   export class UserCardComponent {
       @Input() user!: { name: string; email: string; role: 'admin' | 'user' };
       @Output() viewProfile = new EventEmitter<typeof this.user>();
   }
   ```
5. Dùng `*ngFor` với `| slice` pipe hoặc filter trong component. Cách đúng nhất: filter trong **component class** (không phải template): `get affordableProducts() { return this.products.filter(p => p.price < 10000000) }`, rồi `*ngFor="let p of affordableProducts"`. Không dùng `*ngIf` + `*ngFor` trên cùng element — dùng `<ng-container>`.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Angular = Full Framework** — TypeScript, DI, Router, Forms, HTTP đều built-in. Opinionated → consistent cho large teams
2. **Component** = TypeScript class + `@Component` decorator. `selector`, `templateUrl`, `styleUrls` → 3 file riêng biệt
3. **Template syntax**: `{{ }}` interpolation, `[prop]` one-way binding, `(event)` listener, `[(ngModel)]` two-way
4. **Structural directives**: `*ngIf` (conditional), `*ngFor` (loop). Không dùng cả 2 trên cùng element
5. **Angular CLI**: `ng generate component/service/guard` → code generation. `ng serve` → dev. `ng build` → production

---

## 10. ➡️ Next Lesson Bridge

*"Angular CLI chạy được, component hiển thị được," Minh nói. "Nhưng Service là gì? Tại sao không chỉ dùng function trong component?"*

*"Dependency Injection," chị Hà nói. "Service = singleton class, được inject vào bất kỳ component nào cần. API calls, business logic, shared state — đây là backbone của Angular app."*

**→ [Bài 12: Components & Services](../02_components/) — Data binding chi tiết, Services, Dependency Injection: kiến trúc Angular thực sự.**
