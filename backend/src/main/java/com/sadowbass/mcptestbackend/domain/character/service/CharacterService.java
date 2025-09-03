package com.sadowbass.mcptestbackend.domain.character.service;

import com.sadowbass.mcptestbackend.domain.character.dto.CharacterCreateRequestDto;
import com.sadowbass.mcptestbackend.domain.character.dto.CharacterResponseDto;
import com.sadowbass.mcptestbackend.domain.character.dto.CharacterUpdateRequestDto;
import com.sadowbass.mcptestbackend.domain.character.entity.Character;
import com.sadowbass.mcptestbackend.domain.character.repository.CharacterRepository;
import com.sadowbass.mcptestbackend.domain.user.entity.User;
import com.sadowbass.mcptestbackend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;

    @Transactional
    public CharacterResponseDto createCharacter(String loginId, CharacterCreateRequestDto requestDto) {
        User user = findUserByLoginId(loginId);
        validateSpec(requestDto.getWowClass(), requestDto.getWowSpec());

        Character character = Character.builder()
                .name(requestDto.getName())
                .serverName(requestDto.getServerName())
                .faction(requestDto.getFaction())
                .wowClass(requestDto.getWowClass())
                .wowSpec(requestDto.getWowSpec())
                .itemLevel(requestDto.getItemLevel())
                .user(user)
                .build();

        Character savedCharacter = characterRepository.save(character);
        return new CharacterResponseDto(savedCharacter);
    }

    public List<CharacterResponseDto> getCharacters(String loginId) {
        User user = findUserByLoginId(loginId);
        return characterRepository.findByUser(user).stream()
                .map(CharacterResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public CharacterResponseDto updateCharacter(String loginId, Long characterId, CharacterUpdateRequestDto requestDto) {
        User user = findUserByLoginId(loginId);
        Character character = findCharacterById(characterId);
        validateCharacterOwner(user, character);
        validateSpec(requestDto.getWowClass(), requestDto.getWowSpec());

        character.update(
                requestDto.getName(), // Pass the name to the update method
                requestDto.getServerName(),
                requestDto.getFaction(),
                requestDto.getWowClass(),
                requestDto.getWowSpec(),
                requestDto.getItemLevel()
        );

        return new CharacterResponseDto(character);
    }

    @Transactional
    public void deleteCharacter(String loginId, Long characterId) {
        User user = findUserByLoginId(loginId);
        Character character = findCharacterById(characterId);
        validateCharacterOwner(user, character);

        characterRepository.delete(character);
    }

    private User findUserByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    private Character findCharacterById(Long characterId) {
        return characterRepository.findById(characterId)
                .orElseThrow(() -> new IllegalArgumentException("캐릭터를 찾을 수 없습니다."));
    }

    private void validateSpec(com.sadowbass.mcptestbackend.domain.wow.entity.WowClass wowClass, com.sadowbass.mcptestbackend.domain.wow.entity.WowSpec wowSpec) {
        if (wowSpec.getWowClass() != wowClass) {
            throw new IllegalArgumentException("선택한 전문화는 해당 직업에 속하지 않습니다.");
        }
    }

    private void validateCharacterOwner(User user, Character character) {
        if (!character.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 캐릭터에 대한 권한이 없습니다.");
        }
    }
}
