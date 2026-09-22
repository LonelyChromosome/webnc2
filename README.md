# WEBNC2

Project web sử dụng Node.js + Express.js framework.

## Cấu trúc

```text
webnc2/
├── controllers/
│   ├── apiController.js
│   └── homeController.js
├── routes/
│   ├── api.js
│   └── web.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── index.html
│   └── 404.html
├── app.js
├── server.js
└── package.json
```

Express được dùng để:
- Khởi tạo web application.
- Quản lý route.
- Tách controller xử lý request/response.
- Phục vụ file frontend tĩnh.
- Tạo REST API.

## Chạy local

Cần Node.js và npm:

```bash
npm install
npm start
```

Mở:

```text
http://localhost:3000
```

API test:

```text
http://localhost:3000/api/status
```

## Chạy bằng Node trực tiếp

Sau khi dependencies đã được cài một lần:

```bash
node server.js
```

## GitHub

Source có thể lưu và đồng bộ bình thường trên GitHub. GitHub Pages không chạy được Express backend; để chạy online cần môi trường hỗ trợ Node.js hoặc Codespaces.
