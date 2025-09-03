package com.sadowbass.mcptestbackend.domain.user.service;

import com.sadowbass.mcptestbackend.domain.user.dto.PasswordChangeRequestDto;
import com.sadowbass.mcptestbackend.domain.user.dto.UserListResponseDto;
import com.sadowbass.mcptestbackend.domain.user.dto.UserSignupRequestDto;
import com.sadowbass.mcptestbackend.domain.user.entity.User;
import com.sadowbass.mcptestbackend.domain.user.entity.UserRoleEnum;
import com.sadowbass.mcptestbackend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Long signup(UserSignupRequestDto requestDto) {
        if (userRepository.existsByLoginId(requestDto.getLoginId())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        User user = User.builder()
                .loginId(requestDto.getLoginId())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .role(UserRoleEnum.USER)
                .build();

        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Transactional
    public void changePassword(String loginId, PasswordChangeRequestDto requestDto) {
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(requestDto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.updatePassword(passwordEncoder.encode(requestDto.getNewPassword()));
    }

    public boolean checkLoginIdExists(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public Page<UserListResponseDto> getUsers(int page) {
        Pageable pageable = PageRequest.of(page, 15, Sort.by(Sort.Direction.DESC, "createdAt"));
        return userRepository.findAll(pageable).map(UserListResponseDto::new);
    }
}
