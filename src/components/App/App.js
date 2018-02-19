// @flow
import type { BlockNumber, Block, AppProps, AppState } from "./../types";
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { CardsContainer, Fade } from "./primitives";
import { TransitionGroup } from "react-transition-group";

class App extends Component<AppProps, AppState> {
  state = { blocks: [] };

  componentDidMount() {
    this.initAsyncFlow();
  }

  initAsyncFlow = async () => {
    try {
      const latestBlockNumber = await this.props.getBlockNumber();
      this.getLatestBlocks(latestBlockNumber);
    } catch (e) {
      console.log("Error: ", e);
      console.dir(e);
    }
  };

  getLatestBlocks = async (number: BlockNumber) => {
    for (let i = 1; i <= 10; i++) {
      const newBlock = await this.props.getBlock(number - i);
      this.setState(prevState => ({
        blocks: [...prevState.blocks, newBlock]
      }));
    }
  };

  componentDidCatch(error, info) {
    console.log(error, info);
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
