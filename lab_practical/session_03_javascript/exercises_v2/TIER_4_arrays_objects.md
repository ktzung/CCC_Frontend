# Tier 4 — Arrays & Objects (Mảng & Đối tượng)

> **Thời gian:** 45-55 phút  
> **Yêu cầu:** Hoàn thành Tier 1, 2, 3  
> **Mục tiêu:** Thành thạo thao tác với mảng và đối tượng trong JavaScript

---

## 📝 Bài 4.1 — Array cơ bản (12 phút)

### Yêu cầu
Tạo và thao tác với mảng

### Code mẫu
```javascript
// ===== Tạo mảng =====
let monHoc = ["HTML", "CSS", "JavaScript"];
let diemSo = [8, 7, 9, 6.5, 8.5];
let honHop = [1, "hello", true, null, [1,2,3]];

console.log(monHoc);
console.log("Độ dài:", monHoc.length);

// ===== Truy cập phần tử =====
console.log("Môn đầu:", monHoc[0]);      // "HTML"
console.log("Môn cuối:", monHoc[monHoc.length - 1]); // "JavaScript"

// ===== Thêm/xóa phần tử =====
// Thêm vào cuối
monHoc.push("React");
console.log("Sau push:", monHoc);

// Xóa cuối
monHoc.pop();
console.log("Sau pop:", monHoc);

// Thêm vào đầu
monHoc.unshift("Git");
console.log("Sau unshift:", monHoc);

// Xóa đầu
monHoc.shift();
console.log("Sau shift:", monHoc);

// ===== Tìm kiếm =====
let viTri = monHoc.indexOf("CSS");
console.log("CSS ở vị trí:", viTri); // 1

let coTonTai = monHoc.includes("React");
console.log("Có React không:", coTonTai); // false

// ===== Sắp xếp =====
let so = [3, 1, 4, 1, 5, 9, 2, 6];
so.sort(); // Sắp xếp theo chuỗi!
console.log("Sort chuỗi:", so); // [1, 1, 2, 3, 4, 5, 6, 9]

// Sort số đúng
so.sort((a, b) => a - b); // Tăng dần
console.log("Sort tăng:", so);

so.sort((a, b) => b - a); // Giảm dần
console.log("Sort giảm:", so);

// ===== Đảo ngược =====
monHoc.reverse();
console.log("Đảo ngược:", monHoc);
```

### Thử thách
1. Tạo mảng 5 tên sinh viên, thêm 2 tên mới, xóa tên đầu tiên
2. Sắp xếp mảng điểm giảm dần
3. Kiểm tra "JavaScript" có trong mảng môn học không

---

## 📝 Bài 4.2 — Array Methods (Hàm xử lý mảng) (15 phút)

### Yêu cầu
Sử dụng các hàm xử lý mảng quan trọng

### Code mẫu
```javascript
// ===== forEach — Duyệt qua từng phần tử =====
let sinhVien = ["Minh", "An", "Linh", "Hoa"];

sinhVien.forEach((ten, index) => {
    console.log(`${index + 1}. ${ten}`);
});

// ===== map — Tạo mảng mới từ mảng cũ =====
let diem = [7, 8, 6, 9, 5];
let diemNhanDoi = diem.map(d => d * 2);
console.log("Điểm nhân đôi:", diemNhanDoi); // [14, 16, 12, 18, 10]

// Chuyển thành chuỗi
let thongBao = diem.map(d => `Điểm: ${d}`);
console.log(thongBao);

// ===== filter — Lọc phần tử thỏa điều kiện =====
let soNgauNhien = [12, 5, 8, 130, 44, 7];

let soLon = soNgauNhien.filter(so => so > 10);
console.log("Số > 10:", soLon); // [12, 130, 44]

let soBe = soNgauNhien.filter(so => so <= 10);
console.log("Số <= 10:", soBe); // [5, 8, 7]

// ===== find — Tìm phần tử đầu tiên =====
let users = [
    { id: 1, ten: "Minh", tuoi: 20 },
    { id: 2, ten: "An", tuoi: 22 },
    { id: 3, ten: "Linh", tuoi: 19 }
];

let userTimThay = users.find(u => u.ten === "An");
console.log("Tìm thấy:", userTimThay);

let userKhongCo = users.find(u => u.ten === "Tùng");
console.log("Không tìm:", userKhongCo); // undefined

// ===== reduce — Tính toán gộp lại =====
let soDiem = [7, 8, 6, 9, 5];

// Tính tổng
let tongDiem = soDiem.reduce((tong, diem) => tong + diem, 0);
console.log("Tổng điểm:", tongDiem); // 35

// Tìm max
let diemCaoNhat = soDiem.reduce((max, diem) => diem > max ? diem : max, soDiem[0]);
console.log("Điểm cao nhất:", diemCaoNhat); // 9

// ===== some & every — Kiểm tra điều kiện =====
let diemKiemTra = [7, 8, 6, 9, 5];

let coDiemYeu = diemKiemTra.some(d => d < 5);
console.log("Có điểm yếu?", coDiemYeu); // false

let tatCaDat = diemKiemTra.every(d => d >= 5);
console.log("Tất cả đạt?", tatCaDat); // true
```

### Thử thách
1. Dùng `filter` lọc sinh viên tuổi >= 20
2. Dùng `map` tạo mảng mới: ["Minh (20 tuổi)", "An (22 tuổi)", ...]
3. Dùng `reduce` tính điểm trung bình
4. Dùng `find` tìm sinh viên tên "Linh"

---

## 📝 Bài 4.3 — Object cơ bản (12 phút)

### Yêu cầu
Tạo và thao tác với đối tượng

### Code mẫu
```javascript
// ===== Tạo object =====
let sinhVien = {
    ten: "Nguyễn Văn Minh",
    tuoi: 20,
    lop: "CNTT-K65",
    diem: {
        html: 8,
        css: 7.5,
        js: 9
    },
    laSinhVien: true
};

// ===== Truy cập thuộc tính =====
console.log("Tên:", sinhVien.ten);           // Dấu chấm
console.log("Tuổi:", sinhVien["tuoi"]);      // Dấu ngoặc
console.log("Điểm JS:", sinhVien.diem.js);   // Lồng nhau

// ===== Thêm/sửa thuộc tính =====
sinhVien.email = "minh@tlu.edu.vn";  // Thêm mới
sinhVien.tuoi = 21;                   // Sửa
console.log(sinhVien);

// ===== Xóa thuộc tính =====
delete sinhVien.laSinhVien;
console.log("Sau xóa:", sinhVien);

// ===== Kiểm tra thuộc tính tồn tại ====
console.log("email" in sinhVien);        // true
console.log("laSinhVien" in sinhVien);   // false
console.log(sinhVien.hasOwnProperty("ten")); // true

// ===== Duyệt object =====
for (let key in sinhVien) {
    if (typeof sinhVien[key] !== 'object') {
        console.log(`${key}: ${sinhVien[key]}`);
    }
}

// Object.keys, values, entries
console.log("Keys:", Object.keys(sinhVien));
console.log("Values:", Object.values(sinhVien));
```

### Thử thách
1. Tạo object `monHoc` với: ten, soTinChi, giangVien, diem
2. Thêm thuộc tính `lichHoc` (mảng các ngày)
3. Duyệt và in ra tất cả thông tin môn học

---

## 📝 Bài 4.4 — Object Methods & JSON (12 phút)

### Yêu cầu
Sử dụng methods trong object và chuyển đổi JSON

### Code mẫu
```javascript
// ===== Methods (hàm trong object) =====
let mayTinh = {
    giaTri: 0,
    
    // Method
    cong(so) {
        this.giaTri += so;
        return this; // Cho phép gọi chuỗi
    },
    
    tru(so) {
        this.giaTri -= so;
        return this;
    },
    
    nhan(so) {
        this.giaTri *= so;
        return this;
    },
    
    layKetQua() {
        return this.giaTri;
    },
    
    reset() {
        this.giaTri = 0;
        return this;
    }
};

// Gọi chuỗi (method chaining)
let ketQua = mayTinh.cong(10).tru(3).nhan(2).layKetQua();
console.log("Kết quả:", ketQua); // 14

// ===== Constructor Function =====
function SinhVien(ten, tuoi, lop) {
    this.ten = ten;
    this.tuoi = tuoi;
    this.lop = lop;
    
    this.hienThi = function() {
        console.log(`${this.ten} - ${this.lop}`);
    };
}

let sv1 = new SinhVien("Minh", 20, "CNTT-K65");
let sv2 = new SinhVien("An", 21, "CNTT-K66");

sv1.hienThi();
sv2.hienThi();

// ===== JSON =====
// Object → JSON string
let jsonString = JSON.stringify(sinhVien);
console.log("JSON:", jsonString);

// JSON string → Object
let jsonObject = JSON.parse(jsonString);
console.log("Object:", jsonObject);

// Format JSON đẹp
console.log(JSON.stringify(sinhVien, null, 2));

// ===== Dữ liệu mẫu từ API =====
let apiData = `[
    {"id": 1, "name": "iPhone 15", "price": 25000000},
    {"id": 2, "name": "Samsung S24", "price": 22000000},
    {"id": 3, "name": "Xiaomi 14", "price": 15000000}
]`;

let sanPham = JSON.parse(apiData);
console.log("Sản phẩm:", sanPham);

// Lọc sản phẩm < 20 triệu
let re = sanPham.filter(sp => sp.price < 20000000);
console.log("Dưới 20 triệu:", re);
```

### Thử thách
1. Tạo object `sinhVien` với method `tinhDiemTB()`
2. Tạo constructor `MonHoc` và tạo 3 môn học
3. Parse JSON từ chuỗi và hiển thị danh sách

---

## 📝 Bài 4.5 — Destructuring & Spread (8 phút)

### Yêu cầu
Sử dụng cú pháp ES6 hiện đại

### Code mẫu
```javascript
// ===== Array Destructuring =====
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Bỏ qua phần tử
let [x, , z] = [10, 20, 30];
console.log(x, z); // 10 30

// Rest pattern
let [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

// ===== Object Destructuring =====
let sinhVien = {
    ten: "Minh",
    tuoi: 20,
    lop: "CNTT-K65"
};

let { ten, tuoi, lop } = sinhVien;
console.log(ten, tuoi, lop);

// Đổi tên biến
let { ten: hoTen, tuoi: age } = sinhVien;
console.log(hoTen, age);

// Giá trị mặc định
let { email = "Chưa có email" } = sinhVien;
console.log(email);

// ===== Spread Operator =====
// Sao chép mảng
let mangGoc = [1, 2, 3];
let mangSaoChep = [...mangGoc, 4, 5];
console.log(mangSaoChep); // [1, 2, 3, 4, 5]

// Gộp mảng
let monKy1 = ["HTML", "CSS"];
let monKy2 = ["JS", "React"];
let tatCaMon = [...monKy1, ...monKy2];
console.log(tatCaMon);

// Sao chép object
let svGoc = { ten: "Minh", tuoi: 20 };
let svMoi = { ...svGoc, lop: "CNTT-K65" };
console.log(svMoi);

// ===== Truyền tham số với spread =====
function tinhTong(a, b, c) {
    return a + b + c;
}

let so = [1, 2, 3];
console.log(tinhTong(...so)); // 6
```

### Thử thách
1. Destructuring object `sinhVien` và in ra `ten`, `tuoi`
2. Gộp 2 mảng điểm số bằng spread operator
3. Tạo object mới từ object cũ, thêm thuộc tính `diemTB`

---

## ✅ Checklist hoàn thành

- [ ] Tạo và truy cập mảng
- [ ] Sử dụng push, pop, shift, unshift
- [ ] Dùng forEach, map, filter, find, reduce
- [ ] Tạo và thao tác với object
- [ ] Sử dụng this trong object method
- [ ] Constructor function
- [ ] Chuyển đổi JSON (parse, stringify)
- [ ] Destructuring array và object
- [ ] Spread operator

---

## 🎯 Tự đánh giá

| Câu hỏi | Đúng/Sai |
|---------|----------|
| `push()` thêm vào đầu mảng | □ |
| `filter()` trả về mảng mới | □ |
| `map()` không làm thay đổi mảng gốc | □ |
| `this` trong object truy cập chính object đó | □ |
| `JSON.stringify()` chuyển object thành string | □ |
| Spread `...` sao chép tham chiếu | □ |

---

**← Quay lại: [Tier 3 — Functions](TIER_3_functions.md)**  
**→ Tiếp theo: [Tier 5 — DOM cơ bản](TIER_5_dom_basics.md)**
