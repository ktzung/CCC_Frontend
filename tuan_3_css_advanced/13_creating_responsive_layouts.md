# 🟩 CHƯƠNG 13
# **RESPONSIVE LAYOUTS — Website Trên Mọi Màn Hình**

## 🎬 "Trang Web Đẹp Trên Laptop, Vỡ Nát Trên iPhone"

*Minh tự hào khoe Todo App cho bạn gái xem. Cô ấy mở trên iPhone...*

*Chữ nhỏ xíu. Nút bấm chồng lên nhau. Phải zoom in để đọc. Scroll ngang liên tục.*

*"Sao xấu thế?" — Câu hỏi đau lòng nhất một Frontend Developer có thể nghe.*

> **Anh Hùng:** *"60% lượt truy cập web đến từ MOBILE. Trang web không responsive = mất 60% người dùng. Google còn phạt SEO nếu trang không mobile-friendly."*

---

## 🎯 Mục tiêu
- Hiểu Mobile-First vs Desktop-First
- Sử dụng Media Queries (`@media`)
- Chọn Breakpoints chuẩn
- Responsive images & navigation

---

## 📱 Bước 0: Viewport Meta Tag — "Tấm vé vào cửa"

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

> ⚠️ **Thiếu dòng này** = iPhone sẽ coi trang web là web desktop và thu nhỏ xíu lại. Luôn đặt trong `<head>`.

---

## 📐 Media Queries — "Nếu màn hình nhỏ → đổi layout"

```css
/* Mặc định: Mobile (nhỏ nhất) */
.product-grid {
    display: grid;
    grid-template-columns: 1fr;       /* 1 cột */
    gap: 16px;
}

/* Tablet trở lên (≥ 768px) */
@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);  /* 2 cột */
    }
}

/* Desktop trở lên (≥ 1024px) */
@media (min-width: 1024px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);  /* 4 cột */
    }
}
```

### Breakpoints chuẩn (Bootstrap):

| Tên | Kích thước | Thiết bị |
|---|---|---|
| **xs** | < 576px | Điện thoại dọc |
| **sm** | ≥ 576px | Điện thoại ngang |
| **md** | ≥ 768px | Tablet |
| **lg** | ≥ 992px | Desktop nhỏ |
| **xl** | ≥ 1200px | Desktop lớn |

---

## 📱 Mobile-First vs Desktop-First

### ✅ Mobile-First (KHUYÊN DÙNG):

```css
/* 1. Code cho mobile trước (mặc định) */
.col { width: 100%; }

/* 2. Tablet: min-width = "từ kích thước này TRỞ LÊN" */
@media (min-width: 768px) {
    .col { width: 50%; }
}

/* 3. Desktop */
@media (min-width: 1024px) {
    .col { width: 25%; }
}
```

### ❌ Desktop-First (cách cũ):

```css
.col { width: 25%; }
@media (max-width: 1024px) { .col { width: 50%; } }
@media (max-width: 768px) { .col { width: 100%; } }
```

> **Anh Hùng:** *"Mobile-First vì: điện thoại tải ít CSS hơn → nhanh hơn. Desktop thêm CSS = OK. Ngược lại = lãng phí."*

---

## 🖼️ Responsive Images & Videos

```css
/* BẮT BUỘC — Ảnh không bao giờ vỡ khung */
img, video {
    max-width: 100%;
    height: auto;
}
```

---

## 🍔 Responsive Navigation — Mobile hamburger menu

```css
/* Mobile: Ẩn menu, hiện hamburger */
.nav-links { display: none; }
.hamburger { display: block; }

/* Desktop: Hiện menu, ẩn hamburger */
@media (min-width: 768px) {
    .nav-links { display: flex; }
    .hamburger { display: none; }
}
```

---

## ➡️ Chương tiếp theo...

*Todo App responsive rồi! Nhưng vẫn "trắng trơn". "Mình cần gradient, shadows, animations," Minh nghĩ.*

**→ [Chương 14: Styling with CSS](./14_styling_with_css.md) — Gradients, Shadows, Transitions, Animations.**
