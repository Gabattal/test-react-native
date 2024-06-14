import React from 'react';
import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import tw from 'twrnc';

interface CustomSearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
    inputStyle?: TextStyle;
}

export const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ placeholder, value, onChangeText, style, inputStyle }) => {
    return (
        <View style={[tw`bg-white p-2 rounded-lg shadow-md flex-row items-center`, style]}>
            <TextInput
                style={[tw`flex-1 p-2 text-lg text-gray-800`, inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};
