# 🟦 CHƯƠNG 03
# **HEAD DATA OF AN HTML DOCUMENT**

Thẻ `<head>` thường bị người mới học bỏ qua vì nội dung của nó không "hiện" ra ngay trên trang web. Tuy nhiên, đây là bộ não điều khiển cách trang web hoạt động, cách Google tìm thấy bạn, và cách hiển thị trên mạng xã hội.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu rõ vai trò của các thẻ bên trong `<head>`.
- Biết cách đặt **Title** chuẩn SEO.
- Sử dụng thẻ **Meta** để cài đặt bảng mã và tương thích thiết bị di động.
- Biết cách liên kết file CSS, JS và Favicon.

---

# 1. **OVERVIEW OF HTML ELEMENTS FOR THE HEAD**

Thẻ `<head>` là nơi chứa **metadata** (dữ liệu về dữ liệu). Nó không hiển thị nội dung trực tiếp, nhưng nó định nghĩa:
- Tiêu đề trang.
- Bảng mã ký tự (để hiển thị tiếng Việt).
- Các file CSS, JavaScript cần nạp.
- Thông tin cho máy tìm kiếm (Google, Bing) và mạng xã hội (Facebook, Zalo).

**Các thẻ phổ biến trong `<head>`:**
- `<title>`
- `<meta>`
- `<link>`
- `<style>`
- `<script>`
- `<base>`

---

# 2. **TITLE: HEADING OF THE HTML PAGE**

## Vai trò
Thẻ `<title>` xác định tiêu đề của trang web. Đây là một trong những thẻ quan trọng nhất!

1.  **Hiển thị trên Tab trình duyệt:** Giúp người dùng biết mình đang ở trang nào.
2.  **Hiển thị trên Google:** Là dòng chữ xanh to nhất trong kết quả tìm kiếm.
3.  **Khi Bookmark:** Là tên mặc định khi người dùng lưu trang web.

## Cú pháp
```html
<head>
    <title>Học Lập Trình Web - Bài 1: HTML Cơ Bản</title>
</head>
```

> [!TIP]
> **Mẹo đặt Title:** Nên ngắn gọn (dưới 60 ký tự), chứa từ khóa chính, và mô tả chính xác nội dung trang.

---

# 3. **NAMING CONVENTION & REFERENCING (QUY TẮC ĐẶT TÊN & LIÊN KẾT)**

## 3.1. Quy tắc đặt tên file/folder
Khi làm web, hãy tuân thủ quy tắc "Kebab-case" hoặc chữ thường không dấu:
- **TỐT:** `index.html`, `about-us.html`, `my_photo.jpg`
- **TRÁNH:** `TrangChu.html` (Windows không phân biệt hoa thường, nhưng Linux server thì CÓ), `my photo.jpg` (dấu cách sẽ bị mã hóa thành `%20` rất xấu).

## 3.2. Đường dẫn (Paths)
Khi cần liên kết file (ảnh, css) vào trang web, ta dùng đường dẫn:
- **Absolute Path (Tuyệt đối):** Link đầy đủ (`https://google.com/logo.png`). Dùng cho tài nguyên bên ngoài.
- **Relative Path (Tương đối):** Link tính từ file HTML hiện tại. Dùng cho file trong dự án.
    - `./image.jpg`: Cùng thư mục.
    - `images/logo.png`: Vào thư mục con `images`.
    - `../style.css`: Ra thư mục cha.

---

# 4. **METADATA USING `<META>`**

Thẻ `<meta>` cung cấp thông tin cấu hình. Nó là thẻ tự đóng (self-closing).

## 4.1. Charset (Bảng mã)
Bắt buộc phải có để hiển thị tiếng Việt đúng.
```html
<meta charset="UTF-8">
```

## 4.2. Viewport (Tương thích Mobile)
Dòng code "thần thánh" để trang web hiển thị đúng trên điện thoại (Responsive). Thiếu dòng này, web trên mobile sẽ bị thu nhỏ xíu như giao diện desktop.
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 4.3. Description (Mô tả SEO)
Đoạn văn ngắn hiển thị dưới tiêu đề trên Google.
```html
<meta name="description" content="Khóa học lập trình web miễn phí từ cơ bản đến nâng cao.">
```

## 4.4. Open Graph (Facebook/Zalo Preview)
Khi bạn share link lên Facebook, ảnh và tiêu đề hiện ra là nhờ các thẻ này:
```html
<meta property="og:title" content="Học Web Cực Dễ">
<meta property="og:image" content="https://example.com/thumbnail.jpg">
```

---

# 5. **LIÊN KẾT TÀI NGUYÊN BÊN NGOÀI (`<LINK>`)**

## 5.1. Favicon (Icon trên tab)
```html
<link rel="icon" type="image/png" href="favicon.png">
```

## 5.2. CSS (File định dạng)
```html
<link rel="stylesheet" href="style.css">
```

---

# 6. **TỔNG KẾT**

Một thẻ `<head>` chuẩn chuyên nghiệp sẽ trông như sau:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Chủ - Website Bán Hàng</title>
    <meta name="description" content="Mua sắm trực tuyến giá rẻ.">
    
    <!-- Favicon -->
    <link rel="icon" href="logo.png">
    
    <!-- CSS -->
    <link rel="stylesheet" href="style.css">
</head>
```

---

**Chương tiếp theo:** Chúng ta sẽ rời khỏi "hậu trường" để bước ra "sân khấu" với thẻ `<body>` và các phần tử hiển thị nội dung trực quan.
