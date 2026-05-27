# Tier 3 — Chia Component (Tư duy tổ chức giao diện)

> **Thời gian:** 25-35 phút  
> **Yêu cầu:** Hoàn thành Tier 0-2  
> **Mục tiêu:** Học cách chia giao diện thành các component nhỏ, tái sử dụng

---

## 🎯 Hôm nay bạn sẽ học

```
Giao diện lớn = Nhiều component nhỏ ghép lại

Ví dụ: Trang web = Header + Content + Footer
       Content = Sidebar + MainContent
       MainContent = ProductCard + ProductCard + ProductCard
```

---

## 📝 Bài 3.1 — Tại sao phải chia? (10 phút)

### Vấn đề: Code quá dài, khó bảo trì

```jsx
// ❌ KHÔNG NÊN: Tất cả trong 1 file
function App() {
    return (
        <div>
            {/* Header — 20 dòng */}
            <header style={{...}}>
                <h1>Tên website</h1>
                <nav>
                    <a href="/">Trang chủ</a>
                    <a href="/about">Giới thiệu</a>
                    <a href="/contact">Liên hệ</a>
                </nav>
            </header>
            
            {/* Content — 50 dòng */}
            <main>
                <h2>Sản phẩm</h2>
                <div className="products">
                    <div className="product-card">
                        <img src="..." />
                        <h3>Sản phẩm 1</h3>
                        <p>Giá: 100.000đ</p>
                        <button>Mua</button>
                    </div>
                    <div className="product-card">
                        <img src="..." />
                        <h3>Sản phẩm 2</h3>
                        <p>Giá: 200.000đ</p>
                        <button>Mua</button>
                    </div>
                    {/* ... nhiều sản phẩm nữa */}
                </div>
            </main>
            
            {/* Footer — 15 dòng */}
            <footer>
                <p>© 2026 Tên công ty</p>
            </footer>
        </div>
    );
}
```

### Giải pháp: Chia nhỏ component

```jsx
// ✅ NÊN: Chia thành nhiều component nhỏ

// Header.jsx
function Header() {
    return (
        <header>
            <h1>Tên website</h1>
            <nav>
                <a href="/">Trang chủ</a>
                <a href="/about">Giới thiệu</a>
            </nav>
        </header>
    );
}

// ProductCard.jsx
function ProductCard() {
    return (
        <div className="product-card">
            <img src="..." />
            <h3>Tên sản phẩm</h3>
            <p>Giá: ...</p>
            <button>Mua</button>
        </div>
    );
}

// Footer.jsx
function Footer() {
    return (
        <footer>
            <p>© 2026 Tên công ty</p>
        </footer>
    );
}

// App.jsx — Ghép các component lại
function App() {
    return (
        <div>
            <Header />
            <main>
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </main>
            <Footer />
        </div>
    );
}
```

### Lợi ích
| Không chia | Có chia |
|-----------|---------|
| File dài 100+ dòng | Mỗi file 20-30 dòng |
| Khó tìm code | Dễ tìm, dễ sửa |
| Copy-paste nhiều lần | Tái sử dụng component |
| Khó làm việc nhóm | Mỗi người làm 1 component |

---

## 📝 Bài 3.2 — Bài tập chia component (15 phút)

### Bài tập 1: Chia Card sản phẩm

**Yêu cầu:** Tách component `ProductCard` ra file riêng

```
📁 src/
├── components/
│   └── ProductCard.jsx    ← Component con
├── App.jsx                ← Component cha
└── main.jsx
```

**ProductCard.jsx:**
```jsx
function ProductCard({ name, price, image }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            padding: "15px",
            margin: "10px"
        }}>
            <img src={image} alt={name} style={{ width: "100%", borderRadius: "4px" }} />
            <h3>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold" }}>{price}đ</p>
            <button style={{ 
                background: "#3498db", 
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
            }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

export default ProductCard;
```

**App.jsx:**
```jsx
import ProductCard from "./components/ProductCard";

function App() {
    const products = [
        { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200" },
        { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200" },
        { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" }
    ];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Cửa hàng điện thoại</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
```

### Bài tập 2: Chia trang web

**Yêu cầu:** Tách `Header`, `Footer` ra file riêng

```
📁 src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── App.jsx
└── main.jsx
```

---

## 📝 Bài 3.3 — Props: Truyền dữ liệu từ cha → con (10 phút)

### Giải thích
Props = "thông tin" truyền từ component cha xuống component con

```jsx
// Component con (nhận props)
function Greeting({ name, age }) {
    return (
        <div>
            <h2>Xin chào {name}!</h2>
            <p>Tuổi: {age}</p>
        </div>
    );
}

// Component cha (truyền props)
function App() {
    return (
        <div>
            <Greeting name="Minh" age={20} />
            <Greeting name="An" age={21} />
            <Greeting name="Linh" age={19} />
        </div>
    );
}
```

### Props có thể là gì?
```jsx
// String
<Greeting name="Minh" />

// Number
<Greeting age={20} />

// Boolean
<Greeting isStudent={true} />

// Array
<Greeting hobbies={["Đọc sách", "Code"]} />

// Object
<Greeting address={{ city: "Hà Nội", district: "Cầu Giấy" }} />

// Function (sẽ học sau)
<Greeting onClick={() => console.log("clicked")} />
```

### Thử thách
1. Tạo component `UserCard` nhận props: name, email, avatar
2. Tạo component `PriceTag` nhận props: originalPrice, salePrice
3. Hiển thị 3 UserCard với dữ liệu khác nhau

---

## ✅ Checklist

- [ ] Hiểu tại sao phải chia component
- [ ] Tách component ra file riêng
- [ ] Import/Export component
- [ ] Truyền props từ cha → con
- [ ] Nhận props bằng destructuring `{ name, age }`

---

## 🎯 Tổng kết

```
1. Chia UI thành component nhỏ
2. Mỗi component = 1 file riêng
3. Truyền dữ liệu bằng props
4. Component con nhận props: function Component({ prop1, prop2 })
```

**← Quay lại: [Tier 2 — JSX Variables](TIER_2_jsx_variables.md)**  
**→ Tiếp theo: [Tier 4 — useState cơ bản](TIER_4_useState_basics.md)**
