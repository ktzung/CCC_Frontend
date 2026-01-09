# 🟦 CHƯƠNG 04
# **THE VISIBLE PART OF AN HTML DOCUMENT**

Chúng ta đã có khung xương (`<html>`, `<body>`) và bộ não (`<head>`). Bây giờ là lúc đắp thịt da cho trang web. Chương này sẽ hướng dẫn cách tổ chức nội dung hiển thị sao cho vừa đẹp mắt với người dùng, vừa "dễ hiểu" với Google.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Phân biệt **Block** và **Inline** elements.
- Sử dụng các thẻ cấu trúc chung: `<div>`, `<span>`.
- Hiểu và áp dụng **Semantic HTML** (`header`, `nav`, `main`, `section`...).
- Định dạng văn bản chuyên sâu (`blockquote`, `pre`, `code`...).
- Sử dụng các ký tự đặc biệt (Character Entities).

---

# 1. **STRUCTURING PAGES (CẤU TRÚC TRANG)**

Để xây dựng bố cục, ta cần các "chiếc hộp" để chứa nội dung.

## 1.1. Block vs. Inline Elements
Trước hết, bạn cần hiểu 2 loại hành vi hiển thị cơ bản:

- **Block Elements (Khối):**
    - Luôn bắt đầu dòng mới.
    - Chiếm **toàn bộ chiều rộng** có thể.
    - Ví dụ: `<div>`, `<p>`, `<h1>`, `<ul>`.

- **Inline Elements (Dòng):**
    - Không xuống dòng.
    - Chỉ chiếm chiều rộng **vừa đủ** nội dung của nó.
    - Ví dụ: `<span>`, `<a>`, `<img>`, `<strong>`.

## 1.2. Thẻ chứa chung (Generic Containers)
Khi chưa có HTML5, chúng ta dùng `<div>` và `<span>` cho mọi thứ.

- **`<div>` (Division):** Thẻ block vô nghĩa, dùng để nhóm các phần tử lớn.
  ```html
  <div class="user-profile">
      <img src="avatar.jpg">
      <h3>User Name</h3>
  </div>
  ```
- **`<span>`:** Thẻ inline vô nghĩa, dùng để bôi màu hoặc xử lý một mẩu text nhỏ.
  ```html
  <p>Giá tiền: <span class="price-red">500.000đ</span></p>
  ```

---

# 2. **USING SEMANTIC HTML (HTML CÓ Ý NGHĨA)**

Thay vì dùng `<div>` khắp nơi ("đóng hàng vào thùng giống hệt nhau"), HTML5 cung cấp các thẻ có tên gọi rõ ràng ("thùng có dán nhãn"). Điều này cực tốt cho SEO và Accessibility.

## Các thẻ Semantic phổ biến:

1.  **`<header>`:** Đầu trang hoặc đầu một bài viết. Thường chứa Logo, Menu.
2.  **`<nav>`:** Chứa các link điều hướng chính.
3.  **`<main>`:** Nội dung chính của trang (chỉ có 1 thẻ main mỗi trang).
4.  **`<section>`:** Các phần nội dung liên quan (Giới thiệu, Liên hệ, Tin tức).
5.  **`<article>`:** Nội dung độc lập (Bài báo, Sản quy cách phẩm, Comment).
6.  **`<aside>`:** Nội dung phụ bên lề (Quảng cáo, Bài viết liên quan).
7.  **`<footer>`:** Chân trang (Bản quyền, thông tin liên hệ).

### Ví dụ cấu trúc chuẩn:
```html
<body>
    <header>
        <h1>My Website</h1>
        <nav>...</nav>
    </header>

    <main>
        <article>
            <h2>Bài viết hay nhất</h2>
            <p>Nội dung...</p>
        </article>

        <aside>
            <h3>Quảng cáo</h3>
        </aside>
    </main>

    <footer>
        <p>&copy; 2025 Bản quyền thuộc về tôi.</p>
    </footer>
</body>
```

---

# 3. **TEXT MARKUPS (ĐỊNH DẠNG VĂN BẢN)**

Ngoài `<b>`, `<i>`, chúng ta có nhiều thẻ định dạng văn bản mạnh mẽ hơn.

## 3.1. Nhấn mạnh (Emphasis)
- `<strong>`: In đậm, mang ý nghĩa **quan trọng**.
- `<em>` (Emphasis): In nghiêng, mang ý nghĩa *nhấn giọng*.

## 3.2. Trích dẫn (Quotations)
- `<blockquote>`: Trích dẫn dài (Block), thường tựt thụt lề.
- `<q>` (Quote): Trích dẫn ngắn (Inline), tự động thêm dấu ngoặc kép.
- `<cite>`: Tên tác phẩm hoặc tác giả được trích dẫn.

```html
<p>Bác Hồ từng nói:</p>
<blockquote>
  Không có gì quý hơn độc lập tài do.
</blockquote>
```

## 3.3. Code và Preformatted Text
- `<code>`: Dùng để hiển thị đoạn mã lập trình (font monospace).
- `<pre>`: Giữ nguyên định dạng khoảng trắng và xuống dòng.

```html
<pre>
  Line 1
      Line 2
</pre>
```

## 3.4. Các thẻ khác
- `<mark>`: Highlight (như bút dạ quang).
- `<del>`: Gạch ngang (đã xóa/hết hàng).
- `<ins>`: Gạch chân (mới thêm vào).
- `<sub>` / `<sup>`: Chỉ số dưới / trên (H<sub>2</sub>O, E=mc<sup>2</sup>).
- `<abbr>`: Viết tắt (hiển thị chú thích khi hover).
  ```html
  <abbr title="HyperText Markup Language">HTML</abbr>
  ```

---

# 4. **CHARACTER ENTITIES (KÝ TỰ ĐẶC BIỆT)**

Trong HTML, một số ký tự bị "cấm" dùng trực tiếp vì trùng với cú pháp code (ví dụ dấu `<` và `>`). Để hiển thị chúng, ta dùng **Entities**.

| Ký tự | Entity Name | Mô tả |
| :--- | :--- | :--- |
| `<` | `&lt;` | Less than (Dấu nhỏ hơn) |
| `>` | `&gt;` | Greater than (Dấu lớn hơn) |
| `&` | `&amp;` | Ampersand (Dấu và) |
| `"` | `&quot;` | Double quote (Ngoặc kép) |
| `'` | `&apos;` | Single quote (Ngoặc đơn) |
| ` ` | `&nbsp;` | Non-breaking Space (Khoảng trắng không xuống dòng) |
| `©` | `&copy;` | Copyright |

**Ví dụ:**
Để viết: `<h1> là thẻ tiêu đề`, ta code:
```html
<p>&lt;h1&gt; là thẻ tiêu đề</p>
```

---

# 5. **TỔNG KẾT**

- Dùng `<div>` cho bố cục chung, `<span>` cho text nhỏ.
- Ưu tiên dùng **Semantic Tags** (`header`, `main`...) bất cứ khi nào có thể.
- Sử dụng đúng thẻ ngữ nghĩa cho văn bản (`<strong>`, `<blockquote>`, `<code>`).
- Nhớ dùng **Entities** cho các ký tự đặc biệt.

---

**Chương tiếp theo:** Hiển thị dữ liệu dạng bảng và tạo liên kết giữa các trang web.
