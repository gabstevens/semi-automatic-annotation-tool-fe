import baseConfig from "./base";

const config = {
  appEnv: "stag",
  apiMock: false,
  apiBaseUrl: "https://<AGGIUNGERE IL SITO DI STAGING INTERNO>"
};

export default Object.freeze({ ...baseConfig, ...config });
