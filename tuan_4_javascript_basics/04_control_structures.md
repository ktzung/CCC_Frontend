# 🟨 PART II - CHƯƠNG 04
# **CONTROL STRUCTURES — Điều Kiện & Vòng Lặp**

## 🎬 "Todo App Logic" — Nếu hoàn thành → Gạch ngang

*Minh cần logic cho Todo App: "Nếu todo.completed = true → hiện text gạch ngang. Lặp qua danh sách todos → render HTML cho từng item."*

*Đây là lúc if/else và for loop phát huy sức mạnh.*

---

## 🎯 Mục tiêu
- if/else, switch, ternary operator
- for, while, for...of, for...in loops
- Kết hợp: Loop + Condition = render dynamic content

---

## 🔀 Conditional Statements

### if/else — "Ngã ba đường"

```javascript
const score = 85;

if (score >= 90) {
    console.log("Xuất sắc! 🌟");
} else if (score >= 70) {
    console.log("Khá! 👍");       // ← Chạy dòng này
} else if (score >= 50) {
    console.log("Trung bình");
} else {
    console.log("Yếu — cần cải thiện");
}
```

### Ternary Operator — "if/else 1 dòng" ⭐

```javascript
const status = score >= 50 ? "Đạt" : "Không đạt";
const greeting = isLoggedIn ? `Chào ${user.name}` : "Vui lòng đăng nhập";

// Hay dùng trong React/Vue:
// <span className={todo.completed ? "done" : "pending"}>
```

### Switch — "Nhiều nhánh rẽ"

```javascript
const day = new Date().getDay();

switch (day) {
    case 0: console.log("Chủ Nhật 🌞"); break;
    case 1: console.log("Thứ Hai 😴"); break;
    case 5: console.log("Thứ Sáu 🎉"); break;
    case 6: console.log("Thứ Bảy 🎮"); break;
    default: console.log("Ngày thường"); break;
}
```

---

## 🔄 Loops — "Lặp đi lặp lại"

### for — "Lặp biết trước số lần"

```javascript
const todos = ["Học HTML", "Học CSS", "Học JS", "Làm BTL"];

for (let i = 0; i < todos.length; i++) {
    console.log(`${i + 1}. ${todos[i]}`);
}
// 1. Học HTML
// 2. Học CSS
// 3. Học JS
// 4. Làm BTL
```

### for...of — "Lặp qua từng phần tử" ⭐ (hay dùng!)

```javascript
for (const todo of todos) {
    console.log(`📌 ${todo}`);
}
```

### Array Methods — "Loop hiện đại" (dùng NHIỀU NHẤT!)

```javascript
const prices = [39000, 45000, 55000, 29000];

// forEach — Lặp (không trả giá trị)
prices.forEach(price => console.log(`${price.toLocaleString()}đ`));

// map — Biến đổi → mảng mới ⭐
const doubled = prices.map(p => p * 2);

// filter — Lọc ⭐
const expensive = prices.filter(p => p > 40000);

// reduce — Tổng hợp ⭐
const total = prices.reduce((sum, p) => sum + p, 0);

// find — Tìm 1 phần tử
const found = prices.find(p => p > 50000);
```

> **Anh Hùng:** *"Trong React, `map` dùng để render list. `filter` dùng để lọc. `reduce` dùng để tính tổng. Ba methods này bạn sẽ dùng HÀNG NGÀY."*

---

## 🎯 Thực hành: Todo App Logic

```javascript
const todos = [
    { text: "Học HTML", completed: true },
    { text: "Học CSS", completed: true },
    { text: "Học JS", completed: false },
    { text: "Làm BTL", completed: false }
];

// Render todos
todos.forEach((todo, index) => {
    const status = todo.completed ? "✅" : "⬜";
    const style = todo.completed ? "text-decoration: line-through" : "";
    console.log(`${status} ${index + 1}. ${todo.text}`);
});

// Đếm hoàn thành
const completed = todos.filter(t => t.completed).length;
console.log(`Hoàn thành: ${completed}/${todos.length}`);
```

---

## ➡️ Chương tiếp theo...

*Minh viết logic render todos thành công. Nhưng code lặp lại nhiều — mỗi lần cần render, viết lại `forEach`.*

*"Em cần đóng gói logic vào FUNCTION," anh Hùng nói. "Viết một lần, gọi nhiều lần."*

**Chương tiếp theo:** Functions — Viết 1 lần, dùng N lần.
