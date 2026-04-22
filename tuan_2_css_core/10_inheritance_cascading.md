# 🟩 TUẦN 2 - BÀI 10
# **INHERITANCE & CASCADING**

---

## 0. 🎬 Opening Hook

*Minh đặt `font-family: 'Inter'` cho `body`. Một dòng CSS — toàn bộ trang đổi font.*

*Khi anh đặt `border: 2px solid red` cho `body` — không có gì đổi.*

*"Tại sao font thì lan ra con cháu, border thì không?" Minh hỏi.*

*"Đó là Inheritance," anh Hùng trả lời. "Không phải mọi property đều được thừa kế. Text thì có. Box thì không. Và khi có xung đột? Đó là Cascade."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Hiểu Inheritance và Cascade = hiểu **tại sao CSS hoạt động như vậy** — không phải chỉ biết nó hoạt động.

Khi CSS không làm điều bạn muốn, 80% nguyên nhân là:
- Style bị **inherit** từ cha mà bạn không ngờ đến
- Style bị **override** bởi rule khác có specificity cao hơn
- Rule **sau** ghi đè rule **trước** vì cùng specificity

Không hiểu hai khái niệm này = debug CSS bằng cách thử sai ngẫu nhiên.

---

## 2. 🌐 Big Picture — Khi CSS áp dụng một style

```
Browser nhận style của element theo thứ tự ưu tiên:

1. !important declarations
2. Inline styles (style attribute)
3. ID selectors (#)
4. Class / pseudo-class selectors (. :)
5. Type selectors (tag name)
6. Inherited styles từ cha
7. Browser default styles (user agent stylesheet)
```

Hai cơ chế chính quyết định style cuối cùng:

```
INHERITANCE: Con nhận style từ Cha (nếu property được inherit)
CASCADE:     Khi nhiều rule cùng nhắm → Rule có priority cao hơn thắng
```

---

## 3. ⚙️ Core Technical Truth

### Inheritance — "Con thừa hưởng từ Cha"

**Properties ĐƯỢC inherit (text-related):**
```css
body {
    font-family: 'Inter', sans-serif;  /* ✅ h1, p, li, span... đều dùng */
    color: #1e293b;                    /* ✅ Tất cả text đều đổi */
    font-size: 16px;                   /* ✅ Nhưng h1/h2 có default size riêng */
    line-height: 1.6;                  /* ✅ */
    letter-spacing: 0.01em;            /* ✅ */
    text-align: left;                  /* ✅ */
}
```

**Properties KHÔNG inherit (box-related):**
```css
.container {
    border: 1px solid red;    /* ❌ Con không kế thừa */
    padding: 20px;            /* ❌ Con không kế thừa */
    margin: 10px;             /* ❌ Con không kế thừa */
    background: #fff;         /* ❌ Con không kế thừa */
    width: 600px;             /* ❌ Con không kế thừa */
}
```

> 💡 **Quy tắc nhớ nhanh:** Nếu property ảnh hưởng **chữ** → thường inherit. Nếu ảnh hưởng **hộp/vị trí** → không inherit. Điều này hợp logic: bạn muốn tất cả text cùng font, nhưng không muốn tất cả box cùng border.

**Danh sách properties ĐƯỢC inherit:**
`color`, `font-*` (family/size/weight/style), `line-height`, `letter-spacing`, `text-*` (align/decoration/transform), `list-style-*`, `cursor`, `visibility`

**Force và Reset inheritance:**
```css
.child {
    /* Ép kế thừa từ cha (dù property không tự inherit) */
    border: inherit;

    /* Reset về giá trị mặc định browser */
    font-size: initial;

    /* Revert về giá trị user agent stylesheet */
    display: revert;

    /* Unset: inherit nếu property có thể, initial nếu không */
    color: unset;
}
```

---

### Cascade — "Thác nước" xác định priority

Khi nhiều rules nhắm cùng element, browser tính priority theo 4 bước:

**Bước 1: Origin (nguồn gốc)**
```
Browser default → User stylesheet → Author stylesheet → Author !important
                                    (file CSS của bạn) ← Thường hoạt động ở đây
```

**Bước 2: Specificity**
```
|  #id  |  .class  |  tag  |
|   1   |    1     |   0   |   = 110 (cho #id .class)
```

**Bước 3: Source Order (thứ tự)**
```css
.btn { color: red; }
.btn { color: green; }   /* ← Thắng vì viết sau */
```

**Bước 4: Importance**
```css
.btn { color: red !important; }  /* Ghi đè mọi thứ */
```

---

### Ví dụ cascade thực tế — Debug từng bước

```css
/* Rule 1: Tag selector */
p { color: blue; }              /* Specificity: 0-0-1 */

/* Rule 2: Class selector */
.intro { color: green; }        /* Specificity: 0-1-0 → THẮNG rule 1 */

/* Rule 3: ID + Class */
#main .intro { color: red; }    /* Specificity: 1-1-0 → THẮNG rule 2 */

/* Rule 4: Cùng specificity → thứ tự quyết định */
.btn { background: blue; }
.btn { background: green; }     /* ← THẮNG vì viết sau */
```

---

### Debug CSS với DevTools — Kỹ năng thiết yếu

```
F12 → Tab Elements → Click element → Panel Styles bên phải

Styles panel hiển thị:
┌─────────────────────────────────────────┐
│ element.style                           │  ← Inline style
├─────────────────────────────────────────┤
│ .intro { color: green; }                │  ← Rule đang THẮNG
├─────────────────────────────────────────┤
│ ~~p { color: blue; }~~                  │  ← Bị gạch ngang = bị override
├─────────────────────────────────────────┤
│ Inherited from body                     │
│   font-family: Inter                    │  ← Style kế thừa từ body
│   color: #1e293b                        │
└─────────────────────────────────────────┘
```

**Computed tab:** Hiện giá trị **thực tế cuối cùng** của mọi property — không bị ảnh hưởng bởi cascade confusion.

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Text properties → inherit xuống con. Box properties → không inherit.**
> **Cascade: specificity cao thắng. Cùng specificity → viết sau thắng.**

---

## 5. 🏭 Real-world Layer

### Khai thác Inheritance để viết CSS ngắn hơn

```css
/* ✅ Tận dụng inheritance — chỉ set 1 lần ở body */
body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    font-size: 16px;
}

/* Tất cả text trong trang tự nhận font/color/line-height từ body */
/* Chỉ cần override khi cần khác biệt */
h1 { font-size: 2rem; font-weight: 700; }
h2 { font-size: 1.5rem; font-weight: 600; }
.muted { color: #64748b; }    /* Override color kế thừa */
```

### Cascade issue phổ biến trong team

```css
/* Developer A viết: */
.header { color: #1e293b; }

/* Developer B viết (sau, cùng file): */
.header { color: #2563eb; }   /* Thắng vì viết sau */

/* Developer C muốn override Developer B — dùng specificity cao hơn: */
header.header { color: red; }  /* 0-1-1 > 0-1-0 — Thắng */

/* Sau 6 tháng: */
#main-header.header.active { color: purple !important; }
/* → CSS spaghetti. Giải pháp: đặt tên tốt từ đầu, dùng BEM */
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Debug Cascade (15 phút)

1. Tạo file `cascade-test.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Cascade Test</title>
    <style>
        body { color: #333; font-family: Arial; }
        p { color: blue; }
        .special { color: green; }
        #main p { color: red; }
        p.special { color: purple; }
    </style>
</head>
<body>
    <div id="main">
        <p>Đoạn văn 1</p>
        <p class="special">Đoạn văn 2</p>
    </div>
    <p>Đoạn văn 3 (ngoài #main)</p>
    <p class="special">Đoạn văn 4 (ngoài #main)</p>
</body>
</html>
```

2. **Trước khi mở browser:** Dự đoán màu chữ của mỗi đoạn văn
3. Mở browser → kiểm tra → đúng không?
4. Mở DevTools → Styles panel → xem rule nào thắng và tại sao

**Ghi ra specificity của mỗi rule:**
- `p` = ?
- `.special` = ?
- `#main p` = ?
- `p.special` = ?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Mọi CSS property đều inherit"** | Chỉ khoảng ~30 properties inherit — chủ yếu là text. Box model properties không inherit |
| **"`!important` là cách fix nhanh khi CSS bị override"** | `!important` gây "specificity war" — sau đó phải `!important` mọi chỗ để override. Đúng hơn: tìm hiểu tại sao bị override và fix selector |
| **"Cascade = thứ tự viết CSS"** | Cascade bao gồm: origin, specificity, AND thứ tự — theo đúng thứ tự ưu tiên này |
| **"Inherited style và applied style như nhau"** | Inherited style có **specificity = 0** — dễ override hơn. Applied style có specificity của selector |
| **"Xóa hết style cha để con không kế thừa"** | Dùng `property: initial` để reset về browser default, hoặc `property: unset` để unset inheritance |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao `font-family` được inherit nhưng `border` thì không?
2. Cho HTML sau, với CSS `body { color: red; } p { }` — `<p>` có màu đỏ không? Tại sao?
3. Sắp xếp theo thứ tự ưu tiên tăng dần (thấp đến cao): inline style, tag selector, `!important`, class selector, ID selector.

### Câu hỏi áp dụng:

4. Bạn có 2 rules: `.card { font-size: 14px; }` và `body { font-size: 16px; }`. Element `<p>` nằm trong `.card` có `font-size` bao nhiêu? Tại sao?
5. DevTools hiện `color: blue` nhưng bị gạch ngang. Bên dưới có `color: red` không bị gạch. Điều này có nghĩa gì? Màu thực tế của element là gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. CSS được thiết kế với **tính hợp lý**: bạn muốn tất cả text cùng font (text properties inherit). Nhưng bạn KHÔNG muốn tất cả box cùng border/padding cha (box properties không inherit — mỗi element cần kiểm soát kích thước riêng).
2. **Có** — `font-family` và `color` được inherit. `body { color: red }` → `<p>` thừa hưởng `color: red` vì body là tổ tiên của p.
3. Từ thấp đến cao: **tag selector (1) < class selector (10) < ID selector (100) < inline style (1000) < `!important` (vô hạn)**.
4. **14px** — `.card { font-size: 14px }` áp dụng trực tiếp lên `.card` element. Khi `<p>` inherit, nó sẽ inherit từ parent trực tiếp nhất. Nhưng thực ra `font-size: 14px` set lên `.card` (là cha của p) → `<p>` inherit `14px` từ `.card`.
5. Có nghĩa là `color: blue` đang **bị override** bởi `color: red`. Màu thực tế là **red** — rule không bị gạch ngang là rule đang thắng.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Text properties inherit** (color, font-*, line-height). **Box properties không inherit** (margin, padding, border, background)
2. **Cascade priority**: Origin → Specificity → Source Order
3. **Tận dụng inheritance**: Set font/color trên `body` → tất cả con thừa hưởng → giảm lượng CSS cần viết
4. **Debug bằng DevTools**: Rule bị gạch ngang = bị override → tìm rule thắng bên dưới
5. **`!important` là mùi code xấu** — dùng khi không còn cách nào khác, và document lý do tại sao

---

## 10. ➡️ Next Lesson Bridge

*"Cascade hiểu rồi," Minh nói. "Nhưng khi thêm padding cho `.card`, sao card bị to hơn mình tính?"*

*"Đó là Box Model — bài học quan trọng nhất trong CSS," anh Hùng trả lời. "Content + Padding + Border + Margin. Không hiểu Box Model = layout LUÔN LUÔN sai. Dù bạn code bao nhiêu năm."*

**→ [Bài 11: CSS Box Model](./11_box_model.md) — `box-sizing: border-box` và lý do 90% developer mới vấp ngã.**
