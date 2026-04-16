# 🟦 PART III - CHƯƠNG 04
# **BEHIND THE SCENES & ADVANCED TOPICS**

## 🎬 "Component Sống Rồi Chết Như Thế Nào?" — Lifecycle & Side Effects

*Minh gọi API trong render — app loop vô hạn, gọi 1000 request/giây. Anh Hùng: "useEffect(fn, []) — dấu [] = 'chỉ chạy 1 lần khi component sinh ra'. Không có [] = chạy mãi mãi. Đây là lỗi #1 của React newbie."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu **Lifecycle** (Vòng đời) của component.
- Làm chủ **useEffect** để xử lý Side Effects (Gọi API, DOM...).
- Dùng **Context API** để tránh "Props Drilling" (Truyền props qua quá nhiều tầng).

---

# 1. **EFFECT HOOK (`useEffect`)**

Nếu `useState` giúp component có "trí nhớ", thì `useEffect` giúp component "tương tác với thế giới bên ngoài" (Side Effects).

**Side Effects bao gồm:** Gọi API, đăng ký sự kiện, setTimeOut, thay đổi title tab...

Cấu trúc: `useEffect(hàm_xử_lý, [mảng_phụ_thuộc])`

## 1.1. Case 1: Chạy mỗi lần render (Không có mảng dependency)
```jsx
useEffect(() => {
  console.log("Tôi chạy mỗi khi component render!");
});
```
*-> Ít dùng, dễ gây loop.*

## 1.2. Case 2: Chỉ chạy 1 lần duy nhất khi Mount (Mảng rỗng `[]`)
Tương đương `componentDidMount`. Dùng để gọi API.
```jsx
useEffect(() => {
  console.log("Tôi chỉ chạy đúng 1 lần đầu tiên!");
  
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

## 1.3. Case 3: Chạy khi biến thay đổi (`[count]`)
```jsx
useEffect(() => {
  console.log("Tôi chạy khi biến `count` thay đổi: " + count);
}, [count]);
```

## 1.4. Cleanup Function (Dọn dẹp)
Chạy khi component bị hủy (Unmount). Dùng để xóa interval, remove event listener.
```jsx
useEffect(() => {
  const timer = setInterval(() => { ... }, 1000);

  // Hàm dọn dẹp (Return function)
  return () => {
    clearInterval(timer);
  };
}, []);
```

---

# 2. **CONTEXT API (TRUYỀN DỮ LIỆU TOÀN CỤC)**

**Vấn đề:** Bạn muốn truyền `theme="dark"` từ `App` xuống `Button` (App -> Layout -> Toolbar -> Button). Bạn phải truyền props qua 4 tầng (Props Drilling).

**Giải pháp:** Context API (Giống như phát loa thông báo, ai cần thì nghe).

## Bước 1: Tạo Context
```jsx
// ThemeContext.js
import { createContext } from 'react';
export const ThemeContext = createContext(null);
```

## Bước 2: Cung cấp (Provider) ở Cha
```jsx
// App.jsx
import { ThemeContext } from './ThemeContext';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

## Bước 3: Sử dụng (Consumer) ở Con
```jsx
// Button.jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Button() {
  const theme = useContext(ThemeContext); // Nhận thẳng "dark"
  return <button className={theme}>Click me</button>;
}
```

---

# 3. **FRAGMENTS**

Quy tắc JSX bắt buộc phải có 1 thẻ cha bao ngoài. Nhưng đôi khi ta không muốn thêm thẻ `div` thừa thãi (làm hỏng flex/grid layout).
-> Dùng Fragment `<>...</>`.

```jsx
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}
```

---

# 4. **TỔNG KẾT**

- **useEffect** là chìa khóa để xử lý logic bên ngoài render (API, Timer).
- Hãy chú ý **Dependency Array `[]`** của useEffect để tránh bug vô hạn.
- **Context API** giúp chia sẻ dữ liệu global (Theme, Auth) mà không cần truyền props vất vả.

---

**Chương tiếp theo:** Ôn lại quá khứ một chút với Class Components (để đọc code cũ).
