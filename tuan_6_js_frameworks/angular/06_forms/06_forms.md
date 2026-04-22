# 🔴 ANGULAR - BÀI 06
# **ANGULAR FORMS — Reactive Forms & Template-Driven**

---

## 0. 🎬 Opening Hook

*"Angular có 2 cách làm form?" Minh hỏi. "Vue chỉ có 1 — v-model."*

*Chị Hà: "Template-driven = form đơn giản (login, contact). Reactive Forms = form enterprise (admin panel với 50 fields, dynamic validation, form arrays). Angular cho bạn chọn vũ khí. Phần lớn production dùng Reactive Forms vì testable và programmatic control hoàn toàn."*

---

## 1. 🎯 Why This Matters

Angular Forms = 2 approaches:
- **Template-driven**: Dùng `[(ngModel)]`, validation trong template. Đơn giản, ít code
- **Reactive Forms**: `FormBuilder`, validators trong TypeScript. Testable, powerful, enterprise-grade

---

## 2. 🌐 Big Picture

```
TEMPLATE-DRIVEN                    REACTIVE FORMS
────────────────────               ─────────────────────
Logic trong HTML                   Logic trong TypeScript
[(ngModel)]                        FormControl / FormGroup
Validation: required, email        Validators.required, custom
Testing: khó (DOM dependent)       Testing: dễ (pure TS)
Form phức tạp: khó                 Form phức tạp: tốt
Dynamic fields: khó                Dynamic fields: FormArray ✅
Change detection: dirty check      Change detection: Observable (valueChanges)

VUE EQUIVALENT:
Angular ngModel          ≈   v-model
FormControl              ≈   ref() với validation
FormGroup                ≈   reactive({}) với errors computed
Validators.required      ≈   custom validator function
FormArray                ≈   ref([]) với dynamic fields
```

---

## 3. ⚙️ Core Technical Truth

### Reactive Forms — Production Standard

```typescript
// login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = false;
    serverError = '';
    showPassword = false;

    // FormGroup định nghĩa form structure + validation
    loginForm = this.fb.group({
        email: ['', [
            Validators.required,
            Validators.email,
        ]],
        password: ['', [
            Validators.required,
            Validators.minLength(8),
        ]],
        rememberMe: [false],
    });

    // Convenient getters — truy cập controls dễ hơn
    get email() { return this.loginForm.get('email')!; }
    get password() { return this.loginForm.get('password')!; }

    // Helper: show error khi field dirty hoặc touched
    hasError(control: string, error: string): boolean {
        const ctrl = this.loginForm.get(control)!;
        return ctrl.hasError(error) && (ctrl.dirty || ctrl.touched);
    }

    async onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();  // Show all errors
            return;
        }

        this.isLoading = true;
        this.serverError = '';

        try {
            const { email, password } = this.loginForm.value;
            await this.authService.login(email!, password!).toPromise();

            const redirect = new URLSearchParams(window.location.search).get('redirect') ?? '/dashboard';
            await this.router.navigateByUrl(redirect);

        } catch (error: any) {
            this.serverError = error.message ?? 'Đăng nhập thất bại';
        } finally {
            this.isLoading = false;
        }
    }
}
```

```html
<!-- login.component.html -->
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
    <!-- Email field -->
    <div class="form-group" [class.has-error]="hasError('email', 'required') || hasError('email', 'email')">
        <label for="email">Email</label>
        <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="name@example.com"
        />
        <span *ngIf="hasError('email', 'required')" class="error">Email không được để trống</span>
        <span *ngIf="hasError('email', 'email')" class="error">Email không hợp lệ</span>
    </div>

    <!-- Password field -->
    <div class="form-group">
        <label for="password">Mật khẩu</label>
        <div class="input-group">
            <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
            />
            <button type="button" (click)="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
            </button>
        </div>
        <span *ngIf="hasError('password', 'required')" class="error">Mật khẩu không được để trống</span>
        <span *ngIf="hasError('password', 'minlength')" class="error">Tối thiểu 8 ký tự</span>
    </div>

    <!-- Remember me -->
    <label class="checkbox">
        <input type="checkbox" formControlName="rememberMe" />
        Ghi nhớ đăng nhập
    </label>

    <p *ngIf="serverError" class="server-error">{{ serverError }}</p>

    <button type="submit" [disabled]="isLoading" class="btn btn--primary btn--block">
        {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
    </button>
</form>
```

---

### FormArray — Dynamic Fields

```typescript
// product-form.component.ts — Form với dynamic variants
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ standalone: true, imports: [ReactiveFormsModule, CommonModule] })
export class ProductFormComponent {
    private fb = inject(FormBuilder);

    productForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(1000)]],
        description: ['', Validators.maxLength(500)],
        // FormArray — dynamic list of form groups
        variants: this.fb.array([
            this.createVariant()  // Start với 1 variant
        ]),
    });

    get variants() {
        return this.productForm.get('variants') as FormArray;
    }

    createVariant(): FormGroup {
        return this.fb.group({
            size: ['', Validators.required],
            color: ['', Validators.required],
            stock: [0, [Validators.required, Validators.min(0)]],
            price: [null],  // Optional override price
        });
    }

    addVariant() {
        this.variants.push(this.createVariant());
    }

    removeVariant(index: number) {
        this.variants.removeAt(index);
    }

    onSubmit() {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }
        console.log(this.productForm.value);
    }
}
```

```html
<!-- Dynamic form template -->
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
    <input formControlName="name" placeholder="Tên sản phẩm" />
    <input formControlName="price" type="number" placeholder="Giá" />

    <!-- FormArray -->
    <div formArrayName="variants">
        <div *ngFor="let variant of variants.controls; let i = index"
             [formGroupName]="i" class="variant-row">
            <input formControlName="size" placeholder="Size (S/M/L/XL)" />
            <input formControlName="color" placeholder="Màu" />
            <input formControlName="stock" type="number" placeholder="Tồn kho" />
            <button type="button" (click)="removeVariant(i)"
                    [disabled]="variants.length === 1">❌</button>
        </div>
    </div>

    <button type="button" (click)="addVariant()">+ Thêm variant</button>
    <button type="submit" [disabled]="productForm.invalid">Lưu sản phẩm</button>
</form>
```

---

### Custom Validators

```typescript
// validators/custom.validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator function
export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        if (!value) return null;  // Let required handle empty
        const phoneRegex = /^0[0-9]{9}$/;
        return phoneRegex.test(value) ? null : { phone: 'Số điện thoại không hợp lệ (0xxxxxxxxx)' };
    };
}

// Cross-field validator (passwords match)
export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
}

// Usage:
// this.fb.group({
//   phone: ['', [Validators.required, phoneValidator()]],
//   password: [''],
//   confirmPassword: [''],
// }, { validators: passwordMatchValidator })
```

---

## 4. 🟢 Simplified Layer

> **`fb.group({ field: ['defaultValue', [validators]] })` = define form. `formControlName="field"` = connect input. `form.invalid` = disable submit. `markAllAsTouched()` = show all errors.**
> **`fb.array([...])` = dynamic list of form groups. `array.push(fb.group({}))` để thêm, `array.removeAt(i)` để xóa.**

---

## 5. 🛠️ Hands-on Practice

```typescript
// Bài tập: Register Form với Reactive Forms
// Fields: name (required, min 2), email (required, email),
//         password (required, min 8, regex uppercase+number),
//         confirmPassword (phải match password),
//         phone (optional, regex 0[0-9]{9})
// Custom validator: passwordMatch cross-field
// Hiển thị error messages với hasError() helper
// Disable submit khi form invalid hoặc isLoading
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Template-driven là deprecated"** | Không — vẫn supported và phù hợp cho simple forms. Chỉ tránh dùng cho complex/dynamic forms |
| **"`formGroup.value` chứa tất cả values"** | Chứa giá trị của **enabled** controls. Disabled controls bị exclude. Dùng `formGroup.getRawValue()` để lấy cả disabled |
| **"`Validators.required` check falsy"** | Check `null`, `''`, `undefined` nhưng không check `'   '` (spaces). Thêm `Validators.pattern(/\S/)` hoặc custom validator trim |

---

## 7. ✅ Checkpoint

1. Khi nào dùng Template-driven, khi nào Reactive Forms?
2. `markAllAsTouched()` làm gì? Khi nào cần gọi?
3. `FormArray` giải quyết vấn đề gì mà `FormGroup` không làm được?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Template-driven**: Contact form, login form, search form — ít fields, validation đơn giản, không cần test riêng. **Reactive Forms**: Admin CRUD, checkout multi-step, form với dynamic fields (add/remove), form cần unit test, form cần programmatic control (reset, patch values conditionally).
2. `markAllAsTouched()` → set `touched = true` cho tất cả controls → Angular show validation errors của tất cả fields. Gọi khi user click Submit với form invalid → hiện tất cả lỗi cùng lúc thay vì chỉ fields đã touch.
3. `FormGroup` = fixed set of controls (tên field biết trước). `FormArray` = dynamic list — số lượng controls không biết trước. Ví dụ: Product variants (user add bao nhiêu tùy ý), education history, work experience.

</details>

---

## 8. 📌 Summary

1. **Template-driven**: `[(ngModel)]` + `#form="ngForm"` — đơn giản, ít code
2. **Reactive Forms**: `fb.group({})` + `formControlName` — powerful, testable, production-grade
3. **`markAllAsTouched()`**: Show tất cả validation errors khi click Submit
4. **`FormArray`**: Dynamic list của form groups — add/remove fields at runtime
5. **Custom validators**: `(control) => ValidationErrors | null` — business logic validation

**→ [Bài 07: HTTP Client](../07_http/) — Gọi API với Angular HttpClient và RxJS operators.**
