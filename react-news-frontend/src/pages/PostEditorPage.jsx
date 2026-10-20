import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../api";
export default function PostEditorPage({ user, edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(edit);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!edit) return;
    let active = true;
    api.get("/posts/" + id).then(r => { if (active) setForm({ title: r.data.data.title, description: r.data.data.description }); }).catch(e => { if (active) setError(e.response?.data?.message || "Không tải được bài viết"); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [edit, id]);
  if (!user) return <Navigate to="/login" replace state={{ from: edit ? "/posts/" + id + "/edit" : "/posts/create" }} />;
  async function submit(e) {
    e.preventDefault(); setError("");
    if (!form.title.trim() || !form.description.trim()) return setError("Vui lòng nhập đủ tiêu đề và mô tả");
    setSaving(true);
    try {
      const r = edit ? await api.put("/posts/" + id, form) : await api.post("/posts", form);
      navigate("/posts/" + (edit ? id : r.data.data.id));
    } catch (e) { setError(e.response?.data?.message || "Không lưu được bài viết"); }
    finally { setSaving(false); }
  }
  return <section className="panel editor"><span className="eyebrow">REST API · {edit ? "PUT" : "POST"}</span><h1>{edit ? "Sửa bài viết" : "Thêm bài viết"}</h1>
    {loading ? <p>Đang tải dữ liệu...</p> : <form onSubmit={submit}><label>Tiêu đề<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/></label><label>Mô tả<textarea required rows="7" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/></label>{error && <p role="alert" className="error">{error}</p>}<div className="actions"><button className="primary" disabled={saving}>{saving ? "Đang lưu..." : edit ? "Cập nhật" : "Lưu bài viết"}</button><Link to="/posts">Hủy</Link></div></form>}
  </section>;
}
