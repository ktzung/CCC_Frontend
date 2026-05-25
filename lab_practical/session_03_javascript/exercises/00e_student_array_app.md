# Exercise 0E — Ứng dụng Quản lý Sinh viên (Array & Object)

## 🎬 Opening Scenario

*Bạn là cán bộ lớp, cần quản lý danh sách sinh viên: khai báo mảng thủ công, thêm/xóa/sửa, tìm kiếm, sắp xếp, thống kê — tất cả hiển thị ra giao diện web đơn giản.*

---

## 🎯 Mục tiêu học tập

- Khai báo **mảng (Array)** chứa nhiều **object** sinh viên
- Thành thạo các thao tác trên mảng: **push, pop, splice, find, filter, sort, map, reduce**
- Truy cập và hiển thị dữ liệu object ra DOM
- Tìm kiếm, lọc, sắp xếp dữ liệu
- Tính toán thống kê: điểm trung bình, xếp loại, đếm

---

## 🪜 Phần 1: Khai báo mảng sinh viên thủ công (Lý thuyết)

### Cấu trúc dữ liệu

Mỗi sinh viên là một **object** có các thuộc tính:

```javascript
{
    maSV: "SV001",           // Mã sinh viên (duy nhất)
    hoTen: "Nguyễn Văn A",  // Họ tên
    ngaySinh: "2004-03-15",  // Ngày sinh (YYYY-MM-DD)
    gioiTinh: "Nam",         // Giới tính
    diemTB: 8.5,             // Điểm trung bình (0-10)
    lop: "CNTT2024A"         // Lớp
}
```

### Khai báo mảng 10 sinh viên

```javascript
const sinhVien = [
    {
        maSV: "SV001",
        hoTen: "Nguyễn Văn An",
        ngaySinh: "2004-03-15",
        gioiTinh: "Nam",
        diemTB: 8.5,
        lop: "CNTT2024A"
    },
    {
        maSV: "SV002",
        hoTen: "Trần Thị Bình",
        ngaySinh: "2004-07-22",
        gioiTinh: "Nữ",
        diemTB: 7.2,
        lop: "CNTT2024A"
    },
    {
        maSV: "SV003",
        hoTen: "Lê Hoàng Dũng",
        ngaySinh: "2003-11-08",
        gioiTinh: "Nam",
        diemTB: 9.1,
        lop: "CNTT2024B"
    },
    {
        maSV: "SV004",
        hoTen: "Phạm Thị Em",
        ngaySinh: "2004-01-30",
        gioiTinh: "Nữ",
        diemTB: 6.8,
        lop: "CNTT2024A"
    },
    {
        maSV: "SV005",
        hoTen: "Hoàng Văn Phúc",
        ngaySinh: "2003-09-12",
        gioiTinh: "Nam",
        diemTB: 5.4,
        lop: "CNTT2024B"
    },
    {
        maSV: "SV006",
        hoTen: "Đỗ Thị Giang",
        ngaySinh: "2004-05-19",
        gioiTinh: "Nữ",
        diemTB: 8.9,
        lop: "CNTT2024A"
    },
    {
        maSV: "SV007",
        hoTen: "Vũ Minh Hiếu",
        ngaySinh: "2003-12-03",
        gioiTinh: "Nam",
        diemTB: 4.2,
        lop: "CNTT2024B"
    },
    {
        maSV: "SV008",
        hoTen: "Ngô Thị Khanh",
        ngaySinh: "2004-08-27",
        gioiTinh: "Nữ",
        diemTB: 7.8,
        lop: "CNTT2024A"
    },
    {
        maSV: "SV009",
        hoTen: "Bùi Văn Long",
        ngaySinh: "2003-06-14",
        gioiTinh: "Nam",
        diemTB: 6.5,
        lop: "CNTT2024B"
    },
    {
        maSV: "SV010",
        hoTen: "Lý Thị Mai",
        ngaySinh: "2004-04-09",
        gioiTinh: "Nữ",
        diemTB: 9.3,
        lop: "CNTT2024A"
    }
];
```

---

## 🪜 Phần 2: Các thao tác cơ bản trên mảng (Console)

### 2.1 — Truy cập phần tử

```javascript
// Truy cập 1 sinh viên theo chỉ số
console.log(sinhVien[0].hoTen);          // "Nguyễn Văn An"
console.log(sinhVien[sinhVien.length - 1].hoTen); // "Lý Thị Mai" (cuối cùng)

// Duyệt toàn bộ danh sách
sinhVien.forEach((sv, index) => {
    console.log(`${index + 1}. ${sv.maSV} — ${sv.hoTen} — ${sv.diemTB}`);
});

// Duyệt bằng for...of
for (const sv of sinhVien) {
    console.log(`${sv.hoTen} (${sv.lop}): ${sv.diemTB} điểm`);
}
```

### 2.2 — Thêm sinh viên

```javascript
// Thêm vào CUỐI mảng — push()
sinhVien.push({
    maSV: "SV011",
    hoTen: "Trịnh Văn Khánh",
    ngaySinh: "2004-02-18",
    gioiTinh: "Nam",
    diemTB: 7.0,
    lop: "CNTT2024B"
});

// Thêm vào ĐẦU mảng — unshift()
sinhVien.unshift({
    maSV: "SV012",
    hoTen: "Mai Thị Ngọc",
    ngaySinh: "2004-10-05",
    gioiTinh: "Nữ",
    diemTB: 8.2,
    lop: "CNTT2024A"
});

console.log("Số SV sau khi thêm:", sinhVien.length); // 12
```

### 2.3 — Xóa sinh viên

```javascript
// Xóa CUỐI mảng — pop()
const lastSV = sinhVien.pop();
console.log("Đã xóa:", lastSV.hoTen);

// Xóa ĐẦU mảng — shift()
const firstSV = sinhVien.shift();
console.log("Đã xóa:", firstSV.hoTen);

// Xóa theo VỊ TRÍ — splice(vị trí, số lượng)
// Xóa sinh viên ở vị trí thứ 3 (index = 2)
const removed = sinhVien.splice(2, 1);
console.log("Đã xóa:", removed[0].hoTen);

// Xóa theo MÃ SV — tìm vị trí trước, rồi splice
const viTri = sinhVien.findIndex(sv => sv.maSV === "SV005");
if (viTri !== -1) {
    sinhVien.splice(viTri, 1);
    console.log("Đã xóa SV005");
}
```

### 2.4 — Tìm kiếm

```javascript
// find — tìm 1 sinh viên theo mã
const svTimThay = sinhVien.find(sv => sv.maSV === "SV003");
console.log("Tìm thấy:", svTimThay.hoTen); // "Lê Hoàng Dũng"

// find — tìm theo tên (chứa chuỗi)
const svTheoTen = sinhVien.find(sv =>
    sv.hoTen.toLowerCase().includes("dũng")
);
console.log("Tìm theo tên:", svTheoTen?.hoTen);

// filter — lọc nhiều sinh viên theo điều kiện
const svGioi = sinhVien.filter(sv => sv.diemTB >= 8.0);
console.log("SV giỏi:", svGioi.length, "người");
svGioi.forEach(sv => console.log(`  ${sv.hoTen}: ${sv.diemTB}`));

// Lọc theo lớp
const svLopA = sinhVien.filter(sv => sv.lop === "CNTT2024A");
console.log("Lớp A:", svLopA.length, "người");

// Lọc theo giới tính
const svNu = sinhVien.filter(sv => sv.gioiTinh === "Nữ");
console.log("Sinh viên nữ:", svNu.length, "người");

// Lọc sinh viên yếu (dưới 5)
const svYeu = sinhVien.filter(sv => sv.diemTB < 5.0);
console.log("⚠️ SV yếu:", svYeu.length, "người");
svYeu.forEach(sv => console.log(`  ${sv.hoTen}: ${sv.diemTB}`));
```

### 2.5 — Sắp xếp

```javascript
// Sắp xếp theo điểm TB giảm dần
const sapXepDiem = [...sinhVien].sort((a, b) => b.diemTB - a.diemTB);
console.log("=== Xếp hạng theo điểm ===");
sapXepDiem.forEach((sv, i) => {
    console.log(`${i + 1}. ${sv.hoTen} — ${sv.diemTB} điểm`);
});

// Sắp xếp theo tên A-Z
const sapXepTen = [...sinhVien].sort((a, b) =>
    a.hoTen.localeCompare(b.hoTen, 'vi')
);
console.log("=== Danh sách A-Z ===");
sapXepTen.forEach(sv => console.log(`  ${sv.hoTen}`));

// ⚠️ Lưu ý: [...sinhVien] tạo bản SAO, không thay đổi mảng gốc
// Nếu dùng sinhVien.sort() → mảng gốc bị thay đổi!
```

### 2.6 — Thống kê với reduce

```javascript
// Tính điểm trung bình toàn lớp
const tongDiem = sinhVien.reduce((sum, sv) => sum + sv.diemTB, 0);
const diemTBCaLop = tongDiem / sinhVien.length;
console.log("Điểm TB cả lớp:", diemTBCaLop.toFixed(2));

// Tìm điểm cao nhất / thấp nhất
const diemCaoNhat = Math.max(...sinhVien.map(sv => sv.diemTB));
const diemThapNhat = Math.min(...sinhVien.map(sv => sv.diemTB));
console.log("Điểm cao nhất:", diemCaoNhat);
console.log("Điểm thấp nhất:", diemThapNhat);

// Đếm theo xếp loại
const xepLoai = {
    "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0
};

sinhVien.forEach(sv => {
    if (sv.diemTB >= 8.5)      xepLoai["Giỏi"]++;
    else if (sv.diemTB >= 7.0)  xepLoai["Khá"]++;
    else if (sv.diemTB >= 5.0)  xepLoai["Trung bình"]++;
    else                         xepLoai["Yếu"]++;
});

console.log("=== Thống kê xếp loại ===");
for (const [loai, soLuong] of Object.entries(xepLoai)) {
    console.log(`  ${loai}: ${soLuong} người`);
}
```

### 2.7 — Sửa thông tin

```javascript
// Tìm và sửa điểm SV005
const svCanSua = sinhVien.find(sv => sv.maSV === "SV005");
if (svCanSua) {
    console.log("Trước:", svCanSua.diemTB);
    svCanSua.diemTB = 6.0;  // Sửa trực tiếp trên object
    svCanSua.lop = "CNTT2024A"; // Chuyển lớp
    console.log("Sau:", svCanSua.diemTB);
}

// Sửa nhiều thuộc tính cùng lúc — Object.assign()
const sv009 = sinhVien.find(sv => sv.maSV === "SV009");
if (sv009) {
    Object.assign(sv009, {
        diemTB: 7.5,
        lop: "CNTT2024A",
        hoTen: "Bùi Văn Long (đã cập nhật)"
    });
}
```

---

## 🪜 Phần 3: Ứng dụng hoàn chỉnh (HTML + JS)

### Code hoàn chỉnh — `student_manager.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎓 Quản lý Sinh viên</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f1f5f9;
            color: #1e293b;
            padding: 1rem;
        }

        h1 { text-align: center; margin-bottom: 1.5rem; }

        /* ========== STATS ========== */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .stat-card {
            background: white;
            padding: 1rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .stat-number {
            font-size: 2rem;
            font-weight: 700;
        }

        .stat-label {
            font-size: 0.85rem;
            color: #64748b;
            margin-top: 0.25rem;
        }

        .stat-card:nth-child(1) .stat-number { color: #3b82f6; }
        .stat-card:nth-child(2) .stat-number { color: #22c55e; }
        .stat-card:nth-child(3) .stat-number { color: #f59e0b; }
        .stat-card:nth-child(4) .stat-number { color: #ef4444; }
        .stat-card:nth-child(5) .stat-number { color: #8b5cf6; }

        /* ========== CONTROLS ========== */
        .controls {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            align-items: center;
        }

        .controls input,
        .controls select {
            padding: 0.6rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.9rem;
            outline: none;
        }

        .controls input:focus,
        .controls select:focus { border-color: #3b82f6; }

        .search-input { flex: 1; min-width: 200px; }

        .btn {
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s;
        }

        .btn-primary { background: #3b82f6; color: white; }
        .btn-primary:hover { background: #2563eb; }
        .btn-success { background: #22c55e; color: white; }
        .btn-success:hover { background: #16a34a; }
        .btn-warning { background: #f59e0b; color: white; }
        .btn-warning:hover { background: #d97706; }
        .btn-danger { background: #ef4444; color: white; }
        .btn-danger:hover { background: #dc2626; }
        .btn-sm { padding: 0.35rem 0.7rem; font-size: 0.8rem; }

        /* ========== TABLE ========== */
        .table-wrapper {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background: #3b82f6;
            color: white;
            padding: 0.75rem 1rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
            user-select: none;
        }

        th:hover { background: #2563eb; }

        td {
            padding: 0.65rem 1rem;
            border-bottom: 1px solid #f1f5f9;
            font-size: 0.9rem;
        }

        tr:hover { background: #f8fafc; }

        .badge {
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-gioi    { background: #dcfce7; color: #166534; }
        .badge-kha     { background: #dbeafe; color: #1e40af; }
        .badge-tb      { background: #fef3c7; color: #92400e; }
        .badge-yeu     { background: #fee2e2; color: #991b1b; }

        .action-btns { display: flex; gap: 0.3rem; }

        .highlight-row { background: #fef3c7 !important; }

        .no-data {
            text-align: center;
            padding: 2rem;
            color: #94a3b8;
        }

        /* ========== MODAL ========== */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-overlay.hidden { display: none; }

        .modal {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            width: 420px;
            max-width: 95vw;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .modal h2 { margin-bottom: 1.25rem; }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.3rem;
            font-size: 0.9rem;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.6rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.9rem;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: #3b82f6;
            outline: none;
        }

        .modal-actions {
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
            margin-top: 1.25rem;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
            table { font-size: 0.8rem; }
            td, th { padding: 0.5rem; }
            .controls { flex-direction: column; }
            .search-input { min-width: 100%; }
        }
    </style>
</head>
<body>
    <h1>🎓 Ứng dụng Quản lý Sinh viên</h1>

    <!-- Thống kê -->
    <div class="stats" id="stats"></div>

    <!-- Điều khiển -->
    <div class="controls">
        <input type="text" class="search-input" id="search-input"
               placeholder="🔍 Tìm theo tên hoặc mã SV...">
        <select id="filter-lop">
            <option value="">Tất cả lớp</option>
            <option value="CNTT2024A">CNTT2024A</option>
            <option value="CNTT2024B">CNTT2024B</option>
        </select>
        <select id="filter-xeploai">
            <option value="">Tất cả xếp loại</option>
            <option value="gioi">Giỏi (≥8.5)</option>
            <option value="kha">Khá (7.0-8.4)</option>
            <option value="tb">Trung bình (5.0-6.9)</option>
            <option value="yeu">Yếu (<5.0)</option>
        </select>
        <button class="btn btn-success" id="btn-add">+ Thêm SV</button>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th data-sort="maSV">Mã SV ↕</th>
                    <th data-sort="hoTen">Họ tên ↕</th>
                    <th data-sort="ngaySinh">Ngày sinh</th>
                    <th data-sort="gioiTinh">Giới tính</th>
                    <th data-sort="lop">Lớp</th>
                    <th data-sort="diemTB">Điểm TB ↕</th>
                    <th>Xếp loại</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        </table>
        <div id="no-data" class="no-data" hidden>
            Không tìm thấy sinh viên nào
        </div>
    </div>

    <!-- Modal thêm/sửa -->
    <div id="modal" class="modal-overlay hidden">
        <div class="modal">
            <h2 id="modal-title">Thêm sinh viên</h2>
            <input type="hidden" id="edit-index" value="-1">
            <div class="form-group">
                <label>Mã SV:</label>
                <input type="text" id="inp-maSV" placeholder="VD: SV011">
            </div>
            <div class="form-group">
                <label>Họ tên:</label>
                <input type="text" id="inp-hoTen" placeholder="VD: Nguyễn Văn A">
            </div>
            <div class="form-group">
                <label>Ngày sinh:</label>
                <input type="date" id="inp-ngaySinh">
            </div>
            <div class="form-group">
                <label>Giới tính:</label>
                <select id="inp-gioiTinh">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </div>
            <div class="form-group">
                <label>Lớp:</label>
                <select id="inp-lop">
                    <option value="CNTT2024A">CNTT2024A</option>
                    <option value="CNTT2024B">CNTT2024B</option>
                </select>
            </div>
            <div class="form-group">
                <label>Điểm TB (0-10):</label>
                <input type="number" id="inp-diemTB" min="0" max="10" step="0.1"
                       placeholder="VD: 8.5">
            </div>
            <div class="modal-actions">
                <button class="btn btn-danger" id="btn-cancel">Hủy</button>
                <button class="btn btn-primary" id="btn-save">Lưu</button>
            </div>
        </div>
    </div>

    <script>
    // ===== DỮ LIỆU MẪU =====
    let danhSachSV = [
        { maSV: "SV001", hoTen: "Nguyễn Văn An",    ngaySinh: "2004-03-15", gioiTinh: "Nam", diemTB: 8.5, lop: "CNTT2024A" },
        { maSV: "SV002", hoTen: "Trần Thị Bình",    ngaySinh: "2004-07-22", gioiTinh: "Nữ",  diemTB: 7.2, lop: "CNTT2024A" },
        { maSV: "SV003", hoTen: "Lê Hoàng Dũng",    ngaySinh: "2003-11-08", gioiTinh: "Nam", diemTB: 9.1, lop: "CNTT2024B" },
        { maSV: "SV004", hoTen: "Phạm Thị Em",      ngaySinh: "2004-01-30", gioiTinh: "Nữ",  diemTB: 6.8, lop: "CNTT2024A" },
        { maSV: "SV005", hoTen: "Hoàng Văn Phúc",   ngaySinh: "2003-09-12", gioiTinh: "Nam", diemTB: 5.4, lop: "CNTT2024B" },
        { maSV: "SV006", hoTen: "Đỗ Thị Giang",     ngaySinh: "2004-05-19", gioiTinh: "Nữ",  diemTB: 8.9, lop: "CNTT2024A" },
        { maSV: "SV007", hoTen: "Vũ Minh Hiếu",     ngaySinh: "2003-12-03", gioiTinh: "Nam", diemTB: 4.2, lop: "CNTT2024B" },
        { maSV: "SV008", hoTen: "Ngô Thị Khanh",    ngaySinh: "2004-08-27", gioiTinh: "Nữ",  diemTB: 7.8, lop: "CNTT2024A" },
        { maSV: "SV009", hoTen: "Bùi Văn Long",     ngaySinh: "2003-06-14", gioiTinh: "Nam", diemTB: 6.5, lop: "CNTT2024B" },
        { maSV: "SV010", hoTen: "Lý Thị Mai",       ngaySinh: "2004-04-09", gioiTinh: "Nữ",  diemTB: 9.3, lop: "CNTT2024A" }
    ];

    let sortField = '';
    let sortDir = 'asc';

    // ===== DOM ELEMENTS =====
    const searchInput   = document.getElementById('search-input');
    const filterLop     = document.getElementById('filter-lop');
    const filterXepLoai = document.getElementById('filter-xeploai');
    const tableBody     = document.getElementById('table-body');
    const noData        = document.getElementById('no-data');
    const statsEl       = document.getElementById('stats');
    const modal         = document.getElementById('modal');
    const modalTitle    = document.getElementById('modal-title');
    const editIndex     = document.getElementById('edit-index');

    // ===== XẾP LOẠI =====
    function getXepLoai(diem) {
        if (diem >= 8.5) return { label: "Giỏi",   class: "badge-gioi" };
        if (diem >= 7.0) return { label: "Khá",    class: "badge-kha" };
        if (diem >= 5.0) return { label: "TB",     class: "badge-tb" };
        return              { label: "Yếu",   class: "badge-yeu" };
    }

    // ===== FORMAT NGÀY =====
    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('vi-VN');
    }

    // ===== LỌC & TÌM KIẾM =====
    function getFilteredData() {
        const query = searchInput.value.toLowerCase().trim();
        const lop   = filterLop.value;
        const xl    = filterXepLoai.value;

        let data = [...danhSachSV];

        // Tìm kiếm theo tên / mã SV
        if (query) {
            data = data.filter(sv =>
                sv.hoTen.toLowerCase().includes(query) ||
                sv.maSV.toLowerCase().includes(query)
            );
        }

        // Lọc theo lớp
        if (lop) {
            data = data.filter(sv => sv.lop === lop);
        }

        // Lọc theo xếp loại
        if (xl === 'gioi') data = data.filter(sv => sv.diemTB >= 8.5);
        if (xl === 'kha')  data = data.filter(sv => sv.diemTB >= 7.0 && sv.diemTB < 8.5);
        if (xl === 'tb')   data = data.filter(sv => sv.diemTB >= 5.0 && sv.diemTB < 7.0);
        if (xl === 'yeu')  data = data.filter(sv => sv.diemTB < 5.0);

        // Sắp xếp
        if (sortField) {
            data.sort((a, b) => {
                let valA = a[sortField];
                let valB = b[sortField];
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();
                if (sortDir === 'asc') return valA > valB ? 1 : -1;
                return valA < valB ? 1 : -1;
            });
        }

        return data;
    }

    // ===== RENDER BẢNG =====
    function renderTable() {
        const data = getFilteredData();
        tableBody.innerHTML = '';

        if (data.length === 0) {
            noData.hidden = false;
            return;
        }
        noData.hidden = true;

        data.forEach((sv, idx) => {
            const xl = getXepLoai(sv.diemTB);
            const originalIndex = danhSachSV.indexOf(sv);
            const isYeu = sv.diemTB < 5.0;

            const tr = document.createElement('tr');
            if (isYeu) tr.classList.add('highlight-row');

            tr.innerHTML = `
                <td><strong>${sv.maSV}</strong></td>
                <td>${sv.hoTen}</td>
                <td>${formatDate(sv.ngaySinh)}</td>
                <td>${sv.gioiTinh}</td>
                <td>${sv.lop}</td>
                <td><strong>${sv.diemTB.toFixed(1)}</strong></td>
                <td><span class="badge ${xl.class}">${xl.label}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-warning btn-sm btn-edit" data-index="${originalIndex}">✏️</button>
                        <button class="btn btn-danger btn-sm btn-delete" data-index="${originalIndex}">🗑️</button>
                    </div>
                </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // ===== RENDER THỐNG KÊ =====
    function renderStats() {
        const tong    = danhSachSV.length;
        const gioi    = danhSachSV.filter(sv => sv.diemTB >= 8.5).length;
        const kha     = danhSachSV.filter(sv => sv.diemTB >= 7.0 && sv.diemTB < 8.5).length;
        const yeu     = danhSachSV.filter(sv => sv.diemTB < 5.0).length;
        const diemTB  = danhSachSV.length > 0
            ? (danhSachSV.reduce((s, sv) => s + sv.diemTB, 0) / danhSachSV.length).toFixed(2)
            : '0';

        statsEl.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${tong}</div>
                <div class="stat-label">Tổng sinh viên</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${gioi}</div>
                <div class="stat-label">Giỏi (≥8.5)</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${kha}</div>
                <div class="stat-label">Khá (7-8.4)</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${yeu}</div>
                <div class="stat-label">Yếu (<5.0)</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${diemTB}</div>
                <div class="stat-label">Điểm TB lớp</div>
            </div>
        `;
    }

    // ===== THÊM / SỬA =====
    function openModal(index = -1) {
        editIndex.value = index;
        modal.classList.remove('hidden');

        if (index >= 0) {
            // Sửa
            const sv = danhSachSV[index];
            modalTitle.textContent = 'Sửa thông tin SV';
            document.getElementById('inp-maSV').value     = sv.maSV;
            document.getElementById('inp-hoTen').value    = sv.hoTen;
            document.getElementById('inp-ngaySinh').value = sv.ngaySinh;
            document.getElementById('inp-gioiTinh').value = sv.gioiTinh;
            document.getElementById('inp-lop').value      = sv.lop;
            document.getElementById('inp-diemTB').value   = sv.diemTB;
        } else {
            // Thêm mới
            modalTitle.textContent = 'Thêm sinh viên';
            document.getElementById('inp-maSV').value     = '';
            document.getElementById('inp-hoTen').value    = '';
            document.getElementById('inp-ngaySinh').value = '';
            document.getElementById('inp-gioiTinh').value = 'Nam';
            document.getElementById('inp-lop').value      = 'CNTT2024A';
            document.getElementById('inp-diemTB').value   = '';
        }
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    function saveSV() {
        const maSV     = document.getElementById('inp-maSV').value.trim();
        const hoTen    = document.getElementById('inp-hoTen').value.trim();
        const ngaySinh = document.getElementById('inp-ngaySinh').value;
        const gioiTinh = document.getElementById('inp-gioiTinh').value;
        const lop      = document.getElementById('inp-lop').value;
        const diemTB   = parseFloat(document.getElementById('inp-diemTB').value);

        // Validate
        if (!maSV || !hoTen || !ngaySinh) {
            alert('Vui lòng nhập đầy đủ Mã SV, Họ tên, Ngày sinh!');
            return;
        }
        if (isNaN(diemTB) || diemTB < 0 || diemTB > 10) {
            alert('Điểm TB phải từ 0 đến 10!');
            return;
        }

        const idx = parseInt(editIndex.value);
        const svData = { maSV, hoTen, ngaySinh, gioiTinh, lop, diemTB };

        if (idx >= 0) {
            // Sửa
            Object.assign(danhSachSV[idx], svData);
        } else {
            // Kiểm tra trùng mã SV
            if (danhSachSV.some(sv => sv.maSV === maSV)) {
                alert('Mã SV đã tồn tại!');
                return;
            }
            danhSachSV.push(svData);
        }

        closeModal();
        renderAll();
    }

    // ===== XÓA =====
    function deleteSV(index) {
        const sv = danhSachSV[index];
        const confirmed = confirm(`Xóa sinh viên "${sv.hoTen}" (${sv.maSV})?`);
        if (confirmed) {
            danhSachSV.splice(index, 1);
            renderAll();
        }
    }

    // ===== RENDER ALL =====
    function renderAll() {
        renderStats();
        renderTable();
    }

    // ===== EVENT LISTENERS =====

    // Tìm kiếm & lọc
    searchInput.addEventListener('input', renderTable);
    filterLop.addEventListener('change', renderTable);
    filterXepLoai.addEventListener('change', renderTable);

    // Sắp xếp theo cột (event delegation)
    document.querySelector('thead').addEventListener('click', (e) => {
        const th = e.target.closest('th[data-sort]');
        if (!th) return;
        const field = th.dataset.sort;
        if (sortField === field) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortDir = 'asc';
        }
        renderTable();
    });

    // Edit / Delete (event delegation trên tbody)
    tableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit');
        if (editBtn) {
            openModal(parseInt(editBtn.dataset.index));
            return;
        }
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
            deleteSV(parseInt(deleteBtn.dataset.index));
            return;
        }
    });

    // Modal
    document.getElementById('btn-add').addEventListener('click', () => openModal());
    document.getElementById('btn-cancel').addEventListener('click', closeModal);
    document.getElementById('btn-save').addEventListener('click', saveSV);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ===== KHỞI ĐỘNG =====
    renderAll();
    </script>
</body>
</html>
```

---

## ✅ Checklist tổng hợp

### Mảng & Object
- [ ] Khai báo mảng object thủ công `const arr = [{...}, {...}]`
- [ ] Truy cập thuộc tính: `arr[0].hoTen`
- [ ] Duyệt mảng: `forEach`, `for...of`

### Thao tác trên mảng
- [ ] `push()` — thêm vào cuối
- [ ] `pop()` — xóa cuối
- [ ] `unshift()` — thêm vào đầu
- [ ] `shift()` — xóa đầu
- [ ] `splice(index, count)` — xóa tại vị trí
- [ ] `find()` — tìm 1 phần tử
- [ ] `filter()` — lọc nhiều phần tử
- [ ] `sort()` — sắp xếp
- [ ] `reduce()` — tính tổng, trung bình
- [ ] `map()` — biến đổi mảng
- [ ] `includes()` — kiểm tra tồn tại
- [ ] `some()` — kiểm tra điều kiện

### DOM & Events
- [ ] Render bảng từ mảng động
- [ ] Event delegation trên bảng
- [ ] Modal thêm/sửa
- [ ] Confirm dialog trước khi xóa
- [ ] Tìm kiếm realtime
- [ ] Lọc theo nhiều tiêu chí
- [ ] Sắp xếp theo cột (click header)

---

## 🐛 Common Bugs

| Bug | Nguyên nhân | Cách sửa |
|-----|------------|----------|
| `Cannot read property 'hoTen' of undefined` | Truy cập index ngoài phạm vi | Kiểm tra `if (arr[index])` trước |
| Mảng bị thay đổi sau sort | `sort()` mutate mảng gốc | Dùng `[...arr].sort()` |
| Tìm kiếm không hoạt động | Quên `toLowerCase()` | So sánh chữ thường cả 2 bên |
| Modal không đóng | Quên thêm class `hidden` | `modal.classList.add('hidden')` |
| Điểm nhập chữ bị NaN | Không validate `parseFloat` | Kiểm tra `isNaN(diemTB)` |

---

## 📚 Knowledge Check

1. **`find()` vs `filter()`** khác nhau thế nào?
2. Tại sao `[...arr].sort()` tốt hơn `arr.sort()`?
3. `reduce()` có mấy tham số? Mỗi tham số là gì?
4. Event delegation giúp gì khi render bảng động?
5. `Object.assign()` hoạt động thế nào?

---

**← [Bài trước: DOM Mini Projects](00d_dom_mini_projects.md) | [Bài tiếp theo: Skill Filter →](01_skill_filter.md)**
