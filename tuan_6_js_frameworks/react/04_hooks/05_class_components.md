# 🟢 Bài 5: Class Components (Legacy) — Cú pháp cũ, Lifecycle & Error Boundaries

> **⏱ Thời lượng:** 90 phút | **🎯 Trình độ:** Trung bình | **📋 Yêu cầu:** Đã biết Functional Components, useState, useEffect

---

## 🎬 Mở đầu — "Tại sao phải học Class Components?"

Minh đang đọc một dự án React cũ trên GitHub. Cậu ấy thấy code trông rất khác:

```jsx
// 😵 Code cũ — không giống những gì đã học!
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
  
  render() {
    return <p>{this.state.count}</p>
  }
}
```

> 💡 *"Sao không dùng function và useState? Tại sao phải viết dài vậy?"*

Câu trả lời: Trước năm 2019 (React 16.8), Class Components là **cách duy nhất** dùng state và lifecycle. Hàng triệu dòng code vẫn dùng Class Components. Bạn cần hiểu để:
- 🔧 **Bảo trì code cũ** (legacy codebase)
- 📚 **Đọc documentation** cũ
- 🧩 **Error Boundaries** (chỉ dùng được với Class Components!)

---

## 🎯 Tại sao phải biết Class Components?

| Lý do | Mô tả |
|-------|-------|
| 📦 **Codebase cũ** | Hàng triệu dự án vẫn dùng Class Components |
| 📖 **Documentation** | Nhiều tutorial, Stack Overflow trả lời bằng Class |
| 🛡️ **Error Boundaries** | Chỉ Class Components mới bắt lỗi render |
| 🎓 **Phỏng vấn** | Nhà tuyển dụng vẫn hỏi về lifecycle methods |
| 🧠 **Hiểu bản chất** | Biết Class giúp hiểu Functional sâu hơn |

---

## 🌐 Bức tranh toàn cảnh — Class vs Functional

```
┌─────────────────────────────────────────────────────────┐
│          CLASS vs FUNCTIONAL COMPONENTS                  │
│                                                          │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │   CLASS COMPONENT   │  │ FUNCTIONAL COMPONENT│      │
│  │    (Xe số sàn)      │  │   (Xe tự động)      │      │
│  ├─────────────────────┤  ├─────────────────────┤      │
│  │ extends Component   │  │ function MyComp()   │      │
│  │ this.state          │  │ useState()          │      │
│  │ this.setState()     │  │ setState()          │      │
│  │ render() { return } │  │ return (JSX)        │      │
│  │ componentDidMount   │  │ useEffect(fn, [])   │      │
│  │ componentDidUpdate  │  │ useEffect(fn, [d])  │      │
│  │ componentWillUnmount│  │ useEffect cleanup   │      │
│  │ this.props          │  │ props (destructure) │      │
│  │ Error Boundaries ✅ │  │ Error Boundaries ❌ │      │
│  └─────────────────────┘  └─────────────────────┘      │
│                                                          │
│  ⭐ Khuyến nghị: Dùng FUNCTIONAL cho code mới           │
│  📚 Học CLASS để hiểu code cũ + Error Boundaries        │
└─────────────────────────────────────────────────────────┘
```

> 🔍 **Tưởng tượng:**
> - Class Components = **xe số sàn** — kiểm soát nhiều hơn nhưng phức tạp hơn
> - Functional Components = **xe tự động** — đơn giản, hiện đại, dễ lái
> - Cả hai đều đưa bạn đến đích, nhưng xe tự động thoải mái hơn!

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. Cú pháp Class Component cơ bản

```jsx
import React, { Component } from 'react'

class ChaoMung extends Component {
  // Bắt buộc: hàm render trả về JSX
  render() {
    return (
      <div>
        <h1>Xin chào {this.props.ten}!</h1>
        <p>Chào mừng đến với React Class Components</p>
      </div>
    )
  }
}

export default ChaoMung
```

#### So sánh trực tiếp

```jsx
// ✅ Functional Component (hiện đại)
function ChaoMung({ ten }) {
  return (
    <div>
      <h1>Xin chào {ten}!</h1>
    </div>
  )
}

// ✅ Class Component (legacy)
class ChaoMung extends Component {
  render() {
    return (
      <div>
        <h1>Xin chào {this.props.ten}!</h1>
      </div>
    )
  }
}
```

### 2. State trong Class Components

```jsx
class BoDem extends Component {
  // Cách 1: Khởi tạo state trong constructor
  constructor(props) {
    super(props)  // ⚠️ PHẢI gọi super(props) trước!
    this.state = {
      count: 0,
      name: 'Minh'
    }
  }

  // Cách 2: Khởi tạo state trực tiếp (ngắn hơn)
  // state = { count: 0, name: 'Minh' }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <p>Name: {this.state.name}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Tăng
        </button>
      </div>
    )
  }
}
```

#### `setState` — Cách cập nhật state

```jsx
class BoDem extends Component {
  state = { count: 0 }

  // ❌ SAI: Gán trực tiếp
  tangSai = () => {
    this.state.count = this.state.count + 1  // KHÔNG render lại!
  }

  // ✅ ĐÚNG: Dùng setState
  tangDung = () => {
    this.setState({ count: this.state.count + 1 })
  }

  // ✅ TỐT HƠN: Dùng callback khi phụ thuộc state cũ
  tangTot = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }))
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.tangTot()}>+1</button>
      </div>
    )
  }
}
```

> ⚠️ **Lưu ý:** `setState` là **bất đồng bộ** — state không thay đổi ngay lập tức!

### 3. Event Handlers trong Class

```jsx
class FormDangKy extends Component {
  state = { ten: '', email: '' }

  // ❌ Vấn đề: 'this' bị mất ngữ cảnh
  handleChangeSai(e) {
    this.setState({ ten: e.target.value })  // Lỗi! this = undefined
  }

  // ✅ Cách 1: Arrow function trong render
  handleChange1 = (e) => {
    this.setState({ ten: e.target.value })
  }

  // ✅ Cách 2: Arrow function trong JSX
  render() {
    return (
      <input onChange={(e) => this.handleChange1(e)} />
    )
  }

  // ✅ Cách 3: Bind trong constructor
  constructor(props) {
    super(props)
    this.handleChange3 = this.handleChange3.bind(this)
  }
  handleChange3(e) {
    this.setState({ ten: e.target.value })
  }
}
```

> 💡 **Khuyến nghị:** Dùng arrow function class property (Cách 1) — ngắn gọn và không cần bind.

---

### 4. Lifecycle Methods — Các giai đoạn sống

```
┌─────────────────────────────────────────────────────────────┐
│                  CLASS COMPONENT LIFECYCLE                    │
│                                                              │
│  MOUNTING (Khởi tạo)                                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│  │constructor│→ │  render   │→ │   DOM     │→ │component│ │
│  │           │  │           │  │  Updated  │  │DidMount │ │
│  └───────────┘  └───────────┘  └───────────┘  └─────────┘ │
│                                         ↑                   │
│                                    Gọi API ở đây            │
│                                                              │
│  UPDATING (Cập nhật khi props/state thay đổi)               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  render   │→ │   DOM     │→ │component  │               │
│  │           │  │  Updated  │  │DidUpdate  │               │
│  └───────────┘  └───────────┘  └───────────┘               │
│                                                              │
│  UNMOUNTING (Xóa component)                                  │
│  ┌─────────────────────┐                                     │
│  │componentWillUnmount │  ← Dọn dẹp: timer, listener       │
│  └─────────────────────┘                                     │
└─────────────────────────────────────────────────────────────┘
```

#### componentDidMount — Chạy sau khi mount

```jsx
class UserList extends Component {
  state = { users: [], loading: true }

  // Chạy SAU KHI component mount vào DOM
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data, loading: false })
      })
      .catch(err => {
        console.error(err)
        this.setState({ loading: false })
      })
  }

  render() {
    if (this.state.loading) return <p>Đang tải...</p>
    
    return (
      <ul>
        {this.state.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    )
  }
}
```

#### componentDidUpdate — Chạy sau mỗi lần update

```jsx
class SearchResults extends Component {
  state = { results: [] }

  componentDidUpdate(prevProps) {
    // ⚠️ PHẢI kiểm tra prop có thay đổi không!
    if (prevProps.query !== this.props.query) {
      this.fetchResults(this.props.query)
    }
  }

  fetchResults(query) {
    fetch(`https://api.example.com/search?q=${query}`)
      .then(res => res.json())
      .then(data => this.setState({ results: data }))
  }

  render() {
    return (
      <ul>
        {this.state.results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    )
  }
}
```

#### componentWillUnmount — Dọn dẹp trước khi unmount

```jsx
class Timer extends Component {
  state = { seconds: 0 }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }))
    }, 1000)
  }

  // Dọn dẹp khi component bị xóa
  componentWillUnmount() {
    clearInterval(this.interval)
    console.log('Timer đã dọn dẹp!')
  }

  render() {
    return <p>⏱ {this.state.seconds} giây</p>
  }
}
```

#### Bảng so sánh Lifecycle Class vs useEffect

| Class Lifecycle | Functional Equivalent |
|----------------|----------------------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return () => cleanup }, [])` |
| `componentDidMount + Update` | `useEffect(() => {})` (không có array) |

---

### 5. Error Boundaries — Túi khí khi crash

> 🛡️ **Túi khí analogy:** Error Boundary giống như túi khí trong xe — khi component con "crash" (lỗi render), Error Boundary "bắt" lỗi và hiển thị UI dự phòng thay vì crash toàn bộ ứng dụng!

#### Tại sao cần Error Boundary?

```
❌ KHÔNG có Error Boundary:

  App
   ├── Header      ✅ OK
   ├── ProductList  ❌ LỖI RENDER!
   └── Footer       💥 CRASH TOÀN BỘ APP!

✅ CÓ Error Boundary:

  App
   ├── Header              ✅ OK
   ├── ErrorBoundary
   │    └── ProductList     ❌ LỖI RENDER!
   │         ↓
   │    └── ErrorMessage    🛡️ Hiển thị "Đã xảy ra lỗi"
   └── Footer              ✅ Vẫn hoạt động!
```

#### Tạo Error Boundary (CHỈ dùng Class Component!)

```jsx
import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    }
  }

  // Bắt lỗi khi component con throw error
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  // Ghi log lỗi (gửi về server, console, etc.)
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    // Có thể gửi lỗi về server: logErrorToServer(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // UI dự phòng khi có lỗi
      return (
        <div className="error-boundary">
          <h2>😵 Đã xảy ra lỗi!</h>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            🔄 Thử lại
          </button>
        </div>
      )
    }

    // Nếu không có lỗi → render children bình thường
    return this.props.children
  }
}

export default ErrorBoundary
```

#### Sử dụng Error Boundary

```jsx
// App.jsx
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      
      {/* Bọc component có thể lỗi */}
      <ErrorBoundary>
        <ProductList />
      </ErrorBoundary>

      {/* Error Boundary riêng cho phần khác */}
      <ErrorBoundary>
        <SomeOtherComponent />
      </ErrorBoundary>

      <Footer />
    </div>
  )
}
```

#### Component gây lỗi (ví dụ)

```jsx
function ProductCard({ product }) {
  // Giả sử product bị null → lỗi!
  if (!product) {
    throw new Error('Product không tồn tại!')
  }

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}đ</p>
    </div>
  )
}
```

---

## 🟢 Lớp đơn giản hóa — Tóm tắt

| Class Component | Functional Equivalent |
|----------------|----------------------|
| `class X extends Component` | `function X() {}` |
| `this.props.ten` | `const { ten } = props` |
| `this.state = { count: 0 }` | `const [count, setCount] = useState(0)` |
| `this.setState({ count: 1 })` | `setCount(1)` |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect cleanup` |
| `render()` | `return (JSX)` |
| Error Boundaries ✅ | Error Boundaries ❌ (phải dùng Class) |

```
┌─────────────────────────────────────────────────┐
│         KHI NÀO DÙNG CLASS?                     │
│                                                  │
│  ✅ Dùng Class khi:                              │
│  • Cần Error Boundary (bắt lỗi render)          │
│  • Bảo trì code cũ (legacy codebase)            │
│  • Library yêu cầu (ít gặp)                     │
│                                                  │
│  ✅ Dùng Functional khi:                         │
│  • Viết code mới (mặc định)                     │
│  • Cần hooks (useState, useEffect, useContext)   │
│  • Code ngắn gọn, dễ đọc                        │
│  • Performance tốt hơn (ít re-render)            │
└─────────────────────────────────────────────────┘
```

---

## 🏭 Lớp thực tế — Ứng dụng thực tế

### Ví dụ: Ứng dụng thời tiết với Class Components

```jsx
import React, { Component } from 'react'

class WeatherApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: 'Hanoi',
      weather: null,
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    this.fetchWeather(this.state.city)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeather(this.state.city)
    }
  }

  fetchWeather = async (city) => {
    this.setState({ loading: true, error: null })
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData = {
        Hanoi: { temp: 28, condition: 'Nắng', humidity: 65 },
        HCM: { temp: 33, condition: 'Mưa rào', humidity: 80 },
        Danang: { temp: 30, condition: 'Có mây', humidity: 70 }
      }

      const data = mockData[city]
      if (!data) throw new Error('Không tìm thấy thành phố!')

      this.setState({ weather: data, loading: false })
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }

  handleCityChange = (e) => {
    this.setState({ city: e.target.value })
  }

  render() {
    const { city, weather, loading, error } = this.state

    return (
      <div className="weather-app">
        <h1>🌤 Thời tiết</h1>
        
        <select value={city} onChange={this.handleCityChange}>
          <option value="Hanoi">Hà Nội</option>
          <option value="HCM">TP. Hồ Chí Minh</option>
          <option value="Danang">Đà Nẵng</option>
        </select>

        {loading && <p>⏳ Đang tải...</p>}
        {error && <p>❌ {error}</p>}
        
        {weather && (
          <div className="weather-card">
            <h2>{city}</h2>
            <p>🌡 {weather.temp}°C</p>
            <p>☁️ {weather.condition}</p>
            <p>💧 Độ ẩm: {weather.humidity}%</p>
          </div>
        )}
      </div>
    )
  }
}

export default WeatherApp
```

### Ví dụ: Error Boundary hoàn chỉnh

```jsx
class ErrorBoundary extends Component {
  state = { 
    hasError: false, 
    error: null 
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Gửi lỗi về service monitoring (Sentry, LogRocket, etc.)
    console.error('Error caught:', error)
    console.error('Component stack:', errorInfo.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-icon">💥</div>
          <h2>Oops! Đã xảy ra lỗi</h2>
          <p className="error-message">
            {this.state.error?.message || 'Lỗi không xác định'}
          </p>
          <div className="error-actions">
            <button onClick={this.handleRetry}>
              🔄 Thử lại
            </button>
            <button onClick={() => window.location.reload()}>
              ↻ Tải lại trang
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="error-details">
              <summary>Chi tiết lỗi (dev only)</summary>
              <pre>{this.state.error?.stack}</pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## 🛠️ Thực hành

### Bài tập 1: Chuyển đổi Class → Functional

**Class Component:**
```jsx
class HienThiTen extends Component {
  state = { ten: '' }

  handleChange = (e) => {
    this.setState({ ten: e.target.value })
  }

  render() {
    return (
      <div>
        <input 
          value={this.state.ten} 
          onChange={this.handleChange}
          placeholder="Nhập tên..."
        />
        <p>Xin chào {this.state.ten || 'bạn'}!</p>
      </div>
    )
  }
}
```

**Functional Component (đáp án):**
```jsx
import { useState } from 'react'

function HienThiTen() {
  const [ten, setTen] = useState('')

  return (
    <div>
      <input 
        value={ten} 
        onChange={(e) => setTen(e.target.value)}
        placeholder="Nhập tên..."
      />
      <p>Xin chào {ten || 'bạn'}!</p>
    </div>
  )
}
```

### Bài tập 2: Tạo Error Boundary

```jsx
// components/ErrorBoundary.jsx
import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, background: '#ffebee', borderRadius: 8 }}>
          <h3>❌ Lỗi: {this.state.error?.message}</h3>
          <button onClick={() => this.setState({ hasError: false })}>
            Thử lại
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
```

### Bài tập 3: Lifecycle — Timer với Class

```jsx
class Stopwatch extends Component {
  state = { 
    seconds: 0, 
    isRunning: false 
  }

  componentDidMount() {
    console.log('Stopwatch mounted!')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.interval = setInterval(() => {
          this.setState(prev => ({ seconds: prev.seconds + 1 }))
        }, 1000)
      } else {
        clearInterval(this.interval)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    console.log('Stopwatch unmounted!')
  }

  handleStartStop = () => {
    this.setState(prev => ({ isRunning: !prev.isRunning }))
  }

  handleReset = () => {
    this.setState({ seconds: 0, isRunning: false })
  }

  formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  render() {
    return (
      <div className="stopwatch">
        <h2>⏱ {this.formatTime(this.state.seconds)}</h2>
        <button onClick={this.handleStartStop}>
          {this.state.isRunning ? '⏸ Tạm dừng' : '▶ Bắt đầu'}
        </button>
        <button onClick={this.handleReset}>🔄 Đặt lại</button>
      </div>
    )
  }
}
```

---

## ❌ Hiểu lầm thường gặp

| Hiểu lầm | Sự thật |
|-----------|---------|
| ❌ "Class Components đã lỗi thời, không cần học" | ✅ Vẫn cần cho code cũ và Error Boundaries |
| ❌ `this.state.count++` sẽ cập nhật UI | ✅ Phải dùng `this.setState({ count: this.state.count + 1 })` |
| ❌ `setState` cập nhật ngay lập tức | ✅ `setState` là **bất đồng bộ** — không thay đổi ngay |
| ❌ Error Boundary bắt được lỗi trong event handler | ✅ Error Boundary chỉ bắt lỗi **render**, lifecycle, constructor |
| ❌ Functional Components không thể dùng lifecycle | ✅ `useEffect` thay thế tất cả lifecycle methods |
| ❌ Phải chuyển hết Class sang Functional | ✅ Chỉ chuyển khi cần refactor. Code cũ vẫn hoạt động tốt |

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Cannot read property 'state' of undefined` | Quên `super(props)` trong constructor | Thêm `super(props)` là dòng đầu tiên |
| `this is undefined` | Mất ngữ cảnh `this` trong event handler | Dùng arrow function hoặc `.bind(this)` |
| `setState is not a function` | Component không extends Component | Kiểm tra `class X extends Component` |
| `Maximum update depth exceeded` | setState trong componentDidUpdate không kiểm tra | Kiểm tra `if (prevProps !== this.props)` |
| Error Boundary không bắt lỗi | Lỗi trong event handler | Error Boundary chỉ bắt lỗi render. Dùng try/catch cho event |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

### Câu hỏi kiểm tra

1. **So sánh `componentDidMount` với `useEffect`. Chúng giống và khác nhau thế nào?**
2. **Tại sao phải gọi `super(props)` trong constructor?**
3. **`setState` có đồng bộ không? Tại sao?**
4. **Error Boundary bắt được loại lỗi nào? Không bắt được loại nào?**
5. **Khi nào nên dùng Class Component thay vì Functional?**

### Đáp án

1. Cả hai đều chạy sau khi mount. `componentDidMount` là method của Class, `useEffect(() => {}, [])` là hook của Functional.
2. Vì `Component` constructor cần được gọi trước khi dùng `this`. Nếu không gọi `super`, `this.props` sẽ undefined.
3. **Không đồng bộ**. React gom nhiều `setState` lại để batch update, tối ưu performance.
4. Bắt được: lỗi render, lifecycle, constructor. **Không bắt được**: lỗi trong event handler, async code, server-side rendering.
5. Khi cần Error Boundaries, bảo trì code cũ, hoặc library yêu cầu Class.

---

## 📌 Tóm tắt bài học

| Khái niệm | Mô tả |
|------------|-------|
| **Class Component** | `class X extends Component { render() {} }` |
| **this.state** | Khởi tạo state trong class |
| **this.setState()** | Cập nhật state (bất đồng bộ) |
| **componentDidMount** | Chạy sau khi mount (gọi API) |
| **componentDidUpdate** | Chạy sau mỗi lần update |
| **componentWillUnmount** | Dọn dẹp trước khi unmount |
| **Error Boundary** | Bắt lỗi render (chỉ dùng Class) |

```
┌─────────────────────────────────────────────────┐
│         REACT CONCEPT MAP                        │
│                                                  │
│  ┌─────────────┐     ┌─────────────┐           │
│  │  Functional  │     │    Class     │           │
│  │  Component   │     │  Component   │           │
│  ├─────────────┤     ├─────────────┤           │
│  │ useState     │     │ this.state   │           │
│  │ useEffect    │     │ lifecycle    │           │
│  │ useContext   │     │ this.context │           │
│  │ useMemo      │     │ shouldComp.. │           │
│  │ useCallback  │     │              │           │
│  │              │     │ ErrorBoundary│ ← Unique! │
│  └─────────────┘     └─────────────┘           │
│                                                  │
│  ⭐ Khuyến nghị: Functional cho code mới        │
│  📚 Học Class để hiểu code cũ + Error Boundary  │
└─────────────────────────────────────────────────┘
```

---

## ➡️ Bài tiếp theo — Tổng hợp & Project

> 🔮 **Preview:** Ở bài tiếp theo, bạn sẽ:
> - **Tổng hợp** tất cả kiến thức React đã học
> - **Xây dựng project thực tế** (Todo App, Weather App, hoặc E-commerce)
> - **Deploy** ứng dụng lên Vercel/Netlify
> - **Giới thiệu** các hooks nâng cao: useMemo, useCallback, useRef

> 💡 *"Bạn đã có đủ công cụ để xây dựng ứng dụng React hoàn chỉnh! Bây giờ là lúc thực hành!"*

---

> 📝 **Ghi chú giảng viên:**
> - Demo Class Component bằng cách viết lại Todo App đã học ở bài trước
> - So sánh trực tiếp Class vs Functional trên cùng 1 màn hình
> - Demo Error Boundary bằng cách tạo component throw error
> - Cho sinh viên thực hành: chuyển đổi 1 Class Component sang Functional
> - Nhấn mạnh: Class vẫn cần biết nhưng Functional là tương lai
