# 🟦 CHƯƠNG 07
# **FORMS & INTERACTIVE ELEMENTS**

## 🎬 "Form Đăng Ký Đầu Tiên" — Bài tập sống còn

*Thầy giao BTL: "Tạo trang web e-commerce có form đăng ký, đăng nhập, và đặt hàng. Tuần sau nộp."*

*Minh: "Form phải validate email, password mạnh, số điện thoại... HTML có hỗ trợ validate không hay phải viết JS hết?"*

*Anh Hùng: "HTML5 có validation built-in! `required`, `type="email"`, `pattern`... chỉ cần dùng đúng attribute. JS chỉ cần bổ sung cho các case phức tạp."*

---

## 🎯 Mục tiêu
- Tạo form với các input types
- HTML5 validation không cần JS
- Accessibility cho forms
- Best practices form design

---

## 📝 Form cơ bản — Anatomy

```html
<form action="/api/register" method="POST" id="registerForm">
    
    <!-- Text input với label (accessibility!) -->
    <label for="fullname">Họ và tên:</label>
    <input type="text" id="fullname" name="fullname" 
           required minlength="2" maxlength="50"
           placeholder="Nguyễn Văn Minh">
    
    <!-- Email — tự validate format -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" 
           required placeholder="minh@email.com">
    
    <!-- Password — ẩn ký tự -->
    <label for="password">Mật khẩu:</label>
    <input type="password" id="password" name="password"
           required minlength="8"
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
           title="Ít nhất 8 ký tự, gồm chữ hoa, thường, và số">
    
    <!-- Phone -->
    <label for="phone">Số điện thoại:</label>
    <input type="tel" id="phone" name="phone"
           pattern="[0-9]{10}" placeholder="0901234567">
    
    <!-- Select -->
    <label for="city">Thành phố:</label>
    <select id="city" name="city" required>
        <option value="">-- Chọn thành phố --</option>
        <option value="hanoi">Hà Nội</option>
        <option value="hcm">TP. Hồ Chí Minh</option>
        <option value="danang">Đà Nẵng</option>
    </select>
    
    <!-- Textarea -->
    <label for="address">Địa chỉ:</label>
    <textarea id="address" name="address" rows="3"
              placeholder="Số nhà, đường, phường/xã..."></textarea>
    
    <!-- Checkbox -->
    <label>
        <input type="checkbox" name="agree" required>
        Tôi đồng ý với <a href="terms.html">điều khoản</a>
    </label>
    
    <!-- Submit -->
    <button type="submit">Đăng ký</button>
</form>
```

---

## 🎯 Các Input Types HTML5

| Type | Giao diện | Validation |
|---|---|---|
| `text` | Ô nhập text | minlength, maxlength, pattern |
| `email` | + validate email format | Tự kiểm tra @ |
| `password` | Ẩn ký tự | minlength, pattern |
| `number` | + nút tăng/giảm | min, max, step |
| `tel` | Bàn phím số (mobile) | pattern |
| `date` | Date picker | min, max |
| `color` | Color picker | - |
| `range` | Slider | min, max, step |
| `file` | Upload file | accept, multiple |
| `url` | Validate URL | Tự kiểm tra http:// |
| `search` | Ô tìm kiếm + nút X | - |

### HTML5 Validation Attributes:

```html
required              <!-- Bắt buộc nhập -->
minlength="8"         <!-- Tối thiểu 8 ký tự -->
maxlength="50"        <!-- Tối đa 50 ký tự -->
min="0" max="100"     <!-- Giá trị số min/max -->
pattern="[A-Za-z]+"   <!-- Regex pattern -->
placeholder="Gợi ý"   <!-- Text gợi ý (mờ) -->
autofocus              <!-- Tự focus khi load trang -->
disabled               <!-- Không cho nhập -->
readonly               <!-- Chỉ đọc -->
```

> 💡 **HTML5 validation = Miễn phí!** Browser tự hiện thông báo lỗi. Không cần viết JS cho validation cơ bản.

---

## ♿ Accessibility — Form cho mọi người

```html
<!-- ✅ LUÔN dùng <label> với for= -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- ✅ Fieldset + Legend cho nhóm liên quan -->
<fieldset>
    <legend>Thông tin giao hàng</legend>
    <label for="addr">Địa chỉ:</label>
    <input type="text" id="addr" name="addr">
</fieldset>

<!-- ✅ aria-label cho button icon -->
<button type="submit" aria-label="Gửi đơn hàng">
    🛒 Đặt hàng
</button>
```

> **Anh Hùng:** *"Form không có `<label>` = người dùng screen reader không biết ô nhập gì. Accessibility không phải 'nice to have' — nhiều công ty bắt buộc. Apple, Google đều kiểm tra."*

---

## ➡️ Chương tiếp theo...

*Minh hoàn thành form đăng ký. Submit → data gửi lên server. Nhưng trang web vẫn xấu — text thẳng hàng, không layout, không color.*

*"HTML xong. Giờ đến CSS — biến trang trắng thành sản phẩm đẹp!"*

**Tuần 2:** CSS Core — Từ Introduction đến Box Model, Selectors, và Positioning.
