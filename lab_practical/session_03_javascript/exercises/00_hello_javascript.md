# Exercise 0 — Hello JavaScript! (Làm quen với JavaScript)

## 🎬 Opening Scenario

*Đây là bài tập đầu tiên của bạn với JavaScript. Bạn sẽ học cách khai báo biến, sử dụng các kiểu dữ liệu, thực hiện phép tính, và in kết quả ra console — nền tảng cho mọi bài tập sau.*

---

## 🎯 Mục tiêu học tập

- Hiểu JavaScript là gì và chạy JS trong trình duyệt
- Khai báo biến với `let`, `const`, `var`
- Nhận biết các kiểu dữ liệu cơ bản: `string`, `number`, `boolean`, `null`, `undefined`
- Sử dụng toán tử số học, chuỗi, so sánh
- In kết quả ra console với `console.log()`

---

## 🪜 Bài tập chi tiết

### Bài 0.1 — Chào thế giới (5 phút)

**Yêu cầu:** Tạo file HTML đầu tiên có JavaScript.

**Bước 1:** Tạo file `hello.html`:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hello JavaScript</title>
</head>
<body>
    <h1>Bài tập đầu tiên với JavaScript</h1>
    <p>Mở Console (F12 → Console) để xem kết quả</p>

    <script>
        // Bài 1: In ra console
        console.log("Xin chào thế giới!");
        console.log("Tôi đang học JavaScript");
        console.log(2026);
    </script>
</body>
</html>
```

**Bước 2:** Mở file trong trình duyệt → nhấn `F12` → chọn tab **Console** → thấy 3 dòng output.

**Kết quả mong đợi:**
```
Xin chào thế giới!
Tôi đang học JavaScript
2026
```

**Câu hỏi:** `console.log()` khác gì so với `document.write()`?

---

### Bài 0.2 — Khai báo biến (10 phút)

**Yêu cầu:** Thực hành khai báo biến với `let`, `const`, `var`.

```javascript
// ===== LET — biến có thể thay đổi =====
let ten = "Minh";
let tuoi = 20;
let laSinhVien = true;

console.log("Tên:", ten);        // "Tên: Minh"
console.log("Tuổi:", tuoi);      // "Tuổi: 20"
console.log("Sinh viên:", laSinhVien); // "Sinh viên: true"

// Thay đổi giá trị
tuoi = 21;
console.log("Tuổi mới:", tuoi);  // "Tuổi mới: 21"

// ===== CONST — hằng số, KHÔNG thể thay đổi =====
const PI = 3.14159;
const TEN_TRUONG = "Đại học Thủy Lợi";

console.log("PI =", PI);
console.log("Trường:", TEN_TRUONG);

// ❌ Thử thay đổi const sẽ bị lỗi:
// PI = 3.14;  // TypeError: Assignment to constant variable

// ===== VAR — cách cũ, ít dùng =====
var monHoc = "CSE391";
console.log("Môn:", monHoc);
```

**Thử nghiệm:** Mở Console, gõ trực tiếp:
```javascript
> let x = 10;
> x        // → 10
> x = 20;  // → 20
> const Y = 100;
> Y = 200; // → ❌ Error!
```

**Câu hỏi phân biệt:**
| Câu hỏi | `let` | `const` | `var` |
|---------|-------|---------|-------|
| Có thể thay đổi giá trị? | ✅ Có | ❌ Không | ✅ Có |
| Có thể khai báo lại? | ❌ Không | ❌ Không | ✅ Có |
| Nên dùng trong code mới? | ✅ | ✅ | ❌ Tránh |

---

### Bài 0.3 — Các kiểu dữ liệu (10 phút)

**Yêu cầu:** Nhận biết và kiểm tra kiểu dữ liệu với `typeof`.

```javascript
// ===== STRING — Chuỗi =====
let hoTen = "Nguyễn Văn A";     // Dùng dấu ""
let diaChi = 'Hà Nội';          // Dùng dấu ''
let loiChao = `Xin chào ${hoTen}`; // Dùng backtick (template literal)

console.log(typeof hoTen);      // "string"
console.log(loiChao);           // "Xin chào Nguyễn Văn A"

// ===== NUMBER — Số =====
let soNguyen = 42;
let soThuc = 3.14;
let am = -10;
let voCuc = Infinity;

console.log(typeof soNguyen);   // "number"

// ===== BOOLEAN — Đúng/Sai =====
let laTrue = true;
let laFalse = false;

console.log(typeof laTrue);     // "boolean"

// ===== NULL & UNDEFINED =====
let giaTriNull = null;          // "không có gì" (cố tình)
let chuaGanGiaTri;              // undefined (chưa gán)

console.log(typeof giaTriNull);   // "object" (bug nổi tiếng của JS!)
console.log(typeof chuaGanGiaTri); // "undefined"

// ===== Kiểm tra kiểu =====
console.log("42 là:", typeof 42);          // number
console.log("'42' là:", typeof "42");      // string
console.log("true là:", typeof true);      // boolean
```

**Bài tập con:** Khai báo biến cho các thông tin sau và in ra console:
```javascript
// TODO: Khai báo các biến sau
// 1. Tên môn học (string)
// 2. Số tín chỉ (number)
// 3. Có phải bắt buộc không? (boolean)
// 4. Điểm số (number, chưa có → undefined)
```

---

### Bài 0.4 — Template Literal (10 phút)

**Yêu cầu:** Nối chuỗi và chèn biến vào chuỗi.

```javascript
let ho = "Nguyễn";
let ten = "Minh";
let tuoi = 20;
let diem = 8.5;

// ❌ Cách cũ — nối chuỗi bằng dấu +
let cau1 = "Tên: " + ho + " " + ten + ", Tuổi: " + tuoi;
console.log(cau1);

// ✅ Cách mới — Template Literal (backtick `)
let cau2 = `Tên: ${ho} ${ten}, Tuổi: ${tuoi}`;
console.log(cau2);

// Tính toán trong template literal
let cau3 = `${ho} ${ten} được ${diem} điểm. Năm sau ${ten} sẽ ${tuoi + 1} tuổi.`;
console.log(cau3);

// In nhiều dòng
let thongBao = `
=== THÔNG TIN SINH VIÊN ===
Họ tên : ${ho} ${ten}
Tuổi    : ${tuoi}
Điểm    : ${diem}
Xếp loại: ${diem >= 8 ? "Giỏi" : diem >= 6.5 ? "Khá" : "Trung bình"}
===========================
`;
console.log(thongBao);
```

**Bài tập con:** Tạo chuỗi template hiển thị hóa đơn mua hàng:
```javascript
let sanPham = "Laptop";
let soLuong = 2;
let donGia = 15000000;

// TODO: Tạo chuỗi template hiển thị:
// "Hóa đơn: 2 x Laptop = 30,000,000 VNĐ"
```

---

### Bài 0.5 — Toán tử số học (10 phút)

**Yêu cầu:** Thực hành các phép tính cơ bản.

```javascript
let a = 15;
let b = 4;

// Phép cộng, trừ, nhân, chia
console.log(`${a} + ${b} =`, a + b);    // 19
console.log(`${a} - ${b} =`, a - b);    // 11
console.log(`${a} * ${b} =`, a * b);    // 60
console.log(`${a} / ${b} =`, a / b);    // 3.75
console.log(`${a} % ${b} =`, a % b);    // 3 (chia lấy dư)
console.log(`${a} ** ${b} =`, a ** b);  // 50625 (lũy thừa)

// Phép gán kết hợp
let x = 10;
x += 5;   // x = x + 5 → 15
x -= 3;   // x = x - 3 → 12
x *= 2;   // x = x * 2 → 24
x /= 4;   // x = x / 4 → 6
console.log("x =", x);  // 6

// Tăng/giảm 1
let dem = 0;
dem++;     // dem = dem + 1 → 1
dem++;     // → 2
dem--;     // dem = dem - 1 → 1
console.log("dem =", dem);  // 1
```

**Bài tập con — Tính diện tích hình tròn:**
```javascript
const PI = 3.14159;
let banKinh = 5;

// TODO: Tính diện tích = PI * r^2
// TODO: Tính chu vi = 2 * PI * r
// TODO: In kết quả ra console
```

---

### Bài 0.6 — Toán tử so sánh (10 phút)

**Yêu cầu:** So sánh giá trị và hiểu sự khác biệt `==` vs `===`.

```javascript
// ==  (so sánh giá trị, ÉP KIỂU)
// === (so sánh giá trị + kiểu, KHÔNG ép kiểu)

console.log(5 == "5");      // true  (ép "5" thành 5)
console.log(5 === "5");     // false (number ≠ string)
console.log(true == 1);     // true  (ép true thành 1)
console.log(true === 1);    // false

// ❌ Luôn dùng === trong code thực tế!
// == có thể gây bug khó tìm

// Các toán tử so sánh
console.log(10 > 5);        // true
console.log(10 < 5);        // false
console.log(10 >= 10);      // true
console.log(10 <= 9);       // false
console.log(10 != 5);       // true
console.log(10 !== "10");   // true

// Toán tử logic
console.log(true && true);   // true  (AND — cả hai đều đúng)
console.log(true && false);  // false
console.log(true || false);  // true  (OR — một trong hai đúng)
console.log(false || false); // false
console.log(!true);          // false (NOT — đảo ngược)
```

**Bài tập con — Kiểm tra điều kiện:**
```javascript
let diem = 7.5;
let diemChuyenCan = 9;

// TODO: Kiểm tra và in ra:
// 1. Điểm >= 5 VÀ điểm chuyên cần >= 8 → "Đạt"
// 2. Ngược lại → "Không đạt"
// 3. Điểm >= 8.5 → "Giỏi"
// 4. Điểm >= 7 → "Khá"
// 5. Điểm >= 5 → "Trung bình"
// 6. Ngược lại → "Yếu"
```

---

### Bài 0.7 — Kiểu dữ liệu Array (10 phút)

**Yêu cầu:** Làm quen với mảng — cấu trúc dữ liệu quan trọng nhất.

```javascript
// ===== KHAI BÁO MẢNG =====
let monHoc = ["Toán", "Lý", "Hóa", "Sinh"];
let diemSo = [8, 7, 9, 6.5, 8.5];
let honHop = ["Minh", 20, true, null]; // Mảng hỗn hợp

// ===== TRUY CẬP PHẦN TỬ =====
console.log(monHoc[0]);    // "Toán" (chỉ số bắt đầu từ 0)
console.log(monHoc[1]);    // "Lý"
console.log(monHoc.length); // 4 (độ dài mảng)
console.log(monHoc[monHoc.length - 1]); // "Sinh" (phần tử cuối)

// ===== THÊM / XÓA =====
monHoc.push("Anh");        // Thêm vào cuối → ["Toán","Lý","Hóa","Sinh","Anh"]
monHoc.pop();               // Xóa cuối → ["Toán","Lý","Hóa","Sinh"]
monHoc.unshift("GDCD");    // Thêm vào đầu → ["GDCD","Toán","Lý","Hóa","Sinh"]
monHoc.shift();             // Xóa đầu → ["Toán","Lý","Hóa","Sinh"]

// ===== DUYỆT MẢNG =====
// Cách 1: for loop
for (let i = 0; i < diemSo.length; i++) {
    console.log(`Môn ${i + 1}: ${diemSo[i]} điểm`);
}

// Cách 2: forEach (hay dùng hơn)
diemSo.forEach((diem, index) => {
    console.log(`Môn ${index + 1}: ${diem} điểm`);
});

// ===== TÌM KIẾM =====
console.log(monHoc.includes("Lý"));   // true
console.log(monHoc.indexOf("Hóa"));   // 2 (vị trí)
console.log(monHoc.indexOf("Anh"));   // -1 (không tìm thấy)

// ===== SẮP XẾP =====
let so = [3, 1, 4, 1, 5, 9, 2, 6];
so.sort((a, b) => a - b);  // Tăng dần → [1,1,2,3,4,5,6,9]
console.log(so);
```

**Bài tập con:**
```javascript
// TODO: Tạo mảng 5 món ăn yêu thích
// 1. In ra món đầu tiên và cuối cùng
// 2. Thêm 1 món vào đầu
// 3. Xóa món cuối cùng
// 4. Duyệt mảng và in "Món i: ten mon"
// 5. Kiểm tra "Phở" có trong mảng không?
```

---

### Bài 0.8 — Kiểu dữ liệu Object (10 phút)

**Yêu cầu:** Làm quen với object — lưu trữ dữ liệu có cấu trúc.

```javascript
// ===== KHAI BÁO OBJECT =====
let sinhVien = {
    hoTen: "Nguyễn Văn Minh",
    tuoi: 20,
    mssv: "20240001",
    diem: [8, 7.5, 9],
    laSinhVien: true
};

// ===== TRUY CẬP THUỘC TÍNH =====
console.log(sinhVien.hoTen);        // "Nguyễn Văn Minh" (dấu chấm)
console.log(sinhVien["tuoi"]);      // 20 (dấu ngoặc vuông)
console.log(sinhVien.diem[0]);      // 8 (truy cập mảng lồng)

// ===== THÊM / SỬA THUỘC TÍNH =====
sinhVien.email = "minh@example.com"; // Thêm mới
sinhVien.tuoi = 21;                  // Sửa
delete sinhVien.laSinhVien;          // Xóa

// ===== DUYỆT OBJECT =====
for (let key in sinhVien) {
    console.log(`${key}: ${sinhVien[key]}`);
}

// ===== OBJECT METHODS =====
console.log(Object.keys(sinhVien));   // ["hoTen", "tuoi", "mssv", "diem", "email"]
console.log(Object.values(sinhVien)); // ["Nguyễn Văn Minh", 21, "20240001", ...]
```

**Bài tập con — Tạo hồ sơ cá nhân:**
```javascript
// TODO: Tạo object "hoSo" chứa:
// - hoTen (string)
// - tuoi (number)
// - nganh (string)
// - soThich (array: 3 sở thích)
// - diaChi (object lồng: { tinh, quan, duong })

// 1. In ra: "Tôi là [hoTen], [tuoi] tuổi, học ngành [nganh]"
// 2. In ra sở thích đầu tiên
// 3. In ra địa chỉ đầy đủ
// 4. Thêm thuộc tính "email"
```

---

### Bài 0.9 — Hàm cơ bản (10 phút)

**Yêu cầu:** Viết và gọi hàm — khối xây dựng cơ bản của lập trình.

```javascript
// ===== KHAI BÁO HÀM =====
function chaoHoi(ten) {
    return `Xin chào, ${ten}! Chào mừng đến với JavaScript!`;
}

console.log(chaoHoi("Minh"));
console.log(chaoHoi("Lan"));

// ===== HÀM CÓ NHIỀU THAM SỐ =====
function tinhTong(a, b) {
    return a + b;
}

function tinhDTChuNhat(dai, rong) {
    return dai * rong;
}

console.log("Tổng:", tinhTong(10, 20));           // 30
console.log("Diện tích:", tinhDTChuNhat(5, 3));   // 15

// ===== HÀM CÓ GIÁ TRỊ MẶC ĐỊNH =====
function tinhDiemTB(diem1, diem2, diem3, heSo = 1) {
    return (diem1 + diem2 + diem3) / 3 * heSo;
}

console.log("Điểm TB:", tinhDiemTB(8, 7, 9));       // 8
console.log("Điểm TB x1.1:", tinhDiemTB(8, 7, 9, 1.1)); // 8.8

// ===== ARROW FUNCTION (ES6) =====
const binhPhuong = (so) => so * so;
const laChan = (so) => so % 2 === 0;

console.log("5² =", binhPhuong(5));       // 25
console.log("4 chẵn?", laChan(4));        // true
console.log("7 chẵn?", laChan(7));        // false
```

**Bài tập con:**
```javascript
// TODO: Viết các hàm sau:
// 1. maxHaiSo(a, b) → trả về số lớn hơn
// 2. laNamNhuan(nam) → true nếu năm nhuận
//    (chia hết cho 4, không chia hết cho 100, hoặc chia hết cho 400)
// 3. gioiThieu(hoTen, tuoi, nganh) → "Tôi là ..., ... tuổi, học ..."
// 4. tinhGiaBan(giaGoc, giamGia = 0) → giá sau giảm (%)
```

---

## ✅ Checklist tổng hợp

### Biến & Kiểu dữ liệu
- [ ] Khai báo biến với `let` và `const`
- [ ] Phân biệt `string`, `number`, `boolean`, `null`, `undefined`
- [ ] Dùng `typeof` để kiểm tra kiểu
- [ ] Template literal với backtick `` ` ``

### Toán tử
- [ ] Toán tử số học: `+`, `-`, `*`, `/`, `%`, `**`
- [ ] Toán tử so sánh: `===`, `!==`, `>`, `<`, `>=`, `<=`
- [ ] Toán tử logic: `&&`, `||`, `!`
- [ ] Toán tử gán kết hợp: `+=`, `-=`, `*=`, `/=`

### Cấu trúc dữ liệu
- [ ] Mảng: khai báo, truy cập, push/pop, forEach
- [ ] Object: khai báo, truy cập, thêm/sửa/xóa thuộc tính

### Hàm
- [ ] Function declaration: `function tenHam() {}`
- [ ] Arrow function: `const tenHam = () => {}`
- [ ] Tham số mặc định

---

## 📚 Kiến thức cần nhớ

| Khái niệm | Ví dụ | Ghi chú |
|-----------|-------|---------|
| `let` | `let x = 10;` | Có thể thay đổi giá trị |
| `const` | `const PI = 3.14;` | Không thể thay đổi |
| `typeof` | `typeof "hello"` → `"string"` | Kiểm tra kiểu dữ liệu |
| Template literal | `` `${a} + ${b}` `` | Nối chuỗi dễ dàng |
| `===` | `5 === "5"` → `false` | So sánh strict (luôn dùng cái này!) |
| `Array.push()` | `arr.push(42)` | Thêm vào cuối mảng |
| `Object.keys()` | `Object.keys(obj)` | Lấy tất cả key |

---

**← [Quay lại Session 3](../README.md) | [Bài tiếp theo: DOM Basics →](00b_dom_basics.md)**
