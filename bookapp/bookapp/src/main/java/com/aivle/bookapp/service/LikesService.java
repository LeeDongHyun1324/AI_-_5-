package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.Book;
import com.aivle.bookapp.domain.Likes;
import com.aivle.bookapp.domain.User;
import com.aivle.bookapp.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikesService {

    private final LikesRepository likesRepository;

    public void addLike(Book book, User user) {

        if (likesRepository.existsByBook_IdAndUser_Id(book.getId(), user.getId())) {
            throw new RuntimeException("이미 좋아요를 누른 책입니다.");
        }

        Likes likes = new Likes();
        likes.setBook(book);
        likes.setUser(user);

        likesRepository.save(likes);
    }

    public void removeLike(Book book, User user) {

        Likes likes = likesRepository.findAll().stream()
                .filter(l ->
                        l.getBook().getId().equals(book.getId()) &&
                                l.getUser().getId().equals(user.getId())
                )
                .findFirst()
                .orElseThrow(() -> new RuntimeException("좋아요가 존재하지 않습니다."));

        likesRepository.delete(likes);
    }

    @Transactional(readOnly = true)
    public boolean isLiked(Long bookId, Long userId) {

        return likesRepository.existsByBook_IdAndUser_Id(bookId, userId);
    }
}