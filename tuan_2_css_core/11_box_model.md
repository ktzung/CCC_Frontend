# 🟩 CHƯƠNG 11
# **THE BOX MODEL OF CSS**

Trong mắt CSS, tất cả mọi phần tử HTML (`<img>`, `<p>`, `<h1>`) thực chất đều là những **Hình Chữ Nhật (Boxes)**. Hiểu Box Model là chìa khóa để bố cục trang web chính xác từng pixel.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu cấu tạo 4 lớp của Box Model: **Content, Padding, Border, Margin**.
- Tính toán được kích thước thực tế của một phần tử.
- Biết sự khác biệt sống còn giữa `content-box` (cũ) và `border-box` (mới).
- Biết cách reset CSS chuẩn.

---

# 1. **CLASSIC BOX MODEL (CẤU TRÚC HỘP CỔ ĐIỂN)**

Mỗi cái hộp gồm 4 thành phần, xếp từ trong ra ngoài:

```
┌─────────────────────────────────────────┐
│            MARGIN (bên ngoài)           │  <- Tạo khoảng cách với hàng xóm
│  ┌─────────────────────────────────────┐│
│  │      BORDER (đường viền)            ││  <- Đường bao quanh
│  │  ┌─────────────────────────────────┐││
│  │  │   PADDING (khoảng trong)        │││  <- Khoảng đệm bảo vệ nội dung
│  │  │  ┌─────────────────────────────┐│││
│  │  │  │   CONTENT (nội dung)        ││││  <- Text, Ảnh
│  │  │  └─────────────────────────────┘│││
│  │  └─────────────────────────────────┘││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

1.  **Content:** Nơi chứa text, ảnh. Kích thước xác định bởi `width` và `height`.
2.  **Padding:** Vùng đệm trong suốt bao quanh content. (Ví dụ: Chữ cách viền một chút cho dễ đọc).
3.  **Border:** Đường viền bao quanh padding.
4.  **Margin:** Khoảng trống trong suốt bên ngoài border. Giúp đẩy các phần tử khác ra xa.

## Cách tính kích thước (RẤT QUAN TRỌNG)
Trong Box Model mặc định (`box-sizing: content-box`):

**Chiều rộng thực tế = `width` + `padding-left` + `padding-right` + `border-left` + `border-right`**

Ví dụ:
```css
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
```
-> Độ rộng hiển thị trên màn hình = 300 + 40 (padding) + 10 (border) = **350px**.
*(Điều này rất phiền phức! Bạn muốn nó 300px mà nó cứ phình ra).*

---

# 2. **NEWER ALTERNATE BOX MODEL (BORDER-BOX)**

Để giải quyết nỗi đau "phình to" ở trên, CSS hiện đại giới thiệu `box-sizing: border-box`.

Khi dùng `border-box`:
**Chiều rộng thực tế = `width` bạn set.**
*(Padding và Border sẽ tự chui vào trong, làm Content nhỏ lại, chứ không làm hộp to ra).*

## Cách dùng (Khuyên dùng cho mọi dự án)
```css
/* Reset CSS để tất cả đều dùng border-box */
* {
  box-sizing: border-box;
}

.box {
  width: 300px; /* Hộp sẽ rộng đúng 300px bất kể padding hay border */
  padding: 20px;
  border: 5px solid black;
}
```

---

# 3. **DESIGNING BOXES (THIẾT KẾ HỘP)**

## 3.1. Margin Collapse (Hiện tượng gộp Margin)
Khi hai thẻ block nằm chồng lên nhau (dọc), margin của chúng không cộng dồn mà **gộp làm một** (lấy cái lớn hơn).

- Hộp A có `margin-bottom: 20px`.
- Hộp B có `margin-top: 30px`.
-> Khoảng cách giữa chúng là **30px** (không phải 50px).
*(Lưu ý: Margin ngang trái/phải không bị gộp).*

## 3.2. Margin: auto
Dùng để căn giữa một thẻ Block theo chiều ngang.

```css
.container {
  width: 800px;
  margin: 0 auto; /* Trên dưới 0, Trái phải tự động chia đều */
}
```

---

# 5. **TỔNG KẾT**

- **Padding**: Phần đệm bên trong (ăn theo màu nền của element).
- **Margin**: Khoảng cách bên ngoài (luôn trong suốt).
- Luôn luôn, mãi mãi sử dụng `* { box-sizing: border-box; }` ở đầu file CSS để dễ tính toán kích thước.

---

**Chương tiếp theo:** Làm sao để đưa cái hộp này sang phải, cái hộp kia dính vào góc màn hình? (Positioning).
