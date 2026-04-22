# 🟢 TUẦN 6 - BÀI 08 (VUE.JS)
# **LIFECYCLE HOOKS — Component Sinh Ra, Sống, và Chết**

---

## 0. 🎬 Opening Hook

*Minh gọi API trong `<script setup>` ngay lập tức:*
```javascript
const data = await fetch('/api/products').then(r => r.json())
// ❌ Lỗi: Cannot use top-level await ở đây
```

*Thêm vào `onMounted`:*
```javascript
onMounted(async () => {
    data.value = await fetch('/api/products').then(r => r.json())
})
```
*Chạy được. Nhưng component bị destroy khi đang fetch → memory leak.*

*"Đó là lý do cần AbortController trong onUnmounted," anh Hùng nói. "Lifecycle hooks = quyền kiểm soát từng giai đoạn cuộc đời component."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Lifecycle hooks giải quyết 3 vấn đề thực tế:
1. **Timing** — Biết chính xác khi nào DOM sẵn sàng để truy cập
2. **Side effects** — Setup event listeners, timers, WebSocket connections
3. **Cleanup** — Tránh memory leaks khi component unmount

---

## 2. 🌐 Big Picture — Lifecycle Diagram

```
COMPONENT LIFECYCLE
────────────────────────────────────────────────────────

  <script setup> chạy   →  onBeforeMount  →  onMounted
  (synchronous)              (DOM chưa có)    (DOM ready ✅)
                                              Fetch API, init libs, DOM access

                        ──── User interaction / data change ────

                             onBeforeUpdate  →  onUpdated
                             (DOM cũ)           (DOM mới ✅)
                                               Update 3rd party libs

  v-if = false hoặc
  navigate away         →  onBeforeUnmount →  onUnmounted
                              (DOM còn đó)      (DOM đã xóa)
                                               Cleanup! Clear timers,
                                               cancel requests, remove listeners

VUE vs REACT COMPARISON:
onMounted    ≈  useEffect(() => {}, [])
onUnmounted  ≈  return () => {} (cleanup fn)
onUpdated    ≈  useEffect(() => {})  (no deps)
```

---

## 3. ⚙️ Core Technical Truth

### Tất cả Lifecycle Hooks

```vue
<script setup>
import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    onActivated,    // Khi component được kích hoạt từ <KeepAlive>
    onDeactivated,  // Khi component bị deactivate bởi <KeepAlive>
    onErrorCaptured // Bắt lỗi từ child components
} from 'vue'

// setup() = script setup = chạy trước tất cả hooks
console.log('1. setup — synchronous, DOM chưa có')

onBeforeMount(() => console.log('2. onBeforeMount — template compiled, DOM chưa insert'))
onMounted(() => console.log('3. onMounted — DOM sẵn sàng ✅'))

onBeforeUpdate(() => console.log('4. onBeforeUpdate — state thay đổi, DOM chưa update'))
onUpdated(() => console.log('5. onUpdated — DOM đã update ✅'))

onBeforeUnmount(() => console.log('6. onBeforeUnmount — chuẩn bị destroy'))
onUnmounted(() => console.log('7. onUnmounted — đã destroy, cleanup ✅'))
</script>
```

---

### onMounted — Use Cases Phổ Biến

```vue
<template>
    <div ref="mapContainer" class="map"></div>
    <canvas ref="chartEl"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const mapContainer = ref(null)
const chartEl = ref(null)
let map = null
let chart = null

onMounted(async () => {
    // ✅ USE CASE 1: Khởi tạo thư viện cần DOM element
    map = new MapLibrary(mapContainer.value, {
        center: [106.6297, 10.8231],
        zoom: 12
    })

    // ✅ USE CASE 2: Fetch dữ liệu ban đầu
    try {
        const res = await fetch('/api/map-data')
        const data = await res.json()
        map.addMarkers(data.locations)
    } catch (err) {
        console.error('Failed to load map data:', err)
    }

    // ✅ USE CASE 3: Add event listeners
    window.addEventListener('resize', handleResize)

    // ✅ USE CASE 4: Setup timers
    autoRefreshTimer = setInterval(refreshData, 30000)
})

let autoRefreshTimer = null

function handleResize() {
    map?.resize()
}

function refreshData() {
    fetch('/api/live-data').then(r => r.json()).then(data => {
        map?.updateMarkers(data)
    })
}

// Cleanup tất cả resources
onBeforeUnmount(() => {
    map?.destroy()
    chart?.destroy()
    window.removeEventListener('resize', handleResize)
    clearInterval(autoRefreshTimer)
})
</script>
```

---

### Fetch với AbortController — Tránh Memory Leak

```vue
<template>
    <div>
        <div v-if="isLoading" class="loading">⏳ Đang tải...</div>
        <div v-else-if="error" class="error">❌ {{ error }}</div>
        <div v-else>
            <ProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const products = ref([])
const isLoading = ref(true)
const error = ref(null)

// AbortController để cancel request khi component unmount
let abortController = null

onMounted(async () => {
    abortController = new AbortController()

    try {
        const res = await fetch('/api/products', {
            signal: abortController.signal
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        products.value = await res.json()

    } catch (err) {
        // AbortError là bình thường — component đã unmount
        if (err.name !== 'AbortError') {
            error.value = err.message
        }
    } finally {
        isLoading.value = false
    }
})

onUnmounted(() => {
    // Cancel pending request khi component unmount
    abortController?.abort()
})
</script>
```

---

### Composable = Logic tái sử dụng với Lifecycle

```javascript
// composables/useWindowSize.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
    const width = ref(0)
    const height = ref(0)

    function update() {
        width.value = window.innerWidth
        height.value = window.innerHeight
    }

    onMounted(() => {
        update()
        window.addEventListener('resize', update)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', update)
    })

    return { width, height }
}

// composables/useInterval.js
import { onMounted, onUnmounted } from 'vue'

export function useInterval(callback, delay) {
    let timer = null

    onMounted(() => {
        timer = setInterval(callback, delay)
    })

    onUnmounted(() => {
        clearInterval(timer)
    })
}

// Sử dụng composables trong component — clean và reusable
<script setup>
import { useWindowSize } from '@/composables/useWindowSize'
import { useInterval } from '@/composables/useInterval'
import { ref } from 'vue'

const { width, height } = useWindowSize()

const currentTime = ref(new Date().toLocaleTimeString('vi-VN'))
useInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('vi-VN')
}, 1000)
</script>
```

---

### onUpdated — Khi nào thực sự cần?

```vue
<script setup>
import { ref, onUpdated, nextTick } from 'vue'

const messages = ref([])
const messageList = ref(null)

// onUpdated: chạy sau mỗi reactive update
// Dùng hạn chế — thường watch() hoặc computed() tốt hơn
onUpdated(() => {
    // Ví dụ hợp lý: Auto-scroll xuống cuối khi có message mới
    if (messageList.value) {
        messageList.value.scrollTop = messageList.value.scrollHeight
    }
})

// HOẶC dùng nextTick — elegant hơn
async function addMessage(text) {
    messages.value.push({ id: Date.now(), text })
    await nextTick()  // Đợi Vue update DOM
    messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })
}
</script>
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`onMounted` = nơi duy nhất an toàn để: fetch API, access DOM refs, init thư viện bên ngoài.**
> **`onUnmounted` = bắt buộc cleanup: `clearInterval`, `removeEventListener`, `abortController.abort()`. Quên = memory leak.**

---

## 5. 🏭 Real-world Layer

### Real-time Dashboard

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = ref({ users: 0, orders: 0, revenue: 0 })
const isConnected = ref(false)
let ws = null
let reconnectTimer = null

function connectWebSocket() {
    ws = new WebSocket('wss://api.example.com/live-stats')

    ws.onopen = () => { isConnected.value = true }
    ws.onmessage = (event) => {
        stats.value = JSON.parse(event.data)
    }
    ws.onclose = () => {
        isConnected.value = false
        // Auto-reconnect sau 5 giây
        reconnectTimer = setTimeout(connectWebSocket, 5000)
    }
}

onMounted(connectWebSocket)

onUnmounted(() => {
    ws?.close()
    clearTimeout(reconnectTimer)
})
</script>
```

---

## 6. 🛠️ Hands-on Practice

### Bài tập: Stopwatch component (20 phút)

```vue
<!-- Yêu cầu: Stopwatch với Start/Stop/Reset -->
<!-- State: seconds (ref), isRunning (ref) -->
<!-- onMounted: không cần fetch -->
<!-- onUnmounted: clearInterval khi component bị unmount -->
<!-- Display: MM:SS format (computed) -->
<!-- Bonus: Lap times (array của timestamps) -->
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Fetch data ngay trong `<script setup>` bằng top-level await"** | Vue SFC hỗ trợ top-level await nhưng cần `<Suspense>` wrapper ở parent. Cách phổ biến và an toàn hơn: `onMounted(async () => {...})` |
| **"`onUpdated` = watch() — dùng cái nào cũng được"** | Khác: `watch(source, fn)` react với **specific** state change. `onUpdated` chạy sau **mọi** re-render. `watch` precise hơn, ít side effects |
| **"Không cleanup thì chỉ bị warning"** | Không cleanup = **Memory Leak**. Ví dụ: `setInterval` tiếp tục chạy sau khi component destroy → callback cố update state của component không tồn tại → Vue warning → worst case: crash |
| **"`onBeforeUnmount` và `onUnmounted` như nhau"** | Khác: `onBeforeUnmount` = component vẫn còn trong DOM, có thể làm final reads. `onUnmounted` = đã destroy. Cleanup thường ở `onUnmounted` |
| **"Gọi nhiều `onMounted` trong 1 component = lỗi"** | Không lỗi — Vue chạy tất cả. Thực tế rất hữu ích: composables mỗi cái có `onMounted` riêng, tất cả đều được gọi khi component mount |

---

## 8. ✅ Checkpoint

1. Tại sao không được gọi `fetch()` ở top-level `<script setup>` mà phải trong `onMounted`?
2. Nếu quên `removeEventListener` trong `onUnmounted`, hậu quả là gì?
3. `nextTick()` là gì? Khi nào cần dùng?

### Câu hỏi áp dụng:

4. Component fetch danh sách users. User click → component unmount (navigate đi) trong khi fetch chưa xong. Xảy ra gì? Cách fix?
5. Composable `useOnlineStatus` trả về `isOnline` ref, tự setup/cleanup event listeners. Viết composable này.

<details>
<summary>👁️ Xem đáp án</summary>

1. `<script setup>` chạy synchronous, DOM chưa exist. Nếu dùng top-level await: (1) Cần `<Suspense>` wrapper. (2) `await` có thể block rendering. `onMounted` chạy **sau** khi DOM đã render → safe để truy cập refs, call APIs. Vue guarantee: khi `onMounted` callback bắt đầu, component đã fully mounted.
2. Event listener tiếp tục active → callback vẫn chạy sau khi component destroy → callback cố update `ref.value` → Vue console warning "Component unmounted but reactive subscription still active" → memory leak (event listener giữ reference đến component). Với nhiều navigate → ngày càng nhiều listeners → performance degradation → crash.
3. `nextTick()` = Promise resolve sau khi Vue flush DOM updates. Cần khi: cần access updated DOM ngay sau khi state thay đổi (auto-scroll, re-measure element). ```javascript messages.value.push(newMsg) await nextTick() // DOM đã update container.scrollTop = container.scrollHeight ```
4. Nếu không có AbortController: fetch hoàn thành → callback cố `data.value = result` → Vue warning "writing to unmounted component". Không crash nhưng warning. Fix: ```javascript const ac = new AbortController() onMounted(() => { fetch('/api', { signal: ac.signal }).then(...).catch(err => { if (err.name !== 'AbortError') error.value = err.message }) }) onUnmounted(() => ac.abort()) ```
5. ```javascript export function useOnlineStatus() { const isOnline = ref(navigator.onLine) function handleOnline() { isOnline.value = true } function handleOffline() { isOnline.value = false } onMounted(() => { window.addEventListener('online', handleOnline) window.addEventListener('offline', handleOffline) }) onUnmounted(() => { window.removeEventListener('online', handleOnline) window.removeEventListener('offline', handleOffline) }) return { isOnline } } ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Lifecycle order**: `setup → onBeforeMount → onMounted → (updates) → onBeforeUnmount → onUnmounted`
2. **`onMounted`**: DOM sẵn sàng → fetch data, init thư viện, access refs, add event listeners
3. **`onUnmounted`**: Cleanup bắt buộc → `clearInterval`, `removeEventListener`, `abortController.abort()`
4. **`nextTick()`**: Đợi Vue update DOM rồi mới chạy code → tránh stale DOM references
5. **Composables** encapsulate lifecycle logic → `useInterval`, `useWindowSize`, `useFetch` — tái sử dụng sạch

---

## 10. ➡️ Next Lesson Bridge

**→ [Bài 09: Vue Router](../03_routing_state/09_routing.md) — Đa trang không reload: RouterLink, RouterView, useRoute, useRouter.**
