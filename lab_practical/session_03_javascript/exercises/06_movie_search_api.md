# Exercise 3.6 — Movie Search với OMDB API (Tìm kiếm phim)

## 🎬 Opening Scenario

*Bạn muốn xây dựng trang tìm kiếm phim giống IMDB mini. Sử dụng OMDB API miễn phí để fetch dữ liệu, hiển thị kết quả dưới dạng card grid, có phân trang và modal chi tiết.*

---

## 🎯 Mục tiêu học tập

- Gọi **REST API** với `fetch()` và xử lý Promise
- Hiểu **async/await** pattern
- Xử lý **loading state** và **error handling**
- Triển khai **infinite scroll** hoặc **pagination**
- Tạo **modal detail** với dynamic content

---

## 📋 Yêu cầu chi tiết

### Tính năng bắt buộc

| # | Tính năng | Mô tả chi tiết |
|---|-----------|----------------|
| 1 | **Tìm kiếm phim** | Nhập từ khóa → Enter hoặc click Search → gọi API → hiển thị kết quả |
| 2 | **Loading state** | Hiển thị spinner/skeleton khi đang fetch dữ liệu |
| 3 | **Error handling** | Hiển thị thông báo lỗi khi API fail, mạng yếu, hoặc không tìm thấy |
| 4 | **Movie Cards** | Mỗi phim hiển thị: poster, title, year, type (movie/series) |
| 5 | **Pagination** | Nút Previous/Next hoặc numbered pages, hiển thị "Page X of Y" |
| 6 | **Movie Detail Modal** | Click card → modal hiện: poster lớn, title, year, director, actors, plot, rating |
| 7 | **Debounce Search** | Tự động tìm sau khi ngừng gõ 500ms (không cần nút Search) |
| 8 | **Favorites** | Nút ❤️ để lưu phim yêu thích vào localStorage, tab "Favorites" để xem lại |

---

## 🔑 OMDB API Setup

### Đăng ký API Key (miễn phí)

1. Truy cập: http://www.omdbapi.com/apikey.aspx
2. Chọn **FREE** plan (1,000 requests/ngày)
3. Nhập email → nhận API key qua email
4. Thay `YOUR_API_KEY` trong code bên dưới

### API Endpoints

```
# Tìm kiếm theo từ khóa
GET http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=avengers&page=1

# Lấy chi tiết phim theo IMDB ID
GET http://www.omdbapi.com/?apikey=YOUR_API_KEY&i=tt0848228&plot=full
```

### Response mẫu

```json
// Search response
{
    "Search": [
        {
            "imdbID": "tt0848228",
            "Title": "The Avengers",
            "Year": "2012",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/..."
        }
    ],
    "totalResults": "42",
    "Response": "True"
}

// Detail response
{
    "Title": "The Avengers",
    "Year": "2012",
    "Rated": "PG-13",
    "Released": "04 May 2012",
    "Runtime": "143 min",
    "Genre": "Action, Adventure, Sci-Fi",
    "Director": "Joss Whedon",
    "Actors": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    "Plot": "Earth's mightiest heroes must come together...",
    "imdbRating": "8.0",
    "Poster": "https://m.media-amazon.com/images/..."
}
```

---

## 🏗️ HTML Structure

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎬 Movie Search</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app">
        <!-- Header -->
        <header class="app-header">
            <h1>🎬 Movie Search</h1>
            <p>Tìm kiếm phim yêu thích của bạn</p>
        </header>

        <!-- Search Box -->
        <div class="search-wrapper">
            <input
                type="text"
                id="search-input"
                class="search-input"
                placeholder="Nhập tên phim... (VD: Avengers, Spider-Man)"
            >
            <button id="search-btn" class="search-btn">🔍 Tìm kiếm</button>
        </div>

        <!-- Tabs: Search Results / Favorites -->
        <div class="tabs">
            <button class="tab-btn active" data-tab="search">🔍 Kết quả</button>
            <button class="tab-btn" data-tab="favorites">❤️ Yêu thích (<span id="fav-count">0</span>)</button>
        </div>

        <!-- Status Messages -->
        <div id="status-message" class="status-message" hidden></div>

        <!-- Loading Spinner -->
        <div id="loading" class="loading" hidden>
            <div class="spinner"></div>
            <p>Đang tìm kiếm...</p>
        </div>

        <!-- Movie Grid -->
        <div id="movie-grid" class="movie-grid">
            <!-- Cards rendered by JS -->
        </div>

        <!-- Pagination -->
        <div id="pagination" class="pagination" hidden>
            <button id="prev-page" class="page-btn">← Trang trước</button>
            <span id="page-info" class="page-info">Trang 1 / 1</span>
            <button id="next-page" class="page-btn">Trang sau →</button>
        </div>
    </div>

    <!-- Movie Detail Modal -->
    <div id="movie-modal" class="modal-overlay" hidden>
        <div class="modal-content">
            <button id="modal-close" class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-poster">
                    <img id="modal-poster-img" src="" alt="">
                </div>
                <div class="modal-info">
                    <h2 id="modal-title"></h2>
                    <div class="modal-meta">
                        <span id="modal-year" class="badge">📅 </span>
                        <span id="modal-runtime" class="badge">⏱️ </span>
                        <span id="modal-rated" class="badge">🔞 </span>
                        <span id="modal-rating" class="badge">⭐ </span>
                    </div>
                    <p id="modal-genre" class="modal-genre"></p>
                    <p id="modal-plot" class="modal-plot"></p>
                    <div class="modal-details">
                        <p><strong>Đạo diễn:</strong> <span id="modal-director"></span></p>
                        <p><strong>Diễn viên:</strong> <span id="modal-actors"></span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 🎨 CSS Styling

```css
/* ========== BASE ========== */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'Segoe UI', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    min-height: 100vh;
}

.app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

/* ========== HEADER ========== */
.app-header {
    text-align: center;
    padding: 2rem 0;
}

.app-header h1 {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #f59e0b, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* ========== SEARCH ========== */
.search-wrapper {
    display: flex;
    gap: 0.5rem;
    max-width: 600px;
    margin: 0 auto 2rem;
}

.search-input {
    flex: 1;
    padding: 0.75rem 1.25rem;
    border: 2px solid #334155;
    border-radius: 12px;
    background: #1e293b;
    color: #e2e8f0;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}

.search-input:focus { border-color: #f59e0b; }

.search-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    background: #f59e0b;
    color: #0f172a;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.search-btn:hover { background: #d97706; }

/* ========== TABS ========== */
.tabs {
    display: flex;
    gap: 0;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #334155;
}

.tab-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    font-size: 1rem;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s;
}

.tab-btn.active {
    color: #f59e0b;
    border-bottom-color: #f59e0b;
}

/* ========== MOVIE GRID ========== */
.movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
}

.movie-card {
    background: #1e293b;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
}

.movie-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(245, 158, 11, 0.2);
}

.movie-poster {
    width: 100%;
    height: 300px;
    object-fit: cover;
    background: #334155;
}

.movie-poster-placeholder {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #334155;
    font-size: 3rem;
}

.movie-info {
    padding: 0.75rem;
}

.movie-title {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.movie-year {
    color: #94a3b8;
    font-size: 0.85rem;
}

.movie-type {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    background: #334155;
    border-radius: 999px;
    font-size: 0.75rem;
    color: #f59e0b;
    margin-top: 0.25rem;
}

/* Favorite button */
.fav-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(0,0,0,0.6);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
}

.fav-btn:hover { background: rgba(0,0,0,0.8); transform: scale(1.1); }
.fav-btn.active { color: #ef4444; }

/* ========== LOADING ========== */
.loading {
    text-align: center;
    padding: 3rem;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #334155;
    border-top: 4px solid #f59e0b;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ========== STATUS ========== */
.status-message {
    text-align: center;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.status-message.error { background: #991b1b; color: #fecaca; }
.status-message.info { background: #1e3a5f; color: #bfdbfe; }

/* ========== PAGINATION ========== */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
}

.page-btn {
    padding: 0.5rem 1rem;
    border: 2px solid #334155;
    background: transparent;
    color: #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.page-btn:hover:not(:disabled) { border-color: #f59e0b; color: #f59e0b; }
.page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.page-info { color: #94a3b8; }

/* ========== MODAL ========== */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 1rem;
}

.modal-content {
    background: #1e293b;
    border-radius: 16px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border: none;
    background: #334155;
    color: white;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
}

.modal-body {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
}

.modal-poster img {
    width: 250px;
    border-radius: 8px;
    object-fit: cover;
}

.modal-info h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }

.modal-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.badge {
    padding: 0.25rem 0.75rem;
    background: #334155;
    border-radius: 999px;
    font-size: 0.85rem;
}

.modal-genre {
    color: #f59e0b;
    margin-bottom: 1rem;
}

.modal-plot {
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.modal-details p { margin-bottom: 0.25rem; }
.modal-details strong { color: #e2e8f0; }

/* ========== RESPONSIVE ========== */
@media (max-width: 640px) {
    .modal-body { flex-direction: column; }
    .modal-poster img { width: 100%; }
    .movie-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}
```

---

## 💻 JavaScript Implementation (app.js)

### Constants & State

```javascript
// ===== CONFIG =====
const API_KEY = 'YOUR_API_KEY';  // Thay bằng key của bạn
const BASE_URL = 'https://www.omdbapi.com/';

// ===== STATE =====
let currentQuery = '';
let currentPage = 1;
let totalResults = 0;
let currentTab = 'search';       // 'search' | 'favorites'
let favorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
let debounceTimer = null;

// ===== DOM ELEMENTS =====
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const movieGrid = document.getElementById('movie-grid');
const loading = document.getElementById('loading');
const statusMessage = document.getElementById('status-message');
const pagination = document.getElementById('pagination');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const movieModal = document.getElementById('movie-modal');
const modalClose = document.getElementById('modal-close');
const favCount = document.getElementById('fav-count');
const tabBtns = document.querySelectorAll('.tab-btn');
```

### Fetch API Functions

```javascript
// ===== SEARCH MOVIES =====
async function searchMovies(query, page = 1) {
    if (!query.trim()) return;

    showLoading(true);
    hideStatus();

    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
            currentQuery = query;
            currentPage = page;
            totalResults = parseInt(data.totalResults);
            renderMovies(data.Search);
            renderPagination();
        } else {
            showStatus('Không tìm thấy phim nào. Thử từ khóa khác!', 'info');
            movieGrid.innerHTML = '';
            pagination.hidden = true;
        }
    } catch (error) {
        showStatus('Lỗi kết nối. Kiểm tra mạng và thử lại!', 'error');
        console.error('Fetch error:', error);
    } finally {
        showLoading(false);
    }
}

// ===== GET MOVIE DETAIL =====
async function getMovieDetail(imdbID) {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        return await response.json();
    } catch (error) {
        showStatus('Không thể tải chi tiết phim', 'error');
        return null;
    }
}
```

### Render Functions

```javascript
function renderMovies(movies) {
    movieGrid.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const isFav = favorites.some(f => f.imdbID === movie.imdbID);

        card.innerHTML = `
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${movie.imdbID}">
                ${isFav ? '❤️' : '🤍'}
            </button>
            ${movie.Poster !== 'N/A'
                ? `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">`
                : `<div class="movie-poster-placeholder">🎬</div>`
            }
            <div class="movie-info">
                <div class="movie-title" title="${movie.Title}">${movie.Title}</div>
                <div class="movie-year">📅 ${movie.Year}</div>
                <span class="movie-type">${movie.Type}</span>
            </div>
        `;

        // Click card → open detail
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.fav-btn')) {
                openMovieDetail(movie.imdbID);
            }
        });

        // Favorite button
        card.querySelector('.fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(movie);
        });

        movieGrid.appendChild(card);
    });
}

function renderPagination() {
    const totalPages = Math.ceil(totalResults / 10);

    if (totalPages <= 1) {
        pagination.hidden = true;
        return;
    }

    pagination.hidden = false;
    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;
}
```

### Modal Detail

```javascript
async function openMovieDetail(imdbID) {
    const movie = await getMovieDetail(imdbID);
    if (!movie) return;

    document.getElementById('modal-poster-img').src =
        movie.Poster !== 'N/A' ? movie.Poster : '';
    document.getElementById('modal-title').textContent = movie.Title;
    document.getElementById('modal-year').textContent = `📅 ${movie.Year}`;
    document.getElementById('modal-runtime').textContent = `⏱️ ${movie.Runtime}`;
    document.getElementById('modal-rated').textContent = `🔞 ${movie.Rated}`;
    document.getElementById('modal-rating').textContent = `⭐ ${movie.imdbRating}/10`;
    document.getElementById('modal-genre').textContent = movie.Genre;
    document.getElementById('modal-plot').textContent = movie.Plot;
    document.getElementById('modal-director').textContent = movie.Director;
    document.getElementById('modal-actors').textContent = movie.Actors;

    movieModal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    movieModal.hidden = true;
    document.body.style.overflow = '';
}
```

### Favorites

```javascript
function toggleFavorite(movie) {
    const index = favorites.findIndex(f => f.imdbID === movie.imdbID);

    if (index >= 0) {
        favorites.splice(index, 1);
    } else {
        favorites.push({
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            Type: movie.Type
        });
    }

    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    updateFavCount();

    // Re-render current tab
    if (currentTab === 'favorites') {
        renderFavorites();
    } else {
        // Update heart icons
        document.querySelectorAll('.fav-btn').forEach(btn => {
            const id = btn.dataset.id;
            const isFav = favorites.some(f => f.imdbID === id);
            btn.classList.toggle('active', isFav);
            btn.textContent = isFav ? '❤️' : '🤍';
        });
    }
}

function renderFavorites() {
    if (favorites.length === 0) {
        movieGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#94a3b8;">Chưa có phim yêu thích nào</p>';
        pagination.hidden = true;
        return;
    }
    renderMovies(favorites);
    pagination.hidden = true;
}

function updateFavCount() {
    favCount.textContent = favorites.length;
}
```

### Debounce Search

```javascript
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedSearch = debounce((query) => {
    if (query.length >= 2) {
        searchMovies(query);
    }
}, 500);
```

### Event Listeners

```javascript
// Search
searchBtn.addEventListener('click', () => searchMovies(searchInput.value));
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchMovies(searchInput.value);
});

// Debounce auto-search
searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// Pagination
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) searchMovies(currentQuery, currentPage - 1);
});
nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(totalResults / 10);
    if (currentPage < totalPages) searchMovies(currentQuery, currentPage + 1);
});

// Modal
modalClose.addEventListener('click', closeModal);
movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !movieModal.hidden) closeModal();
});

// Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.dataset.tab;

        if (currentTab === 'favorites') {
            renderFavorites();
        } else if (currentQuery) {
            searchMovies(currentQuery, currentPage);
        } else {
            movieGrid.innerHTML = '';
            pagination.hidden = true;
        }
    });
});

// Init
updateFavCount();
```

### Helper Functions

```javascript
function showLoading(show) {
    loading.hidden = !show;
    if (show) movieGrid.innerHTML = '';
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.hidden = false;
}

function hideStatus() {
    statusMessage.hidden = true;
}
```

---

## ✅ Success Criteria

### Bắt buộc

- [ ] Tìm kiếm phim → kết quả hiển thị dưới dạng card grid
- [ ] Loading spinner khi đang fetch
- [ ] Error message khi API fail hoặc không tìm thấy
- [ ] Click card → modal hiện chi tiết phim
- [ ] Pagination hoạt động (Previous/Next)
- [ ] Escape hoặc click outside → đóng modal

### Nâng cao

- [ ] Debounce search (tự động tìm sau 500ms ngừng gõ)
- [ ] Favorites: lưu vào localStorage, tab riêng
- [ ] Responsive trên mobile
- [ ] Poster placeholder khi không có ảnh
- [ ] Keyboard navigation trong modal

---

## 🐛 Common Bugs & Debug Tips

| Bug | Nguyên nhân | Cách sửa |
|-----|------------|----------|
| API trả lỗi 401 | API key không đúng | Kiểm tra lại key, đăng ký mới nếu cần |
| Poster không hiển thị | `Poster: "N/A"` | Kiểm tra `if (Poster !== 'N/A')` |
| Pagination không cập nhật | Không parse `totalResults` | `parseInt(data.totalResults)` |
| Modal không đóng | Event listener bị duplicate | Dùng `hidden` attribute thay vì `classList` |

---

## 📚 Knowledge Check

1. **`async/await`** khác gì so với `.then().catch()`?
2. Tại sao cần **debounce** khi search realtime?
3. `encodeURIComponent()` làm gì? Tại sao cần dùng?
4. Cách xử lý khi API trả về `Response: "False"`?
5. Sự khác biệt giữa `event.stopPropagation()` và `event.preventDefault()`?

---

**← [Quay lại Session 3](../README.md)**
