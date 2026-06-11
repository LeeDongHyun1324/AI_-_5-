import { useEffect, useState } from "react";
import { deleteBook } from '../api/books';
import { getBookById } from "../api/books";
import { getComments, addComment, deleteComment } from "../api/comments";

import "./BookDetailPage.css";

function BookDetailPage({ onNavigate, bookId, onEditClick }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLogin = !!localStorage.getItem("token");
  const myName = localStorage.getItem("username");   // 내 댓글 구분용
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  //도서 상세 조회
  useEffect(() => {
    async function fetchBook() {
      try {
        const data = await getBookById(bookId);
        // const response = await fetch(`http://localhost:3000/books/${bookId}`); //현재 db.json파일 1개만 추가해놓은 상태로 하드코딩. 배포 시 http://localhost:3000/books/${id}로 변경
        // const data = await response.json();
        setBook(data);
        setComments(await getComments(bookId)); // ← 이 줄만 추가!
      } catch (error) {
        console.error("도서 상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [bookId]);

  if (loading) return <p>도서 정보를 불러오는 중입니다...</p>;
  if (!book) return <p>도서 정보를 찾을 수 없습니다.</p>;

  // 삭제 함수
  async function handleDelete(id) {
      if (!window.confirm('정말 삭제하시겠습니까?')) return;
      try {
        await deleteBook(id);
        onNavigate("list") // 삭제 시 바로 목록으로 이동
      } catch (err) {
        alert(err.message);
      }
  }

  function handleLike() {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }

    setLiked((prev) => !prev);
  }

  // ===== 댓글 등록 =====
  async function handleAddComment() {
    if (!isLogin) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    if (commentInput.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }
    try {
      await addComment(bookId, commentInput.trim());
      setComments(await getComments(bookId)); // 다시 불러오기
      setCommentInput("");
    } catch (e) {
      alert(e.message);
    }
  }

  // ===== 댓글 삭제 =====
  async function handleDeleteComment(commentId) {
    if (!window.confirm("댓글을 삭제할까요?")) return;
    try {
      await deleteComment(commentId);
      setComments(await getComments(bookId));
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <main className="detail-page">
      {/* 도서 제목 */}
      <h2 className="book-title">{book.title}</h2>

      {/* 수정/삭제 버튼 */}
      <button
        className="btn-edit"
        onClick={() => {

          // if (!isLogin) {
          //   alert("로그인 후 이용 가능합니다.");
          //   return;
          // }
          onEditClick(book);
        }}
      >
        수정
      </button>

      <button
        className="btn-delete"
        onClick={() => {
          if (!isLogin) {
            alert("로그인 후 이용 가능합니다.");
            return;
          }
          handleDelete(book.id);
        }}
      >
        삭제
      </button>

      <hr />

      {/* 표지 이미지 */}
      {book.coverImageUrl ? (
        <img
          className="book-cover"
          src={book.coverImageUrl}
          alt={`${book.title} 표지`}
        />
      ) : (
        <p className="book-cover-empty">표지 이미지 없음</p>
      )}

      {/* 도서 상세 정보 */}
      <h3>책 내용</h3>
      <p className="book-content">{book.content}</p>

      <p className="createdAt">생성일: {book.createdAt}</p>
      <p className="updatedAt">수정일: {book.updatedAt}</p>

      {/* 좋아요 */}
      <div className="like-section">
        <button className="like-btn" onClick={handleLike}>
          {liked ? "❤️" : "🤍"} 좋아요
        </button>
        <span>{likeCount}개</span>
      </div>

      {/* 댓글 */}
      <div className="comment-section">
        <h3>댓글</h3>

        <div className="comment-input-box">
          <input
            type="text"
            placeholder={isLogin ? "댓글을 입력하세요" : "로그인 후 작성 가능합니다"}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={handleAddComment}>등록</button>
        </div>

        <ul className="comment-list">
          {comments.map((comment) => (
              <li key={comment.id}>
                  <b>{comment.username}</b> : {comment.content}
                   {myName === comment.username && (
                       <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                   )}
               </li>
              ))}
          </ul>
         </div>
      
      {/* 목록으로 돌아가기 버튼 */}
      <button className="detail-back-btn" onClick={() => onNavigate("list")}>도서 목록으로 돌아가기</button>
    </main>
  );
}


export default BookDetailPage;
