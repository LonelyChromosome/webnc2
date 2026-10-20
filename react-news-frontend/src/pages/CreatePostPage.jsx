import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import api from "../api";
function CreatePostPage({ user }) {
  const navigate = useNavigate();
  async function handleCreate(postData) {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm bài viết");
      navigate("/login");
      return;
    }
    try {
      const response = await api.post("/posts", postData);
      const result = response.data;
      alert(result.message);
      if (result.success) navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("Lỗi thêm bài viết. Có thể bạn chưa đăng nhập hoặc session đã hết hạn.");
    }
  }
  return <div><h2>Thêm bài viết</h2><PostForm initialPost={null} onSubmit={handleCreate} buttonText="Lưu bài viết" /></div>;
}
export default CreatePostPage;
