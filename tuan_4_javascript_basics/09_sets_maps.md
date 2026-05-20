# 🟨 TUẦN 4 - BÀI 09
# **SETS & MAPS — Cấu trúc dữ liệu ES6**

---

## 0. 🎬 Opening Hook

*Minh cần kiểm tra một user có nằm trong danh sách blacklist không. Dùng array:*

```javascript
const blacklist = ["spam_bot", "hacker123", "troll_user"];
const isBlocked = blacklist.includes("hacker123");  // true
```

*Danh sách 10.000 tên. Mỗi lần kiểm tra → `.includes()` duyệt toàn bộ array → chậm.*

*Anh Hùng: "Dùng Set. Tra cứu O(1) thay vì O(n)."*

```javascript
const blacklistSet = new Set(["spam_bot", "hacker123", "troll_user"]);
const isBlocked = blacklistSet.has("hacker123");  // true — siêu nhanh
```

*"Set = collection không trùng lặp, tra cứu cực nhanh. Map = object nâng cao, key được bất kỳ kiểu nào."* 🚀

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Set và Map là **cấu trúc dữ liệu ES6** giải quyết những vấn đề mà Array/Object xử lý kém:

- **Set**: Loại bỏ trùng lặp, kiểm tra tồn tại O(1)
- **Map**: Key-value với key là bất kỳ kiểu dữ liệu nào (object, function, number)
- **WeakSet/WeakMap**: Quản lý memory tự động cho object

> Trong thực tế: Set dùng để deduplicate, Map dùng khi cần key phức tạp hoặc thứ tự chèn.

---

## 2. 🌐 Big Picture — Set vs Map vs Object vs Array

```
                    Có thứ tự?   Key type    Trùng lặp?   Tra cứu
                    ───────────   ─────────   ──────────   ───────
Array []            ✅ Index      Number      ✅ Cho phép   O(n)
Object {}           ❌ Không      String      ❌ Không      O(1)
Set                 ✅ Chèn       — (values)  ❌ Không      O(1)
Map                 ✅ Chèn       Bất kỳ      ❌ Không      O(1)

SET — Tập hợp giá trị KHÔNG TRÙNG LẶP
new Set([1, 2, 2, 3])  → Set {1, 2, 3}
Dùng khi: deduplicate, kiểm tra membership, toán tập hợp

MAP — Bảng ánh xạ KEY → VALUE
new Map([["a", 1], ["b", 2]])
Dùng khi: key là object/function, cần thứ tự chèn, count frequency
```

---

## 3. ⚙️ Core Technical Truth

### Set — Tập hợp không trùng lặp

```javascript
// Tạo Set
const set1 = new Set();                    // Set rỗng
const set2 = new Set([1, 2, 3, 3, 4]);     // Từ array — tự loại trùng
console.log(set2);  // Set {1, 2, 3, 4}

// Thêm/xóa/kiểm tra
const fruits = new Set();
fruits.add("🍎");
fruits.add("🍌");
fruits.add("🍒");
fruits.add("🍎");  // Trùng → không thêm

console.log(fruits.size);    // 3
console.log(fruits.has("🍌"));  // true
console.log(fruits.has("🍇"));  // false

fruits.delete("🍌");
console.log(fruits.size);    // 2

fruits.clear();  // Xóa hết
console.log(fruits.size);    // 0
```

---

### Set — Loại bỏ trùng lặp (Deduplication)

```javascript
// Cách đơn giản nhất để deduplicate array
const scores = [85, 92, 78, 85, 92, 95, 78];
const uniqueScores = [...new Set(scores)];
console.log(uniqueScores);  // [85, 92, 78, 95]

// Deduplicate string
const text = "hello world";
const uniqueChars = [...new Set(text)].join("");
console.log(uniqueChars);  // "helo wrd"

// Practical: danh sách tag không trùng
const articles = [
    { title: "Bài 1", tags: ["js", "react", "css"] },
    { title: "Bài 2", tags: ["js", "node", "css"] },
    { title: "Bài 3", tags: ["react", "vue", "js"] }
];

const allTags = articles.flatMap(a => a.tags);
const uniqueTags = [...new Set(allTags)];
console.log(uniqueTags);  // ["js", "react", "css", "node", "vue"]
```

---

### Set — Toán tập hợp

```javascript
const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([4, 5, 6, 7, 8]);

// Union (Hợp): tất cả phần tử
const union = new Set([...setA, ...setB]);
console.log(union);  // Set {1, 2, 3, 4, 5, 6, 7, 8}

// Intersection (Giao): phần tử chung
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection);  // Set {4, 5}

// Difference (Hiệu): trong A nhưng không trong B
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference);  // Set {1, 2, 3}
```

---

### Set — Lặp qua

```javascript
const colors = new Set(["red", "green", "blue"]);

// for...of
for (const color of colors) {
    console.log(color);
}

// forEach
colors.forEach(color => console.log(color));

// Convert về array
const colorArray = [...colors];        // Spread
const colorArray2 = Array.from(colors); // Array.from
```

---

### Map — Bảng ánh xạ Key-Value

```javascript
// Tạo Map
const userMap = new Map();

// Thêm entries
userMap.set("u001", { name: "Minh", age: 21 });
userMap.set("u002", { name: "Linh", age: 20 });
userMap.set(42, "answer");              // Key là number
userMap.set(true, "yes");               // Key là boolean

// Lấy giá trị
console.log(userMap.get("u001"));  // { name: "Minh", age: 21 }
console.log(userMap.get(42));      // "answer"
console.log(userMap.get(false));   // undefined — không có key false

// Kiểm tra, xóa
console.log(userMap.has("u002"));  // true
console.log(userMap.size);         // 4

userMap.delete(42);
console.log(userMap.size);         // 3

// Tạo từ array of pairs
const mapFromArray = new Map([
    ["apple", 1],
    ["banana", 2],
    ["cherry", 3]
]);
```

---

### Map vs Object — Khi nào dùng gì?

```javascript
// ✅ Dùng Map khi:
// 1. Key là object
const visited = new Map();
const page1 = { url: "/home" };
const page2 = { url: "/about" };
visited.set(page1, true);
visited.set(page2, false);
console.log(visited.get(page1));  // true

// 2. Cần biết size nhanh
const map = new Map([["a", 1], ["b", 2]]);
console.log(map.size);  // 2 — O(1)
// Object: Object.keys(obj).length — O(n)

// 3. Cần thứ tự chèn
const map2 = new Map();
map2.set("c", 3);
map2.set("a", 1);
map2.set("b", 2);
for (const [key, val] of map2) {
    console.log(key, val);  // c 3, a 1, b 2 — theo thứ tự chèn
}

// ✅ Dùng Object khi:
// 1. Key là string/number đơn giản
const config = { host: "localhost", port: 3000 };

// 2. Cần JSON serialization
JSON.stringify(config);  // OK
// JSON.stringify(map)    // Không hoạt động như mong đợi

// 3. Dùng với optional chaining
const name = config?.host ?? "default";
```

---

### Map — Các phương thức

```javascript
const inventory = new Map([
    ["🍎", 50],
    ["🍌", 30],
    ["🍒", 20]
]);

// keys(), values(), entries()
console.log([...inventory.keys()]);    // ["🍎", "🍌", "🍒"]
console.log([...inventory.values()]);  // [50, 30, 20]
console.log([...inventory.entries()]); // [["🍎",50], ["🍌",30], ["🍒",20]]

// forEach
inventory.forEach((quantity, fruit) => {
    console.log(`${fruit}: ${quantity}`);
});

// map — tạo Map mới
const doubled = new Map(
    [...inventory].map(([fruit, qty]) => [fruit, qty * 2])
);
console.log(doubled);  // Map {"🍎"=>100, "🍌"=>60, "🍒"=>40}

// filter — tạo Map mới
const lowStock = new Map(
    [...inventory].filter(([_, qty]) => qty < 30)
);
console.log(lowStock);  // Map {"🍒"=>20}

// convert về object
const obj = Object.fromEntries(inventory);
console.log(obj);  // { "🍎": 50, "🍌": 30, "🍒": 20 }
```

---

### Practical: Word Frequency Counter

```javascript
function wordFrequency(text) {
    const words = text.toLowerCase().split(/\s+/);
    const freq = new Map();

    for (const word of words) {
        freq.set(word, (freq.get(word) || 0) + 1);
    }

    // Sắp xếp theo tần suất giảm dần
    return new Map([...freq].sort((a, b) => b[1] - a[1]));
}

const text = "javascript is great javascript is fun javascript is powerful";
const result = wordFrequency(text);
console.log(result);
// Map {"javascript"=>3, "is"=>3, "great"=>1, "fun"=>1, "powerful"=>1}
```

---

### WeakSet & WeakMap — Quản lý Memory

```javascript
// WeakSet — Set chỉ chứa object, tự garbage collect
const visitedNodes = new WeakSet();

function processNode(node) {
    if (visitedNodes.has(node)) return;  // Đã xử lý
    visitedNodes.add(node);
    // ... xử lý node
}
// Khi node bị xóa khỏi DOM → WeakSet tự giải phóng

// WeakMap — Map với key là object, tự garbage collect
const elementData = new WeakMap();

function setData(element, data) {
    elementData.set(element, data);
}

function getData(element) {
    return elementData.get(element);
}

// Khi element bị xóa → WeakMap tự giải phóng entry
// Hữu ích cho: gắn metadata vào DOM elements mà không gây memory leak
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Dùng Set: loại bỏ trùng lặp từ array
const nums = [1, 2, 2, 3, 3, 3, 4, 4, 5];

// 2. Dùng Map: tạo bảng điểm sinh viên
// {"An": 85, "Bình": 92, "Cường": 78}

// 3. Dùng Set: kiểm tra ký tự unique trong chuỗi
const str = "hello";
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Tìm phần tử chung giữa 2 arrays (dùng Set)
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];

// 2. Đếm tần suất ký tự trong chuỗi (dùng Map)
const text = "programming";

// 3. Nhóm sinh viên theo xếp loại (dùng Map)
const students = [
    { name: "An", score: 85 },
    { name: "Bình", score: 42 },
    { name: "Cường", score: 92 },
    { name: "Dũng", score: 78 },
    { name: "Em", score: 55 }
];
// Xếp loại: >=80 Giỏi, >=60 Khá, >=50 TB, <50 Yếu
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Implement LRU Cache dùng Map
// class LRUCache { constructor(capacity) {...} }
// get(key), put(key, value)
// Khi capacity đầy → xóa entry cũ nhất

// 2. So sánh 2 arrays bất kể thứ tự (dùng Set)
// sameItems([1,2,3], [3,2,1]) → true
// sameItems([1,2,3], [1,2,4]) → false

// 3. Tìm phần tử xuất hiện trong TẤT CẢ các arrays
// intersection([[1,2,3], [2,3,4], [3,4,5]]) → [3]
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 10 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/10_Day_Sets_and_Maps/10_day_sets_and_maps.md)*
