package com.sadowbass.mcptestbackend.exception;

import com.sadowbass.mcptestbackend.dto.ApiResponse;
import com.sadowbass.mcptestbackend.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // @Valid 유효성 검사 실패 시
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        List<ErrorResponse.ValidationError> validationErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> ErrorResponse.ValidationError.builder()
                        .field(error.getField())
                        .message(error.getDefaultMessage())
                        .build())
                .collect(Collectors.toList());

        ErrorResponse errorResponse = ErrorResponse.builder()
                .code("INVALID_INPUT_VALUE")
                .message("입력 값이 올바르지 않습니다.")
                .errors(validationErrors)
                .build();

        return new ResponseEntity<>(ApiResponse.error(errorResponse), HttpStatus.BAD_REQUEST);
    }

    // 비즈니스 로직 상의 예외 (예: 중복 이메일, 로그인 실패)
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<ApiResponse<Object>> handleIllegalArgument(IllegalArgumentException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .code("ILLEGAL_ARGUMENT")
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(ApiResponse.error(errorResponse), HttpStatus.BAD_REQUEST);
    }

    // 처리되지 않은 모든 예외
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .code("INTERNAL_SERVER_ERROR")
                .message("서버 내부 오류가 발생했습니다. 관리자에게 문의해주세요.")
                .build();
        return new ResponseEntity<>(ApiResponse.error(errorResponse), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
