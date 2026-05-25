# Exercise 3.1 — Skill Filter Animation

## 🎬 Opening Scenario

*Portfolio cần có filter cho portfolio items theo category. JavaScript sẽ toggle visibility của items dựa trên data-category attribute.*

---

## 📋 Requirements

### HTML Structure

```html
<section id="portfolio" class="portfolio-section py-5">
    <div class="container">
        <h2 class="text-center mb-4">My Portfolio</h2>

        <!-- Filter Buttons -->
        <div class="filter-buttons d-flex justify-content-center gap-3 mb-5">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
            <button class="filter-btn" data-filter="design">Design</button>
        </div>

        <!-- Portfolio Grid -->
        <div class="portfolio-grid row g-4">
            <div class="portfolio-item col-12 col-md-6 col-lg-4" data-category="web">
                <div class="card">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5>E-Commerce Website</h5>
                        <span class="badge bg-primary">Web</span>
                    </div>
                </div>
            </div>

            <div class="portfolio-item col-12 col-md-6 col-lg-4" data-category="mobile">
                <div class="card">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5>Health Tracker App</h5>
                        <span class="badge bg-success">Mobile</span>
                    </div>
                </div>
            </div>

            <!-- Thêm items khác -->
        </div>
    </div>
</section>
```

### JavaScript Implementation

```javascript
// 1. Select all filter buttons and portfolio items
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// 2. Add click event to each button
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value
        const filterValue = button.dataset.filter;

        // Filter portfolio items
        portfolioItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'block';
                item.classList.add('show');
            } else {
                item.style.display = 'none';
                item.classList.remove('show');
            }
        });
    });
});
```

---

## 🎨 Animation Effect

```css
.portfolio-item {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.portfolio-item.hide {
    opacity: 0;
    transform: scale(0.8);
}

.portfolio-item.show {
    opacity: 1;
    transform: scale(1);
}
```

---

## 🐛 Hints

### Dataset Attribute
```javascript
// Get category from data-category attribute
const category = item.dataset.category;

// Same as
const category = item.getAttribute('data-category');
```

### Active Button Styling
```css
.filter-btn.active {
    background: var(--color-primary);
    color: white;
}
```

---

## 🪜 Step-by-Step Guide — Từng bước một

### Bước 1: Chuẩn bị HTML (5 phút)

1. Copy `index.html` từ Session 2 (Bootstrap portfolio)
2. Đảm bảo mỗi portfolio item có `data-category`:
```html
<div class="portfolio-item col-12 col-md-6 col-lg-4" data-category="web">
```
3. Thêm filter buttons ở trên portfolio grid:
```html
<div class="filter-buttons d-flex justify-content-center gap-3 mb-5">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="web">Web</button>
    <button class="filter-btn" data-filter="mobile">Mobile</button>
    <button class="filter-btn" data-filter="design">Design</button>
</div>
```

**Test ngay:** Refresh → thấy buttons nhưng chưa hoạt động (chưa có JS).

---

### Bước 2: Style Filter Buttons (5 phút)

```css
.filter-btn {
    padding: 8px 20px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.filter-btn.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
}
```

---

### Bước 3: Viết JavaScript — Từng dòng một (15 phút)

Tạo file `js/portfolio-filter.js`:

```javascript
// ===== BƯỚC 1: Chọn elements =====
// querySelectorAll = chọn TẤT CẢ phần tử khớp selector
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// In ra console để kiểm tra đã chọn đúng chưa
console.log('Filter buttons:', filterButtons.length);  // Phải = 4
console.log('Portfolio items:', portfolioItems.length); // Phải = 6

// ===== BƯỚC 2: Thêm click event cho mỗi button =====
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Clicked:', button.dataset.filter); // Debug

        // BƯỚC 3: Xóa active class khỏi TẤT CẢ buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // BƯỚC 4: Thêm active class cho button ĐƯỢC CLICK
        button.classList.add('active');

        // BƯỚC 5: Lấy giá trị filter
        const filterValue = button.dataset.filter;
        // Ví dụ: button có data-filter="web" → filterValue = "web"

        // BƯỚC 6: Lọc portfolio items
        portfolioItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (filterValue === 'all' || filterValue === itemCategory) {
                // Hiện item — thêm class 'show' cho animation
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                // Ẩn item — thêm class 'hide' cho animation
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});
```

> **💡 `dataset.filter` là gì?** Attribute `data-filter="web"` trong HTML → trong JS truy cập bằng `element.dataset.filter` → trả về `"web"`. Prefix `data-` bị bỏ, còn `filter` chuyển thành camelCase.

---

### Bước 4: Thêm Animation CSS (5 phút)

```css
/* ===== Filter Animation ===== */
.portfolio-item {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.portfolio-item.show {
    opacity: 1;
    transform: scale(1);
    display: block;         /* Đảm bảo hiện */
}

.portfolio-item.hide {
    opacity: 0;
    transform: scale(0.8);
    /* Sau animation → ẩn hoàn toàn */
    position: absolute;
    pointer-events: none;
}
```

> **💡 Tại sao dùng `classList.add/remove` thay vì `style.display`?** Vì `classList` tách biệt logic (JS) khỏi presentation (CSS). CSS quyết định animation, JS chỉ toggle class. Dễ maintain hơn.

---

### Bước 5: Link file JS vào HTML (1 phút)

```html
<!-- Thêm trước </body> -->
<script src="js/portfolio-filter.js"></script>
```

**Test ngay:**
1. Click "Web" → chỉ hiện items web
2. Click "Mobile" → chỉ hiện items mobile
3. Click "All" → hiện tất cả
4. Mở Console (F12) → xem log messages

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Buttons không click được | JS chưa load hoặc selector sai | Kiểm tra Console → xem có error không |
| `querySelectorAll` trả về 0 | Class name sai hoặc HTML chưa render | Kiểm tra spelling `.filter-btn` vs `.filter-btns` |
| `dataset` trả về `undefined` | Attribute sai: `data-filter` vs `data-category` | Kiểm tra HTML: `data-filter="web"` trên button |
| Items không ẩn hiện | Class name JS không khớp CSS | Đảm bảo `.show` và `.hide` tồn tại trong CSS |
| Animation không mượt | Thiếu `transition` trên `.portfolio-item` | Thêm `transition: opacity 0.4s, transform 0.4s` |
| Active button không đổi | Thiếu `classList.remove('active')` trước khi add | Phải remove khỏi TẤT CẢ trước khi add cho 1 |

---

## ✅ Success Criteria

- [ ] Filter buttons clickable
- [ ] Active button styled differently
- [ ] Items filter correctly by category
- [ ] "All" shows all items
- [ ] Smooth transition animation

---

**← [ Quay lại Session 3](../README.md)**