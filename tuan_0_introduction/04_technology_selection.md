# 📘 TUẦN 0 - BÀI 04
# **LỰA CHỌN CÔNG NGHỆ — Quy Trình 5 Bước**

---

## 0. 🎬 Opening Hook

*Năm 2022, một startup Hà Nội thuê 3 developer để xây app quản lý lịch hẹn cho phòng khám.*

*CTO quyết định: "Dùng Microservices + Kubernetes + Redis + GraphQL cho modern và scalable."*

*Kết quả sau 5 tháng: không có sản phẩm, hết tiền, team tan rã.*

*Một startup khác, cùng bài toán: dùng **Django + React + PostgreSQL + Railway**. Ship sau **6 tuần**. Hiện có 200 phòng khám đang dùng.*

**Công nghệ tốt nhất không phải là mới nhất. Là thứ giúp bạn ship được sản phẩm.**

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Chọn sai tech stack có thể:
- **Giết deadline** — mất thời gian học thay vì làm sản phẩm
- **Giết team** — không ai biết công nghệ đó, không ai review được code
- **Giết dự án** — over-engineer, không bao giờ ship

Chọn đúng tech stack = **giải quyết bài toán thật**, không phải flex công nghệ.

---

## 2. 🌐 Big Picture — Khung tư duy

Mỗi quyết định công nghệ phải trả lời **4 câu hỏi**:

```
┌────────────────────────────────────────────┐
│  1. Project cần gì?    (Requirements)      │
│  2. Ai làm?            (Team Skills)       │
│  3. Có bao nhiêu thời gian? (Constraints)  │
│  4. Scale lên thế nào? (Future needs)      │
└────────────────────────────────────────────┘
              ↓
     Công nghệ phù hợp = giao điểm của 4 câu trả lời
```

---

## 3. ⚙️ Core Technical Truth — Quy trình 5 bước

### Bước 1: Phân tích yêu cầu

Xác định **loại sản phẩm** trước khi nghĩ đến công nghệ:

| Loại | Đặc điểm | Ví dụ |
|---|---|---|
| **Prototype / MVP** | Ship nhanh, validate idea | Todo App, Landing page |
| **Internal Tool** | Dùng nội bộ, ít user | Dashboard quản lý |
| **Consumer App** | Nhiều user, cần UX tốt | E-commerce, Social |
| **Enterprise** | Bảo mật cao, audit trail | Banking, Healthcare |

---

### Bước 2: Xác định constraints

```
Constraints thật sự (không phải mong muốn):

✅ Thời gian: bao nhiêu tuần/tháng?
✅ Team: mấy người? Skills hiện tại là gì?
✅ Budget: dùng free tier hay có ngân sách server?
✅ Maintenance: sau khi ship, ai maintain?
```

---

### Bước 3: Liệt kê options

Đừng chỉ nghĩ đến 1 option. Luôn có ít nhất 3:

| Option | Frontend | Backend | Database | Độ phức tạp |
|---|---|---|---|---|
| A (Minimal) | HTML/CSS/JS | Không cần | localStorage | ⭐ |
| B (Standard) | React | Node + Express | MongoDB | ⭐⭐⭐ |
| C (Full) | Vue.js | Django | PostgreSQL | ⭐⭐⭐⭐ |

---

### Bước 4: Decision Matrix — Chấm điểm có trọng số

| Tiêu chí | Trọng số | Option A | Option B | Option C |
|---|---|---|---|---|
| Dễ học/quen | 30% | 5.0 | 3.0 | 3.5 |
| Build nhanh | 30% | 5.0 | 2.5 | 3.0 |
| Phù hợp team size | 20% | 5.0 | 3.0 | 3.0 |
| Skills hiện có | 20% | 5.0 | 2.0 | 2.5 |
| **Tổng** | **100%** | **5.0** | **2.65** | **3.05** |

**→ Option A thắng cho BTL CSE391 (Todo App, 4 tuần, 1–2 người)**

---

### Bước 5: Quyết định và commit

> **Nguyên tắc quan trọng:** Một quyết định *đủ tốt* và **executed tốt** luôn thắng một quyết định *tối ưu* mà không bao giờ ship.

---

## 4. 🟢 Simplified Layer — Giải thích đơn giản

**Một câu nhớ mãi:**

> "Start simple. Scale khi CẦN, không phải khi MUỐN."

Analogy duy nhất cần nhớ:

> **Đừng dùng dao mổ trâu để gọt táo.**

Kubernetes dành cho Netflix (hàng triệu user). Không dành cho Todo App của sinh viên.

---

## 5. 🏭 Real-world Layer — 3 Case Study thực tế

### Case 1: Blog cá nhân

```
Yêu cầu: SEO tốt, viết bài dễ, deploy miễn phí
→ Chọn: Next.js + Markdown + Vercel
→ Lý do: SSR có sẵn (SEO), không cần backend, deploy 0 đồng
```

### Case 2: E-commerce

```
Yêu cầu: Cart, payment, user accounts, 1000+ sản phẩm
→ Chọn: React + Node.js (Express) + PostgreSQL + Stripe
→ Lý do: React ecosystem, SQL an toàn cho transaction, Stripe tiêu chuẩn
```

### Case 3: Startup MVP (4 tuần, team 2 người)

```
Yêu cầu: Validate idea nhanh, cả hai biết JS
→ Chọn: Vue.js + NestJS + MongoDB Atlas + Railway
→ Lý do: Vue học nhanh, NestJS structured, Atlas free tier, Railway rẻ
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

**Bài tập: Áp dụng Decision Matrix cho BTL của bạn**

BTL CSE391 yêu cầu: **Todo App** (thêm/sửa/xóa task, có deadline, có category).

Điền vào bảng sau:

| Tiêu chí | Trọng số | Option A: HTML/JS/localStorage | Option B: React + Node |
|---|---|---|---|
| Thời gian học | 30% | _ /5 | _ /5 |
| Build nhanh | 30% | _ /5 | _ /5 |
| Phù hợp kỹ năng hiện tại | 20% | _ /5 | _ /5 |
| Deploy đơn giản | 20% | _ /5 | _ /5 |
| **Tổng** | | | |

→ Dựa vào kết quả: bạn chọn Option nào? **Viết lý do trong 2 câu.**

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| "Dùng công nghệ mới nhất = professional nhất" | Professional = **ship được sản phẩm đúng deadline**, không phải dùng công nghệ mới nhất |
| "Microservices = scalable hơn Monolith" | Netflix bắt đầu bằng **Monolith**, sau 10 năm mới chuyển sang Microservices — khi thật sự cần |
| "Cần chọn công nghệ tốt nhất ngay từ đầu" | **Refactoring** là một kỹ năng. Start simple, refactor khi cần — đây là kỹ thuật đúng |
| "Resume-driven development là tốt" | Dùng Kubernetes để ghi CV → deadline cháy, sản phẩm không ra → CV cũng không có gì để ghi |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Decision Matrix là gì và tại sao cần dùng trọng số (weight)?
2. Tại sao **Team Skills** lại là một tiêu chí quan trọng trong chọn tech stack?
3. "Boring Technology" (dùng công nghệ đã được chứng minh) là chiến lược **tốt hay xấu**? Tại sao?

### Câu hỏi áp dụng:

4. Một nhóm 3 người cần xây **hệ thống đặt bàn nhà hàng** trong **3 tuần** (ai cũng biết Python). Họ nên chọn: **FastAPI + React** hay **Microservices + Kubernetes + GraphQL**? Giải thích bằng quy trình 5 bước.
5. Sau khi BTL xong, bạn muốn scale Todo App của mình lên để 1000 người dùng. Bước nào phải làm trước tiên — thêm database hay thêm server?

<details>
<summary>👁️ Xem đáp án</summary>

1. Decision Matrix là bảng so sánh các option theo nhiều tiêu chí với **trọng số khác nhau** — phản ánh mức độ quan trọng của từng tiêu chí trong ngữ cảnh cụ thể. Không có trọng số → tất cả tiêu chí được coi là bằng nhau → kết quả sai.
2. Công nghệ team không biết → phải học → mất thời gian → miss deadline. Team skill là **constraint thực tế**, không phải yếu tố phụ.
3. **Tốt** — Công nghệ "boring" (React, PostgreSQL, Linux) đã được chứng minh ở production thật, có cộng đồng lớn, nhiều tài liệu. Risk thấp hơn nhiều so với công nghệ mới chưa được test ở scale lớn.
4. **FastAPI + React**: Team biết Python → chọn FastAPI (giảm learning curve). 3 tuần → cần ship nhanh → Microservices sẽ tốn ít nhất 2 tuần chỉ để setup infrastructure.
5. **Thêm database trước** — localStorage không thể share giữa nhiều user. Migrate sang database (MongoDB Atlas free tier) là bước đầu tiên. Sau đó mới nghĩ đến scaling server.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Công nghệ tốt nhất = công nghệ phù hợp nhất** với yêu cầu, team, và thời gian — không phải mới nhất
2. **Quy trình 5 bước**: Phân tích yêu cầu → Constraints → Options → Decision Matrix → Commit
3. **Start simple**: Monolith trước, Microservices khi thật sự cần scale
4. **Anti-pattern nguy hiểm nhất**: Over-engineering và Resume-driven development
5. **Nguyên tắc vàng**: "Ship một sản phẩm với công nghệ đơn giản > không ship với công nghệ phức tạp"

---

## 10. ➡️ Next Lesson Bridge — Hoàn thành Tuần 0! 🎉

*Bạn vừa hoàn thành Tuần 0 — nền tảng tư duy của một Web Developer:*
- ✅ Hiểu web hoạt động như thế nào
- ✅ Biết các nhánh công nghệ và vai trò từng nhánh
- ✅ Nắm xu hướng 2025–2026
- ✅ Có quy trình chọn công nghệ đúng đắn

*Giờ đến lúc **viết code thật**.*

*Mọi website trên thế giới — từ Google đến Facebook — đều bắt đầu từ một dòng:*

```html
<!DOCTYPE html>
```

**→ [TUẦN 1: HTML5 Fundamentals](../tuan_1_html5/01_introduction_html_universe.md) — Dòng code đầu tiên của bạn.**
