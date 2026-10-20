import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        username: username,
        password: password
      });
      const result = response.data;
      alert(result.message);
      if (result.success) {
        onLogin(result.user);
        navigate("/posts");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi đăng nhập");
    }
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập</label><br />
          <input type="text" value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div><br />
        <div>
          <label>Mật khẩu</label><br />
          <input type="password" value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div><br />
        {error && <p role="alert">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default LoginPage;
