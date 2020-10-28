import React from "react";
import { render } from "react-dom";
import App from "./App";
import { AuthProvider } from "./components/AuthContext";
import * as serviceWorker from "./serviceWorker";

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
