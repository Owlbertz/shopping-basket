module.exports = {
    transform: {
        '^.+\\.ts?$': ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }],
    },
    collectCoverageFrom: ['src/**/*.ts', '!src/index.ts']
}