// dto/CommentResponse.java
package com.aivle.bookapp.dto.response;

import com.aivle.bookapp.domain.Comment;
import java.time.LocalDateTime;

public record CommentResponse(Long id, String content, String username, LocalDateTime createdAt) {
    public static CommentResponse from(Comment c) {
        return new CommentResponse(c.getId(), c.getContent(), c.getUser().getUsername(), c.getCreatedAt());
    }
}