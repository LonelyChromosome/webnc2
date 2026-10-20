import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
export default function PostDetailPage({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; setLoading(true); setError(""); api.get("/posts/" + id).then(r => { if (active) setPost(r.data.data); }).catch(e => { if (active) setError(e.response?.data?.message || "Không tải được bài viết"); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [id]);
  if (loading) return <section className="panel">Đang tải dữ liệu...</section>;
  if (error) return <section className="panel"><p role="alert" className="error">{error}</p><Link to="/posts">Quay lại danh sách</Link></section>;
  return <article className="panel detail"><span className="eyebrow">BÀI VIẾT #{post.id}</span><h1>{post.title}</h1><p>{post.description}</p><div className="actions"><Link to="/posts">← Danh sách</Link>{user && <Link to={"/posts/" + id + "/edit"}>Sửa bài viết</Link>}</div></article>;
}
