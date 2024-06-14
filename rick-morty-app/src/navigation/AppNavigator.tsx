import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CharacterListScreen} from "../screens/CharacterListScreen/CharacterListScreen";
import {navigationOptions, RootStackParamList} from "./NavigationOptions";
import {DarkTheme} from "../style/DarkTheme";
import {CharacterDetailsScreen} from "../screens/CharacterDetailsScreen.tsx/CharacterDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();


export const AppNavigator = () => {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator screenOptions={navigationOptions}>
                <Stack.Screen
                    name="CharacterList"
                    component={CharacterListScreen}
                    options={{title: 'Character List'}}
                />
                <Stack.Screen
                    name="CharacterDetails"
                    component={CharacterDetailsScreen}
                    options={{ title: 'Character Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};