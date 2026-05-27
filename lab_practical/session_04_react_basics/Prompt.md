# Prompt: Thiết kế bài tập theo Tier — Mỗi Tier MỘT khái niệm

> **Mục đích:** Template prompt để áp dụng cho bất kỳ môn học/lĩnh vực nào  
> **Tư tưởng:** Chia nhỏ kiến thức, học dần dần, không bị sốc  
> **Áp dụng:** Lập trình, thiết kế, toán học, bất kỳ kỹ năng mới nào

---

## 🎯 Prompt chính

```
Bạn là chuyên gia thiết kế bài tập cho người mới bắt đầu.

NHIỆM VỤ: Thiết kế bộ bài tập cho môn [TÊN MÔN] với yêu cầu:

1. CHIA NHỎ: Mỗi Tier chỉ dạy MỘT khái niệm duy nhất
   - KHÔNG gộp nhiều khái niệm vào 1 bài
   - Mỗi Tier có thể hiểu độc lập (không cần biết Tier sau)
   - Độ khó tăng dần từ Tier 0 → Tier N

2. TIẾN TRÌNH HỌC:
   - Tier 0: Khái niệm cơ bản nhất, "hello world" của lĩnh vực
   - Tier 1-3: Nền tảng (hiểu bản chất)
   - Tier 4-6: Ứng dụng (làm được việc)
   - Tier 7+: Tổng hợp (dự án thực tế)

3. CẤU TRÚC MỖI TIER:
   - 🎯 Mục tiêu: Học được gì sau Tier này
   - ⏱️ Thời gian: Ước tính hoàn thành
   - 📋 Yêu cầu: Cần biết gì trước khi học
   - 📝 Code mẫu: Ví dụ đầy đủ, chạy được
   - 🧪 Thử thách: 3 bài tập nhỏ để thực hành
   - ✅ Checklist: Tự đánh giá

4. NGUYÊN TẮC THIẾT KẾ:
   - Bắt đầu từ "Tại sao cần?" trước "Làm thế nào?"
   - Mỗi bước chỉ giới thiệu MỘT biến số mới
   - Code mẫu phải chạy được ngay (copy-paste)
   - Thử thách từ dễ → trung bình → khó
   - Có kết nối với kiến thức trước đó

5. KIỂM TRA CHẤT LƯỢNG:
   - Sinh viên có thể tự học không cần giảng viên?
   - Mỗi Tier có thể hoàn thành trong 1 tiết học?
   - Có bị "sốc" khi chuyển từ Tier N sang Tier N+1?
```

---

## 📚 Ví dụ áp dụng: React Basics

### Input
```
Áp dụng prompt trên cho: React Basics (Session 04)
Đối tượng: Sinh viên năm 2, đã biết HTML/CSS/JS cơ bản
Thời gian: 8 buổi học (mỗi buổi 45 phút)
```

### Output
```
Tier 0: Component đầu tiên (15-20 phút)
   → Khái niệm: JSX là gì? Viết component đơn giản
   → Không cần biết: useState, events, props

Tier 1: Luồng hoạt động (20-25 phút)
   → Khái niệm: Component render như thế nào? setState là gì?
   → Không cần biết: Props, conditional rendering

Tier 2: Biến trong JSX (20-25 phút)
   → Khái niệm: Đưa dữ liệu vào JSX ({}, conditional, list)
   → Không cần biết: useState, events

Tier 3: Chia component (25-35 phút)
   → Khái niệm: Tại sao phải chia? Props là gì?
   → Không cần biết: State management

Tier 4: useState (30-40 phút)
   → Khái niệm: Quản lý state (number, string, boolean)
   → Không cần biết: Lists, CRUD

Tier 5: Events (25-35 phút)
   → Khái niệm: Xử lý click, input, keyboard
   → Không cần biết: Lists

Tier 6: Lists & CRUD (40-50 phút)
   → Khái niệm: Quản lý danh sách (thêm, sửa, xóa)
   → Không cần biết: Component splitting

Tier 7: Todo App (45-60 phút)
   → Tổng hợp tất cả kiến thức
```

---

## 🔄 Áp dụng cho môn khác

### Ví dụ 1: Python cơ bản
```
Tier 0: Hello World (print, chạy file)
Tier 1: Biến & Kiểu dữ liệu (int, str, bool)
Tier 2: Toán tử (+, -, ==, and, or)
Tier 3: Điều kiện (if/elif/else)
Tier 4: Vòng lặp (for, while)
Tier 5: Functions (def, return)
Tier 6: Lists & Dicts
Tier 7: Mini project (máy tính đơn giản)
```

### Ví dụ 2: SQL cơ bản
```
Tier 0: SELECT cơ bản (lấy dữ liệu)
Tier 1: WHERE (lọc dữ liệu)
Tier 2: ORDER BY (sắp xếp)
Tier 3: JOIN (ghép bảng)
Tier 4: GROUP BY (nhóm dữ liệu)
Tier 5: Subquery (truy vấn lồng)
Tier 6: INSERT/UPDATE/DELETE
Tier 7: Mini project (quản lý sinh viên)
```

### Ví dụ 3: CSS Layout
```
Tier 0: Box Model (margin, padding, border)
Tier 1: Display (block, inline, inline-block)
Tier 2: Position (static, relative, absolute, fixed)
Tier 3: Flexbox cơ bản (justify, align)
Tier 4: Flexbox nâng cao (wrap, gap, order)
Tier 5: Grid cơ bản (grid-template)
Tier 6: Grid nâng cao (grid-area, responsive)
Tier 7: Mini project (trang portfolio)
```

---

## ✅ Checklist kiểm tra chất lượng

Khi thiết kế xong, kiểm tra:

- [ ] Mỗi Tier chỉ có MỘT khái niệm chính?
- [ ] Tier 0 đủ đơn giản cho người chưa biết gì?
- [ ] Mỗi Tier có thể hiểu độc lập?
- [ ] Độ khó tăng dần, không có bước nhảy quá lớn?
- [ ] Code mẫu chạy được ngay?
- [ ] Có thử thách để thực hành?
- [ ] Có checklist tự đánh giá?
- [ ] Thời gian mỗi Tier ≤ 1 tiết học (45 phút)?

---

## 🎯 Lợi ích của cách tiếp cận này

### Cho sinh viên
- ✅ Không bị sốc khi học khái niệm mới
- ✅ Tự tin hơn khi hoàn thành từng Tier
- ✅ Có thể tự học theo tốc độ riêng
- ✅ Dễ xác định điểm yếu (Tier nào chưa hiểu?)

### Cho giảng viên
- ✅ Dễ đánh giá tiến độ sinh viên
- ✅ Dễ điều chỉnh nội dung giảng dạy
- ✅ Có thể giao bài tập theo Tier
- ✅ Dễ tái sử dụng cho các khóa sau

---

## 📝 Cách sử dụng Prompt

1. **Copy prompt chính** (phần trên)
2. **Thay [TÊN MÔN]** bằng môn học cần thiết kế
3. **Chạy prompt** với AI
4. **Kiểm tra kết quả** bằng checklist
5. **Điều chỉnh** nếu cần

---

**Ngày tạo:** Tháng 5, 2026  
**Áp dụng lần đầu:** CSE391 - React Basics (Session 04)  
**Kết quả:** 8 Tiers, mỗi Tier 1 khái niệm, tổng ~4 giờ học
