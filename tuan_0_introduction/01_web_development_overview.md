# 📘 TUẦN 0 - BÀI 01
# **TỔNG QUAN VỀ PHÁT TRIỂN ỨNG DỤNG WEB**

## 🎬 "0.1 Giây Quyết Định $440 Tỷ" — Khi Web Là Tất Cả

*Năm 2023, Amazon phát hiện: mỗi **0.1 giây** trang web load chậm hơn → doanh thu giảm **1%**. Với $440 tỷ doanh thu/năm, 0.1 giây = $4.4 tỷ.*

*Facebook có **3 tỷ** người dùng mỗi tháng — tất cả qua web và web app.*

*Shopee xử lý **11 triệu đơn hàng** trong sự kiện 11.11 — toàn bộ qua web application.*

> **Anh Hùng:** *"Web Development không phải 'một nghề'. Đó là NỀN TẢNG của mọi thứ số. Mọi app, mọi dịch vụ, mọi startup — đều bắt đầu từ web."*

---

## 🎯 Mục tiêu
- Hiểu Web Development là gì
- Phân biệt Website vs Web Application
- Biết các vai trò: Frontend, Backend, Full-stack
- Có roadmap học tập rõ ràng

---

## 🌐 Web Development = Xây dựng mọi thứ trên Internet

| Bạn dùng hàng ngày | Đó là sản phẩm Web Dev |
|---|---|
| Google, Facebook, YouTube | Frontend + Backend |
| Mua hàng Shopee, Tiki | E-commerce Web App |
| Xem phim Netflix | Streaming Web App |
| Dùng ChatGPT | AI Web Application |
| VS Code (trình duyệt) | Desktop app viết bằng Web tech |

---

## 📖 Lịch sử Web — 30 năm trong 30 giây

| Giai đoạn | Năm | Đặc điểm | Ví dụ |
|---|---|---|---|
| **Web 1.0** | 1990s | Static HTML, chỉ đọc | Trang giới thiệu công ty |
| **Web 2.0** | 2000s | Dynamic, user tạo nội dung | Facebook, YouTube, Wikipedia |
| **Web 3.0** | 2010s | SPA, Mobile-first, Real-time | Gmail, Spotify, Slack |
| **Web 4.0** | 2020s+ | AI, Voice, AR/VR, Blockchain | ChatGPT, Metaverse |

---

## 🔑 Website vs Web Application — Phân biệt quan trọng nhất

### Website = "Tờ báo số" — Chủ yếu ĐỌC

```
Portfolio, Blog, Landing page, Trang giới thiệu công ty
→ Ít tương tác, ít database, HTML/CSS là chính
```

### Web Application = "Phần mềm trên trình duyệt" — TƯƠNG TÁC

```
Gmail, Facebook, Shopee, Google Docs, Banking app
→ Nhiều tương tác, database phức tạp, cần framework
```

| Tiêu chí | Website | Web Application |
|---|---|---|
| **Mục đích** | Hiển thị thông tin | Xử lý tác vụ, dữ liệu |
| **Tương tác** | Ít (đọc) | Nhiều (CRUD operations) |
| **Database** | Không/Đơn giản | Phức tạp |
| **Authentication** | Thường không | Bắt buộc (login) |
| **Ví dụ** | Blog, Portfolio | Gmail, Shopee, ChatGPT |

> 💡 **BTL CSE391** của bạn là gì? Todo App có form, có data, có CRUD → đó là **Web Application**!

---

## 👨‍💻 Vai trò trong Web Development

```
                    ┌─────────────┐
                    │  Full-stack  │
                    └──────┬──────┘
              ┌────────────┴────────────┐
        ┌─────┴─────┐            ┌──────┴──────┐
        │ Frontend  │            │  Backend    │
        │ (UI/UX)   │            │ (Logic/DB)  │
        └───────────┘            └─────────────┘
   HTML, CSS, JS, React      Node.js, Python, Database
```

| Vai trò | Làm gì | Lương (VN) |
|---|---|---|
| **Frontend** | Giao diện, trải nghiệm người dùng | 8-40+ tr/tháng |
| **Backend** | Server, database, API, security | 10-50+ tr/tháng |
| **Full-stack** | Cả hai | 12-60+ tr/tháng |
| **DevOps** | Deploy, CI/CD, infrastructure | 15-50+ tr/tháng |

> **Chị Hà:** *"Fresher biết cả Frontend lẫn Backend thì có lợi thế cực lớn khi phỏng vấn. Không cần giỏi cả hai — nhưng HIỂU cả hai."*

---

## 🗺️ Roadmap môn học CSE391

```
Tuần 0: Tổng quan ← BẠN ĐANG Ở ĐÂY
  ↓
Tuần 1: HTML5 — Cấu trúc trang web
  ↓
Tuần 2: CSS Core — Style & Layout  
  ↓
Tuần 3: CSS Advanced — Responsive, Animations, SCSS
  ↓
Tuần 4: JavaScript — Logic, DOM, Events
  ↓
Tuần 5: JS Advanced — Async, API, Professional workflow
  ↓
Tuần 6: Frameworks — React/Vue (giới thiệu)
  ↓
📦 BTL: Todo App / E-commerce hoàn chỉnh
```

---

## ➡️ Chương tiếp theo...

*Minh nhìn roadmap: "6 tuần đạt từ zero đến deploy web app? Có bao nhiêu công nghệ cần học?"*

*"Đừng lo," anh Hùng nói. "Bắt đầu từ HTML — ngôn ngữ mà TẤT CẢ web developer trên thế giới đều biết."*

**→ [Tuần 1: HTML5](../tuan_1_html5/01_introduction_html_universe.md) — Dòng code `<!DOCTYPE html>` đầu tiên.**
