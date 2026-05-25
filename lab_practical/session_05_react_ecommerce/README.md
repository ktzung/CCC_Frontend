# Session 5 — React E-commerce (Full Stack)

## 🎯 Mục tiêu

- Mở rộng Portfolio thành E-commerce shop
- Sử dụng React Router cho multi-page
- Quản lý global state với Context API
- Kết nối API (FakeStoreAPI) cho products

---

## 📁 Cấu trúc thư mục

```
session_05_react_ecommerce/
├── README.md              ← File này
├── exercises/             ← Đề bài
│   ├── 01_react_router/
│   ├── 02_cart_context/
│   ├── 03_api_integration/
│   └── 04_checkout_flow/
├── solutions/            ← Solution
└── projects/
    └── shophub/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── index.css
            ├── context/
            │   └── CartContext.jsx
            ├── services/
            │   └── api.js
            ├── pages/
            │   ├── Home.jsx
            │   ├── Shop.jsx
            │   ├── Cart.jsx
            │   └── ProductDetail.jsx
            └── components/
                ├── Header.jsx
                ├── Footer.jsx
                ├── ProductCard.jsx
                └── CartSidebar.jsx
```

---

## 🔧 Hướng dẫn Git Commit Convention

### Quy tắc đặt tên commit

```
[TYPE] Mô tả ngắn gọn

- TYPE: viết HOA, đặt trong ngoặc vuông
- Mô tả: max 50 ký tự, bắt đầu bằng động từ
- Không dùng dấu chấm ở cuối
```

### Các loại commit TYPE cho Session 5

| TYPE | Ý nghĩa | Khi nào dùng |
|------|---------|--------------|
| `[SETUP]` | Project setup | Vite, React init |
| `[ROUTER]` | React Router | BrowserRouter, Routes, Route |
| `[CONTEXT]` | Context API | createContext, CartProvider |
| `[STATE]` | State management | useState, cart operations |
| `[API]` | API integration | fetch, async/await, FakeStoreAPI |
| `[FEATURE]` | Thêm tính năng | New functionality |
| `[UI]` | Giao diện | Styling, animations |
| `[UX]` | User experience | Notifications, feedback |
| `[BUGFIX]` | Sửa lỗi | Fix bugs |
| `[FORM]` | Form handling | Form validation, inputs |
| `[ERROR]` | Error handling | Error states, retry logic |

### Ví dụ commit messages

```bash
# ✅ Đúng
git commit -m "[ROUTER] Install React Router v6"
git commit -m "[CONTEXT] Create CartContext with add/remove"
git commit -m "[API] Fetch products from FakeStoreAPI"
git commit -m "[UX] Add cart toast notification"
git commit -m "[BUGFIX] Fix cart quantity update"

# ❌ Sai
git commit -m "add router"                        # thiếu TYPE
git commit -m "[ROUTER] installed react router"    # quá dài
git commit -m "fix"                                # thiếu TYPE và mô tả
git commit -m "[FEATURE] stuff"                   # không rõ ràng
```

### Số lượng commit tối thiểu

| Bài tập | Số commit tối thiểu |
|---------|-------------------|
| Bài 5.1 (React Router) | 4 commits |
| Bài 5.2 (Cart Context) | 4 commits |
| Bài 5.3 (API Integration) | 4 commits |
| Bài 5.4 (Checkout Flow) | 4 commits |
| **Tổng cộng** | **16 commits** |

### Workflow commit cho mỗi bài

```bash
# Bài 5.1 - React Router (4 commits)
git commit -m "[SETUP] Initialize Vite React project"
git commit -m "[ROUTER] Install React Router v6"
git commit -m "[FEATURE] Create page components"
git commit -m "[NAV] Implement navigation with active link"

# Bài 5.2 - Cart Context (4 commits)
git commit -m "[CONTEXT] Create CartContext"
git commit -m "[STATE] Add cart state management"
git commit -m "[FEATURE] Add cart badge to nav"
git commit -m "[UX] Add toast notification on add"

# Bài 5.3 - API Integration (4 commits)
git commit -m "[API] Create products API service"
git commit -m "[FEATURE] Fetch products from FakeStoreAPI"
git commit -m "[UX] Add loading spinner component"
git commit -m "[ERROR] Handle API error states"

# Bài 5.4 - Checkout Flow (4 commits)
git commit -m "[FEATURE] Create CartSummary component"
git commit -m "[FORM] Build checkout form"
git commit -m "[VALIDATION] Add form validation logic"
git commit -m "[FEATURE] Add order confirmation screen"
```

---

## 📝 Bài tập (4 bài)

### Bài 5.1 — React Router + Pages (45 phút)

**Mục tiêu:** Thêm routing cho multi-page experience

**Kiến thức:**
- React Router v6: BrowserRouter, Routes, Route
- NavLink cho active navigation
- Nested routes

**Yêu cầu:**
- Pages: Home, Projects, Shop, Contact
- Navigation với active link indicator
- URL path: /, /projects, /shop, /contact
- 404 fallback route

**Commit requirements:**
```
[SETUP] Initialize Vite React project
[ROUTER] Install React Router v6
[FEATURE] Create page components
[NAV] Implement navigation with active link
```

---

### Bài 5.2 — Shopping Cart Context (45 phút)

**Mục tiêu:** Xây dựng global cart state với Context API

**Kiến thức:**
- createContext, useContext
- CartProvider component
- Global state management
- Cart badge count

**Yêu cầu:**
- CartContext với: addToCart, removeFromCart, clearCart
- CartProvider wrap App
- Badge hiển thị số items trên nav
- Toast notification khi add

**Commit requirements:**
```
[CONTEXT] Create CartContext
[STATE] Add cart state management
[FEATURE] Add cart badge to nav
[UX] Add toast notification on add
```

---

### Bài 5.3 — API Integration (45 phút)

**Mục tiêu:** Fetch products từ FakeStoreAPI

**Kiến thức:**
- fetch API, async/await
- useEffect for data fetching
- Loading states
- Error handling

**Yêu cầu:**
- API service function (src/services/api.js)
- Fetch products từ `https://fakestoreapi.com/products`
- Loading spinner component
- Error display với retry button

**Commit requirements:**
```
[API] Create products API service
[FEATURE] Fetch products from FakeStoreAPI
[UX] Add loading spinner component
[ERROR] Handle API error states
```

---

### Bài 5.4 — Checkout Flow + Validation (45 phút)

**Mục tiêu:** Hoàn thiện checkout flow với form validation

**Kiến thức:**
- Form validation
- Conditional rendering
- Order confirmation
- Cart summary

**Yêu cầu:**
- CartSummary: list items, total calculation
- CheckoutForm: name, email, address
- Order confirmation screen
- Final polish UI

**Commit requirements:**
```
[FEATURE] Create CartSummary component
[FORM] Build checkout form
[VALIDATION] Add form validation logic
[FEATURE] Add order confirmation screen
```

---

## 📊 Rubric đánh giá

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| **Hoàn thành yêu cầu** | 4 | Tất cả 4 bài đều hoạt động |
| **Code quality** | 2 | Clean components, context usage |
| **Git commit** | 2 | Đủ commits theo convention |
| **Problem solving** | 2 | Tự code, không copy nguyên cả file |

---

## ✅ Checklist trước khi nộp

- [ ] Routing hoạt động (4 pages)
- [ ] Cart state hoạt động (add/remove)
- [ ] API fetch products thành công
- [ ] Loading/error states hoạt động
- [ ] Checkout flow hoàn chỉnh
- [ ] Tối thiểu 16 commits
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 🐛 Troubleshooting

### Context not working
```jsx
// Phải wrap với Provider
<CartProvider>
    <App />
</CartProvider>
```

### API CORS issue
```javascript
// FakeStoreAPI không có CORS issues
// Nếu dùng API khác, thêm proxy trong vite.config.js
```

### useEffect infinite loop
```jsx
// Không được để dependency array trống nếu dùng state
useEffect(() => {
    fetchData();
}, [fetchData]); // fetchData phải stable (useCallback)
```

### Cart state not updating
```jsx
// Sai: direct mutation
cart.push(newItem)

// Đúng: new array reference
setCart(prev => [...prev, newItem])
```

### Route parameter not reading
```jsx
// Phải use useParams() trong component
import { useParams } from 'react-router-dom'

function ProductDetail() {
    const { id } = useParams()
    // ...
}
```

---

## ✅ Checklist trước khi nộp

- [ ] Routing hoạt động (4 pages)
- [ ] Cart state hoạt động (add/remove)
- [ ] API fetch products thành công
- [ ] Loading/error states hoạt động
- [ ] Checkout flow hoàn chỉnh
- [ ] Tối thiểu 16 commits
- [ ] Commit messages đúng format `[TYPE] Description`

---

## 🎯 Final Deliverable

Sau Session 5, bạn có:
- Portfolio hoàn chỉnh đã tiến hóa qua 5 sessions
- E-commerce shop với cart, checkout
- GitHub repo với 65+ meaningful commits (12 + 12 + 16 + 16 + 16 từ Session 1-5)
- Live demo trên Vercel/Netlify
- Code ready để merge vào BTL

---

**← [ Quay lại Lab Practical](../README.md) | [Session 4](../session_04_react_basics/README.md) | Kết thúc Lab Practical →**