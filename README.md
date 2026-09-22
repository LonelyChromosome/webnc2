# webnc2

Bản viết lại của WEBNC bằng Express.js.

Chức năng và route giữ tương ứng với WEBNC:
- Trang chủ: `/`, `/intro`
- Liên hệ: `/contact`, `/about`
- Danh sách/chi tiết tin: `/news`, `/news/:id`
- Tìm kiếm: `/search`
- Thêm bài: `GET/POST /create`
- Sửa bài: `GET/POST /edit`
- Xóa bài: `GET /delete?id=...`
- API JSON: `/api/news`

Backend dùng Express.js, EJS và MySQL2.

## Chạy

```bash
npm install
npm start
```

Server mặc định:

```text
http://localhost:3000
```

Khởi tạo database bằng file:

```text
database/init.sql
```

Cấu hình MySQL mặc định:
- host: localhost
- user: root
- password: 123456
- database: newsdb

Có thể thay bằng biến môi trường `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
