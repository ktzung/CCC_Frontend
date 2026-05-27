# Tier 3 — Functions (Hàm)

> **Thời gian:** 40-50 phút  
> **Yêu cầu:** Hoàn thành Tier 1 & 2  
> **Mục tiêu:** Viết và sử dụng thành thạo các loại hàm trong JavaScript

---

## 📝 Bài 3.1 — Hàm cơ bản (Function Declaration) (10 phút)

### Yêu cầu
Tạo và gọi hàm đơn giản

### Code mẫu
```javascript
// ===== Khai báo hàm =====
function chaoHoi() {
    console.log("Xin chào các bạn!");
    console.log("Chào mừng đến với môn CSE391");
}

// Gọi hàm
chaoHoi();
chaoHoi(); // Gọi lại được nhiều lần

// ===== Hàm có tham số =====
function chaoTen(ten) {
    console.log(`Xin chào ${ten}!`);
}

chaoTen("Minh");
chaoTen("An");
chaoTen("Linh");

// ===== Hàm có nhiều tham số =====
function tinhTong(a, b) {
    let ketQua = a + b;
    console.log(`${a} + ${b} = ${ketQua}`);
    return ketQua; // Trả về giá trị
}

let tong = tinhTong(5, 3);
console.log("Kết quả:", tong);

// ===== Hàm với giá trị mặc định =====
function tinhDienTich(r, pi = 3.14) {
    return pi * r * r;
}

console.log("Diện tích (r=5):", tinhDienTich(5));
console.log("Diện tích (r=5, PI chính xác):", tinhDienTich(5, Math.PI));
```

### Thử thách
1. Viết hàm `kiemTraChanLe(so)` — trả về "Chẵn" hoặc "Lẻ"
2. Viết hàm `tinhGiaiThua(n)` — trả về n!
3. Viết hàm `timMax(a, b, c)` — trả về số lớn nhất

---

## 📝 Bài 3.2 — Function Expression & Arrow Function (12 phút)

### Yêu cầu
Hiểu 2 cách viết hàm khác nhau

### Code mẫu
```javascript
// ===== Function Expression =====
const tinhBinhPhuong = function(so) {
    return so * so;
};

console.log(tinhBinhPhuong(5)); // 25

// ===== Arrow Function (ES6) =====
const tinhLapPhuong = (so) => {
    return so * so * so;
};

console.log(tinhLapPhuong(3)); // 27

// Arrow function viết ngắn (1 dòng)
const tinhChuVi = (a, b) => 2 * (a + b);
console.log(tinhChuVi(5, 3)); // 16

// Arrow function với 1 tham số (không cần ngoặc)
const inRa = x => console.log("Giá trị:", x);
inRa(42);

// ===== So sánh 3 cách viết =====

// Cách 1: Function Declaration
function cong1(a, b) {
    return a + b;
}

// Cách 2: Function Expression
const cong2 = function(a, b) {
    return a + b;
};

// Cách 3: Arrow Function
const cong3 = (a, b) => a + b;

console.log(cong1(1, 2)); // 3
console.log(cong2(1, 2)); // 3
console.log(cong3(1, 2)); // 3
```

### Thử thách
1. Viết arrow function `laNamNhuan(nam)` — trả về true/false
2. Viết arrow function `chuyenDoiNhietDo(doC)` — chuyển °C sang °F
3. Viết arrow function `daoNguocChuoi(str)` — đảo ngược chuỗi

---

## 📝 Bài 3.3 — Hàm với Array (12 phút)

### Yêu cầu
Kết hợp hàm với mảng

### Code mẫu
```javascript
// ===== Truyền mảng vào hàm =====
function tinhDiemTB(diemList) {
    let tong = 0;
    for (let diem of diemList) {
        tong += diem;
    }
    return tong / diemList.length;
}

let diemSV = [7, 8, 6.5, 9, 7.5];
console.log("Điểm TB:", tinhDiemTB(diemSV));

// ===== Trả về mảng =====
function laySoChan(arr) {
    let ketQua = [];
    for (let so of arr) {
        if (so % 2 === 0) {
            ketQua.push(so);
        }
    }
    return ketQua;
}

let soNgauNhien = [1, 4, 7, 2, 9, 6, 3, 8];
console.log("Số chẵn:", laySoChan(soNgauNhien));

// ===== Hàm callback (hàm truyền vào hàm khác) =====
function xuLyMang(arr, hamXuLy) {
    let ketQua = [];
    for (let item of arr) {
        ketQua.push(hamXuLy(item));
    }
    return ketQua;
}

// Nhân đôi mỗi phần tử
let mangGoc = [1, 2, 3, 4, 5];
let mangDoi = xuLyMang(mangGoc, x => x * 2);
console.log("Nhân đôi:", mangDoi); // [2, 4, 6, 8, 10]

// Chuyển thành chuỗi
let mangChuoi = xuLyMang(mangGoc, x => `Số ${x}`);
console.log("Chuỗi:", mangChuoi);
```

### Thử thách
1. Viết hàm `timSoLonNhat(arr)` — tìm số lớn nhất trong mảng
2. Viết hàm `demSoAm(arr)` — đếm số lượng số âm
3. Viết hàm `locDiemCao(arr, diemCan)` — lọc điểm >= diemCan

---

## 📝 Bài 3.4 — Scope & Closure cơ bản (10 phút)

### Yêu cầu
Hiểu phạm vi biến trong JavaScript

### Code mẫu
```javascript
// ===== Global Scope =====
let bienToanCuc = "Tôi ở ngoài cùng";

function hamA() {
    console.log(bienToanCuc); // Truy cập được
}

hamA();
console.log(bienToanCuc); // Truy cập được

// ===== Local Scope =====
function hamB() {
    let bienLocal = "Tôi chỉ trong hamB";
    console.log(bienLocal); // OK
}

hamB();
// console.log(bienLocal); // ❌ Lỗi! Không truy cập được

// ===== Block Scope (let/const) =====
if (true) {
    let trongBlock = "Chỉ trong if";
    const cungTrongBlock = "Cũng chỉ trong if";
    var varTrongBlock = "Tôi thoát ra ngoài!"; // var không bị block scope
}

// console.log(trongBlock);        // ❌ Lỗi
// console.log(cungTrongBlock);    // ❌ Lỗi
console.log(varTrongBlock);       // ✅ "Tôi thoát ra ngoài!"

// ===== Closure đơn giản =====
function taoBoDem() {
    let dem = 0;
    
    return function() {
        dem++;
        return dem;
    };
}

let boDem = taoBoDem();
console.log(boDem()); // 1
console.log(boDem()); // 2
console.log(boDem()); // 3

// Mỗi lần gọi taoBoDem() sẽ tạo bộ đếm mới
let boDem2 = taoBoDem();
console.log(boDem2()); // 1 (bắt đầu lại)
```

### Thử thách
1. Dự đoán kết quả trước khi chạy:
```javascript
let x = 10;
function test() {
    console.log(x); // ???
    let x = 20;
    console.log(x); // ???
}
test();
```

2. Tạo hàm `taoMayTinh()` trả về object với các phép tính (+, -, *, /)

---

## ✅ Checklist hoàn thành

- [ ] Viết hàm với function declaration
- [ ] Viết hàm với function expression
- [ ] Viết arrow function
- [ ] Truyền tham số và giá trị mặc định
- [ ] Sử dụng return
- [ ] Truyền mảng vào hàm
- [ ] Hiểu callback function
- [ ] Phân biệt Global/Local/Block scope
- [ ] Hiểu closure cơ bản

---

## 🎯 Tự đánh giá

| Câu hỏi | Đúng/Sai |
|---------|----------|
| Arrow function không có `this` riêng | □ |
| `var` bị giới hạn trong block scope | □ |
| Hàm có thể trả về hàm khác | □ |
| `return` dừng việc thực thi hàm | □ |
| Tham số mặc định dùng `= giá trị` | □ |

---

**← Quay lại: [Tier 2 — Control Flow](TIER_2_control_flow.md)**  
**→ Tiếp theo: [Tier 4 — Arrays & Objects](TIER_4_arrays_objects.md)**
