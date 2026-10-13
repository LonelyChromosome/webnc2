# webnc2

Bản viết lại của WEBNC bằng Express.js.

Database là file riêng trong project:

```text
backend/data/db.json
```

Không cần MySQL Server, không cần port 3306.

## Chức năng

- Trang chủ: `/`, `/intro`
- Liên hệ: `/contact`, `/about`
- Danh sách/chi tiết tin: `/news`, `/news/:id`
- Tìm kiếm: `/search`
- Thêm bài: `GET/POST /create`
- Sửa bài: `GET/POST /edit`
- Xóa bài: `GET /delete?id=...`
- API JSON: `/api/news`

Toàn bộ thêm/sửa/xóa/tìm kiếm đều đọc và ghi trực tiếp vào `backend/data/db.json`.

## Chạy website Express.js

```bash
npm install
npm start
```

Server mặc định: http://localhost:3000

## React Labs (LR1, LR2, LR3)

Ba bài ReactJS theo tài liệu thực hành được đặt trong project Vite `sit/`, không thay đổi các chức năng Express.js cũ.

```bash
cd sit
npm install
npm run dev
```

Vite mặc định chạy ở http://localhost:5173. Trên giao diện có nút chuyển LR1, LR2, LR3 và các phần của từng bài để chụp kết quả. Xem [hướng dẫn React Labs](sit/README.md).
