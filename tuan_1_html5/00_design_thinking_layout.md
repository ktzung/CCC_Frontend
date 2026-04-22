# 🟦 TUẦN 1 - BÀI 00
# **TƯ DUY PHÂN TÍCH & XÁC ĐỊNH BỐ CỤC WEB**

---

## 0. 🎬 Opening Hook

*Ngày đầu thực tập. Chị Hà gửi Minh file Figma: "Em code lại trang Landing Page này nhé."*

*Minh mở Figma. Hero section, navbar, card grid, testimonials, footer, responsive variants... Minh đơ.*

*"Bắt đầu từ đâu hả chị?"*

*Chị Hà không trả lời ngay. Cô nheo mắt nhìn màn hình: "Em nhìn trang này và thấy gì đầu tiên?"*

*"Màu sắc? Font chữ?"*

*"Sai. Em thấy... **những chiếc hộp chữ nhật**. Mờ hết màu đi — mọi trang web trên thế giới chỉ là hộp trong hộp."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**Đây là kỹ năng #1 mà Junior Developer thiếu — nhưng không có tài liệu nào dạy.**

Biết cú pháp HTML nhưng không biết phân tích bố cục = biết cầm bút nhưng không biết viết gì.

Sau bài này, bạn có thể:
- Nhìn bất kỳ giao diện nào → biết ngay phải viết HTML như thế nào
- Chuyển từ Figma/screenshot → code structure trong vài phút
- Đọc được code HTML của người khác mà không bị lạc

---

## 2. 🌐 Big Picture — Bức tranh tổng thể

**Quy trình làm việc thực tế của Frontend Developer:**

```
[Designer]           [Frontend Dev]          [Browser]
    |                      |                      |
Figma Design    →   Phân tích bố cục   →   Viết HTML   →   Render
                    (Box Thinking)          Structure
```

Ba câu hỏi cần trả lời trước khi gõ dòng code đầu tiên:

```
1. Trang có bao nhiêu "vùng lớn"?     → header / main / footer
2. Mỗi vùng có bao nhiêu "hộp con"?  → section / article / div
3. Mỗi hộp cần thẻ HTML nào?         → semantic tags
```

---

## 3. ⚙️ Core Technical Truth — Sự thật kỹ thuật

### Mọi trang web = Hộp lồng nhau (Box Model)

Đây không chỉ là cách nhìn — đây là cách browser **thực sự render**:

```
┌──────────────────────────────────────────────────────┐
│ <html>  (hộp lớn nhất)                              │
│ ┌────────────────────────────────────────────────┐   │
│ │ <header>                                       │   │
│ │  ┌──────────┐   ┌────────────────────────────┐ │   │
│ │  │ Logo     │   │ <nav> Home | About | Contact│ │   │
│ │  └──────────┘   └────────────────────────────┘ │   │
│ └────────────────────────────────────────────────┘   │
│ ┌────────────────────────────────────────────────┐   │
│ │ <main>                                         │   │
│ │  ┌──────────────────┐  ┌──────────────────┐   │   │
│ │  │ <section>        │  │ <aside>          │   │   │
│ │  │  <article>       │  │  Sidebar         │   │   │
│ │  │  </article>      │  │                  │   │   │
│ │  └──────────────────┘  └──────────────────┘   │   │
│ └────────────────────────────────────────────────┘   │
│ ┌────────────────────────────────────────────────┐   │
│ │ <footer>  © 2026 - Contact                     │   │
│ └────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

> 💡 **Box Model trong DevTools:** Khi inspect một element, bạn thấy **Margin → Border → Padding → Content** — chứng minh browser nghĩ về mọi thứ như hộp.

---

### Quy trình 3 bước: Figma → HTML

#### Bước 1 — Chia vùng lớn (nheo mắt)

```
Figma Design:              Sau khi "nheo mắt":
┌─────────────────┐        ┌─────────────────┐
│ Logo    Menu    │        │ 📦 HEADER        │
├─────────────────┤        ├─────────────────┤
│                 │        │                 │
│  Nội dung chính │        │ 📦 MAIN          │
│                 │        │                 │
├─────────────────┤        ├─────────────────┤
│ Copyright       │        │ 📦 FOOTER        │
└─────────────────┘        └─────────────────┘
```

#### Bước 2 — Chia hộp con (zoom vào từng vùng)

```
📦 HEADER gồm:
  ├── 📦 Logo (img hoặc text)
  └── 📦 Navigation (danh sách links)

📦 MAIN gồm:
  ├── 📦 Hero Section
  │    ├── 📦 Text (h1 + p + button)
  │    └── 📦 Image (img)
  └── 📦 Features Section
       ├── 📦 Card 1 (article)
       ├── 📦 Card 2 (article)
       └── 📦 Card 3 (article)
```

#### Bước 3 — Gán thẻ HTML (semantic tags)

```html
<header>
    <a href="/" class="logo">Brand</a>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</header>

<main>
    <section class="hero">
        <div class="hero-text">
            <h1>Tiêu đề chính</h1>
            <p>Mô tả ngắn</p>
            <button>Call to Action</button>
        </div>
        <div class="hero-image">
            <img src="hero.jpg" alt="Hero image">
        </div>
    </section>
</main>

<footer>
    <p>© 2026 - Company</p>
</footer>
```

---

### Semantic Tags — "Hộp có tên" vs "Hộp không tên"

| Thẻ generic ❌ | Thẻ semantic ✅ | Ý nghĩa |
|---|---|---|
| `<div class="header">` | `<header>` | Đầu trang — logo, navigation |
| `<div class="nav">` | `<nav>` | Thanh điều hướng |
| `<div class="content">` | `<main>` | Nội dung chính (CHỈ 1 per page) |
| `<div class="section">` | `<section>` | Phân đoạn nội dung có tiêu đề |
| `<div class="article">` | `<article>` | Nội dung độc lập (bài viết, sản phẩm, comment) |
| `<div class="sidebar">` | `<aside>` | Nội dung phụ, sidebar |
| `<div class="footer">` | `<footer>` | Cuối trang — copyright, liên hệ |

**Tại sao semantic quan trọng:**
- **Google** đọc semantic tags để hiểu nội dung → **SEO tốt hơn**
- **Screen reader** dùng semantic để điều hướng → **Accessibility**
- **Team** đọc code dễ hơn vì tên thẻ nói lên chức năng

---

### Block vs Inline — Hai loại hộp

| Block Element | Inline Element |
|---|---|
| Chiếm **CẢ DÒNG** — tự xuống dòng mới | Chỉ chiếm **NỘI DUNG** — nằm cùng dòng |
| `<div>`, `<p>`, `<h1–h6>`, `<section>`, `<header>` | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>` |
| Có thể set width/height | Không set width/height trực tiếp được |

```html
<!-- Block: mỗi thẻ xuống dòng mới -->
<h1>Tiêu đề</h1>
<p>Đoạn văn 1</p>
<p>Đoạn văn 2</p>

<!-- Inline: nằm cùng dòng nhau -->
<p>Đây là <strong>chữ đậm</strong> và <em>chữ nghiêng</em> trong cùng một dòng.</p>
```

---

### `class` vs `id` — Thẻ định danh

```html
<!-- class = tên nhóm → nhiều element có thể dùng cùng class -->
<div class="product-card">Sản phẩm 1</div>
<div class="product-card">Sản phẩm 2</div>
<div class="product-card">Sản phẩm 3</div>

<!-- id = định danh duy nhất → MỖI TRANG CHỈ CÓ 1 element với id đó -->
<div id="hero-section">Hero duy nhất</div>
<div id="contact-form">Form liên hệ duy nhất</div>
```

| | `class` | `id` |
|---|---|---|
| Số lượng | Nhiều element cùng class | DUY NHẤT trong trang |
| CSS selector | `.product-card` | `#hero-section` |
| Dùng cho | Style nhóm, component lặp lại | Định danh cụ thể, anchor link, JS target |

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **"Nheo mắt → thấy hộp → đặt tên → viết code."**

Thứ tự không bao giờ đảo ngược. **Junior code trước, nghĩ sau — nên rối. Senior nghĩ trước, code sau — nên gọn.**

---

## 5. 🏭 Real-world Layer — Case Study thực tế

### Phân tích Landing Page Fitness (ví dụ từ thực tập)

**Bản thiết kế:** Logo + Menu (Header) → Tiêu đề lớn + Ảnh vận động viên + Nút CTA (Hero) → Footer

**Bước 1 — Phân tích:**
```
HEADER: Logo "treine.me" + Nav (Home, About, Training)
MAIN:   Hero section = Text-Left + Image-Right
FOOTER: "send us a message @treine.me"
```

**Bước 3 — Code:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>treine.me - Workouts Made Exclusive For You</title>
</head>
<body>
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

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>WORKOUTS MADE EXCLUSIVE FOR <span class="highlight">YOU</span>!</h1>
                <p>Chương trình tập luyện được thiết kế <strong>riêng cho bạn</strong>.</p>
                <button class="cta-button">Start now</button>
            </div>
            <div class="hero-image">
                <img src="images/athlete.png" alt="Vận động viên đang tập luyện">
            </div>
        </section>
    </main>

    <footer>
        <p>send us a message <a href="mailto:hello@treine.me">@treine.me</a></p>
    </footer>
</body>
</html>
```

> **Minh:** *"Ồ! Khi chia hộp xong, viết code dễ hơn hẳn!"*
> **Chị Hà:** *"80% công việc Frontend là PHÂN TÍCH. 20% mới là viết code."*

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập 1: Mổ xẻ website thật bằng DevTools (10 phút)

1. Mở Chrome → vào `shopee.vn`
2. Chuột phải vào thanh tìm kiếm → chọn **"Inspect"**
3. Trả lời:
   - Thanh tìm kiếm nằm trong thẻ gì? (`<header>`? `<div>`? `<form>`?)
   - Input ô tìm kiếm có attribute nào đặc biệt không?
   - Kéo lên phần header — Shopee dùng thẻ semantic hay `<div>`?

4. Lặp lại với: Footer của shopee.vn → Mỗi card sản phẩm → Banner quảng cáo

**Nhận xét:** Shopee dùng `<div>` hay semantic tags nhiều hơn? Điều này nói lên điều gì?

---

### Bài tập 2: Figma → HTML (15 phút)

Cho mô tả layout sau:

> *Landing page: Navbar (logo trái, 3 links phải), Hero (tiêu đề + mô tả + nút CTA bên trái, ảnh bên phải), Features (3 card ngang hàng), Footer (1 dòng copyright)*

**Yêu cầu:** Viết file `index.html` chỉ có **HTML structure** — KHÔNG viết CSS. Dùng semantic tags đúng chỗ. Comment mỗi section.

---

### Bài tập 3: Phân tích bằng tay (5 phút)

Nhìn một trang web bất kỳ đang mở trong browser. Lấy tờ giấy, vẽ sơ đồ "hộp lồng nhau" của nó. Ghi tên thẻ HTML lên mỗi hộp.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Dùng `<div>` cho mọi thứ cũng được"** | `<div>` không có semantic meaning → Google và Screen Reader không hiểu cấu trúc → SEO kém, Accessibility kém |
| **"`<section>` và `<div>` giống nhau"** | `<section>` ngụ ý nội dung có liên quan và thường có tiêu đề. `<div>` chỉ là container trung tính |
| **"`<article>` chỉ dùng cho bài báo"** | `<article>` dùng cho bất kỳ nội dung **độc lập, tái sử dụng được** — bao gồm sản phẩm trong shop, comment, card |
| **"Phân tích bố cục mất thời gian"** | Không phân tích → code xong rồi phải viết lại → mất nhiều thời gian hơn |
| **"`id` và `class` chỉ dùng cho CSS"** | `id` còn dùng cho: anchor link (`href="#section"`), JavaScript target (`getElementById`), form `label[for]` |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Quy trình 3 bước Figma → HTML là gì? Thứ tự có thể đảo không?
2. Tại sao nên dùng `<header>` thay vì `<div class="header">`? Nêu ít nhất 2 lý do.
3. Sự khác biệt giữa `class` và `id` là gì? Cho ví dụ mỗi loại nên dùng khi nào.

### Câu hỏi áp dụng:

4. Trang Shopee có: thanh tìm kiếm, danh mục sản phẩm, banner quảng cáo, giỏ hàng, footer. Bạn sẽ dùng thẻ nào cho: thanh tìm kiếm, mỗi sản phẩm, footer?
5. Một trang blog có: 10 bài viết, mỗi bài có tiêu đề + ngày đăng + nội dung + tags. Bạn dùng `<article>` hay `<section>` cho mỗi bài? Tại sao?

<details>
<summary>👁️ Xem đáp án</summary>

1. **Nhìn tổng thể → Chia hộp nhỏ → Gán thẻ HTML.** KHÔNG đảo thứ tự — phải phân tích xong rồi mới viết code, không phải ngược lại.
2. `<header>` giúp: (1) **Google/SEO** hiểu đây là phần đầu trang, (2) **Screen Reader** điều hướng đúng, (3) **Code dễ đọc** hơn cho team.
3. `class` dùng cho nhiều element (component lặp lại như card, button). `id` dùng cho element DUY NHẤT (hero section, main form, một section cụ thể để anchor link).
4. Thanh tìm kiếm: trong `<header>` bằng `<form>`. Mỗi sản phẩm: `<article>` (nội dung độc lập). Footer: `<footer>`.
5. **`<article>`** — vì mỗi bài viết là nội dung **độc lập**, có thể share riêng, tái sử dụng ở nơi khác (RSS feed, featured post). `<section>` dùng khi các phần liên quan chặt chẽ với nhau.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Box Thinking** = kỹ năng cốt lõi: nheo mắt → thấy hộp → đặt tên → viết code
2. **Quy trình 3 bước**: Chia vùng lớn → Chia hộp con → Gán semantic tags
3. **Semantic > `<div>`** — `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` giúp SEO + Accessibility
4. **Block vs Inline**: Block chiếm cả dòng, Inline chỉ chiếm nội dung
5. **`class` = nhóm, `id` = duy nhất** — không bao giờ đặt cùng `id` cho hai element

---

## 10. ➡️ Next Lesson Bridge

*Minh nhìn sơ đồ hộp trên giấy: "Ổn. Mình biết phải xây gì rồi."*

*"Nhưng cú pháp HTML hoạt động thế nào? `<!DOCTYPE html>` là gì? `<head>` khác `<body>` ở chỗ nào? Tại sao cần `<meta charset='UTF-8'>`?"*

**→ [Bài 01: Introduction to the HTML Universe](./01_introduction_html_universe.md) — Cú pháp, Client-Server, và dòng code đầu tiên.**
