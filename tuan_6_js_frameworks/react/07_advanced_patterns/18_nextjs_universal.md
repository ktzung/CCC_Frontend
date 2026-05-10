# 🏗️ Next.js & Universal Rendering — SSR, SSG, ISR, App Router

> **Tuần 6 · Bài 18** | Thời lượng: 120 phút | Cấp độ: Nâng cao

---

## 🎬 Mở bài — Câu chuyện mở đầu

> *"Bạn muốn bán nhà. Có 3 cách:*
> - 🏠 **SPA (Nhà di động):** *Xây sẵn ở nhà máy, chở đến, người mua phải chờ tải về. Google khó tìm thấy địa chỉ!*
> - 🏗️ **SSR (Nhà xây tại chỗ):** *Mỗi lần có khách, xây mới. Luôn mới, luôn đúng. Nhưng chậm hơn!*
> - 🏘️ **SSG (Nhà lắp ráp sẵn):** *Xây 1 lần, nhiều người vào ở ngay. Rất nhanh! Nhưng nội dung cố định.*
>
> *Next.js là **kiến trúc sư** biết chọn loại nhà nào cho từng phòng!"*

```
╔═══════════════════════════════════════════════════════════════╗
║                    CÁC KIỂU RENDERING                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                              ║
║  SPA              SSR               SSG            ISR       ║
║  (Client)         (Server)          (Build)        (Hybrid)  ║
║                                                              ║
║  ┌─────┐          ┌─────┐           ┌─────┐        ┌─────┐  ║
║  │Empty│          │Full │           │Full │        │Full │  ║
║  │HTML │          │HTML │           │HTML │        │HTML │  ║
║  └──┬──┘          └──┬──┘           └──┬──┘        └──┬──┘  ║
║     │                │                 │              │      ║
║     ▼                ▼                 ▼              ▼      ║
║  JS tải        Server render      Build 1 lần     Build+N    ║
║  + render      mỗi request        Serve nhanh     phút auto  ║
║  trên browser  trả HTML ready     từ CDN          regenerate ║
║                                                              ║
║  ⚡ Tải chậm    ⚡ Tải nhanh      ⚡⚡ Rất nhanh   ⚡⚡ Rất nhanh║
║  ❌ SEO yếu     ✅ SEO tốt        ✅✅ SEO tốt nhất ✅ SEO tốt ║
║  ❌ TTI chậm    ✅ TTI nhanh      ✅✅ TTI nhanh   ✅ TTI nhanh║
║                                                              ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🎯 Tại sao nội dung này quan trọng?

| Lý do | Giải thích |
|-------|------------|
| 🔍 **SEO** | Server-rendered HTML → Google index dễ dàng |
| ⚡ **Performance** | First Contentful Paint nhanh hơn 2-3x |
| 📱 **Mobile-first** | Điện thoại yếu cũng render nhanh |
| 🏢 **Industry standard** | Netflix, TikTok, Nike, Hulu đều dùng Next.js |
| 🚀 **Vercel deployment** | Deploy 1 click, CDN toàn cầu |
| 🧩 **React ecosystem** | Vẫn là React, nhưng mạnh hơn |

> 💡 **Thực tế:** Next.js là framework React **phổ biến nhất** (2025), vượt qua Create React App (đã deprecated).

---

## 🌐 Bức tranh tổng quan

```
┌─────────────────────────────────────────────────────────────┐
│                      NEXT.JS ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─── App Router (Next.js 13+) ──────────────────────────┐ │
│  │                                                        │ │
│  │  app/                                                  │ │
│  │  ├── layout.tsx        ← Root layout (bọc mọi thứ)    │ │
│  │  ├── page.tsx          ← Trang chủ (/)                │ │
│  │  ├── loading.tsx       ← Loading UI                   │ │
│  │  ├── error.tsx         ← Error boundary               │ │
│  │  │                                                      │ │
│  │  ├── products/                                           │ │
│  │  │   ├── page.tsx      ← /products                    │ │
│  │  │   └── [id]/                                           │ │
│  │  │       └── page.tsx  ← /products/123                 │ │
│  │  │                                                      │ │
│  │  └── dashboard/                                          │ │
│  │      ├── layout.tsx    ← Dashboard layout              │ │
│  │      ├── page.tsx      ← /dashboard                    │ │
│  │      └── settings/                                      │ │
│  │          └── page.tsx  ← /dashboard/settings           │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─── Server Components (MẶC ĐỊNH) ─────────────────────┐  │
│  │  • Render trên server → HTML gửi client               │  │
│  │  • Không gửi JavaScript → Bundle nhỏ                  │  │
│  │  • Truy cập DB, file system trực tiếp                 │  │
│  │  • Không dùng useState, useEffect                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Client Components ('use client') ──────────────────┐  │
│  │  • Render trên client → Cần JavaScript                │  │
│  │  • Dùng được useState, useEffect, onClick             │  │
│  │  • Đánh dấu bằng 'use client' ở đầu file             │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. Tạo dự án Next.js

```bash
# Tạo project mới với App Router
npx create-next-app@latest my-store --typescript --tailwind --app

# Cấu trúc thư mục tạo ra:
my-store/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Trang chủ
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── next.config.js          # Cấu hình Next.js
├── tailwind.config.ts      # Tailwind config
└── package.json
```

### 2. App Router — File-based Routing

```
app/
├── layout.tsx              → Bọc MỌI trang (shared UI)
├── page.tsx                → Route: /
├── loading.tsx             → Loading state khi chuyển trang
├── error.tsx               → Error boundary
├── not-found.tsx           → Trang 404
│
├── about/
│   └── page.tsx            → Route: /about
│
├── products/
│   ├── page.tsx            → Route: /products
│   └── [id]/
│       └── page.tsx        → Route: /products/123 (dynamic)
│
├── blog/
│   ├── page.tsx            → Route: /blog
│   └── [slug]/
│       └── page.tsx        → Route: /blog/my-post (dynamic)
│
└── (auth)/                 → Route group (không ảnh hưởng URL)
    ├── login/
    │   └── page.tsx        → Route: /login
    └── register/
        └── page.tsx        → Route: /register
```

### 3. Root Layout — layout.tsx

```tsx
// 📁 app/layout.tsx — Root layout (BẮT BUỘC)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'My Store — Cửa hàng trực tuyến',
  description: 'Mua sắm trực tuyến với Next.js',
  keywords: ['store', 'shop', 'nextjs'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}        {/* ← Các page con render ở đây */}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 4. Server Components (Mặc định)

```tsx
// 📁 app/products/page.tsx — Server Component (mặc định)
// 🔑 KHÔNG có 'use client' → Chạy trên server

// ✅ Có thể fetch data trực tiếp (không cần useEffect!)
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store',    // SSR: Luôn fetch mới
    // next: { revalidate: 60 },  // ISR: Revalidate mỗi 60s
  });

  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();  // ✅ Async Server Component

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">🛍️ Sản phẩm</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### 5. Client Components

```tsx
// 📁 components/AddToCartButton.tsx
'use client';   // ← ĐÁNH DẤU là Client Component

import { useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
}

export default function AddToCartButton({
  productId,
  productName,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        alert(`✅ Đã thêm ${quantity} ${productName} vào giỏ!`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Quantity selector */}
      <div className="flex items-center border rounded">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-1 hover:bg-gray-100"
        >
          −
        </button>
        <span className="px-4 py-1 border-x">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded
                   hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? '⏳ Đang thêm...' : '🛒 Thêm vào giỏ'}
      </button>
    </div>
  );
}
```

### 6. Dynamic Routes với Params

```tsx
// 📁 app/products/[id]/page.tsx — Dynamic route
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

// ✅ Generate metadata động cho SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  return {
    title: `${product.name} — My Store`,
    description: product.description,
    openGraph: {
      images: [product.image],   // 🖼️ Ảnh khi share lên social
    },
  };
}

// Fetch data cho trang chi tiết
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`);
  if (!res.ok) notFound();   // → Hiển thị trang 404
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ảnh sản phẩm */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mt-2">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </p>
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Client Component cho tương tác */}
          <div className="mt-6">
            <AddToCartButton
              productId={product.id}
              productName={product.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 7. Data Fetching Strategies

```tsx
// ===== SSR: Luôn fetch mới mỗi request =====
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});
// → Dùng cho: Dữ liệu thay đổi liên tục (giỏ hàng, user info)

// ===== SSG: Fetch 1 lần khi build =====
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache',
});
// → Dùng cho: Nội dung tĩnh (blog, docs, landing page)

// ===== ISR: Revalidate mỗi N giây =====
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },  // Revalidate mỗi 60 giây
});
// → Dùng cho: Nội dung thay đổi chậm (sản phẩm, tin tức)

// ===== Dynamic params: Generate tĩnh cho 1000 sản phẩm phổ biến =====
// 📁 app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products')
    .then(r => r.json());
  return products.map((p: any) => ({ id: p.id }));
  // → Build trước 1000 trang, còn lại SSR on-demand
}
```

```
┌───────────────────────────────────────────────────────────┐
│              KHI NÀO DÙNG KIỂU NÀO?                      │
├──────────────┬────────────────────────────────────────────┤
│   Dữ liệu   │   Strategy                                 │
├──────────────┼────────────────────────────────────────────┤
│ Thay đổi     │   SSR (cache: 'no-store')                  │
│ liên tục     │   VD: Dashboard, giỏ hàng, chat            │
├──────────────┼────────────────────────────────────────────┤
│ Ít thay đổi  │   ISR (revalidate: N)                      │
│              │   VD: Sản phẩm, tin tức, giá               │
├──────────────┼────────────────────────────────────────────┤
│ Không đổi    │   SSG (force-cache)                        │
│              │   VD: Blog, docs, landing page              │
├──────────────┼────────────────────────────────────────────┤
│ Theo user    │   SSR + Dynamic                             │
│              │   VD: Profile, settings, orders             │
└──────────────┴────────────────────────────────────────────┘
```

### 8. Server vs Client Components — Quy tắc

```
╔═══════════════════════════════════════════════════════════╗
║         SERVER vs CLIENT COMPONENTS                      ║
╠═══════════════════════════════════════════════════════════╣
║                                                          ║
║  SERVER COMPONENT (mặc định)    CLIENT COMPONENT         ║
║  ┌─────────────────────────┐    ┌─────────────────────┐  ║
║  │ ✅ async/await          │    │ ✅ useState         │  ║
║  │ ✅ Truy cập DB trực tiếp │    │ ✅ useEffect        │  ║
║  │ ✅ Đọc file             │    │ ✅ onClick, onChange │  ║
║  │ ✅ Không gửi JS → nhẹ   │    │ ✅ Browser APIs     │  ║
║  │ ❌ Không có useState    │    │ ❌ Không async fetch │  ║
║  │ ❌ Không có onClick     │    │ ❌ Gửi JS → nặng hơn│  ║
║  └─────────────────────────┘    └─────────────────────┘  ║
║                                                          ║
║  📐 QUY TẮC VÀNG:                                       ║
║  "Mặc định là Server. Chỉ thêm 'use client'             ║
║   khi CẦN tương tác người dùng."                        ║
║                                                          ║
║  Component Tree:                                         ║
║  ┌─────────────────────────────────┐                     ║
║  │     🖥️ Server Layout            │                     ║
║  │  ┌─────────────────────────┐   │                     ║
║  │  │   🖥️ Server Page        │   │                     ║
║  │  │  ┌──────────────────┐  │   │                     ║
║  │  │  │ 🖥️ Server Card   │  │   │                     ║
║  │  │  │ ┌──────────────┐ │  │   │                     ║
║  │  │  │ │💻 Client Btn │ │  │   │  ← 'use client'    ║
║  │  │  │ └──────────────┘ │  │   │                     ║
║  │  │  └──────────────────┘  │   │                     ║
║  │  └─────────────────────────┘   │                     ║
║  └─────────────────────────────────┘                     ║
╚═══════════════════════════════════════════════════════════╝
```

### 9. Loading & Error UI

```tsx
// 📁 app/products/loading.tsx — Loading state tự động
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-48 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

```tsx
// 📁 app/products/error.tsx — Error boundary
'use client';   // ⚠️ Error components PHẢI là Client Component

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6">
      <div className="text-6xl mb-4">😵</div>
      <h2 className="text-2xl font-bold text-red-600">
        Đã xảy ra lỗi!
      </h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        🔄 Thử lại
      </button>
    </div>
  );
}
```

### 10. Deployment

```bash
# Build cho production
npm run build

# Kiểm tra output
# Route (app)                Size     First Load JS
# ┌ ○ /                     5.2 kB        89 kB
# ├ ○ /products             1.8 kB        86 kB
# ├ ● /products/[id]        2.1 kB        87 kB
# ├ ○ /about                0.8 kB        86 kB
# └ ○ /not-found            1.2 kB        86 kB
# ○ = SSG, ● = SSR

# Deploy lên Vercel (1 click)
npx vercel

# Hoặc deploy Docker
docker build -t my-store .
docker run -p 3000:3000 my-store
```

---

## 🟢 Lớp đơn giản hoá — Giải thích cho người mới

### SPA vs SSR vs SSG — Ẩn dụ xây nhà 🏠

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  🏠 SPA = NHÀ DI ĐỘNG (Mobile Home)                   │
│  ┌──────────────────────────────┐                      │
│  │ Xưởng sản xuất (Server)     │                      │
│  │    → Xây 1 bộ khung rỗng     │                      │
│  │    → Chuyển đến (tải HTML)   │                      │
│  │    → Người mua tự lắp nội   │                      │
│  │      thất (JS render)        │                      │
│  └──────────────────────────────┘                      │
│  ⚠️ Chậm ban đầu, SEO yếu                             │
│                                                         │
│  🏗️ SSR = XÂY TẠI CHỖ                                 │
│  ┌──────────────────────────────┐                      │
│  │ Mỗi khi có khách (request):  │                      │
│  │    → Kiến trúc sư (server)   │                      │
│  │    → Xây ngôi nhà hoàn chỉnh│                      │
│  │    → Giao nguyên căn         │                      │
│  └──────────────────────────────┘                      │
│  ✅ SEO tốt, luôn mới                                  │
│  ⚠️ Server phải làm việc mỗi lần                       │
│                                                         │
│  🏘️ SSG = NHÀ LẮP RÁP SẴN                              │
│  ┌──────────────────────────────┐                      │
│  │ Khi build:                   │                      │
│  │    → Xây 1000 căn nhà sẵn   │                      │
│  │    → Đặt ở kho (CDN)        │                      │
│  │    → Khách vào, lấy chìa khóa│                     │
│  │    → Ở ngay!                 │                      │
│  └──────────────────────────────┘                      │
│  ✅✅ Rất nhanh, SEO tốt nhất                          │
│  ⚠️ Nội dung cũ (cần rebuild để cập nhật)             │
│                                                         │
│  🏙️ ISR = NHÀ LẮP RÁP + TỰ ĐỘNG SỬA CHỮA              │
│  ┌──────────────────────────────┐                      │
│  │ Giống SSG nhưng:             │                      │
│  │    → Sau N phút, tự rebuild  │                      │
│  │    → Khách vẫn vào được      │                      │
│  │    → Nội dung luôn mới-ish   │                      │
│  └──────────────────────────────┘                      │
│  ✅✅✅ Kết hợp ưu điểm SSG + SSR                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🏭 Lớp thực tế — File structure dự án thật

```
my-ecommerce/
├── app/
│   ├── layout.tsx              # Root layout + Navbar + Footer
│   ├── page.tsx                # Trang chủ (SSG)
│   ├── loading.tsx             # Global loading
│   ├── error.tsx               # Global error
│   │
│   ├── (shop)/                 # Route group: không ảnh hưởng URL
│   │   ├── products/
│   │   │   ├── page.tsx        # /products (ISR: 60s)
│   │   │   ├── loading.tsx     # Loading skeleton
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # /products/123 (SSG + dynamic)
│   │   │       └── loading.tsx
│   │   └── cart/
│   │       └── page.tsx        # /cart (SSR - user-specific)
│   │
│   ├── (auth)/                 # Route group cho auth
│   │   ├── login/
│   │   │   └── page.tsx        # /login
│   │   └── register/
│   │       └── page.tsx        # /register
│   │
│   └── dashboard/              # Protected route
│       ├── layout.tsx          # Dashboard sidebar layout
│       ├── page.tsx            # /dashboard (SSR)
│       └── orders/
│           └── page.tsx        # /dashboard/orders (SSR)
│
├── components/
│   ├── ui/                     # Shared UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── Navbar.tsx              # Server Component
│   ├── ProductCard.tsx         # Server Component
│   ├── AddToCartButton.tsx     # Client Component ('use client')
│   ├── SearchBar.tsx           # Client Component ('use client')
│   └── LanguageSwitcher.tsx    # Client Component ('use client')
│
├── lib/
│   ├── db.ts                   # Database connection
│   ├── api.ts                  # API helpers
│   └── utils.ts                # Utility functions
│
├── public/
│   ├── images/
│   └── favicon.ico
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠️ Thực hành — Code along

### Bài tập: Tạo trang Blog với SSG + Dynamic Routes

```tsx
// 📁 app/blog/page.tsx — Danh sách bài viết (SSG)
interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache',  // SSG: Cache mãi
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">📝 Blog</h1>
      <div className="space-y-6">
        {posts.slice(0, 10).map((post) => (
          <article key={post.id} className="border-b pb-6">
            <a href={`/blog/${post.id}`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {post.body.slice(0, 100)}...
              </p>
              <span className="text-sm text-gray-400 mt-2 block">
                📅 {new Date().toLocaleDateString('vi-VN')}
              </span>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
```

```tsx
// 📁 app/blog/[id]/page.tsx — Chi tiết bài viết (SSG + generateStaticParams)
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json());
  // Pre-render 10 bài viết đầu tiên
  return posts.slice(0, 10).map((post: any) => ({
    id: String(post.id),
  }));
}

async function getPost(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: 'force-cache' }
  );
  if (!res.ok) notFound();
  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  return (
    <article className="max-w-3xl mx-auto p-6">
      <a href="/blog" className="text-blue-600 hover:underline mb-4 block">
        ← Quay lại Blog
      </a>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose prose-lg max-w-none">
        <p>{post.body}</p>
      </div>
    </article>
  );
}
```

---

## ❌ Hiểu lầm thường gặp

| # | Hiểu lầm ❌ | Sự thật ✅ |
|---|-------------|-----------|
| 1 | "Next.js chỉ dùng được SSR" | Hỗ trợ SSG, SSR, ISR — bạn chọn |
| 2 | "Server Components không thể có interactivity" | Dùng Client Components bên trong |
| 3 | "'use client' nghĩa là chỉ chạy client" | Vẫn render server lần đầu, hydrated sau |
| 4 | "Next.js thay thế React" | Next.js **mở rộng** React, vẫn là React |
| 5 | "Page Router cũ vẫn tốt" | App Router là tương lai, Page Router deprecated dần |
| 6 | "SSG luôn nhanh hơn SSR" | Phụ thuộc: nếu data thay đổi, SSR có thể mới hơn |

---

## 🐛 Bảng xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `'useState' is not defined` | Dùng useState trong Server Component | Thêm `'use client'` ở đầu file |
| `Hydration mismatch` | Server và client render khác nhau | Đảm bảo initial render giống nhau |
| `Dynamic server usage` | Dùng headers/cookies trong SSG page | Chuyển sang SSR hoặc dùng `dynamic = 'force-dynamic'` |
| `Page not found after build` | Quên `generateStaticParams` cho dynamic SSG | Thêm hàm generateStaticParams |
| `Cannot use import.meta` | Dùng Vite syntax trong Next.js | Dùng `process.env` thay vì `import.meta.env` |
| `Layout re-renders on navigation` | State trong layout bị reset | Đưa state vào component con, không phải layout |

---

## ✅ Checkpoint — Kiểm tra hiểu biết

1. **SSR khác SSG như thế nào?** → SSR render mỗi request. SSG render 1 lần khi build.
2. **Khi nào dùng `'use client'`?** → Khi cần useState, useEffect, onClick, browser APIs.
3. **`layout.tsx` dùng để làm gì?** → Shared UI bọc mọi page con (navbar, sidebar).
4. **ISR là gì?** → Incremental Static Regeneration — SSG nhưng tự động rebuild sau N giây.
5. **Tại sao Server Components tốt hơn?** → Không gửi JS lên client → bundle nhỏ hơn → nhanh hơn.

<details>
<summary>🔑 Đáp án chi tiết</summary>

1. 🖥️ SSR = render **mỗi request** (data mới nhất). SSG = render **khi build** (nhanh nhất).
2. 💻 Khi component cần **tương tác người dùng**: state, effects, event handlers
3. 📐 Layout bọc **mọi page** — navbar, sidebar, footer **không re-render** khi chuyển trang
4. 🔄 ISR = SSG + **tự động regenerate** sau N giây — kết hợp tốc độ SSG + dữ liệu mới
5. 📦 Server Components **không gửi JS** xuống client → bundle **nhỏ hơn** → **TTI nhanh hơn**

</details>

---

## 📌 Tóm tắt bài học

```
╔══════════════════════════════════════════════════════════════╗
║  🎯 5 ĐIỀU CẦN NHỚ                                        ║
╠══════════════════════════════════════════════════════════════╣
║  1. Next.js = React + SSR/SSG/ISR                          ║
║     → Chọn strategy phù hợp cho từng page                  ║
║                                                            ║
║  2. App Router dùng file-based routing                     ║
║     → layout.tsx, page.tsx, loading.tsx, error.tsx         ║
║                                                            ║
║  3. Server Components là mặc định                          ║
║     → Chỉ thêm 'use client' khi CẦN tương tác             ║
║                                                            ║
║  4. Data fetching ngay trong component                     ║
║     → async/await trực tiếp, không cần useEffect           ║
║                                                            ║
║  5. Metadata cho SEO                                       ║
║     → export metadata hoặc generateMetadata()              ║
╚══════════════════════════════════════════════════════════════╝
```

| Thuật ngữ | Nghĩa |
|-----------|-------|
| **SSR** | Server-Side Rendering — render mỗi request |
| **SSG** | Static Site Generation — render khi build |
| **ISR** | Incremental Static Regeneration — SSG + auto rebuild |
| **App Router** | Hệ thống routing mới của Next.js 13+ |
| **Server Component** | Component chạy trên server, không gửi JS |
| **Client Component** | Component chạy trên client, đánh dấu 'use client' |
| **generateStaticParams** | Định nghĩa dynamic params cho SSG |
| **Hydration** | Quá trình "kích hoạt" HTML tĩnh thành interactive |
| **TTI** | Time to Interactive — thời gian đến khi app có thể dùng |
| **FCP** | First Contentful Paint — thời gian render nội dung đầu tiên |

---

## ➡️ Tiếp theo: Deployment & Production

> 🎯 Bài tiếp theo chúng ta sẽ học cách **deploy ứng dụng** lên Vercel, Netlify, hoặc Docker — biến project local thành sản phẩm thật trên Internet!

```
Bạn đã học:     Next.js & Universal Rendering
                 ↓
Tiếp theo:      Deployment & Production
                 ↓
Sau đó:         🎓 Hoàn thành khóa học!
```

---
