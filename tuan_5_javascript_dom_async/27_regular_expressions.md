# 🟨 TUẦN 5 - BÀI 27
# **REGULAR EXPRESSIONS — Tìm kiếm mẫu trong chuỗi**

---

## 0. 🎬 Opening Hook

*Minh cần validate form đăng ký. Email, số điện thoại, mật khẩu — mỗi loại có quy tắc riêng.*

```javascript
// ❌ Validate email bằng cách thủ công — dài và dễ sai
function isValidEmail(email) {
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    const domain = parts[1].split(".");
    if (domain.length < 2) return false;
    // ... 20 dòng nữa
}

// ✅ Regex — 1 dòng
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

*"Regex = ngôn ngữ tìm kiếm mẫu trong chuỗi. 1 dòng thay 20 dòng if-else."* 🔍

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Regex xuất hiện **mọi nơi** trong development:

- **Form validation**: Email, phone, password, URL
- **Search & replace**: Tìm và thay thế trong text
- **Data extraction**: Lấy số điện thoại từ văn bản
- **Log parsing**: Phân tích log files
- **Input sanitization**: Loại bỏ ký tự nguy hiểm

> Regex khó đọc nhưng cực kỳ mạnh. Biết regex cơ bản = giải quyết 90% bài toán chuỗi.

---

## 2. 🌐 Big Picture — Regex Cheat Sheet

```
REGEX — Biểu thức chính quy
│
├── LITERAL MATCHING
│   /abc/     → khớp "abc" chính xác
│   /abc/i    → không phân biệt hoa/thường
│   /abc/g    → khớp TẤT CẢ (global)
│
├── CHARACTER CLASSES
│   .         → Bất kỳ ký tự nào (trừ newline)
│   \d        → Chữ số [0-9]
│   \w        → Chữ cái/số/_ [a-zA-Z0-9_]
│   \s        → Khoảng trắng (space, tab, newline)
│   [abc]     → a hoặc b hoặc c
│   [^abc]    → KHÔNG phải a, b, c
│   [a-z]     → Từ a đến z
│
├── QUANTIFIERS — Số lần lặp
│   *         → 0 hoặc nhiều lần
│   +         → 1 hoặc nhiều lần
│   ?         → 0 hoặc 1 lần
│   {n}       → Chính xác n lần
│   {n,m}     → Từ n đến m lần
│
├── ANCHORS — Vị trí
│   ^         → Đầu chuỗi
│   $         → Cuối chuỗi
│   \b        → Ranh giới từ
│
├── GROUPS & RANGES
│   (...)     → Nhóm (capture group)
│   (?:...)   → Nhóm không capture
│   a|b       → a hoặc b
│
└── METHODS
    /regex/.test(str)     → true/false
    /regex/.exec(str)     → Match details
    str.match(/regex/)    → Tìm khớp
    str.replace(/regex/)  → Thay thế
    str.split(/regex/)    → Tách chuỗi
```

---

## 3. ⚙️ Core Technical Truth

### Tạo Regex

```javascript
// Cách 1: Literal — khuyến nghị
const regex1 = /hello/i;  // Không phân biệt hoa/thường

// Cách 2: Constructor — khi pattern là biến
const pattern = "hello";
const regex2 = new RegExp(pattern, "i");

// Flags
// g — global: tìm TẤT CẢ match
// i — case insensitive
// m — multiline
// s — dotAll (. khớp cả newline)
```

---

### Test & Match

```javascript
// .test() → true/false
const regex = /javascript/i;
console.log(regex.test("I love JavaScript"));  // true
console.log(regex.test("I love Python"));       // false

// .match() → chi tiết match
const str = "My phone is 0912-345-678 and office is 024-123-4567";
const phones = str.match(/\d{3,4}[-.]?\d{3}[-.]?\d{3,4}/g);
console.log(phones);  // ["0912-345-678", "024-123-4567"]

// .replace() → thay thế
const censored = "Email: minh@gmail.com".replace(
    /[\w.]+@[\w.]+/,
    "***@***.com"
);
console.log(censored);  // "Email: ***@***.com"

// .split() → tách chuỗi
const words = "hello   world   javascript".split(/\s+/);
console.log(words);  // ["hello", "world", "javascript"]
```

---

### Character Classes

```javascript
// \d — chữ số
"Room 42".match(/\d+/);        // ["42"]

// \w — chữ cái, số, _
"user_name123".match(/\w+/);    // ["user_name123"]

// \s — khoảng trắng
"hello world".match(/\s/);      // [" "]

// [abc] — ký tự trong ngoặc
"cat bat hat".match(/[cbh]at/g); // ["cat", "bat", "hat"]

// [a-z] — khoảng ký tự
"Hello123".match(/[a-z]+/);     // ["ello"]
"Hello123".match(/[A-Za-z]+/);  // ["Hello"]

// [^...] — phủ định
"hello 123".match(/[^0-9]+/);   // ["hello "]

// . — bất kỳ ký tự
"a1b2c3".match(/./g);           // ["a","1","b","2","c","3"]
```

---

### Quantifiers

```javascript
// * — 0 hoặc nhiều
"aabab".match(/a*b/g);    // ["aab", "ab"]

// + — 1 hoặc nhiều
"aabab".match(/a+b/g);    // ["aab", "ab"]

// ? — 0 hoặc 1
"color colour".match(/colou?r/g);  // ["color", "colour"]

// {n} — chính xác n lần
"100 1000 10000".match(/\d{4}/g);  // ["1000", "10000"]

// {n,m} — từ n đến m lần
"1 12 123 1234".match(/\d{2,3}/g); // ["12", "123", "123"]

// Greedy vs Lazy
"<div>hello</div>".match(/<.*>/);   // ["<div>hello</div>"] — greedy
"<div>hello</div>".match(/<.*?>/);  // ["<div>"] — lazy
```

---

### Groups & Capture

```javascript
// Capture groups — trích xuất phần tử
const date = "2026-05-21";
const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(match[0]);  // "2026-05-21" — full match
console.log(match[1]);  // "2026" — year
console.log(match[2]);  // "05" — month
console.log(match[3]);  // "21" — day

// Named groups — đặt tên cho capture
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const result = "2026-05-21".match(dateRegex);
console.log(result.groups.year);  // "2026"
console.log(result.groups.month); // "05"

// Alternation — hoặc
const fruit = "I like apple or banana".match(/apple|orange|banana/);
console.log(fruit[0]);  // "apple"

// Non-capturing group
"hello hello world".match(/(?:hello)\s(world)/);  // ["hello world", "world"]
```

---

### Practical Patterns

```javascript
// 1. Validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test("minh@gmail.com");  // true
emailRegex.test("invalid-email");    // false

// 2. Validate số điện thoại VN
const phoneRegex = /^(0|\+84)[3-9]\d{8}$/;
phoneRegex.test("0912345678");   // true
phoneRegex.test("+84912345678"); // true
phoneRegex.test("1234567890");   // false

// 3. Validate mật khẩu mạnh (8+ chars, hoa, thường, số)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
passwordRegex.test("Abc12345");  // true
passwordRegex.test("abc12345");  // false — thiếu chữ hoa

// 4. Extract URLs
const text = "Visit https://example.com or http://test.org/page";
const urls = text.match(/https?:\/\/[^\s]+/g);
console.log(urls);  // ["https://example.com", "http://test.org/page"]

// 5. Format số điện thoại
const phone = "0912345678";
const formatted = phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
console.log(formatted);  // "0912.345.678"

// 6. Remove HTML tags
const html = "<p>Hello <b>world</b></p>";
const text2 = html.replace(/<[^>]+>/g, "");
console.log(text2);  // "Hello world"

// 7. Capitalize first letter
const capitalize = str => str.replace(/\b\w/g, c => c.toUpperCase());
console.log(capitalize("hello world"));  // "Hello World"
```

---

### String Methods với Regex

```javascript
const text = "Contact: minh@gmail.com or linh@yahoo.com";

// match — tìm tất cả
const emails = text.match(/[\w.]+@[\w.]+/g);
console.log(emails);  // ["minh@gmail.com", "linh@yahoo.com"]

// replace — thay thế
const masked = text.replace(/[\w.]+@[\w.]+/g, "***@***.com");
console.log(masked);  // "Contact: ***@***.com or ***@***.com"

// search — vị trí đầu tiên
const pos = text.search(/@/);
console.log(pos);  // 15

// split — tách
const parts = "one,two;three four".split(/[,;\s]+/);
console.log(parts);  // ["one", "two", "three", "four"]
```

---

## 4. 📝 Bài tập

### Cấp độ 1 — Cơ bản

```javascript
// 1. Kiểm tra chuỗi có chứa số không
// 2. Tìm tất cả số trong chuỗi "Có 3 con mèo và 5 con chó"
// 3. Thay thế tất cả khoảng trắng thành "-"
```

### Cấp độ 2 — Trung bình

```javascript
// 1. Validate email
// 2. Validate số điện thoại VN (0xxxxxxxxx)
// 3. Trích xuất hashtags từ "Học #javascript và #webdev mỗi ngày"
// 4. Format số: 1000000 → "1,000,000"
```

### Cấp độ 3 — Nâng cao

```javascript
// 1. Validate URL (http/https)
// 2. Parse CSV line: "name,age,city" → ["name", "age", "city"]
//    Xử lý: "name","age with, comma","city"
// 3. Viết function highlight(text, keyword) — bọc keyword trong <mark>
// 4. Viết function extractMarkdown(text) — lấy links từ markdown
//    "Click [here](https://example.com)" → [{ text: "here", url: "..." }]
```

---

*Tài liệu tham khảo: [30 Days Of JavaScript — Day 12 (Vietnamese)](../30-Days-Of-JavaScript/Vietnamese/12_Day_Regular_expressions/12_day_regular_expressions.md)*
