# 🟦 PART III - CHƯƠNG 05
# **CLASS COMPONENTS (LEGACY)**

## 🎬 "Tại Sao Code Cũ Viết 'this.state' Khắp Nơi?" — Di Sản Trước Hooks

*Minh đọc codebase 2018: `class Counter extends Component`, `this.setState()`, `componentDidMount()`. "Sao dài dòng vậy?" Anh Hùng: "Đó là React TRƯỚC Hooks (2019). Em cần đọc hiểu, không cần viết mới. Nhưng Error Boundary vẫn cần class."*

---

# 1. **CẤU TRÚC CLASS COMPONENT**

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
*Khác biệt: Phải dùng `this.props`.*

---

# 2. **STATE TRONG CLASS**

```jsx
class Counter extends Component {
  constructor(props) {
    super(props);
    // Khai báo state
    this.state = { count: 0 };
  }

  tangDem = () => {
    // Cập nhật state (Không dùng hook)
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.tangDem}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

---

# 3. **LIFECYCLE METHODS (VÒNG ĐỜI)**

Các hàm này tương ứng với `useEffect` bên Functional.

- `componentDidMount()`: Chạy sau khi render lần đầu (Mount). -> Dùng gọi API.
- `componentDidUpdate()`: Chạy sau khi state/props thay đổi.
- `componentWillUnmount()`: Chạy trước khi hủy. -> Dọn dẹp.

---

# 4. **ERROR BOUNDARIES (BẮT LỖI GIAO DIỆN)**

Đây là tính năng duy nhất mà Functional Component **chưa làm được**. Dùng để bắt lỗi JS trong cây component con để không làm sập cả trang web.

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Lỗi:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Đã có lỗi xảy ra. Vui lòng tải lại.</h1>;
    }
    return this.props.children;
  }
}
```
*Cách dùng: Bọc component khác bằng ErrorBoundary.*

---

# 5. **TỔNG KẾT**

- Class Component dài dòng và khó dùng hơn Hooks.
- Chỉ dùng khi cần bảo trì dự án cũ hoặc cần Error Boundary.
- Với dự án mới, hãy dùng **100% Functional Component**.

---

**Chương tiếp theo:** Khám phá bộ sưu tập Hooks nâng cao (useMemo, useCallback...).
