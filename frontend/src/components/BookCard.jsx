export default function BookCard({ book, onDelete, onEdit }) {

  const isLogin = !!localStorage.getItem("token");

  return (
    <div className="book-card">
      {book.coverImageUrl ? (
        <img className="card-cover" src={book.coverImageUrl} alt={book.title} />
      ) : (
        <div className="card-cover card-cover--empty">표지 없음</div>
      )}
      <div className="card-info">
        <h2 className="card-title">{book.title}</h2>
        <p className="card-author">{book.author}</p>
        <p className="card-content">{book.content}</p>
      </div>
      <div className="card-buttons">
        <button
          className="btn-edit"
          onClick={(e) => {
            e.stopPropagation();

            if (!isLogin) {
              alert("로그인 후 이용 가능합니다.");
              return;
            }

            onEdit(book);
          }}
        >
          수정
        </button>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();

            if (!isLogin) {
              alert("로그인 후 이용 가능합니다.");
              return;
            }

            onDelete(book.id);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
} 
