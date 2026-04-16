# 🟦 BÀI 02: BOOTSTRAP 5 - GRID SYSTEM

## 🎬 "Chia Pizza Thành 12 Miếng" — Bí Mật Layout Responsive

*Minh hỏi: "Tại sao Bootstrap dùng 12 cột? Sao không 10?"*

*Anh Hùng: "Vì 12 chia được cho 2, 3, 4, 6! Chia đôi = 6+6. Chia ba = 4+4+4. Chia tư = 3+3+3+3. Như pizza 12 miếng — chia cho mấy người cũng đều."*

> 💡 **Grid System = Nền tảng Bootstrap.** Nắm Grid = nắm 50% Bootstrap.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Grid System 12 cột của Bootstrap hoạt động như thế nào
- Sử dụng Container, Row, Col đúng cách
- Hiểu Responsive breakpoints và cách áp dụng
- Tạo layout responsive với Grid System
- Xử lý các trường hợp đặc biệt (nested columns, offset, etc.)

---

# 1. **GRID SYSTEM LÀ GÌ?**

Hãy tưởng tượng màn hình như một tờ giấy. Bootstrap chia tờ giấy đó thành **12 cột bằng nhau** (giống như chia bánh pizza thành 12 miếng).

```
┌─────────────────────────────────────────┐
│ 1  2  3  4  5  6  7  8  9  10 11 12    │  ← 12 cột
└─────────────────────────────────────────┘
```

**Quy tắc vàng:**
- Tổng số cột trong 1 hàng (row) **phải bằng 12**
- Ví dụ: `col-6 + col-6 = 12` ✅ | `col-4 + col-4 + col-4 = 12` ✅
- Không được: `col-6 + col-7 = 13` ❌ (Vượt quá 12, sẽ bị xuống dòng)

---

# 2. **CẤU TRÚC CƠ BẢN: CONTAINER → ROW → COL**

Grid System có 3 thành phần chính, phải theo thứ tự:

```
Container (Bọc ngoài)
  └── Row (Hàng)
      └── Col (Cột)
```

## 2.1. Container - Bọc ngoài cùng

Container là "khung" bọc toàn bộ nội dung. Có 2 loại:

### Container (Fixed width - Khuyên dùng)

```html
<div class="container">
  <!-- Nội dung ở đây -->
</div>
```

**Đặc điểm:**
- Có max-width cố định theo từng breakpoint
- Tự động căn giữa
- Có padding trái/phải tự động
- Responsive: Tự động điều chỉnh width theo màn hình

**Max-width theo breakpoint:**
- Mobile (< 576px): Full width
- Tablet (≥ 576px): 540px
- Desktop (≥ 768px): 720px
- Large (≥ 992px): 960px
- XL (≥ 1200px): 1140px
- XXL (≥ 1400px): 1320px

### Container-fluid (Full width)

```html
<div class="container-fluid">
  <!-- Nội dung ở đây -->
</div>
```

**Đặc điểm:**
- Luôn full width (100%)
- Không có max-width
- Dùng khi muốn nội dung tràn hết màn hình

**Khi nào dùng:**
- Hero section (banner lớn)
- Footer full width
- Background image full screen

---

## 2.2. Row - Hàng chứa các cột

Row là "hàng" chứa các cột. **Bắt buộc phải nằm trong Container.**

```html
<div class="container">
  <div class="row">
    <!-- Các cột (col) nằm ở đây -->
  </div>
</div>
```

**Đặc điểm:**
- Có margin âm (negative margin) để bù padding của container
- Dùng Flexbox để sắp xếp các cột
- Các cột tự động wrap xuống dòng nếu tổng > 12

---

## 2.3. Col - Cột (Phần tử con)

Col là các "cột" chứa nội dung thực tế. **Bắt buộc phải nằm trong Row.**

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Cột 1</div>
    <div class="col-md-6">Cột 2</div>
  </div>
</div>
```

**Cú pháp:**
- `col-{breakpoint}-{số cột}`
- Ví dụ: `col-md-6` = Trên màn hình ≥ 768px, chiếm 6/12 cột (50%)

---

# 3. **RESPONSIVE BREAKPOINTS - ĐIỂM NGẮT MÀN HÌNH**

Bootstrap có 6 breakpoints (điểm ngắt màn hình):

| Breakpoint | Kích thước | Tên gọi | Thiết bị |
|------------|------------|---------|----------|
| **xs** | < 576px | Extra Small | Mobile nhỏ |
| **sm** | ≥ 576px | Small | Mobile lớn |
| **md** | ≥ 768px | Medium | Tablet |
| **lg** | ≥ 992px | Large | Desktop |
| **xl** | ≥ 1200px | Extra Large | Desktop lớn |
| **xxl** | ≥ 1400px | 2X Large | Màn hình rất lớn |

**Quy tắc quan trọng:**
- Khi bạn dùng `col-md-6`, nó áp dụng cho **md trở lên** (md, lg, xl, xxl)
- Dưới md (< 768px), các cột sẽ tự động full width (100%)

---

# 4. **VÍ DỤ TỪNG BƯỚC**

## 4.1. Ví dụ 1: Layout 2 cột đơn giản

**Yêu cầu:** Tạo layout 2 cột bằng nhau trên tablet trở lên, mobile thì xếp chồng.

**Bước 1:** Tạo file `grid-example-1.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid Example 1</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    /* Thêm border để nhìn rõ các cột */
    .col-md-6 {
      border: 2px solid #007bff;
      padding: 20px;
      background-color: #f8f9fa;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="text-center my-4">Layout 2 Cột</h1>
    
    <div class="row">
      <div class="col-md-6">
        <h2>Cột Trái</h2>
        <p>Nội dung cột trái ở đây. Trên mobile (< 768px), cột này sẽ chiếm 100% width.</p>
      </div>
      <div class="col-md-6">
        <h2>Cột Phải</h2>
        <p>Nội dung cột phải ở đây. Trên tablet trở lên (≥ 768px), 2 cột sẽ nằm ngang nhau, mỗi cột 50%.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Giải thích từng dòng:**
1. `<div class="container">` - Tạo container, tự động căn giữa và responsive
2. `<div class="row">` - Tạo hàng chứa các cột
3. `<div class="col-md-6">` - Cột 1: Trên màn hình ≥ 768px, chiếm 6/12 cột (50%)
4. `<div class="col-md-6">` - Cột 2: Trên màn hình ≥ 768px, chiếm 6/12 cột (50%)
5. Tổng: 6 + 6 = 12 ✅

**Kết quả:**
- **Mobile (< 768px):** 2 cột xếp chồng, mỗi cột 100% width
- **Tablet trở lên (≥ 768px):** 2 cột nằm ngang, mỗi cột 50% width

**Thử nghiệm:**
1. Mở file trong trình duyệt
2. Mở DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
3. Thử các kích thước màn hình khác nhau để xem layout thay đổi

---

## 4.2. Ví dụ 2: Layout 3 cột

**Yêu cầu:** Tạo layout 3 cột bằng nhau trên desktop, 2 cột trên tablet, 1 cột trên mobile.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid Example 2 - 3 Cột</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .col-md-6, .col-lg-4 {
      border: 2px solid #28a745;
      padding: 20px;
      background-color: #f8f9fa;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="text-center my-4">Layout 3 Cột Responsive</h1>
    
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4">
        <h3>Cột 1</h3>
        <p>Mobile: 100% | Tablet: 50% | Desktop: 33.33%</p>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <h3>Cột 2</h3>
        <p>Mobile: 100% | Tablet: 50% | Desktop: 33.33%</p>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <h3>Cột 3</h3>
        <p>Mobile: 100% | Tablet: 50% | Desktop: 33.33%</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Giải thích:**
- `col-12`: Mobile (< 576px): Chiếm 12/12 cột = 100% width
- `col-md-6`: Tablet (≥ 768px): Chiếm 6/12 cột = 50% width
- `col-lg-4`: Desktop (≥ 992px): Chiếm 4/12 cột = 33.33% width

**Kết quả:**
- **Mobile (< 768px):** 3 cột xếp chồng, mỗi cột 100%
- **Tablet (768px - 991px):** 2 cột trên 1 hàng (50% mỗi cột), cột 3 xuống hàng dưới
- **Desktop (≥ 992px):** 3 cột nằm ngang, mỗi cột 33.33%

---

## 4.3. Ví dụ 3: Layout không đều (Asymmetric)

**Yêu cầu:** Sidebar nhỏ bên trái (25%), Content lớn bên phải (75%).

```html
<div class="container">
  <div class="row">
    <div class="col-md-3">
      <h4>Sidebar</h4>
      <p>Chiếm 3/12 cột = 25%</p>
    </div>
    <div class="col-md-9">
      <h4>Main Content</h4>
      <p>Chiếm 9/12 cột = 75%</p>
    </div>
  </div>
</div>
```

**Kiểm tra:** 3 + 9 = 12 ✅

---

## 4.4. Ví dụ 4: Layout phức tạp với nhiều breakpoints

**Yêu cầu:** 
- Mobile: 1 cột (100%)
- Tablet: 2 cột (50% mỗi cột)
- Desktop: 4 cột (25% mỗi cột)

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <div class="card-body">Card 1</div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <div class="card-body">Card 2</div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <div class="card-body">Card 3</div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <div class="card-body">Card 4</div>
      </div>
    </div>
  </div>
</div>
```

**Giải thích:**
- `col-12`: Mobile: 100% (1 cột trên 1 hàng)
- `col-md-6`: Tablet: 50% (2 cột trên 1 hàng)
- `col-lg-3`: Desktop: 25% (4 cột trên 1 hàng)

---

# 5. **CÁC TRƯỜNG HỢP ĐẶC BIỆT**

## 5.1. Auto-sizing Columns (Tự động chia đều)

Nếu bạn không chỉ định số cột, Bootstrap sẽ tự động chia đều:

```html
<div class="row">
  <div class="col">Cột 1 (tự động)</div>
  <div class="col">Cột 2 (tự động)</div>
  <div class="col">Cột 3 (tự động)</div>
</div>
```

→ 3 cột, mỗi cột chiếm 4/12 = 33.33%

**Lưu ý:** Chỉ dùng khi số cột chia hết cho 12.

---

## 5.2. Offset Columns (Tạo khoảng trống)

Dùng `offset` để tạo khoảng trống bên trái:

```html
<div class="row">
  <div class="col-md-4 offset-md-4">
    Cột này căn giữa (offset 4 cột bên trái)
  </div>
</div>
```

**Giải thích:**
- `col-md-4`: Chiếm 4/12 cột (33.33%)
- `offset-md-4`: Tạo khoảng trống 4 cột bên trái
- Kết quả: Cột căn giữa (4 offset + 4 col = 8, còn 4 cột bên phải)

---

## 5.3. Nested Columns (Cột lồng nhau)

Bạn có thể đặt Row và Col bên trong một Col:

```html
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <h3>Main Content</h3>
      
      <!-- Nested Grid -->
      <div class="row">
        <div class="col-md-6">Nested Col 1</div>
        <div class="col-md-6">Nested Col 2</div>
      </div>
    </div>
    <div class="col-md-4">
      <h3>Sidebar</h3>
    </div>
  </div>
</div>
```

**Lưu ý:** Khi nested, 12 cột được tính lại từ cột cha. Ví dụ: Col cha 8/12, thì nested col-6 = 6/12 của 8 = 50% của cột cha.

---

## 5.4. Column Wrapping (Cột tự động xuống dòng)

Nếu tổng số cột > 12, các cột thừa sẽ tự động xuống dòng:

```html
<div class="row">
  <div class="col-md-6">Cột 1 (6)</div>
  <div class="col-md-6">Cột 2 (6)</div>
  <div class="col-md-6">Cột 3 (6) - Sẽ xuống dòng mới</div>
</div>
```

**Kết quả:**
- Hàng 1: Cột 1 + Cột 2 (6 + 6 = 12)
- Hàng 2: Cột 3 (6, còn 6 cột trống)

---

# 6. **BEST PRACTICES - THỰC HÀNH TỐT**

## 6.1. Luôn bắt đầu với Mobile

Bootstrap là **Mobile-First**, nên:
- ✅ Viết class cho mobile trước: `col-12`
- ✅ Sau đó thêm breakpoint lớn hơn: `col-md-6`
- ❌ Đừng chỉ dùng `col-md-6` mà không có `col-12` (trên mobile sẽ lỗi)

## 6.2. Kiểm tra tổng số cột

Luôn đảm bảo tổng số cột trong 1 row = 12:
- ✅ `col-6 + col-6 = 12`
- ✅ `col-4 + col-4 + col-4 = 12`
- ❌ `col-6 + col-7 = 13` (Sẽ bị lỗi layout)

## 6.3. Dùng Container đúng cách

- ✅ Dùng `container` cho nội dung chính (có max-width)
- ✅ Dùng `container-fluid` cho hero section, footer full width
- ❌ Đừng đặt Row trực tiếp trong body (phải có Container)

---

# 7. **BÀI TẬP THỰC HÀNH**

## Bài tập 1: Tạo Layout Blog

**Yêu cầu:**
- Header: Full width
- Main: Content 70% + Sidebar 30% trên desktop
- Footer: Full width

**Gợi ý:**
```html
<!-- Header -->
<header class="container-fluid bg-primary text-white p-4">
  <h1>My Blog</h1>
</header>

<!-- Main Content -->
<div class="container my-4">
  <div class="row">
    <div class="col-md-9">
      <article>
        <h2>Blog Post Title</h2>
        <p>Content here...</p>
      </article>
    </div>
    <div class="col-md-3">
      <aside>
        <h3>Sidebar</h3>
        <p>Sidebar content...</p>
      </aside>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="container-fluid bg-dark text-white p-4">
  <p class="text-center">© 2025 My Blog</p>
</footer>
```

## Bài tập 2: Tạo Product Grid

**Yêu cầu:**
- Mobile: 1 sản phẩm/hàng
- Tablet: 2 sản phẩm/hàng
- Desktop: 4 sản phẩm/hàng

**Gợi ý:** Dùng `col-12 col-md-6 col-lg-3`

---

# 8. **TROUBLESHOOTING - XỬ LÝ LỖI THƯỜNG GẶP**

## Lỗi 1: Cột không nằm ngang

**Triệu chứng:** Các cột vẫn xếp chồng trên desktop

**Nguyên nhân:** Thiếu class `row` hoặc `container`

**Giải pháp:**
```html
<!-- ❌ SAI -->
<div class="container">
  <div class="col-md-6">Cột 1</div>
  <div class="col-md-6">Cột 2</div>
</div>

<!-- ✅ ĐÚNG -->
<div class="container">
  <div class="row">
    <div class="col-md-6">Cột 1</div>
    <div class="col-md-6">Cột 2</div>
  </div>
</div>
```

## Lỗi 2: Layout bị lệch

**Triệu chứng:** Cột không đúng kích thước mong muốn

**Nguyên nhân:** Tổng số cột không bằng 12

**Giải pháp:** Kiểm tra lại: `col-6 + col-6 = 12` ✅

## Lỗi 3: Không responsive trên mobile

**Triệu chứng:** Layout vẫn giữ nguyên trên mobile

**Nguyên nhân:** Chỉ dùng breakpoint lớn, thiếu class cho mobile

**Giải pháp:** Luôn thêm `col-12` trước:
```html
<!-- ❌ SAI -->
<div class="col-md-6">Cột</div>

<!-- ✅ ĐÚNG -->
<div class="col-12 col-md-6">Cột</div>
```

---

# 9. **TỔNG KẾT**

**Những điều quan trọng cần nhớ:**

1. ✅ **Cấu trúc:** Container → Row → Col (bắt buộc theo thứ tự)
2. ✅ **Quy tắc 12:** Tổng số cột trong 1 row = 12
3. ✅ **Mobile-First:** Luôn bắt đầu với mobile (`col-12`)
4. ✅ **Breakpoints:** md = 768px, lg = 992px, xl = 1200px
5. ✅ **Responsive:** Class áp dụng cho breakpoint đó trở lên

**Công thức nhớ:**
```
col-{breakpoint}-{số cột}
Ví dụ: col-md-6 = Trên màn hình ≥ 768px, chiếm 6/12 cột
```

---

# 10. **KIỂM TRA HIỂU BÀI**

Trả lời các câu hỏi sau:

1. **Câu hỏi 1:** `col-md-6` có nghĩa là gì?
   - A. Chiếm 6 cột trên mọi màn hình
   - B. Chiếm 6/12 cột trên màn hình ≥ 768px
   - C. Chiếm 6/12 cột trên màn hình < 768px

2. **Câu hỏi 2:** Layout `col-4 + col-4 + col-5` có đúng không?
   - A. Đúng
   - B. Sai (tổng = 13, vượt quá 12)

3. **Câu hỏi 3:** Muốn 3 cột bằng nhau trên desktop, dùng class gì?
   - A. `col-lg-3` (3 + 3 + 3 = 9)
   - B. `col-lg-4` (4 + 4 + 4 = 12) ✅

**Đáp án:** 1-B, 2-B, 3-B

---

**Bài tiếp theo:** [03. Components](../03_components/03_components.md) - Buttons, Cards, Navbar, Forms, và nhiều components khác

> [!TIP]
> **Lời khuyên:** Hãy thực hành nhiều với Grid System. Đây là phần quan trọng nhất của Bootstrap. Khi đã nắm vững Grid System, các phần khác sẽ dễ dàng hơn rất nhiều!
