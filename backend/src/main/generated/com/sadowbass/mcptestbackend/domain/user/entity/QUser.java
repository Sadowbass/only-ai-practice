package com.sadowbass.mcptestbackend.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1413743339L;

    public static final QUser user = new QUser("user");

    public final ListPath<com.sadowbass.mcptestbackend.domain.character.entity.Character, com.sadowbass.mcptestbackend.domain.character.entity.QCharacter> characters = this.<com.sadowbass.mcptestbackend.domain.character.entity.Character, com.sadowbass.mcptestbackend.domain.character.entity.QCharacter>createList("characters", com.sadowbass.mcptestbackend.domain.character.entity.Character.class, com.sadowbass.mcptestbackend.domain.character.entity.QCharacter.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath loginId = createString("loginId");

    public final StringPath password = createString("password");

    public final EnumPath<UserRoleEnum> role = createEnum("role", UserRoleEnum.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

