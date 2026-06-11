import { useState } from "react";
import "./Login.css";

function LoginPage({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("이메일을 입력해주세요.");
            return;
        }
        if (!password.trim()) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        alert("로그인 되었습니다.");
        onNavigate("home");
    };

    const handleCancel = () => {
        onNavigate("home");
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <h2>로그인</h2>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label>이메일: </label>
                        <input
                            type="email"
                            className="input-login"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>

                    <div className="input-group">
                        <label>비밀번호: </label>
                        <input
                            type="password"
                            className="input-login"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    <div className="login-button-group">
                        <button type="button" onClick={handleCancel} className="login-cancel-btn">취소</button>
                        <button type="submit" className="login-submit-btn">로그인</button>
                    </div>

                    <button
                        type="button"
                        onClick={() => onNavigate('signup')}
                        className="signup-btn"
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;