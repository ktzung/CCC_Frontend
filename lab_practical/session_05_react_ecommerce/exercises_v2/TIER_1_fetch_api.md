# Tier 1 — Fetch API (Lấy dữ liệu từ API)

> **Thời gian:** 25-30 phút  
> **Yêu cầu:** Hoàn thành Tier 0 (useEffect)  
> **Mục tiêu:** Lấy dữ liệu từ API và hiển thị lên giao diện

---

## 🎯 Hôm nay bạn sẽ học

```
useEffect + fetch() = Lấy dữ liệu từ server
useState           = Lưu dữ liệu vào state
.loading           = Hiển thị "Đang tải..."
.error             = Hiển thị lỗi nếu có
```

---

## 📝 Bài 1.1 — Fetch cơ bản (10 phút)

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function BasicFetch() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        console.log("🔄 Bắt đầu lấy dữ liệu...");
        
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi mạng!");
                }
                return response.json();
            })
            .then(data => {
                console.log("✅ Đã lấy xong:", data);
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.log("❌ Lỗi:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []); // Chỉ chạy 1 lần khi mount
    
    // Hiển thị loading
    if (loading) {
        return <div style={{ padding: "20px" }}>⏳ Đang tải dữ liệu...</div>;
    }
    
    // Hiển thị lỗi
    if (error) {
        return <div style={{ padding: "20px", color: "red" }}>❌ Lỗi: {error}</div>;
    }
    
    // Hiển thị dữ liệu
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách người dùng ({users.length})</h2>
            {users.map(user => (
                <div key={user.id} style={{ 
                    padding: "10px", 
                    margin: "5px 0",
                    background: "#f9f9f9",
                    borderRadius: "4px"
                }}>
                    <strong>{user.name}</strong>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default BasicFetch;
```

### Pattern fetch với useEffect
```jsx
useEffect(() => {
    // 1. Bắt đầu loading
    setLoading(true);
    
    // 2. Gọi API
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // 3. Lưu dữ liệu
            setItems(data);
            setLoading(false);
        })
        .catch(err => {
            // 4. Xử lý lỗi
            setError(err.message);
            setLoading(false);
        });
}, []);
```

### Thử thách
1. Lấy danh sách bài viết (posts) từ API
2. Hiển thị số lượng bài viết
3. Thêm nút "Tải lại" để fetch lại dữ liệu

---

## 📝 Bài 1.2 — async/await (10 phút)

### Giải thích
async/await = Cách viết fetch "sạch hơn" (thay vì .then)

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function AsyncAwait() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Định nghĩa async function bên trong useEffect
        async function fetchPosts() {
            try {
                setLoading(true);
                
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                
                setPosts(data.slice(0, 10)); // Chỉ lấy 10 bài đầu
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchPosts(); // Gọi async function
    }, []);
    
    if (loading) return <p>⏳ Đang tải...</p>;
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Bài viết ({posts.length})</h2>
            {posts.map(post => (
                <div key={post.id} style={{ 
                    padding: "10px", 
                    margin: "10px 0",
                    border: "1px solid #ddd"
                }}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default AsyncAwait;
```

### So sánh .then vs async/await
```jsx
// Cách 1: .then (chain)
fetch(url)
    .then(res => res.json())
    .then(data => setItems(data))
    .catch(err => setError(err));

// Cách 2: async/await (thường dùng hơn)
async function fetchData() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        setItems(data);
    } catch (err) {
        setError(err);
    }
}
```

### Thử thách
1. Lấy danh sách ảnh từ API
2. Hiển thị loading spinner (thay vì text)
3. Hiển thị "Không có dữ liệu" nếu mảng rỗng

---

## 📝 Bài 1.3 — Fetch theo điều kiện (10 phút)

### Code mẫu
```jsx
import { useState, useEffect } from "react";

function ConditionalFetch() {
    const [userId, setUserId] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function fetchUserPosts() {
            setLoading(true);
            
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
                );
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUserPosts();
    }, [userId]); // Fetch lại khi userId thay đổi
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Bài viết của User #{userId}</h2>
            
            {/* Chọn user */}
            <div style={{ marginBottom: "15px" }}>
                <label>Chọn user: </label>
                {[1, 2, 3, 4, 5].map(id => (
                    <button 
                        key={id}
                        onClick={() => setUserId(id)}
                        style={{ 
                            margin: "0 5px",
                            padding: "5px 10px",
                            background: userId === id ? "#3498db" : "#f0f0f0",
                            color: userId === id ? "white" : "black"
                        }}
                    >
                        User {id}
                    </button>
                ))}
            </div>
            
            {loading ? (
                <p>⏳ Đang tải...</p>
            ) : (
                <div>
                    <p>Tìm thấy {posts.length} bài viết</p>
                    {posts.map(post => (
                        <div key={post.id} style={{ padding: "10px", margin: "5px 0", background: "#f9f9f9" }}>
                            <strong>{post.title}</strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ConditionalFetch;
```

### Thử thách
1. Tìm kiếm bài viết theo tiêu đề (input + button)
2. Phân trang (trang 1, 2, 3...)
3. Lọc bài viết theo userId

---

## ✅ Checklist

- [ ] Hiểu fetch là gì
- [ ] Sử dụng useEffect + fetch
- [ ] Xử lý loading state
- [ ] Xử lý error state
- [ ] Viết được async/await
- [ ] Fetch theo điều kiện

---

## 🎯 Tổng kết

```jsx
// Pattern fetch cơ bản
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then(data => { setData(data); setLoading(false); })
        .catch(err => { setError(err); setLoading(false); });
}, []);
```

**← Quay lại: [Tier 0 — useEffect](TIER_0_useEffect.md)**  
**→ Tiếp theo: [Tier 2 — Hiển thị sản phẩm](TIER_2_product_list.md)**
