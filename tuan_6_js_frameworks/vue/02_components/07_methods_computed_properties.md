# 🟢 TUẦN 6 - BÀI 07 (VUE.JS)
# **METHODS, COMPUTED & WATCHERS — 3 Công Cụ Xử Lý Logic**

---

## 0. 🎬 Opening Hook

*Minh viết function tính `totalPrice` trong method:*
```vue
<p>Tổng tiền: {{ calculateTotal() }}</p>
<p>Thuế: {{ calculateTotal() * 0.1 }}</p>
```
*App có 10 sản phẩm. Minh gõ chữ vào ô tìm kiếm. "Ơ sao hàm calculateTotal bị gọi lại 20 lần?"*

*Anh Hùng: "Vì mỗi lần em gõ phím, component re-render, Vue phải chạy lại TẤT CẢ methods trong template. Thay bằng `computed`: nó tính 1 lần, CACHE kết quả lại, chỉ tính lại khi danh sách sản phẩm đổi. Gõ tìm kiếm không làm tính lại tổng tiền. Đó là khác biệt của Computed."*

---

## 1. 🎯 Why This Matters

- **Methods**: Hành động (actions) do user trigger (click, submit).
- **Computed**: Dữ liệu phái sinh (derived data). Rất tốt cho performance nhờ cơ chế **caching**.
- **Watchers**: Theo dõi thay đổi để làm việc khác (side effects) như gọi API, lưu localStorage.

Dùng sai = performance tệ (dùng method thay computed) hoặc infinite loop (dùng watch update state vòng tròn).

---

## 2. 🌐 Big Picture — The Logic Triangle

```
                           STATE (ref, reactive)
                                    |
            ┌───────────────────────┼──────────────────────┐
            ↓                       ↓                      ↓
      COMPUTED                  WATCHERS                METHODS
  (Derived State)             (Side Effects)           (Actions)

Đặc điểm: Cache = YES       Cache = N/A              Cache = NO
Return:   Bắt buộc          Không cần                Tùy chọn
Trigger:  Dependencies      Data watched             User Event / Code
Use case: Filter/Format     API call / log           Button click
```

---

## 3. ⚙️ Core Technical Truth

### Computed — Derived State (Cached)

```vue
<template>
    <div>
        <!-- Dùng như biến bình thường, không có dấu () -->
        <h2>Giỏ hàng ({{ totalItems }})</h2>
        <p>Tổng thanh toán: {{ formattedTotal }}</p>

        <!-- Nếu gọi 10 lần, computed chỉ tính 1 lần -->
        <p>{{ formattedTotal }}</p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
    { id: 1, name: 'Sách', price: 150000, qty: 2 },
    { id: 2, name: 'Bút', price: 20000, qty: 5 },
])

// 1. Computed đơn giản (Getter)
const totalItems = computed(() => {
    // Tự động track dependency `items`
    return items.value.reduce((sum, item) => sum + item.qty, 0)
})

const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const formattedTotal = computed(() => {
    // Computed phụ thuộc vào computed khác cũng được
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice.value)
})

// 2. Writable Computed (Getter + Setter)
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
    get() {
        return `${firstName.value} ${lastName.value}`
    },
    set(newValue) {
        // Chạy khi có code gán: fullName.value = 'Jane Smith'
        const names = newValue.split(' ')
        firstName.value = names[0] ?? ''
        lastName.value = names[1] ?? ''
    }
})
</script>
```

---

### Methods — Actions (Uncached)

```vue
<template>
    <div class="cart-item">
        <p>{{ item.name }}</p>
        <!-- Methods dùng cho events -->
        <button @click="increaseQty(item.id)">+</button>
        <button @click="decreaseQty(item.id)">-</button>
        <button @click="removeItem(item.id)">Xóa</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([...])

// Các hàm thay đổi state (actions) phải dùng methods
function increaseQty(id) {
    const item = items.value.find(i => i.id === id)
    if (item) item.qty++
}

function decreaseQty(id) {
    const item = items.value.find(i => i.id === id)
    if (item && item.qty > 1) item.qty--
}

function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
}
</script>
```

---

### Watchers — Side Effects

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const searchQuery = ref('')
const results = ref([])
const route = useRoute()

// 1. watch() cơ bản — Watch 1 ref
watch(searchQuery, async (newValue, oldValue) => {
    // Chỉ chạy khi searchQuery thay đổi
    if (newValue.length > 2) {
        const res = await fetch(`/api/search?q=${newValue}`)
        results.value = await res.json()
    } else {
        results.value = []
    }
})

// 2. watch() với Options (immediate, deep)
const config = ref({ theme: 'dark', notifications: true })

watch(config, (newConfig) => {
    localStorage.setItem('user-config', JSON.stringify(newConfig))
}, {
    deep: true,       // Theo dõi thay đổi nested properties của object
    immediate: true   // Chạy handler ngay lập tức lúc component mount
})

// 3. watch() Getter function — Watch prop hoặc specific property
watch(
    () => route.params.id,  // Theo dõi 1 giá trị cụ thể thay vì toàn bộ route object
    async (newId) => {
        if (newId) await loadUser(newId)
    }
)

// 4. watchEffect() — Tự động track dependencies
// Khác với watch: Không cần chỉ định source, tự động chạy immediate.
watchEffect(async () => {
    // Tự động track `route.params.id` vì nó được đọc trong hàm
    const id = route.params.id
    if (id) {
        const res = await fetch(`/api/users/${id}`)
        user.value = await res.json()
    }
})
</script>
```

---

## 4. 🟢 Simplified Layer

> **`computed`: Tính toán từ state, CÓ CACHE. Dùng để render HTML (`{{ filteredList }}`).**
> **`methods`: Hành động user, KHÔNG CACHE. Dùng cho `@click="doSomething"`.**
> **`watch`: Theo dõi state để làm việc ngầm (gọi API, save localStorage). Dùng khi computed không giải quyết được.**

---

## 5. 🏭 Real-world Layer

### Computed Properties trong Shopping Cart

```vue
<script setup>
import { ref, computed } from 'vue'

const cart = ref([
    { id: 1, name: 'Áo thun', price: 199000, qty: 2, category: 'clothes' },
    { id: 2, name: 'Giày sneaker', price: 899000, qty: 1, category: 'shoes' },
    { id: 3, name: 'Mũ lưỡi trai', price: 159000, qty: 3, category: 'accessories' },
])

// Computed đệm: Tính tổng tiền trước giảm giá
const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

// Computed với điều kiện: Giảm 15% nếu đơn hàng > 1 triệu
const discountRate = computed(() => subtotal.value > 1000000 ? 0.15 : 0)
const discountAmount = computed(() => subtotal.value * discountRate.value)
const finalPrice = computed(() => subtotal.value - discountAmount.value)

// Computed lọc theo category
const selectedCategory = ref('all')
const filteredCart = computed(() =>
    selectedCategory.value === 'all'
        ? cart.value
        : cart.value.filter(item => item.category === selectedCategory.value)
)

// Writable computed: Sync giỏ hàng với storage
const wishlist = ref(JSON.parse(localStorage.getItem('wishlist') ?? '[]'))

const persistedWishlist = computed({
    get: () => wishlist.value,
    set: (val) => {
        wishlist.value = val
        localStorage.setItem('wishlist', JSON.stringify(val))
    }
})
</script>
```

---

## 6. 🛠️ Hands-on Practice

### Bài tập: Bảng tính BMI (20 phút)

```vue
<!-- Yêu cầu:
1. State: height (cm), weight (kg)
2. Computed `bmi`: Công thức = weight / (height/100)^2 (cần fix 1 số thập phân)
3. Computed `category`: Nếu bmi < 18.5 (Gầy), 18.5-24.9 (Bình thường), > 25 (Thừa cân)
4. Watcher: Khi `category` đổi thành 'Thừa cân', in ra console "Warning: Overweight!"
-->
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Gọi method trong template cũng được, như React"** | Trong Vue, gọi method `{{ calc() }}` trong template là cực kỳ tệ cho performance vì nó chạy lại sau *mọi* lượt re-render (kể cả khi state không liên quan thay đổi). Luôn dùng `computed`. |
| **"Dùng watch để update state khác"** | Ví dụ: `watch(firstName, (val) => fullName.value = val + ' ' + lastName.value)`. Rất rườm rà. Nếu một state được tính toán từ các state khác → 99% trường hợp bạn nên dùng `computed`. |
| **"Watch array/object thay đổi mà không chạy"** | Vue không track được nếu bạn push vào mảng hoặc sửa key object trừ khi bạn bật `{ deep: true }` (đối với reactive objects) hoặc thay thế hoàn toàn reference của biến ref đó. |

---

## 7. ✅ Checkpoint

1. Điểm khác biệt lớn nhất giữa `computed` và `method` khi render data trong template?
2. Tại sao `watchEffect` lại tiện hơn `watch` trong một số trường hợp?
3. Writable computed cần khai báo 2 hàm nào?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Caching**. `computed` lưu kết quả lại, chỉ tính lại khi dependency thay đổi. `method` chạy lại hàm từ đầu đến cuối mỗi lần Vue re-render template.
2. `watchEffect` (1) Tự động detect những ref nào được dùng bên trong nó để track, không cần khai báo explicitly. (2) Chạy ngay lập tức một lần (như `immediate: true`), tiết kiệm việc phải gọi code khởi tạo riêng.
3. `get()` để trả về giá trị phái sinh, và `set(newValue)` để xử lý khi gán giá trị mới vào computed property đó (thường là update ngược lại các state gốc).

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Computed không cập nhật | Dùng method thay vì computed — method chạy lại mỗi render, computed chỉ chạy khi dependency thay đổi | Đổi `function total() { ... }` thành `const total = computed(() => { ... })` |
| `[Vue warn]: Computed property "xxx" was assigned to but it has no setter` | Gán giá trị cho computed readonly (chỉ có getter) | Thêm setter: `const fullName = computed({ get: ..., set: (val) => { ... } })` |
| Infinite loop: Maximum recursive updates exceeded | Trong `watch` hoặc `computed`, mutate chính state mà nó phụ thuộc vào | Tách state: dùng state gốc A để computed B, chỉ mutate A trong handler, không mutate B |
| `watch` không chạy khi object thay đổi nested property | Watch mặc định chỉ track reference change, không deep track | Thêm `{ deep: true }`: `watch(myObj, handler, { deep: true })` |
| `watchEffect` chạy quá nhiều lần | Dùng `watchEffect` mà dependency quá rộng — mỗi lần bất kỳ reactive data thay đổi đều chạy | Thu hẹp scope: chỉ truy cận chính xác property cần track bên trong `watchEffect` |
| Method gọi trong template chạy mỗi render | Template re-render → method chạy lại từ đầu, không cache | Chuyển sang `computed` nếu kết quả chỉ phụ thuộc vào reactive state |

---

## 8. 📌 Summary

1. **Methods**: Các hàm xử lý sự kiện (`@click`, `@input`), không có cache.
2. **Computed**: Các thuộc tính dẫn xuất, tự động cache, chỉ re-evaluate khi dependencies thay đổi. Luôn ưu tiên dùng trong template.
3. **Watch / WatchEffect**: Công cụ mạnh mẽ để bắt thay đổi state và chạy side-effects (API calls, sync DOM, LocalStorage).
4. `watch` cần `{ deep: true }` để theo dõi nested data, `{ immediate: true }` để chạy ngay lần đầu.

**→ [Bài 08: Lifecycle Hooks](./08_lifecycle_hooks.md) — onMounted, onUnmounted và quản lý vòng đời component.**
