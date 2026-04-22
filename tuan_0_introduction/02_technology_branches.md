# 📘 TUẦN 0 - BÀI 02
# **CÁC NHÁNH CÔNG NGHỆ — Chọn Con Đường Nào?**

---

## 0. 🎬 Opening Hook

*Một tin tuyển dụng thực tế từ Shopee năm 2024:*

> **"Frontend Engineer — $2,000–$4,000/tháng. Yêu cầu: HTML/CSS/JS, React, 1 năm kinh nghiệm."**

*Một tin tuyển dụng khác, cùng trang:*

> **"Backend Engineer — $2,500–$5,000/tháng. Yêu cầu: Node.js/Python, SQL, API design, 1 năm kinh nghiệm."*

*Câu hỏi thật sự không phải "nhánh nào lương cao hơn" — mà là: **bạn muốn xây cái gì?***

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Hiểu các nhánh công nghệ giúp bạn:
- **Không học lan man** — biết tập trung vào đâu
- **Đọc hiểu JD tuyển dụng** — Frontend/Backend/Full-stack yêu cầu gì
- **Cộng tác đúng cách** trong team dự án — ai làm gì, phụ thuộc vào nhau thế nào

---

## 2. 🌐 Big Picture — Bức tranh tổng thể

Mỗi web application có **hai phần** hoạt động song song:

```
┌──────────────────────────────────────────────────────┐
│                    WEB APPLICATION                   │
├─────────────────────────┬────────────────────────────┤
│       FRONTEND          │         BACKEND            │
│  (Người dùng thấy)      │  (Người dùng không thấy)  │
│                         │                            │
│  HTML / CSS / JS        │  Server + Database + API   │
│  React / Vue / Angular  │  Node.js / Python / Java   │
│                         │                            │
│  "Mặt tiền cửa hàng"    │  "Kho hàng + kế toán"     │
└─────────────────────────┴────────────────────────────┘
           ↑ Full-stack developer hiểu và làm cả hai ↑
```

Ngoài ra còn có **DevOps** — không xây tính năng, nhưng đảm bảo mọi thứ chạy được trên hạ tầng thực tế.

---

## 3. ⚙️ Core Technical Truth — Sự thật kỹ thuật

### 🎨 Frontend Engineer

**Chịu trách nhiệm:** Mọi thứ người dùng nhìn thấy và tương tác.

| Công nghệ | Mục đích |
|---|---|
| HTML | Cấu trúc trang (bộ xương) |
| CSS | Styling, layout, responsive |
| JavaScript | Logic tương tác, DOM manipulation |
| React / Vue / Angular | Framework — xây component-based UI |
| Bootstrap / Tailwind | CSS Framework — components có sẵn |

**Làm việc hàng ngày với:** Figma (nhận design), DevTools (debug), Git (version control), API (nhận data từ Backend).

---

### ⚙️ Backend Engineer

**Chịu trách nhiệm:** Server, database, API, business logic, security — tất cả những gì chạy "phía sau".

| Công nghệ | Mục đích |
|---|---|
| Node.js | JS phía server — cùng ngôn ngữ với FE |
| Python (Django, FastAPI) | Dễ học, tốt cho AI/ML integration |
| Java / Go | Enterprise, performance cao |
| MySQL / PostgreSQL | Relational database (dữ liệu có quan hệ) |
| MongoDB | NoSQL database (dữ liệu linh hoạt) |

**Làm việc hàng ngày với:** Database design, REST API, authentication (JWT), server deployment.

---

### 🔄 Full-stack Engineer

**Hiểu và làm được cả hai phần**, nhưng thường **chuyên sâu một**.

| Stack phổ biến | Frontend | Backend | Database |
|---|---|---|---|
| **MERN** | React | Express/Node.js | MongoDB |
| **MEAN** | Angular | Express/Node.js | MongoDB |
| **Django + React** | React | Django (Python) | PostgreSQL |

> ⚠️ **Quan trọng:** Full-stack không có nghĩa giỏi cả hai bằng nhau — mà là **đủ hiểu cả hai để tự làm được một sản phẩm hoàn chỉnh**.

---

### 🚀 DevOps Engineer

**Chịu trách nhiệm:** Đưa code từ máy developer lên server thật, tự động hóa quy trình.

```
Code → Build → Test → Deploy → Monitor → Feedback
           ↑ DevOps quản lý toàn bộ pipeline này ↑
```

Công cụ: Docker, Kubernetes, AWS/GCP, GitHub Actions, CI/CD pipelines.

---

## 4. 🟢 Simplified Layer — Giải thích đơn giản

Dùng một quán cà phê làm ví dụ:

| Nhánh | Tương đương trong quán cà phê |
|---|---|
| **Frontend** | Thiết kế nội thất, menu, trải nghiệm khách hàng |
| **Backend** | Kho nguyên liệu, quy trình pha chế, thu ngân |
| **Full-stack** | Người có thể làm cả hai |
| **DevOps** | Hệ thống mở cửa, điện nước, logistic |

---

## 5. 🏭 Real-world Layer

### So sánh thực tế

| | Frontend | Backend | Full-stack | DevOps |
|---|---|---|---|---|
| **Độ khó** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Thời gian học** | 6–12 tháng | 8–18 tháng | 12–24 tháng | 12–18 tháng |
| **Lương (VN, Fresher)** | 8–15 tr | 10–18 tr | 12–20 tr | 12–18 tr |
| **Lương (VN, Senior)** | 30–60+ tr | 35–70+ tr | 40–80+ tr | 40–70+ tr |
| **Thấy kết quả** | Ngay lập tức | Qua API/log | Cả hai | Qua metrics |

### Tại Shopee, VNG, FPT — một Sprint thực tế:
- **Frontend** nhận Figma design → implement UI → kết nối API
- **Backend** thiết kế API endpoint → viết business logic → bảo mật
- **DevOps** setup CI/CD → deploy lên staging → monitor production

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

**Bài tập: Đọc một JD tuyển dụng thật**

1. Vào [ITviec.com](https://itviec.com) hoặc [TopDev.vn](https://topdev.vn)
2. Tìm kiếm: "Frontend Developer Fresher" (hoặc Backend nếu bạn thích)
3. Đọc phần **"Yêu cầu"** — ghi lại:
   - Liệt kê tối đa 5 kỹ năng được nhắc nhiều nhất
   - Kỹ năng nào bạn **đã biết**? Kỹ năng nào **chưa biết**?
4. Vào phần **Roadmap CSE391** — kiểm tra xem môn học này cover được kỹ năng nào trong danh sách đó

→ Bài tập này giúp bạn **học có mục tiêu**, không học lạc hướng.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| "Frontend dễ hơn Backend" | Frontend có **Performance optimization, Accessibility, Cross-browser compatibility** — không hề dễ |
| "Full-stack = giỏi nhất" | Full-stack Senior hiếm. Fresher nên **chọn một nhánh để chuyên sâu** trước |
| "DevOps không cần biết code" | DevOps cần hiểu code để viết CI/CD scripts, infrastructure as code |
| "Học một framework là xong" | Framework thay đổi. **JS fundamentals** mới là thứ bạn dùng mãi |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Frontend và Backend khác nhau ở điểm gì cơ bản nhất?
2. Nếu một trang web có lỗi "không load được ảnh" — đây là lỗi Frontend hay Backend?
3. DevOps không phải là lập trình viên. **Đúng hay Sai?** Tại sao?

### Câu hỏi áp dụng:

4. Nhóm 3 người làm BTL Todo App — ai làm Frontend, ai làm Backend, ai làm cả hai? Dựa vào điều gì để phân công?
5. Shopee cần thêm tính năng "live chat với seller" — team nào phải tham gia: Frontend, Backend, hay cả hai? Tại sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Frontend** = những gì người dùng thấy và chạm vào. **Backend** = xử lý logic, lưu dữ liệu, bảo mật — người dùng không thấy trực tiếp.
2. Có thể **cả hai**: Frontend nếu URL ảnh sai hoặc CSS bị lỗi. Backend nếu file ảnh không tồn tại trên server.
3. **Sai** — DevOps cần viết script (Bash, Python, YAML), hiểu Docker, CI/CD config. Nhiều DevOps Engineer xuất phát từ Backend Developer.
4. Phân công dựa trên **kỹ năng hiện có** và **sở thích** — người thích UI làm Frontend, người thích logic/data làm Backend.
5. **Cả hai** — Frontend cần UI live chat (WebSocket), Backend cần xử lý message routing và lưu lịch sử chat.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Frontend** = HTML/CSS/JS + Framework — xây những gì người dùng thấy
2. **Backend** = Server + Database + API — xây những gì người dùng không thấy nhưng hoàn toàn phụ thuộc vào
3. **Full-stack** = hiểu và làm được cả hai — không phải giỏi cả hai bằng nhau
4. **DevOps** = đưa code lên production, tự động hóa quy trình — cần kỹ năng kỹ thuật thực sự
5. **Fresher nên chọn một nhánh** để học sâu — đừng cố ôm quá nhiều thứ cùng lúc

---

## 10. ➡️ Next Lesson Bridge

*Bạn đã biết các nhánh tồn tại. Nhưng trong mỗi nhánh, có hàng chục công nghệ và framework.*

*Câu hỏi tiếp theo: Năm 2025–2026, cái gì đang được dùng thực sự? Cái gì đang chết? Và bạn nên học cái nào?*

**→ [Bài 03: Xu hướng công nghệ 2025–2026](./03_current_trends.md) — React, Vue, Angular, hay Svelte?**
