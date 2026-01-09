# 🟩 CHƯƠNG 14
# **STYLING WITH CSS**

Layout chuẩn rồi thì phải đẹp. Chương này cung cấp "đồ nghề trang điểm" nâng cao để biến web từ "thường thường" thành "lung linh".

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Tạo màu nền chuyển sắc (**Gradients**) thời thượng.
- Tạo chiều sâu với đổ bóng (**Shadows**).
- Làm web chuyển động mượt mà với **Transitions** và **Transforms**.
- Tạo hoạt hình phức tạp với **Keyframes Animation**.

---

# 1. **BACKGROUNDS & GRADIENTS**

Không ai thích một màu trơn nhàm chán mãi.

## Linear Gradient (Chuyển màu thẳng)
```css
.hero {
  /* Từ trái sang phải, tím sang xanh */
  background: linear-gradient(to right, #8e2de2, #4a00e0);
}
```

## Background Image Overlay (Phủ màu lên ảnh)
```css
.banner {
  background: 
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), /* Lớp phủ đen mờ */
    url('image.jpg');
  background-size: cover; /* Ảnh phủ kín */
  background-position: center;
}
```

---

# 2. **SHADOWS (ĐỔ BÓNG)**

Tạo hiệu ứng nổi (3D) cho phần tử.

## Box Shadow
Cú pháp: `offset-x offset-y blur-radius spread-radius color`
```css
.card {
  /* Bóng nhẹ, sang trọng (neumorphism/glassmorphism) */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  /* Nổi lên khi hover */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
```

## Text Shadow
```css
h1 {
  text-shadow: 2px 2px 4px #000000;
}
```

---

# 3. **TRANSFORMS (BIẾN HÌNH)**

Thay đổi hình dạng, vị trí mà không ảnh hưởng layout xung quanh.

- `translate(x, y)`: Dịch chuyển.
- `rotate(deg)`: Xoay.
- `scale(x, y)`: Phóng to/Thu nhỏ.
- `skew(deg)`: Nghiêng.

```css
.btn:hover {
  transform: translateY(-5px); /* Nổi lên trên 5px */
}
```

---

# 4. **TRANSITIONS (CHUYỂN ĐỔI MƯỢT MÀ)**

Nếu không có transition, hover vào nó sẽ đổi cái "Bụp" -> Rất thô. Transition giúp thay đổi diễn ra từ từ.

```css
.btn {
  background-color: blue;
  transform: translateY(0);
  
  /* Áp dụng cho tất cả thuộc tính thay đổi, trong 0.3s, kiểu ease */
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: darkblue;
  transform: translateY(-5px);
}
```

---

# 5. **ANIMATIONS (@KEYFRAMES)**

Transition cần người dùng tác động (hover/click). Animation thì tự chạy (loading, slide ảnh).

## Bước 1: Định nghĩa kịch bản phim
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

## Bước 2: Gán vào diễn viên
```css
.popup {
  animation: slideIn 0.5s ease-out forwards;
}
```

---

# 6. **TỔNG KẾT**

- **Gradients** làm nền đẹp hơn.
- **Shadows** tạo chiều sâu (Material Design).
- **Transitions** là bắt buộc cho mọi tương tác (Hover, Focus).
- **Animations** dùng cho các hiệu ứng phức tạp (Loading...).

---

**Chương tiếp theo:** Viết CSS nhiều quá bị rối? Làm sao tổ chức cho gọn? (Testing & Organizing).
