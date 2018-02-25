import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import Web3Provider from "./components/Web3Provider";
import Web3 from "web3";
import { injectGlobal } from "styled-components";

const web3 = new Web3(Web3.givenProvider);

injectGlobal`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url(https://fonts.googleapis.com/css?family=Roboto:400,500);
  }
  body {
    margin: 0px;
  }
  * {
    font-Family: Roboto;
  }
`;

ReactDOM.render(
  <Web3Provider eth={web3.eth}>
    <App />
  </Web3Provider>,
  document.getElementById("root")
);
registerServiceWorker();
