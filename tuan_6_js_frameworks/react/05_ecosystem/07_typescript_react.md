# TypeScript with React
## Types, Interfaces, Props Typing, Hooks Typing

---

## 🎬 Mở đầu: Bạn có bao giờ "bắt bug" khi đã quá muộn?

> *"Code chạy êm trên máy bạn, deploy lên production — BÙM! `undefined is not a function`!"*

```
┌─────────────────────────────────────────────────────────┐
│                    JAVASCRIPT vs TYPESCRIPT              │
│                                                         │
│   JavaScript:  Chạy xe không đèn pha trong đêm 🌑       │
│   TypeScript:  Chạy xe có đèn pha + camera 360° 🔦     │
│                                                         │
│   JS:  "Hy vọng không đâm vào gì"                      │
│   TS:  "Thấy rõ phía trước, né lỗi trước khi chạm"    │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Tại sao TypeScript quan trọng?

**TypeScript = Kính hiển vi cho code** 🔬

| Tình huống | JavaScript (mắt thường) | TypeScript (kính hiển vi) |
|---|---|---|
| Sai tên prop | Chạy rồi mới crash 💥 | Báo lỗi ngay khi viết ✅ |
| Truyền sai kiểu dữ liệu | Runtime error 😱 | Compile-time error 🛡️ |
| Refactor lớn | Sợ hãi, rón rén 😰 | Tự tin, IDE hỗ trợ 💪 |
| Onboard team mới | Đọc code = đoán ý 🤷 | Types = tài liệu sống 📖 |

> 🔬 **Giống như MRI phát hiện bệnh trước khi có triệu chứng** — TypeScript phát hiện lỗi TRƯỚC KHI code chạy, không phải sau khi user gặp bug.

---

## 🌐 Bức tranh lớn: TypeScript trong React ecosystem

```
┌──────────────────────────────────────────────────────────────────┐
│                    REACT + TYPESCRIPT STACK                       │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   Component   │    │   Props      │    │   State      │       │
│  │   Types ✅    │    │   Types ✅   │    │   Types ✅   │       │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘       │
│         │                   │                   │                │
│         └───────────────────┼───────────────────┘                │
│                             │                                    │
│                    ┌────────▼────────┐                           │
│                    │  TypeScript     │                           │
│                    │  Compiler       │                           │
│                    │  (tsc)          │                           │
│                    └────────┬────────┘                           │
│                             │                                    │
│                    ┌────────▼────────┐                           │
│                    │  JavaScript     │                           │
│                    │  (browser chỉ   │                           │
│                    │   hiểu JS)      │                           │
│                    └─────────────────┘                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### 1. Các kiểu cơ bản trong TypeScript

```typescript
// ============================
// KIỂU DỮ LIỆU CƠ BẢN
// ============================

// 📝 String, Number, Boolean — giống JS nhưng khai báo rõ ràng
let ten: string = "Minh";
let tuoi: number = 21;
let laSinhVien: boolean = true;

// 📝 Array — 2 cách viết
let diemSo: number[] = [8, 9, 7];
let monHoc: Array<string> = ["Toán", "Lý", "Hóa"];

// 📝 Tuple — array có độ dài và kiểu cố định
let diemVaTen: [number, string] = [9, "Minh"];
// diemVaTen = ["Minh", 9];  // ❌ Lỗi: sai thứ tự!

// 📝 Enum — danh sách các giá trị cố định
enum TrangThaiDonHang {
  Moi = "MOI",
  DangGiao = "DANG_GIAO",
  DaGiao = "DA_GIAO",
  DaHuy = "DA_HUY",
}
let donHang: TrangThaiDonHang = TrangThaiDonHang.DangGiao;

// 📝 Any — "Tôi không quan tâm kiểu gì" (tránh dùng!)
let batKi: any = 42;
batKi = "hello";  // OK — nhưng mất an toàn kiểu

// 📝 Unknown — an toàn hơn any
let khongBiet: unknown = "hello";
// khongBiet.toUpperCase();  // ❌ Phải kiểm tra kiểu trước
if (typeof khongBiet === "string") {
  khongBiet.toUpperCase();  // ✅ OK
}

// 📝 Void — hàm không trả về gì
function inThongBao(msg: string): void {
  console.log(msg);
}

// 📝 Never — hàm không bao giờ kết thúc
function baoLoi(msg: string): never {
  throw new Error(msg);
}
```

### 2. Interface vs Type — Chọn cái nào?

```typescript
// ============================
// INTERFACE — "Hợp đồng" cho object
// ============================
interface SinhVien {
  ten: string;
  tuoi: number;
  email?: string;           // ? = optional (có thể không có)
  readonly maSV: string;    // readonly = chỉ đọc, không sửa được
}

// ✅ Kế thừa interface
interface SinhVienChinhQuy extends SinhVien {
  lop: string;
  namNhapHoc: number;
}

// ============================
// TYPE — Linh hoạt hơn
// ============================
type Diem = number | string;           // Union type
type HanhDong = "THEM" | "SUA" | "XOA"; // Literal type

// Type cho object (tương tự interface)
type GiaoVien = {
  ten: string;
  monDay: string;
  kinhNghiem: number;
};

// ============================
// KHI NÀO DÙNG CÁI NÀO?
// ============================
// ┌─────────────────┬──────────────────────────────────┐
// │ Dùng Interface  │ khi muốn KẾ THỪA / MỞ RỘNG      │
// │ Dùng Type       │ khi cần UNION / LITERAL / MAPPED │
// └─────────────────┴──────────────────────────────────┘

// 💡 Quy tắc đơn giản: Bắt đầu với interface, chuyển type khi cần linh hoạt hơn
```

---

## 🟢 Lớp đơn giản hóa: Props trong React Component

> 🍳 **Analogy**: Props typing giống như **công thức nấu ăn ghi rõ nguyên liệu** — "cần 200g bột mì (number), 3 quả trứng (number), 1 thìa vani (string)"
>
> Không ghi rõ → người nấu tự đoán → nấu hỏng 😅

### Props cơ bản

```typescript
// ============================
// CÁCH 1: Inline type
// ============================
function TheHienTen({ ten, tuoi }: { ten: string; tuoi: number }) {
  return (
    <div>
      <h2>Tên: {ten}</h2>
      <p>Tuổi: {tuoi}</p>
    </div>
  );
}

// ============================
// CÁCH 2: Interface riêng (khuyến nghị ✅)
// ============================
interface TheHienSinhVienProps {
  ten: string;
  tuoi: number;
  email?: string;              // optional prop
  diemSo: number[];
  trangThai: "dangHoc" | "totNghiep" | "thoiHoc";
}

function TheHienSinhVien({ ten, tuoi, email, diemSo, trangThai }: TheHienSinhVienProps) {
  const diemTB = diemSo.reduce((a, b) => a + b, 0) / diemSo.length;

  return (
    <div className="the-sinh-vien">
      <h2>👤 {ten}</h2>
      <p>Tuổi: {tuoi}</p>
      {email && <p>📧 {email}</p>}
      <p>📊 Điểm TB: {diemTB.toFixed(1)}</p>
      <span className={`badge-${trangThai}`}>
        {trangThai === "dangHoc" && "🟢 Đang học"}
        {trangThai === "totNghiep" && "🎓 Tốt nghiệp"}
        {trangThai === "thoiHoc" && "🔴 Thôi học"}
      </span>
    </div>
  );
}

// ✅ Sử dụng — TypeScript kiểm tra prop ngay khi viết code
<TheHienSinhVien
  ten="Nguyễn Văn Minh"
  tuoi={21}
  diemSo={[8, 9, 7, 10]}
  trangThai="dangHoc"
/>

// ❌ TypeScript báo lỗi ngay:
// <TheHienSinhVien ten="Minh" />
// Error: Property 'tuoi' is missing
```

### Props với children và hàm callback

```typescript
// ============================
// CHILDREN PROP
// ============================
interface TheBaoProps {
  children: React.ReactNode;   // Chấp nhận mọi thứ React render được
  tieuDe: string;
}

function TheBao({ children, tieuDe }: TheBaoProps) {
  return (
    <div className="the-bao">
      <h3>{tieuDe}</h3>
      <div>{children}</div>
    </div>
  );
}

// ✅ Sử dụng
<TheBao tieuDe="Nội dung bài học">
  <p>Đây là phần nội dung bên trong</p>
  <button>Bắt đầu</button>
</TheBao>

// ============================
// CALLBACK PROPS — Truyền hàm làm prop
// ============================
interface TheSanPhamProps {
  ten: string;
  gia: number;
  onThemVaoGio: (sanPham: { ten: string; gia: number }) => void;
  onXemChiTiet: (id: string) => void;
}

function TheSanPham({ ten, gia, onThemVaoGio, onXemChiTiet }: TheSanPhamProps) {
  return (
    <div className="san-pham">
      <h3>{ten}</h3>
      <p>{gia.toLocaleString()} VNĐ</p>
      <button onClick={() => onThemVaoGio({ ten, gia })}>
        🛒 Thêm vào giỏ
      </button>
      <button onClick={() => onXemChiTiet("sp-001")}>
        👁️ Xem chi tiết
      </button>
    </div>
  );
}
```

---

## 🏭 Lớp thực tế: Typing Hooks trong React

### useState Typing

```typescript
// ============================
// USESTATE — TypeScript thường tự suy luận
// ============================

// ✅ TypeScript tự suy luận kiểu
const [ten, setTen] = useState("Minh");         // string
const [tuoi, setTuoi] = useState(21);            // number
const [isActive, setIsActive] = useState(false); // boolean

// ⚠️ Phải khai báo kiểu khi giá trị ban đầu KHÔNG rõ ràng
const [sanPham, setSanPham] = useState<SanPham | null>(null);
const [danhSach, setDanhSach] = useState<SanPham[]>([]);
const [trangThai, setTrangThai] = useState<TrangThai>("idle");

// ============================
// VÍ DỤ ĐẦY ĐỦ
// ============================
interface SanPham {
  id: string;
  ten: string;
  gia: number;
  hinhAnh: string;
}

type TrangThai = "idle" | "loading" | "success" | "error";

function QuanLySanPham() {
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [trangThai, setTrangThai] = useState<TrangThai>("idle");
  const [loi, setLoi] = useState<string | null>(null);
  const [timKiem, setTimKiem] = useState("");
  const [giaLoc, setGiaLoc] = useState<[number, number]>([0, 1000000]);

  const fetchSanPhams = async () => {
    setTrangThai("loading");
    setLoi(null);
    try {
      const response = await fetch("/api/san-phams");
      const data: SanPham[] = await response.json();
      setSanPhams(data);
      setTrangThai("success");
    } catch (err) {
      setLoi(err instanceof Error ? err.message : "Lỗi không xác định");
      setTrangThai("error");
    }
  };

  const sanPhamLoc = sanPhams.filter((sp) => {
    const khopTen = sp.ten.toLowerCase().includes(timKiem.toLowerCase());
    const khopGia = sp.gia >= giaLoc[0] && sp.gia <= giaLoc[1];
    return khopTen && khopGia;
  });

  return (
    <div>
      <input
        value={timKiem}
        onChange={(e) => setTimKiem(e.target.value)}
        placeholder="🔍 Tìm kiếm sản phẩm..."
      />
      {trangThai === "loading" && <p>⏳ Đang tải...</p>}
      {trangThai === "error" && <p>❌ Lỗi: {loi}</p>}
      {sanPhamLoc.map((sp) => (
        <div key={sp.id}>{sp.ten} — {sp.gia.toLocaleString()}đ</div>
      ))}
    </div>
  );
}
```

### useRef Typing

```typescript
// ============================
// USETYPING — useRef cần khai báo rõ
// ============================

// 📝 Ref cho DOM element
function ONhapCoFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusVaoInput = () => {
    inputRef.current?.focus();  // ?. vì current có thể null
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Nhập vào đây..." />
      <button onClick={focusVaoInput}>🎯 Focus</button>
    </div>
  );
}

// 📝 Ref cho giá trị không cần render lại
function BoDemThoiGian() {
  const [giay, setGiay] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const batDau = () => {
    intervalRef.current = window.setInterval(() => {
      setGiay((prev) => prev + 1);
    }, 1000);
  };

  const dungLai = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div>
      <p>⏱️ {giay} giây</p>
      <button onClick={batDau}>▶️ Bắt đầu</button>
      <button onClick={dungLai}>⏸️ Dừng</button>
    </div>
  );
}
```

### Event Handler Typing

```typescript
// ============================
// EVENT HANDLERS — Các kiểu event phổ biến
// ============================

function XuLyEvent() {
  // 📝 Change event — input text
  const xuLyThayDoi = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Giá trị:", e.target.value);
  };

  // 📝 Change event — textarea
  const xuLyNoiDung = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Nội dung:", e.target.value);
  };

  // 📝 Change event — select
  const xuLyChon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Đã chọn:", e.target.value);
  };

  // 📝 Submit event — form
  const xuLyGui = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form đã gửi!");
  };

  // 📝 Click event
  const xuLyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Click tại:", e.clientX, e.clientY);
  };

  // 📝 Keyboard event
  const xuLyBanPhim = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Nhấn Enter!");
    }
  };

  return (
    <form onSubmit={xuLyGui}>
      <input onChange={xuLyThayDoi} onKeyDown={xuLyBanPhim} />
      <textarea onChange={xuLyNoiDung} />
      <select onChange={xuLyChon}>
        <option value="A">Lựa chọn A</option>
        <option value="B">Lựa chọn B</option>
      </select>
      <button type="submit" onClick={xuLyClick}>Gửi</button>
    </form>
  );
}
```

### Custom Hook Typing

```typescript
// ============================
// CUSTOM HOOK — Kiểu trả về tự động suy luận
// ============================

interface KetQuaUseFetch<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): KetQuaUseFetch<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: T = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// ✅ Sử dụng generic — reuse cho mọi API
interface BaiViet {
  id: number;
  tieuDe: string;
  noiDung: string;
}

function DanhSachBaiViet() {
  const { data, loading, error } = useFetch<BaiViet[]>("/api/bai-viet");

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <ul>
      {data?.map((bv) => (
        <li key={bv.id}>{bv.tieuDe}</li>
      ))}
    </ul>
  );
}
```

---

## 🛠️ Bài tập thực hành

### Bài tập 1: Component Card sản phẩm có typing đầy đủ

```typescript
// 🎯 Yêu cầu: Tạo component SanPhamCard với đầy đủ types

interface SanPham {
  id: string;
  ten: string;
  gia: number;
  giaGoc?: number;
  hinhAnh: string;
  danhMuc: "dienThoai" | "laptop" | "phuKien";
  conHang: boolean;
  danhGia: number; // 1-5
}

interface SanPhamCardProps {
  sanPham: SanPham;
  onThemGio: (id: string, soLuong: number) => void;
  onYeuThich: (id: string) => void;
  daYeuThich?: boolean;
}

// 📝 Hãy viết component SanPhamCard ở đây
// Gợi ý: Hiển thị giá, badge giảm giá, nút thêm giỏ, icon yêu thích
```

### Bài tập 2: Form đăng ký có typing

```typescript
// 🎯 Yêu cầu: Form đăng ký với validation types

interface FormData {
  hoTen: string;
  email: string;
  matKhau: string;
  xacNhanMatKhau: string;
  ngaySinh: string;
  gioiTinh: "nam" | "nu" | "khac";
  dongYDieuKhoan: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

// 📝 Viết component DangKyForm với:
// - useState<FormData> cho dữ liệu
// - useState<FormErrors> cho lỗi
// - Hàm validate trả về FormErrors
// - Event handlers với typing đúng
```

---

## ❌ Sai lầm thường gặp

| # | Sai lầm | Đúng | Giải thích |
|---|---------|------|------------|
| 1 | `props: any` | `props: TenInterfaceProps` | Dùng any = bỏ hết an toàn kiểu |
| 2 | Không khai báo generic cho useState | `useState<Type \| null>(null)` | Giá trị null ban đầu cần generic |
| 3 | Quên `?` cho optional prop | `email?: string` | Prop không bắt buộc phải có `?` |
| 4 | `onClick={(e) => {}}` không có type | `onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}}` | Type event handler đúng |
| 5 | Dùng `Function` thay vì type cụ thể | `(id: string) => void` | Function type quá rộng, không an toàn |
| 6 | Interface đặt tên trùng | Prefix `I` hoặc suffix `Props` | Tránh xung đột tên |

### 🐛 Troubleshooting

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `Property 'x' does not exist on type` | Thiếu prop trong interface | Thêm prop vào interface |
| `Type 'null' is not assignable to type` | useState không có generic | Thêm generic: `useState<T \| null>(null)` |
| `Cannot invoke an object which is possible 'undefined'` | Optional prop không check | Dùng `prop?.()` hoặc `if (prop)` |
| `Argument of type 'string' is not assignable` | Sai kiểu truyền vào hàm | Kiểm tra kiểu parameter của hàm |

---

## ✅ Checkpoint — Bạn đã hiểu chưa?

```
┌────────────────────────────────────────────────────────┐
│                   KIỂM TRA NHANH                       │
│                                                        │
│  1. Interface và Type khác nhau thế nào?               │
│  2. Khi nào cần khai báo generic cho useState?         │
│  3. Type cho onChange của input là gì?                  │
│  4. useRef<HTMLInputElement>(null) — tại sao cần null? │
│  5. Cách typing custom hook như useFetch?               │
│                                                        │
│  Trả lời được 4/5 → Bạn sẵn sàng cho bài tiếp! ✅    │
└────────────────────────────────────────────────────────┘
```

---

## 📌 Tóm tắt bài học

```
┌─────────────────────────────────────────────────────────────┐
│                    TYPESCRIPT + REACT                        │
│                                                             │
│  🔬 TypeScript = Kính hiển vi — thấy lỗi trước khi chạy    │
│                                                             │
│  📝 Kiểu cơ bản: string, number, boolean, array, tuple     │
│  📝 Interface vs Type: Interface kế thừa, Type linh hoạt   │
│  📝 Props: Dùng interface với ? cho optional                │
│  📝 useState: Generic khi giá trị null ban đầu              │
│  📝 Events: React.ChangeEvent<HTMLInputElement>             │
│  📝 Custom Hook: Generic <T> cho reusable                   │
│                                                             │
│  💡 Nguyên tắc: Bắt đầu đơn giản, thêm type khi cần       │
└─────────────────────────────────────────────────────────────┘
```

---

## ➡️ Bài tiếp theo: Styling React Components

> Trong bài sau, bạn sẽ học **3 cách styling React** — từ CSS Modules (quần áo may đo) đến Styled Components (tattoo) đến Tailwind (mix-and-match). Mỗi cách có ưu nhược riêng, và bạn sẽ biết khi nào dùng cách nào! 🎨
