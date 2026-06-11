import { useState, useEffect } from 'react';
import { generateCoverImage } from '../api/openai';

export default function GenerateCoverImage({ book, onNavigate, onSuccess }) {
    const [selectedStyle, setSelectedStyle] = useState('none');
    const [extraDetail, setExtraDetail] = useState('');
    const [userApiKey, setUserApiKey] = useState('');
    const [selectedQuality, setSelectedQuality] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);

    useEffect(() => {
        loadApiKey();
    }, []);

    async function loadApiKey() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            const response = await fetch(
                "http://localhost:8080/api/auth/apikey",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const apiKey = await response.text();
                setUserApiKey(apiKey);
            } else {
                console.error("API Key 조회 실패: 서버 응답 오류");
            }

        } catch (error) {
            console.error(error);
        }
    }

    // 혹시라도 book 데이터가 없을 경우 (안전 장치)
    if (!book) {
        return (
            <div style={{ padding: "48px", textAlign: "center" }}>
                <p>도서 정보가 없습니다.</p>
                <button onClick={() => onNavigate('list')}>목록으로 돌아가기</button>
            </div>
        );
    }

    async function handleGenerate() {
        if (!userApiKey) {
            alert('OpenAI API Key를 먼저 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const images = await generateCoverImage(book, selectedQuality, selectedStyle, extraDetail);
            setGeneratedImages(images);
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section style={{ padding: "48px", maxWidth: "720px", margin: "0 auto" }}>
            <h3>AI 표지 생성 - [{book.title}]</h3>

            <label>OpenAI API Key:</label>
            <input
                className="input-apikey"
                type="password"
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
                style={{ display: "block", marginBottom: "16px", width: "100%", padding: "8px" }}
            />

            <label>생성 모델:</label>
            <select className="select-model" value="gpt-image-2" disabled style={{ display: "block", marginBottom: "16px", padding: "8px" }}>
                <option value="gpt-image-2">GPT Image 2 (1024x1536)</option>
            </select>

            <label>품질:</label>
            <select
                className="select-quality"
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                style={{ display: "block", marginBottom: "16px", padding: "8px" }}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label>표지 스타일:</label>
            <select
                className="select-style"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                style={{ display: "block", marginBottom: "16px", padding: "8px" }}
            >
                <option value="none">기본 (지정 안 함)</option>
                <option value="수채화풍, 부드러운 색감">수채화풍</option>
                <option value="미니멀, 심플한 디자인">미니멀</option>
                <option value="빈티지, 클래식한 느낌">빈티지</option>
                <option value="다채롭고 화려한 일러스트">화려한 일러스트</option>
                <option value="어둡고 무게감 있는 분위기">다크/무게감</option>
            </select>

            <label>추가 지시사항:</label>
            <textarea
                className="input-prompt"
                placeholder="예) 고양이를 주인공으로, 파란색 계열로..."
                value={extraDetail}
                onChange={(e) => setExtraDetail(e.target.value)}
                style={{ display: "block", marginBottom: "24px", width: "100%", height: "80px", padding: "8px" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" className="generator-btn" onClick={handleGenerate} disabled={loading} style={{ padding: "10px 20px" }}>
                    {loading ? '생성 중...' : 'AI 표지 생성'}
                </button>

                <button type="button" onClick={() => onNavigate('edit')} style={{ padding: "10px 20px" }}>
                    돌아가기
                </button>
            </div>

            {generatedImages.length > 0 && (
                <div style={{ marginTop: "32px" }}>
                    <p>표지를 클릭하면 저장됩니다:</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {generatedImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt="생성된 AI 표지 후보"
                                width="200"
                                style={{ cursor: 'pointer', border: "2px solid transparent", borderRadius: "8px" }}
                                onMouseOver={(e) => e.target.style.borderColor = "var(--color-primary)"}
                                onMouseOut={(e) => e.target.style.borderColor = "transparent"}
                                onClick={async () => {
                                    const patchRes = await fetch(`http://localhost:8080/api/books/${book.id}/cover`, {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ coverImageUrl: src }),
                                    });

                                    if (!patchRes.ok) {
                                        alert('표지 저장에 실패했습니다.');
                                        return;
                                    }

                                    alert('표지가 성공적으로 저장되었습니다!');

                                    if (onSuccess) {
                                        onSuccess(src);
                                    } else {
                                        onNavigate('edit');
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}