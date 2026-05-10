# 🟩 TUẦN 2 - BÀI 11
# **THE CSS BOX MODEL**

---

## 0. 🎬 Opening Hook

*Minh tính toán layout: sidebar 300px + content 700px = 1000px. Vừa khít.*

*Mở Chrome. Sidebar rộng 350px. Tổng thành 1050px. Content bị đẩy xuống dòng mới. Layout vỡ.*

*"CSS lừa mình! Mình đặt 300px mà nó render 350px!"*

*Anh Hùng nhìn code: "Không phải CSS lừa. Em đang dùng `content-box` — cách tính kích thước mặc định phiền toái nhất lịch sử web. Đây là bẫy mà 90% developer mới đều vấp phải đúng lần đầu layout."*

**Sau bài này, bạn sẽ không bao giờ bị bẫy này nữa.**

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Box Model là **cơ sở toán học của mọi CSS layout**. Không hiểu Box Model:
- Không giải thích được tại sao element to hơn/nhỏ hơn mong đợi
- Không căn chỉnh được layout chính xác
- Phải đoán mò padding/margin cho đến khi "có vẻ đúng"

Hiểu Box Model:
- Tính được kích thước thực tế của bất kỳ element nào
- Layout chính xác từ lần đầu tiên
- Debug layout trong 30 giây thay vì 2 tiếng

---

## 2. 🌐 Big Picture — Mọi element HTML là một "hộp"

```
Tất cả element HTML — <h1>, <p>, <button>, <img>, <div> — đều là hộp chữ nhật.

┌────────────────────────────────────────────────────────┐
│                    MARGIN                              │  ← Khoảng cách với element khác
│    ┌──────────────────────────────────────────────┐    │     (trong suốt, không có màu)
│    │                  BORDER                      │    │  ← Đường viền nhìn thấy được
│    │    ┌────────────────────────────────────┐    │    │
│    │    │              PADDING               │    │    │  ← Khoảng đệm trong (ăn background)
│    │    │    ┌──────────────────────────┐    │    │    │
│    │    │    │         CONTENT          │    │    │    │  ← Text, ảnh, elements con
│    │    │    │   (width × height)       │    │    │    │
│    │    │    └──────────────────────────┘    │    │    │
│    │    └────────────────────────────────────┘    │    │
│    └──────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────┘
```

**Mỗi lớp có vai trò riêng:**

| Lớp | CSS Property | Đặc điểm |
|---|---|---|
| **Content** | `width`, `height` | Nội dung thật (text, ảnh) |
| **Padding** | `padding` | Khoảng đệm **bên trong** — ăn màu background |
| **Border** | `border` | Đường viền nhìn thấy được |
| **Margin** | `margin` | Khoảng cách với element khác — **trong suốt** |

---

## 3. ⚙️ Core Technical Truth

### `content-box` (mặc định) — Nguồn gốc mọi bug layout

```css
.sidebar {
    width: 300px;        /* Bạn muốn 300px */
    padding: 20px;       /* Thêm 40px (2 bên) */
    border: 5px solid;   /* Thêm 10px (2 bên) */
}

/* ❌ Kích thước THỰC TẾ = 300 + 40 + 10 = 350px */
/* Bạn tính 300, browser render 350 → layout vỡ */
```

**Tại sao CSS làm thế?** `content-box` là hành vi HTML4/CSS2 cũ — `width` chỉ apply cho content area. Padding và border "phình ra ngoài" thêm vào.

---

### `border-box` — Giải pháp "1 dòng cứu toàn bộ project"

```css
/* 🔥 DÒNG ĐẦU TIÊN TRONG MỌI FILE CSS */
* {
    box-sizing: border-box;
}

.sidebar {
    width: 300px;        /* Hộp CHÍNH XÁC 300px */
    padding: 20px;       /* Padding co VÀO TRONG */
    border: 5px solid;   /* Border co VÀO TRONG */
}
/* Content tự = 300 - 40 - 10 = 250px */
/* Tổng vẫn = 300px ✅ */
```

**So sánh trực quan:**
```
content-box (mặc định ❌):     border-box (hiện đại ✅):
┌──────── 350px ──────────┐    ┌──────── 300px ──────┐
│ border 5px              │    │ border 5px           │
│  ┌── padding 20px ───┐  │    │  ┌── padding 20px ┐  │
│  │ content = 300px   │  │    │  │ content = 250px│  │
│  └───────────────────┘  │    │  └────────────────┘  │
└─────────────────────────┘    └──────────────────────┘
Muốn 300 → bị 350 😭          Muốn 300 → được 300 ✅
```

---

### Margin, Padding — Cách viết shorthand

```css
/* 4 giá trị: top right bottom left (theo chiều kim đồng hồ) */
margin: 10px 20px 10px 20px;

/* 2 giá trị: top&bottom left&right */
margin: 10px 20px;        /* top/bottom = 10px, left/right = 20px */

/* 1 giá trị: tất cả 4 chiều */
padding: 20px;             /* Tất cả = 20px */

/* Từng chiều riêng lẻ */
margin-top: 10px;
padding-left: 20px;
```

---

### Margin Collapse — Hiện tượng "Margin bị nuốt"

```css
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 30px; }
/* → Khoảng cách = 30px (KHÔNG phải 20+30=50px) */
/* → Margin dọc giữa 2 block element GỘPLẠI = lấy cái LỚN HƠN */
```

**Khi nào margin collapse xảy ra:**
- Giữa hai block elements nằm dọc (không có border/padding giữa chúng)
- Margin con với margin cha (khi cha không có border/padding/overflow)

**Khi nào KHÔNG xảy ra:**
- Margin ngang (trái/phải) không bao giờ collapse
- Flex/Grid items không collapse
- Element có `overflow: hidden/auto` không collapse với con

---

### `margin: auto` — Căn giữa đơn giản nhất

```css
.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;    /* auto = browser tự chia đều trái/phải */
}
/* → Container luôn căn giữa màn hình */
```

---

### Padding vs Margin — Khi nào dùng cái nào?

```
Muốn khoảng cách bên TRONG element (nội dung xa viền)?
→ PADDING

Muốn khoảng cách giữa element này với element KHÁC?
→ MARGIN
```

```css
/* Button: padding cho chữ xa viền, margin cho button xa nhau */
.btn {
    padding: 12px 24px;    /* Chữ "Lưu" cách viền nút 12px/24px */
    margin: 8px;           /* Nút cách nút khác 8px */
}

/* Card: padding cho content trong card, margin giữa các card */
.card {
    padding: 24px;         /* Nội dung cách viền card 24px */
    margin-bottom: 16px;   /* Card cách card dưới 16px */
}
```

**Background color — cách phân biệt:**
```css
.box {
    background: lightblue;
    padding: 20px;    /* Lightblue bao phủ cả padding */
    margin: 20px;     /* Margin luôn transparent */
}
```

### Inline vs Block — Margin/Padding khác nhau!

```css
/* Block elements: margin/padding hoạt động bình thường mọi chiều */
div {
    margin: 20px;      /* ✅ Top, right, bottom, left đều hoạt động */
    padding: 20px;     /* ✅ Mọi chiều */
    width: 300px;      /* ✅ Set được */
    height: 200px;     /* ✅ Set được */
}

/* Inline elements: CHỈ margin/padding NGANG hoạt động */
span {
    margin: 20px;      /* ⚠️ Chỉ left/right có tác dụng. Top/bottom bị BỎ QUA */
    padding: 20px;     /* ⚠️ Left/right OK. Top/bottom "nhìn thấy" nhưng không đẩy content khác */
    width: 300px;      /* ❌ Bị bỏ qua hoàn toàn */
    height: 200px;     /* ❌ Bị bỏ qua hoàn toàn */
}

/* Giải pháp: đổi sang inline-block hoặc block */
span.highlight {
    display: inline-block;  /* ✅ Giữ inline nhưng chấp nhận width/height/margin mọi chiều */
    margin: 20px;
    padding: 4px 8px;
    width: auto;            /* ✅ Giờ set được */
}
```

### `outline` vs `border` — Phân biệt quan trọng

```css
.box {
    border: 2px solid blue;    /* Chiếm không gian — đẩy content ra */
    outline: 2px solid red;    /* KHÔNG chiếm không gian — vẽ đè lên */
    margin: 10px;
}

/* Outline không ảnh hưởng layout — rất hữu ích cho focus indicator */
input:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;    /* Khoảng cách giữa outline và border */
    /* KHÔNG làm layout nhảy — an toàn hơn border */
}

/* ❌ Anti-pattern: dùng border cho focus → layout nhảy */
input:focus {
    border: 2px solid #2563eb;  /* Layout nhảy vì border thay đổi kích thước */
}
```

---

## 4. 🟢 Simplified Layer — Một câu nhớ mãi

> **`* { box-sizing: border-box; }` — dòng đầu tiên trong mọi file CSS.**
> **Padding bên trong. Margin bên ngoài. Border là biên giới.**

---

## 5. 🏭 Real-world Layer

### CSS Reset chuẩn — dùng cho mọi project

```css
/* ===== CSS RESET + BASE ===== */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;  /* Font mượt trên macOS */
}

img, video {
    max-width: 100%;     /* Ảnh không vỡ khung */
    height: auto;
}
```

### DevTools Box Model Inspector

```
F12 → Elements → click element → tab "Computed"

Hiện hình hộp lồng nhau:
┌── margin ──────────────────────────────┐
│  ┌── border ──────────────────────────┐│
│  │  ┌── padding ────────────────────┐ ││
│  │  │  width × height               │ ││
│  │  └───────────────────────────────┘ ││
│  └────────────────────────────────────┘│
└────────────────────────────────────────┘

Hover vào từng vùng → highlight trên trang
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Kiểm chứng Box Model (20 phút)

1. Tạo file `box-test.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Box Model Test</title>
    <style>
        /* Test 1: content-box (mặc định) */
        .content-box {
            width: 200px;
            padding: 20px;
            border: 5px solid red;
            background: lightblue;
            margin-bottom: 20px;
        }

        /* Test 2: border-box */
        .border-box {
            box-sizing: border-box;
            width: 200px;
            padding: 20px;
            border: 5px solid green;
            background: lightyellow;
        }
    </style>
</head>
<body>
    <div class="content-box">Content-box (mặc định)</div>
    <div class="border-box">Border-box</div>
</body>
</html>
```

2. **Trước khi mở browser:** Tính kích thước thực tế của mỗi div
3. Mở DevTools → Computed tab → kiểm tra kết quả
4. Thêm `* { box-sizing: border-box; }` vào `<style>` → cả hai div giờ bằng nhau không?

**Bonus:** Thêm 2 div cạnh nhau với `.box-a { margin-bottom: 30px }` và `.box-b { margin-top: 20px }` → đo khoảng cách thực tế trong DevTools.

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Margin và padding làm cùng một thứ"** | Khác hoàn toàn: padding bên TRONG (ăn background), margin bên NGOÀI (luôn trong suốt). Dùng nhầm → layout sai, UX xấu |
| **"Margin collapse chỉ xảy ra khi margin bằng nhau"** | Không — xảy ra khi 2 block margin DỌC gặp nhau, và lấy giá trị LỚN HƠN (không cộng) |
| **"Có thể dùng `width: 100%` + padding mà không bị vỡ"** | Với `content-box` → vỡ. Với `border-box` → OK. Đây là lý do mọi project phải có `* { box-sizing: border-box }` |
| **"`margin: auto` căn giữa theo chiều dọc"** | `margin: 0 auto` CHỈ căn giữa theo chiều **ngang**. Căn giữa dọc cần Flexbox hoặc Grid |
| **"Inline elements có margin/padding như block"** | Inline elements (`<span>`, `<a>`) KHÔNG respond với margin-top/bottom và height. Chỉ margin/padding ngang hoạt động |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Một element có `width: 400px; padding: 30px; border: 10px solid`. Kích thước thực tế là bao nhiêu khi dùng `content-box`? Khi dùng `border-box`?
2. Hai element stack dọc: element A có `margin-bottom: 40px`, element B có `margin-top: 25px`. Khoảng cách thực tế giữa chúng là bao nhiêu?
3. Tại sao `margin: auto` KHÔNG căn giữa theo chiều dọc?

### Câu hỏi áp dụng:

4. Bạn có `.card { width: 300px; padding: 24px; }` (với `border-box`). Muốn thêm `border: 2px solid`. Content area thu hẹp xuống bao nhiêu?
5. Layout 3 cột mỗi cột 33.33%, nhưng có `padding: 16px`. Với `content-box` thì layout có vỡ không? Sửa thế nào?

<details>
<summary>👁️ Xem đáp án</summary>

1. **content-box**: 400 + 30×2 + 10×2 = **480px**. **border-box**: vẫn **400px** (padding và border co vào trong, content = 400 - 60 - 20 = 320px).
2. **40px** — margin collapse lấy giá trị LỚN HƠN (40 > 25 → chỉ tính 40, không cộng).
3. `margin: auto` chỉ hoạt động ngang khi browser có thể tính "phần còn lại để chia đều". Chiều dọc — browser không biết chiều cao container là bao nhiêu (có thể vô hạn khi scroll) nên không tính được auto.
4. Content area = 300 - 24×2 - 2×2 = 300 - 48 - 4 = **248px** (border-box đảm bảo tổng vẫn 300px).
5. **Có vỡ** — `content-box`: mỗi cột thực tế = 33.33% + 32px padding = vượt 100%. **Sửa**: Thêm `* { box-sizing: border-box }` → padding nằm trong 33.33% → không vỡ.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`* { box-sizing: border-box; }`** — dòng đầu tiên, mọi project, không ngoại lệ
2. **4 lớp Box Model**: Content → Padding (trong, ăn background) → Border (nhìn thấy) → Margin (ngoài, trong suốt)
3. **content-box**: width = chỉ content. **border-box**: width = content + padding + border
4. **Margin collapse**: 2 margin dọc gộp lại = cái LỚN HƠN (không cộng)
5. **`margin: 0 auto`** = căn giữa ngang. Không dùng cho căn giữa dọc

---

## 10. ➡️ Next Lesson Bridge

*Sidebar 300px + content 700px = 1000px. Vừa khít rồi! Nhưng khi thu nhỏ browser, sidebar đè lên content. Khi mở trên điện thoại, mọi thứ vỡ.*

*"Làm sao để element 'dính' vào góc màn hình? Làm sao để header luôn hiện trên cùng khi scroll?"*

**→ [Bài 12: CSS Positioning](./12_css_positioning.md) — static, relative, absolute, fixed, sticky: 5 giá trị làm chủ vị trí mọi element.**
