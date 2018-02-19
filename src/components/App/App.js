// @flow
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { CardsContainer, Fade } from "./primitives";
import { TransitionGroup } from "react-transition-group";
//import Loader from "./../Loader";
//import { BlockInfo } from "./../BlockInfo/BlockInfo";
//import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";

type BlockNumber = number;

type Block = {
  difficulty: number,
  hash: string,
  number: BlockNumber,
  miner: string,
  txns: number,
  timestamp: string,
  transactions: []
};

type Props = {
  getBlockNumber: () => BlockNumber,
  getBlock: (block: BlockNumber, i: number) => Block
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
    const latestBlockNumber = await this.props.getBlockNumber();
    this.getLatestBlocks(latestBlockNumber);
  }

  getLatestBlocks = async (number: BlockNumber) => {
    for (let i = 0; i < 10; i++) {
      const newBlock = await this.props.getBlock(number, i);
      newBlock &&
        this.setState(prevState => ({
          blocks: [...prevState.blocks, newBlock]
        }));
    }
  };

  componentDidCatch() {
    console.log("App error");
  }

  render() {
    return (
      <CardsContainer>
        <TransitionGroup>
          {this.state.blocks.map((block: Block) => (
            <Fade timing="100ms" timeout={0} key={block.hash}>
              <BlockCard {...block} />
            </Fade>
          ))}
        </TransitionGroup>
      </CardsContainer>
    );
  }
}

export default withWeb3(App);
