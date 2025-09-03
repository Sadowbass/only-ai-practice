package com.sadowbass.mcptestbackend.domain.wow.entity;

import lombok.Getter;

@Getter
public enum WowClass {
    EVOKER("기원사"),
    PRIEST("사제"),
    WARRIOR("전사"),
    ROGUE("도적"),
    PALADIN("성기사"),
    SHAMAN("주술사"),
    DRUID("드루이드"),
    MONK("수도사"),
    DEATH_KNIGHT("죽음의 기사"),
    MAGE("마법사"),
    DEMON_HUNTER("악마사냥꾼"),
    WARLOCK("흑마법사"),
    HUNTER("사냥꾼");

    private final String displayName;

    WowClass(String displayName) {
        this.displayName = displayName;
    }
}
