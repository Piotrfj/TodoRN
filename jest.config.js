// module.exports = {
//     preset: 'jest-expo',
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest',
//     },
//     testPathIgnorePatterns: ['/node_modules/', '/build/'],
//     moduleFileExtensions: ['ts', 'tsx', 'js'],
//     setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
// };
module.exports = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|@expo/vector-icons|@expo/react-native-action-sheet)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};