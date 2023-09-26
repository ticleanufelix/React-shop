import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/Layout.jsx";
import { Toaster } from "react-hot-toast";
import Context from "./context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <Layout>
          <Toaster />
          <App />
        </Layout>
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
