# 🟢 TUẦN 6 - BÀI 15 (VUE.JS)
# **TESTING & DEPLOYMENT — Từ Localhost Ra Thế Giới**

---

## 0. 🎬 Opening Hook

*"App chạy ngon trên máy em!" Minh reo lên.*

*"Khách hàng không dùng máy của em," anh Hùng trả lời. "Họ dùng điện thoại, trình duyệt khác, mạng yếu. Để đảm bảo code không vỡ khi người khác sửa, ta cần **Unit Test** (Vitest). Để mang app đến người dùng, ta cần **Build & Deploy** (Vite + Vercel). Làm kỹ sư, code chạy được mới là 50% công việc."*

---

## 1. 🎯 Why This Matters

- **Testing (Vitest)**: Đảm bảo component/function hoạt động đúng. Bắt lỗi trước khi code lên Production. Dễ dàng refactor.
- **Deployment**: Đóng gói mã nguồn (HTML/CSS/JS) và đưa lên máy chủ thực tế (Cloud CDN).

---

## 2. 🌐 Big Picture — Development Lifecycle

```
1. CODE (Local)    → Cập nhật AppButton.vue
2. TEST (Vitest)   → Chạy Unit Tests tự động. Đảm bảo nút click emit đúng Event.
3. BUILD (Vite)    → Minify JS, tối ưu hình ảnh, nén CSS ra thư mục /dist
4. DEPLOY (Vercel) → Upload folder /dist lên CDN. Update DNS. Live!
```

---

## 3. ⚙️ Core Technical Truth

### Bước 1: Unit Testing với Vitest & Vue Test Utils

```bash
# Cài đặt
npm install -D vitest @vue/test-utils jsdom
```

```javascript
// src/components/__tests__/Button.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

// Tách ra thành các Block mô tả
describe('Button.vue Component', () => {

    it('renders đúng label truyền qua props', () => {
        // Mount component vào môi trường ảo JSDOM
        const wrapper = mount(Button, {
            props: { label: 'Click Me' }
        })
        // Test kiểm tra kết quả
        expect(wrapper.text()).toContain('Click Me')
    })

    it('phát ra sự kiện (emit) click khi bị bấm', async () => {
        const wrapper = mount(Button)
        
        // Giả lập user click
        await wrapper.find('button').trigger('click')
        
        // Kì vọng component emit sự kiện 'click' 1 lần
        expect(wrapper.emitted()).toHaveProperty('click')
        expect(wrapper.emitted('click')).toHaveLength(1)
    })
})
```

---

### Bước 2: Testing Composable (Logic Thuần JS)

Test component thì cần `@vue/test-utils`. Test logic thuần thì chỉ cần `vitest`.

```javascript
// src/composables/__tests__/useMath.spec.js
import { describe, it, expect } from 'vitest'
import { useMath } from '../useMath'

describe('useMath Composable', () => {
    it('cộng đúng 2 số', () => {
        const { add } = useMath()
        expect(add(2, 3)).toBe(5)
        expect(add(-1, 1)).toBe(0)
    })
})
```

---

### Bước 3: Build & Optimization (Tối ưu hóa Code)

Môi trường dev (`npm run dev`) chứa rất nhiều code dư thừa giúp Debug. Để đưa lên mạng, ta cần Build.

```bash
# Trong package.json có sẵn lệnh build của Vite
npm run build
```

**Quá trình Vite làm khi Build:**
1. **Tree-shaking**: Xóa các hàm JS import vào mà không dùng.
2. **Minification**: Xóa dấu cách, rút gọn tên biến (VD: `const data` → `const d`).
3. **Chunking**: Tách JS ra thành nhiều file nhỏ (Lazy load).
4. **Result**: Tạo ra thư mục `dist/` chứa tĩnh (HTML/CSS/JS). Không cần Node.js để chạy!

```bash
# Test thử folder dist/ ở dưới local bằng server tĩnh
npm run preview
```

---

### Bước 4: Deploy Lên Vercel / Netlify (Miễn Phí)

Frontend SPA (Vue, React, Angular) bản chất là "Các file tĩnh tĩnh". Ta có thể deploy nó lên CDN miễn phí.

**Cách 1: Kéo - Thả (Manual)**
- Vào trang chủ [Netlify](https://www.netlify.com/).
- Kéo thả thư mục `dist/` trực tiếp vào cửa sổ web.
- Done. Có link thật để chạy.

**Cách 2: GitHub CI/CD (Tự Động — Recommended)**
- Đăng nhập Vercel hoặc Netlify, liên kết tài khoản GitHub.
- Chọn kho chứa code (Repository).
- Framework Preset: Chọn **Vue.js / Vite**.
- Bấm Deploy.
- **Lợi ích:** Từ nay cứ `git push` lên nhánh `main`, hệ thống sẽ tự chạy `npm run build` và deploy bản mới nhất!

---

## 4. 🟢 Simplified Layer

> **Vitest dùng để thử nghiệm tự động. Máy tính tự chạy code thay bạn để kiểm tra lỗi.**
> **Build (`npm run build`) là bước nén và dọn rác JS/CSS để lấy folder `/dist`.**
> **Deploy là bước tải folder `/dist` lên mây (Vercel/Netlify) để thế giới truy cập.**

---

## 5. 🛠️ Hands-on Practice

### Bài tập: Build & Triển Khai App Đầu Tiên (15 phút)

```bash
# 1. Mở terminal, chạy lệnh:
npm run build

# 2. Quan sát thư mục mới xuất hiện: /dist
# Xem thử file .js bên trong để thấy sức mạnh Minify của Vite.

# 3. Chạy preview để kiểm tra
npm run preview

# 4. (Tùy chọn) Đăng ký Vercel, cài Vercel CLI, gõ lệnh `vercel --prod` ở thư mục gốc.
```

---

## 6. ❌ Common Misconceptions

| Hiểu sai | Sự thật |
|---|---|
| **"Cần Node.js server trên hosting để chạy Vue app"** | Không. Vue tạo ra SPA (Single Page Application) - bản chất chỉ là file `.html`, `.js`, `.css` tĩnh tĩnh. Bạn có thể up nó lên S3, GitHub Pages, Netlify. Nó chạy trên trình duyệt (Browser), không chạy trên Backend Server. |
| **"Route /about báo lỗi 404 sau khi Deploy"** | Do bạn xài Web History Mode trong Vue Router. Trình duyệt gửi request `GET /about` lên Server tĩnh (Nginx/Netlify). Server không thấy file `about.html` → báo 404. Cách fix: Cấu hình Vercel/Netlify luôn trỏ mọi request (Redirect / Rewrite) về `index.html`. |

---

## 7. ✅ Checkpoint

1. Điểm khác biệt giữa `npm run dev` và `npm run build`?
2. `mount()` trong Vue Test Utils để làm gì?
3. Tại sao khi refresh trang (F5) trên host (Vercel) lại bị lỗi 404 Not Found ở trang `/products`?

<details>
<summary>👁️ Xem đáp án</summary>

1. `dev`: Cung cấp Hot Module Replacement, giữ lại sourcemap, không nén code để debug nhanh. `build`: Nén code cực mạnh (minify), tree-shaking, cắt file thành chunk tối ưu cho máy khách (client).
2. Tạo ra một "vùng chứa ảo" (wrapper) kết xuất Vue component vào DOM ảo (JSDOM) trong lúc test, giúp ta lấy được các selector như `find('button')` hoặc `text()`.
3. Server tĩnh không hiểu Client-side Routing của Vue. Trình duyệt bắt server tìm file `/products/index.html` (không tồn tại). Cách fix là cấu hình Rewrite All Rules trỏ thẳng về `index.html` gốc để JS của Vue tự phân luồng lại.

</details>

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `vitest` không chạy hoặc `command not found` | Chưa cài hoặc thiếu trong `package.json` devDependencies | `npm i -D vitest @vue/test-utils jsdom` |
| `ReferenceError: document is not defined` | Test environment mặc định là `node`, không có DOM | Thêm `environment: 'jsdom'` vào `vite.config.js` test section hoặc file test |
| `Cannot find module '@/components/Button'` | Vitest không hiểu alias `@/` | Thêm `resolve.alias: { '@': path.resolve('./src') }` vào `vite.config.js` |
| `npm run build` lỗi `Out of memory` | Project lớn, Node.js heap memory quá nhỏ | Chạy `NODE_OPTIONS=--max-old-space-size=4096 npm run build` |
| Deploy Vercel trả về 404 khi refresh | SPA routing không có server rewrite rule | Thêm file `vercel.json`: `{ "rewrites": [{ "source": "(.*)", "destination": "/index.html" }] }` |
| `mount()` trả về wrapper rỗng | Component import sai hoặc thiếu `shallowMount` | Kiểm tra import path; dùng `mount()` thay `shallowMount()` nếu cần render child |
| Build thành công nhưng deploy mất CSS | Đường dẫn asset sai (relative vs absolute) | Trong `vite.config.js`: `base: '/'` cho root domain, `base: '/repo-name/'` cho GitHub Pages |

---

## 8. 📌 Summary

1. **Testing**: `Vitest` kết hợp `@vue/test-utils` (JSDOM) để unit test logic và UI.
2. **Build Tool**: Vite chịu trách nhiệm nén CSS/JS (Minify/Tree-shaking) thành thư mục `dist/`.
3. **Deployment**: Kéo thả thư mục tĩnh lên CDN, hoặc link GitHub với Vercel/Netlify để thiết lập CI/CD tự động deploy.
4. **History Fallback Mode**: Luôn cấu hình máy chủ trả về `index.html` với mọi đường dẫn URL để Vue Router hoạt động đúng trên Production.

---

## 🎓 Chúc mừng! Bạn đã hoàn thành toàn bộ chuyên đề Vue.js (Module 1, 2, 3, 4)!
Bạn đã sẵn sàng để trở thành một Vue Developer chuyên nghiệp trong môi trường doanh nghiệp thực tế.
