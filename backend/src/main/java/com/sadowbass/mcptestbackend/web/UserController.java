package com.sadowbass.mcptestbackend.web;

import com.sadowbass.mcptestbackend.domain.user.dto.PasswordChangeRequestDto;
import com.sadowbass.mcptestbackend.domain.user.dto.UserListResponseDto;
import com.sadowbass.mcptestbackend.domain.user.dto.UserSignupRequestDto;
import com.sadowbass.mcptestbackend.domain.user.service.UserService;
import com.sadowbass.mcptestbackend.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<Long>> signup(@Valid @RequestBody UserSignupRequestDto requestDto) {
        Long userId = userService.signup(requestDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(userId)
                .toUri();
        return ResponseEntity.created(location).body(ApiResponse.success(userId));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody PasswordChangeRequestDto requestDto) {
        userService.changePassword(userDetails.getUsername(), requestDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/login-ids/{loginId}/exists")
    public ResponseEntity<ApiResponse<Boolean>> checkLoginIdExists(@PathVariable String loginId) {
        boolean exists = userService.checkLoginIdExists(loginId);
        return ResponseEntity.ok(ApiResponse.success(exists));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserListResponseDto>>> getUsers(
            @RequestParam(value = "page", defaultValue = "0") int page) {
        Page<UserListResponseDto> users = userService.getUsers(page);
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
