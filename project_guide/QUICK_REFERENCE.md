# 📘 QUICK REFERENCE
# **Tài liệu tra cứu nhanh - Nền tảng Phát triển Web**

*Tài liệu tham khảo nhanh các syntax, patterns, và best practices quan trọng*

---

## 🌐 HTML5

### Semantic Elements

```html
<!-- Structure -->
<header>    <!-- Đầu trang -->
<nav>       <!-- Menu điều hướng -->
<main>      <!-- Nội dung chính -->
<article>   <!-- Bài viết độc lập -->
<section>   <!-- Phần trong trang -->
<aside>     <!-- Nội dung phụ -->
<footer>    <!-- Chân trang -->

<!-- Content -->
<figure>    <!-- Hình ảnh với caption -->
  <img src="image.jpg" alt="Description">
  <figcaption>Caption text</figcaption>
</figure>

<time datetime="2025-12-06">December 6, 2025</time>
<mark>Highlighted text</mark>
```

### Forms

```html
<form action="/submit" method="POST">
  <!-- Text Input -->
  <input type="text" name="username" required 
         placeholder="Enter username" minlength="3">
  
  <!-- Email -->
  <input type="email" name="email" required>
  
  <!-- Password -->
  <input type="password" name="password" required minlength="8">
  
  <!-- Number -->
  <input type="number" name="age" min="18" max="100">
  
  <!-- Select -->
  <select name="category" required>
    <option value="">Choose...</option>
    <option value="1">Category 1</option>
  </select>
  
  <!-- Textarea -->
  <textarea name="message" rows="4" required></textarea>
  
  <!-- Checkbox -->
  <input type="checkbox" name="agree" required>
  
  <!-- Radio -->
  <input type="radio" name="gender" value="male">
  <input type="radio" name="gender" value="female">
  
  <button type="submit">Submit</button>
</form>
```

---

## 🎨 CSS3

### Selectors

```css
/* Element */
p { }

/* Class */
.className { }

/* ID */
#idName { }

/* Attribute */
[type="text"] { }
[href^="https"] { }  /* Starts with */
[href$=".pdf"] { }   /* Ends with */
[href*="google"] { } /* Contains */

/* Pseudo-classes */
:hover { }
:focus { }
:active { }
:first-child { }
:last-child { }
:nth-child(odd) { }
:nth-child(3n) { }

/* Pseudo-elements */
::before { content: ""; }
::after { content: ""; }
::first-letter { }
::first-line { }
```

### Box Model

```css
.box {
  /* Content */
  width: 300px;
  height: 200px;
  
  /* Padding */
  padding: 20px;
  padding: 10px 20px;              /* top/bottom left/right */
  padding: 10px 20px 30px 40px;   /* top right bottom left */
  
  /* Border */
  border: 2px solid #333;
  border-radius: 8px;
  
  /* Margin */
  margin: 20px auto;  /* Centering */
  
  /* Box Sizing */
  box-sizing: border-box;  /* Include padding & border in width */
}
```

### Flexbox

```css
.container {
  display: flex;
  
  /* Direction */
  flex-direction: row | column;
  
  /* Main axis */
  justify-content: flex-start | flex-end | center | 
                   space-between | space-around | space-evenly;
  
  /* Cross axis */
  align-items: flex-start | flex-end | center | stretch;
  
  /* Wrapping */
  flex-wrap: wrap | nowrap;
  
  /* Gap */
  gap: 20px;
}

.item {
  flex: 1;  /* Shorthand for flex-grow, flex-shrink, flex-basis */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}
```

### CSS Grid

```css
.grid-container {
  display: grid;
  
  /* Columns */
  grid-template-columns: 200px 1fr 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  /* Rows */
  grid-template-rows: auto 1fr auto;
  
  /* Gap */
  gap: 20px;
  column-gap: 20px;
  row-gap: 10px;
}

.grid-item {
  /* Placement */
  grid-column: 1 / 3;  /* Span from column 1 to 3 */
  grid-row: 1 / 2;
  
  /* Span */
  grid-column: span 2;
}
```

### Responsive Design

```css
/* Mobile First */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}

/* Common Breakpoints */
/* Mobile: < 768px */
/* Tablet: 768px - 1023px */
/* Desktop: ≥ 1024px */
```

### CSS Variables

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}
```

### Animations

```css
/* Transition */
.button {
  transition: all 0.3s ease;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: fadeIn 0.5s ease forwards;
  animation: name duration timing-function delay iteration-count direction;
}
```

---

## 💛 JavaScript ES6+

### Variables

```javascript
// Constants (cannot reassign)
const PI = 3.14159;
const user = { name: 'John' };

// Variables (can reassign)
let count = 0;
count = 1;

// Avoid var (function-scoped, hoisting issues)
```

### Arrow Functions

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With block
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Single parameter (no parentheses)
const square = x => x * x;

// No parameters
const greet = () => 'Hello!';
```

### Template Literals

```javascript
const name = 'John';
const age = 25;

// String interpolation
const message = `My name is ${name} and I'm ${age} years old.`;

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Expressions
const price = 100;
const total = `Total: $${price * 1.1}`;
```

### Destructuring

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Object destructuring
const user = { name: 'John', age: 25, city: 'NYC' };
const { name, age } = user;

// Rename
const { name: userName, age: userAge } = user;

// Default values
const { country = 'USA' } = user;

// Nested
const { address: { street } } = user;
```

### Spread/Rest Operators

```javascript
// Spread - Array
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Spread - Object
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 };

// Rest - Function parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
sum(1, 2, 3, 4);  // 10
```

### Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - Transform elements
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - Select elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// find - Find first match
const found = numbers.find(n => n > 3);
// 4

// reduce - Aggregate
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// forEach - Iterate (no return value)
numbers.forEach(n => console.log(n));

// some - At least one match
const hasEven = numbers.some(n => n % 2 === 0);  // true

// every - All match
const allPositive = numbers.every(n => n > 0);  // true
```

### Promises & Async/Await

```javascript
// Promise
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Multiple requests
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
}
```

### DOM Manipulation

```javascript
// Selection
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');
const byId = document.getElementById('id');

// Creation
const div = document.createElement('div');
div.textContent = 'Hello';
div.innerHTML = '<p>Hello</p>';
div.classList.add('active');
div.setAttribute('data-id', '123');

// Insertion
parent.appendChild(div);
parent.insertBefore(newElement, referenceElement);
parent.append(div);  // Can append multiple

// Removal
element.remove();
parent.removeChild(element);

// Modification
element.textContent = 'New text';
element.innerHTML = '<b>Bold text</b>';
element.style.color = 'red';
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
```

### Event Handling

```javascript
// addEventListener
button.addEventListener('click', (event) => {
  console.log('Clicked!', event.target);
});

// Event types
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('keydown', handler);
element.addEventListener('keyup', handler);
element.addEventListener('submit', handler);
element.addEventListener('change', handler);
element.addEventListener('input', handler);

// Event delegation
parent.addEventListener('click', (e) => {
  if (e.target.matches('.button-class')) {
    // Handle click on button
  }
});

// Prevent default
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form submission
});
```

### Fetch API

```javascript
// GET request
async function getProducts() {
  const response = await fetch('https://api.example.com/products');
  const data = await response.json();
  return data;
}

// POST request
async function createProduct(product) {
  const response = await fetch('https://api.example.com/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  return response.json();
}

// PUT request
async function updateProduct(id, product) {
  const response = await fetch(`https://api.example.com/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  return response.json();
}

// DELETE request
async function deleteProduct(id) {
  await fetch(`https://api.example.com/products/${id}`, {
    method: 'DELETE'
  });
}

// Error handling
async function fetchWithError() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

---

## ⚛️ React

### Component

```jsx
// Functional Component
function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}

// With destructuring in parameters
const ProductCard = ({ name, price, image }) => (
  <div className="product-card">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>${price}</p>
  </div>
);
```

### State (useState)

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// With object
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
    </form>
  );
}
```

### Effects (useEffect)

```jsx
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Run once on mount
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Run when dependency changes
  useEffect(() => {
    console.log('Products changed:', products);
  }, [products]);
  
  // Cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

### React Router

```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navigate programmatically
function ProductCard({ id }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/products/${id}`);
  };
  
  return <button onClick={handleClick}>View Details</button>;
}

// Get URL parameters
function ProductDetail() {
  const { id } = useParams();
  
  return <div>Product ID: {id}</div>;
}
```

---

## 💚 Vue 3

### Component

```vue
<template>
  <div class="product-card">
    <img :src="image" :alt="name" />
    <h3>{{ name }}</h3>
    <p>${{ price }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    name: String,
    price: Number,
    image: String
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 20px;
}
</style>
```

### Composition API

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>
```

### Reactive Data

```vue
<script setup>
import { ref, reactive, computed } from 'vue';

// ref - for primitives
const count = ref(0);
const message = ref('Hello');

// reactive - for objects
const user = reactive({
  name: 'John',
  age: 25
});

// computed - derived state
const doubleCount = computed(() => count.value * 2);

// Update
count.value = 10;
user.name = 'Jane';
</script>
```

### Lifecycle & Effects

```vue
<script setup>
import { ref, onMounted, onUpdated, onUnmounted, watch } from 'vue';

const products = ref([]);

// Lifecycle hooks
onMounted(async () => {
  const response = await fetch('/api/products');
  products.value = await response.json();
});

onUpdated(() => {
  console.log('Component updated');
});

onUnmounted(() => {
  console.log('Component unmounted');
});

// Watch
watch(products, (newValue, oldValue) => {
  console.log('Products changed:', newValue);
});
</script>
```

### Vue Router

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ProductList from '@/views/ProductList.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

```vue
<!-- In component -->
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products</router-link>
  </nav>
  
  <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Navigate
const goToProduct = (id) => {
  router.push(`/products/${id}`);
};

// Get params
const productId = route.params.id;
</script>
```

---

## 🛠️ Common Patterns

### Loading State

```javascript
// React
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;
  
  return <div>{/* Render data */}</div>;
}
```

### Form Handling

```javascript
// React
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      alert('Form submitted!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Debounce Search

```javascript
// React
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        search(searchTerm);
      } else {
        setResults([]);
      }
    }, 500);  // Wait 500ms after user stops typing
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  async function search(term) {
    const response = await fetch(`/api/search?q=${term}`);
    const data = await response.json();
    setResults(data);
  }
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 📦 NPM Commands

```bash
# Initialize project
npm init -y

# Install dependencies
npm install package-name
npm install package-name --save-dev

# Common packages
npm install react react-dom
npm install vue
npm install react-router-dom
npm install axios

# Run scripts
npm run dev
npm run build
npm start
npm test

# Update packages
npm update
npm outdated
```

---

## 🎯 Best Practices Checklist

### HTML
- ✅ Use semantic elements
- ✅ Add alt text to images
- ✅ Use proper heading hierarchy (h1 → h2 → h3)
- ✅ Include meta tags for SEO
- ✅ Validate with W3C Validator

### CSS
- ✅ Mobile-first approach
- ✅ Use CSS variables
- ✅ Avoid !important
- ✅ Use meaningful class names
- ✅ Minimize nesting depth (max 3-4 levels)

### JavaScript
- ✅ Use const/let, avoid var
- ✅ Use arrow functions
- ✅ Use async/await instead of callbacks
- ✅ Handle errors with try-catch
- ✅ Validate user input
- ✅ Avoid global variables

### React/Vue
- ✅ Keep components small and focused
- ✅ Use meaningful component names
- ✅ Validate props
- ✅ Handle loading and error states
- ✅ Use keys in lists
- ✅ Avoid inline functions in render

---

# KẾT THÚC QUICK REFERENCE
