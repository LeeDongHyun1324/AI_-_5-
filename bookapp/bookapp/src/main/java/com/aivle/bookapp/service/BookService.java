package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.domain.User;
import com.aivle.bookapp.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.aivle.bookapp.exception.BookNotFoundException;
import com.aivle.bookapp.exception.CoverImageException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final AuthService authService;

    // 도서 목록 조회
    @Transactional(readOnly = true)
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 도서 상세 조회
    @Transactional(readOnly = true)
    public Book getBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    // 도서 등록
    @Transactional
    public Book createBook(Book book) {
        User currentUser = authService.getCurrentUser();

        book.setUser(currentUser);

        return bookRepository.save(book);
    }

    // 도서 수정
    @Transactional
    public Book updateBook(Long id, Book updatedBook) {
        Book book = getBook(id);

        User currentUser = authService.getCurrentUser();

        if (!book.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        if (updatedBook.getTitle() != null) {
            book.setTitle(updatedBook.getTitle());
        }

        if (updatedBook.getContent() != null) {
            book.setContent(updatedBook.getContent());
        }

        if (updatedBook.getAuthor() != null) {
            book.setAuthor(updatedBook.getAuthor());
        }

        return bookRepository.save(book);
    }


    // 도서 삭제
    @Transactional
    public void deleteBook(Long id) {
        Book book = getBook(id);

        User currentUser = authService.getCurrentUser();

        if (!book.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        bookRepository.delete(book);
    }

    // 표지 이미지 저장
    @Transactional
    public Book updateBookCover(Long id, String coverImageUrl) {
        Book book = getBook(id);

        if (coverImageUrl == null || coverImageUrl.isBlank()) {
            throw new CoverImageException("저장할 표지 이미지가 없습니다.");
        }

        book.setCoverImageUrl(coverImageUrl);

        return bookRepository.save(book);
    }

    // 제목으로 도서 GET
    @Transactional(readOnly = true)
    public List<Book> searchByTitle(String title) {
        return bookRepository.findByTitleContaining(title);
    }

    // 작가명으로 도서 GET
    @Transactional(readOnly = true)
    public List<Book> authorGetTitle(String author) {
        return bookRepository.findByAuthorContaining(author);
    }

    // 제목, 저자 키워드로 도서 GET
    @Transactional(readOnly = true)
    public List<Book> searchByKeyword(String keyword) {
        return bookRepository.searchByKeyword(keyword);
    }
}
