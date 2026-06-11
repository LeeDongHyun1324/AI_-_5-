package com.aivle.bookapp.repository;

import com.aivle.bookapp.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    boolean existsByBook_IdAndUser_Id(Long bookId, Long userId);

}