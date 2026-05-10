# 🟩 BÀI 04: TAILWINDCSS - CUSTOMIZATION

## 🎬 "tailwind.config.js = DNA Của Design System" — 1 File Quyết Định Tất Cả

*Minh dùng Tailwind mặc định: `bg-blue-500` giống mọi trang web Tailwind khác. "Sao cũng xanh giống nhau?"*

*Anh Hùng: "Vì em chưa customize. Mở `tailwind.config.js` → thêm `'brand-primary': '#ff6600'` → giờ dùng `bg-brand-primary`. Toàn bộ design system trong MỘT FILE."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu cấu trúc file `tailwind.config.js`
- Customize colors trong config
- Customize breakpoints (responsive)
- Customize spacing, typography
- Tạo custom utilities
- Extend theme thay vì override

---

# 1. **TẠI SAO CẦN CUSTOMIZE?**

**Vấn đề với TailwindCSS mặc định:**
- Màu sắc không phù hợp với brand
- Breakpoints không đúng yêu cầu
- Spacing không đúng design system
- Thiếu một số utilities cần thiết

**Giải pháp:** Customize qua `tailwind.config.js`!

---

# 2. **CẤU TRÚC TAILWIND.CONFIG.JS**

## 2.1. File config mặc định

Sau khi chạy `npx tailwindcss init`, bạn có file:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Giải thích:**
- `content`: Đường dẫn đến file HTML/JS (quan trọng cho PurgeCSS)
- `theme`: Customize theme (colors, spacing, fonts...)
- `extend`: Extend theme thay vì override (khuyên dùng)
- `plugins`: Thêm plugins nếu cần

---

# 3. **CUSTOMIZE COLORS**

## 3.1. Thêm màu mới (Extend)

**Cách tốt nhất:** Dùng `extend` để thêm màu mới mà không mất màu cũ:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e40af',
        'brand-red': '#dc2626',
        'brand-orange': '#ff6600',
      }
    }
  }
}
```

**Sử dụng:**
```html
<div class="bg-brand-blue text-white">Brand Blue</div>
<div class="text-brand-red">Brand Red Text</div>
```

## 3.2. Override màu cũ (Không khuyên dùng)

Nếu muốn thay thế hoàn toàn màu cũ:

```javascript
module.exports = {
  theme: {
    colors: {
      'primary': '#ff6600',
      'secondary': '#6c757d',
      // Phải định nghĩa lại TẤT CẢ màu nếu override
    }
  }
}
```

**Nhược điểm:** Mất tất cả màu mặc định (blue-500, red-500...)

## 3.3. Customize màu có sẵn

Bạn có thể customize một phần của màu:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... các shades khác
          500: '#3b82f6',  // Override chỉ shade 500
          600: '#2563eb',
          // ...
        }
      }
    }
  }
}
```

---

# 4. **CUSTOMIZE BREAKPOINTS**

## 4.1. Thêm breakpoint mới

```javascript
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',  // Thêm breakpoint mới
      }
    }
  }
}
```

**Sử dụng:**
```html
<div class="text-sm md:text-base lg:text-lg 3xl:text-xl">
  Responsive text với breakpoint mới
</div>
```

## 4.2. Override breakpoint (Không khuyên dùng)

```javascript
module.exports = {
  theme: {
    screens: {
      'tablet': '768px',
      'desktop': '1024px',
      // Phải định nghĩa lại tất cả
    }
  }
}
```

---

# 5. **CUSTOMIZE SPACING**

## 5.1. Thêm spacing mới

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',  // 512px
        '144': '36rem',  // 576px
        '18': '4.5rem',  // 72px
      }
    }
  }
}
```

**Sử dụng:**
```html
<div class="m-128">Margin 32rem</div>
<div class="p-18">Padding 4.5rem</div>
```

## 5.2. Customize spacing scale

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px
        '1.5': '0.375rem',  // 6px
        '2': '0.5rem',      // 8px
        // ... customize toàn bộ scale
      }
    }
  }
}
```

---

# 6. **CUSTOMIZE TYPography**

## 6.1. Font Family

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Courier New', 'monospace'],
        'custom': ['Custom Font', 'sans-serif'],  // Font mới
      }
    }
  }
}
```

**Sử dụng:**
```html
<p class="font-sans">Sans font</p>
<p class="font-custom">Custom font</p>
```

## 6.2. Font Size

```javascript
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
        '10xl': '10rem',  // Thêm size mới
      }
    }
  }
}
```

## 6.3. Line Height

```javascript
module.exports = {
  theme: {
    extend: {
      lineHeight: {
        'extra-tight': '1.1',
        'super-loose': '2.5',
      }
    }
  }
}
```

---

# 7. **CUSTOMIZE BORDER RADIUS**

```javascript
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
        'custom': '20px',  // Radius tùy chỉnh
      }
    }
  }
}
```

---

# 8. **CUSTOMIZE SHADOWS**

```javascript
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'custom': '0 4px 14px 0 rgba(0, 118, 255, 0.39)',  // Shadow tùy chỉnh
      }
    }
  }
}
```

---

# 9. **CUSTOM UTILITIES**

Bạn có thể tạo utilities hoàn toàn mới:

```javascript
module.exports = {
  theme: {
    extend: {
      // Extend theme
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        },
        '.text-shadow-md': {
          textShadow: '4px 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '15px 15px 30px rgba(0,0,0,0.11), 5px 5px 15px rgba(0,0,0,0.08)',
        },
      }
      addUtilities(newUtilities)
    }
  ]
}
```

**Sử dụng:**
```html
<h1 class="text-shadow-lg">Text with shadow</h1>
```

---

# 10. **VÍ DỤ HOÀN CHỈNH**

## 10.1. File tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        'brand': {
          'primary': '#ff6600',
          'secondary': '#6c757d',
          'accent': '#00d4ff',
        }
      },
      
      // Custom breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
      },
      
      // Custom font
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      
      // Custom border radius
      borderRadius: {
        'custom': '20px',
      },
    },
  },
  plugins: [],
}
```

## 10.2. Sử dụng trong HTML

```html
<div class="bg-brand-primary text-white p-18 rounded-custom">
  Custom styled div
</div>

<div class="text-sm xs:text-base md:text-lg 3xl:text-xl">
  Responsive text với custom breakpoints
</div>
```

---

# 11. **BEST PRACTICES**

1. **Luôn dùng `extend`:** Giữ lại giá trị mặc định, chỉ thêm mới
2. **Đặt tên có ý nghĩa:** `brand-primary` tốt hơn `color1`
3. **Document custom values:** Ghi chú lại các giá trị đã customize
4. **Test sau mỗi thay đổi:** Đảm bảo không break layout
5. **Không override quá nhiều:** Nếu phải override nhiều, cân nhắc dùng framework khác

---

# 12. **TROUBLESHOOTING**

## Lỗi 1: Custom classes không hoạt động

**Nguyên nhân:** Chưa rebuild CSS hoặc content path sai

**Giải pháp:**
1. Kiểm tra `content` path trong config
2. Rebuild CSS: `npm run build` hoặc restart dev server

## Lỗi 2: Màu mặc định biến mất

**Nguyên nhân:** Override thay vì extend

**Giải pháp:** Dùng `extend` thay vì override trực tiếp:

```javascript
// ❌ SAI
theme: {
  colors: { ... }
}

// ✅ ĐÚNG
theme: {
  extend: {
    colors: { ... }
  }
}
```

---

# 13. **TỔNG KẾT**

- Customize TailwindCSS qua `tailwind.config.js`
- Luôn dùng `extend` để giữ giá trị mặc định
- Có thể customize: colors, spacing, typography, breakpoints, shadows...
- Tạo custom utilities với plugins
- Test kỹ sau mỗi thay đổi

---

# 14. 🛠️ HANDS-ON PRACTICE — Làm ngay bây giờ

### Bài tập: Tạo brand theme cho Todo App (20 phút)

1. Tạo `tailwind.config.js` với custom theme:
   - **Colors**: primary (xanh dương), secondary (tím), accent (cam)
   - **Font family**: `sans` = `'Inter', sans-serif`
   - **Border radius**: `card` = `12px`

2. Dùng custom theme để style Todo App:
   - Header dùng `bg-primary`
   - Buttons dùng `bg-accent`
   - Cards dùng `rounded-card`

3. Thêm custom animation `bounce-slow` vào config

**Bonus:** Tạo dark mode colors và test với `dark:` prefix

---

# 15. ❌ COMMON MISCONCEPTIONS — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Dùng `extend` hay `theme` cũng được"** | **SAI!** `theme` **ghi đè** toàn bộ giá trị mặc định. `extend` **thêm vào**. Dùng `theme` khi muốn thay đổi hoàn toàn, `extend` khi muốn thêm |
| **"Custom colors mất hết default colors"** | Chỉ khi dùng `theme: { colors: {...} }`. Dùng `extend: { colors: {...} }` để GIỮ default + thêm custom |
| **"Plugins phức tạp, không cần học"** | Plugins Tailwind rất đơn giản — chỉ là JS function thêm utilities. Hữu ích cho team share custom utilities |
| **"Config thay đổi phải restart server"** | Với Vite (HMR) → tự reload. Với Webpack → cần restart. Tailwind JIT mode tự detect file changes |

---

# 16. ✅ CHECKPOINT — Kiểm tra hiểu biết

### Câu hỏi hiểu cơ bản:

1. Sự khác biệt giữa `theme` và `extend` trong `tailwind.config.js` là gì?
2. Tại sao phải khai báo `content` trong config? Điều gì xảy ra nếu bỏ?
3. Custom plugin thêm utility mới bằng cách nào?

### Câu hỏi áp dụng:

4. Bạn muốn thêm 5 brand colors (primary, secondary, accent, success, danger) vào Tailwind. Viết config.
5. Một developer dùng `theme: { colors: { primary: '#2563eb' } }` — sau đó báo "tất cả default colors mất hết". Giải thích lỗi và cách sửa.

<details>
<summary>👁️ Xem đáp án</summary>

1. `theme` **ghi đè** toàn bộ giá trị mặc định (mất hết default). `extend` **bổ sung** vào (giữ nguyên default + thêm mới). Luôn dùng `extend` trừ khi muốn thay đổi hoàn toàn.
2. `content` cho Tailwind biết **file nào cần scan** để tìm classes đang dùng → chỉ generate CSS cho classes đó. Bỏ `content` → Tailwind generate TẤT CẢ classes → bundle size rất lớn (3MB+).
3. Dùng `plugin` function: `plugin(function({ addUtilities }) { addUtilities({ '.text-shadow': { textShadow: '2px 2px 4px rgba(0,0,0,0.3)' } }) })`.
4. `theme: { extend: { colors: { primary: '#2563eb', secondary: '#7c3aed', accent: '#f97316', success: '#22c55e', danger: '#ef4444' } } }`
5. Lỗi: dùng `theme` thay vì `extend`. `theme.colors` ghi đè TOÀN BỘ colors → mất default (`red-500`, `blue-500`...). Sửa: đổi `theme` → `extend`.

</details>

---

**Bài tiếp theo:** [05. Advanced](../05_advanced/05_advanced.md) - @apply, Plugins, Performance optimization

> [!TIP]
> **Lời khuyên:** Hãy tạo một design system document với tất cả custom values (colors, spacing, fonts). Điều này giúp team làm việc nhất quán và dễ maintain hơn!
