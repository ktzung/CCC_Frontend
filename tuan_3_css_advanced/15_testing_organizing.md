# 🟩 TUẦN 3 - BÀI 15
# **TESTING & ORGANIZING CSS**

---

## 0. 🎬 Opening Hook

*Minh sửa `.title { color: red; }` trong file `style.css`. Ý định: chỉ đổi title của Todo page.*

*Kết quả: title ở trang About, trang Contact, trang Profile — tất cả đều đỏ.*

*"CSS không có scope!" Minh nhận ra. `.title` = MỌI element có class `title` trong toàn bộ website.*

*"Đây là vấn đề số 1 khi CSS đi sản xuất," chị Hà nói. "Shopee có 50.000 dòng CSS. Sửa 1 class → ảnh hưởng 20 trang. Giải pháp: BEM naming, CSS Variables, và Modular structure."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Khi project nhỏ: 1 file CSS, code tùy ý → OK.

Khi project lớn (BTL, internship, thực tế):
- 10+ trang, 5+ developers → CSS spaghetti
- 1 developer sửa → 3 trang vỡ
- Không ai dám xóa CSS cũ vì không biết dùng ở đâu

BEM + CSS Variables + Modular CSS = kiến trúc CSS có thể mở rộng và maintain.

---

## 2. 🌐 Big Picture — Ba trụ cột CSS Scalable

```
CSS SCALABLE ARCHITECTURE

1. CSS VARIABLES (:root)
   → Màu sắc, spacing, font size — 1 chỗ, dùng khắp nơi

2. BEM NAMING CONVENTION
   → Class name không bao giờ xung đột giữa components

3. MODULAR FILE STRUCTURE
   → Mỗi component 1 file → dễ tìm, dễ sửa, dễ test
```

---

## 3. ⚙️ Core Technical Truth

### CSS Variables (Custom Properties) — "Sửa 1 chỗ, 47 chỗ tự đổi"

```css
/* Khai báo variables trong :root (global scope) */
:root {
    /* Colors */
    --color-primary:    #2563eb;
    --color-primary-dark: #1d4ed8;
    --color-danger:     #dc2626;
    --color-success:    #16a34a;
    --color-text:       #1e293b;
    --color-text-muted: #64748b;
    --color-bg:         #f8fafc;
    --color-surface:    #ffffff;

    /* Spacing scale */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-6: 24px;
    --space-8: 32px;

    /* Typography */
    --font-size-sm:  14px;
    --font-size-base: 16px;
    --font-size-lg:  18px;
    --font-size-xl:  24px;
    --font-size-2xl: 32px;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    /* Borders */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 30px rgba(0,0,0,0.12);

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
}

/* Sử dụng */
.btn-primary {
    background: var(--color-primary);
    color: white;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast);
}

.btn-primary:hover {
    background: var(--color-primary-dark);
}
```

**Đổi màu brand: chỉ sửa `--color-primary` → toàn site đổi.**

**Dark mode với CSS Variables:**
```css
:root { --color-bg: #f8fafc; --color-text: #1e293b; }

@media (prefers-color-scheme: dark) {
    :root {
        --color-bg:   #0f172a;
        --color-text: #f1f5f9;
    }
}

body { background: var(--color-bg); color: var(--color-text); }
/* Dark mode tự động — không cần viết lại styles */
```

---

### BEM — Block Element Modifier

**Cú pháp: `block__element--modifier`**

```
block        = component độc lập (card, navbar, form)
__element    = phần tử thuộc block (card__title, navbar__logo)
--modifier   = biến thể/trạng thái (btn--primary, card--featured)
```

```html
<!-- Block -->
<div class="card">
    <!-- Elements -->
    <img class="card__image" src="product.jpg" alt="Sản phẩm">
    <div class="card__body">
        <h3 class="card__title">iPhone 15 Pro Max</h3>
        <p class="card__price">25.990.000đ</p>
        <div class="card__actions">
            <!-- Modifier: btn--primary là biến thể của btn -->
            <button class="btn btn--primary">Mua ngay</button>
            <button class="btn btn--outline">Yêu thích</button>
        </div>
    </div>
    <!-- Modifier trên block: card--featured = card nổi bật -->
</div>
<div class="card card--featured">...</div>
```

```css
/* Block */
.card {
    background: var(--color-surface);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: box-shadow var(--transition-base), transform var(--transition-base);
}

/* Block modifier */
.card--featured {
    border: 2px solid var(--color-primary);
    box-shadow: var(--shadow-md);
}

.card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
}

/* Elements */
.card__image { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.card__body  { padding: var(--space-4); }
.card__title { font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); }
.card__price { color: var(--color-danger); font-weight: var(--font-weight-bold); margin-top: var(--space-2); }
.card__actions { display: flex; gap: var(--space-2); margin-top: var(--space-4); }
```

**Tại sao BEM không xung đột?**
```
.title         → ảnh hưởng TẤT CẢ .title trong site ❌
.card__title   → chỉ title TRONG card ✅
.navbar__title → chỉ title TRONG navbar ✅
```

---

### Modular File Structure — Mỗi component 1 file

```
styles/
├── base/
│   ├── _reset.css         ← * { box-sizing: border-box; ... }
│   ├── _variables.css     ← :root { --color-primary: ... }
│   └── _typography.css    ← h1, h2, p, a styles mặc định
│
├── components/
│   ├── _button.css        ← .btn, .btn--primary, .btn--danger
│   ├── _card.css          ← .card, .card__title, .card--featured
│   ├── _navbar.css        ← .navbar, .navbar__logo, .navbar__links
│   ├── _form.css          ← .form, .form__input, .form__label
│   └── _modal.css         ← .modal, .modal__overlay, .modal__dialog
│
├── layout/
│   ├── _header.css        ← Sticky header styles
│   ├── _footer.css        ← Footer styles
│   └── _grid.css          ← Layout utilities
│
└── main.css               ← Import tất cả
```

```css
/* main.css — import theo thứ tự */
@import 'base/_reset.css';
@import 'base/_variables.css';
@import 'base/_typography.css';

@import 'layout/_header.css';
@import 'layout/_footer.css';
@import 'layout/_grid.css';

@import 'components/_button.css';
@import 'components/_card.css';
@import 'components/_navbar.css';
@import 'components/_form.css';
@import 'components/_modal.css';
```

---

### Debug CSS bằng DevTools — Workflow chuẩn

```
F12 → Tab Elements → Click element

1. Styles panel:
   - Thấy TẤT CẢ rules áp dụng cho element
   - Rule bị ~~gạch ngang~~ = bị override
   - Click vào property để edit realtime

2. Computed panel:
   - Giá trị thực tế sau tính toán (Box Model, inheritance)
   - Hover để thấy nguồn gốc của value

3. Ctrl+Shift+M (Device Toolbar):
   - Test responsive ở kích thước bất kỳ
   - Có preset iPhone, iPad, Pixel...

4. Mẹo debug nhanh:
   outline: 2px solid red !important  /* Thấy element chiếm bao nhiêu chỗ */
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **CSS Variables = single source of truth cho design tokens.**
> **BEM = class name scope. `card__title` chỉ là title TRONG card, không phải title của toàn site.**

---

## 5. 🏭 Real-world Layer

### Naming convention trong team thực tế:

```css
/* ❌ Naming gây conflict */
.active, .selected, .open, .hidden, .title, .content, .wrapper

/* ✅ BEM — không bao giờ conflict */
.nav__item--active
.dropdown--open
.modal--hidden
.card__title
.hero__content
.sidebar__wrapper
```

### CSS Variables trong Design System (Figma → Code):

```
Figma Design Token:          CSS Variable:
Primary/500 (#2563eb)   →   --color-primary
Gray/800 (#1e293b)      →   --color-text
Spacing/4 (16px)        →   --space-4
Radius/md (12px)        →   --radius-md
```

**Khi designer đổi màu brand trong Figma → Dev chỉ cần đổi 1 variable → toàn site cập nhật.**

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Refactor CSS Todo App sang BEM + Variables (30 phút)

**Bước 1:** Tạo file `styles/base/_variables.css` với design tokens:
```css
:root {
    --color-primary: #2563eb;
    --color-danger: #dc2626;
    --color-bg: #f0f9ff;
    --color-surface: white;
    --space-4: 16px;
    --space-6: 24px;
    --radius-md: 12px;
    --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
    --transition-base: 0.3s ease;
}
```

**Bước 2:** Tạo `styles/components/_card.css` với BEM:
```css
.todo-card { /* block */ }
.todo-card__header { /* element */ }
.todo-card__title { /* element */ }
.todo-card__body { /* element */ }
.todo-card--done { /* modifier: khi hoàn thành */ }
.todo-card--urgent { /* modifier: quan trọng */ }
```

**Bước 3:** Cập nhật HTML để dùng BEM classes

**Kiểm tra:** Đổi `--color-primary` thành `#7c3aed` (tím). Toàn site đổi không cần tìm kiếm.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"CSS Variables và SCSS Variables giống nhau"** | Khác: CSS Variables **runtime** (có thể đổi bằng JS), SCSS variables **compile-time** (chỉ tồn tại lúc viết code) |
| **"BEM làm class name quá dài"** | Tên dài nhưng **không bao giờ conflict**. `card__title` > `title` vì `title` ảnh hưởng toàn site |
| **"1 file CSS sẽ load nhanh hơn nhiều file"** | Với HTTP/2 (hầu hết server hiện đại), nhiều file nhỏ không chậm hơn. Với bundler (Webpack/Vite) → compile thành 1 file trước khi deploy |
| **"Modular CSS chỉ cần khi project lớn"** | Bắt đầu modular từ đầu dễ hơn refactor sau. Ngay cả project nhỏ cũng hưởng lợi từ variables và component files |
| **"DevTools chỉ để xem, không sửa được"** | DevTools cho phép **edit CSS realtime** trong browser — tốt cho thử nghiệm nhanh. Nhưng refresh là mất → phải copy vào file |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. CSS Variables khác SCSS Variables ở điểm nào? Khi nào CSS Variables hữu ích hơn?
2. Đặt tên class `.form__input--error` — phần nào là block, element, modifier?
3. Tại sao modular CSS (nhiều file nhỏ) tốt hơn 1 file khổng lồ, về mặt workflow?

### Câu hỏi áp dụng:

4. Bạn có component "notification badge" hiện số lượng. Theo BEM, viết HTML và CSS class names cho: container badge, số trong badge, badge màu đỏ (danger), badge màu xanh lá (success).
5. Khi inspect element bằng DevTools, bạn thấy `color: blue` bị gạch ngang và `color: red` không gạch. Nhưng element thực tế trông màu xanh lá. Điều gì đang xảy ra?

<details>
<summary>👁️ Xem đáp án</summary>

1. **SCSS Variables**: compile thành giá trị cứng trong CSS, không thể thay đổi sau khi build. **CSS Variables**: tồn tại trong browser, JavaScript có thể đọc/thay đổi (`element.style.setProperty('--color', 'red')`). CSS Variables hữu ích hơn cho: dark mode toggle, theme switching, responsive variables thay đổi theo breakpoint.
2. **Block**: `form`. **Element**: `input` (phần tử thuộc form). **Modifier**: `error` (trạng thái input khi có lỗi).
3. Workflow: tìm `.card` để fix → mở `_card.css`, không phải tìm trong 1000 dòng. Team làm song song: Dev A sửa `_navbar.css`, Dev B sửa `_card.css` → không conflict. Dễ xóa component: xóa `_card.css` + import của nó → không còn card CSS trong project.
4. HTML: `<span class="badge badge--danger">5</span>` hoặc `<span class="badge badge--success">2</span>`. CSS: `.badge { }` (base), `.badge--danger { background: red }`, `.badge--success { background: green }`.
5. Có thể có **inline style** (`style="color: green"`) trên element hoặc tổ tiên đang override. DevTools Styles chỉ hiện authored stylesheet rules — inline style hiện ở `element.style {}` phần trên cùng. Hoặc element đang **inherit** màu xanh từ cha mà rule không override được.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **CSS Variables (`:root {}`)** = design tokens tập trung — đổi 1 chỗ, cập nhật toàn site
2. **BEM** (`block__element--modifier`) = class name có scope — tránh conflict giữa components
3. **Modular structure** = mỗi component 1 file — dễ tìm, dễ maintain, dễ xóa
4. **DevTools realtime editing** = thử CSS ngay trong browser trước khi copy vào file
5. **Bắt đầu scalable từ ngày 1** — refactor sau rất đau, cấu trúc tốt từ đầu rất dễ

---

## 10. ➡️ Next Lesson Bridge

*CSS gọn gàng rồi. Variables, BEM, modules — project đang maintain được.*

*"Nhưng mình thấy viết CSS vẫn lặp lại nhiều," Minh nói. "Mỗi button đều cần `display: flex; justify-content: center; align-items: center;`. Mỗi media query viết lại từ đầu. Có cách nào như function trong programming không?"*

**→ [Bài 16: Sass/SCSS](./16_sass_scss.md) — CSS preprocessor: Variables, Mixins, Nesting — viết CSS như viết code.**
