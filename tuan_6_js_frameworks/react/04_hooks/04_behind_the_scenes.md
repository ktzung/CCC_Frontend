# 🟢 Bài 4: React Behind the Scenes — useEffect, Context API & Fragments

> **⏱ Thời lượng:** 120 phút | **🎯 Trình độ:** Trung bình | **📋 Yêu cầu:** Đã biết Props, State, Events cơ bản

---

## 🎬 Mở đầu — "Khi nào cần chạy code sau khi render?"

Minh đã xây xong giao diện Todo App với Props và State. Nhưng cậu gặp vấn đề mới:

```
❌ Cần lấy dữ liệu từ API khi trang mở lên → không biết chạy code "sau khi render"!
❌ Cần lưu dữ liệu vào localStorage → không biết khi nào state đã cập nhật xong!
❌ Cần truyền theme (sáng/tối) xuống 5 tầng component → phải truyền props qua từng tầng!
```

> 💡 *"Cần một cách để React tự động 'phản ứng' khi môi trường thay đổi, và cách truyền dữ liệu mà không phải 'chuyền tay' qua từng tầng..."*

Đó chính là **useEffect** và **Context API** — hai hooks nâng cao giúp React mạnh mẽ hơn!

---

## 🎯 Tại sao phải học useEffect & Context?

| Khái niệm | Tầm quan trọng |
|-----------|----------------|
| 🧠 **useEffect** | Chạy code **phản ứng** khi state/props thay đổi (side effects) |
| 📡 **Context API** | Truyền dữ liệu qua **nhiều tầng** mà không cần prop drilling |
| 🧩 **Fragments** | Group elements mà **không thêm DOM node** thừa |
| 🔒 **Strict Mode** | Chế độ kiểm tra lỗi nâng cao trong development |

---

## 🌐 Bức tranh toàn cảnh — Component Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│                 COMPONENT LIFECYCLE                       │
│                                                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐             │
│  │  MOUNT  │───▶│ UPDATE  │───▶│ UNMOUNT │             │
│  │ (sinh)  │    │ (trưởng │    │ (chết)  │             │
│  │         │    │  thành) │    │         │             │
│  └────┬────┘    └────┬────┘    └────┬────┘             │
│       │              │              │                   │
│  useEffect()    useEffect()    useEffect()              │
│  (lần đầu)      (khi dep       (cleanup:               │
│                  thay đổi)      return function)        │
│                                                          │
│  Gọi API        Cập nhật       Hủy timer,              │
│  Timer          lại dữ liệu   removeEventListener      │
│  Log            Scroll         Cleanup subscriptions    │
└─────────────────────────────────────────────────────────┘
```

> 🔍 **Tưởng tượng:** Component như một **cây trồng**:
> - Mount = **gieo hạt** (useEffect chạy lần đầu)
> - Update = **trồng lớn** (useEffect chạy khi "phân bón" — dependency thay đổi)
> - Unmount = **thu hoạch** (useEffect cleanup — dọn dẹp trước khi chết)

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. useEffect — Hệ thần kinh tự phản ứng

> 🧠 **Hệ thần kinh analogy:** useEffect giống như hệ thần kinh — tự động phản ứng khi môi trường (state/props) thay đổi. Bạn không cần "ra lệnh" mỗi lần — chỉ cần "đăng ký" phản ứng!

#### Cú pháp cơ bản

```jsx
import { useState, useEffect } from 'react'

function MyComponent() {
  const [data, setData] = useState(null)

  // Chạy SAU KHI component render
  useEffect(() => {
    // Code ở đây chạy sau mỗi lần render
    console.log('Component đã render!')
    
    // Optional: Cleanup function
    return () => {
      console.log('Component sắp unmount — dọn dẹp!')
    }
  }, [])  // ← Dependency array
  
  return <div>{data}</div>
}
```

#### 3 trường hợp sử dụng useEffect

```
┌─────────────────────────────────────────────────────────┐
│         useEffect DEPENDENCY ARRAY                       │
│                                                          │
│  1. useEffect(() => { ... })            ← Chạy MỌI lần  │
│     Không có array                                        │
│                                                          │
│  2. useEffect(() => { ... }, [])        ← Chạy 1 LẦN    │
│     Array rỗng []                                         │
│                                                          │
│  3. useEffect(() => { ... }, [dep])     ← Chạy KHI dep   │
│     Array có dependency                        thay đổi  │
└─────────────────────────────────────────────────────────┘
```

#### Ví dụ 1: Gọi API khi component mount

```jsx
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Gọi API khi component mount (chỉ 1 lần)
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        
        if (!response.ok) {
          throw new Error('Lỗi khi tải dữ liệu!')
        }
        
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])  // ← [] = chỉ chạy 1 lần khi mount

  // Hiển thị loading
  if (loading) return <p>⏳ Đang tải...</p>
  if (error) return <p>❌ {error}</p>

  return (
    <div>
      <h2>👥 Danh sách người dùng</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

#### Ví dụ 2: useEffect với dependency

```jsx
function SearchUser() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  // Chạy MỖI KHI query thay đổi
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // Debounce: đợi 500ms sau khi ngừng gõ
    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${query}`
      )
      const data = await res.json()
      setResults(data)
    }, 500)

    // Cleanup: hủy timer cũ nếu query thay đổi trước 500ms
    return () => clearTimeout(timer)
  }, [query])  // ← Chạy lại mỗi khi query thay đổi

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Tìm người dùng..."
      />
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

#### Ví dụ 3: Cleanup — Dọn dẹp khi unmount

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Tạo interval khi mount
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup: dừng interval khi unmount
    return () => {
      clearInterval(interval)
      console.log('Timer đã dọn dẹp!')
    }
  }, [])  // [] = chỉ tạo 1 lần

  return <p>⏱ {seconds} giây</p>
}
```

> ⚠️ **Tại sao cần cleanup?** Nếu không cleanup, interval sẽ **tiếp tục chạy** ngay cả khi component đã bị xóa khỏi DOM → gây memory leak!

---

### 2. Context API — WiFi phát sóng cho cả nhà

> 📡 **WiFi analogy:** Context giống như router WiFi — phát sóng một lần, tất cả thiết bị trong nhà đều kết nối được. Không cần "chuyền dây mạng" qua từng tầng!

#### Vấn đề: Prop Drilling

```
┌─────────────────────────────────────────────────┐
│         PROP DRILLING (❌ Xấu)                   │
│                                                  │
│  App (có theme = "dark")                         │
│    └── Header (theme)  ← KHÔNG dùng nhưng phải  │
│         └── Nav (theme)    nhận để truyền tiếp   │
│              └── Menu (theme)                    │
│                   └── MenuItem (theme) ← DÙNG!  │
│                                                  │
│  ❌ Phải truyền qua 4 tầng dù chỉ 1 component   │
│     cần dùng!                                    │
└─────────────────────────────────────────────────┘
```

#### Giải pháp: Context API

```
┌─────────────────────────────────────────────────┐
│         CONTEXT API (✅ Tốt)                     │
│                                                  │
│  ThemeProvider (phát sóng theme = "dark")        │
│    ├── Header    ← không cần biết theme         │
│    │    └── Nav  ← không cần biết theme         │
│    │         └── Menu                           │
│    │              └── MenuItem ← useContext()   │
│    └── Footer    ← useContext()                  │
│                                                  │
│  ✅ Chỉ component CẦN DÙNG mới gọi useContext   │
└─────────────────────────────────────────────────┘
```

#### Bước 1: Tạo Context

```jsx
// context/ThemeContext.js
import { createContext } from 'react'

// Tạo context với giá trị mặc định
const ThemeContext = createContext('light')

export default ThemeContext
```

#### Bước 2: Cung cấp Context (Provider)

```jsx
// App.jsx
import { useState } from 'react'
import ThemeContext from './context/ThemeContext'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    // Provider bọc toàn bộ app — mọi component con đều truy cập được
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Header />
        <Main />
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </ThemeContext.Provider>
  )
}
```

#### Bước 3: Sử dụng Context (useContext)

```jsx
// components/MenuItem.jsx — KHÔNG cần nhận props!
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

function MenuItem({ label }) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <li className={`menu-item ${theme}`}>
      {label}
      {theme === 'dark' && <span>🌙</span>}
    </li>
  )
}

export default MenuItem
```

#### Ví dụ hoàn chỉnh: Auth Context

```jsx
// context/AuthContext.js
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

// Custom hook để dùng context dễ dàng hơn
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth phải được dùng trong AuthProvider')
  }
  return context
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    // Giả lập gọi API
    const fakeUser = { id: 1, name: 'Minh', email }
    setUser(fakeUser)
    return fakeUser
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
```

```jsx
// App.jsx — Bọc AuthProvider
function App() {
  return (
    <AuthProvider>
      <Header />
      <Main />
      <Footer />
    </AuthProvider>
  )
}
```

```jsx
// components/Header.jsx — Sử dụng Auth Context
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <header>
      <h1>🛒 Shop Online</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <span>Xin chào {user.name}!</span>
            <button onClick={logout}>Đăng xuất</button>
          </div>
        ) : (
          <a href="/login">Đăng nhập</a>
        )}
      </nav>
    </header>
  )
}
```

---

### 3. Fragments — Nhóm elements không thêm DOM

> 🧩 **Tưởng tượng:** Fragment giống như túi **trong suốt** — chứa đồ bên trong nhưng không nhìn thấy túi!

#### Vấn đề: DOM thừa

```jsx
// ❌ Thêm div thừa vào DOM
function List() {
  return (
    <div>  {/* ← div thừa này sẽ phá vỡ layout table/flex */}
      <td>Cột 1</td>
      <td>Cột 2</td>
    </div>
  )
}
```

#### Giải pháp: Fragment

```jsx
// ✅ Cách 1: Fragment đầy đủ
import { Fragment } from 'react'

function List() {
  return (
    <Fragment>
      <td>Cột 1</td>
      <td>Cột 2</td>
    </Fragment>
  )
}

// ✅ Cách 2: Ngắn gọn (<> </>)
function List() {
  return (
    <>
      <td>Cột 1</td>
      <td>Cột 2</td>
    </>
  )
}

// ✅ Cách 3: Fragment với key (khi dùng .map)
function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map(row => (
          <Fragment key={row.id}>
            <tr><td>{row.name}</td></tr>
            <tr><td>{row.detail}</td></tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}
```

---

### 4. Strict Mode — Chế độ kiểm tra nâng cao

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### StrictMode giúp gì?

| Tính năng | Mô tả |
|-----------|-------|
| 🔍 Double-render | Render 2 lần để phát hiện side effect không mong muốn |
| ⚠️ Deprecated API | Cảnh báo API sắp bị loại bỏ |
| 🧹 Effect cleanup | Kiểm tra cleanup trong useEffect |
| 📛 Naming | Cảnh báo component không có tên |

> ⚠️ **Lưu ý:** StrictMode chỉ hoạt động ở **development**. Khi build production (`npm run build`), nó bị loại bỏ.

---

## 🟢 Lớp đơn giản hóa — Tóm tắt

| Khái niệm | So sánh đời thường | Kỹ thuật |
|-----------|---------------------|----------|
| **useEffect** | Hệ thần kinh tự phản ứng | `useEffect(() => {}, [deps])` |
| **Cleanup** | Tắt đèn khi ra khỏi phòng | `return () => cleanup()` |
| **Context** | WiFi phát sóng cả nhà | `createContext`, `Provider`, `useContext` |
| **Fragment** | Túi trong suốt | `<> </>` hoặc `<Fragment>` |
| **StrictMode** | Giáo viên kiểm tra bài kỹ | `<React.StrictMode>` |

---

## 🏭 Lớp thực tế — Ứng dụng thực tế

### Ví dụ: Ứng dụng đổi theme (Dark/Light Mode)

```jsx
// context/ThemeContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Lấy theme từ localStorage (nếu có)
    return localStorage.getItem('theme') || 'light'
  })

  // Lưu theme vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = theme  // Thêm class vào body
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

```jsx
// App.jsx
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
```

```jsx
// components/Header.jsx
import { useTheme } from '../context/ThemeContext'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`header ${theme}`}>
      <h1>🛍️ Cửa hàng</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
```

### Ví dụ: useEffect với Timer đếm ngược

```jsx
function CountdownTimer({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup khi unmount hoặc khi isRunning/seconds thay đổi
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="countdown">
      <h2>⏱ {minutes}:{secs.toString().padStart(2, '0')}</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '⏸ Tạm dừng' : '▶ Bắt đầu'}
      </button>
      <button onClick={() => { setSeconds(initialSeconds); setIsRunning(false) }}>
        🔄 Đặt lại
      </button>
    </div>
  )
}
```

---

## 🛠️ Thực hành

### Bài tập 1: useEffect — Đồng hồ hiện tại

```jsx
function DongHo() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="clock">
      <h2>🕐 {time.toLocaleTimeString('vi-VN')}</h2>
      <p>📅 {time.toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </div>
  )
}
```

### Bài tập 2: Context — Đa ngôn ngữ

```jsx
// context/LanguageContext.jsx
import { createContext, useState, useContext } from 'react'

const translations = {
  vi: { greeting: 'Xin chào', goodbye: 'Tạm biệt', lang: '🇻🇳 Tiếng Việt' },
  en: { greeting: 'Hello', goodbye: 'Goodbye', lang: '🇬🇧 English' },
  ja: { greeting: 'こんにちは', goodbye: 'さようなら', lang: '🇯🇵 日本語' },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('vi')
  
  const t = (key) => translations[lang][key] || key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
```

```jsx
// App.jsx
import { LanguageProvider, useLanguage } from './context/LanguageContext'

function Greeting() {
  const { t, lang, setLang } = useLanguage()
  
  return (
    <div>
      <h1>{t('greeting')}! 👋</h1>
      <p>{t('goodbye')}!</p>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="vi">🇻🇳 Tiếng Việt</option>
        <option value="en">🇬🇧 English</option>
        <option value="ja">🇯🇵 日本語</option>
      </select>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Greeting />
    </LanguageProvider>
  )
}
```

---

## ❌ Hiểu lầm thường gặp

| Hiểu lầm | Sự thật |
|-----------|---------|
| ❌ useEffect chạy trước khi render | ✅ useEffect chạy **SAU** khi render và DOM cập nhật |
| ❌ useEffect(() => {}, []) không cần cleanup | ✅ Vẫn cần cleanup nếu có subscription, timer, event listener |
| ❌ Context thay thế hoàn toàn Redux | ✅ Context phù hợp cho **global state đơn giản** (theme, auth, lang). State phức tạp nên dùng Redux/Zustand |
| ❌ `<> </>` có thể nhận props | ✅ Fragment **không nhận props** (trừ `key`). Dùng `<Fragment key={...}>` nếu cần key |
| ❌ StrictMode gây lỗi trong production | ✅ StrictMode **chỉ hoạt động** ở development |

---

## 🐛 Troubleshooting — Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Maximum update depth exceeded` | setState trong useEffect không có dependency | Thêm dependency array `[deps]` hoặc `[]` |
| `useContext is null` | Component không nằm trong Provider | Bọc component cha bằng `<Context.Provider>` |
| useEffect chạy vô hạn | Dependency thay đổi mỗi lần render | Kiểm tra dependency là primitive hoặc dùng `useCallback` |
| Cleanup không hoạt động | Quên return function | Luôn `return () => { cleanup }` nếu có side effect |
| Context không cập nhật | Quên truyền value vào Provider | Kiểm tra `<Context.Provider value={...}>` |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

### Câu hỏi kiểm tra

1. **useEffect(() => {}, []) chạy mấy lần? Khi nào?**
2. **Tại sao cần cleanup trong useEffect? Cho ví dụ.**
3. **Context API giải quyết vấn đề gì?**
4. **Sự khác biệt giữa `<> </>` và `<div> </div>`?**
5. **Viết code useEffect lưu count vào localStorage mỗi khi thay đổi.**

### Đáp án

1. Chạy **1 lần duy nhất** sau khi component mount lần đầu.
2. Để **dọn dẹp** resources (timer, event listener, subscription) khi component unmount hoặc dependency thay đổi. Ví dụ: `clearInterval` khi unmount.
3. Giải quyết **prop drilling** — truyền dữ liệu qua nhiều tầng component mà không cần truyền props từng tầng.
4. `<> </>` (Fragment) không tạo DOM node. `<div>` tạo một thẻ div thừa trong DOM.
5. Xem ví dụ ThemeProvider ở trên — dùng `useEffect(() => { localStorage.setItem('count', count) }, [count])`.

---

## 📌 Tóm tắt bài học

| Khái niệm | Mô tả |
|------------|-------|
| **useEffect** | Chạy side effects sau khi render |
| **Dependency array** | `[]` = 1 lần, `[deps]` = khi deps thay đổi, không có = mỗi lần |
| **Cleanup** | `return () => {}` — dọn dẹp khi unmount |
| **Context API** | Truyền dữ liệu qua nhiều tầng (Provider + useContext) |
| **Fragments** | Group elements không thêm DOM node (`<> </>`) |
| **StrictMode** | Chế độ kiểm tra lỗi trong development |

```
┌─────────────────────────────────────────────────┐
│         useEffect PATTERNS                       │
│                                                  │
│  1. Mount only:    useEffect(fn, [])             │
│  2. Every render:  useEffect(fn)                 │
│  3. Dep change:    useEffect(fn, [dep1, dep2])   │
│  4. With cleanup:  useEffect(() => {             │
│                       // setup                   │
│                       return () => { cleanup }   │
│                    }, [deps])                    │
└─────────────────────────────────────────────────┘
```

---

## ➡️ Bài tiếp theo — Class Components (Legacy)

> 🔮 **Preview:** Ở bài tiếp theo, bạn sẽ học:
> - **Class Components** — cú pháp cũ nhưng vẫn cần biết (vì codebase cũ)
> - **Lifecycle Methods** — componentDidMount, componentDidUpdate, componentWillUnmount
> - **Error Boundaries** — bắt lỗi trong component tree
> - **Khi nào dùng Class vs Functional?**

> 💡 *"Class components giống như xe số sàn — cũ nhưng vẫn chạy được. Functional components giống như xe tự động — hiện đại hơn, dễ lái hơn!"*

---

> 📝 **Ghi chú giảng viên:**
> - Demo useEffect bằng cách gọi API lấy danh sách users từ jsonplaceholder.typicode.com
> - Demo Context bằng Theme toggle — cho sinh viên thấy prop drilling vs useContext
> - Cho sinh viên thực hành: tạo ứng dụng đa ngôn ngữ đơn giản với Context
> - Nhấn mạnh: useEffect cleanup rất quan trọng — demo memory leak nếu không cleanup timer
