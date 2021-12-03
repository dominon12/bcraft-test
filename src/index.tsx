import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./Redux/Store";
import Loading from "./Components/Atoms/Loading";
import SnackBarProvider from "./Contexts/SnackBarContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SnackBarProvider defaultDelay={2500}>
          <App />
        </SnackBarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
