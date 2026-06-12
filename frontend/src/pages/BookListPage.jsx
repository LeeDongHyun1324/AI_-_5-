import { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import BookCard from '../components/BookCard';

export default function BookListPage({onNavigate, setSelectedBookId}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  const executeSearch = (searchKeyword) => {
    setLoading(true);
    getBooks(searchKeyword)
        .then(setBooks)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    executeSearch("");
  }, []);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch(keyword);
    }
  };

  if (loading) return <p className="status-message">불러오는 중...</p>;
  if (error) return <p className="status-message status-message--error">{error}</p>;

  return (
      <div className="book-list-page">
        <div className="book-list-header">
          <div className="header-actions">

            <input
                type="text"
                placeholder="도서 제목, 저자, 내용 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input"
            />

            <button
                className="btn-primary"
                onClick={() => executeSearch(keyword)}
            >
              검색
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
                    <BookCard book={book} />
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}