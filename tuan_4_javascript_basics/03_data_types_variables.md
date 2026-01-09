# 🟨 PART II - CHƯƠNG 03
# **DATA TYPES AND VARIABLES**

Lập trình về cơ bản là **xử lý dữ liệu**. Để xử lý được, ta cần **lưu trữ** nó vào các "hộp chứa" gọi là Biến (Variables).

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Phân biệt rõ ràng `var`, `let`, `const`.
- Hiểu các kiểu dữ liệu cơ bản: String, Number, Boolean, Undefined, Null.
- Biết cách đặt tên biến chuẩn mực.

---

# 1. **VARIABLES (BIẾN SỐ)**

Biến giống như một cái bình đựng nước. Bạn dán nhãn cái bình là "nuoc_ngot" và đổ Coca vào.

## 1.1. Khai báo biến (Declaration)
Ngày xưa ta dùng `var`. Ngày nay (ES6+), hãy quên `var` đi và dùng `let` / `const`.

### `var` (Cũ - Hạn chế dùng)
- Phạm vi rộng (Function scope), dễ gây lỗi logic.
- Bị Hoisting (có thể dùng trước khi khai báo -> Rất nguy hiểm).

### `let` (Hiện đại - Dùng khi giá trị thay đổi)
- Phạm vi hẹp (Block scope `{}`). An toàn.
- Dùng cho: Biến đếm, điểm số, giá trị cần cập nhật.

```javascript
let score = 0;
score = 10; // OK
```

### `const` (Hiện đại - Dùng mặc định)
- Viết tắt của Constant (Hằng số).
- Khai báo xong KHÔNG được gán lại giá trị khác.
- Dùng cho: PI, cấu hình, tên, những thứ cố định.

```javascript
const PI = 3.14;
PI = 3.15; // ❌ LỖI NGAY: Assignment to constant variable.
```

> [!TIP]
> **Quy tắc vàng:** Luôn dùng `const`. Chỉ khi nào chắc chắn giá trị sẽ thay đổi thì mới đổi sang `let`. Tuyệt đối tránh `var`.

---

# 2. **DATA TYPES (KIỂU DỮ LIỆU)**

JS là ngôn ngữ **Dynamic Typing** (Kiểu động). Bạn không cần khai báo kiểu (`int`, `string`), máy tự hiểu.

## 2.1. Basic Types (Nguyên thủy)

1.  **String (Chuỗi):** Ký tự, văn bản. Bao quanh bởi `' '` hoặc `" "`.
    ```javascript
    const name = "Hung";
    const message = 'Hello';
    ```

2.  **Number (Số):** Số nguyên, số thực dùng chung 1 kiểu.
    ```javascript
    const age = 25;
    const price = 10.99;
    ```

3.  **Boolean (Logic):** Chỉ có `true` (đúng) hoặc `false` (sai).
    ```javascript
    const isOnline = true;
    const isFinished = false;
    ```

4.  **Undefined (Không xác định):** Biến đã khai báo nhưng chưa gán giá trị.
    ```javascript
    let container; 
    console.log(container); // undefined
    ```

5.  **Null (Rỗng):** Cố ý gán giá trị là "không có gì".
    ```javascript
    const wallet = null; // Ví rỗng
    ```

## 2.2. Kiểm tra kiểu (`typeof`)
```javascript
typeof "Hello" // "string"
typeof 100     // "number"
typeof true    // "boolean"
```

---

# 3. **NAMING CONVENTIONS (QUY TẮC ĐẶT TÊN)**

Trong JS, chúng ta dùng quy tắc **camelCase** (lạc đà).
- Bắt đầu viết thường.
- Chữ cái đầu của từ tiếp theo viết hoa.
- Không dùng dấu gạch ngang `-` (để dành cho phép trừ), không bắt đầu bằng số.

**Ví dụ:**
- `userName` (✅ Chuẩn)
- `user_name` (❌ Kiểu Python/PHP)
- `UserName` (❌ Thường dùng cho Class/Component)
- `1stPlace` (❌ Lỗi cú pháp)

---

# 4. **TỔNG KẾT**

- **const**: Dùng cho hằng số (mặc định).
- **let**: Dùng cho biến thay đổi.
- **String, Number, Boolean**: 3 kiểu dữ liệu cốt lõi.
- Đặt tên biến theo **camelCase** và có ý nghĩa rõ ràng (ví dụ `isLoggedIn` thay vì `x`).

---

**Chương tiếp theo:** Làm sao để máy tính ra quyết định? (If, Else, Loop).
