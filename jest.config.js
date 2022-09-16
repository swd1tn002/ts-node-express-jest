/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['./src'],
  testPathIgnorePatterns: ['/node_modules/', '/bin/']
};