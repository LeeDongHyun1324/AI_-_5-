function Navbar({ onNavigate }) {

  const isLogin = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <h1 className="header">도서관리</h1>

      <div className="nav-menu">
        <button className="home" onClick={() => onNavigate('home')}>홈</button>

        <button className="list-header" onClick={() => onNavigate('list')}>
          도서 목록
        </button>

      {isLogin&& (
        <button className="addBook" onClick={() => onNavigate('create')}>
          새 도서 등록
        </button>
      )}

        <button className="login-btn" onClick={() => onNavigate('login')}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;