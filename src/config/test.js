import baseConfig from "./base";

const config = {
  appEnv: "test",
  apiBaseUrl: "http://localhost:3000",
  apiMock: true,
  mockTimeout: 0
};

export default Object.freeze({ ...baseConfig, ...config });
