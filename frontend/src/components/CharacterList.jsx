import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters, onEdit, onDelete }) => {
    if (characters.length === 0) {
        return <p className="text-center text-gray-500 mt-8">아직 추가된 캐릭터가 없습니다. 새 캐릭터를 추가해보세요!</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {characters.map(character => (
                <CharacterCard
                    key={character.id}
                    character={character}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default CharacterList;
