# 🟦 PART III - CHƯƠNG 11
# **COMPONENT LIBRARIES**

## 🎬 "Design Button Mất 2 Ngày vs Import Button Mất 2 Giây" — Component Libraries

*Minh tự viết DatePicker: 3 ngày, 500 dòng, 12 bugs. Linh import `@mui/material`: `<DatePicker />` — done. Chị Hà: "MUI (Google), Ant Design (Alibaba), shadcn/ui (Vercel) — hàng triệu giờ R&D, free. Đừng reinvent the wheel."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Biết các thư viện UI phổ biến nhất (MUI, Ant Design).
- Xu hướng mới: **Headless UI** và **Shadcn/ui**.

---

# 1. **MATERIAL UI (MUI)**

Thư viện số 1 thế giới React, dựa trên Google Material Design.
- **Ưu điểm:** Đầy đủ mọi thứ, document tốt.
- **Nhược điểm:** Nặng, style hơi khó sửa (override).

```jsx
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```

---

# 2. **ANT DESIGN (ANTD)**

Cực phổ biến ở châu Á và các hệ thống Admin (Dashboard).
- **Ưu điểm:** Component bảng biểu (Table), Form cực mạnh.
- **Nhược điểm:** File bundle lớn.

---

# 3. **SHADCN/UI (XU HƯỚNG MỚI)**

Không phải là một thư viện cài qua npm! Nó là tập hợp code mẫu dùng **Tailwind CSS** + **Radix UI**.
- **Cách dùng:** Copy code component về dán vào dự án của bạn (`src/components/ui/button.jsx`).
- **Ưu điểm:** Bạn sở hữu code -> Tùy chỉnh thoải mái 100%. Nhẹ.

> [!TIP]
> **Lời khuyên:** 
> - Làm dự án doanh nghiệp (Admin): Dùng **Ant Design**.
> - Làm dự án cần đẹp, sửa nhiều: Dùng **Shadcn/ui** hoặc **Tailwind**.

---

**Chương tiếp theo:** Điều hướng trang web mượt mà (React Router).
