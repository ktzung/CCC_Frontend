# 🟩 CHƯƠNG 16
# **THE CSS PREPROCESSOR: SASS & SCSS**

CSS thuần rất tuyệt, nhưng nó thiếu những tính năng của ngôn ngữ lập trình (Biến, Hàm, Vòng lặp). **Sass (Syntactically Awesome Style Sheets)** ra đời để lấp đầy khoảng trống đó.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu Preprocessor là gì.
- Phân biệt Sass vs SCSS.
- Sử dụng các tính năng mạnh mẽ: **Variables, Nesting, Mixins, Partials**.
- Biết cách biên dịch (Compile) SCSS sang CSS.

---

# 1. **SASS LÀ GÌ?**

Sass là một "ngôn ngữ mở rộng" của CSS. Trình duyệt không hiểu Sass, nên ta phải dùng tool để **Dịch (Compile)** file `.scss` thành file `.css` bình thường.

## SCSS vs Sass
- **Sass (Syntax cũ):** Không dùng ngoặc nhọn `{}`, không dấu chấm phẩy `;`. (Viết nhanh nhưng khó đọc).
- **SCSS (Sassy CSS):** Cú pháp giống hệt CSS chuẩn, thêm tính năng mới. **Khuyên dùng SCSS.**

---

# 2. **CÁC TÍNH NĂNG "BÁ ĐẠO"**

## 2.1. Variables (Biến)
Lưu mã màu, font-size vào biến để dùng lại. Sửa 1 chỗ, ăn cả làng.

```scss
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;

body {
  font-family: $font-stack;
  color: $primary-color;
}
```

## 2.2. Nesting (Lồng nhau)
Viết CSS theo cấu trúc HTML. Cực gọn, đỡ phải viết lại selector cha.

**SCSS:**
```scss
.navbar {
  background: black;
  
  ul {
    margin: 0;
    
    li {
      display: inline-block;
      
      a {
        color: white;
        
        &:hover { /* & là đại diện cho thẻ cha (a) */
          color: yellow;
        }
      }
    }
  }
}
```

**CSS sau khi dịch:**
```css
.navbar { background: black; }
.navbar ul { margin: 0; }
.navbar ul li { display: inline-block; }
.navbar ul li a { color: white; }
.navbar ul li a:hover { color: yellow; }
```

## 2.3. Mixins (Hàm dùng chung)
Gói một cục CSS code lại và tái sử dụng.

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 100px;
  height: 100px;
  @include flex-center; /* Gọi mixin */
}
```

## 2.4. Partials & Import
Chia code ra nhiều file nhỏ (`_header.scss`, `_variables.scss` - dấu gạch dưới để báo tool đừng dịch file này riêng lẻ).

**main.scss:**
```scss
@import 'variables';
@import 'header';
@import 'footer';
```
-> Kết quả ra 1 file `main.css` duy nhất.

---

# 3. **CÁCH DÙNG (COMPILING)**

Để chạy được code SCSS, bạn cần một Compiler.

## Cách 1: VS Code Extension (Dễ nhất)
1. Cài Extension **"Live Sass Compiler"**.
2. Bấm nút **"Watch Sass"** dưới thanh status bar.
3. Code file `.scss`, nó tự đẻ ra file `.css` bên cạnh.

## Cách 2: NodeJS / NPM (Chuyên nghiệp)
Dùng trong các dự án React/Vue (Webpack/Vite tự xử lý).

---

# 4. **TỔNG KẾT**

- **SCSS** giúp viết CSS nhanh hơn, gọn hơn và có tổ chức hơn.
- **Nesting** giúp code dễ đọc (nhưng đừng lồng sâu quá 3 cấp).
- **Variables** giúp quản lý Theme (Dark/Light mode) dễ dàng.

---

**Chúc mừng!** Bạn đã hoàn thành phần **Advanced CSS**. Bạn giờ đây đã có đủ vũ khí để "cân" mọi giao diện web.

---

**Chương tiếp theo:** Học CSS Frameworks - Bootstrap 5 hoặc TailwindCSS (Chương 17)

> [!TIP]
> **Lựa chọn Framework:**
> - **Bootstrap 5:** Nếu bạn thích components có sẵn, thiết kế nhanh → [Xem Bootstrap](../tuan_4_css_frameworks/bootstrap/README.md)
> - **TailwindCSS:** Nếu bạn thích utility classes, thiết kế linh hoạt hơn → [Xem TailwindCSS](../tuan_4_css_frameworks/tailwindcss/README.md)
> 
> Bạn chỉ cần học **1 trong 2**, không cần học cả hai. Sau đó chuyển sang JavaScript Fundamentals.