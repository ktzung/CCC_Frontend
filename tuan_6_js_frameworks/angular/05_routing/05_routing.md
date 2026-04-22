# 🔴 ANGULAR - BÀI 05
# **ANGULAR ROUTER — Navigation & Route Guards**

---

## 0. 🎬 Opening Hook

*Minh click "Sản phẩm" → URL đổi thành `/products` → component Products hiện ra. Không reload trang.*

*"Angular Router = GPS cho SPA," chị Hà nói. "URL = tọa độ. Routes config = bản đồ. `<router-outlet>` = màn hình GPS hiển thị. Route Guard = barrier tự động kiểm tra điều kiện trước khi cho qua."*

*"Lazy loading?" Minh hỏi.*

*"Chỉ download JavaScript của `/admin` khi user thực sự navigate đến `/admin`. Initial bundle nhỏ hơn → load nhanh hơn."*

---

## 1. 🎯 Why This Matters

Angular Router = feature-rich routing system:
- **Lazy loading**: Download code theo nhu cầu → app load nhanh
- **Route Guards**: Protect routes — `canActivate`, `canDeactivate`
- **Resolvers**: Fetch data trước khi component load
- **Child routes**: Nested layouts (Dashboard → Orders, Settings)

---

## 2. 🌐 Big Picture

```
ANGULAR ROUTER FLOW

URL Change → Router matches route → Guards run → Resolver runs → Component renders
                                        ↓
                               canActivate: false?
                                    → Redirect /login

ROUTE CONFIG STRUCTURE:
[
  { path: '',              component: HomeComponent },
  { path: 'products',      loadComponent: () => import('./products...') },  // Lazy
  { path: 'products/:id',  component: ProductDetailComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),  // Lazy module
    canActivate: [authGuard],
  },
  { path: '**',  component: NotFoundComponent }
]

VUE ROUTER EQUIVALENT:
Angular routerLink      ≈   Vue RouterLink
router-outlet           ≈   RouterView
ActivatedRoute          ≈   useRoute()
Router service          ≈   useRouter()
canActivate guard       ≈   router.beforeEach()
```

---

## 3. ⚙️ Core Technical Truth

### Routes Configuration (Angular 17+ Standalone)

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    // Eager loaded (small, always needed)
    {
        path: '',
        component: HomeComponent,
        title: 'Trang chủ | Shop Vue'
    },

    // Lazy loaded — download khi navigate đến
    {
        path: 'products',
        loadComponent: () =>
            import('./pages/products/products.component')
                .then(m => m.ProductsComponent),
        title: 'Sản phẩm',
    },

    {
        path: 'products/:productId',
        loadComponent: () =>
            import('./pages/product-detail/product-detail.component')
                .then(m => m.ProductDetailComponent),
    },

    // Auth routes
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component')
                .then(m => m.LoginComponent),
        canActivate: [() => !localStorage.getItem('token')
            || inject(Router).createUrlTree(['/dashboard'])],
    },

    // Protected — cần đăng nhập
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        canActivate: [authGuard],
    },

    // Nested routes — Dashboard với layout
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard/dashboard-layout.component')
                .then(m => m.DashboardLayoutComponent),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            {
                path: 'overview',
                loadComponent: () => import('./pages/dashboard/overview.component')
                    .then(m => m.OverviewComponent),
            },
            {
                path: 'orders',
                loadComponent: () => import('./pages/dashboard/orders.component')
                    .then(m => m.OrdersComponent),
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/dashboard/settings.component')
                    .then(m => m.SettingsComponent),
            },
        ]
    },

    // Admin — cần role admin
    {
        path: 'admin',
        canActivate: [authGuard, adminGuard],
        loadChildren: () => import('./features/admin/admin.routes')
            .then(m => m.adminRoutes),
    },

    // 404
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component')
            .then(m => m.NotFoundComponent),
    },
];
```

---

### Route Guards — Functional Style (Angular 15+)

```typescript
// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional guard — không cần class
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn) {
        return true;
    }

    // Lưu intended URL để redirect sau login
    return router.createUrlTree(['/login'], {
        queryParams: { redirect: state.url }
    });
};

// Admin guard
export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAdmin) return true;
    return router.createUrlTree(['/']);
};

// Unsaved changes guard
export const unsavedChangesGuard: CanDeactivateFn<{ hasUnsavedChanges: boolean }> = (component) => {
    if (component.hasUnsavedChanges) {
        return confirm('Bạn có thay đổi chưa lưu. Rời trang không?');
    }
    return true;
};
```

---

### Navigation trong Component

```typescript
// Template navigation
// <a routerLink="/products">Sản phẩm</a>
// <a [routerLink]="['/products', product.id]">Chi tiết</a>
// <a routerLink="/products" routerLinkActive="nav--active" [routerLinkActiveOptions]="{ exact: true }">

@Component({
    standalone: true,
    imports: [RouterModule],
    template: `
        <nav>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/products" routerLinkActive="active">Sản phẩm</a>
            <a [routerLink]="['/products', 'new']" routerLinkActive="active">Thêm mới</a>
        </nav>
        <router-outlet />
    `
})
export class AppComponent {}

// Programmatic navigation
@Component({ standalone: true })
export class LoginComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    async onLoginSuccess() {
        // Redirect về intended URL hoặc dashboard
        const redirect = this.route.snapshot.queryParams['redirect'] ?? '/dashboard';
        await this.router.navigateByUrl(redirect);
        // Hoặc: this.router.navigate(['/dashboard']);
        // Hoặc: this.router.navigate(['..'], { relativeTo: this.route });
    }
}

// Đọc route params
@Component({ standalone: true })
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
    ) {}

    ngOnInit() {
        // Snapshot: chỉ đọc một lần (nếu params không thay đổi)
        const id = Number(this.route.snapshot.paramMap.get('productId'));

        // Observable: reactive — re-run khi params thay đổi (navigate /products/1 → /products/2)
        this.route.paramMap.pipe(
            map(params => Number(params.get('productId'))),
            switchMap(id => this.productService.getById(id))
        ).subscribe(product => this.product = product);
    }
}
```

---

## 4. 🟢 Simplified Layer

> **`loadComponent: () => import(...)` = lazy loading. `canActivate: [authGuard]` = protection. `router-outlet` = nơi render component.**
> **`this.route.paramMap` (Observable) thay `snapshot` khi params có thể thay đổi mà không unmount component.**

---

## 5. 🛠️ Hands-on Practice

```typescript
// Bài tập: Setup router cho mini e-commerce
// Routes: / | /products | /products/:id | /cart | /login | /dashboard (protected) | **
// authGuard: kiểm tra localStorage.getItem('token')
// Redirect /login → /dashboard nếu đã đăng nhập
// Nested routes trong /dashboard: /overview và /orders
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Lazy loading phức tạp"** | Đổi `component: HomeComponent` thành `loadComponent: () => import('./home.component').then(m => m.HomeComponent)` — 1 dòng. Angular CLI tự tạo code splitting |
| **"`routerLink` và `href` như nhau"** | `href` = full page reload. `routerLink` = client-side navigation, giữ state, nhanh hơn |
| **"`route.snapshot.params` luôn đúng"** | Snapshot đúng khi component mount lần đầu. Nếu user navigate `/products/1` → `/products/2` mà không unmount component → snapshot không update. Dùng `route.paramMap` Observable |

---

## 7. ✅ Checkpoint

1. `loadComponent` vs `component` trong route config — khác nhau thế nào về performance?
2. `CanActivateFn` trả về `true` vs `Router.createUrlTree(['/login'])` — ý nghĩa?
3. Khi nào dùng `route.snapshot.params` vs `route.paramMap` Observable?

<details>
<summary>👁️ Xem đáp án</summary>

1. `component`: Eager load — JavaScript của component được bundle vào main chunk → tải ngay khi app load. `loadComponent`: Lazy load — tạo separate chunk file → chỉ download khi user navigate đến route đó. Với large admin page: lazy load giảm initial bundle 30-50%.
2. `return true` = cho phép navigation. `return router.createUrlTree(['/login'])` = redirect đến `/login` thay vì show route được request. Guard tự redirect → không cần component lo về unauthorized state.
3. `snapshot.params`: đọc params 1 lần khi component init. Đủ khi route change → component unmount + remount (mỗi navigate tạo component mới). `paramMap Observable`: khi cùng component instance nhận nhiều param values — ví dụ `/products/:id` navigate từ 1→2 mà component không bị destroy (same route, different param).

</details>

---

## 8. 📌 Summary

1. **Lazy loading**: `loadComponent` / `loadChildren` → separate JS chunks → faster initial load
2. **Guards**: `canActivate: [authGuard]` → protect routes. Return `true` = allow, `UrlTree` = redirect
3. **`router-outlet`**: Nơi Angular render component của route hiện tại. Nested outlets cho child routes
4. **`routerLink`** + `routerLinkActive` → template navigation. `router.navigate()` → programmatic
5. **`route.paramMap` Observable** → reactive params. `snapshot.params` → one-time read

**→ [Bài 06: Angular Forms](../06_forms/) — Reactive Forms với FormBuilder, validators, dynamic forms.**
