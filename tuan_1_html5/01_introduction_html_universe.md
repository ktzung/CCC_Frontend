# 🟦 TUẦN 1 - BÀI 01
# **INTRODUCTION TO THE HTML UNIVERSE**

---

## 0. 🎬 Opening Hook

*Hà Nội, 8 giờ sáng. Minh mở Chrome, gõ `facebook.com`, nhấn Enter.*

*Trong 0.3 giây tiếp theo:*
1. Request của Minh xuất phát từ laptop → đi qua router WiFi nhà trọ
2. → Qua nhà mạng VNPT → cáp quang dưới đáy Thái Bình Dương → đến data center của Meta ở California, cách 13.000 km
3. → Server phản hồi: gửi về file HTML, CSS, JS
4. → Chrome nhận file → **parse → render → hiển thị News Feed**

**0.3 giây. 13.000 km. Và tất cả bắt đầu bằng một file `.html`.**

*"Mình muốn hiểu cái này. Mình muốn tạo ra những thứ như thế này,"* Minh nghĩ.

Hành trình bắt đầu từ đây.

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

HTML là **ngôn ngữ mà 100% web developer trên thế giới đều biết** — không có ngoại lệ.

- Dù bạn dùng React, Vue, Angular — tất cả đều **compile thành HTML** trước khi browser hiểu được
- DevTools, Accessibility, SEO, Email templates — tất cả đều cần hiểu HTML thật sự
- Một developer không hiểu HTML = bác sĩ không biết giải phẫu học

---

## 2. 🌐 Big Picture — Web hoạt động như thế nào?

### Client–Server Architecture

Mỗi lần bạn vào một trang web, **hai máy tính đang nói chuyện với nhau**:

```
[Browser - Client]                  [Server]
        |                               |
        |-- HTTP Request (GET /) ----→  |
        |                               |-- Tìm file index.html
        |                               |-- Gửi lại
        |←-- HTTP Response (200 OK) --- |
        |    [HTML file content]        |
        |                               |
        | Parse HTML → Fetch CSS/JS     |
        | → Render giao diện           |
```

**Ba thứ browser nhận về:**
| File | Nội dung | Mục đích |
|---|---|---|
| `index.html` | Cấu trúc trang | Bộ xương — nội dung nằm ở đâu |
| `style.css` | Màu sắc, font, layout | Giao diện — trông như thế nào |
| `app.js` | Code tương tác | Hành vi — khi click thì gì xảy ra |

---

## 3. ⚙️ Core Technical Truth — Sự thật kỹ thuật

### HTML là gì — chính xác?

**HTML = HyperText Markup Language**

- **Markup** = ngôn ngữ đánh dấu — dùng *thẻ (tag)* để mô tả ý nghĩa của nội dung
- **HyperText** = văn bản có thể liên kết đến tài liệu khác (hyperlink)
- **Không phải programming language** — HTML không có vòng lặp, không có điều kiện, không tính toán

HTML nói với browser: *"Đây là tiêu đề. Đây là đoạn văn. Đây là ảnh. Đây là link."*

### Browser Rendering Pipeline — Cách browser biến HTML thành giao diện

```
Bước 1: Parse HTML
    → Browser đọc HTML từ trên xuống
    → Xây dựng DOM Tree (cây cấu trúc trang)

Bước 2: Parse CSS
    → Áp dụng style lên từng element trong DOM
    → Xây dựng CSSOM Tree

Bước 3: Execute JavaScript
    → JS có thể thay đổi DOM và CSS ở bước này

Bước 4: Layout → Paint → Composite
    → Tính toán vị trí từng element
    → Vẽ pixel lên màn hình
```

> 💡 **Tại sao quan trọng?** Hiểu pipeline này giúp bạn viết HTML hiệu quả — ví dụ: tại sao nên đặt `<script>` ở cuối `<body>` thay vì trong `<head>`.

### HTTP — Giao thức giao tiếp

| Method | Ý nghĩa | Ví dụ thực tế |
|---|---|---|
| `GET` | Lấy dữ liệu | Mở trang web, xem sản phẩm |
| `POST` | Gửi dữ liệu | Submit form đăng ký, đăng nhập |
| `PUT` | Cập nhật dữ liệu | Sửa thông tin tài khoản |
| `DELETE` | Xóa dữ liệu | Xóa sản phẩm khỏi giỏ hàng |

**HTTP Response Codes:**
| Code | Ý nghĩa |
|---|---|
| `200 OK` | Thành công — trang tải được |
| `404 Not Found` | Không tìm thấy — URL sai hoặc trang bị xóa |
| `500 Internal Server Error` | Lỗi phía server |
| `301 Moved Permanently` | URL đã đổi — tự động redirect |

---

## 4. 🟢 Simplified Layer — Ba thứ mọi web developer cần nhớ

**Một câu nhớ mãi:**

> **HTML = Bộ xương. CSS = Da thịt và quần áo. JavaScript = Não và cơ bắp.**

| Thiếu cái gì | Hậu quả |
|---|---|
| Thiếu HTML | Trang trắng — không có gì để hiển thị |
| Thiếu CSS | Nội dung có nhưng xấu — text đen trên nền trắng như web năm 1995 |
| Thiếu JS | Bấm nút không phản hồi, form không validate, không có tương tác |

---

## 5. 🏭 Real-world Layer

### Static vs Dynamic — Hai loại website

| | Static Website (Web tĩnh) | Dynamic Website (Web động) |
|---|---|---|
| **Nội dung** | Cố định — mọi người thấy giống nhau | Thay đổi theo người dùng |
| **Công nghệ** | Chỉ HTML + CSS + JS | HTML/CSS/JS + Backend + Database |
| **Ví dụ** | Portfolio, Landing page, Blog | Gmail, Shopee, Facebook |
| **Hosting** | GitHub Pages, Netlify (miễn phí) | Cần server riêng, database |

**Trong 3 tuần đầu (HTML, CSS, JS):** Bạn xây Static Website.
**Từ tuần 5 trở đi (JS + Framework):** Bạn bắt đầu làm Dynamic Web App.

### Trong production thực tế, còn có thêm:
- **CDN** — phân phối file HTML/CSS/JS/ảnh từ server gần người dùng nhất → load nhanh hơn
- **Browser Engine** — Chrome dùng Blink, Firefox dùng Gecko — mỗi engine parse HTML hơi khác nhau
- **Framework (React/Vue)** — không thay thế HTML, mà **generate HTML** có hệ thống hơn

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập 1: Inspect một trang web thật (5 phút)

1. Mở Chrome → vào `shopee.vn`
2. Nhấn **F12** → mở DevTools → chọn tab **Elements**
3. Dùng công cụ **Inspect** (icon mũi tên góc trên trái), click vào tiêu đề trang
4. Quan sát HTML của element đó — nó dùng thẻ gì? (`<h1>`, `<h2>`, hay `<div>`?)
5. Nhìn vào cột bên phải (Styles) — CSS nào đang được apply?

**Ghi lại:** Shopee dùng thẻ gì cho tiêu đề tên sản phẩm? Màu font là gì?

---

### Bài tập 2: Tạo file HTML đầu tiên (10 phút)

1. Mở VS Code → File → New File → lưu với tên `index.html`
2. Gõ `html:5` rồi nhấn Tab (nếu có extension Emmet) HOẶC gõ thủ công:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang web đầu tiên của tôi</title>
</head>
<body>
    <h1>Xin chào, World!</h1>
    <p>Đây là trang web đầu tiên của tôi.</p>
</body>
</html>
```

3. Cài extension **Live Server** → click "Go Live" → xem kết quả trên Chrome
4. Thử thay đổi nội dung `<h1>` → lưu file → xem Chrome cập nhật tự động

**Câu hỏi:** Nếu bạn xóa `<!DOCTYPE html>` và refresh, trang có thay đổi không? Tại sao?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"HTML là programming language"** | HTML là **markup language** — không có logic, không tính toán, không có biến. Chỉ mô tả cấu trúc |
| **"Học HTML xong là biết làm web"** | HTML chỉ là một phần của ba. Thiếu CSS → xấu. Thiếu JS → không tương tác được |
| **"React thay thế HTML"** | React **tạo ra** HTML. Khi browser nhận code từ React app, nó vẫn đọc HTML |
| **"Thẻ `<div>` dùng được cho mọi thứ"** | Dùng đúng thẻ semantic (`<article>`, `<nav>`, `<button>`) giúp **SEO**, **Accessibility**, và **code dễ đọc** hơn |
| **"Frontend chỉ là làm đẹp"** | Frontend engineer xử lý state management, performance optimization, accessibility, security — đây là engineering nghiêm túc |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. HTML là **programming language** hay **markup language**? Tại sao sự phân biệt này quan trọng?
2. Khi browser nhận file HTML từ server, nó thực hiện theo trình tự nào? (4 bước)
3. Sự khác biệt giữa **Static Website** và **Dynamic Website** là gì?

### Câu hỏi áp dụng:

4. Một trang Portfolio của bạn hiển thị **tên, ảnh, và danh sách dự án** — cần dùng: **chỉ HTML**, **HTML + CSS**, hay **HTML + CSS + JS + Backend**? Tại sao?
5. Khi bạn xem một trang web và thấy "404 Not Found" — lỗi xảy ra ở đâu: **Browser**, **Internet**, hay **Server**?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Markup language** — HTML không có điều kiện (if/else), không có vòng lặp (for/while), không có biến. Hiểu điều này giúp bạn không tìm cách "lập trình" trong HTML mà phải dùng JS.
2. **Parse HTML → Parse CSS → Execute JS → Layout → Paint → Composite**
3. **Static**: nội dung cố định, mọi người thấy giống nhau, chỉ cần HTML/CSS/JS. **Dynamic**: nội dung thay đổi theo người dùng, cần Backend + Database.
4. **HTML + CSS** là đủ — không cần JS (không có tương tác phức tạp) và không cần Backend (không cần lưu dữ liệu của người dùng).
5. **Server** — 404 là HTTP response code từ server nói rằng: "Tôi nhận được request của bạn, nhưng tôi không tìm thấy tài nguyên đó."

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **HTML = Markup language** — mô tả cấu trúc và ý nghĩa nội dung, không phải programming language
2. **Browser rendering pipeline**: Parse HTML → CSS → Execute JS → Layout → Paint
3. **Bộ ba bắt buộc**: HTML (cấu trúc) + CSS (giao diện) + JS (tương tác) — thiếu một là không hoàn chỉnh
4. **HTTP là giao thức giao tiếp** — GET/POST/PUT/DELETE + Status codes (200/404/500)
5. **Framework không thay thế HTML** — React/Vue đều compile ra HTML cuối cùng

---

## 10. ➡️ Next Lesson Bridge

*Minh đã gõ `<!DOCTYPE html>` — dòng code đầu tiên trong đời web developer.*

*Nhưng Minh ngập ngừng: "DOCTYPE là gì? `<html>` khác `<head>` khác `<body>` ở chỗ nào? Tại sao phải có `<meta charset='UTF-8'>`? Cái `lang="vi"` dùng để làm gì?"*

*Câu trả lời nằm ở **cấu trúc của một trang HTML** — bộ xương mà mọi website đều phải có.*

**→ [Bài 02: Cấu trúc HTML](./02_basic_structure_html.md) — Từ `<!DOCTYPE>` đến `</html>`: Mỗi dòng code có ý nghĩa gì?**

---

## 📎 Phụ lục: Công cụ cần cài đặt

| Công cụ | Mục đích | Link |
|---|---|---|
| **VS Code** | Viết code | https://code.visualstudio.com |
| **Extension: Live Server** | Xem kết quả live | Tìm trong VS Code Extensions |
| **Extension: Prettier** | Format code tự động | Tìm trong VS Code Extensions |
| **Chrome** | Chạy và debug | https://chrome.google.com |

**Shortcut quan trọng nhất:**
- `F12` hoặc `Ctrl+Shift+I` → mở DevTools
- `Ctrl+Shift+C` → inspect element ngay
- `Alt+B` (với Live Server) → mở file HTML trên browser
