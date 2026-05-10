# � React Native — Cross-Platform Mobile Development

> **Tuần 6 · Bài 21** | Thời lượng: 120 phút | Cấp độ: Nâng cao

---

## 🎬 Mở bài — Câu chuyện mở đầu

> *"Minh biết React. Sếp nói: 'Khách hàng muốn app mobile cho iOS lẫn Android. Hai tuần được không?'*
> *Minh nghĩ: học Swift 6 tháng, rồi Kotlin thêm 6 tháng? Không — chỉ cần **React Native**.*
>
> *Giống như có một **người phiên dịch đa ngôn ngữ**: bạn viết tiếng Việt (JavaScript),*
> *người phiên dịch nói thành tiếng Anh (iOS) và tiếng Pháp (Android) cùng lúc.*
> ***Viết một lần — chạy hai nơi.***"
>
> 💡 **React Native = Google Translate cho code:** bạn viết JavaScript, nó dịch thành native UI trên cả iOS và Android.

```
╔══════════════════════════════════════════════════════════════════╗
║              REACT NATIVE — WRITE ONCE, RUN EVERYWHERE           ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                 ║
║   Bạn viết:              React Native dịch thành:               ║
║   JavaScript + React                                             ║
║                                                                 ║
║   ┌──────────┐           ┌──────────────┐  ┌──────────────┐     ║
║   │ <View>   │──────────▶│  UIView      │  │ android.view │     ║
║   │ <Text>   │──────────▶│  UILabel     │  │ TextView     │     ║
║   │ <Image>  │──────────▶│  UIImageView │  │ ImageView    │     ║
║   └──────────┘           └──────────────┘  └──────────────┘     ║
║       1 codebase              iOS                Android         ║
║                                                                 ║
║   📱 Instagram  📱 Discord  📱 Shopify  📱 Facebook              ║
║   → Tất cả dùng React Native!                                  ║
║                                                                 ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 🎯 Tại sao nội dung này quan trọng?

| Lý do | Giải thích |
|:------|:-----------|
| 📱 **Mobile-first thế giới** | 60%+ traffic web đến từ điện thoại |
| 💰 **Tiết kiệm chi phí** | 1 codebase thay vì 2 team iOS + Android |
| ⚡ **Fast Refresh** | Thay code → thấy ngay trên điện thoại thật |
| 🏢 **Industry adoption** | Meta, Microsoft, Shopify, Discord đều dùng |
| 🔧 **Skill transfer** | Biết React → học React Native chỉ 1-2 tuần |
| 🚀 **Hot job market** | Mobile developer luôn trong top ngành lương cao |

> ⚠️ **Thực tế:** React Native không phải "write once, run anywhere" hoàn hảo — nó là **"learn once, write anywhere"**. Platform-specific code vẫn cần khi muốn tối ưu từng nền tảng.

---

## 🌐 Bức tranh tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                  REACT NATIVE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─── JavaScript Layer (Code của bạn) ──────────────────────┐  │
│  │  React Components + Hooks + Logic                         │  │
│  │  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐  │  │
│  │  │  View   │ │  Text   │ │  Image   │ │  FlatList    │  │  │
│  │  └────┬────┘ └────┬────┘ └─────┬────┘ └──────┬───────┘  │  │
│  └───────┼──────────┼──────────┼──────────────┼────────────┘  │
│          │          │          │              │                │
│  ┌───────▼──────────▼──────────▼──────────────▼────────────┐  │
│  │            React Native Bridge (JSI)                     │  │
│  │         Giao tiếp JS ↔ Native threads                    │  │
│  └───────┬──────────────────────────────┬──────────────────┘  │
│          │                              │                     │
│  ┌───────▼──────────┐          ┌────────▼──────────────┐     │
│  │  iOS Native      │          │  Android Native       │     │
│  │  UIKit/SwiftUI   │          │  Views/Kotlin         │     │
│  │  ┌────────────┐  │          │  ┌────────────┐       │     │
│  │  │ 📱 iPhone  │  │          │  │ 📱 Android │       │     │
│  │  └────────────┘  │          │  └────────────┘       │     │
│  └──────────────────┘          └───────────────────────┘     │
│                                                                 │
╚══════════════════════════════════════════════════════════════════╝
```

---

## ⚙️ Sự thật kỹ thuật cốt lõi

### React Web vs React Native — So sánh chi tiết

> 💡 **Não bộ cần remap:** Cùng tư duy component, nhưng thẻ HTML hoàn toàn khác!

| React Web (HTML) | React Native | Tương đương native | Giải thích |
|:-----------------|:-------------|:-------------------|:-----------|
| `<div>` | `<View>` | UIView / android.view | Khối chứa (container) |
| `<p>`, `<span>`, `<h1>` | `<Text>` | UILabel / TextView | ⚠️ **Bắt buộc** bọc mọi text |
| `<img>` | `<Image>` | UIImageView / ImageView | Hiển thị ảnh |
| `<button>` | `<TouchableOpacity>` | UIButton / Button | Có hiệu ứng opacity khi chạm |
| `<input>` | `<TextInput>` | UITextField / EditText | Ô nhập liệu |
| `<ul>` + `<li>` | `<FlatList>` | UITableView / RecyclerView | Danh sách cuộn tối ưu |
| `<div style="...">` | `<View style={...}>` | Layout props | StyleSheet object, không phải CSS |

### StyleSheet vs CSS — Tại sao khác?

```jsx
// ❌ React Web — dùng CSS file hoặc styled-components
.myButton {
  background-color: blue;
  border-radius: 8px;
  font-size: 16px;
}

// ✅ React Native — dùng StyleSheet.create()
const styles = StyleSheet.create({
  myButton: {
    backgroundColor: 'blue',  // camelCase, không phải kebab-case
    borderRadius: 8,          // number, không phải "8px"
    fontSize: 16,             // không cần "px"
  },
});
```

> ⚠️ **Chuyển đổi nhanh:**
> - `background-color` → `backgroundColor` (camelCase)
> - `border-radius: 8px` → `borderRadius: 8` (number thuần, không "px")
> - Không có `float`, không có `grid` → dùng **Flexbox** mặc định

---

## 🟢 Tầng đơn giản hóa — Học qua ví dụ

### Ví dụ 1: Hello World trên điện thoại

```jsx
// App.js — Ứng dụng React Native đầu tiên
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Xin chào từ React Native!</Text>
      <Text style={styles.subtitle}>
        Viết JavaScript — chạy trên iPhone + Android
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Chiếm toàn bộ màn hình
    justifyContent: 'center',   // Căn giữa theo chiều dọc
    alignItems: 'center',       // Căn giữa theo chiều ngang
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});
```

### Ví dụ 2: Component với Props — Card sinh viên

```jsx
// StudentCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StudentCard = ({ name, mssv, avatar }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.mssv}>MSSV: {mssv}</Text>
      </View>
    </View>
  );
};

// ✅ Sử dụng
<StudentCard
  name="Nguyễn Văn Minh"
  mssv="20240001"
  avatar="https://i.pravatar.cc/100"
/>

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',       // Flexbox mặc định!
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',        // Shadow iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,               // Shadow Android
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,           // Tròn!
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  mssv: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
```

> 💡 **Tư duy:** Flexbox trong React Native **mặc định là column** (khác web là row). Ghi nhớ: `flexDirection: 'row'` khi muốn ngang!

---

## 🏭 Tầng thực tế — Triển khai chuyên nghiệp

### Expo — Cách nhanh nhất để bắt đầu

> 🔥 **Expo = Xe tự lái:** bạn chỉ cần nói đi đâu, nó lo phần kỹ thuật phức tạp!

```bash
# Bước 1: Tạo dự án
npx create-expo-app MyFirstApp
cd MyFirstApp

# Bước 2: Chạy server
npx expo start

# Bước 3: Xem trên điện thoại thật
# → Tải app "Expo Go" từ App Store / Google Play
# → Quét QR code → App chạy ngay trên điện thoại!

# Bước 4: Chạy trên simulator (nếu có)
npx expo start --ios       # Cần Xcode (macOS)
npx expo start --android   # Cần Android Studio
```

```
┌─────────────────────────────────────────────────────┐
│              EXPO WORKFLOW                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│   💻 Laptop                  📱 Điện thoại           │
│   ┌──────────┐  QR Code     ┌──────────────┐       │
│   │ npx expo │─────────────▶│  Expo Go     │       │
│   │  start   │  Hot Reload  │  App chạy!   │       │
│   └──────────┘              └──────────────┘       │
│        │                           │                │
│        │    Thay code              │   Thấy ngay    │
│        └──────────────────────────▶│   trên máy!    │
│                                                     │
│   ⚡ Fast Refresh: lưu file → 0.5s → điện thoại    │
│      cập nhật. Không cần build lại!                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Core Components — Bộ công cụ mobile

```jsx
import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, FlatList,
  TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';

// ===== 1. TextInput + State — Ô nhập liệu =====
const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <TextInput
      style={styles.input}
      placeholder="🔍 Tìm kiếm khóa học..."
      placeholderTextColor="#999"
      value={keyword}
      onChangeText={setKeyword}          // onChangeText, không phải onChange!
      onSubmitEditing={() => Alert.alert('Tìm', keyword)}
    />
  );
};

// ===== 2. FlatList — Danh sách tối ưu =====
// 💡 FlatList chỉ render những item đang hiển thị → tiết kiệm RAM
const CourseList = ({ courses }) => {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.courseCard}>
          <Text style={styles.courseName}>{item.name}</Text>
          <Text style={styles.courseTeacher}>GV: {item.teacher}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.empty}>📭 Chưa có khóa học</Text>}
    />
  );
};

// ===== 3. ScrollView — Khi nội dung dài =====
const ProfileScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: 'https://i.pravatar.cc/200' }} style={styles.bigAvatar} />
      <Text style={styles.profileName}>Nguyễn Văn Minh</Text>
      <Text style={styles.bio}>Sinh viên CNTT · Đam mê React Native</Text>
      {/* Thêm nhiều nội dung... ScrollView sẽ tự cuộn */}
    </ScrollView>
  );
};
```

> ⚠️ **FlatList vs ScrollView:**
> - **FlatList:** Dùng cho danh sách dài (100+ item). Chỉ render item đang hiển thị → mượt, tiết kiệm RAM.
> - **ScrollView:** Dùng cho nội dung ngắn, cố định. Render **tất cả** cùng lúc → chậm nếu nhiều item.

### StyleSheet.create — Hệ thống styling

```jsx
const styles = StyleSheet.create({
  // 📐 Flexbox — Layout mặc định
  container: {
    flex: 1,                      // Chiếm hết không gian
    flexDirection: 'column',      // Mặc định (khác web!)
    justifyContent: 'center',     // Trục chính (dọc)
    alignItems: 'center',         // Trục ngang
    padding: 16,
  },

  // 📝 Typography
  title: {
    fontSize: 24,
    fontWeight: 'bold',           // 'normal', 'bold', '100'-'900'
    color: '#1a1a2e',
    letterSpacing: 0.5,
  },

  // 🎨 Colors — dùng string, không phải hex number
  primaryBg: {
    backgroundColor: '#1565C0',
  },

  // 📱 Responsive-ish
  card: {
    width: '90%',                 // Percentage vẫn hoạt động
    maxWidth: 400,                // Giới hạn trên tablet
    borderRadius: 12,
    padding: 16,
  },

  // 🌑 Shadow — khác nhau giữa iOS và Android
  shadow: {
    shadowColor: '#000',          // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,                 // Android (chỉ cần elevation)
  },
});
```

### Platform-Specific Code

```jsx
import { Platform, StyleSheet } from 'react-native';

// Cách 1: Platform.OS
const fontFamily = Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto';

// Cách 2: Platform.select()
const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 4,
      },
    }),
    paddingTop: Platform.OS === 'ios' ? 44 : 0,  // iOS cần extra padding cho notch
  },
});

// Cách 3: File riêng cho từng platform
// Header.ios.js    ← iOS dùng file này
// Header.android.js ← Android dùng file này
// → React Native tự chọn đúng file!
```

### React Navigation — Điều hướng trang

```bash
# Cài đặt
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

```jsx
// App.js — Navigation setup
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>🏠 Trang chủ</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>👤 Hồ sơ</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>⚙️ Cài đặt</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

```
┌──────────────────────────────────────┐
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │      HomeScreen / Profile    │    │
│  │      (Nội dung thay đổi)    │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│  ┌──────┬──────────┬──────────┐      │
│  │ 🏠   │   👤     │   ⚙️    │      │
│  │ Home │ Profile  │ Settings │      │
│  └──────┴──────────┴──────────┘      │
│  ← Bottom Tab Navigation →           │
└──────────────────────────────────────┘
```

### Khi nào dùng React Native vs Flutter vs PWA?

| Tiêu chí | React Native | Flutter | PWA |
|:---------|:-------------|:--------|:----|
| **Ngôn ngữ** | JavaScript (React) | Dart | HTML/CSS/JS |
| **Performance** | Tốt (native bridge) | Rất tốt (Skia render) | Trung bình (WebView) |
| **UI Native** | ✅ Dùng UI gốc | ❌ Tự vẽ UI | ❌ Web UI |
| **Codebase** | 1 codebase → 2 app | 1 codebase → 2 app | 1 code → web + "app" |
| **Học nếu biết** | React → dễ | Dart → học mới | HTML/JS → rất dễ |
| **Nổi tiếng** | Meta, Discord, Shopify | Google Pay, BMW | Twitter, Starbucks |
| **Khi nào dùng** | Đã biết React, cần native | Muốn UI đẹp nhất quán | App đơn giản, không cần native |

> 💡 **Quy tắc chọn:**
> - Team biết React + cần native features (camera, GPS) → **React Native**
> - Cần performance cao + UI tùy biến hoàn toàn → **Flutter**
> - Ứng dụng đơn giản + không muốn cài đặt → **PWA**

---

## ❌ Hiểu lầm thường gặp

| # | Hiểu lầm | Sự thật |
|:-:|:---------|:--------|
| 1 | "React Native tạo ra web app" | ❌ Nó tạo **native app** thật sự, không phải WebView |
| 2 | "Có thể dùng 100% code React Web" | ❌ Không — không có `<div>`, `<p>`, không có CSS file |
| 3 | "StyleSheet giống hệt CSS" | ❌ Không có `float`, không có `grid`, không có `:hover` |
| 4 | "Chỉ cần `npm start` là xong" | ⚠️ Cần Expo Go trên điện thoại HOẶC simulator |
| 5 | "React Native chậm hơn native thuần" | ⚠️ Đúng cho UI phức tạp, nhưng 90% trường hợp đủ nhanh |
| 6 | "FlatList = ScrollView + map" | ❌ FlatList lazy render, ScrollView render tất cả → khác nhau về RAM |
| 7 | "Không cần biết Swift/Kotlin" | ⚠️ Không cần cho basic, nhưng advanced native modules vẫn cần |

---

## ✅ Checkpoint — Kiểm tra hiểu biết

### Câu hỏi nhanh

**Q1:** Trong React Native, thẻ nào thay thế cho `<div>`?
- A) `<container>`  B) `<div>`  C) `<View>`  D) `<Box>`
> **Đáp án:** C) `<View>` — container cơ bản trong React Native

**Q2:** Tại sao mọi text **phải** được bọc trong `<Text>`?
- A) Để đẹp hơn  B) Native platforms yêu cầu text nodes có container riêng
  C) Không bắt buộc  D) Để CSS hoạt động
> **Đáp án:** B — iOS UILabel và Android TextView đều cần text được bọc trong container

**Q3:** StyleSheet.create khác CSS file như thế nào?
- A) Không khác  B) Dùng object, camelCase, number thay vì string
  C) Chỉ dùng cho color  D) Chậm hơn CSS
> **Đáp án:** B — `backgroundColor` (không phải `background-color`), `borderRadius: 8` (không phải `"8px"`)

**Q4:** FlatList khác ScrollView như thế nào?
- A) Không khác  B) FlatList render lazy, ScrollView render tất cả
  C) ScrollView nhanh hơn  D) FlatList không hỗ trợ scroll
> **Đáp án:** B — FlatList chỉ render item đang hiển thị → tiết kiệm RAM cho danh sách dài

**Q5:** Expo Go dùng để làm gì?
- A) Chạy code trên simulator  B) Chạy app trên điện thoại thật mà không cần build
  C) Deploy lên App Store  D) Viết code JavaScript
> **Đáp án:** B — Quét QR → app chạy ngay trên điện thoại, hot reload realtime

### 🛠️ Bài tập thực hành

```jsx
// TODO: Tạo một ứng dụng danh sách công việc (Todo List) với React Native
// Yêu cầu:
// 1. TextInput để nhập công việc mới
// 2. FlatList hiển thị danh sách
// 3. TouchableOpacity để đánh dấu hoàn thành (gạch ngang)
// 4. StyleSheet.create cho styling
// 5. Dùng Platform.OS để font khác nhau iOS/Android

import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, StyleSheet, Platform
} from 'react-native';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTodo(item.id)}>
            <Text style={[styles.todoItem, item.done && styles.done]}>
              {item.done ? '✅' : '⬜'} {item.text}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>🎉 Không có công việc nào!</Text>
        }
      />
    </View>
  );
}

const fontFamily = Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f5f5f5' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, fontFamily },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12,
    fontSize: 16, borderWidth: 1, borderColor: '#ddd', fontFamily,
  },
  addBtn: {
    backgroundColor: '#1565C0', borderRadius: 8, marginLeft: 8,
    width: 48, justifyContent: 'center', alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  todoItem: {
    backgroundColor: '#fff', padding: 16, borderRadius: 8,
    marginBottom: 8, fontSize: 16, fontFamily,
  },
  done: { textDecorationLine: 'line-through', color: '#999' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
});
```

---

## 🐛 Troubleshooting — Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Giải pháp |
|:----|:------------|:----------|
| `Invariant Violation: View config not found` | Dùng nhầm thẻ HTML (`<div>`) | Thay bằng `<View>`, `<Text>` |
| `Text strings must be rendered within <Text>` | Viết text trực tiếp trong `<View>` | Bọc text bằng `<Text>` |
| `Unable to resolve module` | Thiếu package | Chạy `npx expo install <package>` |
| `Style property 'border-radius' is not supported` | Dùng CSS syntax thay vì RN | Đổi thành `borderRadius` (camelCase) |
| `VirtualizedList: missing keys` | FlatList thiếu `keyExtractor` | Thêm `keyExtractor={(item) => item.id}` |
| Expo Go không kết nối | Điện thoại khác mạng WiFi | Đảm bảo cùng mạng, thử `npx expo start --tunnel` |
| `shadow` không hoạt động trên Android | Android dùng `elevation` | Thêm `elevation: 4` alongside shadow props |

---

## 📌 Tổng kết

```
┌───────────────────────────────────────────────────────────────┐
│              REACT NATIVE — TÓM TẮT                           │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  🧠 Tư duy:     Component + Props + State + Hooks            │
│                 (Giống React Web 100%)                        │
│                                                               │
│  🏷️ Thẻ mới:    View, Text, Image, FlatList, TextInput       │
│                 TouchableOpacity, ScrollView                   │
│                                                               │
│  🎨 Styling:    StyleSheet.create() + Flexbox                 │
│                 camelCase, number (không "px")                │
│                                                               │
│  📱 Expo:       npx create-expo-app → npx expo start          │
│                 Quét QR → chạy trên điện thoại thật           │
│                                                               │
│  🧭 Navigation: @react-navigation/native + bottom-tabs        │
│                                                               │
│  🔧 Platform:   Platform.OS / Platform.select                 │
│                 .ios.js / .android.js file naming             │
│                                                               │
│  📏 Quy tắc:    View = div, Text = p/h1, StyleSheet = CSS    │
│                 FlatList > ScrollView cho danh sách dài        │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

| Khái niệm | Tóm tắt |
|:----------|:--------|
| React Native | Viết JS → render native UI trên iOS + Android |
| `<View>` | Container cơ bản, thay thế `<div>` |
| `<Text>` | Bắt buộc bọc mọi text (không thể viết text trần trong View) |
| `<FlatList>` | Danh sách lazy-render, tiết kiệm RAM |
| `StyleSheet.create()` | Object-based styling, camelCase, number thay vì string |
| Expo | Toolchain zero-config, quét QR chạy trên điện thoại thật |
| React Navigation | Thư viện điều hướng chuẩn (stack, tab, drawer) |
| `Platform.OS` | Detect platform để chạy code khác nhau iOS/Android |

---

## ➡️ Bài tiếp theo — Tổng kết khóa học Frontend & React

> 🚀 *Bạn đã đi từ HTML/CSS tĩnh → JavaScript sống động → React component →*
> *Ecosystem nâng cao (Redux, Next.js, Testing) → Mobile với React Native.*
>
> *Bài tiếp theo sẽ **tổng kết toàn bộ hành trình**, gợi ý dự án thực tế,*
> *và hướng dẫn bước tiếp theo để trở thành Full-stack Developer!*

```
Hành trình của bạn:
HTML/CSS → JavaScript → React → Ecosystem → React Native
   🏗️        🧠          ⚛️       🔧            📱

   ┌─────────────────────────────────────────────┐
   │  "Biết React = Biết 80% React Native"      │
   │  "Learn once, write anywhere" 🚀            │
   └─────────────────────────────────────────────┘
```
