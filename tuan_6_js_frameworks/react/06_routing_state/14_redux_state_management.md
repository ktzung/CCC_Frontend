# 🟦 PART III - CHƯƠNG 14 & 15
# **CENTRAL STATE MANAGEMENT (REDUX)**

## 🎬 "Truyền Props Qua 10 Component = Chuyền Thư Qua 10 Người" — Redux Ra Đời

*Minh truyền `user` từ App → Dashboard → Sidebar → UserMenu → Avatar. 5 tầng, 5 lần copy-paste props. Sửa 1 chỗ = sửa 5 file. Anh Hùng: "Redux = Bưu điện trung tâm. Mọi component đọc/ghi từ 1 nơi duy nhất. Không chuyền tay nữa."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu kiến trúc **Flux** (Store, Action, Reducer).
- Sử dụng **Redux Toolkit (RTK)** - Cách viết Redux hiện đại (đơn giản hơn Redux cũ 100 lần).
- Xử lý bất đồng bộ (gọi API) với **createAsyncThunk**.

---

# 1. **REDUX TOOLKIT (RTK)**

Quên Redux cũ đi (phức tạp, boilerplate dài dòng). RTK là tiêu chuẩn mới.

## 1.1. Store (Kho chứa dữ liệu)
Nơi duy nhất chứa state của cả ứng dụng.

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

## 1.2. Slice (Cắt lát)
Gộp Action và Reducer vào một file.

```javascript
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      // RTK cho phép viết kiểu "thay đổi trực tiếp" (nhờ Immer ngầm bên dưới)
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

---

# 2. **KẾT NỐI VỚI REACT**

## 2.1. Provider (Cung cấp Store)
```jsx
// main.jsx
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```

## 2.2. Hooks (Sử dụng)
- `useSelector`: Lấy dữ liệu.
- `useDispatch`: Gửi lệnh thay đổi.

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  );
}
```

---

# 3. **ASYNC REDUX (GỌI API)**

Dùng `createAsyncThunk`.

```javascript
// userSlice.js
export const fetchUser = createAsyncThunk(
  'users/fetchById', // Tên hành động
  async (userId) => {
    const response = await fetch(`.../users/${userId}`);
    return response.json();
  }
);

// Xử lý trong extraReducers
extraReducers: (builder) => {
  builder.addCase(fetchUser.fulfilled, (state, action) => {
    state.entities.push(action.payload);
  });
}
```

---

# 4. **TỔNG KẾT**

- **Redux** giúp quản lý state tập trung, dễ debug (Redux DevTools).
- Luôn dùng **Redux Toolkit** cho dự án mới.
- Chỉ dùng Redux khi App phức tạp. App nhỏ dùng `Context` + `useReducer` là đủ.

---

**Chúc mừng!** Bạn đã hoàn thành phần cốt lõi của React. Phần còn lại là những kỹ thuật nâng cao (Performance, Next.js).
