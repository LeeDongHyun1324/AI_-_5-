export default function BookCard({ book, onDelete, onEdit }) {
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
        <button className="btn-edit" onClick={(e) => 
            {e.stopPropagation();
            onEdit(book);
            }}
          >
          수정
        </button>
        <button className="btn-delete" onClick={(e) => 
            {e.stopPropagation();
            onDelete(book.id);
            }}>
          삭제
        </button>
      </div>
    </div>
  );
} 
