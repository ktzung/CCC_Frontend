# 🔴 ANGULAR - BÀI 09
# **ADVANCED ANGULAR — Signals, Change Detection, Custom Pipes, Testing**

---

## 0. 🎬 Opening Hook

*"Angular app của tôi re-render toàn bộ mỗi khi click vào 1 chỗ nhỏ xíu," Minh than. "React useMemo solve rồi. Angular thì sao?"*

*Chị Hà: "2 thứ. Ngắn hạn: `ChangeDetectionStrategy.OnPush` — component chỉ re-render khi Input reference thay đổi hoặc Observable emit. Dài hạn: Angular 17+ `Signals` — như Vue's `ref()`, không cần Zone.js, fine-grained reactivity. Angular đang evolve rất nhanh."*

---

## 1. 🎯 Why This Matters

Bài này là **differentiator** giữa junior và mid-level Angular developer:
- **Change Detection** — hiểu để tránh performance bugs
- **OnPush + Signals** — modern Angular performance
- **Custom Pipes** — format data trong template
- **Testing** — unit test component và service

---

## 2. 🌐 Big Picture

```
ANGULAR CHANGE DETECTION EVOLUTION

Angular 2-16 (Zone.js era):
  Event → Zone.js intercepts → CheckAll components → Update DOM
  Vấn đề: Kiểm tra TẤT CẢ components dù chỉ 1 thay đổi

OnPush Strategy (partial fix):
  Event → Only check component if:
    - @Input reference changed
    - Observable/async pipe emitted
    - ChangeDetectorRef.markForCheck() called

Angular 17+ Signals (fine-grained reactivity):
  signal.set(newValue) → Only re-render components using this signal
  Giống Vue ref(), React useState() nhưng KHÔNG cần subscribe/unsubscribe

SIGNALS vs OBSERVABLE:
signal()        → sync state, auto-tracked, no subscribe
Observable$     → async streams, need subscribe/takeUntil
Both work together in Angular 17+
```

---

## 3. ⚙️ Core Technical Truth

### Angular Signals (Angular 17+)

```typescript
import { signal, computed, effect } from '@angular/core';

@Component({
    standalone: true,
    template: `
        <p>Count: {{ count() }}</p>
        <p>Double: {{ doubleCount() }}</p>
        <button (click)="increment()">+</button>
        <button (click)="decrement()">-</button>
        <button (click)="reset()">Reset</button>
    `
})
export class CounterComponent {
    // signal() = reactive state (như Vue ref())
    count = signal(0);

    // computed() = derived signal (như Vue computed())
    doubleCount = computed(() => this.count() * 2);

    // effect() = side effect khi signal thay đổi (như Vue watch)
    constructor() {
        effect(() => {
            console.log('Count changed:', this.count());
            // Runs automatically when count changes
        });
    }

    increment() { this.count.update(c => c + 1); }
    decrement() { this.count.update(c => c - 1); }
    reset() { this.count.set(0); }
}

// Signals trong service — shared reactive state
@Injectable({ providedIn: 'root' })
export class CartSignalService {
    // Signal state
    private _items = signal<CartItem[]>([]);
    private _isOpen = signal(false);

    // Readonly computed signals (expose read-only)
    items = this._items.asReadonly();
    isOpen = this._isOpen.asReadonly();
    totalItems = computed(() => this._items().reduce((sum, item) => sum + item.qty, 0));
    totalPrice = computed(() => this._items().reduce((sum, item) => sum + item.price * item.qty, 0));

    addItem(product: Product) {
        this._items.update(items => {
            const existing = items.find(i => i.id === product.id);
            if (existing) {
                return items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...items, { ...product, qty: 1 }];
        });
    }

    removeItem(id: number) {
        this._items.update(items => items.filter(i => i.id !== id));
    }

    toggleCart() {
        this._isOpen.update(v => !v);
    }
}

// Component dùng Signal service — cực kỳ clean
@Component({
    standalone: true,
    template: `
        <button (click)="cartService.toggleCart()">
            🛒 {{ cartService.totalItems() }}
        </button>
        <div *ngIf="cartService.isOpen()">
            <div *ngFor="let item of cartService.items()">
                {{ item.name }} × {{ item.qty }}
            </div>
            <p>Total: {{ cartService.totalPrice() | currency:'VND':'symbol':'1.0-0' }}</p>
        </div>
    `
})
export class NavbarComponent {
    constructor(public cartService: CartSignalService) {}
}
```

---

### Change Detection — OnPush

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef, Input, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    template: `
        <div class="card">
            <!-- Template tự update khi product (Input) reference thay đổi -->
            <img [src]="product.imageUrl" [alt]="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price | currency:'VND':'symbol':'1.0-0' }}</p>

            <!-- async pipe với OnPush: tự trigger CD khi emit -->
            <span *ngIf="isOnSale$ | async">🔥 Đang giảm giá</span>

            <button (click)="addToCart()">Thêm vào giỏ</button>
        </div>
    `
})
export class ProductCardComponent {
    @Input() product!: Product;
    @Input() isOnSale$!: Observable<boolean>;

    constructor(
        private cartService: CartSignalService,
        private cdr: ChangeDetectorRef,
    ) {}

    addToCart() {
        this.cartService.addItem(this.product);
        // Nếu cần force re-render với OnPush:
        // this.cdr.markForCheck();
    }
}
```

---

### Custom Pipes

```typescript
// pipes/currency-vnd.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyVnd',
    standalone: true,
    pure: true,  // Default: chỉ re-run khi input thay đổi (performance)
})
export class CurrencyVndPipe implements PipeTransform {
    transform(value: number, showSymbol = true): string {
        if (isNaN(value)) return '—';
        const formatted = value.toLocaleString('vi-VN');
        return showSymbol ? `${formatted}đ` : formatted;
    }
}

// pipes/time-ago.pipe.ts — Relative time
@Pipe({ name: 'timeAgo', standalone: true, pure: false }) // pure: false = re-evaluate every CD
export class TimeAgoPipe implements PipeTransform {
    transform(date: Date | string): string {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now.getTime() - past.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return 'vừa xong';
        if (diffMin < 60) return `${diffMin} phút trước`;
        if (diffHour < 24) return `${diffHour} giờ trước`;
        if (diffDay < 30) return `${diffDay} ngày trước`;
        return past.toLocaleDateString('vi-VN');
    }
}

// Sử dụng trong template
// {{ product.price | currencyVnd }}         → "25.990.000đ"
// {{ product.price | currencyVnd:false }}   → "25.990.000"
// {{ order.createdAt | timeAgo }}            → "3 giờ trước"
// {{ order.total | currency:'VND':'symbol':'1.0-0' }}  → Built-in pipe
```

---

### Unit Testing

```typescript
// product.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify()); // Verify no pending requests

    it('should fetch products', () => {
        const mockProducts: Product[] = [
            { id: 1, name: 'iPhone 15', price: 25990000, category: 'phone', stock: 10, imageUrl: '' }
        ];

        service.getAll().subscribe(products => {
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('iPhone 15');
        });

        const req = httpMock.expectOne('/api/products');
        expect(req.request.method).toBe('GET');
        req.flush({ data: mockProducts });  // Mock response
    });

    it('should handle HTTP error', () => {
        service.getAll().subscribe({
            next: () => fail('Expected error'),
            error: (err) => expect(err.message).toContain('500'),
        });

        httpMock.expectOne('/api/products').flush(
            { message: 'Server Error' },
            { status: 500, statusText: 'Internal Server Error' }
        );
    });
});

// product-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { CartSignalService } from '../../services/cart-signal.service';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;
    let mockCartService: jasmine.SpyObj<CartSignalService>;

    beforeEach(async () => {
        mockCartService = jasmine.createSpyObj('CartSignalService', ['addItem']);

        await TestBed.configureTestingModule({
            imports: [ProductCardComponent],
            providers: [
                { provide: CartSignalService, useValue: mockCartService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        component.product = { id: 1, name: 'Test', price: 100000, category: 'test', stock: 5, imageUrl: '' };
        fixture.detectChanges();
    });

    it('should render product name', () => {
        const h3 = fixture.nativeElement.querySelector('h3');
        expect(h3.textContent).toContain('Test');
    });

    it('should call addItem when button clicked', () => {
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(mockCartService.addItem).toHaveBeenCalledWith(component.product);
    });
});
```

---

## 4. 🟢 Simplified Layer

> **Signals (Angular 17+): `signal(value)` + `computed(() => ...)` + `effect(() => ...)` = Vue-like reactivity, không cần RxJS cho state.**
> **OnPush = opt-in performance: component chỉ re-render khi Input thay đổi hoặc `async pipe` emits. Không phải default vì cần discipline.**

---

## 5. 🛠️ Hands-on Practice

```bash
# Bài tập: Migrate BehaviorSubject service sang Signals
# 1. CartService: đổi BehaviorSubject → signal()
# 2. Computed: totalItems, totalPrice từ computed()
# 3. Component: truy cập signal như cartService.totalItems()
# 4. Viết unit test cho CartSignalService với jasmine.createSpyObj
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"OnPush = component không update"** | OnPush chỉ skip **automatic** CD. Vẫn update khi: @Input reference thay đổi (mutable object mutation sẽ không trigger!), async pipe emits, event từ component, `markForCheck()` gọi thủ công |
| **"Signals thay thế hoàn toàn RxJS"** | Không — chúng complement nhau. Signals cho sync state, RxJS cho async streams (HTTP, WebSocket, complex transformations). Angular team muốn cả hai tồn tại |
| **"Pipe `pure: false` thì tốt hơn"** | Ngược lại — `pure: false` re-evaluate mỗi change detection cycle → performance hit. Chỉ dùng khi pipe depend on external mutable state (như `timeAgo`) |
| **"Unit test Angular phức tạp không cần thiết"** | Testing = documentation sống + safety net khi refactor. `jasmine.createSpyObj` để mock dependencies = clean, isolated tests. Enterprise projects yêu cầu > 80% coverage |

---

## 7. ✅ Checkpoint

1. `ChangeDetectionStrategy.OnPush` — 3 điều kiện nào trigger re-render?
2. Signals khác Observable thế nào? Khi nào dùng cái nào?
3. Custom Pipe `pure: true` vs `pure: false` — trade-off là gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. OnPush trigger: (1) `@Input()` property nhận **reference mới** (primitive mới, object/array mới — mutation không trigger). (2) `async pipe` nhận emission từ Observable/Promise. (3) Event (click, input...) phát sinh từ chính component hoặc children. Plus: `ChangeDetectorRef.markForCheck()` hoặc `ChangeDetectorRef.detectChanges()` gọi thủ công.
2. **Signal**: Synchronous, always has current value, no subscribe/unsubscribe, auto-tracked dependency. Dùng cho: UI state, component state, shared state đơn giản. **Observable**: Asynchronous, lazy, cancellable, rich operators. Dùng cho: HTTP calls, WebSocket, complex async transformations, time-based operations.
3. `pure: true` (default): Pipe chỉ re-evaluate khi **input arguments thay đổi** (reference equality). Performance tốt. Nhưng nếu pipe depend on external state (time, random) → stale results. `pure: false`: Re-evaluate mỗi CD cycle → luôn fresh nhưng CPU intensive. Chỉ dùng khi thực sự cần (timeAgo, random ID generators).

</details>

---

## 8. 📌 Summary

1. **Signals** (Angular 17+): `signal()` + `computed()` + `effect()` — fine-grained reactivity, no RxJS overhead for state
2. **OnPush**: Performance optimization — component chỉ re-render khi Input reference thay đổi hoặc Observable emits
3. **Custom Pipes**: `@Pipe({ name, standalone, pure })` → `transform(value, ...args)`. Pure cho performance, impure cho time-dependent
4. **Testing**: `TestBed`, `HttpClientTestingModule`, `jasmine.createSpyObj` cho mock services
5. **trackBy** trong `*ngFor` — tương tự `:key` Vue — tránh re-render toàn bộ list khi 1 item thay đổi

---

## 🎓 Chúc mừng! Bạn đã hoàn thành Tuần 6 — JavaScript Frameworks

```
TỔNG KẾT TUẦN 6:

React ────────────────────────────────────────────────
✅ SPA Architecture, Virtual DOM, JSX
✅ Hooks: useState, useEffect, useRef, useMemo, useCallback
✅ Advanced: useReducer, Custom Hooks (useFetch, useDebounce)
✅ React Router v6: nested routes, protected routes
✅ Redux Toolkit: createSlice, createAsyncThunk, selectors
✅ Zustand: lightweight alternative

Vue 3 ────────────────────────────────────────────────
✅ Getting Started: Composition API, <script setup>, SFC
✅ Dev Environment: Vite, project structure, env variables
✅ Template Syntax: v-if, v-for, v-bind, v-model, v-on
✅ Event Handling: modifiers, custom events, defineEmits
✅ Components: defineProps, slots, scoped styles, defineExpose
✅ Lifecycle Hooks: onMounted, onUnmounted, AbortController
✅ Vue Router: lazy loading, guards, nested routes
✅ Pinia: defineStore, storeToRefs, persist plugin
✅ API Integration: useFetch composable, Axios interceptors
✅ Form Handling: manual validation, VeeValidate + Yup

Angular ──────────────────────────────────────────────
✅ Getting Started: TypeScript, @Component, Angular CLI
✅ Components: @Input/@Output, directives, lifecycle
✅ Services & DI: @Injectable, BehaviorSubject, takeUntil
✅ Routing: lazy loading, functional guards, ActivatedRoute
✅ Forms: Reactive Forms, FormBuilder, FormArray, validators
✅ HTTP Client: HttpClient, Interceptors
✅ RxJS: Observable, Subject, key operators
✅ Advanced: Signals, OnPush, Custom Pipes, Testing

→ Tuần 7: Build Tools, Testing, Deployment
```
