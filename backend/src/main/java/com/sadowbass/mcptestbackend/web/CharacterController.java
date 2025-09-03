package com.sadowbass.mcptestbackend.web;

import com.sadowbass.mcptestbackend.domain.character.dto.CharacterCreateRequestDto;
import com.sadowbass.mcptestbackend.domain.character.dto.CharacterResponseDto;
import com.sadowbass.mcptestbackend.domain.character.dto.CharacterUpdateRequestDto;
import com.sadowbass.mcptestbackend.domain.character.service.CharacterService;
import com.sadowbass.mcptestbackend.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/characters")
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping
    public ResponseEntity<ApiResponse<CharacterResponseDto>> createCharacter(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CharacterCreateRequestDto requestDto) {
        CharacterResponseDto createdCharacter = characterService.createCharacter(userDetails.getUsername(), requestDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdCharacter.getId())
                .toUri();
        return ResponseEntity.created(location).body(ApiResponse.success(createdCharacter));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CharacterResponseDto>>> getCharacters(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<CharacterResponseDto> characters = characterService.getCharacters(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(characters));
    }

    @PatchMapping("/{characterId}")
    public ResponseEntity<ApiResponse<CharacterResponseDto>> updateCharacter(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long characterId,
            @Valid @RequestBody CharacterUpdateRequestDto requestDto) {
        CharacterResponseDto updatedCharacter = characterService.updateCharacter(userDetails.getUsername(), characterId, requestDto);
        return ResponseEntity.ok(ApiResponse.success(updatedCharacter));
    }

    @DeleteMapping("/{characterId}")
    public ResponseEntity<Void> deleteCharacter(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long characterId) {
        characterService.deleteCharacter(userDetails.getUsername(), characterId);
        return ResponseEntity.noContent().build();
    }
}
