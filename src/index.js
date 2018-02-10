import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Web3Provider from './Web3Provider'
import Web3 from 'web3'

const web3 = new Web3(window.web3.currentProvider);

ReactDOM.render(
  <Web3Provider web3={web3}>
    <App />
  </Web3Provider>
  , document.getElementById('root'));
registerServiceWorker();
