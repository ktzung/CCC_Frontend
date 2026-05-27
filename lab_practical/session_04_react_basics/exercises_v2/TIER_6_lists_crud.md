# Tier 6 — Lists & CRUD (Danh sách và Thêm/Sửa/Xóa)

> **Thời gian:** 40-50 phút  
> **Yêu cầu:** Hoàn thành Tier 0-5  
> **Mục tiêu:** Quản lý danh sách động với CRUD operations

---

## 🎯 Hôm nay bạn sẽ học

```jsx
// CREATE — Thêm
setItems([...items, newItem]);

// READ — Đọc (render)
{items.map(item => <div key={item.id}>{item.name}</div>)}

// UPDATE — Sửa
setItems(items.map(item => 
    item.id === id ? { ...item, name: "new" } : item
));

// DELETE — Xóa
setItems(items.filter(item => item.id !== id));
```

---

## 📝 Bài 6.1 — Render danh sách (8 phút)

### Code mẫu
```jsx
import { useState } from "react";

function ListBasics() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);
    
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách trái cây</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <h2>Danh sách sinh viên</h2>
            {students.map(student => (
                <div key={student.id} style={{ 
                    padding: "8px", 
                    margin: "5px 0",
                    background: "#f9f9f9"
                }}>
                    {student.name} - {student.age} tuổi
                </div>
            ))}
        </div>
    );
}

export default ListBasics;
```

### Thử thách
1. Hiển thị STT cho mỗi sinh viên
2. Hiển thị sinh viên tuổi >= 20 bằng màu xanh
3. Tính và hiển thị tuổi trung bình

---

## 📝 Bài 6.2 — Thêm phần tử (CREATE) (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    
    function handleAdd() {
        if (newName.trim() === "") return;
        
        const newItem = {
            id: Date.now(),  // Tạo id duy nhất
            name: newName
        };
        
        setItems([...items, newItem]);  // Thêm vào mảng
        setNewName("");                  // Xóa input
    }
    
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm môn học</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", marginRight: "10px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
                    ➕ Thêm
                </button>
            </div>
            
            <h3>Danh sách ({items.length} môn):</h3>
            {items.map(item => (
                <div key={item.id} style={{ 
                    padding: "8px", 
                    borderBottom: "1px solid #eee" 
                }}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default CreateItem;
```

### Pattern thêm phần tử
```jsx
// Thêm vào cuối
setItems([...items, newItem]);

// Thêm vào đầu
setItems([newItem, ...items]);
```

### Thử thách
1. Validate: không cho thêm nếu tên trống
2. Hiển thị "Đã thêm thành công!" sau khi thêm
3. Focus lại vào input sau khi thêm

---

## 📝 Bài 6.3 — Xóa phần tử (DELETE) (10 phút)

### Code mẫu
```jsx
import { useState } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    
    function handleDelete(id) {
        setItems(items.filter(item => item.id !== id));
    }
    
    function handleDeleteAll() {
        if (window.confirm("Xóa tất cả?")) {
            setItems([]);
        }
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Xóa sinh viên</h2>
            
            {items.length > 0 && (
                <button 
                    onClick={handleDeleteAll}
                    style={{ 
                        marginBottom: "10px", 
                        background: "#e74c3c", 
                        color: "white",
                        padding: "8px 16px",
                        border: "none"
                    }}
                >
                    🗑 Xóa tất cả
                </button>
            )}
            
            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Danh sách trống</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        margin: "5px 0",
                        background: "#f9f9f9"
                    }}>
                        <span>{item.name}</span>
                        <button 
                            onClick={() => handleDelete(item.id)}
                            style={{ 
                                background: "#e74c3c", 
                                color: "white",
                                border: "none",
                                padding: "4px 8px"
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeleteItem;
```

### Pattern xóa phần tử
```jsx
// Xóa theo id
setItems(items.filter(item => item.id !== idToDelete));
```

### Thử thách
1. Hiển thị "Đã xóa [tên]" sau khi xóa
2. Thêm nút "Hoàn tác" trong 5 giây
3. Chỉ cho xóa khi confirm

---

## 📝 Bài 6.4 — Sửa phần tử (UPDATE) (15 phút)

### Code mẫu
```jsx
import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    
    // Bắt đầu sửa
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
    }
    
    // Lưu sửa
    function saveEdit() {
        if (editName.trim() === "" || editAge === "") return;
        
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName, age: parseInt(editAge) }
                : item
        ));
        
        setEditingId(null); // Thoát chế độ sửa
    }
    
    // Hủy sửa
    function cancelEdit() {
        setEditingId(null);
    }
    
    // Xử lý phím
    function handleKeyPress(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Sửa thông tin</h2>
            
            {items.map(item => (
                <div key={item.id} style={{ 
                    padding: "10px", 
                    margin: "5px 0",
                    background: "#f9f9f9"
                }}>
                    {editingId === item.id ? (
                        // Chế độ sửa
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                autoFocus
                                style={{ padding: "4px" }}
                            />
                            <input 
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{ padding: "4px", width: "60px" }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "4px 8px" }}>
                                ✓ Lưu
                            </button>
                            <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "4px 8px" }}>
                                ✕ Hủy
                            </button>
                        </div>
                    ) : (
                        // Chế độ xem
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "4px 8px" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;
```

### Pattern sửa phần tử
```jsx
// Cập nhật phần tử theo id
setItems(items.map(item => 
    item.id === idToUpdate 
        ? { ...item, name: "Tên mới" }  // Cập nhật
        : item                            // Giữ nguyên
));
```

### Thử thách
1. Highlight ô input khi đang sửa
2. Không cho lưu nếu tên trống
3. Hiển thị "Đã lưu!" sau khi sửa

---

## ✅ Checklist

- [ ] Render danh sách với .map() và key
- [ ] Thêm phần tử (CREATE)
- [ ] Xóa phần tử (DELETE)
- [ ] Sửa phần tử inline (UPDATE)
- [ ] Xử lý phím Enter, Escape

---

## 🎯 Tổng kết CRUD

```jsx
// CREATE — Thêm
setItems([...items, newItem]);

// READ — Đọc
{items.map(item => <div key={item.id}>{item.name}</div>)}

// UPDATE — Sửa
setItems(items.map(item => 
    item.id === id ? { ...item, name: "new" } : item
));

// DELETE — Xóa
setItems(items.filter(item => item.id !== id));
```

**← Quay lại: [Tier 5 — Events](TIER_5_events_basics.md)**  
**→ Tiếp theo: [Tier 7 — Mini Project: Todo App](TIER_7_todo_app.md)**
