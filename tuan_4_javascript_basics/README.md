# 🟨 Tuần 4 — JavaScript Core & ES6+ Foundations

## 📋 Tổng quan

Tuần này xây dựng nền tảng JavaScript từ zero đến ES6+ modules — cầu nối trực tiếp sang React ở Tuần 6.

## 📚 Danh sách bài giảng

| # | Bài | Nội dung chính | Thời lượng |
|---|-----|---------------|------------|
| 01 | [Giới thiệu JavaScript](./01_basics_introduction.md) | Lịch sử, vai trò, JS engine, cách chạy JS | 45' |
| 02 | [Bắt đầu với JavaScript](./02_getting_started.md) | DevTools, console, biến, kiểu dữ liệu cơ bản | 45' |
| 03 | [Kiểu dữ liệu & Ép kiểu](./03_data_types_variables.md) | Primitive vs Reference, Type Coercion, Truthy/Falsy | 50' |
| 04 | [Cấu trúc điều khiển](./04_control_structures.md) | if/else, switch, for, while, break/continue | 50' |
| 05 | [Functions](./05_functions.md) | Declaration, Arrow, Default params, Rest/Spread, Closure intro | 60' |
| 06 | [Arrays & Objects](./06_arrays_objects.md) | CRUD, Destructuring, Spread, Array methods cơ bản | 60' |
| 07 | [Higher Order Functions](./07_higher_order_functions.md) | forEach, map, filter, reduce, sort, callback pattern | 55' |
| 08 | [Destructuring & Spread](./08_destructuring_spread.md) | Rút trích sâu, Spread arrays/objects, Rest pattern | 45' |
| 09 | [Sets & Maps](./09_sets_maps.md) | Set, Map, WeakSet, WeakMap, dedup, frequency count | 45' |
| **10** | **[ES6 Modules — Import & Export](./10_es6_modules.md)** 🆕 | **Named/Default export, import, module scope, `<script type="module">`, cầu nối React** | **50'** |

## 🔗 Phụ thuộc (Dependencies)

```
01 Intro → 02 Bắt đầu → 03 Kiểu dữ liệu
                              ↓
                         04 Điều khiển → 05 Functions
                                              ↓
                                    06 Arrays & Objects → 07 HOF
                                              ↓
                                    08 Destructuring → 09 Sets/Maps
                                              ↓
                                         10 ES6 Modules ← CẦU NỐI SANG REACT
```

## 🎯 Mục tiêu học tập (Learning Outcomes)

Sau Tuần 4, sinh viên có thể:
- [x] Viết JavaScript cơ bản với variables, operators, control flow
- [x] Sử dụng Functions (declaration, arrow, callback)
- [x] Thao tác Arrays & Objects (CRUD, destructuring, spread)
- [x] Sử dụng HOF (map, filter, reduce) để xử lý dữ liệu
- [x] **Sử dụng ES6 Modules (import/export) để tổ chức code nhiều file**
- [x] **Hiểu `<script type="module">` và module scope**

## ⚠️ Ghi chú tái cấu trúc

### Bài hiện tại → Đề xuất di chuyển

Bài viết theo số thứ tự từ 01-10 (tuan_4) → 19-29 (tuan_5). Việc đánh số 19+ cho DOM tạo khoảng trống 11-18.

**Đề xuất đánh số lại:**

| Hiện tại | Đề xuất | Lý do |
|----------|---------|-------|
| `tuan_4/01-10` | Giữ nguyên `01-10` | ✅ Đã liên tục |
| `tuan_5/19_dom_manipulation` | `11_dom_manipulation` | Liền mạch sau 10 |
| `tuan_5/20_ajax_async` | `12_ajax_async` | — |
| `tuan_5/21_professional_dev` | `13_professional_dev` | — |
| `tuan_5/22_error_handling` | `14_error_handling` | — |
| `tuan_5/23_json` | `15_json` | — |
| `tuan_5/24_web_storages` | `16_web_storages` | — |
| `tuan_5/25_classes_oop` | `17_classes_oop` | — |
| `tuan_5/26_closures` | `18_closures` | — |
| `tuan_5/27_regular_expressions` | `19_regular_expressions` | — |
| `tuan_5/28_console_methods` | `20_console_methods` | — |
| `tuan_5/29_clean_code` | `21_clean_code` | — |

### Tại sao ES6 Modules nằm ở Tuần 4 (Cuối)?

1. **Cần prerequisite**: Functions (05), Arrays/Objects (06), Destructuring (08)
2. **Phải TRƯỚC DOM/Async**: Tuần 5 bài AJAX dùng `export const todoAPI` — sinh viên cần hiểu export
3. **Phải TRƯỚC React**: Tuần 6 import React — phải biết import/export trước

### Nội dung có thể bổ sung thêm (tương lai)

| Bài đề xuất | Nội dung | Ưu tiên |
|-------------|----------|---------|
| Optional Chaining & Nullish Coalescing | `?.`, `??` — dùng rất nhiều trong React | ⭐⭐⭐ |
| Template Literals nâng cao | Tagged templates — liên kết sang styled-components | ⭐⭐ |
| Iterators & Generators | `for...of`, generators — nâng cao | ⭐ |
| Proxy & Reflect | Meta-programming — nâng cao | ⭐ |
