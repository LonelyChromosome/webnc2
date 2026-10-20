import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
export default function PostListPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  async function loadPosts() {
    setLoading(true); setError("");
    try { const response = await api.get("/posts"); setPosts(response.data.data || []); }
    catch { setError("Không tải được bài viết. Hãy kiểm tra backend tại localhost:3000."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadPosts(); }, []);
  async function removePost(id) {
    if (!user) return alert("Bạn cần đăng nhập để xóa bài viết");
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try { await api.delete("/posts/" + id); setPosts(previous => previous.filter(item => item.id !== id)); }
    catch (e) { alert(e.response?.data?.message || "Không thể xóa bài viết"); }
  }
  return <section className="panel"><div className="heading"><div><span className="eyebrow">REST API · GET /api/posts</span><h1>Danh sách bài viết</h1></div>{user && <Link className="primary" to="/posts/create">+ Thêm bài viết</Link>}</div>
    {loading ? <p>Đang tải dữ liệu...</p> : error ? <p role="alert" className="error">{error} <button onClick={loadPosts}>Thử lại</button></p> : posts.length === 0 ? <p>Chưa có bài viết nào.</p> : <div className="post-grid">{posts.map(post => <article className="post-card" key={post.id}><div className="eyebrow">BÀI VIẾT #{post.id}</div><h2>{post.title}</h2><p>{post.description}</p><div className="actions"><Link to={"/posts/" + post.id}>Chi tiết →</Link>{user && <><Link to={"/posts/" + post.id + "/edit"}>Sửa</Link><button onClick={() => removePost(post.id)}>Xóa</button></>}</div></article>)}</div>}
  </section>;
}
