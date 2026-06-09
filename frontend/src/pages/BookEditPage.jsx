import { useState } from 'react'
import { updateBook } from '../api/books';

function BookEditPage({ book, onCancel, onSuccess }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [content, setContent] = useState(book.content);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateBook(book.id, { title, author, content});
      alert('성공적으로 수정되었습니다.');
      onSuccess();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="edit-container">
      <h1 className="page-title">도서 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="input-title"
            placeholder="수정할 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            className="input-author"
            placeholder="수정할 저자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="input-group">
          <textarea
            className="input-content"
            placeholder="수정할 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
          </textarea>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-submit">저장</button>
          <button type="button" className="btn-cancel" onClick={onCancel}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default BookEditPage;