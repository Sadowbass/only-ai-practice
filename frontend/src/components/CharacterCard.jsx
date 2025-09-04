import React from 'react';

const CharacterCard = ({ character, onEdit, onDelete }) => {
    const getFactionClass = (faction) => {
        return faction === 'HORDE' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
    };

    // 백엔드 enum 코드를 프론트엔드 파일명 형식(PascalCase)으로 변환하는 헬퍼 함수
    const toPascalCase = (snakeCase) => {
        if (!snakeCase || typeof snakeCase !== 'string') return '';
        return snakeCase.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    };

    const getIconUrl = (type, data) => {
        try {
            let filename = '';
            const classPascal = toPascalCase(data.wowClass);

            if (type === 'classes') {
                filename = `${classPascal}.jpg`;
            } else if (type === 'specs') {
                // wowSpec에서 wowClass 부분을 제거하여 순수 전문화 이름만 추출
                let specOnlyString = data.wowSpec.replace(data.wowClass, '');
                specOnlyString = specOnlyString.replace(/^_/, '').replace(/_$/, '');
                
                const specPascal = toPascalCase(specOnlyString);
                
                filename = `${classPascal}-${specPascal}.jpg`;
            }

            if (!filename) return '';
            return new URL(`../assets/images/wow/${type}/${filename}`, import.meta.url).href;
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-2xl font-bold text-gray-800">{character.name}</p>
                        <p className="text-base text-gray-500">{character.serverName}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${getFactionClass(character.faction)}`}>
                        {character.factionName}
                    </span>
                </div>
                <hr />
            </div>

            {/* Card Body */}
            <div className="my-4 space-y-2 text-base">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">직업:</span>
                    <span className="font-semibold flex items-center">
                        <img 
                            src={getIconUrl('classes', character)} 
                            alt={character.wowClassName}
                            className="w-6 h-6 mr-2 rounded-sm"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        {character.wowClassName}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">전문화:</span>
                    <span className="font-semibold flex items-center">
                        <img 
                            src={getIconUrl('specs', character)} 
                            alt={character.wowSpecName}
                            className="w-6 h-6 mr-2 rounded-sm"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        {character.wowSpecName}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-500">아이템 레벨:</span>
                    <span className="font-bold text-xl text-purple-600">{character.itemLevel}</span>
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
