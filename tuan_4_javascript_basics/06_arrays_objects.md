# 🟨 PART II - CHƯƠNG 06
# **ARRAYS AND OBJECTS**

Dữ liệu thực tế không bao giờ rời rạc. Nó là danh sách (List/Array) hoặc là các thực thể phức tạp (Object). Đây là chương quan trọng nhất để xử lý dữ liệu.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Dùng **Array** để lưu danh sách.
- Thành thạo các "thần chú" xử lý mảng: `map`, `filter`, `forEach`.
- Dùng **Object** để mô tả thực thể (User, Product...).
- Hiểu về **JSON** cơ bản.

---

# 1. **ARRAYS (MẢNG)**

Là một danh sách chứa nhiều giá trị, đánh số từ 0.

## 1.1. Khai báo & Truy xuất
```javascript
const fruits = ["Apple", "Banana", "Orange"];

console.log(fruits[0]); // "Apple"
console.log(fruits.length); // 3 (số lượng phần tử)
```

## 1.2. Các Methods cơ bản
- `push(item)`: Thêm vào cuối.
- `pop()`: Lấy ra từ cuối.
- `includes(item)`: Kiểm tra có chứa item không?

## 1.3. Array Iteration (Duyệt mảng nâng cao - ES6)
Quên vòng lặp `for` đi. Hãy dùng bộ 3 quyền lực này:

### A. `forEach` (Duyệt từng cái)
Chỉ chạy qua, không trả về gì cả.
```javascript
fruits.forEach(fruit => {
  console.log("I like " + fruit);
});
```

### B. `map` (Biến hình)
Duyệt qua, chỉnh sửa và **trả về mảng mới**.
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
// doubled = [2, 4, 6]
```

### C. `filter` (Lọc)
Chọn ra các phần tử thỏa mãn điều kiện.
```javascript
const nums = [1, 5, 8, 10];
const bigNums = nums.filter(n => n > 5);
// bigNums = [8, 10]
```

---

# 2. **OBJECTS (ĐỐI TƯỢNG)**

Mảng dùng chỉ số (0, 1, 2). Object dùng **Key** (Tên thuộc tính) để lưu dữ liệu có cấu trúc.

## 2.1. Object Literal
```javascript
const student = {
  name: "Nguyen Van A",
  age: 20,
  isGraduated: false,
  
  // Method (Hàm trong object)
  greet: function() {
    console.log("Xin chào, tôi là " + this.name);
  }
};
```

## 2.2. Dot Notation vs Bracket Notation
Truy xuất dữ liệu:
```javascript
console.log(student.name); // "Nguyen Van A" (Dùng phổ biến)
console.log(student["age"]); // 20 (Dùng khi key là biến động)
```

## 2.3. Destructuring (Bóc tách - ES6)
Cách nhanh để lấy dữ liệu từ object.
```javascript
// Thay vì viết
// const name = student.name;
// const age = student.age;

// Hãy viết:
const { name, age } = student;
```

---

# 3. **REFERENCE TYPES (KIỂU THAM CHIẾU)**

Khác với Number/String, **Array và Object là Reference Type**.
Khi bạn copy, bạn chỉ copy **địa chỉ bộ nhớ**, không phải giá trị.

```javascript
const a = [1, 2];
const b = a; // b trỏ cùng chỗ với a

b.push(3);
console.log(a); // [1, 2, 3] -> a cũng bị thay đổi!!!
```

> [!WARNING]
> Cẩn thận khi sửa đổi Array/Object.
> Để copy an toàn (Spread Operator): `const b = [...a];`

---

# 4. **TỔNG KẾT**

- **Array** `[]` lưu danh sách. Dùng `map`, `filter` để xử lý.
- **Object** `{}` lưu thông tin chi tiết (Key-Value).
- **Destructuring** `{ x } = obj` giúp code gọn gàng.
- Hiểu sự khác biệt giữa tham trị (Primitive) và tham chiếu (Reference).

---

**Chương tiếp theo:** Bắt đầu tương tác với giao diện Web (DOM Manipulation).
