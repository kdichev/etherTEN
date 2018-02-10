import React, { Component } from 'react'
import { withWeb3 } from './../Web3Provider'
import { BlockCard } from './../BlockCard/BlockCard'
import { CardsContainer } from './primitives'
import Loader from './../Loader'

class App extends Component {
  state = {
    blocks: [],
    transactions: [],
    loading: false,
    selected: []
  }

  async componentDidMount() {
    const blockNumber = await this.props.handleGetBlockNumber()
    this.handleGetLatestBlocks(blockNumber)
  }

  handleGetLatestBlocks = async blockNumber => {
    for (let i = 0; i < 10; i++) {
      this.setState({ loading: true })
      const { blocks, transactions } = this.state
      const newBlock = await this.props.handleGetBlock(blockNumber, i)
      if (newBlock) {
        this.setState({
          blocks: [...blocks, newBlock],
          loading: false,
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

  handleOnBlockCardClick = async hash => {
    const { transactions } = this.state
    const selected = transactions.filter((item) => item.blockHash === hash && item).pop()
    const result = await Promise.all(selected.transactions.map(async (item) => await this.props.handleGetTransaction(item)))
    this.setState({
      selected: result
    })
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
            key={block.hash}
            hash={block.hash}
            onCardClick={this.handleOnBlockCardClick}
          />
        )}
        {this.state.loading && <Loader />}
        {this.state.selected.map(item => 
          <div>
            from: {item.from} <br />
            to: {item.to} <br />
          </div>
        )}
      </CardsContainer>
    );
  }
}

export default withWeb3(App)
