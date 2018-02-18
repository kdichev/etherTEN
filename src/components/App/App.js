import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import { BlockInfo } from "./../BlockInfo/BlockInfo";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { CardsContainer } from "./primitives";
import Loader from "./../Loader";
import { TransitionGroup } from "react-transition-group";
import transition from "styled-transition-group";

export const Fade = transition.div`
  &:enter { opacity: 0.01; }
  &:enter-active {
    opacity: 1;
    transition: all ${props => props.timing} ease-in;
  }
`;

export const FadeWithSlide = transition.div`
  height: 0px;
  &:enter { height: 0px; opacity: 0; color: transparent; }
  &:enter-active {
    color: black;
    height: 250px;
    opacity: 1;
    transition: all ${props => props.timing} ease-in;
  }
`;

class App extends Component {
  state = {
    blocks: [],
    loading: true,
    tLoading: true,
    tLoadingFinished: true,
    noProvider: false
  };

  componentDidMount() {
    this.handleAsync();
  }

  async handleAsync() {
    try {
      const blockNumber = await this.props.handleGetBlockNumber();
      await this.handleGetLatestBlocks(blockNumber);
      this.getTransactionsInfo();
    } catch (e) {
      this.setState({
        loading: false,
        noProvider: true
      });
    }
  }

  getInfo = async transactions => {
    let info = await Promise.all(
      transactions.map(async trx => await this.props.handleGetTransaction(trx))
    );
    return info;
  };

  getTransactionsInfo = async () => {
    // await Promise.race(
    //   this.state.blocks.map(async block => {
    //     const updatedBlock = {
    //       ...block,
    //       transactionsInfo: await this.getInfo(block.transactions)
    //     }
    //     console.log(updatedBlock)
    //   })
    // )
    this.setState({
      blocks: await Promise.all(
        this.state.blocks.map(async block => {
          return {
            ...block,
            transactionsInfo: await this.getInfo(block.transactions)
          };
        })
      ),
      tLoadingFinished: true,
      tLoading: false
    });
  };

  handleGetLatestBlocks = async blockNumber => {
    for (let i = 1; i < 10; i++) {
      const { blocks } = this.state;
      const newBlock = await this.props.handleGetBlock(blockNumber, i);
      this.setState({ loading: true });
      if (newBlock) {
        this.setState({
          blocks: [...blocks, newBlock],
          loading: false
        });
      }
    }
  };

  componentDidCatch() {
    this.setState({
      crash: true
    });
  }

  render() {
    const {
      blocks,
      loading,
      noProvider,
      tLoading,
      tLoadingFinished
    } = this.state;
    console.log(this.state.blocks);
    return (
      <CardsContainer>
        <TransitionGroup>
          {blocks.map(block => (
            <Fade timing="300ms">
              <BlockCard
                number={block.number}
                timestamp={block.timestamp}
                miner={block.miner}
                txns={block.transactions.length}
                key={block.hash}
                hash={block.hash}
                loading={tLoading}
              >
                <BlockInfo block={block} />
                <TransitionGroup>
                  {block.transactionsInfo && (
                    <FadeWithSlide timing="300ms">
                      <BlockTransactions
                        loading={tLoadingFinished}
                        info={block.transactionsInfo}
                        blockHash={block.hash}
                      />
                    </FadeWithSlide>
                  )}
                </TransitionGroup>
              </BlockCard>
            </Fade>
          ))}
        </TransitionGroup>
        {loading && <Loader />}
        {noProvider && <div>No provider install MetaMask.</div>}
      </CardsContainer>
    );
  }
}

export default withWeb3(App);
