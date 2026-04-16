# 🟩 CHƯƠNG 11
# **THE BOX MODEL OF CSS**

## 🎬 "Tại Sao Cái Div Của Mình Luôn Rộng Hơn 300px?!"

*Minh dành 2 tiếng căn chỉnh layout trang Todo App.*

*Anh đặt `width: 300px` cho sidebar. Bố cục tính toán chính xác: sidebar 300px + content 700px = 1000px vừa khít màn hình.*

*Nhưng trên Chrome, sidebar lại rộng 350px. Tổng thành 1050px. Content bị đẩy xuống dòng mới. Layout vỡ.*

> **Minh:** *"CSS lừa mình! Mình đặt 300 mà nó không chịu 300!"*
>
> **Anh Hùng (nhìn code):** *"Không phải CSS lừa. Em đang dùng `content-box` — cái mode tính kích thước phiền toái nhất trong lịch sử web. Đây là bẫy mà 90% developer mới đều vấp."*

**Sau chương này, bạn sẽ KHÔNG BAO GIỜ rơi vào bẫy này nữa.**

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu cấu tạo 4 lớp của Box Model: **Content, Padding, Border, Margin**
- Tính toán được kích thước thực tế của một phần tử
- Biết sự khác biệt sống còn giữa `content-box` (cũ) và `border-box` (mới)
- Biết cách reset CSS chuẩn (một dòng cứu ngàn dòng debug)

---

# 1. **CLASSIC BOX MODEL — "Hộp Carton Shopee"**

Trong mắt CSS, **tất cả phần tử HTML đều là hình chữ nhật (boxes)**. Không có ngoại lệ. `<img>`, `<p>`, `<h1>`, `<button>` — tất cả đều là hộp.

### Ẩn dụ: Đóng Hàng Gửi Shopee

Mỗi hộp gồm 4 lớp, giống đóng gói hàng online:

```
┌──────────────────────────────────────────────┐
│              MARGIN (khoảng cách)             │  ← Khoảng cách giữa thùng
│                                              │     trên xe tải (trong suốt)
│  ┌────────────────────────────────────────┐  │
│  │         BORDER (thùng carton)          │  │  ← Vỏ thùng hàng
│  │                                        │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │      PADDING (xốp chống sốc)    │  │  │  ← Bọc xốp bảo vệ
│  │  │                                  │  │  │
│  │  │  ┌──────────────────────────┐   │  │  │
│  │  │  │   CONTENT (sản phẩm)    │   │  │  │  ← Sản phẩm bên trong
│  │  │  │   (Text, Ảnh)           │   │  │  │
│  │  │  └──────────────────────────┘   │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

| Lớp | Ẩn dụ đóng hàng | CSS | Ví dụ |
|---|---|---|---|
| **Content** | 📱 Sản phẩm | `width`, `height` | Text, ảnh bên trong |
| **Padding** | 🧽 Xốp chống sốc | `padding` | Khoảng đệm giữa nội dung và viền |
| **Border** | 📦 Thùng carton | `border` | Đường viền nhìn thấy được |
| **Margin** | 📏 Khoảng cách giữa thùng | `margin` | Khoảng trống đẩy elements khác ra xa |

---

## 🧮 Cách tính kích thước — NGUYÊN NHÂN CỦA MỌI BUG LAYOUT

Trong Box Model mặc định (`box-sizing: content-box`):

**Chiều rộng THỰC TẾ = width + padding×2 + border×2**

```css
.box {
  width: 300px;        /* ← Bạn muốn 300px */
  padding: 20px;       /* ← +40px (2 bên) */
  border: 5px solid;   /* ← +10px (2 bên) */
}
/* → Kích thước THỰC TẾ = 300 + 40 + 10 = 350px 😱 */
/* → Layout vỡ vì bạn tính 300 nhưng nó chiếm 350! */
```

> *Đây chính là nguyên nhân* Minh *mất 2 tiếng debug. Anh đặt 300px nhưng browser render 350px. Và anh không hiểu tại sao.*

---

# 2. **BORDER-BOX — Giải Pháp "Một Dòng Cứu Ngàn Dòng"**

CSS hiện đại giới thiệu `box-sizing: border-box` để giải quyết nỗi đau này:

**Khi dùng `border-box`: Chiều rộng THỰC TẾ = `width` bạn đặt. Chấm hết.**

*Padding và Border sẽ co VÀO TRONG, làm Content nhỏ lại, chứ KHÔNG làm hộp to ra.*

```css
/* 🔥 DÒNG CODE QUAN TRỌNG NHẤT TRONG ĐỜI CSS CỦA BẠN */
* {
  box-sizing: border-box;
}

.box {
  width: 300px;        /* → Hộp CHÍNH XÁC 300px */
  padding: 20px;       /* → Padding co vào trong */
  border: 5px solid;   /* → Border co vào trong */
}
/* → Content tự = 300 - 40 - 10 = 250px */
/* → Tổng vẫn = 300px ✅ */
```

### So sánh trực quan:

```
content-box (CŨ):                    border-box (MỚI):
┌──── 350px ──────────────┐          ┌──── 300px ────────────┐
│ border 5px               │          │ border 5px             │
│ ┌─ padding 20px ──────┐ │          │ ┌─ padding 20px ────┐ │
│ │ content = 300px      │ │          │ │ content = 250px    │ │
│ └──────────────────────┘ │          │ └────────────────────┘ │
└──────────────────────────┘          └────────────────────────┘

Bạn muốn 300 → nó cho 350 😭        Bạn muốn 300 → nó cho 300 ✅
```

> **Anh Hùng:** *"Mọi dự án tại FPT, Shopee, VNG đều có dòng `* { box-sizing: border-box; }` ở file CSS đầu tiên. Thiếu nó = mọi layout đều sai. Đây là dòng 'bảo hiểm' cho toàn bộ project."*

---

# 3. **DESIGNING BOXES — Các kỹ thuật thực tế**

## 3.1. Margin Collapse — Hiện tượng "Margin bị nuốt"

Khi hai thẻ block nằm **chồng dọc**, margin của chúng **KHÔNG CỘNG DỒN** mà gộp làm một (lấy cái lớn hơn):

```css
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 30px; }
/* → Khoảng cách = 30px (KHÔNG PHẢI 50px) */
/* → CSS lấy giá trị LỚN HƠN */
```

> ⚠️ **Lưu ý:** Margin ngang (trái/phải) KHÔNG bị collapse. Chỉ margin dọc (trên/dưới) mới bị.

## 3.2. `margin: auto` — Căn giữa phần tử dễ nhất

```css
.container {
  width: 800px;
  margin: 0 auto;   /* Trên/dưới = 0, Trái/phải = auto (tự chia đều) */
}
/* → Container nằm chính giữa màn hình */
```

> *Minh dùng `margin: 0 auto` cho container todo-app, lập tức nội dung nhảy ra giữa trang. "Sao đơn giản vậy?!" anh hào hứng.*

## 3.3. Padding vs Margin — Khi nào dùng cái nào?

| | Padding | Margin |
|---|---|---|
| Vị trí | Bên TRONG element | Bên NGOÀI element |
| Background | Kế thừa background-color | Luôn trong suốt |
| Collapse | Không bao giờ | Có (dọc) |
| Dùng khi | Tạo khoảng đệm bên trong | Tạo khoảng cách với element khác |

```css
/* Ví dụ: Nút bấm đẹp */
.btn {
  padding: 12px 24px;     /* ← Padding: chữ cách viền nút */
  margin: 8px;            /* ← Margin: nút cách các element khác */
  border: 2px solid #333;
  border-radius: 8px;
}
```

---

## 🏪 ÁP DỤNG: Layout Sidebar + Content cho Todo App

```css
* { box-sizing: border-box; }   /* ← BẮT BUỘC! */

.page {
  width: 1000px;
  margin: 0 auto;        /* Căn giữa */
}

.sidebar {
  width: 300px;           /* → Đúng 300px, kể cả có padding */
  padding: 20px;
  border-right: 1px solid #ddd;
  float: left;
}

.content {
  width: 700px;           /* → Đúng 700px */
  padding: 20px;
  float: left;
}
/* 300 + 700 = 1000 ✅ Layout không vỡ! */
```

> *Minh thử lại layout sau khi thêm `border-box`: sidebar 300, content 700, tổng 1000. Vừa khít!* 🎉

---

# 5. **TỔNG KẾT**

| Khái niệm | Nhớ |
|---|---|
| **Content** | Sản phẩm trong thùng |
| **Padding** | Xốp chống sốc (ăn theo background-color) |
| **Border** | Thùng carton (nhìn thấy được) |
| **Margin** | Khoảng cách giữa các thùng (luôn trong suốt) |
| **content-box** | ❌ Phình to khi thêm padding/border |
| **border-box** | ✅ Kích thước luôn đúng như bạn đặt |
| **`* { box-sizing: border-box; }`** | 🔥 Dòng đầu tiên mọi file CSS |

---

## ➡️ Chuyện tiếp theo...

*Minh đã làm được sidebar + content nằm cạnh nhau. Nhưng khi thu nhỏ trình duyệt, sidebar đè lên content. Khi mở trên điện thoại, mọi thứ vỡ tung.*

*"Làm sao để cái hộp này sang phải, cái hộp kia dính vào góc màn hình? Và làm sao để website đẹp trên cả laptop lẫn mobile?"*

**Chương tiếp theo:** CSS Positioning — Làm chủ vị trí của mọi element trên trang web. Từ `static` → `relative` → `absolute` → `fixed` → `sticky`. Và tại sao Flexbox là "vũ khí bí mật" của layout hiện đại.
