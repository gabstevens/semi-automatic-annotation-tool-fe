function onRequestSaga(request) {
  return request;
  // return {
  //   headers: {
  //     authorization: localStorage.getItem("SAAT_ACCESS_TOKEN"),
  //     ...request.headers
  //   },
  //   ...request
  // };
}

function onSuccessSaga(response) {
  return response;
}

function onErrorSaga(error) {
  // eslint-disable-next-line no-console
  console.log("ERROR", error);
  // if (
  //   (error && error.response && [401, 403].includes(error.response.status)) ||
  //   error.toString().match(/network error/i)
  // ) {
  //   localStorage.removeItem("SAAT_ACCESS_TOKEN");
  //   window.location.href = "/";
  // }

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
