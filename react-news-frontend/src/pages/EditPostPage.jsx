import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import api from "../api";
function EditPostPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const response = await api.get(`/posts/${id}`);
        setPost(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Lỗi tải bài viết cần sửa");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);
  async function handleUpdate(postData) {
    if (!user) {
      alert("Bạn cần đăng nhập để sửa bài viết");
      navigate("/login");
      return;
    }
    try {
      const response = await api.put(`/posts/${id}`, postData);
      const result = response.data;
      alert(result.message);
      if (result.success) navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật bài viết. Có thể bạn chưa đăng nhập hoặc session đã hết hạn.");
    }
  }
  if (loading) return <h3>Đang tải dữ liệu...</h3>;
  if (error) return <h3>{error}</h3>;
  if (!post) return <div><h2>Không tìm thấy bài viết</h2></div>;
  return <div><h2>Sửa bài viết</h2><PostForm initialPost={post} onSubmit={handleUpdate} buttonText="Cập nhật" /></div>;
}
export default EditPostPage;
