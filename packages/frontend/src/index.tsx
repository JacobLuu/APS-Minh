import "react-hot-loader/patch";
import "./i18n";

/* eslint-disable global-require */
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import Root from "./Root";
import store from "./store";

const container = document.getElementById("root-frontend");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);

if (module.hot) {
  module.hot.accept("./Root", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RootContainer = require("./Root").default;

    root.render(
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  });
}
