# 🟩 CHƯƠNG 10
# **INHERITANCE AND CASCADING**

CSS là viết tắt của **Cascading** Style Sheets. Nếu không hiểu "Cascading" (Xếp chồng/Thác đổ), bạn sẽ luôn gặp tình trạng: *"Tại sao mình sửa code mà nó không chạy???"*.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu cơ chế **Inheritance** (Kế thừa) - cái gì cha truyền con nối.
- Nắm vững quy tắc **Specificity** (Độ ưu tiên) - ai mạnh hơn người đó thắng.
- Hiểu **Cascade Algorithm** - cách trình duyệt quyết định style cuối cùng.

---

# 1. **THE PRINCIPLE OF INHERITANCE (TÍNH KẾ THỪA)**

## 1.1. Kế thừa là gì?
Một số thuộc tính CSS được gán cho thẻ cha sẽ tự động truyền xuống thẻ con.

**Ví dụ:** Bạn set font chữ cho `<body>`, tất cả bài viết bên trong đều dùng font đó.

```css
body {
  font-family: Arial, sans-serif;
  color: #333;
}
```
-> Các thẻ `p`, `h1`, `div` bên trong body đều sẽ có màu chữ #333 và font Arial.

## 1.2. Cái gì được kế thừa?
- **Inherited (Kế thừa):** Liên quan đến văn bản (`color`, `font-family`, `font-size`, `line-height`, `text-align`).
- **Non-inherited (Không kế thừa):** Liên quan đến hộp (`width`, `height`, `margin`, `padding`, `border`). *Tưởng tượng: Cha mặc áo viền đỏ, con không tự nhiên cũng có viền đỏ được.*

## 1.3. Bắt buộc kế thừa (`inherit`)
Bạn có thể ép một thuộc tính phải lấy giá trị từ cha.

```css
button {
  font-family: inherit; /* Nút bấm thường không kế thừa font, phải ép */
}
```

---

# 2. **UNDERSTANDING THE CONTROL SYSTEM FOR CASCADING**

Khi một phần tử có nhiều rules CSS mâu thuẫn nhau (ví dụ: vừa được bảo màu đỏ, vừa được bảo màu xanh), trình duyệt nghe ai? Nó dựa trên hệ thống tính điểm **Specificity**.

## 2.1. Thang điểm Specificity (Độ ưu tiên)

Hãy tưởng tượng một cuộc thi sức mạnh:

1.  **Inline Style** (`style="..."`): **1000 điểm** (Quyền lực tối cao, khó ghi đè).
2.  **ID Selector** (`#header`): **100 điểm**.
3.  **Class/Pseudo-class** (`.btn`, `:hover`): **10 điểm**.
4.  **Element Selector** (`div`, `p`): **1 điểm**.
5.  **Universal** (`*`): **0 điểm**.

**Ví dụ:**

```css
/* Rule A: 1 điểm (Element) */
p { 
  color: blue; 
}

/* Rule B: 10 điểm (Class) -> THẮNG */
.text-red { 
  color: red; 
}

/* Rule C: 100 điểm (ID) -> THẮNG TUYỆT ĐỐI */
#demo { 
  color: green; 
}
```

Nếu một thẻ `<p id="demo" class="text-red">` tồn tại, nó sẽ có màu **Green**.

## 2.2. Quy tắc ghi đè (The Cascade)

Thứ tự ưu tiên từ cao xuống thấp:

1.  **Importance:** Có dính `!important` không? (Nếu có là trùm, nhưng **hạn chế dùng** vì phá vỡ cấu trúc).
2.  **Specificity:** Điểm ai cao hơn người đó thắng.
3.  **Source Order:** Nếu điểm bằng nhau, **câu nào viết sau** (nằm dưới cùng file CSS) sẽ thắng.

**Ví dụ Source Order:**
```css
.btn { color: red; }
.btn { color: blue; } /* Viết sau -> Thắng -> Nút màu xanh */
```

---

# 3. **TỔNG KẾT**

- Các thuộc tính văn bản (`font`, `color`) thường được **kế thừa**. Hộp (`border`, `margin`) thì không.
- **ID** mạnh hơn **Class**. **Class** mạnh hơn **Tag**.
- Nếu bằng điểm, **Viết sau** thắng **Viết trước**.
- Đừng lạm dụng `!important` và `Inline Style`.

---

**Chương tiếp theo:** Hiểu về bản chất hình hộp của mọi phần tử HTML (Box Model).
