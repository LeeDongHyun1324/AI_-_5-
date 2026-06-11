package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.*;
import com.aivle.bookapp.dto.response.CommentResponse;
import com.aivle.bookapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CommentResponse> getComments(Long bookId) {
        return commentRepository.findByBookIdOrderByCreatedAtDesc(bookId)
                .stream().map(CommentResponse::from).toList();
    }

    @Transactional
    public CommentResponse addComment(Long bookId, Long userId, String content) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "책을 찾을 수 없음"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없음"));
        Comment c = new Comment();
        c.setBook(book);
        c.setUser(user);
        c.setContent(content);
        return CommentResponse.from(commentRepository.save(c));
    }

    @Transactional
    public CommentResponse updateComment(Long commentId, Long userId, String content) {
        Comment c = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없음"));
        if (!c.getUser().getId().equals(userId))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자만 수정할 수 있음");
        c.setContent(content);
        return CommentResponse.from(c);
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        Comment c = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없음"));
        if (!c.getUser().getId().equals(userId))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자만 삭제할 수 있음");
        commentRepository.delete(c);
    }

    // 댓글 누적 개수 반환
    @Transactional(readOnly = true)
    public long getCommentCount(Long bookId) {
        return commentRepository.countByBookId(bookId);
    }
}