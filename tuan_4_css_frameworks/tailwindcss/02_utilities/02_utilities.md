# 🟩 BÀI 02: TAILWINDCSS - UTILITIES

## 🎬 "Học 50 Từ Vựng, Viết Mọi Câu" — Tailwind Giống Học Ngoại Ngữ

*Minh: "Nhớ hết mấy ngàn class của Tailwind sao?"*

*Anh Hùng: "Không cần. Nhớ 50 'từ vựng': m/p (margin/padding), bg (background), text (color/size), flex, grid, rounded, shadow. Phần còn lại = ghép từ. m-4 = margin 16px. bg-blue-500 = blue shade 500. Nắm quy tắc = viết mọi thứ."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Sử dụng Spacing utilities (margin, padding) thành thạo
- Sử dụng Color utilities (text, background, border)
- Sử dụng Typography utilities (font size, weight, style)
- Sử dụng Flexbox và Grid utilities
- Hiểu Responsive prefixes (sm:, md:, lg:)
- Kết hợp nhiều utilities với nhau

---

# 1. **SPACING - KHOẢNG CÁCH**

Spacing là utilities được dùng nhiều nhất trong TailwindCSS.

## 1.1. Cú pháp

```
{margin/padding}{direction}-{size}
```

**Giải thích:**
- `m` = margin, `p` = padding
- Direction: `t` (top), `r` (right), `b` (bottom), `l` (left), `x` (left + right), `y` (top + bottom), hoặc không có (all sides)
- Size: `0`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `44`, `48`, `52`, `56`, `60`, `64`, `72`, `80`, `96`

**Giá trị cụ thể:**
- `0` = 0px
- `0.5` = 0.125rem (2px)
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `3` = 0.75rem (12px)
- `4` = 1rem (16px)
- `5` = 1.25rem (20px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `10` = 2.5rem (40px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)
- `20` = 5rem (80px)
- `24` = 6rem (96px)

## 1.2. Margin Examples

```html
<!-- Margin all sides -->
<div class="m-0">No margin</div>
<div class="m-1">Margin 1 (4px)</div>
<div class="m-2">Margin 2 (8px)</div>
<div class="m-4">Margin 4 (16px)</div>
<div class="m-8">Margin 8 (32px)</div>
<div class="m-16">Margin 16 (64px)</div>

<!-- Margin specific sides -->
<div class="mt-4">Margin top (16px)</div>
<div class="mr-4">Margin right (16px)</div>
<div class="mb-4">Margin bottom (16px)</div>
<div class="ml-4">Margin left (16px)</div>
<div class="mx-auto">Margin x auto (căn giữa ngang)</div>
<div class="my-4">Margin y (top + bottom, 16px)</div>

<!-- Negative margin -->
<div class="-mt-4">Negative margin top</div>
<div class="-mx-4">Negative margin x</div>
```

## 1.3. Padding Examples

```html
<!-- Padding all sides -->
<div class="p-0">No padding</div>
<div class="p-1">Padding 1 (4px)</div>
<div class="p-2">Padding 2 (8px)</div>
<div class="p-4">Padding 4 (16px)</div>
<div class="p-8">Padding 8 (32px)</div>

<!-- Padding specific sides -->
<div class="pt-4">Padding top</div>
<div class="pr-4">Padding right</div>
<div class="pb-4">Padding bottom</div>
<div class="pl-4">Padding left</div>
<div class="px-6">Padding x (left + right, 24px)</div>
<div class="py-4">Padding y (top + bottom, 16px)</div>
```

## 1.4. Responsive Spacing

```html
<!-- Mobile: m-2, Tablet: m-4, Desktop: m-8 -->
<div class="m-2 md:m-4 lg:m-8">Responsive margin</div>

<!-- Mobile: p-4, Desktop: p-8 -->
<div class="p-4 lg:p-8">Responsive padding</div>
```

## 1.5. Ví dụ thực tế

```html
<!-- Card với spacing -->
<div class="m-4 p-6 bg-white rounded-lg shadow">
  <h2 class="mb-4">Card Title</h2>
  <p class="mb-6">Card description with spacing.</p>
  <button class="px-4 py-2">Action</button>
</div>

<!-- Container với padding responsive -->
<div class="px-4 md:px-6 lg:px-8">
  Content with responsive padding
</div>
```

---

# 2. **COLORS - MÀU SẮC**

TailwindCSS có hệ thống màu rất phong phú với nhiều shades.

## 2.1. Color Palette

Mỗi màu có nhiều shades từ 50 (nhạt nhất) đến 900 (đậm nhất):

```
slate, gray, zinc, neutral, stone
red, orange, amber, yellow
lime, green, emerald, teal, cyan
sky, blue, indigo, violet, purple
fuchsia, pink, rose
```

## 2.2. Text Colors

```html
<p class="text-blue-500">Blue text (shade 500)</p>
<p class="text-blue-600">Blue text (shade 600 - đậm hơn)</p>
<p class="text-blue-700">Blue text (shade 700 - đậm nhất)</p>
<p class="text-red-500">Red text</p>
<p class="text-green-500">Green text</p>
<p class="text-gray-600">Gray text</p>
<p class="text-black">Black text</p>
<p class="text-white bg-gray-900">White text</p>
```

**Quy tắc:**
- Shade 500: Màu chuẩn (dùng nhiều nhất)
- Shade 400-300: Nhạt hơn
- Shade 600-900: Đậm hơn

## 2.3. Background Colors

```html
<div class="bg-blue-500">Blue background</div>
<div class="bg-blue-100">Light blue background</div>
<div class="bg-blue-900">Dark blue background</div>
<div class="bg-red-500">Red background</div>
<div class="bg-green-500">Green background</div>
<div class="bg-gray-100">Light gray background</div>
<div class="bg-gray-900 text-white">Dark background with white text</div>
```

## 2.4. Border Colors

```html
<div class="border border-blue-500">Blue border</div>
<div class="border-2 border-red-500">Thick red border</div>
<div class="border-t-4 border-green-500">Green top border</div>
```

## 2.5. Gradients

```html
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
  Gradient left to right
</div>

<div class="bg-gradient-to-b from-yellow-400 to-red-500">
  Gradient top to bottom
</div>

<div class="bg-gradient-to-br from-pink-500 to-indigo-600">
  Gradient top-left to bottom-right
</div>
```

**Directions:**
- `to-r`: Left to right
- `to-l`: Right to left
- `to-t`: Bottom to top
- `to-b`: Top to bottom
- `to-tr`: Bottom-left to top-right
- `to-br`: Top-left to bottom-right
- `to-bl`: Top-right to bottom-left
- `to-tl`: Bottom-right to top-left

---

# 3. **TYPography - ĐỊNH DẠNG CHỮ**

## 3.1. Font Size

```html
<p class="text-xs">Extra small (12px)</p>
<p class="text-sm">Small (14px)</p>
<p class="text-base">Base (16px) - Default</p>
<p class="text-lg">Large (18px)</p>
<p class="text-xl">Extra large (20px)</p>
<p class="text-2xl">2XL (24px)</p>
<p class="text-3xl">3XL (30px)</p>
<p class="text-4xl">4XL (36px)</p>
<p class="text-5xl">5XL (48px)</p>
<p class="text-6xl">6XL (60px)</p>
<p class="text-7xl">7XL (72px)</p>
<p class="text-8xl">8XL (96px)</p>
<p class="text-9xl">9XL (128px)</p>
```

## 3.2. Font Weight

```html
<p class="font-thin">Thin (100)</p>
<p class="font-extralight">Extra light (200)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra bold (800)</p>
<p class="font-black">Black (900)</p>
```

## 3.3. Font Style

```html
<p class="italic">Italic text</p>
<p class="not-italic">Normal text</p>
```

## 3.4. Text Alignment

```html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified text</p>
```

**Responsive:**
```html
<p class="text-left md:text-center lg:text-right">
  Left on mobile, center on tablet, right on desktop
</p>
```

## 3.5. Text Decoration

```html
<p class="underline">Underlined text</p>
<p class="overline">Overlined text</p>
<p class="line-through">Line through text</p>
<p class="no-underline">No underline</p>
```

## 3.6. Text Transform

```html
<p class="uppercase">UPPERCASE TEXT</p>
<p class="lowercase">lowercase text</p>
<p class="capitalize">capitalize text</p>
<p class="normal-case">Normal case</p>
```

## 3.7. Letter Spacing

```html
<p class="tracking-tighter">Tighter spacing</p>
<p class="tracking-tight">Tight spacing</p>
<p class="tracking-normal">Normal spacing</p>
<p class="tracking-wide">Wide spacing</p>
<p class="tracking-wider">Wider spacing</p>
<p class="tracking-widest">Widest spacing</p>
```

## 3.8. Line Height

```html
<p class="leading-none">Tight line height</p>
<p class="leading-tight">Tight</p>
<p class="leading-snug">Snug</p>
<p class="leading-normal">Normal</p>
<p class="leading-relaxed">Relaxed</p>
<p class="leading-loose">Loose</p>
```

---

# 4. **FLEXBOX UTILITIES**

## 4.1. Display Flex

```html
<div class="flex">Flexbox container</div>
<div class="inline-flex">Inline flex</div>
```

## 4.2. Flex Direction

```html
<div class="flex-row">Row (default)</div>
<div class="flex-row-reverse">Row reverse</div>
<div class="flex-col">Column</div>
<div class="flex-col-reverse">Column reverse</div>
```

## 4.3. Justify Content (Căn ngang)

```html
<div class="flex justify-start">Start</div>
<div class="flex justify-center">Center</div>
<div class="flex justify-end">End</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>
```

## 4.4. Align Items (Căn dọc)

```html
<div class="flex items-start">Start</div>
<div class="flex items-center">Center</div>
<div class="flex items-end">End</div>
<div class="flex items-stretch">Stretch</div>
<div class="flex items-baseline">Baseline</div>
```

## 4.5. Flex Wrap

```html
<div class="flex flex-nowrap">No wrap</div>
<div class="flex flex-wrap">Wrap</div>
<div class="flex flex-wrap-reverse">Wrap reverse</div>
```

## 4.6. Gap (Khoảng cách)

```html
<div class="flex gap-1">Gap 1 (4px)</div>
<div class="flex gap-2">Gap 2 (8px)</div>
<div class="flex gap-4">Gap 4 (16px)</div>
<div class="flex gap-8">Gap 8 (32px)</div>

<!-- Gap x và y riêng -->
<div class="flex gap-x-4 gap-y-2">Gap x=16px, y=8px</div>
```

## 4.7. Flex Grow/Shrink

```html
<div class="flex-1">Flex 1 (grow)</div>
<div class="flex-auto">Flex auto</div>
<div class="flex-initial">Flex initial</div>
<div class="flex-none">Flex none</div>
```

## 4.8. Ví dụ thực tế: Navbar với Flexbox

```html
<nav class="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
  <div class="text-xl font-bold">My Website</div>
  <div class="flex gap-4">
    <a href="#" class="hover:text-gray-300">Home</a>
    <a href="#" class="hover:text-gray-300">About</a>
    <a href="#" class="hover:text-gray-300">Contact</a>
  </div>
</nav>
```

---

# 5. **GRID UTILITIES**

## 5.1. Grid Container

```html
<div class="grid">Grid container</div>
<div class="inline-grid">Inline grid</div>
```

## 5.2. Grid Columns

```html
<div class="grid grid-cols-1">1 column</div>
<div class="grid grid-cols-2">2 columns</div>
<div class="grid grid-cols-3">3 columns</div>
<div class="grid grid-cols-4">4 columns</div>
<div class="grid grid-cols-12">12 columns</div>

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  Responsive grid
</div>
```

## 5.3. Grid Rows

```html
<div class="grid grid-rows-1">1 row</div>
<div class="grid grid-rows-2">2 rows</div>
<div class="grid grid-rows-3">3 rows</div>
```

## 5.4. Gap

```html
<div class="grid gap-4">Gap 4</div>
<div class="grid gap-x-4 gap-y-2">Gap x=16px, y=8px</div>
```

## 5.5. Ví dụ thực tế: Product Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="bg-white p-4 rounded shadow">Product 1</div>
  <div class="bg-white p-4 rounded shadow">Product 2</div>
  <div class="bg-white p-4 rounded shadow">Product 3</div>
  <div class="bg-white p-4 rounded shadow">Product 4</div>
</div>
```

---

# 6. **BORDERS - VIỀN**

## 6.1. Border Width

```html
<div class="border">Border (1px)</div>
<div class="border-0">No border</div>
<div class="border-2">Border 2px</div>
<div class="border-4">Border 4px</div>
<div class="border-8">Border 8px</div>

<!-- Specific sides -->
<div class="border-t">Top border</div>
<div class="border-r">Right border</div>
<div class="border-b">Bottom border</div>
<div class="border-l">Left border</div>
```

## 6.2. Border Colors

```html
<div class="border border-blue-500">Blue border</div>
<div class="border-2 border-red-500">Red border 2px</div>
```

## 6.3. Border Radius

```html
<div class="rounded-none">No radius</div>
<div class="rounded-sm">Small radius</div>
<div class="rounded">Default radius</div>
<div class="rounded-md">Medium radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-xl">Extra large radius</div>
<div class="rounded-2xl">2XL radius</div>
<div class="rounded-3xl">3XL radius</div>
<div class="rounded-full">Full circle</div>

<!-- Specific corners -->
<div class="rounded-t-lg">Top corners rounded</div>
<div class="rounded-r-lg">Right corners rounded</div>
<div class="rounded-b-lg">Bottom corners rounded</div>
<div class="rounded-l-lg">Left corners rounded</div>
<div class="rounded-tl-lg">Top-left rounded</div>
<div class="rounded-tr-lg">Top-right rounded</div>
<div class="rounded-bl-lg">Bottom-left rounded</div>
<div class="rounded-br-lg">Bottom-right rounded</div>
```

---

# 7. **SIZING - KÍCH THƯỚC**

## 7.1. Width

```html
<div class="w-0">Width 0</div>
<div class="w-1">Width 0.25rem</div>
<div class="w-4">Width 1rem</div>
<div class="w-1/2">Width 50%</div>
<div class="w-1/3">Width 33.33%</div>
<div class="w-1/4">Width 25%</div>
<div class="w-full">Width 100%</div>
<div class="w-screen">Width 100vw</div>
<div class="w-auto">Width auto</div>
<div class="w-min">Width min-content</div>
<div class="w-max">Width max-content</div>
<div class="w-fit">Width fit-content</div>
```

## 7.2. Height

```html
<div class="h-0">Height 0</div>
<div class="h-4">Height 1rem</div>
<div class="h-1/2">Height 50%</div>
<div class="h-full">Height 100%</div>
<div class="h-screen">Height 100vh</div>
<div class="h-auto">Height auto</div>
```

## 7.3. Min/Max Width/Height

```html
<div class="min-w-0">Min width 0</div>
<div class="min-w-full">Min width 100%</div>
<div class="max-w-xs">Max width 20rem</div>
<div class="max-w-sm">Max width 24rem</div>
<div class="max-w-md">Max width 28rem</div>
<div class="max-w-lg">Max width 32rem</div>
<div class="max-w-xl">Max width 36rem</div>
<div class="max-w-2xl">Max width 42rem</div>
<div class="max-w-full">Max width 100%</div>
```

---

# 8. **POSITION - VỊ TRÍ**

```html
<div class="static">Static</div>
<div class="fixed">Fixed</div>
<div class="absolute">Absolute</div>
<div class="relative">Relative</div>
<div class="sticky">Sticky</div>

<!-- Positioning -->
<div class="absolute top-0 left-0">Top left</div>
<div class="absolute top-0 right-0">Top right</div>
<div class="absolute bottom-0 left-0">Bottom left</div>
<div class="absolute bottom-0 right-0">Bottom right</div>
<div class="absolute inset-0">Full (top-0 right-0 bottom-0 left-0)</div>
<div class="absolute top-1/2 left-1/2">Center (50%)</div>
```

---

# 9. **SHADOWS - ĐỔ BÓNG**

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
<div class="shadow-2xl">2XL shadow</div>
<div class="shadow-inner">Inner shadow</div>
<div class="shadow-none">No shadow</div>
```

---

# 10. **OPACITY - ĐỘ TRONG SUỐT**

```html
<div class="opacity-0">0% opacity (invisible)</div>
<div class="opacity-25">25% opacity</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-100">100% opacity (opaque)</div>
```

---

# 11. **RESPONSIVE PREFIXES**

TailwindCSS dùng prefixes để áp dụng utilities theo breakpoint:

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Cú pháp:**
```html
<div class="text-sm md:text-base lg:text-lg">
  Small on mobile, base on tablet, large on desktop
</div>

<div class="w-full md:w-1/2 lg:w-1/3">
  Full width on mobile, 50% on tablet, 33% on desktop
</div>

<div class="hidden md:block">
  Hidden on mobile, visible on tablet+
</div>
```

---

# 12. **HOVER, FOCUS, ACTIVE STATES**

```html
<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-600">
  Hover me
</button>

<!-- Focus -->
<input class="border focus:border-blue-500 focus:outline-none">

<!-- Active -->
<button class="bg-blue-500 active:bg-blue-700">
  Click me
</button>

<!-- Disabled -->
<button class="bg-gray-400 disabled:opacity-50" disabled>
  Disabled
</button>
```

---

# 13. **KẾT HỢP NHIỀU UTILITIES**

Bạn có thể kết hợp nhiều utilities:

```html
<!-- Card với nhiều utilities -->
<div class="m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">Card Title</h2>
  <p class="text-gray-600 leading-relaxed mb-6">Card description.</p>
  <div class="flex justify-between items-center">
    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
      Active
    </span>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Action
    </button>
  </div>
</div>
```

---

# 14. **BÀI TẬP THỰC HÀNH**

## Bài tập 1: Tạo Card với Utilities

Tạo card với:
- Margin 4, Padding 6
- Background white
- Rounded large
- Shadow large
- Border gray
- Text center cho title
- Flexbox cho footer

## Bài tập 2: Tạo Responsive Grid

Tạo grid với:
- 1 cột trên mobile
- 2 cột trên tablet
- 4 cột trên desktop
- Gap 6
- Mỗi item có padding và border

## Bài tập 3: Tạo Button với States

Tạo button với:
- Background blue-500
- Hover: blue-600
- Active: blue-700
- Disabled: opacity-50
- Padding x=4, y=2
- Rounded
- Text white, bold

---

# 15. **TỔNG KẾT**

**Các utilities đã học:**
1. ✅ Spacing (m-*, p-*, mt-*, mb-*, mx-*, my-*...)
2. ✅ Colors (text-*, bg-*, border-*)
3. ✅ Typography (text-*, font-*, leading-*, tracking-*)
4. ✅ Flexbox (flex, justify-*, items-*, gap-*)
5. ✅ Grid (grid, grid-cols-*, grid-rows-*, gap-*)
6. ✅ Borders (border-*, rounded-*)
7. ✅ Sizing (w-*, h-*, min-w-*, max-w-*)
8. ✅ Position (absolute, relative, top-*, left-*)
9. ✅ Shadows (shadow-*)
10. ✅ Opacity (opacity-*)
11. ✅ States (hover:*, focus:*, active:*)
12. ✅ Responsive (sm:*, md:*, lg:*, xl:*)

**Lưu ý:**
- Utilities có thể kết hợp với nhau
- Dùng responsive prefixes cho mobile-first design
- Học thuộc các utilities phổ biến để code nhanh hơn

---

**Bài tiếp theo:** [03. Components](../03_components/03_components.md) - Xây dựng Components với Utilities

> [!TIP]
> **Lời khuyên:** Hãy thực hành nhiều với utilities. Đây là phần quan trọng nhất của TailwindCSS. Khi đã quen với utilities, bạn sẽ code nhanh hơn rất nhiều so với viết CSS thuần!
