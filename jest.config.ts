import createJestConfig from 'next/jest.js';

const config = createJestConfig({
  dir: './',
})({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^next-intl/navigation$':
      '<rootDir>/src/__mocks__/next-intl-navigation.tsx',
    '^next-intl/routing$': '<rootDir>/src/__mocks__/next-intl-routing.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@prisma/client|@prisma/adapter-pg)/)',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/e2e/',
    '/src/components/ui/',
    '/src/lib/',
    '/src/generated',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/e2e/',
  ],
});

export default config;
