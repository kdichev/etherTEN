// @flow
import type {
  AppProps,
  AppState,
  updateBlockByIndex,
  AddBlock
} from "./../types";
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { CardsContainer, RefreshIcon } from "./primitives";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { BlockInfo } from "./../BlockInfo/BlockInfo";

const updateBlock: updateBlockByIndex = (prevState, updatedBlock, index) => {
  prevState.blocks[index] = { ...prevState.blocks[index], ...updatedBlock };
  return { ...prevState };
};

const addBlock: AddBlock = (prevState, newBlock) => ({
  blocks: [...prevState.blocks, newBlock]
});

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
      this.getLatestBlocksInfo();
    } catch (e) {
      console.log("error:");
    }
  };

  getLatestBlocks = async number => {
    const { getBlock } = this.props;
    for (let i = 1; i <= 10; i++) {
      const newBlock = await getBlock(number - i);
      this.setState(prevState => newBlock && addBlock(prevState, newBlock));
    }
  };

  getLatestBlocksInfo = () => {
    const { blocks } = this.state;
    blocks.map(async (block, index) => {
      const transactionInfo = await Promise.all(
        block.transactions.map(
          async trx => await this.props.getTransaction(trx)
        )
      );
      this.setState(prevState =>
        updateBlock(prevState, { transactionInfo }, index)
      );
    });
  };

  onRefreshClick = () => {
    this.setState({ blocks: [] });
    this.initAsyncFlow();
  };

  toggleTransactionInfo = (hash: string, index: number, toggle: boolean) => {
    this.setState(prevState =>
      updateBlock(prevState, { toggle: !toggle }, index)
    );
  };

  render() {
    const { blocks } = this.state;
    console.log(blocks);
    return (
      <CardsContainer>
        <RefreshIcon onClick={this.onRefreshClick}>⟳</RefreshIcon>
        {blocks.map((block, index) => (
          <BlockCard {...block} key={block.hash}>
            <BlockInfo {...block} />
            <BlockTransactions
              blockHash={block.hash}
              blockIndex={index}
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
