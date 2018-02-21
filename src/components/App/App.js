// @flow
import type { BlockNumber, Block, AppProps, AppState } from "./../types";
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { CardsContainer, RefreshIcon } from "./primitives";
//import { TransitionGroup } from "react-transition-group";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { BlockInfo } from "./../BlockInfo/BlockInfo";

class App extends Component<AppProps, AppState> {
  state = { blocks: [] };

  componentDidMount() {
    this.initAsyncFlow();
  }

  initAsyncFlow = async () => {
    const { getBlockNumber } = this.props;
    try {
      const latestBlockNumber = await getBlockNumber();
      await this.getLatestBlocks(latestBlockNumber);
      await this.getLatestBlocksInfo();
    } catch (e) {
      console.log(e);
    }
  };

  getLatestBlocks = async (number: BlockNumber) => {
    const { getBlock } = this.props;
    for (let i = 1; i <= 10; i++) {
      const newBlock = await getBlock(number - i);
      this.setState(prevState => ({
        blocks: [...prevState.blocks, newBlock]
      }));
    }
  };

  getLatestBlocksInfo = () => {
    this.state.blocks.map(async (block, index) => {
      const transactionInfo = await Promise.all(
        block.transactions.map(
          async trx => await this.props.getTransaction(trx)
        )
      );
      // $FlowFixMe
      const updatedBlock = {
        ...block,
        transactionInfo,
        toggle: false
      };
      this.setState(prevState =>
        this.updateBlock(prevState, updatedBlock, index)
      );
    });
  };

  updateBlock = (prevState, updatedBlock, index) => {
    prevState.blocks[index] = {
      // $FlowFixMe
      ...prevState.blocks[index],
      ...updatedBlock
    };
    return { ...prevState };
  };

  onRefreshClick = () => {
    this.setState({ blocks: [] });
    this.initAsyncFlow();
  };

  toggleTransactionInfo = hash => {
    const selected = this.state.blocks.find(block => block.hash === hash);
    // $FlowFixMe
    selected.toggle = !selected.toggle;
    this.setState(prevState => ({
      // $FlowFixMe
      blocks: prevState.blocks.map(
        // $FlowFixMe
        block => (block.hash === selected.hash ? selected : block)
      )
    }));
  };

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { blocks } = this.state;
    return (
      <CardsContainer>
        <RefreshIcon onClick={this.onRefreshClick}>⟳</RefreshIcon>
        {blocks.map((block: Block) => (
          <BlockCard {...block}>
            <BlockInfo {...block} />
            <BlockTransactions
              blockHash={block.hash}
              toggle={block.toggle}
              info={block.transactionInfo ? block.transactionInfo : []}
              onToggle={this.toggleTransactionInfo}
            />
          </BlockCard>
        ))}
      </CardsContainer>
    );
  }
}

export default withWeb3(App);
