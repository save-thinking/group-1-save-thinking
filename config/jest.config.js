module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/tests/**"],
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  preset: "jest-puppeteer",
  verbose: true,
};
