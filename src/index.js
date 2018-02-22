import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import Web3Provider from "./components/Web3Provider";
import Web3 from "web3";
import { injectGlobal } from "styled-components";

const web3 = new Web3(Web3.givenProvider);

injectGlobal`
  * {
    font-Family: Arial;
  }
`;

ReactDOM.render(
  <Web3Provider eth={web3.eth}>
    <App />
  </Web3Provider>,
  document.getElementById("root")
);
registerServiceWorker();
