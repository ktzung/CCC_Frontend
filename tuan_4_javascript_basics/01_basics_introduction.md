# 🟨 TUẦN 4 - BÀI 01
# **JAVASCRIPT BASICS — INTRODUCTION**

---

## 0. 🎬 Opening Hook

*Minh hoàn thành Todo App: form đẹp, layout responsive, CSS animations mượt mà. Tự hào.*

*Nhấn nút "Thêm công việc" → không có gì xảy ra.*

*Gõ text vào ô → nhấn Enter → không có gì xảy ra.*

*"Trang web đẹp nhưng... chết," Minh nói. "Giống showroom xe: nội thất sang trọng, sơn bóng loáng nhưng không có động cơ."*

*"Đó chính xác là vấn đề," anh Hùng nói. "HTML = khung xe. CSS = sơn và nội thất. JavaScript = động cơ. Không có JS, website chỉ là poster."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

> 💡 **Fun fact:** JavaScript là ngôn ngữ **DUY NHẤT** chạy trực tiếp trên browser. Bạn có thể không học Python, Java, C++ — nhưng nếu làm web, **bắt buộc phải biết JavaScript**.

Mọi tương tác trên web mà bạn thấy là JavaScript:
- Facebook like → JS
- Google autocomplete khi gõ → JS
- Netflix load thêm phim khi scroll → JS
- Shopee thêm vào giỏ không reload trang → JS

---

## 2. 🌐 Big Picture — JavaScript ở đâu trong web?

```
JAVASCRIPT CHẠY Ở MỌI NƠI:

Frontend (Browser)
├── Vanilla JS    → DOM manipulation, events
├── React/Vue     → Component-based UI
└── Angular       → Enterprise apps

Backend (Server)
└── Node.js       → API, Database, Server

Mobile
└── React Native  → App iOS & Android

Desktop
└── Electron      → VS Code, Discord, Slack, Figma
```

**JavaScript trong file HTML:**
```
HTML file ─────────────────────────────────
│  <head>                                  │
│      <link rel="stylesheet" href="...">  │  ← CSS: style
│  </head>                                 │
│  <body>                                  │
│      <!-- Content -->                    │
│      <script src="app.js"></script>      │  ← JS: cuối body
│  </body>                                 │
────────────────────────────────────────────
```

---

## 3. ⚙️ Core Technical Truth

### Cách 1: Console trong browser — Thử ngay không cần file

```javascript
// F12 → Tab Console → Gõ và Enter

console.log("Hello, World!");          // → Hello, World!
console.log(2 + 2);                    // → 4

// Thay đổi trang web ngay lập tức!
document.title = "Todo App — Minh";   // → Đổi title tab
document.body.style.background = "#1e293b";  // → Nền đen!
```

### Cách 2: External JS file — Chuẩn production

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>📝 Todo App</h1>

    <!-- ✅ Script ở CUỐI body — HTML load xong mới chạy JS -->
    <script src="app.js"></script>
</body>
</html>
```

```javascript
// app.js
console.log("App loaded!");
document.querySelector("h1").textContent = "📝 Todo App của Minh";
```

> ⚠️ **`<script>` phải ở cuối `<body>`** — JS chạy từ trên xuống. Nếu đặt trong `<head>` không có `defer`, JS cố truy cập element chưa tồn tại trong DOM → lỗi ngay.

### Cách 3: Script với `defer` attribute (nếu cần đặt trong head)

```html
<head>
    <script src="app.js" defer></script>  <!-- Tải song song, chạy SAU khi DOM ready -->
</head>
```

---

### Console — Công cụ debug số 1

```javascript
// Các mức log khác nhau — hiện màu khác trong DevTools
console.log("Info thông thường");           // Trắng/Xám
console.warn("Cảnh báo — nên chú ý");      // Vàng ⚠️
console.error("Lỗi nghiêm trọng!");        // Đỏ ❌

// console.table — hiện object/array dạng bảng đẹp
console.table([
    { name: "Minh", age: 21, major: "CNTT" },
    { name: "Linh", age: 20, major: "KTPM" }
]);

// console.time — đo thời gian thực thi
console.time("myLoop");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("myLoop");  // → myLoop: 2.345ms

// console.group — nhóm logs liên quan
console.group("User Info");
console.log("Name:", "Minh");
console.log("Score:", 95);
console.groupEnd();
```

---

### JavaScript không phải Java — Dễ bị nhầm

| | JavaScript | Java |
|---|---|---|
| **Tên** | Được đặt để... marketing (1995) | Ngôn ngữ riêng biệt |
| **Chạy ở đâu** | Browser + Node.js | JVM (Java Virtual Machine) |
| **Gõ kiểu** | Dynamic typing | Static typing |
| **Dùng cho** | Web frontend/backend | Enterprise, Android |
| **Liên quan nhau không** | ❌ Không quan hệ | ❌ |

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **JS = Ngôn ngữ duy nhất của browser. Không biết JS = không làm web được.**
> **`<script>` đặt cuối `<body>` — hoặc dùng `defer` attribute.**

---

## 5. 🏭 Real-world Layer

### JS trong developer workflow hàng ngày:

```javascript
// 1. Validate form trước khi gửi đến server
// 2. Gọi API: lấy danh sách sản phẩm, thời tiết, tin tức
// 3. Render data vào trang HTML
// 4. Lắng nghe sự kiện: click, scroll, resize, keypress
// 5. Animation và transition phức tạp
// 6. Lưu data vào localStorage (persistent state)
// 7. Communicate với WebSocket (chat real-time)
```

### Tại sao học Vanilla JS trước framework?

```
Vanilla JS → React/Vue/Angular
              ↑
      Framework chỉ là JS + convention
      Không hiểu JS cơ bản → không debug được framework
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Khám phá JS trong Console (15 phút)

**Phần 1 — Thực nghiệm trong Console:**
1. Mở Chrome → vào bất kỳ trang web nào (ví dụ: `shopee.vn`)
2. Nhấn F12 → tab **Console**
3. Gõ từng dòng sau và quan sát:

```javascript
// Thay đổi title
document.title = "Tôi đã hack Shopee 😈"

// Thay đổi background
document.body.style.background = "linear-gradient(135deg, #667eea, #764ba2)"
document.body.style.color = "white"

// Đếm số link trên trang
document.querySelectorAll("a").length

// console.table tất cả link
const links = [...document.querySelectorAll("a")].map(a => ({
    text: a.textContent.trim(),
    href: a.href
}));
console.table(links)
```

4. Refresh trang → Các thay đổi còn không? Tại sao?

**Phần 2 — Tạo file JS đầu tiên:**
1. Tạo file `hello.html` và `app.js`
2. Viết JS thay đổi `<h1>` sau 2 giây:
```javascript
// app.js
console.log("Script bắt đầu chạy lúc:", new Date().toLocaleTimeString());

setTimeout(() => {
    document.querySelector("h1").textContent = "JS đã thay đổi tôi! 🎉";
    document.querySelector("h1").style.color = "#2563eb";
}, 2000);
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"JavaScript = Java"** | Hoàn toàn không liên quan. Tên giống nhau do marketing năm 1995. Khác nhau về cú pháp, runtime, mục đích |
| **"`<script>` đặt trong `<head>` vẫn chạy được"** | Chạy được, nhưng JS cố truy cập DOM elements chưa tồn tại → lỗi phổ biến. Phải thêm `defer` hoặc đặt cuối body |
| **"Console.log tự biến mất sau khi đóng DevTools"** | Logs không biến mất — chỉ ẩn. Mở DevTools lại → logs cũ vẫn còn (đến khi reload trang) |
| **"JS chỉ chạy trên web"** | JS chạy ở khắp nơi: Server (Node.js), Mobile (React Native), Desktop (Electron), IoT, Game engines |
| **"Học một framework là đủ, không cần biết JS cơ bản"** | Framework như React, Vue đều BUILD ON TOP OF JavaScript. Không hiểu JS → không debug được khi framework fail |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao `<script>` nên đặt cuối `<body>` thay vì trong `<head>`?
2. Sự khác biệt giữa `console.log`, `console.warn`, và `console.error` là gì?
3. Nếu muốn đặt `<script>` trong `<head>` mà vẫn hoạt động đúng, cần thêm attribute gì?

### Câu hỏi áp dụng:

4. Bạn mở DevTools Console và gõ `document.body.style.background = "red"`. Sau đó refresh trang — nền có còn đỏ không? Giải thích tại sao.
5. `console.table` hữu ích hơn `console.log` trong trường hợp nào?

<details>
<summary>👁️ Xem đáp án</summary>

1. Browser đọc HTML từ trên xuống. Khi gặp `<script>` trong `<head>` → dừng HTML parsing để chạy JS → JS cố truy cập `<body>` elements chưa được parse → lỗi `null`. Đặt cuối `<body>` → toàn bộ HTML đã parse xong → elements tồn tại sẵn.
2. **`console.log`** = thông tin bình thường (màu xám/trắng). **`console.warn`** = cảnh báo (màu vàng, có icon ⚠️) — không crash nhưng cần chú ý. **`console.error`** = lỗi nghiêm trọng (màu đỏ, có icon ❌) — thường kèm stack trace.
3. Attribute **`defer`**: `<script src="app.js" defer>`. `defer` = tải JS song song khi browser parse HTML, nhưng CHỈ chạy JS sau khi DOM parse xong hoàn toàn.
4. **Không còn đỏ** sau refresh. Vì thay đổi qua Console chỉ tồn tại trong **RAM của browser tab đó**. Refresh = tải lại trang từ file HTML gốc → mọi thay đổi mất. Để thay đổi vĩnh viễn phải sửa file CSS/JS.
5. `console.table` hữu ích khi debug **array of objects** (ví dụ: danh sách users, products, API response). Hiện dạng bảng với cột/hàng rõ ràng, dễ so sánh hơn rất nhiều so với `console.log` mảng JSON dài.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **JavaScript = ngôn ngữ duy nhất của browser** — mọi web interactivity đều từ JS
2. **`<script>` đặt cuối `<body>`** — hoặc dùng `defer` attribute trong `<head>`
3. **Console = công cụ debug** — `log`, `warn`, `error`, `table`, `time` cho từng mục đích
4. **JavaScript ≠ Java** — không liên quan về mặt kỹ thuật
5. **Học Vanilla JS trước framework** — framework là abstraction of JS, không phải thay thế

---

## 10. ➡️ Next Lesson Bridge

*"JS chạy rồi," Minh nói. "Nhưng mình cần lưu tên todo, đếm số lượng, tính tổng. Mình cần biến và kiểu dữ liệu."*

*"Đó là bài tiếp theo," anh Hùng nói. "Và cẩn thận: `var`, `let`, `const` — ba cách khai báo biến, tính cách khác nhau hoàn toàn. Dùng sai `var` bây giờ = debug hell sau này."*

**→ [Bài 02: Variables & Operators](./02_getting_started.md) — `let`, `const`, kiểu dữ liệu, `===` vs `==`.**
