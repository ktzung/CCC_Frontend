# Module B: React Intermediate — Tier 8-15

> **Nguyên tắc:** Mỗi Tier chỉ dạy **MỘT khái niệm duy nhất**  
> **Đối tượng:** Đã hoàn thành Module A (Tier 0-7)  
> **Tổng thời gian:** ~5 giờ (8 buổi × 35-40 phút)

---

## 📚 Danh sách Tiers

| Tier | Khái niệm | Thời gian | Trạng thái |
|------|-----------|-----------|------------|
| 8 | Props nâng cao (destructure, default, children) | 25-30' | ✅ |
| 9 | State patterns (object, array, functional update) | 30-35' | ✅ |
| 10 | useEffect cơ bản (side effects, dependencies) | 30-35' | ✅ |
| 11 | useEffect nâng cao (cleanup, fetching, debounce) | 35-40' | ⏳ |
| 12 | useRef (DOM access, persist values) | 25-30' | ⏳ |
| 13 | Context API (prop drilling, Provider, useContext) | 30-35' | ⏳ |
| 14 | Forms nâng cao (controlled, validation) | 30-35' | ⏳ |
| 15 | Styling React (CSS Modules, inline, styled) | 25-30' | ⏳ |

---

## 🎓 Tiến trình học đề xuất

| Buổi | Tier | Thời gian | Nội dung |
|------|------|-----------|----------|
| 9 | Tier 8 | 25-30 phút | Props nâng cao |
| 10 | Tier 9 | 30-35 phút | State patterns |
| 11 | Tier 10 | 30-35 phút | useEffect cơ bản |
| 12 | Tier 11 | 35-40 phút | useEffect nâng cao |
| 13 | Tier 12 | 25-30 phút | useRef |
| 14 | Tier 13 | 30-35 phút | Context API |
| 15 | Tier 14 | 30-35 phút | Forms nâng cao |
| 16 | Tier 15 | 25-30 phút | Styling React |

---

## 🔗 Dependency Graph

```
Tier 8 (Props Advanced) ←── Tier 3 (Component Split)
                         ←── Tier 4 (useState)
                              ↓
Tier 9 (State Patterns) ←── Tier 4 (useState)
                              ↓
Tier 10 (useEffect Basic) ←── Tier 9 (State Patterns)
                              ↓
Tier 11 (useEffect Advanced) ←── Tier 10 (useEffect Basic)
                              ↓
Tier 12 (useRef) ←────────── Tier 10 (useEffect Basic)
                              ↓
Tier 13 (Context API) ←──── Tier 8 (Props Advanced)
                              ↓
Tier 14 (Forms Advanced) ←── Tier 5 (Events)
                         ←── Tier 8 (Props Advanced)
                              ↓
Tier 15 (Styling) ←──────── Tier 3 (Component Split)
```

---

## 📖 Nguồn tài liệu cũ → Tier mới

| File cũ | Concepts | Chuyển thành |
|---------|----------|---------------|
| `02_basic_principles.md` | Props destructuring, children | Tier 8 |
| `02_react_fundamentals.md` | Object/array state, functional update | Tier 9 |
| `04_behind_the_scenes.md` | useEffect basic | Tier 10 |
| `04_behind_the_scenes.md` | useEffect cleanup, fetching | Tier 11 |
| `06_hooks_api.md` | useRef | Tier 12 |
| `04_behind_the_scenes.md` | Context API | Tier 13 |
| `10_forms_react.md` | Forms nâng cao | Tier 14 |
| `08_styling_react.md` | Styling approaches | Tier 15 |
