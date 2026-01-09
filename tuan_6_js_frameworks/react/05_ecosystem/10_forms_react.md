# 🟦 PART III - CHƯƠNG 10
# **FORMS IN REACT**

Xử lý Form trong React ngày xưa là cơn ác mộng. Nhưng nay chúng ta đã có những cách tiếp cận thông minh hơn.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Phân biệt **Controlled** vs **Uncontrolled Components**.
- Xử lý Form đơn giản bằng thủ công (`useState`).
- Xử lý Form phức tạp bằng **React Hook Form**.

---

# 1. **CONTROLLED COMPONENTS (CÁCH TRUYỀN THỐNG)**

React kiểm soát hoàn toàn giá trị của input qua State.

```jsx
function SimpleForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />
      <button>Gửi</button>
    </form>
  );
}
```
*Nhược điểm: Gõ 1 ký tự -> Render lại cả form -> Chậm nếu form dài.*

---

# 2. **UNCONTROLLED COMPONENTS**

Để DOM tự quản lý giá trị. Dùng `useRef` để lấy giá trị khi cần. Giống HTML thuần.
*Ưu điểm: Nhanh, không render lại.*

---

# 3. **REACT HOOK FORM (THƯ VIỆN QUỐC DÂN)**

Kết hợp sự đơn giản của Uncontrolled với sức mạnh Validation. Đây là chuẩn mực hiện nay.

## Cài đặt
`npm install react-hook-form`

## Sử dụng
```jsx
import { useForm } from "react-hook-form";

function SmartForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Đăng ký input với hook form */}
      <input {...register("exampleRequired", { required: true })} />
      
      {/* Hiển thị lỗi nếu có */}
      {errors.exampleRequired && <span>Trường này bắt buộc nhập!</span>}

      <input type="submit" />
    </form>
  );
}
```

> [!TIP]
> **Tại sao nên dùng React Hook Form?**
> 1. Code ít hơn 50%.
> 2. Hiệu năng siêu cao (không render lại khi gõ).
> 3. Validation tích hợp sẵn cực mạnh.

---

# 4. **TỔNG KẾT**

- Với Form siêu nhỏ (1-2 ô): Dùng **Controlled (`useState`)**.
- Với Form thực tế (Đăng ký, Checkout): Dùng **React Hook Form**.

---

**Chương tiếp theo:** Làm đẹp giao diện nhanh chóng với thư viện UI (Material UI, AntD).
