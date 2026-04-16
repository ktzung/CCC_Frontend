# 🟦 CHƯƠNG 03
# **HEAD DATA — Bộ Não Ẩn Của Trang Web**

## 🎬 "Tại Sao Google Không Tìm Thấy Website Của Mình?"

*Minh deploy todo-app lên GitHub Pages. Hào hứng Google tên mình.*

*Kết quả: Không tìm thấy. Trang web không xuất hiện trên Google.*

> **Anh Hùng:** *"Em có đặt `<title>`, `<meta description>` không?"*
>
> **Minh:** *"Title thì viết 'Document'... Description thì... chưa có."*
>
> **Anh Hùng:** *"Đó là lý do. `<head>` chứa thông tin mà Google và trình duyệt đọc để hiểu trang web. Thiếu nó = vô hình trên Internet."*

---

## 🎯 Mục tiêu
- Hiểu vai trò của `<head>` và các thẻ meta
- Tối ưu SEO cơ bản
- Liên kết CSS, JS, và favicon

---

## 🧠 Bên trong `<head>` — Những thứ User không thấy nhưng Google đọc

```html
<head>
    <!-- 1. Charset — "Ngôn ngữ" -->
    <meta charset="UTF-8">
    <!-- Thiếu = tiếng Việt hiện ký tự lạ: "Xin chÃ o" -->

    <!-- 2. Viewport — "Kính lúp cho mobile" -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Thiếu = website thu nhỏ trên mobile, phải zoom -->

    <!-- 3. Title — "Biển tên nhà" -->
    <title>Todo App - Quản lý công việc | Nhóm Minh CSE391</title>
    <!-- Hiện trên tab browser + kết quả Google -->

    <!-- 4. Description — "Tờ rơi quảng cáo cho Google" -->
    <meta name="description" content="Ứng dụng quản lý công việc cho sinh viên TLU. Tạo, sắp xếp, và theo dõi tiến độ công việc.">

    <!-- 5. Favicon — "Logo mini trên tab" -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- 6. CSS — "Hợp đồng trang trí" -->
    <link rel="stylesheet" href="styles.css">

    <!-- 7. Open Graph — "Preview trên Facebook/Zalo" -->
    <meta property="og:title" content="Todo App">
    <meta property="og:description" content="Quản lý công việc dễ dàng">
    <meta property="og:image" content="preview.jpg">
</head>
```

### Mỗi thẻ = Một câu trả lời cho Google:

| Thẻ | Google hỏi | Bạn trả lời |
|---|---|---|
| `<title>` | "Trang web này về gì?" | "Todo App - Quản lý công việc" |
| `<meta description>` | "Tóm tắt nội dung?" | "Ứng dụng quản lý cho sinh viên" |
| `<meta charset>` | "Dùng bảng mã nào?" | "UTF-8 (hỗ trợ tiếng Việt)" |
| `<meta viewport>` | "Hiển thị mobile thế nào?" | "Tự co giãn theo màn hình" |
| `og:image` | "Preview ảnh khi share?" | "preview.jpg" |

> 💡 **Mẹo SEO:** Title nên 50-60 ký tự. Description nên 150-160 ký tự. Dưới = lãng phí. Trên = Google cắt bớt.

---

## ➡️ Chương tiếp theo...

*Minh đã setup `<head>` đúng chuẩn. Google bắt đầu index trang web.*

*"Nhưng trang vẫn xấu," Minh nghĩ. "Chữ đen trên nền trắng. Không layout, không style."*

*"Giờ mình làm `<body>` đẹp," Minh quyết định. "Nhưng HTML có những thẻ nào để tạo nội dung phong phú?"*

**Chương tiếp theo:** Phần hiển thị — text formatting, lists, media, semantic HTML — biến trang trắng thành trang có nội dung.
