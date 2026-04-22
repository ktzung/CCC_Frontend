# 🔴 ANGULAR - BÀI 08
# **RxJS — Reactive Programming với Streams**

---

## 0. 🎬 Opening Hook

*Chị Hà vẽ lên bảng:*

```
Search Input (user gõ "iph") ──────────┐
                                        ↓ debounceTime(300)
API call /search?q=iph        ──────────┤ switchMap
                                        ↓
Results: [iPhone 15, ...]    ←──────────┘

Nếu user gõ thêm "iphone" trong 300ms → request "iph" bị cancel tự động
```

*"React/Vue cần setTimeout + cleanup + AbortController = 15 dòng. RxJS pipe chain = 4 dòng. Đây là sức mạnh Reactive Programming."*

---

## 1. 🎯 Why This Matters

RxJS không chỉ dành cho Angular — nhưng Angular tích hợp sâu:
- **HttpClient** returns Observable
- **Router events** là Observable
- **Form valueChanges** là Observable
- **Store state** trong NgRx là Observable

Không hiểu RxJS = không đọc được Angular code thực tế.

---

## 2. 🌐 Big Picture

```
OBSERVABLE = STREAM OF VALUES OVER TIME

Spreadsheet analogy:
  Cell A1 = 5    Cell A2 = 3    Cell B1 = A1 + A2 (=8)
  A1 đổi → 10   B1 tự update → 13

Observable:
  source$ = stream of values
  derived$ = source$.pipe(transform1, transform2)
  derived$ tự update khi source$ emit mới

TYPES:
Observable   → Emit values theo time, lazy
Subject      → Observable + can push values manually (EventEmitter)
BehaviorSubject → Subject + has current value (state management)
ReplaySubject   → Subject + replay N last values

MARBLE DIAGRAM (đọc trái → phải = thời gian):
source$:   ──1──2──3──4──5──|
.pipe(
  filter(x => x % 2 === 0)
)
result$:   ─────2─────4─────|

source$:   ──a──b──c──d──|
.pipe(
  map(x => x.toUpperCase())
)
result$:   ──A──B──C──D──|
```

---

## 3. ⚙️ Core Technical Truth

### Observable Fundamentals

```typescript
import { Observable, of, from, interval, fromEvent, timer, EMPTY } from 'rxjs';
import { map, filter, take, takeUntil, tap } from 'rxjs/operators';

// Tạo Observable từ scratch
const manual$ = new Observable<number>(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    setTimeout(() => {
        subscriber.next(3);
        subscriber.complete();  // Done
    }, 1000);
});

// Subscribe
const sub = manual$.subscribe({
    next: (value) => console.log('Value:', value),
    error: (err) => console.error('Error:', err),
    complete: () => console.log('Complete'),
});

// Unsubscribe khi không cần nữa (tránh memory leak)
sub.unsubscribe();

// ─── Helper Creators ───
of(1, 2, 3)              // Observable từ values (synchronous)
from([1, 2, 3])          // Observable từ array/Promise/iterable
from(fetch('/api'))      // Observable từ Promise
interval(1000)           // Emit 0,1,2... mỗi 1 giây (infinite)
timer(2000)              // Emit 1 value sau 2 giây
fromEvent(document, 'click')  // DOM events as Observable
EMPTY                    // Complete immediately, no values
```

---

### Subject & BehaviorSubject

```typescript
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// Subject = Observable + Observer (có thể push values)
const subject$ = new Subject<string>();

// Subscribe trước khi next
subject$.subscribe(v => console.log('Sub 1:', v));
subject$.next('Hello');  // Sub 1: Hello
subject$.next('World');  // Sub 1: World

// Subscribe SAU khi next → không nhận values cũ
subject$.subscribe(v => console.log('Sub 2:', v));
subject$.next('Late');   // Sub 1: Late, Sub 2: Late (sub 2 bắt đầu nhận từ đây)

// BehaviorSubject = Subject với initial value
// Subscriber mới NGAY LẬP TỨC nhận current value
const state$ = new BehaviorSubject<{ count: number }>({ count: 0 });
state$.subscribe(s => console.log('State:', s.count));  // Ngay: 0
state$.next({ count: 1 });  // 1
state$.next({ count: 2 });  // 2

// New subscriber
state$.subscribe(s => console.log('New sub:', s.count));  // Ngay nhận: 2

// Get current value synchronously
console.log('Current:', state$.value.count);  // 2

// ReplaySubject = replay N last values cho subscriber mới
const replay$ = new ReplaySubject<number>(3);  // Buffer 3 values
replay$.next(1); replay$.next(2); replay$.next(3); replay$.next(4);
replay$.subscribe(v => console.log('Replay:', v));  // Nhận: 2, 3, 4 (last 3)
```

---

### Essential Operators với Use Cases

```typescript
import {
    map, filter, tap, take, takeUntil, skip,
    switchMap, mergeMap, concatMap, exhaustMap,
    debounceTime, distinctUntilChanged, throttleTime,
    catchError, retry, retryWhen, delay,
    combineLatest, forkJoin, zip, merge,
    startWith, scan, reduce, share, shareReplay,
} from 'rxjs/operators';

// ─── TRANSFORMATION ───────────────────────────────
// map: Transform mỗi value
numbers$.pipe(map(n => n * 2))

// scan: Accumulate (như reduce nhưng emit intermediate values)
clicks$.pipe(
    scan((count, _) => count + 1, 0)
)  // 0, 1, 2, 3... (running total)

// ─── FILTERING ────────────────────────────────────
filter(x => x > 0)
take(5)           // Lấy 5 values đầu rồi complete
skip(2)           // Bỏ qua 2 values đầu
distinctUntilChanged()  // Bỏ qua nếu value giống value trước
debounceTime(300)       // Đợi 300ms im lặng rồi emit (typing search)
throttleTime(1000)      // Emit max 1 lần/giây (scroll, resize)

// ─── FLATTENING (chuyển Observable thành Observable) ──
switchMap   // Cancel previous, switch to new (search)
mergeMap    // Concurrent (upload multiple files)
concatMap   // Queue sequential (ordered API calls)
exhaustMap  // Ignore new while current running (prevent double-click submit)

// ─── ERROR HANDLING ───────────────────────────────
catchError(err => of(defaultValue))   // Recover with default
retry(3)                              // Retry 3 times
retryWhen(errors => errors.pipe(delay(1000)))  // Retry with delay

// ─── COMBINATION ──────────────────────────────────
combineLatest([a$, b$, c$])  // Emit khi bất kỳ source thay đổi
forkJoin([a$, b$, c$])       // Đợi tất cả complete (Promise.all)
merge(a$, b$)                // Merge streams
```

---

### Real-world: Search với RxJS

```typescript
@Component({
    standalone: true,
    imports: [CommonModule, AsyncPipe, FormsModule],
    template: `
        <input [(ngModel)]="searchText" (ngModelChange)="searchInput$.next($event)"
               placeholder="Tìm kiếm..." />

        <div *ngIf="isLoading">⏳</div>

        <ul *ngIf="(results$ | async) as results">
            <li *ngFor="let item of results">{{ item.name }}</li>
        </ul>
    `
})
export class SearchComponent implements OnDestroy {
    private destroy$ = new Subject<void>();
    isLoading = false;
    searchText = '';
    searchInput$ = new BehaviorSubject<string>('');

    results$ = this.searchInput$.pipe(
        debounceTime(400),              // Đợi 400ms sau keystroke cuối
        distinctUntilChanged(),         // Bỏ qua nếu query y hệt
        tap(() => this.isLoading = true),
        switchMap(query =>              // Cancel request cũ
            query.length < 2
                ? of([])               // Không search nếu < 2 ký tự
                : this.http.get<any[]>(`/api/search?q=${query}`).pipe(
                    catchError(() => of([]))  // Error → empty array
                )
        ),
        tap(() => this.isLoading = false),
        takeUntil(this.destroy$),       // Auto-complete khi component destroy
        shareReplay(1),                 // Share subscription, cache 1 value
    );

    constructor(private http: HttpClient) {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

---

## 4. 🟢 Simplified Layer

> **Observable = stream. Phải `.subscribe()` (hoặc `async pipe`) để chạy. Phải `unsubscribe()` hoặc dùng `takeUntil(destroy$)` để tránh leak.**
> **`BehaviorSubject` = state holder. `switchMap` = cancel + new request (search). `debounceTime(300)` + `distinctUntilChanged()` = search UX standard.**

---

## 5. 🛠️ Hands-on Practice

```typescript
// Bài tập: Autocomplete Component
// 1. Input → searchInput$ BehaviorSubject
// 2. pipe(debounceTime(400), distinctUntilChanged())
// 3. switchMap → http.get('/api/autocomplete?q=...')
// 4. results$ | async trong template
// 5. Click suggestion → emit selected (Output EventEmitter)
// 6. ngOnDestroy với takeUntil pattern
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Observable tự chạy khi tạo"** | Observable **lazy** — không chạy cho đến khi có subscriber. `http.get()` không tạo network request cho đến khi subscribe |
| **"Unsubscribe không quan trọng"** | Memory leak. `interval(1000)` không unsubscribe = chạy mãi mãi. Angular `async pipe` tự unsubscribe — lý do ưu tiên dùng nó |
| **"BehaviorSubject và Subject như nhau"** | Subject: subscriber mới không nhận values cũ. BehaviorSubject: subscriber mới nhận **current value** ngay lập tức. Quan trọng cho state management |
| **"`switchMap` luôn tốt hơn `mergeMap`"** | `switchMap` cancel inner observable khi new value arrives — BAD nếu order matters (save operations: dùng `concatMap`). BAD nếu cần tất cả (upload files: dùng `mergeMap`) |

---

## 7. ✅ Checkpoint

1. Tại sao `http.get()` cần subscribe() mới gửi request? Điều này khác Promise thế nào?
2. `switchMap`, `mergeMap`, `concatMap` — mỗi loại dùng cho use case nào?
3. `BehaviorSubject` tốt hơn `Subject` cho state management ở điểm nào?

<details>
<summary>👁️ Xem đáp án</summary>

1. Observable **lazy** — chỉ execute khi có subscriber. `const obs$ = http.get('/api')` = tạo Observable (không send request). `obs$.subscribe(...)` = subscribe → request được gửi. Khác Promise: `fetch('/api')` = eagerly execute ngay khi tạo. Lợi ích lazy: subscribe nhiều lần = nhiều requests; không subscribe = không request (zero cost).
2. `switchMap`: Search, autocomplete — muốn **cancel** request cũ khi query mới → prevent stale results. `mergeMap`: File uploads, independent API calls — muốn **concurrent** execution, không cancel. `concatMap`: Sequential operations, form saves — muốn **ordered** execution, wait for previous to complete.
3. BehaviorSubject cho state: (1) Có **initial value** — không có state undefined ban đầu. (2) **Subscriber mới nhận current value ngay** — component load sau vẫn nhận state hiện tại. (3) `.value` getter — sync access to current state. Subject không có initial value và không replay cho late subscribers.

</details>

---

## 8. 📌 Summary

1. **Observable**: Lazy stream of values. Must subscribe. `next/error/complete` protocol
2. **Subject/BehaviorSubject**: Observable you can push to. BehaviorSubject = current value holder (state)
3. **Key operators**: `map` (transform), `filter` (select), `switchMap` (cancel+new), `debounceTime` (wait), `catchError` (fallback)
4. **`takeUntil(destroy$)` + `ngOnDestroy`** = standard pattern để auto-unsubscribe
5. **`async pipe`** = subscribe + unsubscribe tự động trong template — best practice

**→ [Bài 09: Advanced Patterns](../09_advanced/) — Signals (Angular 17+), NgRx, performance optimization.**
