import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./api";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    api.get("/auth/me").then((response) => setUser(response.data.user)).catch(() => {});
  }, []);
  async function logout() {
    try {
      const response = await api.post("/auth/logout");
      alert(response.data.message);
      setUser(null);
    } catch (err) {
      console.error(err);
      alert("Lỗi đăng xuất");
    }
  }
  return (
    <>
      <Header user={user} onLogout={logout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage user={user} />} />
          <Route path="/posts/:id" element={<PostDetailPage user={user} />} />
          <Route path="/posts/create" element={<CreatePostPage user={user} />} />
          <Route path="/posts/:id/edit" element={<EditPostPage user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
