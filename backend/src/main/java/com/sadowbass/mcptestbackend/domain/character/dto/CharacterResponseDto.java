package com.sadowbass.mcptestbackend.domain.character.dto;

import com.sadowbass.mcptestbackend.domain.character.entity.Character;
import com.sadowbass.mcptestbackend.domain.wow.entity.Faction;
import com.sadowbass.mcptestbackend.domain.wow.entity.WowClass;
import com.sadowbass.mcptestbackend.domain.wow.entity.WowSpec;
import lombok.Getter;

@Getter
public class CharacterResponseDto {
    private final Long id;
    private final String name;
    private final String serverName;
    private final Faction faction;
    private final String factionName; // 추가
    private final WowClass wowClass;
    private final String wowClassName;
    private final WowSpec wowSpec;
    private final String wowSpecName;
    private final int itemLevel;

    public CharacterResponseDto(Character character) {
        this.id = character.getId();
        this.name = character.getName();
        this.serverName = character.getServerName();
        this.faction = character.getFaction();
        this.factionName = character.getFaction().getDisplayName(); // 추가
        this.wowClass = character.getWowClass();
        this.wowClassName = character.getWowClass().getDisplayName();
        this.wowSpec = character.getWowSpec();
        this.wowSpecName = character.getWowSpec().getDisplayName();
        this.itemLevel = character.getItemLevel();
    }
}
