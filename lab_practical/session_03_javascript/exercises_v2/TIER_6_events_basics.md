# Tier 6 — Events cơ bản (Xử lý sự kiện)

> **Thời gian:** 40-50 phút  
> **Yêu cầu:** Hoàn thành Tier 1-5  
> **Mục tiêu:** Xử lý các sự kiện cơ bản: click, input, keyboard

---

## 📝 Bài 6.1 — Event Listener cơ bản (12 phút)

### Yêu cầu
Lắng nghe và xử lý sự kiện click

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Events cơ bản</title>
    <style>
        .btn {
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
            border: 1px solid #333;
            background: #f0f0f0;
        }
        .btn:hover {
            background: #ddd;
        }
        .active {
            background: coral;
            color: white;
        }
        #counter {
            font-size: 48px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Đếm số lần click</h1>
    <p id="counter">0</p>
    <button class="btn" id="btn-tang">Tăng (+1)</button>
    <button class="btn" id="btn-giam">Giảm (-1)</button>
    <button class="btn" id="btn-reset">Reset</button>
    
    <hr>
    
    <button class="btn" id="btn-mau">Đổi màu</button>
    <div id="box" style="width:100px;height:100px;background:lightblue;margin-top:10px;"></div>
    
    <script>
        // ===== addEventListener =====
        let counter = 0;
        let counterEl = document.getElementById("counter");
        
        // Nút Tăng
        document.getElementById("btn-tang").addEventListener("click", function() {
            counter++;
            counterEl.textContent = counter;
        });
        
        // Nút Giảm
        document.getElementById("btn-giam").addEventListener("click", function() {
            counter--;
            counterEl.textContent = counter;
        });
        
        // Nút Reset
        document.getElementById("btn-reset").addEventListener("click", function() {
            counter = 0;
            counterEl.textContent = counter;
        });
        
        // ===== Đổi màu ngẫu nhiên =====
        document.getElementById("btn-mau").addEventListener("click", function() {
            let box = document.getElementById("box");
            let mauNgauNhien = `hsl(${Math.random() * 360}, 70%, 60%)`;
            box.style.backgroundColor = mauNgauNhien;
        });
        
        // ===== Toggle class =====
        let btnToggle = document.getElementById("btn-mau");
        btnToggle.addEventListener("click", function() {
            btnToggle.classList.toggle("active");
        });
    </script>
</body>
</html>
```

### Thử thách
1. Thêm nút "Nhân đôi" (counter *= 2)
2. Hiển thị "Số dương" hoặc "Số âm" dựa vào giá trị counter
3. Thay đổi màu chữ counter: xanh khi > 0, đỏ khi < 0

---

## 📝 Bài 6.2 — Input Events (10 phút)

### Yêu cầu
Xử lý sự kiện nhập liệu

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Input Events</title>
    <style>
        .preview {
            border: 2px dashed #ccc;
            padding: 15px;
            margin-top: 10px;
            min-height: 50px;
        }
        .char-count {
            font-size: 12px;
            color: #666;
        }
        .char-count.warning {
            color: orange;
        }
        .char-count.error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Preview realtime</h1>
    
    <label>Nhập tên:</label><br>
    <input type="text" id="input-ten" placeholder="Nhập tên của bạn..." maxlength="50">
    <span class="char-count" id="char-count">0/50</span>
    
    <div class="preview" id="preview">
        <em>Nội dung sẽ hiển thị ở đây...</em>
    </div>
    
    <hr>
    
    <label>Chọn màu yêu thích:</label><br>
    <input type="color" id="input-mau" value="#3498db">
    <span id="mau-hex">#3498db</span>
    
    <script>
        // ===== input event — Khi nhập liệu =====
        let inputTen = document.getElementById("input-ten");
        let preview = document.getElementById("preview");
        let charCount = document.getElementById("char-count");
        
        inputTen.addEventListener("input", function() {
            let giaTri = inputTen.value;
            let doDai = giaTri.length;
            
            // Cập nhật preview
            if (giaTri.trim() === "") {
                preview.innerHTML = "<em>Nội dung sẽ hiển thị ở đây...</em>";
            } else {
                preview.innerHTML = `Xin chào <strong>${giaTri}</strong>!`;
            }
            
            // Cập nhật bộ đếm ký tự
            charCount.textContent = `${doDai}/50`;
            
            // Cảnh báo khi gần hết
            charCount.className = "char-count";
            if (doDai > 40) {
                charCount.classList.add("error");
            } else if (doDai > 30) {
                charCount.classList.add("warning");
            }
        });
        
        // ===== change event — Khi thay đổi giá trị =====
        let inputMau = document.getElementById("input-mau");
        let mauHex = document.getElementById("mau-hex");
        
        inputMau.addEventListener("input", function() {
            mauHex.textContent = inputMau.value;
            document.body.style.backgroundColor = inputMau.value + "22"; // Thêm opacity
        });
        
        // ===== focus & blur =====
        inputTen.addEventListener("focus", function() {
            inputTen.style.borderColor = "blue";
            inputTen.style.outline = "none";
        });
        
        inputTen.addEventListener("blur", function() {
            inputTen.style.borderColor = "#ccc";
        });
    </script>
</body>
</html>
```

### Thử thách
1. Tạo ô nhập email với validation cơ bản (có @ không)
2. Hiển thị preview khi nhập mật khẩu (ẩn ký tự)
3. Đếm số từ (không phải ký tự) trong textarea

---

## 📝 Bài 6.3 — Keyboard Events (8 phút)

### Yêu cầu
Xử lý sự kiện bàn phím

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Keyboard Events</title>
    <style>
        .key-display {
            width: 100px;
            height: 100px;
            border: 3px solid #333;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            margin: 20px;
            border-radius: 10px;
            background: #f9f9f9;
        }
        .log {
            background: #f0f0f0;
            padding: 10px;
            font-family: monospace;
            height: 150px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <h1>Nhấn phím bất kỳ</h1>
    <div class="key-display" id="key-display">?</div>
    <p>Phím: <span id="key-info">Chưa nhấn</span></p>
    
    <hr>
    <h3>Nhập và nhấn Enter:</h3>
    <input type="text" id="input-search" placeholder="Nhập rồi nhấn Enter...">
    <div class="log" id="log"></div>
    
    <script>
        let keyDisplay = document.getElementById("key-display");
        let keyInfo = document.getElementById("key-info");
        let log = document.getElementById("log");
        
        // ===== keydown — Nhấn phím =====
        document.addEventListener("keydown", function(event) {
            keyDisplay.textContent = event.key;
            keyInfo.textContent = `Key: ${event.key}, Code: ${event.code}`;
            
            // Phím đặc biệt
            if (event.key === "Escape") {
                keyDisplay.textContent = "ESC";
                keyDisplay.style.background = "red";
                keyDisplay.style.color = "white";
            }
            
            // Ctrl + S
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault(); // Ngăn lưu trang
                log.innerHTML += "<div>Đã nhấn Ctrl+S (lưu giả lập)</div>";
            }
        });
        
        // keyup — Nhả phím
        document.addEventListener("keyup", function(event) {
            if (event.key === "Escape") {
                keyDisplay.style.background = "#f9f9f9";
                keyDisplay.style.color = "black";
            }
        });
        
        // ===== Enter để submit =====
        let inputSearch = document.getElementById("input-search");
        
        inputSearch.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                let giaTri = inputSearch.value.trim();
                if (giaTri) {
                    log.innerHTML += `<div>Tìm kiếm: "${giaTri}"</div>`;
                    inputSearch.value = "";
                }
            }
            
            // Escape để xóa
            if (event.key === "Escape") {
                inputSearch.value = "";
            }
        });
    </script>
</body>
</html>
```

### Thử thách
1. Tạo "game" đoán phím: hiện phím ngẫu nhiên, nhấn đúng để thắng
2. Di chuyển một ô vuông bằng phím mũi tên (↑↓←→)
3. Tạo phím tắt Ctrl+D để đổi màu nền

---

## 📝 Bài 6.4 — Event Delegation (10 phút)

### Yêu cầu
Xử lý sự kiện trên nhiều phần tử hiệu quả

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Event Delegation</title>
    <style>
        .todo-item {
            padding: 10px;
            margin: 5px 0;
            background: #f9f9f9;
            border: 1px solid #ddd;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
        }
        .todo-item:hover {
            background: #e9e9e9;
        }
        .todo-item.done {
            text-decoration: line-through;
            color: #999;
            background: #f0fff0;
        }
        .delete-btn {
            background: #ff4444;
            color: white;
            border: none;
            padding: 2px 8px;
            cursor: pointer;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <h1>Event Delegation Demo</h1>
    <input type="text" id="new-todo" placeholder="Thêm việc...">
    <button id="btn-add">Thêm</button>
    
    <ul id="todo-list">
        <li class="todo-item" data-id="1">
            <span>Học HTML</span>
            <button class="delete-btn">×</button>
        </li>
        <li class="todo-item" data-id="2">
            <span>Học CSS</span>
            <button class="delete-btn">×</button>
        </li>
        <li class="todo-item" data-id="3">
            <span>Học JavaScript</span>
            <button class="delete-btn">×</button>
        </li>
    </ul>
    
    <script>
        let todoList = document.getElementById("todo-list");
        let newTodo = document.getElementById("new-todo");
        let btnAdd = document.getElementById("btn-add");
        let nextId = 4;
        
        // ===== Event Delegation =====
        // Thay vì gắn listener cho MỖI <li>, 
        // gắn MỘT listener cho <ul>
        
        todoList.addEventListener("click", function(event) {
            let target = event.target;
            
            // Click vào nút Xóa
            if (target.classList.contains("delete-btn")) {
                let item = target.closest(".todo-item");
                item.remove();
                return;
            }
            
            // Click vào item (toggle done)
            let item = target.closest(".todo-item");
            if (item) {
                item.classList.toggle("done");
            }
        });
        
        // ===== Thêm item mới =====
        function themTodo(noiDung) {
            let li = document.createElement("li");
            li.className = "todo-item";
            li.dataset.id = nextId++;
            li.innerHTML = `
                <span>${noiDung}</span>
                <button class="delete-btn">×</button>
            `;
            todoList.appendChild(li);
        }
        
        btnAdd.addEventListener("click", function() {
            let noiDung = newTodo.value.trim();
            if (noiDung) {
                themTodo(noiDung);
                newTodo.value = "";
                newTodo.focus();
            }
        });
        
        newTodo.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                btnAdd.click();
            }
        });
    </script>
</body>
</html>
```

### Thử thách
1. Thêm bộ lọc All/Active/Completed
2. Hiển thị số việc chưa hoàn thành
3. Double-click để sửa tên công việc

---

## 📝 Bài 6.5 — Form Events (8 phút)

### Yêu cầu
Xử lý sự kiện form cơ bản

### Code mẫu
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Form Events</title>
    <style>
        .form-group {
            margin: 10px 0;
        }
        .error {
            color: red;
            font-size: 12px;
        }
        input:invalid {
            border-color: red;
        }
        input:valid {
            border-color: green;
        }
    </style>
</head>
<body>
    <h1>Đăng ký tài khoản</h1>
    <form id="register-form">
        <div class="form-group">
            <label>Tên đăng nhập:</label><br>
            <input type="text" id="username" required minlength="3">
            <div class="error" id="username-error"></div>
        </div>
        
        <div class="form-group">
            <label>Email:</label><br>
            <input type="email" id="email" required>
            <div class="error" id="email-error"></div>
        </div>
        
        <div class="form-group">
            <label>Mật khẩu:</label><br>
            <input type="password" id="password" required minlength="6">
            <div class="error" id="password-error"></div>
        </div>
        
        <div class="form-group">
            <label><input type="checkbox" id="agree"> Tôi đồng ý với điều khoản</label>
        </div>
        
        <button type="submit">Đăng ký</button>
    </form>
    
    <div id="result"></div>
    
    <script>
        let form = document.getElementById("register-form");
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let result = document.getElementById("result");
        
        // ===== submit event =====
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Ngăn reload trang
            
            // Lấy giá trị
            let data = {
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value
            };
            
            // Validate cơ bản
            let coLoi = false;
            
            if (data.username.length < 3) {
                document.getElementById("username-error").textContent = "Tên phải >= 3 ký tự";
                coLoi = true;
            } else {
                document.getElementById("username-error").textContent = "";
            }
            
            if (!data.email.includes("@")) {
                document.getElementById("email-error").textContent = "Email không hợp lệ";
                coLoi = true;
            } else {
                document.getElementById("email-error").textContent = "";
            }
            
            if (data.password.length < 6) {
                document.getElementById("password-error").textContent = "Mật khẩu phải >= 6 ký tự";
                coLoi = true;
            } else {
                document.getElementById("password-error").textContent = "";
            }
            
            if (!document.getElementById("agree").checked) {
                alert("Vui lòng đồng ý với điều khoản!");
                coLoi = true;
            }
            
            if (!coLoi) {
                result.innerHTML = `
                    <h3>Đăng ký thành công!</h3>
                    <p>Tên: ${data.username}</p>
                    <p>Email: ${data.email}</p>
                `;
                form.reset();
            }
        });
        
        // ===== Real-time validation =====
        username.addEventListener("input", function() {
            let err = document.getElementById("username-error");
            if (username.value.length < 3 && username.value.length > 0) {
                err.textContent = "Tên phải >= 3 ký tự";
            } else {
                err.textContent = "";
            }
        });
    </script>
</body>
</html>
```

### Thử thách
1. Thêm validation cho mật khẩu: phải có chữ hoa, chữ thường, số
2. Hiện thị strength indicator cho mật khẩu (yếu/trung bình/mạnh)
3. Kiểm tra mật khẩu nhập lại có khớp không

---

## ✅ Checklist hoàn thành

- [ ] Sử dụng addEventListener
- [ ] Xử lý sự kiện click
- [ ] Xử lý sự kiện input/change
- [ ] Xử lý sự kiện keyboard (keydown/keyup)
- [ ] Sử dụng event.preventDefault()
- [ ] Hiểu Event Delegation
- [ ] Xử lý form submit
- [ ] Validate form cơ bản

---

## 🎯 Tự đánh giá

| Câu hỏi | Đúng/Sai |
|---------|----------|
| `onclick` tốt hơn `addEventListener` | □ |
| `event.preventDefault()` ngăn hành vi mặc định | □ |
| Event delegation gắn listener cho từng phần tử con | □ |
| `input` event kích hoạt mỗi khi nhập | □ |
| `submit` event gắn cho button | □ |

---

**← Quay lại: [Tier 5 — DOM cơ bản](TIER_5_dom_basics.md)**  
**→ Tiếp theo: [Tier 7 — Mini Projects](TIER_7_mini_projects.md)**
