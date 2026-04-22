# 🔴 ANGULAR - BÀI 07
# **HTTP CLIENT & RXJS — Gọi API Cấp Doanh Nghiệp**

---

## 0. 🎬 Opening Hook

*Minh thấy code Angular gọi API:*
```typescript
this.http.get('/api/products').pipe(
    debounceTime(300),
    switchMap(q => this.http.get(`/api/search?q=${q}`)),
    retry(3),
    catchError(err => of([]))
).subscribe(...)
```

*"Pipe, switchMap, retry, of — cái gì vậy?" Minh hỏi.*

*"RxJS," chị Hà nói. "Observable = luồng data theo thời gian. Operators = transforms trên luồng. switchMap tự cancel request cũ khi có request mới — search debounce mà không leak. React/Vue phải tự viết. Angular built-in."*

---

## 1. 🎯 Why This Matters

Angular HttpClient + RxJS = stack xử lý async mạnh nhất trong frontend:
- **Observable** = Promise nhưng có thể cancel, retry, transform
- **Operators** = `map`, `filter`, `switchMap`, `debounceTime` — functional transforms
- **Interceptors** = middleware cho mọi HTTP request/response
- **Type safety** = `http.get<Product[]>()` → TypeScript biết shape của response

---

## 2. 🌐 Big Picture — Observable vs Promise

```
PROMISE (React/Vue chuẩn)      OBSERVABLE (Angular/RxJS)
─────────────────────────      ──────────────────────────
Eagerly execute                Lazily execute (subscribe mới chạy)
1 value (then/catch)           0 to infinite values (stream)
Not cancellable                Cancellable (unsubscribe)
No operators                   50+ operators (pipe, map, filter...)

USE CASES:
Promise: Login, create post    Observable: Search, WebSocket, timer
         (1-shot async)                   (ongoing stream)

HttpClient GET:
  fetch('/api')           → Promise<Response>
  this.http.get('/api')   → Observable<Response>
                            Phải subscribe() để chạy
                            Tự cancel nếu component destroy + takeUntil
```

---

## 3. ⚙️ Core Technical Truth

### Setup HttpClient (Angular 17+)

```typescript
// main.ts — Standalone bootstrap
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
    ]
});
```

---

### HttpClient — CRUD Operations

```typescript
// services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface ApiResponse<T> {
    data: T;
    message: string;
    total?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
    private baseUrl = '/api/products';

    constructor(private http: HttpClient) {}

    // GET với query params
    getAll(page = 1, limit = 10, category?: string): Observable<Product[]> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        if (category) params = params.set('category', category);

        return this.http.get<ApiResponse<Product[]>>(this.baseUrl, { params }).pipe(
            map(response => response.data),          // Unwrap API response wrapper
            tap(products => console.log('Fetched:', products.length)),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    create(product: CreateProductDto): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, changes: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${this.baseUrl}/${id}`, changes).pipe(
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    // Upload file
    uploadImage(productId: number, file: File): Observable<{ imageUrl: string }> {
        const formData = new FormData();
        formData.append('image', file);

        return this.http.post<{ imageUrl: string }>(
            `${this.baseUrl}/${productId}/image`,
            formData
            // Không set Content-Type — browser tự set với boundary
        );
    }

    private handleError(error: any): Observable<never> {
        const messages: Record<number, string> = {
            400: 'Dữ liệu không hợp lệ',
            401: 'Phiên đăng nhập hết hạn',
            403: 'Không có quyền thực hiện',
            404: 'Không tìm thấy dữ liệu',
            422: 'Dữ liệu validation lỗi',
            500: 'Lỗi server, vui lòng thử lại sau',
        };

        const message = messages[error.status] ?? `Lỗi không xác định (${error.status})`;
        console.error('HTTP Error:', error);
        return throwError(() => new Error(message));
    }
}
```

---

### RxJS Operators Quan Trọng

```typescript
import {
    map, filter, switchMap, mergeMap, concatMap,
    debounceTime, distinctUntilChanged, retry,
    catchError, tap, of, forkJoin, combineLatest
} from 'rxjs';

// ---- TRANSFORMATION ----

// map: Transform mỗi emitted value
products$.pipe(
    map(products => products.filter(p => p.stock > 0))
)

// switchMap: Cancel previous inner observable, subscribe mới
// DÙNG CHO: Search (cancel request cũ khi gõ mới)
searchQuery$.pipe(
    debounceTime(300),          // Đợi 300ms sau lần gõ cuối
    distinctUntilChanged(),     // Skip nếu query không thay đổi
    switchMap(query =>          // Cancel request cũ, start mới
        this.http.get<Product[]>(`/api/search?q=${query}`).pipe(
            catchError(() => of([]))  // Error → return empty array
        )
    )
)

// mergeMap: Chạy concurrent (không cancel)
// DÙNG CHO: Upload nhiều files cùng lúc
selectedFiles$.pipe(
    mergeMap(file => this.uploadService.upload(file))
)

// concatMap: Queue, chạy tuần tự
// DÙNG CHO: Ordered operations
orderedActions$.pipe(
    concatMap(action => this.http.post('/api/action', action))
)

// ---- ERROR HANDLING ----

// retry: Thử lại N lần khi error
this.http.get('/api/products').pipe(
    retry(3),  // Retry 3 lần trước khi throw error
    catchError(err => of([]))  // Fallback khi tất cả retry fail
)

// ---- MULTIPLE STREAMS ----

// forkJoin: Đợi tất cả complete (như Promise.all)
forkJoin({
    products: this.productService.getAll(),
    categories: this.categoryService.getAll(),
    user: this.authService.getProfile(),
}).subscribe(({ products, categories, user }) => {
    this.products = products;
    this.categories = categories;
    this.user = user;
})

// combineLatest: Emit khi bất kỳ source nào emit mới
combineLatest([
    this.searchQuery$,
    this.categoryFilter$,
    this.priceRange$,
]).pipe(
    debounceTime(200),
    switchMap(([query, category, priceRange]) =>
        this.productService.search({ query, category, priceRange })
    )
).subscribe(results => this.products = results)
```

---

### Sử dụng trong Component

```typescript
// products.component.ts
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Component({
    standalone: true,
    imports: [CommonModule, AsyncPipe, FormsModule],
    template: `
        <input [(ngModel)]="searchQuery" (input)="onSearch($event)" />
        <select [(ngModel)]="selectedCategory" (change)="onCategoryChange()">
            <option value="">Tất cả</option>
            <option *ngFor="let cat of categories$ | async" [value]="cat.id">
                {{ cat.name }}
            </option>
        </select>

        <!-- async pipe tự subscribe và unsubscribe -->
        <div *ngIf="products$ | async as products; else loading">
            <app-product-card
                *ngFor="let p of products; trackBy: trackById"
                [product]="p"
            />
        </div>
        <ng-template #loading><p>⏳ Đang tải...</p></ng-template>
    `
})
export class ProductsComponent implements OnInit {
    private searchQuery$ = new BehaviorSubject<string>('');
    private category$ = new BehaviorSubject<string>('');
    private destroy$ = new Subject<void>();

    // Products stream: tự update khi search/category thay đổi
    products$ = combineLatest([
        this.searchQuery$.pipe(debounceTime(300), distinctUntilChanged()),
        this.category$,
    ]).pipe(
        switchMap(([query, category]) =>
            this.productService.getAll(1, 20, category || undefined).pipe(
                map(products => products.filter(p =>
                    !query || p.name.toLowerCase().includes(query.toLowerCase())
                )),
                catchError(() => of([]))
            )
        ),
        shareReplay(1)  // Cache latest value cho multiple subscribers
    );

    categories$ = this.categoryService.getAll().pipe(shareReplay(1));

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
    ) {}

    ngOnInit() {}

    onSearch(event: Event) {
        this.searchQuery$.next((event.target as HTMLInputElement).value);
    }

    onCategoryChange() {
        this.category$.next(this.selectedCategory);
    }

    trackById = (index: number, product: Product) => product.id;

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

---

## 4. 🟢 Simplified Layer

> **`http.get<T>(url)` = Observable, phải `.subscribe()` hoặc dùng `async pipe` trong template.**
> **`switchMap` cho search (cancel cũ). `mergeMap` cho concurrent. `forkJoin` như Promise.all. `debounceTime(300)` + `distinctUntilChanged()` cho search UX.**

---

## 5. 🛠️ Hands-on Practice

```typescript
// Bài tập: Search Component với debounce
// 1. Input search → BehaviorSubject
// 2. pipe(debounceTime(400), distinctUntilChanged())
// 3. switchMap → http.get('/api/search?q=...')
// 4. catchError → return of([])
// 5. async pipe trong template để hiển thị results
// 6. Loading state với startWith([]) hoặc tap()
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Observable = Promise"** | Observable: lazy (chưa subscribe thì không chạy), cancellable, multiple values, rich operators. Promise: eager, không cancel, 1 value |
| **"`switchMap` và `mergeMap` như nhau"** | `switchMap` cancel inner observable khi new value arrives → dùng cho search. `mergeMap` chạy tất cả concurrent → upload files. Dùng nhầm = race conditions hoặc cancel không mong muốn |
| **"Luôn phải subscribe() thủ công"** | `async pipe` trong Angular template tự subscribe và **tự unsubscribe** khi component destroy → ưu tiên dùng `async pipe` thay subscribe thủ công |
| **"`catchError` trong service là đủ"** | Tùy. Service catchError → component không biết lỗi. Tốt hơn: service throw lỗi đã format, component catch và display |

---

## 7. ✅ Checkpoint

1. Observable vs Promise — 3 điểm khác nhau quan trọng nhất?
2. `switchMap` và `mergeMap` — khi nào dùng cái nào?
3. Tại sao `async pipe` tốt hơn `subscribe()` thủ công trong template?

<details>
<summary>👁️ Xem đáp án</summary>

1. (1) **Lazy**: Observable không chạy cho đến khi subscribe. Promise eagerly execute ngay khi tạo. (2) **Cancellable**: Unsubscribe = cancel in-flight request. Promise không cancel được. (3) **Multiple values**: Observable emit nhiều values qua time (WebSocket, timer). Promise chỉ resolve 1 lần.
2. `switchMap`: Khi chỉ muốn **kết quả của request cuối cùng** — search, autocomplete. Request cũ bị cancel. `mergeMap`: Khi muốn **tất cả requests hoàn thành** — upload nhiều files, batch operations. Request không cancel nhau.
3. `async pipe`: (1) Tự subscribe khi component init. (2) Tự unsubscribe khi component destroy → không memory leak. (3) Tự trigger change detection. Subscribe thủ công: phải nhớ unsubscribe trong ngOnDestroy (dễ quên).

</details>

---

## 8. 📌 Summary

1. **HttpClient** = `http.get<T>()`, `post()`, `put()`, `patch()`, `delete()` → returns **Observable**
2. **Key operators**: `map` (transform), `switchMap` (cancel+new), `debounceTime` (wait), `catchError` (fallback)
3. **`forkJoin`** = parallel requests (như Promise.all). **`combineLatest`** = reactive stream từ multiple sources
4. **`async pipe`** trong template = tự subscribe + unsubscribe. Ưu tiên hơn manual subscribe
5. **Interceptors**: Thêm token, handle 401/500 globally — viết 1 lần, áp dụng cho mọi request

**→ [Bài 08: RxJS Deep Dive](../08_rxjs/) — Subject, BehaviorSubject, custom operators: reactive programming patterns.**
