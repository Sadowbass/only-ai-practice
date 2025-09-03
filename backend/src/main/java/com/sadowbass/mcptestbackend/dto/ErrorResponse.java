package com.sadowbass.mcptestbackend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private final String code;
    private final String message;
    private final List<ValidationError> errors;

    @Getter
    @Builder
    public static class ValidationError {
        private final String field;
        private final String message;
    }
}
