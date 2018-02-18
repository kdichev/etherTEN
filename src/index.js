import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import registerServiceWorker from './registerServiceWorker'
import Web3Provider from './components/Web3Provider'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)
console.log(web3)
ReactDOM.render(
  <Web3Provider web3={web3}>
    <App />
  </Web3Provider>,
  document.getElementById("root")
)
registerServiceWorker()
