# 🔴 ANGULAR - BÀI 04
# **SERVICES & DEPENDENCY INJECTION — Kiến Trúc Angular**

---

## 0. 🎬 Opening Hook

*Minh viết `fetch('/api/users')` ngay trong 5 components khác nhau. Code chạy. Sau đó endpoint đổi từ `/api/users` thành `/api/v2/users` → phải sửa 5 chỗ. Thêm auth token? 5 chỗ. Error handling? 5 chỗ.*

*Chị Hà: "Đây là anti-pattern. Service = tập trung business logic. DI = Angular tự tạo và quản lý service instance, inject vào bất kỳ component nào cần."*

*"Giống Singleton pattern?" Minh hỏi.*

*"Đúng. `providedIn: 'root'` = 1 instance duy nhất cho toàn app. Mọi component dùng chung instance đó."*

---

## 1. 🎯 Why This Matters

Angular DI System là **differentiator** lớn nhất so với React/Vue:
- **Testability**: Inject mock service trong tests
- **Single Responsibility**: Component lo UI, Service lo data/business logic
- **Reusability**: Service dùng chung không cần props drilling
- **Singleton**: Share state giữa components không cần global store

---

## 2. 🌐 Big Picture — DI Architecture

```
DEPENDENCY INJECTION FLOW

Component cần service?    Không tự tạo — KHAI BÁO trong constructor
       ↓
Angular DI Injector       Tìm provider → Tạo/lấy instance → Inject
       ↓
Component nhận instance   this.productService.getAll()

PROVIDER SCOPES:
providedIn: 'root'   → Singleton toàn app (1 instance)
providedIn: 'any'    → 1 instance per lazy-loaded module
Component-level      → 1 instance per component instance

VUE EQUIVALENT:
Angular Service (DI)   ≈   Pinia Store hoặc Composable
@Injectable class          defineStore() hoặc useX() function
constructor inject         const store = useProductStore()

ANGULAR vs VUE vs REACT:
Angular: constructor(private svc: ProductService) {}
Vue:     const store = useProductStore()
React:   const [state, dispatch] = useReducer(...)
         hoặc const store = useCartStore() (Zustand)
```

---

## 3. ⚙️ Core Technical Truth

### Tạo Service

```bash
ng generate service services/product
# Tạo: src/app/services/product.service.ts
```

```typescript
// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

// TypeScript interfaces (type safety)
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
}

export interface ProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

@Injectable({
    providedIn: 'root'  // Singleton — 1 instance toàn app
})
export class ProductService {
    private readonly apiUrl = '/api/products';

    // BehaviorSubject = Observable giữ current value và emit cho subscribers mới
    private productsCache = new BehaviorSubject<Product[]>([]);

    // Public Observable — components subscribe để nhận updates
    products$ = this.productsCache.asObservable();

    constructor(private http: HttpClient) {}

    // GET all products với optional filters
    getAll(filters?: ProductFilter): Observable<Product[]> {
        let params = new HttpParams();
        if (filters?.category) params = params.set('category', filters.category);
        if (filters?.search) params = params.set('q', filters.search);
        if (filters?.minPrice) params = params.set('minPrice', filters.minPrice.toString());

        return this.http.get<Product[]>(this.apiUrl, { params }).pipe(
            tap(products => this.productsCache.next(products)),  // Update cache
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    create(product: Omit<Product, 'id'>): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product).pipe(
            tap(newProduct => {
                // Update cache locally
                const current = this.productsCache.value;
                this.productsCache.next([...current, newProduct]);
            }),
            catchError(this.handleError)
        );
    }

    update(id: number, changes: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${this.apiUrl}/${id}`, changes).pipe(
            tap(updated => {
                const current = this.productsCache.value;
                this.productsCache.next(
                    current.map(p => p.id === id ? updated : p)
                );
            }),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                const current = this.productsCache.value;
                this.productsCache.next(current.filter(p => p.id !== id));
            }),
            catchError(this.handleError)
        );
    }

    // Private error handler
    private handleError(error: any): Observable<never> {
        let message = 'Có lỗi xảy ra';
        if (error.status === 404) message = 'Không tìm thấy sản phẩm';
        if (error.status === 403) message = 'Không có quyền thực hiện';
        if (error.status >= 500) message = 'Lỗi server, vui lòng thử lại';
        console.error('API Error:', error);
        return throwError(() => new Error(message));
    }
}
```

---

### Inject Service vào Component

```typescript
// src/app/pages/products/products.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService, Product } from '../../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, ProductCardComponent],
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    isLoading = false;
    error = '';

    // Subject để unsubscribe tất cả observables khi component destroy
    private destroy$ = new Subject<void>();

    // DI: Angular inject ProductService tự động
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.isLoading = true;
        this.error = '';

        this.productService.getAll()
            .pipe(
                takeUntil(this.destroy$)  // Auto-unsubscribe khi destroy
            )
            .subscribe({
                next: (products) => {
                    this.products = products;
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = err.message;
                    this.isLoading = false;
                }
            });
    }

    deleteProduct(id: number): void {
        if (!confirm('Bạn có chắc muốn xóa?')) return;

        this.productService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    // Cache đã được update trong service
                    this.products = this.products.filter(p => p.id !== id);
                },
                error: (err) => this.error = err.message
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();  // Trigger unsubscribe
        this.destroy$.complete();
    }
}
```

```html
<!-- products.component.html -->
<div class="products-page">
    <div *ngIf="isLoading" class="loading">⏳ Đang tải...</div>

    <div *ngIf="error" class="error">
        {{ error }}
        <button (click)="loadProducts()">Thử lại</button>
    </div>

    <div *ngIf="!isLoading && !error">
        <div class="product-grid">
            <app-product-card
                *ngFor="let product of products; trackBy: trackById"
                [product]="product"
                (delete)="deleteProduct($event)"
            />
        </div>

        <p *ngIf="products.length === 0">Không có sản phẩm</p>
    </div>
</div>
```

---

### Auth Service — Shared State

```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    // BehaviorSubject với initial value từ localStorage
    private currentUserSubject = new BehaviorSubject<User | null>(
        JSON.parse(localStorage.getItem('user') ?? 'null')
    );

    // Public observables
    currentUser$ = this.currentUserSubject.asObservable();

    // Computed getter — sync access
    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    get isAdmin(): boolean {
        return this.currentUser?.role === 'admin';
    }

    constructor(
        private http: HttpClient,
        private router: Router  // Inject Router để navigate
    ) {}

    login(email: string, password: string): Observable<{ user: User; token: string }> {
        return this.http.post<{ user: User; token: string }>('/api/auth/login', { email, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.currentUserSubject.next(response.user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}
```

---

### HTTP Interceptor — Auth Token

```typescript
// src/app/interceptors/auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq);
    }

    return next(req);
};

// main.ts — Register interceptor
bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
    ]
});
```

---

## 4. 🟢 Simplified Layer

> **Service = class với `@Injectable({ providedIn: 'root' })`. Inject vào component bằng `constructor(private svc: MyService)`. Angular tự tạo instance.**
> **BehaviorSubject = reactive state. `.next(value)` để update. `.asObservable()` để expose. Subscribe với `takeUntil(destroy$)` để tránh memory leak.**

---

## 5. 🛠️ Hands-on Practice

```bash
# Tạo CartService
ng g s services/cart

# CartService cần:
# - items: BehaviorSubject<CartItem[]>
# - totalItems$, totalPrice$ (computed Observables)
# - addItem(product), removeItem(id), clearCart()

# Inject vào NavbarComponent để hiển thị cart badge
# Inject vào ProductCardComponent để addItem
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Service chỉ để gọi API"** | Service có thể là: state manager (BehaviorSubject), utility (formatter), business logic, WebSocket handler, caching layer |
| **"Mỗi component tạo 1 service instance"** | `providedIn: 'root'` = **singleton**. Mọi component inject cùng 1 instance → shared state tự nhiên. Component-level providers mới tạo instance riêng |
| **"Quên unsubscribe không sao"** | Subscription sống mãi → memory leak. Với `takeUntil(destroy$)` pattern: tất cả subscriptions tự cancel khi component destroy |
| **"DI phức tạp hơn import thường"** | DI tốt hơn vì: testable (inject mock), lifecycle managed, loose coupling |

---

## 7. ✅ Checkpoint

1. `providedIn: 'root'` nghĩa là gì về số lượng instances?
2. Tại sao cần `takeUntil(destroy$)` pattern? Điều gì xảy ra nếu thiếu?
3. `BehaviorSubject` khác `Subject` thế nào?

<details>
<summary>👁️ Xem đáp án</summary>

1. Singleton — Angular chỉ tạo **1 instance duy nhất** cho toàn app. Bất kỳ component nào inject `ProductService` đều nhận cùng 1 instance đó. State trong service = shared state.
2. Observable subscriptions không tự cancel. Nếu component destroy nhưng subscription còn sống → callback cố update `this.products` của component đã bị destroy → memory leak. `takeUntil(destroy$)` = auto-complete subscription khi `destroy$` emits (trong `ngOnDestroy`).
3. `Subject`: Không có initial value, chỉ emit future values. Subscriber mới không nhận giá trị hiện tại. `BehaviorSubject`: Có initial value, subscriber mới nhận giá trị **current** ngay lập tức. Dùng BehaviorSubject cho state (user, products) cần initial value.

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `NullInjectorError: No provider for X!` | Service chưa `providedIn: 'root'` hoặc không trong providers | Thêm `@Injectable({ providedIn: 'root' })` hoặc khai báo trong `providers` |
| Circular dependency giữa 2 services | Service A inject Service B và ngược lại | Dùng `forwardRef(() => X)` hoặc refactor loại bỏ vòng lặp |
| `No provider for HttpClient` | Quên import `HttpClientModule` | Thêm `provideHttpClient()` (Angular 17+) hoặc `HttpClientModule` |
| Service tạo 2 instances (không singleton) | `providedIn` ở cả root và component providers | Chỉ dùng `providedIn: 'root'`, xóa khỏi component providers |
| `BehaviorSubject` emit `undefined` | Không truyền initial value | `new BehaviorSubject<Type>(initialValue)` — luôn có giá trị khởi tạo |
| Memory leak: subscribe không unsubscribe | Quên cleanup trong `ngOnDestroy` | Dùng `takeUntil(destroy$)` hoặc `takeUntilDestroyed()` Angular 16+ |

---

## 8. 📌 Summary

1. **Service** = `@Injectable` class. `providedIn: 'root'` = singleton toàn app
2. **DI**: Angular tự inject — `constructor(private svc: MyService)`. Không cần `new MyService()`
3. **BehaviorSubject** cho shared reactive state. `.next()` để update, `.asObservable()` để expose
4. **`takeUntil(destroy$)`** = pattern chuẩn để tránh memory leak khi component destroy
5. **HTTP Interceptor** = add token, handle errors globally cho mọi request

**→ [Bài 05: Angular Routing](../05_routing/) — Route guards, lazy loading, child routes.**
