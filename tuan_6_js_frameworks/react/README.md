# ⚛️ REACT - JAVASCRIPT FRAMEWORK

React là một JavaScript library để xây dựng user interface, được phát triển bởi Facebook (Meta).

> **Thiết kế theo nguyên tắc:** Mỗi Tier chỉ dạy **MỘT khái niệm duy nhất**  
> **Xem chi tiết:** [`TIER_BASED_STRUCTURE.md`](./TIER_BASED_STRUCTURE.md)

---

## 📚 CẤU TRÚC TÀI LIỆU — 3 Modules × 8 Tiers

### Module A: React Foundations (Tier 0-7) — ~4 giờ
> Dành cho người mới bắt đầu. Đã có sẵn trong `lab_practical/session_04_react_basics/exercises_v2/`

| Tier | Khái niệm | Thời gian |
|------|-----------|-----------|
| 0 | Component đầu tiên (JSX cơ bản) | 15-20' |
| 1 | Luồng hoạt động (render, re-render) | 20-25' |
| 2 | Biến trong JSX ({}, conditional, list) | 20-25' |
| 3 | Chia component (import/export) | 25-35' |
| 4 | useState cơ bản (number, string, boolean) | 30-40' |
| 5 | Events (click, input, keyboard) | 25-35' |
| 6 | Lists & CRUD (map, filter, thêm/sửa/xóa) | 40-50' |
| 7 | Mini Project: Todo App | 45-60' |

### Module B: React Intermediate (Tier 8-15) — ~5 giờ
> Nâng cấp từ cơ bản. Mỗi Tier = 1 concept.

| Tier | Khái niệm | Thời gian | Nguồn cũ |
|------|-----------|-----------|----------|
| 8 | Props nâng cao (destructure, default, children) | 25-30' | `02_basic_principles.md` |
| 9 | State patterns (object, array, functional update) | 30-35' | `02_react_fundamentals.md` |
| 10 | useEffect cơ bản (side effects, dependencies) | 30-35' | `04_behind_the_scenes.md` |
| 11 | useEffect nâng cao (cleanup, fetching, debounce) | 35-40' | `04_behind_the_scenes.md` |
| 12 | useRef (DOM access, persist values) | 25-30' | `06_hooks_api.md` |
| 13 | Context API (prop drilling, Provider, useContext) | 30-35' | `04_behind_the_scenes.md` |
| 14 | Forms nâng cao (controlled, validation) | 30-35' | `10_forms_react.md` |
| 15 | Styling React (CSS Modules, inline, styled) | 25-30' | `08_styling_react.md` |

### Module C: React Advanced (Tier 16-23) — ~5 giờ
> Chuyên sâu. Mỗi Tier = 1 concept.

| Tier | Khái niệm | Thời gian | Nguồn cũ |
|------|-----------|-----------|----------|
| 16 | useReducer (reducer pattern, dispatch) | 35-40' | `06_hooks_api.md` |
| 17 | Custom hooks (tái sử dụng logic) | 30-35' | `06_hooks_api.md` |
| 18 | Performance (useMemo, useCallback, memo) | 30-35' | `06_hooks_api.md` |
| 19 | React Router (routes, params, nested) | 35-40' | `12_react_router.md` |
| 20 | State management (Redux cơ bản) | 40-45' | `14_redux_state_management.md` |
| 21 | TypeScript + React (type props, state) | 30-35' | `07_typescript_react.md` |
| 22 | Testing cơ bản (Jest, RTL) | 30-35' | `09_testing_react.md` |
| 23 | Capstone: Ứng dụng hoàn chỉnh | 60-90' | Tổng hợp |

---

## 📂 Cấu trúc thư mục

```
react/
├── README.md                   ← File này
├── TIER_BASED_STRUCTURE.md     ← Bản thiết kế Tier
│
├── lessons/                    ← [MỚI] Lý thuyết theo Tier (0-23)
│
├── 01_spa_architecture/        ← Bài cũ: SPA, Virtual DOM
├── 02_getting_started/         ← Bài cũ: Setup, JSX, Components, Props, State
├── 03_hooks/                   ← Bài cũ: Lifecycle, useEffect, useRef, Context
├── 04_ecosystem/               ← Bài cũ: TypeScript, Styling, Testing, Forms
├── 05_routing_state/           ← Bài cũ: Router, Redux, UI Libraries
├── 06_advanced_patterns/       ← Bài cũ: GraphQL, Next.js, React Native
│
├── module_b_intermediate/      ← Exercises Tier 8-15
└── [CŨ] Các thư mục cũ giữ làm reference
```

---

## 🎯 LỘ TRÌNH HỌC

| Tuần | Module | Nội dung |
|------|--------|----------|
| 1-2 | A | Tier 0-3: Component, JSX, Props cơ bản |
| 3-4 | A | Tier 4-7: useState, Events, Lists, Todo App |
| 5-6 | B | Tier 8-11: Props nâng cao, State patterns, useEffect |
| 7-8 | B | Tier 12-15: useRef, Context, Forms, Styling |
| 9-10 | C | Tier 16-19: useReducer, Custom hooks, Performance, Router |
| 11-12 | C | Tier 20-23: Redux, TypeScript, Testing, Capstone |

---

## 📖 TÀI LIỆU THAM KHẢO

- [React Official Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Redux](https://redux.js.org)
- [Next.js](https://nextjs.org)
