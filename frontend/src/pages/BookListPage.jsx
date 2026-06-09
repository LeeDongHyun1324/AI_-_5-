import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/books';
import BookCard from '../components/BookCard';

export default function BookListPage({onNavigate, onEditClick, setSelectedBookId}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p className="status-message">불러오는 중...</p>;
  if (error) return <p className="status-message status-message--error">{error}</p>;

  return (
    <div className="book-list-page">
      <div className="book-list-header">
        <div className="header-actions">
        
          {/* 검색창 추가 */}
          <input
            type="text"
            placeholder="도서 제목, 저자, 내용 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />

          <button
            className="btn-primary"
            onClick={() => onNavigate('create')}
          >
            + 도서 등록
          </button>
        </div>
      </div>

      {books.length === 0 ? (
        <p className="status-message">등록된 도서가 없습니다.</p>
      ) : (
        <ul className="book-list">
          {books.filter((book) => {
              const search = keyword.toLowerCase();

              return (
                book.title.toLowerCase().includes(search) ||
                book.author.toLowerCase().includes(search) ||
                book.content.toLowerCase().includes(search)
              );
            }).map((book) => (
            <li key={book.id} onClick={() => {
                setSelectedBookId(book.id);
                onNavigate("detail");
              }}
              >
              <BookCard book={book} onDelete={handleDelete} onEdit={onEditClick}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}