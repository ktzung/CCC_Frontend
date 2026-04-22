# 🟦 TUẦN 4B - BÀI 05 (CSS FRAMEWORKS)
# **BOOTSTRAP 5 — CUSTOMIZATION**

---

## 0. 🎬 Opening Hook

*Khách hàng nhìn vào trang web mà Minh mất 3 tuần xây: "Sao trông giống y chang Shopee và 500 trang khác vậy?"*

*Đó là lời nguyền Bootstrap mặc định: tất cả website dùng cùng màu xanh `#0d6efd`, cùng border-radius, cùng typography.*

*"1 dòng SASS," anh Hùng nói:*
```scss
$primary: #e63946;  // Màu đỏ brand
```

*Build lại → toàn bộ website: buttons, badges, links, forms — tất cả chuyển sang đỏ brand. Không cần sửa 1 dòng HTML.*

*"Đây mới là Bootstrap production-grade."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Bootstrap mặc định → mọi website trông giống nhau. Customization → website có brand riêng.

Trong môi trường công ty:
- **Mọi project đều có Design System riêng** — màu sắc, font, spacing theo brand guidelines
- Bootstrap CDN không cho phép customize
- **Production Bootstrap = SASS customization + npm build**

Bài này là cầu nối giữa "sinh viên dùng CDN" và "developer production-grade".

---

## 2. 🌐 Big Picture — Bootstrap được xây từ SASS

```
BOOTSTRAP SOURCE (SASS)
│
├── _variables.scss    ← Tất cả variables: màu, font, spacing...
│                         $primary: #0d6efd;
│                         $font-size-base: 1rem;
│
├── _components.scss   ← Build từ variables
│                         .btn-primary { background: $primary; }
│
└── bootstrap.scss     ← Import tất cả

CUSTOMIZATION WORKFLOW:

your-custom.scss
├── Override $primary: #e63946;  ← TRƯỚC khi import Bootstrap
├── Override $font-family: '...'; ← TRƯỚC khi import Bootstrap
└── @import "bootstrap/scss/bootstrap";  ← Bootstrap dùng values của bạn

npx sass custom.scss output.css  → Build thành CSS file
                                   (không dùng CDN nữa)
```

**Nguyên tắc quan trọng:** Override variables **TRƯỚC** `@import`. Override SAU = không có tác dụng (Bootstrap đã compile xong).

---

## 3. ⚙️ Core Technical Truth

### Setup SASS Customization

```bash
# Bước 1: Tạo project với npm
npm init -y
npm install bootstrap@5.3.0 sass
```

```
project/
├── src/
│   └── custom.scss    ← File SASS của bạn
├── dist/
│   └── style.css      ← Output (tự động build)
└── package.json
```

```json
// package.json — scripts để build SASS
{
    "scripts": {
        "sass:build": "sass src/custom.scss dist/style.css",
        "sass:watch": "sass --watch src/custom.scss dist/style.css"
    }
}
```

```bash
npm run sass:build   # Build 1 lần
npm run sass:watch   # Auto rebuild khi save file
```

---

### Override Variables — Pattern chuẩn

```scss
// src/custom.scss

// ===== STEP 1: Required imports (bắt buộc) =====
@import "bootstrap/scss/functions";

// ===== STEP 2: Override variables TRƯỚC bootstrap =====

// --- Colors ---
$primary:   #e63946;  // Đỏ brand thay vì xanh mặc định
$secondary: #457b9d;  // Xanh dương nhẹ
$success:   #2a9d8f;  // Xanh ngọc
$danger:    #e76f51;  // Cam đỏ
$warning:   #f4a261;  // Cam vàng
$info:      #264653;  // Xanh đậm

$light:     #f8f9fa;
$dark:      #212529;

// --- Typography ---
$font-family-base: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
$font-size-base:   1rem;          // 16px
$line-height-base: 1.6;           // Thoải mái hơn mặc định 1.5
$headings-font-weight: 700;

// --- Spacing ---
$spacer: 1rem;   // Giữ nguyên — nhân với spacer
// Thêm spacing lớn hơn
$spacers: (
    0: 0,
    1: $spacer * 0.25,
    2: $spacer * 0.5,
    3: $spacer,
    4: $spacer * 1.5,
    5: $spacer * 3,
    6: $spacer * 4,   // Thêm mới: 64px
    7: $spacer * 5,   // Thêm mới: 80px
);

// --- Border radius ---
$border-radius:    0.5rem;   // Tăng từ 0.375rem
$border-radius-sm: 0.25rem;
$border-radius-lg: 0.75rem;
$border-radius-xl: 1rem;     // Thêm mới

// --- Buttons ---
$btn-padding-y:    0.5rem;
$btn-padding-x:    1.25rem;
$btn-font-weight:  600;
$btn-border-radius: $border-radius;

// --- Cards ---
$card-border-width:  0;              // Bỏ viền card
$card-border-radius: $border-radius;
$card-box-shadow:    0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

// --- Shadows ---
$box-shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
$box-shadow:    0 4px 6px rgba(0,0,0,0.1);
$box-shadow-lg: 0 10px 25px rgba(0,0,0,0.15);

// ===== STEP 3: Required Bootstrap imports =====
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";

// ===== STEP 4: Import Bootstrap components =====
@import "bootstrap/scss/bootstrap";

// ===== STEP 5: Your custom CSS sau Bootstrap =====
// (Thêm styles riêng ở đây)
```

---

### Thêm màu brand mới vào Theme Colors

```scss
// Thêm màu mới vào $theme-colors map
$theme-colors: (
    "primary":    $primary,
    "secondary":  $secondary,
    "success":    $success,
    "info":       $info,
    "warning":    $warning,
    "danger":     $danger,
    "light":      $light,
    "dark":       $dark,
    // --- Màu brand tùy chỉnh ---
    "brand":      #e63946,   // Màu đỏ brand
    "accent":     #a8dadc,   // Màu accent xanh nhạt
    "neutral":    #6c757d,   // Trung tính
);

@import "bootstrap/scss/bootstrap";
```

**Kết quả — Bootstrap tự tạo tất cả classes liên quan:**
```html
<!-- Tất cả classes này được tạo tự động từ theme-colors -->
<button class="btn btn-brand">Brand Button</button>
<div class="bg-brand">Brand Background</div>
<p class="text-brand">Brand Text</p>
<div class="alert alert-brand">Brand Alert</div>
<span class="badge bg-brand">Brand Badge</span>
```

---

### Selective Import — Chỉ import cần thiết

```scss
// Giảm bundle size bằng cách chỉ import components dùng

// Required (bắt buộc luôn có)
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/root";
@import "bootstrap/scss/reboot";

// Grid & Layout
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";

// Components (chỉ import những gì dùng)
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/card";
@import "bootstrap/scss/navbar";
@import "bootstrap/scss/forms";
@import "bootstrap/scss/modal";
@import "bootstrap/scss/alert";
@import "bootstrap/scss/badge";
// KHÔNG import: carousel, offcanvas, spinners, ...

// Utilities (thường muốn giữ lại)
@import "bootstrap/scss/utilities/api";
```

**Bundle size comparison:**
| Approach | CSS Size (gzip) |
|---|---|
| Bootstrap CDN full | ~30KB |
| npm chỉ import Grid + Buttons + Card + Navbar | ~12KB |
| npm với tree-shaking selective | ~8-15KB |

---

### Custom CSS sau Bootstrap

```scss
// Thêm CSS riêng SAU khi import Bootstrap
@import "bootstrap/scss/bootstrap";

// Typography enhancement
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
    font-family: 'Inter', system-ui, sans-serif;
}

// Custom components không có trong Bootstrap
.hero-section {
    background: linear-gradient(135deg, $primary 0%, darken($primary, 20%) 100%);
    min-height: 80vh;
    display: flex;
    align-items: center;
}

// Enhance existing Bootstrap components
.card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: $box-shadow-lg;
    }
}

.btn {
    transition: all 0.15s ease;

    &:hover {
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
}

// Use Bootstrap SASS functions
.badge-custom {
    background-color: lighten($primary, 40%);
    color: darken($primary, 20%);
    padding: 0.4em 0.8em;
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Override variables TRƯỚC `@import "bootstrap/scss/bootstrap"`. Override SAU = không có tác dụng vì Bootstrap đã compile xong.**
> **Thêm màu vào `$theme-colors` → Bootstrap tự tạo TẤT CẢ classes: btn-*, bg-*, text-*, alert-*, badge bg-*.**

---

## 5. 🏭 Real-world Layer

### Complete Custom Theme — File sẵn sàng production

```scss
// src/custom.scss — Production-ready Bootstrap theme

// --- Google Fonts ---
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

// --- Required Bootstrap functions ---
@import "bootstrap/scss/functions";

// ════════════════════════════════════════
// BRAND TOKENS — Đổi ở đây để thay đổi toàn bộ
// ════════════════════════════════════════
$brand-primary:   #2563eb;   // Xanh dương brand
$brand-secondary: #7c3aed;   // Tím accent
$brand-success:   #059669;
$brand-danger:    #dc2626;
$brand-warning:   #d97706;

// --- Map to Bootstrap variables ---
$primary:   $brand-primary;
$secondary: $brand-secondary;
$success:   $brand-success;
$danger:    $brand-danger;
$warning:   $brand-warning;

// --- Typography ---
$font-family-base:    'Inter', system-ui, sans-serif;
$font-weight-normal:  400;
$font-weight-medium:  500;
$font-weight-bold:    700;
$headings-font-weight: 700;

// --- Border radius: modern rounded ---
$border-radius:    0.5rem;
$border-radius-lg: 0.75rem;
$border-radius-xl: 1rem;

// --- Shadows: elevated cards ---
$box-shadow:    0 4px 6px -1px rgba(0,0,0,0.1);
$box-shadow-lg: 0 20px 25px -5px rgba(0,0,0,0.1);

$card-border-width:  0;
$card-box-shadow:    $box-shadow;

// ════════════════════════════════════════
// IMPORT BOOTSTRAP
// ════════════════════════════════════════
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/bootstrap";

// ════════════════════════════════════════
// CUSTOM STYLES
// ════════════════════════════════════════
.card {
    transition: transform 0.2s, box-shadow 0.2s;
    &:hover { transform: translateY(-4px); box-shadow: $box-shadow-lg; }
}

.btn { font-weight: $font-weight-medium; }
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Build Custom Brand Theme (30 phút)

```bash
# Setup
mkdir my-brand-bs
cd my-brand-bs
npm init -y
npm install bootstrap@5.3.0 sass
mkdir src dist
```

**Tạo `src/custom.scss`:**
```scss
@import "bootstrap/scss/functions";

// Chọn màu brand của bạn
$primary: ???;     // Màu chính brand của bạn
$secondary: ???;   // Màu phụ
$font-family-base: 'Inter', system-ui, sans-serif;
$border-radius: 0.5rem;
$card-border-width: 0;

@import "bootstrap/scss/bootstrap";

// Thêm Google Font
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
```

**Tạo `src/index.html`:**
- Navbar với màu brand
- Hero section
- 4 product cards
- Footer

```bash
npm run sass:watch  # Build tự động
```

**Kiểm tra:** Mở `index.html` trong browser — màu có đúng brand không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Override variable sau @import vẫn hoạt động"** | Không — SASS compile từ trên xuống dưới. Bootstrap đã dùng giá trị cũ khi compile. Override phải **trước** `@import` |
| **"Chỉ cần override `$primary` để đổi tất cả màu"** | Chỉ đổi màu primary (buttons, links, badges primary). Các màu khác (success, danger, warning) có variable riêng |
| **"Selective import giảm bundle size rất nhiều"** | Thực tế Bootstrap core (reboot, variables, utilities) đã chiếm phần lớn. Selective import giảm nhưng không nhiều như kỳ vọng (~30-40%). Tailwind CSS mới là champion tree-shaking |
| **"SASS customization chỉ cho project lớn"** | Nên dùng ngay từ project nhỏ — setup chỉ mất 5 phút, tránh override CSS phức tạp sau này |
| **"`!default` trong Bootstrap variables nghĩa là gì?"** | Bootstrap viết `$primary: #0d6efd !default` — `!default` có nghĩa: "Dùng giá trị này NẾU variable chưa được khai báo". Đây là cơ chế cho phép override hoạt động |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao phải override `$primary` TRƯỚC `@import "bootstrap/scss/bootstrap"`?
2. `$primary: #e63946 !default` trong Bootstrap source có nghĩa là gì? Tại sao Bootstrap dùng `!default`?
3. Sau khi thêm màu `"brand": #e63946` vào `$theme-colors`, Bootstrap tự tạo những classes nào?

### Câu hỏi áp dụng:

4. Bạn muốn tất cả buttons có font-weight bold và border-radius lớn hơn. Cần override variables nào?
5. Dự án cần file CSS cuối cùng nhỏ nhất có thể, chỉ dùng: Grid, Buttons, Cards, Alerts. Viết `@import` statements cần thiết (không import toàn bộ `bootstrap`).

<details>
<summary>👁️ Xem đáp án</summary>

1. SASS compile từ trên xuống. Khi đến `@import "bootstrap/scss/bootstrap"`, Bootstrap đọc `$primary`. Nếu bạn đã khai báo `$primary: #e63946` trước đó → Bootstrap dùng giá trị đó. Nếu khai báo sau `@import` → Bootstrap đã compile với giá trị mặc định, override không có tác dụng.
2. `!default` = "Gán giá trị này CHỈ KHI variable chưa được khai báo". Bootstrap dùng `!default` để cho phép người dùng override: nếu bạn khai báo `$primary: red` trước → Bootstrap thấy `$primary` đã có rồi → bỏ qua `!default` → giữ `red`.
3. Bootstrap tạo tự động: `.btn-brand`, `.btn-outline-brand`, `.bg-brand`, `.text-brand`, `.border-brand`, `.alert-brand`, `.badge` với `bg-brand`, `.list-group-item-brand`, và các responsive utilities liên quan.
4. ```scss
   $btn-font-weight: 700;          // Bold buttons
   $btn-border-radius: 0.75rem;    // Lớn hơn mặc định 0.375rem
   $btn-border-radius-sm: 0.5rem;  // Small buttons
   $btn-border-radius-lg: 1rem;    // Large buttons
   ```
5. ```scss
   @import "bootstrap/scss/functions";
   @import "bootstrap/scss/variables";
   @import "bootstrap/scss/variables-dark";
   @import "bootstrap/scss/maps";
   @import "bootstrap/scss/mixins";
   @import "bootstrap/scss/utilities";
   @import "bootstrap/scss/root";
   @import "bootstrap/scss/reboot";
   @import "bootstrap/scss/containers";
   @import "bootstrap/scss/grid";
   @import "bootstrap/scss/buttons";
   @import "bootstrap/scss/card";
   @import "bootstrap/scss/alert";
   @import "bootstrap/scss/utilities/api";
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Override TRƯỚC `@import`** — đây là quy tắc bất biến của Bootstrap SASS customization
2. **`!default`** = "dùng nếu chưa có" — cơ chế cho phép override hoạt động
3. **`$theme-colors` map** → thêm màu mới → Bootstrap tự tạo TẤT CẢ utility/component classes
4. **Selective import** → bundle nhỏ hơn, nhưng phải import Required imports trước
5. **Custom CSS sau `@import`** → dùng được tất cả SASS variables và mixins của Bootstrap

---

## 10. ➡️ Tổng kết Bootstrap Module 🎓

*Minh nhìn lại hành trình:*

| Bài | Nội dung | Đã master |
|---|---|---|
| **01** | Getting Started | CDN vs npm, viewport tag, Bootstrap JS |
| **02** | Grid System | Container→Row→Col, breakpoints, responsive |
| **03** | Components | Buttons, Cards, Navbar, Forms, Modal, Toast |
| **04** | Utilities | Spacing, Colors, Display, Flexbox |
| **05** | Customization | SASS variables, theme-colors, selective import |

**Bước tiếp theo — TailwindCSS:**
```
Bootstrap                    TailwindCSS
─────────────────────────   ─────────────────────────
Component-based              Utility-first
Opinionated design           Zero-opinion (pure utility)
20+ components sẵn           Không có component
Easy start                   More setup needed
Override phức tạp            Complete control
jQuery-free (v5)             JS-free

→ Biết cả hai = Developer toàn diện hơn
```

**→ [Xem thêm: TailwindCSS](../../tailwind/) — Framework Utility-first đang bùng nổ trong 2024–2025, được dùng rộng rãi trong React/Vue ecosystem.**
