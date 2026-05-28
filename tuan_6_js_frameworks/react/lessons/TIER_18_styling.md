# Tier 18 — Styling React (CSS Modules, Styled Components, Tailwind)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** 3 cách styling phổ biến trong React  
> **📋 Cần biết:** Tier 3 (Components), CSS cơ bản  
> **🚫 Không cần biết:** useEffect, Context

---

## 🎬 Opening Hook

*Minh viết component Button. Nhưng CSS `.button` ở file khác cũng có class `.button` → xung đột!*

*"CSS Modules: mỗi component có CSS riêng, không xung đột."*

---

## 🎯 Hôm nay bạn sẽ học

```
CSS Modules        — CSS scoped, không xung đột
Styled Components  — CSS-in-JS, style gắn liền component
Tailwind CSS       — Utility classes, viết nhanh
```

---

## 📝 Bài 18.1 — CSS Modules (12 phút)

### Scoped CSS

```css
/* Button.module.css */
.button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.primary {
    background-color: #156082;
    color: white;
}

.primary:hover {
    background-color: #0E2841;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button({ children, variant = 'primary' }) {
    return (
        <button className={`${styles.button} ${styles[variant]}`}>
            {children}
        </button>
    );
}
```

---

## 📝 Bài 18.2 — Styled Components (12 phút)

### CSS-in-JS

```jsx
import styled from 'styled-components';

const CardWrapper = styled.div`
    background: white;
    border-radius: 12px;
    padding: 24px;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-4px);
    }
`;

const CardTitle = styled.h3`
    font-size: 20px;
    color: #0E2841;
`;

// Dynamic props
const StatusBadge = styled.span`
    background-color: ${props => {
        switch (props.$status) {
            case 'success': return '#196B24';
            case 'error': return '#dc3545';
            default: return '#6c757d';
        }
    }};
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
`;

// Sử dụng
<CardWrapper>
    <CardTitle>Tiêu đề</CardTitle>
    <StatusBadge $status="success">Thành công</StatusBadge>
</CardWrapper>
```

---

## 📝 Bài 18.3 — Tailwind CSS (10 phút)

### Utility-first

```jsx
function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img src={product.image} alt={product.name}
                className="w-full h-48 object-cover" />
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                </h3>
                <span className="text-2xl font-bold text-orange-500">
                    {product.price.toLocaleString()}₫
                </span>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-3">
                    🛒 Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}
```

---

## 📊 So sánh 3 cách

```
Cách                Ưu điểm                    Nhược điểm
────                ───────                    ──────────
CSS Modules         Scoped, quen thuộc          Phải tạo file .module.css
Styled Components   Dynamic, component-based    Bundle size lớn hơn
Tailwind            Nhanh, responsive           Class dài, học utility
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 3:** Components — style cho component
- **Sẽ cần trong Tier 19:** React Router — styling NavLink active state
- **Tham khảo thêm:** `05_ecosystem/08_styling_react.md` (file cũ)
