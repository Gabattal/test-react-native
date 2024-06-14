import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const navigationOptions: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
    },
    headerTitleAlign: 'center'
};

export type RootStackParamList = {
    CharacterList: undefined;
    CharacterDetails: { id: number };
};