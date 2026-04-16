# 🟢 MODULE 4 - BÀI 15
# **TESTING & DEPLOYMENT**

## 🎬 "Code Xong → Test → Deploy → Uống Cà Phê" — Từ Localhost Ra Internet

*Minh: "Deploy Vue app lên đâu?" Anh Hùng: "Vitest test → `npm run build` → 1 folder `dist/` chứa HTML/JS/CSS tĩnh → kéo thả lên Vercel/Netlify → LIVE trong 30 giây. CI/CD với GitHub Actions = push code → tự test → tự deploy. Không cần server."*

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Viết unit tests với Vue Test Utils
- Build production
- Deploy lên hosting platforms

---

## 1. **UNIT TESTING**

**tests/Counter.spec.js:**
```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../src/components/Counter.vue'

describe('Counter', () => {
  it('increments count on button click', async () => {
    const wrapper = mount(Counter)
    const button = wrapper.find('button')
    
    await button.trigger('click')
    
    expect(wrapper.text()).toContain('1')
  })
})
```

---

## 2. **BUILD & DEPLOY**

```bash
# Build production
npm run build

# Preview
npm run preview

# Deploy to Vercel/Netlify
# Upload dist/ folder
```

---

**Hoàn thành Module 4!** Bạn đã nắm vững Vue.js từ cơ bản đến nâng cao.
