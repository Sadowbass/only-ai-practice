package com.sadowbass.mcptestbackend.domain.character.entity;

import com.sadowbass.mcptestbackend.domain.user.entity.User;
import com.sadowbass.mcptestbackend.domain.wow.entity.Faction;
import com.sadowbass.mcptestbackend.domain.wow.entity.WowClass;
import com.sadowbass.mcptestbackend.domain.wow.entity.WowSpec;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String serverName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Faction faction;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private WowClass wowClass;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private WowSpec wowSpec;

    @Column(nullable = false)
    private int itemLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void update(String name, String serverName, Faction faction, WowClass wowClass, WowSpec wowSpec, int itemLevel) {
        this.name = name;
        this.serverName = serverName;
        this.faction = faction;
        this.wowClass = wowClass;
        this.wowSpec = wowSpec;
        this.itemLevel = itemLevel;
    }
}
