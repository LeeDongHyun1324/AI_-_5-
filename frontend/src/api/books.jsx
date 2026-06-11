const BASE_URL = 'http://localhost:8080/api';

export async function getBooks(keyword = "") {
  const url = keyword
    ? `${BASE_URL}/books/search/keyword?keyword=${encodeURIComponent(keyword)}`
    : `${BASE_URL}/books`;

  console.log("요청 주소:", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('도서 목록을 불러오지 못했습니다.');
  }

  return res.json();
}

export async function getBookById(id) {
  const res = await fetch(`${BASE_URL}/books/${id}`);

  if (!res.ok) {
    throw new Error('도서를 불러오지 못했습니다.');
  }

  return res.json();
}

export async function createBook(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('도서 등록에 실패했습니다.');
  }

  return res.json();
}

export async function updateBook(id, data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('도서 수정에 실패했습니다.');
  }

  return res.json();
}

export async function deleteBook(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('도서 삭제에 실패했습니다.');
  }
}