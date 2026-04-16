# 🔴 ANGULAR - BÀI 02
# **COMPONENTS & TEMPLATES**

## 🎬 "1 Lệnh CLI = 4 File Chuẩn" — Angular Components

*Minh gõ `ng g c user-card`. Angular CLI tự tạo: `.ts` (logic), `.html` (template), `.css` (styles), `.spec.ts` (test). Chị Hà: "Angular ép em viết code CÓ CẤU TRÚC từ ngày 1. React cho tự do, Angular cho KỶ LUẬT."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Tạo Angular components với Angular CLI
- Hiểu cấu trúc component (class, template, styles)
- Sử dụng data binding (interpolation, property, event, two-way)
- Sử dụng các directives phổ biến (ngIf, ngFor, ngClass, ngStyle)
- Hiểu component lifecycle và lifecycle hooks

---

## 1. **COMPONENTS LÀ GÌ?**

### 1.1. Khái niệm

Component trong Angular là một class TypeScript được decorate với `@Component`, kết hợp với:
- **Template (HTML):** Định nghĩa view
- **Styles (CSS):** Định nghĩa appearance
- **Class (TypeScript):** Chứa logic và data

Mỗi component là một phần độc lập, có thể tái sử dụng trong ứng dụng.

### 1.2. Component structure

Một component Angular bao gồm 3 file chính:
1. **`.component.ts`** - TypeScript class với logic
2. **`.component.html`** - HTML template
3. **`.component.css`** - CSS styles

---

## 2. **TẠO COMPONENT**

### 2.1. Generate component với Angular CLI

Cách tốt nhất để tạo component là sử dụng Angular CLI:

```bash
ng generate component user-card
# Hoặc shorthand
ng g c user-card
```

**Kết quả:**
```
src/app/user-card/
├── user-card.component.ts      # Component class
├── user-card.component.html    # Template
├── user-card.component.css     # Styles
└── user-card.component.spec.ts # Unit tests
```

**Lưu ý:** Angular CLI tự động:
- Tạo các file cần thiết
- Import component vào module
- Tạo unit test file

### 2.2. Component class

**user-card.component.ts:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',           // CSS selector để sử dụng component
  templateUrl: './user-card.component.html',  // Đường dẫn đến template
  styleUrls: ['./user-card.component.css']   // Đường dẫn đến styles
})
export class UserCardComponent {
  // Component properties
  name = 'Khoa';
  age = 25;
  email = 'khoa@example.com';
  isActive = true;

  // Component methods
  getGreeting(): string {
    return `Hello, ${this.name}!`;
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
```

**Giải thích:**
- `@Component`: Decorator đánh dấu class là Angular component
- `selector`: Tên tag để sử dụng component (`<app-user-card>`)
- `templateUrl`: Đường dẫn đến file HTML template
- `styleUrls`: Mảng các file CSS (có thể có nhiều file)

### 2.3. Component template

**user-card.component.html:**
```html
<div class="user-card" [class.active]="isActive">
  <h3>{{ name }}</h3>
  <p>Age: {{ age }}</p>
  <p>Email: {{ email }}</p>
  <p>{{ getGreeting() }}</p>
  <button (click)="toggleActive()">
    {{ isActive ? 'Deactivate' : 'Activate' }}
  </button>
</div>
```

### 2.4. Component styles

**user-card.component.css:**
```css
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
}

.user-card.active {
  background-color: #e8f5e9;
  border-color: #4caf50;
}
```

### 2.5. Sử dụng component

**app.component.html:**
```html
<app-user-card></app-user-card>
```

Hoặc trong component khác:
```typescript
import { UserCardComponent } from './user-card/user-card.component';
```

---

## 3. **DATA BINDING**

Angular cung cấp 4 loại data binding:

### 3.1. Interpolation ({{ }})

Hiển thị giá trị từ component class vào template:

```html
<p>{{ title }}</p>
<p>{{ user.name }}</p>
<p>{{ 1 + 1 }}</p>
<p>{{ getGreeting() }}</p>
<p>{{ user.isActive ? 'Active' : 'Inactive' }}</p>
```

**Ví dụ:**
```typescript
export class AppComponent {
  title = 'My App';
  user = {
    name: 'Khoa',
    isActive: true
  };

  getGreeting(): string {
    return `Hello, ${this.user.name}!`;
  }
}
```

```html
<h1>{{ title }}</h1>
<p>User: {{ user.name }}</p>
<p>Status: {{ user.isActive ? 'Active' : 'Inactive' }}</p>
<p>{{ getGreeting() }}</p>
```

### 3.2. Property Binding ([property])

Bind giá trị từ component vào HTML element properties:

```html
<!-- Bind to HTML attribute -->
<img [src]="imageUrl" [alt]="imageAlt" />

<!-- Bind to DOM property -->
<button [disabled]="isDisabled">Click</button>

<!-- Bind to class -->
<div [class.active]="isActive">Content</div>

<!-- Bind multiple classes -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>
```

**Ví dụ:**
```typescript
export class ImageComponent {
  imageUrl = 'https://example.com/image.jpg';
  imageAlt = 'Example image';
  isDisabled = false;
  isActive = true;
}
```

```html
<img [src]="imageUrl" [alt]="imageAlt" />
<button [disabled]="isDisabled">Click me</button>
<div [class.active]="isActive">Active content</div>
```

### 3.3. Event Binding ((event))

Bind methods từ component vào DOM events:

```html
<!-- Click event -->
<button (click)="handleClick()">Click</button>

<!-- Input event -->
<input (input)="handleInput($event)" />

<!-- Form submit -->
<form (submit)="handleSubmit($event)">
  <button type="submit">Submit</button>
</form>

<!-- Custom event -->
<app-child (customEvent)="handleCustomEvent($event)"></app-child>
```

**Ví dụ:**
```typescript
export class ButtonComponent {
  count = 0;
  inputValue = '';

  handleClick(): void {
    this.count++;
    console.log('Button clicked!');
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    console.log('Input value:', this.inputValue);
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form submitted');
  }
}
```

```html
<button (click)="handleClick()">Count: {{ count }}</button>
<input (input)="handleInput($event)" [value]="inputValue" />
<form (submit)="handleSubmit($event)">
  <button type="submit">Submit</button>
</form>
```

### 3.4. Two-way Binding ([(ngModel)])

Kết hợp property binding và event binding để đồng bộ data hai chiều:

**Bước 1: Import FormsModule**

**app.module.ts:**
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule  // Cần import để dùng ngModel
  ]
})
```

**Bước 2: Sử dụng trong component**

```typescript
export class FormComponent {
  name = '';
  email = '';
}
```

```html
<input [(ngModel)]="name" placeholder="Name" />
<p>Name: {{ name }}</p>

<input [(ngModel)]="email" type="email" placeholder="Email" />
<p>Email: {{ email }}</p>
```

**Lưu ý:** `ngModel` cần `name` attribute:
```html
<input name="name" [(ngModel)]="name" />
```

---

## 4. **DIRECTIVES**

Directives là các instructions cho Angular để thay đổi DOM. Có 3 loại: Components, Structural, và Attribute directives.

### 4.1. *ngIf - Conditional rendering

Hiển thị/ẩn element dựa trên điều kiện:

```html
<!-- Basic ngIf -->
<div *ngIf="isVisible">This is visible</div>

<!-- With else -->
<div *ngIf="user; else noUser">
  <p>User: {{ user.name }}</p>
</div>
<ng-template #noUser>
  <p>No user found</p>
</ng-template>

<!-- With then/else -->
<div *ngIf="isLoggedIn; then loggedIn; else loggedOut"></div>
<ng-template #loggedIn>
  <p>Welcome back!</p>
</ng-template>
<ng-template #loggedOut>
  <p>Please log in</p>
</ng-template>
```

**Ví dụ:**
```typescript
export class UserComponent {
  user: any = null;
  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
    this.user = { name: 'Khoa', email: 'khoa@example.com' };
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
  }
}
```

### 4.2. *ngFor - Loop through arrays

Render danh sách từ array:

```html
<ul>
  <li *ngFor="let item of items">
    {{ item }}
  </li>
</ul>

<!-- With index -->
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item }}
  </li>
</ul>

<!-- With trackBy for performance -->
<ul>
  <li *ngFor="let user of users; trackBy: trackByUserId">
    {{ user.name }}
  </li>
</ul>
```

**Ví dụ:**
```typescript
export class ProductListComponent {
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  // TrackBy function để optimize performance
  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
```

```html
<div *ngFor="let product of products; trackBy: trackByProductId">
  <h3>{{ product.name }}</h3>
  <p>${{ product.price }}</p>
</div>
```

### 4.3. [ngClass] - Dynamic classes

Thêm/xóa CSS classes dựa trên điều kiện:

```html
<!-- Object syntax -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>

<!-- Array syntax -->
<div [ngClass]="[baseClass, conditionalClass]">
  Content
</div>

<!-- String syntax -->
<div [ngClass]="isActive ? 'active' : 'inactive'">
  Content
</div>
```

**Ví dụ:**
```typescript
export class ButtonComponent {
  isActive = true;
  isDisabled = false;
  baseClass = 'btn';
  conditionalClass = 'btn-primary';
}
```

```html
<button 
  [ngClass]="{'btn-active': isActive, 'btn-disabled': isDisabled}">
  Click me
</button>
```

### 4.4. [ngStyle] - Dynamic styles

Thêm inline styles dựa trên điều kiện:

```html
<!-- Object syntax -->
<div [ngStyle]="{'color': textColor, 'font-size.px': fontSize}">
  Styled content
</div>

<!-- With component property -->
<div [ngStyle]="currentStyles">
  Content
</div>
```

**Ví dụ:**
```typescript
export class StyleComponent {
  textColor = 'blue';
  fontSize = 16;
  isHighlighted = true;

  currentStyles = {
    'color': this.isHighlighted ? 'red' : 'black',
    'font-size.px': this.fontSize,
    'font-weight': this.isHighlighted ? 'bold' : 'normal'
  };
}
```

```html
<div [ngStyle]="currentStyles">
  This text has dynamic styles
</div>
```

---

## 5. **VÍ DỤ TỔNG HỢP: PRODUCT LIST**

Tạo một component hoàn chỉnh để hiểu rõ hơn:

**product-list.component.ts:**
```typescript
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse', price: 29, inStock: true },
    { id: 3, name: 'Keyboard', price: 79, inStock: false },
    { id: 4, name: 'Monitor', price: 299, inStock: true }
  ];

  selectedProduct: Product | null = null;
  searchQuery = '';

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  getFilteredProducts(): Product[] {
    if (!this.searchQuery) {
      return this.products;
    }
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
```

**product-list.component.html:**
```html
<div class="product-list">
  <h2>Products</h2>
  
  <!-- Search input -->
  <input 
    type="text" 
    [(ngModel)]="searchQuery" 
    placeholder="Search products..."
    name="search"
  />
  
  <!-- Product list -->
  <ul class="product-items">
    <li 
      *ngFor="let product of getFilteredProducts(); trackBy: trackByProductId"
      [class.selected]="selectedProduct?.id === product.id"
      [class.out-of-stock]="!product.inStock"
      (click)="selectProduct(product)"
    >
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price }}</p>
        <span 
          *ngIf="product.inStock" 
          class="badge in-stock"
        >
          In Stock
        </span>
        <span 
          *ngIf="!product.inStock" 
          class="badge out-of-stock"
        >
          Out of Stock
        </span>
      </div>
    </li>
  </ul>
  
  <!-- Selected product details -->
  <div *ngIf="selectedProduct" class="selected-product">
    <h3>Selected Product</h3>
    <p><strong>Name:</strong> {{ selectedProduct.name }}</p>
    <p><strong>Price:</strong> ${{ selectedProduct.price }}</p>
    <p><strong>Status:</strong> 
      <span [ngClass]="{'text-success': selectedProduct.inStock, 'text-danger': !selectedProduct.inStock}">
        {{ selectedProduct.inStock ? 'Available' : 'Out of Stock' }}
      </span>
    </p>
  </div>
  
  <!-- No products message -->
  <div *ngIf="getFilteredProducts().length === 0" class="no-products">
    <p>No products found</p>
  </div>
</div>
```

**product-list.component.css:**
```css
.product-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.product-items {
  list-style: none;
  padding: 0;
}

.product-items li {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.product-items li:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-items li.selected {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.product-items li.out-of-stock {
  opacity: 0.6;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #4caf50;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.badge.in-stock {
  background-color: #4caf50;
  color: white;
}

.badge.out-of-stock {
  background-color: #f44336;
  color: white;
}

.selected-product {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.text-success {
  color: #4caf50;
}

.text-danger {
  color: #f44336;
}
```

---

## 6. **COMPONENT LIFECYCLE HOOKS**

Angular components có lifecycle với các hooks:

```typescript
import { 
  OnInit, 
  OnDestroy, 
  OnChanges, 
  AfterViewInit 
} from '@angular/core';

export class MyComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // Chạy sau khi component được khởi tạo
    // Thường dùng để fetch data, setup subscriptions
    console.log('Component initialized');
  }

  ngOnDestroy(): void {
    // Chạy trước khi component bị destroy
    // Thường dùng để cleanup (unsubscribe, clear timers)
    console.log('Component destroyed');
  }
}
```

**Các lifecycle hooks phổ biến:**
- `ngOnInit`: Sau khi component được khởi tạo
- `ngOnDestroy`: Trước khi component bị destroy
- `ngOnChanges`: Khi input properties thay đổi
- `ngAfterViewInit`: Sau khi view được khởi tạo

---

## 7. **TỔNG KẾT**

- ✅ **Components** là khối xây dựng của Angular app
- ✅ Mỗi component gồm: class, template, styles
- ✅ **Data binding**: Interpolation, Property, Event, Two-way
- ✅ **Directives**: ngIf, ngFor, ngClass, ngStyle
- ✅ Sử dụng lifecycle hooks để quản lý component lifecycle
- ✅ TrackBy function để optimize *ngFor performance

---

**Bài tiếp theo:** [03. TypeScript in Angular](../03_typescript/03_typescript_angular.md) - TypeScript essentials cho Angular.

---

## 2. **DATA BINDING**

### 2.1. Interpolation ({{ }})

```html
<p>{{ title }}</p>
<p>{{ user.name }}</p>
<p>{{ 1 + 1 }}</p>
<p>{{ getGreeting() }}</p>
```

### 2.2. Property Binding ([property])

```html
<img [src]="imageUrl" [alt]="imageAlt" />
<button [disabled]="isDisabled">Click</button>
<div [class.active]="isActive">Content</div>
```

### 2.3. Event Binding ((event))

```html
<button (click)="handleClick()">Click</button>
<input (input)="handleInput($event)" />
<form (submit)="handleSubmit($event)">...</form>
```

### 2.4. Two-way Binding ([(ngModel)])

```typescript
// app.module.ts - Import FormsModule
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, ...]
})
```

```html
<input [(ngModel)]="name" />
<p>Name: {{ name }}</p>
```

---

## 3. **DIRECTIVES**

### 3.1. *ngIf

```html
<div *ngIf="isVisible">Visible content</div>
<div *ngIf="user; else noUser">
  <p>{{ user.name }}</p>
</div>
<ng-template #noUser>
  <p>No user found</p>
</ng-template>
```

### 3.2. *ngFor

```html
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item.name }}
  </li>
</ul>
```

### 3.3. [ngClass]

```html
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>
```

### 3.4. [ngStyle]

```html
<div [ngStyle]="{'color': textColor, 'font-size.px': fontSize}">
  Styled content
</div>
```

---

## 4. **VÍ DỤ: PRODUCT LIST**

**product-list.component.ts:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  selectedProduct: any = null;

  selectProduct(product: any) {
    this.selectedProduct = product;
  }
}
```

**product-list.component.html:**
```html
<div class="product-list">
  <h2>Products</h2>
  
  <ul>
    <li 
      *ngFor="let product of products"
      [class.selected]="selectedProduct?.id === product.id"
      (click)="selectProduct(product)"
    >
      {{ product.name }} - ${{ product.price }}
    </li>
  </ul>
  
  <div *ngIf="selectedProduct" class="selected">
    Selected: {{ selectedProduct.name }}
  </div>
</div>
```

---

**Bài tiếp theo:** [03. TypeScript in Angular](../03_typescript/03_typescript_angular.md) - TypeScript essentials.
