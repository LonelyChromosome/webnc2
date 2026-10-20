import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import api from "./api";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostEditorPage from "./pages/PostEditorPage";
import LoginPage from "./pages/LoginPage";

function Header({ user, logout }) {
  return <header className="site-header"><div className="header-inner"><NavLink className="brand" to="/">WEBNC2 <small>React × Express</small></NavLink><nav>
    <NavLink to="/">Trang chủ</NavLink><NavLink to="/posts">Bài viết</NavLink><NavLink to="/contact">Liên hệ</NavLink>
    {user ? <><NavLink to="/posts/create">Thêm bài</NavLink><span className="user">Xin chào {user.username}</span><button onClick={logout}>Đăng xuất</button></> : <NavLink to="/login">Đăng nhập</NavLink>}
  </nav></div></header>;
}
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => { let active = true; api.get("/auth/me").then(r => { if (active) setUser(r.data.user); }).catch(() => {}).finally(() => { if (active) setChecking(false); }); return () => { active = false; }; }, []);
  async function logout() { try { await api.post("/auth/logout"); setUser(null); } catch { alert("Không thể đăng xuất"); } }
  return <><Header user={user} logout={logout}/><main className="container">
    <Routes>
      <Route path="/" element={<section className="hero"><span className="eyebrow">LAB RN · REACT + REST API</span><h1>Website Tin tức</h1><p>Danh sách, chi tiết và quản lý bài viết lấy trực tiếp từ Express REST API, có đăng nhập Session.</p><NavLink className="primary" to="/posts">Xem bài viết →</NavLink></section>} />
      <Route path="/posts" element={<PostListPage user={user}/>} />
      <Route path="/posts/create" element={<PostEditorPage user={user}/>} />
      <Route path="/posts/:id/edit" element={<PostEditorPage user={user} edit/>} />
      <Route path="/posts/:id" element={<PostDetailPage user={user}/>} />
      <Route path="/login" element={<LoginPage onLogin={setUser}/>} />
      <Route path="/contact" element={<section className="panel"><h1>Liên hệ</h1><p>Trang liên hệ của website tin tức.</p></section>} />
      <Route path="*" element={<section className="panel"><h1>Không tìm thấy trang</h1><NavLink to="/">Về trang chủ</NavLink></section>} />
    </Routes></main><footer>WEBNC2 · LAB 11 + LAB RN {checking ? "· Đang xác minh phiên" : ""}</footer></>;
}
