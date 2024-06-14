import React, { useEffect, useState } from 'react';
import {View, Text, Image, ActivityIndicator, useWindowDimensions} from 'react-native';
import tw from 'twrnc';
import { fetchCharacterById } from '../../services/api';  // Suppose that you have an API service to fetch character details
import { Character } from '../../interfaces';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const CharacterDetailsScreen= ({ route }) => {
    const { id } = route.params;
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const {width} = useWindowDimensions();

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const data = await fetchCharacterById(id);
                setCharacter(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCharacter();
    }, [id]);

    const isLargeScreen = width >= 600;

    const getIconBySpecies = (species: string) => {
        switch (species.toLowerCase()) {
            case 'human':
                return <MaterialCommunityIcons name="human-greeting-variant" size={24} color="green" />;
            case 'alien':
                return <MaterialCommunityIcons name="alien-outline" size={24} color="green" />;
            default:
                return <MaterialCommunityIcons name="help-circle-outline" size={24} color="green" />;
        }
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }



    return (
        <View style={tw`flex-1 p-4 bg-gray-900`}>
            <View style={tw`items-center mb-4`}>
                <Image source={{ uri: character.image }} style={tw`w-40 h-40 rounded-full`} />
                <View style={tw`flex-row items-center justify-center mt-4`}>
                    <Text style={tw`text-3xl text-white font-bold mr-2`}>{character.name}</Text>
                    {getIconBySpecies(character.species)}
                </View>
            </View>
            <View style={[tw`mb-4 p-4 gap-4 flex`, isLargeScreen && tw`flex-row gap-12 justify-center`]}>
                <Text style={tw`text-xl text-white`}>Status: {character.status}</Text>
                <Text style={tw`text-xl text-white`}>Species: {character.species}</Text>
                <Text style={tw`text-xl text-white`}>Gender: {character.gender}</Text>
                <Text style={tw`text-xl text-white`}>Origin: {character.origin.name}</Text>
                <Text style={tw`text-xl text-white`}>Location: {character.location.name}</Text>
            </View>
        </View>
    );
};
