/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  ReactDOM.render(
    // <React.StrictMode>
    <BrowserRouter>
      <App user={user} />
    </BrowserRouter>,
    // </React.StrictMode>
    document.getElementById("root")
  );
});

reportWebVitals();
