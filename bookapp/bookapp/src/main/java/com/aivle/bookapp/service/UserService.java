package com.aivle.bookapp.service;

import com.aivle.bookapp.domain.User;
import com.aivle.bookapp.dto.request.LoginRequestDto;
import com.aivle.bookapp.dto.request.SignupRequestDto;
import com.aivle.bookapp.dto.response.LoginResponseDto;
import com.aivle.bookapp.dto.response.UserResponseDto;
import com.aivle.bookapp.jwt.JwtProvider;
import com.aivle.bookapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final CryptoService cryptoService;

    public UserResponseDto signup(SignupRequestDto request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("이미 존재하는 사용자입니다.");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("이미 사용중인 닉네임입니다.");
        }

        User user = new User();

        user.setEmail(request.getEmail());

        user.setUsername(request.getUsername());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setEncryptedApiKey(cryptoService.encrypt(request.getApiKey()));

        User savedUser = userRepository.save(user);

        return new UserResponseDto(savedUser.getId(), savedUser.getUsername());
    }

    @Transactional(readOnly = true)
    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                        () -> new RuntimeException("사용자 없음"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호 불일치");
        }

        String token = jwtProvider.createToken(user.getId());

        return new LoginResponseDto(token, user.getId(), user.getUsername());
    }
}