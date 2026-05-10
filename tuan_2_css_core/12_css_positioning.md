# 🟩 TUẦN 2 - BÀI 12
# **CSS POSITIONING**

---

## 0. 🎬 Opening Hook

*Minh muốn tạo nút "Chat Support" dính góc dưới phải màn hình — giống Shopee, Tiki, Lazada.*

*Thử `float: right` → sai. Thử `margin-left: auto` → sai. Scroll xuống → nút biến mất.*

*"Sao không có cách nào giữ nó dính góc màn hình?" Minh than.*

*"Vì em chưa biết `position: fixed`," anh Hùng nói. "Đó là 1 trong 5 giá trị position. Mỗi giá trị có cách phối hợp với viewport và layout hoàn toàn khác nhau."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

**Positioning giải quyết những vấn đề layout không thể làm bằng margin/padding:**
- Sticky header dính trên cùng khi scroll
- Dropdown menu nằm chồng lên nội dung bên dưới
- Badge số lượng sản phẩm ở góc icon giỏ hàng
- Modal/overlay phủ toàn màn hình
- Chat button dính góc màn hình

---

## 2. 🌐 Big Picture — 5 giá trị Position

```
static    → Mặc định. Nằm theo flow bình thường. top/left không tác dụng
relative  → Dịch so với vị trí GỐC. Vẫn chiếm chỗ trong layout
absolute  → Bay ra khỏi flow. Bám vào cha RELATIVE gần nhất
fixed     → Bám vào VIEWPORT. Không cuộn theo trang
sticky    → Bình thường → dính khi scroll đến ngưỡng

Thêm: z-index = tầng xếp chồng (giá trị cao hơn nằm trên)
```

---

## 3. ⚙️ Core Technical Truth

### 1. `position: static` — Mặc định

```css
.box { position: static; }  /* Không cần viết — mọi element đều static */
/* top, right, bottom, left, z-index KHÔNG HOẠT ĐỘNG */
```

### 2. `position: relative` — Dịch từ vị trí gốc

```css
.box {
    position: relative;
    top: 20px;     /* Dịch XUỐNG 20px từ vị trí gốc */
    left: 30px;    /* Dịch SANG PHẢI 30px từ vị trí gốc */
}
/* ⚠️ Element vẫn CHIẾM VỊ TRÍ CŨ trong layout — chỉ hình thức dịch chuyển */
```

**Dùng `relative` cho hai mục đích:**
1. Dịch chuyển nhẹ element so với vị trí gốc
2. **Làm điểm tọa độ (anchor) cho con `absolute`** ← Quan trọng nhất!

### 3. `position: absolute` — Bay ra, bám vào cha relative

```css
/* Cha cần có position: relative (hoặc sticky/fixed/absolute) */
.cart-icon {
    position: relative;     /* ← Trở thành điểm tọa độ cho badge */
}

.badge {
    position: absolute;     /* ← Bay ra khỏi flow */
    top: -8px;              /* ← Tọa độ từ .cart-icon */
    right: -8px;
    /* ⚠️ KHÔNG chiếm chỗ trong layout nữa */
}
```

**Nếu không có cha `relative`** → absolute tìm lên trên cho đến `<html>` → bám vào trang.

### 4. `position: fixed` — Dính vào viewport ⭐

```css
.chat-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;     /* Nằm trên mọi thứ */
    /* KHÔNG cuộn theo trang. Luôn thấy kể cả khi scroll. */
}

.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;           /* Giăng từ trái đến phải */
    z-index: 999;
}
```

### 5. `position: sticky` — Bình thường → dính khi scroll ⭐

```css
.header {
    position: sticky;
    top: 0;            /* Dính khi cạnh trên đạt top: 0 (viewport top) */
    z-index: 100;
    background: white; /* Cần background để không xuyên thấu content */
}

/* Table header dính khi scroll bảng */
thead th {
    position: sticky;
    top: 0;
    background: #f8fafc;
}
```

> ⚠️ **Sticky không hoạt động nếu:** cha có `overflow: hidden/auto` hoặc element không có chiều cao rõ ràng để "dính vào".

---

### Bảng so sánh 5 giá trị

| Position | Chiếm chỗ? | Tọa độ từ | Use case thực tế |
|---|---|---|---|
| `static` | ✅ | Không dùng | Mặc định — không cần viết |
| `relative` | ✅ | Vị trí gốc của nó | Làm anchor cho absolute con, dịch nhẹ |
| `absolute` | ❌ | Cha `relative` gần nhất | Badge, dropdown, tooltip, overlay |
| `fixed` | ❌ | Viewport | Chat button, cookie banner, header cố định |
| `sticky` | ✅→❌ | Viewport (khi dính) | Sticky header, sticky table header, sidebar |

---

### z-index — Thứ tự xếp chồng

```css
.modal-overlay { z-index: 1000; }    /* Nền tối phủ trang */
.modal-dialog  { z-index: 1001; }    /* Hộp modal trên nền tối */
.chat-button   { z-index: 999; }     /* Chat button */
.header        { z-index: 100; }     /* Header sticky */
/* Dropdown */
.dropdown      { z-index: 101; }     /* Phải cao hơn header để hiện trên */
```

> 💡 **z-index chỉ hoạt động khi `position ≠ static`**. Element `static` không respond z-index.

### Stacking Context — Tại sao z-index "không hoạt động"?

z-index **chỉ so sánh trong cùng một stacking context**. Nhiều property tạo stacking context mới:

```css
/* Các property TẠO stacking context mới: */
.parent {
    position: relative;  /* hoặc absolute/fixed/sticky */
    z-index: 1;          /* Cần position + z-index */
    opacity: 0.99;       /* opacity < 1 cũng tạo stacking context! */
    transform: scale(1); /* transform bất kỳ */
    filter: blur(0);     /* filter bất kỳ */
}
```

**Ví dụ bug thực tế:**
```css
/* ❌ Bug: Dropdown bị che dù z-index rất cao */
.parent {
    position: relative;
    z-index: 1;
    opacity: 0.99;           /* ← Tạo stacking context mới! */
}
.dropdown {
    position: absolute;
    z-index: 9999;           /* Vô dụng — bị giới hạn trong .parent */
}

/* ✅ Sửa: Bỏ opacity khỏi parent hoặc đặt dropdown RA NGOÀI parent */
```

> 💡 **Quy tắc:** z-index 9999 trong stacking context con **luôn thua** z-index 1 trong stacking context cha. Giống như "vua một nước" — dù chỉ là vua nhỏ, vẫn lớn hơn mọi người trong nước mình.

### `transform` tạo containing block mới cho `absolute`

```css
/* ⚠️ Gotcha: transform trên cha thay đổi cách absolute con tính tọa độ */
.parent {
    position: relative;
    transform: translateX(10px);  /* ← Tạo containing block mới! */
}
.child {
    position: absolute;
    top: 0; left: 0;  /* Bây giờ tính từ .parent, KHÔNG phải từ vị trí gốc */
}
```

> 💡 Trước khi thêm `transform` vào element có `absolute` con, hãy kiểm tra xem vị trí con có bị ảnh hưởng không.

---

### Pattern thực tế — E-commerce

```css
/* ===== STICKY HEADER ===== */
.header {
    position: sticky;
    top: 0;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    z-index: 100;
}

/* ===== DROPDOWN MENU ===== */
.nav-item {
    position: relative;    /* Điểm tọa độ cho dropdown */
}
.dropdown {
    position: absolute;
    top: 100%;             /* Ngay bên dưới nav-item */
    left: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    display: none;
    min-width: 200px;
    z-index: 101;          /* Cao hơn header */
}
.nav-item:hover .dropdown { display: block; }

/* ===== CART BADGE ===== */
.cart-icon {
    position: relative;
    display: inline-block;
}
.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
}

/* ===== FIXED CHAT BUTTON ===== */
.chat-support {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #2563eb;
    color: white;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(37,99,235,0.4);
    z-index: 1000;
    border: none;
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`absolute` cần cha `relative` để biết tọa độ từ đâu tính.**
> **`fixed` bám viewport (màn hình). `sticky` bám viewport CHỈ KHI scroll đến.**

---

## 5. 🏭 Real-world Layer

**Shopee sử dụng positioning thế nào:**
- Header có `position: sticky; top: 0` → dính khi scroll
- Nút "Lên đầu trang" có `position: fixed; bottom: 80px; right: 16px`
- Badge số lượng trong giỏ hàng dùng `position: absolute` trên icon
- Dropdown danh mục dùng `position: absolute; top: 100%`
- Modal khi thêm vào giỏ dùng `position: fixed` + overlay

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: 4 pattern positioning (25 phút)

Tạo file `positioning-demo.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Positioning Demo</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: sans-serif; }

        /* 1. STICKY HEADER */
        header {
            position: sticky;
            top: 0;
            background: #1e293b;
            color: white;
            padding: 16px 32px;
            z-index: 100;
        }

        /* 2. Nội dung để test scroll */
        main {
            padding: 32px;
            min-height: 200vh;
        }

        /* 3. CART ICON + BADGE */
        .cart {
            position: relative;
            display: inline-block;
            font-size: 32px;
            margin: 32px;
        }
        .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: red;
            color: white;
            border-radius: 50%;
            width: 20px; height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* 4. FIXED CHAT BUTTON */
        .chat-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 50%;
            width: 56px; height: 56px;
            font-size: 24px;
            cursor: pointer;
            z-index: 999;
        }
    </style>
</head>
<body>
    <header>🛍️ E-Commerce App — Sticky Header</header>

    <main>
        <div class="cart">
            🛒
            <span class="cart-badge">3</span>
        </div>
        <p>Scroll xuống để test sticky header và fixed chat button...</p>
    </main>

    <button class="chat-btn">💬</button>
</body>
</html>
```

**Thực nghiệm:**
- Scroll xuống → header dính không?
- Chat button dính không?
- Thử đổi `sticky` thành `relative` → sự khác biệt?
- Thêm `overflow: hidden` vào `<main>` → sticky header còn hoạt động không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`absolute` bám vào cha trực tiếp"** | Không — absolute bám vào cha **có position ≠ static** gần nhất. Nếu cha trực tiếp là static, leo lên ông nội... |
| **"`z-index` luôn hoạt động"** | z-index chỉ hoạt động khi element có **position ≠ static**. Static element không có stacking context |
| **"`fixed` và `sticky` như nhau"** | `fixed` = LUÔN dính vào viewport. `sticky` = bình thường theo flow, chỉ dính khi scroll ĐẾN ngưỡng |
| **"`sticky` không cần `top`"** | Cần! `top: 0` định nghĩa ngưỡng mà element "bắt đầu dính". Không có `top` → sticky không hoạt động |
| **"Có thể dùng `position: absolute` để layout nhiều column"** | Tệ — absolute elements không chiếm chỗ → layout không tự điều chỉnh theo content. Dùng Flexbox/Grid thay thế |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa `position: fixed` và `position: sticky` trong trải nghiệm người dùng là gì?
2. Tại sao `position: absolute` cần cha có `position: relative`? Điều gì xảy ra nếu không có cha relative?
3. `z-index: 100` trên element `position: static` có hoạt động không? Tại sao?

### Câu hỏi áp dụng:

4. Bạn muốn tạo tooltip hiện khi hover vào nút. Tooltip cần nằm ngay phía trên nút, không ảnh hưởng layout xung quanh. Dùng `position` nào? Cần chuẩn bị gì ở cha?
5. Sticky header hoạt động tốt nhưng dropdown menu bị header che mất. Làm thế nào để sửa?

<details>
<summary>👁️ Xem đáp án</summary>

1. **`fixed`**: Element LUÔN ở vị trí cố định trên màn hình — kể cả khi page mới load hay đã scroll. **`sticky`**: Ban đầu nằm trong flow bình thường → KHI scroll đến ngưỡng thì mới dính. Khi scroll lên lại → về vị trí gốc.
2. `absolute` cần cha relative để biết **gốc tọa độ (0,0)** tính từ đâu. Nếu không có cha relative → leo lên đến `<html>` và bám vào trang. Kết quả: element bị đặt tọa độ theo toàn trang, không theo cha.
3. **Không hoạt động** — z-index chỉ có tác dụng với element có `position: relative/absolute/fixed/sticky`. Static element không tham gia stacking context.
4. **`absolute`** — không ảnh hưởng layout. Cha (nút) cần `position: relative` để tooltip biết tọa độ từ đâu. Tooltip: `position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%)`.
5. Tăng `z-index` của dropdown menu **cao hơn** `z-index` của header. Ví dụ: header `z-index: 100` → dropdown `z-index: 101`. Dropdown phải nằm TRONG stacking context đúng (không bị cha clip).

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`static`** = mặc định, **`relative`** = dịch nhẹ + làm anchor, **`absolute`** = bay ra khỏi flow
2. **`fixed`** = dính viewport (luôn luôn), **`sticky`** = dính khi scroll đến ngưỡng
3. **`absolute` luôn cần cha `relative`** để tọa độ tính đúng
4. **`z-index`** chỉ hoạt động với element `position ≠ static`
5. **Không dùng `absolute` để layout** — dùng Flexbox/Grid cho layout, absolute cho overlay/badge/tooltip

---

## 10. ➡️ Next Lesson Bridge

*"Sticky header ổn rồi. Chat button dính rồi. Badge giỏ hàng đẹp rồi. Nhưng 3 cột sản phẩm cạnh nhau mà responsive trên mobile vẫn chưa làm được."*

*"Đó là Media Queries và Responsive Design," anh Hùng nói. "60% traffic đến từ mobile — trang không responsive = mất 60% người dùng. Google còn phạt SEO."*

**→ [Bài 13: Responsive Layouts](../tuan_3_css_advanced/13_creating_responsive_layouts.md) — Mobile-First, Media Queries, Flexbox, Grid.**
