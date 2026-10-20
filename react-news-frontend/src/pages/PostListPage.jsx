import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import api from "../api";
function PostListPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/posts");
      setPosts(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Lỗi tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { loadPosts(); }, []);
  function removePost(id) {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  }
  if (loading) return <h3>Đang tải dữ liệu...</h3>;
  if (error) return <h3>{error}</h3>;
  return <div><h2>Danh sách bài viết</h2><PostList posts={posts} user={user} onDeleted={removePost} /></div>;
}
export default PostListPage;
