# 🟩 TUẦN 3 - BÀI 16
# **SASS/SCSS — CSS Với Siêu Năng Lực**

---

## 0. 🎬 Opening Hook

*Designer Linh yêu cầu: "Đổi màu chủ đạo từ xanh (#2563eb) sang tím (#7c3aed)."*

*Minh Ctrl+F trong file CSS: 47 kết quả. Thay từng cái một. Bỏ sót 3 chỗ. Trang chỗ xanh chỗ tím.*

*"Giá mà CSS có BIẾN..." Minh ước.*

*"Nó có," anh Hùng nói. "Nhưng không phải CSS — là SCSS. Sass preprocessor. Biến `$primary`, hàm `@mixin`, lồng nhau, file riêng. Đổi 1 biến → 47 chỗ đổi theo. Thêm: logic, loops, functions."*

*"Nhưng browser đọc SCSS được không?"*

*"Không — cần compile thành CSS trước. VS Code làm tự động."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

SCSS không phải "nice to have" — trong thực tế:
- **React/Vue/Angular projects** đều dùng SCSS/SASS mặc định
- **Bootstrap** viết bằng SCSS
- **Hầu hết công ty** yêu cầu kinh nghiệm SCSS trong JD Frontend
- **CSS Variables** tốt cho runtime, nhưng **SCSS variables** tốt cho compile-time → cả hai được dùng cùng nhau

---

## 2. 🌐 Big Picture — SCSS là gì?

```
SCSS = Superset của CSS
(Mọi CSS hợp lệ đều là SCSS hợp lệ)

SCSS (code của bạn)        CSS (browser đọc)
─────────────────────      ─────────────────────
$primary: #7c3aed;         .btn-primary {
                    ──────▶   background: #7c3aed;
.btn-primary {             }
    background: $primary;  .btn-primary:hover {
    &:hover {                 background: #6d28d9;
        background: darken(   }
          $primary, 10%);
    }
}
```

**Compiler:** VS Code extension "Live Sass Compiler" → click Watch Sass → auto compile.

---

## 3. ⚙️ Core Technical Truth

### 1. Variables — "Sửa 1 chỗ, tất cả tự đổi"

```scss
// Khai báo variables
$color-primary:     #7c3aed;
$color-primary-dark: darken($color-primary, 10%);   // SCSS function!
$color-danger:      #dc2626;
$color-success:     #16a34a;
$color-text:        #1e293b;
$color-bg:          #f8fafc;

$font-family-base:  'Inter', sans-serif;
$font-size-base:    16px;
$font-size-sm:      14px;
$font-size-lg:      18px;

$space-1: 4px;
$space-2: 8px;
$space-4: 16px;
$space-6: 24px;

$radius-sm:   6px;
$radius-md:   12px;
$radius-full: 9999px;

$transition-base: 0.3s ease;

// Sử dụng
.btn-primary {
    background: $color-primary;      // 1 chỗ, đổi 1 lần
    color: white;
    border-radius: $radius-sm;
}
.badge { background: $color-danger; }
.alert-success { background: $color-success; }
// Đổi $color-primary → tất cả tự đổi!
```

**SCSS vs CSS Variables — Khi nào dùng cái nào:**

| | SCSS Variable `$var` | CSS Variable `--var` |
|---|---|---|
| Tồn tại | Compile time | Runtime |
| JS đọc/sửa | ❌ | ✅ |
| Dùng trong `@media` | ❌ | ✅ (phần) |
| Dark mode toggle | ❌ | ✅ |
| Design tokens cứng | ✅ | ✅ |
| SCSS functions (`darken`) | ✅ | ❌ |

→ **Best practice**: Dùng cả hai. SCSS variables cho logic compile-time, CSS variables cho runtime theming.

---

### 2. Nesting — CSS theo cấu trúc HTML

```scss
// SCSS — rõ ràng, dễ đọc
.navbar {
    background: #1a202c;
    padding: $space-4;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // & = tham chiếu đến selector cha (.navbar)
    &__logo {
        color: white;
        font-size: $font-size-lg;
        font-weight: 700;
        text-decoration: none;
    }

    &__links {
        display: flex;
        gap: $space-6;
        list-style: none;
    }

    &__item {
        &__link {
            color: rgba(white, 0.8);
            text-decoration: none;
            transition: color $transition-base;

            &:hover {
                color: white;
            }

            &--active {
                color: $color-primary;
                font-weight: 600;
            }
        }
    }
}
```

**Output CSS (được compile từ SCSS trên):**
```css
.navbar { background: #1a202c; padding: 16px; display: flex; ... }
.navbar__logo { color: white; font-size: 18px; font-weight: 700; ... }
.navbar__links { display: flex; gap: 24px; list-style: none; }
.navbar__item__link { color: rgba(255,255,255,0.8); ... }
.navbar__item__link:hover { color: white; }
.navbar__item__link--active { color: #7c3aed; font-weight: 600; }
```

> ⚠️ **Quy tắc: Không lồng quá 3 cấp.** Sâu hơn → selector quá dài, khó debug, khó override.

---

### 3. Mixins — "Hàm CSS tái sử dụng"

```scss
// Định nghĩa mixin
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

// Mixin với parameters (như function có argument)
@mixin button-style($bg, $color: white, $hover-bg: null) {
    background: $bg;
    color: $color;
    padding: $space-3 $space-6;
    border: none;
    border-radius: $radius-sm;
    cursor: pointer;
    font-weight: 600;
    transition: background $transition-base, transform $transition-base;

    &:hover {
        background: if($hover-bg, $hover-bg, darken($bg, 10%));
        transform: translateY(-2px);
    }

    &:active { transform: translateY(0); }
}

// Mixin responsive breakpoint
@mixin respond-to($breakpoint) {
    @if $breakpoint == mobile {
        @media (max-width: 576px) { @content; }
    } @else if $breakpoint == tablet {
        @media (min-width: 768px) { @content; }
    } @else if $breakpoint == desktop {
        @media (min-width: 1024px) { @content; }
    }
}

// Sử dụng
.btn-primary {
    @include button-style($color-primary);
}

.btn-danger {
    @include button-style($color-danger);
}

.modal {
    @include flex-center;
    position: fixed;
    inset: 0;
}

.product-grid {
    display: grid;
    grid-template-columns: 1fr;

    @include respond-to(tablet) {
        grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(desktop) {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

### 4. Partials & Import — "Chia file gọn gàng"

```
styles/
├── base/
│   ├── _variables.scss      ← Biến (dấu _ = partial, không compile riêng)
│   ├── _reset.scss          ← CSS reset
│   └── _typography.scss     ← h1, p, font defaults
│
├── mixins/
│   ├── _flexbox.scss        ← @mixin flex-center, flex-between...
│   ├── _responsive.scss     ← @mixin respond-to(...)
│   └── _buttons.scss        ← @mixin button-style(...)
│
├── components/
│   ├── _navbar.scss
│   ├── _card.scss
│   ├── _button.scss
│   ├── _form.scss
│   └── _modal.scss
│
└── main.scss                ← Import theo đúng thứ tự
```

```scss
// main.scss — Đúng thứ tự quan trọng!
// 1. Variables trước (mixins cần dùng variables)
@use 'base/variables';
@use 'base/reset';
@use 'base/typography';

// 2. Mixins (components cần dùng mixins)
@use 'mixins/flexbox';
@use 'mixins/responsive';
@use 'mixins/buttons';

// 3. Components (dùng variables + mixins)
@use 'components/navbar';
@use 'components/card';
@use 'components/button';
@use 'components/form';
```

---

### 5. Useful SCSS Functions

```scss
// Color functions
$primary: #2563eb;
darken($primary, 10%)     // Tối hơn 10%
lighten($primary, 10%)    // Sáng hơn 10%
transparentize($primary, 0.5)  // 50% transparent = rgba

// Math
$base: 16px;
$heading: $base * 2;      // = 32px

// String
$class: "btn";
.#{$class}-primary { ... }  // → .btn-primary { ... }

// Each (loop)
$colors: (primary: #2563eb, danger: #dc2626, success: #16a34a);

@each $name, $color in $colors {
    .badge--#{$name} {
        background: $color;
    }
}
// Output: .badge--primary, .badge--danger, .badge--success
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`$variable` = design token. `@mixin` = CSS function. `&` = parent selector.**
> **Partial file bắt đầu bằng `_` → không compile thành file riêng, chỉ import vào main.**

---

## 5. 🏭 Real-world Layer

### Cách chạy SCSS trong các môi trường:

```
1. VS Code + Live Sass Compiler extension
   → Click "Watch Sass" ở status bar
   → Tự compile mỗi khi save

2. Vite (React/Vue project):
   npm install -D sass
   → Vite tự detect và compile .scss files

3. Node.js script:
   npm install -D sass
   npx sass styles/main.scss styles/main.css --watch

4. Create React App:
   npm install sass
   → Đổi .css thành .scss → tự compile
```

### Design token flow thực tế (Figma → SCSS → CSS):

```
Designer:    Primary Blue = #2563eb
        ↓
Figma tokens: "color/primary/500": "#2563eb"
        ↓
SCSS:         $color-primary: #2563eb;
        ↓
CSS Output:   .btn-primary { background: #2563eb; }
        ↓
Browser:      Render màu xanh
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Convert CSS → SCSS (30 phút)

**Bước 1:** Cài extension "Live Sass Compiler" trong VS Code

**Bước 2:** Đổi `styles.css` thành `styles.scss`

**Bước 3:** Convert CSS sang SCSS theo từng bước:

```scss
// 1. Khai báo variables từ màu/spacing đang dùng
$color-primary: #2563eb;
$radius-md: 12px;
$transition-base: 0.3s ease;

// 2. Dùng variables thay thế hardcoded values

// 3. Nest .card và .card__* thành 1 block SCSS

// 4. Tạo @mixin flex-center và dùng ở những chỗ cần

// 5. Tạo @mixin respond-to và dùng cho media queries
```

**Bước 4:** Click "Watch Sass" → kiểm tra file `.css` được generate

**Test:** Đổi `$color-primary: #7c3aed;` → save → Toàn site đổi màu tím không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"SCSS là ngôn ngữ khác, phải học lại từ đầu"** | SCSS = CSS + tính năng thêm. Mọi CSS hợp lệ đều là SCSS hợp lệ. Học thêm, không học lại |
| **"Lồng sâu (deep nesting) = tốt vì rõ ràng"** | Không — lồng quá 3 cấp tạo selector quá dài, khó override, performance giảm |
| **"SCSS chậm hơn CSS vì cần compile"** | Compile xảy ra lúc **build time** (không phải lúc user load trang). Browser nhận CSS compiled → không chậm hơn |
| **"`@import` và `@use` như nhau"** | `@import` deprecated (sẽ bị xóa). Dùng `@use` — có namespace, tránh conflict giữa files |
| **"SCSS không cần nếu dùng CSS Variables"** | CSS Variables runtime. SCSS variables compile-time + thêm functions (darken, lighten), loops, conditionals — bổ sung cho nhau |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. SCSS compile thành gì? Ai thực hiện compile? Browser có đọc SCSS trực tiếp không?
2. Tại sao partial file bắt đầu bằng dấu gạch dưới `_` (ví dụ `_variables.scss`)?
3. `@mixin` và `@include` — cái nào định nghĩa, cái nào sử dụng?

### Câu hỏi áp dụng:

4. Bạn cần viết mixin để truncate text dài thành 1 dòng (với dấu `...`). Định nghĩa mixin và sử dụng nó.
5. SCSS variable `$color-primary: #2563eb` và CSS Variable `--color-primary: #2563eb` — nếu designer muốn toggle dark mode khi user click nút trên trang, bạn cần dùng loại nào? Tại sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. SCSS compile thành **CSS**. Thực hiện bởi: VS Code extension / Webpack / Vite / node-sass. **Browser không đọc SCSS trực tiếp** — browser chỉ đọc CSS.
2. File bắt đầu bằng `_` là **partial** — SCSS compiler sẽ không compile nó thành file CSS riêng biệt. Nó chỉ được dùng khi `@import` hoặc `@use` từ file khác. Ngăn việc tạo ra hàng chục file `.css` nhỏ không cần thiết.
3. **`@mixin`** = định nghĩa (như khai báo function). **`@include`** = sử dụng mixin (như gọi function).
4. ```scss
   @mixin text-truncate {
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
   }
   .card__title { @include text-truncate; max-width: 200px; }
   ```
5. **CSS Variable** (`--color-primary`). Lý do: JavaScript có thể thay đổi CSS Variables realtime: `document.documentElement.style.setProperty('--color-primary', '#new-color')`. SCSS variables biến mất sau compile — JavaScript không thể truy cập hoặc thay đổi chúng.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **SCSS = CSS + Variables + Nesting + Mixins + Functions** — không phải ngôn ngữ mới, là CSS nâng cao
2. **`$variable`** = compile-time, SCSS functions (darken/lighten). **`--variable`** = runtime, JS-accessible
3. **Nesting tối đa 3 cấp** — sâu hơn gây selector cồng kềnh
4. **`@mixin`** = tái sử dụng code CSS — đặc biệt hữu ích cho button styles và media queries
5. **Partial files (`_name.scss`)** + **`@use`** = module system tổ chức SCSS rõ ràng

---

## 10. ➡️ Next Lesson Bridge — Hoàn thành Tuần 3! 🎉

*Minh giờ có trong tay:*
- ✅ Tuần 2: CSS cơ bản, Selectors, Cascade, Box Model, Positioning
- ✅ Tuần 3: Responsive Design, Animations, BEM, CSS Variables, SCSS

*"Mình có thể viết CSS từ đầu cho mọi design," Minh nhận xét. "Nhưng mỗi dự án đều phải xây từ đầu. Có cách nào dùng lại components sẵn có không?"*

*"CSS Frameworks," anh Hùng trả lời. "Bootstrap 5 hoặc TailwindCSS. Bootstrap = components sẵn, lắp ghép nhanh. Tailwind = utility classes, tùy chỉnh cao."*

**→ [Tuần 4: CSS Frameworks](../tuan_4_css_frameworks/) — Bootstrap 5 hoặc TailwindCSS: Build faster, build consistent.**

> [!TIP]
> Chỉ cần học **1 trong 2** framework. Bootstrap phù hợp nếu muốn tốc độ prototype. TailwindCSS phù hợp nếu muốn kiểm soát design hoàn toàn và làm quen với utility-first CSS.