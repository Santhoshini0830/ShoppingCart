import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<p>loading ... </p>} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);
reportWebVitals();
