# 📘 TUẦN 0 - BÀI 01
# **TỔNG QUAN VỀ PHÁT TRIỂN ỨNG DỤNG WEB**

---

## 0. 🎬 Opening Hook

*Năm 2023, Amazon đo được: mỗi 0.1 giây trang web load chậm hơn → doanh thu giảm 1%. Với $440 tỷ/năm, con số đó tương đương $4.4 tỷ bị mất — chỉ vì **0.1 giây**.*

*Bạn đang học cách xây những thứ có sức ảnh hưởng lớn đến vậy.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Web Development **không phải một nghề**. Nó là **nền tảng kỹ thuật số** của mọi thứ bạn dùng hàng ngày:

| Bạn dùng hàng ngày | Đó là Web Dev |
|---|---|
| Google, YouTube, Facebook | Frontend + Backend |
| Shopee, Tiki, mua hàng online | E-commerce Web App |
| Netflix, Spotify | Streaming Web App |
| ChatGPT, Gemini | AI Web Application |
| VS Code trên browser | Desktop app viết bằng Web tech |

**→ Mọi startup đều bắt đầu từ web. Mọi kỹ sư phần mềm đều cần hiểu web.**

---

## 2. 🌐 Big Picture — Web hoạt động như thế nào?

Khi bạn gõ `shopee.vn` và nhấn Enter, ba thứ xảy ra:

```
[1] Trình duyệt (Browser)
        ↓ gửi yêu cầu qua Internet
[2] Server (Máy chủ của Shopee)
        ↓ xử lý, trả về file HTML/CSS/JS
[3] Trình duyệt (Browser)
        ↓ nhận file → hiển thị giao diện
```

Đây là **vòng lặp cơ bản nhất của web**: **Request → Process → Response → Render**.

Ba loại file mà browser nhận về:
- **HTML** → cấu trúc trang (nội dung nằm ở đâu)
- **CSS** → giao diện (màu sắc, bố cục, font)
- **JavaScript** → tương tác (click, submit, cập nhật dữ liệu)

---

## 3. ⚙️ Core Technical Truth — Sự thật kỹ thuật

### Website ≠ Web Application

| Tiêu chí | Website (Web tĩnh) | Web Application (Web động) |
|---|---|---|
| **Mục đích** | Hiển thị thông tin | Xử lý tác vụ, dữ liệu |
| **Tương tác** | Ít — chủ yếu đọc | Nhiều — CRUD, login, real-time |
| **Database** | Không/Đơn giản | Phức tạp, bắt buộc |
| **Ví dụ** | Blog, Portfolio, Landing page | Gmail, Shopee, ChatGPT, Banking |

> 💡 **BTL CSE391 của bạn:** Todo App có form, có data, có CRUD → đó là **Web Application**, không phải Website.

### Ba vai trò chính trong Web Development

```
            ┌──────────────┐
            │  Full-stack  │
            └──────┬───────┘
      ┌────────────┴────────────┐
┌─────┴─────┐            ┌──────┴──────┐
│ Frontend  │            │   Backend   │
│ (UI/UX)   │            │ (Logic/DB)  │
└───────────┘            └─────────────┘
HTML, CSS, JS          Node.js, Python, DB
```

---

## 4. 🟢 Simplified Layer — Giải thích đơn giản

**Một câu nhớ mãi:**

> HTML = Bộ xương | CSS = Da thịt + quần áo | JavaScript = Não và cơ bắp

Không có HTML → không có nội dung.
Không có CSS → xấu, không dùng được.
Không có JS → bấm gì cũng không phản hồi.

---

## 5. 🏭 Real-world Layer

Trong thực tế, một trang web lớn như Shopee còn có thêm:
- **CDN (Content Delivery Network)** — giúp ảnh và file load nhanh hơn ở mọi vị trí địa lý
- **Load Balancer** — phân tải cho hàng triệu người dùng đồng thời
- **Framework** (React, Vue) — giúp xây giao diện phức tạp có hệ thống
- **Cloud** (AWS, GCP) — hạ tầng server linh hoạt, scale tự động

→ Nhưng tất cả đều xây trên **nền tảng HTML + CSS + JS**.

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

**Bài tập: Giải phẫu một trang web thật**

1. Mở Chrome, vào `shopee.vn`
2. Nhấn `F12` → mở **DevTools**
3. Chọn tab **Elements**
4. Dùng công cụ **Inspect** (icon mũi tên ở góc trên trái DevTools), click vào nút "Mua Ngay"
5. Quan sát: HTML của nút đó trông như thế nào? CSS nào đang style nó?

**Câu hỏi ghi lại:**
- Màu nền của nút "Mua Ngay" là gì? (Tìm trong CSS `background-color`)
- Nút đó dùng thẻ HTML gì? (`<button>`, `<a>`, hay `<div>`?)

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| "Frontend chỉ là làm cho đẹp" | Frontend xử lý state, gọi API, validation, performance — đây là **engineering**, không phải design |
| "Học một framework là đủ" | Framework thay đổi mỗi 3-5 năm. **HTML/CSS/JS fundamentals** mới là bất biến |
| "Phải giỏi toán mới học được Web Dev" | Web Dev cần **tư duy logic** hơn là toán học thuần túy |
| "Website và Web Application là một" | Xem bảng phân biệt ở phần 3 |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Khi bạn gõ URL và nhấn Enter, trình tự nào xảy ra: **(a) Browser → Server → Internet** hay **(b) Browser → Internet → Server → Browser**?
2. Ba loại file nào mà browser nhận về từ server?
3. Sự khác biệt **chính** giữa Website và Web Application là gì?

### Câu hỏi áp dụng:

4. Shopee cần xử lý 11 triệu đơn hàng trong 11.11 — cần dùng **Website** hay **Web Application**? Tại sao?
5. Một trang "Giới thiệu công ty" chỉ hiển thị địa chỉ và số điện thoại — **Website** hay **Web Application**?

<details>
<summary>👁️ Xem đáp án</summary>

1. **(b)** Browser → Internet → Server → Internet → Browser
2. **HTML** (cấu trúc), **CSS** (giao diện), **JavaScript** (tương tác)
3. Web Application có **tương tác phức tạp, database, và authentication** — người dùng khác nhau thấy dữ liệu khác nhau
4. **Web Application** — vì cần xử lý đơn hàng, giỏ hàng, login, real-time inventory
5. **Website** — không có tương tác, không có database, nội dung cố định

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Web = Browser ↔ Server ↔ Internet** — ba thành phần không thể thiếu
2. **HTML + CSS + JS** = bộ ba nền tảng mọi website đều dùng
3. **Website** (tĩnh) ≠ **Web Application** (động) — phân biệt bằng database và tương tác
4. **Frontend/Backend/Full-stack** — ba nhánh chính, mỗi nhánh cần skill set riêng
5. **Framework thay đổi, fundamentals thì không** — học HTML/CSS/JS trước, framework sau

---

## 10. ➡️ Next Lesson Bridge

*Bạn vừa hiểu web hoạt động như thế nào, và biết HTML/CSS/JS là nền tảng bắt buộc.*

*Câu hỏi tiếp theo: Trong thế giới web development hiện tại, có bao nhiêu nhánh công nghệ? Và bạn nên chọn con đường nào?*

**→ [Bài 02: Các nhánh công nghệ](./02_technology_branches.md) — Frontend, Backend, Full-stack, DevOps: Chọn đường nào?**

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
