package com.aivle.bookapp.controller;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // 모든 책 출력
    @GetMapping("/api/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // 특정 id 책 출력
    @GetMapping("/api/books/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBook(id);
    }

    // 책 생성
    @PostMapping("/api/books")
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
        Book saved = bookService.createBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 특정 id 책 수정
    @PatchMapping("/api/books/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    // 특정 id 책 삭제
    @DeleteMapping("/api/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // 특정 id 책 이미지 커버 생성
    @PatchMapping("/api/books/{id}/cover")
    public Book updateBookCover(@PathVariable Long id, @RequestBody Book book) {
        return bookService.updateBookCover(id, book.getCoverImageUrl());
    }

    // 제목, 저자 키워드로 도서 GET
    @GetMapping("/api/books/search/keyword")
    public List<Book> searchByKeyword(@RequestParam String keyword) {
        return bookService.searchByKeyword(keyword);
    }

}
