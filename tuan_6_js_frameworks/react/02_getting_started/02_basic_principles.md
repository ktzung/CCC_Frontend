# 🟢 Bài 2: React Basic Principles — Props, State, Events & Conditional Rendering

> **⏱ Thời lượng:** 120 phút | **🎯 Trình độ:** Cơ bản | **📋 Yêu cầu:** Đã biết tạo project React + JSX cơ bản

---

## 🎬 Mở đầu — "Làm sao để component biết được dữ liệu?"

Minh vừa tạo xong component `<TheHocSinh />` hiển thị tên và điểm. Nhưng cậu gặp vấn đề:

```
❌ Component hiển thị cứng tên "Minh" — muốn dùng cho học sinh khác thì sao?
❌ Nhập điểm mới nhưng giao diện không cập nhật — phải F5 trình duyệt!
❌ Click nút "Đăng ký" nhưng không biết khi nào form hợp lệ...
```

> 💡 *"Cần cho component 'cách nhận dữ liệu từ bên ngoài' và 'cách tự thay đổi khi có sự kiện'..."*

Đó chính là **Props** và **State** — hai trụ cột cốt lõi của React!

---

## 🎯 Tại sao phải hiểu Props & State?

| Khái niệm | Tầm quan trọng |
|-----------|----------------|
| 🧬 **Props** | Cách component **nhận dữ liệu** từ bên ngoài (bố mẹ truyền cho con) |
| 💭 **State** | Cách component **tự quản lý dữ liệu** bên trong (cảm xúc thay đổi) |
| ⚡ **Events** | Cách component **phản hồi** khi người dùng tương tác |
| 🔀 **Conditional Rendering** | Cách component **hiển thị khác nhau** tùy tình huống |

> 🔍 **Tưởng tượng:** Nếu component là một **tế bào**, thì:
> - Props = **DNA** (thông tin di truyền từ cha, không thể thay đổi)
> - State = **cảm xúc** (thay đổi theo hoàn cảnh bên trong)
> - Events = **thần kinh** (phản ứng khi có tác động)
> - Conditional = **biểu hiện** (vui/buồn tùy tình huống)

---

## 🌐 Bức tranh toàn cảnh — Dữ liệu chảy trong React

```
        ┌─────────────────────────────────────────┐
        │              DATA FLOW                   │
        │                                          │
        │    Parent Component                      │
        │    ┌─────────────────────┐               │
        │    │  State: { count: 0 }│               │
        │    │  props ↓↓↓          │               │
        │    └─────┬───────┬───────┘               │
        │          │       │                       │
        │    ┌─────▼───┐ ┌─▼───────┐              │
        │    │ Child A │ │ Child B │              │
        │    │ props:  │ │ props:  │              │
        │    │ count=0 │ │ count=0 │              │
        │    └─────────┘ └─────────┘              │
        │                                          │
        │  ⬆ Props chảy XUỐNG (top → bottom)      │
        │  ⬆ Events nổi LÊN (bottom → top)        │
        └─────────────────────────────────────────┘
```

> ⚠️ **Nguyên tắc vàng:** Trong React, dữ liệu chỉ chảy **một chiều** — từ cha xuống con qua Props. Con muốn thay đổi dữ liệu? Phải "báo cáo" cha qua callback!

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. Props — Truyền dữ liệu từ cha xuống con

> 🧬 **DNA analogy:** Props giống như DNA — cha truyền cho con khi sinh ra. Con **nhận được** nhưng **không thể tự sửa đổi**!

#### Cách truyền Props

```jsx
// Component cha truyền props
function App() {
  return (
    <div>
      {/* Truyền props như thuộc tính HTML */}
      <TheHocSinh 
        ten="Nguyễn Văn Minh" 
        diem={9.5} 
        lop="CNTT-K65"
        isDat={true} 
      />
    </div>
  )
}
```

#### Cách nhận Props (Destructuring)

```jsx
// ✅ Cách 1: Destructuring trong tham số (KHUYÊN DÙNG)
function TheHocSinh({ ten, diem, lop, isDat }) {
  return (
    <div className="the-hoc-sinh">
      <h2>{ten}</h2>
      <p>Lớp: {lop}</p>
      <p>Điểm: {diem}</p>
      <p>Kết quả: {isDat ? "✅ Đạt" : "❌ Chưa đạt"}</p>
    </div>
  )
}

// ✅ Cách 2: Nhận object props rồi destructuring
function TheHocSinh(props) {
  const { ten, diem, lop, isDat } = props
  return (
    <div>
      <h2>{ten}</h2>
      {/* ... */}
    </div>
  )
}
```

#### Props mặc định (Default Props)

```jsx
function TheHocSinh({ ten, diem = 0, lop = "Chưa xếp lớp" }) {
  return (
    <div>
      <h2>{ten}</h2>
      <p>Lớp: {lop}</p>    {/* Nếu không truyền → "Chưa xếp lớp" */}
      <p>Điểm: {diem}</p>    {/* Nếu không truyền → 0 */}
    </div>
  )
}

// Sử dụng — không truyền diem và lop
<TheHocSinh ten="Minh" />
// Kết quả: Minh, Lớp: Chưa xếp lớp, Điểm: 0
```

#### Truyền children — Props đặc biệt

```jsx
// Component Card — bọc nội dung bên trong
function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">
        {children}  {/* ← Đây là props đặc biệt */}
      </div>
    </div>
  )
}

// Sử dụng
<Card title="Giới thiệu">
  <p>Nội dung bất kỳ ở đây...</p>
  <img src="avatar.jpg" alt="avatar" />
  <button>Click me</button>
</Card>
```

> 💡 **`children`** là props đặc biệt — chứa tất cả nội dung nằm giữa thẻ mở và thẻ đóng của component.

---

### 2. State — Quản lý dữ liệu bên trong component

> 💭 **Cảm xúc analogy:** State giống như cảm xúc con người — thay đổi theo hoàn cảnh bên trong. Khi state thay đổi, component **render lại** (giống như biểu hiện khuôn mặt thay đổi)!

#### useState Hook — Tạo state

```jsx
import { useState } from 'react'

function BoDem() {
  // useState trả về [giá_trị, hàm_đặt_giá_trị]
  const [count, setCount] = useState(0)  // ← Giá trị ban đầu = 0

  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Tăng (+1)
      </button>
      <button onClick={() => setCount(count - 1)}>
        Giảm (-1)
      </button>
      <button onClick={() => setCount(0)}>
        Đặt lại
      </button>
    </div>
  )
}
```

#### Quy tắc useState

```
┌─────────────────────────────────────────────────┐
│              useState QUY TẮC                    │
│                                                  │
│  ✅ ĐÚNG:                                       │
│  • const [state, setState] = useState(initial)   │
│  • setState(newValue)    → Thay thế giá trị cũ   │
│  • setState(prev => prev + 1) → Dùng callback    │
│                                                  │
│  ❌ SAI:                                         │
│  • state = newValue  ← KHÔNG gán trực tiếp       │
│  • setState() trong if/for ← KHÔNG gọi tùy ý     │
│  • const [state] = useState() ← Quên setState    │
└─────────────────────────────────────────────────┘
```

#### Ví dụ thực tế: State với object

```jsx
function FormDangKy() {
  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    tuoi: 0
  })

  // ⚠️ Phải spread object cũ khi cập nhật
  const handleTenChange = (e) => {
    setFormData({
      ...formData,          // Giữ nguyên các field khác
      ten: e.target.value   // Chỉ thay đổi field ten
    })
  }

  // ✅ Cách tốt hơn: dùng callback
  const handleEmailChange = (e) => {
    setFormData(prev => ({
      ...prev,
      email: e.target.value
    }))
  }

  return (
    <form>
      <input 
        value={formData.ten} 
        onChange={handleTenChange}
        placeholder="Họ tên"
      />
      <input 
        value={formData.email} 
        onChange={handleEmailChange}
        placeholder="Email"
      />
    </form>
  )
}
```

---

### 3. Events — Xử lý sự kiện

> ⚡ **Thần kinh analogy:** Events giống như hệ thần kinh — khi bạn chạm tay vào lửa (onClick), não xử lý (handler) và phản ứng lại (rút tay về / setState).

#### Các loại events phổ biến

| Event | Mô tả | Ví dụ |
|-------|-------|-------|
| `onClick` | Click chuột | Nút bấm, link |
| `onChange` | Thay đổi giá trị | Input, select, checkbox |
| `onSubmit` | Submit form | Form đăng ký |
| `onKeyDown` | Nhấn phím | Phím tắt, tìm kiếm |
| `onMouseEnter` | Di chuột vào | Hover effect |
| `onFocus` | Focus vào element | Input validation |

#### Ví dụ: Xử lý form hoàn chỉnh

```jsx
function DangKyForm() {
  const [ten, setTen] = useState('')
  const [email, setEmail] = useState('')
  const [thongBao, setThongBao] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()  // ⚠️ Ngăn reload trang!

    if (!ten || !email) {
      setThongBao('❌ Vui lòng nhập đầy đủ thông tin!')
      return
    }

    // Validate email
    if (!email.includes('@')) {
      setThongBao('❌ Email không hợp lệ!')
      return
    }

    setThongBao(`✅ Đăng ký thành công! Xin chào ${ten}`)
    setTen('')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Họ tên:</label>
        <input 
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          placeholder="Nhập họ tên..."
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
        />
      </div>
      <button type="submit">Đăng ký</button>
      {thongBao && <p className="thong-bao">{thongBao}</p>}
    </form>
  )
}
```

> ⚠️ **Lưu ý quan trọng:** Luôn gọi `e.preventDefault()` trong `onSubmit` để ngăn trình duyệt reload trang!

---

### 4. Conditional Rendering — Hiển thị có điều kiện

> 🔀 **Tưởng tượng:** Conditional rendering giống như bạn chọn quần áo tùy thời tiết — trời mưa thì lấy áo mưa, trời nắng thì lấy kính râm.

#### Cách 1: Toán tử `&&` (hiện/ẩn)

```jsx
function ThongBao({ isLoggedIn, ten }) {
  return (
    <div>
      {/* Chỉ hiện khi isLoggedIn = true */}
      {isLoggedIn && <p>🎉 Chào mừng {ten} quay lại!</p>}
      
      {/* Chỉ hiện khi isLoggedIn = false */}
      {!isLoggedIn && <p>👋 Vui lòng đăng nhập!</p>}
    </div>
  )
}
```

#### Cách 2: Toán tử 3 ngôi `? :` (đây hoặc kia)

```jsx
function NutBam({ isLoggedIn }) {
  return (
    <button>
      {isLoggedIn ? '🚪 Đăng xuất' : '🔑 Đăng nhập'}
    </button>
  )
}
```

#### Cách 3: Early return (trả về sớm)

```jsx
function ProtectedPage({ isLoggedIn }) {
  // Nếu chưa đăng nhập → trả về trang cảnh báo
  if (!isLoggedIn) {
    return (
      <div className="warning">
        <h2>⚠️ Truy cập bị từ chối</h2>
        <p>Bạn cần đăng nhập để xem nội dung này.</p>
      </div>
    )
  }

  // Nếu đã đăng nhập → hiển thị nội dung
  return (
    <div>
      <h1>🔓 Trang bảo mật</h1>
      <p>Nội dung bí mật ở đây...</p>
    </div>
  )
}
```

#### Cách 4: Switch/Case (nhiều điều kiện)

```jsx
function TrangThaiDonHang({ status }) {
  switch (status) {
    case 'pending':
      return <span className="badge yellow">⏳ Đang xử lý</span>
    case 'shipping':
      return <span className="badge blue">🚚 Đang giao</span>
    case 'delivered':
      return <span className="badge green">✅ Đã giao</span>
    case 'cancelled':
      return <span className="badge red">❌ Đã hủy</span>
    default:
      return <span className="badge gray">❓ Không xác định</span>
  }
}
```

---

### 5. List Rendering — Hiển thị danh sách

> 📋 **Danh sách analogy:** `.map()` giống như bạn photocopy — mỗi phần tử trong mảng được "sao chép" thành một JSX element.

```jsx
function DanhSachSinhVien() {
  const students = [
    { id: 1, ten: "Minh", diem: 9.0 },
    { id: 2, ten: "Lan", diem: 8.5 },
    { id: 3, ten: "Tùng", diem: 7.0 },
    { id: 4, ten: "Hoa", diem: 9.5 },
  ]

  return (
    <div>
      <h2>📋 Danh sách sinh viên</h2>
      <ul>
        {students.map((sv) => (
          <li key={sv.id}>  {/* ⚠️ PHẢI có key */}
            <span>{sv.ten}</span>
            <span> — Điểm: {sv.diem}</span>
            <span> {sv.diem >= 8 ? '⭐' : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

#### Tại sao phải có `key`?

```
┌─────────────────────────────────────────────────┐
│         React cần key để:                        │
│                                                  │
│  1. Nhận diện item nào THÊM / XÓA / DI CHUYỂN  │
│  2. Tái sử dụng DOM nodes hiệu quả              │  ← Không có key → render lại toàn bộ!
│  3. Tránh lỗi "Each child should have unique key"│
│                                                  │
│  ✅ key phải là UNIQUE và ỔN ĐỊNH               │
│  ❌ KHÔNG dùng index làm key (trừ khi list tĩnh)│
└─────────────────────────────────────────────────┘
```

---

## 🟢 Lớp đơn giản hóa — Tóm tắt

| Khái niệm | So sánh đời thường | Kỹ thuật |
|-----------|---------------------|----------|
| **Props** | DNA cha truyền con | `<Child prop={value} />` |
| **State** | Cảm xúc thay đổi | `const [state, setState] = useState(init)` |
| **Events** | Phản xạ thần kinh | `onClick={handler}` |
| **Conditional** | Chọn đồ theo thời tiết | `{condition && <JSX />}` |
| **List** | Photocopy danh sách | `{array.map(item => <JSX key={item.id} />)}` |

```
┌─────────────────────────────────────────────────┐
│            Props vs State                       │
│                                                  │
│  ┌──────────────┬───────────────┐               │
│  │    PROPS     │     STATE     │               │
│  ├──────────────┼───────────────┤               │
│  │ Từ cha       │ Từ chính nó   │               │
│  │ Read-only    │ Có thể thay   │               │
│  │ Immutable    │ Mutable       │               │
│  │ Truyền xuôi  │ Quản lý nội   │               │
│  └──────────────┴───────────────┘               │
└─────────────────────────────────────────────────┘
```

---

## 🏭 Lớp thực tế — Ứng dụng thực tế

### Ví dụ: Ứng dụng quản lý công việc (Todo App)

```jsx
import { useState } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React', done: false },
    { id: 2, text: 'Làm bài tập', done: true },
  ])
  const [inputText, setInputText] = useState('')

  // Thêm công việc mới
  const addTodo = () => {
    if (!inputText.trim()) return  // Không thêm nếu rỗng

    const newTodo = {
      id: Date.now(),      // Tạo id unique
      text: inputText,
      done: false
    }

    setTodos([...todos, newTodo])  // Thêm vào mảng
    setInputText('')               // Xóa ô input
  }

  // Đánh dấu hoàn thành
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, done: !todo.done }  // Đảo trạng thái
        : todo                            // Giữ nguyên
    ))
  }

  // Xóa công việc
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Thống kê
  const completedCount = todos.filter(t => t.done).length

  return (
    <div className="todo-app">
      <h1>📝 Todo App</h1>
      
      {/* Form thêm */}
      <div className="todo-input">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Thêm công việc mới..."
        />
        <button onClick={addTodo}>➕ Thêm</button>
      </div>

      {/* Thống kê */}
      <p>Hoàn thành: {completedCount}/{todos.length}</p>

      {/* Danh sách */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.done ? '✅' : '⬜'} {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      {/* Trạng thái rỗng */}
      {todos.length === 0 && (
        <p className="empty">🎉 Không có công việc nào!</p>
      )}
    </div>
  )
}
```

---

## 🛠️ Thực hành

### Bài tập 1: Component Profile Card

```jsx
function ProfileCard({ name, avatar, bio, followers, following }) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="profile-card">
      <img src={avatar} alt={name} className="avatar" />
      <h2>{name}</h2>
      <p>{bio}</p>
      <div className="stats">
        <span>👥 {followers} người theo dõi</span>
        <span>👤 Đang theo dõi {following}</span>
      </div>
      <button 
        onClick={() => setIsFollowing(!isFollowing)}
        className={isFollowing ? 'following' : 'follow'}
      >
        {isFollowing ? '✅ Đang theo dõi' : '➕ Theo dõi'}
      </button>
    </div>
  )
}
```

### Bài tập 2: Component Accordion (Thu gon/mở rộng)

```jsx
function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        <h3>{title}</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="accordion-body">
          <p>{content}</p>
        </div>
      )}
    </div>
  )
}

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const items = [
    { title: "React là gì?", content: "React là thư viện JavaScript..." },
    { title: "Props là gì?", content: "Props là dữ liệu truyền từ cha..." },
    { title: "State là gì?", content: "State là dữ liệu bên trong component..." },
  ]

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
```

---

## ❌ Hiểu lầm thường gặp

| Hiểu lầm | Sự thật |
|-----------|---------|
| ❌ Props có thể thay đổi trong component con | ✅ Props là **read-only**. Component con KHÔNG được sửa props |
| ❌ State thay đổi ngay lập tức khi gọi setState | ✅ State cập nhật **bất đồng bộ** — không thay đổi ngay trong cùng hàm |
| ❌ Dùng `index` làm key trong `.map()` | ✅ Nên dùng **id duy nhất** (như `id` từ database). Index chỉ dùng khi list tĩnh |
| ❌ Gọi `setState` trong điều kiện (if/for) | ✅ Phải gọi **ở top level** của component — tuân thủ Rules of Hooks |
| ❌ `{condition && <JSX />}` hiện "0" khi condition = 0 | ✅ Đúng! Số 0 là falsy. Dùng `{!!condition && <JSX />}` hoặc `{condition > 0 && <JSX />}` |

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Cannot assign to read only property` | Cố sửa props trực tiếp | Dùng state hoặc tạo bản sao |
| `Too many re-renders` | Gọi setState trong render | Chuyển vào event handler hoặc useEffect |
| `Each child should have unique "key" prop` | Thiếu key trong `.map()` | Thêm `key={item.id}` |
| `Objects are not valid as React child` | Render object trong JSX | Dùng `JSON.stringify()` hoặc truy cập property cụ thể |
| Component không cập nhật khi setState | Mutate state trực tiếp | Luôn tạo bản sao: `setState([...state, newItem])` |
| `0` hiện ra thay vì không hiện gì | `{count && <JSX />}` khi count = 0 | Dùng `{count > 0 && <JSX />}` |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

### Câu hỏi kiểm tra

1. **Props và State khác nhau như thế nào?** Cho ví dụ minh họa.
2. **Tại sao không được sửa props trực tiếp?**
3. **Viết code useState cho bộ đếm đếm từ 1 đến 10, có nút Reset.**
4. **`{isLoggedIn && <p>Welcome</p>}` — điều gì xảy ra nếu isLoggedIn = 0?**
5. **Tại sao phải có `key` trong `.map()`? Dùng index có được không?**

### Đáp án

1. Props từ cha (read-only), State từ chính component (có thể thay đổi). Props = DNA, State = cảm xúc.
2. Vì props là **immutable** — sửa props trực tiếp sẽ phá vỡ nguyên tắc một chiều của React.
3. Xem ví dụ BoDem ở trên — dùng `useState(1)` và `setCount(Math.min(count + 1, 10))`.
4. React sẽ render số `0` ra màn hình thay vì không hiện gì. Sửa: `{!!isLoggedIn && <p>Welcome</p>}`.
5. Key giúp React nhận diện item. Dùng index **có thể** nhưng **không nên** vì khi list thay đổi (thêm/xóa) sẽ gây lỗi re-render.

---

## 📌 Tóm tắt bài học

| Khái niệm | Mô tả |
|------------|-------|
| **Props** | Dữ liệu truyền từ cha → con (immutable) |
| **State** | Dữ liệu bên trong component (mutable) |
| **useState** | Hook tạo state: `const [value, setValue] = useState(init)` |
| **Events** | Xử lý sự kiện: `onClick`, `onChange`, `onSubmit` |
| **Conditional** | `{condition && <JSX />}` hoặc `{a ? b : c}` |
| **List** | `{array.map(item => <JSX key={item.id} />)}` |

---

## ➡️ Bài tiếp theo — useEffect & Context API

> 🔮 **Preview:** Ở bài tiếp theo, bạn sẽ học:
> - **useEffect** — cách thực hiện side effects (gọi API, timer, localStorage)
> - **Context API** — cách truyền dữ liệu qua nhiều tầng component mà không cần prop drilling
> - **Fragments** — cách nhóm elements mà không thêm DOM node thừa

> 💡 *"useEffect giống như hệ thần kinh tự phản ứng khi môi trường thay đổi. Context giống như WiFi — phát sóng cho cả nhà, không cần truyền từng tầng!"*

---

> 📝 **Ghi chú giảng viên:**
> - Demo props bằng cách tạo 2-3 component ProfileCard với dữ liệu khác nhau
> - Demo state bằng Todo App — cho sinh viên thấy real-time update
> - Cho sinh viên thực hành: tạo Quiz App nhỏ với conditional rendering
> - Ôn lại: Props ≠ State bằng cách hỏi "nếu muốn sửa dữ liệu nhận từ cha thì làm sao?"
