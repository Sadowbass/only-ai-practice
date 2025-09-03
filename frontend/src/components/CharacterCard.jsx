import React from 'react';

const CharacterCard = ({ character, onEdit, onDelete }) => {
    const getFactionClass = (faction) => {
        return faction === 'HORDE' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xl font-bold text-gray-800">{character.name}</p>
                        <p className="text-sm text-gray-500">{character.serverName}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getFactionClass(character.faction)}`}>
                        {character.factionName}
                    </span>
                </div>
                <hr />
            </div>

            {/* Card Body */}
            <div className="my-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">직업:</span>
                    <span className="font-semibold">{character.wowClassName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">전문화:</span>
                    <span className="font-semibold">{character.wowSpecName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">아이템 레벨:</span>
                    <span className="font-bold text-lg text-purple-600">{character.itemLevel}</span>
                </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-end space-x-3">
                <button onClick={() => onEdit(character)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                    수정
                </button>
                <button onClick={() => onDelete(character.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                    삭제
                </button>
            </div>
        </div>
    );
};

export default CharacterCard;
