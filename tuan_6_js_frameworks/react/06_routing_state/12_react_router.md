# 🟩 TUẦN 6 - BÀI 06 (REACT)
# **REACT ROUTER v6 & STATE MANAGEMENT**

---

## 0. 🎬 Opening Hook

*Minh thêm nhiều trang vào React app. Dùng `<a href="/products">` như HTML thông thường. Click → trang trắng 2 giây → reload lại. SPA biến thành MPA.*

*Anh Hùng: "Em vừa phá SPA. `<a href>` = request mới lên server = trang trắng. React Router intercepts link clicks và swap component — không request server, không reload."*

*Vài phút sau, Minh có thêm vấn đề: Header và CartPage đều cần biết có bao nhiêu items trong giỏ hàng. State ở đâu?*

*"State ở component cha chung. Hoặc dùng Zustand — 10 dòng code, global state không cần Redux boilerplate."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Mọi SPA thực tế đều cần 2 thứ này:
1. **React Router** — Điều hướng không reload. `useParams` cho dynamic routes, `useNavigate` cho programmatic navigation
2. **Global State** — Data dùng chung giữa nhiều components (user session, cart, theme)

Không có 2 thứ này → không xây được app thực tế nhiều trang.

---

## 2. 🌐 Big Picture — Routing + State trong React App

```
REACT APP ARCHITECTURE

main.jsx
└── BrowserRouter          ← Cung cấp routing context
    └── App.jsx
        ├── Navbar          ← Đọc từ global state (cartCount, user)
        └── Routes
            ├── / → HomePage
            ├── /products → ProductsPage
            ├── /products/:id → ProductDetailPage
            ├── /cart → CartPage
            └── /* → NotFoundPage

GLOBAL STATE FLOW (Zustand):
useCartStore { items, addItem, removeItem }
     ↑ đọc/write từ Navbar, ProductCard, CartPage

useAuthStore { user, login, logout }
     ↑ đọc/write từ Navbar, LoginPage, ProtectedRoute
```

---

## 3. ⚙️ Core Technical Truth

### React Router v6 — Setup

```bash
npm install react-router-dom
```

```jsx
// main.jsx — Wrap app với BrowserRouter
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

```jsx
// App.jsx — Define routes
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
    return (
        <>
            <Navbar />
            <main className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:productId" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Redirect */}
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </>
    );
}
```

---

### Link và Navigation

```jsx
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// Link — Không reload trang (thay <a href>)
<Link to="/products">Xem sản phẩm</Link>
<Link to={`/products/${product.id}`}>Chi tiết</Link>

// NavLink — Tự thêm class "active" cho current route
<NavLink to="/" className={({ isActive }) => isActive ? "nav-active" : ""}>
    Trang chủ
</NavLink>

// useNavigate — Chuyển trang bằng JavaScript
function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        await loginAPI(credentials);
        navigate("/dashboard");        // Chuyển đến /dashboard
        navigate(-1);                  // Quay lại trang trước
        navigate("/login", { replace: true }); // Không lưu history
    };
}

// useLocation — Lấy thông tin URL hiện tại
function BreadCrumb() {
    const location = useLocation();
    // location.pathname = "/products/123"
    // location.search = "?sort=price"
    // location.state = { from: "/cart" }  ← State truyền qua navigate
}
```

---

### Dynamic Routes và useParams

```jsx
import { useParams } from "react-router-dom";

// Route: /products/:productId
// URL: /products/abc-123

function ProductDetailPage() {
    const { productId } = useParams(); // "abc-123"
    const { data: product, isLoading } = useFetch(`/api/products/${productId}`);

    if (isLoading) return <div>Đang tải...</div>;
    if (!product) return <div>Không tìm thấy sản phẩm</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.price.toLocaleString("vi-VN")}đ</p>
        </div>
    );
}

// Nested routes — Layout pattern
// Route config:
// /dashboard            → DashboardLayout (sidebar + content)
//   /dashboard          → DashboardHome (index route)
//   /dashboard/orders   → OrdersPage
//   /dashboard/settings → SettingsPage

function DashboardLayout() {
    return (
        <div className="dashboard">
            <nav className="sidebar">
                <NavLink to="/dashboard">Overview</NavLink>
                <NavLink to="/dashboard/orders">Đơn hàng</NavLink>
                <NavLink to="/dashboard/settings">Cài đặt</NavLink>
            </nav>
            <div className="content">
                <Outlet /> {/* Children routes render ở đây */}
            </div>
        </div>
    );
}

// App.jsx — Nested route config
<Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />         {/* /dashboard */}
    <Route path="orders" element={<OrdersPage />} />    {/* /dashboard/orders */}
    <Route path="settings" element={<SettingsPage />} />{/* /dashboard/settings */}
</Route>
```

---

### Protected Routes — Authentication Guard

```jsx
import { Navigate, useLocation } from "react-router-dom";

// Component bảo vệ route
function PrivateRoute({ children }) {
    const { user } = useAuthStore();
    const location = useLocation();

    if (!user) {
        // Redirect về login, lưu intended URL để redirect sau khi login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

// Sử dụng
<Route
    path="/dashboard/*"
    element={
        <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>
    }
/>

// Trong LoginPage — redirect về intended URL sau login
function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname ?? "/";

    const handleLogin = async () => {
        await login(credentials);
        navigate(from, { replace: true }); // Về URL ban đầu
    };
}
```

---

### Global State — Zustand (Modern, Minimal)

```bash
npm install zustand
```

```javascript
// stores/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

// persist middleware = tự save/load từ localStorage
export const useCartStore = create(
    persist(
        (set, get) => ({
            // State
            items: [],

            // Getters (computed)
            totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
            totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

            // Actions
            addItem: (product) => set((state) => {
                const existing = state.items.find(i => i.id === product.id);
                if (existing) {
                    return {
                        items: state.items.map(i =>
                            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                        )
                    };
                }
                return { items: [...state.items, { ...product, qty: 1 }] };
            }),

            removeItem: (productId) => set((state) => ({
                items: state.items.filter(i => i.id !== productId)
            })),

            updateQty: (productId, qty) => set((state) => ({
                items: state.items.map(i =>
                    i.id === productId ? { ...i, qty: Math.max(1, qty) } : i
                )
            })),

            clearCart: () => set({ items: [] }),
        }),
        { name: "cart-storage" } // localStorage key
    )
);
```

```jsx
// stores/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,

    login: async (credentials) => {
        set({ isLoading: true });
        try {
            const user = await loginAPI(credentials);
            set({ user, isLoading: false });
        } catch {
            set({ isLoading: false });
        }
    },

    logout: () => {
        set({ user: null });
        // Clear cookies, local storage nếu cần
    },
}));

// Sử dụng trong bất kỳ component nào
function Navbar() {
    const items = useCartStore((state) => state.items);
    const totalItems = useCartStore((state) => state.totalItems());
    const { user, logout } = useAuthStore();

    return (
        <nav>
            <Link to="/">Logo</Link>
            <Link to="/cart">
                🛒 Giỏ hàng
                {totalItems > 0 && (
                    <span className="badge">{totalItems}</span>
                )}
            </Link>
            {user ? (
                <button onClick={logout}>Đăng xuất ({user.name})</button>
            ) : (
                <Link to="/login">Đăng nhập</Link>
            )}
        </nav>
    );
}

function ProductCard({ product }) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div>
            <h3>{product.name}</h3>
            <button onClick={() => addItem(product)}>Thêm vào giỏ</button>
        </div>
    );
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`<Link to>` thay `<a href>` trong React app. `useParams()` lấy `:id` từ URL. `useNavigate()` redirect bằng code.**
> **Zustand: `create((set) => ({ state, actions }))`. Dùng trong component: `const { x, doX } = useMyStore()`.**

---

## 5. 🏭 Real-world Layer

### Full E-commerce App Structure

```jsx
// src/App.jsx — Complete routing setup
export default function App() {
    return (
        <>
            <Navbar />  {/* Đọc cart từ Zustand */}

            <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* Admin routes */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    );
}
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Mini E-commerce SPA (30 phút)

```bash
npm create vite@latest mini-shop -- --template react
cd mini-shop
npm install react-router-dom zustand
```

**Yêu cầu:**
1. 3 trang: Home (`/`), Products (`/products`), Cart (`/cart`)
2. Navbar với links + cart badge (số lượng items)
3. Products page: danh sách 5 sản phẩm giả, nút "Thêm vào giỏ"
4. Cart page: hiển thị items, tổng giá, nút "Xóa"
5. Zustand store cho cart (với `persist` middleware)

```javascript
// Gợi ý: fake products data
const products = [
    { id: 1, name: "iPhone 15 Pro", price: 25990000 },
    { id: 2, name: "MacBook Air M2", price: 32990000 },
    { id: 3, name: "AirPods Pro", price: 6490000 },
    { id: 4, name: "iPad Air", price: 17990000 },
    { id: 5, name: "Apple Watch", price: 12990000 },
];
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Dùng `<a href>` cho external links vẫn đúng"** | Đúng — `<a href>` phù hợp cho external links (`https://...`). `<Link to>` chỉ cho internal app routes. Nếu dùng `<Link>` cho external URL → React Router sẽ cố navigate trong app |
| **"Redux tốt hơn Zustand"** | Redux tốt hơn cho: team lớn cần DevTools mạnh, cần middleware phức tạp, pattern strict. Zustand tốt hơn cho: setup nhanh, ít boilerplate, bundle nhỏ hơn. Không có "tốt hơn" tuyệt đối |
| **"useContext là Redux replacement"** | useContext phù hợp cho: theme, language, auth user (ít thay đổi). Không phù hợp cho cart hoặc realtime data (vì mỗi context change → ALL consumers re-render) |
| **"`BrowserRouter` cần đặt ở App.jsx"** | BrowserRouter có thể đặt ở bất kỳ ancestor nào — thường đặt ở `main.jsx` hoặc `index.jsx` để React Router wrap toàn bộ app từ root |
| **"React Router v6 như v5 chỉ đổi cú pháp"** | Thực ra thay đổi lớn: `<Switch>` → `<Routes>`, `<Redirect>` → `<Navigate>`, `component={X}` → `element={<X />}`, nested routes dùng `<Outlet>`. Code v5 không tương thích v6 |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao dùng `<Link to>` thay vì `<a href>` trong React app? Điều gì xảy ra nếu dùng `<a href>`?
2. `useNavigate(-1)` làm gì? Khi nào hữu ích?
3. Zustand `persist` middleware làm gì? Data được lưu ở đâu?

### Câu hỏi áp dụng:

4. Route `/orders/:orderId/items/:itemId` — Viết component đọc cả 2 params và hiển thị.
5. User truy cập `/checkout` mà chưa đăng nhập. Sau khi đăng nhập → redirect về `/checkout`, không về `/` mặc định. Implement `PrivateRoute` component xử lý case này.

<details>
<summary>👁️ Xem đáp án</summary>

1. `<a href="/products">` = browser request HTTP GET đến server, server trả HTML mới, page reload. SPA bị phá vỡ. `<Link to="/products">` = React Router intercepts click, gọi `history.pushState()`, React render component mới mà không request server. URL đổi nhưng không reload.
2. `navigate(-1)` = quay lại trang trước trong browser history (tương đương nút Back). Hữu ích sau khi submit form, sau khi thực hiện action ("Lưu thành công → Quay lại"), cancel button.
3. `persist` middleware tự động serialize state thành JSON và lưu vào **localStorage** (mặc định). Khi app load lại, tự restore state từ localStorage. Tên key cấu hình trong options `{ name: "storage-key" }`. Giải quyết vấn đề: refresh trang → mất cart.
4. ```jsx
   import { useParams } from "react-router-dom";
   function OrderItem() {
       const { orderId, itemId } = useParams();
       return <p>Order {orderId} → Item {itemId}</p>;
   }
   ```
5. ```jsx
   import { Navigate, Outlet, useLocation } from "react-router-dom";
   import { useAuthStore } from "../stores/authStore";
   function PrivateRoute() {
       const { user } = useAuthStore();
       const location = useLocation();
       if (!user) {
           // Lưu intended URL trong state
           return <Navigate to="/login" state={{ from: location }} replace />;
       }
       return <Outlet />;
   }
   // Trong LoginPage:
   const from = location.state?.from?.pathname ?? "/";
   navigate(from, { replace: true }); // Redirect về /checkout
   ```

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **`<Link to>`** thay `<a href>` cho internal routes. `<NavLink>` cho active styling tự động
2. **`useParams()`** lấy `:param` từ URL. **`useNavigate()`** redirect bằng code. **`useLocation()`** đọc URL state
3. **Nested Routes** = `<Route>` con trong `<Route>` cha, dùng `<Outlet />` để render children
4. **Protected Routes** = Component check auth → `<Navigate>` nếu unauthorized. Lưu `location` để redirect sau login
5. **Zustand** = Global state với ít boilerplate. `persist` middleware = tự sync localStorage

---

## 10. ➡️ Next Lesson Bridge

*"React Router xong, Zustand xong. App chạy tốt," Minh nói. "Nhưng TypeScript? Mọi job description đều yêu cầu."*

*"Không phải học TypeScript từ đầu," anh Hùng nói. "Học đủ để đọc và viết React với TypeScript. 20% TypeScript = 80% use cases. Props typing, useState typing, API response typing."*

**→ [Bài 07: Advanced React Patterns](../07_advanced_patterns/) — React + TypeScript, Error Boundaries, Suspense, và deployment best practices.**
