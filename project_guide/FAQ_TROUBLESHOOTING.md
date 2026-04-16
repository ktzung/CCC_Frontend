# 📋 HỎI ĐÁP & TROUBLESHOOTING
# **Những câu hỏi thường gặp trong quá trình học**

---

# 1. SETUP & ENVIRONMENT

## Q: Cần cài đặt gì để bắt đầu?

**A:** Bắt buộc:
- Node.js 18+ (kèm npm)
- Visual Studio Code
- Git
- Chrome/Firefox browser

**Recommended VS Code Extensions:**
- ESLint
- Prettier
- Live Server
- Auto Rename Tag
- HTML CSS Support

---

## Q: Cách cài Node.js?

**A:**
1. Vào [nodejs.org](https://nodejs.org)
2. Tải LTS version
3. Cài đặt bình thường
4. Verify: `node --version` và `npm --version`

---

## Q: Đã cài Node nhưng `npm` không hoạt động?

**A:** Thêm Node vào PATH:
- Windows: Restart terminal sau khi cài
- Mac/Linux: `export PATH="/usr/local/bin:$PATH"`

---

# 2. HTML & CSS

## Q: Khi nào dùng `<div>` vs semantic tags?

**A:**
- `<div>`: Nhóm generic, styling
- `<header>`: Phần đầu trang
- `<nav>`: Menu điều hướng
- `<main>`: Nội dung chính
- `<article>`: Bài viết độc lập
- `<section>`: Phần logic trong trang
- `<aside>`: Sidebar, related links
- `<footer>`: Chân trang

**Rule:** Dùng semantic tag khi có ý nghĩa!

---

## Q: Flexbox hay CSS Grid khi nào?

**A:**
| Tình huống | Dùng |
|:-----------|:-----|
| Navbar (items xếp hàng) | Flexbox |
| Product grid 3 cột | Grid hoặc Flexbox |
| Complex page layout | Grid |
| Centering element | Flexbox |
| Sidebar + Main | Grid |

---

## Q: Làm sao để center element?

**A:**
```css
/* Flexbox (best) */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid */
.container {
  display: grid;
  place-items: center;
}

/* Absolute positioning */
.container {
  position: relative;
}
.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Margin auto */
.item {
  margin: auto;
}
```

---

## Q: CSS specificity là gì?

**A:** Mức độ ưu tiên của selector:
- ID (#id): 100 points
- Class (.class): 10 points
- Element (p): 1 point

`#header` (100) > `.primary` (10) > `p` (1)

**Best practice:** Giữ specificity thấp → dễ override

---

## Q: Sao CSS của tôi không hoạt động?

**A:** Kiểm tra:
1. File CSS có được link không? `<link rel="stylesheet" href="style.css">`
2. Selector có match element không? Dùng DevTools inspect
3. Specificity có cao không? Dùng DevTools xem CSS nào áp dụng
4. Browser cache? Hard refresh: Ctrl+Shift+R

---

# 3. JAVASCRIPT

## Q: Var vs Let vs Const khác gì?

**A:**
| | Scope | Hoisting | Reassign |
|:------|:------|:---------|:---------|
| **var** | Function | Yes | ✅ |
| **let** | Block | No | ✅ |
| **const** | Block | No | ❌ |

**Rule:** Dùng `const` by default, `let` khi cần reassign, KHÔNG dùng `var`

```javascript
const PI = 3.14;      // ✅
let count = 0;
count++;              // ✅

const arr = [];
arr.push(1);          // ✅ (push là method, không reassign)
```

---

## Q: Arrow function vs Regular function?

**A:**
```javascript
// Regular
function add(a, b) {
  return a + b;
}

// Arrow (viết gọn)
const add = (a, b) => {
  return a + b;
}

// Arrow (ultra gọn nếu 1 dòng)
const add = (a, b) => a + b;
```

**Khác biệt:** `this` binding (advanced topic)

---

## Q: Async/Await vs .then() - nên dùng cái nào?

**A:** **Dùng async/await!** Clean hơn:

```javascript
// ❌ Callback hell
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

// ✅ Async/await (rõ ràng hơn)
async function getData() {
  try {
    const res = await fetch('/api/data')
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
```

---

## Q: Làm sao debug JavaScript?

**A:**
1. Mở DevTools: F12
2. Tab "Console": Xem errors
3. Tab "Sources": Đặt breakpoint, step through code
4. `console.log()`: Đơn giản nhất
5. `debugger;` statement: Pause code

```javascript
const user = { name: 'John' };
console.log(user);  // Xem object
debugger;           // Pause tại đây
```

---

# 4. REACT

## Q: Component là gì?

**A:** Hàm JavaScript trả về JSX:

```javascript
function Button() {
  return <button>Click me</button>
}

// Là tương đương với:
function Button() {
  return React.createElement('button', null, 'Click me')
}
```

---

## Q: Props là gì? Khác gì State?

**A:**
| | Props | State |
|:------|:-------|:--------|
| **Nguồn** | Parent → Child | Component itself |
| **Thay đổi được** | ❌ Read-only | ✅ Mutable |
| **Use case** | Pass data | Store data |

```jsx
// Props (nhận từ parent)
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>
}

// State (local)
function Counter() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

---

## Q: useEffect là gì?

**A:** Hook chạy side effects (fetch data, subscribe, etc):

```javascript
// Chạy mỗi lần component render
useEffect(() => {
  console.log('Render')
})

// Chạy 1 lần khi mount
useEffect(() => {
  console.log('Mount')
}, [])

// Chạy khi dependency thay đổi
useEffect(() => {
  console.log('Count changed:', count)
}, [count])

// Cleanup
useEffect(() => {
  console.log('Mount')
  return () => console.log('Unmount')
}, [])
```

---

## Q: Khi nào dùng `<Link>` vs `<a>`?

**A:**
```jsx
// React Router (single-page navigation)
import { Link } from 'react-router-dom'
<Link to="/about">About</Link>

// External link (different website)
<a href="https://example.com">External</a>
```

---

# 5. DEPLOYMENT & TOOLS

## Q: Cách deploy React app?

**A:** Các option phổ biến (đều FREE):

1. **Vercel** (dễ nhất)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo
   - Auto deploy on push

3. **GitHub Pages** (static)
   ```bash
   npm run build
   git add dist/
   git commit -m "Build"
   git push
   ```

---

## Q: Sao build size quá lớn?

**A:**
1. Check dependencies: `npm list`
2. Remove unused: `npm prune`
3. Code splitting: `React.lazy()`
4. Tree shaking: ESM imports
5. Minify: Production build tự làm

```bash
npm run build  # Creates optimized build
```

---

## Q: Cách học Git?

**A:** Cơ bản là đủ:

```bash
git init                      # Initialize repo
git add .                     # Stage changes
git commit -m "message"       # Commit
git push origin main          # Push to GitHub
git pull                      # Fetch & merge

git branch feature            # Create branch
git checkout feature          # Switch branch
git merge feature             # Merge to main
```

---

# 6. PERFORMANCE & BEST PRACTICES

## Q: Tại sao React app tôi chậm?

**A:**
1. **Unnecessary re-renders:** Dùng `React.memo` hoặc `useMemo`
2. **Large bundle:** Code splitting với `React.lazy`
3. **Network requests:** Caching, pagination
4. **Heavy computations:** useCallback hoặc Web Workers

---

## Q: Cách optimize images?

**A:**
```html
<!-- Responsive images -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Different sizes -->
<picture>
  <source media="(max-width: 480px)" srcset="small.jpg">
  <img src="large.jpg" alt="">
</picture>

<!-- Webp format -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="">
</picture>
```

---

## Q: CSS hay Tailwind CSS?

**A:**
| | CSS | Tailwind |
|:---|:---:|:------:|
| **Learning curve** | Easy | Steep |
| **File size** | Small | Large |
| **Flexibility** | High | Medium |
| **For beginners** | ✅ | ❌ |

**Recommendation:** Bắt đầu với CSS, Tailwind sau!

---

# 7. COMMON ERRORS

## Q: "Cannot read property of undefined"

**A:** Biến chưa được define:
```javascript
// ❌
const user = fetchUser();  // undefined
console.log(user.name);    // ERROR!

// ✅
const user = await fetchUser();
if (user) console.log(user.name);
```

---

## Q: "Key prop not specified"

**A:** React yêu cầu key khi render lists:
```jsx
// ❌
{items.map((item) => <div>{item.name}</div>)}

// ✅
{items.map((item) => <div key={item.id}>{item.name}</div>)}
```

---

## Q: CORS error

**A:** API không allow request từ origin khác:
```javascript
// Có thể dùng proxy hoặc API server có CORS headers
const res = await fetch('http://localhost:3001/api/data', {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

---

## Q: "Module not found"

**A:**
```bash
npm install package-name  # Install missing package

# Hoặc check imports
import { Component } from './Component'  // Check path exists
```

---

# 8. GENERAL ADVICE

## Q: Bắt đầu như thế nào?

**A:**
1. **HTML + CSS trước:** Tạo layout tĩnh
2. **JavaScript:** Thêm interactivity
3. **APIs:** Kết nối backend
4. **Framework:** React/Vue khi vững
5. **Deploy:** Lên production

---

## Q: Cách học hiệu quả?

**A:**
- 👀 Watch → Hiểu khái niệm
- 💻 Code → Gõ code từ đầu (không copy-paste)
- 🔧 Modify → Thử sửa/thêm tính năng
- 🏗️ Build → Tự làm mini projects
- 📚 Repeat → Ôn lại khi cần

---

## Q: Stuck ở đâu phải làm sao?

**A:**
1. **Google:** "error message" + "javascript"
2. **Stack Overflow:** Tìm câu hỏi tương tự
3. **Official docs:** React docs, MDN Web Docs
4. **Chat GPT:** Hỏi để hiểu khái niệm
5. **Ask instructor:** Nếu thực sự stuck

---

**Lưu ý:** FAQ này sẽ được cập nhật khi có câu hỏi mới từ sinh viên!
