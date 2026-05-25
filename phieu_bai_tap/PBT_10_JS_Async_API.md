# 📋 PHIẾU BÀI TẬP 10
# **ASYNC JAVASCRIPT & API INTEGRATION**

> **Tài liệu tham chiếu:** `tuan_5_javascript_dom_async/20_ajax_async.md` + `21_professional_dev_process.md`
>
> ⏱️ **Thời gian:** 180 phút | 📊 **Tổng điểm:** 100
>
> ⚠️ **Phiếu này yêu cầu kết nối Internet** để gọi API thật

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

Đọc chương 20. Dự đoán thứ tự output:

```javascript
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```

Thứ tự output = ??? Giải thích Event Loop, Microtask Queue, Macrotask Queue.

### Câu A2 (5đ) — Fetch API

Giải thích từng dòng code:

```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

1. `await fetch(...)` — `fetch` trả về gì? Tại sao cần `await`?
2. `response.ok` — Khi nào `false`? Liệt kê 3 status codes tương ứng.
3. `response.json()` — Tại sao cần `await` lần nữa?
4. `try...catch` — Catch những lỗi gì? (Network error? 404? JSON parse error?)

### Câu A3 (5đ) — Promise States

Vẽ sơ đồ 3 trạng thái của Promise (`Pending → Fulfilled`, `Pending → Rejected`).

Giải thích: Callback Hell là gì? Viết ví dụ 4 cấp callback hell → Refactor thành async/await.

---

## PHẦN B — THỰC HÀNH CODE (65 điểm)

### Bài B1 (15đ) — Weather App

Tạo folder `weather_app/`:

**API miễn phí:** Dùng [wttr.in](https://wttr.in) hoặc [Open-Meteo](https://open-meteo.com/en/docs)

```
https://wttr.in/Hanoi?format=j1
https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true
```

**Chức năng:**
- [ ] Input nhập tên thành phố + nút "Tìm"
- [ ] Gọi API lấy thời tiết hiện tại
- [ ] Hiển thị: Nhiệt độ, Độ ẩm, Mô tả thời tiết, Icon
- [ ] **3 States bắt buộc:**
  - Loading: Hiện spinner + "Đang tải..."  
  - Success: Hiện thông tin thời tiết
  - Error: Hiện thông báo lỗi (thành phố không tồn tại, mất mạng)
- [ ] Lưu lịch sử tìm kiếm vào LocalStorage (5 thành phố gần nhất)
- [ ] Click vào lịch sử → tìm lại

**Chấm điểm:**
- 5đ: Gọi API fetch thành công + parse JSON
- 5đ: 3 states (Loading/Success/Error) hiển thị đúng
- 5đ: Lịch sử + LocalStorage

### Bài B2 (20đ) — User Directory (CRUD)

Tạo folder `user_directory/`:

**API:** Dùng [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

```
GET    /users          ← Lấy danh sách users
GET    /users/:id      ← Lấy chi tiết 1 user
POST   /users          ← Tạo user mới
PUT    /users/:id      ← Cập nhật user
DELETE /users/:id      ← Xóa user
```

**Chức năng:**

- [ ] **READ:** Load danh sách users từ API → Render dạng card/table
- [ ] **CREATE:** Form thêm user mới → POST lên API → Thêm vào danh sách (không reload)
- [ ] **UPDATE:** Click "Edit" → Form điền sẵn data cũ → PUT lên API → Cập nhật hiển thị
- [ ] **DELETE:** Click "Delete" → Confirm dialog → DELETE API → Xóa khỏi danh sách
- [ ] **SEARCH:** Ô tìm kiếm lọc user theo name/email (client-side filter)
- [ ] **Loading states:** Skeleton loader khi đang fetch
- [ ] **Error handling:** Hiện toast/alert khi có lỗi API

**Yêu cầu code:**
```javascript
// Tách riêng API layer:
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() { /* GET /users */ },
    async getUser(id) { /* GET /users/:id */ },
    async createUser(data) { /* POST /users */ },
    async updateUser(id, data) { /* PUT /users/:id */ },
    async deleteUser(id) { /* DELETE /users/:id */ }
};

// Tách riêng UI layer:
const ui = {
    renderUsers(users) { /* ... */ },
    showLoading() { /* ... */ },
    hideLoading() { /* ... */ },
    showError(message) { /* ... */ },
    showSuccess(message) { /* ... */ }
};
```

### Bài B3 (15đ) — Infinite Scroll Gallery

Tạo folder `gallery/`:

**API:** Dùng [JSONPlaceholder Photos](https://jsonplaceholder.typicode.com/photos) hoặc [Lorem Picsum](https://picsum.photos/)

```
https://jsonplaceholder.typicode.com/photos?_page=1&_limit=20
https://picsum.photos/v2/list?page=1&limit=20
```

**Chức năng:**
- [ ] Load 20 ảnh đầu tiên khi mở trang
- [ ] **Infinite scroll:** Khi user scroll gần đáy trang → Tự động load 20 ảnh tiếp
- [ ] Thêm **"đang tải thêm..."** indicator khi đang fetch
- [ ] **Lazy loading images:** Ảnh chỉ load khi xuất hiện trong viewport (dùng `IntersectionObserver`)
- [ ] Click ảnh → Mở lightbox (modal) hiển thị ảnh lớn
- [ ] Grid responsive: 4 cột desktop, 2 cột tablet, 1 cột mobile

**Yêu cầu kỹ thuật:**
```javascript
// IntersectionObserver cho infinite scroll:
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
});
observer.observe(document.querySelector("#load-trigger"));
```

### Bài B4 (15đ) — Multi-API Dashboard

Tạo folder `dashboard/`:

Xây dashboard tổng hợp data từ **ít nhất 3 API khác nhau**:

**Gợi ý APIs miễn phí:**
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — Users, Posts, Comments
- [Open-Meteo](https://open-meteo.com/) — Weather
- [REST Countries](https://restcountries.com/v3.1/name/vietnam) — Country info
- [Random User](https://randomuser.me/api/?results=5) — Random users
- [Dog API](https://dog.ceo/api/breeds/image/random/5) — Random dog images

**Chức năng:**
- [ ] Gọi **song song** 3 APIs dùng `Promise.all()` hoặc `Promise.allSettled()`
- [ ] Hiện Loading tổng thể khi đang fetch tất cả
- [ ] Layout dashboard: Mỗi API hiển thị trong 1 widget/card
- [ ] Mỗi widget có **trạng thái riêng** (loading/success/error) — 1 API lỗi không ảnh hưởng widget khác
- [ ] Nút "Refresh All" — Gọi lại tất cả APIs
- [ ] Hiện thời gian fetch: "Data loaded in X ms"

**Code bắt buộc:**
```javascript
// Promise.allSettled — xử lý khi 1 API lỗi
async function loadDashboard() {
    const startTime = Date.now();
    
    const results = await Promise.allSettled([
        fetch("https://api1...").then(r => r.json()),
        fetch("https://api2...").then(r => r.json()),
        fetch("https://api3...").then(r => r.json())
    ]);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
    
    console.log(`Loaded in ${Date.now() - startTime}ms`);
}
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

Bạn xây dựng app E-Commerce gọi nhiều APIs. Thiết kế **chiến lược xử lý lỗi**:

1. **Network errors** (mất mạng giữa chừng) → Xử lý thế nào?
2. **API errors** (server trả 500, 404, 429 Too Many Requests) → Xử lý từng loại
3. **Timeout** (API chậm > 10 giây) → Viết code `fetchWithTimeout(url, ms)`
4. **Retry logic** (thử lại 3 lần nếu lỗi network) → Viết code `fetchWithRetry(url, maxRetries)`

Viết code + giải thích cho mỗi tình huống.

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

Giải thích sự khác nhau. Cho ví dụ thực tế khi nào dùng mỗi cái:

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | ??? | ??? | ??? |
| `.allSettled()` | ??? | ??? | ??? |
| `.race()` | ??? | ??? | ??? |
| `.any()` | ??? | ??? | ??? |

Viết ví dụ code cho mỗi method với scenario thực tế (không phải ví dụ `delay` đơn giản).

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 10-15 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Fetch API — Gọi dữ liệu từ JSONPlaceholder"

**Yêu cầu:** Quay video viết code gọi API thật, hiển thị data lên trang, xử lý loading/error.

**Trong video, bạn phải:**

1. 🎤 Giải thích Sync vs Async: "Sync = xếp hàng, Async = đặt số"
2. 🎤 Viết hàm `async function getUsers()` dùng `fetch` + `await`:
   ```javascript
   async function getUsers() {
       try {
           const res = await fetch("https://jsonplaceholder.typicode.com/users");
           if (!res.ok) throw new Error(`HTTP ${res.status}`);
           const users = await res.json();
           return users;
       } catch (error) {
           console.error("Lỗi:", error);
           return [];
       }
   }
   ```
3. 🎤 Giải thích từng dòng:
   - `await fetch(...)` — tại sao cần `await`? Fetch trả Promise
   - `response.ok` — khi nào false?
   - `response.json()` — tại sao CŨNG cần `await`?
   - `try...catch` — catch bắt lỗi gì?
4. 🎤 Render users lên DOM bằng `createElement`
5. 🎤 Demo 3 states:
   - Loading: Hiện "⏳ Đang tải..." trước khi data về
   - Success: Render danh sách users
   - Error: Tắt wifi → gọi API → show thông báo lỗi
6. 🎤 Bật lại wifi → gọi lại → data trở lại

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ async/await code từng dòng
- [ ] Demo 3 states: Loading → Success → Error (tắt wifi)
- [ ] Cuối video: Tổng kết async/await + error handling

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] Folder `weather_app/` — Bài B1
- [ ] Folder `user_directory/` — Bài B2
- [ ] Folder `gallery/` — Bài B3
- [ ] Folder `dashboard/` — Bài B4
- [ ] Folder `screenshots/` — mỗi app: loading state + success state + error state
- [ ] 🎬 **Video OBS** — `videos/PBT10_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] **Video demo** (bắt buộc ≥ 1 app): Quay màn hình app đang hoạt động
- [ ] Ít nhất **5 commits**
- [ ] README.md trong mỗi folder ghi: API đã dùng + cách chạy
