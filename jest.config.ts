import type { Config } from 'jest';

const config: Config = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(expo-checkbox|expo|@expo|@react-native|@react-navigation|react-native|react-native-reanimated|expo-modules-core|@react-native-picker)/)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testEnvironment: 'jsdom',
};

export default config;