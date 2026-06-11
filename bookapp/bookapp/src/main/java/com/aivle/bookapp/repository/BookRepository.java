package com.aivle.bookapp.repository;

import com.aivle.bookapp.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContaining(String title);

    List<Book> findByAuthorContaining(String author);

    @Query("""
        SELECT b
        FROM Book b
        WHERE b.title LIKE %:keyword%
           OR b.author LIKE %:keyword%
           OR b.content LIKE %:keyword%
    """)
    List<Book> searchByKeyword(@Param("keyword") String keyword);
}