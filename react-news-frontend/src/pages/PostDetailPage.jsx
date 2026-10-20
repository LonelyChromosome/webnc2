import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
function PostDetailPage({ user }) {
  const { id } = useParams();
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
        setError("Lỗi tải chi tiết bài viết");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);
  if (loading) return <h3>Đang tải dữ liệu...</h3>;
  if (error) return <h3>{error}</h3>;
  if (!post) return <div><h2>Không tìm thấy bài viết</h2><Link to="/posts">Quay lại danh sách</Link></div>;
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {user && <Link to={`/posts/${post.id}/edit`}>Sửa bài viết</Link>}
      <br /><Link to="/posts">Quay lại danh sách</Link>
    </div>
  );
}
export default PostDetailPage;
