// @flow
import type { BlockNumber, Block, AppProps, AppState } from "./../types";
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { CardsContainer, RefreshIcon } from "./primitives";
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
      this.setState(prevState =>
        this.updateBlock(
          prevState,
          {
            ...block,
            transactionInfo,
            toggle: false
          },
          index
        )
      );
    });
  };

  updateBlock = (prevState, updatedBlock, index) => {
    prevState.blocks[index] = {
      ...prevState.blocks[index],
      ...updatedBlock
    };
    return { ...prevState };
  };

  onRefreshClick = () => {
    this.setState({ blocks: [] });
    this.initAsyncFlow();
  };

  toggleTransactionInfo = (hash: string) => {
    const selected = this.state.blocks.find(
      (block: Block) => block.hash === hash
    );
    if (selected) {
      this.setState(prevState => ({
        blocks: prevState.blocks.map(
          block =>
            block.hash === selected.hash
              ? { ...selected, toggle: !selected.toggle }
              : block
        )
      }));
    }
  };

  render() {
    const { blocks } = this.state;
    console.log(blocks);
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
