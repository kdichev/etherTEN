import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withWeb3 } from './Web3Provider'

class App extends Component {
  async componentDidMount() {
    console.log(this.props)
    const { web3 } = this.props
    console.log(web3.eth)
    const blockNumber = await web3.eth.getBlockNumber()
    console.log(blockNumber)
    for (let i = 0; i < 10; i++) {
      const newBlock = await web3.eth.getBlock(blockNumber - i)
      console.log(newBlock)
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default withWeb3(App);
