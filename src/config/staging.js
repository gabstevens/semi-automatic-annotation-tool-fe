import baseConfig from "./base";

const config = {
  appEnv: "stag",
  apiBaseUrl: "https://<AGGIUNGERE IL SITO DI STAGING INTERNO>",
  loginUrl:
    "https://<AGGIUNGERE IL SITO DI LOGIN>?redirect_uri?=<AGGIUNGERE IL SITO DI STAGING INTERNO>"
};

export default Object.freeze({ ...baseConfig, ...config });
