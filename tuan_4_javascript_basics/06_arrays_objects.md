# 🟨 PART II - CHƯƠNG 06
# **ARRAYS & OBJECTS**

## 🎬 "10.000 Sản Phẩm — Làm Sao Quản Lý?"

*Sếp giao Minh: "Xử lý danh sách 10.000 sản phẩm từ API. Lọc theo giá, sắp xếp theo tên, tính tổng doanh thu."*

*Minh: "10.000 biến? `product1`, `product2`... `product10000`?"*

*Anh Hùng: "KHÔNG! Dùng Array. Một biến chứa 10.000 items. Dùng `.filter()`, `.sort()`, `.reduce()` để xử lý tất cả trong 3 dòng code."*

---

## 🎯 Mục tiêu
- Arrays: CRUD operations, methods nâng cao
- Objects: properties, methods, destructuring
- Kết hợp Arrays + Objects (phổ biến nhất trong thực tế)

---

## 📋 Arrays — "Danh sách có thứ tự"

### CRUD Operations:

```javascript
const todos = ["Học HTML", "Học CSS", "Học JS"];

// Create — Thêm
todos.push("Làm BTL");              // Thêm cuối
todos.unshift("Mua sách");          // Thêm đầu

// Read — Đọc
todos[0]                            // "Mua sách"
todos.length                        // 5
todos.includes("Học JS")            // true
todos.indexOf("Học CSS")            // 2

// Update — Sửa
todos[2] = "Master CSS";            // Sửa item thứ 3

// Delete — Xóa
todos.pop()                         // Xóa cuối → "Làm BTL"
todos.shift()                       // Xóa đầu → "Mua sách"
todos.splice(1, 1)                  // Xóa 1 item tại index 1
```

### Array Power Methods ⭐

```javascript
const products = [
    { name: "iPhone 15", price: 25990000, inStock: true },
    { name: "MacBook Air", price: 32990000, inStock: true },
    { name: "AirPods Pro", price: 6990000, inStock: false },
    { name: "iPad Mini", price: 14990000, inStock: true }
];

// FILTER — Lọc sản phẩm còn hàng
const available = products.filter(p => p.inStock);
// → [iPhone, MacBook, iPad]

// MAP — Lấy danh sách tên
const names = products.map(p => p.name);
// → ["iPhone 15", "MacBook Air", "AirPods Pro", "iPad Mini"]

// REDUCE — Tính tổng giá trị kho
const totalValue = products
    .filter(p => p.inStock)
    .reduce((sum, p) => sum + p.price, 0);
// → 73.970.000đ

// SORT — Sắp xếp theo giá
const sorted = [...products].sort((a, b) => a.price - b.price);

// FIND — Tìm 1 sản phẩm
const macbook = products.find(p => p.name.includes("MacBook"));
```

---

## 📦 Objects — "Bản ghi có tên trường"

```javascript
const student = {
    name: "Nguyễn Văn Minh",
    age: 21,
    major: "Công nghệ thông tin",
    gpa: 3.5,
    skills: ["HTML", "CSS", "JavaScript"],
    
    // Method (hàm trong object)
    introduce() {
        return `Tôi là ${this.name}, SV ngành ${this.major}`;
    }
};

// Truy cập
student.name                    // "Nguyễn Văn Minh"
student["age"]                  // 21
student.introduce()             // "Tôi là Nguyễn Văn Minh..."

// Thêm/sửa property
student.email = "minh@tlu.edu.vn";
student.gpa = 3.7;

// Destructuring ⭐ (rất hay dùng trong React)
const { name, age, skills } = student;
console.log(name);              // "Nguyễn Văn Minh"
console.log(skills);            // ["HTML", "CSS", "JavaScript"]
```

---

## 🔗 Kết hợp Arrays + Objects — Pattern phổ biến nhất

```javascript
// API thường trả về dạng này:
const apiResponse = {
    status: "success",
    total: 3,
    data: [
        { id: 1, name: "Todo 1", completed: false },
        { id: 2, name: "Todo 2", completed: true },
        { id: 3, name: "Todo 3", completed: false }
    ]
};

// Xử lý:
const { data: todos } = apiResponse;    // Destructuring
const pending = todos.filter(t => !t.completed);
const completedCount = todos.filter(t => t.completed).length;
```

---

## 💡 Spread & Rest Operators ⭐

```javascript
// Spread — Copy/merge array/object
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];          // [1, 2, 3, 4, 5]

const defaults = { theme: "dark", lang: "vi" };
const userSettings = { ...defaults, lang: "en" };  // Override lang

// Rest — Gom lại
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4, 5);    // 15
```

---

## ➡️ Chương tiếp theo...

*Minh xử lý data thành thạo. Nhưng Todo App cần HIỂN THỊ data trên trang web — không chỉ trong console.*

*"Em cần DOM Manipulation," anh Hùng nói. "JS nói chuyện với HTML = DOM. Click nút → thêm todo → render lại danh sách."*

**Tuần 5:** DOM Manipulation — JavaScript giao tiếp với HTML.
