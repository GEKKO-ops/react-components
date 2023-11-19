export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['./jest.polyfills.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$':
      '<rootDir>/src/components/test/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/service/apiService.ts',
    '<rootDir>/src/stores/SearchContext.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 80,
    },
  },
  globals: { fetch },
};
