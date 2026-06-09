package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    // 도서 목록 조회
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 도서 상세 조회
    public Book getBook(Long id) {
        return bookRepository.findById(id).orElseThrow(()
            -> new RuntimeException("Book not found:" + id));
    }

    // 도서 등록
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    // 도서 수정
    public Book updateBook(Long id, Book updatedBook) {
        Book book = getBook(id);

        book.setTitle(updatedBook.getTitle());
        book.setContent(updatedBook.getContent());
        book.setAuthor(updatedBook.getAuthor());

        return bookRepository.save(book);
    }

    // 도서 삭제
    public void deleteBook(Long id) {
        Book book = getBook(id);
        bookRepository.delete(book);
    }

    // 표지 이미지 저장
    public Book updateBookCover(Long id, String coverImageUrl) {
        Book book = getBook(id);

        book.setCoverImageUrl(coverImageUrl);

        return bookRepository.save(book);
    }
}
