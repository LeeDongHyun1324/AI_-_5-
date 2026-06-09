function HomePage({ onNavigate }) {
  return (
    <div className="home-container">
      <h1 className="main-title">
        도서 관리 시스템에 오신 것을 환영합니다!
      </h1>

      <p className="sub-title">
        이 시스템을 사용하여 도서를 등록하고 관리할 수 있습니다.
      </p>

      <button className="btn-list" onClick={() => onNavigate('list')}>
        도서 목록 보기
      </button>
    </div>
  );
}

export default HomePage;