# 🟦 PART III - CHƯƠNG 21
# **NATIVE APPS WITH REACT NATIVE**

## 🎬 "Code React → Chạy Trên iPhone + Android" — Phép Màu React Native

*Minh biết React. Sếp: "Làm app mobile được không?" Minh học Swift 6 tháng hoặc... dùng React Native 1 tuần. Cùng codebase JavaScript, xuất ra app NATIVE trên cả iOS lẫn Android. Instagram, Discord, Shopify — tất cả dùng React Native.*

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau chương này, bạn sẽ:
- Hiểu sự khác biệt giữa React Web và React Native.
- Biết các component cơ bản (`View`, `Text`).
- Cách chạy dự án trên điện thoại thật (Expo).

---

# 1. **REACT DOM vs REACT NATIVE**

Tư duy giống hệt nhau (Component, Props, State, Hooks). Chỉ khác thẻ HTML.

| React Web (HTML) | React Native | Giải thích |
| :--- | :--- | :--- |
| `<div>` | `<View>` | Khối chứa (Container) |
| `<span>`, `<p>`, `<h1>` | `<Text>` | Bắt buộc dùng thẻ này để bọc chữ |
| `<img>` | `<Image>` | Hiển thị ảnh |
| `<button>` | `<TouchableOpacity>` | Nút bấm có hiệu ứng mờ |
| `<ul>`, `<li>` | `<FlatList>` | Danh sách cuộn mượt mà |

---

# 2. **VÍ DỤ CƠ BẢN**

```jsx
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào Mobile!</Text>
      
      <Image
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={styles.logo}
      />
      
      <Button
        onPress={() => alert('Đã bấm!')}
        title="Bấm tôi đi"
        color="#841584"
      />
    </View>
  );
};

// CSS trong React Native không dùng file rời, dùng StyleSheet object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    width: 50,
    height: 50,
  }
});

export default App;
```

---

# 3. **EXPO (CÁCH DỄ NHẤT ĐỂ BẮT ĐẦU)**

Cài môi trường iOS/Android rất cực (Android Studio, Xcode). **Expo** giúp bạn bỏ qua tất cả.
1. `npx create-expo-app my-app`
2. `npx expo start`
3. Tải app **Expo Go** trên điện thoại -> Quét mã QR -> App chạy luôn trên máy bạn!

---

# 4. **TỔNG KẾT KHÓA HỌC**

Chúc mừng bạn đã hoàn thành trọn bộ giáo trình **Frontend & React Development**!

Hành trình của bạn:
1.  **HTML/CSS:** Xây dựng giao diện tĩnh.
2.  **JavaScript:** Thổi hồn logic vào website.
3.  **React:** Xây dựng ứng dụng hiện đại, cấu trúc component.
4.  **Ecosystem:** TS, Next.js, Redux, React Native.

**Bước tiếp theo:**
- Làm một dự án thực tế (Portfolio, E-commerce).
- Đi phỏng vấn và trở thành Software Engineer!

**Happy Coding!** 🚀
