module.exports = {
  verbose: true,
  "roots": [
    "<rootDir>/packages/podder-frontend-common/src",
    "<rootDir>/packages/podder-management-console/src"
  ],
  "transform": {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.json5?$": "json5-jest",
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^.+\\.csv$": "<rootDir>/config/jest/csvTransform.js",
    // "^(?!.*\\.(js|jsx|mjs|css|csv|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "setupFilesAfterEnv": [
    "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  "setupFiles": [
    '<rootDir>/jest.setup.tsx',
    "react-app-polyfill/jsdom",
    "<rootDir>/config/polyfills.js"
  ],
  "moduleNameMapper": {
    "^.+\\.(svg|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
    "^.+\\.(png)$": "<rootDir>/config/jest/fileMock.js",
    "^.+\\.(css|scss)$": "<rootDir>/node_modules/jest-css-modules"
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]

  // "modulePaths": [
  //   "<rootDir>/packages/podder-management-console/src",
  //   "<rootDir>/packages/podder-frontend-common/src",
  //   "<rootDir>/node_modules"
  // ],
  // "transformIgnorePatterns": [],
  // "transformIgnorePatterns": [
  //   "/node_modules/(?!semantic-ui-react).+\\.js$"
  // ],
  // "moduleFileExtensions": [
  //   "web.js",
  //   "js",
  //   "json",
  //   "web.jsx",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node",
  //   "mjs"
  // ]
};
