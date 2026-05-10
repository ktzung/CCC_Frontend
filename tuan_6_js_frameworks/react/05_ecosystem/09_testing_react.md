# 🟦 PART III - CHƯƠNG 09
# **SECURING A REACT APP THROUGH TESTING**

## 🎬 "Deploy Rồi Cầu Nguyện" — Khi Không Có Test

*Minh deploy Friday 17h, đi ăn. 19h: 200 user report lỗi checkout. Rollback? Không biết commit nào gây bug. Anh Hùng: "Test = dù nhảy dù. Deploy không test = nhảy không dù. Vitest + React Testing Library — 30 phút setup, cứu cả career."*

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

# 4. **ASYNC TESTING — Test API calls**

Khi component gọi API, cần đợi data load xong:

```jsx
// UserList.jsx
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => { setUsers(data); setLoading(false); });
    }, []);

    if (loading) return <p>Đang tải...</p>;
    return (
        <ul>
            {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    );
}
```

```jsx
// UserList.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Mock fetch globally
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { id: 1, name: 'Minh' },
                { id: 2, name: 'Linh' }
            ])
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('hiển thị danh sách users sau khi load', async () => {
    render(<UserList />);

    // Ban đầu hiện loading
    expect(screen.getByText(/đang tải/i)).toBeInTheDocument();

    // Đợi data load xong — dùng findBy (async)
    expect(await screen.findByText('Minh')).toBeInTheDocument();
    expect(screen.getByText('Linh')).toBeInTheDocument();

    // Loading đã biến mất
    expect(screen.queryByText(/đang tải/i)).not.toBeInTheDocument();
});
```

**Lưu ý quan trọng về query methods:**

| Method | Khi nào dùng | Nếu không tìm thấy |
|---|---|---|
| `getByText` | Element **phải có** trong DOM | ❌ Throw error |
| `queryByText` | Element **có thể không** có | Returns `null` |
| `findByText` | Element **async** (chờ load) | ❌ Throw sau timeout |
| `getByRole` | Tìm theo ARIA role (ưu tiên) | ❌ Throw error |
| `getByLabelText` | Tìm input theo label | ❌ Throw error |

> 💡 **Quy tắc:** Dùng `getByRole` hoặc `getByText` đầu tiên. Chỉ dùng `getByTestId` (data-testid) khi không có cách nào khác.

---

# 5. **TESTING FORMS**

```jsx
// LoginForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('submit form với email và password', () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} });

    // Tìm input theo label (cách tốt nhất cho form)
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mật khẩu/i);
    const submitBtn = screen.getByRole('button', { name: /đăng nhập/i });

    // Nhập dữ liệu (giống người dùng thật)
    fireEvent.change(emailInput, { target: { value: 'minh@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    // Kiểm tra hàm submit được gọi với đúng data
    expect(onSubmit).toHaveBeenCalledWith({
        email: 'minh@email.com',
        password: 'password123'
    });
});
```

---

# 6. **TESTING CUSTOM HOOKS**

```jsx
// useCounter.js
import { useState } from 'react';

export function useCounter(initial = 0) {
    const [count, setCount] = useState(initial);
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    return { count, increment, decrement };
}
```

```jsx
// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('counter tăng và giảm', () => {
    const { result } = renderHook(() => useCounter(0));

    expect(result.current.count).toBe(0);

    act(() => { result.current.increment(); });
    expect(result.current.count).toBe(1);

    act(() => { result.current.decrement(); });
    expect(result.current.count).toBe(0);
});
```

---

# 7. 🛠️ HANDS-ON PRACTICE — Làm ngay bây giờ

### Bài tập: Viết test cho TodoApp (30 phút)

1. Setup: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
2. Viết 4 test cases:
   - ✅ Render danh sách todos
   - ✅ Thêm todo mới qua form
   - ✅ Toggle completed khi click
   - ✅ Xóa todo khi click nút Delete

3. Chạy: `npm run test` hoặc `npx vitest`

**Bonus:** Test loading state khi component gọi API giả.

---

# 8. ❌ COMMON MISCONCEPTIONS — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Test tốn thời gian, không cần cho project nhỏ"** | Test **tiết kiệm** thời gian — 30 phút viết test = tiết kiệm 3 giờ debug khi refactor. Project nhỏ càng cần vì ít người maintain |
| **"100% code coverage = code tốt"** | Coverage cao ≠ test chất lượng. Test `expect(true).toBe(true)` tăng coverage nhưng không có giá trị. Quan trọng là test **behavior**, không phải lines of code |
| **"Phải test mọi chi tiết implementation"** | RTL triết lý: test như **người dùng**. Không test state nội bộ, không test tên function. Chỉ test: render đúng không? Click có phản hồi không? |
| **"Mock mọi thứ để test nhanh"** | Mock quá nhiều → test pass nhưng code thật fail. Chỉ mock: API calls, timers, browser APIs. Giữ thật: component rendering, user interactions |
| **"Unit test đủ rồi, không cần integration test"** | Unit test kiểm tra từng phần. Integration test kiểm tra **tương tác giữa các phần** — đây là nơi bug thật thường xuất hiện |

---

# 9. ✅ CHECKPOINT — Kiểm tra hiểu biết

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa `getByText`, `queryByText`, và `findByText` là gì? Khi nào dùng từng cái?
2. Tại sao RTL khuyến khích dùng `getByRole` thay vì `getByTestId`?
3. `fireEvent.click()` và `user.click()` (user-event) khác nhau thế nào?

### Câu hỏi áp dụng:

4. Component `<Counter />` hiển thị số đếm và nút "+1". Viết test kiểm tra: render số 0 ban đầu, click nút → số tăng lên 1.
5. Component gọi `fetch('/api/todos')` khi mount. Viết test kiểm tra: loading state → data render. Cần mock gì?

<details>
<summary>👁️ Xem đáp án</summary>

1. **`getByText`**: throw error nếu không tìm thấy (dùng khi element PHẢI có). **`queryByText`**: trả về null nếu không tìm thấy (dùng khi element CÓ THỂ không có). **`findByText`**: trả về Promise, đợi element xuất hiện (dùng cho async content).
2. `getByRole` tìm theo **vai trò semantic** (button, heading, textbox) — giống cách người dùng và screen reader thấy. `getByTestId` tìm theo attribute kỹ thuật — không liên quan đến user experience. Nếu đổi HTML nhưng giữ role → test vẫn pass.
3. `fireEvent` dispatch event đơn giản (synthetic). `userEvent` (từ @testing-library/user-event) mô phỏng **hành vi người dùng thật** hơn: hover trước click, type từng ký tự, paste. Khuyến nghị dùng `userEvent` cho production tests.
4. `render(<Counter />); expect(screen.getByText('0')).toBeInTheDocument(); fireEvent.click(screen.getByRole('button', { name: '+1' })); expect(screen.getByText('1')).toBeInTheDocument();`
5. Cần mock `global.fetch`. Test: (1) render → expect `screen.getByText(/loading/i)`toBeInTheDocument. (2) `await waitFor(() => expect(screen.getByText('Todo 1')).toBeInTheDocument())`. (3) Loading biến mất: `expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()`.

</details>

---

# 10. 📌 SUMMARY — 5 điều quan trọng nhất

1. **Test như người dùng** — dùng `getByRole`, `getByText`, không test implementation
2. **3 query types**: `get` (phải có), `query` (có thể không), `findBy` (async)
3. **Mock chỉ những gì cần thiết** — API calls, timers. Không mock component behavior
4. **Integration test > Unit test** — test sự kết hợp giữa components quan trọng hơn test từng phần
5. **30 phút setup test = tiết kiệm hàng giờ debug** — especially khi refactor

---

**Chương tiếp theo:** Xử lý biểu mẫu phức tạp (Forms & Validation).
