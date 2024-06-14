import {Image, Text, View, StyleSheet, useWindowDimensions, TouchableOpacity} from "react-native";
import tw from "twrnc";
import React from "react";
import {Character} from "../../../interfaces";
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from "../../../navigation/NavigationOptions";
import { StackNavigationProp } from '@react-navigation/stack';

type CharacterCardNavigationProp = StackNavigationProp<RootStackParamList, 'CharacterDetails'>;

export const CharacterCard = ({item, width}: { item: Character, width: number }) => {
    const navigation = useNavigation<CharacterCardNavigationProp>();

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "alive":
                return tw`bg-green-500`;
            case "dead":
                return tw`bg-red-500`;
            case "unknown":
            default:
                return tw`bg-purple-500`;
        }
    };

    const handlePress = () => {
        navigation.navigate('CharacterDetails', { id: item.id });
    };


    const isLargeScreen = width >= 600;




    return (
        <TouchableOpacity onPress={handlePress} style={tw`flex-1 p-2`}>
            <View style={[tw`bg-white shadow rounded-lg flex ${isLargeScreen ? 'flex-row' : 'flex-col'} items-center`, {
                overflow: "hidden",
                backgroundColor: "#3c3e44"
            }]}>
                <View style={[tw`${isLargeScreen ? 'h-full' : 'w-full'}`, {width: isLargeScreen ? '30%' : '100%', height: isLargeScreen ? '100%' : 400}]}>
                    <Image
                        source={{uri: item.image}}
                        style={[
                            tw`w-full h-full`,
                            {resizeMode: 'cover'},
                        ]}
                    />
                </View>
                <View style={tw`flex-1 p-2 mt-4 lg:mt-0 lg:ml-4 justify-start w-full`}>
                    <View style={tw`flex flex-row items-center`}>
                        <Text style={tw`text-3xl font-bold text-white`}>{item.name}</Text>
                    </View>
                    <View style={tw`p-2 flex flex-row items-center`}>
                        <View style={[tw`w-3 h-3 rounded-full mr-2`, getStatusStyle(item.status)]}/>
                        <Text style={tw`text-xl text-white`}>{item.status} - {item.species}</Text>
                    </View>
                    <View style={tw`p-2 flex items-start`}>
                        <Text style={[tw`text-lg`,{color: "#949495"}]}>Last known location:</Text>
                        <Text style={tw`text-xl text-white`}>{item.location.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
