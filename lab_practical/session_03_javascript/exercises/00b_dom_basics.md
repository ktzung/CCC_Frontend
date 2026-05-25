# Exercise 0B — DOM Basics (Làm quen với DOM)

## 🎬 Opening Scenario

*DOM (Document Object Model) là cách JavaScript "nhìn thấy" và "thay đổi" trang web. Bài tập này giúp bạn nắm vững cách chọn phần tử, thay đổi nội dung, thuộc tính, và style bằng JavaScript.*

---

## 🎯 Mục tiêu học tập

- Hiểu DOM là gì và cây cấu trúc HTML
- Chọn phần tử với `getElementById`, `querySelector`, `querySelectorAll`
- Thay đổi nội dung: `textContent`, `innerHTML`
- Thay đổi thuộc tính: `setAttribute`, `classList`
- Thay đổi style: `element.style`

---

## 🪜 Bài tập chi tiết

### Bài 0B.1 — DOM là gì? (Lý thuyết 5 phút)

**DOM** (Document Object Model) = HTML được biểu diễn thành **cây đối tượng** mà JS có thể truy cập.

```
Document
└── html
    ├── head
    │   └── title → "Hello"
    └── body
        ├── h1 → "Xin chào"
        ├── p  → "Đoạn văn"
        └── ul
            ├── li → "Mục 1"
            └── li → "Mục 2"
```

**Minh họa:** Tạo file `dom_basics.html`:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>DOM Basics</title>
</head>
<body>
    <h1 id="title">Xin chào DOM!</h1>
    <p class="description">Đây là đoạn văn đầu tiên</p>
    <p class="description">Đây là đoạn văn thứ hai</p>
    <ul id="danh-sach">
        <li class="item">HTML</li>
        <li class="item">CSS</li>
        <li class="item">JavaScript</li>
    </ul>

    <script>
        // Mở Console (F12) để xem kết quả
        console.log("Document:", document);
        console.log("Title:", document.title);
        console.log("Body:", document.body);
    </script>
</body>
</html>
```

---

### Bài 0B.2 — Chọn phần tử (10 phút)

**Yêu cầu:** Sử dụng các cách chọn phần tử khác nhau.

```javascript
// ===== CÁCH 1: getElementById — chọn theo ID (1 phần tử) =====
const title = document.getElementById('title');
console.log("getElementById:", title);
console.log("Nội dung:", title.textContent);

// ===== CÁCH 2: querySelector — chọn phần tử ĐẦU TIÊN khớp =====
const firstDesc = document.querySelector('.description');
console.log("querySelector:", firstDesc.textContent);

const firstItem = document.querySelector('#danh-sach li');
console.log("Selector phức tạp:", firstItem.textContent); // "HTML"

// ===== CÁCH 3: querySelectorAll — chọn TẤT CẢ phần tử khớp =====
const allItems = document.querySelectorAll('.item');
console.log("querySelectorAll:", allItems);      // NodeList(3)
console.log("Số phần tử:", allItems.length);     // 3

// Duyệt qua tất cả
allItems.forEach((item, index) => {
    console.log(`Item ${index}: ${item.textContent}`);
});
```

**So sánh:**

| Phương thức | Trả về | Chọn được | Dùng khi |
|-------------|--------|-----------|----------|
| `getElementById('id')` | 1 element | Theo ID | Cần 1 phần tử cụ thể |
| `querySelector('.class')` | 1 element | CSS selector | Cần phần tử đầu tiên khớp |
| `querySelectorAll('.class')` | NodeList | CSS selector | Cần tất cả phần tử khớp |

**Bài tập con:**
```javascript
// TODO: Dùng Console thực hiện:
// 1. Chọn h1 bằng getElementById
// 2. Chọn p đầu tiên bằng querySelector
// 3. Chọn tất cả li bằng querySelectorAll
// 4. In ra nội dung của từng phần tử
```

---

### Bài 0B.3 — Thay đổi nội dung (10 phút)

**Yêu cầu:** Thay đổi text và HTML bên trong phần tử.

```javascript
const title = document.getElementById('title');

// ===== textContent — chỉ text thuần =====
title.textContent = "JavaScript thật tuyệt!";
// Thay đổi ngay trên trang web!

// ===== innerHTML — có thể chứa HTML =====
title.innerHTML = "JavaScript <em>thật tuyệt</em>!";
// <em> sẽ render thành in nghiêng

// ===== Phân biệt textContent vs innerHTML =====
const desc = document.querySelector('.description');

desc.textContent = "<b>In đậm</b>";
// Hiển thị: <b>In đậm</b> (hiển thị nguyên text, KHÔNG render HTML)

desc.innerHTML = "<b>In đậm</b>";
// Hiển thị: In đậm (render thành HTML)
```

**Thử ngay:** Mở Console, gõ:
```javascript
> document.getElementById('title').textContent = "Tôi đã thay đổi!"
> document.querySelector('.description').innerHTML = "<strong>Đậm!</strong>"
```

**Bài tập con:**
```javascript
// TODO: Thực hiện trên trang dom_basics.html
// 1. Đổi title thành tên của bạn
// 2. Đổi p đầu tiên thành "Tôi đang học DOM"
// 3. Đổi nội dung li đầu tiên thành "<strong>HTML5</strong>"
// 4. Dùng querySelectorAll + forEach: thêm "(đã học)" vào cuối mỗi li
```

---

### Bài 0B.4 — Thay đổi thuộc tính (10 phút)

**Yêu cầu:** Thêm/sửa/xóa thuộc tính HTML.

```javascript
const title = document.getElementById('title');

// ===== getAttribute — lấy giá trị thuộc tính =====
console.log("ID:", title.getAttribute('id'));  // "title"
console.log("Class:", title.getAttribute('class')); // null (chưa có class)

// ===== setAttribute — thêm/sửa thuộc tính =====
title.setAttribute('class', 'main-title');
title.setAttribute('data-info', 'Thông tin tùy ý');

// ===== removeAttribute — xóa thuộc tính =====
title.removeAttribute('data-info');

// ===== Truy cập trực tiếp =====
console.log(title.id);     // "title"
console.log(title.className); // "main-title"

// ===== Thay đổi ảnh =====
// <img id="avatar" src="old.jpg">
// document.getElementById('avatar').src = 'new.jpg';
```

**Bài tập con:**
```javascript
// TODO:
// 1. Thêm class "highlight" cho tất cả li
// 2. Thêm attribute "data-index" cho mỗi li (0, 1, 2)
// 3. Đổi title của trang (document.title) thành "DOM Practice"
```

---

### Bài 0B.5 — classList — Quản lý CSS class (10 phút)

**Yêu cầu:** Thêm/xóa/toggle CSS class.

```css
/* Thêm vào <style> trong HTML */
.highlight {
    background-color: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 0.5rem;
}

.bold { font-weight: bold; }
.text-red { color: #ef4444; }
.hidden { display: none; }
```

```javascript
const title = document.getElementById('title');

// ===== add — thêm class =====
title.classList.add('highlight');
console.log(title.className); // "main-title highlight"

// ===== remove — xóa class =====
title.classList.remove('highlight');

// ===== toggle — bật/tắt class =====
title.classList.toggle('highlight');  // Thêm nếu chưa có, xóa nếu đã có
title.classList.toggle('highlight');  // Xóa (vì đang có)

// ===== contains — kiểm tra có class không =====
console.log(title.classList.contains('highlight')); // false

// ===== replace — thay thế class =====
title.classList.replace('main-title', 'sub-title');

// ===== Thêm nhiều class cùng lúc =====
title.classList.add('bold', 'text-red');
```

**Bài tập con — Bật/tắt highlight:**
```javascript
// TODO:
// 1. Thêm class "highlight" cho tất cả li
// 2. Kiểm tra li đầu tiên có class "highlight" không
// 3. Toggle class "text-red" cho li thứ hai
// 4. Xóa class "highlight" khỏi tất cả li (dùng forEach)
```

---

### Bài 0B.6 — Thay đổi Style (Inline) (10 phút)

**Yêu cầu:** Thay đổi style trực tiếp qua JavaScript.

```javascript
const title = document.getElementById('title');

// ===== element.style.propertyName =====
title.style.color = 'blue';
title.style.fontSize = '2rem';
title.style.backgroundColor = '#f0f0f0';
title.style.padding = '1rem';
title.style.borderRadius = '8px';

// ⚠️ Lưu ý: dùng camelCase, KHÔNG dùng dấu gạch ngang
// ❌ title.style.font-size = '2rem';  // Sai!
// ✅ title.style.fontSize = '2rem';   // Đúng

// ===== Lấy style hiện tại =====
const currentColor = title.style.color;
console.log("Màu hiện tại:", currentColor); // "blue"

// ===== Reset style =====
title.style.color = '';  // Xóa inline style → quay về CSS mặc định
```

**Bài tập con — Đổi màu theo điều kiện:**
```javascript
// TODO:
// 1. Chọn tất cả li
// 2. Nếu index chẵn → màu nền xanh nhạt (#dbeafe)
// 3. Nếu index lẻ → màu nền hồng nhạt (#fce7f3)
// 4. Font size = (index + 1) * 14 px
```

---

### Bài 0B.7 — Tạo & Xóa phần tử (10 phút)

**Yêu cầu:** Tạo phần tử mới và thêm vào DOM.

```javascript
// ===== TẠO PHẦN TỬ MỚI =====
const newItem = document.createElement('li');
newItem.textContent = 'React';
newItem.classList.add('item');

// ===== THÊM VÀO DOM =====
const danhSach = document.getElementById('danh-sach');

// appendChild — thêm vào CUỐI
danhSach.appendChild(newItem);

// prepend — thêm vào ĐẦU
const firstNewItem = document.createElement('li');
firstNewItem.textContent = 'Git';
firstNewItem.classList.add('item');
danhSach.prepend(firstNewItem);

// insertBefore — thêm TRƯỚC phần tử cụ thể
const refItem = danhSach.children[2]; // Chèn trước item thứ 3
const midItem = document.createElement('li');
midItem.textContent = 'TypeScript';
midItem.classList.add('item');
danhSach.insertBefore(midItem, refItem);

// ===== XÓA PHẦN TỬ =====
danhSach.removeChild(danhSach.lastChild); // Xóa cuối

// Cách mới hơn:
newItem.remove(); // Tự xóa chính mình

// ===== THAY THẾ PHẦN TỬ =====
const oldItem = danhSach.children[0];
const replacement = document.createElement('li');
replacement.textContent = 'HTML5 (updated)';
replacement.classList.add('item');
danhSach.replaceChild(replacement, oldItem);
```

**Bài tập con — Danh sách động:**
```javascript
// TODO: Tạo function themMonHoc(tenMon)
// 1. Tạo <li> mới với class "item"
// 2. textContent = tenMon
// 3. Thêm vào cuối <ul id="danh-sach">
// 4. Gọi thử: themMonHoc("Vue.js"), themMonHoc("Node.js")
```

---

### Bài 0B.8 — Luyện tập tổng hợp (15 phút)

**Yêu cầu:** Tạo mini-project "Danh sách sinh viên" hoàn chỉnh.

**HTML:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Danh sách sinh viên</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 2rem; background: #f1f5f9; }
        .student-card {
            background: white;
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .student-card.top { border-left-color: #22c55e; background: #f0fdf4; }
        .student-card.warning { border-left-color: #f59e0b; background: #fffbeb; }
        .student-card.fail { border-left-color: #ef4444; background: #fef2f2; }
        .badge {
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .badge-green { background: #dcfce7; color: #166534; }
        .badge-yellow { background: #fef3c7; color: #92400e; }
        .badge-red { background: #fee2e2; color: #991b1b; }
        #controls { margin-bottom: 1rem; }
        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            margin-right: 0.5rem;
        }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-warning { background: #f59e0b; color: white; }
        .btn-danger { background: #ef4444; color: white; }
    </style>
</head>
<body>
    <h1>🎓 Danh sách sinh viên</h1>

    <div id="controls">
        <button class="btn-primary" id="btn-highlight">Đánh dấu giỏi</button>
        <button class="btn-warning" id="btn-sort">Sắp xếp theo điểm</button>
        <button class="btn-danger" id="btn-reset">Reset</button>
    </div>

    <div id="student-list"></div>

    <script>
        // ===== DATA =====
        const students = [
            { ten: "Nguyễn Văn An",    diem: 9.2 },
            { ten: "Trần Thị Bình",    diem: 7.5 },
            { ten: "Lê Hoàng Dũng",    diem: 4.8 },
            { ten: "Phạm Thị Em",      diem: 8.1 },
            { ten: "Hoàng Văn Phúc",   diem: 6.3 },
            { ten: "Đỗ Thị Giang",     diem: 3.5 },
        ];

        const studentList = document.getElementById('student-list');

        // ===== RENDER FUNCTION =====
        function renderStudents(data) {
            studentList.innerHTML = ''; // Xóa cũ

            data.forEach((sv, index) => {
                // Tạo card
                const card = document.createElement('div');
                card.classList.add('student-card');

                // Xếp loại
                let xepLoai, badgeClass;
                if (sv.diem >= 8) {
                    xepLoai = "Giỏi";
                    badgeClass = "badge-green";
                } else if (sv.diem >= 5) {
                    xepLoai = "Đạt";
                    badgeClass = "badge-yellow";
                } else {
                    xepLoai = "Yếu";
                    badgeClass = "badge-red";
                    card.classList.add('fail');
                }

                // InnerHTML
                card.innerHTML = `
                    <div>
                        <strong>${sv.ten}</strong>
                        <span style="color:#64748b; margin-left:0.5rem">— ${sv.diem} điểm</span>
                    </div>
                    <span class="badge ${badgeClass}">${xepLoai}</span>
                `;

                studentList.appendChild(card);
            });
        }

        // ===== NÚT "ĐÁNH DẤU GIỎI" =====
        document.getElementById('btn-highlight').addEventListener('click', () => {
            const cards = studentList.querySelectorAll('.student-card');
            cards.forEach((card, index) => {
                if (students[index].diem >= 8) {
                    card.classList.add('top');
                }
            });
        });

        // ===== NÚT "SẮP XẾP" =====
        document.getElementById('btn-sort').addEventListener('click', () => {
            const sorted = [...students].sort((a, b) => b.diem - a.diem);
            renderStudents(sorted);
        });

        // ===== NÚT "RESET" =====
        document.getElementById('btn-reset').addEventListener('click', () => {
            renderStudents(students);
        });

        // ===== RENDER LẦN ĐẦU =====
        renderStudents(students);
    </script>
</body>
</html>
```

**Yêu cầu hoàn thành:**
1. Copy code trên vào file `student_list.html`
2. Mở trình duyệt → thấy danh sách 6 sinh viên
3. Click "Đánh dấu giỏi" → sinh viên giỏi có nền xanh
4. Click "Sắp xếp theo điểm" → xếp từ cao xuống thấp
5. Click "Reset" → quay về ban đầu

---

## ✅ Checklist tổng hợp

### Chọn phần tử
- [ ] `document.getElementById('id')` — chọn theo ID
- [ ] `document.querySelector('.class')` — chọn phần tử đầu tiên
- [ ] `document.querySelectorAll('.class')` — chọn tất cả

### Thay đổi nội dung
- [ ] `element.textContent = "text"` — thay text
- [ ] `element.innerHTML = "<b>HTML</b>"` — thay HTML
- [ ] Phân biệt `textContent` vs `innerHTML`

### Thay đổi thuộc tính
- [ ] `element.setAttribute('class', 'value')`
- [ ] `element.removeAttribute('attr')`
- [ ] `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()`

### Thay đổi style
- [ ] `element.style.propertyName = 'value'` (camelCase)
- [ ] Phân biệt inline style vs CSS class

### Tạo & Xóa phần tử
- [ ] `document.createElement('tag')` — tạo mới
- [ ] `parent.appendChild(child)` — thêm vào cuối
- [ ] `parent.prepend(child)` — thêm vào đầu
- [ ] `element.remove()` — xóa

---

## 📚 Kiến thức cần nhớ

| Phương thức | Trả về | Dùng khi |
|-------------|--------|----------|
| `getElementById('id')` | 1 Element | Có ID |
| `querySelector('.class')` | 1 Element | CSS selector phức tạp |
| `querySelectorAll('.class')` | NodeList | Cần nhiều phần tử |
| `textContent` | String | Chỉ text, an toàn |
| `innerHTML` | String | Cần render HTML |
| `classList.add('a','b')` | void | Thêm nhiều class |
| `element.style.color` | String | Inline style |
| `createElement('div')` | Element | Tạo phần tử mới |
| `appendChild(el)` | Element | Thêm vào cuối |

---

**← [Bài trước: Hello JavaScript](00_hello_javascript.md) | [Bài tiếp theo: Events Basics →](00c_events_basics.md)**
