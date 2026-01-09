# 🟦 CHƯƠNG 07
# **HTML FORMS & INTERACTIVE ELEMENTS**

Forms (Biểu mẫu) là cách chính để người dùng "nói chuyện" với Website. Từ đăng nhập, tìm kiếm, đến mua hàng, tất cả đều qua Form.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Tạo Form đầy đủ chức năng (`<form>`).
- Sử dụng thành thạo các loại **Input** (Text, Password, Email, Date...).
- Hiểu các **Attributes** quan trọng (name, required, placeholder).
- Tạo Dropdown (`<select>`) và Checkbox/Radio.
- Hiểu cơ chế gửi dữ liệu đi (Button submit).

---

# 1. **DEFINING A SPACE FOR FORMS**

Để bắt đầu, ta cần một "container" để gói các ô nhập liệu lại.

```html
<form action="/submit-login" method="POST">
    <!-- Các ô nhập liệu nằm ở đây -->
</form>
```

- **`action`:** Đường dẫn (URL) nơi dữ liệu sẽ được gửi đến (Server xử lý).
- **`method`:** Cách gửi dữ liệu.
    - **`GET`:** Gửi dữ liệu lên URL (ví dụ tìm kiếm google: `?q=hello`). Dữ liệu bị lộ, phù hợp để lấy thông tin.
    - **`POST`:** Gửi ngầm bên trong (Bảo mật hơn). Dùng cho đăng nhập, đăng ký, gửi bài viết.

---

# 2. **HTML INPUT FIELDS**

Thẻ `<input>` là ngôi sao chính, nó biến hình thành nhiều loại tùy thuộc vào attribute `type`.

## 2.1. Basic Text Inputs
```html
<!-- Nhập tên thường -->
<label>Username:</label>
<input type="text" name="username" placeholder="Nhập tên của bạn">

<!-- Nhập mật khẩu (ẩn ký tự) -->
<label>Password:</label>
<input type="password" name="password">

<!-- Nhập email (tự động kiểm tra @) -->
<label>Email:</label>
<input type="email" name="user_email">
```

> [!IMPORTANT]
> **Attribute `name` là bắt buộc:** Nếu không có `name`, Server sẽ không biết dữ liệu nào là của ô nào khi gửi đi.

## 2.2. Selection (Lựa chọn)

### Radio Button (Chọn 1 trong nhiều - Độc nhất)
Dùng chung `name` để nhóm chúng lại.
```html
<p>Giới tính:</p>
<input type="radio" id="nam" name="gender" value="male" checked>
<label for="nam">Nam</label>

<input type="radio" id="nu" name="gender" value="female">
<label for="nu">Nữ</label>
```

### Checkbox (Chọn nhiều)
```html
<p>Sở thích:</p>
<input type="checkbox" id="game" name="hobby" value="game">
<label for="game">Chơi game</label>

<input type="checkbox" id="music" name="hobby" value="music">
<label for="music">Nghe nhạc</label>
```

### Dropdown List (Danh sách thả xuống)
```html
<label>Thành phố:</label>
<select name="city">
    <option value="hn">Hà Nội</option>
    <option value="hcm">TP. Hồ Chí Minh</option>
    <option value="dn">Đà Nẵng</option>
</select>
```

## 2.3. Buttons (Nút bấm)
```html
<button type="submit">Gửi đi</button>       <!-- Mặc định, gửi form -->
<button type="button">Chỉ là nút bấm</button> <!-- Không làm gì (dùng JS) -->
<button type="reset">Xóa hết nhập lại</button>
```

---

# 3. **SPECIAL TYPES OF INPUT FIELDS (HTML5)**

HTML5 mang đến nhiều loại input thông minh, giúp trải nghiệm trên Mobile cực tốt (ví dụ `type="number"` sẽ hiện bàn phím số).

```html
<!-- Chọn ngày tháng -->
<input type="date" name="birthday">

<!-- Chọn màu -->
<input type="color" name="fav_color">

<!-- Chọn số (có nút tăng giảm) -->
<input type="number" name="age" min="1" max="100">

<!-- Thanh trượt -->
<input type="range" name="volume" min="0" max="100">

<!-- Ô tìm kiếm -->
<input type="search" name="keyword">
```

---

# 4. **ATTRIBUTES QUAN TRỌNG**

- `required`: Bắt buộc nhập, không được để trống.
- `placeholder`: Dòng chữ mờ gợi ý (biến mất khi gõ).
- `readonly`: Chỉ đọc, không sửa được.
- `disabled`: Vô hiệu hóa (xám đi, không click được).
- `value`: Giá trị mặc định.

---

# 5. **SENDING FORM DATA (CƠ CHẾ GỬI)**

Khi người dùng bấm Submit:
1. Trình duyệt thu thập tất cả `value` của các thẻ có `name`.
2. Đóng gói lại (dạng `key=value`).
3. Gửi đến URL trong `action` bằng phương thức `method`.

**Ví dụ:**
Bạn nhập `username` là "admin", `password` là "123".
Nếu dùng `GET`, URL sẽ thành: `login.php?username=admin&password=123` (Lộ hết!).
Nên dùng `POST` cho dữ liệu nhạy cảm.

---

# 6. **BÀI TẬP THỰC HÀNH**

Tạo trang **Đăng ký thành viên** gồm:
1. Họ tên (`text`)
2. Email (`email`)
3. Mật khẩu (`password`)
4. Ngày sinh (`date`)
5. Giới tính (`radio`)
6. Quốc gia (`select`)
7. Điều khoản sử dụng (`checkbox` - "Tôi đồng ý...")
8. Nút Đăng Ký.

---

# 7. **TỔNG KẾT**

- Form là cổng giao tiếp user-server.
- **Input** có rất nhiều loại (`text`, `radio`, `checkbox`, `date`...).
- Luôn nhớ đặt `name` cho input và dùng `label` để tăng Accessibility.
- Dùng `POST` cho dữ liệu quan trọng, `GET` cho tìm kiếm.

---

**Kết thúc phần HTML Cơ Bản!**
Tuần tới chúng ta sẽ sang phần thú vị hơn: **CSS - Làm đẹp cho trang web.**
