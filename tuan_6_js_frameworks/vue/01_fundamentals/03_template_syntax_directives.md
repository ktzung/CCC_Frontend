# 🟢 TUẦN 6 - BÀI 05 (VUE.JS)
# **TEMPLATE SYNTAX & DIRECTIVES — Deep Dive**

---

## 0. 🎬 Opening Hook

*React: `{isLoggedIn && <p>Chào mừng!</p>}` — JavaScript thuần.*

*Vue: `<p v-if="isLoggedIn">Chào mừng!</p>` — HTML với superpower.*

*Minh: "Cái nào dễ đọc hơn?"*

*"Tuỳ người. Nhưng đa số designer và backend developer chuyển sang làm frontend thấy Vue dễ tiếp cận hơn vì template trông quen thuộc," anh Hùng nói. "v-if, v-for, v-model, :bind, @event — 5 directives này = 90% template code Vue hàng ngày."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Directives là ngôn ngữ của Vue templates. Không biết directives → không viết được component Vue. Bài này cover:
- **Rendering**: `v-if/v-show/v-for` — hiển thị data
- **Binding**: `v-bind (:)` — connect data với HTML attributes
- **Input**: `v-model` — two-way binding cho forms
- **Events**: `v-on (@)` — xử lý user interactions

---

## 2. 🌐 Big Picture — Directives Map

```
VUE DIRECTIVES
─────────────────────────────────────────────────────────
RENDERING
  v-if / v-else-if / v-else  → Conditional (add/remove DOM)
  v-show                     → Conditional (display:none)
  v-for                      → Loop rendering

DATA BINDING
  v-bind (:)                 → One-way: data → attribute
  v-model                    → Two-way: data ↔ input

EVENTS
  v-on (@)                   → Event listener

SPECIAL
  v-text                     → Text content (= {{ }})
  v-html                     → Raw HTML (⚠️ XSS risk)
  v-once                     → Render once, không update
  v-pre                      → Skip compilation
  v-cloak                    → Ẩn khi chưa compile xong

SHORTHAND
  v-bind:src  → :src
  v-on:click  → @click
```

---

## 3. ⚙️ Core Technical Truth

### Interpolation & Expressions

```vue
<template>
    <!-- {{ expression }} — Chỉ dùng expression, không phải statement -->
    <p>{{ message }}</p>
    <p>{{ price * quantity }}</p>
    <p>{{ message.toUpperCase() }}</p>
    <p>{{ isActive ? "Hoạt động" : "Tạm dừng" }}</p>
    <p>{{ items.length }} sản phẩm</p>
    <p>{{ new Date().toLocaleDateString("vi-VN") }}</p>

    <!-- ✅ Expression — OK -->
    <!-- ❌ Statement — KHÔNG ĐƯỢC: {{ if (x > 0) return x }} -->

    <!-- v-html — Render HTML thuần (NGUY HIỂM nếu từ user input) -->
    <div v-html="richTextFromTrustedSource"></div>

    <!-- v-once — Render 1 lần, không update dù state thay đổi (tối ưu static content) -->
    <h1 v-once>{{ appTitle }}</h1>
</template>
```

---

### v-if / v-show — Conditional Rendering

```vue
<template>
    <!-- v-if: Thêm/xóa khỏi DOM hoàn toàn -->
    <div v-if="userRole === 'admin'">
        <AdminPanel />
    </div>
    <div v-else-if="userRole === 'mod'">
        <ModPanel />
    </div>
    <div v-else>
        <UserPanel />
    </div>

    <!-- v-if trên <template> — Group nhiều elements không tạo DOM node -->
    <template v-if="isLoggedIn">
        <h2>Dashboard</h2>
        <p>Chào {{ user.name }}</p>
        <UserStats />
    </template>

    <!-- v-show: Toggle display:none — Element luôn trong DOM -->
    <div v-show="isExpanded" class="expandable-content">
        Nội dung mở rộng...
    </div>
    <button @click="isExpanded = !isExpanded">
        {{ isExpanded ? "Thu gọn ▲" : "Mở rộng ▼" }}
    </button>
</template>

<!-- RULE: Khi nào dùng v-if vs v-show?
     v-if:   Điều kiện ít thay đổi (user role, feature flags)
             Component nặng cần lazy mounting
     v-show: Toggle thường xuyên (accordion, dropdown, tooltip)
             Animation cần element sẵn trong DOM -->
```

---

### v-for — List Rendering

```vue
<template>
    <!-- Array → items -->
    <ul>
        <li v-for="product in products" :key="product.id">
            {{ product.name }} — {{ product.price.toLocaleString("vi-VN") }}đ
        </li>
    </ul>

    <!-- Array với index -->
    <ol>
        <li v-for="(item, index) in cartItems" :key="item.id">
            {{ index + 1 }}. {{ item.name }} × {{ item.qty }}
        </li>
    </ol>

    <!-- Object → key/value pairs -->
    <dl>
        <template v-for="(value, key) in userProfile" :key="key">
            <dt>{{ key }}</dt>
            <dd>{{ value }}</dd>
        </template>
    </dl>

    <!-- Number range: 1, 2, 3, ... n -->
    <div class="pagination">
        <button v-for="page in totalPages" :key="page"
                :class="{ active: page === currentPage }"
                @click="currentPage = page">
            {{ page }}
        </button>
    </div>

    <!-- v-for với component -->
    <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
    />
</template>
```

**⚠️ v-for + v-if trên cùng element — TRÁNH:**
```vue
<!-- ❌ Sai: v-if chạy trước v-for ở Vue 2, ngược lại Vue 3. Dễ bug -->
<li v-for="item in items" v-if="item.isActive" :key="item.id">

<!-- ✅ Đúng cách 1: Wrap với <template> -->
<template v-for="item in items" :key="item.id">
    <li v-if="item.isActive">{{ item.name }}</li>
</template>

<!-- ✅ Đúng cách 2: Dùng computed property (TỐTHƠN) -->
<li v-for="item in activeItems" :key="item.id">{{ item.name }}</li>
<!-- activeItems = computed(() => items.value.filter(i => i.isActive)) -->
```

---

### v-bind (:) — Dynamic Attribute Binding

```vue
<template>
    <!-- Basic binding -->
    <img :src="product.imageUrl" :alt="product.name" />
    <a :href="`/products/${product.id}`">Chi tiết</a>
    <button :disabled="isLoading || !isValid">Gửi</button>
    <input :type="inputType" :placeholder="placeholder" />

    <!-- Class binding — 3 syntaxes -->
    <!-- Object: key = class name, value = condition -->
    <div :class="{
        'card': true,
        'card--active': isActive,
        'card--disabled': !isEnabled,
        'card--sale': product.onSale
    }">

    <!-- Array -->
    <div :class="['base-class', isActive ? 'active' : 'inactive', extraClass]">

    <!-- Computed class -->
    <div :class="cardClass">  <!-- cardClass = computed() → string or object -->

    <!-- Style binding -->
    <div :style="{
        backgroundColor: brandColor,
        fontSize: `${fontSize}px`,
        opacity: isVisible ? 1 : 0,
    }">

    <!-- Array style (merge multiple objects) -->
    <div :style="[baseStyles, conditionalStyles]">

    <!-- Spread object — bind nhiều attributes cùng lúc -->
    <input v-bind="inputAttrs" />
    <!-- inputAttrs = { type: 'email', required: true, autocomplete: 'email' } -->
</template>

<script setup>
import { ref, computed } from 'vue'

const product = ref({ id: 1, name: 'iPhone', imageUrl: '/iphone.jpg', onSale: true })
const isActive = ref(true)
const isEnabled = ref(false)
const isLoading = ref(false)
const brandColor = ref('#e63946')

const cardClass = computed(() => ({
    'card': true,
    'card--active': isActive.value,
    'card--loading': isLoading.value,
}))
</script>
```

---

### v-model — Two-way Binding

```vue
<template>
    <form @submit.prevent="handleSubmit">
        <!-- Text, email, password -->
        <input v-model="form.name" type="text" placeholder="Họ tên" />
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" />

        <!-- Textarea -->
        <textarea v-model="form.bio" rows="4" placeholder="Giới thiệu..."></textarea>

        <!-- Checkbox (boolean) -->
        <input type="checkbox" id="terms" v-model="form.agreeTerms" />
        <label for="terms">Đồng ý với điều khoản</label>

        <!-- Checkbox group (array) -->
        <div v-for="opt in interestOptions" :key="opt.value">
            <input type="checkbox" :id="opt.value" :value="opt.value" v-model="form.interests" />
            <label :for="opt.value">{{ opt.label }}</label>
        </div>

        <!-- Radio group -->
        <label v-for="role in roles" :key="role.value">
            <input type="radio" :value="role.value" v-model="form.role" />
            {{ role.label }}
        </label>

        <!-- Select -->
        <select v-model="form.city">
            <option value="">-- Chọn thành phố --</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
            </option>
        </select>

        <!-- v-model modifiers -->
        <input v-model.trim="form.name" />      <!-- Auto trim whitespace -->
        <input v-model.number="form.age" type="number" />  <!-- String → Number -->
        <input v-model.lazy="form.search" />    <!-- Update on "change" not "input" -->

        <button type="submit" :disabled="!isFormValid">Lưu</button>
    </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({
    name: '',
    email: '',
    password: '',
    bio: '',
    agreeTerms: false,
    interests: [],
    role: 'user',
    city: '',
    age: 0,
    search: '',
})

const interestOptions = [
    { value: 'tech', label: 'Công nghệ' },
    { value: 'design', label: 'Thiết kế' },
    { value: 'business', label: 'Kinh doanh' },
]

const roles = [
    { value: 'user', label: 'Người dùng' },
    { value: 'mod', label: 'Moderator' },
]

const cities = ref([
    { id: 'hn', name: 'Hà Nội' },
    { id: 'hcm', name: 'TP.HCM' },
    { id: 'dn', name: 'Đà Nẵng' },
])

const isFormValid = computed(() =>
    form.value.name.trim() &&
    form.value.email.includes('@') &&
    form.value.agreeTerms
)

function handleSubmit() {
    console.log('Form data:', form.value)
}
</script>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`v-if` = add/remove DOM (cho ít thay đổi). `v-show` = CSS hide (cho toggle thường xuyên). Luôn dùng `:key` trong `v-for`.**
> **`:attr="value"` = bind data vào attribute. `v-model="data"` = two-way sync với input. `@event="handler"` = listen event.**

---

## 5. 🏭 Real-world Layer

### Product Filter Component hoàn chỉnh

```vue
<template>
    <div class="product-page">
        <!-- Filter sidebar -->
        <aside class="filters">
            <h3>Lọc sản phẩm</h3>

            <input v-model.trim="searchQuery"
                   @input="resetPage"
                   placeholder="Tìm kiếm..." />

            <select v-model="selectedCategory" @change="resetPage">
                <option value="">Tất cả danh mục</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                </option>
            </select>

            <div class="price-range">
                <label>Giá: {{ priceRange[0].toLocaleString('vi-VN') }}đ
                       — {{ priceRange[1].toLocaleString('vi-VN') }}đ</label>
                <input type="range" v-model.number="priceRange[0]" :min="0" :max="50000000" step="500000" />
                <input type="range" v-model.number="priceRange[1]" :min="priceRange[0]" :max="100000000" step="500000" />
            </div>

            <div class="sort">
                <label v-for="opt in sortOptions" :key="opt.value">
                    <input type="radio" :value="opt.value" v-model="sortBy" />
                    {{ opt.label }}
                </label>
            </div>
        </aside>

        <!-- Product grid -->
        <main class="product-grid">
            <p v-if="isLoading">⏳ Đang tải...</p>

            <template v-else>
                <p class="result-count">{{ filteredProducts.length }} sản phẩm</p>

                <div v-if="filteredProducts.length > 0" class="grid">
                    <ProductCard
                        v-for="product in paginatedProducts"
                        :key="product.id"
                        :product="product"
                        :class="{ 'on-sale': product.discount > 0 }"
                        @add-to-cart="handleAddToCart"
                    />
                </div>

                <div v-else class="empty-state">
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                    <button @click="resetFilters">Xóa bộ lọc</button>
                </div>

                <!-- Pagination -->
                <div class="pagination" v-if="totalPages > 1">
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        :class="{ active: page === currentPage }"
                        @click="currentPage = page">
                        {{ page }}
                    </button>
                </div>
            </template>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const priceRange = ref([0, 100000000])
const sortBy = ref('name-asc')
const currentPage = ref(1)
const pageSize = 12
const isLoading = ref(false)
const products = ref([]) // từ API

const categories = ref([
    { id: 'phone', name: 'Điện thoại' },
    { id: 'laptop', name: 'Laptop' },
])

const sortOptions = [
    { value: 'name-asc', label: 'Tên A-Z' },
    { value: 'price-asc', label: 'Giá tăng dần' },
    { value: 'price-desc', label: 'Giá giảm dần' },
]

const filteredProducts = computed(() => {
    let result = products.value
    if (searchQuery.value) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }
    if (selectedCategory.value) {
        result = result.filter(p => p.category === selectedCategory.value)
    }
    result = result.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

    const [field, dir] = sortBy.value.split('-')
    result.sort((a, b) => dir === 'asc' ? (a[field] > b[field] ? 1 : -1) : (a[field] < b[field] ? 1 : -1))
    return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredProducts.value.slice(start, start + pageSize)
})

function resetPage() { currentPage.value = 1 }
function resetFilters() {
    searchQuery.value = ''
    selectedCategory.value = ''
    priceRange.value = [0, 100000000]
    sortBy.value = 'name-asc'
    resetPage()
}
function handleAddToCart(product) { /* dispatch to Pinia */ }
</script>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Registration Form (20 phút)

Xây form đăng ký có:
- Các fields: `username`, `email`, `password`, `confirmPassword`, `role` (radio), `newsletter` (checkbox)
- `v-model` cho tất cả inputs
- Validation với `computed`: username ≥ 3 ký tự, email hợp lệ, password ≥ 8 ký tự, passwords match
- Hiện lỗi với `v-if`, disable submit button khi form invalid
- Hiện preview JSON của form data bên dưới

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`v-for` phải có `:key`"** | Không bắt buộc về mặt kỹ thuật, nhưng **bắt buộc về mặt best practice**. Thiếu key → Vue không track được element nào là element nào khi list thay đổi → bugs về state, wrong animations |
| **"`v-if` ưu tiên hơn `v-for` khi trên cùng element"** | Ngược lại trong **Vue 3**: `v-if` có priority cao hơn `v-for`. Nghĩa là `v-if` không thể access biến của `v-for`. Đây là lý do tại sao không dùng chúng trên cùng element |
| **"`v-model` là shorthand `@input + :value`"** | Đúng với text input. Nhưng Vue thông minh hơn: với checkbox → dùng `checked` + `change`. Với select → dùng `value` + `change`. v-model chọn đúng event theo input type |
| **"`:class` và `class` loại trừ nhau"** | Không — Vue **merge** static và dynamic class. `class="base" :class="{ active: isActive }"` → element có cả "base" và "active" (nếu isActive = true) |
| **"`v-model.number` parse số float"** | Đúng nếu input value là valid number. Nhưng khi input rỗng → trả về `NaN`, không phải `0`. Xử lý NaN bằng `v-model.number` + validation |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Điểm khác biệt quan trọng nhất giữa `v-if` và `v-show` là gì? Khi nào dùng cái nào?
2. Tại sao `:key` trong `v-for` phải là **unique và stable** (ổn định qua các lần render)?
3. `v-model.lazy` khác `v-model` như thế nào? Khi nào `.lazy` hữu ích?

### Câu hỏi áp dụng:

4. Viết template hiển thị danh sách students, mỗi student có badge màu khác nhau theo grade: A=green, B=blue, C=yellow, F=red. Dùng `:class` binding.
5. Form có input `age` dùng `v-model.number`. User nhập "abc" và xóa đi để trống. Value là gì? Làm thế nào để handle?

<details>
<summary>👁️ Xem đáp án</summary>

1. `v-if` = thêm/xóa element khỏi DOM (mount/unmount component). `false` → không tồn tại trong DOM, không consume memory, component lifecycle không chạy. `v-show` = `display: none`, element vẫn trong DOM, vẫn consume memory. Dùng `v-if` khi: condition ít thay đổi, component nặng cần lazy init. Dùng `v-show` khi: toggle thường xuyên, cần animation (element phải trong DOM để animate).
2. Key giúp Vue nhận dạng element khi list thay đổi. **Unique**: Hai element cùng key → Vue không biết nên update cái nào. **Stable**: Nếu key thay đổi (ví dụ dùng index khi thêm/xóa phần tử đầu list) → Vue nghĩ là element mới → re-mount toàn bộ → state trong component con bị reset, animations bị kích hoạt sai.
3. `v-model` update state mỗi lần input event (mỗi keystroke). `v-model.lazy` update khi change event (khi blur hoặc Enter). `.lazy` hữu ích khi: validate sau khi user rời khỏi field (không validate từng chữ), search query (kết hợp với debounce logic), expensive computed operations.
4. ```vue
   <ul>
       <li v-for="student in students" :key="student.id">
           {{ student.name }}
           <span :class="{
               'badge-green': student.grade === 'A',
               'badge-blue':  student.grade === 'B',
               'badge-yellow':student.grade === 'C',
               'badge-red':   student.grade === 'F',
           }" class="badge">{{ student.grade }}</span>
       </li>
   </ul>
   ```
5. Khi user nhập "abc" → `NaN`. Khi xóa hết → `NaN`. Cần handle: ```vue const safeAge = computed(() => isNaN(form.value.age) ? 0 : form.value.age) ``` Hoặc validate: ```vue const isAgeValid = computed(() => !isNaN(form.value.age) && form.value.age >= 0 && form.value.age <= 150) ```

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `[Vue warn]: Property "xxx" is not reactive` | Dùng object thường thay vì `reactive()` hoặc `ref()` | Bọc state bằng `reactive({})` hoặc `ref()` để Vue track thay đổi |
| `v-for` render ra thứ tự sai / duplicate key warning | Dùng `index` làm `:key` khi list thay đổi thứ tự | Dùng `:key="item.id"` với giá trị unique, không dùng index |
| `[Vue warn]: Avoid using v-if and v-for on the same element` | `v-if` và `v-for` trên cùng 1 element → xung đột priority | Tách ra: `<template v-for="...">` + `<div v-if="...">` hoặc dùng `computed` filter trước |
| `v-model` không cập nhật giá trị input | Dùng `v-bind:value` thay vì `v-model` hoặc thiếu event handler | Dùng `v-model="state.field"` — tự tạo two-way binding |
| `v-show` không ẩn được element | `v-show` dùng `display: none` — không hoạt động trên `<template>` | Chuyển sang `v-if` cho `<template>`, hoặc bọc trong `<div>` rồi dùng `v-show` |
| Class/style không apply | Sai syntax object hoặc conflict với static `class` | Dùng `:class="{ active: isActive }"` hoặc `:class="[classA, classB]"` |

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`v-if`** = DOM add/remove (ít thay đổi). **`v-show`** = CSS hide (toggle thường xuyên). **`:key` bắt buộc** trong `v-for`
2. **Không dùng `v-if` + `v-for` trên cùng element** — Dùng `<template>` wrapper hoặc computed filter
3. **`:class` object syntax** = `{ 'class-name': condition }`. Merge được với static `class` attribute
4. **`v-model`** = two-way binding thông minh — tự chọn event đúng theo input type
5. **`v-model` modifiers**: `.trim` (xóa whitespace), `.number` (convert type), `.lazy` (update on change, không input)

---

## 10. ➡️ Next Lesson Bridge

*"Template directives clear," Minh nói. "Nhưng event handling trong Vue — modifier `.prevent`, `.stop`, `.once` — vẫn chưa rõ."*

*"Đó là bài tiếp theo. Event modifiers = Vue shorthand cho `e.preventDefault()`, `e.stopPropagation()`. 1 dòng thay 3 dòng."*

**→ [Bài 06: Event Handling](./04_event_handling.md) — Event modifiers, key modifiers, custom events: xử lý tương tác người dùng trong Vue.**
