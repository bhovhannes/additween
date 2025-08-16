module.exports = {
  coverageReporters: ['lcovonly', 'html', 'text-summary'],
  clearMocks: true,
  restoreMocks: true,
  reporters: ['default'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  testEnvironment: 'jsdom'
}
