package com.aivle.bookapp.controller;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.domain.User;
import com.aivle.bookapp.service.AuthService;
import com.aivle.bookapp.service.LikesService;
import com.aivle.bookapp.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;
    private final BookService bookService;
    private final AuthService authService;

    // 좋아요 추가
    @PostMapping("/api/likes/{bookId}")
    public ResponseEntity<Void> addLike(@PathVariable Long bookId) {

        User user = authService.getCurrentUser();
        Book book = bookService.getBook(bookId);

        likesService.addLike(book, user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 좋아요 취소
    @DeleteMapping("/api/likes/{bookId}")
    public ResponseEntity<Void> removeLike(@PathVariable Long bookId) {

        User user = authService.getCurrentUser();
        Book book = bookService.getBook(bookId);

        likesService.removeLike(book, user);

        return ResponseEntity.noContent().build();
    }

    //좋아요 눌렀는지 확인
    @GetMapping("/api/likes/{bookId}")
    public ResponseEntity<Boolean> isLiked(@PathVariable Long bookId) {

        User user = authService.getCurrentUser();

        boolean result = likesService.isLiked(bookId, user.getId());

        return ResponseEntity.ok(result);
    }


    //좋아요 누적 개수 반환
    @GetMapping("/api/likes/count/{bookId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long bookId) {

        long count = likesService.getLikeCount(bookId);

        return ResponseEntity.ok(count);
    }

}