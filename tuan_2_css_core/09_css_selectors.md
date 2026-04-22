# 🟩 TUẦN 2 - BÀI 09
# **CSS SELECTORS**

---

## 0. 🎬 Opening Hook

*Minh viết CSS: `button { background: red; }`*

*Ý định: chỉ nút "Xóa" màu đỏ.*

*Kết quả: TẤT CẢ nút trên trang đều đỏ — Submit, Cancel, Back, Navigate, Upload...*

*"CSS không biết nút nào là nút nào!" Minh than.*

*"Vấn đề không phải CSS," anh Hùng nói. "Vấn đề là **selector** của em. Tag selector `button` nhắm vào MỌI button. Muốn chỉ 1 nút → phải dùng class hoặc ID."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Selector = "địa chỉ" của CSS rule — xác định **element nào** sẽ nhận style đó.

Selector sai → style bị áp dụng sai chỗ → debug mất hàng giờ. Selector đúng → code gọn, dự đoán được, dễ maintain. Phần lớn "CSS bug" thực ra là "Selector bug".

---

## 2. 🌐 Big Picture — Bản đồ Selectors

```
SELECTORS (từ rộng đến hẹp)
│
├── Universal  *           → Tất cả mọi element
├── Type       h1, p, div  → Theo loại thẻ HTML
├── Class      .card       → Theo class attribute ⭐ (dùng nhiều nhất)
├── ID         #header     → Theo id attribute (unique)
├── Attribute  [type="email"] → Theo attribute
│
├── COMBINATORS (theo mối quan hệ)
│   ├── Descendant  .card p      → p BẤT KỲ đâu trong .card
│   ├── Child       .card > p    → p CON TRỰC TIẾP của .card
│   ├── Adjacent    h2 + p       → p NGAY SAU h2
│   └── Sibling     h2 ~ p       → MỌI p SAU h2 (cùng cha)
│
└── PSEUDO
    ├── Classes    :hover, :focus, :nth-child()   → Trạng thái
    └── Elements   ::before, ::after, ::first-line → Phần tử giả
```

---

## 3. ⚙️ Core Technical Truth

### 5 loại Selector cơ bản

**1. Universal Selector `*` — Nhắm tất cả:**
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
/* Dùng chủ yếu cho CSS Reset — không dùng để style thông thường */
```

**2. Type Selector — Nhắm theo loại thẻ:**
```css
h1 { font-size: 32px; color: #1e293b; }
p  { line-height: 1.6; margin-bottom: 16px; }
a  { color: #2563eb; text-decoration: none; }
/* ⚠️ Nhắm TẤT CẢ thẻ đó trong trang — dùng để set style mặc định */
```

**3. Class Selector `.classname` — ⭐ Dùng nhiều nhất:**
```css
.btn-danger  { background: #dc2626; color: white; }
.btn-primary { background: #2563eb; color: white; }
.card        { border-radius: 12px; padding: 20px; }
```
```html
<button class="btn-danger">Xóa</button>   <!-- ✅ Chỉ nút này đỏ -->
<button class="btn-primary">Lưu</button>   <!-- ✅ Chỉ nút này xanh -->
<button class="btn-primary btn-large">Nổi bật</button> <!-- 2 class -->
```

**4. ID Selector `#id` — Unique, 1 per page:**
```css
#main-header   { position: sticky; top: 0; z-index: 100; }
#contact-form  { max-width: 600px; margin: 0 auto; }
/* Specificity cao → khó override → dùng hạn chế */
```

**5. Attribute Selector — Nhắm theo attribute:**
```css
input[type="email"]     { border-color: #2563eb; }
input[type="password"]  { font-family: monospace; }
a[target="_blank"]::after { content: " ↗"; }       /* Link ngoài thêm icon */
a[href^="https"]        { color: green; }            /* Bắt đầu bằng https */
```

---

### Combinator Selectors — Chọn theo quan hệ

```css
/* Descendant (space): TẤT CẢ p bên trong .card (mọi cấp) */
.card p { color: #64748b; font-size: 14px; }

/* Child (>): Chỉ p là CON TRỰC TIẾP của .card */
.card > p { font-weight: 600; }

/* Adjacent sibling (+): p NGAY LIỀN NGAY SAU h2 */
h2 + p { margin-top: 8px; color: #64748b; }

/* General sibling (~): TẤT CẢ p SAU h2 (cùng cha) */
h2 ~ p { border-left: 3px solid #2563eb; padding-left: 12px; }
```

**Khi nào dùng combinator:**
```html
<div class="card">
    <p>Con trực tiếp</p>           <!-- .card > p → ✅ -->
    <div>
        <p>Cháu của .card</p>      <!-- .card > p → ❌, .card p → ✅ -->
    </div>
</div>
```

---

### Pseudo-classes — Trạng thái đặc biệt

```css
/* Tương tác người dùng */
a:hover        { color: #1d4ed8; text-decoration: underline; }
input:focus    { border-color: #2563eb; outline: 2px solid #bfdbfe; }
button:active  { transform: scale(0.98); }
button:disabled { opacity: 0.5; cursor: not-allowed; }

/* Vị trí trong danh sách */
li:first-child  { font-weight: 700; }
li:last-child   { border-bottom: none; }
li:nth-child(2) { color: #2563eb; }     /* Phần tử thứ 2 */
li:nth-child(odd)  { background: #f8fafc; }  /* Dòng lẻ (1,3,5...) */
li:nth-child(even) { background: white; }    /* Dòng chẵn (2,4,6...) */

/* Form */
input:valid    { border-color: #22c55e; }  /* Đang hợp lệ */
input:invalid  { border-color: #ef4444; }  /* Đang không hợp lệ */
input:required { border-left: 3px solid #2563eb; }
```

---

### Pseudo-elements — Phần tử giả

```css
p::first-letter { font-size: 2em; float: left; margin-right: 4px; }
p::first-line   { font-weight: 600; color: #1e293b; }

/* Thêm nội dung bằng CSS (không cần thêm HTML) */
.required::after {
    content: " *";
    color: #ef4444;
}

.external-link::after {
    content: " ↗";
    font-size: 0.8em;
}

/* Overlay tối bằng ::before (hay dùng cho card hover) */
.card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    transition: background 0.3s;
}
.card:hover::before {
    background: rgba(0,0,0,0.1);
}
```

---

### Specificity — "Ai thắng khi xung đột?"

```
Điểm specificity (tính từ trái sang):
ID > Class/Pseudo > Tag > Universal

|    A    |    B    |    C    |
|  ID #   | Class . | Tag     |
```

| Selector | A | B | C | Tổng |
|---|---|---|---|---|
| `*` | 0 | 0 | 0 | 0 |
| `h1` | 0 | 0 | 1 | 1 |
| `.btn` | 0 | 1 | 0 | 10 |
| `#header` | 1 | 0 | 0 | 100 |
| `#header .btn` | 1 | 1 | 0 | 110 |
| `style=""` | ∞ | — | — | 1000+ |
| `!important` | ♾️ | — | — | Vô hạn |

```css
h1          { color: blue; }    /* Specificity: 1   → THUA */
.title      { color: green; }   /* Specificity: 10  → THẮNG */
#main .title { color: red; }    /* Specificity: 110 → THẮNG hơn */
```

> 💡 **Debug tip:** Mở DevTools → Styles panel → Rule bị gạch ngang = bị override. Nhìn xem selector nào có specificity cao hơn.

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Class selector `.class` là lựa chọn mặc định cho 90% CSS bạn viết.**
> **Specificity cao hơn = thắng. Cùng specificity = rule sau thắng.**

---

## 5. 🏭 Real-world Layer — Selector patterns trong production

```css
/* Pattern 1: Component + Modifier (BEM) */
.btn { padding: 10px 20px; border-radius: 6px; }
.btn--primary { background: #2563eb; color: white; }
.btn--danger  { background: #dc2626; color: white; }
.btn--small   { padding: 6px 12px; font-size: 14px; }

/* Pattern 2: State selectors */
.nav__item { color: #64748b; }
.nav__item--active { color: #2563eb; font-weight: 600; }
.nav__item:hover   { color: #2563eb; }

/* Pattern 3: Attribute selector cho form */
input[type="text"],
input[type="email"],
input[type="password"] {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px 14px;
}

/* Pattern 4: nth-child cho table zebra striping */
tbody tr:nth-child(even) { background: #f8fafc; }
tbody tr:hover { background: #eff6ff; }
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Style navigation và card (20 phút)

Thêm vào `styles.css` từ bài trước:

```css
/* 1. Navigation */
nav { display: flex; gap: 16px; padding: 16px 0; }
nav a { color: #64748b; text-decoration: none; font-weight: 500; }
nav a:hover { color: #2563eb; }
nav a.active { color: #2563eb; border-bottom: 2px solid #2563eb; }

/* 2. Todo list items */
.todo-item { padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; }
.todo-item:nth-child(odd)  { background: #f8fafc; }
.todo-item:nth-child(even) { background: #fff; }
.todo-item:hover { background: #eff6ff; cursor: pointer; }
.todo-item--done { opacity: 0.5; text-decoration: line-through; }

/* 3. Thêm dấu * sau label required */
.form-group label.required::after {
    content: " *";
    color: #ef4444;
}
```

**Câu hỏi kiểm tra:**
- `.todo-item:nth-child(odd)` và `.todo-item:hover` — khi hover vào item lẻ, màu nào thắng? Tại sao?
- Tại sao `.todo-item--done` dùng dấu `--` thay vì dùng class khác như `.done`?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"ID selector nhanh hơn class selector"** | Performance khác biệt không đáng kể trong CSS hiện đại. Vấn đề là **specificity** cao của ID khiến khó override |
| **"`*` selector làm trang chậm"** | Modern browser optimize `*` tốt. CSS Reset dùng `*` không ảnh hưởng performance đáng kể |
| **"`:hover` chỉ dùng được cho link `<a>`"** | `:hover` dùng được với MỌI element: div, button, img, table row... |
| **"Pseudo-element `::before/::after` cần HTML"** | Không — `::before/::after` tạo ra element CSS thuần túy. Nhưng **cần `content: ""`** để element tồn tại |
| **"Specificity tính bằng cộng số"** | Gần đúng nhưng không phải số thập phân. 11 class selectors ≠ 1 ID selector (dù 11 × 10 = 110) — thực ra là **ba cột riêng biệt** |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao Class selector (`.btn`) được ưu tiên dùng hơn ID selector (`#btn`) trong CSS?
2. Sự khác biệt giữa `.card p` và `.card > p` là gì? Khi nào dùng cái nào?
3. `li:nth-child(3n+1)` chọn những phần tử nào? (n = 0, 1, 2, 3...)

### Câu hỏi áp dụng:

4. CSS sau có conflict không? Nếu có, màu nào thắng?
   ```css
   p.intro     { color: green; }   /* Specificity: ? */
   #main p     { color: blue; }    /* Specificity: ? */
   .content p.intro { color: red; } /* Specificity: ? */
   ```
5. Bạn muốn style: "tất cả input KHÔNG phải checkbox và KHÔNG phải radio". Viết selector đó.

<details>
<summary>👁️ Xem đáp án</summary>

1. ID có specificity **100** → rất khó override sau này. Class có specificity **10** → linh hoạt hơn, dễ override khi cần. ID nên dùng cho JavaScript targeting hoặc anchor links — không phải CSS styling.
2. `.card p` = p **bất kỳ đâu** trong .card (kể cả cháu, chắt). `.card > p` = chỉ p là **con trực tiếp** của .card. Dùng `>` khi muốn tránh ảnh hưởng p bên trong nested components.
3. `nth-child(3n+1)` = n=0→1, n=1→4, n=2→7, n=3→10... → Phần tử thứ **1, 4, 7, 10...**
4. `p.intro` = 0-1-1 = **11**. `#main p` = 1-0-1 = **101**. `.content p.intro` = 0-2-1 = **21**. **Thắng: `#main p { color: blue }`** (specificity 101 cao nhất).
5. `input:not([type="checkbox"]):not([type="radio"])` — dùng `:not()` pseudo-class.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Class selector `.class`** = lựa chọn mặc định, linh hoạt, dùng 90% thời gian
2. **Specificity hierarchy**: `!important` > inline > `#id` > `.class` > `tag` > `*`
3. **Combinator**: space (descendant), `>` (child), `+` (adjacent), `~` (sibling)
4. **Pseudo-classes** (`:hover`, `:focus`, `:nth-child`) = trạng thái. **Pseudo-elements** (`::before`, `::after`) = phần tử giả
5. **Debug specificity conflict**: DevTools Styles panel → rule bị gạch ngang = bị override

---

## 10. ➡️ Next Lesson Bridge

*Minh đã chọn đúng element. Nhưng đặt `font-family` cho `.card` — không phải tất cả text trong card đều đổi font.*

*"Đôi khi đổi, đôi khi không," Minh bối rối. "Có quy tắc nào không?"*

*"Đó là Inheritance và Cascade," anh Hùng nói. "Con thừa hưởng từ cha. Rule sau ghi đè rule trước. Hiểu điều này = debug CSS chỉ mất 30 giây."*

**→ [Bài 10: Inheritance & Cascading](./10_inheritance_cascading.md) — Tại sao CSS hoạt động như vậy, và cách tận dụng nó.**
