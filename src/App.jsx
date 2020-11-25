/* eslint-disable react/prop-types */
import React from "react";
import numeral from "numeral";
import * as yup from "yup";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";
import { configureStore } from "./ducks";
import { DismissButton, Notifier } from "./notifications";
import {
  LogoutPage,
  LoginPage,
  AnnotationPage,
  // DoubleAnnotationPage,
  PreprocessedDatasetsPage,
  PreprocessedDatasetPage,
  NewPreprocessedDatasetPage
} from "./pages";
import { PrivateRoute } from "./components";
import overriddenTheme from "./theme";

numeral.register("locale", "it", {
  delimiters: {
    thousands: " ",
    decimal: ","
  },
  currency: {
    symbol: "€"
  }
});

yup.setLocale({
  mixed: {
    required: "Field required"
  }
});

const theme = createMuiTheme(overriddenTheme);

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

function App({ history }) {
  const store = configureStore({});
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <SnackbarProvider
          ref={notistackRef}
          action={key => <DismissButton onClick={onClickDismiss(key)} />}
        >
          <HashRouter history={history}>
            <Switch>
              <PrivateRoute
                path="/preprocessed-datasets"
                exact
                component={PreprocessedDatasetsPage}
              />
              <PrivateRoute
                path="/preprocessed-datasets/new"
                component={NewPreprocessedDatasetPage}
              />
              <PrivateRoute
                path="/preprocessed-datasets/:id"
                exact
                component={PreprocessedDatasetPage}
              />
              <PrivateRoute
                path="/preprocessed-datasets/:preprocessedDatasetId/annotations/:id"
                component={AnnotationPage}
              />
              {/* <PrivateRoute path="/double-annotation-page/:id" component={DoubleAnnotationPage} /> */}
              <PrivateRoute exact path="/logout" component={LogoutPage} />
              <Route exact path="/" component={LoginPage} />
              <Redirect to="/" />
            </Switch>
            <Notifier />
          </HashRouter>
        </SnackbarProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
