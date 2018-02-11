import React, { Component } from "react"
import { withWeb3 } from "./../Web3Provider"
import { BlockCard } from "./../BlockCard/BlockCard"
import { BlockInfo } from "./../BlockInfo/BlockInfo"
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions"
import { CardsContainer } from "./primitives"
import Loader from "./../Loader"
import moment from "moment"

class App extends Component {
  state = {
    blocks: [],
    transactions: [],
    loading: true,
    selected: [],
    transactionsInfo: [],
    tLoading: false,
    tLoadingFinished: false
  };

  componentDidMount() {
    this.handleAsync();
  }

  async handleAsync() {
    const blockNumber = await this.props.handleGetBlockNumber();
    await this.handleGetLatestBlocks(blockNumber);
    this.handleGetBlockTransactionsInfo();
  }

  handleGetBlockTransactionsInfo = async () => {
    this.setState({
      tLoading: true
    })
    const result = await Promise.all(
      this.state.transactions.map(
        async item => {
          await Promise.all(
            item.transactions.map(async trx => {
              item.transactionsInfo = item.transactionsInfo ? item.transactionsInfo : [];
              item.transactionsInfo.push(await this.props.handleGetTransaction(trx))
              return item = {
                ...item,
                transactionsInfo: item.transactionsInfo
              }
            }
          ))
          return item
        }
      )
    );
    this.setState({
      transactionsInfo: result,
      tLoading: false,
      tLoadingFinished: true
    });
  };

  handleGetLatestBlocks = async blockNumber => {
    for (let i = 0; i < 10; i++) {
      this.setState({ loading: true });
      const { blocks, transactions } = this.state;
      const newBlock = await this.props.handleGetBlock(blockNumber, i);
      if (newBlock) {
        this.setState({
          blocks: [...blocks, newBlock],
          loading: false,
          transactions: [
            ...transactions,
            {
              blockHash: newBlock.hash,
              transactions: newBlock.transactions
            }
          ]
        });
      }
    }
  };

  render() {
    const { blocks, selected, loading } = this.state;
    return (
      <CardsContainer>
        {blocks.map(block => (
          <BlockCard
            number={block.number}
            timestamp={moment().diff(moment.unix(block.timestamp), "seconds")}
            miner={block.miner}
            txns={block.transactions.length}
            key={block.hash}
            hash={block.hash}
          >
            <BlockInfo block={block} />
            <BlockTransactions loading={this.state.tLoadingFinished} info={this.state.transactionsInfo} blockHash={block.hash} />
            {this.state.tLoading && 'Loading...'}
          </BlockCard>
        ))}
        {loading && <Loader />}
      </CardsContainer>
    );
  }
}

export default withWeb3(App)
