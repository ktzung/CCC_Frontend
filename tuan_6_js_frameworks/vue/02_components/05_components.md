# 🟢 MODULE 2 - BÀI 05
# **COMPONENTS (SINGLE-FILE COMPONENTS)**

## 🎬 "1 File = 1 Component = Template + Logic + Style" — Sức Mạnh SFC

*Minh viết React: component.jsx + component.css + component.test.js — 3 files. Vue: `ProductCard.vue` — MỘT file chứa HTML (template), JS (script), CSS (style). "Đóng gói hoàn chỉnh, mở 1 file = hiểu mọi thứ."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu Components là gì và tại sao cần dùng
- Tạo Single-File Components (SFC) với `.vue` files
- Sử dụng components trong các components khác
- Hiểu cấu trúc của một SFC (template, script, style)
- Sử dụng scoped styles

---

## 1. **COMPONENTS LÀ GÌ?**

### 1.1. Khái niệm

Component là các khối xây dựng của ứng dụng Vue. Mỗi component:
- **Độc lập:** Có logic và UI riêng
- **Tái sử dụng:** Dùng lại ở nhiều nơi
- **Có thể kết hợp:** Component cha có thể chứa component con

**Ví dụ thực tế:**
```
Website E-Commerce
├── Header Component (Logo, Navigation, Cart)
├── ProductList Component
│   ├── ProductCard Component (x10)
│   └── ProductCard Component
├── Footer Component
└── Modal Component
```

### 1.2. Lợi ích của Components

- ✅ **Tổ chức code tốt:** Mỗi component trong một file riêng
- ✅ **Tái sử dụng:** Viết một lần, dùng nhiều nơi
- ✅ **Dễ bảo trì:** Sửa một component không ảnh hưởng component khác
- ✅ **Dễ test:** Test từng component độc lập
- ✅ **Teamwork:** Nhiều người có thể làm việc trên các components khác nhau

---

## 2. **SINGLE-FILE COMPONENTS (SFC)**

Single-File Component là cách tổ chức component trong Vue, với 3 phần trong một file `.vue`:

### 2.1. Cấu trúc cơ bản

```vue
<template>
  <!-- HTML template -->
  <div class="greeting">
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
// JavaScript logic
import { ref } from 'vue'

const message = ref('Hello Vue!')
</script>

<style scoped>
/* CSS styles */
.greeting {
  color: #42b983;
}
</style>
```

**Giải thích:**
- `<template>`: HTML markup (bắt buộc)
- `<script setup>`: JavaScript logic với Composition API
- `<style>`: CSS styles (tùy chọn)

### 2.2. Ví dụ: Button Component

Tạo file `src/components/Button.vue`:

```vue
<template>
  <button 
    :class="['btn', `btn-${variant}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

function handleClick(event) {
  if (!props.disabled) {
    emit('click', event)
  }
}

const props = defineProps({
  variant: String,
  disabled: Boolean
})
</script>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #35a372;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

**Sử dụng Button component:**

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Click me
    </Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger" :disabled="true">
      Disabled
    </Button>
  </div>
</template>

<script setup>
import Button from './components/Button.vue'

function handleClick() {
  console.log('Button clicked!')
}
</script>
```

---

## 3. **SỬ DỤNG COMPONENTS**

### 3.1. Import và sử dụng

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <ProductList />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import ProductList from './components/ProductList.vue'
import Footer from './components/Footer.vue'
</script>
```

### 3.2. Component registration (Global)

Nếu muốn dùng component ở mọi nơi mà không cần import:

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Button from './components/Button.vue'

const app = createApp(App)

// Global registration
app.component('Button', Button)

app.mount('#app')
```

Sau đó có thể dùng ở bất kỳ đâu:
```vue
<template>
  <Button>Click me</Button>
</template>
```

**⚠️ Lưu ý:** Chỉ nên register global cho components dùng rất nhiều (như Button, Input).

---

## 4. **VÍ DỤ: PRODUCT CARD COMPONENT**

Tạo component hoàn chỉnh để hiểu rõ hơn:

```vue
<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <span v-if="product.discount" class="discount-badge">
        -{{ product.discount }}%
      </span>
    </div>
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-price">
        <span class="current-price">${{ product.price }}</span>
        <span v-if="product.originalPrice" class="original-price">
          ${{ product.originalPrice }}
        </span>
      </div>
      
      <div class="product-actions">
        <Button 
          variant="primary" 
          @click="addToCart"
          :disabled="!product.inStock"
        >
          {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </Button>
        <button class="wishlist-btn" @click="toggleWishlist">
          ❤️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (product) => {
      return product.name && product.price
    }
  }
})

const emit = defineEmits(['add-to-cart', 'toggle-wishlist'])

const isInWishlist = ref(false)

function addToCart() {
  emit('add-to-cart', props.product)
}

function toggleWishlist() {
  isInWishlist.value = !isInWishlist.value
  emit('toggle-wishlist', {
    product: props.product,
    inWishlist: isInWishlist.value
  })
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

.product-info {
  padding: 1rem;
}

.product-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.product-description {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.product-price {
  margin-bottom: 1rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
}

.original-price {
  margin-left: 0.5rem;
  text-decoration: line-through;
  color: #999;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.wishlist-btn {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
}

.wishlist-btn:hover {
  background-color: #f5f5f5;
}
</style>
```

**Sử dụng ProductCard:**

```vue
<!-- src/components/ProductList.vue -->
<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
      @toggle-wishlist="handleToggleWishlist"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([
  {
    id: 1,
    name: 'Laptop',
    description: 'High performance laptop',
    price: 999,
    originalPrice: 1299,
    discount: 23,
    image: '/images/laptop.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 29,
    image: '/images/mouse.jpg',
    inStock: false
  }
])

function handleAddToCart(product) {
  console.log('Added to cart:', product)
  // Logic thêm vào giỏ hàng
}

function handleToggleWishlist(data) {
  console.log('Wishlist:', data)
  // Logic wishlist
}
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
</style>
```

---

## 5. **SCOPED STYLES**

### 5.1. Scoped CSS

`scoped` đảm bảo styles chỉ áp dụng cho component hiện tại:

```vue
<template>
  <div class="container">
    <h1>Title</h1>
  </div>
</template>

<style scoped>
/* Chỉ áp dụng cho component này */
.container {
  padding: 2rem;
}

h1 {
  color: blue;
}
</style>
```

**Không scoped:**
```vue
<style>
/* Áp dụng cho TẤT CẢ components */
h1 {
  color: blue; /* Tất cả h1 trong app sẽ màu blue */
}
</style>
```

### 5.2. Deep selectors

Để style child components:

```vue
<style scoped>
/* Không hoạt động với child component */
.child-component h2 {
  color: red;
}

/* Dùng :deep() hoặc >>> */
:deep(.child-component h2) {
  color: red;
}

/* Hoặc */
::v-deep(.child-component h2) {
  color: red;
}
</style>
```

---

## 6. **BEST PRACTICES**

### 6.1. Đặt tên components

- ✅ PascalCase: `ProductCard.vue`, `UserProfile.vue`
- ❌ camelCase: `productCard.vue`
- ❌ kebab-case: `product-card.vue`

### 6.2. Tổ chức thư mục

```
src/
├── components/
│   ├── common/          # Components dùng chung
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   └── Modal.vue
│   ├── layout/         # Layout components
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Sidebar.vue
│   └── features/        # Feature-specific components
│       ├── products/
│       │   ├── ProductCard.vue
│       │   └── ProductList.vue
│       └── users/
│           ├── UserCard.vue
│           └── UserList.vue
```

### 6.3. Component size

- ✅ Giữ component nhỏ, tập trung vào một nhiệm vụ
- ❌ Tránh component quá lớn (>300 lines)
- ✅ Tách component lớn thành nhiều components nhỏ

---

## 7. **TỔNG KẾT**

- ✅ **Components** là khối xây dựng của Vue app
- ✅ **SFC** (.vue files) chứa template, script, style
- ✅ Import và sử dụng components trong components khác
- ✅ **Scoped styles** để tránh style conflicts
- ✅ Tổ chức components theo thư mục logic
- ✅ Giữ components nhỏ và tập trung

---

**Bài tiếp theo:** [06. Component Communication](../02_components/06_component_communication.md) - Học cách truyền data giữa components với Props và Events.
