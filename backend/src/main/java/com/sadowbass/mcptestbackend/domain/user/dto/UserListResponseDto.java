package com.sadowbass.mcptestbackend.domain.user.dto;

import com.sadowbass.mcptestbackend.domain.user.entity.User;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class UserListResponseDto {
    private final String loginId;
    private final String createdAt;

    public UserListResponseDto(User user) {
        this.loginId = user.getLoginId();
        this.createdAt = user.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
