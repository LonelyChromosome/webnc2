import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  async function login(e) {
    e.preventDefault(); setPending(true); setError("");
    try {
      const result = await api.post("/auth/login", { username, password });
      if (result.data.success) { onLogin(result.data.user); navigate(location.state?.from || "/posts", { replace: true }); }
      else setError(result.data.message || "Lỗi đăng nhập");
    } catch (e) { setError(e.response?.data?.message || "Không kết nối được máy chủ"); }
    finally { setPending(false); }
  }
  return <section className="panel editor"><span className="eyebrow">SESSION + COOKIE</span><h1>Đăng nhập</h1><p>Dùng tài khoản đã tạo trong website Express tại <a href="http://localhost:3000/users/create" target="_blank" rel="noreferrer">Tạo tài khoản</a>.</p><form onSubmit={login}><label>Tên đăng nhập<input required autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}/></label><label>Mật khẩu<input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/></label>{error && <p role="alert" className="error">{error}</p>}<button className="primary" disabled={pending}>{pending ? "Đang đăng nhập..." : "Đăng nhập"}</button></form></section>;
}
