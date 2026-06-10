package com.aivle.bookapp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 로그인용
    @Column(nullable = false, unique = true)
    private String email;

    // 서비스 내 닉네임
    @Column(nullable = false, unique = true)
    private String username;

    // BCrypt 암호화 예정(비밀번호 암호화)
    @Column(nullable = false)
    private String password;

    // AES 암호화 예정(api암호화)
    @Column(columnDefinition = "TEXT")
    private String encryptedApiKey;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
