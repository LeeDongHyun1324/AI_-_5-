function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <h1 className="header">도서관리</h1>

      <div className="nav-menu">
        <button className="home" onClick={() => onNavigate('home')}>홈</button>

        <button className="list-header" onClick={() => onNavigate('list')}>
          도서 목록
        </button>

        <button className="addBook" onClick={() => onNavigate('create')}>
          새 도서 등록
        </button>
      </div>
    </nav>
  );
}

export default Navbar;