const BASE_URL = "http://localhost:8080/api";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 댓글 목록 (공개)
export async function getComments(bookId) {
  const res = await fetch(`${BASE_URL}/books/${bookId}/comments`);
  if (!res.ok) throw new Error("댓글을 불러오지 못했습니다.");
  return res.json(); // [{ id, content, username, createdAt }]
}

export async function getCommentCount(bookId) {
  const res = await fetch(`${BASE_URL}/comments/count/${bookId}`);
  if (!res.ok) throw new Error("댓글 수를 불러오지 못했습니다.");
  return res.json(); // 숫자
}

// 댓글 작성 (로그인 필요)
export async function addComment(bookId, content) {
  const res = await fetch(`${BASE_URL}/books/${bookId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 등록에 실패했습니다. (로그인 확인)");
  return res.json();
}

// 댓글 삭제 (작성자 본인만)
export async function deleteComment(commentId) {
  const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (res.status === 403) throw new Error("본인 댓글만 삭제할 수 있습니다.");
  if (!res.ok) throw new Error("댓글 삭제에 실패했습니다.");
}