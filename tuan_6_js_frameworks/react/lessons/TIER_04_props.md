# Tier 4 — Props (Truyền dữ liệu từ cha xuống con)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Truyền dữ liệu giữa các component bằng Props  
> **📋 Cần biết:** Tier 3 (Components)  
> **🚫 Không cần biết:** useState, Events

---

## 🎬 Opening Hook

*Minh viết component `TheHocSinh`. Nhưng mỗi lần dùng phải hiển thị tên khác nhau — "Minh", "Lan", "Tùng".*

*"Viết 3 component riêng?" Minh hỏi.*

*"Không — viết MỘT component, truyền dữ liệu vào bằng Props."*

---

## 🎯 Hôm nay bạn sẽ học

```
Props = Properties = Dữ liệu cha truyền cho con
      = Giống DNA: con nhận từ cha, KHÔNG thể tự sửa
```

**Chỉ MỘT khái niệm:** Props — cách truyền dữ liệu từ component cha xuống component con.

---

## 📝 Bài 4.1 — Props cơ bản (10 phút)

### Truyền dữ liệu vào component

```jsx
// Component con — nhận Props
function TheHocSinh({ ten, diem, lop }) {
    return (
        <div className="the-hoc-sinh">
            <h2>{ten}</h2>
            <p>Lớp: {lop}</p>
            <p>Điểm: {diem}</p>
        </div>
    );
}

// Component cha — truyền Props
function App() {
    return (
        <div>
            <TheHocSinh ten="Minh" diem={9.0} lop="CNTT" />
            <TheHocSinh ten="Lan" diem={8.5} lop="KTMT" />
            <TheHocSinh ten="Tùng" diem={7.0} lop="CNTT" />
        </div>
    );
}
```

### Props flow: Cha → Con (MỘT CHIỀU)

```
App (cha)
  ├── TheHocSinh ten="Minh" diem={9.0}   ← Truyền dữ liệu XUỐNG
  ├── TheHocSinh ten="Lan"  diem={8.5}
  └── TheHocSinh ten="Tùng" diem={7.0}

❌ Con KHÔNG thể sửa Props (read-only)
❌ Con KHÔNG thể truyền Props lên cha
✅ Con chỉ ĐỌC Props để hiển thị
```

---

## 📝 Bài 4.2 — Destructuring Props (8 phút)

### Cách viết ngắn gọn

```jsx
// Cách dài — dùng props.xxx
function TheHocSinh(props) {
    return (
        <div>
            <h2>{props.ten}</h2>
            <p>Lớp: {props.lop}</p>
        </div>
    );
}

// Cách ngắn — destructuring ngay trong parameter
function TheHocSinh({ ten, diem, lop }) {
    return (
        <div>
            <h2>{ten}</h2>
            <p>Lớp: {lop}</p>
            <p>Điểm: {diem}</p>
        </div>
    );
}
```

### Default values

```jsx
function TheHocSinh({ ten, diem = 0, lop = "Chưa xếp lớp" }) {
    return (
        <div>
            <h2>{ten}</h2>
            <p>Lớp: {lop}</p>
            <p>Điểm: {diem}</p>
        </div>
    );
}

// Không truyền diem, lop → dùng giá trị mặc định
<TheHocSinh ten="Minh" />
// → "Minh, Chưa xếp lớp, 0"
```

---

## 📝 Bài 4.3 — Children Prop (10 phút)

### Component "ôm" nội dung khác

```jsx
function Card({ title, children }) {
    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            <div className="card-body">
                {children}   {/* ← Nội dung được "ôm" vào đây */}
            </div>
        </div>
    );
}

// Sử dụng — linh hoạt!
<Card title="Thông tin sinh viên">
    <p>Tên: Minh</p>
    <p>Tuổi: 20</p>
    <button>Chỉnh sửa</button>
</Card>

<Card title="Kết quả học tập">
    <ul>
        <li>Toán: 8</li>
        <li>Lý: 9</li>
    </ul>
</Card>
```

### Tại sao children mạnh?

```
Không có children:  Phải tạo CardProfile, CardGrade riêng
Có children:        Dùng MỘT Card cho mọi trường hợp!
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Props có thể sửa trong con | Props là read-only, KHÔNG thể sửa |
| Props tự động cập nhật khi cha thay đổi | Props chỉ thay đổi khi cha render lại |
| Phải truyền đúng thứ tự | Props là key-value, không cần đúng thứ tự |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** Props là gì?
- a) Dữ liệu con truyền lên cha
- b) Dữ liệu cha truyền xuống con ✅
- c) Dữ liệu nội bộ của component

**Câu 2:** Code nào đúng?
- a) `<Card title="Hello" children={<p>Nội dung</p>} />`
- b) `<Card title="Hello"><p>Nội dung</p></Card>`
- c) Cả hai đều đúng ✅

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 3:** Components — Props là input của component
- **Sẽ cần trong Tier 5:** Conditional rendering — dùng Props để quyết định hiển thị
- **Sẽ cần trong Tier 6:** useState — Props vs State
- **Tham khảo thêm:** `02_getting_started/02_basic_principles.md` (file cũ)
