# 🟨 PART II - CHƯƠNG 05
# **FUNCTIONS**

## 🎬 "Khi Minh Phải Gửi 500 Email Bằng Tay"

*Minh thực tập tuần thứ hai tại startup thương mại điện tử. Sếp giao việc:*

> *"Em gửi email cảm ơn cho 500 khách hàng đã mua hàng tháng này. Mỗi email khác nhau: tên khác, sản phẩm khác, số tiền khác."*

*Minh bắt đầu viết thủ công:*

```javascript
console.log("Gửi Anh Nguyễn Văn A: Cảm ơn đã mua iPhone 15, tổng 25.000.000đ");
console.log("Gửi Chị Trần Thị B: Cảm ơn đã mua MacBook Air, tổng 32.000.000đ");
// ... còn 498 dòng nữa 😱
```

*Sau email thứ 47, Minh nhận ra: "Mình đang là robot. Và robot thì... nên để MÁY TÍNH làm."*

*Anh viết function đầu tiên:*

```javascript
function guiEmailCamOn(ten, sanPham, soTien) {
  console.log(`Gửi ${ten}: Cảm ơn đã mua ${sanPham}, tổng ${soTien.toLocaleString()}đ`);
}

// 500 email → 500 lần gọi → 0.3 giây
danhSachKH.forEach(kh => guiEmailCamOn(kh.ten, kh.sanPham, kh.soTien));
```

*Sếp ngạc nhiên: "Xong rồi à? Nhanh thế?"*

*Minh cười: "Function, sếp ạ. Viết một lần, chạy triệu lần."* ☕

**Function = Kỹ năng biến developer thường thành developer thông minh.**

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Biết cách khai báo và gọi hàm
- Hiểu về tham số (Parameters) và giá trị trả về (Return)
- Làm quen với **Arrow Functions** (ES6) — cú pháp hiện đại
- Hiểu khái niệm **Scope** (Phạm vi biến) — lý do nhiều bug bí ẩn

---

# 1. **DEFINING AND CALLING FUNCTIONS**

## 1.1. Khai báo hàm — "Dạy robot làm việc"

Khai báo function = Viết hướng dẫn cho robot. Gọi function = Bảo robot làm theo hướng dẫn.

```javascript
// 📝 VIẾT HƯỚNG DẪN (khai báo)
function chaoKhach(ten) {
  console.log(`Xin chào ${ten}! Chào mừng đến The Coffee House ☕`);
}

// 🤖 BẢO LÀM (gọi hàm)
chaoKhach("Minh");    // → Xin chào Minh! Chào mừng đến The Coffee House ☕
chaoKhach("Linh");    // → Xin chào Linh! Chào mừng đến The Coffee House ☕
chaoKhach("Anh Hùng");// → Xin chào Anh Hùng! Chào mừng đến The Coffee House ☕
// ← Viết 1 lần, dùng 3 lần (hoặc 3 triệu lần)
```

### Thuật ngữ quan trọng:

| Thuật ngữ | Ý nghĩa | Ví dụ |
|---|---|---|
| **Parameter** (Tham số) | Biến giữ chỗ trong định nghĩa | `ten` trong `function chaoKhach(ten)` |
| **Argument** (Đối số) | Giá trị thực tế khi gọi | `"Minh"` trong `chaoKhach("Minh")` |

> *Parameter = Ô trống trên form. Argument = Thông tin bạn điền vào ô đó.*

## 1.2. Return Value — "Trả lời câu hỏi, không chỉ la lên"

Function không chỉ `console.log` (la lên). Nó thường **tính toán và trả lại kết quả**:

```javascript
// ❌ Function "la lên" — chỉ in ra, không trả giá trị
function congHaiSo(a, b) {
  console.log(a + b);   // In ra 15, nhưng KHÔNG trả về gì
}
const x = congHaiSo(5, 10);  // x = undefined 😢

// ✅ Function "trả lời" — return giá trị
function cong(a, b) {
  return a + b;          // Trả kết quả → có thể dùng tiếp
  // ⚠️ Code sau return KHÔNG BAO GIỜ chạy (Dead code)
}
const sum = cong(5, 10);     // sum = 15 ✅
const total = cong(sum, 20); // total = 35 ✅ (dùng lại kết quả)
```

### 🏪 Ví dụ thực tế: Tính giá đồ uống The Coffee House

```javascript
function tinhGiaDoUong(tenMon, size, topping) {
  const giaCoBan = {
    "Cà phê sữa": 39000,
    "Trà đào": 45000,
    "Matcha Latte": 55000
  };

  let gia = giaCoBan[tenMon] || 0;
  
  // Phụ thu size
  if (size === "L") gia += 10000;
  if (size === "XL") gia += 15000;
  
  // Phụ thu topping
  if (topping === "trân châu") gia += 5000;
  if (topping === "pudding") gia += 7000;
  
  return gia;   // ← Trả giá cuối cùng
}

// Sử dụng:
const gia1 = tinhGiaDoUong("Cà phê sữa", "L", "trân châu");
console.log(`Tổng: ${gia1.toLocaleString()}đ`);  // → Tổng: 54.000đ

const gia2 = tinhGiaDoUong("Matcha Latte", "XL", "pudding");
console.log(`Tổng: ${gia2.toLocaleString()}đ`);  // → Tổng: 77.000đ
```

---

# 2. **ARROW FUNCTIONS (HÀM MŨI TÊN — ES6)**

Cách viết ngắn gọn, hiện đại — **được dùng phổ biến trong React/Vue**. Sau khi học xong phần này, bạn sẽ thấy Arrow Function ở khắp nơi.

```javascript
// 📜 Cách cổ điển (Regular Function)
const nhanDoi = function(x) {
  return x * 2;
}

// ⚡ Cách hiện đại (Arrow Function)
const nhanDoi = (x) => {
  return x * 2;
}

// 🚀 Cách siêu ngắn (Khi chỉ có 1 dòng return)
const nhanDoi = (x) => x * 2;

// 💎 Cách ngắn nhất (1 parameter → bỏ luôn ngoặc)
const nhanDoi = x => x * 2;
```

### Khi nào dùng Arrow Function?

```javascript
// ⭐ Dùng với Array methods — ĐẸP NHẤT
const prices = [39000, 45000, 55000, 29000];

// Lọc đồ > 40k
const expensive = prices.filter(p => p > 40000);
// → [45000, 55000]

// Tính tổng
const total = prices.reduce((sum, p) => sum + p, 0);
// → 168000

// Tăng giá 10%
const newPrices = prices.map(p => p * 1.1);
// → [42900, 49500, 60500, 31900]
```

> [!TIP]
> Arrow Function giúp code gọn đến mức **đọc như tiếng Anh**: `prices.filter(p => p > 40000)` = "Lọc prices, giữ p lớn hơn 40000."

---

# 3. **SCOPE — PHẠM VI BIẾN**

## 3.1. Ẩn dụ: "Phòng Khách vs Phòng Ngủ"

> **Global Scope = Phòng khách:** Ai đến nhà cũng thấy, cũng dùng được (TV, sofa).
>
> **Function Scope = Phòng ngủ:** Chỉ chủ phòng mới vào. Khách không biết bên trong có gì.
>
> **Block Scope = Ngăn kéo bàn:** Ngay cả người trong phòng cũng phải mở ngăn kéo mới thấy.

```javascript
const tivi = "Samsung 55 inch";      // 🏠 Phòng khách → ai cũng thấy

function phongNguMinh() {
  const nhatKy = "Hôm nay học JS..."; // 🚪 Phòng ngủ → chỉ Minh thấy
  
  console.log(tivi);    // ✅ Minh thấy TV phòng khách
  console.log(nhatKy);  // ✅ Minh đọc nhật ký được
  
  if (true) {
    const biMat = "Crush tên Linh";   // 🗄️ Ngăn kéo → chỉ trong if block
    console.log(biMat);  // ✅ OK trong block
  }
  
  console.log(biMat);   // ❌ LỖI! Ngoài block rồi, ngăn kéo đã đóng!
}

phongNguMinh();
console.log(nhatKy);     // ❌ LỖI! Khách không vào phòng ngủ Minh được!
// → ReferenceError: nhatKy is not defined
```

### Tại sao Scope quan trọng?

> **Anh Hùng:** *"Scope giống như bảo mật. Biến chỉ tồn tại ở nơi nó cần. Function A không thể sờ vào biến của Function B — tránh bug 'hiệu ứng bên' khi dự án lớn có hàng trăm functions."*

## 3.2. Closures — "Hàm con nhớ được đồ của hàm cha"

Khái niệm nâng cao — hiện tại chỉ cần biết ở mức cơ bản:

```javascript
function taoDemTien() {
  let soTien = 0;              // Biến "cha"
  
  return function(tienMoi) {
    soTien += tienMoi;         // Hàm "con" nhớ và sửa biến "cha"
    return soTien;
  };
}

const demTien = taoDemTien();
console.log(demTien(100000));   // → 100000
console.log(demTien(50000));    // → 150000  (nhớ được 100000 cũ!)
console.log(demTien(75000));    // → 225000
```

> *"Hàm con nhớ được biến của hàm cha, ngay cả khi hàm cha đã chạy xong." — Đây là Closure. Sẽ đào sâu khi học React (useState chính là Closure!).*

---

# 4. **THỰC HÀNH: Xây chức năng cho The Coffee House**

### Bài tập 1: Hàm chào khách theo giờ

```javascript
function chaoTheoGio(ten) {
  const gio = new Date().getHours();
  
  if (gio < 12) return `Chào buổi sáng, ${ten}! ☀️`;
  if (gio < 18) return `Chào buổi chiều, ${ten}! 🌤️`;
  return `Chào buổi tối, ${ten}! 🌙`;
}

console.log(chaoTheoGio("Minh"));  // → Tùy giờ hiện tại
```

### Bài tập 2: Hàm tính hóa đơn

```javascript
const tinhHoaDon = (danhSachMon) => {
  const tongTien = danhSachMon.reduce((sum, mon) => sum + mon.gia, 0);
  const giamGia = tongTien > 200000 ? tongTien * 0.1 : 0;
  const thanhToan = tongTien - giamGia;
  
  return {
    tongTien,
    giamGia,
    thanhToan,
    thongBao: giamGia > 0 
      ? `🎉 Bạn được giảm ${giamGia.toLocaleString()}đ!`
      : `💡 Mua thêm ${(200000 - tongTien).toLocaleString()}đ để được giảm 10%!`
  };
};

const hoaDon = tinhHoaDon([
  { ten: "Cà phê sữa", gia: 39000 },
  { ten: "Matcha Latte", gia: 55000 },
  { ten: "Bánh mì", gia: 25000 }
]);

console.log(hoaDon.thongBao);
// → 💡 Mua thêm 81.000đ để được giảm 10%!
```

---

# 5. **TỔNG KẾT**

| Khái niệm | Nhớ |
|---|---|
| **Function** | Viết 1 lần, dùng N lần. Đóng gói logic để tái sử dụng |
| **Return** | Trả kết quả ra ngoài. Không return = undefined |
| **Arrow Function** | `(x) => x * 2` — ngắn gọn, hiện đại, dùng khắp React/Vue |
| **Scope** | Global = phòng khách. Function = phòng ngủ. Block = ngăn kéo |
| **Closure** | Hàm con nhớ biến cha — nền tảng cho useState trong React |

---

## ➡️ Chuyện tiếp theo...

*Minh đã biết viết function. Nhưng khi sếp bảo: "Xử lý danh sách 10.000 sản phẩm — lọc, sắp xếp, tính tổng," Minh nhận ra: anh cần biết cách làm việc với **danh sách dữ liệu lớn.***

*Arrays (mảng) và Objects (đối tượng) — hai cấu trúc dữ liệu mà bạn sẽ dùng HÀNG NGÀY trong đời developer. Và `map`, `filter`, `reduce` — bộ 3 "vũ khí bí mật" mà developer giỏi không thể thiếu.*

**Chương tiếp theo:** Arrays & Objects — Làm việc với danh sách lớn và dữ liệu phức tạp.
