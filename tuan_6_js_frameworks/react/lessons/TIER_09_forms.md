# Tier 9 — Forms (Controlled Components & Validation)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Xử lý form nhập liệu — binding state, validation, submit  
> **📋 Cần biết:** Tier 7 (State Patterns), Tier 8 (Events)  
> **🚫 Không cần biết:** useEffect, Context

---

## 🎬 Opening Hook

*Minh làm form đăng ký. User gõ email → giá trị phải nằm trong state. Khi submit → kiểm tra email hợp lệ chưa.*

*"React quản lý MỌI giá trị input qua state. Đó là Controlled Component."*

---

## 🎯 Hôm nay bạn sẽ học

```
Controlled Component = Input value ĐƯỢC QUẢN LÝ bởi React state
                     = value={state} + onChange={setState}
                     = React là "người ghi chép" mọi thứ user gõ
```

---

## 📝 Bài 9.1 — Controlled Component (12 phút)

### Input liên kết với state

```jsx
function DangNhapForm() {
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');

    return (
        <form>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}                           // ← State quản lý
                    onChange={(e) => setEmail(e.target.value)} // ← Cập nhật state
                />
            </div>
            <div>
                <label>Mật khẩu:</label>
                <input
                    type="password"
                    value={matKhau}
                    onChange={(e) => setMatKhau(e.target.value)}
                />
            </div>
            <p>Email: {email}</p>
        </form>
    );
}
```

### Object state cho form nhiều field

```jsx
function FormDangKy() {
    const [formData, setFormData] = useState({
        ten: '', email: '', tuoi: '', gioiTinh: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form>
            <input name="ten" value={formData.ten} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />
            <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange}>
                <option value="">Chọn</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
            </select>
        </form>
    );
}
```

---

## 📝 Bài 9.2 — Validation & Submit (12 phút)

### Validate trước khi submit

```jsx
function DangKyForm() {
    const [formData, setFormData] = useState({ ten: '', email: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.ten) newErrors.ten = '❌ Họ tên bắt buộc';
        if (!formData.email) {
            newErrors.email = '❌ Email bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '❌ Email không hợp lệ';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log('✅ Đăng ký:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="ten" value={formData.ten} onChange={handleChange} />
            {errors.ten && <span className="error">{errors.ten}</span>}

            <input name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}

            <button type="submit">Đăng ký</button>
        </form>
    );
}
```

---

## 📝 Bài 9.3 — Checkbox & Radio (8 phút)

### Checkbox

```jsx
const [dongY, setDongY] = useState(false);

<label>
    <input
        type="checkbox"
        checked={dongY}
        onChange={(e) => setDongY(e.target.checked)}
    />
    Tôi đồng ý điều khoản
</label>
```

### Radio

```jsx
const [gioiTinh, setGioiTinh] = useState('');

<label>
    <input type="radio" name="gioiTinh" value="nam"
        checked={gioiTinh === 'nam'}
        onChange={(e) => setGioiTinh(e.target.value)}
    /> Nam
</label>
<label>
    <input type="radio" name="gioiTinh" value="nu"
        checked={gioiTinh === 'nu'}
        onChange={(e) => setGioiTinh(e.target.value)}
    /> Nữ
</label>
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Không cần value cho input | Controlled = value + onChange |
| onSubmit tự ngăn reload | Phải e.preventDefault() |
| Validation chỉ ở client | Server phải validate lại |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 7:** Object state cho form nhiều field
- **Dùng kiến thức từ Tier 8:** Events (onChange, onSubmit)
- **Sẽ cần trong Tier 10:** Lifecycle — form submission side effects
- **Tham khảo thêm:** `10_forms_react.md` (file cũ)
