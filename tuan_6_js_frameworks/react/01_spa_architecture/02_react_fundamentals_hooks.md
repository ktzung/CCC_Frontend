# 🟫 CHƯƠNG 12
# **REACT — FUNDAMENTALS & HOOKS (SPA-Focused)**

## 🎬 "HTML Viết Trong JavaScript?!" — Cú Sốc JSX

*Minh mở file React đầu tiên: `return <h1>Hello</h1>` — bên trong một FUNCTION JavaScript. "HTML TRONG JS?!" Đúng. Đó là JSX. Và đây là lý do React thống trị: UI = f(state). Giao diện = hàm của dữ liệu.*

Các phần cơ bản (JSX, Components, Props, `useState`, `useEffect`) đã được hợp nhất tại: [tuan_6_react_essentials/02_basic_principles.md](tuan_6_react_essentials/02_basic_principles.md).

Các phần sâu về Hooks nằm ở: [tuan_7_react_hooks/06_hooks_api.md](tuan_7_react_hooks/06_hooks_api.md).

Mục tiêu chương (tóm tắt): SPA setup, dev workflow, app structure, code-splitting và troubleshooting.

# 1. **SETUP & JSX**

## 1.1. React setup with Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

---

## 1.2. What is JSX?

```javascript
// JSX = JavaScript + XML
// Looks like HTML, but it's JavaScript!

// ❌ Traditional JavaScript
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello React'
);

// ✅ JSX (much cleaner!)
const element = <h1 className="title">Hello React</h1>;
```

---

## 1.3. JSX syntax rules

```javascript
// 1. Return single root element
// ❌ Wrong: Multiple root elements
return (
  <header>Header</header>
  <main>Main</main>
);

// ✅ Correct: Wrap in fragment or div
return (
  <>
    <header>Header</header>
    <main>Main</main>
  </>
);

// 2. className instead of class
<div className="container">Hello</div>

// 3. camelCase for events
<button onClick={handleClick}>Click</button>  // not onclick

// 4. Self-closing tags
<img src="image.jpg" />
<br />

// 5. JavaScript expressions in {}
const name = 'John';
<h1>Hello {name}</h1>
<p>2 + 2 = {2 + 2}</p>
```

---

# 2. **COMPONENTS & PROPS**

## 2.1. Functional components

```javascript
// Simplest component
function Greeting() {
  return <h1>Hello World</h1>;
}

// Component with props
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}

// Better: Destructuring
function Greeting({ name, age }) {
  return <h1>Hello {name}, age {age}</h1>;
}

// Usage
export default function App() {
  return <Greeting name="John" age={25} />;
}
```

---

## 2.2. Props drilling

```javascript
// Level 1: App
function App() {
  const user = { name: 'John', role: 'admin' };
  return <Dashboard user={user} />;
}

// Level 2: Dashboard
function Dashboard({ user }) {
  return <Header user={user} />;
}

// Level 3: Header
function Header({ user }) {
  return <UserMenu user={user} />;
}

// Level 4: UserMenu
function UserMenu({ user }) {
  return <p>{user.name} ({user.role})</p>;
}

// Problem: Passing props through many levels = messy!
```

---

## 2.3. Props best practices

```javascript
// ✅ Good: Document prop types
function ProductCard({ id, name, price, onAddToCart }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={() => onAddToCart(id)}>Add</button>
    </div>
  );
}

// ✅ Good: Default props
function Button({ text = 'Click me', onClick = () => {} }) {
  return <button onClick={onClick}>{text}</button>;
}

// ✅ Good: Destructure what you need
function User({ name, email, phone, address, ...rest }) {
  return <p>{name} - {email}</p>;
}
```

---

# 3. **USESTATE HOOK**

## 3.1. Basic useState

```javascript
import { useState } from 'react';

export default function Counter() {
  // count = current state value
  // setCount = function to update state
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// When button clicked:
// 1. setCount called
// 2. React updates state
// 3. Component re-renders
// 4. New value displayed
```

---

## 3.2. Multiple states

```javascript
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate login
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## 3.3. State with objects & arrays

```javascript
// ❌ Wrong: Direct mutation
const [user, setUser] = useState({ name: 'John', age: 25 });

user.age = 26;  // ❌ Direct mutation!
setUser(user);  // React might not detect change

// ✅ Correct: Create new object (spread operator)
const [user, setUser] = useState({ name: 'John', age: 25 });

setUser({ ...user, age: 26 });  // ✅ New object

// Array example
const [items, setItems] = useState(['Apple', 'Orange']);

// Add item
setItems([...items, 'Banana']);

// Remove item
setItems(items.filter(item => item !== 'Orange'));

// Update item
setItems(items.map(item => item === 'Apple' ? 'Mango' : item));
```

---

# 4. **USEEFFECT HOOK**

## 4.1. Side effects

```javascript
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);  // Empty dependency array = run once on mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

---

## 4.2. Dependency array

```javascript
// 1. No dependency array = Run on every render
useEffect(() => {
  console.log('Runs every render!');
});

// 2. Empty dependency array = Run once on mount
useEffect(() => {
  console.log('Runs once on mount');
}, []);

// 3. With dependencies = Run when dependencies change
const [count, setCount] = useState(0);
const [name, setName] = useState('');

useEffect(() => {
  console.log('Count changed:', count);
}, [count]);  // Run when count changes

// 4. Multiple dependencies
useEffect(() => {
  console.log('Count or name changed');
}, [count, name]);
```

---

## 4.3. Cleanup function

```javascript
// Timer example
export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Setup: Start interval
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: Stop interval
    return () => clearInterval(interval);
  }, []);  // Run once on mount, cleanup on unmount

  return <p>Seconds: {seconds}</p>;
}

// Event listener example
useEffect(() => {
  const handleResize = () => console.log('Window resized');
  
  window.addEventListener('resize', handleResize);

  // Cleanup: Remove listener
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

# 5. **CONDITIONAL RENDERING & LISTS**

## 5.1. Conditional rendering

```javascript
export default function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. if statement
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  }
  return <p>Please log in</p>;

  // 2. Ternary operator
  return isLoggedIn ? <p>Welcome!</p> : <p>Log in</p>;

  // 3. Logical AND operator
  return isLoggedIn && <p>Welcome!</p>;

  // 4. Multiple conditions
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
}
```

---

## 5.2. Lists & keys

```javascript
const products = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Orange' },
  { id: 3, name: 'Banana' },
];

// ❌ Wrong: Using index as key
{products.map((product, index) => (
  <li key={index}>{product.name}</li>
))}
// Problem: If list reorders, key changes!

// ✅ Correct: Using unique ID
{products.map(product => (
  <li key={product.id}>{product.name}</li>
))}

// With components
export default function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductItem({ product }) {
  return <li>{product.name}</li>;
}
```

---

# 6. **PRACTICAL EXAMPLE: TODO APP**

```javascript
import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>My Todos</h1>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{
            textDecoration: todo.done ? 'line-through' : 'none',
          }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>Total: {todos.length}, Done: {todos.filter(t => t.done).length}</p>
    </div>
  );
}
```

---

# 7. **FORMS & CONTROLLED COMPONENTS**

## 7.1. Controlled vs uncontrolled

```javascript
// ❌ Uncontrolled (traditional HTML)
<input type="text" />
// Value managed by DOM, not React

// ✅ Controlled (React way)
const [value, setValue] = useState('');

<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
// Value managed by React state

// Benefits: Easy to validate, filter, pre-fill
```

---

## 7.2. Form handling

```javascript
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Send to API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

# 🎯 BÀI TẬP THỰC HÀNH

## BT1: Simple component
Tạo Counter component với increment/decrement

## BT2: Fetch data
Fetch từ API, display products list với loading state

## BT3: Todo app
Implement todo app (add, delete, toggle)

## BT4: Form handling
Contact form với validation

---

# 📝 MINI TEST

1. JSX là gì? Khác HTML như thế nào?
2. Props dùng để làm gì? Props drilling là gì?
3. useState hook dùng để gì?
4. useEffect hook dùng để gì? Dependency array là gì?
5. Conditional rendering có cách nào?

---

# 💾 TỔNG KẾT

**JSX:** JavaScript + HTML syntax  
**Components:** Functions returning JSX  
**Props:** Pass data to components  
**useState:** Manage component state  
**useEffect:** Side effects & data fetching  
**Conditional rendering:** if/ternary/&&  
**Lists:** Map with proper keys  

**Next:** React Router & API Integration!
