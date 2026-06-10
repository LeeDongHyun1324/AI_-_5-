package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    // 도서 목록 조회
    @Transactional(readOnly = true)
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 도서 상세 조회
    @Transactional(readOnly = true)
    public Book getBook(Long id) {
        return bookRepository.findById(id).orElseThrow(()
            -> new RuntimeException("Book not found:" + id));
    }

    // 도서 등록
    @Transactional
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    // 도서 수정
    @Transactional
    public Book updateBook(Long id, Book updatedBook) {
        Book book = getBook(id);
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
        bookRepository.delete(book);
    }

    // 표지 이미지 저장
    @Transactional
    public Book updateBookCover(Long id, String coverImageUrl) {
        Book book = getBook(id);

        book.setCoverImageUrl(coverImageUrl);

        return bookRepository.save(book);
    }

    // 제목으로 도서 GET
    @Transactional(readOnly = true)
    public List<Book> searchByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    // 작가명으로 도서 GET
    @Transactional(readOnly = true)
    public List<String> authorGetTitle(String author) {
        List<Book> books = bookRepository.findByAuthor(author);

        return books.stream().map(book -> book.getTitle()).toList();
    }

    // 제목, 저자 키워드로 도서 GET
    @Transactional(readOnly = true)
    public List<Book> searchByKeyword(String keyword) {
        return bookRepository.findByTitleOrAuthorOrContentContaining(keyword, keyword, keyword);
    }
}
