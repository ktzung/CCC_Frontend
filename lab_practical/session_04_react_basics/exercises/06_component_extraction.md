# Exercise 0.6 — Component Extraction: Tách HTML thành Component

## 🎬 Bối cảnh

*Ở Bài 0.5, Minh đã viết `PortfolioHero`, `ProjectCard`, `ProjectList` — nhưng tất cả code vẫn nằm trong một file HTML với CDN. Giờ bạn ấy muốn chuyển sang dự án thật với Vite + React. Trước khi tạo project, cần học cách **tách UI lớn thành component nhỏ, có tổ chức**.*

*Bài này dùng ShopVN làm "bài tập luyện" để nắm vững kỹ năng tách component. Kỹ năng này sẽ áp dụng ngay cho Portfolio ở [Bài 0.1](./01_react_setup.md).*

> 🔗 **Kết nối trực tiếp:** Component `Navbar`, `Hero`, `Footer` trong bài này **cùng cấu trúc** với Header, Hero, Footer trong Portfolio (Bài 0.1). Component `ProductCard` tương tự `ProjectCard` bạn đã viết ở Bài 0.5.

---

## 📋 Yêu cầu

### Phần A — Nhận diện Component (10 phút)

Cho đoạn JSX sau, hãy **vẽ sơ đồ** (trên giấy hoặc file `component_tree.md`) xác định:
- Mỗi component có thể tái sử dụng ở đâu?
- Component nào nhận props?
- Component nào lồng trong component nào?

```jsx
function App() {
    return (
        <div>
            <nav>
                <a href="/">Logo</a>
                <a href="/about">Giới thiệu</a>
                <a href="/products">Sản phẩm</a>
                <a href="/contact">Liên hệ</a>
            </nav>

            <section>
                <h1>Chào mừng đến với ShopVN</h1>
                <p>Nơi mua sắm trực tuyến uy tín</p>
                <button>Mua ngay</button>
            </section>

            <section>
                <div>
                    <img src="product1.jpg" alt="Áo thun" />
                    <h3>Áo thun nam</h3>
                    <p>250.000đ</p>
                    <button>Thêm vào giỏ</button>
                </div>
                <div>
                    <img src="product2.jpg" alt="Quần jean" />
                    <h3>Quần jean nữ</h3>
                    <p>450.000đ</p>
                    <button>Thêm vào giỏ</button>
                </div>
                <div>
                    <img src="product3.jpg" alt="Giày sneaker" />
                    <h3>Giày sneaker</h3>
                    <p>890.000đ</p>
                    <button>Thêm vào giỏ</button>
                </div>
            </section>

            <footer>
                <p>© 2026 ShopVN. All rights reserved.</p>
            </footer>
        </div>
    );
}
```

### 🎯 Hoàn thành file `component_tree.md` với:
1. Sơ đồ cây component (dùng text hoặc Mermaid)
2. Danh sách props mỗi component cần
3. Giải thích tại sao tách ra (lý do nào?)

---

### Phần B — Thực hành tách Component (25 phút)

Tạo file `shop_components.html` — **tách component từ code ở Phần A**:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>ShopVN — Component Architecture</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; }

        /* Navbar */
        .navbar { background: #2c3e50; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .navbar .logo { color: #3498db; font-size: 1.5rem; font-weight: bold; text-decoration: none; }
        .navbar .nav-links { display: flex; gap: 1.5rem; }
        .navbar .nav-links a { color: white; text-decoration: none; }

        /* Hero */
        .hero { background: linear-gradient(135deg, #3498db, #2c3e50); color: white; text-align: center; padding: 4rem 2rem; }
        .hero h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 1.5rem; opacity: 0.9; }
        .hero button { padding: 12px 30px; background: #e74c3c; color: white; border: none; border-radius: 25px; font-size: 1rem; cursor: pointer; }

        /* Product Grid */
        .products { padding: 2rem; max-width: 1000px; margin: 0 auto; }
        .products h2 { text-align: center; margin-bottom: 1.5rem; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
        .product-card { border: 1px solid #ddd; border-radius: 12px; overflow: hidden; transition: transform 0.3s; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .product-card img { width: 100%; height: 200px; object-fit: cover; }
        .product-card .info { padding: 1rem; }
        .product-card h3 { margin-bottom: 0.3rem; }
        .product-card .price { color: #e74c3c; font-weight: bold; margin-bottom: 0.8rem; }
        .product-card button { width: 100%; padding: 8px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; }

        /* Footer */
        footer { background: #2c3e50; color: white; text-align: center; padding: 1.5rem; margin-top: 2rem; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // ============================================
        // TODO 1: Component Navbar
        // - Props: logo, links (mảng {label, href})
        // - Render nav với logo và danh sách link
        // ============================================
        function Navbar({ logo, links }) {
            // TODO
        }

        // ============================================
        // TODO 2: Component Hero
        // - Props: title, subtitle, buttonText
        // - Render hero section
        // ============================================
        function Hero({ title, subtitle, buttonText }) {
            // TODO
        }

        // ============================================
        // TODO 3: Component ProductCard
        // - Props: image, name, price
        // - Render 1 product card
        // ============================================
        function ProductCard({ image, name, price }) {
            // TODO
        }

        // ============================================
        // TODO 4: Component ProductGrid
        // - Props: products (mảng), title
        // - Render tiêu đề + grid ProductCard
        // - Nếu products rỗng: hiện "Chưa có sản phẩm"
        // ============================================
        function ProductGrid({ products, title }) {
            // TODO
        }

        // ============================================
        // TODO 5: Component Footer
        // - Props: text
        // - Render footer
        // ============================================
        function Footer({ text }) {
            // TODO
        }

        // ============================================
        // TODO 6: Component App — Compose tất cả
        // ============================================
        function App() {
            const navLinks = [
                { label: 'Giới thiệu', href: '#about' },
                { label: 'Sản phẩm', href: '#products' },
                { label: 'Liên hệ', href: '#contact' },
            ];

            const products = [
                { id: 1, name: 'Áo thun nam', price: '250.000đ', image: 'https://picsum.photos/300/200?random=1' },
                { id: 2, name: 'Quần jean nữ', price: '450.000đ', image: 'https://picsum.photos/300/200?random=2' },
                { id: 3, name: 'Giày sneaker', price: '890.000đ', image: 'https://picsum.photos/300/200?random=3' },
                { id: 4, name: 'Túi xách', price: '350.000đ', image: 'https://picsum.photos/300/200?random=4' },
            ];

            return (
                <div>
                    {/* TODO: Render Navbar */}
                    {/* TODO: Render Hero */}
                    {/* TODO: Render ProductGrid */}
                    {/* TODO: Render Footer */}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
```

---

## 💡 Bài học cốt lõi: Component Thinking

### Trước khi tách (Anti-pattern)
```
App ──────────────────────────────────────── 100% code
├── Navbar code (inline)
├── Hero code (inline)
├── Product code (inline, repeated 4 lần)
└── Footer code (inline)
```

### Sau khi tách (Component Architecture)
```
App ──────── chỉ compose, không logic ─────── 10% code
├── Navbar ── tái sử dụng ở mọi trang ─────── 15% code
├── Hero ──── thay title/subtitle bằng props ─ 15% code
├── ProductGrid
│   └── ProductCard ── dùng cho mọi sản phẩm ─ 30% code
└── Footer ── tái sử dụng ở mọi trang ─────── 10% code
```

### Quy tắc "một component, một việc"

| Component | Nhiệm vụ | Khi nào tách? |
|-----------|-----------|---------------|
| `Navbar` | Hiển thị thanh điều hướng | Dùng ở nhiều trang |
| `ProductCard` | Hiển thị 1 sản phẩm | Lặp lại trong list |
| `ProductGrid` | Quản lý layout grid | Tách logic layout ra |
| `Footer` | Hiển thị chân trang | Dùng ở nhiều trang |

---

## ✅ Tiêu chí đạt bài

### Phần A (`component_tree.md`)
- [ ] Sơ đồ cây component chính xác
- [ ] Xác định được props cho mỗi component
- [ ] Giải thích được lý do tách (tái sử dụng, dễ bảo trì)

### Phần B (`shop_components.html`)
- [ ] `Navbar` render từ props links[]
- [ ] `Hero` render title, subtitle, buttonText
- [ ] `ProductCard` render 1 sản phẩm
- [ ] `ProductGrid` dùng `.map()` render ProductCard
- [ ] Xử lý mảng rỗng (empty state)
- [ ] `App` chỉ compose, không chứa logic render chi tiết

---

## 🔑 Gợi ý

<details>
<summary>Click để xem gợi ý component tree</summary>

```
App
├── Navbar { logo: string, links: [{label, href}] }
├── Hero { title: string, subtitle: string, buttonText: string }
├── ProductGrid { title: string, products: [{id, name, price, image}] }
│   └── ProductCard { name: string, price: string, image: string }
└── Footer { text: string }
```

**Lý do tách:**
- `ProductCard`: Dùng `.map()` → mỗi sản phẩm là 1 instance, sửa 1 chỗ = sửa tất cả
- `Navbar`: Trang nào cũng có navbar, tách ra để tái sử dụng
- `ProductGrid`: Tách logic layout (grid) khỏi logic hiển thị (card)
</details>

<details>
<summary>Click để xem gợi ý ProductCard</summary>

```jsx
function ProductCard({ image, name, price }) {
    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <div className="info">
                <h3>{name}</h3>
                <p className="price">{price}</p>
                <button>Thêm vào giỏ</button>
            </div>
        </div>
    );
}
```
</details>

<details>
<summary>Click để xem gợi ý App</summary>

```jsx
function App() {
    // ... data ở trên ...
    return (
        <div>
            <Navbar logo="ShopVN" links={navLinks} />
            <Hero title="Chào mừng đến với ShopVN" subtitle="Nơi mua sắm trực tuyến uy tín" buttonText="Mua ngay" />
            <ProductGrid title="Sản phẩm nổi bật" products={products} />
            <Footer text="© 2026 ShopVN. All rights reserved." />
        </div>
    );
}
```
</details>

---

## 📝 Ghi chú cho giảng viên

> **Bài này là "bài tập luyện" trước khi vào dự án thật.** ShopVN giúp sinh viên hiểu nguyên tắc tách component mà không bị áp lực "phải đẹp".
>
> **Sau bài này, sinh viên sẽ:**
> - Biết cách đọc JSX và xác định ranh giới component
> - Hiểu props flow: data đi từ parent → child
> - Sẵn sàng tạo Portfolio project với Vite ở Bài 0.1
>
> **Câu hỏi thảo luận:** "Tại sao `ProductGrid` là component riêng, mà `product-grid` (div) chỉ là HTML? Khi nào một `<div>` trở thành component?"

---

**← [Bài 0.5 — JSX Basics](./05_jsx_basics.md) | → [Bài 0.1 — React Setup với Vite](./01_react_setup.md)**
