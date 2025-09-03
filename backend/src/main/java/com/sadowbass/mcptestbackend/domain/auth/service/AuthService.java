package com.sadowbass.mcptestbackend.domain.auth.service;

import com.sadowbass.mcptestbackend.config.jwt.JwtTokenProvider;
import com.sadowbass.mcptestbackend.domain.auth.dto.LoginRequestDto;
import com.sadowbass.mcptestbackend.domain.auth.dto.TokenResponseDto;
import com.sadowbass.mcptestbackend.domain.user.entity.User;
import com.sadowbass.mcptestbackend.domain.user.entity.UserRoleEnum;
import com.sadowbass.mcptestbackend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public TokenResponseDto login(LoginRequestDto requestDto) {
        User user = userRepository.findByLoginId(requestDto.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디입니다."));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        if (user.getRole() != UserRoleEnum.USER) {
            throw new IllegalArgumentException("일반 사용자가 아닙니다.");
        }

        String token = jwtTokenProvider.createToken(user.getLoginId(), user.getRole());
        return new TokenResponseDto(token);
    }

    public TokenResponseDto adminLogin(LoginRequestDto requestDto) {
        User user = userRepository.findByLoginId(requestDto.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디입니다."));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        if (user.getRole() != UserRoleEnum.ADMIN) {
            throw new IllegalArgumentException("관리자 계정이 아닙니다.");
        }

        String token = jwtTokenProvider.createToken(user.getLoginId(), user.getRole());
        return new TokenResponseDto(token);
    }
}
