# 🟦 PART III - CHƯƠNG 16 & 17
# **ADVANCED DATA & INTERNATIONALIZATION**

## 🎬 "REST Trả Về 50 Fields, Em Chỉ Cần 3" — GraphQL & i18n

*Minh fetch `/api/users` — nhận được 50 fields, chỉ dùng `name`, `avatar`, `email`. Bandwidth phí 90%. Anh Hùng: "GraphQL — em HỎI chính xác cần gì, server TRẢ đúng cái đó. Còn i18n? Khi app phục vụ 10 quốc gia, hardcode 'Đăng nhập' = chết."*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu **GraphQL** khác REST API chỗ nào.
- Dùng **Apollo Client** để truy vấn dữ liệu.
- Làm web đa ngôn ngữ (Anh/Việt) với **react-i18next**.

---

# 1. **GRAPHQL & APOLLO CLIENT**

## 1.1. GraphQL là gì?
REST API trả về một cục dữ liệu cố định (thừa hoặc thiếu). GraphQL cho phép Frontend **yêu cầu chính xác** những gì mình cần.

**Ví dụ:** Bạn chỉ cần tên user, không cần địa chỉ, email.
```graphql
query {
  user(id: 1) {
    name
  }
}
```

## 1.2. Apollo Client
Thư viện giúp React nói chuyện với GraphQL Server.

```jsx
import { useQuery, gql } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function Dogs() {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.dogs.map(({ id, breed }) => (
    <div key={id}>
      <p>{breed}</p>
    </div>
  ));
}
```

---

# 2. **INTERNATIONALIZATION (ĐA NGÔN NGỮ)**

Dùng thư viện **react-i18next**.

## 2.1. Cấu hình
```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to React"
    }
  },
  vi: {
    translation: {
      "Welcome": "Chào mừng đến với React"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi", // Ngôn ngữ mặc định
  interpolation: { escapeValue: false }
});
```

## 2.2. Sử dụng
```jsx
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h1>{t('Welcome')}</h1>
      
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('vi')}>Tiếng Việt</button>
    </>
  );
}
```

---

# 3. **TỔNG KẾT**

- **GraphQL** giúp tối ưu băng thông, chỉ lấy dữ liệu cần thiết.
- **i18n** là bắt buộc nếu làm sản phẩm Global.

---

**Chương tiếp theo:** Đưa React lên Server để tối ưu SEO (Next.js).
