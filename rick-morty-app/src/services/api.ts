const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async () => {
    try {
        const response = await fetch(`${BASE_URL}/character`);
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

export const fetchCharacterById = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/character/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch character');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching character with ID ${id}:`, error);
        throw error;
    }
};