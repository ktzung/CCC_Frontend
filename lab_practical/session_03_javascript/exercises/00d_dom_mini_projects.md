# Exercise 0D — DOM Mini Projects (5 dự án nhỏ)

## 🎬 Opening Scenario

*Đã học xong JS cơ bản, DOM, và Events — giờ là lúc áp dụng vào 5 mini-project thực tế. Mỗi project chỉ 1 file HTML, có thể hoàn thành trong 15-20 phút.*

---

## 🎯 Mục tiêu học tập

- Kết hợp JS cơ bản + DOM + Events vào dự án thực tế
- Luyện tư duy logic: biến, hàm, điều kiện, vòng lặp
- Tạo các ứng dụng nhỏ có thể "chạy" ngay trên trình duyệt

---

## 🪜 Project 1: Digital Clock (Đồng hồ số)

### Mô tả
Hiển thị đồng hồ thời gian thực, cập nhật mỗi giây.

### Code hoàn chỉnh

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Digital Clock</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .clock {
            font-size: 6rem;
            font-weight: 700;
            font-family: 'Courier New', monospace;
            letter-spacing: 4px;
        }
        .date {
            font-size: 1.5rem;
            color: #94a3b8;
            margin-top: 0.5rem;
        }
        .seconds-bar {
            width: 300px;
            height: 6px;
            background: #334155;
            border-radius: 3px;
            margin-top: 1rem;
            overflow: hidden;
        }
        .seconds-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            border-radius: 3px;
            transition: width 1s linear;
        }
        .greeting {
            font-size: 1.25rem;
            margin-top: 1.5rem;
            padding: 0.5rem 1.5rem;
            border-radius: 999px;
        }
    </style>
</head>
<body>
    <div class="clock" id="clock">00:00:00</div>
    <div class="date" id="date"></div>
    <div class="seconds-bar">
        <div class="seconds-fill" id="seconds-fill"></div>
    </div>
    <div class="greeting" id="greeting"></div>

    <script>
        const clockEl = document.getElementById('clock');
        const dateEl = document.getElementById('date');
        const secondsFill = document.getElementById('seconds-fill');
        const greetingEl = document.getElementById('greeting');

        function updateClock() {
            const now = new Date();

            // Giờ:phút:giây
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockEl.textContent = `${hours}:${minutes}:${seconds}`;

            // Ngày tháng
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            dateEl.textContent = now.toLocaleDateString('vi-VN', options);

            // Thanh giây
            const progress = (now.getSeconds() / 59) * 100;
            secondsFill.style.width = `${progress}%`;

            // Lời chào theo giờ
            const hour = now.getHours();
            let greeting, color;
            if (hour >= 5 && hour < 12) {
                greeting = '🌅 Chào buổi sáng!';
                color = '#fef3c7';
            } else if (hour >= 12 && hour < 18) {
                greeting = '☀️ Chào buổi chiều!';
                color = '#dbeafe';
            } else if (hour >= 18 && hour < 22) {
                greeting = '🌇 Chào buổi tối!';
                color = '#fce7f3';
            } else {
                greeting = '🌙 Khuya rồi, ngủ đi!';
                color = '#1e293b';
            }
            greetingEl.textContent = greeting;
            greetingEl.style.background = color;
            greetingEl.style.color = hour >= 22 || hour < 5 ? '#e2e8f0' : '#1e293b';
        }

        // Cập nhật mỗi giây
        updateClock();
        setInterval(updateClock, 1000);
    </script>
</body>
</html>
```

### Kiến thức áp dụng
- `new Date()` — đối tượng ngày giờ
- `setInterval()` — lặp lại mỗi giây
- `padStart()` — thêm số 0 phía trước
- `toLocaleDateString()` — format ngày theo locale

---

## 🪜 Project 2: Color Palette Generator

### Mô tả
Tạo bảng màu ngẫu nhiên, click để copy mã màu.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Color Palette Generator</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #1e293b;
            color: #e2e8f0;
            padding: 2rem;
            text-align: center;
        }
        h1 { margin-bottom: 0.5rem; }
        .hint { color: #94a3b8; margin-bottom: 2rem; }
        .palette {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        .color-card {
            width: 150px;
            height: 200px;
            border-radius: 16px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 1rem;
            transition: transform 0.2s;
            position: relative;
        }
        .color-card:hover { transform: translateY(-8px); }
        .color-hex {
            background: rgba(0,0,0,0.5);
            color: white;
            padding: 0.3rem 0.6rem;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.9rem;
        }
        .generate-btn {
            padding: 0.75rem 2rem;
            border: none;
            background: #8b5cf6;
            color: white;
            border-radius: 12px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .generate-btn:hover { background: #7c3aed; }
        .toast {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: #22c55e;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            display: none;
            animation: fadeInUp 0.3s ease;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
    </style>
</head>
<body>
    <h1>🎨 Color Palette Generator</h1>
    <p class="hint">Click vào màu để copy mã hex</p>
    <div class="palette" id="palette"></div>
    <button class="generate-btn" id="generate-btn">🎲 Tạo bảng màu mới</button>
    <div class="toast" id="toast">Đã copy!</div>

    <script>
        const palette = document.getElementById('palette');
        const toast = document.getElementById('toast');

        function randomHex() {
            const hex = Math.floor(Math.random() * 16777215).toString(16);
            return '#' + hex.padStart(6, '0');
        }

        function generatePalette() {
            palette.innerHTML = '';

            for (let i = 0; i < 5; i++) {
                const color = randomHex();

                const card = document.createElement('div');
                card.className = 'color-card';
                card.style.backgroundColor = color;
                card.innerHTML = `<span class="color-hex">${color.toUpperCase()}</span>`;

                card.addEventListener('click', () => {
                    navigator.clipboard.writeText(color.toUpperCase());
                    showToast(`Đã copy ${color.toUpperCase()}`);
                });

                palette.appendChild(card);
            }
        }

        function showToast(message) {
            toast.textContent = message;
            toast.style.display = 'block';
            setTimeout(() => toast.style.display = 'none', 2000);
        }

        document.getElementById('generate-btn').addEventListener('click', generatePalette);

        generatePalette(); // Tạo lần đầu
    </script>
</body>
</html>
```

### Kiến thức áp dụng
- `Math.random()` — số ngẫu nhiên
- `toString(16)` — chuyển sang hệ thập lục phân
- `navigator.clipboard.writeText()` — copy vào clipboard
- `setTimeout()` — ẩn toast sau 2 giây

---

## 🪜 Project 3: Tip Calculator (Tính tiền boa)

### Mô tả
Tính tiền tip theo phần trăm, chia đều cho số người.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tip Calculator</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        .calculator {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            width: 400px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { text-align: center; margin-bottom: 1.5rem; font-size: 1.5rem; }
        label { font-weight: 600; display: block; margin-bottom: 0.3rem; color: #334155; }
        input, select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 1rem;
            box-sizing: border-box;
        }
        input:focus, select:focus { border-color: #6366f1; outline: none; }
        .tip-buttons {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .tip-btn {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .tip-btn.active {
            background: #6366f1;
            border-color: #6366f1;
            color: white;
        }
        .result {
            background: #f0fdf4;
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 1rem;
        }
        .result-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
        }
        .result-row.total {
            font-size: 1.25rem;
            font-weight: 700;
            color: #166534;
            border-top: 2px solid #bbf7d0;
            padding-top: 0.75rem;
            margin-top: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <h1>💰 Tip Calculator</h1>

        <label>Hóa đơn (VNĐ):</label>
        <input type="number" id="bill" placeholder="VD: 500000" min="0">

        <label>Phần trăm tip:</label>
        <div class="tip-buttons">
            <button class="tip-btn" data-tip="10">10%</button>
            <button class="tip-btn active" data-tip="15">15%</button>
            <button class="tip-btn" data-tip="20">20%</button>
            <button class="tip-btn" data-tip="25">25%</button>
        </div>

        <label>Số người chia:</label>
        <input type="number" id="people" value="1" min="1" max="20">

        <div class="result">
            <div class="result-row">
                <span>Tiền tip:</span>
                <span id="tip-amount">0 ₫</span>
            </div>
            <div class="result-row">
                <span>Tổng cộng:</span>
                <span id="total-amount">0 ₫</span>
            </div>
            <div class="result-row total">
                <span>Mỗi người:</span>
                <span id="per-person">0 ₫</span>
            </div>
        </div>
    </div>

    <script>
        let tipPercent = 15;

        const billInput = document.getElementById('bill');
        const peopleInput = document.getElementById('people');
        const tipAmountEl = document.getElementById('tip-amount');
        const totalAmountEl = document.getElementById('total-amount');
        const perPersonEl = document.getElementById('per-person');

        function formatMoney(amount) {
            return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + ' ₫';
        }

        function calculate() {
            const bill = parseFloat(billInput.value) || 0;
            const people = parseInt(peopleInput.value) || 1;

            const tip = bill * (tipPercent / 100);
            const total = bill + tip;
            const perPerson = total / people;

            tipAmountEl.textContent = formatMoney(tip);
            totalAmountEl.textContent = formatMoney(total);
            perPersonEl.textContent = formatMoney(perPerson);
        }

        // Tip buttons
        document.querySelectorAll('.tip-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                tipPercent = parseInt(btn.dataset.tip);
                calculate();
            });
        });

        // Input events
        billInput.addEventListener('input', calculate);
        peopleInput.addEventListener('input', calculate);

        calculate(); // Tính lần đầu
    </script>
</body>
</html>
```

### Kiến thức áp dụng
- `parseFloat()`, `parseInt()` — chuyển string thành số
- `Intl.NumberFormat` — format số theo locale
- `data-*` attributes — lưu dữ liệu trên HTML element
- Tính toán realtime khi nhập

---

## 🪜 Project 4: Password Strength Checker

### Mô tả
Kiểm tra độ mạnh mật khẩu realtime, hiển thị thanh đánh giá.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Password Strength Checker</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .checker {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            width: 420px;
        }
        h1 { text-align: center; font-size: 1.5rem; margin-bottom: 1.5rem; }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 1rem;
            box-sizing: border-box;
        }
        input:focus { border-color: #8b5cf6; outline: none; }
        .strength-bar {
            height: 8px;
            background: #334155;
            border-radius: 4px;
            margin: 1rem 0;
            overflow: hidden;
        }
        .strength-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s, background 0.3s;
            width: 0%;
        }
        .strength-label {
            text-align: center;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        .criteria { list-style: none; padding: 0; }
        .criteria li {
            padding: 0.4rem 0;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .criteria li.valid { color: #22c55e; }
        .criteria li.invalid { color: #64748b; }
        .toggle-visibility {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 1.2rem;
        }
        .input-wrapper { position: relative; }
    </style>
</head>
<body>
    <div class="checker">
        <h1>🔐 Password Strength Checker</h1>

        <div class="input-wrapper">
            <input type="password" id="password" placeholder="Nhập mật khẩu...">
            <button class="toggle-visibility" id="toggle-btn">👁️</button>
        </div>

        <div class="strength-bar">
            <div class="strength-fill" id="strength-fill"></div>
        </div>
        <div class="strength-label" id="strength-label">Nhập mật khẩu để kiểm tra</div>

        <ul class="criteria" id="criteria">
            <li class="invalid" id="crit-length">⬜ Ít nhất 8 ký tự</li>
            <li class="invalid" id="crit-upper">⬜ Có chữ HOA (A-Z)</li>
            <li class="invalid" id="crit-lower">⬜ Có chữ thường (a-z)</li>
            <li class="invalid" id="crit-number">⬜ Có số (0-9)</li>
            <li class="invalid" id="crit-special">⬜ Có ký tự đặc biệt (!@#$...)</li>
        </ul>
    </div>

    <script>
        const passwordInput = document.getElementById('password');
        const strengthFill = document.getElementById('strength-fill');
        const strengthLabel = document.getElementById('strength-label');
        const toggleBtn = document.getElementById('toggle-btn');

        // Toggle hiển thị mật khẩu
        let showPassword = false;
        toggleBtn.addEventListener('click', () => {
            showPassword = !showPassword;
            passwordInput.type = showPassword ? 'text' : 'password';
            toggleBtn.textContent = showPassword ? '🙈' : '👁️';
        });

        // Kiểm tra mật khẩu
        passwordInput.addEventListener('input', (e) => {
            const pwd = e.target.value;

            // Kiểm tra từng tiêu chí
            const checks = {
                length:  pwd.length >= 8,
                upper:   /[A-Z]/.test(pwd),
                lower:   /[a-z]/.test(pwd),
                number:  /[0-9]/.test(pwd),
                special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
            };

            // Cập nhật UI tiêu chí
            updateCriterion('crit-length',   checks.length);
            updateCriterion('crit-upper',    checks.upper);
            updateCriterion('crit-lower',    checks.lower);
            updateCriterion('crit-number',   checks.number);
            updateCriterion('crit-special',  checks.special);

            // Tính điểm (0-5)
            const score = Object.values(checks).filter(Boolean).length;

            // Cập nhật thanh strength
            updateStrengthBar(score);
        });

        function updateCriterion(id, valid) {
            const el = document.getElementById(id);
            if (valid) {
                el.className = 'valid';
                el.textContent = '✅ ' + el.textContent.slice(2);
            } else {
                el.className = 'invalid';
                el.textContent = '⬜ ' + el.textContent.slice(2);
            }
        }

        function updateStrengthBar(score) {
            const levels = [
                { max: 0, width: '0%',   color: '#334155', label: 'Nhập mật khẩu để kiểm tra' },
                { max: 1, width: '20%',  color: '#ef4444', label: '😰 Rất yếu' },
                { max: 2, width: '40%',  color: '#f59e0b', label: '😟 Yếu' },
                { max: 3, width: '60%',  color: '#eab308', label: '😐 Trung bình' },
                { max: 4, width: '80%',  color: '#22c55e', label: '😊 Mạnh' },
                { max: 5, width: '100%', color: '#10b981', label: '💪 Rất mạnh!' }
            ];

            const level = levels[score];
            strengthFill.style.width = level.width;
            strengthFill.style.backgroundColor = level.color;
            strengthLabel.textContent = level.label;
            strengthLabel.style.color = level.color;
        }
    </script>
</body>
</html>
```

### Kiến thức áp dụng
- **Regex** (`/[A-Z]/.test()`) — kiểm tra mẫu ký tự
- `Object.values().filter()` — đếm số điều kiện đúng
- Toggle visibility với `input.type`
- Conditional styling theo điểm số

---

## 🪜 Project 5: Accordion FAQ

### Mô tả
Tạo danh sách câu hỏi thường gặp, click để mở/đóng đáp án.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Accordion FAQ</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f1f5f9;
            padding: 2rem;
            max-width: 700px;
            margin: 0 auto;
        }
        h1 { text-align: center; color: #334155; }
        .accordion { margin-top: 1.5rem; }
        .accordion-item {
            background: white;
            border-radius: 12px;
            margin-bottom: 0.75rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .accordion-header {
            padding: 1rem 1.25rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            color: #334155;
            transition: background 0.2s;
        }
        .accordion-header:hover { background: #f8fafc; }
        .accordion-header .icon {
            font-size: 1.25rem;
            transition: transform 0.3s;
        }
        .accordion-item.active .accordion-header .icon {
            transform: rotate(45deg);
        }
        .accordion-body {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            padding: 0 1.25rem;
            color: #64748b;
            line-height: 1.6;
        }
        .accordion-item.active .accordion-body {
            max-height: 200px;
            padding: 0 1.25rem 1.25rem;
        }
        .accordion-item.active .accordion-header {
            color: #6366f1;
        }
    </style>
</head>
<body>
    <h1>❓ Câu hỏi thường gặp</h1>

    <div class="accordion" id="accordion">
        <div class="accordion-item">
            <div class="accordion-header">
                JavaScript là gì?
                <span class="icon">+</span>
            </div>
            <div class="accordion-body">
                JavaScript là ngôn ngữ lập trình phổ biến nhất thế giới, chạy trên trình duyệt web.
                Được tạo ra bởi Brendan Eich năm 1995, JavaScript cho phép tạo trang web tương tác,
                ứng dụng web, server (Node.js), và nhiều hơn nữa.
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header">
                DOM là gì?
                <span class="icon">+</span>
            </div>
            <div class="accordion-body">
                DOM (Document Object Model) là cách trình duyệt biểu diễn trang HTML thành cây đối tượng.
                JavaScript có thể truy cập, thay đổi, thêm, xóa phần tử trên trang thông qua DOM.
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header">
                let, const, var khác nhau thế nào?
                <span class="icon">+</span>
            </div>
            <div class="accordion-body">
                <strong>let</strong> — biến có thể thay đổi giá trị, phạm vi block scope.<br>
                <strong>const</strong> — hằng số, không thể gán lại, phạm vi block scope.<br>
                <strong>var</strong> — cách cũ, phạm vi function scope, có thể gây bug.<br>
                Khuyến nghị: dùng <strong>const</strong> mặc định, <strong>let</strong> khi cần thay đổi.
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header">
                addEventListener là gì?
                <span class="icon">+</span>
            </div>
            <div class="accordion-body">
                addEventListener là phương thức để "lắng nghe" sự kiện trên phần tử HTML.
                Ví dụ: click, input, keydown, submit... Khi sự kiện xảy ra,
                hàm callback sẽ được gọi để xử lý.
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header">
                localStorage là gì?
                <span class="icon">+</span>
            </div>
            <div class="accordion-body">
                localStorage là nơi lưu dữ liệu trong trình duyệt, dữ liệu tồn tại ngay cả khi
                đóng tab hoặc tắt trình duyệt. Chỉ lưu được string, nên dùng JSON.stringify()
                và JSON.parse() để lưu object/array.
            </div>
        </div>
    </div>

    <script>
        const accordion = document.getElementById('accordion');

        // Event Delegation — gắn 1 listener cho parent
        accordion.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (!header) return;

            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Đóng tất cả
            accordion.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Mở cái vừa click (nếu chưa mở)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    </script>
</body>
</html>
```

### Kiến thức áp dụng
- **CSS transitions** cho animation mở/đóng
- `max-height: 0` → `max-height: 200px` trick
- **Event delegation** trên accordion
- Toggle class `active`

---

## ✅ Checklist tổng hợp

### Project 1: Digital Clock
- [ ] Hiển thị giờ:phút:giây
- [ ] Cập nhật mỗi giây với `setInterval`
- [ ] Ngày tháng tiếng Việt
- [ ] Lời chào theo thời gian

### Project 2: Color Palette
- [ ] Tạo 5 màu ngẫu nhiên
- [ ] Click để copy mã hex
- [ ] Toast notification
- [ ] Nút tạo bảng mới

### Project 3: Tip Calculator
- [ ] Nhập hóa đơn, chọn % tip
- [ ] Chia đều cho số người
- [ ] Format tiền VNĐ
- [ ] Tính realtime

### Project 4: Password Checker
- [ ] 5 tiêu chí kiểm tra
- [ ] Thanh strength bar
- [ ] Toggle hiển thị mật khẩu
- [ ] Regex validation

### Project 5: Accordion FAQ
- [ ] Click mở/đóng
- [ ] Animation CSS
- [ ] Event delegation
- [ ] Chỉ mở 1 mục tại một thời điểm

---

**← [Bài trước: Events Basics](00c_events_basics.md) | [Bài tiếp theo: Skill Filter →](01_skill_filter.md)**
