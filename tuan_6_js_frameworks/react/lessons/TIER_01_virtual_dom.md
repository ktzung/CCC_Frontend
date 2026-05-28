# Tier 1 — Virtual DOM (Cách React cập nhật UI hiệu quả)

> **⏱ Thời lượng:** 30-35 phút  
> **🎯 Mục tiêu:** Hiểu Virtual DOM là gì và tại sao React nhanh hơn DOM thuần  
> **📋 Cần biết:** Tier 0 (SPA Architecture), DOM cơ bản  
> **🚫 Không cần biết:** JSX, Components, useState

---

## 🎬 Opening Hook

*Minh làm trang web bán hàng bằng JS thuần. Có 1000 sản phẩm. Khi user chọn "Sắp xếp theo giá", Minh phải:*

```javascript
// Xóa hết 1000 thẻ <li> cũ
document.getElementById("product-list").innerHTML = "";

// Tạo lại 1000 thẻ <li> mới (đã sắp xếp)
for (let i = 0; i < 1000; i++) {
    // document.createElement, setAttribute, appendChild... × 1000
}
```

*"Mỗi lần sort = tạo lại 1000 phần tử. Browser phải parse lại toàn bộ. Chậm kinh khủng."*

*"React không làm vậy." Anh Hùng nói. "React chỉ thay đổi 10 thẻ bị đổi vị trí. 990 thẻ còn lại — giữ nguyên."*

*"Làm được sao?"*

*"Đó là Virtual DOM."*

---

## 🎯 Hôm nay bạn sẽ học

```
DOM thuần:  Thay đổi → Browser tính lại TOÀN BỘ layout
Virtual DOM: Thay đổi → So sánh → Chỉ cập nhật PHẦN CẦN THAY ĐỔI
```

**Chỉ MỘT khái niệm:** Virtual DOM — bản nháp JavaScript giúp React biết chính xác chỗ nào cần cập nhật.

---

## 📝 Bài 1.1 — DOM thật hoạt động thế nào? (8 phút)

### DOM = Document Object Model

```
HTML:                          DOM Tree:
<html>                         html
  <body>                         ├── body
    <h1>Xin chào</h1>           │   ├── h1 → "Xin chào"
    <p>Nội dung</p>             │   └── p  → "Nội dung"
  </body>                       
</html>
```

### Vấn đề: Cập nhật DOM rất chậm

```javascript
// Mỗi lần thay đổi DOM, browser phải:
// 1. Parse lại HTML
// 2. Tính toán lại layout (reflow)
// 3. Vẽ lại màn hình (repaint)

// Ví dụ: Cập nhật 1000 lần
for (let i = 0; i < 1000; i++) {
    document.getElementById("list").innerHTML += `<li>${i}</li>`;
    // ↑ Mỗi lần += → browser reflow + repaint
    // 1000 lần = 1000 lần "tính lại layout" → CHẬM!
}
```

### Tưởng tượng

```
DOM thật = Bản vẽ kiến trúc ngôi nhà
Cập nhật DOM = Đập tường, xây lại (mất thời gian)
Cập nhật 1000 lần DOM = Đập 1000 lần → nhà sập!
```

---

## 📝 Bài 1.2 — Virtual DOM: Bản nháp bằng JavaScript (10 phút)

### Ý tưởng cốt lõi

```
Thay vì sửa NGAY DOM thật →
Tạo BẢN NHÁP bằng JavaScript object (rất nhanh) →
So sánh bản nháp cũ vs mới →
Chỉ sửa NHỮNG CHỖ THAY ĐỔI trên DOM thật
```

### Virtual DOM là gì?

```javascript
// Virtual DOM = JavaScript object MÔ PHỎNG DOM thật

// DOM thật:
<h1 class="title">Xin chào</h1>
<p>Nội dung</p>

// Virtual DOM (JS object):
{
    type: "div",
    props: { className: "container" },
    children: [
        { type: "h1", props: { className: "title" }, children: ["Xin chào"] },
        { type: "p", props: {}, children: ["Nội dung"] }
    ]
}
```

### Tại sao JavaScript object nhanh hơn DOM?

```
DOM thật:                    Virtual DOM (JS object):
─────────                    ───────────────────────
Browser phải:                JavaScript chỉ cần:
- Parse HTML                 - Tạo object
- Tạo node trong memory      - So sánh object
- Tính layout                - (Rất nhanh!)
- Vẽ pixel
→ CHẬM (milliseconds)       → NHANH (microseconds)
```

---

## 📝 Bài 1.3 — Quy trình 4 bước (10 phút)

### React cập nhật UI trong 4 bước

```
Bước 1: State thay đổi
        Ví dụ: setCount(1)
              ↓
Bước 2: Tạo Virtual DOM MỚI
        React gọi component → nhận về JS object mới
              ↓
Bước 3: SO SÁNH (Diffing)
        Virtual DOM cũ: { type: "h1", children: "Count: 0" }
        Virtual DOM mới: { type: "h1", children: "Count: 1" }
        → Chỉ khác: children "0" → "1"
              ↓
Bước 4: Cập nhật DOM thật (chỉ phần thay đổi)
        document.querySelector("h1").textContent = "Count: 1";
        → Chỉ 1 DOM update, KHÔNG render lại toàn bộ
```

### Code minh họa (đơn giản hóa)

```javascript
// Giả lập quy trình React

// Bước 1: State thay đổi
let state = { count: 0 };

// Bước 2: Tạo Virtual DOM
function render(state) {
    return {
        type: "div",
        children: [
            { type: "h1", text: `Count: ${state.count}` },
            { type: "button", text: "+1" }
        ]
    };
}

const oldVdom = render({ count: 0 });
const newVdom = render({ count: 1 });

// Bước 3: So sánh (Diffing)
function diff(oldNode, newNode) {
    const patches = [];
    if (oldNode.text !== newNode.text) {
        patches.push({ type: "TEXT", newText: newNode.text });
    }
    return patches;
}

const patches = diff(oldVdom.children[0], newVdom.children[0]);
// patches = [{ type: "TEXT", newText: "Count: 1" }]

// Bước 4: Áp dụng patches lên DOM thật
patches.forEach(patch => {
    if (patch.type === "TEXT") {
        document.querySelector("h1").textContent = patch.newText;
        // Chỉ cập nhật 1 thẻ h1, 999 thẻ khác giữ nguyên!
    }
});
```

---

## 📊 So sánh: DOM thuần vs Virtual DOM

```
Thao tác                    DOM thuần              Virtual DOM (React)
────────                    ─────────              ───────────────────
Cập nhật 1 thẻ              Nhanh                  Nhanh (tương đương)
Cập nhật 1000 thẻ           CHẬM (1000 reflow)     NHANH (batch update)
Code phức tạp               Thủ công, dễ sai       Declarative, React lo
Debug                       Khó (theo dõi DOM)      Dễ (state → UI)
Memory                      Ít                      Nhiều hơn (bản nháp)
```

### Khi nào Virtual DOM có lợi?

```
✅ UI phức tạp, nhiều component
✅ State thay đổi frequently
✅ Cần render lists dài (1000+ items)
✅ Cần animation mượt

❌ Trang tĩnh, ít tương tác (dùng HTML thuần tốt hơn)
❌ App cực nhỏ (overhead của Virtual DOM > lợi ích)
```

---

## 💡 Hiểu sai thường gặp

| ❌ Hiểu sai | ✅ Đúng |
|------------|--------|
| Virtual DOM nhanh hơn DOM | Virtual DOM nhanh hơn khi có NHIỀU cập nhật |
| Virtual DOM = không bao giờ chạm DOM | Virtual DOM VẪN cập nhật DOM thật, chỉ ít hơn |
| React tạo Virtual DOM mỗi lần render | React tạo Virtual DOM mới, so sánh với cũ |
| Virtual DOM là đặc biệt của React | Vue, Svelte cũng có (cách khác nhau) |

---

## 🧪 Kiểm tra hiểu bài

**Câu 1:** Virtual DOM là gì?
- a) Một thư viện JavaScript
- b) JavaScript object mô tả cấu trúc DOM ✅
- c) Một DOM ảo hoàn toàn riêng biệt

**Câu 2:** Tại sao Virtual DOM nhanh hơn DOM thuần?
- a) Không cần cập nhật DOM
- b) Chỉ cập nhật những chỗ thay đổi ✅
- c) Dùng GPU để render

**Câu 3:** Khi state thay đổi, React làm gì?
- a) Cập nhật DOM ngay lập tức
- b) Tạo Virtual DOM mới, so sánh với cũ, cập nhật DOM thật ✅
- c) Reload toàn bộ trang

---

## 🔗 Kết nối

- **Dùng kiến thức từ Tier 0:** SPA — không reload, JavaScript quản lý UI
- **Sẽ cần trong Tier 2:** JSX — cách viết Virtual DOM bằng cú pháp giống HTML
- **Sẽ cần trong Tier 10:** Lifecycle — khi nào React tạo Virtual DOM mới
- **Tham khảo thêm:** `01_spa_architecture/01_spa_architecture_components_routing.md` (file cũ, phần Virtual DOM)
