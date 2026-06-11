import { useEffect, useState } from "react";
import { getCommentCount } from "../api/comments";

export default function BookCard({ book }) {
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getCommentCount(book.id)
        .then(setCommentCount)
        .catch(() => setCommentCount(0));

    fetch(`http://localhost:8080/api/likes/count/${book.id}`)
        .then((res) => res.json())
        .then((data) => setLikeCount(data))
        .catch(() => setLikeCount(0));

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

          <p className="card-meta">
            💬 {commentCount} &nbsp; ❤️ {likeCount}
          </p>
        </div>
      </div>
  );
}