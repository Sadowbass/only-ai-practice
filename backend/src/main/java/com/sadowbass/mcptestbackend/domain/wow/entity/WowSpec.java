package com.sadowbass.mcptestbackend.domain.wow.entity;

import lombok.Getter;

@Getter
public enum WowSpec {
    // 기원사
    DEVASTATION("황폐", WowClass.EVOKER),
    PRESERVATION("보존", WowClass.EVOKER),
    AUGMENTATION("증강", WowClass.EVOKER),

    // 사제
    DISCIPLINE("수양", WowClass.PRIEST),
    HOLY_PRIEST("신성", WowClass.PRIEST),
    SHADOW("암흑", WowClass.PRIEST),

    // 전사
    ARMS("무기", WowClass.WARRIOR),
    FURY("분노", WowClass.WARRIOR),
    PROTECTION_WARRIOR("방어", WowClass.WARRIOR),

    // 도적
    ASSASSINATION("암살", WowClass.ROGUE),
    OUTLAW("무법", WowClass.ROGUE),
    SUBTLETY("잠행", WowClass.ROGUE),

    // 성기사
    HOLY_PALADIN("신성", WowClass.PALADIN),
    PROTECTION_PALADIN("보호", WowClass.PALADIN),
    RETRIBUTION("징벌", WowClass.PALADIN),

    // 주술사
    ELEMENTAL("정기", WowClass.SHAMAN),
    ENHANCEMENT("고양", WowClass.SHAMAN),
    RESTORATION_SHAMAN("복원", WowClass.SHAMAN),

    // 드루이드
    BALANCE("조화", WowClass.DRUID),
    FERAL("야성", WowClass.DRUID),
    GUARDIAN("수호", WowClass.DRUID),
    RESTORATION_DRUID("회복", WowClass.DRUID),

    // 수도사
    BREWMASTER("양조", WowClass.MONK),
    MISTWEAVER("운무", WowClass.MONK),
    WINDWALKER("풍운", WowClass.MONK),

    // 죽음의 기사
    BLOOD("혈기", WowClass.DEATH_KNIGHT),
    FROST_DEATH_KNIGHT("냉기", WowClass.DEATH_KNIGHT),
    UNHOLY("부정", WowClass.DEATH_KNIGHT),

    // 마법사
    ARCANE("비전", WowClass.MAGE),
    FIRE("화염", WowClass.MAGE),
    FROST_MAGE("냉기", WowClass.MAGE),

    // 악마사냥꾼
    HAVOC("파멸", WowClass.DEMON_HUNTER),
    VENGEANCE("복수", WowClass.DEMON_HUNTER),

    // 흑마법사
    AFFLICTION("고통", WowClass.WARLOCK),
    DEMONOLOGY("악마", WowClass.WARLOCK),
    DESTRUCTION("파괴", WowClass.WARLOCK),

    // 사냥꾼
    BEAST_MASTERY("야수", WowClass.HUNTER),
    MARKSMANSHIP("사격", WowClass.HUNTER),
    SURVIVAL("생존", WowClass.HUNTER);

    private final String displayName;
    private final WowClass wowClass;

    WowSpec(String displayName, WowClass wowClass) {
        this.displayName = displayName;
        this.wowClass = wowClass;
    }
}
