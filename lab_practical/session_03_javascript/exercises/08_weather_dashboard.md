# Exercise 3.8 — Weather Dashboard (Bảng thời tiết)

## 🎬 Opening Scenario

*Xây dựng dashboard thời tiết mini: nhập tên thành phố → hiển thị thời tiết hiện tại + dự báo 5 ngày. Sử dụng OpenWeatherMap API miễn phí, hiển thị dữ liệu bằng card và mini-chart.*

---

## 🎯 Mục tiêu học tập

- Gọi **REST API** với tham số động (tên thành phố)
- Xử lý **nested JSON response** phức tạp
- Hiển thị dữ liệu dạng **dashboard cards**
- Luyện tập **Date object** và format ngày tháng
- Áp dụng **CSS Grid** cho dashboard layout

---

## 📋 Yêu cầu chi tiết

### Tính năng bắt buộc

| # | Tính năng | Mô tả chi tiết |
|---|-----------|----------------|
| 1 | **Tìm theo thành phố** | Nhập tên thành phố → Enter → fetch API → hiển thị kết quả |
| 2 | **Thời tiết hiện tại** | Card chính: nhiệt độ, icon thời tiết, mô tả, độ ẩm, gió, áp suất |
| 3 | **Dự báo 5 ngày** | 5 card nhỏ: ngày, icon, nhiệt độ cao/thấp |
| 4 | **Loading & Error** | Spinner khi fetch, error message khi API fail |
| 5 | **Lịch sử tìm kiếm** | Lưu 5 thành phố gần nhất vào localStorage, click để tìm lại |
| 6 | **Đơn vị nhiệt độ** | Toggle °C ↔ °F, lưu preference vào localStorage |
| 7 | **Background động** | Đổi màu background theo thời tiết (nắng→vàng, mưa→xám, đêm→tím) |
| 8 | **Geolocation** | Nút "Vị trí hiện tại" → dùng `navigator.geolocation` → tự động fetch |

---

## 🔑 OpenWeatherMap API Setup

### Đăng ký API Key (miễn phí)

1. Truy cập: https://openweathermap.org/api
2. Đăng ký tài khoản → chọn **Current Weather Data** (Free)
3. Nhận API key trong email/API keys tab
4. Thay `YOUR_API_KEY` trong code

### API Endpoints

```
# Thời tiết hiện tại theo tên thành phố
GET https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=YOUR_API_KEY&units=metric&lang=vi

# Thời tiết hiện tại theo tọa độ
GET https://api.openweathermap.org/data/2.5/weather?lat=21.03&lon=105.85&appid=YOUR_API_KEY&units=metric

# Dự báo 5 ngày (mỗi 3 giờ)
GET https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=YOUR_API_KEY&units=metric&lang=vi
```

### Response mẫu (Current Weather)

```json
{
    "name": "Hanoi",
    "main": {
        "temp": 32.5,
        "feels_like": 36.2,
        "humidity": 78,
        "pressure": 1008
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "mây rải rác",
            "icon": "02d"
        }
    ],
    "wind": {
        "speed": 3.6
    },
    "dt": 1716182400,
    "sys": {
        "sunrise": 1716156000,
        "sunset": 1716202800
    }
}
```

### Icon URL

```
https://openweathermap.org/img/wn/{icon}@2x.png
// VD: https://openweathermap.org/img/wn/02d@2x.png
```

---

## 🏗️ HTML Structure

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌤️ Weather Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="dashboard">
        <!-- Header -->
        <header class="header">
            <h1>🌤️ Weather Dashboard</h1>
            <div class="header-actions">
                <button id="unit-toggle" class="unit-btn">°C</button>
                <button id="geo-btn" class="geo-btn" title="Vị trí hiện tại">📍</button>
            </div>
        </header>

        <!-- Search -->
        <div class="search-bar">
            <input
                type="text"
                id="city-input"
                placeholder="Nhập tên thành phố... (VD: Hanoi, Tokyo)"
            >
            <button id="search-btn">🔍</button>
        </div>

        <!-- Search History -->
        <div id="search-history" class="search-history" hidden>
            <span class="history-label">Gần đây:</span>
            <div id="history-tags" class="history-tags"></div>
        </div>

        <!-- Loading -->
        <div id="loading" class="loading" hidden>
            <div class="spinner"></div>
            <p>Đang tải dữ liệu thời tiết...</p>
        </div>

        <!-- Error -->
        <div id="error-message" class="error-message" hidden></div>

        <!-- Main Weather Card -->
        <div id="current-weather" class="current-weather" hidden>
            <div class="weather-main">
                <div class="weather-icon-wrapper">
                    <img id="weather-icon" src="" alt="Weather icon">
                    <span id="weather-description" class="weather-description"></span>
                </div>
                <div class="weather-temp">
                    <span id="current-temp" class="temp-value"></span>
                    <span id="feels-like" class="feels-like"></span>
                </div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <span class="detail-icon">💧</span>
                    <span class="detail-label">Độ ẩm</span>
                    <span id="humidity" class="detail-value"></span>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🌬️</span>
                    <span class="detail-label">Gió</span>
                    <span id="wind" class="detail-value"></span>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🌡️</span>
                    <span class="detail-label">Áp suất</span>
                    <span id="pressure" class="detail-value"></span>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🌅</span>
                    <span class="detail-label">Bình minh</span>
                    <span id="sunrise" class="detail-value"></span>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🌇</span>
                    <span class="detail-label">Hoàng hôn</span>
                    <span id="sunset" class="detail-value"></span>
                </div>
            </div>
            <div class="city-name">
                <h2 id="city-title"></h2>
                <span id="current-date"></span>
            </div>
        </div>

        <!-- Forecast -->
        <div id="forecast-section" class="forecast-section" hidden>
            <h3>Dự báo 5 ngày</h3>
            <div id="forecast-grid" class="forecast-grid">
                <!-- Forecast cards rendered by JS -->
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 💻 JavaScript Implementation (app.js)

### Config & State

```javascript
// ===== CONFIG =====
const API_KEY = 'YOUR_API_KEY';  // Thay bằng key của bạn
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ===== STATE =====
let unit = localStorage.getItem('tempUnit') || 'metric'; // 'metric' = °C, 'imperial' = °F
let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

// ===== DOM ELEMENTS =====
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const unitToggle = document.getElementById('unit-toggle');
const geoBtn = document.getElementById('geo-btn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const currentWeather = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast-section');
const searchHistoryEl = document.getElementById('search-history');
const historyTags = document.getElementById('history-tags');
```

### Fetch Weather Data

```javascript
async function fetchWeather(query) {
    // query có thể là tên thành phố hoặc {lat, lon}
    showLoading(true);
    hideError();

    try {
        let weatherUrl, forecastUrl;

        if (typeof query === 'string') {
            // Tìm theo tên thành phố
            weatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=${unit}&lang=vi`;
            forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=${unit}&lang=vi`;
        } else {
            // Tìm theo tọa độ
            weatherUrl = `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=${unit}&lang=vi`;
            forecastUrl = `${BASE_URL}/forecast?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=${unit}&lang=vi`;
        }

        const [weatherRes, forecastRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherRes.ok) {
            throw new Error(weatherRes.status === 404
                ? 'Không tìm thấy thành phố. Vui lòng kiểm tra lại!'
                : 'Lỗi kết nối API. Thử lại sau!'
            );
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        // Render
        renderCurrentWeather(weatherData);
        renderForecast(forecastData);
        addToHistory(weatherData.name);

    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}
```

### Render Current Weather

```javascript
function renderCurrentWeather(data) {
    currentWeather.hidden = false;

    // City name & date
    document.getElementById('city-title').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Main weather
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = data.weather[0].description;
    document.getElementById('weather-description').textContent = data.weather[0].description;

    // Temperature
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}${tempUnit}`;
    document.getElementById('feels-like').textContent = `Cảm giác như ${Math.round(data.main.feels_like)}${tempUnit}`;

    // Details
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset, data.timezone);

    // Dynamic background
    setWeatherBackground(data.weather[0].id, data.weather[0].icon);
}
```

### Render Forecast

```javascript
function renderForecast(data) {
    forecastSection.hidden = false;
    const forecastGrid = document.getElementById('forecast-grid');

    // Lấy 1 forecast mỗi ngày (12:00 PM)
    const dailyForecasts = data.list
        .filter(item => item.dt_txt.includes('12:00:00'))
        .slice(0, 5);

    const tempUnit = unit === 'metric' ? '°C' : '°F';

    forecastGrid.innerHTML = dailyForecasts.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('vi-VN', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

        return `
            <div class="forecast-card">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-date">${dateStr}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
                     alt="${day.weather[0].description}"
                     class="forecast-icon">
                <div class="forecast-temp">
                    <span class="temp-high">${Math.round(day.main.temp_max)}°</span>
                    <span class="temp-low">${Math.round(day.main.temp_min)}°</span>
                </div>
                <div class="forecast-desc">${day.weather[0].description}</div>
            </div>
        `;
    }).join('');
}
```

### Helper Functions

```javascript
function formatTime(timestamp, timezoneOffset) {
    // Convert UTC timestamp + timezone offset → local time
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
}

function setWeatherBackground(weatherId, icon) {
    const body = document.body;
    const isNight = icon.includes('n');

    if (isNight) {
        body.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
    } else if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        body.style.background = 'linear-gradient(135deg, #2c3e50, #4ca1af)';
    } else if (weatherId >= 300 && weatherId < 600) {
        // Rain/Drizzle
        body.style.background = 'linear-gradient(135deg, #616161, #9bc5c3)';
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        body.style.background = 'linear-gradient(135deg, #e6dada, #274046)';
    } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere (fog, mist)
        body.style.background = 'linear-gradient(135deg, #757f9a, #d7dde8)';
    } else if (weatherId === 800) {
        // Clear
        body.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
    } else {
        // Clouds
        body.style.background = 'linear-gradient(135deg, #89f7fe, #66a6ff)';
    }
}
```

### Search History

```javascript
function addToHistory(cityName) {
    // Remove duplicates & keep max 5
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== cityName.toLowerCase());
    searchHistory.unshift(cityName);
    searchHistory = searchHistory.slice(0, 5);

    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    renderHistory();
}

function renderHistory() {
    if (searchHistory.length === 0) {
        searchHistoryEl.hidden = true;
        return;
    }

    searchHistoryEl.hidden = false;
    historyTags.innerHTML = searchHistory.map(city =>
        `<button class="history-tag" data-city="${city}">${city}</button>`
    ).join('');
}
```

### UI Helpers

```javascript
function showLoading(show) {
    loading.hidden = !show;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
}

function hideError() {
    errorMessage.hidden = true;
}
```

### Geolocation

```javascript
function getGeolocation() {
    if (!navigator.geolocation) {
        showError('Trình duyệt không hỗ trợ Geolocation');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            fetchWeather({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        },
        (error) => {
            showError('Không thể lấy vị trí. Vui lòng cho phép truy cập vị trí!');
            console.error('Geolocation error:', error);
        }
    );
}
```

### Unit Toggle

```javascript
function toggleUnit() {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('tempUnit', unit);
    unitToggle.textContent = unit === 'metric' ? '°C' : '°F';

    // Re-fetch if there's current data
    const cityTitle = document.getElementById('city-title');
    if (cityTitle.textContent) {
        const cityName = cityTitle.textContent.split(',')[0];
        fetchWeather(cityName);
    }
}
```

### Event Listeners

```javascript
// Search
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});

// History tags (event delegation)
historyTags.addEventListener('click', (e) => {
    const tag = e.target.closest('.history-tag');
    if (tag) {
        cityInput.value = tag.dataset.city;
        fetchWeather(tag.dataset.city);
    }
});

// Unit toggle
unitToggle.addEventListener('click', toggleUnit);

// Geolocation
geoBtn.addEventListener('click', getGeolocation);

// Init
unitToggle.textContent = unit === 'metric' ? '°C' : '°F';
renderHistory();
```

---

## 🎨 CSS Styling

```css
/* ========== BASE ========== */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #89f7fe, #66a6ff);
    min-height: 100vh;
    transition: background 0.5s ease;
    color: #1e293b;
}

.dashboard {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
}

/* ========== HEADER ========== */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.header h1 { font-size: 1.5rem; }

.header-actions { display: flex; gap: 0.5rem; }

.unit-btn, .geo-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
}

.unit-btn:hover, .geo-btn:hover { background: rgba(255,255,255,0.5); }

/* ========== SEARCH ========== */
.search-bar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.search-bar input {
    flex: 1;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 12px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    font-size: 1rem;
    outline: none;
}

.search-bar button {
    padding: 0.75rem 1.5rem;
    border: none;
    background: rgba(255,255,255,0.9);
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background 0.2s;
}

.search-bar button:hover { background: white; }

/* ========== HISTORY ========== */
.search-history {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.history-label { font-size: 0.85rem; opacity: 0.8; }

.history-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.history-tag {
    padding: 0.3rem 0.8rem;
    border: none;
    background: rgba(255,255,255,0.4);
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.2s;
}

.history-tag:hover { background: rgba(255,255,255,0.7); }

/* ========== CURRENT WEATHER ========== */
.current-weather {
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255,255,255,0.3);
}

.weather-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.weather-icon-wrapper { text-align: center; }

.weather-icon-wrapper img { width: 100px; height: 100px; }

.weather-description {
    display: block;
    text-transform: capitalize;
    font-size: 0.95rem;
    opacity: 0.9;
}

.weather-temp { text-align: center; }

.temp-value {
    font-size: 4rem;
    font-weight: 700;
    display: block;
    line-height: 1;
}

.feels-like {
    font-size: 0.95rem;
    opacity: 0.8;
}

.city-name {
    text-align: center;
    margin-top: 1rem;
}

.city-name h2 { font-size: 1.25rem; }

/* ========== DETAILS GRID ========== */
.weather-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
}

.detail-item {
    text-align: center;
    padding: 0.75rem;
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
}

.detail-icon { font-size: 1.5rem; display: block; margin-bottom: 0.25rem; }
.detail-label { font-size: 0.75rem; opacity: 0.7; display: block; }
.detail-value { font-size: 1rem; font-weight: 600; display: block; margin-top: 0.25rem; }

/* ========== FORECAST ========== */
.forecast-section {
    margin-bottom: 2rem;
}

.forecast-section h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.forecast-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.75rem;
}

.forecast-card {
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1rem 0.5rem;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.2);
    transition: transform 0.2s;
}

.forecast-card:hover { transform: translateY(-4px); }

.forecast-day { font-weight: 600; font-size: 0.9rem; }
.forecast-date { font-size: 0.75rem; opacity: 0.7; }
.forecast-icon { width: 50px; height: 50px; }

.forecast-temp { margin: 0.25rem 0; }
.temp-high { font-weight: 700; }
.temp-low { opacity: 0.6; margin-left: 0.5rem; }
.forecast-desc { font-size: 0.75rem; opacity: 0.8; text-transform: capitalize; }

/* ========== LOADING & ERROR ========== */
.loading { text-align: center; padding: 3rem; }

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255,255,255,0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error-message {
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    color: #991b1b;
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 1rem;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 640px) {
    .forecast-grid { grid-template-columns: repeat(3, 1fr); }
    .weather-main { flex-direction: column; gap: 1rem; }
    .temp-value { font-size: 3rem; }
}
```

---

## ✅ Success Criteria

### Bắt buộc

- [ ] Nhập thành phố → hiển thị thời tiết hiện tại
- [ ] Hiển thị dự báo 5 ngày
- [ ] Loading spinner khi fetch
- [ ] Error message khi API fail
- [ ] Search history (localStorage)
- [ ] Unit toggle °C ↔ °F
- [ ] Dynamic background theo thời tiết

### Nâng cao

- [ ] Geolocation (nút 📍)
- [ ] Responsive trên mobile
- [ ] Glassmorphism UI effect
- [ ] Animation cho forecast cards

---

## 🐛 Common Bugs & Debug Tips

| Bug | Nguyên nhân | Cách sửa |
|-----|------------|----------|
| API key lỗi 401 | Key chưa active (cần chờ vài phút) | Chờ 10 phút sau khi đăng ký |
| Không tìm thấy thành phố | Tên tiếng Việt không hỗ trợ | Dùng tên tiếng Anh: "Hanoi" thay vì "Hà Nội" |
| Icon không hiển thị | URL icon sai | Dùng `https://openweathermap.org/img/wn/{icon}@2x.png` |
| Nhiệt độ sai đơn vị | Quên `units=metric` | Thêm `&units=metric` vào URL |

---

## 📚 Knowledge Check

1. **`Promise.all()`** hoạt động thế nào? Tại sao dùng trong bài này?
2. `navigator.geolocation.getCurrentPosition()` cần user cho phép gì?
3. Cách format timestamp Unix thành giờ địa phương?
4. `backdrop-filter: blur()` làm gì?
5. Tại sao cần `encodeURIComponent()` khi build URL với tên thành phố?

---

**← [Quay lại Session 3](../README.md)**
