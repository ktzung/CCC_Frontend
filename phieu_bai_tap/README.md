# 📋 PHIẾU BÀI TẬP — CSE391 Phát triển ứng dụng Web cơ bản

## 🎯 Mục tiêu

Hệ thống Phiếu Bài Tập được thiết kế với triết lý **"đọc hiểu mới làm được"**:

- ✅ **Chống copy-paste:** Câu hỏi yêu cầu phân tích, debug, viết code cụ thể — không thể google đáp án
- ✅ **Chống AI thuần túy:** Yêu cầu chụp screenshot, giải thích output thực tế, tham chiếu số trang/dòng cụ thể trong tài liệu
- ✅ **Buộc đọc tài liệu:** Mỗi câu hỏi gắn trực tiếp với nội dung chapter tương ứng
- ✅ **Buộc thực hành:** Phần lớn bài tập yêu cầu viết code chạy được, commit lên Git

## 📁 Danh sách Phiếu Bài Tập

| # | Phiếu | Nội dung | Tuần |
|---|-------|----------|------|
| 1 | [PBT_01_HTML_Fundamentals.md](./PBT_01_HTML_Fundamentals.md) | HTML5 cấu trúc, Semantic, Tables, Links | Tuần 1 |
| 2 | [PBT_02_HTML_Forms_Media.md](./PBT_02_HTML_Forms_Media.md) | Forms, Validation, Media, Accessibility | Tuần 1 |
| 3 | [PBT_03_CSS_Core.md](./PBT_03_CSS_Core.md) | Selectors, Box Model, Inheritance, Cascade | Tuần 2 |
| 4 | [PBT_04_CSS_Layout.md](./PBT_04_CSS_Layout.md) | Positioning, Flexbox, Grid | Tuần 2-3 |
| 5 | [PBT_05_CSS_Responsive.md](./PBT_05_CSS_Responsive.md) | Responsive Design, Media Queries, SCSS | Tuần 3 |
| 6 | [PBT_06_CSS_Frameworks.md](./PBT_06_CSS_Frameworks.md) | Bootstrap / TailwindCSS | Tuần 4 |
| 7 | [PBT_07_JS_Basics.md](./PBT_07_JS_Basics.md) | Variables, Data Types, Control Structures | Tuần 5 |
| 8 | [PBT_08_JS_Functions_Arrays.md](./PBT_08_JS_Functions_Arrays.md) | Functions, Scope, Arrays, Objects | Tuần 5 |
| 9 | [PBT_09_JS_DOM.md](./PBT_09_JS_DOM.md) | DOM Manipulation, Events | Tuần 6 |
| 10 | [PBT_10_JS_Async_API.md](./PBT_10_JS_Async_API.md) | Async/Await, Fetch API, CRUD | Tuần 6 |

## 📏 Quy định nộp bài

### Cấu trúc dự án Git

```
CSE391_HoTen_MaSV/
├── README.md                    ← Thông tin SV + tiến độ
├── PBT_01/
│   ├── index.html
│   ├── style.css
│   ├── screenshots/             ← Chụp kết quả
│   ├── answers.md               ← Trả lời câu hỏi lý thuyết
│   └── videos/                  ← 🎬 Video thực hành OBS
│       └── PBT01_HoTen_MaSV.mp4
├── PBT_02/
│   ├── ...
├── ...
└── BTL/                         ← Bài tập lớn (E-Commerce)
```

### Quy tắc commit

- **Mỗi phiếu bài tập = ít nhất 3 commits** (không được gộp 1 commit)
- Commit message có ý nghĩa: `PBT_03: Hoàn thành bài 2 - Box Model debug`
- **Nghiêm cấm sửa lịch sử commit** (rebase/force push)

---

### 🎬 QUY ĐỊNH VIDEO THỰC HÀNH OBS

Mỗi Phiếu Bài Tập có **Phần D — Video Thực Hành** yêu cầu sinh viên quay video màn hình bằng OBS Studio, vừa code lại đoạn code mẫu vừa **giảng giải, thuyết minh** từng bước.

#### Yêu cầu kỹ thuật video

| Yêu cầu | Chi tiết |
|----------|----------|
| **Phần mềm** | OBS Studio (miễn phí) — [obsproject.com](https://obsproject.com/) |
| **Độ phân giải** | Tối thiểu 1280×720 (720p) |
| **Thời lượng** | 5-15 phút tùy phiếu (xem yêu cầu cụ thể từng PBT) |
| **Format** | MP4 (H.264) |
| **Đặt tên file** | `PBT0X_HoTen_MaSV.mp4` (VD: `PBT03_NguyenVanA_64CNTT1234.mp4`) |

#### Bố cục video bắt buộc

```
┌───────────────────────────────────────────────────┐
│                                                   │
│           MÀN HÌNH CODE EDITOR                    │
│         (VS Code / Browser)                       │
│                                                   │
│                                                   │
│                                                   │
│                                         ┌────────┐│
│                                         │ WEBCAM ││
│                                         │  MẶT   ││
│                                         │  SV    ││
│                                         └────────┘│
└───────────────────────────────────────────────────┘
```

- **Góc phải dưới:** Webcam hiển thị mặt sinh viên (kích thước ~200×150 px)
- **Phần chính:** Màn hình code editor (VS Code) + browser

#### Cấu trúc nội dung video

| Phần | Thời lượng | Nội dung |
|------|-----------|----------|
| **1. Giới thiệu** | 15-30 giây | *"Xin chào, em là [Họ tên], MSSV [số], lớp [tên lớp]. Đây là video Phiếu Bài Tập số [X] — chủ đề [tên chủ đề]."* |
| **2. Code-along** | 3-12 phút | Viết code từ đầu theo đề bài, **vừa gõ vừa giải thích** từng dòng: tại sao viết thế này, nó hoạt động ra sao |
| **3. Demo kết quả** | 1-2 phút | Chạy code trên browser, show kết quả, giải thích output |
| **4. Tổng kết** | 15-30 giây | Tóm tắt những gì đã học được từ bài tập |

#### ⚠️ Lưu ý quan trọng

- **BẮT BUỘC có mặt SV trong webcam** — Video chỉ có màn hình, không có mặt = **0 điểm video**
- **BẮT BUỘC thuyết minh bằng giọng nói** — Video im lặng chỉ gõ code = **0 điểm video**
- **BẮT BUỘC gõ code trực tiếp** — KHÔNG copy-paste code có sẵn (giảng viên sẽ xem tốc độ gõ)
- **KHÔNG dùng AI copilot/autocomplete** trong video — Tắt GitHub Copilot, Tabnine khi quay
- Video file quá lớn → Upload lên YouTube (Unlisted) hoặc Google Drive → Ghi link vào `answers.md`

#### Cách cài đặt OBS cho video bài tập

```
Bước 1: Tải OBS Studio → obsproject.com
Bước 2: Sources → thêm "Display Capture" (quay màn hình)
Bước 3: Sources → thêm "Video Capture Device" (webcam)
Bước 4: Kéo webcam về góc phải dưới, resize cho nhỏ (~200px)
Bước 5: Settings → Output → Recording:
         - Format: mp4
         - Encoder: x264
         - Quality: High Quality, Medium File Size
Bước 6: Settings → Video → Output Resolution: 1280x720
```

---

### Tiêu chí chấm điểm

| Tiêu chí | Tỷ trọng |
|----------|----------|
| Đúng yêu cầu kỹ thuật | 30% |
| Chất lượng code (clean, readable) | 15% |
| Tần suất & chất lượng commit | 15% |
| Giải thích / screenshots | 15% |
| 🎬 **Video thực hành OBS** | **25%** |

#### Chi tiết chấm Video (25 điểm)

| Tiêu chí video | Điểm |
|----------------|------|
| Có mặt SV (webcam) + giới thiệu đầu video | 5đ |
| Gõ code trực tiếp (không copy-paste) | 5đ |
| Giải thích rõ ràng, dễ hiểu từng bước | 10đ |
| Demo kết quả + tổng kết | 5đ |

### ⚠️ Cảnh báo gian lận

- Copy bài bạn: **0 điểm toàn bộ phiếu** cho cả 2 bên
- Dùng AI sinh toàn bộ: **0 điểm** (phát hiện qua nhật ký commit + phỏng vấn)
- Commit dồn 1 lần: **Trừ 50% điểm** phiếu đó
- Video không có mặt / không thuyết minh: **0 điểm phần video**
- Video nghi ngờ nhờ người khác quay: **Gọi phỏng vấn trực tiếp**

---

*Tạo bởi GV môn CSE391 — Cập nhật: 2026*
