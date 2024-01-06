import { defaultsESM as tsjPreset } from "ts-jest/presets";

const config = {
  verbose: true, //실행 중에 각 개별 테스트를 보고해야 하는지 여부
  rootDir: ".",
  testEnvironment: "jsdom",
  transform: {
    ...tsjPreset.transform,
    "^.+\\.jsx?$": "babel-jest",
  },
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = config;
