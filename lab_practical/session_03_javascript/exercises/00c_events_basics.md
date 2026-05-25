# Exercise 0C — Events Basics (Làm quen với Events)

## 🎬 Opening Scenario

*Event (sự kiện) là cách JavaScript phản hồi hành động của người dùng: click chuột, gõ phím, submit form... Bài tập này giúp bạn nắm vững cách lắng nghe và xử lý sự kiện.*

---

## 🎯 Mục tiêu học tập

- Hiểu Event là gì và các loại event phổ biến
- Sử dụng `addEventListener` để lắng nghe sự kiện
- Xử lý `click`, `input`, `keydown`, `submit`
- Hiểu `event object` và `event.preventDefault()`
- Làm quen với Event Delegation

---

## 🪜 Bài tập chi tiết

### Bài 0C.1 — Click Event cơ bản (10 phút)

**Yêu cầu:** Tạo nút bấm đổi màu nền trang.

**Tạo file `events_basics.html`:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Events Basics</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            padding: 2rem;
            transition: background-color 0.3s;
        }
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            margin: 0.5rem;
            transition: all 0.2s;
        }
        .btn-blue { background: #3b82f6; color: white; }
        .btn-green { background: #22c55e; color: white; }
        .btn-red { background: #ef4444; color: white; }
        .btn:hover { opacity: 0.85; transform: scale(1.02); }
        #output {
            margin-top: 1rem;
            padding: 1rem;
            background: #f1f5f9;
            border-radius: 8px;
            min-height: 50px;
        }
        .counter-display {
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <h1>🖱️ Click Events</h1>

    <!-- Phần 1: Đổi màu nền -->
    <h2>Bài 1: Đổi màu nền</h2>
    <button class="btn btn-blue" id="btn-blue">Xanh dương</button>
    <button class="btn btn-green" id="btn-green">Xanh lá</button>
    <button class="btn btn-red" id="btn-red">Đỏ</button>

    <!-- Phần 2: Bộ đếm -->
    <h2>Bài 2: Bộ đếm</h2>
    <div class="counter-display" id="counter">0</div>
    <button class="btn btn-green" id="btn-increase">+1 Tăng</button>
    <button class="btn btn-red" id="btn-decrease">-1 Giảm</button>
    <button class="btn btn-blue" id="btn-reset">↺ Reset</button>

    <!-- Phần 3: Output -->
    <h2>Bài 3: Nhật ký sự kiện</h2>
    <div id="output">Chưa có sự kiện nào...</div>

    <script>
        // ===== BÀI 1: ĐỔI MÀU NỀN =====
        const btnBlue = document.getElementById('btn-blue');
        const btnGreen = document.getElementById('btn-green');
        const btnRed = document.getElementById('btn-red');

        btnBlue.addEventListener('click', () => {
            document.body.style.backgroundColor = '#dbeafe';
            logEvent('Đã chuyển sang màu xanh dương');
        });

        btnGreen.addEventListener('click', () => {
            document.body.style.backgroundColor = '#dcfce7';
            logEvent('Đã chuyển sang màu xanh lá');
        });

        btnRed.addEventListener('click', () => {
            document.body.style.backgroundColor = '#fee2e2';
            logEvent('Đã chuyển sang màu đỏ');
        });

        // ===== BÀI 2: BỘ ĐẾM =====
        let count = 0;
        const counterEl = document.getElementById('counter');

        document.getElementById('btn-increase').addEventListener('click', () => {
            count++;
            counterEl.textContent = count;
            counterEl.style.color = count > 0 ? '#22c55e' : '#1e293b';
            logEvent(`Tăng: ${count}`);
        });

        document.getElementById('btn-decrease').addEventListener('click', () => {
            count--;
            counterEl.textContent = count;
            counterEl.style.color = count < 0 ? '#ef4444' : '#1e293b';
            logEvent(`Giảm: ${count}`);
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            count = 0;
            counterEl.textContent = count;
            counterEl.style.color = '#1e293b';
            logEvent('Reset về 0');
        });

        // ===== BÀI 3: NHẬT KÝ =====
        const output = document.getElementById('output');

        function logEvent(message) {
            const time = new Date().toLocaleTimeString('vi-VN');
            output.innerHTML = `<div>[${time}] ${message}</div>` + output.innerHTML;
        }
    </script>
</body>
</html>
```

**Yêu cầu hoàn thành:**
1. Copy code trên vào file `events_basics.html`
2. Click 3 nút màu → trang đổi màu nền
3. Click +1/-1 → số đếm thay đổi, đổi màu theo giá trị
4. Nhật ký ghi lại thời gian và hành động

---

### Bài 0C.2 — Input Event (10 phút)

**Yêu cầu:** Xử lý sự kiện nhập liệu realtime.

```html
<!-- Thêm vào events_basics.html trước </body> -->

<h2>Bài 4: Tìm kiếm realtime</h2>
<input
    type="text"
    id="search-input"
    placeholder="Gõ để tìm kiếm..."
    style="padding:0.75rem; width:300px; border:2px solid #e2e8f0; border-radius:8px; font-size:1rem;"
>
<p id="search-result" style="margin-top:0.5rem; color:#64748b;"></p>

<h2>Bài 5: Đếm ký tự</h2>
<textarea
    id="message-input"
    placeholder="Nhập tin nhắn..."
    rows="3"
    style="padding:0.75rem; width:100%; border:2px solid #e2e8f0; border-radius:8px; font-size:1rem; resize:vertical;"
></textarea>
<p id="char-count" style="margin-top:0.25rem; color:#64748b;">0 / 200 ký tự</p>

<h2>Bài 6: Hiển thị giá trị realtime</h2>
<input
    type="range"
    id="range-input"
    min="0"
    max="100"
    value="50"
    style="width:300px;"
>
<span id="range-value" style="font-size:1.5rem; font-weight:700; margin-left:1rem;">50</span>
```

```javascript
// ===== BÀI 4: TÌM KIẾM REALTIME =====
const searchInput = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');

const monHoc = [
    "HTML cơ bản", "CSS Layout", "JavaScript DOM",
    "Bootstrap 5", "React cơ bản", "Vue.js", "Node.js",
    "TypeScript", "Git & GitHub", "REST API"
];

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        searchResult.textContent = 'Gõ để tìm kiếm...';
        return;
    }

    const ketQua = monHoc.filter(mon =>
        mon.toLowerCase().includes(query)
    );

    if (ketQua.length > 0) {
        searchResult.innerHTML = `Tìm thấy <strong>${ketQua.length}</strong> kết quả: ${ketQua.join(', ')}`;
        searchResult.style.color = '#166534';
    } else {
        searchResult.textContent = `Không tìm thấy "${query}"`;
        searchResult.style.color = '#991b1b';
    }
});

// ===== BÀI 5: ĐẾM KÝ TỰ =====
const messageInput = document.getElementById('message-input');
const charCount = document.getElementById('char-count');

messageInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    charCount.textContent = `${length} / 200 ký tự`;

    if (length > 200) {
        charCount.style.color = '#ef4444';
        charCount.textContent += ' — Vượt quá giới hạn!';
    } else if (length > 150) {
        charCount.style.color = '#f59e0b';
    } else {
        charCount.style.color = '#64748b';
    }
});

// ===== BÀI 6: RANGE SLIDER =====
const rangeInput = document.getElementById('range-input');
const rangeValue = document.getElementById('range-value');

rangeInput.addEventListener('input', (e) => {
    rangeValue.textContent = e.target.value;

    // Đổi màu theo giá trị
    const val = parseInt(e.target.value);
    if (val < 30) rangeValue.style.color = '#3b82f6';
    else if (val < 70) rangeValue.style.color = '#22c55e';
    else rangeValue.style.color = '#ef4444';
});
```

**Câu hỏi:**
1. Sự khác biệt giữa event `input` và `change`?
2. Tại sao dùng `e.target.value` thay vì `searchInput.value`?

---

### Bài 0C.3 — Keyboard Event (10 phút)

**Yêu cầu:** Xử lý sự kiện bàn phím.

```html
<!-- Thêm vào events_basics.html -->

<h2>Bài 7: Phím tắt</h2>
<p>Nhấn phím bất kỳ để xem thông tin:</p>
<div id="key-display" style="font-size:2rem; font-weight:700; padding:1rem; background:#f1f5f9; border-radius:8px; text-align:center;">
    Chờ bạn nhấn phím...
</div>
<p style="margin-top:0.5rem; color:#64748b;">Thử: Enter, Escape, Space, mũi tên...</p>

<h2>Bài 8: Nhập liệu nâng cao</h2>
<input
    type="text"
    id="special-input"
    placeholder="Nhập và nhấn Enter..."
    style="padding:0.75rem; width:300px; border:2px solid #e2e8f0; border-radius:8px; font-size:1rem;"
>
<div id="tag-list" style="margin-top:0.5rem; display:flex; flex-wrap:wrap; gap:0.5rem;"></div>
```

```javascript
// ===== BÀI 7: PHÍM TẮT =====
const keyDisplay = document.getElementById('key-display');

document.addEventListener('keydown', (e) => {
    keyDisplay.innerHTML = `
        <span style="color:#3b82f6;">Key:</span> "${e.key}" &nbsp;|&nbsp;
        <span style="color:#22c55e;">Code:</span> "${e.code}" &nbsp;|&nbsp;
        <span style="color:#f59e0b;">Shift:</span> ${e.shiftKey} &nbsp;|&nbsp;
        <span style="color:#ef4444;">Ctrl:</span> ${e.ctrlKey}
    `;
});

// ===== BÀI 8: TAG INPUT (nhập + Enter) =====
const specialInput = document.getElementById('special-input');
const tagList = document.getElementById('tag-list');
let tags = [];

specialInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const value = specialInput.value.trim();

        if (value === '') return;
        if (tags.includes(value)) {
            alert('Tag này đã tồn tại!');
            return;
        }

        tags.push(value);
        renderTags();
        specialInput.value = '';
    }

    if (e.key === 'Backspace' && specialInput.value === '' && tags.length > 0) {
        tags.pop();
        renderTags();
    }
});

function renderTags() {
    tagList.innerHTML = tags.map((tag, index) => `
        <span style="
            background:#dbeafe;
            padding:0.3rem 0.8rem;
            border-radius:999px;
            font-size:0.85rem;
            display:flex;
            align-items:center;
            gap:0.3rem;
        ">
            ${tag}
            <button onclick="removeTag(${index})" style="
                border:none;
                background:transparent;
                cursor:pointer;
                font-size:1rem;
                color:#3b82f6;
            ">&times;</button>
        </span>
    `).join('');
}

function removeTag(index) {
    tags.splice(index, 1);
    renderTags();
}
```

---

### Bài 0C.4 — Form Event (10 phút)

**Yêu cầu:** Xử lý submit form và `preventDefault()`.

```html
<!-- Thêm vào events_basics.html -->

<h2>Bài 9: Form đăng ký</h2>
<form id="register-form" style="max-width:400px;">
    <div style="margin-bottom:0.75rem;">
        <label>Họ tên:</label><br>
        <input type="text" id="reg-name" required
            style="width:100%; padding:0.5rem; border:1px solid #cbd5e1; border-radius:6px;">
    </div>
    <div style="margin-bottom:0.75rem;">
        <label>Email:</label><br>
        <input type="email" id="reg-email" required
            style="width:100%; padding:0.5rem; border:1px solid #cbd5e1; border-radius:6px;">
    </div>
    <div style="margin-bottom:0.75rem;">
        <label>Mật khẩu:</label><br>
        <input type="password" id="reg-password" required minlength="6"
            style="width:100%; padding:0.5rem; border:1px solid #cbd5e1; border-radius:6px;">
    </div>
    <button type="submit" class="btn btn-blue">Đăng ký</button>
</form>
<div id="form-result" style="margin-top:1rem;"></div>
```

```javascript
// ===== BÀI 9: FORM SUBMIT =====
const form = document.getElementById('register-form');
const formResult = document.getElementById('form-result');

form.addEventListener('submit', (e) => {
    // ⚠️ QUAN TRỌNG: Ngăn form reload trang
    e.preventDefault();

    // Lấy giá trị
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    // Validate đơn giản
    if (name.length < 2) {
        showFormError('Họ tên phải ít nhất 2 ký tự');
        return;
    }

    if (!email.includes('@')) {
        showFormError('Email không hợp lệ');
        return;
    }

    if (password.length < 6) {
        showFormError('Mật khẩu phải ít nhất 6 ký tự');
        return;
    }

    // Thành công
    formResult.innerHTML = `
        <div style="background:#dcfce7; padding:1rem; border-radius:8px; border-left:4px solid #22c55e;">
            ✅ <strong>Đăng ký thành công!</strong><br>
            Họ tên: ${name}<br>
            Email: ${email}
        </div>
    `;

    // Reset form
    form.reset();
});

function showFormError(message) {
    formResult.innerHTML = `
        <div style="background:#fee2e2; padding:1rem; border-radius:8px; border-left:4px solid #ef4444;">
            ❌ ${message}
        </div>
    `;
}
```

---

### Bài 0C.5 — Event Delegation (10 phút)

**Yêu cầu:** Hiểu và áp dụng Event Delegation — kỹ thuật quan trọng.

```html
<!-- Thêm vào events_basics.html -->

<h2>Bài 10: Event Delegation</h2>
<p>Click vào bất kỳ mục nào trong danh sách:</p>
<ul id="delegation-list" style="list-style:none; padding:0;">
    <li data-action="edit" style="padding:0.75rem; margin:0.5rem 0; background:#dbeafe; border-radius:8px; cursor:pointer;">
        ✏️ Sửa thông tin cá nhân
    </li>
    <li data-action="password" style="padding:0.75rem; margin:0.5rem 0; background:#dcfce7; border-radius:8px; cursor:pointer;">
        🔒 Đổi mật khẩu
    </li>
    <li data-action="avatar" style="padding:0.75rem; margin:0.5rem 0; background:#fef3c7; border-radius:8px; cursor:pointer;">
        📷 Đổi ảnh đại diện
    </li>
    <li data-action="delete" style="padding:0.75rem; margin:0.5rem 0; background:#fee2e2; border-radius:8px; cursor:pointer;">
        🗑️ Xóa tài khoản
    </li>
</ul>
<div id="delegation-output" style="margin-top:1rem; padding:1rem; background:#f1f5f9; border-radius:8px;"></div>
```

```javascript
// ===== BÀI 10: EVENT DELEGATION =====
// Thay vì gắn listener cho TỪNG <li>, ta gắn 1 listener cho <ul>

const list = document.getElementById('delegation-list');
const delegationOutput = document.getElementById('delegation-output');

list.addEventListener('click', (e) => {
    // e.target = phần tử được click trực tiếp
    // closest('li') = tìm phần tử <li> gần nhất (kể từ e.target)

    const li = e.target.closest('li');
    if (!li) return; // Click vào vùng trống → bỏ qua

    const action = li.dataset.action;

    const messages = {
        edit:     '✏️ Bạn chọn: Sửa thông tin cá nhân',
        password: '🔒 Bạn chọn: Đổi mật khẩu',
        avatar:   '📷 Bạn chọn: Đổi ảnh đại diện',
        delete:   '🗑️ Bạn chọn: Xóa tài khoản'
    };

    delegationOutput.innerHTML = `<strong>${messages[action] || 'Không xác định'}</strong>`;

    // Highlight mục được chọn
    list.querySelectorAll('li').forEach(item => {
        item.style.outline = 'none';
    });
    li.style.outline = '3px solid #3b82f6';
});
```

**Tại sao dùng Event Delegation?**
```javascript
// ❌ Cách cũ — gắn listener cho từng phần tử (kém hiệu quả)
document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', handleClick);
});
// Nếu thêm <li> mới → PHẢI gắn lại listener!

// ✅ Delegation — gắn 1 listener cho parent (hiệu quả)
parent.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) handleClick(li);
});
// <li> mới thêm vào cũng tự động hoạt động!
```

---

## ✅ Checklist tổng hợp

### Click Events
- [ ] `addEventListener('click', callback)` — lắng nghe click
- [ ] Thay đổi style/content khi click
- [ ] Bộ đếm tăng/giảm/reset

### Input Events
- [ ] `addEventListener('input', callback)` — realtime khi gõ
- [ ] `e.target.value` — lấy giá trị input
- [ ] Đếm ký tự, tìm kiếm realtime

### Keyboard Events
- [ ] `addEventListener('keydown', callback)` — nhấn phím
- [ ] `e.key` — tên phím (Enter, Escape, Space...)
- [ ] Phím tắt, tag input

### Form Events
- [ ] `addEventListener('submit', callback)` — submit form
- [ ] `e.preventDefault()` — ngăn reload trang
- [ ] Validate trước khi submit

### Event Delegation
- [ ] Gắn listener cho parent thay vì từng child
- [ ] `e.target.closest('selector')` — tìm phần tử gần nhất
- [ ] `dataset.action` — đọc data attribute

---

## 📚 Kiến thức cần nhớ

| Event | Khi nào触发 | Dùng cho |
|-------|-------------|---------|
| `click` | Click chuột | Nút bấm, link, card |
| `input` | Mỗi ký tự nhập | Tìm kiếm realtime, đếm ký tự |
| `change` | Khi blur/commit | Select, checkbox, date picker |
| `keydown` | Nhấn phím | Phím tắt, Enter để submit |
| `submit` | Submit form | Validate, gửi dữ liệu |
| `mouseover` | Di chuột vào | Tooltip, hover effect |
| `scroll` | Cuộn trang | Sticky header, lazy load |

---

**← [Bài trước: DOM Basics](00b_dom_basics.md) | [Bài tiếp theo: DOM Mini Projects →](00d_dom_mini_projects.md)**
