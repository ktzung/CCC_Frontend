# 🔴 ANGULAR - BÀI 07
# **HTTP CLIENT**

## 🎬 "fetch() Cơ Bản Quá — HttpClient Của Angular Có Interceptors" — Gọi API Cấp Doanh Nghiệp

*Minh dùng `fetch()`: phải tự handle loading, error, retry, token. 50 API calls = copy-paste 50 lần. Anh Hùng: "Angular HttpClient + Interceptor: viết 1 interceptor gắn token → TẤT CẢ request tự có token. Error handling → 1 chỗ. Retry → 1 dòng."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Setup HttpClient
- Thực hiện GET, POST, PUT, DELETE requests
- Xử lý responses và errors
- Sử dụng interceptors

---

## 1. **SETUP HTTP CLIENT**

**app.module.ts:**
```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule]
})
```

---

## 2. **SỬ DỤNG HTTP CLIENT**

**user.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

**Component:**
```typescript
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error(err)
    });
  }
}
```

---

**Bài tiếp theo:** [08. RxJS](../08_rxjs/08_rxjs.md) - Reactive Programming.
