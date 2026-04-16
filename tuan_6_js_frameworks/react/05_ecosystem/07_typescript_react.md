# 🟦 PART III - CHƯƠNG 07
# **TYPE SAFETY WITH TYPESCRIPT**

## 🎬 "add(1, '2') = '12'" — Bug Ngớ Ngẩn Nhất Trong JS

*Minh deploy code lúc 23h. 3h sáng, sếp gọi: "Giỏ hàng tổng tiền 100₫ + 50₫ = '10050₫'!" JS nối string thay vì cộng số. TypeScript? Báo lỗi ĐỎ LÒM ngay khi gõ. "Tiết kiệm cho em 4 tiếng debug lúc 3h sáng."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu tại sao dự án lớn bắt buộc phải dùng **TypeScript**.
- Biết cách định nghĩa kiểu (**Interface/Type**) cho Props.
- Biết cách **Type** cho Hooks (`useState`, `useRef`).

---

# 1. **WHY TYPESCRIPT?**

JavaScript không biết kiểu dữ liệu cho đến khi chạy (Runtime).
```javascript
function add(a, b) {
  return a + b;
}
add(1, "2"); // Kết quả: "12" -> Sai logic nhưng không báo lỗi!
```

TypeScript báo lỗi ngay lúc code (Compile time):
```typescript
function add(a: number, b: number): number {
  return a + b;
}
add(1, "2"); // ❌ Báo lỗi đỏ lòm ngay lập tức!
```

> [!NOTE]
> React + TypeScript hiện là tiêu chuẩn ngành. Hãy học ngay hôm nay.

---

# 2. **TYPING PROPS (ĐỊNH NGHĨA KIỂU CHO PROPS)**

Dùng `interface` để "làm luật" cho Props.

```tsx
interface ButtonProps {
  label: string;
  count?: number; // Dấu ? nghĩa là không bắt buộc (Optional)
  onClick: () => void; // Hàm không trả về gì
  variant: 'primary' | 'secondary'; // Chỉ được nhận 1 trong 2 giá trị này
}

function Button({ label, count, onClick, variant }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {label} ({count ?? 0})
    </button>
  );
}
```

---

# 3. **TYPING HOOKS**

## 3.1. useState
TS thường tự đoán được kiểu. Nhưng đôi khi cần chỉ rõ.

```tsx
// TS tự hiểu là number
const [count, setCount] = useState(0); 

// Cần chỉ rõ vì ban đầu là null, sau này là User object
const [user, setUser] = useState<User | null>(null);
```

## 3.2. useRef
Thường dùng với phần tử HTML.

```tsx
const inputRef = useRef<HTMLInputElement>(null);

const focus = () => {
  // Dấu ? (Optional chaining) vì có thể null
  inputRef.current?.focus(); 
};
```

---

# 4. **TỔNG KẾT**

- TypeScript giúp bắt lỗi ngớ ngẩn ngay khi gõ code.
- Dùng **interface** để định nghĩa cấu trúc Props.
- Dùng Generic `<Type>` để định nghĩa kiểu cho Hooks.

---

**Chương tiếp theo:** Làm đẹp Component với các công cụ hiện đại (Tailwind, CSS-in-JS).
