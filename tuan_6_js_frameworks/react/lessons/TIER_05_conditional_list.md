# Tier 5 — Conditional & List Rendering (Hiện/ẩn & Danh sách)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Hiển thị UI dựa trên điều kiện và render danh sách động  
> **📋 Cần biết:** Tier 3 (Components), Tier 4 (Props)  
> **🚫 Không cần biết:** useState, Events

---

## 🎬 Opening Hook

*Minh có danh sách 100 sinh viên. Cần hiển thị danh sách, đánh dấu sinh viên đạt, ẩn sinh viên chưa đăng ký.*

*"Làm sao render 100 thẻ <li> mà không viết 100 lần?"*

*"Dùng .map(). Và conditional rendering."*

---

## 🎯 Hôm nay bạn sẽ học

```
Conditional: Hiện/ẩn UI dựa trên điều kiện  →  {isLoggedIn && <Menu />}
List:        Render danh sách động          →  {items.map(item => <Item />)}
```

**Chỉ MỘT khái niệm:** Cách hiển thị UI động — theo điều kiện và danh sách.

---

## 📝 Bài 5.1 — Conditional Rendering (12 phút)

### Pattern 1: `&&` — Hiện khi đúng, ẩn khi sai

```jsx
function Welcome({ isLoggedIn, ten }) {
    return (
        <div>
            <h1>Trang chủ</h1>
            {isLoggedIn && <p>🎉 Chào mừng {ten} quay lại!</p>}
            {!isLoggedIn && <p>🔑 Vui lòng đăng nhập</p>}
        </div>
    );
}
```

### Pattern 2: Ternary `? :` — Một trong hai

```jsx
function LoginButton({ isLoggedIn }) {
    return (
        <button>
            {isLoggedIn ? '🚪 Đăng xuất' : '🔑 Đăng nhập'}
        </button>
    );
}
```

### Pattern 3: Early return — ẩn toàn bộ component

```jsx
function AdminPanel({ isAdmin }) {
    if (!isAdmin) {
        return <p>⛔ Bạn không có quyền truy cập</p>;
    }

    return (
        <div>
            <h1>Quản trị hệ thống</h1>
            <p>Quản lý người dùng, bài viết, cài đặt...</p>
        </div>
    );
}
```

### Bảng tổng hợp

```
Pattern         Khi nào dùng                  Ví dụ
───────         ───────────                    ─────
&&              Hiện hoặc không                {isOnline && <Badge />}
? :             Một trong hai                  {isDark ? "🌙" : "☀️"}
Early return    Ẩn toàn bộ component           if (!isAdmin) return null
```

---

## 📝 Bài 5.2 — List Rendering với .map() (12 phút)

### Render danh sách từ array

```jsx
function DanhSachSinhVien() {
    const students = [
        { id: 1, ten: "Minh", diem: 9.0 },
        { id: 2, ten: "Lan", diem: 8.5 },
        { id: 3, ten: "Tùng", diem: 7.0 },
    ];

    return (
        <ul>
            {students.map((sv) => (
                <li key={sv.id}>
                    {sv.ten} — Điểm: {sv.diem}
                    {sv.diem >= 8 ? ' ⭐' : ''}
                </li>
            ))}
        </ul>
    );
}
```

### Tại sao cần `key`?

```jsx
// ❌ SAI — không có key
{students.map(sv => <li>{sv.ten}</li>)}

// ✅ ĐÚNG — key phải UNIQUE
{students.map(sv => <li key={sv.id}>{sv.ten}</li>)}
```

```
Key = "CMND" cho mỗi phần tử trong list
    → React biết phần tử nào thêm, sửa, xóa
    → Render lại hiệu quả

❌ key={index}  — Chỉ dùng khi list không thay đổi
✅ key={sv.id}  — Ưu tiên dùng id từ dữ liệu
```

---

## 📝 Bài 5.3 — Kết hợp Conditional + List (8 phút)

### Ví dụ: Danh sách với điều kiện

```jsx
function ProductList({ products, showDiscount }) {
    return (
        <div>
            <h2>Sản phẩm ({products.length})</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name}</span>
                        <span> — {product.price.toLocaleString()}đ</span>
                        {showDiscount && product.discount > 0 && (
                            <span className="discount">
                                -{product.discount}%
                            </span>
                        )}
                    </li>
                ))}
            </ul>
            {products.length === 0 && (
                <p>Không có sản phẩm nào</p>
            )}
        </div>
    );
}
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| `{isLoggedIn && <Menu />}` luôn hiện Menu | Chỉ hiện khi isLoggedIn=true |
| `{0 && <X />}` hiện nothing | 0 là falsy → không render gì |
| key có thể là index | Nên dùng id, chỉ dùng index khi bất đắc dĩ |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** `{isLoggedIn && <Menu />}` hiện gì khi isLoggedIn=false?
- a) Menu rỗng
- b) Không hiện gì ✅
- c) Lỗi

**Câu 2:** Tại sao cần key trong .map()?
- a) Để CSS hoạt động
- b) Để React nhận diện phần tử nào thay đổi ✅
- c) Để JavaScript sort

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 4:** Props — dữ liệu để quyết định conditional
- **Sẽ cần trong Tier 6:** useState — state thay đổi → conditional thay đổi
- **Sẽ cần trong Tier 8:** Events — user click → thay đổi state → render lại
- **Tham khảo thêm:** `02_getting_started/02_basic_principles.md` (file cũ)
