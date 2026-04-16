# 📘 TUẦN 0 - BÀI 04
# **LỰA CHỌN CÔNG NGHỆ — Đừng Dùng Dao Mổ Trâu Giết Gà**

## 🎬 "Dùng Microservices Cho Todo App" — Khi Over-Engineering Giết Dự Án

*Sinh viên khoa IT: "Em dùng Kubernetes + Docker + Redis + Kafka + GraphQL cho app Todo List!"*

*Anh Hùng: "Todo App chỉ cần HTML + CSS + JS + localStorage. Em vừa dùng dao mổ trâu để gọt táo. Deploy mất 3 tuần, app chỉ cần 3 ngày."*

> **Chị Hà:** *"Tại startup cũ, CTO chọn Microservices cho team 2 người. Kết quả: 6 tháng chưa có sản phẩm. Đổi về Monolith → ship trong 6 tuần. Không có công nghệ 'tốt nhất'. Chỉ có công nghệ 'phù hợp nhất'."*

---

## 🎯 Mục tiêu
- Quy trình chọn tech stack 5 bước
- Decision matrix — so sánh có điểm số
- Best practices và anti-patterns

---

## 📋 5 Bước Chọn Công Nghệ

### Bước 1: Phân tích yêu cầu

```
Dự án: Todo App (BTL CSE391)
→ Quy mô: NHỎ (1-3 trang)
→ Team: 1-2 người
→ Thời gian: 4 tuần
→ Performance: Không cần cao
→ SEO: Không cần
```

### Bước 2: Xác định constraints

```
✅ Sinh viên đang học → chọn công nghệ DỄ HỌC
✅ 4 tuần → chọn công nghệ BUILD NHANH
✅ 1-2 người → không cần structure phức tạp
❌ Không cần: Kubernetes, Redis, GraphQL
```

### Bước 3: Liệt kê options

| Option | Frontend | Backend | Database |
|---|---|---|---|
| A | HTML/CSS/JS | Không cần | localStorage |
| B | React | Node + Express | MongoDB |
| C | Vue.js | Django | PostgreSQL |

### Bước 4: Decision Matrix

| Tiêu chí | Trọng số | Option A | Option B | Option C |
|---|---|---|---|---|
| Dễ học | 30% | 5/5 | 3/5 | 4/5 |
| Build nhanh | 30% | 5/5 | 2/5 | 3/5 |
| Team size phù hợp | 20% | 5/5 | 3/5 | 3/5 |
| Skills hiện có | 20% | 5/5 | 2/5 | 2/5 |
| **Tổng** | | **5.0** | **2.6** | **3.1** |

### Bước 5: Quyết định

**→ Option A: HTML/CSS/JS + localStorage** cho Todo App BTL!

> 💡 **Nguyên tắc:** Start simple. Scale up khi CẦN, không phải khi MUỐN.

---

## 🏢 3 Ví dụ Real-world

### 1. Blog cá nhân → Next.js + Tailwind + Markdown + Vercel

```
Lý do: SEO quan trọng (SSR), design linh hoạt (Tailwind), 
miễn phí deploy (Vercel), nội dung dễ viết (Markdown)
```

### 2. E-commerce → React + Node.js + PostgreSQL + AWS

```
Lý do: Ecosystem lớn (React), real-time cần (Node), 
transactions an toàn (PostgreSQL), scale được (AWS)
```

### 3. Startup MVP → Vue.js + Django + PostgreSQL + Railway

```
Lý do: Học nhanh (Vue), admin sẵn (Django), 
reliable (PostgreSQL), deploy rẻ (Railway)
```

---

## ❌ Anti-patterns — SAI LẦM phổ biến

| Sai lầm | Ví dụ | Hậu quả |
|---|---|---|
| **Over-engineering** | Microservices cho Todo App | 6 tháng không ship |
| **Resume-driven** | Dùng Kubernetes vì muốn ghi CV | Deadline cháy |
| **Hype-driven** | Dùng Svelte vì "mới và cool" | Team không ai biết |
| **Under-engineering** | Excel làm database | Scale không nổi |

---

## ✅ Best Practices

1. **"Boring Technology"** — Dùng công nghệ ĐÃ CHỨNG MINH. React, Node, PostgreSQL = boring nhưng CHẠY
2. **Team-first** — Chọn công nghệ team ĐÃ BIẾT
3. **Start Monolith** — Monolith trước, micro-services khi CẦN
4. **Measure** — Đo lường trước khi tối ưu

---

## ➡️ Hoàn thành Tuần 0! 🎉

*Minh giờ hiểu: Web Development là gì, có những nhánh nào, xu hướng ra sao, và cách chọn công nghệ.*

*"Giờ em bắt đầu CODE," Minh nói.*

*"HTML đầu tiên," anh Hùng gật. "Mọi trang web trên thế giới — từ Google đến Facebook — đều bắt đầu từ `<!DOCTYPE html>`."*

**→ [TUẦN 1: HTML5 Fundamentals](../tuan_1_html5/01_introduction_html_universe.md) — Dòng code đầu tiên!**
