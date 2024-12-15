import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "./store";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter } from "react-router-dom";
// import React from 'react'
createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </Provider>
);
