module.exports = {
  testEnvironment: "jest-fixed-jsdom", // Use jsdom environment for testing React components
  // Transform jsx files using babel-jest
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // ignore e2e tests
  testPathIgnorePatterns: [
    "/e2e-tests/",
  ],
  
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all js or jsx files in src folder
    "!src/routes.jsx", // Exclude routes.jsx from coverage
    "!src/main.jsx", // Exclude main.jsx from coverage
    "!src/App.jsx", // Exclude App.jsx from coverage
    "!src/api/pkce.js", // Exclude pkce.js from coverage
    "!src/pages/LoginPage.jsx", // Exclude LoginPage.jsx from coverage
    "!src/pages/Callback.jsx", // Exclude Callback.jsx from coverage
    "!src/loaders/protectedLoader.js", // Exclude protectedLoader.js from coverage

  ],
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    "d3": "<rootDir>/node_modules/d3/dist/d3.min.js"
  }
};