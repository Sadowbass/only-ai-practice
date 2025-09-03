package com.sadowbass.mcptestbackend.domain.character.repository;

import com.sadowbass.mcptestbackend.domain.character.entity.Character;
import com.sadowbass.mcptestbackend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findByUser(User user);
}
