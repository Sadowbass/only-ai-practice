package com.sadowbass.mcptestbackend.domain.wow.entity;

import lombok.Getter;

@Getter
public enum Faction {
    ALLIANCE("얼라이언스"),
    HORDE("호드");

    private final String displayName;

    Faction(String displayName) {
        this.displayName = displayName;
    }
}
