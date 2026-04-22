# 🟦 TUẦN 1 - BÀI 03
# **HEAD DATA — Bộ Não Ẩn Của Trang Web**

---

## 0. 🎬 Opening Hook

*Minh deploy todo-app lên GitHub Pages. Hào hứng Google tên mình.*

*Kết quả: Không tìm thấy. Thử lại sau 2 ngày: vẫn không.*

*"Anh Hùng, trang web của em đã online nhưng Google không thấy. Sao vậy?"*

*"Em có đặt `<title>` và `<meta description>` chưa?"*

*"Title thì viết 'Document'... Description thì chưa có."*

*"Đó là lý do. Google không đọc nội dung trang trước — nó đọc `<head>` trước. Thiếu metadata = vô hình trên Internet."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

`<head>` quyết định:
- **Google có index trang không** — và hiển thị như thế nào trong kết quả tìm kiếm
- **Trang trông như thế nào khi share lên Facebook/Zalo** — ảnh preview, tiêu đề, mô tả
- **Tiếng Việt có hiển thị đúng không** — charset
- **Mobile có render đúng không** — viewport

Tất cả điều này xảy ra **trước khi người dùng thấy bất kỳ nội dung nào**.

---

## 2. 🌐 Big Picture — Ai đọc `<head>`?

```
<head> được đọc bởi:

[Browser]        → charset, viewport, link CSS → render đúng
[Google Bot]     → title, description, lang   → SEO, index
[Facebook/Zalo]  → og:title, og:image        → preview khi share
[Twitter]        → twitter:card               → tweet card
[Screen Reader]  → lang attribute             → phát âm đúng ngôn ngữ
```

`<head>` là phần trang web mà **người dùng không thấy nhưng mọi hệ thống khác đều đọc**.

---

## 3. ⚙️ Core Technical Truth — Từng thẻ trong `<head>`

```html
<head>
    <!-- ═══ PHẦN 1: BẮT BUỘC ═══ -->

    <!-- Bảng mã ký tự — LUÔN là dòng đầu tiên -->
    <meta charset="UTF-8">

    <!-- Viewport — Responsive mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Tiêu đề — Hiện trên tab và kết quả Google -->
    <title>Todo App - Quản lý công việc | Nhóm Minh CSE391</title>

    <!-- ═══ PHẦN 2: SEO ═══ -->

    <!-- Mô tả trang — Dòng text dưới title trong Google Search -->
    <meta name="description" 
          content="Ứng dụng quản lý công việc cho sinh viên TLU. 
                   Tạo, phân loại, và theo dõi tiến độ học tập.">

    <!-- Từ khóa — Google hiện không coi trọng nhiều, nhưng vẫn good practice -->
    <meta name="keywords" content="todo app, quản lý công việc, sinh viên">

    <!-- Tác giả -->
    <meta name="author" content="Nguyễn Văn Minh - CSE391">

    <!-- ═══ PHẦN 3: MEDIA & ASSETS ═══ -->

    <!-- Favicon — Icon nhỏ trên tab browser -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- CSS stylesheet -->
    <link rel="stylesheet" href="styles.css">

    <!-- ═══ PHẦN 4: SOCIAL SHARING (Open Graph) ═══ -->

    <!-- Preview khi share lên Facebook, Zalo, LinkedIn -->
    <meta property="og:title" content="Todo App - Quản lý công việc">
    <meta property="og:description" content="Ứng dụng quản lý công việc cho sinh viên">
    <meta property="og:image" content="https://yourdomain.com/preview.jpg">
    <meta property="og:url" content="https://yourdomain.com">
    <meta property="og:type" content="website">
</head>
```

---

### Bảng tóm tắt: Mỗi thẻ trả lời câu hỏi gì?

| Thẻ | Ai hỏi | Câu trả lời |
|---|---|---|
| `<meta charset>` | Browser | "Dùng bảng mã nào để decode?" |
| `<meta viewport>` | Mobile browser | "Trang rộng bao nhiêu trên màn hình nhỏ?" |
| `<title>` | Google + Browser | "Trang này tên gì?" |
| `<meta description>` | Google | "Tóm tắt nội dung trang trong 1–2 câu?" |
| `<link rel="icon">` | Browser | "Dùng icon nào cho tab?" |
| `<link rel="stylesheet">` | Browser | "Tải CSS từ file nào?" |
| `og:image` | Facebook/Zalo | "Ảnh preview khi share link là gì?" |

---

### SEO Best Practices

| Thẻ | Độ dài tối ưu | Lý do |
|---|---|---|
| `<title>` | 50–60 ký tự | Dưới = lãng phí từ khóa. Trên = Google cắt bớt |
| `<meta description>` | 150–160 ký tự | Cùng lý do — Google cắt nếu quá dài |
| `og:image` | Tối thiểu 1200×630px | Kích thước chuẩn cho Facebook/Zalo preview |

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **`<head>` là danh thiếp của trang web — bạn không thấy nó khi gặp người, nhưng nó quyết định ấn tượng đầu tiên của mọi hệ thống.**

---

## 5. 🏭 Real-world Layer

### Tại sao `<head>` quan trọng với business?

- Trang web có `<title>` rõ ràng + `<meta description>` tốt → **Click-Through Rate (CTR)** từ Google cao hơn 30%
- `og:image` đẹp → khi share lên Zalo/Facebook → nhiều người click hơn
- Thiếu `<meta viewport>` → người dùng mobile phải zoom tay → bounce rate tăng → Google hạ rank

### `<head>` trong framework thực tế (Next.js):

```jsx
// Trong Next.js, bạn dùng <Head> component
import Head from 'next/head'

export default function Page() {
    return (
        <>
            <Head>
                <title>Todo App | CSE391</title>
                <meta name="description" content="Quản lý công việc cho sinh viên" />
            </Head>
            <main>...</main>
        </>
    )
}
```

→ Framework thay đổi cú pháp, nhưng **concept `<head>` không thay đổi**.

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: SEO Audit trang web của bạn (10 phút)

**Phần 1: Kiểm tra trang web thật**
1. Vào `shopee.vn`
2. Nhấn F12 → tab **Elements** → tìm `<head>`
3. Ghi lại:
   - `<title>` của Shopee viết gì? Bao nhiêu ký tự?
   - Có `<meta description>` không? Nội dung là gì?
   - Có `og:image` không?

**Phần 2: Nâng cấp `<head>` của file todo.html**

Mở file `todo.html` từ bài trước và:
1. Viết `<title>` đúng chuẩn SEO (50–60 ký tự)
2. Thêm `<meta name="description">` mô tả app (150–160 ký tự)
3. Thêm `<meta name="author">` với tên bạn
4. Thêm 3 thẻ `og:` (title, description, type)

**Câu hỏi kiểm tra:** Dùng công cụ [metatags.io](https://metatags.io) — paste URL GitHub Pages của bạn vào → xem preview Facebook/Twitter trông như thế nào.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Title trùng nhau ở các trang cũng được"** | Mỗi trang phải có title **duy nhất** — Google penalize duplicate titles |
| **"`<meta keywords>` giúp SEO tốt"** | Google đã **không dùng meta keywords** từ năm 2009. Bing vẫn dùng nhưng ảnh hưởng rất nhỏ |
| **"Không cần `og:image` nếu không làm marketing"** | Khi ai đó share link của bạn lên Zalo/Facebook, không có `og:image` → preview xấu → ít người click |
| **"`<link rel='stylesheet'>` phải đặt trong `<body>`"** | Phải đặt trong `<head>` — browser cần tải CSS **trước** khi render để tránh FOUC (Flash of Unstyled Content) |
| **"JavaScript nên đặt trong `<head>`"** | `<script>` nên đặt **cuối `<body>`** hoặc dùng `defer` attribute — tránh block rendering |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Kể 3 "khách hàng" (hệ thống) đọc `<head>` và mỗi cái đọc thẻ nào?
2. Độ dài tối ưu của `<title>` là bao nhiêu ký tự? Tại sao không viết dài hơn?
3. `og:image` phục vụ mục đích gì? Khi nào nó được dùng?

### Câu hỏi áp dụng:

4. Bạn xây 3 trang: `index.html`, `about.html`, `contact.html`. Phần nào trong `<head>` phải **khác nhau** cho mỗi trang? Phần nào có thể **giống nhau**?
5. Một trang web tiếng Việt không có `<meta charset="UTF-8">`. Người dùng truy cập trên máy có locale Japanese thấy gì? Tại sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Browser** đọc `charset`, `viewport`, `link stylesheet`. **Google Bot** đọc `title`, `description`, `lang`. **Facebook/Zalo** đọc `og:title`, `og:image`, `og:description`.
2. **50–60 ký tự** — Google hiển thị tối đa ~60 ký tự trong kết quả tìm kiếm. Dài hơn → bị cắt với "..." → mất từ khóa quan trọng ở cuối.
3. `og:image` quyết định ảnh preview khi ai đó **share link trang web** lên Facebook, Zalo, LinkedIn, Twitter. Không có → Facebook/Zalo tự chọn ảnh ngẫu nhiên → preview xấu.
4. **Phải khác**: `<title>` (duy nhất cho từng trang), `<meta description>` (nội dung khác nhau). **Có thể giống**: `<meta charset>`, `<meta viewport>`, `<link rel="stylesheet">`, favicon.
5. Browser không biết decode theo chuẩn nào → dùng chuẩn mặc định của OS (Japanese locale → Shift-JIS) → tiếng Việt thành ký tự ngẫu nhiên hoặc dấu hỏi.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<head>` không cho user thấy** — nhưng browser, Google, và mạng xã hội đều đọc nó
2. **`<title>` và `<meta description>`** = ấn tượng đầu tiên trên Google Search — cần được viết như copywriting
3. **`og:image` và `og:title`** = preview khi share link — đừng bỏ qua
4. **`<link rel="stylesheet">`** phải trong `<head>`, **`<script>`** nên ở cuối `<body>`
5. **Mỗi trang cần title và description riêng** — không copy-paste giống nhau

---

## 10. ➡️ Next Lesson Bridge

*Google đã bắt đầu index trang của Minh. Preview trên Zalo trông đẹp hơn rồi.*

*"Nhưng trang vẫn toàn text đen trên nền trắng. Mình cần thêm nội dung phong phú — ảnh, heading nhiều cấp, trích dẫn, code block..."*

**→ [Bài 04: Visible Part of HTML](./04_visible_part_html.md) — Semantic elements, text formatting nâng cao, và media.**
