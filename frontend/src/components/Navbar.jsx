function Navbar({ onNavigate, isLogin, setIsLogin }) {

  const username = localStorage.getItem("username");

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      setIsLogin(false);

      alert("로그아웃 되었습니다.");

      onNavigate("home");
  };

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

      {!isLogin ? (
                <button
                  className="login-btn"
                  onClick={() => onNavigate("login")}
                >
                  Login
                </button>
              ) : (
                <>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {username}님 환영합니다!
                  </span>

                  <button
                    className="login-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
  );
}

export default Navbar;