import React, {useState, useEffect} from 'react';

// Backend Enum 데이터를 프론트엔드에서 사용하기 위한 객체
const wowData = {
    factions: {
        ALLIANCE: "얼라이언스",
        HORDE: "호드"
    },
    classes: {
        EVOKER: "기원사",
        PRIEST: "사제",
        WARRIOR: "전사",
        ROGUE: "도적",
        PALADIN: "성기사",
        SHAMAN: "주술사",
        DRUID: "드루이드",
        MONK: "수도사",
        DEATH_KNIGHT: "죽음의 기사",
        MAGE: "마법사",
        DEMON_HUNTER: "악마사냥꾼",
        WARLOCK: "흑마법사",
        HUNTER: "사냥꾼"
    },
    specs: {
        DEVASTATION: {name: "황폐", class: "EVOKER"},
        PRESERVATION: {name: "보존", class: "EVOKER"},
        AUGMENTATION: {name: "증강", class: "EVOKER"},
        DISCIPLINE: {name: "수양", class: "PRIEST"},
        HOLY_PRIEST: {name: "신성", class: "PRIEST"},
        SHADOW: {name: "암흑", class: "PRIEST"},
        ARMS: {name: "무기", class: "WARRIOR"},
        FURY: {name: "분노", class: "WARRIOR"},
        PROTECTION_WARRIOR: {name: "방어", class: "WARRIOR"},
        ASSASSINATION: {name: "암살", class: "ROGUE"},
        OUTLAW: {name: "무법", class: "ROGUE"},
        SUBTLETY: {name: "잠행", class: "ROGUE"},
        HOLY_PALADIN: {name: "신성", class: "PALADIN"},
        PROTECTION_PALADIN: {name: "보호", class: "PALADIN"},
        RETRIBUTION: {name: "징벌", class: "PALADIN"},
        ELEMENTAL: {name: "정기", class: "SHAMAN"},
        ENHANCEMENT: {name: "고양", class: "SHAMAN"},
        RESTORATION_SHAMAN: {name: "복원", class: "SHAMAN"},
        BALANCE: {name: "조화", class: "DRUID"},
        FERAL: {name: "야성", class: "DRUID"},
        GUARDIAN: {name: "수호", class: "DRUID"},
        RESTORATION_DRUID: {name: "회복", class: "DRUID"},
        BREWMASTER: {name: "양조", class: "MONK"},
        MISTWEAVER: {name: "운무", class: "MONK"},
        WINDWALKER: {name: "풍운", class: "MONK"},
        BLOOD: {name: "혈기", class: "DEATH_KNIGHT"},
        FROST_DEATH_KNIGHT: {name: "냉기", class: "DEATH_KNIGHT"},
        UNHOLY: {name: "부정", class: "DEATH_KNIGHT"},
        ARCANE: {name: "비전", class: "MAGE"},
        FIRE: {name: "화염", class: "MAGE"},
        FROST_MAGE: {name: "냉기", class: "MAGE"},
        HAVOC: {name: "파멸", class: "DEMON_HUNTER"},
        VENGEANCE: {name: "복수", class: "DEMON_HUNTER"},
        AFFLICTION: {name: "고통", class: "WARLOCK"},
        DEMONOLOGY: {name: "악마", class: "WARLOCK"},
        DESTRUCTION: {name: "파괴", class: "WARLOCK"},
        BEAST_MASTERY: {name: "야수", class: "HUNTER"},
        MARKSMANSHIP: {name: "사격", class: "HUNTER"},
        SURVIVAL: {name: "생존", class: "HUNTER"}
    }
};

const CharacterForm = ({initialData, onSubmit, onCancel}) => {
    const [formData, setFormData] = useState({
        name: '',
        serverName: '',
        faction: 'HORDE',
        wowClass: 'WARRIOR',
        wowSpec: 'FURY',
        itemLevel: 0
    });
    const [availableSpecs, setAvailableSpecs] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const specsForClass = Object.keys(wowData.specs).filter(
            key => wowData.specs[key].class === formData.wowClass
        );
        setAvailableSpecs(specsForClass);
        if (!specsForClass.includes(formData.wowSpec)) {
            setFormData(prev => ({...prev, wowSpec: specsForClass[0]}));
        }
    }, [formData.wowClass]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6">{initialData ? '캐릭터 수정' : '새 캐릭터 추가'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">캐릭명</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="serverName" className="block text-sm font-medium text-gray-700">서버</label>
                    <input type="text" name="serverName" id="serverName" value={formData.serverName}
                           onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="faction" className="block text-sm font-medium text-gray-700">진영</label>
                    <select name="faction" id="faction" value={formData.faction} onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {Object.entries(wowData.factions).map(([key, value]) => <option key={key}
                                                                                        value={key}>{value}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="wowClass" className="block text-sm font-medium text-gray-700">직업</label>
                    <select name="wowClass" id="wowClass" value={formData.wowClass} onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {Object.entries(wowData.classes)
                            .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB, 'ko-KR'))
                            .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="wowSpec" className="block text-sm font-medium text-gray-700">전문화</label>
                    <select name="wowSpec" id="wowSpec" value={formData.wowSpec} onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {availableSpecs
                            .sort((keyA, keyB) => wowData.specs[keyA].name.localeCompare(wowData.specs[keyB].name, 'ko-KR'))
                            .map(key => <option key={key} value={key}>{wowData.specs[key].name}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="itemLevel" className="block text-sm font-medium text-gray-700">아이템 레벨</label>
                    <input type="number" name="itemLevel" id="itemLevel" value={formData.itemLevel}
                           onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div className="md:col-span-2 flex justify-end space-x-4">
                    <button type="button" onClick={onCancel}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">취소
                    </button>
                    <button type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">{initialData ? '수정 완료' : '캐릭터 추가'}</button>
                </div>
            </form>
        </div>
    );
};

export default CharacterForm;
