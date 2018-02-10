import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withWeb3 } from './Web3Provider'

class App extends Component {

  state = {
    blocks: []
  }

  async componentDidMount() {
    const { web3: { eth } } = this.props

    const blockNumber = await eth.getBlockNumber()
    this.handleGetLatestBlocks(blockNumber)
  }

  handleGetLatestBlocks = async (blockNumber) => {
    const { web3: { eth } } = this.props

    for (let i = 0; i < 10; i++) {
      const { blocks } = this.state
      const newBlock = await eth.getBlock(blockNumber - i)

      if (newBlock) {
        this.setState({
          blocks: [...blocks, newBlock]
        })
      }
    }
  }

  render() {
    console.log("Blocks: ", this.state.blocks)
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
