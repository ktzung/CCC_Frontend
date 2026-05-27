# Tier 7 — Mini Projects (Dự án nhỏ tổng hợp)

> **Thời gian:** 60-90 phút mỗi dự án  
> **Yêu cầu:** Hoàn thành Tier 1-6  
> **Mục tiêu:** Áp dụng tất cả kiến thức vào dự án thực tế

---

## 🎯 Dự án 1: Máy tính đơn giản (Calculator)

### Mô tả
Tạo máy tính cơ bản với giao diện đẹp, hỗ trợ +, -, ×, ÷

### Yêu cầu
- [ ] Giao diện có các nút số (0-9) và phép tính
- [ ] Hiển thị phép tính đang nhập
- [ ] Thực hiện phép tính khi nhấn =
- [ ] Nút C để xóa tất cả
- [ ] Nút ← để xóa số cuối

### HTML cơ bản
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Máy tính</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            background: #f0f0f0; 
            font-family: Arial, sans-serif;
        }
        .calculator {
            background: #333;
            border-radius: 10px;
            padding: 20px;
            width: 300px;
        }
        .display {
            background: #222;
            color: white;
            font-size: 32px;
            padding: 20px;
            text-align: right;
            border-radius: 5px;
            margin-bottom: 15px;
            min-height: 80px;
            word-wrap: break-word;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            padding: 15px;
            font-size: 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background: #555;
            color: white;
            transition: background 0.2s;
        }
        button:hover { background: #777; }
        button.operator { background: #ff9500; }
        button.operator:hover { background: #ffb347; }
        button.clear { background: #ff3b30; }
        button.clear:hover { background: #ff6b6b; }
        button.equals { background: #34c759; }
        button.equals:hover { background: #5dd87a; }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button class="clear" onclick="clearAll()">C</button>
            <button onclick="backspace()">←</button>
            <button class="operator" onclick="inputOperator('/')">÷</button>
            <button class="operator" onclick="inputOperator('*')">×</button>
            
            <button onclick="inputNumber('7')">7</button>
            <button onclick="inputNumber('8')">8</button>
            <button onclick="inputNumber('9')">9</button>
            <button class="operator" onclick="inputOperator('-')">-</button>
            
            <button onclick="inputNumber('4')">4</button>
            <button onclick="inputNumber('5')">5</button>
            <button onclick="inputNumber('6')">6</button>
            <button class="operator" onclick="inputOperator('+')">+</button>
            
            <button onclick="inputNumber('1')">1</button>
            <button onclick="inputNumber('2')">2</button>
            <button onclick="inputNumber('3')">3</button>
            <button class="equals" onclick="calculate()">=</button>
            
            <button onclick="inputNumber('0')">0</button>
            <button onclick="inputNumber('00')">00</button>
            <button onclick="inputDot()">.</button>
            <button onclick="inputPercent()">%</button>
        </div>
    </div>
    
    <script>
        let currentInput = "0";
        let previousInput = "";
        let operator = null;
        let shouldResetScreen = false;
        
        let display = document.getElementById("display");
        
        function updateDisplay() {
            display.textContent = currentInput;
        }
        
        function inputNumber(num) {
            if (shouldResetScreen) {
                currentInput = "";
                shouldResetScreen = false;
            }
            
            if (currentInput === "0" && num !== "00") {
                currentInput = num;
            } else {
                currentInput += num;
            }
            
            updateDisplay();
        }
        
        function inputDot() {
            if (shouldResetScreen) {
                currentInput = "0";
                shouldResetScreen = false;
            }
            
            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
            
            updateDisplay();
        }
        
        function inputOperator(op) {
            if (operator && !shouldResetScreen) {
                calculate();
            }
            
            previousInput = currentInput;
            operator = op;
            shouldResetScreen = true;
        }
        
        function calculate() {
            if (!operator || shouldResetScreen) return;
            
            let prev = parseFloat(previousInput);
            let current = parseFloat(currentInput);
            let result;
            
            switch (operator) {
                case "+": result = prev + current; break;
                case "-": result = prev - current; break;
                case "*": result = prev * current; break;
                case "/": 
                    if (current === 0) {
                        alert("Không thể chia cho 0!");
                        clearAll();
                        return;
                    }
                    result = prev / current; 
                    break;
            }
            
            currentInput = result.toString();
            operator = null;
            previousInput = "";
            shouldResetScreen = true;
            
            updateDisplay();
        }
        
        function clearAll() {
            currentInput = "0";
            previousInput = "";
            operator = null;
            shouldResetScreen = false;
            updateDisplay();
        }
        
        function backspace() {
            if (currentInput.length === 1) {
                currentInput = "0";
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            updateDisplay();
        }
        
        function inputPercent() {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
        
        // Keyboard support
        document.addEventListener("keydown", function(event) {
            if (event.key >= "0" && event.key <= "9") inputNumber(event.key);
            else if (event.key === ".") inputDot();
            else if (event.key === "+") inputOperator("+");
            else if (event.key === "-") inputOperator("-");
            else if (event.key === "*") inputOperator("*");
            else if (event.key === "/") { event.preventDefault(); inputOperator("/"); }
            else if (event.key === "Enter" || event.key === "=") calculate();
            else if (event.key === "Escape") clearAll();
            else if (event.key === "Backspace") backspace();
        });
    </script>
</body>
</html>
```

---

## 🎯 Dự án 2: Bộ đếm thời gian (Countdown Timer)

### Mô tả
Tạo bộ đếm thời gian ngược với giao diện đẹp

### Yêu cầu
- [ ] Nhập số phút/giây để đếm ngược
- [ ] Hiển thị thời gian còn lại dạng MM:SS
- [ ] Nút Start/Pause/Reset
- [ ] Âm thanh cảnh báo khi hết giờ
- [ ] Thay đổi màu khi gần hết giờ

### Code
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Bộ đếm thời gian</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #1a1a2e;
            color: white;
            font-family: Arial, sans-serif;
        }
        .timer {
            font-size: 120px;
            font-weight: bold;
            font-family: monospace;
            text-shadow: 0 0 20px rgba(0,255,0,0.5);
            transition: color 0.3s;
        }
        .timer.warning { color: #ffcc00; text-shadow: 0 0 20px rgba(255,204,0,0.5); }
        .timer.danger { color: #ff4444; text-shadow: 0 0 20px rgba(255,0,0,0.5); }
        
        .controls {
            margin: 30px 0;
            display: flex;
            gap: 15px;
        }
        button {
            padding: 15px 30px;
            font-size: 18px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover { transform: scale(1.05); }
        .btn-start { background: #34c759; color: white; }
        .btn-pause { background: #ffcc00; color: #333; }
        .btn-reset { background: #ff3b30; color: white; }
        
        .input-group {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-bottom: 30px;
        }
        input {
            width: 80px;
            padding: 10px;
            font-size: 24px;
            text-align: center;
            border-radius: 10px;
            border: 2px solid #444;
            background: #16213e;
            color: white;
        }
    </style>
</head>
<body>
    <h1>⏰ Bộ đếm thời gian</h1>
    
    <div class="input-group">
        <input type="number" id="input-minutes" value="5" min="0" max="99"> <span>phút</span>
        <input type="number" id="input-seconds" value="0" min="0" max="59"> <span>giây</span>
    </div>
    
    <div class="timer" id="timer">05:00</div>
    
    <div class="controls">
        <button class="btn-start" id="btn-start">▶ Start</button>
        <button class="btn-pause" id="btn-pause" style="display:none">⏸ Pause</button>
        <button class="btn-reset" id="btn-reset">↺ Reset</button>
    </div>
    
    <script>
        let timerDisplay = document.getElementById("timer");
        let btnStart = document.getElementById("btn-start");
        let btnPause = document.getElementById("btn-pause");
        let btnReset = document.getElementById("btn-reset");
        let inputMinutes = document.getElementById("input-minutes");
        let inputSeconds = document.getElementById("input-seconds");
        
        let totalSeconds = 0;
        let intervalId = null;
        let isRunning = false;
        
        function updateDisplay() {
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            timerDisplay.textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            // Đổi màu cảnh báo
            timerDisplay.className = "timer";
            if (totalSeconds <= 10 && totalSeconds > 0) {
                timerDisplay.classList.add("danger");
            } else if (totalSeconds <= 30) {
                timerDisplay.classList.add("warning");
            }
        }
        
        function startTimer() {
            if (isRunning) return;
            
            if (totalSeconds === 0) {
                let mins = parseInt(inputMinutes.value) || 0;
                let secs = parseInt(inputSeconds.value) || 0;
                totalSeconds = mins * 60 + secs;
                
                if (totalSeconds === 0) {
                    alert("Vui lòng nhập thời gian!");
                    return;
                }
            }
            
            isRunning = true;
            btnStart.style.display = "none";
            btnPause.style.display = "inline-block";
            
            intervalId = setInterval(function() {
                totalSeconds--;
                updateDisplay();
                
                if (totalSeconds <= 0) {
                    clearInterval(intervalId);
                    isRunning = false;
                    btnStart.style.display = "inline-block";
                    btnPause.style.display = "none";
                    alert("⏰ Hết giờ!");
                }
            }, 1000);
        }
        
        function pauseTimer() {
            clearInterval(intervalId);
            isRunning = false;
            btnStart.style.display = "inline-block";
            btnPause.style.display = "none";
        }
        
        function resetTimer() {
            clearInterval(intervalId);
            isRunning = false;
            totalSeconds = 0;
            btnStart.style.display = "inline-block";
            btnPause.style.display = "none";
            timerDisplay.textContent = "00:00";
            timerDisplay.className = "timer";
            inputMinutes.value = 5;
            inputSeconds.value = 0;
        }
        
        btnStart.addEventListener("click", startTimer);
        btnPause.addEventListener("click", pauseTimer);
        btnReset.addEventListener("click", resetTimer);
        
        // Keyboard
        document.addEventListener("keydown", function(e) {
            if (e.key === " ") { e.preventDefault(); isRunning ? pauseTimer() : startTimer(); }
            if (e.key === "Escape") resetTimer();
        });
    </script>
</body>
</html>
```

---

## 🎯 Dự án 3: Ứng dụng ghi chú đơn giản (Notes App)

### Mô tả
Tạo ứng dụng ghi chú với lưu trữ localStorage

### Yêu cầu
- [ ] Thêm ghi chú mới
- [ ] Hiển thị danh sách ghi chú
- [ ] Sửa ghi chú
- [ ] Xóa ghi chú
- [ ] Lưu vào localStorage

### Code
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Ghi chú</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; }
        .input-area { margin: 20px 0; }
        textarea { width: 100%; height: 100px; padding: 10px; border-radius: 5px; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; border: none; border-radius: 5px; }
        .btn-add { background: #3498db; color: white; }
        .btn-delete { background: #e74c3c; color: white; float: right; }
        .btn-edit { background: #f39c12; color: white; float: right; }
        .note { 
            background: #f9f9f9; 
            border-left: 4px solid #3498db; 
            padding: 15px; 
            margin: 10px 0; 
        }
        .note-date { font-size: 12px; color: #999; }
        .note-content { margin: 10px 0; }
        .search { width: 100%; padding: 10px; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>📝 Ghi chú của tôi</h1>
    
    <input type="text" class="search" id="search" placeholder="🔍 Tìm kiếm ghi chú...">
    
    <div class="input-area">
        <textarea id="note-input" placeholder="Nhập ghi chú mới..."></textarea>
        <button class="btn-add" id="btn-add">➕ Thêm ghi chú</button>
    </div>
    
    <div id="notes-list"></div>
    
    <script>
        let noteInput = document.getElementById("note-input");
        let btnAdd = document.getElementById("btn-add");
        let notesList = document.getElementById("notes-list");
        let searchInput = document.getElementById("search");
        
        // Load từ localStorage
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        
        function saveNotes() {
            localStorage.setItem("notes", JSON.stringify(notes));
        }
        
        function formatDate(dateString) {
            let d = new Date(dateString);
            return d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN");
        }
        
        function renderNotes(filter = "") {
            notesList.innerHTML = "";
            
            let filteredNotes = notes.filter(note => 
                note.content.toLowerCase().includes(filter.toLowerCase())
            );
            
            if (filteredNotes.length === 0) {
                notesList.innerHTML = "<p style='text-align:center;color:#999'>Chưa có ghi chú nào</p>";
                return;
            }
            
            filteredNotes.forEach((note, index) => {
                let div = document.createElement("div");
                div.className = "note";
                div.innerHTML = `
                    <div class="note-date">${formatDate(note.createdAt)}</div>
                    <div class="note-content">${note.content}</div>
                    <button class="btn-delete" data-index="${index}">🗑 Xóa</button>
                    <button class="btn-edit" data-index="${index}">✏️ Sửa</button>
                `;
                notesList.appendChild(div);
            });
        }
        
        // Thêm ghi chú
        btnAdd.addEventListener("click", function() {
            let content = noteInput.value.trim();
            if (content === "") {
                alert("Vui lòng nhập nội dung!");
                return;
            }
            
            notes.unshift({
                content: content,
                createdAt: new Date().toISOString()
            });
            
            saveNotes();
            renderNotes();
            noteInput.value = "";
            noteInput.focus();
        });
        
        // Xử lý xóa/sửa (Event Delegation)
        notesList.addEventListener("click", function(e) {
            if (e.target.classList.contains("btn-delete")) {
                let index = parseInt(e.target.dataset.index);
                if (confirm("Xóa ghi chú này?")) {
                    notes.splice(index, 1);
                    saveNotes();
                    renderNotes(searchInput.value);
                }
            }
            
            if (e.target.classList.contains("btn-edit")) {
                let index = parseInt(e.target.dataset.index);
                let newContent = prompt("Sửa ghi chú:", notes[index].content);
                if (newContent !== null && newContent.trim() !== "") {
                    notes[index].content = newContent.trim();
                    saveNotes();
                    renderNotes(searchInput.value);
                }
            }
        });
        
        // Tìm kiếm
        searchInput.addEventListener("input", function() {
            renderNotes(searchInput.value);
        });
        
        // Khởi tạo
        renderNotes();
    </script>
</body>
</html>
```

---

## 🎯 Dự án 4: Quiz đơn giản (Simple Quiz)

### Mô tả
Tạo bài trắc nghiệm với điểm số

### Yêu cầu
- [ ] Hiển thị câu hỏi và đáp án
- [ ] Chọn đáp án và kiểm tra đúng/sai
- [ ] Tính điểm
- [ ] Hiện kết quả cuối cùng

### Code
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Quiz JavaScript</title>
    <style>
        body { font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px; }
        .quiz-box { background: #f9f9f9; padding: 20px; border-radius: 10px; }
        .question { font-size: 20px; margin: 20px 0; }
        .options { display: flex; flex-direction: column; gap: 10px; }
        .option {
            padding: 15px;
            background: white;
            border: 2px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .option:hover { border-color: #3498db; background: #ecf0f1; }
        .option.correct { background: #d4edda; border-color: #28a745; }
        .option.wrong { background: #f8d7da; border-color: #dc3545; }
        .progress { margin-bottom: 20px; }
        .score { font-size: 48px; text-align: center; color: #2c3e50; }
    </style>
</head>
<body>
    <h1>🧠 Quiz JavaScript</h1>
    
    <div class="quiz-box" id="quiz-box">
        <div class="progress" id="progress"></div>
        <div class="question" id="question"></div>
        <div class="options" id="options"></div>
    </div>
    
    <div id="result" style="display:none">
        <h2>Kết quả</h2>
        <div class="score" id="score"></div>
        <p id="message"></p>
        <button onclick="location.reload()">Làm lại</button>
    </div>
    
    <script>
        const quizData = [
            {
                question: "JavaScript dùng để làm gì?",
                options: ["Trang trí web", "Lập trình web", "Tạo cơ sở dữ liệu", "Thiết kế đồ họa"],
                correct: 1
            },
            {
                question: "Cách khai báo biến trong ES6?",
                options: ["var", "let và const", "dim", "int"],
                correct: 1
            },
            {
                question: "typeof 'hello' trả về gì?",
                options: ["string", "String", "text", "char"],
                correct: 0
            },
            {
                question: "DOM là viết tắt của?",
                options: [
                    "Document Object Model", 
                    "Data Object Method", 
                    "Digital Ordinance Map",
                    "Document Oriented MongoDB"
                ],
                correct: 0
            },
            {
                question: "Cách chọn phần tử theo ID?",
                options: [
                    "document.querySelector()", 
                    "document.getElementById()", 
                    "document.findElement()", 
                    "document.getId()"
                ],
                correct: 1
            }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        
        function showQuestion() {
            let q = quizData[currentQuestion];
            document.getElementById("progress").textContent = 
                `Câu ${currentQuestion + 1}/${quizData.length}`;
            document.getElementById("question").textContent = q.question;
            
            let optionsHtml = "";
            q.options.forEach((opt, i) => {
                optionsHtml += `<div class="option" data-index="${i}">${opt}</div>`;
            });
            document.getElementById("options").innerHTML = optionsHtml;
            answered = false;
        }
        
        document.getElementById("options").addEventListener("click", function(e) {
            if (answered || !e.target.classList.contains("option")) return;
            answered = true;
            
            let selectedIndex = parseInt(e.target.dataset.index);
            let correctIndex = quizData[currentQuestion].correct;
            
            // Highlight answers
            document.querySelectorAll(".option").forEach((opt, i) => {
                if (i === correctIndex) opt.classList.add("correct");
                if (i === selectedIndex && i !== correctIndex) opt.classList.add("wrong");
            });
            
            if (selectedIndex === correctIndex) score++;
            
            // Next question after delay
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }, 1500);
        });
        
        function showResult() {
            document.getElementById("quiz-box").style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("score").textContent = `${score}/${quizData.length}`;
            
            let percent = (score / quizData.length) * 100;
            let msg = percent >= 80 ? "Xuất sắc! 🎉" : 
                      percent >= 60 ? "Khá tốt! 👍" : 
                      "Cần cố gắng thêm! 💪";
            document.getElementById("message").textContent = msg;
        }
        
        showQuestion();
    </script>
</body>
</html>
```

---

## 📊 Bảng tiến trình dự án

| Dự án | Độ khó | Kiến thức sử dụng | Thời gian |
|-------|--------|-------------------|-----------|
| Calculator | ⭐⭐ | Variables, Functions, Events, DOM | 60 phút |
| Countdown Timer | ⭐⭐ | setInterval, Events, DOM manipulation | 60 phút |
| Notes App | ⭐⭐⭐ | Arrays, localStorage, DOM, Events | 90 phút |
| Quiz App | ⭐⭐⭐ | Arrays, Objects, DOM, Events, Logic | 90 phút |

---

## ✅ Checklist tổng hợp

Sau khi hoàn thành tất cả 7 Tiers, bạn sẽ:

- [ ] Hiểu JavaScript cơ bản (biến, kiểu dữ liệu, toán tử)
- [ ] Viết được câu lệnh điều kiện và vòng lặp
- [ ] Tạo và sử dụng hàm (function, arrow function)
- [ ] Làm việc với Arrays và Objects
- [ ] Manipulation DOM (tìm, sửa, tạo, xóa phần tử)
- [ ] Xử lý Events (click, input, keyboard, form)
- [ ] Xây dựng được ứng dụng hoàn chỉnh

---

**← Quay lại: [Tier 6 — Events](TIER_6_events_basics.md)**

**🎓 Chúc mừng bạn đã hoàn thành khóa học JavaScript cơ bản!**
