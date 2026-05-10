# 🌍 GraphQL & Internationalization (i18n) trong React

> **Tuần 6 · Bài 16** | Thời lượng: 90 phút | Cấp độ: Nâng cao

---

## 🎬 Mở bài — Câu chuyện mở đầu

> *"Bạn đi ăn nhà hàng. Có hai kiểu gọi món:*
> - ***Buffet (REST):*** *Bạn lấy cả một đĩa to — có 10 món — dù bạn chỉ muốn ăn 1 miếng gà rán. Lãng phí!*
> - ***Gọi món theo yêu cầu (GraphQL):*** *Bạn nói: 'Cho tôi ức gà, không cơm, thêm salad.' — Nhận đúng những gì cần, không dư, không thiếu."*
>
> *Còn **i18n**? Đó là khi nhà hàng có **phiên dịch viên** — khách Nhật, khách Việt, khách Anh đều order được cùng 1 menu!*

```
╔══════════════════════════════════════════════════════════════╗
║                    REST vs GRAPHQL                          ║
║                                                            ║
║  REST (Buffet)              GraphQL (Gọi món)              ║
║  ┌──────────────┐           ┌──────────────┐               ║
║  │ GET /users/1 │           │ query {       │              ║
║  │              │           │   user(id:1) {│              ║
║  │ → {          │           │     name      │              ║
║  │     name,    │  ← Lấy   │     email     │  ← Lấy ĐÚNG ║
║  │     email,   │   CẢ ĐĨA │   }           │   CẦN GÌ    ║
║  │     avatar,  │           │ }             │              ║
║  │     address, │           │               │              ║
║  │     phone,   │           └──────────────┘               ║
║  │     ...20 fields                                         ║
║  │   }                                                    ║
║  └──────────────┘                                          ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 🎯 Tại sao nội dung này quan trọng?

| Lý do | Giải thích |
|-------|------------|
| 📡 **GraphQL** | Lấy data chính xác, giảm bandwidth, tăng tốc app |
| 🌍 **i18n** | App đa ngôn ngữ = tiếp cận hàng tỷ người dùng |
| 💼 **Industry trend** | GitHub, Shopify, Airbnb đều dùng GraphQL |
| 🏢 **Enterprise ready** | i18n là **bắt buộc** cho app quốc tế |
| 🔧 **Developer experience** | GraphQL tự sinh docs, tự validate query |

> 💡 **Thực tế:** Theo Stack Overflow Survey 2025, GraphQL được **38% developers** sử dụng, tăng từ 28% năm 2023.

---

## 🌐 Bức tranh tổng quan

```
┌───────────────────────────────────────────────────────┐
│               DATA FETCHING & LOCALIZATION            │
├───────────────────────┬───────────────────────────────┤
│                       │                               │
│   📡 DATA LAYER       │   🌍 LOCALIZATION LAYER      │
│                       │                               │
│   ┌─────────────┐     │   ┌─────────────────────┐    │
│   │   GraphQL   │     │   │    react-i18next    │    │
│   │  (Apollo)   │     │   │                     │    │
│   └──────┬──────┘     │   │  vi.json → "Xin chào"│   │
│          │            │   │  en.json → "Hello"   │   │
│   ┌──────┴──────┐     │   │  ja.json → "こんにちは"│   │
│   │   Server    │     │   └─────────────────────┘   │
│   │   (API)     │     │                               │
│   └─────────────┘     │   ┌─────────────────────┐    │
│                       │   │   Locale Detection   │    │
│                       │   │   Date/Number Format │    │
│                       │   └─────────────────────┘    │
└───────────────────────┴───────────────────────────────┘
```

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### PHẦN 1: GraphQL với Apollo Client

#### Cài đặt

```bash
npm install @apollo/client graphql
```

#### Thiết lập Apollo Client

```jsx
// 📁 src/apollo/client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-graphql-api.com/graphql',  // Endpoint của bạn
  }),
  cache: new InMemoryCache(),   // Cache kết quả tự động
});

export default client;
```

```jsx
// 📁 src/main.jsx — Wrap app với ApolloProvider
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import App from './App';

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

#### Định nghĩa Query

```jsx
// 📁 src/graphql/queries.js
import { gql } from '@apollo/client';

// 🎯 Query lấy danh sách sản phẩm — CHỈ lấy field cần
export const GET_PRODUCTS = gql`
  query GetProducts($category: String, $limit: Int) {
    products(category: $category, limit: $limit) {
      id
      name
      price
      image
      rating
      # Không lấy description, createdAt, updatedAt nếu không cần!
    }
  }
`;

// 🎯 Query lấy chi tiết 1 sản phẩm
export const GET_PRODUCT_DETAIL = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      description
      image
      reviews {
        id
        author
        rating
        comment
      }
    }
  }
`;
```

#### Sử dụng Query trong Component

```jsx
// 📁 src/components/ProductList.jsx
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

export default function ProductList({ category }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category, limit: 10 },
    // 📌 Tùy chọn hữu ích:
    pollInterval: 30000,           // Tự refresh mỗi 30s
    fetchPolicy: 'cache-first',    // Ưu tiên cache
  });

  // ⏳ Đang tải
  if (loading) return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
      ))}
    </div>
  );

  // ❌ Lỗi
  if (error) return (
    <div className="text-red-500 p-4 bg-red-50 rounded">
      ⚠️ Lỗi: {error.message}
    </div>
  );

  // ✅ Thành công
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### Mutation — Thay đổi data

```jsx
// 📁 src/graphql/mutations.js
import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      totalItems
      totalPrice
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String!, $email: String!) {
    updateProfile(name: $name, email: $email) {
      id
      name
      email
      updatedAt
    }
  }
`;
```

```jsx
// 📁 src/components/AddToCartButton.jsx
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../graphql/mutations';
import { GET_PRODUCTS } from '../graphql/queries';

export default function AddToCartButton({ productId }) {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
    // 🔄 Tự động refetch danh sách sau khi thêm vào giỏ
    refetchQueries: [{ query: GET_PRODUCTS }],
    
    // ✅ Optimistic UI — cập nhật UI ngay trước khi server phản hồi
    optimisticResponse: {
      addToCart: {
        __typename: 'Cart',
        id: 'temp-id',
        totalItems: 1,
        totalPrice: 0,
      },
    },
  });

  const handleClick = () => {
    addToCart({
      variables: { productId, quantity: 1 },
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? '⏳ Đang thêm...' : '🛒 Thêm vào giỏ'}
    </button>
  );
}
```

### GraphQL vs REST — So sánh chi tiết

```
┌────────────────┬─────────────────────┬─────────────────────┐
│   Tiêu chí     │       REST          │      GraphQL        │
├────────────────┼─────────────────────┼─────────────────────┤
│ Endpoint       │ Nhiều (/users,      │ 1 endpoint          │
│                │ /products, ...)     │ (/graphql)          │
├────────────────┼─────────────────────┼─────────────────────┤
│ Data shape     │ Server quyết định   │ Client quyết định   │
├────────────────┼─────────────────────┼─────────────────────┤
│ Over-fetching  │ ⚠️ Hay xảy ra       │ ✅ Không            │
├────────────────┼─────────────────────┼─────────────────────┤
│ Under-fetching │ ⚠️ Cần nhiều calls  │ ✅ 1 call lấy hết   │
├────────────────┼─────────────────────┼─────────────────────┤
│ Caching        │ ✅ HTTP cache dễ    │ ⚠️ Phức tạp hơn    │
├────────────────┼─────────────────────┼─────────────────────┤
│ Learning curve │ ✅ Thấp             │ ⚠️ Cao hơn         │
├────────────────┼─────────────────────┼─────────────────────┤
│ File upload    │ ✅ Dễ               │ ⚠️ Phức tạp        │
├────────────────┼─────────────────────┼─────────────────────┤
│ Real-time      │ WebSocket riêng     │ Subscription built-in│
└────────────────┴─────────────────────┴─────────────────────┘
```

---

### PHẦN 2: Internationalization (i18n) với react-i18next

#### Cài đặt

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

#### Cấu trúc thư mục

```
src/
├── locales/
│   ├── vi/
│   │   └── translation.json    # 🇻🇳 Tiếng Việt
│   ├── en/
│   │   └── translation.json    # 🇬🇧 English
│   └── ja/
│       └── translation.json    # 🇯🇵 日本語
└── i18n.js                     # Cấu hình i18next
```

#### File dịch thuật

```json
// 📁 src/locales/vi/translation.json
{
  "common": {
    "welcome": "Xin chào, {{name}}!",
    "login": "Đăng nhập",
    "logout": "Đăng xuất",
    "search": "Tìm kiếm",
    "loading": "Đang tải...",
    "error": "Đã xảy ra lỗi"
  },
  "product": {
    "title": "Sản phẩm",
    "addToCart": "Thêm vào giỏ",
    "price": "Giá",
    "description": "Mô tả",
    "inStock": "Còn hàng",
    "outOfStock": "Hết hàng",
    "cartCount": "Giỏ hàng ({{count}} sản phẩm)"
  },
  "profile": {
    "greeting": "Chào {{name}}, bạn có {{count}} thông báo mới",
    "editProfile": "Chỉnh sửa hồ sơ"
  }
}
```

```json
// 📁 src/locales/en/translation.json
{
  "common": {
    "welcome": "Hello, {{name}}!",
    "login": "Login",
    "logout": "Logout",
    "search": "Search",
    "loading": "Loading...",
    "error": "An error occurred"
  },
  "product": {
    "title": "Products",
    "addToCart": "Add to Cart",
    "price": "Price",
    "description": "Description",
    "inStock": "In Stock",
    "outOfStock": "Out of Stock",
    "cartCount": "Cart ({{count}} items)"
  },
  "profile": {
    "greeting": "Hi {{name}}, you have {{count}} new notifications",
    "editProfile": "Edit Profile"
  }
}
```

#### Cấu hình i18next

```jsx
// 📁 src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import vi from './locales/vi/translation.json';
import en from './locales/en/translation.json';

i18n
  .use(LanguageDetector)     // 🔍 Tự detect ngôn ngữ trình duyệt
  .use(initReactI18next)     // 🔗 Kết nối với React
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en },
    },
    fallbackLng: 'vi',       // 🇻🇳 Mặc định tiếng Việt
    interpolation: {
      escapeValue: false,    // React đã tự escape XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],  // Ưu tiên user đã chọn
      caches: ['localStorage'],               // Lưu lựa chọn
    },
  });

export default i18n;
```

```jsx
// 📁 src/main.jsx — Import i18n config TRƯỚC App
import './i18n';   // ⚠️ Phải import trước!
import App from './App';
```

#### Sử dụng trong Components

```jsx
// 📁 src/components/Header.jsx
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  // 🌍 Đổi ngôn ngữ
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Tự động lưu vào localStorage
  };

  return (
    <header className="bg-white shadow-sm p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">🛍️ MyApp</h1>

        {/* Navigation — Dùng t() để dịch */}
        <div className="flex gap-4">
          <a href="/products">{t('product.title')}</a>
          <a href="/profile">{t('profile.editProfile')}</a>
        </div>

        {/* 🌍 Language Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => changeLanguage('vi')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'vi'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            🇻🇳 VI
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'en'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </nav>
    </header>
  );
}
```

```jsx
// 📁 src/components/ProductCard.jsx
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation();

  // 💰 Format tiền theo locale
  const formatPrice = (price) => {
    return new Intl.NumberFormat(
      i18n.language === 'vi' ? 'vi-VN' : 'en-US',
      {
        style: 'currency',
        currency: i18n.language === 'vi' ? 'VND' : 'USD',
      }
    ).format(price);
  };

  return (
    <div className="border rounded-lg p-4">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>

      <p className="text-lg font-bold">
        {t('product.price')}: {formatPrice(product.price)}
      </p>

      <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
        {product.inStock ? t('product.inStock') : t('product.outOfStock')}
      </span>

      <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded">
        {t('product.addToCart')}
      </button>
    </div>
  );
}
```

#### Interpolation & Plurals

```json
// translation.json — Sử dụng biến và số nhiều
{
  "notifications": {
    "count_one": "Bạn có {{count}} thông báo mới",
    "count_other": "Bạn có {{count}} thông báo mới",
    "count_zero": "Bạn không có thông báo nào"
  },
  "cart": {
    "items": "Giỏ hàng có {{count}} sản phẩm trị giá {{total}}"
  }
}
```

```jsx
// Sử dụng
const { t } = useTranslation();

// Pluralization
t('notifications.count', { count: 5 });
// → "Bạn có 5 thông báo mới"

// Multiple variables
t('cart.items', { count: 3, total: '599.000₫' });
// → "Giỏ hàng có 3 sản phẩm trị giá 599.000₫"
```

---

## 🟢 Lớp đơn giản hoá — Giải thích cho người mới

### GraphQL = Nhà hàng gọi món 🍽️

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  🍽️ NHÀ HÀNG (API)                                  │
│                                                      │
│  ┌─────────────────────────────────────────────┐     │
│  │  MENU:                                      │     │
│  │  • Tên khách hàng    • Địa chỉ             │     │
│  │  • Số điện thoại     • Avatar               │     │
│  │  • Đơn hàng          • Giỏ hàng             │     │
│  │  • Đánh giá          • Wishlist              │     │
│  └─────────────────────────────────────────────┘     │
│                                                      │
│  😰 REST: "Cho tôi MỌI THỨ của khách #1"            │
│  → Nhận 20 field, chỉ cần 2! Lãng phí!              │
│                                                      │
│  😎 GraphQL: "Cho tôi TÊN và EMAIL của khách #1"    │
│  → Nhận đúng 2 field. Hoàn hảo!                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### i18n = Phiên dịch viên 🌐

```
┌────────────────────────────────────────────────┐
│           APP CỦA BẠN                         │
│                                                │
│  ┌──────────┐     ┌──────────┐                │
│  │ Source   │     │ i18n     │                │
│  │ Code     │────→│ Engine   │                │
│  │          │     │          │                │
│  │ t('key') │     │ vi.json  │→ "Xin chào"   │
│  │          │     │ en.json  │→ "Hello"       │
│  │          │     │ ja.json  │→ "こんにちは"    │
│  └──────────┘     └──────────┘                │
│                                                │
│  🔄 Bật/tắt ngôn ngữ = Đổi file dịch          │
│  Không cần sửa code! Chỉ thêm file JSON!       │
└────────────────────────────────────────────────┘
```

---

## 🏭 Lớp thực tế — Kinh nghiệm từ dự án thật

### Khi nào dùng GraphQL?

| Tình huống | Nên dùng | Lý do |
|-----------|----------|-------|
| App mobile với bandwidth thấp | ✅ GraphQL | Lấy data chính xác, tiết kiệm 3G |
| Dashboard với nhiều bảng | ✅ GraphQL | 1 query lấy data cho nhiều bảng |
| API đơn giản, CRUD cơ bản | ❌ REST | Đơn giản hơn, ít setup |
| Microservices | ✅ GraphQL | Gateway gom nhiều service |
| File upload nặng | ❌ REST | GraphQL phức tạp hơn cho upload |

### Chiến lược i18n cho dự án lớn

```
Phase 1: Hard-code tiếng Việt → Ship nhanh
           ↓
Phase 2: Bọc text trong t('key') → Dùng find-replace
           ↓
Phase 3: Tạo file translation.json → vi trước
           ↓
Phase 4: Thêm ngôn ngữ mới → en, ja, zh
           ↓
Phase 5: Dịch thuật chuyên nghiệp → Crowdin, Lokalise
```

### File structure dự án thực tế

```
src/
├── graphql/
│   ├── client.js           # Apollo Client config
│   ├── queries/            # Các query
│   │   ├── products.js
│   │   └── users.js
│   ├── mutations/          # Các mutation
│   │   ├── cart.js
│   │   └── auth.js
│   └── fragments/          # Shared fragments
│       └── productFields.js
├── locales/
│   ├── vi/translation.json
│   ├── en/translation.json
│   └── i18n.js
└── components/
    ├── Header.jsx          # Language switcher ở đây
    └── ProductCard.jsx     # Dùng t() cho mọi text
```

---

## 🛠️ Thực hành — Code along

### Bài tập: Tạo trang sản phẩm đa ngôn ngữ + GraphQL

```jsx
// 📁 src/pages/ProductsPage.jsx
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_PRODUCTS } from '../graphql/queries';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { limit: 12 },
  });

  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          {t('product.title')}
        </h1>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded">
            {t('common.error')}: {error.message}
          </div>
        )}

        {/* Product grid */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
```

---

## ❌ Hiểu lầm thường gặp

| # | Hiểu lầm ❌ | Sự thật ✅ |
|---|-------------|-----------|
| 1 | "GraphQL thay thế hoàn toàn REST" | Cả hai đều có ưu điểm, dùng đúng chỗ |
| 2 | "GraphQL nhanh hơn REST" | Không nhất định — phụ thuộc query và caching |
| 3 | "i18n chỉ cần Google Translate" | Dịch thuật cần context, cultural adaptation |
| 4 | "Chỉ cần i18n cho text" | Còn date, number, currency, plural rules |
| 5 | "Apollo Client là GraphQL duy nhất" | Còn urql, graphql-request, Relay (Meta) |

---

## 🐛 Bảng xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `ApolloError: Network error` | Sai endpoint hoặc CORS | Kiểm tra `uri` trong client config |
| `Cannot query field "xxx"` | Field không tồn tại trên server | Kiểm tra Schema trên server |
| `t() returns key instead of text` | File translation chưa load | Kiểm tra `import './i18n'` ở main.jsx |
| `i18n.language is undefined` | Chưa init i18next | Đảm bảo `i18n.init()` chạy trước render |
| `Plural not working` | Sai key naming | Dùng `_one`, `_other`, `_zero` suffix |
| `Variables not passed` | Quên `variables` option | `useQuery(QUERY, { variables: { id } })` |

---

## ✅ Checkpoint — Kiểm tra hiểu biết

1. **GraphQL lấy data như thế nào?** → Client định nghĩa field cần, server trả về đúng field đó.
2. **Over-fetching là gì?** → Lấy nhiều data hơn cần (vấn đề của REST).
3. **`t('key')` làm gì?** → Tra cứu bản dịch từ file translation.json theo ngôn ngữ hiện tại.
4. **ApolloProvider dùng để làm gì?** → Cung cấp Apollo Client cho toàn bộ component tree.
5. **Fallback language là gì?** → Ngôn ngữ dự phòng khi key không có bản dịch.

<details>
<summary>🔑 Đáp án chi tiết</summary>

1. 📡 Client gửi **query** mô tả field cần → Server trả về **đúng** field đó
2. 📦 Lấy quá nhiều data không cần thiết (REST endpoint trả cả object)
3. 🔍 Hàm **translate** — tìm key trong file JSON, trả về text theo ngôn ngữ
4. 🔗 **Context Provider** — inject Apollo Client vào React component tree
5. 🌐 Ngôn ngữ **dự phòng** khi key không tồn tại ở ngôn ngữ hiện tại (VD: vi → en)

</details>

---

## 📌 Tóm tắt bài học

```
╔══════════════════════════════════════════════════════════╗
║  🎯 3 ĐIỀU CẦN NHỚ                                    ║
╠══════════════════════════════════════════════════════════╣
║  1. GraphQL = Nhà hàng gọi món                         ║
║     → Lấy ĐÚNG data cần, không dư, không thiếu        ║
║                                                        ║
║  2. i18n = Phiên dịch viên cho app                     ║
║     → Bọc text trong t('key'), thêm file JSON          ║
║                                                        ║
║  3. Apollo Client quản lý data fetching                ║
║     → useQuery, useMutation, cache tự động             ║
╚══════════════════════════════════════════════════════════╝
```

| Thuật ngữ | Nghĩa |
|-----------|-------|
| **GraphQL** | Query language cho API, client quyết định data shape |
| **Apollo Client** | Library phổ biến nhất để dùng GraphQL với React |
| **Query** | Lấy data (tương đương GET) |
| **Mutation** | Thay đổi data (tương đương POST/PUT/DELETE) |
| **i18n** | Internationalization — đa ngôn ngữ |
| **l10n** | Localization — bản địa hóa chi tiết |
| **Interpolation** | Chèn biến vào chuỗi dịch: `"Hello, {{name}}"` |
| **Fallback language** | Ngôn ngữ dự phòng khi key thiếu |

---

## ➡️ Tiếp theo: SSR & Next.js

> 🎯 Bài tiếp theo chúng ta sẽ tìm hiểu **Server-Side Rendering** với Next.js — khi SPA không còn đủ cho SEO và performance!

```
Bạn đã học:     GraphQL & i18n
                 ↓
Tiếp theo:      Next.js & Universal Rendering
                 ↓
Sau đó:         Deployment & Production
```

---
