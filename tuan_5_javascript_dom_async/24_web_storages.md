# 🟨 TUẦN 5 - BÀI 24
# **WEB STORAGES — Lưu trữ dữ liệu trên trình duyệt**

---

## 0. 🎬 Opening Hook

*Minh hoàn thành Todo App. Anh thêm task mới → đẹp. Reload trang → mất hết.*

*"Server thì em chưa có. Vậy lưu ở đâu?" Minh hỏi.*

*"Lưu ngay trên trình duyệt," anh Hùng nói. "localStorage — dữ liệu tồn tại mãi dù đóng tab, đóng trình duyệt. sessionStorage — mất khi đóng tab. Không cần server."*

```javascript
// Lưu todo vào localStorage
localStorage.setItem("todos", JSON.stringify([
    { text: "Học Web Storage", done: false },
    { text: "Làm bài tập", done: true }
]));

// Đọc lại khi trang load
const todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);  // [{ text: "Học Web Storage", done: false }, ...]
```

*"Giờ reload trang — dữ liệu vẫn còn. Không cần backend."* 💾

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Web Storage là cách **đơn giản nhất** để lưu dữ liệu trên trình duyệt:

- **User preferences**: theme, ngôn ngữ, font size
- **Form auto-save**: lưu draft khi user đang nhập
- **Auth token**: lưu JWT token sau khi đăng nhập
- **Offline data**: app vẫn hoạt động khi mất mạng
- **Game state**: lưu điểm, level

> Không biết Web Storage = mỗi lần reload = mất hết dữ liệu.

---

## 2. 🌐 Big Picture — Các cách lưu trữ trong Browser

```
BROWSER STORAGE
│
├── localStorage — Lưu VĨNH VIỄN (đến khi xóa thủ công)
│   ├── Capacity: ~5-10MB
│   ├── Scope: Cùng origin (domain + port + protocol)
│   ├── API: setItem, getItem, removeItem, clear
│   └── Dùng khi: user prefs, auth token, cached data
│
├── sessionStorage — Lưu tạm (mất khi ĐÓNG TAB)
│   ├── Capacity: ~5MB
│   ├── Scope: Cùng tab + cùng origin
│   ├── API: Giống localStorage
│   └── Dùng khi: form draft, wizard steps, temp state
│
├── cookies — Gửi kèm MỖI request
│   ├── Capacity: ~4KB
│   ├── Scope: Có thể set domain
│   └── Dùng khi: session ID, auth (server-side)
│
└── IndexedDB — Database trong trình duyệt
    ├── Capacity: Lớn (hàng trăm MB)
    ├── API: Phức tạp (async, transaction)
    └── Dùng khi: dữ liệu lớn, offline app
```

---

## 3. ⚙️ Core Technical Truth

### localStorage — Lưu trữ vĩnh viễn

```javascript
// 1. Lưu dữ liệu — chỉ nhận string
localStorage.setItem("username", "Minh");
localStorage.setItem("theme", "dark");
localStorage.setItem("fontSize", "16");

// 2. Đọc dữ liệu
const username = localStorage.getItem("username");
console.log(username);  // "Minh"

const notFound = localStorage.getItem("nonexistent");
console.log(notFound);  // null

// 3. Xóa 1 key
localStorage.removeItem("fontSize");

// 4. Xóa tất cả
localStorage.clear();

// 5. Theo dõi thay đổi (cross-tab)
window.addEventListener("storage", (event) => {
    console.log(`Key "${event.key}" changed:`);
    console.log(`Old: ${event.oldValue}`);
    console.log(`New: ${event.newValue}`);
});
```

---

### Lưu Object và Array

```javascript
// ⚠️ localStorage chỉ lưu STRING
localStorage.setItem("user", { name: "Minh" });
console.log(localStorage.getItem("user"));  // "[object Object]" — SAI!

// ✅ Phải dùng JSON.stringify()
const user = { name: "Minh", age: 21, scores: [85, 92, 78] };
localStorage.setItem("user", JSON.stringify(user));

// Đọc ra → JSON.parse()
const saved = JSON.parse(localStorage.getItem("user"));
console.log(saved.name);    // "Minh"
console.log(saved.scores);  // [85, 92, 78]

// ⚠️ getItem trả null nếu không có → cần fallback
const data = JSON.parse(localStorage.getItem("data")) || [];
```

---

### sessionStorage — Lưu tạm thời

```javascript
// API giống hệt localStorage
sessionStorage.setItem("step", "2");
sessionStorage.setItem("formData", JSON.stringify({
    name: "Minh",
    email: "minh@gmail.com"
}));

const step = sessionStorage.getItem("step");  // "2"
const form = JSON.parse(sessionStorage.getItem("formData"));

// Khác biệt: mất khi đóng tab
// - Đóng tab → mất
// - Mở tab mới → không có
// - Reload trang → vẫn còn
```

---

### Practical: Auto-save Form Draft

```javascript
// Tự động lưu draft khi user nhập
const form = document.querySelector("#contact-form");
const STORAGE_KEY = "contact-draft";

// Khôi phục draft khi trang load
function restoreDraft() {
    const draft = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (draft) {
        form.querySelector("#name").value = draft.name || "";
        form.querySelector("#email").value = draft.email || "";
        form.querySelector("#message").value = draft.message || "";
        console.log("Đã khôi phục draft");
    }
}

// Lưu draft mỗi khi nhập
form.addEventListener("input", () => {
    const draft = {
        name: form.querySelector("#name").value,
        email: form.querySelector("#email").value,
        message: form.querySelector("#message").value,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
});

// Xóa draft khi submit thành công
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // ... gửi form
    localStorage.removeItem(STORAGE_KEY);
    console.log("Đã xóa draft");
});

// Khôi phục khi trang load
restoreDraft();
```

---

### Practical: Theme Switcher

```javascript
// Lưu theme preference
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
}

// Toggle theme
document.querySelector("#theme-toggle").addEventListener("click", () => {
    const current = localStorage.getItem("theme") || "light";
    setTheme(current === "light" ? "dark" : "light");
});

// Load theme khi trang mở
loadTheme();
```

---

### Practical: Shopping Cart

```javascript
const CART_KEY = "shopping_cart";

// Giỏ hàng lưu trong localStorage
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }

    add(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
    }

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    save() {
        localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    }

    clear() {
        this.items = [];
        localStorage.removeItem(CART_KEY);
    }
}

const cart = new Cart();
cart.add({ id: 1, name: "iPhone", price: 25000000 });
cart.add({ id: 2, name: "AirPods", price: 5000000 });
console.log(cart.getTotal().toLocaleString() + "đ");  // 30.000.000đ
// Reload trang → giỏ hàng vẫn còn!
```

---

### Cookies — So sánh

```javascript
// Cookies — gửi kèm mỗi HTTP request
document.cookie = "username=Minh; expires=Fri, 31 Dec 2027 23:59:59 GMT; path=/";
document.cookie = "theme=dark; max-age=86400";  // 1 ngày

// Đọc cookies
console.log(document.cookie);  // "username=Minh; theme=dark"

// So sánh nhanh
// ┌──────────────┬────────────┬──────────────┬────────────┐
// │              │ localStorage│ sessionStorage│ Cookies    │
// ├──────────────┼────────────┼──────────────┼────────────┤
// │ Capacity     │ 5-10 MB    │ 5 MB         │ 4 KB       │
// │ Expires      │ Không bao giờ│ Khi đóng tab │ Tự设置     │
// │ Gửi server   │ Không      │ Không        │ Mỗi request│
// │ API          │ Đơn giản   │ Đơn giản     │ Phức tạp   │
// └──────────────┴────────────┴──────────────┴────────────┘
```

---

### Utility Functions

```javascript
// Wrapper an toàn cho localStorage
const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error("Storage error:", e);
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },

    // Kiểm tra localStorage có sẵn không
    isAvailable() {
        try {
            const test = "__test__";
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }
};

// Sử dụng
storage.set("user", { name: "Minh", age: 21 });
const user = storage.get("user", {});
console.log(user.name);  // "Minh"
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Lưu tên người dùng vào localStorage, đọc lại và in ra
// 2. Lưu mảng điểm số [85, 92, 78] vào localStorage
// 3. Xóa 1 key khỏi localStorage
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Viết function lưu/đọc object vào localStorage an toàn
// 2. Implement "Gần đây xem" — lưu 5 sản phẩm đã xem
// 3. Tạo theme switcher: lưu theme vào localStorage
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Implement Todo App với localStorage:
//    - Thêm, sửa, xóa, đánh dấu hoàn thành
//    - Dữ liệu persist qua reload
//    - Nút "Xóa tất cả"

// 2. Implement shopping cart với localStorage
//    - Thêm/xóa sản phẩm
//    - Tăng/giảm số lượng
//    - Tính tổng tiền
//    - Persist qua reload

// 3. Viết storage wrapper với TTL (time-to-live):
//    storage.setWithTTL("token", "abc", 3600); // 1 giờ
//    storage.get("token"); // null nếu hết hạn
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 17 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/17_Day_Web_storages/17_day_web_storages.md)*
