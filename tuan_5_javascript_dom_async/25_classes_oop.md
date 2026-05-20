# 🟨 TUẦN 5 - BÀI 25
# **CLASSES & OOP — Lập trình hướng đối tượng trong JavaScript**

---

## 0. 🎬 Opening Hook

*Minh cần quản lý 100 sản phẩm trong Todo App. Mỗi sản phẩm có tên, giá, số lượng. Anh tạo 100 object thủ công:*

```javascript
const product1 = { name: "iPhone", price: 25000000, qty: 5, getTotal() { return this.price * this.qty; } };
const product2 = { name: "iPad", price: 18000000, qty: 3, getTotal() { return this.price * this.qty; } };
// ... 98 object nữa
```

*Anh Hùng: "Copy-paste 100 lần? Dùng Class — blueprint tạo 1000 object chỉ với 1 dòng."*

```javascript
class Product {
    constructor(name, price, qty) {
        this.name = name;
        this.price = price;
        this.qty = qty;
    }
    getTotal() { return this.price * this.qty; }
}

const products = [
    new Product("iPhone", 25000000, 5),
    new Product("iPad", 18000000, 3),
    // ...
];
```

*"Class = khuôn đúc. new = đúc ra sản phẩm."* 🏭

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Class là cách tổ chức code **phổ biến nhất** trong JavaScript hiện đại:

- **React Components**: `class MyComponent extends React.Component`
- **Node.js**: Controllers, Models, Services đều dùng class
- **Design Patterns**: Singleton, Factory, Observer đều dựa trên class
- **Code reuse**: Kế thừa giúp không viết lại code

> Không biết class = không hiểu được codebase dự án thực tế.

---

## 2. 🌐 Big Picture — Bản đồ OOP trong JavaScript

```
OOP trong JavaScript (ES6+)
│
├── CLASS — Blueprint (khuôn mẫu)
│   ├── constructor()    → Khởi tạo properties
│   ├── methods          → Hành vi của object
│   ├── getters/setters  → Truy cập kiểm soát
│   └── static methods   → Thuộc về class, không phải instance
│
├── INHERITANCE — Kế thừa
│   ├── extends          → Class con kế thừa class cha
│   ├── super()          → Gọi constructor cha
│   └── Method override  → Ghi đè phương thức cha
│
├── ENCAPSULATION — Đóng gói
│   ├── #private fields  → Trường private
│   └── #private methods → Phương thức private
│
└── POLYMORPHISM — Đa hình
    └── Method override  → Cùng tên, khác hành vi
```

---

## 3. ⚙️ Core Technical Truth

### Định nghĩa Class

```javascript
class User {
    // Constructor — chạy khi tạo instance mới
    constructor(name, email, role = "user") {
        this.name = name;      // Instance property
        this.email = email;
        this.role = role;
        this.createdAt = new Date();
    }

    // Method — hành vi của instance
    greet() {
        return `Xin chào, tôi là ${this.name}`;
    }

    // Getter — truy cập như property
    get info() {
        return `${this.name} (${this.email})`;
    }

    // Setter — gán giá trị kiểm soát
    set name(value) {
        if (!value || value.length < 2) {
            throw new Error("Tên phải có ít nhất 2 ký tự");
        }
        this._name = value;
    }

    // Static method — thuộc về class, không phải instance
    static create(data) {
        return new User(data.name, data.email, data.role);
    }
}

// Tạo instance
const user1 = new User("Minh", "minh@gmail.com");
const user2 = User.create({ name: "Linh", email: "linh@gmail.com" });

console.log(user1.greet());    // "Xin chào, tôi là Minh"
console.log(user1.info);       // "Minh (minh@gmail.com)"
console.log(user1 instanceof User);  // true
```

---

### Inheritance — Kế thừa

```javascript
// Class cha
class Shape {
    constructor(color) {
        this.color = color;
    }

    describe() {
        return `Shape màu ${this.color}`;
    }

    area() {
        throw new Error("Subclass phải implement area()");
    }
}

// Class con — kế thừa từ Shape
class Circle extends Shape {
    constructor(color, radius) {
        super(color);  // Gọi constructor cha
        this.radius = radius;
    }

    // Override method
    describe() {
        return `Circle bán kính ${this.radius}, màu ${this.color}`;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    describe() {
        return `Rectangle ${this.width}x${this.height}, màu ${this.color}`;
    }

    area() {
        return this.width * this.height;
    }
}

// Sử dụng
const shapes = [
    new Circle("red", 5),
    new Rectangle("blue", 4, 6),
    new Circle("green", 3)
];

shapes.forEach(s => {
    console.log(s.describe());
    console.log(`Diện tích: ${s.area().toFixed(2)}`);
});
```

---

### Private Fields & Methods

```javascript
class BankAccount {
    #balance;  // Private field — chỉ truy cập trong class
    #log;      // Private method

    constructor(owner, initialBalance = 0) {
        this.owner = owner;
        this.#balance = initialBalance;
        this.#log = [];
    }

    // Private method
    #record(transaction) {
        this.#log.push({ ...transaction, time: new Date() });
    }

    deposit(amount) {
        if (amount <= 0) throw new Error("Số tiền phải > 0");
        this.#balance += amount;
        this.#record({ type: "deposit", amount });
        return this.#balance;
    }

    withdraw(amount) {
        if (amount > this.#balance) throw new Error("Không đủ số dư");
        this.#balance -= amount;
        this.#record({ type: "withdraw", amount });
        return this.#balance;
    }

    get balance() {
        return this.#balance;
    }

    get history() {
        return [...this.#log];  // Trả về bản copy
    }
}

const account = new BankAccount("Minh", 1000000);
account.deposit(500000);
account.withdraw(200000);
console.log(account.balance);   // 1300000
console.log(account.history);   // Array of transactions
// console.log(account.#balance); // ❌ SyntaxError — private!
```

---

### Practical: Todo Model

```javascript
class Todo {
    static #nextId = 1;

    constructor(text) {
        this.id = Todo.#nextId++;
        this.text = text;
        this.done = false;
        this.createdAt = new Date();
    }

    toggle() {
        this.done = !this.done;
    }

    update(text) {
        if (!text || !text.trim()) throw new Error("Text không được trống");
        this.text = text.trim();
    }

    toJSON() {
        return {
            id: this.id,
            text: this.text,
            done: this.done,
            createdAt: this.createdAt
        };
    }

    static fromJSON(data) {
        const todo = new Todo(data.text);
        todo.id = data.id;
        todo.done = data.done;
        todo.createdAt = new Date(data.createdAt);
        return todo;
    }
}

class TodoList {
    #todos = [];

    add(text) {
        const todo = new Todo(text);
        this.#todos.push(todo);
        return todo;
    }

    remove(id) {
        this.#todos = this.#todos.filter(t => t.id !== id);
    }

    toggle(id) {
        const todo = this.#todos.find(t => t.id === id);
        if (todo) todo.toggle();
    }

    get all() { return [...this.#todos]; }
    get active() { return this.#todos.filter(t => !t.done); }
    get completed() { return this.#todos.filter(t => t.done); }
    get count() { return this.#todos.length; }

    save() {
        localStorage.setItem("todos", JSON.stringify(this.#todos));
    }

    load() {
        const data = JSON.parse(localStorage.getItem("todos")) || [];
        this.#todos = data.map(Todo.fromJSON);
    }
}
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Tạo class Animal với constructor(name, sound) và method speak()
// 2. Tạo class Dog extends Animal, thêm method fetch(item)
// 3. Tạo class Cat extends Animal, override speak() — kêu "Meow"
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Tạo class Calculator với private #result
//    Methods: add(n), subtract(n), multiply(n), divide(n), reset()
//    Getter: result
//    Method chaining: calc.add(5).subtract(2).result → 3

// 2. Tạo class Student với private fields
//    - #grades: Map<string, number>
//    - addGrade(subject, score)
//    - get average()
//    - get bestSubject()

// 3. Tạo class Stack (ngăn xếp)
//    - push(item), pop(), peek(), isEmpty, size
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Tạo class EventEmitter
//    - on(event, callback) — đăng ký listener
//    - emit(event, ...args) — phát event
//    - off(event, callback) — hủy listener

// 2. Tạo class ShoppingSystem
//    - Product class (name, price, stock)
//    - Cart class (items, add, remove, total)
//    - Order class (cart → order, status tracking)

// 3. Tạo class DataStore (mini ORM)
//    - findAll(), findById(id), create(data), update(id, data), delete(id)
//    - Dùng Map internal storage
//    - Events: "created", "updated", "deleted"
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 15 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/15_Day_Classes/15_day_classes.md)*
