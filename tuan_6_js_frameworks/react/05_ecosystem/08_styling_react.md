# 🟦 PART III - CHƯƠNG 08
# **STYLING REACT COMPONENTS**

React không áp đặt cách bạn viết CSS. Có hàng tá cách, nhưng chúng ta sẽ tập trung vào 3 cách phổ biến nhất hiện nay.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Tránh xung đột tên class với **CSS Modules**.
- Viết CSS trong JS với **Styled Components** (Emotion).
- Code CSS tốc độ ánh sáng với **Tailwind CSS**.

---

# 1. **CSS MODULES (AN TOÀN NHẤT)**

**Vấn đề:** Bạn có 2 file css đều có class `.btn`. Chúng sẽ đè nhau.
**Giải pháp:** CSS Modules tự động đổi tên class thành duy nhất (VD: `btn_ah3x1`).

**Code:** Đổi tên file thành `Button.module.css`.

```css
/* Button.module.css */
.btn {
  background: blue;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button() {
  // React sẽ render ra class="Button_btn_xyz123"
  return <button className={styles.btn}>Click me</button>;
}
```

---

# 2. **CSS-IN-JS (STYLED COMPONENTS)**

Viết CSS ngay trong file JS. Rất mạnh vì dùng được biến JS trong CSS.

```jsx
import styled from 'styled-components';

// Tạo một component button có sẵn style
const MyButton = styled.button`
  background: ${props => props.primary ? "blue" : "gray"};
  color: white;
  padding: 10px;
`;

function App() {
  return <MyButton primary>Click me</MyButton>;
}
```

---

# 3. **TAILWIND CSS (NHANH NHẤT)**

Xu hướng hiện nay (2025). Không cần viết file CSS rời. Dùng class tiện ích có sẵn.

```jsx
function Card() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800">Tiêu đề</h2>
      <p className="text-gray-500">Nội dung ngắn gọn...</p>
    </div>
  );
}
```

- `p-4`: Padding 1rem.
- `bg-white`: Background white.
- `rounded-xl`: Bo tròn góc.
- `shadow-md`: Đổ bóng.

> [!TIP]
> Ban đầu nhìn Tailwind hơi rối, nhưng quen rồi sẽ thấy nó tăng tốc độ code lên gấp 3 lần vì không phải nghĩ tên class!

---

# 4. **TỔNG KẾT**

- **CSS Modules:** Tốt cho dự án nhỏ/vừa, thích viết CSS chuẩn.
- **Styled Components:** Tốt cho Design System, Theme động.
- **Tailwind CSS:** Tốt cho mọi dự án, đặc biệt là cần làm nhanh.

---

**Chương tiếp theo:** Đảm bảo code chạy đúng với Kiểm thử tự động (Testing).
