# 🟦 TUẦN 1 - BÀI 07
# **FORMS & INTERACTIVE ELEMENTS**

---

## 0. 🎬 Opening Hook

*Thầy giao BTL: "Tạo trang e-commerce có form đăng ký, đăng nhập, và đặt hàng."*

*Minh: "Form phải validate email, password mạnh, số điện thoại... Mình phải viết JavaScript hết à?"*

*Anh Hùng: "HTML5 xử lý được 80% validation mà không cần JS. `type="email"` tự kiểm tra format. `required` tự báo lỗi. `pattern` dùng regex. JS chỉ cần cho 20% còn lại — những case phức tạp hơn."*

*Người viết form đúng cách tiết kiệm được hàng trăm dòng JavaScript.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Form là **điểm tiếp xúc quan trọng nhất** giữa user và ứng dụng:
- Đăng ký, đăng nhập → phần lớn web app đều có
- Form đặt hàng → mọi e-commerce đều cần
- Tìm kiếm, lọc → gần như mọi web app

Form kém → user không điền được → **bounce rate cao → doanh thu giảm**. Shopee đo được: cải thiện form checkout giảm 15% cart abandonment.

---

## 2. 🌐 Big Picture — Anatomy của một Form

```
<form action="/api/register" method="POST">
│
├── Nhóm thông tin cá nhân
│   ├── <label> + <input type="text">    ← Họ tên
│   ├── <label> + <input type="email">   ← Email
│   └── <label> + <input type="password">← Mật khẩu
│
├── Nhóm địa chỉ
│   ├── <label> + <select>              ← Tỉnh/Thành phố
│   └── <label> + <textarea>            ← Địa chỉ chi tiết
│
├── Tùy chọn
│   ├── <input type="checkbox">         ← Đồng ý điều khoản
│   └── <input type="radio">            ← Chọn phương thức thanh toán
│
└── Actions
    ├── <button type="submit">          ← Gửi form
    └── <button type="reset">           ← Xóa tất cả
```

**Hai attribute quan trọng nhất của `<form>`:**
- `action` = URL nhận data (API endpoint hoặc server)
- `method` = `GET` (data trong URL) hoặc `POST` (data trong body — dùng cho password, data nhạy cảm)

---

## 3. ⚙️ Core Technical Truth

### Form hoàn chỉnh — có validation, accessibility, best practices

```html
<form action="/api/register" method="POST" id="registerForm" novalidate>

    <!-- Họ và tên -->
    <label for="fullname">Họ và tên: <span aria-hidden="true">*</span></label>
    <input type="text"
           id="fullname"
           name="fullname"
           required
           minlength="2"
           maxlength="50"
           placeholder="Nguyễn Văn Minh"
           autocomplete="name">

    <!-- Email -->
    <label for="email">Email: <span aria-hidden="true">*</span></label>
    <input type="email"
           id="email"
           name="email"
           required
           placeholder="minh@email.com"
           autocomplete="email">

    <!-- Mật khẩu -->
    <label for="password">Mật khẩu: <span aria-hidden="true">*</span></label>
    <input type="password"
           id="password"
           name="password"
           required
           minlength="8"
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
           title="Tối thiểu 8 ký tự, gồm chữ hoa, thường và số"
           autocomplete="new-password">

    <!-- Số điện thoại -->
    <label for="phone">Số điện thoại:</label>
    <input type="tel"
           id="phone"
           name="phone"
           pattern="(0[3|5|7|8|9])+([0-9]{8})\b"
           placeholder="0912345678">

    <!-- Chọn thành phố -->
    <label for="city">Thành phố: <span aria-hidden="true">*</span></label>
    <select id="city" name="city" required>
        <option value="">-- Chọn thành phố --</option>
        <option value="hanoi">Hà Nội</option>
        <option value="hcm">TP. Hồ Chí Minh</option>
        <option value="danang">Đà Nẵng</option>
    </select>

    <!-- Địa chỉ -->
    <label for="address">Địa chỉ:</label>
    <textarea id="address"
              name="address"
              rows="3"
              placeholder="Số nhà, đường, phường/xã, quận/huyện...">
    </textarea>

    <!-- Nhóm checkbox với fieldset -->
    <fieldset>
        <legend>Phương thức nhận thông báo</legend>
        <label>
            <input type="checkbox" name="notify" value="email" checked>
            Qua Email
        </label>
        <label>
            <input type="checkbox" name="notify" value="sms">
            Qua SMS
        </label>
    </fieldset>

    <!-- Đồng ý điều khoản -->
    <label>
        <input type="checkbox" name="agree" required>
        Tôi đồng ý với <a href="terms.html" target="_blank" rel="noopener">Điều khoản sử dụng</a>
    </label>

    <!-- Buttons -->
    <button type="submit" id="submitBtn">Đăng ký</button>
    <button type="reset">Xóa</button>

</form>
```

---

### Tất cả Input Types HTML5

| Type | Giao diện đặc biệt | Tự validate |
|---|---|---|
| `text` | Ô nhập thông thường | minlength, maxlength, pattern |
| `email` | — | Kiểm tra định dạng `@` |
| `password` | Ẩn ký tự | minlength, pattern |
| `number` | Nút tăng/giảm ± | min, max, step |
| `tel` | Bàn phím số trên mobile | pattern (manual) |
| `date` | Date picker | min, max |
| `time` | Time picker | min, max |
| `datetime-local` | Date + Time picker | min, max |
| `color` | Color picker | — |
| `range` | Slider | min, max, step |
| `file` | Chọn file | accept, multiple |
| `url` | — | Kiểm tra định dạng `http://` |
| `search` | Ô tìm kiếm + nút ✕ | — |
| `checkbox` | Ô chọn có/không | required |
| `radio` | Chọn một trong nhiều | required |
| `hidden` | Không hiển thị | — |

---

### Validation Attributes

```html
required              <!-- Bắt buộc nhập — form không submit nếu trống -->
minlength="8"         <!-- Tối thiểu 8 ký tự -->
maxlength="50"        <!-- Tối đa 50 ký tự -->
min="0" max="100"     <!-- Giá trị số hoặc ngày min/max -->
step="0.5"            <!-- Tăng/giảm theo bước (cho number, range) -->
pattern="[A-Za-z]+"   <!-- Regex pattern — phải khớp hoàn toàn -->
title="Hướng dẫn"     <!-- Hiện khi validation fail — giải thích pattern -->
placeholder="Gợi ý"   <!-- Text mờ trong ô trống (không phải label!) -->
autofocus             <!-- Tự focus ô này khi trang load -->
disabled              <!-- Vô hiệu hóa hoàn toàn — không gửi data -->
readonly              <!-- Chỉ đọc — vẫn gửi data -->
autocomplete="email"  <!-- Gợi ý từ password manager / browser history -->
```

---

### Accessibility — Form cho mọi người

```html
<!-- ✅ LUÔN kết nối label với input bằng for + id -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- ✅ Dùng fieldset + legend để nhóm related inputs -->
<fieldset>
    <legend>Thông tin giao hàng</legend>
    <label for="street">Đường:</label>
    <input type="text" id="street" name="street">
</fieldset>

<!-- ✅ Mô tả thêm cho screen reader nếu cần -->
<input type="password" id="pwd" 
       aria-describedby="pwd-hint">
<p id="pwd-hint">Tối thiểu 8 ký tự, gồm chữ hoa, thường và số</p>

<!-- ✅ Button icon cần aria-label -->
<button type="submit" aria-label="Gửi đơn hàng">
    🛒
</button>
```

---

## 4. 🟢 Simplified Layer — Ba câu nhớ mãi

> 1. **`<label for="id">` + `<input id="id">`** — luôn phải pair với nhau.
> 2. **HTML5 validation miễn phí** — dùng `required`, `type`, `pattern` trước khi nghĩ đến JS.
> 3. **`POST` cho dữ liệu nhạy cảm** — không bao giờ dùng `GET` cho form login/password.

---

## 5. 🏭 Real-world Layer

### Form Checkout của E-commerce — Pattern thực tế

```html
<!-- Multi-step form: Progress indicator -->
<ol class="checkout-steps">
    <li>Giỏ hàng</li>
    <li class="active">Thông tin giao hàng</li>
    <li>Thanh toán</li>
    <li>Xác nhận</li>
</ol>

<form action="/api/checkout" method="POST">
    <!-- Step 2: Shipping info -->
    <fieldset>
        <legend>Địa chỉ giao hàng</legend>
        <!-- ... inputs ... -->
    </fieldset>

    <!-- Lưu địa chỉ cho lần sau -->
    <label>
        <input type="checkbox" name="save_address" value="1">
        Lưu địa chỉ này cho lần mua tiếp theo
    </label>

    <button type="submit">Tiếp tục thanh toán →</button>
</form>
```

**Tại sao `novalidate` attribute trên `<form>`:**
- Khi bạn muốn tự handle validation bằng JS (UX tốt hơn, custom error messages)
- `novalidate` tắt browser native validation nhưng giữ attribute để JS đọc

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Form đăng ký hoàn chỉnh cho BTL (25 phút)

Tạo file `register.html` với form đăng ký tài khoản:

**Yêu cầu bắt buộc:**
1. Họ tên: `required`, `minlength="2"`
2. Email: `type="email"`, `required`
3. Mật khẩu: `type="password"`, `minlength="8"`, có hint text bên dưới
4. Xác nhận mật khẩu: `type="password"` — (Note: match password chỉ làm được bằng JS)
5. Ngày sinh: `type="date"`, `max="2006-01-01"` (phải đủ 18 tuổi)
6. Giới tính: `type="radio"` (Nam / Nữ / Khác) trong `<fieldset>`
7. Tỉnh/Thành: `<select>` với ít nhất 5 tỉnh
8. Đồng ý điều khoản: `type="checkbox"`, `required`
9. Nút Submit + Reset

**Checklist Accessibility:**
- [ ] Mỗi input có `<label>` kết nối đúng `for` + `id`
- [ ] Nhóm radio trong `<fieldset>` + `<legend>`
- [ ] Có `title` hoặc `aria-describedby` giải thích `pattern`

**Test:** Thử submit form khi để trống — browser có tự hiện thông báo lỗi không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"`placeholder` thay thế được `<label>`"** | **Không** — placeholder biến mất khi gõ, screen reader không đọc placeholder làm label, accessibility fail |
| **"HTML5 validation là đủ — không cần server-side validation"** | HTML5 validation chỉ là **UX convenience** — dễ dàng bypass bằng browser DevTools. **Luôn phải validate ở server** |
| **"Form luôn dùng `method='GET'`"** | `GET` đặt data trong URL — password sẽ hiện trong URL bar, history, server log. Dùng `POST` cho bất kỳ dữ liệu nhạy cảm nào |
| **"`type='button'` và `type='submit'` giống nhau"** | `type="submit"` tự submit form khi click. `type="button"` không làm gì — cần JS handler |
| **"Thiếu `<label>` cũng được, user vẫn thấy `placeholder`"** | Người dùng screen reader nghe: "edit text" — không biết nhập gì. WCAG yêu cầu tất cả form control phải có accessible label |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao `<label for="id">` phải match với `<input id="id">`? Điều gì xảy ra nếu không match?
2. `method="GET"` vs `method="POST"` — khi nào dùng cái nào?
3. `disabled` vs `readonly` trên `<input>` — hai cái khác nhau thế nào? (Gợi ý: nghĩ về form submission)

### Câu hỏi áp dụng:

4. Form đăng nhập có email và password. Bạn submit nhưng không có `method="POST"`. Điều tệ nhất có thể xảy ra là gì?
5. User điền form trên mobile — input nào nên là `type="tel"` thay vì `type="text"`, và lợi ích là gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. Nếu `for` và `id` không match: click vào label không focus vào input (UX xấu), và screen reader không biết label thuộc về input nào. Kết quả: người khiếm thị không dùng được form.
2. **`GET`**: data trong URL → bookmark được, history, share. Dùng cho search form (VD: `?q=iphone`). **`POST`**: data trong request body → không trong URL. Dùng cho **login, đăng ký, đặt hàng** — bất cứ thứ gì nhạy cảm.
3. **`disabled`**: input bị vô hiệu, user không tương tác được, **KHÔNG gửi trong form submission**. **`readonly`**: user không sửa được nhưng **VẪN gửi trong form submission** (dùng cho trường cần hiện nhưng không sửa, như order ID).
4. Email + password xuất hiện trong URL: `?email=minh@gmail.com&password=abc123`. URL được lưu trong browser history, server access log, có thể bị người bên cạnh thấy. Đây là lỗ hổng bảo mật nghiêm trọng.
5. **`type="tel"`**: khi user chạm vào input trên mobile, keyboard hiện **bàn phím số** thay vì bàn phím QWERTY đầy đủ → nhập nhanh hơn, ít lỗi hơn.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<label for>` + `<input id>`** — luôn phải pair, không có ngoại lệ
2. **HTML5 validation (required, type, pattern)** = free UX, nhưng **không thay thế server-side validation**
3. **`POST` cho dữ liệu nhạy cảm** — email, password, payment info tuyệt đối không dùng `GET`
4. **`fieldset` + `legend`** = cách đúng để nhóm radio buttons và checkboxes liên quan
5. **`placeholder` ≠ label** — không bao giờ dùng placeholder thay thế label

---

## 10. ➡️ Next Lesson Bridge — Hoàn thành Tuần 1! 🎉

*Minh nhìn lại những gì anh đã xây trong Tuần 1:*
- ✅ Hiểu HTML là markup language, browser parsing pipeline, HTTP
- ✅ Phân tích bố cục → Box Thinking → Figma to HTML
- ✅ Cấu trúc cơ bản: `<!DOCTYPE>`, `<head>`, `<body>`, boilerplate
- ✅ Head metadata: SEO, Open Graph, charset, viewport
- ✅ Semantic elements: header, nav, main, article, section, aside, footer
- ✅ Media: ảnh responsive, WebP, SVG, video, audio
- ✅ Tables: tabular data, colspan, rowspan
- ✅ Forms: validation, accessibility, input types

*"HTML của mình là bộ xương rồi," Minh nghĩ. "Giờ cần da thịt — màu sắc, font, layout..."*

**→ [TUẦN 2: CSS Core](../tuan_2_css_core/) — Từ trang trắng thành giao diện đẹp: Selectors, Box Model, Flexbox.**
