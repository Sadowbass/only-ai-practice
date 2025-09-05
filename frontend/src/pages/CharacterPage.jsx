import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterList from '../components/CharacterList';
import CharacterForm from '../components/CharacterForm';

const CharacterPage = () => {
    const [characters, setCharacters] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingCharacter, setEditingCharacter] = useState(null);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const response = await axios.get('/api/characters');
            setCharacters(response.data.data);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    const handleFormSubmit = async (characterData) => {
        try {
            if (editingCharacter) {
                await axios.patch(`/api/characters/${editingCharacter.id}`, characterData);
            } else {
                await axios.post('/api/characters', characterData);
            }
            fetchCharacters();
            setIsFormVisible(false);
            setEditingCharacter(null);
        } catch (error) {
            console.error("Error submitting character form:", error);
            alert(error.response?.data?.error?.message || '오류가 발생했습니다.');
        }
    };

    const handleEdit = (character) => {
        setEditingCharacter(character);
        setIsFormVisible(true);
    };

    const handleDelete = async (characterId) => {
        if (window.confirm("정말로 이 캐릭터를 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/characters/${characterId}`);
                fetchCharacters();
            } catch (error) {
                console.error("Error deleting character:", error);
            }
        }
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setEditingCharacter(null);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <h1 className="text-3xl font-bold mb-4 md:mb-0">캐릭터 관리</h1>
                {!isFormVisible && (
                    <button onClick={() => { setEditingCharacter(null); setIsFormVisible(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
                        새 캐릭터 추가
                    </button>
                )}
            </div>

            {isFormVisible ? (
                <CharacterForm 
                    initialData={editingCharacter} 
                    onSubmit={handleFormSubmit} 
                    onCancel={handleCancelForm} 
                />
            ) : (
                <CharacterList 
                    characters={characters} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}
        </div>
    );
};

export default CharacterPage;
