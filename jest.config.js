/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // ↓ Estas son las líneas que agregas:
  collectCoverage: true,               // activa la recolección
  coverageDirectory: 'coverage',       // carpeta de salida
  coverageReporters: ['json', 'lcov', 'text', 'clover'],  // formatos
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
};
