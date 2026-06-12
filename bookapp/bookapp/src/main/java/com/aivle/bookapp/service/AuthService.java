package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.User;
import com.aivle.bookapp.jwt.JwtProvider;
import com.aivle.bookapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final HttpServletRequest request;

    public User getCurrentUser() {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("토큰 없음");
        }

        String token = authHeader.substring(7);

        if (!jwtProvider.validate(token)) {
            throw new RuntimeException("유효하지 않은 토큰");
        }

        Long userId = jwtProvider.getUserId(token);

        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("사용자 없음"));
    }
}