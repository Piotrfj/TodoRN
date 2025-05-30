import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useTodoStore } from '../store/useTodoStore';
import { TodoItem } from '../components/TodoItem';

const TodoScreen = () => {
    const { todos, addTodo, toggleTodo, removeTodo, editTodo } = useTodoStore();

    const [input, setInput] = useState('');

    const activeTodos = useMemo(() => todos.filter((t) => !t.completed), [todos]);
    const completedTodos = useMemo(() => todos.filter((t) => t.completed), [todos]);

    const handleAdd = () => {
        if (input.trim()) {
            addTodo(input.trim());
            setInput('');
        }
    };

    const handleToggle = useCallback(
        (id: string) => {
            toggleTodo(id);
        },
        [toggleTodo]
    );

    const handleDelete = useCallback(
        (id: string) => {
            removeTodo(id);
        },
        [removeTodo]
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Add new task"
                />
                <Button title="Add" onPress={handleAdd} />
            </View>

            <FlatList
                data={activeTodos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                )}
            />

            {completedTodos.length > 0 && (
                <>
                    <Text style={styles.separator}>✔️ Completed</Text>
                    <FlatList
                        data={completedTodos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TodoItem
                                todo={item}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                            />
                        )}
                    />
                </>
            )}
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
    },
    separator: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 8,
        color: '#888',
    },
});
