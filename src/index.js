import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
    <BrowserRouter>
    
    <App />
    
    </BrowserRouter>
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
