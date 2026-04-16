# 📋 PHIẾU BÀI TẬP 06
# **CSS FRAMEWORKS — Bootstrap 5 / TailwindCSS**

> **Tài liệu tham chiếu:** `tuan_4_css_frameworks/bootstrap/` hoặc `tuan_4_css_frameworks/tailwindcss/`
>
> ⏱️ **Thời gian:** 150 phút | 📊 **Tổng điểm:** 100
>
> ⚠️ **Chọn 1 trong 2 track:** Bootstrap HOẶC TailwindCSS

---

## 🅱️ TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | ??? | ??? | ??? |
| Box layout | ??? | ??? | ??? |

**Câu hỏi thêm:** `col-md-6` nghĩa là gì? Tại sao không cần viết `col-sm-12`?

#### Câu A2 (10đ) — Utilities & Components

1. Giải thích class `d-none d-md-block`. Element này hiển thị khi nào, ẩn khi nào?
2. Liệt kê 5 spacing utilities (margin/padding) và giải thích. VD: `mt-3`, `px-4`, `mb-auto`
3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`?

### PHẦN B — THỰC HÀNH (60 điểm)

#### Bài B1 (30đ) — Landing Page Bootstrap

Tạo file `bootstrap_landing.html` — Landing page E-Commerce dùng **CHỈ** Bootstrap classes.

**KHÔNG VIẾT CSS TÙY CHỈNH** (trừ `<style>` cho ảnh/colors cặ biệt). 100% layout dùng Bootstrap utilities.

**Yêu cầu:**
- [ ] Navbar: `navbar navbar-expand-lg` với logo, menu, search, cart icon
- [ ] Hero section: Carousel (`carousel`) với 3 slides, overlay text
- [ ] Product grid: `row` + `col` — 4 cột desktop, 2 cột tablet, 1 cột mobile
- [ ] Product cards: dùng class `card`, `card-img-top`, `card-body`, `card-title`, `card-text`
- [ ] Badge "Sale" trên card: dùng `badge bg-danger`
- [ ] Modal: Click "Xem nhanh" → mở Bootstrap `modal` hiển thị chi tiết
- [ ] Footer: 4 cột thông tin dùng grid
- [ ] Responsive: Chụp ở 3 breakpoints

#### Bài B2 (30đ) — Dashboard Layout

Tạo `bootstrap_dashboard.html` — Trang admin dashboard:

- [ ] Sidebar cố định bên trái: `position-fixed`, danh sách menu dọc dùng `list-group`
- [ ] Topbar: breadcrumb + user dropdown (`dropdown`)
- [ ] Content area: 
  - Row 1: 4 stat cards (`card` + `bg-primary/success/warning/danger`)
  - Row 2: Table `table table-striped table-hover` với dữ liệu đơn hàng giả
  - Row 3: Form tìm kiếm + filter dùng `input-group`
- [ ] Accordion: FAQ section dùng `accordion`
- [ ] Toast/Alert: Thông báo thành công dùng `alert alert-success`

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tùy biến Bootstrap

1. Bạn muốn đổi màu `$primary` từ xanh mặc định sang `#E63946`. Giải thích quy trình (cần công cụ gì, modify file nào).
2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }` mà nên dùng SASS variables?

#### Câu C2 (10đ) — So sánh

Viết CSS thuần (từ PBT trước) để tạo 1 navbar responsive + 1 product card. So sánh với Bootstrap version:
- Số dòng CSS cần viết
- Thời gian phát triển
- Khả năng tùy biến  
- Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?

---

## 🌊 TRACK B — TAILWINDCSS

### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Utility Classes

Đọc tài liệu TailwindCSS. Giải thích ý nghĩa từng class trong đoạn HTML sau:

```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg 
            hover:shadow-xl transition-shadow duration-300">
    <img class="w-16 h-16 rounded-full object-cover" src="avatar.jpg" alt="User">
    <div class="ml-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-800 truncate">Nguyễn Văn A</h3>
        <p class="text-sm text-gray-500">Frontend Developer</p>
    </div>
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md 
                   hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
        Follow
    </button>
</div>
```

Liệt kê theo format:
```
- flex → display: flex
- items-center → align-items: center
- p-4 → padding: 1rem (16px)
- ...
```

#### Câu A2 (10đ) — Responsive & States

1. Giải thích prefix responsive: `md:`, `lg:`, `xl:`. VD: `md:grid-cols-2 lg:grid-cols-4` nghĩa là gì?
2. Giải thích state modifiers: `hover:`, `focus:`, `active:`, `group-hover:`
3. Viết class Tailwind cho: "Ẩn trên mobile, hiện dạng flex trên tablet trở lên" (tương đương `d-none d-md-flex` của Bootstrap)

### PHẦN B — THỰC HÀNH (60 điểm)

#### Bài B1 (30đ) — Landing Page TailwindCSS

Tạo `tailwind_landing.html` — Landing page dùng **CHỈ** Tailwind utility classes.

Dùng CDN: `<script src="https://cdn.tailwindcss.com"></script>`

**KHÔNG VIẾT CSS riêng.** 100% styling trong HTML class attributes.

**Yêu cầu:**
- [ ] Navbar: `flex justify-between items-center`, responsive menu
- [ ] Hero section: Full-width background, centered text, CTA button
- [ ] Product grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- [ ] Product cards: `rounded-lg shadow-md hover:shadow-xl transition-shadow`
- [ ] Dark mode support: Thêm `dark:` variants cho ít nhất 5 elements
- [ ] Footer: Grid layout với Tailwind
- [ ] Responsive trên 3 breakpoints

#### Bài B2 (30đ) — Component Library

Tạo `tailwind_components.html` — Bộ sưu tập components:

- [ ] **Buttons:** Primary, Secondary, Outline, Disabled, Loading (spinner), Sizes (sm/md/lg)
- [ ] **Cards:** Product card, Profile card, Pricing card
- [ ] **Forms:** Input with label, Select, Textarea, Checkbox group — có focus states
- [ ] **Alerts:** Success, Error, Warning, Info — có close button
- [ ] **Navigation:** Horizontal navbar + Vertical sidebar

Mỗi component phải có hover/focus states.

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tailwind vs CSS thuần

Lấy 1 component bạn đã viết CSS thuần ở PBT trước. So sánh:
- HTML file size (CSS thuần vs Tailwind HTML)
- Maintainability (dễ đọc? dễ sửa?)
- Reusability (dùng lại thế nào? `@apply`?)

#### Câu C2 (10đ) — Performance

1. File HTML dùng Tailwind thường rất dài (nhiều classes). Tại sao Tailwind CSS file cuối cùng lại **NHỎ HƠN** Bootstrap CSS?
2. Giải thích Tailwind PurgeCSS (Tailwind JIT). Nó loại bỏ gì?
3. Khi nào KHÔNG nên dùng TailwindCSS? Cho 2 tình huống cụ thể.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 8-12 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video (chọn 1 theo Track):

#### 🅱️ Track A — Bootstrap: Code-along "Product Card + Modal"

**Trong video, bạn phải:**
1. 🎤 Tạo 1 Bootstrap card từ đầu: `card`, `card-img-top`, `card-body`, `card-title`
2. 🎤 Giải thích mỗi class Bootstrap làm gì (ví dụ: `card-body` thêm padding)
3. 🎤 Thêm badge "Sale": `badge bg-danger position-absolute` — giải thích
4. 🎤 Tạo modal: Khi click "Xem nhanh" → mở modal hiển thị chi tiết sản phẩm
5. 🎤 Giải thích `data-bs-toggle="modal"` và `data-bs-target="#..."` hoạt động ra sao
6. 🎤 Demo responsive: resize browser → show card thay đổi layout

#### 🌊 Track B — TailwindCSS: Code-along "User Card Component"

**Trong video, bạn phải:**
1. 🎤 Tạo user card dùng Tailwind utilities từ đầu
2. 🎤 Giải thích mỗi class: `flex items-center p-4 bg-white shadow-md rounded-lg`
3. 🎤 Thêm hover: `hover:shadow-xl transition-shadow duration-300` — giải thích
4. 🎤 Thêm responsive: `md:flex-row flex-col` — giải thích prefix `md:`
5. 🎤 Thêm dark mode: `dark:bg-gray-800 dark:text-white` — demo toggle
6. 🎤 So sánh: nếu viết CSS thuần cần bao nhiêu dòng? Tailwind giúp gì?

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp + Track đã chọn
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Giải thích mỗi class/utility khi gõ
- [ ] Demo tương tác (modal hoạt động / hover effects)
- [ ] Cuối video: Tổng kết ưu/nhược điểm framework

---

## ✅ CHECKLIST NỘP BÀI

Chọn Track A hoặc B:

**Track A (Bootstrap):**
- [ ] File `answers.md` — Phần A + C
- [ ] File `bootstrap_landing.html` — Bài B1
- [ ] File `bootstrap_dashboard.html` — Bài B2
- [ ] Folder `screenshots/` — responsive ở 3 breakpoints
- [ ] 🎬 **Video OBS** — `videos/PBT06_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **3 commits**

**Track B (TailwindCSS):**
- [ ] File `answers.md` — Phần A + C
- [ ] File `tailwind_landing.html` — Bài B1
- [ ] File `tailwind_components.html` — Bài B2
- [ ] Folder `screenshots/` — responsive ở 3 breakpoints + dark mode
- [ ] 🎬 **Video OBS** — `videos/PBT06_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **3 commits**
