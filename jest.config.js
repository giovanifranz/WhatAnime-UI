const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './src',
  transform: '^.+\\.(t|j)sx?$',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
}

module.exports = createJestConfig(customJestConfig)
