# Forms trong React
## Controlled, Uncontrolled, React Hook Form

---

## 🎬 Mở đầu: Ai đang kiểm soát form?

> *"Khi bạn điền form đăng ký, ai đang 'ghi chép' lại từng chữ bạn gõ?"*

```
┌──────────────────────────────────────────────────────────────┐
│               3 CÁCH XỬ LÝ FORM TRONG REACT                 │
│                                                              │
│  Controlled = Người ghi chép CẨN THẬT 📝                   │
│  │  Mỗi chữ bạn gõ → ghi ngay vào sổ → cập nhật hiển thị   │
│  │  React là "người ghi chép" — mọi thứ đều qua state       │
│  │                                                           │
│  Uncontrolled = Buông thả 🎒                                │
│  │  Bạn tự ghi tự nhiên → chỉ đọc khi nộp bài              │
│  │  DOM tự quản lý → React chỉ đọc khi cần                 │
│  │                                                           │
│  React Hook Form = Trợ lý AI 🤖                             │
│     Tự động ghi chép, tự kiểm tra lỗi, tự cập nhật          │
│     Performance tối ưu, ít code hơn                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Tại sao Form khó trong React?

**React có triết lý "state-driven UI"** — UI là hàm của state.

Nhưng HTML form lại có **state nội tại** (input tự nhớ giá trị). Hai triết lý này XUNG ĐỘT!

```
┌───────────────────────────────────────────────────────────┐
│                    XUNG ĐỘT TRIẾT LÝ                      │
│                                                           │
│  React:  UI = f(state)     "Tôi quyết định mọi thứ!"     │
│  HTML:   input remembers   "Tôi tự nhớ giá trị!"         │
│                                                           │
│  Controlled:  React thắng  → "Tôi kiểm soát hết" 📝      │
│  Uncontrolled: HTML thắng  → "Để tôi tự lo" 🎒          │
│  RHF:        AI thắng     → "Để tôi lo cho cả hai" 🤖   │
└───────────────────────────────────────────────────────────┘
```

| Khía cạnh | Controlled | Uncontrolled | React Hook Form |
|---|---|---|---|
| **State quản lý bởi** | React (useState) | DOM (ref) | RHF (register) |
| **Lấy giá trị** | state.value | ref.current.value | handleSubmit(data) |
| **Validation** | Tự viết | Tự viết | Built-in + schema |
| **Performance** | Re-render mỗi keystroke | Không re-render | Tối thiểu re-render |
| **Code lượng** | Nhiều | Ít | Rất ít |
| **Phù hợp với** | Form đơn giản | File upload, form legacy | Form phức tạp, production |

---

## 🌐 Bức tranh lớn: Flow xử lý Form

```
User gõ phím → Event onChange → Cập nhật State → Re-render UI
                     │
                     ▼
              ┌──────────────┐
              │  CONTROLLED  │  Mỗi keystroke = 1 cycle
              │   COMPONENT  │  React kiểm soát 100%
              └──────────────┘

═══════════════════════════════════════════════════════════

User gõ phím → DOM tự cập nhật → Khi submit → Đọc ref
                     │
                     ▼
              ┌──────────────┐
              │ UNCONTROLLED │  Không re-render
              │   COMPONENT  │  DOM tự quản lý
              └──────────────┘

═══════════════════════════════════════════════════════════

User gõ phím → RHF register → Internal state → handleSubmit
                     │
                     ▼
              ┌──────────────┐
              │    REACT     │  Smart validation
              │  HOOK FORM   │  Minimal re-render
              └──────────────┘
```

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. Controlled Components — Người ghi chép cẩn thận 📝

> 📝 **Analogy**: Controlled component giống như **người thư ký riêng** — mỗi chữ bạn gõ đều được ghi chép cẩn thận vào sổ tay (state), và màn hình luôn hiển thị đúng những gì trong sổ.

```jsx
// ============================
// FORM ĐĂNG NHẬP — CONTROLLED
// ============================
import { useState } from 'react';

function DangNhapForm() {
  // 📝 State lưu giá trị — "sổ tay" của thư ký
  const [formData, setFormData] = useState({
    email: '',
    matKhau: '',
  });
  const [errors, setErrors] = useState({});
  const [dangGui, setDangGui] = useState(false);

  // 📝 Xử lý thay đổi — "ghi chép" mỗi khi gõ
  const xuLyThayDoi = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Xóa lỗi khi user bắt đầu sửa
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // 📝 Validate — "kiểm tra sổ tay trước khi nộp"
  const validate = () => {
    const loiMoi = {};

    if (!formData.email) {
      loiMoi.email = '📧 Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      loiMoi.email = '📧 Email không hợp lệ';
    }

    if (!formData.matKhau) {
      loiMoi.matKhau = '🔒 Mật khẩu không được để trống';
    } else if (formData.matKhau.length < 6) {
      loiMoi.matKhau = '🔒 Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(loiMoi);
    return Object.keys(loiMoi).length === 0;
  };

  // 📝 Submit — "nộp bài"
  const xuLyGui = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setDangGui(true);
    try {
      const response = await fetch('/api/dang-nhap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Đăng nhập thành công:', data);
    } catch (error) {
      setErrors({ general: '❌ Đăng nhập thất bại' });
    } finally {
      setDangGui(false);
    }
  };

  return (
    <form onSubmit={xuLyGui} className="dang-nhap-form">
      <h2>🔐 Đăng nhập</h2>

      {/* Email field */}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={xuLyThayDoi}
          className={errors.email ? 'error' : ''}
          placeholder="example@email.com"
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      {/* Password field */}
      <div className="form-group">
        <label htmlFor="matKhau">Mật khẩu</label>
        <input
          id="matKhau"
          name="matKhau"
          type="password"
          value={formData.matKhau}
          onChange={xuLyThayDoi}
          className={errors.matKhau ? 'error' : ''}
          placeholder="Ít nhất 6 ký tự"
        />
        {errors.matKhau && <span className="error-msg">{errors.matKhau}</span>}
      </div>

      {errors.general && <div className="error-banner">{errors.general}</div>}

      <button type="submit" disabled={dangGui}>
        {dangGui ? '⏳ Đang đăng nhập...' : '🚀 Đăng nhập'}
      </button>
    </form>
  );
}
```

### Form nâng cao: Nhiều trường hơn

```jsx
// ============================
// FORM ĐĂNG KÝ — NHIỀU FIELD
// ============================
function DangKyForm() {
  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    matKhau: '',
    xacNhanMatKhau: '',
    soDienThoai: '',
    ngaySinh: '',
    gioiTinh: '',
    thanhPho: '',
    dongYDieuKhoan: false,
    nhanEmail: true,
  });

  // 📝 Generic handler cho text inputs
  const xuLyThayDoi = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 📝 Handler riêng cho select
  const xuLyChonThanhPho = (e) => {
    setFormData((prev) => ({
      ...prev,
      thanhPho: e.target.value,
    }));
  };

  return (
    <form className="dang-ky-form">
      {/* Text input */}
      <div className="form-group">
        <label>Họ và tên *</label>
        <input
          name="hoTen"
          value={formData.hoTen}
          onChange={xuLyThayDoi}
          placeholder="Nguyễn Văn Minh"
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email *</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={xuLyThayDoi}
          placeholder="minh@example.com"
        />
      </div>

      {/* Password */}
      <div className="form-group">
        <label>Mật khẩu *</label>
        <input
          name="matKhau"
          type="password"
          value={formData.matKhau}
          onChange={xuLyThayDoi}
        />
      </div>

      {/* Confirm password */}
      <div className="form-group">
        <label>Xác nhận mật khẩu *</label>
        <input
          name="xacNhanMatKhau"
          type="password"
          value={formData.xacNhanMatKhau}
          onChange={xuLyThayDoi}
        />
      </div>

      {/* Phone */}
      <div className="form-group">
        <label>Số điện thoại</label>
        <input
          name="soDienThoai"
          type="tel"
          value={formData.soDienThoai}
          onChange={xuLyThayDoi}
          placeholder="0912345678"
        />
      </div>

      {/* Date */}
      <div className="form-group">
        <label>Ngày sinh</label>
        <input
          name="ngaySinh"
          type="date"
          value={formData.ngaySinh}
          onChange={xuLyThayDoi}
        />
      </div>

      {/* Radio buttons */}
      <div className="form-group">
        <label>Giới tính</label>
        <div className="radio-group">
          {['nam', 'nu', 'khac'].map((gt) => (
            <label key={gt} className="radio-label">
              <input
                type="radio"
                name="gioiTinh"
                value={gt}
                checked={formData.gioiTinh === gt}
                onChange={xuLyThayDoi}
              />
              {gt === 'nam' ? 'Nam' : gt === 'nu' ? 'Nữ' : 'Khác'}
            </label>
          ))}
        </div>
      </div>

      {/* Select */}
      <div className="form-group">
        <label>Thành phố</label>
        <select
          name="thanhPho"
          value={formData.thanhPho}
          onChange={xuLyChonThanhPho}
        >
          <option value="">-- Chọn thành phố --</option>
          <option value="hanoi">Hà Nội</option>
          <option value="hcm">TP. Hồ Chí Minh</option>
          <option value="danang">Đà Nẵng</option>
          <option value="haiphong">Hải Phòng</option>
        </select>
      </div>

      {/* Textarea */}
      <div className="form-group">
        <label>Giới thiệu bản thân</label>
        <textarea
          name="gioiThieu"
          value={formData.gioiThieu || ''}
          onChange={xuLyThayDoi}
          rows={4}
          placeholder="Viết vài dòng về bạn..."
        />
      </div>

      {/* Checkboxes */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="dongYDieuKhoan"
            checked={formData.dongYDieuKhoan}
            onChange={xuLyThayDoi}
          />
          Tôi đồng ý với điều khoản sử dụng *
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="nhanEmail"
            checked={formData.nhanEmail}
            onChange={xuLyThayDoi}
          />
          Nhận thông báo qua email
        </label>
      </div>

      <button type="submit">📝 Đăng ký</button>
    </form>
  );
}
```

### 2. Uncontrolled Components — Buông thả 🎒

> 🎒 **Analogy**: Uncontrolled giống như **để con tự làm bài tập** — bạn không ngồi cạnh ghi chép từng nét bút. Khi con nộp bài, bạn mới đọc kết quả.

```jsx
// ============================
// UNCONTROLLED COMPONENT — Dùng useRef
// ============================
import { useRef } from 'react';

function TimKiemNhanh() {
  const inputRef = useRef(null);

  const xuLyTimKiem = (e) => {
    e.preventDefault();
    // 📝 Chỉ đọc giá trị khi CẦN — không phải mỗi keystroke
    const tuKhoa = inputRef.current.value;
    console.log('Tìm kiếm:', tuKhoa);
    // Call API...
  };

  return (
    <form onSubmit={xuLyTimKiem}>
      <input
        ref={inputRef}
        type="text"
        placeholder="🔍 Nhập từ khóa..."
        defaultValue=""  // 📝 defaultValue, KHÔNG phải value
      />
      <button type="submit">Tìm</button>
    </form>
  );
}

// ============================
// UNCONTROLLED CHO FILE UPLOAD
// ============================
function UploadAnh() {
  const fileInputRef = useRef(null);

  const xuLyUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (file) {
      console.log('File:', file.name, file.size, file.type);
      // Upload to server...
    }
  };

  return (
    <form onSubmit={xuLyUpload}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={false}
      />
      <button type="submit">📤 Upload</button>
    </form>
  );
}

// ============================
// UNCONTROLLED FORM ĐẦY ĐỦ
// ============================
function PhanHoiForm() {
  const formRef = useRef(null);

  const xuLyGui = (e) => {
    e.preventDefault();
    // 📝 Đọc TẤT CẢ giá trị từ form cùng lúc
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log('Dữ liệu form:', data);
    // { ten: "...", email: "...", noiDung: "..." }
  };

  return (
    <form ref={formRef} onSubmit={xuLyGui}>
      <input name="ten" placeholder="Tên của bạn" defaultValue="" />
      <input name="email" type="email" placeholder="Email" defaultValue="" />
      <textarea name="noiDung" placeholder="Nội dung phản hồi" defaultValue="" />
      <button type="submit">📨 Gửi phản hồi</button>
    </form>
  );
}
```

### 3. React Hook Form — Trợ lý AI 🤖

> 🤖 **Analogy**: React Hook Form giống như **trợ lý AI** — tự động ghi chép, tự kiểm tra lỗi, tự cập nhật, và chỉ "thức dậy" khi cần (không re-render mỗi keystroke).

```
Traditional Controlled Form:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Keystroke → setState → Re-render → DOM update             │
│  Keystroke → setState → Re-render → DOM update             │
│  Keystroke → setState → Re-render → DOM update             │
│  (100 keystrokes = 100 re-renders! 😱)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

React Hook Form:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Keystroke → Internal state (no re-render)                 │
│  Keystroke → Internal state (no re-render)                 │
│  Keystroke → Internal state (no re-render)                 │
│  Submit → handleSubmit → Re-render (1 time! ✅)            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```jsx
// ============================
// CÀI ĐẶT
// npm install react-hook-form
// ============================
import { useForm } from 'react-hook-form';

// ============================
// FORM ĐĂNG NHẬP VỚI RHF
// ============================
function DangNhapRHF() {
  const {
    register,       // 📝 Đăng ký input
    handleSubmit,   // 📝 Xử lý submit
    formState: { errors, isSubmitting }, // 📝 Trạng thái form
    watch,          // 📝 Theo dõi giá trị real-time
    reset,          // 📝 Reset form
    setValue,        // 📝 Đặt giá trị programmatically
  } = useForm({
    defaultValues: {
      email: '',
      matKhau: '',
    },
  });

  // 📝 Submit handler — chỉ chạy khi validation pass
  const onSubmit = async (data) => {
    console.log('Dữ liệu hợp lệ:', data);
    // { email: "minh@example.com", matKhau: "123456" }
    try {
      const res = await fetch('/api/dang-nhap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Đăng nhập thất bại');
      reset(); // Reset form sau khi thành công
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>🔐 Đăng nhập (React Hook Form)</h2>

      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input
          {...register('email', {
            required: '📧 Email không được để trống',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '📧 Email không hợp lệ',
            },
          })}
          type="email"
          placeholder="example@email.com"
        />
        {errors.email && (
          <span className="error-msg">{errors.email.message}</span>
        )}
      </div>

      {/* Mật khẩu */}
      <div className="form-group">
        <label>Mật khẩu</label>
        <input
          {...register('matKhau', {
            required: '🔒 Mật khẩu không được để trống',
            minLength: {
              value: 6,
              message: '🔒 Mật khẩu phải có ít nhất 6 ký tự',
            },
          })}
          type="password"
          placeholder="Ít nhất 6 ký tự"
        />
        {errors.matKhau && (
          <span className="error-msg">{errors.matKhau.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '⏳ Đang đăng nhập...' : '🚀 Đăng nhập'}
      </button>
    </form>
  );
}
```

### Form phức tạp với RHF + Yup validation

```jsx
// ============================
// npm install @hookform/resolvers yup
// ============================
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 📝 Schema validation với Yup — "luật chơi" rõ ràng
const schema = yup.object({
  hoTen: yup
    .string()
    .required('Họ tên không được để trống')
    .min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không hợp lệ'),
  matKhau: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .matches(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
    .matches(/[0-9]/, 'Phải có ít nhất 1 số')
    .matches(/[^A-Za-z0-9]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
  xacNhanMatKhau: yup
    .string()
    .required('Xác nhận mật khẩu')
    .oneOf([yup.ref('matKhau')], 'Mật khẩu không khớp'),
  tuoi: yup
    .number()
    .typeError('Tuổi phải là số')
    .min(16, 'Phải từ 16 tuổi trở lên')
    .max(100, 'Tuổi không hợp lệ'),
  website: yup
    .string()
    .url('URL không hợp lệ')
    .notRequired(),
  vaiTro: yup
    .string()
    .oneOf(['admin', 'user', 'mod'], 'Vai trò không hợp lệ')
    .required('Chọn vai trò'),
  dieuKhoan: yup
    .boolean()
    .oneOf([true], 'Phải đồng ý điều khoản'),
});

function DangKyNangCao() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),  // 📝 Kết nối Yup schema
    mode: 'onChange',                // Validate mỗi khi thay đổi
    defaultValues: {
      hoTen: '',
      email: '',
      matKhau: '',
      xacNhanMatKhau: '',
      tuoi: '',
      website: '',
      vaiTro: 'user',
      dieuKhoan: false,
    },
  });

  // 📝 Watch real-time — preview password strength
  const matKhau = watch('matKhau');
  const matKhauStrength = matKhau
    ? matKhau.length >= 12 ? 'Mạnh 💪'
      : matKhau.length >= 8 ? 'Trung bình 👍'
      : 'Yếu 😟'
    : '';

  const onSubmit = async (data) => {
    console.log('✅ Form hợp lệ:', data);
    // API call...
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dang-ky-form">
      <h2>📝 Đăng ký tài khoản</h2>

      {/* Họ tên */}
      <div className="form-group">
        <label>Họ và tên *</label>
        <input {...register('hoTen')} placeholder="Nguyễn Văn Minh" />
        {errors.hoTen && <span className="error-msg">{errors.hoTen.message}</span>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email *</label>
        <input {...register('email')} type="email" placeholder="minh@example.com" />
        {errors.email && <span className="error-msg">{errors.email.message}</span>}
      </div>

      {/* Mật khẩu */}
      <div className="form-group">
        <label>Mật khẩu *</label>
        <input {...register('matKhau')} type="password" placeholder="Ít nhất 8 ký tự" />
        {matKhau && <span className="strength-indicator">{matKhauStrength}</span>}
        {errors.matKhau && <span className="error-msg">{errors.matKhau.message}</span>}
      </div>

      {/* Xác nhận mật khẩu */}
      <div className="form-group">
        <label>Xác nhận mật khẩu *</label>
        <input {...register('xacNhanMatKhau')} type="password" />
        {errors.xacNhanMatKhau && (
          <span className="error-msg">{errors.xacNhanMatKhau.message}</span>
        )}
      </div>

      {/* Tuổi */}
      <div className="form-group">
        <label>Tuổi *</label>
        <input {...register('tuoi')} type="number" min="16" max="100" />
        {errors.tuoi && <span className="error-msg">{errors.tuoi.message}</span>}
      </div>

      {/* Website (optional) */}
      <div className="form-group">
        <label>Website</label>
        <input {...register('website')} type="url" placeholder="https://..." />
        {errors.website && <span className="error-msg">{errors.website.message}</span>}
      </div>

      {/* Vai trò */}
      <div className="form-group">
        <label>Vai trò *</label>
        <select {...register('vaiTro')}>
          <option value="user">👤 User</option>
          <option value="mod">🛡️ Moderator</option>
          <option value="admin">👑 Admin</option>
        </select>
        {errors.vaiTro && <span className="error-msg">{errors.vaiTro.message}</span>}
      </div>

      {/* Điều khoản */}
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" {...register('dieuKhoan')} />
          Tôi đồng ý với điều khoản sử dụng *
        </label>
        {errors.dieuKhoan && (
          <span className="error-msg">{errors.dieuKhoan.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? '⏳ Đang đăng ký...' : '🚀 Đăng ký'}
      </button>

      <button type="button" onClick={() => reset()}>
        🔄 Reset form
      </button>
    </form>
  );
}
```

### useFieldArray — Dynamic Form Fields

```jsx
// ============================
// FORM VỚI DANH SÁCH ĐỘNG
// ============================
import { useForm, useFieldArray } from 'react-hook-form';

function DonHangForm() {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      khachHang: '',
      sanPhams: [
        { ten: '', soLuong: 1, donGia: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sanPhams',
  });

  // 📝 Tính tổng tiền real-time
  const sanPhams = watch('sanPhams');
  const tongTien = sanPhams.reduce(
    (sum, sp) => sum + (sp.soLuong * sp.donGia), 0
  );

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <h2>🛒 Đơn hàng</h2>

      <input
        {...register('khachHang', { required: true })}
        placeholder="Tên khách hàng"
      />

      <h3>Sản phẩm:</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="san-pham-row">
          <input
            {...register(`sanPhams.${index}.ten`, { required: true })}
            placeholder="Tên sản phẩm"
          />
          <input
            {...register(`sanPhams.${index}.soLuong`, { valueAsNumber: true })}
            type="number"
            min="1"
            placeholder="SL"
          />
          <input
            {...register(`sanPhams.${index}.donGia`, { valueAsNumber: true })}
            type="number"
            min="0"
            placeholder="Đơn giá"
          />
          <button type="button" onClick={() => remove(index)}>
            🗑️ Xóa
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ ten: '', soLuong: 1, donGia: 0 })}
      >
        ➕ Thêm sản phẩm
      </button>

      <div className="tong-tien">
        💰 Tổng: {tongTien.toLocaleString()} VNĐ
      </div>

      <button type="submit">📝 Tạo đơn hàng</button>
    </form>
  );
}
```

---

## 🏭 Lớp thực tế: So sánh code lượng

```
┌─────────────────────────────────────────────────────────────┐
│           SO SÁNH CODE CHO CÙNG 1 FORM ĐĂNG NHẬP           │
│                                                             │
│  CONTROLLED (useState):                                     │
│  ├── useState cho từng field                                │
│  ├── onChange handler                                       │
│  ├── Validate function                                      │
│  └── ~60 dòng code                                          │
│                                                             │
│  UNCONTROLLED (useRef):                                     │
│  ├── useRef cho từng field                                  │
│  ├── Submit handler đọc refs                                │
│  ├── Validate function                                      │
│  └── ~40 dòng code                                          │
│                                                             │
│  REACT HOOK FORM:                                           │
│  ├── register cho fields                                    │
│  ├── handleSubmit + onSubmit                                │
│  ├── Validation inline hoặc Yup                             │
│  └── ~30 dòng code ✅                                       │
│                                                             │
│  💡 Ít code hơn = ít bug hơn = ship nhanh hơn              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Bài tập thực hành

### Bài tập 1: Form khảo sát (Controlled)

```jsx
// 🎯 Yêu cầu: Tạo form khảo sát với các field:
// - Họ tên (text, required)
// - Tuổi (number, 18-65)
// - Giới tính (radio: Nam, Nữ, Khác)
// - Sở thích (checkbox: Đọc sách, Du lịch, Âm nhạc, Thể thao)
// - Đánh giá (select: 1-5 sao)
// - Nhận xét (textarea, optional)
// - Validate tất cả field bắt buộc trước khi submit
```

### Bài tập 2: Form đặt vé (React Hook Form + Yup)

```jsx
// 🎯 Yêu cầu: Form đặt vé máy bay với RHF + Yup:
// - Họ tên (required, min 2 chars)
// - Email (required, valid email)
// - Ngày đi (required, không được trong quá khứ)
// - Ngày về (required, phải sau ngày đi) ← dùng yup.when()
// - Số hành khách (1-10)
// - Hạng vé (Economy, Business, First Class)
// - Mã giảm giá (optional, format: XXXX-XXXX)
```

---

## ❌ Sai lầm thường gặp

| # | Sai lầm | Đúng | Giải thích |
|---|---------|------|------------|
| 1 | `value` mà không có `onChange` | Luôn cả hai hoặc dùng `defaultValue` | Input bị "frozen" |
| 2 | Quên `e.preventDefault()` | Luôn gọi đầu submit handler | Trang bị reload |
| 3 | Validate chỉ khi submit | Validate real-time (`mode: 'onChange'`) | UX tốt hơn |
| 4 | Không handle loading state | Disable button khi đang submit | Tránh submit trùng |
| 5 | Dùng `any` cho form data | Tạo interface/type cụ thể | TypeScript safety |
| 6 | Không reset form sau submit | Gọi `reset()` sau khi thành công | User biết đã gửi |

### 🐛 Troubleshooting

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `A component is changing an uncontrolled input to be controlled` | defaultValue undefined | Thêm `defaultValue=""` hoặc `defaultValue={undefined}` |
| Form submit không hoạt động | Quên `type="submit"` | Thêm `type="submit"` cho nút |
| RHF register không hoạt động | Quên spread `...register()` | Luôn `{...register('fieldName')}` |
| Yup validation không chạy | Thiếu `resolver` | Thêm `resolver: yupResolver(schema)` |
| Checkbox không hoạt động | Dùng `value` thay vì `checked` | Checkbox dùng `checked` prop |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

```
┌────────────────────────────────────────────────────────────┐
│                   KIỂM TRA NHANH                           │
│                                                            │
│  1. Controlled vs Uncontrolled khác nhau thế nào?          │
│  2. Tại sao React Hook Form nhanh hơn Controlled?          │
│  3. Khi nào nên dùng Uncontrolled?                         │
│  4. Yup schema dùng để làm gì?                             │
│  5. useFieldArray dùng cho trường hợp nào?                 │
│                                                            │
│  Trả lời được 4/5 → Bạn đã master Forms trong React! ✅  │
└────────────────────────────────────────────────────────────┘
```

---

## 📌 Tóm tắt bài học

```
┌──────────────────────────────────────────────────────────────┐
│                   FORMS TRONG REACT                           │
│                                                              │
│  📝 Controlled Components                                    │
│     • useState quản lý giá trị                              │
│     • onChange → setState → re-render                        │
│     • Phù hợp: form đơn giản, cần real-time validation      │
│                                                              │
│  🎒 Uncontrolled Components                                  │
│     • useRef + defaultValue                                  │
│     • DOM tự quản lý, chỉ đọc khi cần                       │
│     • Phù hợp: file upload, form integration                 │
│                                                              │
│  🤖 React Hook Form                                          │
│     • register + handleSubmit + validation                   │
│     • Ít re-render, ít code                                  │
│     • Yup schema cho validation phức tạp                     │
│     • useFieldArray cho dynamic fields                       │
│     • Phù hợp: mọi form, đặc biệt form phức tạp            │
│                                                              │
│  💡 Khuyến nghị: Dùng React Hook Form cho project mới!      │
└──────────────────────────────────────────────────────────────┘
```

---

## ➡️ Bài tiếp theo: React Router & Navigation

> Trong bài sau, bạn sẽ học cách **điều hướng trong React SPA** — từ trang này sang trang khác mà không cần reload trang. Đây là chìa khóa để xây dựng ứng dụng nhiều trang như Facebook, Shopee, hay bất kỳ website nào! 🧭
