import * as types from "./types";

function onRequestSaga(request) {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("SAAT_ACCESS_TOKEN")}`,
      ...request.headers
    },
    ...request
  };
}

function onSuccessSaga(response, action) {
  if (action.type === types.LOGIN) {
    localStorage.setItem("SAAT_ACCESS_TOKEN", response.data.access);
  }
  return response;
}

function onErrorSaga(error) {
  // eslint-disable-next-line no-console
  console.log("ERROR", error);
  if (error && error.response && [401].includes(error.response.status)) {
    localStorage.removeItem("SAAT_ACCESS_TOKEN");
    window.location.href = "/";
  }

  throw error;
}

function* onAbortSaga() {
  // do sth, for example an action dispatch
}

export default {
  onRequest: onRequestSaga,
  onSuccess: onSuccessSaga,
  onError: onErrorSaga,
  onAbort: onAbortSaga
};
