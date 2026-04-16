# 🔴 ANGULAR - BÀI 08
# **RXJS - REACTIVE PROGRAMMING**

## 🎬 "Promise Xử Lý 1 Lần. Observable Xử Lý MÃI MÃI" — RxJS: Khó Nhưng Mạnh

*Minh: "RxJS khó quá — Observable, pipe, map, switchMap, debounceTime..." Chị Hà: "RxJS = công thức Excel cho DATA STREAMS. Search input → debounce 300ms → gọi API → lọc kết quả → hiển thị. 1 pipe chain thay 20 dòng setTimeout + fetch."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Observables và Observers
- Sử dụng operators (map, filter, switchMap)
- Xử lý async operations
- Sử dụng Subjects và BehaviorSubjects

---

## 1. **OBSERVABLES**

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

observable.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('Done')
});
```

---

## 2. **OPERATORS**

```typescript
import { map, filter } from 'rxjs/operators';

this.http.get<User[]>('/api/users')
  .pipe(
    map(users => users.filter(u => u.active)),
    map(users => users.length)
  )
  .subscribe(count => console.log(count));
```

---

## 3. **SUBJECTS**

```typescript
import { Subject, BehaviorSubject } from 'rxjs';

// Subject
const subject = new Subject<string>();
subject.next('Hello');
subject.subscribe(value => console.log(value));

// BehaviorSubject (có giá trị ban đầu)
const behaviorSubject = new BehaviorSubject<string>('Initial');
behaviorSubject.subscribe(value => console.log(value));
behaviorSubject.next('New value');
```

---

**Bài tiếp theo:** [09. Advanced](../09_advanced/09_advanced.md) - Advanced patterns.
