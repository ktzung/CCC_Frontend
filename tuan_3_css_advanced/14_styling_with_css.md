# 🟩 CHƯƠNG 14
# **STYLING WITH CSS — Gradient, Shadows & Animations**

## 🎬 "Trang Web Như Từ Năm 2005" — Khi Thiếu Hiệu Ứng

*Minh so sánh Todo App (nền trắng, text đen, không shadow) với Apple.com (gradient tím-xanh, ảnh nổi 3D, chữ glow, parallax scroll).*

*"Cùng là HTML/CSS, sao Apple đẹp thế?" Minh hỏi.*

> **Anh Hùng:** *"Vì Apple dùng: Gradients (chuyển màu), Shadows (đổ bóng), Transitions (chuyển động mượt), và Animations (hoạt hình). Đây là 4 vũ khí biến web 'bình thường' thành web 'premium'."*

---

## 🎯 Mục tiêu
- Gradients — nền chuyển sắc
- Shadows — hiệu ứng nổi 3D
- Transitions — hover mượt mà
- Animations — hoạt hình @keyframes

---

## 🌈 Gradients — "Goodbye nền trắng nhàm chán"

```css
/* Linear: Chuyển màu thẳng */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Radial: Chuyển màu tròn */
.spotlight {
    background: radial-gradient(circle, #fff 0%, #000 100%);
}

/* Ảnh + overlay tối (hay dùng cho hero banner) */
.banner {
    background: 
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url('hero.jpg');
    background-size: cover;
    background-position: center;
    color: white;    /* Text trắng trên nền tối */
}
```

---

## 💎 Shadows — "Hiệu ứng nổi Material Design"

```css
/* Card Shadow nhẹ (Material Design Level 1) */
.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Hover → nổi lên (Level 3) */
.card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);    /* Nhấc lên 4px */
    transition: all 0.3s ease;
}

/* Text glow */
h1 {
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}
```

---

## ✨ Transitions — "Mượt mà thay vì 'bụp' một cái"

```css
.btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* ⭐ Transition: thuộc tính | thời gian | kiểu */
    transition: all 0.3s ease;
}

.btn:hover {
    background: #5a67d8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

> **Quy tắc:** MỌI element có `:hover` phải có `transition`. Không transition = thay đổi "bụp" một cái → thô.

---

## 🎬 Animations — "Tự chạy không cần click"

### Bước 1: Viết kịch bản phim

```css
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
```

### Bước 2: Gán cho diễn viên

```css
.hero-title {
    animation: slideInUp 0.8s ease-out;
}

.notification-badge {
    animation: pulse 2s ease-in-out infinite;  /* Lặp vô hạn */
}
```

### Loading spinner:

```css
@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px; height: 40px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
```

---

## ➡️ Chương tiếp theo...

*Todo App giờ có gradient, shadow, animations. Nhưng file CSS đã dài 500 dòng. "Code CSS bắt đầu rối," Minh than.*

**→ [Chương 15: Testing & Organizing CSS](./15_testing_organizing.md) — BEM naming, modular CSS, DevTools debugging.**
