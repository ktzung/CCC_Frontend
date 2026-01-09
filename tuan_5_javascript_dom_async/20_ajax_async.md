# 🟨 PART II - CHƯƠNG 20
# **AN INTRODUCTION TO AJAX & ASYNC**

Lập trình web hiện đại không thể thiếu kết nối Server (API). Bạn cần lấy dữ liệu thời tiết, load danh sách comment, gửi tin nhắn... mà không làm đơ trình duyệt. Đó là nhiệm vụ của **Asynchronous JavaScript** (Bất đồng bộ).

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu **Sync** (Đồng bộ) vs **Async** (Bất đồng bộ).
- Làm quen với **JSON** - ngôn ngữ giao tiếp của Internet.
- Sử dụng **Fetch API** để gọi dữ liệu từ Server.
- Nắm vững **Async / Await** (Cú pháp hiện đại nhất).

---

# 1. **SYNC VS ASYNC**

- **Synchronous (Đồng bộ):** Chạy tuần tự. Dòng 1 xong mới chạy dòng 2. Nếu dòng 1 lâu (tải file to), toàn bộ trang web bị **ĐƠ (Blocking)**.
- **Asynchronous (Bất đồng bộ):** Chạy song song. Dặn máy: "Mày tải file đi, xong thì báo tao, tao làm việc khác đây". Web vẫn mượt.

---

# 2. **JSON (JAVASCRIPT OBJECT NOTATION)**

Là định dạng dữ liệu nhẹ để trao đổi thông tin giữa Client và Server. Nó trông y hệt JavaScript Object nhưng key phải có dấu ngoặc kép.

**File: data.json**
```json
{
  "name": "Hung",
  "age": 25,
  "skills": ["HTML", "CSS", "JS"]
}
```

- **`JSON.stringify(obj)`**: Biến Object JS -> Chuỗi JSON (Để gửi đi).
- **`JSON.parse(string)`**: Biến Chuỗi JSON -> Object JS (Để đọc).

---

# 3. **FETCH API & PROMISES**

Ngày xưa dùng `XMLHttpRequest` (Ajax cũ). Giờ ta dùng `fetch`.
`fetch` trả về một **Promise** (Lời hứa): "Tôi hứa sẽ trả về dữ liệu (hoặc lỗi) trong tương lai".

```javascript
fetch('https://api.example.com/users')
  .then(response => response.json()) // Chuyển data thô thành JSON
  .then(data => {
    console.log(data); // Xử lý dữ liệu ở đây
  })
  .catch(error => {
    console.error("Lỗi rồi:", error); // Xử lý lỗi
  });
```

---

# 4. **ASYNC / AWAIT (MODERN SYNTAX)**

Dùng Promise `.then()` vẫn hơi rối (Callback Hell). ES8 sinh ra `async/await` giúp code bất đồng bộ nhìn "như là" đồng bộ. Dễ đọc hơn nhiều.

```javascript
async function getUsers() {
  try {
    // Await: Đợi fetch xong mới chạy dòng tiếp
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    
    console.log(data);
    // Render ra HTML...
  } catch (error) {
    console.log("Có biến:", error);
  }
}

getUsers();
```

> [!TIP]
> **Quy tắc:**
> 1. Hàm phải có từ khóa `async` ở đầu.
> 2. Dùng `await` trước một hành động tốn thời gian (như fetch).
> 3. Luôn bọc trong `try...catch` để bắt lỗi (mất mạng, server sập).

---

# 5. **TỔNG KẾT**

- **Async** giúp web không bị đơ khi tải nặng.
- **JSON** là định dạng dữ liệu chuẩn.
- **Fetch API** kết hợp **Async/Await** là combo tiêu chuẩn để gọi API ngày nay.

---

**Chương tiếp theo:** Làm thế nào để làm việc chuyên nghiệp? (Tools, Git, Testing).
