module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/tests/**"],
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
