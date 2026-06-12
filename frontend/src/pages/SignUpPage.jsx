// import { useState } from "react";
// import "./Login.css";
//
// function SignUpPage({ onNavigate }) {
//     const [email, setEmail] = useState("");
//     const [nickname, setNickname] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordConfirm, setPasswordConfirm] = useState("");
//     const [apiKey, setApiKey] = useState("");
//
//     const handleSignUp = (e) => {
//         e.preventDefault();
//
//         if (!email.trim()) {
//             alert("이메일을 입력해주세요.");
//             return;
//         }
//         if (!nickname.trim()) {
//             alert("닉네임을 입력해주세요.");
//             return;
//         }
//         if (!password.trim()) {
//             alert("비밀번호를 입력해주세요.");
//             return;
//         }
//         if (!passwordConfirm.trim()) {
//             alert("비밀번호 확인을 입력해주세요.");
//             return;
//         }
//
//         if (password !== passwordConfirm) {
//             alert("비밀번호가 일치하지 않습니다.");
//             return;
//         }
//
//         alert("회원가입이 완료되었습니다.");
//         onNavigate("home");
//     };
//
//     return (
//         <div className="signup-overlay">
//             <div className="signup-modal">
//                 <h2>회원가입</h2>
//
//                 <form onSubmit={handleSignUp} className="signup-form">
//
//                     <div className="signup-input-group">
//                         <label>이메일</label>
//                         <input
//                             type="email"
//                             className="signup-input"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="이메일을 입력하세요"
//                         />
//                     </div>
//
//                     <div className="signup-input-group">
//                         <label>닉네임</label>
//                         <input
//                             type="text"
//                             className="signup-input"
//                             value={nickname}
//                             onChange={(e) => setNickname(e.target.value)}
//                             placeholder="닉네임을 입력하세요"
//                         />
//                     </div>
//
//                     <div className="signup-input-group">
//                         <label>비밀번호</label>
//                         <input
//                             type="password"
//                             className="signup-input"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="비밀번호를 입력하세요"
//                         />
//                     </div>
//
//                     <div className="signup-input-group">
//                         <label>비밀번호 확인</label>
//                         <input
//                             type="password"
//                             className="signup-input"
//                             value={passwordConfirm}
//                             onChange={(e) => setPasswordConfirm(e.target.value)}
//                             placeholder="비밀번호를 다시 입력하세요"
//                         />
//                     </div>
//
//                     <div className="signup-input-group">
//                         <label>api key</label>
//                         <input
//                             type="text"
//                             className="signup-input"
//                             value={apiKey}
//                             onChange={(e) => setApiKey(e.target.value)}
//                             placeholder="api key를 입력하세요 (선택)"
//                         />
//                     </div>
//
//                     <div className="signup-button-group">
//                         <button
//                             type="button"
//                             className="signup-btn-cancel"
//                             onClick={() => onNavigate("login")}
//                         >
//                             로그인화면으로 돌아가기
//                         </button>
//                         <button
//                             type="submit"
//                             className="signup-btn-submit"
//                         >
//                             회원가입
//                         </button>
//                     </div>
//
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default SignUpPage;

import { useState } from "react";
import "./Login.css";

function SignUpPage({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [apiKey, setApiKey] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("이메일을 입력해주세요.");
            return;
        }
        if (!nickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        if (!password.trim()) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        if (!passwordConfirm.trim()) {
            alert("비밀번호 확인을 입력해주세요.");
            return;
        }

        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        username: nickname,
                        password,
                        apiKey,
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "회원가입 실패");
            }

            alert("회원가입이 완료되었습니다.");

            onNavigate("login");

        } catch (error) {
            console.error(error);
            alert(error.message || "회원가입에 실패했습니다.");
        }

        onNavigate("home");
    };

    return (
        <div className="signup-overlay">
            <div className="signup-modal">
                <h2>회원가입</h2>

                <form onSubmit={handleSignUp} className="signup-form">

                    <div className="signup-input-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            className="signup-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>닉네임</label>
                        <input
                            type="text"
                            className="signup-input"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            className="signup-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>비밀번호 확인</label>
                        <input
                            type="password"
                            className="signup-input"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="비밀번호를 다시 입력하세요"
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>api key</label>
                        <input
                            type="text"
                            className="signup-input"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="api key를 입력하세요 (선택)"
                        />
                    </div>

                    <div className="signup-button-group">
                        <button
                            type="button"
                            className="signup-btn-cancel"
                            onClick={() => onNavigate("login")}
                        >
                            로그인화면으로 돌아가기
                        </button>
                        <button
                            type="submit"
                            className="signup-btn-submit"
                        >
                            회원가입
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SignUpPage;