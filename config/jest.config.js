console.log(__dirname);
module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/tests/**"],
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
};
