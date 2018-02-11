import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { BlockInfo } from "./../BlockInfo/BlockInfo";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { CardsContainer } from "./primitives";
import Loader from "./../Loader";
import styled from "styled-components";
import moment from "moment";

const Dialog = styled.dialog`
  border: none;
  width: 700px;
`;
const DialogContent = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
`;

class App extends Component {
  state = {
    blocks: [],
    transactions: [],
    loading: true,
    selected: [],
  };

  async componentDidMount() {
    const blockNumber = await this.props.handleGetBlockNumber();
    this.handleGetLatestBlocks(blockNumber);
  }

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

  handleOnBlockCardClick = async hash => {
    const { transactions } = this.state;
    const selected = transactions
      .filter(item => item.blockHash === hash && item)
      .pop();
    const result = await Promise.all(
      selected.transactions.map(
        async item => await this.props.handleGetTransaction(item)
      )
    );
    this.setState({ selected: result });
  };

  render() {
    const { blocks } = this.state;
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
            onCardClick={this.handleOnBlockCardClick}
          >
            <BlockInfo block={block}/>
            <BlockTransactions
              selected={this.state.selected}
            />
          </BlockCard>
        ))}
        {this.state.loading && <Loader />}
      </CardsContainer>
    );
  }
}

export default withWeb3(App);
