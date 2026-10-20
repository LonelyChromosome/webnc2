import { NavLink } from "react-router-dom";

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1>Website Tin tức</h1>
      <nav>
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/posts">Bài viết</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
        {user && <NavLink to="/posts/create">Thêm bài viết</NavLink>}
        {!user && <NavLink to="/login">Đăng nhập</NavLink>}
        {user && (
          <>
            <span>Xin chào {user.username}</span>
            <button onClick={onLogout}>Đăng xuất</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
