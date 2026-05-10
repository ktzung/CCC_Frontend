# Styling React Components
## CSS Modules, Styled Components, Tailwind CSS

---

## 🎬 Mở đầu: Bạn mặc gì hôm nay?

> *"Giống như quần áo thể hiện phong cách cá nhân, CSS thể hiện 'phong cách' của mỗi component trong ứng dụng React."*

```
┌──────────────────────────────────────────────────────────────┐
│                    3 PHONG CÁCH STYLING                       │
│                                                              │
│   CSS Modules    = Quần áo may đo riêng 🧵                  │
│   Styled Components = Tattoo trên da 🔥                      │
│   Tailwind CSS   = Mix-and-match từ tủ đồ có sẵn 👕👖👟     │
│                                                              │
│   ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│   │ .button {  │  │ const Btn  │  │ <button    │            │
│   │   color:   │  │  = styled. │  │  className │            │
│   │   red;     │  │  button`   │  │  ="bg-blue │            │
│   │ }          │  │  color:    │  │  -500">    │            │
│   │            │  │  red;`     │  │            │            │
│   └────────────┘  └────────────┘  └────────────┘            │
│     Module CSS      JS-in-CSS        Utility CSS            │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Tại sao styling trong React khác biệt?

**Vấn đề lớn nhất của CSS truyền thống: TOÀN CỤC** 🌍

```css
/* 😱 File style.css */
.button {
  background: blue;
  color: white;
}

/* 😱 File khác cũng có .button */
.button {
  background: red;  /* GHI ĐÈ! Component nào cũng bị ảnh hưởng */
}
```

> 🧵 **CSS Modules = Quần áo may đo riêng** — mỗi component có CSS riêng, không đụng hàng ai.
>
> Bạn mặc áo size M màu xanh, tôi mặc áo size L màu đỏ — không ai ảnh hưởng ai!

| Phương pháp | Scope | Performance | Dễ dùng | Phù hợp với |
|---|---|---|---|---|
| **CSS Modules** | ✅ Local | ✅ Nhanh | ⭐⭐⭐⭐ | Project vừa, team mới |
| **Styled Components** | ✅ Local | ⚠️ Runtime | ⭐⭐⭐ | Component library, theme |
| **Tailwind CSS** | ✅ Utility | ✅ Nhanh | ⭐⭐⭐⭐⭐ | Prototype, startup, mọi cỡ |

---

## 🌐 Bức tranh lớn: Evolution của CSS trong React

```
CSS Evolution trong React:
══════════════════════════════════════════════════════════════

2013: CSS thông thường ──→ 😱 Global scope, conflicts
        │
        ▼
2015: CSS Modules ──────→ 🎉 Local scope, file-based
        │
        ▼
2016: Styled Components → 🔥 CSS-in-JS, dynamic styles
        │
        ▼
2020: Tailwind CSS ─────→ ⚡ Utility-first, no custom CSS
        │
        ▼
2024: All coexist ──────→ 🎯 Pick the right tool for the job

══════════════════════════════════════════════════════════════
```

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. CSS Modules — Quần áo may đo riêng 🧵

```
Cách hoạt động:
┌───────────────────────────────────────────────┐
│                                               │
│  Button.module.css                            │
│  ┌─────────────────┐                         │
│  │ .button {       │    Becomes               │
│  │   color: red;   │ ──────────→  .button_abc123 { color: red; }
│  │ }               │                         │
│  └─────────────────┘                         │
│                                               │
│  React tự động tạo class name ĐỘC NHẤT       │
│  → Không bao giờ trùng với component khác!   │
└───────────────────────────────────────────────┘
```

```css
/* ============================
   Button.module.css
   ============================ */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #156082;
  color: white;
}

.primary:hover {
  background-color: #0E2841;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 96, 130, 0.3);
}

.secondary {
  background-color: transparent;
  color: #156082;
  border: 2px solid #156082;
}

.danger {
  background-color: #dc3545;
  color: white;
}

/* Responsive — viết media query bình thường */
@media (max-width: 768px) {
  .button {
    padding: 10px 16px;
    font-size: 14px;
  }
}
```

```jsx
// ============================
// Button.jsx — Sử dụng CSS Module
// ============================
import styles from './Button.module.css';

function Button({ children, variant = 'primary', onClick }) {
  // 💡 styles là object — dùng [] hoặc .notation
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// ✅ Sử dụng
<Button variant="primary">Lưu thay đổi</Button>
<Button variant="danger">Xóa</Button>
<Button variant="secondary">Hủy</Button>

// Render ra HTML:
// <button class="Button_button__abc123 Button_primary__def456">
//   Lưu thay đổi
// </button>
```

### 2. Styled Components — Tattoo trên da 🔥

> 🔥 **Analogy**: Styled Components giống như **tattoo** — style gắn liền với component, không thể tách rời. Mỗi component "mang" style của chính nó.

```jsx
// ============================
// CÀI ĐẶT
// npm install styled-components
// ============================
import styled, { keyframes } from 'styled-components';

// ============================
// TẠO COMPONENT CÓ STYLE
// ============================

// 📝 Styled component cơ bản
const CardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #0E2841;
  margin-bottom: 8px;
`;

const CardPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #E97132;
`;

// 📝 Props-based styling — thay đổi style dựa trên prop
const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  background-color: ${(props) => {
    switch (props.$status) {
      case 'success': return '#196B24';
      case 'warning': return '#E97132';
      case 'error':   return '#dc3545';
      default:        return '#6c757d';
    }
  }};

  color: white;
`;

// 📝 Kế thừa component
const PrimaryButton = styled.button`
  padding: 12px 24px;
  background: #156082;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const LargeButton = styled(PrimaryButton)`
  padding: 16px 32px;
  font-size: 18px;
`;

// 📝 Animation
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #156082;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// ✅ Sử dụng
function SanPhamCard({ sanPham }) {
  return (
    <CardWrapper>
      <CardTitle>{sanPham.ten}</CardTitle>
      <CardPrice>{sanPham.gia.toLocaleString()}đ</CardPrice>
      <StatusBadge $status={sanPham.conHang ? 'success' : 'error'}>
        {sanPham.conHang ? 'Còn hàng' : 'Hết hàng'}
      </StatusBadge>
      <PrimaryButton>Mua ngay</PrimaryButton>
    </CardWrapper>
  );
}
```

### 3. Tailwind CSS — Mix-and-match từ tủ đồ 👕👖👟

> 👕 **Analogy**: Tailwind giống như **tủ quần áo có sẵn** — bạn không may đồ mới, mà kết hợp các món có sẵn: áo xanh + quần jean + giày trắng = outfit đẹp!

```
Tailwind Workflow:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Thay vì viết CSS:              Viết utility class:    │
│                                                         │
│  .btn {                         <button class="         │
│    padding: 12px 24px;           px-6 py-3              │
│    background: blue;             bg-blue-500            │
│    color: white;                 text-white             │
│    border-radius: 8px;           rounded-lg             │
│    font-weight: bold;            font-bold              │
│  }                               hover:bg-blue-700      │
│                                  transition">           │
│                                                         │
│  📝 Viết ít hơn, ship nhanh hơn!                      │
└─────────────────────────────────────────────────────────┘
```

```jsx
// ============================
// CÀI ĐẶT TAILWIND TRONG REACT
// npx create-react-app my-app --template tailwind
// HOẶC: npm install -D tailwindcss postcss autoprefixer
// ============================

// ============================
// CÁC UTILITY CLASS PHỔ BIẾN
// ============================

// 📝 Layout
<div className="flex items-center justify-between gap-4">
  <span>Trái</span>
  <span>Phải</span>
</div>

// 📝 Grid
<div className="grid grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

// 📝 Responsive — mobile-first
<div className="
  w-full              /* mobile: full width */
  md:w-1/2            /* tablet: half */
  lg:w-1/3            /* desktop: one-third */
  p-4 md:p-6 lg:p-8   /* padding tăng dần */
">
  Responsive content
</div>

// 📝 Typography
<h1 className="text-3xl font-bold text-gray-900">Tiêu đề lớn</h1>
<p className="text-base text-gray-600 leading-relaxed">Nội dung thường</p>
<small className="text-sm text-gray-400">Ghi chú nhỏ</small>

// 📝 Colors — theo design system
<button className="
  bg-[#156082]         /* custom color */
  hover:bg-[#0E2841]
  text-white
  py-3 px-6
  rounded-lg
  shadow-md
  transition-all
  duration-200
">
  Nút bấm
</button>

// 📝 States & Transitions
<button className="
  bg-blue-500
  hover:bg-blue-700       /* hover */
  active:bg-blue-900      /* click */
  focus:ring-2 focus:ring-blue-300  /* focus */
  disabled:bg-gray-300    /* disabled */
  transition-colors
  duration-150
">
  Nút có nhiều trạng thái
</button>
```

### Component đầy đủ với Tailwind

```jsx
// ============================
// CARD COMPONENT VỚI TAILWIND
// ============================
function ProductCard({ product }) {
  return (
    <div className="
      bg-white
      rounded-2xl
      shadow-lg
      overflow-hidden
      transition-transform
      duration-300
      hover:scale-105
      hover:shadow-xl
    ">
      {/* Ảnh sản phẩm */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <span className="
            absolute top-3 right-3
            bg-red-500 text-white
            text-xs font-bold
            px-2 py-1 rounded-full
          ">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Nội dung */}
      <div className="p-5">
        <h3 className="
          text-lg font-semibold
          text-gray-900
          mb-2
          line-clamp-2
        ">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-orange-500">
            {product.price.toLocaleString()}đ
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}đ
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-4">
          {/* Stars */}
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>

        <button className="
          w-full py-3
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          rounded-lg
          transition-colors
          duration-200
        ">
          🛒 Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
```

---

## 🏭 Lớp thực tế: Khi nào dùng cái nào?

```
┌─────────────────────────────────────────────────────────────┐
│                  QUYẾT ĐỊNH LỰA CHỌN                        │
│                                                             │
│  Bắt đầu dự án mới?                                        │
│       │                                                     │
│       ├── Prototype nhanh? ──────→ Tailwind CSS ⚡          │
│       │                                                     │
│       ├── Component library? ────→ Styled Components 🔥     │
│       │                                                     │
│       ├── Team mới? ────────────→ CSS Modules 🧵           │
│       │                                                     │
│       └── Existing project? ────→ Giữ nguyên + migrate dần │
│                                                             │
│  💡 Không có câu trả lời sai — chỉ có câu trả lời phù hợp │
└─────────────────────────────────────────────────────────────┘
```

### Theme toàn cục với mỗi phương pháp

```css
/* ============================
   CSS MODULES: Dùng CSS Variables
   ============================ */
/* globals.css */
:root {
  --color-primary: #156082;
  --color-secondary: #E97132;
  --color-surface: #ffffff;
  --color-text: #0E2841;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
}

/* Dùng trong module.css */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
}
```

```jsx
// ============================
// STYLED COMPONENTS: ThemeProvider
// ============================
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#156082',
    secondary: '#E97132',
    surface: '#ffffff',
    text: '#0E2841',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};

// Trong App.jsx
function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyApp />
    </ThemeProvider>
  );
}

// Sử dụng theme trong styled component
const ThemedButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;
```

```jsx
// ============================
// TAILWIND: tailwind.config.js
// ============================
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#156082',
        'primary-dark': '#0E2841',
        accent: '#E97132',
        success: '#196B24',
      },
      fontFamily: {
        display: ['Aptos Display', 'sans-serif'],
        body: ['Aptos', 'sans-serif'],
        code: ['Consolas', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
};

// Sử dụng trong JSX
<button className="bg-primary hover:bg-primary-dark text-white">
  Nút bấm
</button>
```

---

## 🛠️ Bài tập thực hành

### Bài tập 1: Tạo Card component bằng cả 3 cách

```jsx
// 🎯 Yêu cầu: Tạo UserInfoCard hiển thị avatar, tên, email, role
// Viết bằng: (a) CSS Modules, (b) Styled Components, (c) Tailwind

// Template:
interface User {
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'moderator';
}

// (a) CSS Modules — UserInfoCard.module.css + UserInfoCard.jsx
// (b) Styled Components — viết trong cùng file
// (c) Tailwind — className-based
```

### Bài tập 2: Responsive Navbar

```jsx
// 🎯 Yêu cầu: Navbar responsive với hamburger menu trên mobile
// - Logo bên trái
// - Nav links ở giữa (ẩn trên mobile)
// - User avatar bên phải
// - Hamburger menu hiện trên mobile

// Chọn 1 trong 3 phương pháp và hoàn thành
```

---

## ❌ Sai lầm thường gặp

| # | Sai lầm | Đúng | Giải thích |
|---|---------|------|------------|
| 1 | Import CSS thường → global | Import CSS Module → scoped | Tránh xung đột tên class |
| 2 | Styled component render lại quá nhiều | Dùng `shouldForwardProp` hoặc memo | Styled component tạo class mới mỗi render |
| 3 | Tailwind: viết quá dài className | Tách thành component hoặc dùng `@apply` | Giữ JSX sạch sẽ |
| 4 | Không dùng responsive prefixes | Luôn thêm `sm:`, `md:`, `lg:` | Mobile-first design |
| 5 | Inline styles cho mọi thứ | Chỉ dùng inline cho dynamic values | Inline không hỗ trợ pseudo-class |

### 🐛 Troubleshooting

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| CSS Module không áp dụng | Import sai: `import styles from './file.css'` | Đảm bảo `.module.css` extension |
| Styled component không nhận prop | Dùng `$` prefix cho transient props | `styled.div<{ $active: boolean }>` |
| Tailwind classes không hoạt động | Thiếu content config | Kiểm tra `tailwind.config.js` → `content` |
| Styles bị override | Specificity quá thấp | Dùng `!important` (tránh) hoặc tăng specificity |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

```
┌────────────────────────────────────────────────────────────┐
│                   KIỂM TRA NHANH                           │
│                                                            │
│  1. CSS Modules tạo unique class name như thế nào?         │
│  2. Khi nào dùng styled-components thay vì CSS Modules?   │
│  3. Tailwind responsive prefixes là gì?                    │
│  4. Cách truyền theme cho styled-components?               │
│  5. Tại sao không nên dùng inline styles cho mọi thứ?     │
│                                                            │
│  Trả lời được 4/5 → Bạn sẵn sàng cho bài tiếp! ✅        │
└────────────────────────────────────────────────────────────┘
```

---

## 📌 Tóm tắt bài học

```
┌──────────────────────────────────────────────────────────────┐
│                   STYLING TRONG REACT                         │
│                                                              │
│  🧵 CSS Modules                                              │
│     • File .module.css → class name tự động unique           │
│     • Phù hợp: team mới, project vừa                        │
│     • Theme: CSS Variables                                   │
│                                                              │
│  🔥 Styled Components                                        │
│     • CSS-in-JS, props-based styling                         │
│     • Phù hợp: component library, theme động                │
│     • Theme: ThemeProvider                                   │
│                                                              │
│  ⚡ Tailwind CSS                                              │
│     • Utility-first, không viết custom CSS                   │
│     • Phù hợp: prototype, startup, mọi cỡ project           │
│     • Theme: tailwind.config.js                              │
│                                                              │
│  💡 Không có cách nào "tốt nhất" — chọn cách PHÙ HỢP!      │
└──────────────────────────────────────────────────────────────┘
```

---

## ➡️ Bài tiếp theo: Forms trong React

> Trong bài sau, bạn sẽ học cách **xử lý form trong React** — từ controlled components (người ghi chép cẩn thận) đến React Hook Form (trợ lý AI tự xử lý validation). Form là phần khó nhất nhưng quan trọng nhất trong mọi ứng dụng web! 📝
