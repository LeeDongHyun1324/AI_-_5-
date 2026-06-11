package com.aivle.bookapp.controller;

import com.aivle.bookapp.dto.request.CommentRequest;
import com.aivle.bookapp.dto.response.CommentResponse;
import com.aivle.bookapp.service.CommentService;
import com.aivle.bookapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final AuthService authService;

    // 댓글 목록 조회 (공개 — 토큰 불필요)
    @GetMapping("/books/{bookId}/comments")
    public List<CommentResponse> list(@PathVariable Long bookId) {
        return commentService.getComments(bookId);
    }

    // 댓글 작성 (로그인 필요)
    @PostMapping("/books/{bookId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse create(@PathVariable Long bookId,
                                  @RequestBody CommentRequest req) {
        Long userId = authService.getCurrentUser().getId();
        return commentService.addComment(bookId, userId, req.content());
    }

    // 댓글 수정 (작성자만)
    @PatchMapping("/comments/{commentId}")
    public CommentResponse update(@PathVariable Long commentId,
                                  @RequestBody CommentRequest req) {
        Long userId = authService.getCurrentUser().getId();
        return commentService.updateComment(commentId, userId, req.content());
    }

    // 댓글 삭제 (작성자만)
    @DeleteMapping("/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long commentId) {
        Long userId = authService.getCurrentUser().getId();
        commentService.deleteComment(commentId, userId);
    }

    // 댓글 누적 개수 반환 (공개)
    @GetMapping("/comments/count/{bookId}")
    public ResponseEntity<Long> getCommentCount(@PathVariable Long bookId) {
        long count = commentService.getCommentCount(bookId);
        return ResponseEntity.ok(count);
    }
}