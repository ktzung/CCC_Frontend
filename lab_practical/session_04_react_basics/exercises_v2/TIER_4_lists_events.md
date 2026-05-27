# Tier 4 — Lists & Events (Danh sách & Xử lý sự kiện)

> **Thời gian:** 40-50 phút  
> **Yêu cầu:** Hoàn thành Tier 1-3  
> **Mục tiêu:** Render danh sách động, xử lý sự kiện, thêm/xóa phần tử

---

## 🎬 Bối cảnh

*Minh đã biết dùng useState với số đếm, text, toggle. Giờ bạn ấy muốn làm điều thực tế hơn: quản lý danh sách — giống Notes App ở Tier 7 JavaScript, nhưng bằng React. Đây là bước đệm trước khi làm Todo App!*

---

## 📝 Bài 4.1 — Render danh sách (10 phút)

### Giải thích
Dùng `.map()` để render mảng thành JSX — giống Tier 4 JavaScript

### Code mẫu — `StudentList.jsx`
```jsx
import { useState } from "react";

function StudentList() {
    const [students] = useState([
        { id: 1, name: "Minh", age: 20, grade: "A" },
        { id: 2, name: "An", age: 21, grade: "B" },
        { id: 3, name: "Linh", age: 19, grade: "A" },
        { id: 4, name: "Hoa", age: 20, grade: "C" }
    ]);
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sinh viên ({students.length})</h2>
            
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f0f0f0" }}>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>STT</th>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Tên</th>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Tuổi</th>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                {index + 1}
                            </td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                {student.name}
                            </td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                {student.age}
                            </td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                {student.grade}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
```

### Quy tắc quan trọng: `key`
```jsx
// key giúp React nhận biết phần tử nào thay đổi
{items.map(item => (
    <div key={item.id}>   {/* Dùng id, KHÔNG dùng index nếu có thể */}
        {item.name}
    </div>
))}

// Tại sao cần key?
// - React cần biết phần tử nào thêm/xóa/sửa
// - Nếu không có key, React render lại toàn bộ (chậm)
// - key phải DU NHẤT trong danh sách
```

### Thử thách
1. Thêm cột "Hành động" với nút "Xem chi tiết"
2. Hiển thị sinh viên có grade "A" bằng màu xanh
3. Tính và hiển thị tuổi trung bình

---

## 📝 Bài 4.2 — Thêm phần tử (10 phút)

### Giải thích
Thêm phần tử vào mảng trong state — dùng spread operator

### Code mẫu — `AddStudent.jsx`
```jsx
import { useState } from "react";

function AddStudent() {
    const [students, setStudents] = useState([
        { id: 1, name: "Minh", age: 20 }
    ]);
    
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    
    function handleAdd() {
        if (newName.trim() === "" || newAge === "") return;
        
        // Tạo sinh viên mới
        const newStudent = {
            id: Date.now(),      // Tạo id duy nhất
            name: newName,
            age: parseInt(newAge)
        };
        
        // Thêm vào mảng (tạo mảng MỚI)
        setStudents([...students, newStudent]);
        
        // Reset input
        setNewName("");
        setNewAge("");
    }
    
    // Xử lý nhấn Enter
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm sinh viên</h2>
            
            <div style={{ marginBottom: "20px" }}>
                <input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tên..."
                    style={{ padding: "8px", marginRight: "10px" }}
                />
                <input 
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tuổi"
                    style={{ padding: "8px", marginRight: "10px", width: "80px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
                    ➕ Thêm
                </button>
            </div>
            
            <h3>Danh sách ({students.length} sinh viên):</h3>
            {students.map(student => (
                <div key={student.id} style={{ 
                    padding: "8px", 
                    borderBottom: "1px solid #eee" 
                }}>
                    {student.name} - {student.age} tuổi
                </div>
            ))}
        </div>
    );
}

export default AddStudent;
```

### Pattern thêm phần tử
```jsx
// Cách thêm vào mảng trong state
setStudents([...students, newStudent]);
//           ↑ Copy mảng cũ  ↑ Thêm mới

// Thêm vào đầu mảng
setStudents([newStudent, ...students]);

// Thêm nhiều phần tử
setStudents([...students, student1, student2]);
```

### Thử thách
1. Validate: không cho thêm nếu tên trống hoặc tuổi < 0
2. Hiển thị thông báo "Đã thêm thành công!"
3. Focus lại vào input sau khi thêm

---

## 📝 Bài 4.3 — Xóa phần tử (10 phút)

### Giải thích
Xóa phần tử = tạo mảng mới không chứa phần tử cần xóa

### Code mẫu — `DeleteStudent.jsx`
```jsx
import { useState } from "react";

function DeleteStudent() {
    const [students, setStudents] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    // Xóa theo id
    function handleDelete(id) {
        // Lọc bỏ phần tử có id trùng
        setStudents(students.filter(student => student.id !== id));
    }
    
    // Xóa tất cả
    function handleDeleteAll() {
        if (window.confirm("Xóa tất cả sinh viên?")) {
            setStudents([]);
        }
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sinh viên</h2>
            
            {students.length > 0 && (
                <button 
                    onClick={handleDeleteAll}
                    style={{ 
                        marginBottom: "10px", 
                        background: "#e74c3c", 
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px"
                    }}
                >
                    🗑 Xóa tất cả
                </button>
            )}
            
            {students.length === 0 ? (
                <p style={{ color: "#999" }}>Chưa có sinh viên nào</p>
            ) : (
                students.map(student => (
                    <div key={student.id} style={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        margin: "5px 0",
                        background: "#f9f9f9",
                        borderRadius: "4px"
                    }}>
                        <span>{student.name} - {student.age} tuổi</span>
                        <button 
                            onClick={() => handleDelete(student.id)}
                            style={{ 
                                background: "#e74c3c", 
                                color: "white",
                                border: "none",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer"
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

export default DeleteStudent;
```

### Pattern xóa phần tử
```jsx
// Xóa theo id
setStudents(students.filter(s => s.id !== idToDelete));

// Xóa theo index
const newList = [...students];
newList.splice(index, 1);
setStudents(newList);

// Xóa phần tử cuối
setStudents(students.slice(0, -1));
```

### Thử thách
1. Hiển thị "Đã xóa [tên]" sau khi xóa
2. Thêm nút "Hoàn tác" (undo) trong 5 giây
3. Chỉ cho xóa khi nhấn giữ 2 giây (hoặc confirm)

---

## 📝 Bài 4.4 — Sửa phần tử (Inline Edit) (15 phút)

### Giải thích
Sửa phần tử = tạo mảng mới với phần tử đã được cập nhật

### Code mẫu — `EditStudent.jsx`
```jsx
import { useState } from "react";

function EditStudent() {
    const [students, setStudents] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    
    // Bắt đầu sửa
    function startEdit(student) {
        setEditingId(student.id);
        setEditName(student.name);
        setEditAge(student.age.toString());
    }
    
    // Lưu sửa
    function saveEdit() {
        if (editName.trim() === "" || editAge === "") return;
        
        setStudents(students.map(student => 
            student.id === editingId 
                ? { ...student, name: editName, age: parseInt(editAge) }
                : student
        ));
        
        setEditingId(null); // Thoát chế độ sửa
    }
    
    // Hủy sửa
    function cancelEdit() {
        setEditingId(null);
    }
    
    // Xử lý phím Enter/Escape
    function handleKeyPress(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Sửa thông tin sinh viên</h2>
            
            {students.map(student => (
                <div key={student.id} style={{ 
                    padding: "10px", 
                    margin: "5px 0",
                    background: "#f9f9f9",
                    borderRadius: "4px"
                }}>
                    {editingId === student.id ? (
                        // Chế độ sửa
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <input 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{ padding: "4px 8px" }}
                                autoFocus
                            />
                            <input 
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{ padding: "4px 8px", width: "60px" }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}>
                                ✓ Lưu
                            </button>
                            <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}>
                                ✕ Hủy
                            </button>
                        </div>
                    ) : (
                        // Chế độ xem
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{student.name} - {student.age} tuổi</span>
                            <button onClick={() => startEdit(student)} style={{ background: "#3498db", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default EditStudent;
```

### Pattern sửa phần tử
```jsx
// Cập nhật phần tử theo id
setStudents(students.map(student => 
    student.id === idToUpdate 
        ? { ...student, name: "Tên mới" }  // Cập nhật
        : student                            // Giữ nguyên
));
```

### Thử thách
1. Highlight ô input khi đang sửa
2. Không cho lưu nếu tên trống
3. Hiển thị "Đã lưu!" sau khi sửa thành công

---

## ✅ Checklist hoàn thành

- [ ] Render danh sách với `.map()` và `key`
- [ ] Thêm phần tử vào mảng state
- [ ] Xóa phần tử khỏi mảng state
- [ ] Sửa phần tử trong mảng state
- [ ] Xử lý sự kiện onClick, onChange
- [ ] Xử lý phím Enter, Escape

---

## 🎯 Tổng kết: CRUD với React

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

**← Quay lại: [Tier 3 — useState](TIER_3_useState_basics.md)**  
**→ Tiếp theo: [Tier 5 — Mini Project: Todo App](TIER_5_todo_app.md)**
