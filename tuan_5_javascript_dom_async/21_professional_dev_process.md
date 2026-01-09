# 🟨 PART II - CHƯƠNG 21
# **ESTABLISHING A PROFESSIONAL DEVELOPMENT PROCESS**

Code chạy được là một chuyện. Code bền vững, dễ bảo trì, làm việc nhóm tốt lại là chuyện khác. Chương này giới thiệu quy trình làm việc (Workflow) của một Developer chuyên nghiệp.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Biết về **Task Runners** (Tự động hóa công việc).
- Hiểu tầm quan trọng của **Automated Testing** (Kiểm thử tự động).
- Nắm vững **Git** - Công cụ quản lý mã nguồn bắt buộc phải biết.

---

# 1. **AUTOMATING TASKS (TỰ ĐỘNG HÓA)**

Khi làm dự án lớn, bạn phải làm nhiều việc lặp đi lặp lại:
- Nén file CSS/JS (Minify).
- Chuyển SASS sang CSS.
- Tối ưu ảnh.
- Reload trình duyệt mỗi khi sửa code.

Thay vì làm tay, ta dùng tool:
- **Cổ điển:** Grunt, Gulp.
- **Hiện đại (Bundlers - Cực phổ biến):** **Webpack**, **Vite**, **Parcel**. (Ở khóa này chúng ta sẽ dùng Vite khi đụng đến React/Framework).

---

# 2. **AUTOMATED TESTING (KIỂM THỬ TỰ ĐỘNG)**

Làm sao biết code mình sửa hôm nay không làm hỏng tính năng hôm qua? -> Viết test.

## Các loại test:
1.  **Unit Test (Kiểm thử đơn vị):** Test từng hàm nhỏ lẻ. (Ví dụ: Test hàm `add(1, 2)` có ra `3` không?).
    - Tool phổ biến: **Jest**, Mocha, QUnit.
2.  **Integration Test:** Test các phần ghép nối với nhau.
3.  **E2E Test (End-to-End):** Robot giả lập người dùng click chuột thật trên trình duyệt. (Cypress, Selenium).

*Tư duy: "Test càng nhiều, ngủ càng ngon."*

---

# 3. **SOURCE CODE VERSION MANAGEMENT (GIT)**

**Git** là cỗ máy thời gian cho code của bạn.

## Tại sao cần Git?
- **Lưu lịch sử:** Quay lại phiên bản code ngày hôm qua nếu lỡ tay xóa nhầm.
- **Làm việc nhóm:** 10 người cùng sửa 1 dự án mà không ghi đè code lên nhau.
- **Backup:** Đẩy code lên Cloud (GitHub/GitLab) để không sợ mất máy.

## Các lệnh Git cơ bản (Phải thuộc lòng)
1.  `git init`: Khởi tạo kho chứa (repo).
2.  `git add .`: Gom các file thay đổi lại.
3.  `git commit -m "Message"`: Lưu mốc thời gian (Chụp ảnh code hiện tại).
4.  `git push`: Đẩy code lên GitHub.
5.  `git pull`: Kéo code mới nhất từ GitHub về.
6.  `git checkout -b <branch>`: Tạo nhánh mới để làm tính năng riêng (không ảnh hưởng nhánh chính).

---

# 4. **TỔNG KẾT KHÓA HỌC PHẦN CƠ BẢN**

Chúc mừng! Bạn đã đi hết chặng đường Web Frontend Foundation:
1.  **HTML:** Khung xương.
2.  **CSS:** Giao diện.
3.  **JavaScript:** Tư duy logic & Tương tác.
4.  **Tools:** Git & Process.

Đây là hành trang vững chắc để bạn bước tiếp sang các **Frontend Frameworks** (React, Vue, Angular) hoặc **Backend** (NodeJS).

---

**Chương tiếp theo:** Chọn JavaScript Framework - React, Vue.js, hoặc Angular

> [!TIP]
> **Lựa chọn Framework:**
> - **React:** Phổ biến nhất, ecosystem lớn → [Xem React](../../tuan_6_js_frameworks/react/README.md)
> - **Vue.js:** Dễ học nhất, template syntax → [Xem Vue.js](../../tuan_6_js_frameworks/vue/README.md)
> - **Angular:** Enterprise-ready, TypeScript-first → [Xem Angular](../../tuan_6_js_frameworks/angular/README.md)
> 
> Bạn chỉ cần học **1 trong 3**, không cần học cả ba. Xem [Hướng dẫn chọn Framework](../../tuan_6_js_frameworks/README.md) để quyết định.

**Keep coding & Stay curious!**
