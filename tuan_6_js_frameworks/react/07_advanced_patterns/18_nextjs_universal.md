# 🟦 PART III - CHƯƠNG 18, 19, 20
# **NEXT.JS & PERFORMANCE OPTIMIZATION**

React thuần (Client-side Rendering/CSR) có nhược điểm lớn: **SEO kém** (Google khó đọc) và **Load lần đầu chậm**. Next.js sinh ra để giải quyết vấn đề này.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu **SSR** (Server-Side Rendering) và **SSG** (Static Site Generation).
- Làm quen với framework **Next.js**.
- Tối ưu hiệu năng với **Lazy Loading**.
- Biến web thành app cài đặt được (**PWA**).

---

# 1. **NEXT.JS (THE REACT FRAMEWORK)**

Không cần cài Router, không cần config Webpack. Next.js lo hết.

## 1.1. File-based Routing
Tạo file trong thư mục `pages` (hoặc `app`) là tự có route.
- `pages/index.js` -> `/`
- `pages/about.js` -> `/about`

## 1.2. Data Fetching
- **getServerSideProps:** Chạy trên server mỗi request (SSR). Dữ liệu luôn mới.
- **getStaticProps:** Chạy 1 lần lúc build (SSG). Siêu nhanh (dùng cho Blog/Tin tức).

```jsx
// pages/index.js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return { props: { posts } };
}

function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => <li>{post.title}</li>)}
    </ul>
  );
}
export default Blog;
```

---

# 2. **PERFORMANCE OPTIMIZATION**

## 2.1. Code Splitting (React.lazy)
Không tải toàn bộ trang web 1 lúc. Chỉ tải cái gì người dùng cần.

```jsx
import React, { Suspense } from 'react';

// Chỉ tải component này khi cần
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

## 2.2. React Query (TanStack Query)
Quản lý cache API siêu đỉnh. Không gọi lại API nếu dữ liệu chưa cũ.

---

# 3. **PROGRESSIVE WEB APPS (PWA)**

Biến website thành App:
- Có icon trên màn hình chính diện thoại.
- Hoạt động offline (nhờ Service Workers).
- Gửi thông báo đẩy (Push Notifications).

Cách làm: Thêm `manifest.json` và đăng ký `serviceWorker`. (Create React App và Next.js đều hỗ trợ sẵn).

---

# 4. **TỔNG KẾT**

- Muốn làm SEO tốt, load nhanh -> Dùng **Next.js**.
- Muốn web app "xịn" như Native App -> Làm **PWA**.

---

**Chương cuối cùng:** Code React nhưng chạy trên iOS và Android? (React Native).
