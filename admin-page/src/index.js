import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "antd/dist/antd.min.css";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </PersistGate>
  </Provider>
);
