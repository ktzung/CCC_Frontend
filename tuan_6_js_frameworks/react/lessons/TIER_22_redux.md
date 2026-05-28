# Tier 22 — Redux (State Management cho App lớn)

> **⏱ Thời lượng:** 40-45 phút  
> **🎯 Mục tiêu:** Quản lý state toàn cục với Redux Toolkit  
> **📋 Cần biết:** Tier 14 (Context API), Tier 16 (useReducer)  
> **🚫 Không cần biết:** Không có

---

## 🎬 Opening Hook

*Minh có app bán hàng. Cart state dùng ở Navbar, ProductPage, CartPage, CheckoutPage. Dùng Context → mỗi lần cart thay đổi → TẤT CẢ consumer re-render.*

*"Redux: state tập trung, chỉ component nào cần mới re-render."*

---

## 🎯 Hôm nay bạn sẽ học

```
Redux = State management pattern cho app phức tạp
      = "Ngân hàng dữ liệu": deposit (dispatch) → state mới

Redux Toolkit = Redux hiện đại (ít boilerplate)
              = createSlice + configureStore
```

---

## 📝 Bài 22.1 — Setup Redux (10 phút)

### Store

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
});
```

### Wrap App

```jsx
// main.jsx
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

---

## 📝 Bài 22.2 — createSlice (15 phút)

### Cart slice

```jsx
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0
    },
    reducers: {
        addItem(state, action) {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                existing.qty++;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
            state.totalPrice += action.payload.price;
        },
        removeItem(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item) state.totalPrice -= item.price * item.qty;
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Selectors

```jsx
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartTotal = (state) => state.cart.totalPrice;
```

---

## 📝 Bài 22.3 — Dùng trong Components (10 phút)

### useSelector & useDispatch

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectCartCount } from './cartSlice';

function Navbar() {
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    return (
        <nav>
            <span>🛒 {cartCount}</span>
        </nav>
    );
}

function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div>
            <h3>{product.name}</h3>
            <button onClick={() => dispatch(addItem(product))}>
                Thêm vào giỏ
            </button>
        </div>
    );
}
```

---

## 📊 So sánh: Context vs Redux

```
                    Context                     Redux
                    ───────                     ──────
Phức tạp            Đơn giản                    Phức tạp hơn
Performance         Re-render tất cả consumer   Chỉ re-render selector dùng
DevTools            Không có                    Redux DevTools (time-travel)
Async               Tự xử lý                    createAsyncThunk built-in
Khi nào dùng       App nhỏ, ít shared state    App lớn, nhiều shared state
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 14:** Context API — so sánh Context vs Redux
- **Dùng kiến thức từ Tier 16:** useReducer — Redux dựa trên reducer pattern
- **Tham khảo thêm:** `06_routing_state/14_redux_state_management.md` (file cũ)
