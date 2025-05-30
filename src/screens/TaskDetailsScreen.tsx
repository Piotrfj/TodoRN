import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Switch} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useTodoStore, Todo} from '../store/useTodoStore';
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from "../navigation/types";

const TaskDetailsScreen = () => {
    const {params} = useRoute<RouteProp<RootStackParamList, 'TaskDetails'>>();
    const navigation = useNavigation();
    const {editTodo, toggleTodo, todos} = useTodoStore();
    const todo = todos.find((t) => t.id === params?.id);

    if (!todo) {
        console.warn(`Todo with id ${params?.id} not found`);
        return (
            <Text style={styles.warning}>Task not found</Text>
        );
    }

    const [text, setText] = useState(todo?.text || '');
    const [note, setNote] = useState(todo?.note || '');
    const [priority, setPriority] = useState<Todo['priority']>(todo?.priority || 'normal');
    const [completed, setCompleted] = useState(todo?.completed || false);

    const handleSave = () => {
        if (todo) {
            console.log(`Saving todo: ${todo.id}, text: ${text}, note: ${note}, priority: ${priority}, completed: ${completed}`);
            editTodo(todo.id, text, note, priority);
            if (todo.completed !== completed) toggleTodo(todo.id);
        }
        navigation.goBack();
    };

    if (!todo) return <Text style={styles.warning}>Task not found</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput value={text} onChangeText={setText} style={styles.input}/>

            <Text style={styles.label}>Note</Text>
            <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                style={[styles.input, styles.noteInput]}
            />

            <Text style={styles.label}>Priority</Text>
            <Picker selectedValue={priority} onValueChange={(val) => setPriority(val)} style={styles.picker}>
                <Picker.Item label="Low" value="low"/>
                <Picker.Item label="Normal" value="normal"/>
                <Picker.Item label="High" value="high"/>
            </Picker>

            <View style={styles.switchRow}>
                <Text>Completed</Text>
                <Switch value={completed} onValueChange={setCompleted}/>
            </View>

            <Button title="Save" onPress={handleSave}/>
        </View>
    );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
    },
    noteInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    warning: {
        padding: 20,
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});
