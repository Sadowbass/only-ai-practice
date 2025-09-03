package com.sadowbass.mcptestbackend.domain.character.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCharacter is a Querydsl query type for Character
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCharacter extends EntityPathBase<Character> {

    private static final long serialVersionUID = 145815557L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCharacter character = new QCharacter("character");

    public final EnumPath<com.sadowbass.mcptestbackend.domain.wow.entity.Faction> faction = createEnum("faction", com.sadowbass.mcptestbackend.domain.wow.entity.Faction.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> itemLevel = createNumber("itemLevel", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath serverName = createString("serverName");

    public final com.sadowbass.mcptestbackend.domain.user.entity.QUser user;

    public final EnumPath<com.sadowbass.mcptestbackend.domain.wow.entity.WowClass> wowClass = createEnum("wowClass", com.sadowbass.mcptestbackend.domain.wow.entity.WowClass.class);

    public final EnumPath<com.sadowbass.mcptestbackend.domain.wow.entity.WowSpec> wowSpec = createEnum("wowSpec", com.sadowbass.mcptestbackend.domain.wow.entity.WowSpec.class);

    public QCharacter(String variable) {
        this(Character.class, forVariable(variable), INITS);
    }

    public QCharacter(Path<? extends Character> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCharacter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCharacter(PathMetadata metadata, PathInits inits) {
        this(Character.class, metadata, inits);
    }

    public QCharacter(Class<? extends Character> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.sadowbass.mcptestbackend.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

