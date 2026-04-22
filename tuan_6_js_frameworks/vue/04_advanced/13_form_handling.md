# 🟢 TUẦN 6 - BÀI 13 (VUE.JS)
# **FORM HANDLING & VALIDATION**

---

## 0. 🎬 Opening Hook

*React form: `const [name, setName] = useState('')` + `onChange={e => setName(e.target.value)}` + `value={name}` — 3 thứ cho mỗi input.*

*Vue form: `<input v-model="name" />` — xong.*

*"Vue sinh ra để làm forms dễ hơn," anh Hùng nói. "v-model là two-way binding tự động. Validation? Tự viết với computed, hoặc dùng VeeValidate + Yup schema cho production."*

---

## 1. 🎯 Why This Matters

Forms = 60% công việc frontend thực tế:
- Login/Register, Checkout, Admin CRUD, Search filters
- Validation phải chạy real-time (UX) + khi submit (security)
- Error messages phải rõ ràng, đúng chỗ
- Disable submit khi form invalid

---

## 2. 🌐 Big Picture

```
FORM VALIDATION APPROACHES

Approach 1: Manual validation (computed + watch)
  Pros: Không phụ thuộc library, control hoàn toàn
  Cons: Verbose với form phức tạp

Approach 2: VeeValidate + Yup schema (Recommended Production)
  Pros: Schema validation, ít code, built-in messages
  Cons: Phải install (12KB)

Approach 3: Vuelidate
  Pros: Nhỏ hơn VeeValidate, Vue-native
  Cons: Ít feature hơn Yup

VALIDATION TIMING:
  onBlur      → Validate khi rời khỏi field (UX-friendly)
  onInput     → Real-time (dùng cho password strength)
  onSubmit    → Validate tất cả trước submit
```

---

## 3. ⚙️ Core Technical Truth

### Manual Validation — Computed + Watch

```vue
<template>
    <form @submit.prevent="handleSubmit" novalidate>
        <!-- Name field -->
        <div class="form-group" :class="{ 'has-error': touched.name && errors.name }">
            <label for="name">Họ tên *</label>
            <input
                id="name"
                v-model="form.name"
                @blur="touch('name')"
                placeholder="Nguyễn Văn A"
            />
            <span v-if="touched.name && errors.name" class="error-msg">
                {{ errors.name }}
            </span>
        </div>

        <!-- Email field -->
        <div class="form-group" :class="{ 'has-error': touched.email && errors.email }">
            <label for="email">Email *</label>
            <input
                id="email"
                v-model.trim="form.email"
                type="email"
                @blur="touch('email')"
            />
            <span v-if="touched.email && errors.email" class="error-msg">
                {{ errors.email }}
            </span>
        </div>

        <!-- Password field -->
        <div class="form-group">
            <label for="password">Mật khẩu *</label>
            <input
                id="password"
                v-model="form.password"
                type="password"
                @blur="touch('password')"
                @input="touch('password')"
            />
            <!-- Password strength indicator -->
            <div class="strength-bar">
                <div
                    class="strength-fill"
                    :class="passwordStrength.class"
                    :style="{ width: passwordStrength.percent + '%' }"
                />
            </div>
            <span class="strength-label">{{ passwordStrength.label }}</span>
            <span v-if="touched.password && errors.password" class="error-msg">
                {{ errors.password }}
            </span>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            class="btn btn--primary btn--block"
        >
            {{ isSubmitting ? 'Đang xử lý...' : 'Đăng ký' }}
        </button>

        <p v-if="serverError" class="server-error">{{ serverError }}</p>
    </form>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const form = reactive({
    name: '',
    email: '',
    password: '',
})

// Track which fields user đã touch
const touched = reactive({
    name: false,
    email: false,
    password: false,
})

const isSubmitting = ref(false)
const serverError = ref('')

function touch(field) {
    touched[field] = true
}

// Computed errors — chỉ show khi field đã touched
const errors = computed(() => {
    const errs = {}

    if (!form.name.trim()) {
        errs.name = 'Họ tên không được để trống'
    } else if (form.name.trim().length < 2) {
        errs.name = 'Họ tên phải có ít nhất 2 ký tự'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email) {
        errs.email = 'Email không được để trống'
    } else if (!emailRegex.test(form.email)) {
        errs.email = 'Email không hợp lệ'
    }

    if (!form.password) {
        errs.password = 'Mật khẩu không được để trống'
    } else if (form.password.length < 8) {
        errs.password = 'Mật khẩu phải có ít nhất 8 ký tự'
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(form.password)) {
        errs.password = 'Phải có ít nhất 1 chữ hoa và 1 số'
    }

    return errs
})

const isFormValid = computed(() => Object.keys(errors.value).length === 0)

const passwordStrength = computed(() => {
    const pwd = form.password
    if (!pwd) return { class: '', percent: 0, label: '' }
    if (pwd.length < 6) return { class: 'weak', percent: 25, label: 'Yếu' }
    if (pwd.length < 10 || !/[A-Z]/.test(pwd)) return { class: 'fair', percent: 50, label: 'Trung bình' }
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd))
        return { class: 'strong', percent: 100, label: 'Mạnh' }
    return { class: 'good', percent: 75, label: 'Tốt' }
})

async function handleSubmit() {
    // Touch all fields to show errors
    Object.keys(touched).forEach(key => { touched[key] = true })

    if (!isFormValid.value) return

    isSubmitting.value = true
    serverError.value = ''

    try {
        await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        // Success → redirect
    } catch (err) {
        serverError.value = 'Đăng ký thất bại. Vui lòng thử lại.'
    } finally {
        isSubmitting.value = false
    }
}
</script>
```

---

### VeeValidate + Yup — Production Approach

```bash
npm install vee-validate yup
```

```vue
<template>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group">
            <label>Email</label>
            <Field name="email" type="email" v-slot="{ field, meta }">
                <input v-bind="field" :class="{ 'input--error': meta.touched && errors.email }" />
                <span v-if="meta.touched && errors.email" class="error">{{ errors.email }}</span>
            </Field>
        </div>

        <div class="form-group">
            <label>Mật khẩu</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" class="error" />
        </div>

        <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Đang xử lý...' : 'Đăng nhập' }}
        </button>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

// Yup validation schema
const schema = yup.object({
    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không hợp lệ'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
        .matches(/[0-9]/, 'Phải có ít nhất 1 số'),
})

async function onSubmit(values) {
    // values = { email: '...', password: '...' }
    await loginAPI(values)
}
</script>
```

---

## 4. 🟢 Simplified Layer

> **`v-model.trim` để auto-trim. `@blur="touch(field)"` để chỉ hiện lỗi sau khi user rời field. `computed errors` + `isFormValid` = reactive validation.**
> **Production: VeeValidate + Yup schema. 1 schema = validation rules cho toàn form. Clean hơn nhiều so với manual validation.**

---

## 5. 🛠️ Hands-on Practice

### Bài tập: Checkout Form (25 phút)

```vue
<!-- Form với các fields: fullName, phone, address, city, paymentMethod (radio) -->
<!-- Validation rules:
     - fullName: required, min 2 chars
     - phone: required, regex /^0[0-9]{9}$/
     - address: required
     - city: required (select)
     - paymentMethod: required (radio: cod | bank | momo)
-->
<!-- Submit: disable khi invalid, show isSubmitting state -->
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Browser validation (`required`, `type=email`) là đủ"** | Browser validation: dễ bypass (xóa attribute trong DevTools). Luôn validate trong JS (và backend). Browser validation chỉ là UX enhancement |
| **"Validate mỗi keystroke (onInput) là UX tốt"** | Validate email khi user đang gõ "@" → lỗi ngay = frustrating. Best practice: `@blur` cho lần đầu, `@input` sau khi đã touched |
| **"`v-model.number` tự validate số"** | Chỉ convert type, không validate range hay format. `v-model.number="age"` với input "abc" → NaN, không phải error |

---

## 7. ✅ Checkpoint

1. `touched` state để làm gì? Tại sao không hiện errors ngay từ đầu?
2. Tại sao cần validate phía client VÀ phía server?
3. `novalidate` attribute trong `<form>` để làm gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. `touched` tracks field user đã interact. Hiện errors ngay → user thấy form đỏ trước khi gõ gì → UX tệ. Chỉ hiện error sau khi user đã touch field → friendly hơn.
2. Client validation: UX nhanh, không cần round-trip. Server validation: security (client-side có thể bị bypass bằng DevTools hoặc direct API call). Rule: Never trust client input.
3. `novalidate` tắt browser native validation (HTML5). Dùng khi tự viết custom validation để tránh browser show default error popups.

</details>

---

## 8. 📌 Summary

1. **`v-model`** = two-way binding tự động cho inputs, selects, checkboxes, radios
2. **`touched` + `computed errors`** = pattern chuẩn cho UX-friendly validation
3. **`@blur` validate** lần đầu. **`@input` validate** sau khi đã touched
4. **VeeValidate + Yup** cho production — schema validation, ít boilerplate
5. **Luôn validate cả client và server** — client cho UX, server cho security

**→ [Bài 14: Authentication](./14_authentication_authorization.md) — JWT, token management, protected routes.**
