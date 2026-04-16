# 🟨 PART III - CHƯƠNG 21
# **PROFESSIONAL DEVELOPMENT PROCESS**

## 🎬 "Ngày Đầu Đi Thực Tập" — Khi BTL Khác Xa Với Production

*Ngày đầu tiên thực tập tại FPT Software. Minh mở laptop, anh Hùng nói:*

> *"Trước tiên, clone repo. Chạy `npm install`. Rồi `npm run dev`. Đọc README. Tìm Jira ticket. Tạo branch. Code. Tạo PR. Code review. Merge. Deploy staging. QA test. Deploy production."*

*Minh nghe xong, đầu quay. "Ở trường mình chỉ code → submit → xong mà..."*

> *"Đó là khác biệt giữa BTL và production. Code chỉ là 30%. 70% còn lại là QUY TRÌNH."*

---

## 🎯 Mục tiêu
- Hiểu workflow phát triển phần mềm chuyên nghiệp
- Tổ chức dự án (folder structure)
- Task management (Jira/Trello workflow)
- Code review và CI/CD cơ bản
- Deployment basics

---

## 📁 Tổ chức dự án Front-end

```
my-project/
├── src/                    ← Source code
│   ├── components/         ← Reusable components
│   │   ├── Button.js
│   │   ├── Modal.js
│   │   └── TodoItem.js
│   ├── pages/              ← Pages/Routes
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── services/           ← API calls
│   │   └── api.js
│   ├── utils/              ← Helper functions
│   │   └── formatDate.js
│   ├── styles/             ← CSS files
│   │   ├── global.css
│   │   └── components/
│   ├── app.js              ← Entry point
│   └── index.html
├── public/                 ← Static files
├── tests/                  ← Tests
├── .gitignore              ← Files Git bỏ qua
├── .env                    ← Environment variables (⚠️ KHÔNG commit!)
├── package.json            ← Dependencies & scripts
└── README.md               ← Hướng dẫn dự án
```

---

## 🔄 Development Workflow — Từ Task đến Production

```
1. 📋 Nhận task                   (Jira: "Fix bug login page")
       ↓
2. 🌿 Tạo branch                 (git checkout -b fix/login-bug)
       ↓
3. 💻 Code + Test locally        (npm run dev, manual testing)
       ↓
4. 📸 Commit + Push              (Conventional commits)
       ↓
5. 🔀 Tạo Pull Request           (GitHub PR + description)
       ↓
6. 👀 Code Review                (Team review, address comments)
       ↓
7. ✅ CI/CD passes               (Auto: lint, test, build)
       ↓
8. 🚀 Merge + Deploy staging     (Test trên staging environment)
       ↓
9. 🧪 QA Test                    (QA team kiểm tra)
       ↓
10. 🎯 Deploy production         (User thật sử dụng!)
```

> *Minh nhận ra: Code là bước 3 trong 10 bước. Quy trình mới là thứ phân biệt junior và senior.*

---

## 📦 Package Management (npm)

```bash
# Cài package
npm install axios            # Production dependency
npm install -D eslint        # Dev dependency

# package.json scripts
{
    "scripts": {
        "dev": "vite",                    # Chạy development server
        "build": "vite build",            # Build production
        "preview": "vite preview",        # Preview build
        "lint": "eslint src/",            # Check code quality
        "test": "vitest"                  # Run tests
    }
}
```

---

## 🚀 Deployment Basics

### Frontend Hosting miễn phí:

| Platform | Tốc độ | Tự động deploy | Free tier |
|---|---|---|---|
| **Vercel** ⭐ | Nhanh | ✅ Push → Deploy | 100GB/month |
| **Netlify** | Nhanh | ✅ Push → Deploy | 100GB/month |
| **GitHub Pages** | OK | Cần config | Unlimited |

```bash
# Deploy lên Vercel (siêu đơn giản)
npm i -g vercel
vercel          # → Trả lời vài câu → Deploy xong!
```

---

## 🛠️ Developer Tools trong ngày đi làm

| Tool | Mục đích |
|---|---|
| **VS Code** | Editor |
| **Chrome DevTools** | Debug HTML/CSS/JS |
| **Git + GitHub** | Version control |
| **Jira / Trello** | Task management |
| **Slack / Discord** | Communication |
| **Figma** | Design handoff |
| **Postman** | Test API |

---

## 💡 Best Practices "First Day at Work"

1. **Đọc README trước khi code** — Setup instructions, conventions
2. **Chạy project local thành công** trước khi sửa bất cứ gì
3. **Hỏi khi không hiểu** — Không đoán. Hỏi senior 5 phút, tiết kiệm 5 giờ debug
4. **Commit nhỏ, commit thường xuyên** — Mỗi commit = 1 ý nghĩa
5. **Push mỗi cuối ngày** — Backup code, team thấy progress

> **Chị Hà:** *"Developer giỏi không phải code nhanh nhất. Mà là developer có QUY TRÌNH tốt nhất — ít bug, dễ maintain, team happy."*

---

## 🎓 Tổng kết khóa học

Bạn đã đi từ **zero** đến **production-ready**:

| Tuần | Nội dung | Bạn đã học |
|---|---|---|
| 1 | HTML5 | Cấu trúc, semantic, forms, media |
| 2 | CSS Core | Selectors, box model, positioning |
| 3 | CSS Advanced | Flexbox, Grid, responsive, animations |
| 4 | JavaScript Basics | Variables, functions, arrays, objects |
| 5 | JS DOM & Async | DOM manipulation, events, fetch API |
| 6 | Professional | Workflow, deployment, tools |

**→ Bạn sẵn sàng cho: Frameworks (React/Vue), Internship, và Career path trong Web Development!** 🚀
