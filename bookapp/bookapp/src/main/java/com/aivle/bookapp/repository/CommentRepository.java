package com.aivle.bookapp.repository;

import com.aivle.bookapp.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBookIdOrderByCreatedAtDesc(Long bookId);
    long countByBookId(Long bookId);   // 댓글 수 (좋아요처럼 컬럼 없이 COUNT)
}