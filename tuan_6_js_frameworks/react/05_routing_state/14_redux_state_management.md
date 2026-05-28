# 🟩 TUẦN 6 - BÀI 07 (REACT)
# **REDUX TOOLKIT — Central State Management**

---

## 0. 🎬 Opening Hook

*Minh có app 15 components. `user` data cần ở: Header, Sidebar, UserMenu, Avatar, ProfilePage, Settings, Cart. Giải pháp hiện tại: truyền `user` qua props từ App → Header → Navbar → UserMenu → Avatar — 4 tầng.*

*Sửa shape của `user` object → phải sửa 4 file. Thêm 1 component dùng `user` → phải trace props chain.*

*"Props drilling," anh Hùng nói. "Redux Toolkit giải quyết bằng 1 Store trung tâm. Mọi component đọc trực tiếp. Không truyền tay nữa."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Redux Toolkit là **industry standard** cho global state trong React:
- Được dùng tại Shopify, Airbnb, Discord
- Giải quyết Props Drilling và State Synchronization
- **Redux DevTools** — xem history của mọi state change, time-travel debug
- `createAsyncThunk` — async data fetching với loading/error states tự động

> **Lưu ý 2024+:** Zustand nhẹ hơn và đủ cho hầu hết apps. Học Redux Toolkit vì job market vẫn yêu cầu. Biết cả hai = developer toàn diện hơn.

---

## 2. 🌐 Big Picture — Flux Architecture

```
REDUX DATA FLOW (Flux pattern)

Component dispatch Action
       ↓
Action (type + payload)
{ type: "cart/addItem", payload: { id: 1, name: "iPhone" } }
       ↓
Reducer (pure function: state + action → new state)
       ↓
Store (single source of truth)
       ↓
All subscribed components re-render với data mới

SO SÁNH TIẾP CẬN:
Props Drilling           useContext         Redux Toolkit         Zustand
─────────────────        ─────────────      ──────────────        ──────────
App → A → B → C          Context Provider   Centralized Store     Store ngoài React
Tất cả re-render         Tất cả consumers   Selective re-render   Selective re-render
< 3-4 levels             Low-freq data      Complex/large app      Small-medium app
```

---

## 3. ⚙️ Core Technical Truth

### Setup Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

```
src/
├── store/
│   ├── index.js          ← configureStore — Root store
│   ├── cartSlice.js      ← Cart state + actions
│   ├── authSlice.js      ← Auth state + actions
│   └── productSlice.js   ← Products + async thunks
```

```javascript
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        products: productReducer,
    },
});

// Type helpers (optional, nếu dùng TypeScript)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
```

```jsx
// main.jsx — Provide store cho toàn app
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

---

### createSlice — State + Actions trong 1 file

```javascript
// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",           // Prefix cho action types: "cart/addItem"
    initialState: {
        items: [],
        totalPrice: 0,
        isOpen: false,
    },
    reducers: {
        // RTK dùng Immer → cho phép viết "mutation syntax" (thực tế immutable bên dưới)
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

        updateQty(state, action) {
            const { id, qty } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                state.totalPrice += (qty - item.qty) * item.price;
                item.qty = Math.max(1, qty);
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },

        toggleCart(state) {
            state.isOpen = !state.isOpen;
        },
    },
});

// Export actions (auto-generated từ reducer keys)
export const { addItem, removeItem, updateQty, clearCart, toggleCart } = cartSlice.actions;

// Export selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalPrice;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
```

```javascript
// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk — Xử lý API calls với loading/error states tự động
export const loginUser = createAsyncThunk(
    "auth/login",                               // Action type prefix
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!res.ok) {
                const error = await res.json();
                return rejectWithValue(error.message);
            }

            return await res.json(); // payload khi fulfilled
        } catch (err) {
            return rejectWithValue("Network error");
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().auth;
        const res = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return rejectWithValue("Unauthorized");
        return res.json();
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") ?? null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        clearError(state) {
            state.error = null;
        },
    },
    // extraReducers xử lý async thunk lifecycle
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // fetchCurrentUser
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => !!state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
```

---

### Dùng Redux trong Components

```jsx
import { useSelector, useDispatch } from "react-redux";
import { addItem, selectCartCount } from "../store/cartSlice";
import { loginUser, selectUser, selectAuthLoading } from "../store/authSlice";

// Navbar — Đọc từ nhiều slices
function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const cartCount = useSelector(selectCartCount);

    return (
        <nav>
            <Link to="/">Logo</Link>
            <button onClick={() => dispatch(toggleCart())}>
                🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
            {user ? (
                <button onClick={() => dispatch(logout())}>
                    {user.name} (Đăng xuất)
                </button>
            ) : (
                <Link to="/login">Đăng nhập</Link>
            )}
        </nav>
    );
}

// ProductCard — Dispatch action
function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString("vi-VN")}đ</p>
            <button onClick={() => dispatch(addItem(product))}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

// LoginForm — Async thunk
function LoginForm() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            navigate("/dashboard");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
        </form>
    );
}
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **`createSlice` = state + reducers + auto-generated actions trong 1 chỗ. RTK dùng Immer → viết như mutation nhưng thực chất immutable.**
> **`useSelector(fn)` = đọc state. `useDispatch()` + `dispatch(action)` = thay đổi state.**

---

## 5. 🏭 Real-world Layer

### Redux DevTools — Debug superpower

```bash
# Cài Chrome Extension: Redux DevTools
# → Xem toàn bộ action history
# → Inspect state sau mỗi action
# → Time-travel: replay từng action
# → Export/import state snapshot

# configureStore tự động enable DevTools trong development
```

---

## 6. 🛠️ Hands-on Practice

### Bài tập: Migrate Todo App sang Redux (20 phút)

```bash
npm install @reduxjs/toolkit react-redux
```

1. Tạo `store/todoSlice.js` với `createSlice` (state: `{ items: [], filter: "all" }`)
2. Tạo `store/index.js` với `configureStore`
3. Wrap `<App>` với `<Provider store={store}>`
4. Update `TodoList` component dùng `useSelector` + `useDispatch`
5. Mở Redux DevTools → Xem action history khi add/delete todos

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Redux Toolkit = Redux cũ phức tạp hơn"** | Ngược lại — RTK **giảm** boilerplate ~70%. Không cần viết action creators, action type constants riêng. `createSlice` làm tất cả |
| **"Viết mutation trong RTK reducer là sai"** | Đúng về mặt cú pháp, sai về kết quả. RTK dùng **Immer** bên dưới — mutation syntax được compile thành immutable updates. Vẫn không mutate state thật |
| **"Mọi state đều phải vào Redux"** | Chỉ state cần **share giữa nhiều components**. Local state (isOpen dropdown, form input) nên ở `useState`. Rule of thumb: Server data → React Query. Global UI state → Redux/Zustand. Local UI → useState |
| **"`useSelector` chạy mỗi render"** | Không — `useSelector` chạy khi Redux state thay đổi. Dùng selector functions để chỉ subscribe phần cần thiết. Viết selector granular: `state => state.cart.items` thay vì `state => state.cart` |
| **"Redux thay thế useState"** | Redux bổ sung, không thay thế. useState cho component-local state. Redux cho cross-component state |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. `createSlice` tự động tạo những gì? Tại sao không cần viết action creators thủ công?
2. Tại sao viết `state.items.push(...)` trong RTK reducer lại hợp lệ dù Redux yêu cầu immutability?
3. `createAsyncThunk` tạo ra bao nhiêu action types? Kể tên chúng.

### Câu hỏi áp dụng:

4. Cart có 3 items với prices khác nhau. Viết selector function để tính `totalPrice` từ Redux state.
5. User click "Thêm vào giỏ". Action nào được dispatch? Reducer nào xử lý? State thay đổi thế nào? Trace toàn bộ data flow.

<details>
<summary>👁️ Xem đáp án</summary>

1. `createSlice` tự động tạo: (1) **Action creators** có tên trùng reducer keys (`addItem`, `removeItem`...). (2) **Action type strings** với format `sliceName/reducerKey` (e.g. `cart/addItem`). (3) **Reducer function** combine tất cả reducers. Lý do: trước RTK, phải viết 3 thứ riêng biệt — boilerplate rất nhiều.
2. RTK tích hợp **Immer** library. Khi reducer chạy, Immer wrap state trong Proxy object. Mọi "mutation" được tracked, compile thành immutable update trả về state object mới. Bên ngoài reducer, state vẫn là immutable.
3. `createAsyncThunk("auth/login", ...)` tạo 3 action types: `"auth/login/pending"`, `"auth/login/fulfilled"`, `"auth/login/rejected"`. Tương ứng với 3 lifecycle states của Promise.
4. ```javascript
   export const selectCartTotal = (state) =>
       state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
   // Trong component:
   const total = useSelector(selectCartTotal);
   ```
5. Flow: (1) User click → `dispatch(addItem(product))`. (2) Redux gửi action `{ type: "cart/addItem", payload: product }` đến tất cả reducers. (3) `cartSlice.reducer` nhận action, Immer wrap state, reducer chạy: tìm existing item hoặc push mới, tăng totalPrice. (4) Immer tạo new state object. (5) Redux store cập nhật. (6) `useSelector(selectCartItems)` trong Navbar, CartPage detect thay đổi → re-render với data mới.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Redux Toolkit** = Redux hiện đại, ít boilerplate. `createSlice` = state + reducers + auto action creators
2. **Immer** trong RTK = viết mutation syntax, nhưng state vẫn immutable bên dưới
3. **`useSelector(fn)`** = đọc state. **`useDispatch()`** = gửi actions. `<Provider>` = inject store
4. **`createAsyncThunk`** = async API calls với pending/fulfilled/rejected states tự động
5. **Rule**: Local UI state → `useState`. Cross-component → Redux/Zustand. Server data → React Query

---

## 10. ➡️ Next Lesson Bridge

*"React, Redux, Router — đủ để build app thực tế," Minh nói. "Còn Vue? Có Vuex không?"*

*"Vuex là state management cũ của Vue. Vue 3 dùng **Pinia** — nhẹ hơn, TypeScript-friendly hơn. Syntax tương tự Zustand. Tiếp."*

**→ [Vue: Components & Props](../../vue/02_components/) — Single-File Components nâng cao, defineProps, defineEmits, slots pattern.**
