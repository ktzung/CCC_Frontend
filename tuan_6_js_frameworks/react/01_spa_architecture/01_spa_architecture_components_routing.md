# 🟩 TUẦN 6 - BÀI 01 (JS FRAMEWORKS)
# **SPA ARCHITECTURE — Component, Routing & State**

---

## 0. 🎬 Opening Hook

*Minh dùng Gmail cả ngày: mở email, soạn thư, chuyển thư mục, tìm kiếm — **không một lần nào thấy màn hình trắng**.*

*Minh mở trang web trường để đăng ký môn học. Click "Đăng ký" → màn hình trắng 3 giây → trang reload từ đầu → mất đi lựa chọn vừa nhập.*

*"Tại sao Gmail mượt vậy?" Minh hỏi.*

*"Vì Gmail là SPA — Single Page Application. Load 1 lần, JavaScript quản lý mọi thứ sau đó. Trang web trường là MPA — mỗi click = 1 request mới = 1 trang trắng." Anh Hùng nói.*

*"Mình học React để làm Gmail tiếp theo?" Minh hỏi.*

*"Không — để không bao giờ làm trang web kiểu trường nữa."*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Bài này là **nền tảng tư duy** trước khi học React/Vue:
- Hiểu **tại sao** frameworks tồn tại (MPA vs SPA)
- Hiểu **Virtual DOM** — lý do React nhanh hơn DOM thuần
- Hiểu **Component thinking** — cách tổ chức UI như LEGO
- Hiểu **State** — khái niệm cốt lõi nhất của mọi framework

Không nắm bài này → học React như học ngôn ngữ mà không hiểu tại sao người ta nói ngôn ngữ đó.

---

## 2. 🌐 Big Picture — MPA vs SPA vs SSR

```
MPA (Multi-Page App)         SPA (Single-Page App)       SSR (Server-Side Render)
────────────────────         ─────────────────────       ────────────────────────
User click link              User click link             User click link
       ↓                            ↓                           ↓
Browser → Server             JS intercepts               Browser → Server
       ↓                            ↓                           ↓
Server builds HTML           Fetch data từ API           Server renders HTML
       ↓                            ↓                           ↓
Browser nhận HTML mới        Update DOM (no reload)      Browser nhận HTML đầy đủ
       ↓                            ↓                           ↓
Trang TRẮNG → load lại       Smooth, instant ⚡          Trang đầy ngay (SEO tốt)

Ví dụ:                       Ví dụ:                      Ví dụ:
WordPress, web trường        Gmail, Facebook, Shopee     Next.js, Nuxt.js
```

**Tại sao SPA chiếm ưu thế 2015-2023:**
- UX mượt mà như mobile app
- Ít tải lại server (server chỉ cần cung cấp API)
- Offline-capable (PWA)

**Tại sao SSR đang quay lại (2024+):**
- SEO tốt hơn SPA thuần
- First load nhanh hơn (HTML đến ngay, JS hydrate sau)
- React Server Components, Next.js 14+

---

## 3. ⚙️ Core Technical Truth

### Virtual DOM — Tại sao React nhanh hơn DOM thuần

```javascript
// DOM THUẦN — Vấn đề hiệu suất

// ❌ Cập nhật DOM trực tiếp nhiều lần = slow
for (let i = 0; i < 1000; i++) {
    document.getElementById("list").innerHTML += `<li>${i}</li>`;
    // Mỗi lần innerHTML thay đổi → browser reparse, reflow, repaint
    // 1000 lần DOM cập nhật = 1000 lần browser "tính lại" layout
}

// ✅ Tốt hơn — nhưng vẫn thủ công
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    fragment.appendChild(li);
}
document.getElementById("list").appendChild(fragment);
// 1 lần DOM cập nhật — nhưng bạn phải tự làm
```

```
VIRTUAL DOM (React/Vue tự làm cho bạn)

State thay đổi
       ↓
Tạo Virtual DOM mới (JavaScript object, rất nhanh)
       ↓
So sánh Virtual DOM cũ vs mới (Diffing Algorithm)
       ↓
Tìm ra chỉ NHỮNG CHỖ THAY ĐỔI
       ↓
Cập nhật REAL DOM một cách tối thiểu

Kết quả: Bạn viết code đơn giản → React tự tối ưu DOM
```

---

### Component-Based Architecture — Tư duy LEGO

```
TRANG E-COMMERCE
────────────────────────────────────────────────────────
<App>
  <Header>          ← Component dùng lại trên mọi trang
    <Logo>
    <SearchBar>
    <CartIcon badge={cartCount}>
  </Header>

  <ProductList>     ← Render danh sách
    <ProductCard>   ← 1 card = 1 component, dùng lại N lần
    <ProductCard>   ← Truyền data khác nhau qua props
    <ProductCard>
  </ProductList>

  <Footer>
</App>

Lợi ích:
- ProductCard viết 1 lần → dùng 1000 lần
- Bug trong ProductCard → sửa 1 chỗ → fix 1000 chỗ
- Test từng component độc lập
```

```javascript
// Cách cũ — HTML template + JS tách biệt
// products.html:
// <div id="product-1">...</div>
// <div id="product-2">...</div>
// products.js:
// document.getElementById("product-1").innerHTML = ...
// ❌ Vấn đề: Tighly coupled, không tái sử dụng được

// React Component — UI + Logic + State trong 1 chỗ
function ProductCard({ name, price, imageUrl, onAddToCart }) {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <p className="price">{price.toLocaleString("vi-VN")}đ</p>
            <button onClick={() => onAddToCart({ name, price })}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

// Dùng lại với data khác nhau
<ProductCard name="iPhone 15" price={25990000} imageUrl="..." onAddToCart={handleCart} />
<ProductCard name="MacBook Air" price={32990000} imageUrl="..." onAddToCart={handleCart} />
```

---

### State — Khái niệm cốt lõi của mọi framework

```javascript
// State = Dữ liệu thay đổi theo thời gian và ảnh hưởng đến UI

// CÔNG THỨC: UI = f(State)
// Giao diện = Hàm của Dữ liệu

// Ví dụ — Không có framework:
let count = 0;  // ← State

function increment() {
    count++;
    // Phải tự cập nhật DOM thủ công!
    document.getElementById("counter").textContent = count;
}

// Với React (useState hook):
const [count, setCount] = useState(0);
// Khi setCount(count + 1) → React tự re-render component
// UI luôn phản ánh đúng state — không cần update DOM thủ công

// State types trong app thực tế:
const [isLoggedIn, setIsLoggedIn] = useState(false);  // Boolean
const [cartItems, setCartItems] = useState([]);         // Array
const [user, setUser] = useState(null);                 // Object/null
const [searchQuery, setSearchQuery] = useState("");     // String
const [isLoading, setIsLoading] = useState(false);     // Loading state

// State flow:
// User action → Update state → React re-render → UI cập nhật
```

---

### Client-Side Routing — Điều hướng không reload

```javascript
// History API — Browser native API cho SPA routing
window.history.pushState({}, "", "/products");
// URL đổi thành /products — KHÔNG reload trang!

// Simple router từ đầu (để hiểu nguyên lý)
const routes = {
    "/":         HomePage,
    "/products": ProductsPage,
    "/cart":     CartPage,
};

function navigate(path) {
    window.history.pushState({}, "", path);  // Đổi URL
    const PageComponent = routes[path] ?? routes["/"];
    render(PageComponent);                    // Render component mới
}

// React Router (thư viện): Tự động hóa tất cả điều này
// <Link to="/products"> thay vì <a href="/products">
// Không reload, có animation transitions, manage history
```

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **SPA = Load 1 lần, JavaScript thay đổi content. MPA = Mỗi trang = 1 request server = 1 lần reload.**
> **UI = f(State). Khi State thay đổi → Framework tự cập nhật UI. Bạn quản lý State, Framework quản lý DOM.**

---

## 5. 🏭 Real-world Layer

### Framework nào? React, Vue, hay Angular?

| | React | Vue | Angular |
|---|---|---|---|
| **Cha đẻ** | Meta (Facebook) | Cộng đồng | Google |
| **Loại** | UI Library | Progressive Framework | Full Framework |
| **Cú pháp** | JSX (JS + HTML) | Template (HTML + directives) | TypeScript + Templates |
| **Độ khó học** | Trung bình | Dễ nhất | Khó nhất |
| **Job market VN** | ~65% | ~20% | ~10% |
| **Dùng tốt cho** | Mọi loại app | Project vừa, team nhỏ | Enterprise |

**Khuyến nghị cho CSE391:**
- **Học React trước** — job market lớn nhất, ecosystem phong phú nhất
- Vue nếu thích syntax gần HTML hơn
- Angular nếu hướng tới doanh nghiệp

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Xây mini-SPA bằng Vanilla JS (20 phút)

```javascript
// Hiểu SPA concept trước khi học framework
// File: spa.html

const routes = {
    "#home": `
        <h1>🏠 Trang chủ</h1>
        <p>Chào mừng đến với Mini SPA</p>
        <nav>
            <a href="#products">Xem sản phẩm</a> |
            <a href="#cart">Giỏ hàng</a>
        </nav>
    `,
    "#products": `
        <h1>🛒 Sản phẩm</h1>
        <div id="product-list">
            ${["iPhone 15", "MacBook Air", "AirPods Pro"].map((name, i) => `
                <div>
                    <h3>${name}</h3>
                    <button onclick="addToCart('${name}')">Thêm vào giỏ</button>
                </div>
            `).join("")}
        </div>
        <a href="#home">← Về trang chủ</a>
    `,
    "#cart": `<h1>🛒 Giỏ hàng</h1><div id="cart-content"></div>`,
};

let cart = [];

function navigate() {
    const hash = window.location.hash || "#home";
    document.getElementById("app").innerHTML = routes[hash] || routes["#home"];

    if (hash === "#cart") {
        document.getElementById("cart-content").innerHTML = cart.length
            ? cart.map(item => `<p>✅ ${item}</p>`).join("") + `<p>Tổng: ${cart.length} sản phẩm</p>`
            : "<p>Giỏ hàng trống</p>";
    }
}

function addToCart(name) {
    cart.push(name);
    alert(`Đã thêm ${name}`);
}

window.addEventListener("hashchange", navigate);
navigate();
```

**Thực nghiệm:** Click các link — URL thay đổi không? Trang có reload không?

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"SPA luôn tốt hơn MPA"** | SPA khó SEO hơn (Google cần chờ JS render), first load chậm hơn. Với blog, e-commerce → SSR/SSG (Next.js) tốt hơn SPA thuần |
| **"Virtual DOM nhanh hơn Real DOM mọi lúc"** | Virtual DOM thêm overhead (tạo VDOM + diffing). Chỉ thực sự nhanh khi update **phức tạp và thường xuyên**. Đơn giản như counter app → DOM thuần có thể nhanh hơn |
| **"Component = File HTML riêng"** | Component = JavaScript function hoặc class. Bao gồm logic, markup (JSX/template), và styles. Không phải chỉ HTML |
| **"State là database của frontend"** | State là **tạm thời** — reload trang là mất. Database (localStorage, API) mới là persistent. State = dữ liệu UI tạm thời |
| **"React, Vue, Angular đều làm được như nhau"** | Về mặt kỹ thuật đúng. Nhưng Angular có learning curve dốc hơn nhiều, bundle lớn hơn. React ecosystem lớn nhất. Vue syntax dễ tiếp cận nhất |

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. SPA và MPA khác nhau ở điểm gì cơ bản? Cho 1 ví dụ thực tế mỗi loại.
2. Virtual DOM là gì? Tại sao React dùng Virtual DOM thay vì update Real DOM trực tiếp?
3. "UI = f(State)" có nghĩa là gì? Giải thích bằng ví dụ đơn giản.

### Câu hỏi áp dụng:

4. Bạn xây trang blog cho tác giả — chứa 200 bài viết, cần SEO tốt, không có tương tác phức tạp. Nên dùng SPA hay SSR? Tại sao?
5. Một ứng dụng có `cartCount = 5`. Khi user xóa 1 item, `cartCount` đổi thành `4`. Trong framework, bạn cần làm gì để UI badge giỏ hàng tự cập nhật?

<details>
<summary>👁️ Xem đáp án</summary>

1. **SPA**: Load HTML một lần, JavaScript thay đổi nội dung khi navigate (không reload). Ví dụ: Gmail, Facebook. **MPA**: Mỗi trang = 1 request đến server → nhận HTML mới → reload. Ví dụ: Website trường học, WordPress blog cơ bản.
2. Virtual DOM = Object JavaScript biểu diễn cấu trúc DOM. React build Virtual DOM mới mỗi lần state thay đổi, **so sánh (diff)** với Virtual DOM cũ, rồi chỉ update những phần thay đổi trong Real DOM. Ưu điểm: Bạn viết code đơn giản ("tôi muốn UI trông như này"), React tự tối ưu cách update DOM.
3. Công thức: **Giao diện = hàm của Dữ liệu**. Ví dụ: `cartCount = 3` → badge hiện "3". Khi `cartCount` đổi thành `4` → badge tự đổi thành "4". Bạn không cần viết "hãy tìm badge và đổi text". Bạn chỉ cần đổi state, UI tự cập nhật.
4. **SSR (Next.js)** — Blog cần: SEO tốt (Google index nội dung), first load nhanh (độc giả không chờ JS), ít tương tác phức tạp. SPA thuần khó SEO vì Google cần JS render trước khi thấy nội dung.
5. Chỉ cần gọi hàm cập nhật state: `setCartCount(cartCount - 1)` (React) hoặc `cartCount--` (Vue reactive). Framework tự detect thay đổi → re-render badge với giá trị mới. Bạn không cần `document.querySelector(".badge").textContent = 4`.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **SPA** = Load 1 lần, JS thay content. **MPA** = Mỗi page = 1 server round-trip. **SSR** = HTML từ server + JS hydrate
2. **Virtual DOM** = React/Vue tự tối ưu DOM updates. Bạn viết code "muốn gì", framework quyết định "làm thế nào"
3. **Component** = Reusable UI block có logic + markup + state. Xây web như LEGO
4. **State** = Dữ liệu thay đổi theo thời gian. **UI = f(State)** — đây là tư duy cốt lõi của mọi framework
5. **React** = 65% job VN. **Vue** = học nhanh hơn. **Angular** = enterprise. Học React trước

---

## 10. ➡️ Next Lesson Bridge

*"Concept rõ rồi," Minh nói. "Giờ muốn code React thật. Làm thế nào để bắt đầu?"*

*"3 lệnh," anh Hùng nói:*
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm run dev
```

*"Sau đó học JSX — HTML viết trong JavaScript. Kỳ lạ lúc đầu, quen rất nhanh."*

**→ [Bài 02: React Fundamentals & Hooks](./02_react_fundamentals_hooks.md) — JSX, Components, Props, useState, useEffect: 5 thứ cần biết để làm React.**
