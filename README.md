# AI 도서 표지 생성 플랫폼

## 프로젝트 소개

본 프로젝트는 사용자가 도서 제목, 저자, 내용 정보를 입력하면 AI가 도서 분위기에 맞는 표지 이미지를 생성해주는 웹 서비스입니다.

사용자는 회원가입에서 OpenAI API Key를 등록하고, 이후 도서 정보를 입력하여 AI 표지 이미지를 생성할 수 있습니다. 생성된 표지는 도서에 반영되며, 도서 목록과 상세 페이지에서 확인할 수 있습니다.

또한 도서 상세 페이지에서는 다른 사용자가 도서 내용을 확인하고 댓글과 좋아요를 남길 수 있으며, 도서 작성자는 별도의 수정 화면에서 도서 정보를 수정하거나 AI 표지를 다시 생성할 수 있습니다.

---

## 팀원 소개

| 담당자 | 파트            |
| --- | ------------- |
| 김혜성 | 조장, PM, 백엔드   |
| 한유진 | 서기, 통합/예외처리   |
| 유혁재 | 발표자, AI/Front |
| 박민우 | 타임키퍼, 백엔드     |
| 서다은 | PPT, 통합/예외처리  |
| 이동현 | 검토담당자, 백엔드    |
| 김규민 | 검토담당자, 백엔드    |
| 홍다현 | PPT, AI/Front |

---

## 기술 스택

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Java
* Spring Boot
* Spring Data JPA
* H2 Database
* Gradle

### AI

* OpenAI Image Generation API

### 협업 도구

* Git
* GitHub
* Notion

### 테스트 도구
* Postman

---

## 프로젝트 구조

```bash
├── bookapp
│   └── bookapp
│       ├── src
│       │   └── main
│       │       ├── java
│       │       │   └── com
│       │       │       └── aivle
│       │       │           └── bookapp
│       │       │               ├── config
│       │       │               ├── controller
│       │       │               ├── domain
│       │       │               ├── dto
│       │       │               ├── exception
│       │       │               ├── jwt
│       │       │               ├── repository
│       │       │               ├── service
│       │       │               └── BookappApplication.java
│       │       └── resources
│       │           └── application.yaml
│       └── build.gradle
│
├── db
│   └── bookdb.mv.db
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package-lock.json
```

---

## 실행 방법

### 1. Backend 실행

```bash
cd bookapp/bookapp
./gradlew bootRun
```

Windows PowerShell에서는 아래 명령어를 사용합니다.

```powershell
cd bookapp/bookapp
.\gradlew bootRun
```

Backend 기본 실행 주소는 다음과 같습니다.

```bash
http://localhost:8080
```

H2 Console 접속 주소는 다음과 같습니다.

```bash
http://localhost:8080/h2-console
```

### 2. Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

Frontend 기본 실행 주소는 다음과 같습니다.

```bash
http://localhost:5173
```

---

## 주요 기능

### 1. 회원가입 및 로그인

* 사용자 계정 생성
* 로그인 기능
* 사용자별 도서 데이터 관리
* OpenAI API Key 등록 및 저장
* 이미지 생성 시 API Key 반복 입력 최소화

### 2. 도서 등록

* 도서 제목 입력
* 저자 입력
* 도서 내용 입력
* 등록된 도서는 도서 목록에서 확인 가능

### 3. AI 표지 생성

* 도서 제목과 내용을 기반으로 표지 생성
* 표지 품질, 스타일, 추가 지시사항 설정
* AI가 생성한 표지 후보 중 원하는 이미지 선택
* 선택된 표지는 도서 목록 및 상세 페이지에 반영

### 4. 도서 목록 조회

* 등록된 도서 목록 조회
* 도서 제목, 저자, 표지 이미지 확인
* 상세 페이지 이동

### 5. 도서 상세 조회

* 도서 제목, 저자, 내용, 표지 이미지 확인
* 다른 사용자가 도서 내용을 확인 가능
* 댓글 작성 기능
* 좋아요 기능

### 6. 도서 수정

* 작성자가 도서 제목, 저자, 내용 수정
* 작성자가 AI 표지 생성 화면에서 표지 재생성 가능

### 7. 도서 삭제

* 작성자가 등록한 도서 삭제 가능

---

## 화면 구성

> 추후 화면 이미지 추가 예정

* 회원가입 / 로그인 화면
* 메인 화면
* 도서 목록 화면
* 도서 등록 화면
* AI 표지 생성 화면
* 도서 상세 화면

    * 도서 정보
    * 코멘트
    * 좋아요
* 도서 수정 화면

---

## 구현 내용

### Backend

* 도서 CRUD API 구현
* 도서 표지 이미지 저장 API 구현
* 사용자 정의 예외처리 구현
* GlobalExceptionHandler를 통한 공통 에러 응답 처리
* H2 Database 연동
* JPA Entity 설계

### Frontend

* 도서 목록 화면 구현
* 도서 등록 화면 구현
* 도서 상세 화면 구현
* 도서 수정 화면 구현
* AI 표지 생성 화면 구현
* OpenAI Image Generation API 호출
* 생성된 표지 이미지 선택 및 저장

### AI 표지 생성

* 도서 제목과 내용을 기반으로 프롬프트 생성
* 품질, 스타일, 추가 지시사항 반영
* 3개의 표지 후보 이미지 생성
* 선택한 이미지를 도서 표지로 저장

### 예외처리

* 존재하지 않는 도서 ID 요청 처리
* 표지 이미지가 비어 있는 경우 저장 방지
* 잘못된 JSON 요청 처리
* 잘못된 URL 파라미터 타입 처리
* 입력값 검증 실패 처리

---

## 트러블슈팅

### 1. 날짜 데이터 형식 불일치 오류

도서 등록 또는 수정 요청 과정에서 `LocalDateTime` 파싱 오류가 발생하였다. 프론트엔드에서 `"2026-06-09 16:50:24"` 형식의 날짜 문자열을 전달했지만, 백엔드의 `LocalDateTime`은 기본적으로 `"2026-06-09T16:50:24"` 형식을 기대하기 때문에 JSON 역직렬화 오류가 발생했다.

날짜 데이터는 사용자가 직접 입력하는 값이 아니므로 프론트엔드에서 전달하지 않고, 백엔드에서 자동으로 관리하도록 수정하였다. `Book` 엔티티에 `@CreationTimestamp`, `@UpdateTimestamp`를 적용하여 생성일과 수정일이 자동으로 저장 및 갱신되도록 처리하였다.

```java
@CreationTimestamp
private LocalDateTime createdAt;

@UpdateTimestamp
private LocalDateTime updatedAt;
```

---

### 2. AI 표지 이미지 저장 시 컬럼 길이 초과 오류

AI가 생성한 표지 이미지를 저장하는 과정에서 `coverImageUrl` 컬럼 길이 초과 오류가 발생하였다. 기존에는 이미지 URL을 저장할 것으로 예상해 기본 문자열 컬럼으로 설계했지만, 실제로는 Base64 형태의 긴 이미지 데이터가 저장되면서 `VARCHAR(255)` 길이 제한을 초과하였다.

이를 해결하기 위해 `coverImageUrl` 필드의 컬럼 타입을 `TEXT`로 변경하였다.

```java
@Column(columnDefinition = "TEXT")
private String coverImageUrl;
```

이를 통해 Base64 이미지 문자열 저장은 가능해졌지만, 이미지 데이터를 DB에 직접 저장하면 응답 데이터가 커질 수 있다는 한계가 있다. 추후에는 이미지를 파일 또는 별도 저장소에 저장하고, DB에는 이미지 경로나 URL만 저장하는 방식으로 개선할 수 있다.

---

### 3. 도서 검색 오류

도서 검색 기능에서 제목, 저자, 내용 기준의 통합 검색이 정확히 동작하지 않는 문제가 있었다. 처음에는 Spring Data JPA의 메서드 이름 기반 쿼리를 사용해 검색 기능을 확장하려고 했지만, 여러 필드에 대해 `Containing` 조건을 함께 적용하는 과정에서 원하는 검색 결과가 나오지 않았다.

이를 해결하기 위해 Repository에서 JPQL을 사용하여 제목, 저자, 내용에 대한 `LIKE` 조건을 직접 작성하였다.

```java
@Query("""
    SELECT b
    FROM Book b
    WHERE b.title LIKE %:keyword%
       OR b.author LIKE %:keyword%
       OR b.content LIKE %:keyword%
""")
List<Book> searchByKeyword(@Param("keyword") String keyword);
```

그 결과 하나의 키워드로 제목, 저자, 내용 전체를 대상으로 검색할 수 있게 되었고, 검색 결과도 정상적으로 반환되는 것을 확인하였다.

---

## 기대효과

* 사용자는 도서 내용을 기반으로 빠르게 표지를 생성할 수 있습니다.
* 작성자는 별도의 디자인 도구 없이 도서 분위기에 맞는 표지를 제작할 수 있습니다.
* 회원 기반으로 도서와 표지를 관리할 수 있어 사용자별 데이터 관리가 가능합니다.
* 댓글과 좋아요 기능을 통해 도서에 대한 사용자 반응을 확인할 수 있습니다.
* 예외처리를 통해 잘못된 요청이나 오류 상황에서도 일관된 응답을 제공할 수 있습니다.

---

## Git, Notion Repository

### GitHub

https://github.com/LeeDongHyun1324/AI_-_5-.git

### Notion

https://app.notion.com/p/5-37a447df1b5980bf8739dbfafc064a3f
