// @flow
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { BlockInfo } from "./../BlockInfo/BlockInfo";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { CardsContainer, Fade } from "./primitives";
import Loader from "./../Loader";
import { TransitionGroup } from "react-transition-group";

type Props = {
  handleGetBlockNumber: () => number,
  handleGetBlock: (block: number, i: number) => Block
};

type Block = {
  difficulty: number,
  hash: string,
  loading: boolean,
  number: number,
  miner: string,
  txns: number,
  timestamp: string,
  transactions: []
};

type State = {
  blocks: Array<Block>
};

class App extends Component<Props, State> {
  state = {
    blocks: []
  };

  componentDidMount() {
    this.initAsyncFlow();
  }

  async initAsyncFlow() {
    const latestBlockNumber = await this.props.handleGetBlockNumber();
    await this.getLatestBlocks(latestBlockNumber);
  }

  getLatestBlocks = async blockNumber => {
    for (let i = 1; i < 10; i++) {
      const newBlock: Block = await this.props.handleGetBlock(blockNumber, i);
      if (newBlock) {
        this.setState({
          blocks: [...this.state.blocks, newBlock]
        });
      }
    }
  };

  render() {
    return (
      <CardsContainer>
        <TransitionGroup>
          {this.state.blocks.map((block: Block) => (
            <Fade timing="100ms">
              <BlockCard {...block} key={block.hash} />
            </Fade>
          ))}
        </TransitionGroup>
      </CardsContainer>
    );
  }
}

export default withWeb3(App);
