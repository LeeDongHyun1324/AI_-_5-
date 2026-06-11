const BASE_URL = "http://localhost:8080/api";

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("로그인 실패: 이메일/비밀번호를 확인하세요.");
  return res.json(); // { token, id, username }
}