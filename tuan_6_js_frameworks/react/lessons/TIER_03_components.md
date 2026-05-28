# Tier 3 — Components (Khối LEGO xây dựng UI)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Hiểu component là gì, viết function component, export/import  
> **📋 Cần biết:** Tier 2 (JSX), JavaScript functions  
> **🚫 Không cần biết:** Props, useState, Events

---

## 🎬 Opening Hook

*Minh đang xây trang web bán hàng. Có 50 sản phẩm. Mỗi sản phẩm cần: hình ảnh, tên, giá, nút "Thêm vào giỏ".*

```html
<!-- Viết 50 lần? -->
<div class="product-card">
    <img src="iphone.jpg" alt="iPhone">
    <h3>iPhone 15</h3>
    <p>25.990.000đ</p>
    <button>Thêm vào giỏ</button>
</div>
<div class="product-card">
    <img src="macbook.jpg" alt="MacBook">
    <h3>MacBook Air</h3>
    <p>32.990.000đ</p>
    <button>Thêm vào giỏ</button>
</div>
<!-- ... 48 lần nữa ... -->
```

*"Viết 50 lần? Nếu đổi giá thì sửa 50 chỗ?" Minh hoảng.*

*"Không — viết MỘT component, dùng 50 lần." Anh Hùng nói.*

---

## 🎯 Hôm nay bạn sẽ học

```
Component = Function trả về JSX
          = Khối LEGO có thể dùng lại nhiều lần
          = Viết 1 lần, dùng N lần
```

**Chỉ MỘT khái niệm:** Function component — cách viết UI có thể tái sử dụng.

---

## 📝 Bài 3.1 — Component là gì? (10 phút)

### Định nghĩa

```
Component = JavaScript function
           mà trả về JSX (UI)
           có thể dùng lại nhiều lần
```

### Component đầu tiên

```jsx
// File: src/Greeting.jsx

function Greeting() {
    return (
        <div>
            <h1>👋 Xin chào!</h1>
            <p>Chào mừng đến với React</p>
        </div>
    );
}

export default Greeting;
```

### Dùng component

```jsx
// File: src/App.jsx
import Greeting from "./Greeting";

function App() {
    return (
        <div>
            <Greeting />   {/* Dùng component như thẻ HTML */}
            <Greeting />   {/* Dùng lại lần 2 */}
            <Greeting />   {/* Dùng lại lần 3 */}
        </div>
    );
}

export default App;
```

### Kết quả

```html
<!-- Browser hiển thị: -->
<div>
    <div>
        <h1>👋 Xin chào!</h1>
        <p>Chào mừng đến với React</p>
    </div>
    <div>
        <h1>👋 Xin chào!</h1>
        <p>Chào mừng đến với React</p>
    </div>
    <div>
        <h1>👋 Xin chào!</h1>
        <p>Chào mừng đến với React</p>
    </div>
</div>
```

---

## 📝 Bài 3.2 — Quy tắc đặt tên Component (5 phút)

### Bắt đầu bằng chữ HOA

```jsx
// ✅ ĐÚNG — Chữ hoa đầu tiên
function UserCard() { ... }
function ProductList() { ... }
function NavBar() { ... }

// ❌ SAI — Chữ thường
function userCard() { ... }   // React không nhận ra đây là component
function productList() { ... }
```

### Tại sao phải chữ hoa?

```jsx
// React phân biệt:
<div />        → Tạo thẻ HTML <div>
<UserCard />   → Gọi function UserCard()

// Nếu viết thường:
<userCard />   → React nghĩ đây là thẻ HTML <usercard> → LỖI!
```

### PascalCase convention

```jsx
// Tên component = PascalCase (chữ hoa đầu mỗi từ)
function ShoppingCart() { ... }    // ✅
function NavBar() { ... }          // ✅
function UserProfileCard() { ... } // ✅

function shoppingCart() { ... }    // ❌
function nav_bar() { ... }         // ❌
```

---

## 📝 Bài 3.3 — Export và Import (10 phút)

### Tại sao cần export/import?

```
Mỗi file = 1 module riêng biệt
Export = "Xuất" component ra ngoài
Import = "Nhập" component vào file khác

Giống như: Viết công thức ở vở Toán (export)
           Mở vở Toán ra chép (import)
```

### Cách 1: Default Export (phổ biến nhất)

```jsx
// File: src/components/Button.jsx
function Button() {
    return <button>Click me</button>;
}

export default Button;  // ← Export MỘT component chính
```

```jsx
// File: src/App.jsx
import Button from "./components/Button";  // ← Import

function App() {
    return (
        <div>
            <Button />
        </div>
    );
}
```

### Cách 2: Named Export (nhiều component trong 1 file)

```jsx
// File: src/components/Icons.jsx
export function HeartIcon() {
    return <span>❤️</span>;
}

export function StarIcon() {
    return <span>⭐</span>;
}

export function CartIcon() {
    return <span>🛒</span>;
}
```

```jsx
// File: src/App.jsx
import { HeartIcon, StarIcon, CartIcon } from "./components/Icons";

function App() {
    return (
        <div>
            <HeartIcon />
            <StarIcon />
            <CartIcon />
        </div>
    );
}
```

### Bảng so sánh

```
Export type     Cú pháp export              Cú pháp import
───────────     ──────────────              ───────────────
Default         export default X            import X from "..."
Named           export function X()         import { X } from "..."
Named (nhiều)   export { X, Y, Z }         import { X, Y, Z } from "..."
```

---

## 📝 Bài 3.4 — Tổ chức file Components (10 phút)

### Cấu trúc thư mục phổ biến

```
src/
├── components/          ← Thư mục chứa components
│   ├── Header.jsx       ← Component header
│   ├── Footer.jsx       ← Component footer
│   ├── Button.jsx       ← Component nút bấm
│   └── Card.jsx         ← Component card
├── pages/               ← Các trang
│   ├── HomePage.jsx
│   └── AboutPage.jsx
├── App.jsx              ← Component gốc
└── main.jsx             ← Entry point
```

### Component lồng nhau

```jsx
// File: src/components/Header.jsx
function Header() {
    return (
        <header>
            <h1>🛒 My Shop</h1>
            <nav>
                <a href="/">Trang chủ</a>
                <a href="/products">Sản phẩm</a>
            </nav>
        </header>
    );
}

export default Header;
```

```jsx
// File: src/components/Footer.jsx
function Footer() {
    return (
        <footer>
            <p>© 2026 My Shop. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
```

```jsx
// File: src/App.jsx
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div>
            <Header />        {/* Component con */}
            <main>
                <h2>Nội dung trang</h2>
            </main>
            <Footer />        {/* Component con */}
        </div>
    );
}

export default App;
```

### Component tree

```
App
├── Header
│   ├── Logo
│   └── Navigation
├── Main Content
└── Footer
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Component = file HTML | Component = function trả về JSX |
| Phải có 1 component/file | Có thể nhiều component/file (nhưng nên tách) |
| Component phải có state | Component có thể chỉ hiển thị (static) |
| Import phải dùng đúng tên file | Import phải đúng đường dẫn + tên export |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** Component React là gì?
- a) Một file HTML riêng biệt
- b) Một JavaScript function trả về JSX ✅
- c) Một class đặc biệt

**Câu 2:** Tại sao tên component phải viết hoa đầu?
- a) Convention cho đẹp
- b) Để React phân biệt component với HTML tag ✅
- c) Bắt buộc theo JavaScript

**Câu 3:**

```jsx
// File: MyComponent.jsx
function MyComponent() {
    return <p>Hello</p>;
}
export default MyComponent;

// File: App.jsx
// Import nào đúng?
```

- a) `import mycomponent from "./MyComponent"`
- b) `import MyComponent from "./MyComponent"` ✅
- c) `import { MyComponent } from "./MyComponent"`

---

## 📝 Bài tập thực hành

### Bài 1: Tạo component đơn giản
```jsx
// Tạo component ProfileCard hiển thị:
// - Tên: Nguyễn Văn Minh
// - Tuổi: 20
// - Ngành: CNTT

// File: src/components/ProfileCard.jsx
```

### Bài 2: Dùng lại component
```jsx
// Dùng ProfileCard 3 lần trong App.jsx
// Mỗi lần hiển thị thông tin khác nhau (hardcode)
```

### Bài 3: Tổ chức components
```
// Tạo cấu trúc:
// src/
//   components/
//     Header.jsx
//     Footer.jsx
//     ProfileCard.jsx
//   App.jsx
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 2:** JSX — component trả về JSX
- **Sẽ cần trong Tier 4:** Props — truyền dữ liệu vào component (hiện tại hardcode)
- **Sẽ cần trong Tier 6:** useState — thêm state cho component
- **Tham khảo thêm:** `02_getting_started/01_getting_started.md` (file cũ)
