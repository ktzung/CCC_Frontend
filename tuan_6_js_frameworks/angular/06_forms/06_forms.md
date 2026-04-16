# 🔴 ANGULAR - BÀI 06
# **FORMS**

## 🎬 "2 Triết Lý Form: Template-Driven vs Reactive" — Angular Cho Cả Hai

*Minh: "Vue/React chỉ có 1 cách làm form. Angular cho 2?" Chị Hà: "Template-driven = form đơn giản (login, contact). Reactive Forms = form enterprise (50 fields, dynamic validation, nested groups). Angular cho em CHỌN vũ khí phù hợp."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Tạo Template-driven forms
- Tạo Reactive forms
- Validate forms
- Handle form submission

---

## 1. **TEMPLATE-DRIVEN FORMS**

**app.module.ts:**
```typescript
import { FormsModule } from '@angular/forms';
```

**Component:**
```typescript
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
```

**Template:**
```html
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
  <input 
    name="email" 
    [(ngModel)]="user.email" 
    required 
    email
  />
  <input 
    name="password" 
    [(ngModel)]="user.password" 
    required 
    minlength="6"
  />
  <button type="submit" [disabled]="!loginForm.valid">
    Submit
  </button>
</form>
```

---

## 2. **REACTIVE FORMS**

**app.module.ts:**
```typescript
import { ReactiveFormsModule } from '@angular/forms';
```

**Component:**
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
```

**Template:**
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <input formControlName="email" />
  <div *ngIf="loginForm.get('email')?.hasError('required')">
    Email is required
  </div>
  
  <input formControlName="password" type="password" />
  
  <button type="submit" [disabled]="!loginForm.valid">
    Submit
  </button>
</form>
```

---

**Bài tiếp theo:** [07. HTTP Client](../07_http/07_http_client.md) - API Integration.
