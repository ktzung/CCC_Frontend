# 🟦 PART III - CHƯƠNG 01 & 02
# **GETTING STARTED WITH REACT**

## 🎬 "3 Lệnh Terminal, 30 Giây = React App Chạy" — Vite Magic

*Minh: "React setup chắc phức tạp lắm?" Anh Hùng gõ 3 lệnh: `npm create vite@latest`, `npm install`, `npm run dev`. Browser mở — React app đang chạy. 30 giây. "Đấy, hết rồi."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau phần này, bạn sẽ:
- Hiểu **SPA (Single Page Application)** là gì.
- Biết tại sao React lại "bá đạo" đến vậy (Virtual DOM).
- Biết cách khởi tạo dự án React chuẩn bằng **Vite**.
- Hiểu cấu trúc thư mục của một dự án React.

---

# 1. **WHAT & WHY REACT?**

## 1.1. React là gì?
React là một thư viện JS được tạo ra bởi **Facebook (Meta)** năm 2013.
- **Component-Based:** Xây dựng web từ những mảnh ghép nhỏ (Header, Footer, Button...).
- **Declarative:** Bạn chỉ cần mô tả giao diện trông như thế nào, React sẽ tự lo việc vẽ nó ra sao.

## 1.2. SPA (Single Page Application)
- **Web truyền thống (MPA):** Mỗi lần bấm link -> Tải lại cả trang trắng bóc -> Render lại từ đầu. (Chậm, trải nghiệm gật cục).
- **React (SPA):** Chỉ tải 1 lần duy nhất. Khi bấm link -> Chỉ đổi nội dung bên trong, không tải lại trang. (Nhanh như app điện thoại).

---

# 2. **GETTING STARTED (SETUP)**

Ngày xưa ta dùng `create-react-app`. Bây giờ (2025), **Vite** là tiêu chuẩn mới (Nhanh gấp 100 lần).

## 2.1. Cài đặt (Terminal)
Yêu cầu: Đã cài NodeJS.

```bash
# Tạo dự án mới
npm create vite@latest my-app -- --template react

# Vào thư mục
cd my-app

# Cài đặt thư viện
npm install

# Chạy thử
npm run dev
```

## 2.2. Folder Structure (Cấu trúc thư mục)

```
my-app/
├── node_modules/       # Kho chứa thư viện (Đừng động vào)
├── public/             # Chứa file tĩnh (favicon, robots.txt)
├── src/                # CODE CỦA BẠN Ở ĐÂY
│   ├── assets/         # Ảnh, icon
│   ├── App.css         # CSS chính
│   ├── App.jsx         # Component chính
│   ├── index.css       # CSS toàn cục
│   └── main.jsx        # Điểm bắt đầu (Entry point)
├── index.html          # File HTML duy nhất của cả app
├── package.json        # Khai báo tên dự án, thư viện sử dụng
└── vite.config.js      # Cấu hình Vite
```

---

# 3. **ENTRY POINT (NÓ CHẠY THẾ NÀO?)**

1.  Trình duyệt mở `index.html`.
2.  `index.html` gọi file `src/main.jsx`.
3.  `main.jsx` tìm thẻ `<div id="root">` và nhét toàn bộ ứng dụng React vào đó.

**File: `src/main.jsx`**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

# 4. **TỔNG KẾT**

- **React** giúp xây dựng SPA mượt mà.
- Dùng **Vite** để khởi tạo dự án.
- Code React nằm trong thư mục `src`.
- Mọi thứ bắt đầu từ `main.jsx` render vào `index.html`.

---

**Chương tiếp theo:** Học cách tư duy và viết code React (Components, JSX, Props, State).
