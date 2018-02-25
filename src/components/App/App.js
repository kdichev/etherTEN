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
import { AppContainer, RefreshIcon, Title, SubTitle } from "./primitives";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { BlockInfo } from "./../BlockInfo/BlockInfo";
// $FlowFixMe
import Blockies from "react-blockies";
// $FlowFixMe
import moment from "moment";

export const updateBlock: updateBlockByIndex = (
  prevState,
  updatedBlock,
  hash
) => {
  const blockIndex = prevState.blocks.findIndex(block => block.hash === hash);
  prevState.blocks[blockIndex] = {
    ...prevState.blocks[blockIndex],
    ...updatedBlock
  };
  return { ...prevState };
};

export const addBlock: AddBlock = (prevState, newBlock) => ({
  blocks: [...prevState.blocks, newBlock]
});

const Link = props => {
  return (
    <a
      href={props.href}
      onClick={e => {
        e.preventDefault();
      }}
    >
      {props.children}
    </a>
  );
};

class PureComponent extends React.Component<{ render: any }> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return this.props.render;
  }
}

const BlockTitle = (props: {
  onClick?: () => void,
  number: number,
  hash: string
}) => (
  <Title>
    Block
    <Link href={props.hash} onClick={props.onClick}>
      {props.number}
    </Link>
  </Title>
);

const BlockSubTitle = (props: {
  onClick?: () => void,
  transactions: [],
  infoLoading?: boolean,
  hash: string
}) => (
  <SubTitle>
    includes{" "}
    <Link href={props.hash} onClick={props.onClick}>
      {props.transactions.length}
    </Link>{" "}
    trx <br />
    {props.infoLoading && "Loading Transactions..."}
  </SubTitle>
);

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
      console.log("Error");
    }
  };

  getLatestBlocks = async number => {
    const { getBlock } = this.props;
    for (let i = 1; i <= 10; i++) {
      const newBlock = await getBlock(number - i);
      this.setState(
        prevState => newBlock && addBlock(prevState, { ...newBlock })
      );
    }
  };

  getLatestBlocksInfo = () => {
    const { blocks } = this.state;
    blocks.map(async ({ hash, transactions }) => {
      this.setState(prevState =>
        updateBlock(prevState, { infoLoading: true }, hash)
      );
      const transactionInfo = await Promise.all(
        transactions.map(async trx => await this.props.getTransaction(trx))
      );
      this.setState(prevState =>
        updateBlock(prevState, { transactionInfo, infoLoading: false }, hash)
      );
    });
  };

  setToggleState = (key, hashIndex, toggle) =>
    this.setState(prevState =>
      updateBlock(prevState, { [key]: !toggle }, hashIndex)
    );

  render() {
    const { blocks } = this.state;
    return (
      <AppContainer>
        {blocks.map(block => (
          <BlockCard
            onClick={() => {
              this.setToggleState("infoToggle", block.hash, block.infoToggle);
              this.setToggleState("toggle", block.hash, block.toggle);
            }}
            {...block}
            key={block.hash}
            avatar={<Blockies seed={block.hash} scale={7} />}
            title={<BlockTitle {...block} />}
            subtitle={<BlockSubTitle {...block} />}
            footer={
              <PureComponent render={moment.unix(block.timestamp).fromNow()} />
            }
          >
            {block.toggle && (
              <BlockInfo {...block} innerRef={ref => console.log(ref)} />
            )}
            {block.toggle && (
              <BlockTransactions {...block} blockIndex={block.hash} />
            )}
          </BlockCard>
        ))}
      </AppContainer>
    );
  }
}

export default withWeb3(App);
