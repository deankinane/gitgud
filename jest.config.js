module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  modulePaths: ["<rootDir>"],
  runner: "@jest-runner/electron",
  testEnvironment: "@jest-runner/electron/environment"
};
