import { Link } from "react-router-dom";
import api from "../api";
function PostItem({ post, user, onDeleted }) {
  async function handleDelete() {
    if (!user) { alert("Bạn cần đăng nhập để xóa bài viết"); return; }
    const confirmDelete = confirm("Bạn có chắc muốn xóa bài viết này?");
    if (!confirmDelete) return;
    try {
      const response = await api.delete(`/posts/${post.id}`);
      const result = response.data;
      alert(result.message);
      if (result.success) onDeleted(post.id);
    } catch (err) {
      console.error(err);
      alert("Lỗi xóa bài viết. Có thể bạn chưa đăng nhập hoặc session đã hết hạn.");
    }
  }
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <Link to={`/posts/${post.id}`}>Xem chi tiết</Link>
      {user && <>{" | "}<Link to={`/posts/${post.id}/edit`}>Sửa</Link>{" | "}<button onClick={handleDelete}>Xóa</button></>}
    </div>
  );
}
export default PostItem;
