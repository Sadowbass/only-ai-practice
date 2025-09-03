package com.sadowbass.mcptestbackend.web;

import com.sadowbass.mcptestbackend.domain.auth.dto.LoginRequestDto;
import com.sadowbass.mcptestbackend.domain.auth.dto.TokenResponseDto;
import com.sadowbass.mcptestbackend.domain.auth.service.AuthService;
import com.sadowbass.mcptestbackend.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/tokens")
    public ResponseEntity<ApiResponse<TokenResponseDto>> login(@Valid @RequestBody LoginRequestDto requestDto) {
        TokenResponseDto token = authService.login(requestDto);
        return ResponseEntity.ok(ApiResponse.success(token));
    }

    @PostMapping("/admin/tokens")
    public ResponseEntity<ApiResponse<TokenResponseDto>> adminLogin(@Valid @RequestBody LoginRequestDto requestDto) {
        TokenResponseDto token = authService.adminLogin(requestDto);
        return ResponseEntity.ok(ApiResponse.success(token));
    }
}
