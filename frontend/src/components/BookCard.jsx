import { useEffect, useState } from "react";
import { getCommentCount } from "../api/comments";

export default function BookCard({ book, onDelete, onEdit }) {
  const [commentCount, setCommentCount] = useState(0);   // ← 이게 빠졌었음

  useEffect(() => {
    getCommentCount(book.id)
      .then(setCommentCount)
      .catch(() => setCommentCount(0));
  }, [book.id]);

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
        <p className="card-meta">💬 {commentCount}</p>
      </div>
    </div>
  );
}
// 좋아요 + 댓글 간단 이모티콘(몇 개인지 보이게)