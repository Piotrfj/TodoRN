import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {TodoItem} from '../../components/TodoItem';
import {Todo} from '../../store/useTodoStore';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {NavigationContainer} from "@react-navigation/native";

jest.mock('@expo/react-native-action-sheet', () => ({
    useActionSheet: () => ({
        showActionSheetWithOptions: (_options: any, callback: (index: number) => void) => {
            // Simulate "Delete task" option (index 1)
            callback(1);
        },
    }),
    ActionSheetProvider: ({children}: any) => children,
}));

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<NavigationContainer><ActionSheetProvider>{ui}</ActionSheetProvider></NavigationContainer>);
};

const sampleTodo: Todo = {
    id: '1',
    text: 'Test task',
    completed: false,
    note: '',
    priority: 'normal',
};

describe('TodoItem', () => {
    it('renders the todo text', () => {
        const {getByText} = renderWithProviders(
            <TodoItem
                todo={sampleTodo}
                onToggle={jest.fn()}
                onDelete={jest.fn()}
            />
        );

        expect(getByText('Test task')).toBeTruthy();
    });

    it('calls onToggle when checkbox is clicked', () => {
        const onToggle = jest.fn();

        const {getByRole} = renderWithProviders(
            <TodoItem
                todo={sampleTodo}
                onToggle={onToggle}
                onDelete={jest.fn()}
            />
        );

        fireEvent(getByRole('checkbox'), 'valueChange', true);

        expect(onToggle).toHaveBeenCalledWith('1');
    });

    it('calls onDelete after long press and selecting "Delete task"', () => {
        const onDelete = jest.fn();

        const {getByText} = renderWithProviders(
            <TodoItem
                todo={sampleTodo}
                onToggle={jest.fn()}
                onDelete={onDelete}
            />
        );

        fireEvent(getByText('Test task'), 'longPress');

        expect(onDelete).toHaveBeenCalledWith('1');
    });
});
