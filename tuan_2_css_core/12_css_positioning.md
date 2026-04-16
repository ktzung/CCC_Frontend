# 🟩 CHƯƠNG 12
# **CSS POSITIONING**

## 🎬 "Nút Chat Dính Góc Màn Hình" — Position Fixed lần đầu

*Minh muốn tạo nút "Chat Support" dính góc dưới phải màn hình — giống Shopee, Tiki.*

*Anh đặt `margin-bottom: 0` → không dính. `float: right` → cũng sai. Scroll xuống → nút biến mất.*

> **Anh Hùng:** *"Em cần `position: fixed`. Fixed = dính vào viewport, không cuộn theo trang. Đây là lúc em cần hiểu 5 giá trị position."*

---

## 🎯 Mục tiêu
- Phân biệt 5 giá trị position: static, relative, absolute, fixed, sticky
- Sử dụng `top`, `right`, `bottom`, `left`, `z-index`
- Layout thực tế: sticky header, fixed chat button, dropdown menu

---

## 📍 5 Giá trị Position

### 1. `static` — Mặc định, "nằm yên tại chỗ"
```css
.box { position: static; }  /* Mặc định. Không cần viết. */
/* top/right/bottom/left KHÔNG hoạt động */
```

### 2. `relative` — "Dịch chuyển so với vị trí gốc"
```css
.box {
    position: relative;
    top: 10px;     /* Dịch xuống 10px */
    left: 20px;    /* Dịch phải 20px */
}
/* Element dịch chuyển nhưng vẫn CHIẾM VỊ TRÍ CŨ trong layout */
```

### 3. `absolute` — "Bay ra khỏi layout, bám theo cha relative"
```css
.parent { position: relative; }    /* Cha = mốc tọa độ */
.child {
    position: absolute;
    top: 0;
    right: 0;                      /* Góc trên phải của parent */
}
/* ⚠️ Element KHÔNG chiếm chỗ trong layout nữa */
```

> *Minh dùng absolute cho badge "5" trên icon giỏ hàng — badge nằm góc trên phải icon, không ảnh hưởng layout.*

### 4. `fixed` — "Dính vào viewport" ⭐

```css
.chat-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;      /* Nằm trên mọi thứ */
}
/* KHÔNG cuộn theo trang. Luôn thấy. */
```

### 5. `sticky` — "Bình thường → dính khi scroll" ⭐

```css
.header {
    position: sticky;
    top: 0;              /* Dính khi scroll đến top */
    z-index: 100;
    background: white;
}
/* Hoạt động như relative → đến ngưỡng → chuyển thành fixed */
```

> *Minh dùng sticky cho header Todo App. Scroll xuống → header luôn hiện trên cùng.*

---

## 📊 So sánh nhanh

| Position | Chiếm chỗ? | Mốc tọa độ | Use case |
|---|---|---|---|
| `static` | ✅ | Không dùng top/left | Mặc định |
| `relative` | ✅ | Chính nó | Dịch nhẹ, làm mốc cho absolute |
| `absolute` | ❌ | Cha relative gần nhất | Badge, dropdown, tooltip |
| `fixed` | ❌ | Viewport | Chat button, modal overlay |
| `sticky` | ✅ → ❌ | Viewport (khi dính) | Sticky header, sidebar |

---

## 🏢 Ví dụ thực tế: Layout e-commerce

```css
/* Sticky header */
.header { position: sticky; top: 0; z-index: 100; }

/* Fixed chat button */
.chat-btn { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }

/* Dropdown menu */
.nav-item { position: relative; }
.dropdown {
    position: absolute;
    top: 100%;         /* Ngay dưới nav item */
    left: 0;
    display: none;
}
.nav-item:hover .dropdown { display: block; }

/* Cart badge */
.cart-icon { position: relative; }
.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    border-radius: 50%;
    width: 20px; height: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    color: white;
}
```

---

## ➡️ Chương tiếp theo...

*Minh đã biết positioning. Nhưng khi cần xếp 3 cột sản phẩm cạnh nhau, responsive trên mobile...*

*"Dùng Flexbox," anh Hùng nói. "Và CSS Grid cho layout phức tạp hơn. Đây là tương lai của CSS layout."*

**Tuần 3 — CSS Advanced:** Flexbox, Grid, Responsive Design, Animations — vũ khí của Frontend Developer hiện đại.
