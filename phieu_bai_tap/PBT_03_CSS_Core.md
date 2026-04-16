# 📋 PHIẾU BÀI TẬP 03
# **CSS CORE — Selectors, Box Model, Inheritance & Cascade**

> **Tài liệu tham chiếu:** `tuan_2_css_core/08_introduction_css.md` → `11_box_model.md`
>
> ⏱️ **Thời gian:** 150 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — 3 Cách nhúng CSS

Đọc chương 08. Liệt kê 3 cách nhúng CSS vào HTML (inline, internal, external). Mỗi cách:
- Viết 1 ví dụ code
- Ưu điểm và nhược điểm
- Khi nào nên dùng

**Câu hỏi thêm:** Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

Cho HTML sau:

```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```

**Không chạy code**, cho biết mỗi selector sau chọn được element nào? (Ghi cụ thể text content)

```css
1. h1                           → Chọn: ???
2. .price                       → Chọn: ???
3. #app header                  → Chọn: ???
4. nav a:first-child             → Chọn: ???
5. .product.featured h2         → Chọn: ???
6. article > p                  → Chọn: ???
7. a[href="/"]                  → Chọn: ???
8. .top-bar.dark h1              → Chọn: ???
```

**Sau khi trả lời**, tạo file `selectors_test.html` để kiểm chứng đáp án. Chụp screenshot.

### Câu A3 (7đ) — Box Model — Tính toán kích thước

Đọc chương 11 (Box Model). Tính **kích thước thực tế** (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:

```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = ???
→ Không gian chiếm trên trang = ???

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = ???
→ Kích thước content thực tế = ???
→ Không gian chiếm trên trang = ???

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = ???
→ Giải thích tại sao KHÔNG PHẢI 65px
```

**Nâng cao:** Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách = bao nhiêu?

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

Cho các CSS rules sau cùng target 1 element `<p class="price" id="main-price">`:

```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```

1. Tính specificity score (a, b, c) cho mỗi rule
2. Element sẽ có màu gì? Giải thích
3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?
4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?

---

## PHẦN B — THỰC HÀNH CODE (55 điểm)

### Bài B1 (20đ) — Style trang Profile

Lấy file `profile.html` từ PBT_01 (hoặc tạo mới). Tạo file `style.css` external.

**Yêu cầu kỹ thuật:**

- [ ] Dòng đầu tiên CSS: `* { box-sizing: border-box; }`
- [ ] **Body**: font-family, background-color, color, line-height
- [ ] **Header**: background gradient, text color trắng, padding ít nhất 20px
- [ ] **Navigation links**: 
  - Mặc định: không gạch chân, màu cụ thể
  - Hover: đổi màu + gạch chân (dùng `:hover`)
  - Link đang active: kiểu khác biệt (dùng `.active`)
- [ ] **Table kỹ năng**:
  - Border-collapse: collapse
  - Header row: background đậm, text trắng
  - Zebra striping: dùng `tr:nth-child(even)` đổi background
  - Hover row: đổi background (dùng `tr:hover`)
- [ ] **Footer**: background đậm, text nhạt, text-align center
- [ ] **Ít nhất 5 loại selector khác nhau** trong file CSS (element, class, id, descendant, pseudo-class)

**Chấm điểm:**
- 5đ: `border-box` reset + typography cơ bản
- 5đ: Table styling (border-collapse, zebra, hover)
- 5đ: Navigation hover/active states
- 5đ: Sử dụng đa dạng selectors (liệt kê trong `answers.md`)

### Bài B2 (20đ) — Box Model Lab

Tạo file `boxmodel_lab.html` + `boxmodel.css`.

**Phần 1 — Chứng minh content-box vs border-box (10đ):**

Tạo 2 hộp (`div`) cạnh nhau, cùng `width: 300px`, `padding: 20px`, `border: 5px solid`:
- Hộp 1: `box-sizing: content-box` (mặc định)
- Hộp 2: `box-sizing: border-box`

Bên dưới, dùng DevTools đo chiều rộng thật của mỗi hộp. **Chụp screenshot DevTools** hiển thị box model diagram cho mỗi hộp (tab Computed).

Trong `answers.md`, ghi:
```
Hộp 1 (content-box): chiều rộng thực tế = ??? px (đo từ DevTools)
Hộp 2 (border-box): chiều rộng thực tế = ??? px (đo từ DevTools)
Giải thích sự khác biệt: ...
```

**Phần 2 — Layout 3 cột (10đ):**

Tạo layout 3 cột trong 1 container `1000px`:
- Cột trái (sidebar): `250px`, background nhạt, `padding: 15px`
- Cột giữa (content): `500px`, `padding: 20px`
- Cột phải (ads): `250px`, background nhạt, `padding: 15px`

**Điều kiện:** Tổng 3 cột phải = 1000px. Nếu KHÔNG dùng `border-box`, tính toán cho thấy tổng > 1000px. Chụp screenshot cả 2 trường hợp.

### Bài B3 (15đ) — Specificity Battle

Tạo file `specificity.html` + `specificity.css`.

Tạo 1 trang với phần tử: `<p id="demo" class="text highlight">Hello World</p>`

**Yêu cầu:** Viết **10 CSS rules khác nhau** cùng target phần tử trên, mỗi rule đặt `color` khác nhau. Sắp xếp TỪ THẤP ĐẾN CAO theo specificity.

```css
/* Ví dụ: */
p { color: ???; }                          /* Specificity: 0,0,1 */
.text { color: ???; }                      /* Specificity: 0,1,0 */
/* ... thêm 8 rules nữa ... */
```

Trong `answers.md`:
1. Liệt kê 10 rules + specificity score
2. Element cuối cùng hiển thị màu gì? Tại sao?
3. Chụp screenshot kết quả
4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

---

## PHẦN C — DEBUG & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug CSS Layout

Layout dưới đây bị vỡ. Container rộng `960px`, sidebar + content phải nằm **cạnh nhau**. Nhưng content bị đẩy xuống dòng mới.

```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

1. Tính chiều rộng **thực tế** của sidebar và content (content-box!)
2. Giải thích tại sao layout bị vỡ
3. Đưa ra **2 cách sửa** khác nhau (1 cách dùng border-box, 1 cách không dùng)
4. Tạo file `debug_layout.html` + `debug_layout.css` chứng minh cả 2 cách sửa hoạt đ

### Câu C2 (10đ) — Cascade Puzzle

Cho CSS file:

```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

Và HTML:

```html
<body>
    <div class="container">
        <div class="card" id="featured">
            <h2 class="title highlight">Sản phẩm A</h2>
            <p>Mô tả sản phẩm</p>
        </div>
        <div class="card">
            <h2 class="title">Sản phẩm B</h2>
            <p class="highlight">Mô tả sản phẩm B</p>
        </div>
    </div>
</body>
```

**Không chạy code**, trả lời:
1. "Sản phẩm A" (h2) có `font-size` = ? và `color` = ?
2. "Mô tả sản phẩm" (p trong card featured) có `color` = ?
3. "Sản phẩm B" (h2) có `font-size` = ? và `color` = ?
4. "Mô tả sản phẩm B" (p.highlight) có `color` = ?

Giải thích chi tiết quá trình cascade + inheritance cho mỗi câu.

Sau đó, tạo file HTML+CSS kiểm chứng và chụp screenshot.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 7-10 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Chứng minh content-box vs border-box"

**Yêu cầu:** Quay video tạo 2 hộp div so sánh, vừa code vừa giải thích Box Model.

**Trong video, bạn phải:**

1. 🎤 Tạo file HTML + CSS từ đầu
2. 🎤 Tạo 2 div cùng `width: 300px; padding: 20px; border: 5px solid`:
   - Div 1: `box-sizing: content-box` (mặc định)
   - Div 2: `box-sizing: border-box`
3. 🎤 **Tính toán miệng** trước khi xem kết quả: "Div 1 sẽ rộng bao nhiêu? 300 + 40 + 10 = 350px"
4. 🎤 Mở DevTools → tab Computed → chỉ vào **Box Model diagram**, đọc kích thước thực tế
5. 🎤 Giải thích tại sao `* { box-sizing: border-box; }` là dòng đầu tiên trong mọi dự án
6. 🎤 Demo Margin Collapse: tạo 2 div liên tiếp với margin khác nhau → chứng minh margin không cộng

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Tính toán bằng miệng TRƯỚC khi xem DevTools
- [ ] Show DevTools Box Model diagram cho cả 2 divs
- [ ] Cuối video: Tổng kết sự khác biệt

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] File `selectors_test.html` — Câu A2 kiểm chứng
- [ ] File `profile.html` + `style.css` — Bài B1
- [ ] File `boxmodel_lab.html` + `boxmodel.css` — Bài B2
- [ ] File `specificity.html` + `specificity.css` — Bài B3
- [ ] File `debug_layout.html` + `debug_layout.css` — Câu C1
- [ ] Folder `screenshots/` — DevTools box model diagrams
- [ ] 🎬 **Video OBS** — `videos/PBT03_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **4 commits**
