# 🟩 CHƯƠNG 10
# **INHERITANCE & CASCADING**

## 🎬 "Tại Sao Font Chữ Tự Thay Đổi?" — Bí ẩn CSS

*Minh đặt `font-family: 'Inter'` cho `body`. Mọi text trên trang đều đổi font — kể cả `<h1>`, `<p>`, `<li>` — dù anh không style từng thẻ.*

*"Ma thuật à?" Minh hỏi.*

*"Không — đó là Inheritance (Kế thừa)," anh Hùng trả lời. "Con thừa hưởng style từ cha. Body là tổ tiên → tất cả thẻ bên trong đều kế thừa font."*

---

## 🎯 Mục tiêu
- Hiểu Inheritance — properties nào kế thừa, nào không
- Hiểu Cascade — khi có xung đột, rule nào thắng
- Debug CSS nhanh bằng DevTools

---

## 🧬 Inheritance — "Con thừa hưởng từ cha"

### Properties ĐƯỢC kế thừa (Text-related):
```css
body {
    font-family: 'Inter', sans-serif;  /* ✅ Con kế thừa */
    color: #1e293b;                    /* ✅ Con kế thừa */
    line-height: 1.6;                  /* ✅ Con kế thừa */
    font-size: 16px;                   /* ✅ Con kế thừa */
}
/* → Tất cả <p>, <h1>, <span>, <li> bên trong body đều nhận font và color */
```

### Properties KHÔNG kế thừa (Box-related):
```css
.container {
    border: 1px solid red;    /* ❌ Con KHÔNG kế thừa */
    padding: 20px;            /* ❌ Con KHÔNG kế thừa */
    margin: 10px;             /* ❌ Con KHÔNG kế thừa */
    background: #fff;         /* ❌ Con KHÔNG kế thừa */
}
/* → Con phải tự đặt border, padding, margin */
```

> 💡 **Quy tắc nhớ nhanh:** Text-related → kế thừa. Box-related → không kế thừa. Hợp lý! Bạn muốn tất cả text cùng font, nhưng KHÔNG muốn tất cả box cùng border.

### Force inheritance:
```css
.child {
    border: inherit;     /* Ép kế thừa */
    padding: initial;    /* Reset về mặc định */
}
```

---

## 🌊 Cascade — "Thác nước" ưu tiên

Khi nhiều rule nhắm cùng element, thứ tự ưu tiên:

```
1. !important              ← Cao nhất (TRÁNH DÙNG!)
2. Inline styles           ← style="..."
3. ID selectors            ← #header
4. Class/Pseudo selectors  ← .btn, :hover
5. Type selectors          ← h1, p
6. Source order             ← Rule sau ghi đè rule trước
```

### Ví dụ thực tế:

```css
p { color: blue; }              /* Type: 1 */
.intro { color: green; }        /* Class: 10 — THẮNG vì specificity cao hơn */

/* Nếu cùng specificity → rule SAU thắng */
.btn { color: red; }
.btn { color: green; }          /* ← Rule sau THẮNG → green */
```

---

## 🔧 Debug CSS bằng DevTools

1. **F12** → Tab **Elements** → Click element
2. Panel **Styles** bên phải: Thấy TẤT CẢ rules áp dụng
3. Rules bị ~~gạch ngang~~ = bị override
4. Tìm rule nào override → sửa selector hoặc tăng specificity

> *Minh dùng DevTools lần đầu: "Ồ, CSS debug dễ hơn mình tưởng! Thấy ngay rule nào thắng, rule nào thua."*

---

## ➡️ Chương tiếp theo...

*Minh hiểu cascade rồi. Nhưng khi thêm padding cho `.card`, card bị phình to hơn mong đợi.*

*"Đó là Box Model!" anh Hùng nói. "Content + Padding + Border + Margin = kích thước thực. Không hiểu Box Model = layout LUÔN sai."*

**Chương tiếp theo:** CSS Box Model — Bài học quan trọng nhất trong CSS.
