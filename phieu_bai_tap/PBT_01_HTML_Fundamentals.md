# 📋 PHIẾU BÀI TẬP 01
# **HTML5 FUNDAMENTALS — Cấu trúc, Semantic, Tables & Links**

> **Tài liệu tham chiếu:** `tuan_1_html5/01_introduction_html_universe.md` → `05_tables_hyperlinks.md`
>
> ⏱️ **Thời gian:** 120 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

> ⚠️ **YÊU CẦU:** Trả lời vào file `answers.md`. Mỗi câu phải ghi rõ **nguồn tham chiếu** (tên file + phần nào trong tài liệu).

### Câu A1 (5đ) — HTTP & Browser

Đọc chương 01 (`01_introduction_html_universe.md`), trả lời:

1. Khi bạn gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, hãy liệt kê **đúng thứ tự** ít nhất 5 bước xảy ra (từ DNS lookup đến render).
2. Trong DevTools của Chrome, tab **Network** cho thấy thông tin gì? Hãy mở một trang web bất kỳ, chụp screenshot tab Network và **đánh dấu** (vẽ mũi tên/khoanh tròn) vào:
   - Status Code của request đầu tiên
   - Tổng thời gian load trang
   - Một request trả về file CSS

### Câu A2 (5đ) — Semantic HTML

Đọc chương 04, trả lời: Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê **ít nhất 4 lỗi semantic** và sửa lại.

```html
<div class="header">
    <div class="logo">ShopTLU</div>
    <div class="menu">
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </div>
</div>
<div class="main">
    <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <div class="image"><img src="iphone.jpg"></div>
    </div>
</div>
<div class="footer">© 2026 ShopTLU</div>
```

### Câu A3 (5đ) — Block vs Inline

Không chạy code, hãy **vẽ tay** (hoặc mô tả bằng text art) kết quả hiển thị của đoạn HTML sau. Giải thích tại sao.

```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

### Câu A4 (5đ) — Table

Đọc chương 05. Giải thích sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (Ghi rõ ít nhất 3 lý do)

---

## PHẦN B — THỰC HÀNH CODE (60 điểm)

> ⚠️ **YÊU CẦU:**
> - Tạo folder `PBT_01/` trong repo Git
> - Mỗi bài tạo file riêng
> - **Commit sau mỗi bài** (không gộp commit)
> - Chụp screenshot kết quả trên browser

### Bài B1 (15đ) — Trang Profile cá nhân

Tạo file `profile.html` — trang giới thiệu bản thân với **đầy đủ semantic HTML5**:

**Yêu cầu bắt buộc:**
- [ ] `<!DOCTYPE html>`, `<html lang="vi">`, `<meta charset>`, `<meta viewport>`
- [ ] `<title>` chứa tên bạn
- [ ] `<header>` chứa `<nav>` với ít nhất 3 links nội bộ (dùng `#id`)
- [ ] `<main>` chứa ít nhất 2 `<section>`:
  - Section "Về tôi": `<article>` giới thiệu, có `<figure>` + `<figcaption>` chứa ảnh đại diện
  - Section "Kỹ năng": bảng `<table>` với header, body, footer — liệt kê ít nhất 5 kỹ năng + mức độ
- [ ] `<aside>` chứa thông tin liên hệ
- [ ] `<footer>` với copyright
- [ ] **KHÔNG DÙNG** bất kỳ thẻ `<div>` nào (ngoại trừ wrapper) — chỉ dùng semantic tags

**Bảng kỹ năng mẫu (nhưng bạn phải tự điền thông tin thật):**

| Kỹ năng | Mức độ | Ghi chú |
|---------|--------|---------|
| HTML | ⭐⭐ | Đang học |
| CSS | ⭐ | Mới bắt đầu |
| ... | ... | ... |

**Chấm điểm:**
- 5đ: Cấu trúc semantic đúng (header/nav/main/article/section/aside/footer)
- 5đ: Table đúng cấu trúc (thead/tbody/tfoot)
- 3đ: Meta tags đầy đủ (charset, viewport, title)
- 2đ: Không dùng div thừa

### Bài B2 (15đ) — Trang Sản phẩm E-Commerce

Tạo file `products.html` — trang danh sách sản phẩm:

**Yêu cầu bắt buộc:**
- [ ] Header + Navigation giống Bài B1 (có thể copy)
- [ ] Section "Sản phẩm nổi bật" chứa ít nhất **4 sản phẩm**, mỗi sản phẩm là 1 `<article>` bao gồm:
  - `<figure>` + `<img>` (dùng placeholder image: `https://placehold.co/300x200`)
  - `<h3>` tên sản phẩm
  - `<p>` mô tả ngắn
  - Giá: dùng `<strong>` hoặc `<mark>`
  - Link "Mua ngay" (dùng `<a>` trỏ đến `#`)
- [ ] Section "Bảng so sánh" — Table so sánh 3 sản phẩm cùng loại, có ít nhất 5 tiêu chí
- [ ] Table phải dùng `colspan` hoặc `rowspan` ít nhất 1 lần
- [ ] Footer chứa ít nhất 3 hyperlink (Chính sách, Liên hệ, FAQ)

**Chấm điểm:**
- 5đ: 4+ articles product card đúng cấu trúc
- 5đ: Table so sánh có colspan/rowspan
- 3đ: Hyperlinks hoạt động đúng (anchor links và external links)
- 2đ: Code indentation sạch, readable

### Bài B3 (15đ) — Debug HTML

File HTML dưới đây có **ít nhất 10 lỗi** (cả syntax lẫn semantic). Tìm và sửa TẤT CẢ.

Tạo file `debug.html` cho bản sửa. Trong `answers.md`, liệt kê từng lỗi theo format:
```
Lỗi 1: Dòng X — Mô tả lỗi — Cách sửa
Lỗi 2: ...
```

```html
<!DOCTYPE>
<html>
<head>
    <title>Trang web
    <meta charset="utf8">
</head>
<body>
    <h1>Welcome to ShopTLU<h1>
    
    <header>
        <nav>
            <a href="home">Trang chủ<a>
            <a href="products">Sản phẩm</a>
        </nav>
    </header>
    
    <main>
        <section>
            <h3>Sản phẩm hot</h3>
            <img src=iphone.jpg>
            <p>iPhone 16 Pro</p>
            <p>Giá: <b>25.990.000đ</p></b>
        </section>
        
        <section>
            <h3>Thông tin</h3>
            <table>
                <tr>
                    <td>Tên</td>
                    <td>Giá</td>
                </tr>
                <tr>
                    <td>iPhone</td>
                    <td>25tr</td>
                </tr>
            </table>
        </section>
    </main>
    
    <main>
        <p>Sidebar content</p>
    </main>
    
    <footer>
        <p>Copyright 2026
    </footer>
</body>
```

### Bài B4 (15đ) — Phân tích trang web thật

Chọn **1 trong 3 trang web** sau: `tiki.vn`, `shopee.vn`, `thegioididong.com`

Sử dụng DevTools (F12):

1. **Chụp screenshot** tab Elements, chỉ ra ít nhất:
   - 3 thẻ semantic HTML5 mà trang đó sử dụng (ghi rõ thẻ gì, ở đâu)
   - 2 thẻ mà trang đó KHÔNG dùng đúng semantic (nếu có)

2. Mở tab **Elements**, tìm 1 `<table>` trên trang. Chụp screenshot và trả lời:
   - Table đó hiển thị nội dung gì?
   - Có dùng `<thead>`, `<tbody>` không?

3. Tìm 1 `<form>` trên trang (ví dụ ô tìm kiếm). Chụp screenshot:
   - Form đó có `action` và `method` gì?
   - Input types nào được dùng?

**Tổng hợp trong `answers.md`** kèm tất cả screenshots trong folder `screenshots/`.

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Thiết kế cấu trúc

Bạn được giao thiết kế cấu trúc HTML cho trang **chi tiết sản phẩm** (giống trang sản phẩm Shopee/Tiki). Trang bao gồm:
- Header + Navigation
- Breadcrumb (Trang chủ > Điện thoại > iPhone 16)
- Khu vực ảnh sản phẩm (5 ảnh)
- Thông tin sản phẩm (tên, giá, đánh giá sao, mô tả)
- Bảng thông số kỹ thuật
- Khu vực đánh giá/bình luận
- Sidebar: Sản phẩm tương tự
- Footer

**Yêu cầu:** Viết **chỉ phần cấu trúc HTML** (không cần nội dung thật, chỉ cần đúng thẻ và nesting). Mỗi thẻ phải có comment giải thích tại sao bạn chọn thẻ đó.

```html
<!-- Ví dụ: -->
<nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng -->
    <ol> <!-- ol vì breadcrumb có thứ tự -->
        <li><a href="/">Trang chủ</a></li>
        ...
    </ol>
</nav>
```

### Câu C2 (10đ) — So sánh & Tranh luận

Một đồng nghiệp nói: *"Dùng `<div>` cho mọi thứ rồi thêm class là được, không cần semantic HTML. Tốn thời gian học thêm thẻ mới."*

Viết 1 đoạn phản biện (200-300 từ), phải bao gồm:
- Ít nhất 2 lý do kỹ thuật (SEO, Accessibility)
- 1 ví dụ cụ thể chứng minh semantic HTML giúp ích
- 1 trường hợp thực tế mà `<div>` vẫn phù hợp

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 5-8 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Trang giới thiệu sản phẩm Semantic HTML5"

**Yêu cầu:** Quay video màn hình bằng OBS, vừa code vừa thuyết minh tạo 1 trang HTML hoàn chỉnh từ đầu.

**Code mẫu cần thực hiện trong video:**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShopTLU — Điện thoại chính hãng</title>
</head>
<body>
    <header>
        <nav>
            <a href="#home">Trang chủ</a>
            <a href="#products">Sản phẩm</a>
            <a href="#contact">Liên hệ</a>
        </nav>
    </header>
    
    <main>
        <section id="products">
            <h1>Sản phẩm nổi bật</h1>
            <article>
                <figure>
                    <img src="https://placehold.co/300x200" 
                         alt="iPhone 16 Pro Max 256GB màu Titan"
                         loading="lazy">
                    <figcaption>iPhone 16 Pro Max</figcaption>
                </figure>
                <h2>iPhone 16 Pro Max</h2>
                <p>Chip A18 Pro, Camera 48MP, Pin cả ngày.</p>
                <p><strong>25.990.000đ</strong></p>
            </article>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2026 ShopTLU. All rights reserved.</p>
    </footer>
</body>
</html>
```

**Trong video, bạn phải giải thích:**

1. 🎤 Tại sao dùng `<header>` thay vì `<div class="header">`?
2. 🎤 `<nav>` khác gì `<div>` chứa links?
3. 🎤 Tại sao `<article>` phù hợp cho sản phẩm?
4. 🎤 `<figure>` + `<figcaption>` giúp ích gì cho SEO/Accessibility?
5. 🎤 `loading="lazy"` hoạt động ra sao?
6. 🎤 Mở DevTools → tab Elements → chỉ ra cấu trúc DOM tree

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp (15-30 giây)
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ code từng dòng, KHÔNG copy-paste
- [ ] Giải thích ≥ 5 điểm ở trên bằng giọng nói
- [ ] Cuối video: Mở browser xem kết quả + mở DevTools

---

## ✅ CHECKLIST NỘP BÀI

- [ ] Folder `PBT_01/` đã tạo trong repo
- [ ] File `answers.md` — trả lời Phần A + C
- [ ] File `profile.html` — Bài B1
- [ ] File `products.html` — Bài B2
- [ ] File `debug.html` — Bài B3 (bản đã sửa)
- [ ] Folder `screenshots/` — Bài B4
- [ ] 🎬 **Video OBS** — `videos/PBT01_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **3 commits** có message rõ ràng
- [ ] Validate HTML qua [validator.w3.org](https://validator.w3.org/) — chụp screenshot kết quả
