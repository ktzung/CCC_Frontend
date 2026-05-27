# Tier 2 — Hiển thị danh sách sản phẩm

> **Thời gian:** 25-30 phút  
> **Yêu cầu:** Hoàn thành Tier 0-1  
> **Mục tiêu:** Hiển thị sản phẩm từ API với giao diện đẹp

---

## 🎯 Hôm nay bạn sẽ học

```
Fetch API → Lưu vào state → Render danh sách sản phẩm
```

---

## 📝 Bài 2.1 — Danh sách sản phẩm (15 phút)

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchProducts() {
            try {
                // FakeStore API — miễn phí, không cần key
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProducts();
    }, []);
    
    if (loading) return <p style={{ textAlign: "center" }}>⏳ Đang tải sản phẩm...</p>;
    
    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ textAlign: "center" }}>🛍️ Cửa hàng</h1>
            <p style={{ textAlign: "center" }}>{products.length} sản phẩm</p>
            
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px"
            }}>
                {products.map(product => (
                    <div key={product.id} style={{ 
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "15px",
                        textAlign: "center"
                    }}>
                        <img 
                            src={product.image} 
                            alt={product.title}
                            style={{ height: "150px", objectFit: "contain" }}
                        />
                        <h3 style={{ fontSize: "14px", margin: "10px 0" }}>
                            {product.title.substring(0, 50)}...
                        </h3>
                        <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "18px" }}>
                            ${product.price}
                        </p>
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
                ))}
            </div>
        </div>
    );
}

export default ProductList;
```

### Thử thách
1. Hiển thị rating (⭐) cho mỗi sản phẩm
2. Hiển thị danh mục (category) cho mỗi sản phẩm
3. Thêm nút "Xem chi tiết"

---

## 📝 Bài 2.2 — Tìm kiếm & Lọc (15 phút)

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function ProductFilter() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProducts();
    }, []);
    
    // Lấy danh sách category duy nhất
    const categories = ["all", ...new Set(products.map(p => p.category))];
    
    // Lọc sản phẩm
    const filteredProducts = products.filter(product => {
        const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "all" || product.category === category;
        return matchSearch && matchCategory;
    });
    
    if (loading) return <p>⏳ Đang tải...</p>;
    
    return (
        <div style={{ padding: "20px" }}>
            <h1>🛍️ Sản phẩm</h1>
            
            {/* Tìm kiếm */}
            <div style={{ marginBottom: "15px" }}>
                <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="🔍 Tìm kiếm sản phẩm..."
                    style={{ padding: "8px", width: "300px" }}
                />
            </div>
            
            {/* Lọc category */}
            <div style={{ marginBottom: "15px" }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{ 
                            margin: "0 5px",
                            padding: "5px 10px",
                            background: category === cat ? "#3498db" : "#f0f0f0",
                            color: category === cat ? "white" : "black",
                            border: "none",
                            borderRadius: "4px"
                        }}
                    >
                        {cat === "all" ? "Tất cả" : cat}
                    </button>
                ))}
            </div>
            
            {/* Kết quả */}
            <p>Tìm thấy {filteredProducts.length} sản phẩm</p>
            
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "15px"
            }}>
                {filteredProducts.map(product => (
                    <div key={product.id} style={{ 
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px"
                    }}>
                        <img src={product.image} alt={product.title} style={{ height: "100px", objectFit: "contain" }} />
                        <p>{product.title.substring(0, 30)}...</p>
                        <strong>${product.price}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;
```

### Thử thách
1. Sắp xếp theo giá (tăng/giảm)
2. Lọc theo khoảng giá (min, max)
3. Hiển thị "Không tìm thấy" khi không có kết quả

---

## ✅ Checklist

- [ ] Fetch danh sách sản phẩm từ API
- [ ] Hiển thị sản phẩm với CSS Grid
- [ ] Tìm kiếm theo tên
- [ ] Lọc theo category
- [ ] Hiển thị số kết quả

---

## 🎯 Tổng kết

```
API → fetch() → state → filter → render
                     ↑
              search, category
```

**← Quay lại: [Tier 1 — Fetch API](TIER_1_fetch_api.md)**  
**→ Tiếp theo: [Tier 3 — React Router](TIER_3_react_router.md)**
