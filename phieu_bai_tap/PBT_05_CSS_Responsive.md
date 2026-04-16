# 📋 PHIẾU BÀI TẬP 05
# **CSS RESPONSIVE & SCSS — Responsive Design, Media Queries, Sass**

> **Tài liệu tham chiếu:** `tuan_3_css_advanced/13_creating_responsive_layouts.md` → `16_sass_scss.md`
>
> ⏱️ **Thời gian:** 150 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

1. Viết chính xác thẻ `<meta viewport>` chuẩn. Giải thích từng thuộc tính.
2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13)
3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?

### Câu A2 (5đ) — Breakpoints

Ghi lại breakpoints chuẩn (theo tài liệu hoặc Bootstrap). Cho mỗi breakpoint:
- Kích thước pixel
- Thiết bị đại diện
- Ví dụ: lưới sản phẩm nên hiển thị mấy cột?

### Câu A3 (5đ) — Media Queries

Đọc CSS sau, cho biết ở mỗi kích thước màn hình, `.container` có `width` bao nhiêu? Điền bảng.

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | ??? |
| 600px | ??? |
| 800px | ??? |
| 1000px | ??? |
| 1400px | ??? |

### Câu A4 (5đ) — SCSS Basics

Đọc chương 16. Giải thích 4 tính năng chính của SCSS và cho ví dụ:
1. Variables (`$primary-color`)
2. Nesting (viết CSS lồng nhau)
3. Mixins (`@mixin`, `@include`)
4. `@extend` / Inheritance

Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?

---

## PHẦN B — THỰC HÀNH CODE (60 điểm)

### Bài B1 (25đ) — Responsive Product Page

Tạo trang sản phẩm responsive hoàn chỉnh. Files: `responsive.html` + `responsive.css`

**Desktop (≥ 1024px):**
```
┌─────────────────────────────────────────────┐
│              HEADER (nav ngang)               │
├──────────┬───────────────────────┬──────────┤
│ SIDEBAR  │    PRODUCT GRID      │ ADS BAR  │
│ (filter) │    (4 cột cards)     │          │
├──────────┴───────────────────────┴──────────┤
│              FOOTER                          │
└─────────────────────────────────────────────┘
```

**Tablet (768px - 1023px):**
```
┌──────────────────────────────────┐
│         HEADER (nav ngang)        │
├──────────────────────────────────┤
│ SIDEBAR (ngang, filter dropdown)  │
├──────────────────────────────────┤
│      PRODUCT GRID (2 cột)        │
├──────────────────────────────────┤
│         FOOTER                    │
└──────────────────────────────────┘
```

**Mobile (< 768px):**
```
┌────────────────────────┐
│ HEADER (hamburger ☰)   │
├────────────────────────┤
│ PRODUCT GRID (1 cột)  │
├────────────────────────┤
│ FOOTER                 │
└────────────────────────┘
```

**Yêu cầu kỹ thuật:**
- [ ] Mobile-First approach: CSS mặc định = mobile
- [ ] `@media (min-width: 768px)` cho tablet
- [ ] `@media (min-width: 1024px)` cho desktop
- [ ] Ảnh responsive: `max-width: 100%; height: auto;`
- [ ] Font size thay đổi theo breakpoint
- [ ] Navigation: hamburger ☰ trên mobile, menu ngang trên desktop
- [ ] Sidebar ẩn trên mobile
- [ ] Ít nhất 8 product cards

**Chấm điểm & Chụp screenshot:**
- 8đ: 3 breakpoints hoạt động đúng (chụp ở 375px, 768px, 1200px)
- 7đ: Mobile-First (CSS base = mobile, dùng min-width)
- 5đ: Navigation responsive (hamburger ↔ menu ngang)
- 5đ: Ảnh + font responsive

### Bài B2 (15đ) — CSS Transitions & Animations

Tạo file `animations.html` + `animations.css`.

**5 hiệu ứng bắt buộc:**

1. **Card hover effect** — Khi hover vào product card:
   - `transform: translateY(-8px)` + `box-shadow` tăng
   - `transition: all 0.3s ease`

2. **Button hover** — Nút "Mua ngay":
   - Đổi `background-color` + `color` mượt mà
   - Scale nhẹ: `transform: scale(1.05)`

3. **Image zoom** — Ảnh sản phẩm khi hover:
   - `overflow: hidden` trên container
   - Ảnh `transform: scale(1.1)` khi hover
   
4. **Loading spinner** — Dùng `@keyframes` tạo spinner xoay vòng:
   - Hình tròn border
   - `animation: spin 1s linear infinite`

5. **Fade-in khi scroll** (CSS only) — Dùng `@keyframes fadeIn`:
   - Từ `opacity: 0; transform: translateY(20px)` → `opacity: 1; transform: translateY(0)`

### Bài B3 (20đ) — SCSS Refactor

Lấy file CSS từ Bài B1 hoặc PBT trước. Tạo file `style.scss` và refactor:

**Yêu cầu:**

- [ ] **Variables** — Tạo ít nhất 8 biến:
  ```scss
  $primary-color: #...;
  $secondary-color: #...;
  $font-primary: '...';
  $breakpoint-tablet: 768px;
  $breakpoint-desktop: 1024px;
  $spacing-sm: 8px;
  $spacing-md: 16px;
  $spacing-lg: 32px;
  ```

- [ ] **Nesting** — Viết ít nhất 3 blocks nested:
  ```scss
  .card {
      // ...
      .card-image { /* ... */ }
      .card-title { /* ... */ }
      &:hover { /* ... */ }
      &.featured { /* ... */ }
  }
  ```

- [ ] **Mixins** — Tạo ít nhất 3 mixins:
  ```scss
  @mixin respond-to($breakpoint) { /* ... */ }
  @mixin flex-center { /* ... */ }
  @mixin card-shadow { /* ... */ }
  ```

- [ ] **Partial & Import** — Chia thành ít nhất 3 file:
  ```
  scss/
  ├── _variables.scss
  ├── _mixins.scss
  ├── _components.scss
  └── style.scss (main, import các partial)
  ```

- [ ] **Compile** — Biên dịch SCSS → CSS và ghi lại lệnh compile trong `answers.md`

**Chấm điểm:**
- 5đ: Variables sử dụng nhất quán
- 5đ: Nesting + parent selector `&` đúng chỗ
- 5đ: Mixins thiết thực (responsive, flex, shadow)
- 5đ: File structure (partials + import)

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực

Chọn 1 trang web nổi tiếng (Shopee, Tiki, VNExpress, YouTube).

1. Mở trang trên **3 kích thước màn hình** khác nhau (dùng DevTools Toggle Device):
   - Mobile (375px)
   - Tablet (768px)  
   - Desktop (1440px)
   
2. Chụp screenshot cả 3 và phân tích:
   - Navigation thay đổi thế nào? (hamburger? dropdown?)
   - Lưới content thay đổi mấy cột?
   - Elements nào bị ẩn trên mobile?
   - Font size có thay đổi không?

3. Mở DevTools → Styles, tìm `@media` rules. Chụp screenshot ít nhất 2 media queries trang đó dùng.

### Câu C2 (10đ) — Thiết kế Responsive Strategy

Bạn được giao thiết kế trang **Đặt bàn nhà hàng** responsive. Trang có:
- Header với logo + điện thoại đặt bàn
- Hero image toàn trang
- Grid 6 ảnh món ăn
- Form đặt bàn (ngày, giờ, số người, ghi chú)
- Bản đồ Google Maps nhúng
- Footer

**Yêu cầu:** Vẽ wireframe (sơ đồ bố cục) cho 3 kích thước: Mobile, Tablet, Desktop.
- Mobile: Những gì bị ẩn? Form nằm đâu?
- Tablet: Grid ảnh mấy cột? Bản đồ nằm đâu?
- Desktop: Layout bao nhiêu cột? Sidebar có không?

Viết CSS skeleton (chỉ layout, không cần chi tiết) dùng Grid + Media Queries Mobile-First.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 8-12 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Responsive Product Grid Mobile-First"

**Yêu cầu:** Quay video tạo lưới sản phẩm responsive từ mobile → tablet → desktop.

**Trong video, bạn phải:**

1. 🎤 Bắt đầu CSS Mobile-First: `.product-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }`
2. 🎤 Giải thích: tại sao code mặc định là mobile (1 cột)?
3. 🎤 Thêm breakpoint tablet: `@media (min-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }`
4. 🎤 Giải thích `min-width` vs `max-width` — tại sao `min-width` là Mobile-First
5. 🎤 Thêm breakpoint desktop: `@media (min-width: 1024px) { ... repeat(4, 1fr); }`
6. 🎤 **Demo live resize:** Kéo browser từ rộng → hẹp, show grid thay đổi 4→2→1 cột
7. 🎤 Mở DevTools → Toggle Device Toolbar → show ở iPhone, iPad, Desktop
8. 🎤 Thêm `<meta name="viewport">` và giải thích tại sao thiếu thì không responsive

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Demo resize browser liên tục để thấy breakpoints
- [ ] Mở DevTools Device Toolbar ở ≥ 3 kích thước
- [ ] Cuối video: Tổng kết Mobile-First approach

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] File `responsive.html` + `responsive.css` — Bài B1
- [ ] File `animations.html` + `animations.css` — Bài B2
- [ ] Folder `scss/` — Bài B3 (SCSS files + compiled CSS)
- [ ] Folder `screenshots/` — responsive ở 3 breakpoints + phân tích trang thật
- [ ] 🎬 **Video OBS** — `videos/PBT05_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **4 commits**
