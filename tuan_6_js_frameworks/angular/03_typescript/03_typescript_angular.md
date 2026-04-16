# 🔴 ANGULAR - BÀI 03
# **TYPESCRIPT IN ANGULAR**

## 🎬 "Angular Không Cho Viết JavaScript" — TypeScript Bắt Buộc

*Minh: "Sao Angular bắt dùng TypeScript?" Chị Hà: "Vì Angular SINH RA cho enterprise. 50 developers, 1000 files — không có type = hỗn loạn. TypeScript = hợp đồng giữa các developer. Interface = 'API này nhận cái gì, trả cái gì'. Không đoán mò."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Hiểu TypeScript basics và tại sao Angular dùng TypeScript
- Sử dụng types và interfaces để định nghĩa data structures
- Sử dụng classes và decorators
- Hiểu generics và type inference
- Sử dụng TypeScript trong Angular components và services

---

## 1. **TẠI SAO ANGULAR DÙNG TYPESCRIPT?**

### 1.1. Lợi ích của TypeScript

✅ **Type Safety:** Phát hiện lỗi tại compile time, không phải runtime
✅ **Better IDE Support:** Autocomplete, IntelliSense tốt hơn
✅ **Refactoring:** Dễ dàng refactor code an toàn
✅ **Documentation:** Types tự động document code
✅ **Modern JavaScript:** Hỗ trợ ES6+ features

### 1.2. TypeScript vs JavaScript

```javascript
// JavaScript - Không có type checking
function add(a, b) {
  return a + b;
}
add('1', '2'); // '12' (string concatenation) - Lỗi logic nhưng không báo lỗi!
```

```typescript
// TypeScript - Có type checking
function add(a: number, b: number): number {
  return a + b;
}
add('1', '2'); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

---

## 2. **BASIC TYPES**

### 2.1. Primitive types

```typescript
// String
let name: string = 'Khoa';
let message: string = `Hello, ${name}!`;

// Number
let age: number = 25;
let price: number = 99.99;

// Boolean
let isActive: boolean = true;
let isCompleted: boolean = false;

// Null và Undefined
let data: null = null;
let value: undefined = undefined;

// Any (tránh dùng nếu có thể)
let anything: any = 'can be anything';
anything = 123;
anything = true;
```

### 2.2. Array types

```typescript
// Array of strings
let fruits: string[] = ['apple', 'banana', 'orange'];

// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];

// Array of objects
let users: { name: string; age: number }[] = [
  { name: 'Khoa', age: 25 },
  { name: 'Tung', age: 30 }
];

// Generic array syntax
let items: Array<string> = ['a', 'b', 'c'];
```

### 2.3. Object types

```typescript
// Inline object type
let user: { name: string; age: number; email?: string } = {
  name: 'Khoa',
  age: 25
  // email is optional
};

// Tuple (fixed-length array with specific types)
let tuple: [string, number] = ['Khoa', 25];

// Enum
enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}

let currentStatus: Status = Status.Active;
```

---

## 3. **INTERFACES**

Interfaces định nghĩa cấu trúc của objects:

### 3.1. Basic interface

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const user: User = {
  id: 1,
  name: 'Khoa',
  email: 'khoa@example.com',
  age: 25
};
```

### 3.2. Optional properties

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional - có thể có hoặc không
  phone?: string; // Optional
}

const user1: User = {
  id: 1,
  name: 'Khoa',
  email: 'khoa@example.com'
  // age và phone không bắt buộc
};

const user2: User = {
  id: 2,
  name: 'Tung',
  email: 'tung@example.com',
  age: 30,
  phone: '123-456-7890'
};
```

### 3.3. Readonly properties

```typescript
interface User {
  readonly id: number;  // Không thể thay đổi sau khi khởi tạo
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Khoa',
  email: 'khoa@example.com'
};

user.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property
```

### 3.4. Interface với methods

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  }
};
```

### 3.5. Extending interfaces

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: 'Khoa',
  age: 25,
  employeeId: 12345,
  department: 'Engineering'
};
```

---

## 4. **SỬ DỤNG TRONG ANGULAR COMPONENTS**

### 4.1. Component với interfaces

```typescript
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  // Typed properties
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse', price: 29, inStock: false }
  ];

  selectedProduct: Product | null = null;

  // Typed methods
  addProduct(product: Product): void {
    this.products.push(product);
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  getTotalPrice(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }
}
```

### 4.2. Component với input/output types

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  @Input() user!: User;  // Input với type
  @Output() userSelected = new EventEmitter<User>();  // Output với type

  onSelect(): void {
    this.userSelected.emit(this.user);
  }
}
```

---

## 5. **CLASSES**

### 5.1. Basic class

```typescript
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getGreeting(): string {
    return `Hello, ${this.name}!`;
  }
}

const user = new User('Khoa', 25);
console.log(user.getGreeting()); // "Hello, Khoa!"
```

### 5.2. Class với access modifiers

```typescript
class User {
  public name: string;        // Public (default)
  private age: number;       // Chỉ accessible trong class
  protected email: string;   // Accessible trong class và subclasses

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  private getAge(): number {
    return this.age;  // Chỉ dùng được trong class này
  }
}

const user = new User('Khoa', 25, 'khoa@example.com');
console.log(user.name);     // ✅ OK
console.log(user.age);      // ❌ Error: Property 'age' is private
console.log(user.getAge()); // ❌ Error: Property 'getAge' is private
```

### 5.3. Shorthand constructor

```typescript
class User {
  constructor(
    public name: string,    // Tự động tạo public property
    private age: number,    // Tự động tạo private property
    protected email: string // Tự động tạo protected property
  ) {}
}

// Tương đương với:
class User {
  public name: string;
  private age: number;
  protected email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}
```

---

## 6. **DECORATORS**

Decorators là special functions được đánh dấu bằng `@`:

### 6.1. Component decorator

```typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // Component logic
}
```

### 6.2. Injectable decorator

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Service logic
}
```

### 6.3. Input/Output decorators

```typescript
@Component({
  selector: 'app-child'
})
export class ChildComponent {
  @Input() data!: string;
  @Output() dataChange = new EventEmitter<string>();
}
```

---

## 7. **GENERICS**

Generics cho phép tạo reusable code với type parameters:

### 7.1. Generic functions

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>('hello');  // Type: string
let output2 = identity<number>(123);      // Type: number
```

### 7.2. Generic interfaces

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'Khoa' },
  status: 200,
  message: 'Success'
};

const productResponse: ApiResponse<Product> = {
  data: { id: 1, name: 'Laptop', price: 999 },
  status: 200,
  message: 'Success'
};
```

### 7.3. Generic classes

```typescript
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }

  getAll(): T[] {
    return this.items;
  }
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: 'Khoa', email: 'khoa@example.com' });

const productRepo = new Repository<Product>();
productRepo.add({ id: 1, name: 'Laptop', price: 999, inStock: true });
```

---

## 8. **TYPE INFERENCE**

TypeScript tự động infer types khi có thể:

```typescript
// TypeScript tự động infer type là string
let name = 'Khoa';  // Type: string

// TypeScript tự động infer type là number
let age = 25;  // Type: number

// TypeScript tự động infer type là number[]
let numbers = [1, 2, 3];  // Type: number[]

// Explicit type annotation
let value: string = 'Hello';  // Explicit
let value2 = 'Hello';        // Inferred
```

---

## 9. **UNION TYPES**

Cho phép một variable có nhiều types:

```typescript
let value: string | number;
value = 'hello';  // ✅ OK
value = 123;      // ✅ OK
value = true;     // ❌ Error

// Function với union return type
function getValue(): string | number {
  return Math.random() > 0.5 ? 'hello' : 123;
}
```

---

## 10. **VÍ DỤ TỔNG HỢP**

```typescript
// Interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Service với generics
@Injectable({ providedIn: 'root' })
export class ApiService {
  get<T>(url: string): Promise<ApiResponse<T>> {
    return fetch(url).then(res => res.json());
  }

  post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
}

// Component sử dụng types
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  items: CartItem[] = [];
  total: number = 0;

  constructor(private apiService: ApiService) {}

  addItem(product: Product): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }
}
```

---

## 11. **TỔNG KẾT**

- ✅ **TypeScript** cung cấp type safety và better tooling
- ✅ **Interfaces** định nghĩa cấu trúc objects
- ✅ **Classes** với access modifiers (public, private, protected)
- ✅ **Decorators** (@Component, @Injectable, @Input, @Output)
- ✅ **Generics** cho reusable code với type parameters
- ✅ **Type inference** tự động detect types khi có thể
- ✅ Sử dụng types trong Angular components và services

---

**Bài tiếp theo:** [04. Services & Dependency Injection](../04_services/04_services_dependency_injection.md) - Services và DI system.
