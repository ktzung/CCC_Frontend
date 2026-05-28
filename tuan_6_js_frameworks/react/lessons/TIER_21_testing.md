# Tier 21 — Testing React (Jest + React Testing Library)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Viết test cho components — render, interaction, async  
> **📋 Cần biết:** Tier 3 (Components), Tier 8 (Events)  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh sửa component Button. Mọi thứ hoạt động... cho đến khi phát hiện đã phá vỡ component Cart ở đâu đó.*

*"Nếu có test — chạy 1 lệnh là biết ngay chỗ nào bị lỗi."*

---

## 🎯 Hôm nay bạn sẽ học

```
Unit Test       = Test 1 component/function riêng lẻ
Integration Test = Test nhiều component hoạt động cùng nhau
RTL Philosophy  = Test như USER, không test implementation
```

---

## 📝 Bài 21.1 — Test cơ bản (12 phút)

### Render & Check

```jsx
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

test('hiển thị lời chào với tên', () => {
    render(<Welcome name="Nam" />);

    const element = screen.getByText(/Xin chào, Nam/i);
    expect(element).toBeInTheDocument();
});
```

### Query types

```jsx
// getByText → PHẢI tồn tại, throw nếu không
const element = screen.getByText('Hello');

// queryByText → Có thể không tồn tại, trả null
const element = screen.queryByText('Hello');  // null nếu không tìm thấy

// findByText → Async, chờ element xuất hiện
const element = await screen.findByText('Hello');

// getByRole → Ưu tiên accessibility
const btn = screen.getByRole('button', { name: /click me/i });
const input = screen.getByRole('textbox', { name: /email/i });
```

---

## 📝 Bài 21.2 — Interaction Testing (12 phút)

### Click events

```jsx
import { fireEvent } from '@testing-library/react';

test('click button gọi handler', () => {
    const handleClick = jest.fn();
    render(<button onClick={handleClick}>Click Me</button>);

    const btn = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Form submission

```jsx
test('submit form với dữ liệu', () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.click(submitBtn);

    expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@email.com',
        password: 'pass123'
    });
});
```

---

## 📝 Bài 21.3 — Async Testing (8 phút)

### Chờ dữ liệu load

```jsx
test('hiển thị users sau khi load', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { id: 1, name: 'Minh' },
                { id: 2, name: 'Linh' }
            ])
        })
    );

    render(<UserList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText('Minh')).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

---

## 📊 Bảng query types

```
Query           Không tìm thấy    Async    Khi nào dùng
─────           ──────────────    ─────    ─────────────
getByText       Throw error       Không    Element PHẢI tồn tại
queryByText     null              Không    Element CÓ THỂ không tồn tại
findByText      Throw (timeout)   Có       Chờ element xuất hiện
getByRole       Throw error       Không    Ưu tiên accessibility
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 3:** Components — test component
- **Dùng kiến thức từ Tier 8:** Events — test user interactions
- **Tham khảo thêm:** `05_ecosystem/09_testing_react.md` (file cũ)
