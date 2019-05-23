const path = require('path')

module.exports = {
  collectCoverage: true,
  coverageDirectory: path.join(__dirname, 'CoverageReport'),
  coverageReporters: ['text', 'html'],
  verbose: true,
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime']
}
