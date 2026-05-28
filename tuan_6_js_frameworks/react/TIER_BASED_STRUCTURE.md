# ⚛️ React — Thiết kế lại theo Tier

> **Nguyên tắc cốt lõi:** Mỗi Tier chỉ dạy **MỘT khái niệm duy nhất**  
> **Ngày tạo:** Tháng 5, 2026  
> **Cập nhật:** 28/05/2026 — Tạo Tier 0-3 cho lý thuyết  
> **Áp dụng:** `tuan_6_js_frameworks/react/`

---

## 🔴 VẤN ĐỀ: File cũ gộp quá nhiều khái niệm

| File cũ | Số dòng | Số concepts | Vấn đề |
|---------|---------|-------------|--------|
| `01_spa_architecture_components_routing.md` | 268 | 10 | SPA + Virtual DOM + Components + State + Routing |
| `02_react_fundamentals_hooks.md` | 425 | 12 | JSX + Props + useState + useEffect + Controlled |
| `02_basic_principles.md` | 512 | 13 | Props + State + Events + Forms + Conditional + Lists |
| `04_behind_the_scenes.md` | 558 | 12 | Lifecycle + useEffect + Context + Fragments |
| `06_hooks_api.md` | 648 | 11 | useRef + useMemo + useCallback + memo + useReducer |

**Trung bình:** 533 dòng/file, 8-12 concepts/file → sinh viên bị "sốc".

---

## ✅ GIẢI PHÁP: 24 Tiers, mỗi Tier = 1 concept

```
lessons/                           ← THƯ MỚI: Lý thuyết theo Tier
├── README.md                      ← Bản đồ 24 Tiers
├── TIER_00_spa_architecture.md    ✅ SPA vs MPA
├── TIER_01_virtual_dom.md         ✅ Virtual DOM
├── TIER_02_react_setup_jsx.md     ✅ Vite + JSX rules
├── TIER_03_components.md          ✅ Function components
├── TIER_04_props.md               ⏳ Truyền dữ liệu
├── TIER_05_conditional_list.md    ⏳ Conditional & List rendering
├── TIER_06_useState_basics.md     ⏳ State primitives
├── TIER_07_state_patterns.md      ⏳ Object/array state
├── TIER_08_events.md              ⏳ Event handling
├── TIER_09_forms.md               ⏳ Controlled components
├── TIER_10_lifecycle.md           ⏳ Mount/update/unmount
├── TIER_11_useEffect_basic.md     ⏳ Dependencies
├── TIER_12_useEffect_advanced.md  ⏳ Cleanup, fetching
├── TIER_13_useRef.md              ⏳ DOM access
├── TIER_14_context_api.md         ⏳ Provider, useContext
├── TIER_15_custom_hooks.md        ⏳ Reusable logic
├── TIER_16_useReducer.md          ⏳ Reducer pattern
├── TIER_17_performance.md         ⏳ useMemo, useCallback
├── TIER_18_styling.md             ⏳ CSS Modules, Tailwind
├── TIER_19_react_router.md        ⏳ Routes, Link, useParams
├── TIER_20_typescript.md          ⏳ Type props, state
├── TIER_21_testing.md             ⏳ Jest, RTL
├── TIER_22_redux.md               ⏳ Store, slices, thunks
└── TIER_23_ui_libraries.md        ⏳ MUI, Ant Design

01_spa_architecture/               ← [CŨ] Giữ làm reference
02_getting_started/                ← [CŨ] Giữ làm reference
04_hooks/                          ← [CŨ] Giữ làm reference
05_ecosystem/                      ← [CŨ] Giữ làm reference
06_routing_state/                  ← [CŨ] Giữ làm reference
07_advanced_patterns/              ← [CŨ] Giữ làm reference
```

---

## 📚 MODULE A: React Foundations (Tier 0-7)

> **Đã có sẵn** trong `lab_practical/session_04_react_basics/exercises_v2/`  
> **Đối tượng:** Sinh viên mới bắt đầu, đã biết HTML/CSS/JS cơ bản  
> **Tổng thời gian:** ~4 giờ (8 buổi × 30 phút)

| Tier | Tên | Concepts | Thời gian | Nguồn cũ |
|------|-----|----------|-----------|----------|
| 0 | Component đầu tiên | JSX cơ bản, function component | 15-20' | `01_getting_started.md` |
| 1 | Luồng hoạt động | Render, re-render, mount | 20-25' | `01_spa_architecture.md` (1 phần) |
| 2 | Biến trong JSX | `{}`, conditional, list cơ bản | 20-25' | `02_basic_principles.md` (1 phần) |
| 3 | Chia component | Tại sao chia? Import/Export | 25-35' | `02_basic_principles.md` (1 phần) |
| 4 | useState cơ bản | Number, string, boolean state | 30-40' | `02_react_fundamentals.md` (1 phần) |
| 5 | Events | Click, input, keyboard, form submit | 25-35' | `02_basic_principles.md` (1 phần) |
| 6 | Lists & CRUD | map(), filter(), thêm/sửa/xóa | 40-50' | `02_basic_principles.md` (1 phần) |
| 7 | Mini Project | Todo App tổng hợp | 45-60' | Mới |

---

## 📚 MODULE B: React Intermediate (Tier 8-15)

> **Cần tạo mới** — tách từ các file cũ  
> **Đối tượng:** Đã hoàn thành Module A  
> **Tổng thời gian:** ~5 giờ (8 buổi × 35-40 phút)

| Tier | Tên | Concepts | Thời gian | Tách từ file cũ |
|------|-----|----------|-----------|-----------------|
| 8 | Props nâng cao | Destructuring, default values, children, composition | 25-30' | `02_basic_principles.md` |
| 9 | State patterns | Object state, array state, functional update `prev =>` | 30-35' | `02_react_fundamentals.md` |
| 10 | useEffect cơ bản | Side effects, dependency array, mount vs update | 30-35' | `04_behind_the_scenes.md` |
| 11 | useEffect nâng cao | Cleanup function, API fetching, debouncing | 35-40' | `04_behind_the_scenes.md` |
| 12 | useRef | DOM access, persist values, không gây re-render | 25-30' | `06_hooks_api.md` |
| 13 | Context API | Prop drilling problem, Provider, useContext | 30-35' | `04_behind_the_scenes.md` |
| 14 | Forms nâng cao | Controlled components, validation, multi-field form | 30-35' | `10_forms_react.md` |
| 15 | Styling React | CSS Modules, inline styles, styled-components cơ bản | 25-30' | `08_styling_react.md` |

### Mapping chi tiết: File cũ → Tier mới

```
02_basic_principles.md (13 concepts) → Tier 3 + Tier 5 + Tier 6 + Tier 8
02_react_fundamentals.md (12 concepts) → Tier 4 + Tier 9 + Tier 10
04_behind_the_scenes.md (12 concepts) → Tier 10 + Tier 11 + Tier 13
06_hooks_api.md (11 concepts) → Tier 12 + Tier 16 + Tier 17 + Tier 18
```

---

## 📚 MODULE C: React Advanced (Tier 16-23)

> **Cần tạo mới** — tách từ các file cũ  
> **Đối tượng:** Đã hoàn thành Module B  
> **Tổng thời gian:** ~5 giờ (8 buổi × 35-40 phút)

| Tier | Tên | Concepts | Thời gian | Tách từ file cũ |
|------|-----|----------|-----------|-----------------|
| 16 | useReducer | Reducer pattern, action types, dispatch | 35-40' | `06_hooks_api.md` |
| 17 | Custom hooks | Tái sử dụng logic, useFetch, useLocalStorage | 30-35' | `06_hooks_api.md` |
| 18 | Performance | useMemo, useCallback, React.memo, khi nào dùng | 30-35' | `06_hooks_api.md` |
| 19 | React Router | Routes, Link, useParams, nested routes | 35-40' | `12_react_router.md` |
| 20 | State management | Redux core概念 (store, action, reducer, dispatch) | 40-45' | `14_redux_state_management.md` |
| 21 | TypeScript + React | Type props, type state, generic components | 30-35' | `07_typescript_react.md` |
| 22 | Testing cơ bản | Jest, React Testing Library, test component | 30-35' | `09_testing_react.md` |
| 23 | Capstone Project | Ứng dụng hoàn chỉnh (Router + Context + Custom hooks) | 60-90' | Tổng hợp |

---

## 🔄 SO SÁNH: Trước vs Sau

### Trước (cũ) — File-based
```
01_spa_architecture/
  ├── 01_spa_architecture_components_routing.md   ← 8 concepts 😰
  └── 02_react_fundamentals_hooks.md              ← 12 concepts 😰

02_getting_started/
  ├── 01_getting_started.md                       ← 10 concepts 😰
  └── 02_basic_principles.md                      ← 13 concepts 😰

04_hooks/
  ├── 04_behind_the_scenes.md                     ← 12 concepts 😰
  └── 06_hooks_api.md                             ← 11 concepts 😰
```

### Sau (mới) — Tier-based
```
module_a_foundations/
  ├── TIER_0_first_component.md       ← 1 concept 😊
  ├── TIER_1_react_flow.md            ← 1 concept 😊
  ├── TIER_2_jsx_variables.md         ← 1 concept 😊
  ├── TIER_3_component_split.md       ← 1 concept 😊
  ├── TIER_4_useState_basics.md       ← 1 concept 😊
  ├── TIER_5_events_basics.md         ← 1 concept 😊
  ├── TIER_6_lists_crud.md            ← 1 concept 😊
  └── TIER_7_todo_app.md              ← Tổng hợp 😊

module_b_intermediate/
  ├── TIER_08_props_advanced.md       ← 1 concept 😊
  ├── TIER_09_state_patterns.md       ← 1 concept 😊
  ├── TIER_10_useEffect_basic.md      ← 1 concept 😊
  ├── TIER_11_useEffect_advanced.md   ← 1 concept 😊
  ├── TIER_12_useRef.md               ← 1 concept 😊
  ├── TIER_13_context_api.md          ← 1 concept 😊
  ├── TIER_14_forms_advanced.md       ← 1 concept 😊
  └── TIER_15_styling_react.md        ← 1 concept 😊

module_c_advanced/
  ├── TIER_16_useReducer.md           ← 1 concept 😊
  ├── TIER_17_custom_hooks.md         ← 1 concept 😊
  ├── TIER_18_performance.md          ← 1 concept 😊
  ├── TIER_19_react_router.md         ← 1 concept 😊
  ├── TIER_20_state_management.md     ← 1 concept 😊
  ├── TIER_21_typescript_react.md     ← 1 concept 😊
  ├── TIER_22_testing.md              ← 1 concept 😊
  └── TIER_23_capstone.md             ← Tổng hợp 😊
```

---

## 📋 Cấu trúc mỗi Tier (Template)

```markdown
# Tier N — [Tên khái niệm]

> **Thời gian:** X-Y phút
> **Mục tiêu:** Học được gì sau Tier này
> **Đã biết cần:** Kiến thức prerequisite
> **Không cần biết:** Các Tier sau

---

## 🎯 Hôm nay bạn sẽ học
[Giải thích 1 câu: Khái niệm này giải quyết vấn đề gì?]

## 📝 Bài N.1 — [Tên bài] (X phút)
[Code mẫu chạy được, copy-paste thử ngay]

## 📝 Bài N.2 — [Tên bài] (X phút)
[Thực hành có hướng dẫn]

## 🧪 Thử thách
1. [Dễ] — Áp dụng trực tiếp
2. [Trung bình] — Thay đổi nhỏ
3. [Khó] — Tư duy sáng tạo

## ✅ Checklist tự đánh giá
- [ ] Hiểu được [khái niệm] là gì?
- [ ] Viết được [kỹ năng] cơ bản?
- [ ] Giải thích được tại sao cần [khái niệm]?

## 🔗 Kết nối
- Dùng kiến thức từ Tier [N-1]: [mô tả]
- Sẽ cần trong Tier [N+1]: [mô tả]
```

---

## 📊 Tiến trình thực hiện

| Bước | Nội dung | Trạng thái |
|------|----------|------------|
| 1 | Thiết kế Tier map | ✅ Hoàn thành |
| 2 | Tạo `lessons/` directory | ✅ Hoàn thành |
| 3 | Tier 0-3 (Phase 1: Nền tảng) | ✅ 4 files đã tạo |
| 4 | Tier 4-7 (Phase 2: Dữ liệu) | ⏳ Cần tạo |
| 5 | Tier 8-10 (Phase 3: Tương tác) | ⏳ Cần tạo |
| 6 | Tier 11-13 (Phase 4: Side Effects) | ⏳ Cần tạo |
| 7 | Tier 14-17 (Phase 5: Kiến trúc) | ⏳ Cần tạo |
| 8 | Tier 18-23 (Phase 6: Hệ sinh thái) | ⏳ Cần tạo |

---

## 📂 Cấu trúc mới

```
lessons/                           ← THƯ MỚI: Lý thuyết theo Tier
├── README.md                      ← Bản đồ 24 Tiers + dependency graph
├── TIER_00_spa_architecture.md    ✅ SPA vs MPA
├── TIER_01_virtual_dom.md         ✅ Virtual DOM
├── TIER_02_react_setup_jsx.md     ✅ Vite + JSX rules
├── TIER_03_components.md          ✅ Function components
├── TIER_04_props.md               ⏳
├── TIER_05_conditional_list.md    ⏳
├── ...                            (20 Tier files nữa)
└── TIER_23_ui_libraries.md        ⏳
```

---

## 🎯 Lợi ích kỳ vọng

### Cho sinh viên
- ✅ Mỗi buổi chỉ học 1 khái niệm → không bị sốc
- ✅ Tự tin khi hoàn thành từng Tier
- ✅ Dễ xác định điểm yếu: "Mình chưa hiểu Tier 10"
- ✅ Có thể tự học theo tốc độ riêng

### Cho giảng viên
- ✅ Dễ đánh giá: sinh viên nào dừng ở Tier nào?
- ✅ Dễ điều chỉnh: bỏ/tăng Tier nào yếu
- ✅ Dễ tái sử dụng cho khóa sau
- ✅ Dễ kết hợp với lab_practical exercises

---

**Tài liệu này là bản thiết kế. Các Tier files sẽ được tạo theo thiết kế này.**
