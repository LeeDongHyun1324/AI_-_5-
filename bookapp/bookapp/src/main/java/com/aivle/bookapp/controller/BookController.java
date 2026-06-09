package com.aivle.bookapp.controller;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/api/books")
    public List<Book> getAllBooks() {}

    @GetMapping("/api/books/{id}")
    public Book getBook(@PathVariable Long id) {}

    @PostMapping("/api/books")
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {}

    @PatchMapping("/api/books/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {}

    @DeleteMapping("/api/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {}

    @PatchMapping("/api/books/{id}/cover")
    public Book updateBookCover(@PathVariable Long id, @RequestBody Book book) {}

}
