# Tier 20 — TypeScript + React (Type-safe Components)

> **⏱ Thời lượng:** 35-40 phút  
> **🎯 Mục tiêu:** Type props, state, events với TypeScript  
> **📋 Cần biết:** Tier 4 (Props), Tier 6 (useState), TypeScript cơ bản  
> **🚫 Không cần biết:** Redux

---

## 🎬 Opening Hook

*Minh gọi `<UserCard name="Minh" ages={20} />` — nhưng prop là `age`, không phải `ages`. Lỗi chỉ phát hiện khi chạy.*

*"TypeScript phát hiện lỗi NGAY KHI GÕ. Không cần chạy code."*

---

## 🎯 Hôm nay bạn sẽ học

```
TypeScript + React = Type-safe props, state, events
                   = Phát hiện lỗi trước khi chạy
                   = IDE autocomplete tốt hơn
```

---

## 📝 Bài 20.1 — Type Props (12 phút)

### Interface cho Props

```tsx
interface StudentCardProps {
    name: string;
    age: number;
    email?: string;              // Optional
    scores: number[];
    status: "active" | "graduated" | "dropped";
}

function StudentCard({ name, age, scores, status }: StudentCardProps) {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Average: {avgScore.toFixed(1)}</p>
            <span className={`badge-${status}`}>{status}</span>
        </div>
    );
}
```

### Children prop

```tsx
interface BoxProps {
    children: React.ReactNode;
    title: string;
    variant?: "primary" | "secondary";
}

function Box({ children, title, variant = "primary" }: BoxProps) {
    return (
        <div className={`box box-${variant}`}>
            <h3>{title}</h3>
            {children}
        </div>
    );
}
```

---

## 📝 Bài 20.2 — Type State & Events (12 phút)

### useState với type

```tsx
interface Product {
    id: string;
    name: string;
    price: number;
}

type LoadingState = "idle" | "loading" | "success" | "error";

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<LoadingState>("idle");
    const [error, setError] = useState<string | null>(null);
}
```

### Event handlers

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.clientX, e.clientY);
};
```

---

## 📝 Bài 20.3 — Generic Custom Hook (8 phút)

### useFetch với TypeScript

```tsx
interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((json: T) => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}

// Sử dụng — IDE biết data là User[]
const { data: users } = useFetch<User[]>("/api/users");
```

---

## 📊 TypeScript types thường dùng

```
Type                        Ví dụ
────                        ─────
string, number, boolean     Cơ bản
string[]                    Mảng string
interface Props { }         Props definition
React.ReactNode             Children
React.ChangeEvent<HTMLInputElement>  onChange event
"option1" | "option2"      Union/Literal type
T | null                    Nullable
```

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 4:** Props — type-safe props
- **Dùng kiến thức từ Tier 15:** Custom hooks — generic hooks
- **Tham khảo thêm:** `05_ecosystem/07_typescript_react.md` (file cũ)
