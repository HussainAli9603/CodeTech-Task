export default {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'], // Adjust the path if necessary
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Ensure you're using babel for JS files
    },
};
