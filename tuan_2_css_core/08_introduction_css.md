# 🟩 CHƯƠNG 08
# **INTRODUCTION TO CASCADING STYLE SHEETS**

Nếu HTML là bộ khung xương, JavaScript là hệ thần kinh, thì **CSS (Cascading Style Sheets)** chính là lớp da, quần áo và lớp trang điểm làm nên vẻ đẹp của website.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu CSS là gì và tại sao nó "Cascading" (Xếp chồng).
- Nắm vững cú pháp cơ bản: `Selector { Property: Value }`.
- Biết 3 cách nhúng CSS vào trang web (Inline, Internal, External).
- Sử dụng Chrome DevTools để "soi" CSS của bất kỳ trang web nào.

---

# 1. **THE STORY OF CSS (CÂU CHUYỆN CỦA CSS)**

Trước khi có CSS, việc định dạng (màu sắc, phông chữ) được viết trực tiếp trong HTML.
Ví dụ: `<font color="red">Hello</font>`.
Điều này khiến code HTML trở nên rối rắm và khó sửa đổi (muốn đổi màu tất cả tiêu đề phải sửa từng thẻ).

CSS ra đời để **tách biệt nội dung (HTML) và giao diện (Style)**.
- Bạn sửa 1 dòng CSS -> Hàng nghìn trang HTML đổi màu theo.
- Code gọn gàng, dễ quản lý.

---

# 2. **THE BASIC PRINCIPLE (NGUYÊN TẮC CƠ BẢN)**

## 2.1. Cú pháp (Syntax)
Một câu lệnh CSS gọi là một **Rule Set**, bao gồm:

```css
Selector {
  Property: Value;
  Property: Value;
}
```

- **Selector (Bộ chọn):** Chọn phần tử HTML nào để áp dụng style (ví dụ `h1`, `p`).
- **Declaration Block (Khối khai báo):** Nằm trong ngoặc nhọn `{}`.
- **Property (Thuộc tính):** Cái bạn muốn đổi (màu, cỡ chữ...).
- **Value (Giá trị):** Giá trị cụ thể (đỏ, 16px...).

**Ví dụ:**
```css
h1 {
  color: blue;
  font-size: 24px;
}
```
*Dịch: Hãy tìm tất cả thẻ `<h1>` và tô màu xanh, chỉnh cỡ chữ 24px.*

## 2.2. Ba cách nhúng CSS

### Cách 1: Inline CSS (Trực tiếp - Ít dùng)
Viết ngay trong thẻ HTML.
```html
<p style="color: red;">Đoạn văn này màu đỏ</p>
```
*Nhược điểm: Khó quản lý, không tái sử dụng được.*

### Cách 2: Internal CSS (Nội bộ - Dùng cho trang đơn)
Viết trong thẻ `<style>` đặt ở `<head>`.
```html
<head>
  <style>
    p { color: red; }
  </style>
</head>
```

### Cách 3: External CSS (Bên ngoài - Khuyên dùng)
Viết ra file riêng `.css` rồi link vào.
```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```
*Ưu điểm: 1 file CSS quản lý giao diện cho cả ngàn trang HTML.*

---

# 3. **ANALYZING CSS IN THE BROWSER**

Làm sao biết tại sao cái nút này lại màu xanh? Hãy dùng **Developer Tools**.

1. Chuột phải vào phần tử -> **Inspect (Kiểm tra)**.
2. Nhìn cột **Styles** (bên phải hoặc dưới).
3. Bạn sẽ thấy:
    - Các rules CSS đang áp dụng.
    - Dòng nào bị gạch ngang (bị ghi đè).
    - Có thể sửa trực tiếp value để xem thử (không lưu vào file).

> [!TIP]
> **Computed Tab:** Nếu Styles quá rối, hãy qua tab **Computed** để xem thông số cuối cùng (màu gì, kích thước bao nhiêu) và click mũi tên để xem nó đến từ đâu.

---

# 4. **TỔNG KẾT**

- CSS giúp tách biệt giao diện khỏi nội dung HTML.
- Luôn ưu tiên dùng **External CSS** (`.css` file).
- Cú pháp đơn giản: Chọn cái gì (`Selector`) -> Sửa cái gì (`Property: Value`).
- Chrome DevTools là bạn thân nhất để debug CSS.

---

**Chương tiếp theo:** Làm sao để chọn chính xác phần tử mình muốn? (Selectors).
