# 📘 TUẦN 0 - BÀI 03
# **XU HƯỚNG CÔNG NGHỆ 2025–2026**

---

## 0. 🎬 Opening Hook

*Khảo sát Stack Overflow 2025 với hơn 65,000 lập trình viên:*

- **#1 JavaScript** — 13 năm liên tiếp là ngôn ngữ phổ biến nhất
- **#1 Framework** — React (vẫn dẫn đầu với ~40% developer)
- **Fastest growing** — Svelte, Bun, Rust, HTMX

*Nhưng jQuery — từng là "thần thánh" năm 2012 — giờ còn không xuất hiện trong top 10.*

*Bài học: Công nghệ thay đổi. Nhưng **người biết lý do tại sao** thay đổi thì không bao giờ bị lạc hậu.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Biết xu hướng giúp bạn:
- **Chọn đúng thứ để học** — không lãng phí thời gian vào công nghệ đang chết
- **Đọc hiểu JD tuyển dụng** — hiểu tại sao công ty yêu cầu React, TypeScript, Vite
- **Tư duy đúng về tech stack** — không chạy theo hype, không sợ cái mới

---

## 2. 🌐 Big Picture — Bức tranh tổng thể

Web development hiện tại chia thành các lớp công nghệ:

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                        │
│  Framework: React ★ | Vue | Angular | Svelte            │
│  Language:  JavaScript → TypeScript (đang dịch chuyển)  │
│  Build:     Vite (thay Webpack) | SWC (thay Babel)      │
├─────────────────────────────────────────────────────────┤
│                   BACKEND LAYER                         │
│  Node.js (Express, NestJS) | Python (FastAPI, Django)   │
│  Go (Gin) | Bun (mới nổi, thay Node.js?)               │
├─────────────────────────────────────────────────────────┤
│                   INFRASTRUCTURE LAYER                  │
│  Cloud: AWS | GCP | Azure | Vercel | Railway            │
│  AI Integration: OpenAI API | Gemini | Local LLMs       │
└─────────────────────────────────────────────────────────┘
```

---

## 3. ⚙️ Core Technical Truth — Sự thật kỹ thuật

### 🎨 Frontend Frameworks — "The Big 4"

| Framework | Cha đẻ | Điểm mạnh | Thị phần job VN |
|---|---|---|---|
| **React** ⭐ | Meta | Ecosystem lớn, cộng đồng khổng lồ | ~65% |
| **Vue.js** | Evan You | Học nhanh, phù hợp team nhỏ | ~20% |
| **Angular** | Google | Enterprise, opinionated, TypeScript sẵn | ~10% |
| **Svelte** | Rich Harris | Performance, code ít hơn | ~5% (đang tăng) |

**Xu hướng quan trọng:**
- **TypeScript** đang trở thành **bắt buộc** — không còn là optional. Hơn 80% developer dùng TypeScript trong 2025.
- **Vite** thay thế Webpack — build nhanh hơn 10–100 lần. Mọi project mới đều dùng Vite.
- **React Server Components** — render trên server, giảm JS gửi về client. Đây là tương lai của React.
- **HTMX** — thư viện nhỏ cho phép tạo dynamic UI bằng HTML attributes, không cần viết JS. Đang nổi trong cộng đồng "return to simplicity".

---

### ⚙️ Backend — Node.js, Python, Go

| | Node.js | Python | Go |
|---|---|---|---|
| **Điểm mạnh** | Cùng JS với Frontend, non-blocking I/O | Dễ học, AI/ML ecosystem | Performance cực cao, concurrency |
| **Framework hot** | **NestJS** (chuẩn enterprise), Express (đơn giản) | **FastAPI** (bùng nổ), Django | Gin, Echo |
| **Dùng phổ biến** | Real-time app, API services | AI-powered app, Data pipeline | Microservices, High-load system |

> 📊 **FastAPI** (Python) tăng trưởng 300% trong 3 năm. Nhanh ngang Go, dễ viết như Python thường. Shopee dùng cho AI recommendation engine.

---

### ☁️ Cloud & AI — Không thể bỏ qua

| Xu hướng | Ý nghĩa thực tế | Ví dụ |
|---|---|---|
| **Serverless** | Không quản lý server, trả tiền theo usage | Vercel Functions, AWS Lambda |
| **Edge Computing** | Code chạy gần user → nhanh hơn | Cloudflare Workers |
| **AI Integration** | Gọi AI API vào web app của bạn | ChatGPT API, Gemini API |
| **WebAssembly** | Chạy code C/Rust/Go trực tiếp trên browser | Figma, Google Earth |

---

## 4. 🟢 Simplified Layer — Giải thích đơn giản

**Tại sao jQuery "chết"?**

jQuery giải quyết vấn đề của năm 2010: browser không tương thích nhau. Giờ tất cả browser đều support JavaScript hiện đại — jQuery không còn cần thiết.

**Tại sao React thống trị?**

React giải quyết vấn đề thực tế: UI phức tạp với nhiều state thay đổi. Component-based → code có thể tái sử dụng. Ecosystem lớn → mọi thứ đều có thư viện sẵn.

**Vòng đời một công nghệ:**
```
Hype (mới, mọi người nói) 
  → Adoption (công ty dùng thật)
  → Mature (stable, production-ready)
  → Decline (được thay thế)
  → Legacy (vẫn chạy nhưng không ai học mới)
```

---

## 5. 🏭 Real-world Layer

**Thực tế tại các công ty Việt Nam (2025–2026):**

| Công ty | Frontend | Backend | Cloud |
|---|---|---|---|
| **Shopee** | React, Vue.js | Node.js, Go, Java | AWS |
| **VNG (Zalo)** | React | Java, Go | Private cloud |
| **FPT Software** | Angular, React | Java, .NET, Node.js | AWS, Azure |
| **MoMo** | React Native, React | Node.js, Java | AWS |
| **Startup mới** | React + Vite | FastAPI hoặc NestJS | Vercel, Railway |

**Kết luận từ dữ liệu thực tế:**
- React = safe choice cho Frontend ở mọi quy mô
- Node.js + FastAPI = hai lựa chọn Backend phổ biến nhất
- TypeScript = không còn optional nữa

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

**Bài tập: Đọc xu hướng từ dữ liệu thực**

1. Vào [Stack Overflow Developer Survey](https://survey.stackoverflow.co/) (mới nhất)
2. Tìm section **"Technology"** → **"Web Frameworks and Technologies"**
3. Trả lời:
   - Top 3 framework phổ biến nhất là gì?
   - Ngôn ngữ nào đứng đầu nhiều năm liên tiếp?
   - Framework nào có "Most Loved" (muốn tiếp tục dùng) cao nhất?

4. So sánh với roadmap CSE391 — môn học này dạy bao nhiêu % những thứ được dùng thực tế?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| "Công nghệ mới = tốt hơn" | Svelte mới hơn React nhưng React có **ecosystem** và **job market** lớn hơn nhiều |
| "jQuery đã chết, không cần học" | 80% website vẫn còn jQuery. Cần biết để **maintain code cũ** — nhưng đừng dùng cho project mới |
| "TypeScript chỉ dành cho team lớn" | TypeScript giúp **cá nhân** viết code ít lỗi hơn. Mọi project mới nên dùng |
| "AI sẽ thay thế lập trình viên" | AI thay thế **công việc lặp lại** — developer biết dùng AI sẽ thay thế developer không biết |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao **Vite** đang thay thế **Webpack** trong các project Frontend mới?
2. **TypeScript** khác **JavaScript** ở điểm gì cơ bản nhất?
3. Tại sao **FastAPI** (Python) lại tăng trưởng nhanh hơn Django trong những năm gần đây?

### Câu hỏi áp dụng:

4. Bạn muốn apply vào Shopee (React + Node.js). Bạn cần học thêm gì sau CSE391?
5. Một startup muốn build MVP trong 4 tuần với 2 developer (cả hai biết JS). Họ nên chọn: **React + NestJS** hay **Vue + FastAPI**? Tại sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. Vite dùng **ES Modules** và **Rollup** thay vì bundle toàn bộ code như Webpack → cold start nhanh hơn 10–100 lần trong development
2. TypeScript thêm **static typing** (kiểu dữ liệu tường minh) vào JavaScript → phát hiện lỗi ở lúc viết code, không phải lúc chạy
3. FastAPI dùng **async/await** native, **auto-generate docs** (Swagger), và **type hints** sẵn → nhanh hơn, ít boilerplate hơn Django
4. Học thêm: **TypeScript**, **React Hooks/Context**, **REST API consumption**, **Git workflow** (PR, code review)
5. **React + NestJS** — cả hai đều JS, team không cần học thêm ngôn ngữ mới. 4 tuần deadline, giảm thiểu rủi ro học mới

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **React** thống trị Frontend — 65% job VN yêu cầu, ecosystem khổng lồ
2. **TypeScript** đang trở thành bắt buộc — học JS xong phải học TypeScript
3. **Vite** = build tool của tương lai — nhanh hơn Webpack 10–100 lần
4. **AI Integration** là kỹ năng mới bắt buộc — biết gọi API của ChatGPT/Gemini
5. **Fundamentals trước, framework sau** — HTML/CSS/JS không bao giờ lỗi thời

---

## 10. ➡️ Next Lesson Bridge

*Bạn đã biết thị trường có gì, và xu hướng đang đi về đâu.*

*Câu hỏi cuối của Tuần 0: Khi làm dự án thực tế, làm thế nào để **chọn đúng** tech stack cho từng tình huống? Làm thế nào để không over-engineer?*

**→ [Bài 04: Lựa chọn công nghệ](./04_technology_selection.md) — Quy trình 5 bước chọn tech stack cho dự án.**
