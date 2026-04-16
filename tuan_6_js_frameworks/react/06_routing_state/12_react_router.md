# 🟦 PART III - CHƯƠNG 12
# **NAVIGATING WITH REACT ROUTER**

## 🎬 "Dùng Thẻ `<a>` Trong React = Phá SPA" — React Router Ra Đời

*Minh dùng `<a href="/about">About</a>`. Click → trang reload toàn bộ. Anh Hùng: "Em vừa phá SPA. Dùng `<Link to='/about'>` — React Router sẽ đổi content mà KHÔNG reload trang. Đó là bí mật của SPA routing."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Cài đặt và cấu hình **React Router v6**.
- Tạo các route lồng nhau (**Nested Routes**).
- Xử lý link động (`/user/:id`).
- Dùng Hook `useNavigate` để chuyển trang bằng code.

---

# 1. **CÀI ĐẶT**

`npm install react-router-dom`

---

# 2. **CẤU HÌNH (SETUP)**

Dùng `BrowserRouter` bao bọc toàn bộ App.

```jsx
// main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

# 3. **ĐỊNH NGHĨA ROUTES**

```jsx
// App.jsx
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        {/* Dùng Link thay thẻ a để không reload trang */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Route động: /product/123 */}
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* Trang 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
```

---

# 4. **HOOKS QUAN TRỌNG**

## 4.1. `useParams` (Lấy tham số trên URL)
Dùng trong trang ProductDetail.
```jsx
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // Lấy 123
  return <h1>Sản phẩm số: {id}</h1>;
}
```

## 4.2. `useNavigate` (Chuyển trang bằng Code)
```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... Login xong ...
    navigate('/dashboard'); // Chuyển hướng
  };
}
```

---

# 5. **TỔNG KẾT**

- Không dùng thẻ `<a>`, hãy dùng `<Link>`.
- React Router v6 dùng `<Routes>` và `<Route>`.
- `useParams` để lấy ID, `useNavigate` để redirect.

---

**Chương tiếp theo:** Quản lý dữ liệu toàn cục cấp độ doanh nghiệp (Redux).
