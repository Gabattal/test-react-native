import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import tw from 'twrnc';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const StyledButton: React.FC<CustomButtonProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[tw` p-2 rounded-lg shadow-md flex-1 mx-1`, {...style, backgroundColor: "#3c3e44"}]}
        >
            <Text style={[tw`text-white text-center`, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default StyledButton;
