package com.aivle.bookapp.repository;

import com.aivle.bookapp.domain.CoverImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoverImageRepository extends JpaRepository<CoverImage, Long> {

    List<CoverImage> findByBookId(Long bookId);
}