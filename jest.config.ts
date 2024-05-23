const { getJestProjects } = require('@nx/jest');

export default {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  testTimeout: 60000,
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  projects: getJestProjects(),
};
