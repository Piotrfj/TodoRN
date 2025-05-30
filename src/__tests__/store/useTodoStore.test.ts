import { act } from '@testing-library/react-native';
import { createTodoStoreForTest } from '../../store/useTodoStore';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('../__mocks__/async-storage')
);

describe('useTodoStore', () => {
    let store: ReturnType<typeof createTodoStoreForTest>;

    beforeEach(() => {
        store = createTodoStoreForTest();
    });

    it('adds a todo item', () => {
        act(() => {
            store.getState().addTodo('Test item');
        });

        expect(store.getState().todos).toHaveLength(1);
        expect(store.getState().todos[0].text).toBe('Test item');
    });

    it('toggles a todo item', () => {
        act(() => {
            store.getState().addTodo('Toggle me');
            store.getState().toggleTodo(store.getState().todos[0].id);
        });

        expect(store.getState().todos[0].completed).toBe(true);
    });

    it('removes a todo item', () => {
        act(() => {
            store.getState().addTodo('Delete me');
            store.getState().removeTodo(store.getState().todos[0].id);
        });

        expect(store.getState().todos).toHaveLength(0);
    });

    it('edits a todo item', () => {
        act(() => {
            store.getState().addTodo('Old text');
            store.getState().editTodo(store.getState().todos[0].id, 'Updated text');
        });

        expect(store.getState().todos[0].text).toBe('Updated text');
    });
});
