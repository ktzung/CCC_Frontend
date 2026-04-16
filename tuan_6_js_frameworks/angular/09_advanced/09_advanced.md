# 🔴 ANGULAR - BÀI 09
# **ADVANCED TOPICS**

## 🎬 "Lazy Loading, Guards, Pipes — Vũ Khí Cuối Cùng" — Angular Master Class

*Minh: "Angular app tải 5MB JavaScript!" Chị Hà: "Lazy loading — chia app thành chunks, chỉ tải khi user truy cập module đó. Route Guards — chặn user chưa login. Custom Pipes — format tiền VNĐ, ngày tháng. Đây là những thứ biến junior thành senior."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Change Detection
- Sử dụng OnPush strategy
- Implement lazy loading
- Testing Angular applications
- Performance optimization

---

## 1. **CHANGE DETECTION**

Angular sử dụng change detection để cập nhật view khi data thay đổi.

### 1.1. Default Strategy

```typescript
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.Default
})
```

### 1.2. OnPush Strategy

```typescript
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

OnPush chỉ check khi:
- Input reference thay đổi
- Event từ component
- Async pipe emits

---

## 2. **LAZY LOADING**

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

---

## 3. **TESTING**

```typescript
import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
```

---

## 4. **PERFORMANCE OPTIMIZATION**

- ✅ Use OnPush change detection
- ✅ Lazy load modules
- ✅ Use trackBy với *ngFor
- ✅ Unsubscribe Observables
- ✅ Use async pipe
- ✅ Avoid unnecessary re-renders

---

**Hoàn thành Angular!** Bạn đã nắm vững Angular từ cơ bản đến nâng cao.
