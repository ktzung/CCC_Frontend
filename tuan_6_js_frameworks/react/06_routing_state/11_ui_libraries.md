# 🎨 React UI Component Libraries — MUI, Ant Design, shadcn/ui

> **Tuần 6 · Bài 11** | Thời lượng: 90 phút | Cấp độ: Trung cấp

---

## 🎬 Mở bài — Câu chuyện mở đầu

> *"Bạn muốn xây một căn nhà. Bạn có thể tự đóng từng chiếc ghế, tự đóng từng cánh cửa, tự sơn từng bức tường… Hoặc bạn đi vào **siêu thị nội thất IKEA** — chọn bộ sofa đẹp, kệ sách hiện đại, bàn ăn phong cách — về chỉ cần **lắp ráp và sơn màu theo thương hiệu của bạn**. UI Library chính là IKEA cho developer!"*

```
╔══════════════════════════════════════════════════════════╗
║  KHÔNG CÓ UI LIBRARY                                   ║
║  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              ║
║  │Build│→│Build│→│Build│→│Build│→│Build│ = MẤT 2 TUẦN ║
║  │Table│ │Form │ │Modal│ │Menu │ │Card │               ║
║  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘              ║
╠══════════════════════════════════════════════════════════╣
║  VỚI UI LIBRARY                                        ║
║  ┌──────────────────────────────────────┐               ║
║  │  🛒 Import → Customize → Ship!       │ = XONG 2 GIỜ║
║  │  MUI / Ant Design / shadcn           │               ║
║  └──────────────────────────────────────┘               ║
╚══════════════════════════════════════════════════════════╝
```

---

## 🎯 Tại sao nội dung này quan trọng?

| Lý do | Giải thích |
|-------|------------|
| ⏱️ **Tiết kiệm thời gian** | Không viết lại DatePicker, Table, Modal từ đầu |
| 🎨 **Consistent Design** | Hệ thống design nhất quán xuyên suốt ứng dụng |
| ♿ **Accessibility** | Các component đã hỗ trợ ARIA, keyboard navigation |
| 📱 **Responsive** | Tự động thích ứng trên mobile, tablet, desktop |
| 🧪 **Battle-tested** | Hàng triệu người dùng đã test, ít bug hơn |
| 👥 **Team collaboration** | Designer và developer dùng chung 1 ngôn ngữ UI |

> 💡 **Thực tế:** Theo khảo sát State of React 2025, hơn **72% dự án React** sử dụng ít nhất 1 UI library.

---

## 🌐 Bức tranh tổng quan — Hệ sinh thái UI Libraries

```
                    ┌─────────────────────────────────┐
                    │      REACT UI LIBRARIES         │
                    └──────────────┬──────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
  ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
  │   MATERIAL   │          │   ENTERPRISE │          │  HEADLESS/   │
  │    DESIGN    │          │     LEVEL    │          │  UNSTYLED    │
  └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
         │                        │                         │
    ┌────┴────┐              ┌────┴────┐              ┌─────┴─────┐
    │         │              │         │              │           │
  MUI v6   MUI v5        Ant Design  Arco Design   shadcn/ui  Radix
  (most    (stable)       (Alibaba)  (ByteDance)   (copy-     (headless
  popular)                                               paste)   primitives)
```

### So sánh nhanh 3 "ông lớn"

| Tiêu chí | MUI (Material UI) | Ant Design | shadcn/ui |
|-----------|-------------------|------------|-----------|
| 🏢 Hãng | Google Material | Alibaba | Community (shadcn) |
| 📦 Components | ~100+ | ~70+ | ~50+ (copy-paste) |
| 🎨 Style approach | Emotion/CSS-in-JS | Less/CSS | Tailwind CSS |
| 📐 Bundle size | ~350KB (full) | ~1MB (full) | ~0KB (tree-shake!) |
| 🎯 Best for | Startup, SaaS | Dashboard, Admin | Modern app, Blog |
| 🔧 Customization | Theme provider | ConfigProvider | Edit source code |
| 📈 GitHub stars | 95k+ | 93k+ | 80k+ |
| 🌍 Used by | NASA, Netflix | Alibaba, Tencent | Vercel, Shopify |

> 💡 **Ẩn dụ:** MUI = IKEA (đầy đủ, dễ mua). Ant Design = cửa hàng nội thất văn phòng (chuyên nghiệp). shadcn = đồ handmade cao cấp (custom hoàn toàn, bạn sở hữu code).

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. MUI (Material UI) — Install & Theme

```bash
# Cài đặt MUI
npm install @mui/material @emotion/react @emotion/styled

# Cài thêm icon (tùy chọn)
npm install @mui/icons-material
```

```jsx
// 📁 src/theme.js — Tạo theme tùy chỉnh
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#156082',    // DK2 blue
      light: '#4a8faa',
      dark: '#0d4a66',
    },
    secondary: {
      main: '#E97132',    // Accent orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,     // Bo góc toàn bộ
  },
});

export default theme;
```

```jsx
// 📁 src/App.jsx — Áp dụng theme
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Dashboard from './Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />          {/* Reset CSS kiểu MUI */}
      <Dashboard />
    </ThemeProvider>
  );
}
```

```jsx
// 📁 src/Dashboard.jsx — Sử dụng MUI components
import {
  AppBar, Toolbar, Typography, Button,
  Card, CardContent, CardActions,
  Grid, Container, Chip, Avatar
} from '@mui/material';
import { ShoppingCart, Dashboard as DashboardIcon } from '@mui/icons-material';

export default function Dashboard() {
  return (
    <>
      {/* ===== Navigation Bar ===== */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp Dashboard
          </Typography>
          <Button color="inherit">Đăng nhập</Button>
        </Toolbar>
      </AppBar>

      {/* ===== Content Grid ===== */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Chip
                    label="Sản phẩm"
                    color="secondary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6">
                    Sản phẩm #{item}
                  </Typography>
                  <Typography color="text.secondary">
                    Mô tả ngắn gọn về sản phẩm này.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<ShoppingCart />}>
                    Mua ngay
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
```

### 2. Ant Design — Tổng quan

```bash
# Cài đặt Ant Design
npm install antd
```

```jsx
// 📁 src/App_Antd.jsx
import {
  ConfigProvider, Button, Table, Space, Tag, Form, Input
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import viVN from 'antd/locale/vi_VN';   // 🇻🇳 Locale tiếng Việt

// Dữ liệu mẫu cho bảng
const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tuổi',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status === 'active' ? 'Hoạt động' : 'Ngừng'}
      </Tag>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    render: () => (
      <Space>
        <Button type="link" size="small">Sửa</Button>
        <Button type="link" danger size="small">Xóa</Button>
      </Space>
    ),
  },
];

const data = [
  { key: '1', name: 'Nguyễn Văn A', age: 28, status: 'active' },
  { key: '2', name: 'Trần Thị B', age: 34, status: 'inactive' },
  { key: '3', name: 'Lê Văn C', age: 22, status: 'active' },
];

export default function AntdExample() {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#156082',
          borderRadius: 8,
        },
      }}
    >
      <div style={{ padding: 24 }}>
        <h2>📋 Quản lý người dùng (Ant Design)</h2>
        <Table columns={columns} dataSource={data} />
      </div>
    </ConfigProvider>
  );
}
```

### 3. shadcn/ui — Copy-Paste Components

> 💡 **Khác biệt lớn nhất:** shadcn/ui **không phải npm package**. Bạn copy source code component vào project, rồi **sở hữu hoàn toàn**.

```bash
# Bước 1: Tạo project với Tailwind CSS
npx create-next-app@latest my-app --tailwind --typescript

# Bước 2: Khởi tạo shadcn
npx shadcn@latest init

# Bước 3: Thêm component (copy source vào src/components/ui/)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

```tsx
// 📁 src/components/ui/button.tsx (ĐÃ được copy vào project)
// Bạn sở hữu file này — sửa thoải mái!
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-input bg-transparent hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

```tsx
// 📁 src/app/page.tsx — Sử dụng shadcn components
import { Button } from "@/components/ui/button"
import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">🛍️ Cửa hàng Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Áo thun", "Quần jean", "Giày sneaker"].map((item) => (
          <Card key={item} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{item}</CardTitle>
              <CardDescription>Sản phẩm chất lượng cao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center">
                📷 Ảnh sản phẩm
              </div>
              <p className="text-2xl font-bold mt-4 text-primary">299.000₫</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1">Mua ngay</Button>
              <Button variant="outline">🛒</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Search bar */}
      <div className="mt-8 max-w-md flex gap-2">
        <Input placeholder="Tìm kiếm sản phẩm..." />
        <Button>Tìm</Button>
      </div>
    </main>
  )
}
```

---

## 🟢 Lớp đơn giản hoá — Giải thích cho người mới

### UI Library là gì? — Ẩn dụ IKEA 🛋️

```
┌────────────────────────────────────────────────────────┐
│  BẠN MUỐN CÓ MỘT CĂN NHÀ ĐẸP                         │
│                                                        │
│  ❌ Cách cũ:                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │Đóng  │→ │Cắt   │→ │Sơn   │→ │Lắp   │  = 3 THÁNG  │
│  │gỗ    │  │ván   │  │màu   │  │ráp   │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
│                                                        │
│  ✅ Cách IKEA (UI Library):                            │
│  ┌──────┐  ┌──────┐  ┌──────┐                         │
│  │Chọn  │→ │Mang  │→ │Lắp   │  = 3 NGÀY              │
│  │mẫu   │  │về    │  │ráp   │                         │
│  └──────┘  └──────┘  └──────┘                         │
│                                                        │
│  🎨 Bonus: Bạn vẫn sơn màu (theme) theo ý thích!     │
└────────────────────────────────────────────────────────┘
```

### 3 loại "nội thất" phổ biến nhất

| Loại | Ví dụ | Khi nào dùng? |
|------|-------|----------------|
| 🪑 **Basic components** | Button, Input, Card | Luôn cần |
| 📊 **Data components** | Table, Pagination, Select | Dashboard, Admin |
| 📱 **Layout components** | Grid, Drawer, Sidebar | Mọi ứng dụng |
| 🔔 **Feedback components** | Toast, Modal, Alert | Thông báo |

---

## 🏭 Lớp thực tế — Kinh nghiệm từ dự án thật

### Khi nào chọn library nào?

```
┌─────────────────────────────────────────────────────┐
│  ❓ CÂU HỎI QUYẾT ĐỊNH                             │
│                                                     │
│  Cần build nhanh, giao diện đẹp ngay?              │
│  ├── YES → MUI                                      │
│  └── NO ↓                                           │
│                                                     │
│  Cần bảng phức tạp, form validation?               │
│  ├── YES → Ant Design                               │
│  └── NO ↓                                           │
│                                                     │
│  Cần full control, custom design?                   │
│  ├── YES → shadcn/ui + Tailwind                     │
│  └── NO ↓                                           │
│                                                     │
│  Không chắc? → Bắt đầu với MUI! 🎯                 │
└─────────────────────────────────────────────────────┘
```

### File structure khi dùng UI Library

```
src/
├── components/
│   ├── ui/                   # shadcn components (nếu dùng)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── common/               # Custom components chung
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── features/             # Feature-specific components
│       ├── ProductCard.tsx
│       └── UserTable.tsx
├── theme.js                  # MUI theme config
├── App.jsx
└── main.jsx
```

### Best practices trong thực tế

| Practice | Mô tả |
|----------|-------|
| 🎨 **Extend, don't override** | Tạo theme tùy chỉnh thay vì sửa CSS từng component |
| 📦 **Import only what you need** | `import Button from '@mui/material/Button'` ✅ |
| 🚫 **Tránh import all** | `import { Button } from '@mui/material'` ⚠️ (bundle lớn hơn) |
| 🧩 **Wrap components** | Tạo wrapper component để dễ swap library sau này |
| 📐 **Design tokens** | Dùng biến CSS hoặc theme cho spacing, colors |

---

## 🛠️ Thực hành — Code along

### Bài tập: Tạo trang Profile Card với cả 3 libraries

**Yêu cầu:** Hiển thị thông tin user với avatar, tên, email, nút Follow.

#### Version MUI:

```jsx
import { Card, CardContent, Avatar, Typography, Button, Stack } from '@mui/material';

function ProfileCardMUI({ user }) {
  return (
    <Card sx={{ maxWidth: 345, textAlign: 'center', p: 2 }}>
      <Avatar
        src={user.avatar}
        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
      />
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          <Button variant="contained" color="primary">Follow</Button>
          <Button variant="outlined">Message</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

#### Version shadcn/ui:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ProfileCardShadcn({ user }: { user: User }) {
  return (
    <Card className="max-w-sm mx-auto p-6 text-center">
      <Avatar className="w-20 h-20 mx-auto mb-4">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <CardHeader className="p-0">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-500">{user.email}</p>
      </CardHeader>
      <CardContent className="flex gap-2 justify-center mt-4 p-0">
        <Button>Follow</Button>
        <Button variant="outline">Message</Button>
      </CardContent>
    </Card>
  )
}
```

---

## ❌ Hiểu lầm thường gặp

| # | Hiểu lầm ❌ | Sự thật ✅ |
|---|-------------|-----------|
| 1 | "UI library làm app chậm hơn" | Chỉ import component cần dùng → bundle vẫn nhẹ |
| 2 | "shadcn là npm package" | **Không phải!** — Đó là code bạn copy vào project |
| 3 | "MUI chỉ dùng được Material Design" | MUI rất linh hoạt, tạo theme khác Material được |
| 4 | "Ant Design nặng 1MB" | Dùng tree-shaking, thực tế chỉ ~100-200KB |
| 5 | "Chỉ cần 1 library cho mọi thứ" | Có thể kết hợp: shadcn + MUI icons, AntD table + custom form |

---

## 🐛 Bảng xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Module not found: @mui/material` | Chưa cài package | `npm install @mui/material @emotion/react @emotion/styled` |
| `ThemeProvider is not defined` | Quên wrap App | Bọc `<App>` trong `<ThemeProvider theme={theme}>` |
| `Styles conflict / CSS bleed` | Library styles đè lẫn nhau | Dùng CSS Modules hoặc prefix class riêng |
| `shadcn components not found` | Chưa init hoặc chưa add | `npx shadcn@latest init` rồi `npx shadcn@latest add button` |
| `antd styles not loading` | Quên import CSS | Thêm `import 'antd/dist/reset.css'` ở entry point |
| `Grid deprecated warning` | Dùng API cũ MUI v5 | Chuyển sang `Grid2` hoặc `size` prop trong MUI v6 |

---

## ✅ Checkpoint — Kiểm tra hiểu biết

Trả lời nhanh 5 câu hỏi:

1. **shadcn/ui có phải là npm package không?** → Không! Đó là code copy vào project.
2. **MUI dùng gì để style?** → Emotion (CSS-in-JS).
3. **Ant Design của công ty nào?** → Alibaba (Trung Quốc).
4. **Khi nào dùng shadcn thay vì MUI?** → Khi cần full control, custom design, dùng Tailwind.
5. **Làm sao giảm bundle size khi dùng MUI?** → Import từng component riêng lẻ.

<details>
<summary>🔑 Đáp án</summary>

1. ❌ Không — shadcn/ui là **copy-paste** components, không phải npm package
2. 🎨 **Emotion** (CSS-in-JS library)
3. 🏢 **Ant Group / Alibaba**
4. 🎯 Khi team dùng **Tailwind CSS** và muốn **sở hữu source code**
5. 📦 Dùng **path imports**: `import Button from '@mui/material/Button'`

</details>

---

## 📌 Tóm tắt bài học

```
╔══════════════════════════════════════════════════════════╗
║  🎯 3 ĐIỀU CẦN NHỚ                                    ║
╠══════════════════════════════════════════════════════════╣
║  1. UI Library = IKEA cho developer                     ║
║     → Không cần build từ đầu, chỉ customize            ║
║                                                        ║
║  2. Chọn đúng library cho đúng mục đích                ║
║     → MUI: nhanh, đẹp | AntD: enterprise | shadcn: linh hoạt ║
║                                                        ║
║  3. Luôn import chỉ những gì cần                       ║
║     → Giữ bundle size nhỏ, app nhanh                   ║
╚══════════════════════════════════════════════════════════╝
```

| Thuật ngữ | Nghĩa |
|-----------|-------|
| **Component Library** | Bộ sưu tập UI components có sẵn |
| **Theme** | Cấu hình màu sắc, font, spacing thống nhất |
| **Design Tokens** | Biến thiết kế (màu, khoảng cách, bo góc) |
| **Tree-shaking** | Loại bỏ code unused khi build |
| **Headless** | Component chỉ có logic, không có style |
| **CSS-in-JS** | Viết CSS bên trong JavaScript |

---

## ➡️ Tiếp theo: State Management nâng cao

> 🎯 Bài tiếp theo chúng ta sẽ tìm hiểu về **quản lý state phức tạp** với Redux Toolkit, Zustand, và React Context — khi `useState` không còn đủ cho ứng dụng lớn!

```
Bạn đã học:     UI Libraries (MUI, AntD, shadcn)
                 ↓
Tiếp theo:      State Management (Redux, Zustand)
                 ↓
Sau đó:         Performance Optimization
```

---
