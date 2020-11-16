/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/jest-dom/extend-expect";
import "jest-extended";

import mediaQuery from "css-mediaquery";

export const createMatchMedia = width => query => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {}
});
