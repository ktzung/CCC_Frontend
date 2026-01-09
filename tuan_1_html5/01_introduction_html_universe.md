# 🟦 CHƯƠNG 01
# **INTRODUCTION TO THE HTML UNIVERSE**

Chào mừng bạn bước vào vũ trụ của Web Development! Trước khi viết dòng code đầu tiên, chúng ta cần hiểu "bản đồ" của vũ trụ này: Web hoạt động như thế nào, các ngôn ngữ đóng vai trò gì, và bạn cần chuẩn bị những gì.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu bức tranh toàn cảnh: **Client-Server**, **HTTP**, và **Browser Rendering**.
- Phân biệt được các loại website: **Static vs Dynamic**.
- Nắm rõ vai trò của bộ ba: **HTML, CSS, JavaScript**.
- Chuẩn bị đầy đủ công cụ để bắt đầu coding.

---

# 1. **WEB HOẠT ĐỘNG NHƯ THẾ NÀO?**

## 1.1. Kiến trúc Client-Server
Hãy tưởng tượng việc lướt web giống như đi ăn nhà hàng:

```
Khách hàng (Client)     ←→     Nhà hàng (Server)
    |                              |
    |-- Gọi món (Request) ------→ |
    |                              |-- Nấu món
    |                              |
    |←----- Phục vụ món (Response) |
```

- **Client (Trình duyệt):** Là bạn (Chrome, Firefox...). Bạn gửi yêu cầu (gõ URL, click link).
- **Server (Máy chủ):** Là nhà bếp. Nơi chứa file và xử lý logic, gửi kết quả về cho bạn.
- **Internet:** Là con đường vận chuyển.

## 1.2. HTTP - Ngôn ngữ giao tiếp
Để Client và Server hiểu nhau, chúng dùng chung một ngôn ngữ gọi là **HTTP** (HyperText Transfer Protocol).

- **Request:** "Cho tôi xem trang chủ" (`GET /index.html`)
- **Response:** "Đây là file HTML của trang chủ" (`200 OK`)

## 1.3. Browser Rendering - Từ Code đến Hình ảnh
Khi trình duyệt nhận được file HTML, nó làm gì?
1. **Parse HTML:** Đọc cấu trúc xương sống.
2. **Parse CSS:** Đọc bản thiết kế trang trí.
3. **Execute JS:** Chạy các lệnh điều khiển hành vi.
4. **Paint:** Vẽ lên màn hình cho bạn xem.

---

# 2. **CÁC LOẠI WEBSITE (TYPES OF WEBSITES)**

Không phải website nào cũng giống nhau. Chúng ta có thể phân loại chúng theo cách hoạt động:

## 2.1. Static Websites (Web Tĩnh)
- **Đặc điểm:** Nội dung **cố định**, giống như một tờ báo giấy. Mọi người truy cập đều thấy nội dung y hệt nhau.
- **Công nghệ:** Chủ yếu là HTML và CSS.
- **Ví dụ:** Trang giới thiệu công ty, Portfolio cá nhân, trang Landing page.
- **Ưu điểm:** Nhanh, rẻ, dễ làm, bảo mật tốt.
- **Nhược điểm:** Khó cập nhật nội dung (phải sửa code), không tương tác.

## 2.2. Dynamic Websites (Web Động)
- **Đặc điểm:** Nội dung **thay đổi** tùy theo người dùng, thời gian, hoặc dữ liệu.
- **Công nghệ:** HTML/CSS/JS + Backend (PHP, Node.js, Python...) + Database.
- **Ví dụ:** Facebook (Newfeed mỗi người khác nhau), Shopee (Giỏ hàng mỗi người khác nhau), VnExpress (Tin tức cập nhật liên tục).
- **Ưu điểm:** Mạnh mẽ, tương tác cao, quản lý nội dung dễ dàng.
- **Nhược điểm:** Phức tạp, tốn chi phí, cần bảo mật kỹ.

---

# 3. **NGÔN NGỮ THIẾT KẾ VÀ PHÁT TRIỂN WEB**

Để xây dựng website, chúng ta cần phối hợp nhiều ngôn ngữ. Hãy quay lại ví dụ "Xây nhà":

## 3.1. HTML (HyperText Markup Language) - Khung xương
- **Vai trò:** Định nghĩa cấu trúc và nội dung.
- **Ví dụ:** Đây là tiêu đề, đây là đoạn văn, đây là hình ảnh.
- *Nếu thiếu HTML:* Không có nhà, chỉ là khí trời.

## 3.2. CSS (Cascading Style Sheets) - Trang trí
- **Vai trò:** Định dạng giao diện, màu sắc, bố cục.
- **Ví dụ:** Tiêu đề màu đỏ, đoạn văn căn giữa, ảnh bo tròn.
- *Nếu thiếu CSS:* Nhà xây thô, xấu xí, trơ trọi gạch đá.

## 3.3. JavaScript (JS) - Chức năng
- **Vai trò:** Tạo tương tác và xử lý logic động.
- **Ví dụ:** Bấm nút đèn sáng, kiểm tra form nhập đúng chưa, tải thêm tin mới.
- *Nếu thiếu JS:* Nhà đẹp nhưng "chết", bấm chuông không kêu.

> [!NOTE]
> **Bộ 3 Thần Thánh:** HTML + CSS + JS là nền tảng bắt buộc của mọi Web Developer.

---

# 4. **BẠN CẦN GÌ ĐỂ BẮT ĐẦU? (WHAT DO I NEED?)**

Tin vui: Bạn không cần máy tính siêu khủng để học Web.

## 4.1. Text Editor (Trình soạn thảo code)
Nơi bạn viết code. Đừng dùng Word!
- **Khuyên dùng:** **Visual Studio Code (VS Code)** - Miễn phí, mạnh mẽ, nhiều plugin hỗ trợ.
- Thay thế: Sublime Text, Atom.

## 4.2. Web Browser (Trình duyệt)
Nơi bạn chạy và kiểm tra code.
- **Khuyên dùng:** **Google Chrome** (có DevTools cực xịn).
- Thay thế: Firefox, Edge.

## 4.3. Developer Tools (F12)
Công cụ "chẩn đoán bệnh" cho website có sẵn trong trình duyệt.
- **Elements:** Soi code HTML/CSS của trang web bất kỳ.
- **Console:** Xem lỗi và chạy thử JS.
- **Network:** Xem website tải những gì.

---

# 5. **TỔNG KẾT**

- Web hoạt động dựa trên mô hình **Client-Server** và giao tiếp qua **HTTP**.
- **Static Web** dùng cho nội dung cố định, **Dynamic Web** dùng cho nội dung thay đổi.
- **HTML** tạo khung, **CSS** làm đẹp, **JS** tạo chức năng.
- Bạn chỉ cần **VS Code** và **Chrome** để bắt đầu hành trình này.

---

**Chương tiếp theo:** Chúng ta sẽ bắt tay vào viết dòng code HTML đầu tiên và tìm hiểu cấu trúc của nó.
