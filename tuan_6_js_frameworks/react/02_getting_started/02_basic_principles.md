# 🟦 PART III - CHƯƠNG 03
# **BASIC PRINCIPLES OF REACT**

## 🎬 "Props = CMND (Cha cho, không đổi). State = Tâm Trạng (Tự đổi)" — Nắm 70% React

*Anh Hùng: "Component, JSX, Props, State — 4 từ này = 70% React. Props giống CMND: cha cho, con không sửa. State giống tâm trạng: tự thay đổi bên trong."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu **JSX** là gì (HTML trong JS?).
- Biết cách tạo **Function Component**.
- Truyền dữ liệu bằng **Props**.
- Quản lý dữ liệu nội bộ bằng **State** (`useState`).
- Bắt sự kiện (**Event Handling**).

---

# 1. **COMPONENTS & JSX**

## 1.1. Function Component
Trong React, mọi thứ là Component. Một component thực chất chỉ là một **hàm trả về JSX**.

```jsx
// File: Welcome.jsx
function Welcome() {
  return <h1>Xin chào React!</h1>;
}

export default Welcome;
```

## 1.2. JSX (JavaScript XML)
Nhìn giống HTML nhưng thực ra là JavaScript.
- Phải có **1 thẻ cha** bao ngoài (thường dùng `<div>` hoặc Fragment `<>...</>`).
- Attribute thay đổi: `class` -> `className`, `for` -> `htmlFor`.
- Chèn biến JS vào bằng dấu ngoặc nhọn `{}`.

```jsx
function App() {
  const name = "Khoa";
  const user = { age: 20 };

  return (
    <div className="container">
      <h1>Hello, {name}</h1>
      <p>Tuổi: {user.age + 1}</p>
    </div>
  );
}
```

---

# 2. **PROPS (PROPERTIES)**

Dùng để truyền dữ liệu từ **Cha xuống Con**. (Giống tham số hàm).
**Props là bất biến (Read-only)**. Con không được sửa props của Cha.

**Cha (App.jsx):**
```jsx
import Welcome from './Welcome';

function App() {
  return (
    <>
      <Welcome name="Tùng" />
      <Welcome name="Cúc" />
    </>
  );
}
```

**Con (Welcome.jsx):**
```jsx
function Welcome(props) {
  return <h2>Chào mừng {props.name} đến với khóa học!</h2>;
}
// Hoặc dùng Destructuring (Khuyên dùng)
function Welcome({ name }) {
  return <h2>Chào mừng {name}!</h2>;
}
```

---

# 3. **STATE (TRẠNG THÁI)**

Props là tĩnh. Muốn component thay đổi (động), ta cần **State**.
Dùng Hook `useState` để khai báo.

```jsx
import { useState } from 'react';

function Counter() {
  // [giá trị hiện tại, hàm để cập nhật] = useState(giá trị ban đầu)
  const [count, setCount] = useState(0);

  const tangDem = () => {
    setCount(count + 1); // Cập nhật state -> React tự render lại giao diện
  };

  return (
    <div>
      <p>Bạn đã bấm {count} lần</p>
      <button onClick={tangDem}>Bấm tôi đi</button>
    </div>
  );
}
```

**Quy tắc:** Không bao giờ sửa trực tiếp `count = 5`. Phải dùng `setCount(5)`.

---

# 4. **EVENT HANDLING (BẮT SỰ KIỆN)**

Sử dụng camelCase (`onClick`, `onSubmit`).

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault(); // Chặn hành vi mặc định (ví dụ submit form)
    alert('Đã bấm!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

# 5. **RENDERING LISTS (HIỂN THỊ DANH SÁCH)**

Dùng hàm `.map()` của mảng để lặp và trả về JSX.
**Bắt buộc phải có `key` duy nhất.**

```jsx
function StudentList() {
  const students = ['An', 'Bình', 'Chi'];

  return (
    <ul>
      {students.map((hs, index) => (
        <li key={index}>{hs}</li> // Key giúp React quản lý hiệu năng
      ))}
    </ul>
  );
}
```

---

# 6. **TỔNG KẾT**

- **Component:** Hàm trả về JSX.
- **Props:** Dữ liệu Cha -> Con (Chỉ đọc).
- **State:** Dữ liệu nội bộ của component (Có thể thay đổi).
- **JSX:** Viết HTML trong JS. Nhớ dùng `{}` cho biến.

---

**Chương tiếp theo:** Hiểu sâu hơn về vòng đời và các Hooks nâng cao (Hooks API).
