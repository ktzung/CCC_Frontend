# Tier 1 — Làm quen JavaScript (Biến, Kiểu dữ liệu, Toán tử)

> **Thời gian:** 30-40 phút  
> **Mục tiêu:** Hiểu cách khai báo biến, các kiểu dữ liệu cơ bản, và sử dụng toán tử

---

## 📝 Bài 1.1 — Hello Console (5 phút)

### Yêu cầu
Tạo file HTML đầu tiên, in thông tin ra console.

### Bước 1: Tạo file `hello.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hello JavaScript</title>
</head>
<body>
    <h1>Mở Console (F12) để xem kết quả</h1>
    
    <script>
        // In ra console
        console.log("Xin chào JavaScript!");
        console.log("Tôi là sinh viên năm 2026");
        console.log(100 + 200);
    </script>
</body>
</html>
```

### Bước 2: Chạy và kiểm tra
- Mở file trong trình duyệt
- Nhấn F12 → chọn tab Console
- Phải thấy 3 dòng output

### Câu hỏi suy nghĩ
1. `console.log()` khác gì `alert()`?
2. Thử thay `console.log()` bằng `document.write()` → có gì khác?

---

## 📝 Bài 1.2 — Khai báo biến (10 phút)

### Yêu cầu
Thực hành 3 cách khai báo biến: `let`, `const`, `var`

### Code mẫu
```javascript
// ===== LET - biến có thể thay đổi =====
let ten = "Minh";
let tuoi = 20;
let laSinhVien = true;

console.log("Tên:", ten);
console.log("Tuổi:", tuoi);
console.log("Là sinh viên:", laSinhVien);

// Thay đổi giá trị
tuoi = 21;
console.log("Tuổi mới:", tuoi);

// ===== CONST - hằng số, KHÔNG thay đổi được =====
const PI = 3.14;
const TEN_TRUONG = "Đại học Thủy Lợi";

console.log("PI =", PI);
console.log("Trường:", TEN_TRUONG);

// Thử uncomment dòng dưới → sẽ báo lỗi!
// PI = 3.15;  // ❌ TypeError: Assignment to constant variable

// ===== VAR - cách cũ, ít dùng =====
var soLanHoc = 1;
console.log("Số lần học:", soLanHoc);
```

### Thử thách
1. Khai báo biến `monHoc` chứa tên môn học yêu thích
2. Khai báo `soTinChi` với số tín chỉ (dùng const)
3. In ra: `"Môn [monHoc] có [soTinChi] tín chỉ"`

---

## 📝 Bài 1.3 — Các kiểu dữ liệu (10 phút)

### Yêu cầu
Hiểu và kiểm tra các kiểu dữ liệu trong JS

### Code mẫu
```javascript
// String (chuỗi)
let hoTen = "Nguyễn Văn A";
let diaChi = 'Hà Nội';
let template = `Sinh viên ${hoTen}`;

console.log(typeof hoTen);    // "string"
console.log(hoTen.length);    // 13

// Number (số)
let tuoi = 20;
let diem = 8.5;
let am = -5;
let voCuc = Infinity;

console.log(typeof tuoi);     // "number"

// Boolean (đúng/sai)
let laNam = true;
let coMat = false;

console.log(typeof laNam);    // "boolean"

// Null và Undefined
let chuaNhap = null;           // chủ động gán rỗng
let chuaKhoiTao;               // chưa gán giá trị

console.log(chuaNhap);        // null
console.log(chuaKhoiTao);     // undefined
console.log(typeof chuaNhap); // "object" (bug nổi tiếng của JS!)

// Array (mảng)
let monHoc = ["HTML", "CSS", "JS"];
console.log(typeof monHoc);   // "object"
console.log(Array.isArray(monHoc)); // true

// Object (đối tượng)
let sinhVien = {
    ten: "Minh",
    tuoi: 20,
    lop: "CNTT-K65"
};
console.log(typeof sinhVien); // "object"
```

### Thử thách
1. Tạo 5 biến với 5 kiểu dữ liệu khác nhau
2. Dùng `typeof` để kiểm tra từng biến
3. Thử `typeof null` → giải thích kết quả

---

## 📝 Bài 1.4 — Toán tử cơ bản (10 phút)

### Yêu cầu
Thực hành các loại toán tử trong JavaScript

### Code mẫu
```javascript
// ===== Toán tử số học =====
let a = 10, b = 3;

console.log("Cộng:", a + b);      // 13
console.log("Trừ:", a - b);       // 7
console.log("Nhân:", a * b);      // 30
console.log("Chia:", a / b);      // 3.333...
console.log("Chia lấy dư:", a % b); // 1
console.log("Lũy thừa:", a ** b); // 1000

// ===== Toán tử chuỗi =====
let ho = "Nguyễn";
let ten = "Minh";
let hoTen = ho + " " + ten;      // Nối chuỗi
console.log(hoTen);

// Template literal (cách hay hơn)
let loiChao = `Xin chào ${hoTen}!`;
console.log(loiChao);

// ===== Toán tử so sánh =====
console.log(5 == "5");    // true  (so sánh giá trị)
console.log(5 === "5");   // false (so sánh giá trị + kiểu)
console.log(5 != "5");    // false
console.log(5 !== "5");   // true

console.log(10 > 5);      // true
console.log(10 < 5);      // false
console.log(10 >= 10);    // true

// ===== Toán tử logic =====
let diem = 7.5;
let soBuoiHoc = 12;

// AND (&&) - cả hai đều đúng
console.log(diem >= 5 && soBuoiHoc >= 10); // true

// OR (||) - một trong hai đúng
console.log(diem >= 8 || soBuoiHoc >= 10); // true

// NOT (!) - đảo ngược
console.log(!(diem < 5));  // true
```

### Thử thách
1. Tính diện tích hình tròn với `banKinh = 5` (PI * r²)
2. Kiểm tra sinh viên đậu/tốt nghiệp: `diemTB >= 5 && soTinChi >= 120`
3. Dùng template literal in ra: `"Sinh viên [ten] đạt điểm [diem]"`

---

## ✅ Checklist hoàn thành

- [ ] Tạo được file HTML với JavaScript
- [ ] Hiểu `console.log()` và cách mở Console
- [ ] Phân biệt được `let`, `const`, `var`
- [ ] Nhận biết 6 kiểu dữ liệu cơ bản
- [ ] Sử dụng được toán tử số học, chuỗi, so sánh, logic
- [ ] Hiểu sự khác biệt giữa `==` và `===`

---

## 🎯 Tự đánh giá

| Câu hỏi | Đúng/Sai |
|---------|----------|
| `const` có thể thay đổi giá trị sau khi khai báo | □ |
| `typeof null` trả về `"null"` | □ |
| `"5" === 5` trả về `true` | □ |
| `&&` yêu cầu CẢ HAI điều kiện đúng | □ |
| Template literal dùng dấu `` ` `` (backtick) | □ |

---

**→ Tiếp theo: [Tier 2 — Điều kiện & Vòng lặp](TIER_2_control_flow.md)**
