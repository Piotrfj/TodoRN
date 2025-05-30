import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import TodoScreen from '../screens/TodoScreen';
import TaskDetailsScreen from "../screens/TaskDetailsScreen";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <ActionSheetProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoList" component={TodoScreen}/>
                    <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Details' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </ActionSheetProvider>
    );
};

export default RootNavigator;