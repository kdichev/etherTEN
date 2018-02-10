import React, { Component } from 'react'
import { withWeb3 } from './../Web3Provider'
import { BlockCard } from './../BlockCard/BlockCard'
import { CardsContainer } from './primitives'

class App extends Component {
  state = {
    blocks: [],
    transactions: []
  }

  async componentDidMount() {
    const { web3: { eth } } = this.props

    const blockNumber = await eth.getBlockNumber()
    this.handleGetLatestBlocks(blockNumber)
  }

  handleGetLatestBlocks = async blockNumber => {
    const { web3: { eth } } = this.props

    for (let i = 0; i < 10; i++) {
      const { blocks, transactions } = this.state
      const newBlock = await eth.getBlock(blockNumber - i)

      if (newBlock) {
        this.setState({
          blocks: [...blocks, newBlock],
          transactions: [
            ...transactions, {
              blockHash: newBlock.hash,
              transactions: newBlock.transactions
            }
          ]
        })
      }
    }
  }

  render() {
    const { blocks } = this.state
    return (
      <CardsContainer>
        {blocks.map(block =>
          <BlockCard 
            number={block.number}
            timestamp={block.timestamp}
            miner={block.miner}
            txns={block.transactions.length}
          />
        )}
      </CardsContainer>
    );
  }
}

export default withWeb3(App)
