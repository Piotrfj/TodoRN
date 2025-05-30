import React from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Todo } from '../store/useTodoStore';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/types";

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

const TodoItemComponent = ({ todo, onToggle, onDelete }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { showActionSheetWithOptions } = useActionSheet();

    const navigateToDetails = () => navigation.navigate('TaskDetails', { id: todo.id });

    const handlePress = () => navigateToDetails();

    const handleLongPress = () => {
        showActionSheetWithOptions(
            {
                options: ['Edit task', 'Delete task', 'Cancel'],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 1,
                title: 'Task options',
            },
            (selectedIndex) => {
                if (selectedIndex === 0) navigateToDetails();
                else if (selectedIndex === 1) onDelete(todo.id);
            }
        );
    };

    const getPriorityColor = (priority: Todo['priority']) => {
        switch (priority) {
            case 'high': return 'red';
            case 'normal': return 'orange';
            case 'low': return 'green';
            default: return '#999';
        }
    };

    return (
        <Pressable onPress={handlePress} onLongPress={handleLongPress} style={styles.container}>
            <Checkbox
                value={todo.completed}
                onValueChange={() => onToggle(todo.id)}
                testID={`checkbox-${todo.id}`}
                style={styles.checkbox}
            />
            <Text style={[styles.text, todo.completed && styles.completed]}>
                {todo.text}
            </Text>
            {todo.priority && (
                <View
                    style={[styles.flagIndicator, { backgroundColor: getPriorityColor(todo.priority) }]}
                />
            )}
        </Pressable>
    );
};
export const TodoItem = React.memo(TodoItemComponent);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    checkbox: {
        marginRight: 12,
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
    completed: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
    flagIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 8,
    },
});
