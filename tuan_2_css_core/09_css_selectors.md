# 🟩 CHƯƠNG 09
# **THE SELECTORS OF CSS**

Sức mạnh thực sự của CSS nằm ở **Selectors**. Nếu bạn không thể chọn đúng phần tử bạn muốn sửa, bạn không thể làm gì cả.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Sử dụng thành thạo **Simple Selectors** (Tag, Class, ID).
- Hiểu và dùng **Combinators** (Con, Cháu, Em liền kề).
- Sử dụng **Pseudo-classes** (Hover, Focus, Nth-child).
- Biết cách viết CSS hiệu quả và dễ bảo trì.

---

# 1. **THE SIMPLE SELECTORS OF CSS**

Đây là những selector cơ bản nhất, dùng 90% thời gian.

## 1.1. Element Selector (Chọn theo tên thẻ)
Chọn TẤT CẢ thẻ có tên đó.

```css
p {
  color: #333;
}
```

## 1.2. Class Selector (Chọn theo lớp - `.`)
Chọn các phần tử có cùng attribute `class`. Dùng dấu chấm `.` phía trước.

```css
.highlight {
  background-color: yellow;
}
```

**HTML:**
```html
<p class="highlight">Tôi được tô nền vàng.</p>
<span class="highlight">Tôi cũng vậy.</span>
```

## 1.3. ID Selector (Chọn theo định danh - `#`)
Chọn MỘT phần tử duy nhất có `id` đó. Dùng dấu thăng `#` phía trước.

```css
#header {
  height: 60px;
}
```

> [!WARNING]
> **ID vs Class:**
> - **ID:** Duy nhất (CMND). Mỗi trang chỉ có 1 element với ID `#header`.
> - **Class:** Nhóm (Đồng phục). Nhiều người có thể mặc chung 1 class `.student`.
> -> **Luôn ưu tiên dùng Class để style.** Dùng ID chủ yếu cho JS hoặc Anchor link.

## 1.4. Universal Selector (`*`)
Chọn tất cả mọi thứ.

```css
* {
  margin: 0;
  padding: 0;
}
```

## 1.5. Grouping Selector (Nhóm)
Style giống nhau cho nhiều thẻ.

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
  color: navy;
}
```

---

# 2. **COMBINATORS (CÁC BỘ CHỌN KẾT HỢP)**

Mối quan hệ gia đình trong HTML.

## 2.1. Descendant Selector (Con cháu - Khoảng trắng)
Chọn tất cả `p` nằm trong `div` (bất kể sâu bao nhiêu).
```css
div p { color: red; }
```

## 2.2. Child Selector (Con trực tiếp - `>`)
Chỉ chọn `p` là con ruột của `div` (không chọn cháu).
```css
div > p { color: blue; }
```

## 2.3. Adjacent Sibling Selector (Em liền kề - `+`)
Chọn `p` nằm NGAY SAU `h1`.
```css
h1 + p { font-size: 1.2rem; }
```

---

# 3. **PSEUDO-CLASSES (LỚP GIẢ)**

Chọn phần tử dựa trên **trạng thái** của nó. Dấu hai chấm `:`.

## `3.1. :hover` (Khi di chuột vào)
```css
a:hover {
  text-decoration: underline;
  color: orange;
}
```

## `3.2. :focus` (Khi đang nhập liệu)
```css
input:focus {
  border-color: blue;
  outline: none;
}
```

## `3.3. :nth-child(n)` (Chọn đứa con thứ n)
```css
/* Chọn dòng chẵn trong bảng */
tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

---

# 4. **RECOMMENDATION: EFFICIENT & SIMPLE CSS**

Viết CSS cũng cần nghệ thuật để code không "bốc mùi".

1.  **Hạn chế dùng ID:** Vì ID có độ ưu tiên (Specificity) quá cao, sau này muốn sửa (override) rất khó.
2.  **Đặt tên class có ý nghĩa (BEM):**
    - Tốt: `.btn-primary`, `.card-header`.
    - Xấu: `.red-text` (lỡ sau này đổi sang xanh thì sao?), `.box1`.
3.  **Đừng viết selector quá dài:**
    - Xấu: `div.container > ul.menu > li > a.link` (Quá cụ thể, trình duyệt đọc chậm).
    - Tốt: `.menu-link`.

---

# 5. **TỔNG KẾT**

- **Class (.)** là bạn thân nhất của developer.
- **Pseudo-classes (:)** giúp tạo tương tác (hover).
- **Combinators** giúp chọn phần tử dựa trên vị trí.
- Giữ selector ngắn gọn và dễ hiểu.

---

**Chương tiếp theo:** Tại sao tôi đặt màu đỏ mà nó lại hiện màu xanh? (Inheritance vs Cascading).
