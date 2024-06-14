import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, FlatList,useWindowDimensions} from 'react-native';
import {fetchCharacters} from "../../services/api";
import tw from 'twrnc';
import {Character} from "../../interfaces";
import {CharacterCard} from "./components/CharacterCard";
import CustomButton from "../../components/CustomButton/CustomButton";
import {CustomSearchBar} from "../../components/CustomSearchBar/CustomSearchBar";
import {useDebounce} from "../../hooks/useDebounce";


export const CharacterListScreen = ({navigation}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const {width} = useWindowDimensions();
    const [filter, setFilter] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const debouncedSearchText = useDebounce(searchText, 1000);

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const data = await fetchCharacters();
                setCharacters(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadCharacters();
    }, []);


    // Déterminer le nombre de colonnes en fonction de la largeur de l'écran
    const getNumColumns = (): number => {
        if (width < 900) return 1;
        if (width < 1600) return 2;
        return 3;
    };

    const applyFilter = useCallback((characters: Character[]): Character[] => {
        if (!filter) return characters;
        return characters.filter(character => character.status.toLowerCase() === filter.toLowerCase());
    }, [filter]);

    const applySearch = useCallback((characters: Character[]): Character[] => {
        if (!debouncedSearchText) return characters;
        return characters.filter(character =>
            character.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
        );
    }, [debouncedSearchText]);

    const filteredCharacters = useMemo(() => {
        const filtered = applyFilter(characters);
        return applySearch(filtered);
    }, [applyFilter, applySearch, characters]);

    const renderItem = ({ item }) => <CharacterCard item={item} width={width} />;



    return (
        <View style={tw`flex-1 p-2`}>
            <View style={tw`mb-4`}>
                <CustomSearchBar
                    placeholder="Search characters..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <View style={tw`flex-row justify-around mb-4`}>
                <CustomButton title="All" onPress={() => setFilter(null)} />
                <CustomButton title="Alive" onPress={() => setFilter("alive")} />
                <CustomButton title="Dead" onPress={() => setFilter("dead")} />
                <CustomButton title="Unknown" onPress={() => setFilter("unknown")} />
            </View>
            <FlatList
                data={filteredCharacters}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={getNumColumns()}
                key={getNumColumns()}
            />
        </View>
    );
};
