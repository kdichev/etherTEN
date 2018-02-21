// @flow
import type { BlockNumber, Block, AppProps, AppState } from "./../types";
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { CardsContainer, RefreshIcon } from "./primitives";
//import { TransitionGroup } from "react-transition-group";
// import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
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
      console.log("Error: ", e);
      console.dir(e);
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

  getLatestBlocksInfo = async () => {
    await Promise.all(
      this.state.blocks.map(async ({ transactions, ...rest }) => {
        const transactionInfo = await Promise.all(
          transactions.map(async trx => await this.props.getTransaction(trx))
        );
        //await Promise.all(transactionInfo)
        console.log({ ...rest, transactions, transactionInfo, toggle: false });
        this.setState(prevState => ({
          blocks: [
            ...prevState.blocks,
            { ...rest, transactions, transactionInfo, toggle: false }
          ]
        }));
      })
    );
  };

  onRefreshClick = () => {
    this.setState({ blocks: [] });
    this.initAsyncFlow();
  };

  toggleTransactionInfo = hash => {
    console.log(hash);
    const selected = this.state.blocks.find(
      block =>
        block.hash === hash && {
          ...block,
          toggle: !block.togle
        }
    );
    console.log(selected);
    this.setState(prevState => ({
      blocks: prevState.blocks.map(
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
            {/* <BlockTransactions
              blockHash={block.hash}
              toggle={true}
              info={block.transactionInfo ? block.transactionInfo : []}
              onToggle={this.toggleTransactionInfo}
            /> */}
          </BlockCard>
        ))}
      </CardsContainer>
    );
  }
}

export default withWeb3(App);
