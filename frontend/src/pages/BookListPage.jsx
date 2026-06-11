import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/books';
import BookCard from '../components/BookCard';

export default function BookListPage({onNavigate, onEditClick, setSelectedBookId}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const isLogin = !!localStorage.getItem("token");

  useEffect(() => {
    const timer = setTimeout(() => {
      getBooks(keyword)
        .then(setBooks)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, keyword ? 300 : 0);

    return () => clearTimeout(timer);
  }, [keyword]);

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
              onClick={() => {
                if (!isLogin) {
                  alert("로그인 후 이용 가능합니다.");
                  return;
                }
                onNavigate("create");
              }}
            >
              + 도서 등록
            </button>
          </div>
        </div>

      {books.length === 0 ? (
        <p className="status-message">등록된 도서가 없습니다.</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
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