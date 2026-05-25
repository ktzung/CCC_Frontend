# 📋 PHIẾU BÀI TẬP 04
# **CSS LAYOUT — Positioning, Flexbox & Grid**

> **Tài liệu tham chiếu:** `tuan_2_css_core/12_css_positioning.md` + `tuan_3_css_advanced/13_creating_responsive_layouts.md`
>
> ⏱️ **Thời gian:** 150 phút | 📊 **Tổng điểm:** 100

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

Đọc chương 12. Điền bảng sau mà **KHÔNG** tra Google:

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | ??? | ??? | ??? | ??? |
| `relative` | ??? | ??? | ??? | ??? |
| `absolute` | ??? | ??? | ??? | ??? |
| `fixed` | ??? | ??? | ??? | ??? |
| `sticky` | ??? | ??? | ??? | ??? |

**Câu hỏi thêm:** Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".

### Câu A2 (10đ) — Flexbox vs Grid

Không chạy code, dự đoán layout cho mỗi trường hợp. **Vẽ sơ đồ bố cục** (text art hoặc vẽ tay chụp ảnh).

```css
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? (mấy hàng, mấy cột?) */

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */
```

---

## PHẦN B — THỰC HÀNH CODE (60 điểm)

### Bài B1 (15đ) — Positioning Playground

Tạo file `positioning.html` + `positioning.css`.

Tạo trang web có:

1. **Fixed header** (60px cao, full width, nền đậm, chữ trắng):
   - Logo bên trái
   - Navigation bên phải
   - Header phải **luôn ở trên cùng** khi scroll

2. **Sticky sidebar** (250px rộng):
   - Sidebar phải "dính" khi scroll xuống
   - Dùng `position: sticky; top: 80px;` (dưới header)

3. **Badge "HOT"** trên card sản phẩm:
   - Card product dùng `position: relative`
   - Badge "HOT" dùng `position: absolute` ở góc phải trên
   - Badge hình tròn, nền đỏ, chữ trắng

4. **Scroll to top button**:
   - Nút cố định ở góc phải dưới (`position: fixed`)
   - Hình tròn, icon ↑

**Chụp screenshot:**
- Trạng thái header khi scroll (chứng minh header fixed)
- Trạng thái sidebar khi scroll (chứng minh sticky)
- Badge trên card

### Bài B2 (20đ) — Flexbox Navigation & Cards

Tạo file `flexbox_layout.html` + `flexbox.css`.

**Phần 1 — Navbar (10đ):**

Tạo navbar ngang dùng Flexbox:
- [ ] Logo nằm bên trái
- [ ] Menu items nằm giữa (dùng `justify-content`)
- [ ] Nút đăng nhập/đăng ký nằm bên phải
- [ ] Items cách đều nhau
- [ ] Khi hover: đổi màu + underline
- [ ] **Vertical centering** hoàn hảo (`align-items: center`)

```
|  LOGO  |     Home   Products   About     |  Login  Register  |
```

**Phần 2 — Product Cards Grid (10đ):**

Tạo lưới sản phẩm dùng Flexbox:
- [ ] Container dùng `display: flex; flex-wrap: wrap;`
- [ ] Mỗi card = `flex: 0 0 calc(25% - 20px)` (4 cột, có gap)
- [ ] Mỗi card bên trong cũng dùng flex (column direction):
  - Ảnh (trên)
  - Tên + giá (giữa)
  - Nút "Mua" (dưới, luôn dính đáy card dùng `margin-top: auto`)
- [ ] Ít nhất 8 cards (2 hàng)
- [ ] Card hover: `transform: translateY(-5px)` + `box-shadow` tăng

### Bài B3 (25đ) — Grid Layout — Trang E-Commerce

Tạo file `grid_layout.html` + `grid.css`.

Xây dựng layout trang chủ E-Commerce hoàn chỉnh dùng **CSS Grid**:

```
┌──────────────────────────────────────────────────┐
│                   HEADER (full width)             │
├──────────────────────────────────────────────────┤
│                   HERO BANNER                     │
├─────────┬────────────────────────────┬───────────┤
│         │        MAIN CONTENT        │           │
│ SIDEBAR │  ┌──────┬──────┬──────┐   │   ADS     │
│ (filter)│  │ Card │ Card │ Card │   │ (aside)   │
│         │  ├──────┼──────┼──────┤   │           │
│         │  │ Card │ Card │ Card │   │           │
│         │  └──────┴──────┴──────┘   │           │
├─────────┴────────────────────────────┴───────────┤
│                   FOOTER (full width)             │
└──────────────────────────────────────────────────┘
```

**Yêu cầu kỹ thuật:**

- [ ] Layout chính dùng CSS Grid: `grid-template-columns: 200px 1fr 200px;`
- [ ] Header + Hero + Footer span full width: `grid-column: 1 / -1;`
- [ ] Sidebar: filter checkboxes (giả lập)
- [ ] Main: Grid con 3 cột cho product cards
- [ ] Ads: banner quảng cáo (placeholder image)
- [ ] `gap` giữa các vùng
- [ ] Giữ đúng tỷ lệ khi resize (dùng `minmax()` nếu được)
- [ ] Content thực tế: ít nhất 6 product cards

**Nâng cao (bonus 5đ):**
- [ ] Dùng `grid-template-areas` với named areas
- [ ] Hero banner có 1 card product "nổi bật" dùng `grid-column: span 2`

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

Cho 5 tình huống layout thực tế. Với mỗi tình huống, trả lời: dùng **Flexbox**, **Grid**, hay **kết hợp cả hai**? Giải thích ngắn gọn tại sao.

1. Navigation bar ngang (logo + menu + buttons)
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
3. Layout blog: main content + sidebar
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

### Câu C2 (10đ) — Debug Flexbox

Layout sau bị lỗi. Mô tả lỗi và sửa.

**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài

```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```

Cho mỗi lỗi: Giải thích nguyên nhân → Viết code sửa → Chụp screenshot trước/sau.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 8-12 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Navbar + Product Cards bằng Flexbox"

**Yêu cầu:** Quay video tạo navbar ngang + lưới product cards dùng Flexbox từ đầu.

**Trong video, bạn phải:**

1. 🎤 Tạo navbar ngang: Logo bên trái, menu giữa, nút Login bên phải — dùng `display: flex; justify-content: space-between; align-items: center`
2. 🎤 Giải thích từng property: `justify-content` (phân bố ngang), `align-items` (căn dọc)
3. 🎤 Tạo 4 product cards dùng `flex-wrap: wrap` + `flex: 0 0 calc(25% - 20px)`
4. 🎤 Giải thích tại sao cần `flex-wrap: wrap` (không wrap = 4 cards bị nén)
5. 🎤 Dùng `margin-top: auto` trên nút "Mua" để nút luôn dính đáy card — giải thích tại sao hoạt động
6. 🎤 Thêm hover effect: `transform: translateY(-5px)` + `transition`
7. 🎤 Thu nhỏ browser → chứng minh cards wrap xuống hàng mới

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ CSS từng dòng, giải thích mỗi flex property
- [ ] Demo resize browser để thấy flex-wrap hoạt động
- [ ] Cuối video: Hover effect + tổng kết

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] File `positioning.html` + `positioning.css` — Bài B1
- [ ] File `flexbox_layout.html` + `flexbox.css` — Bài B2
- [ ] File `grid_layout.html` + `grid.css` — Bài B3
- [ ] Folder `screenshots/` — layout kết quả + DevTools
- [ ] 🎬 **Video OBS** — `videos/PBT04_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **4 commits**
