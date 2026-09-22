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

## Chạy

```bash
npm install
npm start
```

Server mặc định:

```text
http://localhost:3000
```
