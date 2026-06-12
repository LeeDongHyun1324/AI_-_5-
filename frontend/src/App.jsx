import { useState, useEffect } from 'react'
import "./App.css";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BookListPage from './pages/BookListPage';
import BookEditPage from './pages/BookEditPage';
import BookDetailPage from './pages/BookDetailPage';
import BookCreatePage from './pages/BookCreatePage';
import GenerateCoverImage from './pages/GenerateCoverImage';

function App() {
  const [page, setPage] = useState('home');

  const [editingBook, setEditingBook] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLogin(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("토큰 만료");
        }

        const user = await response.json();

        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);

        setIsLogin(true);

      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");

        setIsLogin(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      <Navbar onNavigate={setPage} isLogin={isLogin} setIsLogin={setIsLogin}/>
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'list' && <BookListPage onNavigate={setPage}
                            setSelectedBookId={setSelectedBookId}
                            key={refreshTrigger}
                            onEditClick={(book) => {
                                                    setEditingBook(book);
                                                    setPage('edit');
                                                  }
                                        }/>}
      {page === 'edit' && <BookEditPage
                      book={editingBook}
                      onNavigate={setPage}
                      onCancel={() => {
                        setEditingBook(null);
                        setPage('list');
                      }}
                      onSuccess={() => {
                        setEditingBook(null);
                        setRefreshTrigger(prev => prev + 1);
                        setPage('list');
                      }}
                      />}
      {page === 'create' && <BookCreatePage onNavigate={setPage} onEditClick={(book) => setEditingBook(book)}/>}
      {page === "detail" && <BookDetailPage onNavigate={setPage} bookId={selectedBookId}
                                            onEditClick={(book) => {
                                                              setEditingBook(book);
                                                              setPage('edit');
                                                            }
                                                        }
       />}
      {page === 'login' && (<LoginPage onNavigate={setPage} setIsLogin={setIsLogin}/>)}
      {page === 'signup' && <SignUpPage onNavigate={setPage} />}
      {page === 'generateCover' && (
          <GenerateCoverImage onNavigate={setPage} book={editingBook} onSuccess={(newImageUrl) => {
                setEditingBook({ ...editingBook, coverImageUrl: newImageUrl });
                setPage('edit');
              }}
          />
      )}
    </>
  );
}

export default App;