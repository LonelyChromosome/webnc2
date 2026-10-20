import { Link } from "react-router-dom";
function HomePage() {
  return <div><h2>Trang chủ</h2><p>Website Tin tức - React kết nối Express REST API.</p><Link to="/posts">Xem danh sách bài viết</Link></div>;
}
export default HomePage;
