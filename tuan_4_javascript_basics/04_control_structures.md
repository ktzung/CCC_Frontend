# 🟨 PART II - CHƯƠNG 04
# **CONTROL STRUCTURES**

Nếu không có cấu trúc điều khiển, code sẽ chạy tuồn tuột từ trên xuống dưới. Control Structures giúp code biết rẽ nhánh (Nếu...thì...) và lặp lại (Làm A 100 lần).

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Sử dụng `if`, `else`, `switch` để điều hướng logic.
- Sử dụng vòng lặp `for`, `while` để xử lý công việc lặp lại.
- Hiểu sự khác biệt giữa `==` và `===`.

---

# 1. **CONDITIONAL STATEMENTS (CÂU LỆNH ĐIỀU KIỆN)**

## 1.1. If...Else (Nếu...Thì...Còn không thì...)

```javascript
const age = 18;

if (age >= 18) {
  console.log("Bạn đủ tuổi đi xem phim kinh dị.");
} else if (age >= 13) {
  console.log("Bạn chỉ được xem phim hoạt hình.");
} else {
  console.log("Mời bạn về uống sữa.");
}
```

## 1.2. Truthy & Falsy
Trong JS, không chỉ `true/false`, mà mọi giá trị đều có tính đúng/sai khi đưa vào if.
- **Falsy (Coi là sai):** `false`, `0`, `""` (chuỗi rỗng), `null`, `undefined`, `NaN`.
- **Truthy (Coi là đúng):** Tất cả những thứ còn lại (kể cả `"0"`, `"false"`, `[]`, `{}`).

## 1.3. Switch Case
Dùng khi check 1 biến với NHIỀU giá trị cụ thể.

```javascript
const role = "admin";

switch (role) {
  case "admin":
    console.log("Toàn quyền hệ thống");
    break; // Quên break là nó chạy trượt xuống dưới đấy!
  case "editor":
    console.log("Được sửa bài viết");
    break;
  default:
    console.log("Chỉ được xem thôi");
}
```

## 1.4. Comparison Operators (Toán tử so sánh)
- `>` (Lớn hơn), `<` (Nhỏ hơn), `>=` (Lớn bằng).
- `!` (Not/Phủ định): `!true` = `false`.
- `&&` (And/Và): Cả 2 cùng đúng mới đúng.
- `||` (Or/Hoặc): Chỉ cần 1 cái đúng là đúng.

> [!EXPERT TIP]
> **Luôn dùng `===` (Strict/Ba dấu bằng)**
> - `==` (Hai dấu): So sánh giá trị logic (JS tự ép kiểu). Ví dụ: `5 == "5"` -> True. (Rất dễ bug!).
> - `===` (Ba dấu): So sánh cả giá trị VÀ kiểu dữ liệu. Ví dụ: `5 === "5"` -> False. (An toàn).
> -> **Luôn dùng `===` và `!==`.**

---

# 2. **LOOPS (VÒNG LẶP)**

Để máy tính làm việc chán nản thay cho bạn.

## 2.1. Vòng lặp `for` (Biết trước số lần lặp)
Cấu trúc: `for (khởi tạo; điều kiện; bước nhảy)`

```javascript
// In ra từ 0 đến 4
for (let i = 0; i < 5; i++) {
  console.log("Lần lặp thứ: " + i);
}
```

## 2.2. Vòng lặp `while` (Lặp khi điều kiện còn đúng)
Dùng khi không biết rõ sẽ lặp bao nhiêu lần (VD: Lặp cho đến khi người dùng nhập đúng pass).

```javascript
let count = 0;
while (count < 3) {
  console.log("Chạy ngay đi!");
  count++;
}
```

## 2.3. Break & Continue
- **break:** Thoát ngay lập tức khỏi vòng lặp.
- **continue:** Bỏ qua lần này, nhảy sang lần lặp kế tiếp.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // Gặp 5 là dừng luôn.
  if (i % 2 === 0) continue; // Số chẵn thì bỏ qua, không in.
  console.log(i); // In số lẻ: 1, 3
}
```

---

# 3. **TỔNG KẾT**

- Dùng **If/Else** cho logic phức tạp, **Switch** cho liệt kê giá trị.
- Luôn dùng **`===`** để so sánh.
- Dùng **For** khi lặp mảng hoặc đếm số, **While** khi đợi điều kiện.

---

**Chương tiếp theo:** Đóng gói code để tái sử dụng nhiều lần (Functions).
