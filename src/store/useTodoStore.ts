import {create, StateCreator} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    note: string;
    priority: 'low' | 'normal' | 'high';
};


type TodoStore = {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, newText: string, note: string, priority: Todo['priority']) => void;
};

const storeLogic: StateCreator<TodoStore> = (set) => ({
    todos: [],
    addTodo: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                { id: Date.now().toString(), text, completed: false, priority: 'normal', note: '' },
            ],
        })),
    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ),
        })),
    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),
    editTodo: (id, newText, note, priority) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText, note, priority } : todo
            ),
        })),
});


// App version (with persistence)
export const useTodoStore = create<TodoStore>()(
    persist(storeLogic, {
        name: 'todo-storage',
        storage: createJSONStorage(() => AsyncStorage),
    })
);

// Test version (without persistence)
export const createTodoStoreForTest = () => create<TodoStore>()(storeLogic);
