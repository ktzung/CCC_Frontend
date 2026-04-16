# 🔴 ANGULAR - BÀI 04
# **SERVICES & DEPENDENCY INJECTION**

## 🎬 "Component Không Nên Gọi API" — Services & DI

*Minh viết `fetch()` ngay trong component. Code chạy — nhưng 5 component cùng gọi cùng API → duplicate 500 dòng. Anh Hùng: "Service = cầu nối giữa component và data. DI = nhà hàng: em (component) không vào bếp, WAITER (Angular) mang service đến bàn."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Tạo và sử dụng services
- Hiểu Dependency Injection
- Inject services vào components
- Share data giữa components qua services

---

## 1. **TẠO SERVICE**

```bash
ng generate service user
```

**user.service.ts:**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton service
})
export class UserService {
  private users: any[] = [];

  getUsers() {
    return this.users;
  }

  addUser(user: any) {
    this.users.push(user);
  }

  getUserById(id: number) {
    return this.users.find(u => u.id === id);
  }
}
```

---

## 2. **INJECT SERVICE**

**user-list.component.ts:**
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```

---

## 3. **SHARE DATA VIA SERVICE**

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private data = new BehaviorSubject<string>('initial');
  data$ = this.data.asObservable();

  updateData(value: string) {
    this.data.next(value);
  }
}
```

---

**Bài tiếp theo:** [05. Routing](../05_routing/05_routing.md) - Angular Router.
