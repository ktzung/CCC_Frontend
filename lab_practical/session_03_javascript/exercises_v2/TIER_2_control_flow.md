# Tier 2 — Điều kiện & Vòng lặp (Control Flow)

> **Thời gian:** 35-45 phút  
> **Yêu cầu:** Hoàn thành Tier 1  
> **Mục tiêu:** Sử dụng thành thạo if/else, switch, vòng lặp for/while

---

## 📝 Bài 2.1 — Câu lệnh điều kiện if/else (10 phút)

### Yêu cầu
Phân loại điểm số và kiểm tra điều kiện

### Code mẫu
```javascript
// ===== IF/ELSE cơ bản =====
let diem = 7.5;

if (diem >= 8) {
    console.log("Giỏi");
} else if (diem >= 6.5) {
    console.log("Khá");
} else if (diem >= 5) {
    console.log("Trung bình");
} else {
    console.log("Yếu");
}

// ===== Kiểm tra nhiều điều kiện =====
let tuoi = 20;
let coGPLX = true;

if (tuoi >= 18 && coGPLX) {
    console.log("Được phép lái xe");
} else if (tuoi >= 18 && !coGPLX) {
    console.log("Cần thi lấy bằng");
} else {
    console.log("Chưa đủ tuổi");
}

// ===== Toán tử 3 ngôi (Ternary) =====
let so = 10;
let ketQua = (so % 2 === 0) ? "Số chẵn" : "Số lẻ";
console.log(ketQua);

// ===== Kiểm tra giá trị rỗng =====
let ten = "";

if (!ten) {
    console.log("Chưa nhập tên");
} else {
    console.log("Xin chào", ten);
}
```

### Thử thách
1. Viết chương trình nhập điểm (0-10), in ra xếp loại:
   - >= 9: Xuất sắc
   - >= 8: Giỏi  
   - >= 7: Khá
   - >= 5: Trung bình
   - < 5: Yếu (kiểm tra có >= 0 không)

2. Kiểm tra năm nhuận:
   - Chia hết cho 4 VÀ (không chia hết cho 100 HOẶC chia hết cho 400)

---

## 📝 Bài 2.2 — Switch case (8 phút)

### Yêu cầu
Chuyển đổi số thành thứ trong tuần

### Code mẫu
```javascript
// ===== SWITCH cơ bản =====
let ngay = 3;

switch (ngay) {
    case 1:
        console.log("Thứ Hai");
        break;
    case 2:
        console.log("Thứ Ba");
        break;
    case 3:
        console.log("Thứ Tư");
        break;
    case 4:
        console.log("Thứ Năm");
        break;
    case 5:
        console.log("Thứ Sáu");
        break;
    case 6:
        console.log("Thứ Bảy");
        break;
    case 0:
        console.log("Chủ Nhật");
        break;
    default:
        console.log("Ngày không hợp lệ");
}

// ===== SWITCH với nhóm case =====
let thang = 5;
let soNgay;

switch (thang) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        soNgay = 31;
        break;
    case 4: case 6: case 9: case 11:
        soNgay = 30;
        break;
    case 2:
        soNgay = 28; // Giả sử không nhuận
        break;
    default:
        soNgay = -1;
}

console.log(`Tháng ${thang} có ${soNgay} ngày`);
```

### Thử thách
1. Tạo máy tính đơn giản: nhập 2 số và phép tính (+, -, *, /)
2. Dùng switch để thực hiện phép tính tương ứng

---

## 📝 Bài 2.3 — Vòng lặp FOR (10 phút)

### Yêu cầu
Lặp qua dữ liệu và tính toán

### Code mẫu
```javascript
// ===== FOR cơ bản =====
// In từ 1 đến 10
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// ===== Tính tổng 1 đến 100 =====
let tong = 0;
for (let i = 1; i <= 100; i++) {
    tong += i;
}
console.log("Tổng 1+2+...+100 =", tong);

// ===== Lặp qua mảng =====
let monHoc = ["HTML", "CSS", "JavaScript", "React"];

for (let i = 0; i < monHoc.length; i++) {
    console.log(`Môn ${i + 1}: ${monHoc[i]}`);
}

// ===== FOR...OF (cách viết ngắn hơn) =====
for (let mon of monHoc) {
    console.log("Học:", mon);
}

// ===== FOR...IN (cho object) =====
let sinhVien = {
    ten: "Minh",
    tuoi: 20,
    lop: "CNTT-K65"
};

for (let key in sinhVien) {
    console.log(`${key}: ${sinhVien[key]}`);
}

// ===== Vòng lặp lồng nhau =====
// Bảng cửu chương
for (let i = 2; i <= 9; i++) {
    console.log(`\n=== Bảng ${i} ===`);
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}
```

### Thử thách
1. In ra tất cả số chẵn từ 1 đến 50
2. Tìm số lớn nhất trong mảng `[4, 7, 2, 9, 1, 5]`
3. Đếm có bao nhiêu số chia hết cho 3 trong khoảng 1-100

---

## 📝 Bài 2.4 — Vòng lặp WHILE (8 phút)

### Yêu cầu
Sử dụng while và do-while

### Code mẫu
```javascript
// ===== WHILE - kiểm tra điều kiện trước =====
let so = 1;
while (so <= 5) {
    console.log("Số:", so);
    so++;
}

// ===== WHILE - nhập cho đến khi đúng =====
// Giả lập: nhập số cho đến khi > 0
let nhap = -1;
let lanThu = 0;

while (nhap <= 0) {
    lanThu++;
    nhap = Math.floor(Math.random() * 10) - 3; // Random từ -3 đến 6
    console.log(`Lần thử ${lanThu}: ${nhap}`);
}
console.log(`Đã tìm thấy số dương: ${nhap}`);

// ===== DO...WHILE - chạy ít nhất 1 lần =====
let luaChon;
do {
    luaChon = Math.floor(Math.random() * 4) + 1;
    console.log("Lựa chọn:", luaChon);
} while (luaChon !== 3);

console.log("Đã chọn 3!");

// ===== BREAK và CONTINUE =====
// Break - dừng vòng lặp
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;
    console.log(i); // In 1, 2, 3, 4
}

// Continue - bỏ qua lần lặp hiện tại
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue; // Bỏ qua số chẵn
    console.log(i); // Chỉ in số lẻ
}
```

### Thử thách
1. Tính giai thừa của n (n!) bằng while
2. Tìm số Fibonacci đầu tiên lớn hơn 1000
3. In ra tất cả số nguyên tố từ 2 đến 50

---

## ✅ Checklist hoàn thành

- [ ] Viết được if/else với nhiều điều kiện
- [ ] Sử dụng toán tử 3 ngôi (ternary)
- [ ] Dùng switch-case thay cho nhiều if-else
- [ ] Viết vòng lặp for cơ bản
- [ ] Sử dụng for...of và for...in
- [ ] Viết vòng lặp while và do-while
- [ ] Hiểu break và continue

---

## 🎯 Tự đánh giá

| Câu hỏi | Đúng/Sai |
|---------|----------|
| `else if` phải đứng sau `if` | □ |
| `switch` tự động chạy hết các case nếu không có `break` | □ |
| `for...of` dùng được cho cả Array và Object | □ |
| `while` có thể chạy 0 lần | □ |
| `do...while` luôn chạy ít nhất 1 lần | □ |
| `break` dừng toàn bộ chương trình | □ |

---

**← Quay lại: [Tier 1 — Basics](TIER_1_basics.md)**  
**→ Tiếp theo: [Tier 3 — Functions](TIER_3_functions.md)**
