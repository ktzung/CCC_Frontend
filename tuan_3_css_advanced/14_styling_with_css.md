# 🟩 TUẦN 3 - BÀI 14
# **STYLING WITH CSS — Gradients, Shadows & Animations**

---

## 0. 🎬 Opening Hook

*Minh mở hai tab cạnh nhau: Todo App của anh (nền trắng, text đen, border xám) và Apple.com (gradient tím-xanh mượt mà, card nổi 3D khi hover, chữ glow, parallax scroll).*

*"Cùng là HTML và CSS," Minh hỏi. "Sao Apple đẹp thế còn mình như web năm 2005?"*

*"Vì Apple dùng 4 thứ mà em chưa học," anh Hùng trả lời. "Gradients, Shadows, Transitions, và Animations. Bốn vũ khí này, khi kết hợp đúng cách, biến 'bình thường' thành 'premium'."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**Nghiên cứu UX cho thấy:**
- Website có animations phù hợp → tăng **thời gian ở lại** 40%
- Hover effects mượt mà → tăng **click-through rate** 15%
- Không có transition → người dùng cảm thấy trang "thô" và "thiếu chuyên nghiệp"

Đây là kỹ năng phân biệt Junior chỉ "code đúng" với Junior có thể "code đẹp".

---

## 2. 🌐 Big Picture — 4 vũ khí styling

```
GRADIENTS     → Màu sắc phong phú hơn solid color
  ↓
SHADOWS       → Tạo chiều sâu, cảm giác 3D
  ↓
TRANSITIONS   → Hover effect mượt mà (cầu nối giữa 2 trạng thái)
  ↓
ANIMATIONS    → Chuyển động tự phát không cần tương tác

Kết hợp cả 4 → UI premium
```

---

## 3. ⚙️ Core Technical Truth

### 🌈 Gradients — Tạm biệt nền màu nhàm chán

**Linear Gradient (chuyển màu theo đường thẳng):**
```css
/* Cơ bản: từ màu A → màu B */
.hero {
    background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Nhiều điểm dừng */
.sunset {
    background: linear-gradient(
        to bottom,
        #ff6b6b 0%,
        #feca57 50%,
        #48dbfb 100%
    );
}

/* Gradient text (hiệu ứng hot 2024) */
.gradient-text {
    background: linear-gradient(90deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

**Radial Gradient (chuyển màu hình tròn/ellipse):**
```css
.spotlight {
    background: radial-gradient(circle at 30% 40%, #fff 0%, #667eea 70%);
}
```

**Ảnh + Gradient Overlay (cực hay dùng cho banner):**
```css
.hero-banner {
    background:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
        url('hero.jpg') center/cover no-repeat;
    color: white;
    min-height: 80vh;
    display: flex;
    align-items: center;
}
/* → Text white đọc được trên ảnh tối */
```

---

### 💎 Shadows — Tạo chiều sâu và cảm giác nổi

**`box-shadow` — Đổ bóng cho box:**
```css
/* Cú pháp: offset-x offset-y blur spread color */

/* Subtle — Material Design Level 1 */
.card {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12),
                0 1px 2px rgba(0,0,0,0.24);
}

/* Medium — Level 2 */
.dropdown {
    box-shadow: 0 3px 6px rgba(0,0,0,0.15),
                0 2px 4px rgba(0,0,0,0.12);
}

/* Strong — Modal/Overlay */
.modal {
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

/* Màu + glow effect (colored shadow) */
.btn-primary {
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* Card hover: nhấc lên */
.card {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    transform: translateY(-4px);
}
```

**`text-shadow` — Đổ bóng text:**
```css
/* Glow effect */
.neon-text {
    text-shadow:
        0 0 10px #667eea,
        0 0 20px #667eea,
        0 0 40px #667eea;
}

/* Classic drop shadow */
h1 {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
```

---

### ✨ Transitions — Hover mượt mà, không "bụp"

```css
/* Cú pháp: property duration timing-function delay */
.btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    /* ⭐ Transition cho tất cả properties thay đổi */
    transition: background-color 0.3s ease,
                transform 0.2s ease,
                box-shadow 0.3s ease;
}

.btn:hover {
    background: #5a67d8;           /* Đổi màu */
    transform: translateY(-2px);    /* Nhấc lên nhẹ */
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn:active {
    transform: translateY(0);      /* Nhấn xuống khi click */
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}
```

**Timing functions:**
```css
transition: all 0.3s ease;          /* Phổ biến nhất */
transition: all 0.3s ease-in-out;   /* Slow → Fast → Slow */
transition: all 0.3s linear;        /* Tốc độ đều */
transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bounce */
```

> **Quy tắc vàng:** Mọi element có `:hover` phải có `transition`. Không có = thay đổi "bụp" một cái — thô.

---

### 🎬 Animations — @keyframes

**Bước 1: Định nghĩa kịch bản (keyframes):**
```css
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.08); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
```

**Bước 2: Gán cho element:**
```css
/* animation: name duration timing iteration delay fill-mode */

.hero-title {
    animation: slideInUp 0.8s ease-out;
}

.notification-badge {
    animation: pulse 2s ease-in-out infinite;
}

.loading-spinner {
    animation: spin 0.8s linear infinite;
}

/* Skeleton loading (shimmer effect) */
.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
```

---

### Loading Spinner hoàn chỉnh:

```css
.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Transition = cầu nối giữa state A và state B. Luôn thêm vào element GỐC, không phải `:hover`.**
> **Animation = Transition tự động chạy theo kịch bản @keyframes, không cần tương tác.**

---

## 5. 🏭 Real-world Layer

### Design system — Shadows chuẩn Google Material

```css
:root {
    --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
    --shadow-md:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
    --shadow-lg:  0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05);
    --shadow-xl:  0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04);
    --shadow-2xl: 0 25px 50px rgba(0,0,0,0.25);
}

/* Sử dụng nhất quán */
.card      { box-shadow: var(--shadow-md); }
.dropdown  { box-shadow: var(--shadow-lg); }
.modal     { box-shadow: var(--shadow-2xl); }
```

### Accessibility — Animation cần tôn trọng người dùng

```css
/* Người dùng có thể tắt animation (motion sickness) */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Nâng cấp Todo App thành Premium UI (25 phút)

Thêm vào `styles.css`:

```css
/* 1. GRADIENT HEADER */
header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 32px;
}
header h1 {
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* 2. CARD HOVER */
.todo-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 12px;
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.07));
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    cursor: pointer;
}
.todo-card:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    transform: translateY(-3px);
}

/* 3. BUTTON PREMIUM */
.btn-add {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
}
.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}
.btn-add:active {
    transform: translateY(0);
}

/* 4. LOADING SPINNER */
.spinner {
    width: 32px; height: 32px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

**Đánh giá kết quả:** Trang có "premium feel" chưa? So sánh với screenshot trước khi thêm styles.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Nhiều animation = đẹp hơn"** | Ngược lại — quá nhiều animation gây **distraction**, khiến UX tệ. Chỉ animate những gì cần thiết |
| **"Transition đặt trên `:hover` là đúng"** | Sai — đặt transition trên **element gốc**. Nếu đặt trên `:hover`, chỉ có transition khi hover vào, không có transition khi hover ra |
| **"Gradient text hoạt động trên mọi browser"** | Cần prefix `-webkit-background-clip: text` và check caniuse.com. Safari cần `-webkit-text-fill-color: transparent` |
| **"Shadow nhẹ trông professional hơn"** | Đúng một phần — shadow quá đậm = cũ (web 2010). Nhưng shadow quá nhẹ không thấy = không hiệu quả. Phải **đủ thấy nhưng subtle** |
| **"`animation: infinite` tiêu tốn battery"** | Đúng — infinite animation chạy liên tục dùng GPU. Chỉ dùng cho loading spinner, notification badge — không phải decorative elements |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa `transition` và `animation` là gì? Khi nào dùng cái nào?
2. Tại sao phải đặt `transition` trên element gốc, không phải trên `:hover`?
3. `@media (prefers-reduced-motion: reduce)` làm gì và tại sao quan trọng?

### Câu hỏi áp dụng:

4. Bạn muốn card sản phẩm khi hover thì: nổi lên 4px, shadow đậm hơn, và scale lên 1.02. Viết CSS đầy đủ (cả transition và hover state).
5. Spinner loading đang quay ngược chiều kim đồng hồ thay vì xuôi. Cần sửa gì trong `@keyframes`?

<details>
<summary>👁️ Xem đáp án</summary>

1. **`transition`** = animation **phản ứng với tương tác** (hover, focus, click) — cần người dùng trigger. **`animation`** = chạy **tự động** không cần trigger, theo kịch bản `@keyframes`. Dùng transition cho hover effects, dùng animation cho loading, entrance effects, notification.
2. Nếu transition ở `:hover`: **hover vào** có animation đẹp, nhưng **hover ra** (về trạng thái gốc) bị "bụp" ngay vì không có transition rule. Đặt ở element gốc → cả hai chiều đều smooth.
3. Một số người dùng bị **motion sickness** hoặc **vestibular disorder** — animation gây chóng mặt, buồn nôn. OS cho phép họ chọn "Reduce Motion" → CSS media query này detect điều đó và tắt/giảm animation. WCAG accessibility requirement.
4. ```css
   .card {
       transition: transform 0.3s ease, box-shadow 0.3s ease;
   }
   .card:hover {
       transform: translateY(-4px) scale(1.02);
       box-shadow: 0 12px 30px rgba(0,0,0,0.15);
   }
   ```
5. `@keyframes spin { to { transform: rotate(360deg); } }` → quay thuận chiều kim đồng hồ. Nếu quay ngược → đang dùng `rotate(-360deg)` hoặc `from { transform: rotate(360deg); } to { transform: rotate(0deg); }`. Sửa: dùng `rotate(360deg)` không có dấu âm.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Gradients** = `linear-gradient()` hoặc `radial-gradient()`. Kết hợp với `url()` tạo overlay tối trên ảnh
2. **Shadows** = bắt đầu subtle, tăng dần khi hover. Dùng CSS variables cho nhất quán
3. **Transition phải ở element GỐC** (không phải `:hover`) để cả hover in và hover out đều smooth
4. **@keyframes** = định nghĩa kịch bản. `animation: name duration timing iteration` = gán cho diễn viên
5. **Luôn thêm `prefers-reduced-motion`** — tôn trọng người dùng có vấn đề về motion

---

## 10. ➡️ Next Lesson Bridge

*Todo App giờ có gradient header, card hover nổi lên, spinner loading, button glow. Premium feel rồi.*

*"Nhưng file CSS đã 600 dòng," Minh lo lắng. "Sửa màu gradient thì phải tìm tất cả chỗ dùng màu đó. Có class `.title` dùng ở khắp nơi — sửa là vỡ trang khác."*

**→ [Bài 15: Testing & Organizing CSS](./15_testing_organizing.md) — BEM naming, CSS Variables, Modular CSS: tổ chức CSS cho dự án 10.000 dòng.**
