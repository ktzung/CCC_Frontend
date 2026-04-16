# 🟩 CHƯƠNG 09
# **CSS SELECTORS**

## 🎬 "Tại Sao TẤT CẢ Nút Đều Đỏ?" — Bài học Selector đau thương

*Minh viết CSS: `button { background: red; }`. Ý định: chỉ nút "Xóa" màu đỏ.*

*Kết quả: TẤT CẢ nút trên trang đều đỏ — nút Submit, nút Cancel, nút Navigate...*

*"CSS không biết nút nào là nút nào!" Minh than. Anh Hùng trả lời: "Vì em dùng tag selector — nhắm MỌI button. Muốn chỉ 1 nút → dùng class hoặc id selector."*

---

## 🎯 Mục tiêu
- Phân biệt và sử dụng 5 loại selector chính
- Kết hợp selectors (combinator)
- Pseudo-classes và pseudo-elements
- Tính specificity (độ ưu tiên)

---

## 🎯 5 Loại Selector — Từ rộng đến hẹp

### 1. Universal Selector — "Nhắm TẤT CẢ"
```css
* { box-sizing: border-box; margin: 0; }
```

### 2. Type (Tag) Selector — "Nhắm theo loại thẻ"
```css
h1 { color: #1e293b; }       /* MỌI h1 */
p { line-height: 1.6; }      /* MỌI p */
```

### 3. Class Selector — "Nhắm theo class" ⭐ (dùng nhiều nhất!)
```css
.btn-danger { background: #dc2626; }     /* class="btn-danger" */
.btn-primary { background: #2563eb; }    /* class="btn-primary" */
```
```html
<button class="btn-danger">Xóa</button>     <!-- ✅ Đỏ -->
<button class="btn-primary">Lưu</button>     <!-- ✅ Xanh -->
```

### 4. ID Selector — "Nhắm theo ID" (unique, 1 per page)
```css
#main-header { background: #0f172a; }
```

### 5. Attribute Selector — "Nhắm theo attribute"
```css
input[type="email"] { border-color: blue; }
a[target="_blank"]::after { content: " ↗"; }
```

---

## 🔗 Combinator Selectors — "Chọn theo mối quan hệ"

```css
/* Descendant: TẤT CẢ p bên trong .card */
.card p { color: #64748b; }

/* Child: Chỉ p là CON TRỰC TIẾP của .card */
.card > p { font-weight: bold; }

/* Adjacent Sibling: p NGAY SAU h2 */
h2 + p { margin-top: 8px; }

/* General Sibling: TẤT CẢ p sau h2 */
h2 ~ p { color: #475569; }
```

---

## 🎭 Pseudo-classes & Pseudo-elements

### Pseudo-classes — "Trạng thái đặc biệt"
```css
a:hover { color: #2563eb; }             /* Khi hover chuột */
a:visited { color: #7c3aed; }           /* Đã click */
input:focus { border-color: #2563eb; }   /* Đang được click vào */
li:first-child { font-weight: bold; }    /* Phần tử con đầu tiên */
li:nth-child(odd) { background: #f1f5f9; } /* Dòng lẻ (zebra) */
button:disabled { opacity: 0.5; }        /* Bị disable */
```

### Pseudo-elements — "Phần tử giả"
```css
p::first-letter { font-size: 2em; }     /* Chữ cái đầu tiên */
p::first-line { font-weight: bold; }     /* Dòng đầu tiên */
.required::after { content: " *"; color: red; } /* Thêm nội dung */
```

---

## ⚖️ Specificity — "Ai thắng khi xung đột?"

Khi nhiều rule nhắm cùng element → rule nào có **specificity cao hơn** thắng:

| Selector | Specificity | Ví dụ |
|---|---|---|
| `!important` | ♾️ Vô cực (TRÁNH DÙNG!) | `color: red !important` |
| Inline style | 1000 | `style="color: red"` |
| ID `#id` | 100 | `#header { }` |
| Class `.class` | 10 | `.btn { }` |
| Tag `element` | 1 | `p { }` |
| Universal `*` | 0 | `* { }` |

```css
p { color: blue; }              /* Specificity: 1 */
.intro { color: green; }        /* Specificity: 10 ← THẮNG! */
#main p.intro { color: red; }   /* Specificity: 111 ← THẮNG! */
```

> **Anh Hùng:** *"Khi CSS không hoạt động như mong đợi, 80% là do specificity. Mở DevTools → Elements → xem rule nào bị gạch ngang (strikethrough) = bị override."*

---

## ➡️ Chương tiếp theo...

*Minh đã chọn đúng element. Nhưng khi viết `.card .title` thì đôi khi title không đổi màu.*

*"Đó là vì Cascade và Inheritance," anh Hùng giải thích. "Con thừa hưởng style từ cha. Rule sau ghi đè rule trước. Hiểu cascade = debug CSS chỉ mất 5 giây."*

**Chương tiếp theo:** Inheritance & Cascading — Bí mật của chữ "C" trong CSS.
