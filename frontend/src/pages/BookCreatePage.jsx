//창버전
 
import BookForm from "../components/BookForm";
import { createBook } from "../api/books";
 
function BookCreatePage({ onNavigate }) {
  const handleCreate = async (bookData) => {
      // 제목 검사
      if (!bookData.title.trim()) {
        alert("도서 제목을 입력해주세요.");
        return;
      }
 
      // 저자 검사
      if (!bookData.author.trim()) {
        alert("저자를 입력해주세요.");
        return;
      }
 
      // 내용 검사
      if (!bookData.content.trim()) {
        alert("도서 내용을 입력해주세요.");
        return;
      }
     
      try {
        const newBook = {
          ...bookData,
          coverImageUrl: "",
          createdAt: new Date().toLocaleString("sv-SE", {
            timeZone: "Asia/Seoul",
          }),
          updatedAt: new Date().toLocaleString("sv-SE", {
            timeZone: "Asia/Seoul",
          }),
        };
 
        await createBook(newBook);
 
        alert("도서가 등록되었습니다.");
 
        onNavigate("list");
      } catch (err) {
        alert(err.message);
      }
    };
 
  const handleCancel = () => {
    onNavigate("list");
  };
 
  return (
    <BookForm
      onSubmit={handleCreate}
      onCancel={handleCancel}
      submitText="저장"
    />
  );
}
 
export default BookCreatePage;