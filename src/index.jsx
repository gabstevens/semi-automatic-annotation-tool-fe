import React from "react";
import { render } from "react-dom";
import App from "./App";

const DOM_MOUNT_NODE = document.getElementById("root");

const renderApp = htmlElement => render(<App />, htmlElement);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(["./App"], () => renderApp(DOM_MOUNT_NODE));
}

renderApp(DOM_MOUNT_NODE);
