# 🟩 TUẦN 3 - BÀI 13
# **RESPONSIVE LAYOUTS — Website Trên Mọi Màn Hình**

---

## 0. 🎬 Opening Hook

*Minh tự hào khoe Todo App cho bạn gái xem trên iPhone.*

*Chữ nhỏ xíu. Nút bấm chồng lên nhau. Phải zoom in để đọc. Scroll ngang liên tục.*

*"Sao xấu thế?" — Câu hỏi đau lòng nhất một Frontend Developer có thể nghe.*

*"60% lượt truy cập web toàn cầu đến từ mobile," anh Hùng nói. "Trang không responsive = mất 60% người dùng. Google còn phạt SEO bằng cách hạ rank. Responsive không phải tính năng — đó là yêu cầu tối thiểu."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

- **Business**: 60%+ traffic từ mobile → responsive trực tiếp ảnh hưởng doanh thu
- **SEO**: Google dùng "Mobile-First Indexing" — crawl mobile version trước, desktop sau
- **UX**: Người dùng rời trang trong 3 giây nếu không đọc được trên điện thoại
- **Nghề nghiệp**: JD Frontend Developer nào cũng yêu cầu "responsive design skills"

---

## 2. 🌐 Big Picture — Ba thứ tạo nên Responsive Design

```
RESPONSIVE DESIGN = Viewport Meta Tag + Media Queries + Flexible Units

1. Viewport Meta Tag    → Báo mobile browser scale đúng
2. Media Queries        → Thay đổi CSS theo kích thước màn hình
3. Flexible Units       → %, vw, vh, rem thay vì px cứng
   + Flexbox/Grid       → Layout tự điều chỉnh
```

---

## 3. ⚙️ Core Technical Truth

### Bước 0: Viewport Meta Tag — Không thể thiếu

```html
<!-- Trong <head> — PHẢI CÓ -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Thiếu dòng này:** iPhone giả định trang rộng 980px (như desktop) → thu nhỏ lại → chữ bé xíu → UX tệ.

**Có dòng này:** iPhone dùng chiều rộng thật của màn hình (375px) → chữ đúng kích thước → readable.

---

### Media Queries — "Nếu màn hình kích thước X → style Y"

```css
/* Cú pháp cơ bản */
@media (condition) {
    /* CSS chỉ áp dụng khi condition đúng */
}

/* Ví dụ thực tế */
@media (max-width: 768px) {
    /* Áp dụng khi màn hình ≤ 768px (mobile) */
    .sidebar { display: none; }
}

@media (min-width: 768px) and (max-width: 1024px) {
    /* Áp dụng khi 768px ≤ màn hình ≤ 1024px (tablet) */
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Orientation */
@media (orientation: landscape) {
    .hero { height: 100vh; }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    body { background: #1e293b; color: white; }
}
```

---

### Breakpoints chuẩn

| Tên | Min-width | Thiết bị điển hình |
|---|---|---|
| **Mobile** | < 576px | iPhone SE, các điện thoại nhỏ |
| **Mobile L** | ≥ 576px | iPhone Plus, điện thoại ngang |
| **Tablet** | ≥ 768px | iPad dọc, tablet |
| **Desktop** | ≥ 992px | Laptop nhỏ |
| **Desktop L** | ≥ 1200px | Desktop, laptop lớn |
| **Desktop XL** | ≥ 1400px | Màn hình 4K, ultrawide |

---

### Mobile-First vs Desktop-First

**Mobile-First (khuyến nghị ✅):**
```css
/* 1. Code cho mobile trước (không cần @media) */
.product-grid {
    display: grid;
    grid-template-columns: 1fr;     /* 1 cột trên mobile */
    gap: 16px;
}

/* 2. Thêm complexity khi màn hình rộng hơn */
@media (min-width: 576px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);   /* 2 cột tablet nhỏ */
    }
}

@media (min-width: 992px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);   /* 3 cột desktop */
    }
}

@media (min-width: 1200px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);   /* 4 cột desktop lớn */
    }
}
```

**Desktop-First (cách cũ ❌):**
```css
.product-grid { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 1200px) { /* 3 cột */ }
@media (max-width: 992px)  { /* 2 cột */ }
@media (max-width: 576px)  { /* 1 cột */ }
```

**Lý do Mobile-First tốt hơn:**
- Mobile tải ít CSS hơn (mobile chỉ tải mobile styles, không download desktop styles)
- Buộc bạn ưu tiên nội dung quan trọng trước (content thinking)
- Google và performance tools đánh giá cao hơn

---

### Flexible Units — Đơn vị co giãn theo ngữ cảnh

```css
/* px — cứng, không co giãn */
h1 { font-size: 32px; }        /* Luôn 32px dù màn hình nhỏ hay lớn */

/* % — phần trăm của cha */
.sidebar { width: 30%; }       /* 30% chiều rộng cha */

/* rem — relative to root (html) font-size */
h1 { font-size: 2rem; }        /* 2 × 16px = 32px (mặc định) */
p  { font-size: 1rem; }        /* 1 × 16px = 16px */
/* → Người dùng tăng font browser → tất cả text tự scale theo */

/* vw, vh — phần trăm viewport */
.hero { height: 100vh; }       /* Cao bằng 100% chiều cao màn hình */
.banner { width: 100vw; }      /* Rộng bằng 100% chiều rộng màn hình */

/* clamp() — fluid typography giữa min và max */
h1 { font-size: clamp(24px, 5vw, 48px); }
/* Tối thiểu 24px, lý tưởng 5vw, tối đa 48px */
```

---

### Responsive Images & Ảnh

```css
/* Ảnh không bao giờ vỡ khung */
img, video {
    max-width: 100%;    /* Không rộng hơn container cha */
    height: auto;       /* Giữ tỷ lệ */
}

/* Ảnh cover container — phổ biến cho banner/card */
.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;         /* Cắt ảnh để fill container */
    object-position: center;   /* Giữ tâm ảnh */
}
```

---

### Responsive Navigation — Hamburger Menu

```css
/* Mobile: ẩn menu, hiện hamburger button */
.nav-links {
    display: none;
}
.hamburger-btn {
    display: block;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

/* Desktop: hiện menu, ẩn hamburger */
@media (min-width: 768px) {
    .nav-links {
        display: flex;
        gap: 24px;
        list-style: none;
    }
    .hamburger-btn {
        display: none;
    }
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Mobile-First: viết CSS mặc định cho màn hình nhỏ, thêm `@media (min-width:...)` cho lớn hơn.**
> **Không bao giờ quên `<meta name="viewport">` — không có nó, responsive không hoạt động.**

---

## 5. 🏭 Real-world Layer

### Tại sao Shopee load nhanh trên mobile?

1. **Mobile-First CSS**: Mobile nhận ít CSS nhất → parse nhanh nhất
2. **Responsive images**: Ảnh nhỏ hơn cho mobile (`srcset`)
3. **Viewport units** cho hero section (không cần tính toán JS)
4. **System font fallback**: `-apple-system, BlinkMacSystemFont` load ngay, không cần download

### Responsive Images với `srcset` và `<picture>`:

```html
<!-- Cách 1: srcset trên <img> — browser chọn ảnh phù hợp -->
<img srcset="product-400w.jpg 400w,
             product-800w.jpg 800w,
             product-1200w.jpg 1200w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
     src="product-800w.jpg"
     alt="Sản phẩm"
     loading="lazy">

<!-- Cách 2: <picture> — bạn quyết định ảnh nào cho breakpoint nào -->
<picture>
    <source media="(max-width: 480px)" srcset="hero-mobile.webp">
    <source media="(max-width: 1024px)" srcset="hero-tablet.webp">
    <img src="hero-desktop.webp" alt="Hero banner" loading="eager">
</picture>

<!-- Cách 3: Art direction — crop khác nhau cho mỗi màn hình -->
<picture>
    <source media="(max-width: 768px)"
            srcset="product-square.jpg">    <!-- Ảnh vuông cho mobile -->
    <source media="(min-width: 769px)"
            srcset="product-landscape.jpg"> <!-- Ảnh ngang cho desktop -->
    <img src="product-landscape.jpg" alt="Sản phẩm">
</picture>
```

> 💡 **`srcset` = browser chọn** (theo kích thước file). **`<picture>` = developer chọn** (theo breakpoint). Dùng `<picture>` khi muốn control chính xác ảnh nào hiển thị ở mỗi kích thước.

### Test responsive NHANH:

```
DevTools → Ctrl+Shift+M → Device Toolbar
→ Chọn thiết bị từ dropdown (iPhone SE, iPad, Pixel)
hoặc kéo góc để test kích thước tùy ý
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Todo App → Responsive (25 phút)

Nâng cấp `todo.html` + `styles.css`:

**Yêu cầu:**
1. **Mobile** (mặc định): layout 1 cột, padding nhỏ, font nhỏ hơn
2. **Tablet** (≥768px): layout 2 cột (sidebar + content)
3. **Desktop** (≥1024px): max-width 1200px, căn giữa

```css
/* Mobile first */
.layout {
    display: flex;
    flex-direction: column;    /* Mobile: dọc */
    gap: 16px;
    padding: 16px;
}

.sidebar {
    width: 100%;    /* Mobile: full width */
}

/* Tablet */
@media (min-width: 768px) {
    .layout {
        flex-direction: row;   /* Tablet: ngang */
        padding: 24px;
    }
    .sidebar {
        width: 260px;
        flex-shrink: 0;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .layout {
        max-width: 1200px;
        margin: 0 auto;
        padding: 32px;
    }
}
```

**Checklist:**
- [ ] Mở DevTools → Device Toolbar → test iPhone SE (375px)
- [ ] Test iPad (768px)
- [ ] Test Desktop (1440px)
- [ ] Text có readable không ở cả 3 kích thước?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Responsive = thu nhỏ trang desktop cho mobile"** | Không — responsive là **thiết kế lại layout** cho từng kích thước màn hình. Mobile không phải desktop thu nhỏ |
| **"Breakpoint theo device model cụ thể (iPhone 14)"** | Đặt breakpoint theo **nơi design bị vỡ**, không theo model thiết bị. Mỗi năm có device mới |
| **"Chỉ cần test trên máy mình là đủ"** | Cần test ít nhất 3 kích thước: mobile nhỏ (~375px), tablet (~768px), desktop (~1440px) |
| **"Mobile-First chỉ cho người dùng mobile"** | Mobile-First là chiến lược CSS — desktop vẫn được serve đầy đủ, chỉ là CSS viết theo hướng progressive enhancement |
| **"`100vw` = 100% container"** | `100vw` = 100% chiều rộng **viewport** (bao gồm cả scrollbar trên desktop). Dùng `100%` cho container width |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `min-width` và `max-width` trong media query khác nhau thế nào? Cái nào dùng cho Mobile-First?
2. Tại sao `<meta name="viewport">` là bắt buộc cho responsive design?
3. `rem` và `px` khác nhau thế nào? Trường hợp nào nên dùng `rem` thay vì `px`?

### Câu hỏi áp dụng:

4. Bạn muốn layout 4 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile. Viết CSS theo Mobile-First.
5. Trang của bạn trông đẹp trên DevTools mobile emulator nhưng vỡ trên iPhone thật. Nguyên nhân có thể là gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. **`min-width`** = "từ kích thước này trở lên" → dùng cho **Mobile-First** (mặc định mobile, thêm breakpoint cho lớn hơn). **`max-width`** = "từ kích thước này trở xuống" → dùng cho Desktop-First.
2. Thiếu viewport meta tag → mobile browser assume trang rộng ~980px (desktop width) → scale toàn bộ xuống → chữ nhỏ xíu, không readable. Viewport meta tag báo browser: "dùng chiều rộng thiết bị thật".
3. `px` = cố định, không thay đổi theo browser settings. `rem` = relative to root font-size (mặc định 16px). Nên dùng `rem` cho **typography** — nếu người dùng tăng font trong browser settings → tất cả text scale theo, accessible hơn.
4. ```css
   .grid { grid-template-columns: 1fr; }
   @media (min-width: 576px) { .grid { grid-template-columns: repeat(2, 1fr); } }
   @media (min-width: 1200px) { .grid { grid-template-columns: repeat(4, 1fr); } }
   ```
5. Khả năng cao thiếu **`<meta name="viewport">`** trong HTML. Emulator DevTools giả lập viewport đúng, nhưng real device không có viewport meta → scale sai.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<meta name="viewport">`** trong `<head>` — không có = responsive không hoạt động trên thiết bị thật
2. **Mobile-First** = CSS mặc định cho mobile, `@media (min-width:...)` cho tablet/desktop
3. **Breakpoints theo nội dung** (nơi design vỡ), không theo device model cụ thể
4. **`rem` cho font, `%` hoặc Flexbox/Grid cho layout** — tránh dùng `px` cứng cho mọi thứ
5. **Test ít nhất 3 kích thước**: ~375px (mobile), ~768px (tablet), ~1440px (desktop)

---

## 10. ➡️ Next Lesson Bridge

*Todo App responsive rồi! Nhưng vẫn "trắng trơn" — không gradient, không shadow, không animation.*

*"Trang của mình trông như năm 2005," Minh than. "Apple.com có gradient tím-xanh, ảnh nổi 3D, chữ glow..."*

**→ [Bài 14: Styling with CSS](./14_styling_with_css.md) — Gradients, Shadows, Transitions, Animations: 4 vũ khí biến web "bình thường" thành web "premium".**
