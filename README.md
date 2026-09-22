# WEBNC2

Project web cơ bản sử dụng Node.js và Express.js.

## Chạy local

Yêu cầu Node.js 18 trở lên.

```bash
git clone https://github.com/LonelyChromosome/webnc2.git
cd webnc2
npm install
npm start
```

Mở:

```text
http://localhost:3000
```

API kiểm tra server:

```text
http://localhost:3000/api/status
```

## Chạy trên GitHub Codespaces

1. Mở repository trên GitHub.
2. Chọn Code > Codespaces > Create codespace on main.
3. Codespaces tự chạy `npm install`.
4. Chạy:

```bash
npm start
```

Port 3000 sẽ được Codespaces tự forward.

> GitHub Pages chỉ host web tĩnh và không chạy được Node.js/Express server. Project này chạy trực tiếp trên local hoặc GitHub Codespaces; nếu muốn public 24/7 thì cần deploy backend lên dịch vụ hỗ trợ Node.js.
