# Tier 14 — Context API (Truyền dữ liệu không cần Props)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Chia sẻ dữ liệu toàn cục bằng Context API  
> **📋 Cần biết:** Tier 4 (Props), Tier 6 (useState)  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh có theme (sáng/tối) dùng ở 50 component. Props truyền qua 5 lớp?*

```
App → Layout → Header → Navbar → ThemeToggle
theme  theme    theme    theme    ← Phải truyền qua 5 lớp!
```

*"Dùng Context. Truyền trực tiếp từ Provider đến bất kỳ component nào cần."*

---

## 🎯 Hôm nay bạn sẽ học

```
Context API = Truyền dữ liệu "qua không khí" (không cần Props)
            = Giống WiFi: phát 1 lần, mọi thiết bị nhận được

Provider  = "Trạm phát sóng" (ở gần gốc)
useContext = "Kết nối WiFi" (ở bất kỳ component nào)
```

---

## 📝 Bài 14.1 — Tạo Context (12 phút)

### Bước 1: Tạo Context

```jsx
// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
```

### Bước 2: Wrap App với Provider

```jsx
// main.jsx hoặc App.jsx
import { ThemeProvider } from './ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    );
}
```

### Bước 3: Dùng ở bất kỳ component nào

```jsx
// Navbar.jsx — không cần Props!
function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`navbar ${theme}`}>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </nav>
    );
}

// Footer.jsx — cũng không cần Props!
function Footer() {
    const { theme } = useTheme();

    return (
        <footer className={`footer ${theme}`}>
            <p>© 2026 My App</p>
        </footer>
    );
}
```

---

## 📝 Bài 14.2 — Auth Context (12 phút)

### Context cho xác thực

```jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        // Giả lập API call
        const fakeUser = { id: 1, name: 'Minh', email };
        setUser(fakeUser);
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
```

### Sử dụng

```jsx
function Navbar() {
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <nav>
            {isLoggedIn ? (
                <span>Xin chào, {user.name} <button onClick={logout}>Thoát</button></span>
            ) : (
                <Link to="/login">Đăng nhập</Link>
            )}
        </nav>
    );
}
```

---

## 📊 So sánh: Props vs Context

```
                    Props                       Context
                    ─────                       ───────
Truyền dữ liệu     Cha → Con (từng lớp)       Provider → Bất kỳ component
Phức tạp            Nhiều lớp = prop drilling   Không cần truyền qua lớp
Performance         Tốt hơn                     Re-render nhiều hơn
Khi nào dùng       Ít component, gần nhau      Nhiều component, xa nhau
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Context thay thế Props hoàn toàn | Context cho dữ liệu toàn cục, Props cho component cụ thể |
| Context luôn nhanh | Context re-render tất cả consumer khi value thay đổi |
| Không cần useState với Context | Context kết hợp useState để quản lý state |

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 4:** Props — so sánh Props vs Context
- **Dùng kiến thức từ Tier 6:** useState — state trong Context Provider
- **Sẽ cần trong Tier 15:** Custom hooks — đóng gói useContext thành hook
- **Sẽ cần trong Tier 22:** Redux — giải pháp thay thế Context cho app lớn
- **Tham khảo thêm:** `04_hooks/04_behind_the_scenes.md` (file cũ)
