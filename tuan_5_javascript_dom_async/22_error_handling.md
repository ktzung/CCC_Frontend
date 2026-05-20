# 🟨 TUẦN 5 - BÀI 22
# **ERROR HANDLING — Xử lý lỗi chuyên nghiệp**

---

## 0. 🎬 Opening Hook

*Minh deploy Todo App lên production. Người dùng nhập ký tự đặc biệt vào ô tìm kiếm → trang trắng.*

*"Không có try-catch, bất kỳ lỗi nào cũng crash toàn bộ ứng dụng," anh Hùng nói. "Production thì KHÔNG được phép trắng trang. Phải bắt lỗi, hiển thị fallback, ghi log."*

```javascript
// ❌ Không có error handling → crash
const data = JSON.parse(userInput);  // userInput = "abc" → CRASH

// ✅ Có error handling → graceful degradation
try {
    const data = JSON.parse(userInput);
    renderData(data);
} catch (error) {
    showError("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
    logError(error);  // Gửi về server để debug
}
```

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

- **Production code KHÔNG BAO GIỜ được crash** → phải có error handling
- **User input là unreliable** → luôn validate + try-catch
- **API calls có thể fail** → network error, timeout, server 500
- **Debugging**: Hiểu error types = fix bug nhanh gấp 10 lần

> "Code không có error handling = nhà không có khóa cửa."

---

## 2. 🌐 Big Picture — Bản đồ Error Handling

```
ERROR HANDLING trong JavaScript
│
├── try...catch...finally — Bắt và xử lý lỗi
│   ├── try    → Code có thể gây lỗi
│   ├── catch  → Xử lý khi lỗi xảy ra
│   └── finally → Luôn chạy (cleanup)
│
├── throw — Tạo lỗi tùy chỉnh
│   ├── throw "Error message"
│   ├── throw new Error("message")
│   └── throw new CustomError("message")
│
├── Error Types — Các loại lỗi phổ biến
│   ├── ReferenceError  → Biến chưa khai báo
│   ├── SyntaxError      → Sai cú pháp
│   ├── TypeError        → Sai kiểu dữ liệu
│   ├── RangeError       → Giá trị ngoài phạm vi
│   └── URIError         → Sai URI
│
├── Async Error Handling
│   ├── try...catch với async/await
│   └── .catch() với Promises
│
└── Custom Errors — Lỗi tùy chỉnh
    └── class AppError extends Error
```

---

## 3. ⚙️ Core Technical Truth

### try...catch...finally

```javascript
try {
    // Code có thể gây lỗi
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // Chạy KHI có lỗi
    console.error("Lỗi:", error.message);
} finally {
    // LUÔN chạy — dù có lỗi hay không
    cleanup();
}
```

**Luồng thực thi:**
- Không lỗi: try → finally
- Có lỗi: try → catch → finally

```javascript
// Ví dụ thực tế: parse JSON từ API
function parseResponse(rawData) {
    try {
        const data = JSON.parse(rawData);
        return { success: true, data };
    } catch (error) {
        console.error("JSON parse error:", error.message);
        return { success: false, error: "Dữ liệu không hợp lệ" };
    } finally {
        console.log("Parse hoàn tất");
    }
}

parseResponse('{"name": "Minh"}');  // { success: true, data: {name: "Minh"} }
parseResponse('invalid json');       // { success: false, error: "..." }
```

---

### Error Object — Thông tin lỗi

```javascript
try {
    undefinedFunction();
} catch (error) {
    console.log(error.name);     // "ReferenceError"
    console.log(error.message);  // "undefinedFunction is not defined"
    console.log(error.stack);    // Stack trace (dòng lỗi)
}
```

**Các thuộc tính của Error:**
- `error.name` — Tên loại lỗi
- `error.message` — Mô tả lỗi
- `error.stack` — Stack trace (rất hữu ích cho debugging)

---

### Các loại Error phổ biến

```javascript
// 1. ReferenceError — dùng biến chưa khai báo
try {
    console.log(undefinedVar);
} catch (e) {
    console.log(e.name);  // "ReferenceError"
}

// 2. TypeError — gọi method sai kiểu
try {
    const num = 42;
    num.toUpperCase();  // Number không có toUpperCase
} catch (e) {
    console.log(e.name);  // "TypeError"
}

// 3. SyntaxError — sai cú pháp (thường bị bắt ở compile time)
try {
    eval("const x = ;");  // SyntaxError
} catch (e) {
    console.log(e.name);  // "SyntaxError"
}

// 4. RangeError — giá trị ngoài phạm vi
try {
    const arr = new Array(-1);  // Array size không âm
} catch (e) {
    console.log(e.name);  // "RangeError"
}
```

---

### throw — Tạo lỗi tùy chỉnh

```javascript
// throw dừng thực thi và chuyển control đến catch
function divide(a, b) {
    if (b === 0) {
        throw new Error("Không thể chia cho 0");
    }
    return a / b;
}

try {
    const result = divide(10, 0);
} catch (error) {
    console.log(error.message);  // "Không thể chia cho 0"
}

// throw với nhiều kiểu dữ liệu
throw "Lỗi dạng string";        // Không khuyến nghị
throw 42;                        // Không khuyến nghị
throw new Error("Có lỗi xảy ra"); // ✅ Khuyến nghị
```

---

### Custom Error Classes

```javascript
// Tạo error class riêng cho ứng dụng
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NotFoundError extends Error {
    constructor(resource, id) {
        super(`${resource} với id=${id} không tìm thấy`);
        this.name = "NotFoundError";
        this.resource = resource;
        this.id = id;
    }
}

// Sử dụng
function validateAge(age) {
    if (typeof age !== "number") {
        throw new ValidationError("Tuổi phải là số", "age");
    }
    if (age < 0 || age > 150) {
        throw new ValidationError("Tuổi không hợp lệ", "age");
    }
    return true;
}

try {
    validateAge("abc");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Lỗi trường ${error.field}: ${error.message}`);
    } else {
        throw error;  // Re-throw lỗi không xác định
    }
}
```

---

### Async Error Handling

```javascript
// 1. try...catch với async/await
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Lỗi fetch user:", error.message);
        // Hiển thị UI lỗi cho user
        showErrorUI("Không thể tải thông tin người dùng");
        return null;
    }
}

// 2. .catch() với Promises
fetch("/api/data")
    .then(res => res.json())
    .then(data => renderData(data))
    .catch(error => {
        console.error("Lỗi:", error);
        showErrorUI("Có lỗi xảy ra");
    });

// 3. Global error handler
window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    // Gửi về server monitoring
});

window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
});
```

---

### Best Practices

```javascript
// ✅ 1. Catch cụ thể — không catch tất cả
try {
    const data = JSON.parse(input);
    const result = processData(data);
} catch (error) {
    if (error instanceof SyntaxError) {
        showWarning("Dữ liệu không hợp lệ");
    } else if (error instanceof NetworkError) {
        showWarning("Mất kết nối mạng");
    } else {
        // Lỗi không xác định → log và re-throw
        logToServer(error);
        throw error;
    }
}

// ✅ 2. Luôn log error để debug
catch (error) {
    console.error(`[${new Date().toISOString()}]`, error);
    logToServer({ message: error.message, stack: error.stack });
}

// ✅ 3. Hiển thị lỗi thân thiện cho user
catch (error) {
    // ❌ Không show raw error cho user
    showError(error.message);  // "TypeError: Cannot read property 'x' of undefined"

    // ✅ Show message thân thiện
    showError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
}

// ✅ 4. Cleanup trong finally
async function processData() {
    const connection = await openConnection();
    try {
        const data = await connection.query("SELECT * FROM users");
        return data;
    } finally {
        await connection.close();  // Luôn đóng kết nối
    }
}
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Viết function chia 2 số, throw Error nếu chia cho 0
// 2. Bọc code sau trong try...catch:
//    const data = JSON.parse("invalid");
// 3. Viết function lấy phần tử array theo index, throw nếu index ngoài phạm vi
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Viết function validate form với custom errors:
//    - EmptyError: trường trống
//    - EmailError: email không hợp lệ
//    - LengthError: quá ngắn/dài

// 2. Viết function fetchWithErrorHandling(url) dùng async/await
//    - Xử lý network error
//    - Xử lý HTTP error (404, 500)
//    - Parse JSON error

// 3. Viết function safeJsonParse(str) trả về { success, data, error }
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Implement retry mechanism:
//    async function retry(fn, maxAttempts = 3, delay = 1000)
//    - Thử lại khi fail
//    - Exponential backoff

// 2. Viết ErrorBoundary pattern:
//    function safeExecute(fn, fallback)
//    - Nếu fn() thành công → trả kết quả
//    - Nếu fn() lỗi → trả fallback + log error

// 3. Viết validation middleware chain:
//    const validate = chain(required("name"), email(), minLength("password", 8));
//    validate({ name: "", email: "abc", password: "123" });
//    → [{ field: "name", error: "required" }, ...]
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 14 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/14_Day_Error_handling/14_day_error_handling.md)*
