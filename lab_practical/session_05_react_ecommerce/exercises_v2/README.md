# React E-commerce Exercises v2 — Học React nâng cao không bị sốc

> **Cập nhật:** Tháng 5, 2026  
> **Mục đích:** Dẫn dắt sinh viên từ React cơ bản sang ứng dụng thực tế  
> **Tư tưởng:** Mỗi Tier chỉ MỘT khái niệm, từ đơn giản đến phức tạp

---

## 🎯 Tại sao cần v2?

Bộ exercises cũ có vấn đề:
- ❌ Nhảy thẳng vào React Router + Context API + API calls cùng lúc
- ❌ Yêu cầu hiểu global state trước khi quen useEffect
- ❌ Bài tập đầu tiên đã phức tạp (E-commerce với nhiều tính năng)

Bộ v2 được thiết kế lại:
- ✅ Bắt đầu từ useEffect đơn giản (Tier 0)
- ✅ Học fetch API trước, Context sau
- ✅ Từng bước một: useEffect → Fetch → Router → Cart → Context → E-commerce
- ✅ Mỗi Tier chỉ MỘT khái niệm

---

## 📚 Cấu trúc bài tập (8 Tiers)

```
exercises_v2/
├── TIER_0_useEffect.md        # useEffect cơ bản (side effects)
├── TIER_1_fetch_api.md        # Fetch API (lấy dữ liệu)
├── TIER_2_product_list.md     # Hiển thị danh sách sản phẩm
├── TIER_3_react_router.md     # React Router (chuyển trang)
├── TIER_4_cart_state.md       # Giỏ hàng với useState
├── TIER_5_props_drilling.md   # Vấn đề props drilling
├── TIER_6_context_api.md      # Context API (giải pháp)
├── TIER_7_ecommerce_app.md    # Mini Project: E-commerce
└── README.md                  # File này
```

---

## 🎓 Tiến trình học đề xuất

| Buổi | Tier | Thời gian | Nội dung |
|------|------|-----------|----------|
| 1 | Tier 0 | 20-25 phút | useEffect cơ bản |
| 2 | Tier 1 | 25-30 phút | Fetch API |
| 3 | Tier 2 | 25-30 phút | Hiển thị sản phẩm |
| 4 | Tier 3 | 25-30 phút | React Router |
| 5 | Tier 4 | 30-35 phút | Giỏ hàng (useState) |
| 6 | Tier 5 | 20-25 phút | Props Drilling Problem |
| 7 | Tier 6 | 30-40 phút | Context API |
| 8 | Tier 7 | 60-90 phút | E-commerce App |

**Tổng thời gian:** ~4-5 giờ (8 buổi học)

---

## 🔗 Kết nối với React Basics (Session 04)

| React Basics (Session 04) | React E-commerce (Session 05) | Mối liên hệ |
|---------------------------|------------------------------|-------------|
| Tier 0: Component | Tier 2: Product List | Component hiển thị sản phẩm |
| Tier 1: React Flow | Tier 0: useEffect | Side effects là gì? |
| Tier 2: JSX Variables | Tier 2: Product List | Hiển thị dữ liệu |
| Tier 3: Component Split | Tier 7: E-commerce | Chia component |
| Tier 4: useState | Tier 4: Cart State | Quản lý state |
| Tier 5: Events | Tier 4: Cart State | Xử lý click |
| Tier 6: Lists & CRUD | Tier 4: Cart State | CRUD giỏ hàng |
| Tier 7: Todo App | Tier 7: E-commerce | Mini project |

---

## 📝 Cách sử dụng

### Cho giảng viên
1. Đảm bảo sinh viên đã hoàn thành React Basics (Session 04)
2. Dạy theo thứ tự Tier 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
3. Mỗi Tier có "Thử thách" để sinh viên tự làm
4. Tier 7 là mini project — cho sinh viên tự code trước khi xem lời giải

### Cho sinh viên
1. Đọc phần "Bối cảnh" để hiểu ngữ cảnh
2. Chạy code mẫu trên máy
3. Làm thử thách
4. Tự đánh giá bằng checklist

---

## 🎯 Mini Project: E-commerce App (Tier 7)

E-commerce App là "bài kiểm tra" cuối cùng — yêu cầu:
- useEffect + fetch API
- React Router (chuyển trang)
- Context API (chia sẻ state)
- Shopping Cart logic
- localStorage

**Sau khi hoàn thành Tier 7, sinh viên đã sẵn sàng học:**
- Authentication (đăng nhập)
- Payment integration
- Performance optimization
- Testing

---

## ✅ Checklist cho giảng viên

- [ ] Sinh viên đã hoàn thành React Basics (Session 04)
- [ ] Dạy theo đúng thứ tự (không nhảy cóc)
- [ ] Mỗi Tier có thể dạy trong 1-2 tiết
- [ ] Cho sinh viên tự làm "Thử thách" trước khi xem lời giải
- [ ] Tier 7 là mini project — đánh giá cuối khóa

---

**Liên hệ:** FIT - Đại học Thủy Lợi
