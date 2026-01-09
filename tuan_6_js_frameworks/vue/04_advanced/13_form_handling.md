# 🟢 MODULE 4 - BÀI 13
# **FORM HANDLING & VALIDATION**

Trong bài này, bạn sẽ học cách xây dựng forms trong Vue, xử lý validation, và submit forms.

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Tạo forms với v-model
- Validate form inputs
- Xử lý form submission
- Hiển thị error messages

---

## 1. **BASIC FORM**

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" required />
    </div>
    
    <div>
      <label>Email:</label>
      <input v-model="form.email" type="email" required />
    </div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: ''
})

function handleSubmit() {
  console.log('Form data:', form.value)
  // Submit to API...
}
</script>
```

---

## 2. **FORM VALIDATION**

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Email:</label>
      <input 
        v-model="form.email" 
        type="email"
        @blur="validateEmail"
      />
      <span v-if="errors.email" class="error">
        {{ errors.email }}
      </span>
    </div>
    
    <button type="submit" :disabled="!isValid">Submit</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({ email: '' })
const errors = ref({})

const isValid = computed(() => {
  return form.value.email && !errors.value.email
})

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
  } else {
    errors.value.email = ''
  }
}

function handleSubmit() {
  if (isValid.value) {
    // Submit...
  }
}
</script>
```

---

**Bài tiếp theo:** [14. Authentication & Authorization](./14_authentication_authorization.md) - Implement authentication.
