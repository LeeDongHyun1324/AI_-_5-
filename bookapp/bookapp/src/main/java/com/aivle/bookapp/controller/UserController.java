package com.aivle.bookapp.controller;

import com.aivle.bookapp.domain.User;
import com.aivle.bookapp.dto.request.LoginRequestDto;
import com.aivle.bookapp.dto.request.SignupRequestDto;
import com.aivle.bookapp.dto.response.LoginResponseDto;
import com.aivle.bookapp.dto.response.UserResponseDto;
import com.aivle.bookapp.service.AuthService;
import com.aivle.bookapp.service.CryptoService;
import com.aivle.bookapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;
    private final CryptoService cryptoService;


    @PostMapping("/api/auth/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody SignupRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.signup(request));
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/api/auth/me")
    public UserResponseDto me() {
        User user = authService.getCurrentUser();

        return new UserResponseDto(user.getId(), user.getUsername());
    }

    @GetMapping("/api/auth/apikey")
    public ResponseEntity<String> getApiKey() {
        User user = authService.getCurrentUser();

        if (user.getEncryptedApiKey() == null || user.getEncryptedApiKey().isBlank()) {
            return ResponseEntity.badRequest().body("등록된 API Key가 없습니다.");
        }

        String apiKey = cryptoService.decrypt(user.getEncryptedApiKey());

        return ResponseEntity.ok(apiKey);
    }
}
