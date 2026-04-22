# 🟢 TUẦN 6 - BÀI 07 (VUE.JS)
# **COMPONENTS & SLOTS — Xây Dựng Design System**

---

## 0. 🎬 Opening Hook

*"Tại sao phải chia component nhỏ?" Minh hỏi. "Viết thẳng vào 1 file cho nhanh."*

*Anh Hùng chỉ vào màn hình: "App của em có 3 nút — màu khác nhau, size khác nhau, chỗ nào cũng có. Khi sếp bảo 'đổi font size nút từ 14px lên 16px' — em sửa bao nhiêu chỗ?"*

*Minh đếm: "...23 chỗ."*

*"Với `AppButton.vue` component — 1 chỗ. Đó là lý do tồn tại của component reusability. Và Slots là cơ chế cho phép component đó flexible — không cứng nội dung."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Components + Slots = nền tảng xây dựng **Design System** trong Vue:
- **Props**: Component nhận data từ ngoài → customizable
- **Slots**: Component nhận template từ ngoài → flexible layout
- **Emit**: Component báo lại cho parent → two-way communication
- **defineExpose**: Expose methods ra ngoài → imperative API

---

## 2. 🌐 Big Picture — Component Communication Patterns

```
PARENT                          CHILD
──────────────────              ──────────────────
:propName="value"    →          defineProps({ propName })
                     ←          emit('event', data)
@event="handler"    ←
<template #slot>     →          <slot name="slot" />

DESIGN SYSTEM HIERARCHY:
atoms/          → AppButton, AppInput, AppBadge (pure UI)
molecules/      → SearchBar, ProductCard, FormField (composed)
organisms/      → Navbar, ProductGrid, CheckoutForm (feature)
templates/      → PageLayout, DashboardLayout (structure)
pages/          → HomePage, ProductsPage (route components)
```

---

## 3. ⚙️ Core Technical Truth

### defineProps với Validation

```vue
<!-- AppButton.vue — Reusable Button component -->
<template>
    <button
        :class="[
            'btn',
            `btn--${variant}`,
            `btn--${size}`,
            { 'btn--loading': isLoading, 'btn--block': block }
        ]"
        :disabled="disabled || isLoading"
        :type="type"
        v-bind="$attrs"
    >
        <span v-if="isLoading" class="spinner">⏳</span>
        <!-- Default slot — nội dung button -->
        <slot>{{ label }}</slot>
    </button>
</template>

<script setup>
// defineProps với full validation
const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'secondary', 'danger', 'ghost'].includes(v),
    },
    size: {
        type: String,
        default: 'md',
        validator: (v) => ['sm', 'md', 'lg'].includes(v),
    },
    label: String,
    type: { type: String, default: 'button' },
    disabled: Boolean,
    isLoading: Boolean,
    block: Boolean,  // Full width
})
</script>

<!-- Sử dụng -->
<!-- <AppButton variant="primary">Thêm vào giỏ</AppButton> -->
<!-- <AppButton variant="danger" :isLoading="isDeleting">Xóa</AppButton> -->
<!-- <AppButton variant="ghost" size="sm">Hủy</AppButton> -->
```

---

### Slots — Flexible Templates

```vue
<!-- AppCard.vue — Card với Named Slots -->
<template>
    <div class="card" :class="{ 'card--elevated': elevated }">
        <!-- Named slot: header -->
        <div v-if="$slots.header" class="card__header">
            <slot name="header" />
        </div>

        <!-- Default slot: body content -->
        <div class="card__body">
            <slot />
        </div>

        <!-- Named slot: footer -->
        <div v-if="$slots.footer" class="card__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    elevated: { type: Boolean, default: false }
})
</script>

<!-- Sử dụng AppCard với named slots -->
<AppCard :elevated="true">
    <template #header>
        <h2>Thông tin đơn hàng #12345</h2>
        <span class="badge">Đang giao</span>
    </template>

    <!-- Default slot (không cần template tag) -->
    <div class="order-items">
        <p v-for="item in order.items" :key="item.id">{{ item.name }}</p>
    </div>

    <template #footer>
        <span>Tổng: {{ order.total.toLocaleString('vi-VN') }}đ</span>
        <AppButton variant="primary">Theo dõi đơn</AppButton>
    </template>
</AppCard>
```

---

### Scoped Slots — Slots với Data

```vue
<!-- DataTable.vue — Flexible table với scoped slots -->
<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="row.id ?? index">
                <td v-for="col in columns" :key="col.key">
                    <!-- Scoped slot: truyền row data xuống cho parent render -->
                    <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                        <!-- Default fallback: hiển thị text -->
                        {{ row[col.key] }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
})
</script>

<!-- Parent dùng scoped slots để customize cell rendering -->
<DataTable :columns="columns" :data="products">
    <!-- Slot nhận { row, value } từ DataTable -->
    <template #cell-price="{ value }">
        <strong class="price">{{ value.toLocaleString('vi-VN') }}đ</strong>
    </template>

    <template #cell-status="{ row }">
        <span :class="`badge badge--${row.status}`">{{ row.status }}</span>
    </template>

    <template #cell-actions="{ row }">
        <AppButton size="sm" @click="editProduct(row)">Sửa</AppButton>
        <AppButton size="sm" variant="danger" @click="deleteProduct(row.id)">Xóa</AppButton>
    </template>
</DataTable>
```

---

### defineExpose — Imperative API

```vue
<!-- SearchInput.vue — Expose focus/clear methods -->
<template>
    <div class="search-wrapper">
        <input ref="inputRef" v-model="query" @input="emit('search', query)" />
        <button v-if="query" @click="clear">✕</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const query = ref('')
const emit = defineEmits(['search', 'clear'])

function focus() { inputRef.value?.focus() }
function clear() { query.value = ''; emit('clear') }

// Expose public API cho parent dùng ref
defineExpose({ focus, clear })
</script>

<!-- Parent dùng ref để gọi method -->
<template>
    <SearchInput ref="searchRef" @search="handleSearch" />
    <button @click="searchRef.focus()">Tìm kiếm</button>
</template>

<script setup>
import { ref } from 'vue'
const searchRef = ref(null)
// searchRef.value.focus() — gọi được sau onMounted
</script>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`defineProps` = nhận data từ parent. `defineEmits` = báo parent. `<slot>` = nhận template từ parent. `defineExpose` = cho parent gọi methods.**
> **Named slots: `<slot name="header" />` + `<template #header>`. Scoped slots: `<slot :row="row" />` + `<template #cell="{ row }">`.**

---

## 5. 🏭 Real-world Layer

### Modal Component Production-Ready

```vue
<!-- AppModal.vue -->
<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-overlay" @click.self="close">
                <div class="modal" :class="`modal--${size}`" role="dialog">
                    <div class="modal__header">
                        <slot name="header">
                            <h2>{{ title }}</h2>
                        </slot>
                        <button class="modal__close" @click="close" aria-label="Đóng">✕</button>
                    </div>

                    <div class="modal__body">
                        <slot />
                    </div>

                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps({
    modelValue: Boolean,
    title: String,
    size: { type: String, default: 'md' },
})
const emit = defineEmits(['update:modelValue'])
function close() { emit('update:modelValue', false) }
</script>

<!-- Sử dụng -->
<AppModal v-model="isOpen" title="Xác nhận xóa" size="sm">
    <p>Bạn có chắc muốn xóa sản phẩm này?</p>
    <template #footer>
        <AppButton variant="ghost" @click="isOpen = false">Hủy</AppButton>
        <AppButton variant="danger" @click="confirmDelete">Xóa</AppButton>
    </template>
</AppModal>
```

---

## 6. 🛠️ Hands-on Practice

### Bài tập: Xây AppCard và DataList (20 phút)

```vue
<!-- Yêu cầu: AppCard component với 3 named slots -->
<!-- header, default (body), footer -->
<!-- Prop: variant ('default' | 'outlined' | 'elevated') -->

<!-- DataList component với scoped slot -->
<!-- Props: items (Array), loading (Boolean) -->
<!-- Slot: #item="{ item, index }" cho mỗi item -->
<!-- Slot: #empty khi items rỗng -->
<!-- Slot: #loading khi loading = true -->
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Slot và Props giải quyết cùng vấn đề"** | Khác: Props truyền **data** (string, number, object). Slots truyền **template** (HTML, components). Dùng props cho data, slots cho layout/content structure |
| **"Scoped styles tự apply vào slot content"** | Không — Slot content được render trong context của **parent**, không phải child. Child component với `<style scoped>` không style được slot content. Dùng `:deep()` hoặc global CSS |
| **"Phải define tất cả props để component nhận"** | Vue component tự nhận undeclared attrs qua `$attrs` và forward xuống root element. Dùng `v-bind="$attrs"` để explicitly control. `inheritAttrs: false` để ngắt auto-inherit |
| **"`defineExpose` = break encapsulation"** | Dùng có chủ đích, không lạm dụng. Hợp lý cho: focus(), reset(), scrollTo() — imperative DOM operations. Không expose business state — dùng emit cho đó |
| **"Slot content phải là HTML"** | Slot nhận bất kỳ template content nào: components khác, directives, interpolation. `<AppButton>` có thể có `<slot>` chứa `<AppIcon>` chứa `<img>` |

---

## 8. ✅ Checkpoint

1. Khi nào dùng Props, khi nào dùng Slots? Cho ví dụ mỗi loại.
2. Scoped slot khác slot thường thế nào? Viết ví dụ component `List` với scoped slot.
3. `$slots.footer` kiểm tra gì? Tại sao cần check trước khi render footer wrapper?

### Câu hỏi áp dụng:

4. Xây `AppAlert` component: nhận prop `type` (info/warning/error/success) và slot cho message. Có nút đóng emit `close`. Viết component đầy đủ.
5. `DataTable` của bạn cần default rendering cho cells (không có custom slot). Làm thế nào để component biết slot đó có được provide không?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Props**: data đơn giản — `<ProductCard :price="29.99" :name="'iPhone'" />`. **Slots**: flexible content — `<AppCard><template #header><h2>...</h2></template></AppCard>`. Rule: Nếu child cần biết **nội dung** để render logic → props. Nếu parent muốn **quyết định** cách render → slots.
2. Scoped slot = slot truyền ngược data từ child về parent để parent render. ```vue <!-- Child --> <slot :item="currentItem" :index="i" /> <!-- Parent --> <template #default="{ item, index }"> <span>{{ index }}. {{ item.name }}</span> </template> ```
3. `$slots.footer` = slot object, truthy nếu parent đã provide content vào slot footer. Cần check để không render `<div class="footer-wrapper">` khi không có content (tránh empty padding/border).
4. ```vue <template> <div :class="`alert alert--${type}`" role="alert"> <span class="alert__icon">{{ icons[type] }}</span> <div class="alert__content"><slot /></div> <button @click="emit('close')" aria-label="Đóng">✕</button> </div> </template> <script setup> const props = defineProps({ type: { type: String, default: 'info', validator: v => ['info','warning','error','success'].includes(v) } }) const emit = defineEmits(['close']) const icons = { info: 'ℹ️', warning: '⚠️', error: '❌', success: '✅' } </script> ```
5. Dùng `$slots['cell-columnKey']` để check: ```vue <td v-for="col in columns"> <slot v-if="$slots[`cell-${col.key}`]" :name="`cell-${col.key}`" :row="row" :value="row[col.key]" /> <span v-else>{{ row[col.key] }}</span> </td> ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **SFC** = `<template>` + `<script setup>` + `<style scoped>`. Mỗi `.vue` file = 1 component độc lập
2. **Props** = data vào. **Emits** = events ra. **Slots** = template vào. Đây là 3 APIs giao tiếp component
3. **Named slots**: `<slot name="x" />` + `<template #x>`. **Scoped slots**: `<slot :data="val" />` + `<template #default="{ data }">`
4. **`$slots.name`** = check nếu slot được provided → tránh render empty wrappers
5. **`defineExpose`** cho imperative API (focus, reset). Chỉ dùng khi thực sự cần, ưu tiên emit

---

## 10. ➡️ Next Lesson Bridge

*"Components xong," Minh nói. "Nhưng computed, watch, methods — chưa hiểu rõ khi nào dùng cái nào."*

**→ [Bài 08: Computed & Watch](./07_methods_computed_properties.md) — computed cho derived data, watch cho side effects: 2 hooks quan trọng nhất của Vue reactivity.**
