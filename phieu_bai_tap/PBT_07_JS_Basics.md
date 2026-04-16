# 📋 PHIẾU BÀI TẬP 07
# **JAVASCRIPT BASICS — Variables, Data Types, Control Structures**

> **Tài liệu tham chiếu:** `tuan_4_javascript_basics/01_basics_introduction.md` → `04_control_structures.md`
>
> ⏱️ **Thời gian:** 120 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — var / let / const

Đọc chương 03. **Không chạy code**, dự đoán output cho từng đoạn:

```javascript
// Đoạn 1
console.log(x);
var x = 5;

// Đoạn 2
console.log(y);
let y = 10;

// Đoạn 3
const z = 15;
z = 20;
console.log(z);

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

Ghi dự đoán → Tạo file `var_let_const.js`, chạy → So sánh. Giải thích các kết quả bất ngờ.

### Câu A2 (5đ) — Data Types & Coercion

Không chạy code, dự đoán kết quả:

```javascript
console.log(typeof null);              // ???
console.log(typeof undefined);         // ???
console.log(typeof NaN);              // ???
console.log("5" + 3);                 // ???
console.log("5" - 3);                 // ???
console.log("5" * "3");              // ???
console.log(true + true);            // ???
console.log([] + []);                // ???
console.log([] + {});                // ???
console.log({} + []);                // ???
```

Sau khi trả lời, chạy code kiểm tra. Giải thích **tại sao** `"5" + 3` và `"5" - 3` cho kết quả khác nhau.

### Câu A3 (5đ) — So sánh == vs ===

Dự đoán `true` hay `false`:

```javascript
console.log(5 == "5");                // ???
console.log(5 === "5");               // ???
console.log(null == undefined);       // ???
console.log(null === undefined);      // ???
console.log(NaN == NaN);             // ???
console.log(0 == false);             // ???
console.log(0 === false);            // ???
console.log("" == false);            // ???
```

**Quy tắc:** Từ giờ trở đi, bạn nên dùng `==` hay `===`? Tại sao?

### Câu A4 (5đ) — Truthy & Falsy

Liệt kê TẤT CẢ giá trị Falsy trong JavaScript (đọc tài liệu). Sau đó dự đoán kết quả:

```javascript
if ("0") console.log("A");           // In hay không?
if ("") console.log("B");            // In hay không?
if ([]) console.log("C");            // In hay không?
if ({}) console.log("D");            // In hay không?
if (null) console.log("E");          // In hay không?
if (0) console.log("F");             // In hay không?
if (-1) console.log("G");            // In hay không?
if (" ") console.log("H");           // In hay không? (space)
```

### Câu A5 (5đ) — Template Literals

Viết lại 3 cách nối chuỗi sau bằng **template literal** (backtick):

```javascript
// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```

---

## PHẦN B — THỰC HÀNH CODE (55 điểm)

> ⚠️ Tất cả bài tập chạy bằng Node.js (`node tenfile.js`) hoặc Browser Console.
> **KHÔNG DÙNG** các hàm/thư viện ngoài — chỉ dùng JavaScript thuần.

### Bài B1 (15đ) — Máy tính đơn giản

Tạo file `calculator.js`:

```javascript
// Viết hàm calculate(num1, operator, num2)
// operator: "+", "-", "*", "/", "%", "**"
// Xử lý edge cases:
// - Chia cho 0 → thông báo lỗi
// - Operator không hợp lệ → thông báo lỗi
// - Input không phải số → thông báo lỗi

// Test:
console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // → 1024
```

### Bài B2 (15đ) — Xử lý dữ liệu sinh viên

Tạo file `student_data.js`:

Cho mảng dữ liệu:

```javascript
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
```

Viết code thực hiện (KHÔNG dùng thư viện, chỉ loops + if/else):

1. Tính **điểm trung bình** (math×0.4 + physics×0.3 + cs×0.3) cho mỗi sinh viên
2. Xếp loại: ≥8.0 Giỏi, ≥6.5 Khá, ≥5.0 Trung bình, <5.0 Yếu
3. In bảng kết quả:
   ```
   | STT | Tên    | TB   | Xếp loại    |
   |-----|--------|------|-------------|
   | 1   | An     | 8.0  | Giỏi        |
   | 2   | Bình   | 7.2  | Khá         |
   ...
   ```
4. Đếm số SV mỗi xếp loại
5. Tìm SV có điểm TB cao nhất và thấp nhất
6. Tính điểm TB toàn lớp cho từng môn
7. **Bonus:** Tính điểm TB theo giới tính

### Bài B3 (15đ) — Mini Game: Đoán số

Tạo file `guess_number.html` + `guess.js`:

Viết game đoán số **chạy trên browser** (dùng `prompt()` và `alert()`):

1. Máy random 1 số từ 1-100
2. User nhập số, máy trả lời "Cao hơn" / "Thấp hơn" / "Đúng rồi!"
3. Đếm số lần đoán
4. Sau khi đoán đúng, hiển thị: "Bạn đoán đúng sau X lần!"
5. **Giới hạn 7 lần đoán** — Hết lượt → thua, hiển thị đáp án

**Yêu cầu thêm:**
- Validate input: Chỉ chấp nhận số 1-100
- Nếu user nhập cùng số 2 lần → cảnh báo "Bạn đã đoán số này rồi!"

### Bài B4 (10đ) — FizzBuzz nâng cao

Tạo file `fizzbuzz.js`:

Classic FizzBuzz + biến thể:

```javascript
// Version 1: Classic
// In 1-100. Chia hết 3 → "Fizz", chia hết 5 → "Buzz", 
// chia hết cả 2 → "FizzBuzz"

// Version 2: Custom
// Viết hàm customFizzBuzz(n, rules) 
// rules = mảng [{ divisor: 3, word: "Fizz" }, { divisor: 5, word: "Buzz" }, ...]
// Hàm phải hoạt động với BẤT KỲ bộ rules nào

// Test:
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
// → 21 = "FizzJazz", 15 = "FizzBuzz", 35 = "BuzzJazz", 105 = "FizzBuzzJazz"
```

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug JavaScript

Tìm và sửa TẤT CẢ lỗi trong code sau (có ít nhất 6 lỗi):

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
```

Liệt kê lỗi + giải thích + cách sửa. Có 1 lỗi "ẩn" liên quan đến `var` trong vòng lặp — giải thích tại sao và sửa bằng `let`.

### Câu C2 (10đ) — Bài toán thực tế

Viết chương trình tính hóa đơn nhà hàng:

```
Input: Danh sách món ăn + giá + số lượng
Quy tắc:
- Tổng > 500k → giảm 10%
- Tổng > 1 triệu → giảm 15%  
- Ngày thứ 3 (Wednesday) → giảm thêm 5%
- VAT 8%
- Tip 5% (optional)

Output: Hóa đơn chi tiết dạng:
╔══════════════════════════════════════╗
║        HÓA ĐƠN NHÀ HÀNG           ║
╠══════════════════════════════════════╣
║ 1. Phở bò      x2    @65k  = 130k  ║
║ 2. Trà đá      x3    @5k   = 15k   ║
║ 3. Bún chả     x1    @55k  = 55k   ║
╠══════════════════════════════════════╣
║ Tổng cộng:              200.000đ    ║
║ Giảm giá (0%):           0đ         ║
║ VAT (8%):                16.000đ    ║
║ Tip (5%):                10.000đ    ║
╠══════════════════════════════════════╣
║ THANH TOÁN:              226.000đ   ║
╚══════════════════════════════════════╝
```

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 7-10 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "var/let/const + Type Coercion demo"

**Yêu cầu:** Quay video viết code JS trong browser console + file .js, vừa code vừa giải thích hành vi bất ngờ.

**Trong video, bạn phải:**

1. 🎤 Mở Chrome DevTools Console
2. 🎤 Demo hoisting: `console.log(x); var x = 5;` → giải thích tại sao ra `undefined`
3. 🎤 Demo `let`: `console.log(y); let y = 10;` → giải thích ReferenceError (TDZ)
4. 🎤 Demo `const`: gán lại `const z = 5; z = 10;` → TypeError. Nhưng `const arr = [1,2]; arr.push(3);` → OK. Giải thích tại sao.
5. 🎤 Type Coercion 5 câu:
   - `"5" + 3` → "53" (string concatenation)
   - `"5" - 3` → 2 (numeric coercion)
   - `true + true` → 2
   - `[] + {}` → ???
   - Giải thích quy tắc: `+` là nối chuỗi khi có string, `-` luôn convert số
6. 🎤 Demo `==` vs `===`: `5 == "5"` vs `5 === "5"` — giải thích strict equality
7. 🎤 Viết hàm `calculate(a, op, b)` trong file .js → chạy bằng Node.js → show kết quả

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ trực tiếp trong Console + file .js
- [ ] Dự đoán kết quả TRƯỚC khi chạy
- [ ] Cuối video: Tổng kết 3 quy tắc quan trọng nhất

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C1
- [ ] File `var_let_const.js` — Câu A1 kiểm chứng
- [ ] File `calculator.js` — Bài B1
- [ ] File `student_data.js` — Bài B2
- [ ] File `guess_number.html` + `guess.js` — Bài B3
- [ ] File `fizzbuzz.js` — Bài B4
- [ ] File `restaurant_bill.js` — Câu C2
- [ ] Folder `screenshots/` — kết quả chạy console
- [ ] 🎬 **Video OBS** — `videos/PBT07_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **4 commits**
