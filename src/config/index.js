/* eslint-disable import/no-dynamic-require */
const config = require(`./${process.env.REACT_APP_STAGE}`).default;

export default config;
