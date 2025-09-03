package com.sadowbass.mcptestbackend.domain.character.dto;

import com.sadowbass.mcptestbackend.domain.wow.entity.Faction;
import com.sadowbass.mcptestbackend.domain.wow.entity.WowClass;
import com.sadowbass.mcptestbackend.domain.wow.entity.WowSpec;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CharacterCreateRequestDto {

    @NotBlank(message = "캐릭터 이름은 필수입니다.")
    private String name;

    @NotBlank(message = "서버 이름은 필수입니다.")
    private String serverName;

    @NotNull(message = "진영은 필수입니다.")
    private Faction faction;

    @NotNull(message = "직업은 필수입니다.")
    private WowClass wowClass;

    @NotNull(message = "전문화는 필수입니다.")
    private WowSpec wowSpec;

    @NotNull(message = "아이템 레벨은 필수입니다.")
    @Min(value = 0, message = "아이템 레벨은 0 이상이어야 합니다.")
    private int itemLevel;
}
