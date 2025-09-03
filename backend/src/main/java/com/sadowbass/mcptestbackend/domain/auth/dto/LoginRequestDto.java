package com.sadowbass.mcptestbackend.domain.auth.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequestDto {

    @NotBlank
    private String loginId;

    @NotBlank
    private String password;
}
