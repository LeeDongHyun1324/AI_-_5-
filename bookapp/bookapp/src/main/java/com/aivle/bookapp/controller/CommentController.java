package com.aivle.bookapp.controller;

import com.aivle.bookapp.dto.request.CommentRequest;
import com.aivle.bookapp.dto.response.CommentResponse;
import com.aivle.bookapp.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/books/{bookId}/comments")
    public List<CommentResponse> list(@PathVariable Long bookId) {
        return commentService.getComments(bookId);
    }

    @PostMapping("/books/{bookId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse create(@PathVariable Long bookId,
                                  @RequestBody CommentRequest req,
                                  @RequestParam Long userId) {
        return commentService.addComment(bookId, userId, req.content());
    }

    @PatchMapping("/comments/{commentId}")
    public CommentResponse update(@PathVariable Long commentId,
                                  @RequestBody CommentRequest req,
                                  @RequestParam Long userId) {
        return commentService.updateComment(commentId, userId, req.content());
    }

    @DeleteMapping("/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long commentId,
                       @RequestParam Long userId) {
        commentService.deleteComment(commentId, userId);
    }
}