import { useState } from 'react'
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
  const [selectedBook, setSelectedBook] = useState(null);

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

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
      {page === 'generateCover' && <GenerateCoverImage onNavigate={setPage} book={editingBook} />}
    </>
  );
}

export default App;