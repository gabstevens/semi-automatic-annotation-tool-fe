/* eslint-disable react/prop-types */
import React from "react";
import numeral from "numeral";
import * as yup from "yup";
import { Provider as ReduxProvider } from "react-redux";
import { IntlProvider } from "react-intl";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";
import { configureStore } from "./ducks";
import { translations } from "./i18n";
import { DismissButton, Notifier } from "./notifications";
import {
  WelcomePage,
  LogoutPage,
  HomePage,
  AnnotationPage,
  DoubleAnnotationPage,
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

const language = "it";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

function App({ history }) {
  const store = configureStore({});
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <IntlProvider locale={language} key={language} messages={translations[language]}>
          <SnackbarProvider
            ref={notistackRef}
            action={key => <DismissButton onClick={onClickDismiss(key)} />}
          >
            <HashRouter history={history}>
              <Switch>
                <PrivateRoute path="/home" component={HomePage} />
                <Route path="/preprocessed-datasets" exact component={PreprocessedDatasetsPage} />
                <Route
                  path="/preprocessed-datasets/new"
                  exect
                  component={NewPreprocessedDatasetPage}
                />
                <Route
                  path="/preprocessed-datasets/:id"
                  exact
                  component={PreprocessedDatasetPage}
                />
                <Route
                  path="/preprocessed-datasets/:preprocessedDatasetId/annotations/:id"
                  component={AnnotationPage}
                />
                <Route path="/double-annotation-page/:id" component={DoubleAnnotationPage} />
                <Route exact path="/logout" component={LogoutPage} />
                <Route exact path="/" component={WelcomePage} />
                <Redirect to="/home" />
              </Switch>
              <Notifier />
            </HashRouter>
          </SnackbarProvider>
        </IntlProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
