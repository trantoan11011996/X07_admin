import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "antd/dist/antd.min.css";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyles>
    <App />
  </GlobalStyles>
);
