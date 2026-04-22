# 🟢 TUẦN 6 - BÀI 06 (VUE.JS)
# **EVENT HANDLING — v-on, Modifiers, Custom Events**

---

## 0. 🎬 Opening Hook

*Minh viết JavaScript thuần:*
```javascript
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();
    handleLogin(e);
});
```

*Vue:*
```html
<form @submit.prevent.stop="handleLogin">
```

*"3 dòng thành 1 attribute. Modifier `.prevent` = `e.preventDefault()`. `.stop` = `e.stopPropagation()`," anh Hùng nói. "Đây là lý do Vue template được gọi là 'HTML biết suy nghĩ'."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Event handling là nền tảng của mọi tương tác UI. Vue cung cấp:
- **`@event`** = shorthand cho `v-on:event`
- **Event modifiers** = không cần viết `e.preventDefault()` thủ công
- **Key modifiers** = `@keydown.enter`, `@keydown.ctrl.s` — keyboard shortcuts
- **Custom events** = component con giao tiếp lên parent

---

## 2. 🌐 Big Picture — Event System Vue

```
VUE EVENT HANDLING
─────────────────────────────────────────────────────────
NATIVE EVENTS (DOM)          CUSTOM EVENTS (Component)
──────────────────           ─────────────────────────
@click                       defineEmits(['submit'])
@dblclick                    emit('submit', data)
@mouseover / @mouseleave     Parent: @submit="handler"
@keydown.enter
@keydown.ctrl.s
@submit.prevent
@input / @change
@focus / @blur

MODIFIERS (chaining):
@click.prevent.stop.once    → Prevent + StopPropagation + chỉ 1 lần
@keydown.ctrl.enter         → Ctrl + Enter phím tắt
@click.self                 → Chỉ khi click chính element đó (không bubble)
```

---

## 3. ⚙️ Core Technical Truth

### v-on (@) — Event Binding Cơ Bản

```vue
<template>
    <!-- Inline handler (cho action đơn giản) -->
    <button @click="count++">+</button>
    <button @click="count = 0">Reset</button>

    <!-- Method handler (phổ biến hơn) -->
    <button @click="handleClick">Click</button>

    <!-- Method với tham số -->
    <button @click="deleteItem(item.id)">❌</button>
    <button @click="selectTab('settings')">Settings</button>

    <!-- Cần cả event object và tham số → dùng $event -->
    <input @change="handleChange($event, 'email')" />
    <button @click="handleClickWithPos($event, item)">Click</button>

    <!-- v-on object syntax — bind nhiều events 1 lúc -->
    <input v-on="{
        focus: handleFocus,
        blur: handleBlur,
        input: handleInput,
    }" />
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)

function handleClick(event) {
    // event = native DOM Event object
    console.log('Clicked!', event.target, event.clientX, event.clientY)
}

function deleteItem(id) {
    console.log('Delete:', id)
}

function handleChange(event, fieldName) {
    console.log(fieldName, event.target.value)
}
</script>
```

---

### Event Modifiers

```vue
<template>
    <!-- .prevent — e.preventDefault() -->
    <!-- Form submit không reload trang -->
    <form @submit.prevent="handleSubmit">
        <button type="submit">Gửi</button>
    </form>

    <!-- Link không navigate -->
    <a href="https://example.com" @click.prevent="openModal">Xem</a>

    <!-- .stop — e.stopPropagation() — Ngăn event bubble lên parent -->
    <div @click="handleOuterClick">
        Outer div
        <!-- Click vào button → handleButtonClick, KHÔNG trigger handleOuterClick -->
        <button @click.stop="handleButtonClick">Inner Button</button>
    </div>

    <!-- .self — Chỉ trigger khi click ĐÚNG element này, không phải children -->
    <!-- Dùng cho modal overlay -->
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <!-- Click vào modal-content → KHÔNG đóng modal -->
            <p>Modal content</p>
        </div>
    </div>

    <!-- .once — Chỉ trigger 1 lần -->
    <button @click.once="showWelcomeMessage">Chào mừng lần đầu</button>

    <!-- .passive — Tăng performance scroll (không thể prevent default) -->
    <div @scroll.passive="handleScroll">Scrollable content</div>

    <!-- Chaining modifiers — Thứ tự quan trọng! -->
    <!-- .prevent TRƯỚC .stop -->
    <a href="#" @click.prevent.stop="handleClick">Link</a>
</template>
```

---

### Key Modifiers — Keyboard Shortcuts

```vue
<template>
    <!-- Common key modifiers -->
    <input
        v-model="searchQuery"
        @keydown.enter="performSearch"
        @keydown.escape="clearSearch"
        placeholder="Tìm kiếm (Enter để tìm, Esc để xóa)"
    />

    <!-- System modifier keys: ctrl, alt, shift, meta (Cmd/Win) -->
    <!-- Ctrl+S để save -->
    <div @keydown.ctrl.s.prevent="saveDocument" tabindex="0">
        Press Ctrl+S to save
    </div>

    <!-- Ctrl+Enter để submit form (không Enter thường) -->
    <textarea @keydown.ctrl.enter="submitForm"></textarea>

    <!-- Exact modifier — CHÍNH XÁC, không kèm phím khác -->
    <button @click.ctrl.exact="handleCtrlOnly">Ctrl + Click (no other keys)</button>
    <button @click.exact="handleNormalClick">Normal click only</button>

    <!-- Arrow keys -->
    <div @keydown.up="movePrev" @keydown.down="moveNext" tabindex="0">
        Use ↑↓ to navigate
    </div>

    <!-- Mouse buttons -->
    <div @click.right.prevent="showContextMenu">Right-click menu</div>
    <div @click.middle="openInNewTab">Middle-click</div>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')

function performSearch() {
    console.log('Searching:', searchQuery.value)
}
function clearSearch() {
    searchQuery.value = ''
}
function saveDocument() {
    console.log('Saving...')
    // Ctrl+S mặc định được .prevent ngăn lại
}
</script>
```

---

### Custom Events — Component Communication

```vue
<!-- ============================================ -->
<!-- Child component: SearchBar.vue -->
<!-- ============================================ -->
<template>
    <div class="search-bar">
        <input
            v-model="query"
            @keydown.enter="submitSearch"
            @keydown.escape="clearSearch"
            placeholder="Tìm kiếm..."
        />
        <button @click="submitSearch" :disabled="!query.trim()">🔍</button>
        <button v-if="query" @click="clearSearch">✕</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Khai báo events component có thể emit
const emit = defineEmits({
    search: (query) => typeof query === 'string' && query.length > 0,
    clear: null,  // Không validate
})

const query = ref('')

function submitSearch() {
    if (!query.value.trim()) return
    emit('search', query.value.trim())
}

function clearSearch() {
    query.value = ''
    emit('clear')
}
</script>

<!-- ============================================ -->
<!-- Parent component: ProductsPage.vue -->
<!-- ============================================ -->
<template>
    <div>
        <SearchBar
            @search="handleSearch"
            @clear="handleClear"
        />

        <p>Kết quả cho: {{ currentQuery }}</p>
        <ProductList :products="searchResults" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'

const currentQuery = ref('')
const searchResults = ref([])

function handleSearch(query) {
    currentQuery.value = query
    // Fetch search results
    fetch(`/api/search?q=${query}`)
        .then(r => r.json())
        .then(data => searchResults.value = data)
}

function handleClear() {
    currentQuery.value = ''
    searchResults.value = []
}
</script>
```

---

### v-model trên Custom Components

```vue
<!-- InputField.vue — Reusable input component hỗ trợ v-model -->
<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <input
            :id="id"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <span v-if="error" class="error">{{ error }}</span>
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,    // v-model binding
    label: String,
    id: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    error: String,
})

defineEmits(['update:modelValue'])
</script>

<!-- Sử dụng với v-model như input thường -->
<InputField v-model="form.email" label="Email" type="email" id="email-field" :error="errors.email" />
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`@submit.prevent` = form không reload. `@click.stop` = không bubble lên parent. `@click.self` = chỉ khi click chính element (dùng cho modal overlay).**
> **`emit('event-name', data)` trong child → `@event-name="handler"` trong parent. Luôn khai báo `defineEmits` trước.**

---

## 5. 🏭 Real-world Layer

### Keyboard Shortcut System

```vue
<!-- Composable: useKeyboardShortcuts.js -->
<script>
import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts(shortcuts) {
    // shortcuts = { 'ctrl+s': saveFn, 'ctrl+k': openSearchFn, ... }

    function handleKeydown(event) {
        const parts = []
        if (event.ctrlKey || event.metaKey) parts.push('ctrl')
        if (event.altKey) parts.push('alt')
        if (event.shiftKey) parts.push('shift')
        parts.push(event.key.toLowerCase())

        const combo = parts.join('+')
        const handler = shortcuts[combo]
        if (handler) {
            event.preventDefault()
            handler(event)
        }
    }

    onMounted(() => window.addEventListener('keydown', handleKeydown))
    onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}
</script>

<!-- Sử dụng trong component -->
<script setup>
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'

useKeyboardShortcuts({
    'ctrl+s': () => saveDocument(),
    'ctrl+k': () => openCommandPalette(),
    'ctrl+/': () => toggleHelpPanel(),
    'escape': () => closeModal(),
})
</script>
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Interactive Dropdown Component (20 phút)

```vue
<!-- Dropdown.vue — Custom component với keyboard navigation -->
<template>
    <div class="dropdown" @keydown.escape="close">
        <button
            :id="triggerId"
            @click.stop="toggle"
            :aria-expanded="isOpen"
            :aria-controls="listId"
        >
            {{ selectedLabel }} ▼
        </button>

        <ul
            v-show="isOpen"
            :id="listId"
            role="listbox"
            @click.stop
        >
            <li
                v-for="(option, index) in options"
                :key="option.value"
                :class="{ active: option.value === modelValue }"
                @click="select(option)"
                @keydown.enter="select(option)"
                tabindex="0"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    options: Array,     // [{ value, label }]
    modelValue: String,
    placeholder: { type: String, default: 'Chọn...' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const triggerId = `dropdown-trigger-${Math.random().toString(36).slice(2)}`
const listId = `dropdown-list-${Math.random().toString(36).slice(2)}`

const selectedLabel = computed(() => {
    const found = props.options?.find(o => o.value === props.modelValue)
    return found?.label ?? props.placeholder
})

function toggle() { isOpen.value = !isOpen.value }
function close() { isOpen.value = false }
function select(option) {
    emit('update:modelValue', option.value)
    close()
}
</script>
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`.prevent` và `.stop` như nhau"** | Rất khác: `.prevent` = ngăn hành vi mặc định của browser (form reload, link navigate). `.stop` = ngăn event bubble lên parent element. Thường dùng cả hai: `.prevent.stop` |
| **"Custom event name phải camelCase"** | Vue template tự convert: `@my-event` = `@myEvent` = đều OK. Convention: **kebab-case** trong template (`@update-value`), **camelCase** trong emit (`emit('updateValue')`) |
| **"Không cần khai báo `defineEmits`"** | Về mặt kỹ thuật đúng — component vẫn emit được. Nhưng thiếu `defineEmits`: (1) Mất type checking. (2) Vue DevTools không hiển thị events. (3) Vue cảnh báo về undeclared events. Luôn khai báo |
| **"`@click.stop` trên child ngăn parent click"** | Đúng — nhưng cẩn thận: nó ngăn TẤT CẢ event listeners trên parent, không chỉ Vue ones. Có thể ảnh hưởng đến analytics, close-on-outside-click patterns |
| **"Key modifiers là `keyCode` numbers"** | Vue 3 không dùng keyCode (deprecated). Dùng tên phím: `.enter`, `.esc`, `.space`, `.up`, `.down`, `.left`, `.right`, `.delete`, `.tab`. Hoặc ký tự: `.a`, `.b`, `.'` |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `.prevent` và `.stop` giải quyết vấn đề gì khác nhau? Cho ví dụ use case mỗi loại.
2. Tại sao cần `@click.self` khi xây modal overlay?
3. `defineEmits` khai báo xong rồi — component có phải `return emit` không?

### Câu hỏi áp dụng:

4. Xây `ConfirmButton` component: Lần click đầu → hiện "Bạn chắc chưa?". Lần click thứ 2 → emit `confirm`. Lần click vào nơi khác → reset về trạng thái ban đầu. Dùng events nào?
5. Form có `<textarea>` để soạn comment. Khi `Ctrl+Enter` → submit form (không phải Enter thường). Khi `Escape` → clear nội dung. Viết template.

<details>
<summary>👁️ Xem đáp án</summary>

1. `.prevent` = ngăn **browser default action**: form reload khi submit, link navigate, checkbox không check. Use case: `<form @submit.prevent>` để xử lý submit bằng JavaScript thay vì reload. `.stop` = ngăn **event bubble**: click event không lan lên parent elements. Use case: Button trong card — click button không trigger card click handler.
2. Modal pattern: `<div class="overlay" @click="closeModal">`. Vấn đề: Click vào nội dung modal → event bubble lên overlay → `closeModal` bị gọi → modal đóng. `.self` fix: `@click.self="closeModal"` → chỉ trigger khi click ĐỀ LÊN overlay div, không phải children.
3. Không — `emit` trong `<script setup>` là một function được trả về từ `defineEmits()`, dùng trực tiếp trong script. Không cần expose/return. Template cũng có thể dùng `$emit('eventName', data)` trực tiếp.
4. ```vue
   <template>
       <div>
           <button v-if="!isConfirming" @click="isConfirming = true">Xóa</button>
           <template v-else>
               <button @click.stop="confirmAction">✅ Chắc</button>
               <button @click.stop="isConfirming = false">❌ Không</button>
           </template>
       </div>
   </template>
   <script setup>
   import { ref } from 'vue'
   const emit = defineEmits(['confirm'])
   const isConfirming = ref(false)
   function confirmAction() { emit('confirm'); isConfirming.value = false }
   </script>
   ```
5. ```vue
   <textarea
       v-model="comment"
       @keydown.ctrl.enter.prevent="submitComment"
       @keydown.escape="comment = ''"
       placeholder="Soạn comment (Ctrl+Enter để gửi, Esc để xóa)"
   ></textarea>
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`@event.prevent`** = `e.preventDefault()`. **`@event.stop`** = `e.stopPropagation()`. **`@click.self`** = chỉ element đó
2. **Key modifiers**: `.enter`, `.esc`, `.up`, `.down`. Combo: `@keydown.ctrl.s`, `@click.shift.exact`
3. **Custom events**: `defineEmits(['event-name'])` → `emit('event-name', data)` → parent lắng nghe `@event-name`
4. **`v-model` trên custom component**: Nhận `modelValue` prop + emit `update:modelValue` event
5. **Modifier chaining**: Thứ tự quan trọng — `.prevent.stop` ≠ `.stop.prevent` trong một số edge cases

---

## 10. ➡️ Next Lesson Bridge

*"Event handling hiểu rồi. Nhưng tách component để tái sử dụng — Props, Slots — muốn hiểu sâu hơn," Minh nói.*

*"Bài tiếp theo. `defineProps` với validation, slots cho composable layout, emit với validation — đó là toolkit để xây design system Vue."*

**→ [Bài 07: Components & Props](../02_components/) — defineProps validation, slots pattern, component composition: xây design system với Vue.**
