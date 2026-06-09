//창버전
 
 
import { useState } from "react";
 
function BookForm({
  initialTitle = "",
  initialContent = "",
  initialAuthor = "",
  onSubmit,
  onCancel,
  submitText = "저장",
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [author, setAuthor] = useState(initialAuthor);
 
  const handleSubmit = () => {
    const bookData = {
      title,
      author,
      content,
    };
 
    onSubmit(bookData);
  };
 
  const handleCancel = () => {
    setTitle(initialTitle);
    setContent(initialContent);
    setAuthor(initialAuthor);
   
    if (onCancel) {
      onCancel();
    }
  };
 
  return (
    <div className="modal-overlay">
      <div className="form-box">
        <h1 className="page-title">새 도서 등록</h1>
 
        <input
          type="text"
          className="input-title"
          placeholder="도서 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <input
          type="text"
          className="input-author"
          placeholder="저자를 입력하세요"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
 
        <textarea
          className="input-content"
          placeholder="도서의 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
 
        <div className="button-group">
          <button className="btn-cancel" onClick={handleCancel}>
            취소
          </button>
 
          <button className="btn-submit" onClick={handleSubmit}>
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default BookForm;