# 🟦 PART III - CHƯƠNG 06
# **THE HOOKS API OF REACT**

Ngoài `useState` và `useEffect`, React còn cung cấp một bộ vũ khí hạng nặng để tối ưu hiệu năng và xử lý logic phức tạp.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Dùng **useRef** để tham chiếu DOM.
- Tối ưu hiệu năng với **useMemo** và **useCallback**.
- Quản lý state phức tạp với **useReducer**.
- Tự viết **Custom Hooks** để tái sử dụng logic.

---

# 1. **useRef (THAM CHIẾU)**

Giúp lưu giữ một giá trị qua các lần render mà **không gây render lại** (Khác với useState). Thường dùng để truy cập trực tiếp phần tử DOM.

```jsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Chọc trực tiếp vào DOM input
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus vào ô nhập</button>
    </>
  );
}
```

---

# 2. **PERFORMANCE HOOKS (TỐI ƯU HIỆU NĂNG)**

React rất nhanh, nhưng nếu component render lại quá nhiều lần không cần thiết thì sẽ chậm.

## 2.1. `useMemo` (Ghi nhớ giá trị tính toán)
Giả sử bạn có một hàm tính toán rất nặng (mất 2s). Bạn không muốn nó chạy lại mỗi khi component render.

```jsx
const expensiveValue = useMemo(() => {
  return hamTinhToanNang(count);
}, [count]); // Chỉ tính lại khi 'count' thay đổi
```

## 2.2. `useCallback` (Ghi nhớ hàm)
Giúp ngăn cản việc một hàm bị tạo mới mỗi lần render. Thường dùng khi truyền hàm xuống component con (kết hợp với `React.memo`).

```jsx
const handleClick = useCallback(() => {
  console.log('Click');
}, []); // Hàm này sẽ không bao giờ thay đổi địa chỉ bộ nhớ
```

---

# 3. **useReducer (QUẢN LÝ STATE PHỨC TẠP)**

Khi `useState` trở nên rối rắm (state này phụ thuộc state kia), hãy dùng `useReducer` (tư duy giống Redux).

1.  **Reducer:** Hàm nhận (state cũ, hành động) -> trả về state mới.
2.  **Dispatch:** Hàm gửi hành động.

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

---

# 4. **CUSTOM HOOKS (TỰ CHẾ HOOK)**

Đây là tính năng mạnh nhất của Hooks: Tách logic ra khỏi giao diện để dùng lại.
Quy tắc: Tên hàm phải bắt đầu bằng `use...`.

**Ví dụ: Hook lấy kích thước cửa sổ**
```jsx
// useWindowSize.js
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// App.jsx (Sử dụng)
function App() {
  const { width } = useWindowSize(); // Logic được tái sử dụng!
  return <p>Window width: {width}</p>;
}
```

---

# 5. **TỔNG KẾT**

- **useRef:** Lưu biến không render lại.
- **useMemo / useCallback:** Tối ưu hiệu năng, tránh tính toán thừa.
- **useReducer:** Thay thế useState cho logic phức tạp.
- **Custom Hooks:** Đóng gói logic để share giữa các components.

---

**Chương tiếp theo:** Làm cho code an toàn hơn với TypeScript (Type Safety).
