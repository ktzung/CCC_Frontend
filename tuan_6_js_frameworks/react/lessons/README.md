# ⚛️ React Lessons — Học theo Tier, mỗi Tier MỘT khái niệm

> **Nguyên tắc:** Mỗi Tier chỉ dạy **MỘT khái niệm duy nhất**  
> **Phong cách:** Storytelling với nhân vật "Minh", code mẫu chạy được, bảng so sánh  
> **Thời gian/Tier:** 30-45 phút (1 tiết học)

---

## 🗺️ Bản đồ Tier — 24 Tiers trong 6 Phase

```
Phase 1: Nền tảng          Tier 0-3    "Tại sao cần React?"
Phase 2: Dữ liệu           Tier 4-7    "Dữ liệu di chuyển thế nào?"
Phase 3: Tương tác          Tier 8-10   "Người dùng tương tác thế nào?"
Phase 4: Side Effects       Tier 11-13  "Làm việc với thế giới bên ngoài"
Phase 5: Kiến trúc          Tier 14-17  "Tổ chức code lớn"
Phase 6: Hệ sinh thái       Tier 18-23  "Công cụ & Framework"
```

---

## 📚 Phase 1: Nền tảng (Tier 0-3)

> **Câu hỏi lớn:** "Tại sao cần React? React hoạt động thế nào?"

| Tier | Khái niệm | Tách từ file cũ | Thời gian |
|------|-----------|-----------------|-----------|
| 0 | **SPA Architecture** — MPA vs SPA, tại sao SPA | `01_spa_architecture/01_...md` | 30-35' |
| 1 | **Virtual DOM** — Cách React cập nhật UI hiệu quả | `01_spa_architecture/01_...md` | 30-35' |
| 2 | **React Setup & JSX** — Vite, JSX rules, expressions | `02_getting_started/01_...md` | 35-40' |
| 3 | **Components** — Function components, export/import | `02_getting_started/01_...md` | 30-35' |

---

## 📚 Phase 2: Dữ liệu (Tier 4-7)

> **Câu hỏi lớn:** "Dữ liệu di chuyển thế nào giữa các component?"

| Tier | Khái niệm | Tách từ file cũ | Thời gian |
|------|-----------|-----------------|-----------|
| 4 | **Props** — Truyền dữ liệu parent → child | `02_getting_started/02_...md` | 30-35' |
| 5 | **Conditional & List Rendering** — &&, ternary, .map(), key | `02_getting_started/02_...md` | 30-35' |
| 6 | **useState Basics** — State primitives, functional update | `02_getting_started/02_...md` | 35-40' |
| 7 | **State Patterns** — Object/array state, immutability | `02_react_fundamentals_hooks.md` | 35-40' |

---

## 📚 Phase 3: Tương tác (Tier 8-10)

> **Câu hỏi lớn:** "Người dùng click, gõ, submit — React xử lý thế nào?"

| Tier | Khái niệm | Tách từ file cũ | Thời gian |
|------|-----------|-----------------|-----------|
| 8 | **Events** — onClick, onChange, onSubmit, keyboard | `02_getting_started/02_...md` | 30-35' |
| 9 | **Controlled Components & Forms** — Input binding, validation | `02_getting_started/02_...md` + `10_forms_react.md` | 35-40' |
| 10 | **Component Lifecycle** — Mount, update, unmount | `04_hooks/04_behind_the_scenes.md` | 30-35' |

---

## 📚 Phase 4: Side Effects (Tier 11-13)

> **Câu hỏi lớn:** "Làm thế nào gọi API, đồng bộ localStorage, thay đổi document.title?"

| Tier | Khái niệm | Tách từ file cũ | Thời gian |
|------|-----------|-----------------|-----------|
| 11 | **useEffect Basics** — Dependencies, mount vs update | `04_hooks/04_behind_the_scenes.md` | 35-40' |
| 12 | **useEffect Advanced** — Cleanup, API fetching, debounce | `04_hooks/04_behind_the_scenes.md` | 35-40' |
| 13 | **useRef** — DOM access, persist values, không gây re-render | `04_hooks/06_hooks_api.md` | 30-35' |

---

## 📚 Phase 5: Kiến trúc (Tier 14-17)

> **Câu hỏi lớn:** "Làm thế nào tổ chức code khi app lớn?"

| Tier | Khái niệm | Tách từ file cũ | Thời gian |
|------|-----------|-----------------|-----------|
| 14 | **Context API** — Prop drilling, Provider, useContext | `04_hooks/04_behind_the_scenes.md` | 35-40' |
| 15 | **Custom Hooks** — Tái sử dụng logic | `04_hooks/06_hooks_api.md` | 30-35' |
| 16 | **useReducer** — Quản lý state phức tạp | `04_hooks/06_hooks_api.md` | 35-40' |
| 17 | **Performance** — useMemo, useCallback, React.memo | `04_hooks/06_hooks_api.md` | 35-40' |

---

## 📚 Phase 6: Hệ sinh thái (Tier 18-23)

> **Câu hỏi lớn:** "Công cụ nào giúp React development tốt hơn?"

| Tier | Khái niệm | Tách từ file cũ | Thời gian |
|------|-----------|-----------------|-----------|
| 18 | **Styling React** — CSS Modules, Styled Components, Tailwind | `05_ecosystem/08_styling_react.md` | 35-40' |
| 19 | **React Router** — Routes, Link, useParams, nested routes | `06_routing_state/12_react_router.md` | 35-40' |
| 20 | **TypeScript + React** — Type props, state, events | `05_ecosystem/07_typescript_react.md` | 35-40' |
| 21 | **Testing** — Jest, React Testing Library | `05_ecosystem/09_testing_react.md` | 35-40' |
| 22 | **Redux** — Store, slices, thunks, selectors | `06_routing_state/14_redux_state_management.md` | 40-45' |
| 23 | **UI Libraries** — MUI, Ant Design, shadcn | `06_routing_state/11_ui_libraries.md` | 30-35' |

---

## 🔗 Dependency Graph

```
Tier 0 (SPA) ──→ Tier 1 (Virtual DOM) ──→ Tier 2 (JSX) ──→ Tier 3 (Components)
                                                                    ↓
Tier 4 (Props) ←────────────────────────────────────────────────────┘
    ↓
Tier 5 (Conditional/List) ──→ Tier 6 (useState) ──→ Tier 7 (State Patterns)
                                                          ↓
Tier 8 (Events) ──→ Tier 9 (Forms) ──→ Tier 10 (Lifecycle)
                                              ↓
Tier 11 (useEffect Basic) ──→ Tier 12 (useEffect Advanced)
                                              ↓
Tier 13 (useRef) ──→ Tier 14 (Context) ──→ Tier 15 (Custom Hooks)
                                                          ↓
Tier 16 (useReducer) ──→ Tier 17 (Performance)
                              ↓
Tier 18 (Styling) ──→ Tier 19 (Router) ──→ Tier 20 (TypeScript)
                                              ↓
Tier 21 (Testing) ──→ Tier 22 (Redux) ──→ Tier 23 (UI Libraries)
```

---

## 📋 Template mỗi Tier

```markdown
# Tier N — [Tên khái niệm]

> **⏱ Thời lượng:** X phút
> **🎯 Mục tiêu:** [1 câu mô tả]
> **📋 Cần biết:** [Tier prerequisite]
> **🚫 Không cần biết:** [Các Tier sau]

---

## 🎬 Opening Hook
[Storytelling với Minh — 1 tình huống thực tế]

## 🎯 Tại sao cần [khái niệm]?
[Giải thích vấn đề trước khi giải pháp]

## ⚙️ Sự thật kỹ thuật
[Code mẫu chạy được, giải thích từng dòng]

## 📊 So sánh
[Bảng so sánh trước/sau, cũ/mới]

## 💡 Hiểu sai thường gặp
[3-5 misconception phổ biến]

## 🧪 Kiểm tra hiểu bài
[3 câu hỏi nhanh]

## 🔗 Kết nối
- Dùng từ Tier [N-1]: ...
- Sẽ cần trong Tier [N+1]: ...
```

---

## 📊 Mapping: File cũ → Tier mới

| File cũ | Số dòng | Số concepts | Chuyển thành |
|---------|---------|-------------|---------------|
| `01_spa_architecture_components_routing.md` | 268 | 10 | Tier 0 + Tier 1 |
| `02_react_fundamentals_hooks.md` | 425 | 12 | Tier 6 + Tier 7 + Tier 11 |
| `01_getting_started.md` | 387 | 10 | Tier 2 + Tier 3 |
| `02_basic_principles.md` | 512 | 13 | Tier 4 + Tier 5 + Tier 8 + Tier 9 |
| `04_behind_the_scenes.md` | 558 | 12 | Tier 10 + Tier 11 + Tier 12 + Tier 14 |
| `05_class_components.md` | 452 | 10 | (Elective — Class components) |
| `06_hooks_api.md` | 648 | 11 | Tier 13 + Tier 15 + Tier 16 + Tier 17 |
| `07_typescript_react.md` | 425 | 8 | Tier 20 |
| `08_styling_react.md` | 385 | 8 | Tier 18 |
| `09_testing_react.md` | 342 | 8 | Tier 21 |
| `10_forms_react.md` | 428 | 8 | Tier 9 |
| `11_ui_libraries.md` | 385 | 8 | Tier 23 |
| `12_react_router.md` | 502 | 11 | Tier 19 |
| `14_redux_state_management.md` | 485 | 8 | Tier 22 |
| `16_graphql_i18n.md` | 612 | 12 | (Elective) |
| `18_nextjs_universal.md` | 845 | 10 | (Elective) |
| `21_react_native.md` | 598 | 10 | (Elective) |
