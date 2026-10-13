# React Labs - LR1, LR2, LR3

Ba bài ReactJS trong một project Vite, tách biệt với website Express.js hiện có ở thư mục gốc.

## Chạy ứng dụng

```bash
cd sit
npm install
npm run dev
```

Mở địa chỉ Vite thông báo, thường là http://localhost:5173/.

## Chọn bài và phần cần chụp

- LR1: `?lab=lr1&part=a`, `b`, `c`, `d`, `e`
- LR2: `?lab=lr2&part=a`, `b`, `c`, `d`, `e`
- LR3: `?lab=lr3&part=a`, `c`, `d`, `e` (tài liệu không có phần B)

Có thể bấm thanh chọn bài/phần trên giao diện để chuyển qua lại. Mặc định mở kết quả LR3 phần E.

## Nội dung

- **LR1:** Tạo React project với Vite, cấu trúc thư mục, `App.jsx`, Fragment/JSX, JavaScript trong JSX, CSS.
- **LR2:** Function Component `Header`, `Footer`, `NewsItem`, `NewsList`; import/export, tái sử dụng, component lồng nhau.
- **LR3:** Truyền `title`, `description`, `views` kiểu Number, đọc `props.title` rồi dùng destructuring Props; CSS card tin tức.

Các ví dụ LR3 dùng NodeJS (120 lượt xem), React (85 lượt xem), Express (60 lượt xem) như đề.

**Lưu ý:** Các phần A/C/D/E trong đề LR3 là những trạng thái chỉnh sửa nối tiếp của cùng file. Project này dùng `NewsItemBasic.jsx` để giữ ví dụ `props.title` phần A/C và `NewsItem.jsx` dùng destructuring ở D/E, giúp chuyển qua lại để chụp ảnh mà không cần sửa code thủ công.

## Kiểm tra build

```bash
cd sit
npm run build
npm run preview
```

Chạy website Express.js gốc riêng tại thư mục root bằng `npm start`.
