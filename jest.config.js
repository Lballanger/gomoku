/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["./setupTests.ts"],
};
