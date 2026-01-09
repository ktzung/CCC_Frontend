# 🟦 PART III - CHƯƠNG 09
# **SECURING A REACT APP THROUGH TESTING**

Dù code bạn viết có hay đến đâu, nếu chưa test thì vẫn là code rác. Testing giúp bạn ngủ ngon hơn mỗi khi deploy.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Phân biệt **Unit Test**, **Integration Test** và **E2E Test**.
- Sử dụng **Jest** để chạy test.
- Sử dụng **React Testing Library (RTL)** để test component như người dùng thật.

---

# 1. **CÁC LOẠI TESTING**

1.  **Unit Test:** Test từng hàm/component lẻ loi. (Nhanh, rẻ, nhưng chưa chắc ghép vào đã chạy).
2.  **Integration Test:** Test sự kết hợp giữa các component. (Quan trọng nhất).
3.  **E2E (End-to-End):** Giả lập người dùng bấm click thật trên trình duyệt. (Chậm, đắt, nhưng thật nhất).

---

# 2. **JEST & REACT TESTING LIBRARY**

- **Jest:** Trình chạy test (Test Runner).
- **RTL:** Thư viện giúp render component và tìm phần tử (DOM).

**Triết lý của RTL:** *"Test theo cách người dùng sử dụng, không test code bên trong."* (Người dùng không quan tâm state là gì, họ chỉ quan tâm bấm nút có hiện chữ không).

## Ví dụ Test Component:

```jsx
// Welcome.jsx
function Welcome({ name }) {
  return <h1>Xin chào, {name}</h1>;
}
```

```jsx
// Welcome.test.jsx
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

test('hiển thị lời chào đúng tên', () => {
  // 1. Render component
  render(<Welcome name="Nam" />);

  // 2. Tìm phần tử chứa text (Giống mắt người dùng tìm)
  const element = screen.getByText(/Xin chào, Nam/i);

  // 3. Khẳng định (Assert) nó phải có trong trang
  expect(element).toBeInTheDocument();
});
```

---

# 3. **INTERACTION TESTING (TEST TƯƠNG TÁC)**

Test xem bấm nút có gọi hàm không?

```jsx
test('bấm nút gọi hàm onClick', () => {
  const handleClick = jest.fn(); // Hàm giả (Mock)
  render(<button onClick={handleClick}>Click Me</button>);

  const btn = screen.getByRole('button', { name: /click me/i });
  
  // Giả lập bấm chuột
  fireEvent.click(btn);

  // Kiểm tra hàm giả đã được gọi 1 lần chưa
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

# 4. **TỔNG KẾT**

- Đừng bỏ qua Testing. Nó là sự khác biệt giữa Senior và Junior.
- Học cách dùng **React Testing Library** để tìm phần tử (`getByText`, `getByRole`).
- Viết test để bảo vệ bug không quay lại.

---

**Chương tiếp theo:** Xử lý biểu mẫu phức tạp (Forms & Validation).
