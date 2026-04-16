# 🟦 BÀI 04: BOOTSTRAP 5 - UTILITIES

## 🎬 "mt-3 Thay margin-top: 1rem" — Viết CSS Bằng Class Names

*Minh viết CSS: `margin-top: 1rem; padding: 0.5rem; text-align: center; display: flex; justify-content: center;` — 5 dòng CSS.*

*Linh viết Bootstrap: `class="mt-3 p-2 text-center d-flex justify-content-center"` — 1 dòng HTML. Không cần file CSS riêng.*

> **Anh Hùng:** *"Utilities = 'viết CSS trong HTML'. Nhanh, nhưng cẩn thận HTML sẽ dài. Đây là triết lý giống TailwindCSS — và cũng là nhược điểm lớn nhất."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng Spacing utilities (margin, padding) thành thạo
- Sử dụng Color utilities (text, background)
- Sử dụng Typography utilities (text alignment, font weight)
- Sử dụng Display utilities (d-none, d-block, d-flex)
- Sử dụng Flexbox utilities
- Kết hợp nhiều utilities với nhau

---

# 1. **SPACING - KHOẢNG CÁCH**

Spacing utilities dùng để tạo margin và padding. Đây là utilities được dùng nhiều nhất!

## 1.1. Cú pháp

```
{margin/padding}{direction}-{size}
```

**Giải thích:**
- `m` = margin, `p` = padding
- Direction: `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (left + right), `y` (top + bottom), hoặc không có (all sides)
- Size: `0`, `1`, `2`, `3`, `4`, `5`, `auto`

## 1.2. Margin Examples

```html
<!-- Margin all sides -->
<div class="m-0">No margin</div>
<div class="m-1">Small margin (0.25rem)</div>
<div class="m-2">Margin (0.5rem)</div>
<div class="m-3">Margin (1rem)</div>
<div class="m-4">Large margin (1.5rem)</div>
<div class="m-5">Extra large margin (3rem)</div>

<!-- Margin specific sides -->
<div class="mt-3">Margin top</div>
<div class="mb-4">Margin bottom</div>
<div class="ms-3">Margin start (left)</div>
<div class="me-3">Margin end (right)</div>
<div class="mx-auto">Margin x auto (căn giữa ngang)</div>
<div class="my-3">Margin y (top + bottom)</div>
```

**Giá trị cụ thể:**
- `0` = 0
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `3` = 1rem (16px)
- `4` = 1.5rem (24px)
- `5` = 3rem (48px)
- `auto` = auto (chỉ dùng với margin)

## 1.3. Padding Examples

```html
<!-- Padding all sides -->
<div class="p-0">No padding</div>
<div class="p-1">Small padding</div>
<div class="p-2">Padding</div>
<div class="p-3">Padding (1rem)</div>
<div class="p-4">Large padding</div>
<div class="p-5">Extra large padding</div>

<!-- Padding specific sides -->
<div class="pt-3">Padding top</div>
<div class="pb-4">Padding bottom</div>
<div class="ps-3">Padding start (left)</div>
<div class="pe-3">Padding end (right)</div>
<div class="px-4">Padding x (left + right)</div>
<div class="py-3">Padding y (top + bottom)</div>
```

## 1.4. Responsive Spacing

Bạn có thể thêm breakpoint vào spacing:

```html
<div class="m-3 m-md-5">Margin 3 trên mobile, 5 trên tablet+</div>
<div class="p-2 p-lg-4">Padding 2 trên mobile, 4 trên desktop+</div>
```

## 1.5. Ví dụ thực tế

```html
<!-- Card với spacing -->
<div class="card m-3">
  <div class="card-body p-4">
    <h5 class="card-title mb-3">Card Title</h5>
    <p class="card-text mb-4">Card description.</p>
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<!-- Căn giữa element -->
<div class="mx-auto" style="width: 200px;">
  Centered element
</div>
```

---

# 2. **COLORS - MÀU SẮC**

Bootstrap cung cấp utilities để đổi màu text và background.

## 2.1. Text Colors

```html
<p class="text-primary">Primary text (blue)</p>
<p class="text-secondary">Secondary text (gray)</p>
<p class="text-success">Success text (green)</p>
<p class="text-danger">Danger text (red)</p>
<p class="text-warning">Warning text (yellow)</p>
<p class="text-info">Info text (cyan)</p>
<p class="text-light bg-dark">Light text (white)</p>
<p class="text-dark">Dark text (black)</p>
<p class="text-muted">Muted text (gray)</p>
<p class="text-white bg-primary">White text</p>
```

## 2.2. Background Colors

```html
<div class="bg-primary text-white">Primary background</div>
<div class="bg-secondary text-white">Secondary background</div>
<div class="bg-success text-white">Success background</div>
<div class="bg-danger text-white">Danger background</div>
<div class="bg-warning text-dark">Warning background</div>
<div class="bg-info text-white">Info background</div>
<div class="bg-light text-dark">Light background</div>
<div class="bg-dark text-white">Dark background</div>
```

**Lưu ý:** Khi dùng background tối, nhớ đổi text sang màu sáng (`text-white`).

## 2.3. Background với Opacity

```html
<div class="bg-primary bg-opacity-75">75% opacity</div>
<div class="bg-primary bg-opacity-50">50% opacity</div>
<div class="bg-primary bg-opacity-25">25% opacity</div>
```

---

# 3. **TYPography - ĐỊNH DẠNG CHỮ**

## 3.1. Text Alignment (Căn chỉnh)

```html
<p class="text-start">Left aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-end">Right aligned text</p>
```

**Responsive:**
```html
<p class="text-start text-md-center text-lg-end">
  Left on mobile, center on tablet, right on desktop
</p>
```

## 3.2. Font Weight (Độ đậm)

```html
<p class="fw-bold">Bold text</p>
<p class="fw-bolder">Bolder text</p>
<p class="fw-normal">Normal text</p>
<p class="fw-light">Light text</p>
<p class="fw-lighter">Lighter text</p>
```

## 3.3. Font Style

```html
<p class="fst-italic">Italic text</p>
<p class="fst-normal">Normal text</p>
```

## 3.4. Text Transform

```html
<p class="text-lowercase">LOWERCASE TEXT</p>
<p class="text-uppercase">uppercase text</p>
<p class="text-capitalize">capitalize text</p>
```

## 3.5. Text Decoration

```html
<p class="text-decoration-underline">Underlined text</p>
<p class="text-decoration-line-through">Line through text</p>
<p class="text-decoration-none">No decoration (dùng cho links)</p>
```

## 3.6. Text Wrapping

```html
<div class="text-nowrap">This text will not wrap</div>
<div class="text-break">Verylongwordthatwillbreak</div>
```

---

# 4. **DISPLAY - HIỂN THỊ**

Display utilities điều khiển cách phần tử hiển thị.

## 4.1. Display Values

```html
<div class="d-none">Hidden (display: none)</div>
<div class="d-block">Block</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline block</div>
<div class="d-flex">Flexbox</div>
<div class="d-grid">Grid</div>
<div class="d-table">Table</div>
```

## 4.2. Responsive Display

```html
<!-- Hidden on mobile, visible on tablet+ -->
<div class="d-none d-md-block">Visible on tablet+</div>

<!-- Visible on mobile, hidden on tablet+ -->
<div class="d-block d-md-none">Visible only on mobile</div>
```

## 4.3. Ví dụ thực tế: Responsive Menu

```html
<!-- Desktop menu -->
<nav class="d-none d-md-block">
  <ul class="nav">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>

<!-- Mobile menu button -->
<button class="d-md-none">Menu</button>
```

---

# 5. **FLEXBOX UTILITIES**

Bootstrap cung cấp nhiều Flexbox utilities.

## 5.1. Flex Direction

```html
<div class="d-flex flex-row">Row (default)</div>
<div class="d-flex flex-row-reverse">Row reverse</div>
<div class="d-flex flex-column">Column</div>
<div class="d-flex flex-column-reverse">Column reverse</div>
```

## 5.2. Justify Content (Căn ngang)

```html
<div class="d-flex justify-content-start">Start</div>
<div class="d-flex justify-content-center">Center</div>
<div class="d-flex justify-content-end">End</div>
<div class="d-flex justify-content-between">Space between</div>
<div class="d-flex justify-content-around">Space around</div>
<div class="d-flex justify-content-evenly">Space evenly</div>
```

## 5.3. Align Items (Căn dọc)

```html
<div class="d-flex align-items-start">Start</div>
<div class="d-flex align-items-center">Center</div>
<div class="d-flex align-items-end">End</div>
<div class="d-flex align-items-stretch">Stretch</div>
```

## 5.4. Flex Wrap

```html
<div class="d-flex flex-nowrap">No wrap</div>
<div class="d-flex flex-wrap">Wrap</div>
<div class="d-flex flex-wrap-reverse">Wrap reverse</div>
```

## 5.5. Gap (Khoảng cách giữa items)

```html
<div class="d-flex gap-1">Gap 1</div>
<div class="d-flex gap-2">Gap 2</div>
<div class="d-flex gap-3">Gap 3</div>
<div class="d-flex gap-4">Gap 4</div>
<div class="d-flex gap-5">Gap 5</div>
```

## 5.6. Ví dụ thực tế: Navbar với Flexbox

```html
<nav class="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
  <div class="logo">My Website</div>
  <div class="d-flex gap-3">
    <a href="#" class="text-white text-decoration-none">Home</a>
    <a href="#" class="text-white text-decoration-none">About</a>
    <a href="#" class="text-white text-decoration-none">Contact</a>
  </div>
</nav>
```

---

# 6. **BORDERS - VIỀN**

```html
<!-- Border all sides -->
<div class="border">Border</div>
<div class="border-top">Border top</div>
<div class="border-end">Border end</div>
<div class="border-bottom">Border bottom</div>
<div class="border-start">Border start</div>

<!-- Border colors -->
<div class="border border-primary">Primary border</div>
<div class="border border-success">Success border</div>
<div class="border border-danger">Danger border</div>

<!-- Border width -->
<div class="border border-1">Thin border</div>
<div class="border border-2">Medium border</div>
<div class="border border-3">Thick border</div>
<div class="border border-4">Extra thick border</div>
<div class="border border-5">Maximum border</div>

<!-- Rounded corners -->
<div class="rounded">Rounded</div>
<div class="rounded-top">Rounded top</div>
<div class="rounded-circle">Circle</div>
<div class="rounded-pill">Pill shape</div>
```

---

# 7. **SIZING - KÍCH THƯỚC**

```html
<!-- Width -->
<div class="w-25">Width 25%</div>
<div class="w-50">Width 50%</div>
<div class="w-75">Width 75%</div>
<div class="w-100">Width 100%</div>
<div class="w-auto">Width auto</div>

<!-- Height -->
<div class="h-25">Height 25%</div>
<div class="h-50">Height 50%</div>
<div class="h-75">Height 75%</div>
<div class="h-100">Height 100%</div>
<div class="h-auto">Height auto</div>

<!-- Max width/height -->
<div class="mw-100">Max width 100%</div>
<div class="mh-100">Max height 100%</div>
```

---

# 8. **POSITION - VỊ TRÍ**

```html
<div class="position-static">Static</div>
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>
<div class="position-fixed">Fixed</div>
<div class="position-sticky">Sticky</div>

<!-- Positioning -->
<div class="position-absolute top-0 start-0">Top left</div>
<div class="position-absolute top-0 end-0">Top right</div>
<div class="position-absolute bottom-0 start-0">Bottom left</div>
<div class="position-absolute bottom-0 end-0">Bottom right</div>
```

---

# 9. **SHADOWS - ĐỔ BÓNG**

```html
<div class="shadow-none">No shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
```

---

# 10. **VISIBILITY - HIỂN THỊ/ẨN**

```html
<div class="visible">Visible</div>
<div class="invisible">Invisible (vẫn chiếm chỗ)</div>
```

**Khác biệt:**
- `d-none`: `display: none` - Không chiếm chỗ
- `invisible`: `visibility: hidden` - Vẫn chiếm chỗ nhưng không nhìn thấy

---

# 11. **KẾT HỢP NHIỀU UTILITIES**

Bạn có thể kết hợp nhiều utilities với nhau:

```html
<!-- Card với nhiều utilities -->
<div class="card shadow-lg m-4 p-3 border border-primary rounded">
  <h5 class="text-center text-primary fw-bold mb-3">Card Title</h5>
  <p class="text-muted text-justify">Card content with multiple utilities.</p>
  <div class="d-flex justify-content-between align-items-center mt-3">
    <span class="badge bg-success">Active</span>
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>
```

---

# 12. **BÀI TẬP THỰC HÀNH**

## Bài tập 1: Tạo Card với Utilities

Tạo card với:
- Shadow lớn
- Border primary
- Padding 4
- Margin 3
- Text center
- Rounded corners

## Bài tập 2: Tạo Flexbox Layout

Tạo layout với:
- Flexbox container
- Justify content: space-between
- Align items: center
- Gap 3
- Responsive: column trên mobile, row trên desktop

## Bài tập 3: Tạo Responsive Text

Tạo text với:
- Left align trên mobile
- Center align trên tablet
- Right align trên desktop
- Bold font weight
- Primary color

---

# 13. **TỔNG KẾT**

**Các utilities đã học:**
1. ✅ Spacing (m, p, mt, mb, mx, my, px, py...)
2. ✅ Colors (text-*, bg-*)
3. ✅ Typography (text-center, fw-bold, text-uppercase...)
4. ✅ Display (d-none, d-block, d-flex...)
5. ✅ Flexbox (justify-content, align-items, gap...)
6. ✅ Borders (border, rounded...)
7. ✅ Sizing (w-*, h-*)
8. ✅ Position (position-*, top-*, start-*...)
9. ✅ Shadows (shadow, shadow-lg...)
10. ✅ Visibility (visible, invisible)

**Lưu ý:**
- Utilities có thể kết hợp với nhau
- Có thể thêm breakpoint: `m-3 m-md-5`
- Utilities giúp giảm CSS custom, code gọn hơn

---

**Bài tiếp theo:** [05. Customization](../05_customization/05_customization.md) - Customize Bootstrap với SASS

> [!TIP]
> **Lời khuyên:** Hãy thử nghiệm kết hợp nhiều utilities với nhau. Đây là cách nhanh nhất để style mà không cần viết CSS custom!
