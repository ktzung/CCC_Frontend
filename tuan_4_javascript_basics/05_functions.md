# 🟨 PART II - CHƯƠNG 05
# **FUNCTIONS**

Function (Hàm) là những "công nhân" chuyên biệt. Bạn viết một lần và gọi chúng làm việc ở khắp mọi nơi. Đây là nền tảng của Code Reuse (Tái sử dụng) và Modular Programming (Lập trình mô đun).

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Biết cách khai báo và gọi hàm.
- Hiểu về tham số (Parameters) và giá trị trả về (Return).
- Làm quen với **Arrow Functions** (ES6) cực kỳ hiện đại.
- Hiểu khái niệm **Scope** (Phạm vi biến).

---

# 1. **DEFINING AND CALLING FUNCTIONS**

## 1.1. Khai báo hàm (Function Declaration)
```javascript
// Định nghĩa công nhân tên là 'sayHello'
function sayHello(name) {
  console.log("Xin chào, " + name + "!");
}

// Gọi công nhân làm việc
sayHello("Nam"); // Xin chào, Nam!
sayHello("Lan"); // Xin chào, Lan!
```

- **Parameter (Tham số):** Biến `name` trong ngoặc. Là nguyên liệu đầu vào.
- **Argument (Đối số):** Giá trị `"Nam"` thực tế truyền vào.

## 1.2. Return Value (Giá trị trả về)
Hàm không chỉ in ra, nó thường **tính toán và trả lại kết quả**.

```javascript
function add(a, b) {
  return a + b; // Trả kết quả về
  // Code sau return sẽ KHÔNG bao giờ chạy (Dead code)
}

const sum = add(5, 10); // sum nhận giá trị 15
console.log(sum);
```

---

# 2. **ARROW FUNCTIONS (HÀM MŨI TÊN - ES6)**

Cách viết ngắn gọn, hiện đại và được dùng phổ biến trong React/Vue sau này.

```javascript
// Cách cũ (Regular Function)
const multiply = function(x, y) {
  return x * y;
}

// Cách mới (Arrow Function)
const multiply = (x, y) => {
  return x * y;
}

// Cách siêu ngắn (Nếu chỉ có 1 dòng return)
const multiply = (x, y) => x * y;
```

> [!TIP]
> Arrow Function giúp code gọn hơn rất nhiều, đặc biệt khi dùng trong các hàm xử lý mảng (sẽ học ở chương sau).

---

# 3. **SCOPE AND CLOSURES (PHẠM VI BIẾN)**

## 3.1. Scope (Phạm vi)
Biến sinh ra ở đâu thì sống ở đó.

1.  **Global Scope (Toàn cục):** Khai báo ngoài cùng -> Ai cũng thấy.
2.  **Function/Block Scope (Cục bộ):** Khai báo trong hàm `{...}` -> Chỉ trong hàm mới thấy. Ra ngoài là "chết".

```javascript
const globalVar = "Tôi là biến Global";

function test() {
  const localVar = "Tôi là biến Local";
  console.log(globalVar); // ✅ OK
  console.log(localVar);  // ✅ OK
}

test();
console.log(localVar); // ❌ LỖI: localVar is not defined
```

## 3.2. Closures (Bao đóng - Khái niệm nâng cao)
Đơn giản là: **Hàm con có thể nhớ được biến của hàm cha**, ngay cả khi hàm cha đã chạy xong.
(Phần này sẽ đào sâu hơn khi học nâng cao, hiện tại chỉ cần biết con dùng được đồ của cha).

---

# 4. **TỔNG KẾT**

- Function giúp đóng gói logic để dùng lại.
- Luôn dùng `return` nếu muốn lấy kết quả ra ngoài.
- **Arrow Function `() => {}`** là cú pháp hiện đại nên dùng.
- Chú ý **Scope**: Biến trong hàm thì bên ngoài không đụng vào được (tính bảo mật/encapsulation).

---

**Chương tiếp theo:** Làm việc với danh sách lớn và đối tượng phức tạp (Arrays & Objects).
