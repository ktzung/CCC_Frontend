# 🟩 CHƯƠNG 12
# **CSS POSITIONING**

Layout (Bố cục) là phần khó nhất nhưng thú vị nhất của CSS. Làm sao để đặt một phần tử vào đúng vị trí bạn muốn? Chúng ta có 2 vũ khí chính: thuộc tính `position` và hệ thống `Flexbox`.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu rõ 5 giá trị `position`: **static, relative, absolute, fixed, sticky**.
- Sử dụng **Flexbox** để chia cột, căn giữa và sắp xếp các phần tử (Flexible Boxes).

---

# 1. **POSITIONING VIA CSS FEATURE "POSITION"**

Thuộc tính `position` giúp bạn phá vỡ quy tắc sắp xếp bình thường của HTML.

## 1.1. `position: static` (Mặc định)
- Phần tử nằm đâu thì ở yên đó theo luồng tài liệu.
- Các thuộc tính `top`, `left`, `right`, `bottom`, `z-index` **vô tác dụng**.

## 1.2. `position: relative` (Tương đối)
- Vẫn chiếm chỗ trong luồng tài liệu như bình thường.
- NHƯNG: Có thể dùng `top`, `left`... để dịch chuyển nó so với **vị trí ban đầu**.

```css
.box {
  position: relative;
  left: 20px; /* Dịch sang phải 20px so với chỗ đứng cũ */
}
```

## 1.3. `position: absolute` (Tuyệt đối)
- **Thoát khỏi luồng tài liệu:** Các phần tử khác sẽ tràn lên chiếm chỗ của nó (như thể nó không tồn tại).
- Dùng `top`, `left`... để định vị chính xác theo **tọa độ**.
- **Quan trọng:** Nó định vị theo **thẻ cha gần nhất có `position` khác static**. (Thường ta đặt cha là `relative` để nhốt con `absolute` bên trong).

```css
.parent {
  position: relative; /* Làm cột mốc */
}
.child {
  position: absolute;
  top: 0;
  right: 0; /* Dính chặt vào góc trên phải của cha */
}
```

## 1.4. `position: fixed` (Cố định)
- Thoát khỏi luồng tài liệu.
- Định vị theo **cửa sổ trình duyệt (Viewport)**.
- Khi cuộn chuột, nó vẫn đứng yên.
- Dùng cho: Header cố định, Nút "Chat với chúng tôi", Nút "Back to top".

```css
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
}
```

## 1.5. `position: sticky` (Dính)
- Lai giữa `relative` và `fixed`.
- Bình thường nó trôi theo nội dung. Nhưng khi cuộn qua nó, nó sẽ "dính" lại ở mép màn hình.
- Dùng cho: Thanh tiêu đề bảng, thanh menu phụ.

---

# 2. **FLEXIBLE BOXES OF CSS (FLEXBOX)**

Flexbox là cuộc cách mạng của CSS layout (thay thế cho `float` ngày xưa). Nó giúp sắp xếp các phần tử theo 1 chiều (hàng ngang hoặc cột dọc).

## 2.1. Kích hoạt Flexbox
```css
.container {
  display: flex;
}
```
Ngay lập tức, các con bên trong (flex items) sẽ xếp thành **hàng ngang**.

## 2.2. Trục chính và Trục phụ
- **Main Axis (Trục chính):** Mặc định là Ngang (Row).
- **Cross Axis (Trục phụ):** Mặc định là Dọc (Column).

Bạn có thể xoay trục bằng:
```css
.container {
  flex-direction: column; /* Xếp dọc từ trên xuống */
}
```

## 2.3. Căn chỉnh trên Trục Chính (`justify-content`)
Điều khiển khoảng cách ngang (nếu `flex-direction: row`).
- `flex-start`: Dồn sang trái.
- `flex-end`: Dồn sang phải.
- `center`: Ra giữa.
- `space-between`: Dãn đều, ép 2 cái đầu cuối sát lề.
- `space-around`: Dãn đều, có khoảng trống xung quanh.

## 2.4. Căn chỉnh trên Trục Phụ (`align-items`)
Điều khiển khoảng cách dọc.
- `stretch` (mặc định): Kéo giãn full chiều cao.
- `center`: Căn giữa dọc.
- `flex-start`: Căn lên trên.

## 2.5. Ví dụ kinh điển: Căn giữa hoàn hảo
```css
.box {
  display: flex;
  justify-content: center; /* Giữa ngang */
  align-items: center;     /* Giữa dọc */
  height: 300px;
}
```

---

# 3. **TỔNG KẾT**

- Dùng **Absolute** khi muốn đặt một vật đè lên vật khác (ví dụ icon trên ảnh).
- Dùng **Fixed** cho những thứ luôn hiển thị (Header, Popup).
- Dùng **Flexbox** cho hầu hết các layout chia cột/hàng (Navigation, Danh sách sản phẩm).

---

**Chương tiếp theo:** Responsive Layouts (Làm sao để web đẹp trên cả điện thoại và máy tính?).
