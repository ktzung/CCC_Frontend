# 🟦 PART III - CHƯƠNG 11
# **COMPONENT LIBRARIES**

Tại sao phải đi design từng cái nút bấm, ô nhập liệu trong khi các kỹ sư Google/Alibaba đã làm sẵn cho bạn? Component Libraries giúp xây dựng giao diện chuẩn, đẹp cực nhanh.

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
