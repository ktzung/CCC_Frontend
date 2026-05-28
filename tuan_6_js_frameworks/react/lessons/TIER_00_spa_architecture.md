# Tier 0 — SPA Architecture (Single Page Application)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Hiểu MPA vs SPA — tại sao web hiện đại không reload trang  
> **📋 Cần biết:** HTML/CSS/JS cơ bản  
> **🚫 Không cần biết:** React, Virtual DOM, Components

---

## 🎬 Opening Hook

*Minh dùng Gmail cả ngày: mở email, soạn thư, chuyển thư mục, tìm kiếm — **không một lần nào thấy màn hình trắng**.*

*Minh mở trang web trường để đăng ký môn học. Click "Đăng ký" → màn hình trắng 3 giây → trang reload từ đầu → mất đi lựa chọn vừa nhập.*

*"Tại sao Gmail mượt vậy?" Minh hỏi.*

*"Vì Gmail là SPA. Trang web trường là MPA." Anh Hùng nói.*

---

## 🎯 Hôm nay bạn sẽ học

```
MPA:  Click link → Browser → Server → HTML mới → TRẮNG → load lại
SPA:  Click link → JavaScript → Cập nhật DOM → MƯỢT, không reload
```

**Chỉ MỘT khái niệm:** SPA là gì và khác gì MPA. Không học React, không học Virtual DOM — chỉ hiểu kiến trúc.

---

## 📝 Bài 0.1 — MPA: Cách web truyền thống hoạt động (10 phút)

### Luồng hoạt động MPA

```
Minh click "Sản phẩm"
       ↓
Browser gửi request → Server
       ↓
Server trả về HTML MỚI (toàn bộ trang)
       ↓
Browser ĐỔI TRANG → TRẮNG → load lại
       ↓
Minh thấy trang mới (nhưng phải chờ)
```

### Ví dụ trang web trường (MPA)

```html
<!-- trang-chu.html -->
<a href="dang-ky.html">Đăng ký môn học</a>

<!-- dang-ky.html — File HTML RIÊNG BIỆT -->
<form>
    <select>Môn 1</select>
    <select>Môn 2</select>
    <button>Đăng ký</button>
</form>
```

**Vấn đề:**
- Mỗi trang = 1 file HTML riêng trên server
- Click link → browser tải TOÀN BỘ trang mới
- Mất trạng thái: dữ liệu nhập dở → mất
- Chậm: phải chờ server trả HTML + browser parse lại

---

## 📝 Bài 0.2 — SPA: Cách web hiện đại hoạt động (10 phút)

### Luồng hoạt động SPA

```
Minh click "Sản phẩm"
       ↓
JavaScript CATCH sự kiện (không cho browser reload)
       ↓
JavaScript gọi API lấy DATA (chỉ dữ liệu, không lấy HTML)
       ↓
JavaScript cập nhật DOM (thay đổi phần cần thay)
       ↓
Minh thấy nội dung mới (NGAY LẬP TỨC, không trắng)
```

### Ví dụ SPA (khung ý tưởng)

```html
<!-- index.html — CHỈ MỘT FILE HTML -->
<div id="app"></div>
<script src="app.js"></script>
```

```javascript
// app.js — JavaScript quản lý mọi thứ
const app = document.getElementById("app");

// "Routes" — ánh xạ URL → nội dung
const pages = {
    "home":     "<h1>Trang chủ</h1><a href='#products'>Sản phẩm</a>",
    "products": "<h1>Sản phẩm</h1><ul><li>iPhone</li><li>MacBook</li></ul>",
    "cart":     "<h1>Giỏ hàng</h1><p>2 sản phẩm</p>"
};

// Khi click link → chỉ thay đổi nội dung #app
function navigate(page) {
    app.innerHTML = pages[page];  // Thay đổi DOM, KHÔNG reload
    history.pushState({}, "", `#${page}`);  // Đổi URL
}

// Lắng nghe click trên link
document.addEventListener("click", (e) => {
    if (e.target.matches("a[href^='#']")) {
        e.preventDefault();  // Ngăn browser reload
        const page = e.target.getAttribute("href").slice(1);
        navigate(page);
    }
});
```

### So sánh trực tiếp

```
                    MPA                          SPA
                    ───                          ───
Số file HTML        Nhiều (mỗi trang = 1 file)  1 file duy nhất
Click link          Browser reload               JavaScript cập nhật DOM
Tốc độ              Chậm (load lại mỗi lần)      Nhanh (chỉ thay đổi phần cần)
Trạng thái          Mất khi chuyển trang         Giữ nguyên (JS quản lý)
Server              Trả HTML cho mỗi request      Trả 1 lần, sau đó chỉ API
Ví dụ               WordPress, web trường        Gmail, Facebook, Shopee
```

---

## 📝 Bài 0.3 — SSR: Sự kết hợp (5 phút)

### SSR (Server-Side Rendering)

```
SSR = Server render HTML lần đầu (cho SEO, tốc độ)
    + Client "hydrate" → biến thành SPA sau đó

Ví dụ: Next.js, Nuxt.js
```

```
Lần đầu:    Server → HTML đầy đủ (SEO đọc được, user thấy ngay)
Sau đó:      JavaScript "nhận" trang → biến thành SPA (mượt như Gmail)
```

### Bảng so sánh 3 kiến trúc

```
Kiến trúc    Lần đầu load    Chuyển trang    SEO     Ví dụ
─────────    ─────────────    ────────────    ───     ─────
MPA          Nhanh (HTML)     Chậm (reload)   Tốt     WordPress
SPA          Chậm (load JS)   Nhanh (JS)      Kém     Gmail
SSR          Nhanh (HTML)     Nhanh (hydrate) Tốt     Next.js
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| SPA = 1 file HTML duy nhất | SPA = 1 lần load, JavaScript quản lý routing |
| SPA không cần server | SPA cần server cho API (dữ liệu) |
| MPA luôn chậm hơn SPA | MPA lần đầu nhanh hơn SPA (có HTML sẵn) |
| React = SPA | React có thể dùng SSR (Next.js) |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** Khi user click link trên trang MPA, điều gì xảy ra?
- a) JavaScript cập nhật DOM
- b) Browser gửi request mới, nhận HTML mới, reload trang ✅
- c) Nothing happens

**Câu 2:** SPA lấy dữ liệu mới bằng cách nào?
- a) Server trả HTML mới
- b) JavaScript gọi API, nhận JSON, cập nhật DOM ✅
- c) Browser tự động fetch

**Câu 3:** Tại sao SSR đang quay lại?
- a) SPA quá nhanh
- b) SSR tốt hơn cho SEO và first load ✅
- c) MPA tốt hơn SSR

---

## 🔗 Kết nối

- **Sẽ cần trong Tier 1:** Virtual DOM — cách React cập nhật DOM hiệu quả
- **Sẽ cần trong Tier 19:** React Router — thư viện quản lý SPA routing
- **Tham khảo thêm:** `01_spa_architecture/01_spa_architecture_components_routing.md` (file cũ)
