# 🟦 CHƯƠNG 00
# **TƯ DUY PHÂN TÍCH & XÁC ĐỊNH BỐ CỤC WEB**

## 🎬 "Figma File 50 Màn Hình — Bắt Đầu Từ Đâu?" — Kỹ Năng #1 Mà Junior Thiếu

*Ngày đầu thực tập. Chị Hà gửi Minh link Figma: "Em code lại trang Landing Page này nhé."*

*Minh mở Figma. 50 màn hình. Hero section, navbar, card grid, testimonials, footer, responsive variants... Minh đơ.*

*"Bắt đầu từ đâu hả chị?"*

*Chị Hà cười: "Em đang phạm lỗi kinh điển — NHÌN VÀO MÀU SẮC trước. Quên màu đi. Quên font đi. Quên ảnh đi. Chỉ nhìn BỐ CỤC. Em sẽ thấy trang web nào cũng chỉ là... NHỮNG CHIẾC HỘP LỒNG NHAU."*

> 💡 **Tư duy phân tích bố cục là kỹ năng QUAN TRỌNG NHẤT** mà hầu hết tài liệu HTML không dạy. Trước khi viết `<div>` đầu tiên, bạn phải biết **NHÌN**.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu tư duy **"Xây nhà → Xây Website"** — vai trò của HTML, CSS, JS
- Nắm phương pháp **"Những chiếc hộp lồng nhau"** (Box Thinking) để phân tích bất kỳ giao diện nào
- Biết quy trình **Figma → Phân tích bố cục → HTML Structure** chuyên nghiệp
- Sử dụng **DevTools (Inspect)** để "mổ xẻ" cấu trúc website thật

---

# 1. **TƯ DUY: XÂY NHÀ VÀ XÂY WEBSITE**

## 1.1. Ngôi Nhà Và Trang Web

> *Anh Hùng: "Em muốn xây nhà. Em bắt đầu bằng gì?"*
> 
> *Minh: "Dĩ nhiên là... bản thiết kế?"*
> 
> *"Đúng! Bản thiết kế = Figma/Sketch. Nhưng rồi sao? Em có sơn tường trước khi đổ móng không?"*
> 
> *"Không... phải làm móng, dựng khung trước."*
> 
> *"Đó chính là HTML."*

### 🏗️ Bảng So Sánh: Xây Nhà ↔ Xây Web

| Xây Nhà | Xây Web | Vai trò |
|---------|---------|---------|
| **Bản thiết kế kiến trúc** | **Figma / Adobe XD** | Thiết kế giao diện |
| **Móng + Khung sườn** | **HTML** | Cấu trúc, bộ xương |
| **Trang trí nội thất, sơn tường** | **CSS** | Màu sắc, bố cục, đẹp |
| **Điện, nước, IoT thông minh** | **JavaScript** | Tương tác, chức năng |
| **Các phòng chức năng** | **Semantic Tags** | Phân chia khu vực |

### 🏠 Mapping Chi Tiết

```
🏠 NGÔI NHÀ                    🌐 WEBSITE
┌─────────────────────┐         ┌─────────────────────┐
│  Mái hiên / Biển số │         │  <header>           │
│  → Tên nhà, số nhà  │         │  → Logo, Navigation │
├─────────────────────┤         ├─────────────────────┤
│  Hành lang / Lối đi │         │  <nav>              │
│  → Dẫn đến các phòng│         │  → Menu điều hướng  │
├─────────────────────┤         ├─────────────────────┤
│  Phòng khách        │         │  <main>             │
│  → Khu vực chính    │         │  → Nội dung chính   │
│  ┌───────┐ ┌──────┐ │         │  ┌───────┐ ┌──────┐ │
│  │Sofa   │ │Tivi  │ │         │  │Text   │ │Image │ │
│  └───────┘ └──────┘ │         │  └───────┘ └──────┘ │
├─────────────────────┤         ├─────────────────────┤
│  Phòng bên          │         │  <aside>            │
│  → Kho, phụ trợ     │         │  → Sidebar          │
├─────────────────────┤         ├─────────────────────┤
│  Bậc tam cấp        │         │  <footer>           │
│  → Cuối nhà         │         │  → Copyright, liên hệ│
└─────────────────────┘         └─────────────────────┘
```

> 💡 **Quy tắc vàng:** Xây ngôi nhà nào cũng phải **đổ móng, dựng khung** trước. Website cũng vậy — phải **"dựng HTML" trước** khi làm đẹp với CSS và thêm chức năng bằng JavaScript. Website mạnh và dễ mở rộng = website có cấu trúc HTML hợp lý, giống nhà bền nhờ móng chắc.

---

# 2. **"NHỮNG CHIẾC HỘP LỒNG NHAU" — BOX THINKING**

## 2.1. Nguyên Tắc Cốt Lõi

> *Chị Hà kéo Minh lại màn hình: "Em nheo mắt lại. Mờ hết chữ và ảnh đi. Em thấy gì?"*
>
> *Minh nheo mắt: "...Các khối hình chữ nhật?"*
>
> *"CHÍNH XÁC! Mọi trang web trên thế giới — Facebook, Shopee, Netflix — khi nheo mắt lại, chỉ là NHỮNG CHIẾC HỘP LỒNG NHAU."*

### 📦 Mọi Trang Web = Hộp Trong Hộp

```
┌──────────────────────────────────────────────────────────┐
│ HỘP LỚN NHẤT: <html>                                     │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ HỘP HEADER: <header>                                 │  │
│ │ ┌────────┐  ┌──────────────────────────────────────┐ │  │
│ │ │ Logo   │  │ Navigation: Home | About | Contact   │ │  │
│ │ └────────┘  └──────────────────────────────────────┘ │  │
│ └──────────────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ HỘP MAIN: <main>                                     │  │
│ │ ┌──────────────────────┐ ┌────────────────────────┐  │  │
│ │ │ HỘP TEXT             │ │ HỘP HÌNH ẢNH          │  │  │
│ │ │ ┌──────────────────┐ │ │                        │  │  │
│ │ │ │ <h1> Tiêu đề    │ │ │   ┌──────────────┐    │  │  │
│ │ │ └──────────────────┘ │ │   │  <img>       │    │  │  │
│ │ │ ┌──────────────────┐ │ │   │  Hình minh   │    │  │  │
│ │ │ │ <p> Mô tả        │ │ │   │  họa         │    │  │  │
│ │ │ └──────────────────┘ │ │   └──────────────┘    │  │  │
│ │ │ ┌──────────────────┐ │ │                        │  │  │
│ │ │ │ <button> CTA     │ │ │                        │  │  │
│ │ │ └──────────────────┘ │ │                        │  │  │
│ │ └──────────────────────┘ └────────────────────────┘  │  │
│ └──────────────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ HỘP FOOTER: <footer>                                 │  │
│ │        "© 2026 - Contact us @company.com"             │  │
│ └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## 2.2. Quy Trình 3 Bước: Figma → HTML

### 📋 Bước 1: Nhìn Tổng Thể → Chia Vùng Lớn

Mở bản thiết kế (Figma/screenshot), **bỏ qua màu sắc và font chữ**, chỉ hỏi:
- Trang này có mấy **khu vực lớn**?
- Thường là: **Header** (đầu trang) → **Main** (nội dung chính) → **Footer** (cuối trang)

```
Bản thiết kế gốc:          Sau khi "nheo mắt":
┌─────────────────┐         ┌─────────────────┐
│ Logo    Menu    │         │ 📦 HEADER        │
├─────────────────┤         ├─────────────────┤
│                 │         │                 │
│  Nội dung chính │         │ 📦 MAIN          │
│  (text, ảnh...) │         │                 │
│                 │         │                 │
├─────────────────┤         ├─────────────────┤
│ Copyright info  │         │ 📦 FOOTER        │
└─────────────────┘         └─────────────────┘
```

### 📋 Bước 2: Mỗi Vùng Lớn → Chia Nhỏ Hơn

Zoom vào từng vùng, tiếp tục hỏi: "Vùng này có bao nhiêu **hộp con**?"

```
📦 HEADER gồm:
├── 📦 Logo (hình ảnh hoặc text)
└── 📦 Navigation (danh sách links: Home | About | Contact)

📦 MAIN gồm:
├── 📦 Phần Text (bên trái)
│   ├── 📦 Tiêu đề lớn (h1)
│   ├── 📦 Đoạn mô tả (p)
│   └── 📦 Nút bấm CTA (button)
└── 📦 Phần Hình ảnh (bên phải)
    └── 📦 Ảnh minh họa (img)

📦 FOOTER gồm:
└── 📦 Dòng text copyright (p hoặc span)
```

### 📋 Bước 3: Gán Thẻ HTML (Semantic Tags)

Mỗi "hộp" giờ đây **có tên** — đó chính là thẻ HTML:

```html
<!-- Bước 3: Chuyển boxes thành code -->
<header>
    <img src="logo.png" alt="Logo">
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>
</header>

<main>
    <section class="hero">
        <div class="hero-text">
            <h1>WORKOUTS MADE EXCLUSIVE FOR <span class="highlight">YOU</span>!</h1>
            <p>Chương trình tập luyện được thiết kế riêng...</p>
            <button>Start now</button>
        </div>
        <div class="hero-image">
            <img src="athlete.png" alt="Vận động viên">
        </div>
    </section>
</main>

<footer>
    <p>Send us a message @company.com</p>
</footer>
```

> 💡 **Nhận ra pattern chưa?** Quy trình luôn là: **Nhìn → Chia hộp → Gán thẻ**. Không bao giờ ngược lại. Đây là cách mọi Frontend Developer chuyên nghiệp làm việc.

---

# 3. **CASE STUDY: PHÂN TÍCH TRANG TREINE.ME**

## 3.1. Giao Diện Gốc

> *Chị Hà mở một landing page fitness lên: "Phân tích đi em."*

Giả sử giao diện gồm:
- Trên cùng: Logo "treine.me" + menu (Home, About, Training)
- Giữa: Tiêu đề lớn "WORKOUTS MADE EXCLUSIVE FOR YOU!" + ảnh vận động viên + nút "Start now"
- Cuối: Dòng text "send us a message @treine.me"

## 3.2. Áp Dụng 3 Bước

### Bước 1 — Chia vùng lớn:
```
┌──────────────────────────────────────────┐
│ HEADER: Logo + Menu điều hướng           │  ← <header>
├──────────────────────────────────────────┤
│                                          │
│ MAIN: Hero Section                       │  ← <main>
│   Left: Tiêu đề + Mô tả + CTA Button   │
│   Right: Hình minh họa                   │
│                                          │
├──────────────────────────────────────────┤
│ FOOTER: "send us a message..."           │  ← <footer>
└──────────────────────────────────────────┘
```

### Bước 2 — Chi tiết từng vùng:

**Header giải mã:**
```
┌─────────────────────────────────────────────────┐
│ <header>                                         │
│  ┌──────────┐    ┌────────────────────────────┐  │
│  │ <a>      │    │ <nav>                      │  │
│  │ Logo     │    │ <ul>                       │  │
│  │ "treine" │    │   <li><a>Home</a></li>     │  │
│  │          │    │   <li><a>About</a></li>    │  │
│  └──────────┘    │   <li><a>Training</a></li> │  │
│                  │ </ul>                      │  │
│                  └────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Main giải mã:**
```
┌──────────────────────────────────────────────────┐
│ <main>                                            │
│  ┌─────────────────────┐  ┌────────────────────┐  │
│  │ <div class="text">  │  │ <div class="img">  │  │
│  │                     │  │                    │  │
│  │ <h1>WORKOUTS MADE   │  │  ┌──────────────┐  │  │
│  │ EXCLUSIVE FOR       │  │  │              │  │  │
│  │ <span>YOU</span>!</h1>│  │  │   <img>      │  │  │
│  │                     │  │  │   athlete     │  │  │
│  │ <p>Chương trình...  │  │  │              │  │  │
│  │ <strong>cá nhân hóa │  │  └──────────────┘  │  │
│  │ </strong>...</p>    │  │                    │  │
│  │                     │  │                    │  │
│  │ <button>Start now   │  │                    │  │
│  │ </button>           │  │                    │  │
│  └─────────────────────┘  └────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Bước 3 — Code HTML hoàn chỉnh:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>treine.me - Workouts Made Exclusive For You</title>
</head>
<body>
    <!-- ===== HEADER: Logo + Navigation ===== -->
    <header>
        <a href="/" class="logo">treine.me</a>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/training">Training</a></li>
            </ul>
        </nav>
    </header>

    <!-- ===== MAIN: Hero Section ===== -->
    <main>
        <section class="hero">
            <!-- Phần Text bên trái -->
            <div class="hero-content">
                <h1>WORKOUTS MADE EXCLUSIVE FOR <span class="highlight">YOU</span>!</h1>
                <p>
                    Chương trình tập luyện được thiết kế 
                    <strong>riêng cho bạn</strong>, dựa trên 
                    thể trạng và mục tiêu cá nhân.
                </p>
                <button class="cta-button">Start now</button>
            </div>
            <!-- Phần Hình ảnh bên phải -->
            <div class="hero-image">
                <img src="images/athlete.png" alt="Vận động viên đang tập luyện">
            </div>
        </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer>
        <p>send us a message <a href="mailto:hello@treine.me">@treine.me</a></p>
    </footer>
</body>
</html>
```

> **Minh:** *"Ồ! Khi chia hộp xong, viết code dễ hơn hẳn!"*
>
> **Chị Hà:** *"Đúng. 80% công việc Frontend là PHÂN TÍCH. 20% mới là viết code. Junior code trước, nghĩ sau — nên rối. Senior nghĩ trước, code sau — nên gọn."*

---

# 4. **DEVTOOLS: CHUỘT PHẢI → INSPECT**

## 4.1. Công Cụ "Kính Hiển Vi" Của Web Developer

> *Anh Hùng: "Em muốn học cách Facebook viết HTML? Không cần xin source code — INSPECT!"*

### Cách mở DevTools:
1. Mở bất kỳ trang web nào (ví dụ: `facebook.com`, `shopee.vn`)
2. **Chuột phải** vào phần tử muốn xem → chọn **"Inspect"** (hoặc "Kiểm tra")
3. Hoặc nhấn `F12` / `Ctrl + Shift + I`

### Tab Elements — Xem "Bộ Xương" HTML

```
DevTools sẽ hiển thị cấu trúc HTML:

▼ <body>
  ▼ <header class="global-nav">
    ▼ <nav>
      ▼ <ul class="nav-links">
        ► <li><a href="/">Home</a></li>
        ► <li><a href="/about">About</a></li>
  ▼ <main id="content">
    ▼ <section class="hero">
      ► <h1>Welcome</h1>
      ► <p>Description...</p>
  ▼ <footer>
    ► <p>© 2026</p>
```

### Tab Elements — Xem Box Model

Khi click vào một phần tử, panel bên phải hiển thị **Box Model**:

```
         ┌─── margin ───────────────────┐
         │  ┌─── border ─────────────┐  │
         │  │  ┌─── padding ──────┐  │  │
         │  │  │                  │  │  │
         │  │  │    CONTENT       │  │  │
         │  │  │    (nội dung)    │  │  │
         │  │  │                  │  │  │
         │  │  └──────────────────┘  │  │
         │  └────────────────────────┘  │
         └──────────────────────────────┘
```

> 💡 **Box Model** chính là minh chứng: **Mọi phần tử HTML đều là HỘP!** Margin → Border → Padding → Content. Tư duy "hộp lồng nhau" không chỉ là cách nhìn — mà là cách browser THỰC SỰ render.

## 4.2. Bài Tập: "Mổ Xẻ" Website Thật

**Bước 1:** Mở [shopee.vn](https://shopee.vn) trên Chrome

**Bước 2:** Chuột phải vào thanh tìm kiếm → Inspect

**Bước 3:** Trả lời các câu hỏi:
- Thanh tìm kiếm nằm trong thẻ gì? (`<header>`? `<div>`? `<form>`?)
- Nó có bao nhiêu "hộp cha" bao bọc bên ngoài?
- Input search dùng thẻ gì? Có attribute nào đặc biệt?

**Bước 4:** Thử với Navbar → Footer → Banner quảng cáo

> *Anh Hùng: "Inspect 10 trang web. Em sẽ thấy pattern: mọi trang đều dùng header → main → footer. Semantic tags giống nhau. Chỉ khác CSS."*

---

# 5. **SEMANTIC TAGS — CHỌN "TÊN HỘP" ĐÚNG**

## 5.1. Tại Sao Không Dùng `<div>` Cho Mọi Thứ?

> *Minh viết web đầu: `<div>` cho header, `<div>` cho nav, `<div>` cho main, `<div>` cho footer. Chạy tốt.*
>
> *Chị Hà: "Code em chạy — nhưng Google Bot đọc = thấy 50 cái div, không biết cái nào là gì. Accessibility tool đọc = người khiếm thị không biết đang ở đâu. Dùng div cho mọi thứ giống viết thư không có tiêu đề."*

### 🏷️ Semantic Tags = "Hộp Có Tên"

| Thẻ Generic (❌) | Thẻ Semantic (✅) | Ý nghĩa |
|-------------------|-------------------|---------|
| `<div class="header">` | `<header>` | Đầu trang — logo, navigation |
| `<div class="nav">` | `<nav>` | Thanh điều hướng |
| `<div class="content">` | `<main>` | Nội dung chính (chỉ 1 cái/trang) |
| `<div class="section">` | `<section>` | Một phân đoạn nội dung |
| `<div class="article">` | `<article>` | Nội dung độc lập (bài viết, sản phẩm) |
| `<div class="sidebar">` | `<aside>` | Nội dung phụ, sidebar |
| `<div class="footer">` | `<footer>` | Cuối trang — copyright, liên hệ |

### 🏗 Layout Chuẩn Semantic HTML5

```html
<body>
    <header>         <!-- Đầu trang -->
        <nav>        <!-- Menu điều hướng -->
        </nav>
    </header>
    
    <main>           <!-- Nội dung chính (CHỈ 1 CÁI) -->
        <section>    <!-- Phân đoạn 1: Hero -->
        </section>
        <section>    <!-- Phân đoạn 2: Features -->
            <article><!-- Một feature card --></article>
            <article><!-- Một feature card --></article>
        </section>
    </main>
    
    <aside>          <!-- Sidebar (nếu có) -->
    </aside>
    
    <footer>         <!-- Cuối trang -->
    </footer>
</body>
```

> 💡 **Quy tắc:** Dùng `<div>` CHỈ KHI không có thẻ semantic nào phù hợp. `<div>` là "hộp không tên" — dùng khi cần gom nhóm thuần túy cho CSS.

---

# 6. **BLOCK VS INLINE — HAI LOẠI HỘP**

## 6.1. Hai Tính Cách Của Hộp

| Block Element | Inline Element |
|:---:|:---:|
| Chiếm **CẢ DÒNG** | Chỉ chiếm **NỘI DUNG** |
| Tự xuống dòng | Nằm cùng dòng |
| `<div>`, `<p>`, `<h1-h6>`, `<section>`, `<header>`, `<ul>` | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<button>` |
| Giống **viên gạch xây tường** — mỗi viên = 1 hàng | Giống **chữ trong sách** — nối liền nhau |

```html
<!-- Block: mỗi thẻ TỰ XUỐNG DÒNG -->
<h1>Tiêu đề</h1>
<p>Đoạn văn 1</p>
<p>Đoạn văn 2</p>

<!-- Kết quả:
Tiêu đề
Đoạn văn 1
Đoạn văn 2
-->

<!-- Inline: các thẻ NẰM CÙNG DÒNG -->
<p>Đây là <strong>chữ đậm</strong> và <em>chữ nghiêng</em> trong <a href="#">cùng một dòng</a>.</p>

<!-- Kết quả:
Đây là **chữ đậm** và *chữ nghiêng* trong cùng một dòng.
-->
```

## 6.2. class và id — "Thẻ Tên" Cho Hộp

```html
<!-- class = "Họ" → nhiều phần tử có cùng class -->
<div class="product-card">Sản phẩm 1</div>
<div class="product-card">Sản phẩm 2</div>
<div class="product-card">Sản phẩm 3</div>

<!-- id = "CMND" → MỖI phần tử có id DUY NHẤT -->
<div id="hero-section">Chỉ có 1 hero section</div>
<div id="contact-form">Chỉ có 1 form liên hệ</div>
```

| Thuộc tính | Số lượng | Ví dụ | Dùng khi |
|-----------|---------|-------|---------|
| `class` | Nhiều phần tử có cùng class | `.product-card` — 100 cards | Style nhóm phần tử giống nhau |
| `id` | DUY NHẤT trong trang | `#hero-section` — chỉ 1 | Truy cập phần tử cụ thể (CSS/JS/anchor link) |

---

# 7. **BÀI TẬP THỰC HÀNH**

## BT1: Phân tích bố cục (Giấy + Bút)
Mở 3 trang web sau và **vẽ sơ đồ hộp lồng nhau** trên giấy:
1. [google.com](https://google.com) — trang đơn giản nhất
2. [wikipedia.org](https://wikipedia.org) — trang có sidebar
3. [shopee.vn](https://shopee.vn) — trang phức tạp (header, search, grid sản phẩm, footer)

## BT2: Inspect & Ghi chép
Dùng DevTools Inspect trên [youtube.com](https://youtube.com):
- Header dùng thẻ gì?
- Video list nằm trong thẻ gì?
- Mỗi video card dùng `<div>` hay `<article>`?
- Tìm ít nhất 3 semantic tags

## BT3: Figma → HTML
Cho bản thiết kế sau (mô tả bằng text):
> *Landing page gồm: Navbar (logo trái, 3 menu links phải), Hero section (tiêu đề + subtitle + 2 buttons bên trái, ảnh bên phải), Features section (3 cards ngang hàng, mỗi card có icon + title + description), Footer (3 cột: About, Links, Contact)*

**Yêu cầu:** Viết file `index.html` hoàn chỉnh với semantic tags (KHÔNG cần CSS, chỉ HTML structure).

---

# 📝 MINI TEST

1. So sánh HTML, CSS, JavaScript qua tư duy "xây nhà" — mỗi cái đóng vai trò gì?
2. Giải thích phương pháp "Những chiếc hộp lồng nhau" — áp dụng thế nào khi nhìn Figma?
3. Quy trình 3 bước **Figma → HTML** là gì?
4. Tại sao nên dùng `<header>` thay vì `<div class="header">`?
5. `class` khác `id` như thế nào? Cho ví dụ thực tế.
6. Block element và inline element khác nhau ra sao?

---

# 💾 TỔNG KẾT

| Khái niệm | Ghi nhớ |
|-----------|---------|
| **Tư duy xây nhà** | HTML = móng khung, CSS = nội thất, JS = điện nước |
| **Box Thinking** | Mọi trang web = hộp lồng nhau. Nheo mắt → thấy boxes |
| **Quy trình 3 bước** | Nhìn tổng thể → Chia hộp nhỏ → Gán thẻ HTML |
| **DevTools Inspect** | Chuột phải → Inspect = "kính hiển vi" web |
| **Semantic Tags** | header, nav, main, section, article, aside, footer |
| **Block vs Inline** | Block = cả dòng, Inline = vừa nội dung |
| **class vs id** | class = "Họ" (nhiều), id = "CMND" (duy nhất) |

---

## ➡️ Chương tiếp theo...

*Minh nhìn lại bản phân tích hộp của mình. Gọn gàng. Logic.*

*"Giờ em hiểu rồi. Trước khi viết code, phải NHÌN trước."*

*Anh Hùng gật đầu: "Đúng. Và bây giờ em đã sẵn sàng viết dòng code HTML đầu tiên."*

**Chương tiếp theo:** [01. Introduction to the HTML Universe](./01_introduction_html_universe.md) — Bắt đầu hành trình viết code, từ `<!DOCTYPE html>` đến trang web đầu tiên.
