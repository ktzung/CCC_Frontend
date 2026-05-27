# Tier 5 — DOM cơ bản (Document Object Model)

> **Thời gian:** 40-50 phút  
> **Yêu cầu:** Hoàn thành Tier 1-4  
> **Mục tiêu:** Hiểu DOM, truy cập và thay đổi nội dung trang web

---

## 📝 Bài 5.1 — DOM là gì? (5 phút)

### Giải thích
DOM (Document Object Model) là cách JavaScript "nhìn thấy" và "tương tác" với trang HTML.

```
HTML → Browser tạo ra → DOM Tree → JavaScript truy cập
```

### Code mẫu
```javascript
// ===== Truy cập các phần tử cơ bản =====
// Toàn bộ trang
console.log(document);

// Các phần tử đặc biệt
console.log(document.head);    // <head>
console.log(document.body);    // <body>
console.log(document.title);   // Tiêu đề trang

// Kiểm tra loại node
console.log(document.nodeType); // 9 (Document node)
console.log(document.body.nodeType); // 1 (Element node)
```

### Thử thách
1. Tạo file HTML mới, mở Console
2. Gõ `document` → nhấn Enter → xem kết quả
3. Gõ `document.body` → xem nội dung body

---

## 📝 Bài 5.2 — Tìm phần tử (Selectors) (12 phút)

### Yêu cầu
Các cách tìm phần tử trong DOM

### HTML mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>DOM Selectors</title>
</head>
<body>
    <h1 id="tieu-de">Xin chào DOM!</h1>
    
    <p class="mo-ta">Đây là đoạn văn đầu tiên</p>
    <p class="mo-ta">Đây là đoạn văn thứ hai</p>
    
    <ul id="danh-sach">
        <li class="item">HTML</li>
        <li class="item">CSS</li>
        <li class="item">JavaScript</li>
    </ul>
    
    <div data-info="demo" class="box">Hộp demo</div>
    
    <script>
        // ===== getElementById — Tìm theo ID =====
        let tieuDe = document.getElementById("tieu-de");
        console.log(tieuDe);
        console.log(tieuDe.textContent); // "Xin chào DOM!"
        
        // ===== getElementsByClassName — Tìm theo class =====
        let moTa = document.getElementsByClassName("mo-ta");
        console.log(moTa.length); // 2
        console.log(moTa[0].textContent); // "Đây là đoạn văn đầu tiên"
        
        // ===== getElementsByTagName — Tìm theo tag =====
        let tatCaLi = document.getElementsByTagName("li");
        console.log(tatCaLi.length); // 3
        
        // ===== querySelector — Tìm 1 phần tử (CSS selector) =====
        let firstItem = document.querySelector(".item");
        console.log(firstItem.textContent); // "HTML"
        
        let firstLiInList = document.querySelector("#danh-sach li");
        console.log(firstLiInList.textContent); // "HTML"
        
        // ===== querySelectorAll — Tìm tất cả =====
        let allItems = document.querySelectorAll(".item");
        console.log(allItems.length); // 3
        
        // Duyệt NodeList
        allItems.forEach(item => {
            console.log(item.textContent);
        });
        
        // ===== data attributes =====
        let box = document.querySelector("[data-info='demo']");
        console.log(box.dataset.info); // "demo"
    </script>
</body>
</html>
```

### Thử thách
1. Tìm tất cả `<p>` trên trang và in ra nội dung
2. Tìm phần tử có class "box" và in ra text
3. Dùng querySelectorAll đếm số lượng `<li>`

---

## 📝 Bài 5.3 — Thay đổi nội dung (8 phút)

### Yêu cầu
Thay đổi text và HTML của phần tử

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thay đổi nội dung</title>
</head>
<body>
    <h1 id="tieu-de">Nội dung gốc</h1>
    <p id="van-ban">Đoạn văn ban đầu</p>
    <div id="html-demo"></div>
    
    <script>
        let tieuDe = document.getElementById("tieu-de");
        let vanBan = document.getElementById("van-ban");
        let htmlDemo = document.getElementById("html-demo");
        
        // ===== textContent — Chỉ text thuần =====
        tieuDe.textContent = "Nội dung đã thay đổi!";
        console.log(tieuDe.textContent);
        
        // ===== innerHTML — Có thể chứa HTML =====
        vanBan.innerHTML = "Đoạn văn có <strong>chữ đậm</strong> và <em>chữ nghiêng</em>";
        
        htmlDemo.innerHTML = `
            <h2>Danh sách mới</h2>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
        
        // ===== outerHTML — Thay thế cả phần tử =====
        // tieuDe.outerHTML = "<h2>Đã thay thế cả thẻ h1 bằng h2</h2>";
    </script>
</body>
</html>
```

### Thử thách
1. Thay đổi tiêu đề trang thành tên của bạn
2. Thêm danh sách 5 môn học yêu thích bằng innerHTML
3. In đậm tên giảng viên trong đoạn văn

---

## 📝 Bài 5.4 — Thay đổi Style (CSS) (10 phút)

### Yêu cầu
Thay đổi giao diện bằng JavaScript

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>DOM Style</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            background-color: lightblue;
            border: 2px solid #333;
            padding: 20px;
            margin: 10px;
            transition: all 0.3s;
        }
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div id="box1" class="box">Hộp 1</div>
    <div id="box2" class="box">Hộp 2</div>
    <button id="btn-toggle">Ẩn/Hiện</button>
    
    <script>
        let box1 = document.getElementById("box1");
        let box2 = document.getElementById("box2");
        let btnToggle = document.getElementById("btn-toggle");
        
        // ===== style — Thay đổi inline CSS =====
        box1.style.backgroundColor = "coral";
        box1.style.fontSize = "24px";
        box1.style.borderRadius = "10px";
        
        // Chú ý: dùng camelCase, không dùng dấu gạch ngang
        // box1.style.background-color = "sai"; ❌
        // box1.style.backgroundColor = "đúng"; ✅
        
        // ===== classList — Quản lý class =====
        box2.classList.add("highlight");
        console.log(box2.classList.contains("highlight")); // true
        
        // Toggle class
        box2.classList.toggle("highlight");
        console.log(box2.classList.contains("highlight")); // false
        
        // ===== getComputedStyle — Lấy style tính toán =====
        let style = getComputedStyle(box1);
        console.log("Màu nền:", style.backgroundColor);
        console.log("Chiều rộng:", style.width);
        
        // ===== Ẩn/Hiện =====
        btnToggle.addEventListener("click", function() {
            box1.classList.toggle("hidden");
        });
    </script>
</body>
</html>
```

### Thử thách
1. Đổi màu nền trang thành màu yêu thích
2. Thêm class "highlight" khi click vào box
3. Toggle ẩn/hiện box2 khi click button

---

## 📝 Bài 5.5 — Tạo & Xóa phần tử (10 phút)

### Yêu cầu
Tạo và xóa phần tử động bằng JavaScript

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tạo & Xóa phần tử</title>
</head>
<body>
    <h1>Danh sách công việc</h1>
    <input type="text" id="input-task" placeholder="Nhập công việc...">
    <button id="btn-add">Thêm</button>
    <ul id="task-list"></ul>
    
    <script>
        let inputTask = document.getElementById("input-task");
        let btnAdd = document.getElementById("btn-add");
        let taskList = document.getElementById("task-list");
        
        // ===== Tạo phần tử mới =====
        btnAdd.addEventListener("click", function() {
            let tenTask = inputTask.value.trim();
            
            if (tenTask === "") {
                alert("Vui lòng nhập công việc!");
                return;
            }
            
            // Tạo <li> mới
            let li = document.createElement("li");
            li.textContent = tenTask;
            
            // Tạo nút xóa
            let btnXoa = document.createElement("button");
            btnXoa.textContent = "Xóa";
            btnXoa.style.marginLeft = "10px";
            
            // Gắn sự kiện xóa
            btnXoa.addEventListener("click", function() {
                li.remove(); // Xóa phần tử
            });
            
            li.appendChild(btnXoa);
            taskList.appendChild(li);
            
            // Xóa nội dung input
            inputTask.value = "";
            inputTask.focus();
        });
        
        // ===== Xóa tất cả =====
        // taskList.innerHTML = ""; // Cách nhanh
        
        // ===== Thêm vào đầu =====
        // taskList.prepend(newElement);
        
        // ===== Thêm vào trước phần tử cụ thể =====
        // taskList.insertBefore(newElement, referenceElement);
        
        // ===== Clone phần tử =====
        let original = document.querySelector("li");
        if (original) {
            let clone = original.cloneNode(true); // true = clone cả con
            // taskList.appendChild(clone);
        }
    </script>
</body>
</html>
```

### Thử thách
1. Thêm 3 công việc vào danh sách
2. Tạo nút "Xóa tất cả" 
3. Thêm số thứ tự cho mỗi công việc

---

## ✅ Checklist hoàn thành

- [ ] Hiểu DOM là gì
- [ ] Tìm phần tử bằng getElementById
- [ ] Tìm phần tử bằng querySelector/querySelectorAll
- [ ] Thay đổi textContent và innerHTML
- [ ] Thay đổi style bằng .style
- [ ] Quản lý class bằng classList
- [ ] Tạo phần tử bằng createElement
- [ ] Thêm phần tử bằng appendChild
- [ ] Xóa phần tử bằng .remove()

---

## 🎯 Tự đánh giá

| Câu hỏi | Đúng/Sai |
|---------|----------|
| `querySelector` trả về NodeList | □ |
| `textContent` phân tích HTML | □ |
| `classList.add()` thêm class mới | □ |
| `createElement("div")` tạo thẻ div | □ |
| `appendChild()` thêm vào cuối | □ |

---

**← Quay lại: [Tier 4 — Arrays & Objects](TIER_4_arrays_objects.md)**  
**→ Tiếp theo: [Tier 6 — Events cơ bản](TIER_6_events_basics.md)**
