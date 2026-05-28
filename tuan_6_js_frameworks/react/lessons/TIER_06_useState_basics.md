# Tier 6 — useState Basics (Quản lý trạng thái nội bộ)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Quản lý state nội bộ của component bằng useState  
> **📋 Cần biết:** Tier 3 (Components), Tier 4 (Props)  
> **🚫 Không cần biết:** useEffect, Context

---

## 🎬 Opening Hook

*Minh làm bộ đếm. Hiển thị số 0. Khi click "+1" → số tăng.*

*"Props chỉ nhận từ cha. Nhưng bộ đếm phải tự thay đổi giá trị. Props không làm được."*

*"Đó là State."*

---

## 🎯 Hôm nay bạn sẽ học

```
Props  = Dữ liệu TỪ CHA (read-only, con không sửa)
State  = Dữ liệu NỘI BỘ (component tự quản lý, tự thay đổi)

useState = Hook giúp component có state
         = const [giá_trị, hàm_đổi] = useState(giá_trị_ban_đầu)
```

**Chỉ MỘT khái niệm:** useState — cách component tự quản lý dữ liệu thay đổi.

---

## 📝 Bài 6.1 — useState cơ bản (12 phút)

### Cú pháp

```jsx
import { useState } from 'react';

function BoDem() {
    // useState trả về [giá_trị_hiện_tại, hàm_đổi_giá_trị]
    const [count, setCount] = useState(0);
    //        ↑         ↑              ↑
    //     giá trị   hàm đổi     giá trị ban đầu

    return (
        <div>
            <p>Bạn đã click {count} lần</p>
            <button onClick={() => setCount(count + 1)}>
                Tăng (+1)
            </button>
            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}
```

### Quy trình hoạt động

```
1. Component render lần đầu: count = 0
2. User click "+1" → setCount(1)
3. React biết state thay đổi → RE-RENDER
4. Component render lại: count = 1
5. UI cập nhật: "Bạn đã click 1 lần"
```

---

## 📝 Bài 6.2 — State với các kiểu dữ liệu (10 phút)

### Number

```jsx
const [count, setCount] = useState(0);
```

### String

```jsx
const [ten, setTen] = useState("Minh");
```

### Boolean

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isVisible, setIsVisible] = useState(true);
```

### Object

```jsx
const [user, setUser] = useState({ ten: "Minh", tuoi: 20 });
```

### Array

```jsx
const [items, setItems] = useState(["HTML", "CSS", "JS"]);
```

### null

```jsx
const [selectedUser, setSelectedUser] = useState(null);
```

---

## 📝 Bài 6.3 — Functional Update `prev =>` (10 phút)

### Vấn đề: Stale state

```jsx
const [count, setCount] = useState(0);

// ❌ Khi click nhanh 3 lần → có thể chỉ tăng 1
const increment = () => {
    setCount(count + 1);  // count vẫn = 0 khi 3 lần click xảy ra liên tục
};
```

### Giải pháp: Dùng `prev =>`

```jsx
// ✅ Luôn dùng giá trị MỚI NHẤT
const increment = () => {
    setCount(prev => prev + 1);  // prev = giá trị hiện tại
};
```

### Khi nào dùng `prev =>`?

```
Dùng prev => khi:
  ✅ State mới = tính từ state cũ (prev + 1, prev * 2)
  ✅ Thêm/xóa trong array (prev => [...prev, item])

Không cần prev => khi:
  ❌ State mới không liên quan state cũ (setCount(100))
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Props và State giống nhau | Props từ cha, State nội bộ |
| setCount(count + 1) luôn đúng | Dùng prev => khi tính từ state cũ |
| State thay đổi ngay lập tức | State cập nhật khi re-render |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** useState trả về gì?
- a) Một giá trị
- b) Một mảng [giá_trị, hàm_đổi] ✅
- c) Một object

**Câu 2:** Khi gọi setCount(5), UI thay đổi ngay?
- a) Có, ngay lập tức
- b) Không, chờ re-render ✅
- c) Tùy trường hợp

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 4:** Props — so sánh Props vs State
- **Sẽ cần trong Tier 7:** State Patterns — object/array state, immutability
- **Sẽ cần trong Tier 8:** Events — user click → setState
- **Tham khảo thêm:** `02_react_fundamentals_hooks.md` (file cũ)
