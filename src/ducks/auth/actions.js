import * as types from "./types";

export const login = ({ username, password }) => ({
  type: types.LOGIN,
  request: {
    url: "api/login",
    method: "POST",
    data: {
      username,
      password
    }
  }
});

export const getUserMe = () => ({
  type: types.GET_USER_ME,
  request: {
    url: "api/user/me",
    method: "GET"
  }
});
