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
    src: url(https://fonts.googleapis.com/css?family=Roboto:400,100,500,300italic,500italic,700italic,900,300);
  }
  body {
    font-family: "Roboto", 'Helvetica Neue, Helvetica, Arial';
    text-rendering: optimizeLegibility;
    margin: 0px;
  }
`;

ReactDOM.render(
  <Web3Provider web3={web3}>
    <App />
  </Web3Provider>,
  document.getElementById("root")
);
registerServiceWorker();
