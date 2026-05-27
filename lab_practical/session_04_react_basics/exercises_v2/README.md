# React Basics Exercises v2 — Học React không bị sốc

> **Cập nhật:** Tháng 5, 2026  
> **Mục đích:** Dẫn dắt sinh viên từ JavaScript thuần sang React một cách tự nhiên

---

## 🎯 Tại sao cần v2?

Bộ exercises cũ có vấn đề:
- ❌ Nhảy thẳng vào useState + Props + Component extraction cùng lúc
- ❌ Yêu cầu hiểu state management trước khi quen cú pháp JSX
- ❌ Bài tập đầu tiên đã phức tạp (Portfolio với nhiều component)

Bộ v2 được thiết kế lại:
- ✅ Bắt đầu bằng so sánh Vanilla JS vs React (Kết nối Tier 7 JavaScript)
- ✅ Học JSX trước, useState sau
- ✅ Từng bước một: Setup → JSX → useState → Lists → Todo App
- ✅ Mỗi Tier có code mẫu + thử thách đơn giản

---

## 📚 Cấu trúc bài tập

```
exercises_v2/
├── TIER_1_why_react.md        # Tại sao cần React? (So sánh Vanilla vs React)
├── TIER_2_setup_jsx.md        # Cài đặt React, hiểu JSX
├── TIER_3_useState_basics.md  # useState cơ bản (đếm số, input, toggle)
├── TIER_4_lists_events.md     # Render list, thêm/xóa/sửa phần tử
├── TIER_5_todo_app.md         # Mini Project: Todo App hoàn chỉnh
└── README.md                  # File này
```

---

## 🎓 Tiến trình học đề xuất

| Buổi | Tier | Thời gian | Nội dung |
|------|------|-----------|----------|
| 1 | Tier 1 | 25-30 phút | Tại sao cần React? |
| 2 | Tier 2 | 30-40 phút | Setup & JSX |
| 3 | Tier 3 | 35-45 phút | useState |
| 4 | Tier 4 | 40-50 phút | Lists & Events |
| 5 | Tier 5 | 45-60 phút | Todo App |

**Tổng thời gian:** ~3 giờ (5 buổi học)

---

## 🔗 Kết nối với JavaScript Exercises

| JavaScript (exercises_v2) | React (exercises_v2) | Mối liên hệ |
|---------------------------|----------------------|-------------|
| Tier 1: Biến & Toán tử | Tier 2: JSX | JSX dùng biến JavaScript |
| Tier 2: Điều kiện & Vòng lặp | Tier 4: Lists | `.map()` trong JSX |
| Tier 3: Functions | Tier 3: useState | Arrow functions, callbacks |
| Tier 4: Arrays & Objects | Tier 4: CRUD | Spread, filter, map |
| Tier 5: DOM cơ bản | Tier 1: Why React | So sánh DOM vs React |
| Tier 6: Events | Tier 4: Events | onClick, onChange |
| Tier 7: Notes App | Tier 5: Todo App | Cùng logic, khác cách viết |

---

## 📝 Cách sử dụng

### Cho giảng viên
1. Đảm bảo sinh viên đã hoàn thành JavaScript Tier 1-6
2. Dạy theo thứ tự Tier 1 → 2 → 3 → 4 → 5
3. Mỗi Tier có "Thử thách" để sinh viên tự làm
4. Tier 5 là mini project — cho sinh viên tự code trước khi xem lời giải

### Cho sinh viên
1. Đọc phần "Bối cảnh" để hiểu ngữ cảnh
2. Chạy code mẫu trên máy
3. Làm thử thách
4. Tự đánh giá bằng checklist

---

## 🎯 Mini Project: Todo App (Tier 5)

Todo App là "bài kiểm tra" cuối cùng — yêu cầu:
- useState (state management)
- Render list với key
- Event handling (onClick, onChange, onKeyPress)
- Conditional rendering
- Filter logic

**Sau khi hoàn thành Tier 5, sinh viên đã sẵn sàng học:**
- useEffect (side effects)
- Component composition
- Props drilling
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
