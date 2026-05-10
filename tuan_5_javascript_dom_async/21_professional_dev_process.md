# 🟨 TUẦN 5 - BÀI 21
# **PROFESSIONAL DEVELOPMENT PROCESS**

---

## 0. 🎬 Opening Hook

*Ngày đầu tiên thực tập tại FPT Software. Anh Hùng (senior) nói:*

*"Trước tiên, clone repo. Chạy `npm install`. Rồi `npm run dev`. Đọc README. Tìm Jira ticket. Tạo branch. Code. Tạo PR. Code review. Merge. Deploy staging. QA test. Deploy production."*

*Minh nghe xong, đầu quay. "Ở trường mình chỉ code → submit → xong mà..."*

*"Đó là khác biệt giữa BTL và production. Code chỉ là 30%. 70% còn lại là QUY TRÌNH."*

*3 tháng sau, Minh hiểu: quy trình không phải rào cản — quy trình là thứ ngăn production sập lúc 2 giờ sáng.*

---

## 1. 🎯 Why This Matters — Tại sao bạn cần học bài này?

Nhiều sinh viên code giỏi nhưng đi thực tập bị choáng vì:
- Không biết Git workflow (branch, PR, merge conflict)
- Không biết cách đọc và tổ chức code người khác
- Không biết deploy là gì
- Viết commit message kiểu `"fix bug"`, `"update code"`

Bài này chuẩn bị cho bạn ngày đầu tiên đi làm — không phải lý thuyết mà là workflow thực tế đang dùng ở Shopee, FPT, VNG, và các công ty Việt Nam.

---

## 2. 🌐 Big Picture — Vòng đời một task thực tế

```
PROFESSIONAL DEVELOPMENT WORKFLOW

PM/Designer                  Developer                   DevOps/QA
     │                           │                           │
     ├── Tạo task Jira ──────────▶│                           │
     │                           ├── git checkout -b         │
     │                           │   feature/todo-filter     │
     │                           │                           │
     │                           ├── Code + Test local       │
     │                           │   npm run dev             │
     │                           │                           │
     │                           ├── git commit -m           │
     │                           │   "feat: add filter"      │
     │                           │                           │
     │                           ├── git push origin branch  │
     │                           │                           │
     │                           ├── Tạo Pull Request ───────▶│
     │                           │                           ├── CI/CD chạy
     │◀── Review UI ─────────────│◀── Code review ───────────│  (lint, test, build)
     │                           │                           │
     │                           ├── Fix comments ───────────▶│
     │                           │                           ├── Approve
     │                           ├── Merge vào main ─────────▶│
     │                           │                           ├── Auto deploy
     │                           │                           │   staging
     │◀── UAT test ──────────────────────────────────────────│
     │                           │                           ├── Deploy
     │                           │                           │   production
     └───────────────────────────┴───────────────────────────┘
```

---

## 3. ⚙️ Core Technical Truth

### Folder Structure — Tổ chức dự án chuẩn

```
my-todo-app/
├── src/                        ← Source code (KHÔNG commit build files)
│   ├── components/             ← UI components tái sử dụng
│   │   ├── TodoItem.js         ← 1 component = 1 file
│   │   ├── TodoForm.js
│   │   └── Modal.js
│   ├── pages/                  ← Pages / Routes
│   │   ├── Home.js
│   │   └── Archive.js
│   ├── services/               ← API calls (tập trung mọi fetch)
│   │   ├── api.js              ← Base request function
│   │   ├── todoService.js      ← Todo-specific API
│   │   └── authService.js      ← Auth API
│   ├── utils/                  ← Helper functions thuần (không có DOM)
│   │   ├── formatDate.js
│   │   ├── escapeHTML.js
│   │   └── validators.js
│   ├── styles/                 ← CSS/SCSS files (modular)
│   │   ├── _variables.scss
│   │   ├── _components.scss
│   │   └── main.scss
│   ├── app.js                  ← Entry point — khởi động app
│   └── index.html              ← HTML template
├── public/                     ← Static files (ảnh, fonts, favicon)
├── tests/                      ← Unit/Integration tests
├── .gitignore                  ← Khai báo files không commit
├── .env                        ← Environment variables ⚠️ KHÔNG commit!
├── .env.example                ← Template cho team (commit cái này)
├── package.json                ← Dependencies và scripts
├── package-lock.json           ← Lock file (commit cái này)
└── README.md                   ← Hướng dẫn setup và run
```

---

### Git Workflow — Branch Strategy

```bash
# ─── MAIN BRANCHES ──────────────────────────────────
main          # Code production — chỉ merge khi QA pass
develop       # Integration branch — team merge vào đây

# ─── FEATURE BRANCHES ────────────────────────────────
feature/todo-filter       # Tính năng mới
fix/login-null-pointer    # Bug fix
hotfix/payment-crash      # Fix khẩn cấp trên production
refactor/api-service      # Tái cấu trúc code
docs/api-documentation    # Cập nhật docs

# ─── WORKFLOW ────────────────────────────────────────
git checkout develop
git pull origin develop            # Lấy code mới nhất

git checkout -b feature/todo-filter
# ... code ...
git add .
git commit -m "feat(filter): add filter by priority"
git push origin feature/todo-filter
# Tạo Pull Request trên GitHub/GitLab
```

**Conventional Commits — Tên commit chuẩn:**
```bash
# Cú pháp: type(scope): description

feat(auth): add Google OAuth login
fix(todo): prevent duplicate todo on double click
refactor(api): extract base request to utils
docs(readme): update installation steps
style(card): fix card hover animation
test(filter): add unit tests for filter function
chore(deps): update axios to 1.6.0
```

**Tại sao commit message quan trọng:**
```bash
# 6 tháng sau, cần tìm commit đã thêm dark mode:
git log --oneline --grep="dark mode"
# → "feat(theme): add dark mode with CSS variables" — TÌM ĐƯỢC!

# Nếu commit là "update code", "fix stuff" → tìm 200 commits mất 2 tiếng
```

---

### Package Management (npm)

```bash
# Khởi tạo project
npm init -y                          # Tạo package.json

# Cài dependencies
npm install axios                    # Production dep
npm install -D eslint prettier vite  # Dev-only dep (chỉ dùng lúc dev)

# Chạy scripts từ package.json
npm run dev         # Development server (với hot reload)
npm run build       # Build production
npm run lint        # Check code style
npm run test        # Run tests
npm run preview     # Preview production build locally
```

```json
// package.json — File khai báo dự án
{
    "name": "my-todo-app",
    "version": "1.0.0",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "lint": "eslint src/",
        "format": "prettier --write src/",
        "test": "vitest"
    },
    "dependencies": {
        "axios": "^1.6.0"
    },
    "devDependencies": {
        "vite": "^5.0.0",
        "eslint": "^8.0.0",
        "prettier": "^3.0.0",
        "vitest": "^1.0.0"
    }
}
```

---

### Environment Variables — Bảo mật API keys

```bash
# .env — KHÔNG COMMIT LÊN GITHUB
VITE_API_BASE_URL=https://api.production.com
VITE_WEATHER_API_KEY=abc123secretkey
VITE_AUTH_SECRET=mysecrettoken

# .env.example — COMMIT lên GitHub (template, không có giá trị thật)
VITE_API_BASE_URL=https://api.example.com
VITE_WEATHER_API_KEY=your_key_here
VITE_AUTH_SECRET=your_secret_here
```

```javascript
// Dùng trong code (Vite)
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Không bao giờ hardcode trong code!
// ❌ const API_KEY = "abc123secretkey";  → Lộ trên GitHub → bị hack
```

---

### Deployment — Publish lên internet

**Frontend Hosting (free, excellent):**

| Platform | Best for | Auto Deploy | Setup |
|---|---|---|---|
| **Vercel** ⭐ | React/Next.js/Vite | Push → Deploy | 2 phút |
| **Netlify** | Static sites, SPA | Push → Deploy | 2 phút |
| **GitHub Pages** | Portfolio, docs | Cần config | 5 phút |

```bash
# Vercel — Đơn giản nhất
npm i -g vercel
vercel                  # Login → Select project → Deploy!
vercel --prod           # Deploy to production URL

# Netlify qua CLI
npm i -g netlify-cli
netlify login
netlify deploy --dir=dist --prod
```

**CI/CD tự động (GitHub Actions):**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/actions@v1
        with:
          token: ${{ secrets.VERCEL_TOKEN }}
```

---

### Developer Tools — Bộ công cụ hàng ngày

| Tool | Dùng cho | Tại sao cần |
|---|---|---|
| **VS Code** | Editor | Extensions ecosystem, IntelliSense |
| **Chrome DevTools** | Debug HTML/CSS/JS | Inspect, console, network tab |
| **Git + GitHub** | Version control | Lịch sử code, collaboration |
| **Jira / Linear** | Task management | Track tiến độ, sprint |
| **Slack / Discord** | Team communication | Nhanh hơn email |
| **Figma** | Design handoff | Inspect spacing, color, font |
| **Postman / Insomnia** | Test API | Test endpoint trước khi code |
| **ESLint + Prettier** | Code quality | Auto format, catch bugs sớm |

---

## 4. 🟢 Simplified Layer — Hai câu nhớ mãi

> **Mỗi task = 1 branch. Mỗi branch = 1 Pull Request. Commit message theo Conventional Commits.**
> **Không bao giờ commit API keys vào Git. Dùng `.env` và `.gitignore`.**

---

## 5. 🏭 Real-world Layer

### Day 1 Checklist tại công ty mới:

```bash
# 1. Clone và setup
git clone git@github.com:company/project.git
cd project
cp .env.example .env          # Copy template, điền giá trị thật
npm install                   # Cài dependencies
npm run dev                   # Chạy local

# 2. Đọc README (bắt buộc!)
cat README.md

# 3. Hiểu codebase — không code ngay!
# - Folder structure
# - API service layer
# - State management
# - Naming conventions

# 4. Tìm ticket đầu tiên trên Jira
# - Đọc kỹ acceptance criteria
# - Hỏi nếu không rõ (5 phút hỏi = tiết kiệm 5 tiếng debug)

# 5. Tạo branch và bắt đầu
git checkout -b fix/my-first-task
```

### Quy tắc nhận code review:

```
✅ Làm:
- Giải thích lý do nếu code không hiển nhiên
- Tạo PR nhỏ (<300 lines changed) — dễ review hơn
- Respond mọi comment, dù chỉ "Đã fix" hoặc "Đồng ý, đã sửa"
- Request re-review sau khi fix

❌ Không làm:
- Cãi lại reviewer mà không có lý do kỹ thuật
- Push force (git push -f) khi branch đang có PR open
- Merge PR của mình khi chưa có approval
- Commit "debug" code lên branch chia sẻ
```

---

## 6. 🛠️ Hands-on Practice — Làm ngay bây giờ

### Bài tập: Setup Project chuyên nghiệp (30 phút)

```bash
# 1. Khởi tạo project Vite
npm create vite@latest my-todo-pro -- --template vanilla
cd my-todo-pro
npm install

# 2. Tạo folder structure
mkdir -p src/{components,services,utils,styles}
touch src/services/api.js
touch src/utils/helpers.js
touch src/.env.example

# 3. Setup .gitignore
echo "node_modules/
dist/
.env
*.log" > .gitignore

# 4. Setup .env.example
echo "VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_APP_NAME=My Todo App" > .env.example

# 5. Copy sang .env và điền giá trị
cp .env.example .env

# 6. Commit đầu tiên với chuẩn Conventional Commits
git init
git add .
git commit -m "feat: initial project setup with Vite"

# 7. Push lên GitHub và tạo repo
# (Tạo repo trên GitHub → copy remote URL)
git remote add origin https://github.com/yourusername/my-todo-pro.git
git push -u origin main

# 8. Deploy lên Vercel (chỉ cần 2 phút!)
npm i -g vercel
vercel
```

---

## 7. ❌ Common Misconceptions — Hiểu sai phổ biến

| Hiểu sai | Sự thật |
|---|---|
| **"Commit thường xuyên làm lịch sử Git lộn xộn"** | Commit thường xuyên (mỗi feature nhỏ) = an toàn hơn. Có thể dùng `git rebase -i` để gộp commits trước khi merge PR |
| **"`.env` không commit được vì Git tự nhận ra"** | Git không tự biết — phải tự thêm `.env` vào `.gitignore`. Nếu quên, file `.env` bị push lên GitHub → lộ API key → nguy hiểm! |
| **"README chỉ là tài liệu cho người khác"** | README là tài liệu cho BẠN sau 6 tháng khi bạn quên cách chạy project của mình. Viết README ngay khi setup. |
| **"PR cần code review trước khi merge là rào cản"** | Code review = phát hiện bug trước khi đến production. Giảm cost sửa bug từ 100x xuống 1x. PR nhỏ = review nhanh |
| **"Vercel/Netlify chỉ cho project nhỏ"** | Vercel host production của nhiều startup và công ty lớn. Shopee, Notion, và nhiều công ty dùng Vercel cho frontend |
| **"Merge conflict là lỗi nghiêm trọng"** | Merge conflict là hiện tượng **bình thường** khi nhiều người cùng code. Không phải lỗi — chỉ là Git cần bạn quyết định code nào giữ lại |

---

### 🔀 Xử lý Merge Conflict — Kỹ năng bắt buộc

Khi 2 người sửa cùng 1 dòng code → Git không biết giữ version nào → **conflict**:

```
<<<<<<< HEAD (your changes)
const apiUrl = "https://api-v2.example.com";
=======
const apiUrl = "https://api-v1.example.com";
>>>>>>> feature/new-api (their changes)
```

**Cách giải quyết (4 bước):**

```bash
# 1. Pull code mới nhất
git pull origin develop

# 2. Mở VS Code — conflict sẽ hiện với 3 options:
#    "Accept Current"  = giữ code của bạn
#    "Accept Incoming" = giữ code người khác
#    "Accept Both"     = giữ cả hai

# 3. Hoặc sửa thủ công — xóa markers <<<<<<<, =======, >>>>>>>
#    Giữ lại code đúng (hoặc merge cả hai cách)

# 4. Add + commit + push
git add .
git commit -m "fix: resolve merge conflict in api config"
git push
```

**Phòng tránh conflict:**
- Pull code mới nhất **trước khi** bắt đầu code
- Mỗi người code trên **file riêng** khi có thể
- PR nhỏ → conflict ít hơn
- Communicate với team khi sửa file chung

---

## 8. ✅ Checkpoint

### Câu hỏi hiểu cơ bản:

1. Tại sao code production cần branch riêng (`main`) thay vì code trực tiếp trên `main`?
2. Conventional Commits (`feat`, `fix`, `docs`...) giải quyết vấn đề gì trong thực tế?
3. Tại sao `.env` không được commit lên Git, nhưng `.env.example` thì được?

### Câu hỏi áp dụng:

4. Viết commit message chuẩn cho 3 thay đổi sau: (a) Thêm tính năng filter todo theo priority, (b) Sửa bug todo không xóa được khi text có dấu tiếng Việt, (c) Cập nhật README hướng dẫn cài đặt.
5. Team của bạn có 3 developers làm 3 feature song song. Bạn cần review PR của người khác — PR có 800 lines changed. Bạn sẽ làm gì? (Không phải "approve vì tin tưởng")

<details>
<summary>👁️ Xem đáp án</summary>

1. Nếu code trực tiếp trên `main`: lỗi xuất hiện → production sập ngay. Branch riêng = code trên feature branch → test → review → merge khi đã OK → production an toàn. **main luôn ở trạng thái deployable**.
2. Conventional Commits giải quyết: (1) **Tìm kiếm lịch sử** — `git log --grep="feat"` tìm ngay tất cả features; (2) **Auto changelog** — tools như `semantic-release` tự tạo changelog từ commit messages; (3) **Giao tiếp team** — ai đọc commit cũng hiểu ngay thay đổi là gì và tại sao.
3. **`.env`** chứa giá trị thật (API keys, passwords, secrets) → commit lên GitHub = lộ với toàn thế giới → bị hack, bị bill cloud. **`.env.example`** chứa tên key nhưng không có giá trị thật → team clone về biết cần fill gì, không lộ thông tin nhạy cảm.
4. **(a)** `feat(filter): add filter todos by priority level` **(b)** `fix(todo): fix delete not working with Vietnamese characters` **(c)** `docs(readme): add installation and setup instructions`
5. Không nên review 800 lines một lúc. Cách xử lý chuyên nghiệp: (1) Comment PR yêu cầu **tách thành PR nhỏ hơn** (<300 lines mỗi PR); (2) Nếu urgent, review từng module/file riêng, tập trung vào logic quan trọng và edge cases; (3) Test local nếu có thể — không chỉ đọc code.

</details>

---

## 9. 📌 Summary — 5 điều quan trọng nhất

1. **Branch workflow**: `main` (production) ← `develop` ← `feature/*` branches. Mỗi task = 1 branch = 1 PR
2. **Conventional Commits**: `feat/fix/docs/refactor/chore(scope): description` — searchable, automatable
3. **`.env` không bao giờ commit** — dùng `.gitignore`. Commit `.env.example` thay thế
4. **Folder structure**: `components/`, `services/`, `utils/`, `styles/` — mỗi loại code 1 nơi
5. **Deploy**: Vercel/Netlify free, auto-deploy khi push — setup 1 lần, dùng mãi

---

## 10. ➡️ Tổng kết khóa học 🎓

*Từ bài đầu tiên đến bây giờ:*

| Tuần | Nội dung | Bạn đã thành thạo |
|---|---|---|
| **Tuần 1** | HTML5 | Semantic HTML, Forms, Tables, Media |
| **Tuần 2** | CSS Core | Selectors, Box Model, Positioning |
| **Tuần 3** | CSS Advanced | Responsive, Animations, SCSS, BEM |
| **Tuần 4** | JavaScript Basics | Variables, Functions, Arrays, Objects |
| **Tuần 5** | JS DOM & Async | DOM Manipulation, Fetch API, localStorage |
| **Tuần 5** | Professional | Git workflow, npm, deployment, tools |

**Bước tiếp theo — Frameworks:**

```
Bạn có 2 lựa chọn:

React (Meta)          Vue.js (Community)
├── Component-based   ├── Component-based
├── JSX syntax        ├── Template syntax
├── Largest ecosystem ├── Easier learning curve
├── React Native →    ├── Vue Native (đang phát triển)
│   Mobile apps       └── NuxtJS → SSR/SSG
└── Next.js → SSR/SSG

→ Khuyến nghị: React nếu muốn nhiều cơ hội việc làm
→ Vue nếu muốn syntax dễ đọc và học nhanh hơn
```

**→ [Tuần 6: JS Frameworks](../tuan_6_js_frameworks/) — React, Vue, hoặc Angular: component thinking, state management, và con đường trở thành Frontend Developer.**

> [!TIP]
> Trước khi học framework, hãy đảm bảo bạn thoải mái với: JavaScript Array methods (`map/filter/reduce`), Destructuring, Spread operator, Async/await, và DOM events. Framework sẽ trở nên dễ dàng hơn rất nhiều.
