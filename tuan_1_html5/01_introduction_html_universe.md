# 🟦 CHƯƠNG 01
# **INTRODUCTION TO THE HTML UNIVERSE**

> *Bạn có bao giờ tự hỏi: Khi gõ `facebook.com` vào trình duyệt rồi nhấn Enter, chuyện gì xảy ra trong 0.3 giây tiếp theo?*

---

## 🎬 Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

*Hà Nội, 8 giờ sáng. Minh mở Chrome, gõ `facebook.com`, nhấn Enter.*

*Trong 0.3 giây tiếp theo, điều kỳ diệu xảy ra:*

1. Request của Minh xuất phát từ laptop → đi qua router WiFi nhà trọ
2. → Qua nhà mạng VNPT → chạy xuyên cáp quang dưới đáy Thái Bình Dương
3. → Đến data center của Meta ở Menlo Park, California, cách 13.000 km
4. → Server xử lý: "Minh muốn xem News Feed"
5. → Response chạy ngược lại: cáp quang → VNPT → router → laptop
6. → Chrome nhận file HTML, CSS, JS → render ra giao diện → Minh thấy News Feed

**0.3 giây. 13.000 km. Hàng triệu phép tính. Và tất cả bắt đầu bằng ba chữ cái: H. T. M. L.**

*"Mình muốn hiểu cái này hoạt động như thế nào,"* Minh nghĩ. *"Mình muốn TẠO RA những thứ như thế này."*

Hành trình bắt đầu.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu bức tranh toàn cảnh: **Client-Server**, **HTTP**, và **Browser Rendering**
- Phân biệt được các loại website: **Static vs Dynamic**
- Nắm rõ vai trò của bộ ba: **HTML, CSS, JavaScript**
- Chuẩn bị đầy đủ công cụ để bắt đầu coding

---

# 1. **WEB HOẠT ĐỘNG NHƯ THẾ NÀO?**

## 1.1. Kiến trúc Client-Server — "Nhà hàng Online"

Hãy tưởng tượng việc lướt web giống như **đặt đồ ăn online**:

```
👤 Bạn (Client/Browser)          🍽️ Nhà hàng (Server)
     |                                |
     |-- "Cho tôi Phở bò" --------→  |  (HTTP Request)
     |   (gõ URL, nhấn Enter)        |
     |                                |-- Bếp nấu phở
     |                                |   (Server xử lý)
     |                                |
     |←--- 🍜 "Phở đây ạ!" -------  |  (HTTP Response)
     |   (trình duyệt hiện trang)    |
```

- **Client (Trình duyệt):** Là bạn — Chrome, Firefox, Safari. Bạn gửi yêu cầu (gõ URL, click link, submit form).
- **Server (Máy chủ):** Là nhà bếp. Nơi chứa file HTML/CSS/JS, database, và xử lý logic. Nhận yêu cầu → xử lý → trả kết quả.
- **Internet:** Là anh shipper Grab — vận chuyển request và response.

> 💡 **Fun fact:** Khi bạn mở Facebook, trình duyệt gửi khoảng **50-100 requests** — lấy file HTML, ảnh, CSS, JS, dữ liệu API... Tất cả diễn ra trong chưa đầy 1 giây!

## 1.2. HTTP — Ngôn ngữ để Client và Server hiểu nhau

Để đặt món, bạn cần nói ngôn ngữ nhà hàng hiểu. Đó là **HTTP** (HyperText Transfer Protocol):

| HTTP Method | Ẩn dụ nhà hàng | Ví dụ thực tế |
|---|---|---|
| **GET** | "Cho xem menu" | Mở trang chủ, xem sản phẩm |
| **POST** | "Tôi đặt món này" | Submit form đăng ký, đăng nhập |
| **PUT** | "Đổi sang phở gà" | Cập nhật thông tin tài khoản |
| **DELETE** | "Hủy đơn" | Xóa sản phẩm khỏi giỏ hàng |

**HTTP Response Codes — Tin nhắn trả lời từ nhà hàng:**

| Code | Ý nghĩa | Ẩn dụ |
|---|---|---|
| `200 OK` | Thành công | "Phở đây ạ!" 🍜 |
| `404 Not Found` | Không tìm thấy | "Hết phở rồi ạ" 😔 |
| `500 Server Error` | Lỗi hệ thống | "Bếp cháy rồi" 🔥 |
| `301 Redirect` | Đã chuyển địa chỉ | "Nhà hàng dọn sang đường bên kia" |

## 1.3. Browser Rendering — Từ Code thành Hình ảnh

Khi trình duyệt nhận file HTML từ server, nó làm gì? Giống một kiến trúc sư xây nhà:

```
1. 🏗️ Parse HTML     → Đọc bản vẽ kiến trúc (cấu trúc trang)
2. 🎨 Parse CSS      → Đọc bản thiết kế nội thất (màu sắc, font, layout)
3. ⚡ Execute JS     → Lắp hệ thống điện, nước (tương tác, animation)
4. 🖌️ Paint & Render → Hoàn thiện, giao nhà cho chủ (hiện trên màn hình)
```

> 🏭 **Bên trong công ty:** Tại Google, đội Chrome DevTools có hàng trăm kỹ sư làm việc chỉ để tối ưu quy trình rendering này — giảm từ 0.5s xuống 0.3s. Vì 200ms cũng ảnh hưởng đến trải nghiệm người dùng.

---

# 2. **CÁC LOẠI WEBSITE**

## 2.1. Static Websites (Web Tĩnh) — "Tờ rơi quảng cáo"

- **Đặc điểm:** Nội dung cố định, mọi người xem đều thấy giống nhau. Giống tờ rơi — in 1.000 bản, bản nào cũng y hệt.
- **Công nghệ:** HTML + CSS (có thể thêm JS đơn giản)
- **Ví dụ thực tế:** Portfolio cá nhân, Landing page startup, Menu nhà hàng online
- **Ưu điểm:** Nhanh, rẻ, dễ làm, bảo mật tốt (không có database để hack)
- **Nhược điểm:** Khó cập nhật (phải sửa code), không tương tác

> 📌 **Bạn sẽ làm:** Trong 3 tuần đầu, bạn sẽ xây được website tĩnh như thế này — đẹp, responsive, sẵn sàng đưa vào portfolio.

## 2.2. Dynamic Websites (Web Động) — "Ứng dụng thông minh"

- **Đặc điểm:** Nội dung **thay đổi** tùy theo người dùng, thời gian, dữ liệu. Giống app Grab — bạn và bạn bè mở app, mỗi người thấy bản đồ và đơn hàng khác nhau.
- **Công nghệ:** HTML/CSS/JS + Backend (Node.js, Python, PHP...) + Database
- **Ví dụ thực tế:**

| App | Tại sao Dynamic? |
|---|---|
| **Facebook** | News Feed mỗi người khác nhau |
| **Shopee** | Giỏ hàng mỗi người khác nhau, giá flash sale thay đổi |
| **VnExpress** | Tin tức cập nhật liên tục, comment real-time |
| **Gmail** | Email mỗi người khác nhau |

- **Ưu điểm:** Mạnh mẽ, tương tác cao, quản lý nội dung dễ dàng
- **Nhược điểm:** Phức tạp hơn, tốn chi phí hosting, cần bảo mật kỹ

> 📌 **Bạn sẽ làm:** Từ tuần 5 trở đi, khi học JavaScript + React/Vue, bạn sẽ xây được app động — giỏ hàng cập nhật real-time, gọi API, SPA.

---

# 3. **BỘ BA THẦN THÁNH: HTML, CSS, JavaScript**

*Anh Hùng giải thích cho Minh bằng ẩn dụ mà Minh nhớ cả đời:*

> *"Xây website giống xây quán The Coffee House. HTML là xây nhà, CSS là trang trí, JS là lắp hệ thống tự động."*

## 3.1. HTML — 🏗️ Khung xương (Cấu trúc)
- **Vai trò:** Định nghĩa nội dung và cấu trúc. "Đây là tiêu đề, đây là đoạn văn, đây là ảnh."
- **Thiếu HTML:** Đất trống, không có gì. Trình duyệt hiện trang trắng.

## 3.2. CSS — 🎨 Trang trí (Giao diện)
- **Vai trò:** Màu sắc, font chữ, bố cục, animation. "Tiêu đề màu nâu ấm, nền cà phê, font sang trọng."
- **Thiếu CSS:** Nhà xây thô — text đen trên nền trắng, xấu hoắc, như trang web năm 1995.

## 3.3. JavaScript — ⚡ Chức năng (Tương tác)
- **Vai trò:** Tạo tương tác và xử lý logic. "Bấm nút 'Thêm vào giỏ' → số lượng cập nhật, tổng tiền thay đổi."
- **Thiếu JS:** Quán đẹp nhưng "chết" — bấm nút không phản hồi, form không validate, giỏ hàng không cập nhật.

### 🏪 Áp dụng cho The Coffee House:

| Phần | HTML | CSS | JavaScript |
|---|---|---|---|
| **Menu** | Danh sách đồ uống, giá | Layout grid, ảnh bo tròn, responsive | Lọc theo loại, tìm kiếm |
| **Giỏ hàng** | Bảng sản phẩm đã chọn | Thanh bên phải, animation slide | Thêm/xóa món, tính tổng tiền |
| **Form đặt hàng** | Input tên, SĐT, địa chỉ | Thiết kế đẹp, focus effect | Validate, submit qua API |

> [!NOTE]
> **Bộ 3 Thần Thánh:** HTML + CSS + JS là nền tảng **bắt buộc** của mọi Web Developer. Không có ngoại lệ. Ngay cả React, Vue, Angular đều build trên nền tảng này.

---

# 4. **BẠN CẦN GÌ ĐỂ BẮT ĐẦU?**

Tin vui: Bạn **không cần máy tính siêu khủng**. Một chiếc laptop cơ bản + WiFi là đủ.

## 4.1. Text Editor — Nơi viết code

> *Anh Hùng: "Đừng dùng Word! Và Notepad thì... được nhưng đừng."*

- **⭐ Khuyên dùng:** **Visual Studio Code (VS Code)** — Miễn phí, mạnh mẽ, cả thế giới dùng
  - Download: https://code.visualstudio.com
  - Extensions nên cài: Live Server, Prettier, HTML CSS Support
- Thay thế: Sublime Text, WebStorm (trả phí)

## 4.2. Web Browser — Nơi chạy code

- **⭐ Khuyên dùng:** **Google Chrome** (DevTools mạnh nhất)
- Thay thế: Firefox (DevTools cũng tốt), Edge

## 4.3. Developer Tools (F12) — "Kính hiển vi" cho website

Nhấn **F12** trên bất kỳ website nào để mở:

| Tab | Công dụng | Ví dụ sử dụng |
|---|---|---|
| **Elements** | Soi code HTML/CSS | "Shopee dùng font gì? Màu nút mua hàng là gì?" |
| **Console** | Xem lỗi, chạy thử JS | "Tại sao nút bấm không hoạt động?" |
| **Network** | Xem requests/responses | "Website tải chậm — file nào nặng nhất?" |
| **Sources** | Xem source code | "Trang web này code như thế nào?" |

> 💡 **Bài tập ngay:** Mở Chrome → vào `shopee.vn` → nhấn F12 → tab Elements → click vào nút "Mua Ngay" → xem CSS của nó. Bạn vừa "reverse-engineer" website Shopee! 🕵️

---

# 5. **TỔNG KẾT**

| Bạn vừa học | Một dòng tóm tắt |
|---|---|
| Client-Server | Trình duyệt "đặt đồ ăn", Server "nấu và giao" |
| HTTP | Ngôn ngữ giao tiếp: GET (xem), POST (gửi), PUT (sửa), DELETE (xóa) |
| Static Web | Tờ rơi — cố định, ai xem cũng giống |
| Dynamic Web | App thông minh — mỗi người thấy khác nhau |
| HTML | Khung xương — cấu trúc trang |
| CSS | Trang trí — giao diện đẹp |
| JavaScript | Chức năng — tương tác, logic |
| VS Code + Chrome | Vũ khí của Web Developer |

---

## ➡️ Chuyện tiếp theo...

*Minh mở VS Code, tạo file mới: `index.html`.*

*Anh gõ `<!DOCTYPE html>` — dòng code đầu tiên trong đời web developer.*

*Nhưng rồi Minh ngập ngừng: "DOCTYPE là gì? `<html>` khác `<head>` khác `<body>` ở chỗ nào? Tại sao phải viết thêm `<meta charset='UTF-8'>`?"*

*Câu trả lời nằm ở cấu trúc của một trang HTML — bộ xương mà mọi website đều phải có. Và Minh sắp viết bộ xương đầu tiên.*

**Chương tiếp theo:** Chúng ta sẽ bắt tay vào viết dòng code HTML đầu tiên và hiểu cấu trúc từ `<!DOCTYPE>` đến `</html>`.

---

## 🏢 PHỤ LỤC: Một Ngày Của Frontend Developer

*8:30 — Minh đến công ty thực tập, mở Slack:*
- Designer gửi Figma mới → "Anh Minh check responsive giúp em"
- PM tạo ticket trên Jira → "Bug: nút bấm lệch trên Safari"
- Teammate tạo PR → "Review giúp anh"

*9:00 — Daily standup (15 phút):*
- "Hôm qua em fix xong bug pagination"
- "Hôm nay em implement search filter"
- "Blocker: API endpoint chưa ready"

*9:15 - 12:00 — Code: HTML structure → CSS styling → JS logic*

*13:00 - 17:30 — Code review, fix bug, commit, push, deploy staging*

**→ Đây là cuộc sống thật tại FPT, Shopee, VNG. Và mọi thứ trong khóa học này đều chuẩn bị cho ngày đầu tiên đó.**
