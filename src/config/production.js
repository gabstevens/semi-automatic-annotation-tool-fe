import baseConfig from "./base";

const config = {
  appEnv: "dist",
  apiBaseUrl: "https://<AGGIUNGERE IL SITO DI PROD INTERNO>"
};

export default Object.freeze({ ...baseConfig, ...config });
