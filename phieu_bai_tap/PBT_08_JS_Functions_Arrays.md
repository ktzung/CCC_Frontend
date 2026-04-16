# 📋 PHIẾU BÀI TẬP 08
# **JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**

> **Tài liệu tham chiếu:** `tuan_4_javascript_basics/05_functions.md` + `06_arrays_objects.md`
>
> ⏱️ **Thời gian:** 150 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
1. Function Declaration
2. Function Expression
3. Arrow Function

Hàm tính: Thuế = 10% nếu lương > 11 triệu, 0% nếu ≤ 11 triệu. Trả về object `{ thuong, thuc_nhan }`.

**Câu hỏi:** 3 cách này có khác nhau về hoisting không? Giải thích bằng ví dụ code cụ thể.

### Câu A2 (5đ) — Scope & Closure

Không chạy code, dự đoán output:

```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // ???
console.log(c.increment());  // ???
console.log(c.increment());  // ???
console.log(c.decrement());  // ???
console.log(c.getCount());   // ???

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: ???
```

Giải thích chi tiết: Tại sao `var` và `let` cho kết quả khác nhau trong vòng lặp setTimeout?

### Câu A3 (5đ) — Array Methods

Đọc chương 06. Cho mảng: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`

Viết **1 dòng code** cho mỗi yêu cầu (dùng arrow function):

```javascript
1. Lấy các số chẵn                    → [2, 4, 6, 8, 10]
2. Nhân mỗi số với 3                  → [3, 6, 9, ..., 30]
3. Tính tổng tất cả                   → 55
4. Tìm số đầu tiên > 7               → 8
5. Kiểm tra CÓ số > 10 không         → false
6. Kiểm tra TẤT CẢ đều > 0           → true
7. Tạo mảng "Số X là [chẵn/lẻ]"      → ["Số 1 là lẻ", "Số 2 là chẵn", ...]
8. Đảo ngược mảng (không mutate gốc)  → [10, 9, ..., 1]
```

### Câu A4 (5đ) — Object Destructuring & Spread

Không chạy code, dự đoán output:

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // ???
console.log(specs);                     // ???

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // ???
console.log(updated.sale);             // ???
console.log(product.price);            // ???  (gốc có đổi?)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // ??? (16 hay 8? Tại sao?)
```

---

## PHẦN B — THỰC HÀNH CODE (60 điểm)

### Bài B1 (20đ) — Quản lý Sản phẩm E-Commerce

Tạo file `product_manager.js`:

```javascript
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];
```

Viết các hàm (BẮT BUỘC dùng `map`, `filter`, `reduce`, `sort`, `find`):

```javascript
// 1. Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) { /* ... */ }

// 2. Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) { /* ... */ }

// 3. Sắp xếp theo giá (tăng/giảm)
function sortByPrice(products, order = "asc") { /* ... */ }

// 4. Tìm sản phẩm rẻ nhất mỗi category
function cheapestByCategory(products) { /* ... */ }
// → { phone: {...}, laptop: {...}, tablet: {...}, accessory: {...} }

// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
function totalInventoryValue(products) { /* ... */ }

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
function formatProductList(products) { /* ... */ }
// → [{ name: "iPhone 16", formattedPrice: "25.990.000đ" }, ...]

// 7. Tính rating trung bình toàn bộ
function averageRating(products) { /* ... */ }

// 8. Tìm sản phẩm theo keyword (tìm trong name, case-insensitive)
function searchProducts(products, keyword) { /* ... */ }
```

**Test:**
```javascript
console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString() + "đ");
```

### Bài B2 (20đ) — Giỏ hàng (Shopping Cart)

Tạo file `shopping_cart.js`:

Viết module giỏ hàng dùng **Closure** (không dùng class):

```javascript
function createCart() {
    // Private data
    let items = [];
    
    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) { /* ... */ },
        
        // Xóa sản phẩm theo id
        removeItem(productId) { /* ... */ },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) { /* ... */ },
        
        // Tính tổng tiền
        getTotal() { /* ... */ },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) { /* ... */ },
        // Codes: "SALE10" → -10%, "SALE20" → -20%, "FREESHIP" → -30000
        
        // In giỏ hàng dạng bảng
        printCart() { /* ... */ },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() { /* ... */ },
        
        // Xóa toàn bộ giỏ
        clearCart() { /* ... */ }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();
// Kỳ vọng:
// ┌──────────────────────────────────────────────┐
// │ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │
// │ 1 │ iPhone 16      │  2 │ 25.990.000  │ 51.980.000  │
// │ 2 │ AirPods Pro    │  2 │  6.990.000  │ 13.980.000  │
// ├──────────────────────────────────────────────┤
// │ Tổng cộng:                       65.960.000đ │
// └──────────────────────────────────────────────┘

cart.applyDiscount("SALE10");
cart.printCart();
// → Tổng: 59.364.000đ (giảm 10%)

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2
```

### Bài B3 (20đ) — Higher-Order Functions Challenge

Tạo file `higher_order.js`:

Viết các hàm **higher-order** (hàm nhận hàm làm tham số hoặc trả về hàm):

```javascript
// 1. pipe() — Nối chuỗi functions
function pipe(...fns) { /* ... */ }

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) { /* ... */ }

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) { /* ... */ }

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
// Gọi liên tục → chỉ lần cuối mới chạy

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) { /* ... */ }
```

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor Code

Code sau hoạt động đúng nhưng viết rất tệ. **Refactor** sử dụng array methods + arrow functions:

```javascript
// TRƯỚC (ugly code):
function processOrders(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    // Sort by finalTotal descending
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}
```

Viết lại thành ≤ 10 dòng dùng `filter`, `map`, `sort`, destructuring, arrow functions.

### Câu C2 (10đ) — Thiết kế API

Bạn đang thiết kế một thư viện JS nhỏ `miniArray` cung cấp `map`, `filter`, `reduce` TỰ VIẾT (không dùng built-in).

```javascript
const miniArray = {
    map(arr, fn) {
        // Implement: giống Array.prototype.map
    },
    filter(arr, fn) {
        // Implement: giống Array.prototype.filter
    },
    reduce(arr, fn, initialValue) {
        // Implement: giống Array.prototype.reduce
    }
};

// Test phải pass:
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
```

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 10-15 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Mini Shopping Cart bằng Closure"

**Yêu cầu:** Quay video viết Shopping Cart module dùng Closure pattern từ đầu.

**Trong video, bạn phải:**

1. 🎤 Giải thích Closure là gì: "Hàm con nhớ được biến của hàm cha"
2. 🎤 Viết `createCart()` function trả về object với methods
3. 🎤 Demo:
   ```javascript
   function createCart() {
       let items = [];  // ← biến "private"
       return {
           addItem(name, price) { items.push({name, price}); },
           getTotal() { return items.reduce((sum, i) => sum + i.price, 0); },
           printCart() { /* ... */ }
       };
   }
   ```
4. 🎤 Giải thích tại sao `items` không thể truy cập trực tiếp từ bên ngoài
5. 🎤 Demo `addItem()` → `getTotal()` → `printCart()` liên tiếp
6. 🎤 Dùng `reduce()` để tính tổng — giải thích `reduce` hoạt động ra sao
7. 🎤 So sánh: nếu dùng biến global `let items = []` thì sao? Tại sao Closure tốt hơn?

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ code từng dòng, giải thích Closure + Array methods
- [ ] Demo: thêm 3 items → in tổng → xóa 1 item → in lại
- [ ] Cuối video: Tổng kết Closure + khi nào dùng

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] File `product_manager.js` — Bài B1
- [ ] File `shopping_cart.js` — Bài B2
- [ ] File `higher_order.js` — Bài B3
- [ ] Folder `screenshots/` — console output
- [ ] 🎬 **Video OBS** — `videos/PBT08_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **4 commits**
