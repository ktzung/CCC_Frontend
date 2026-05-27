# React Basics Exercises v2 — Học React không bị sốc

> **Cập nhật:** Tháng 5, 2026  
> **Mục đích:** Dẫn dắt sinh viên từ JavaScript thuần sang React một cách tự nhiên  
> **Tư tưởng:** Mỗi Tier chỉ MỘT khái niệm, từ đơn giản đến phức tạp

---

## 🎯 Tại sao cần v2?

Bộ exercises cũ có vấn đề:
- ❌ Nhảy thẳng vào useState + Props + Component extraction cùng lúc
- ❌ Yêu cầu hiểu state management trước khi quen cú pháp JSX
- ❌ Bài tập đầu tiên đã phức tạp (Portfolio với nhiều component)

Bộ v2 được thiết kế lại:
- ✅ Bắt đầu từ component đơn giản nhất (Tier 0)
- ✅ Học JSX trước, useState sau
- ✅ Từng bước một: Component → JSX → Variables → Split → useState → Events → CRUD → Todo
- ✅ Mỗi Tier chỉ MỘT khái niệm

---

## 📚 Cấu trúc bài tập (8 Tiers)

```
exercises_v2/
├── TIER_0_first_component.md   # Component đầu tiên (làm quen cú pháp)
├── TIER_1_react_flow.md        # Luồng hoạt động (mount, re-render)
├── TIER_2_jsx_variables.md     # Biến trong JSX ({}, conditional, list)
├── TIER_3_component_split.md   # Chia component (tư duy tổ chức UI)
├── TIER_4_useState_basics.md   # useState (number, string, boolean)
├── TIER_5_events_basics.md     # Events (click, input, keyboard, form)
├── TIER_6_lists_crud.md        # Lists & CRUD (thêm, sửa, xóa)
├── TIER_7_todo_app.md          # Mini Project: Todo App
└── README.md                   # File này
```

---

## 🎓 Tiến trình học đề xuất

| Buổi | Tier | Thời gian | Nội dung |
|------|------|-----------|----------|
| 1 | Tier 0 | 15-20 phút | Component đầu tiên |
| 2 | Tier 1 | 20-25 phút | Luồng hoạt động |
| 3 | Tier 2 | 20-25 phút | Biến trong JSX |
| 4 | Tier 3 | 25-35 phút | Chia component |
| 5 | Tier 4 | 30-40 phút | useState |
| 6 | Tier 5 | 25-35 phút | Events |
| 7 | Tier 6 | 40-50 phút | Lists & CRUD |
| 8 | Tier 7 | 45-60 phút | Todo App |

**Tổng thời gian:** ~4 giờ (8 buổi học)

---

## 🔗 Kết nối với JavaScript Exercises

| JavaScript (exercises_v2) | React (exercises_v2) | Mối liên hệ |
|---------------------------|----------------------|-------------|
| Tier 1: Biến & Toán tử | Tier 2: JSX Variables | JSX dùng biến JavaScript |
| Tier 2: Điều kiện & Vòng lặp | Tier 2: Conditional | Ternary, && trong JSX |
| Tier 3: Functions | Tier 4: useState | Arrow functions, callbacks |
| Tier 4: Arrays & Objects | Tier 6: Lists & CRUD | Spread, filter, map |
| Tier 5: DOM cơ bản | Tier 0: First Component | Component thay thế DOM |
| Tier 6: Events | Tier 5: Events | onClick, onChange |
| Tier 7: Notes App | Tier 7: Todo App | Cùng logic, khác cách viết |

---

## 📝 Cách sử dụng

### Cho giảng viên
1. Đảm bảo sinh viên đã hoàn thành JavaScript Tier 1-6
2. Dạy theo thứ tự Tier 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
3. Mỗi Tier có "Thử thách" để sinh viên tự làm
4. Tier 7 là mini project — cho sinh viên tự code trước khi xem lời giải

### Cho sinh viên
1. Đọc phần "Bối cảnh" để hiểu ngữ cảnh
2. Chạy code mẫu trên máy
3. Làm thử thách
4. Tự đánh giá bằng checklist

---

## 🎯 Mini Project: Todo App (Tier 7)

Todo App là "bài kiểm tra" cuối cùng — yêu cầu:
- useState (state management)
- Render list với key
- Event handling (onClick, onChange, onKeyPress)
- Conditional rendering
- Filter logic
- Component splitting (TodoItem, TodoFilter)

**Sau khi hoàn thành Tier 7, sinh viên đã sẵn sàng học:**
- useEffect (side effects)
- Component lifecycle
- API calls
- Context API
- Context API

---

## ✅ Checklist cho giảng viên

- [ ] Sinh viên đã hoàn thành JavaScript exercises (Tier 1-6)
- [ ] Dạy theo đúng thứ tự (không nhảy cóc)
- [ ] Mỗi Tier có thể dạy trong 1-2 tiết
- [ ] Cho sinh viên tự làm "Thử thách" trước khi xem lời giải
- [ ] Tier 5 là mini project — đánh giá cuối khóa

---

## 🔄 So sánh với exercises cũ

| Exercises cũ | Exercises v2 |
|-------------|--------------|
| 00_vanilla_vs_react.md | Tier 1 (tương đương) |
| 01_react_setup.md | Tier 2 (đơn giản hóa) |
| 05_jsx_basics.md | Tier 2 (gộp vào) |
| 02_state_props.md | Tier 3 (tách riêng useState) |
| 03_category_filter.md | Tier 4 (thêm CRUD trước) |
| 04_contact_form.md | **BỎ** (quá khó cho người mới) |
| 06_component_extraction.md | **BỎ** (để sau) |

---

**Liên hệ:** FIT - Đại học Thủy Lợi
