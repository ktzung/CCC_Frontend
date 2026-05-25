# 📋 PHIẾU BÀI TẬP 02
# **HTML5 FORMS & MEDIA — Biểu mẫu, Validation & Đa phương tiện**

> **Tài liệu tham chiếu:** `tuan_1_html5/06_graphics_multimedia.md` + `07_forms_interactive.md`
>
> ⏱️ **Thời gian:** 120 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — Input Types

Liệt kê **10 input types** khác nhau trong HTML5, cho mỗi type:
- Giao diện hiển thị (mô tả bằng lời)
- Validation tự động (nếu có)
- Use case cụ thể trong trang E-Commerce

Format trả lời:
```
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. type="..." → ...
```

### Câu A2 (5đ) — Validation Attributes

Đọc chương 07. Không chạy code, hãy **dự đoán** điều gì xảy ra khi user bấm Submit cho mỗi trường hợp sau. Giải thích TẠI SAO.

```html
<!-- Trường hợp 1 -->
<input type="text" required value="">   <!-- User để trống -->

<!-- Trường hợp 2 -->
<input type="email" value="abc">        <!-- User gõ "abc" -->

<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->

<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->

<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->
```

**Sau khi trả lời**, tạo file `validation_test.html`, đặt 5 trường hợp trên vào 1 form, bấm Submit và **chụp screenshot** kết quả validation thực tế. So sánh với dự đoán.

### Câu A3 (5đ) — Accessibility

Đọc phần Accessibility trong chương 07. Giải thích:

1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?

### Câu A4 (5đ) — Media

1. Giải thích thuộc tính `loading="lazy"` trên thẻ `<img>`. Nó cải thiện gì? Khi nào KHÔNG nên dùng?
2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`? Liệt kê ít nhất 3 format video web phổ biến.
3. Thuộc tính `alt` trên `<img>` dùng để làm gì? Viết `alt` tốt cho 3 trường hợp:
   - Ảnh sản phẩm iPhone 16
   - Ảnh trang trí (decorative)
   - Ảnh biểu đồ doanh thu Q1/2026

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`

```html
<!-- Cách 1 -->
<img src="product.jpg" alt="iPhone">

<!-- Cách 2 -->
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```

Khi nào dùng Cách 1, khi nào dùng Cách 2? Cho 2 ví dụ thực tế cho mỗi cách.

---

## PHẦN B — THỰC HÀNH CODE (55 điểm)

### Bài B1 (20đ) — Form Đăng ký Tài khoản

Tạo file `register.html` — Form đăng ký tài khoản E-Commerce. 

**Yêu cầu kỹ thuật:**

- [ ] Form có `action="#"` và `method="POST"`
- [ ] **Fieldset 1:** "Thông tin cá nhân"
  - Họ tên: `type="text"`, `required`, `minlength="2"`, `maxlength="50"`
  - Email: `type="email"`, `required`
  - Số điện thoại: `type="tel"`, `pattern` kiểm tra 10 chữ số
  - Ngày sinh: `type="date"`, `max` = ngày hiện tại (không cho chọn tương lai)
- [ ] **Fieldset 2:** "Tài khoản"
  - Username: `type="text"`, `pattern` chỉ cho phép chữ cái, số, underscore (3-20 ký tự)
  - Password: `type="password"`, `minlength="8"`, `pattern` yêu cầu ít nhất 1 chữ hoa + 1 số
  - Xác nhận password: (cùng rules — giải thích trong `answers.md` tại sao HTML không thể validate confirm password)
- [ ] **Fieldset 3:** "Thông tin giao hàng"  
  - Thành phố: `<select>` với ít nhất 5 tỉnh/thành
  - Quận/Huyện: `<select>` (có thể để tĩnh)
  - Địa chỉ chi tiết: `<textarea>`, `rows="3"`
  - Giới tính: `<input type="radio">` (Nam/Nữ/Khác)
- [ ] Checkbox đồng ý điều khoản, `required`
- [ ] Nút Submit kiểu `<button type="submit">`
- [ ] Nút Reset kiểu `<button type="reset">`
- [ ] **MỌI input đều có `<label>` với `for` attribute**
- [ ] **MỌI input đều có `placeholder`**

**Chấm điểm:**
- 6đ: Đầy đủ 3 fieldsets + legend
- 6đ: Validation attributes đúng (pattern, required, min/max)
- 4đ: Label accessibility (for + id match)
- 4đ: Đa dạng input types (ít nhất 7 types khác nhau)

### Bài B2 (15đ) — Trang Multimedia

Tạo file `media.html` — Trang giới thiệu sản phẩm có multimedia:

**Yêu cầu:**
- [ ] Ít nhất 3 ảnh sản phẩm dùng `<figure>` + `<figcaption>`, có `loading="lazy"`, `alt` mô tả đúng
- [ ] 1 video nhúng YouTube (dùng `<iframe>`)
- [ ] 1 thẻ `<video>` với `controls`, `poster`, ít nhất 2 `<source>` (mp4 + webm)
- [ ] 1 thẻ `<audio>` (ví dụ: nhạc nền giới thiệu)
- [ ] Ảnh responsive: `max-width: 100%; height: auto;` (inline style tạm)
- [ ] SVG: Nhúng ít nhất 1 SVG inline (có thể vẽ logo đơn giản hình tròn/vuông)

### Bài B3 (20đ) — Form Đặt hàng hoàn chỉnh

Tạo file `checkout.html` — Form đặt hàng với validation phức tạp:

**Yêu cầu:**

- [ ] **Phần 1: Giỏ hàng** (dùng `<table>`)
  - Bảng: STT | Sản phẩm | Đơn giá | Số lượng | Thành tiền
  - Ít nhất 3 sản phẩm
  - Dòng Tổng cộng dùng `<tfoot>` với `colspan`
  
- [ ] **Phần 2: Form thanh toán**
  - Phương thức thanh toán: Radio buttons (COD / Chuyển khoản / Ví điện tử)
  - Mã giảm giá: `type="text"`, `pattern` chỉ chấp nhận format "SALE" + 4 chữ số (VD: SALE2026)
  - Ghi chú: `<textarea>` (optional)
  
- [ ] **Phần 3: Thông tin giao hàng** (dùng lại ý tưởng từ B1)
  - Ngày giao hàng mong muốn: `type="date"`, `min` = ngày mai
  - Khung giờ: `<select>` (Sáng 8-12h / Chiều 14-18h / Tối 18-21h)
  - Thời gian giao hàng: `type="range"`, `min="1"`, `max="7"`, `step="1"` (số ngày)
  
- [ ] Submit button với `aria-label="Xác nhận đặt hàng"`

**Nâng cao (bonus 5đ):**
- [ ] Dùng `<datalist>` cho ô tìm kiếm sản phẩm
- [ ] Dùng `<output>` để hiển thị tổng tiền (tĩnh)
- [ ] Dùng `<meter>` hoặc `<progress>` cho điểm tích lũy

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug Form

Form dưới đây có **8 lỗi** về validation, accessibility, và best practices. Tìm và sửa tất cả.

```html
<form>
    Tên: <input type="text">
    
    <input type="email" placeholder="Email của bạn">
    
    <input type="password" placeholder="Mật khẩu">
    <input type="password" placeholder="Nhập lại mật khẩu">
    
    Phone: <input type="text" value="0901234567">
    
    <select>
        <option>Hà Nội</option>
        <option>TP.HCM</option>
    </select>
    
    <label>
        Tôi đồng ý điều khoản
    </label>
    
    <input type="submit" value="Gửi">
</form>
```

Liệt kê lỗi theo format:
```
Lỗi 1: Dòng Y — Input "Tên" không có <label for="...">, vi phạm accessibility
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>
```

### Câu C2 (10đ) — Thiết kế chiến lược Validation

Bạn xây dựng form đăng ký cho ngân hàng số. Yêu cầu:
- CMND/CCCD: đúng 12 chữ số
- Số tài khoản: 10-15 chữ số
- Email: bắt buộc, đúng format
- PIN: đúng 6 chữ số, KHÔNG hiển thị

**Câu hỏi:**
1. Viết `pattern` regex cho CMND/CCCD và Số tài khoản
2. Giải thích: HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
3. Liệt kê 3 loại validation mà HTML5 **KHÔNG THỂ** làm được (phải dùng JavaScript)
4. Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 6-10 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Form đăng ký với HTML5 Validation"

**Yêu cầu:** Quay video tạo form đăng ký từ đầu, vừa code vừa giải thích cách validation hoạt động.

**Code mẫu cần thực hiện trong video:**

```html
<form action="#" method="POST">
    <fieldset>
        <legend>Thông tin tài khoản</legend>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required 
               placeholder="you@email.com">
        
        <label for="pass">Mật khẩu:</label>
        <input type="password" id="pass" name="pass" required
               minlength="8"
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
               title="Ít nhất 8 ký tự, gồm chữ hoa, thường và số">
        
        <label for="phone">SĐT:</label>
        <input type="tel" id="phone" name="phone"
               pattern="[0-9]{10}" placeholder="0901234567">
        
        <label for="dob">Ngày sinh:</label>
        <input type="date" id="dob" name="dob" max="2010-01-01">
    </fieldset>
    
    <label>
        <input type="checkbox" name="agree" required>
        Tôi đồng ý điều khoản
    </label>
    
    <button type="submit">Đăng ký</button>
</form>
```

**Trong video, bạn phải giải thích:**

1. 🎤 `<fieldset>` + `<legend>` dùng để làm gì? Tại sao quan trọng cho accessibility?
2. 🎤 `<label for="email">` — tại sao phải có `for`? Demo: click vào label → focus vào input
3. 🎤 `type="email"` tự validate như thế nào? Demo: nhập "abc" rồi submit
4. 🎤 `pattern` regex: giải thích từng phần `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`
5. 🎤 Demo: thử submit với mật khẩu yếu → show thông báo validation
6. 🎤 `required` vs không required — sự khác biệt khi submit

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ code từng dòng, giải thích mỗi attribute
- [ ] Demo validation thất bại ít nhất 3 trường hợp
- [ ] Cuối video: Submit thành công + tổng kết

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] File `validation_test.html` — Câu A2
- [ ] File `register.html` — Bài B1
- [ ] File `media.html` — Bài B2
- [ ] File `checkout.html` — Bài B3
- [ ] Folder `screenshots/` — chụp validation results
- [ ] 🎬 **Video OBS** — `videos/PBT02_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **3 commits**
- [ ] Validate tất cả file qua [validator.w3.org](https://validator.w3.org/)
