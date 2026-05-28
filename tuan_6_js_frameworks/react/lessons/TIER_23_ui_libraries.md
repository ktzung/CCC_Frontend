# Tier 23 — UI Libraries (MUI, Ant Design, shadcn/ui)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Sử dụng thư viện UI components để xây dựng giao diện nhanh  
> **📋 Cần biết:** Tier 3 (Components), Tier 18 (Styling)  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh cần làm bảng (Table), modal, date picker, autocomplete... Tự viết từ đầu mất 2 tuần.*

*"Dùng thư viện UI. Import component → dùng ngay."*

---

## 🎯 Hôm nay bạn sẽ học

```
MUI (Material UI)  — Google Material Design, 350KB
Ant Design         — Alibaba, dashboard-focused, 1MB
shadcn/ui          — Copy-paste, Tailwind-based, 0KB library
```

---

## 📝 Bài 23.1 — Material UI (12 phút)

### Setup

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Sử dụng

```jsx
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

function LoginForm() {
    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h5">Đăng nhập</Typography>
                <TextField label="Email" fullWidth margin="normal" />
                <TextField label="Mật khẩu" type="password" fullWidth margin="normal" />
                <Button variant="contained" color="primary" fullWidth>
                    Đăng nhập
                </Button>
            </CardContent>
        </Card>
    );
}
```

---

## 📝 Bài 23.2 — Ant Design (10 phút)

### Setup

```bash
npm install antd
```

### Sử dụng

```jsx
import { Table, Button, Space, Tag } from 'antd';

const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Tuổi', dataIndex: 'age', key: 'age' },
    {
        title: 'Trạng thái', dataIndex: 'status', key: 'status',
        render: (status) => (
            <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
        )
    },
    {
        title: 'Hành động', key: 'action',
        render: (_, record) => (
            <Space>
                <Button type="link">Sửa</Button>
                <Button type="link" danger>Xóa</Button>
            </Space>
        )
    }
];

function StudentTable({ students }) {
    return <Table columns={columns} dataSource={students} rowKey="id" />;
}
```

---

## 📝 Bài 23.3 — shadcn/ui (8 phút)

### Copy-paste approach

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
```

### Sử dụng

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function LoginForm() {
    return (
        <Card className="w-[400px] mx-auto mt-8">
            <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Email" />
                <Input type="password" placeholder="Mật khẩu" />
                <Button className="w-full">Đăng nhập</Button>
            </CardContent>
        </Card>
    );
}
```

---

## 📊 So sánh 3 thư viện

```
Thư viện        Bundle    Học      Phù hợp           Customization
────────        ──────    ───      ────────           ─────────────
MUI             ~350KB    Dễ       Web app chung      Theme system
Ant Design      ~1MB      Trung    Dashboard, Admin    ConfigProvider
shadcn/ui       ~0KB*     Dễ       Tailwind projects   Full control

* shadcn/ui = copy-paste code, không phải npm package
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 3:** Components — dùng component từ thư viện
- **Dùng kiến thức từ Tier 18:** Styling — customize theme thư viện
- **Tham khảo thêm:** `06_routing_state/11_ui_libraries.md` (file cũ)
