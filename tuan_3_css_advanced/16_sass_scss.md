# 🟩 CHƯƠNG 16
# **SASS/SCSS — CSS Với Siêu Năng Lực**

## 🎬 "Đổi Màu Chủ Đạo = Sửa 47 Chỗ" — Ác Mộng CSS Thuần

*Linh yêu cầu đổi màu chủ đạo từ xanh (#3182ce) sang tím (#805ad5). Minh Ctrl+F → 47 kết quả. Phải sửa từng cái một. Bỏ sót 3 chỗ. Trang có chỗ xanh chỗ tím.*

*"Giá mà CSS có BIẾN..." Minh ước.*

> **Anh Hùng:** *"Nó có. Gọi là SCSS — CSS preprocessor. Biến ($primary-color), hàm (@mixin), lồng nhau (nesting). Đổi 1 biến = 47 chỗ đổi theo."*

---

## 🎯 Mục tiêu
- Hiểu SCSS vs CSS
- Variables, Nesting, Mixins, Partials
- Compile SCSS → CSS

---

## 🔄 SCSS là gì?

**SCSS (Sassy CSS)** = CSS + tính năng lập trình. Trình duyệt không đọc SCSS → cần **compile** thành CSS.

```
SCSS (code) → Compiler → CSS (browser đọc)
```

---

## 💎 4 Tính Năng Thay Đổi Cuộc Đời

### 1. Variables — "Sửa 1 chỗ, 47 chỗ tự đổi"

```scss
// Khai báo biến
$primary: #805ad5;
$danger: #e53e3e;
$font-body: 'Inter', sans-serif;
$radius: 8px;

// Sử dụng
.btn-primary {
    background: $primary;
    border-radius: $radius;
    font-family: $font-body;
}

.header {
    background: $primary;       // Đổi $primary = đổi tất cả!
}
```

### 2. Nesting — "CSS theo cấu trúc HTML"

```scss
// SCSS gọn gàng:
.navbar {
    background: #1a202c;
    padding: 16px;
    
    ul {
        list-style: none;
        display: flex;
        
        li {
            margin-right: 24px;
            
            a {
                color: white;
                text-decoration: none;
                
                &:hover {    // & = thẻ cha (a)
                    color: $primary;
                }
            }
        }
    }
}
```

> ⚠️ **Quy tắc:** Không lồng quá **3 cấp**. Sâu hơn = selector quá dài, khó maintain.

### 3. Mixins — "Hàm CSS dùng chung"

```scss
// Định nghĩa mixin
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin responsive($breakpoint) {
    @if $breakpoint == tablet {
        @media (min-width: 768px) { @content; }
    } @else if $breakpoint == desktop {
        @media (min-width: 1024px) { @content; }
    }
}

// Sử dụng
.hero { 
    @include flex-center;
    height: 100vh;
}

.grid {
    grid-template-columns: 1fr;
    
    @include responsive(tablet) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @include responsive(desktop) {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### 4. Partials & Import — "Chia file gọn gàng"

```
styles/
├── _variables.scss     ← Biến (dấu _ = đừng compile riêng)
├── _mixins.scss        ← Hàm dùng chung
├── _base.scss          ← Reset, typography
├── _navbar.scss        ← Component navbar
├── _card.scss          ← Component card
└── main.scss           ← File tổng hợp
```

```scss
// main.scss — Import tất cả
@import 'variables';
@import 'mixins';
@import 'base';
@import 'navbar';
@import 'card';
```
→ Compile ra **1 file** `main.css` duy nhất.

---

## 🔧 Cách chạy SCSS

### VS Code: Cài extension **"Live Sass Compiler"** → Click **"Watch Sass"** → Tự compile!

### Dự án thực tế: Webpack/Vite tự xử lý (React/Vue đã tích hợp sẵn).

---

## ➡️ Hoàn thành CSS Advanced! 🎉

*Minh giờ có: Responsive layout, Gradients, Shadows, Animations, BEM naming, SCSS. Đủ vũ khí cho mọi UI.*

*"Em có thể viết CSS từ đầu cho mọi design. Nhưng tốn thời gian," Minh nói. "Có cách nào NHANH hơn không?"*

*"CSS Frameworks," anh Hùng trả lời. "Bootstrap hoặc TailwindCSS — components có sẵn, chỉ cần lắp ghép."*

**→ [Tuần 4: CSS Frameworks](../tuan_4_css_frameworks/README.md) — Bootstrap 5 hoặc TailwindCSS.**

> [!TIP]
> Chỉ cần học **1 trong 2** framework. Bootstrap = components sẵn. TailwindCSS = utility classes linh hoạt hơn.