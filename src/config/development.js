import baseConfig from "./base";

const config = {
  appEnv: "dev",
  apiBaseUrl: "http://gabrysaat.ddns.net:8000",
  apiMock: false,
  mockTimeout: 0
};

export default Object.freeze({ ...baseConfig, ...config });
